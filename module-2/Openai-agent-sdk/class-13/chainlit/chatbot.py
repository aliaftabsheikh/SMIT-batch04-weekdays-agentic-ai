"""Nova — a streaming Chainlit chat app with persistent history.

Importing auth_db is what registers the guest auth callback and the SQLite data
layer; without it Chainlit has no authenticated user and the thread sidebar stays
empty regardless of what happens here.
"""

import base64
import uuid
from typing import List, Optional, cast

import chainlit as cl
from agents import Agent, Runner
from agents.result import RunResultStreaming
from dotenv import load_dotenv

import auth_db  # noqa: F401  -- registers @header_auth_callback and @data_layer
from agent_setup import IMAGE_TOOL_AVAILABLE, build_agent

load_dotenv()

UPLOADS_DIR = auth_db.UPLOADS_DIR


@cl.set_starters
async def starters(user=None) -> List[cl.Starter]:
    return [
        cl.Starter(
            label="Debug this error",
            message="I'm getting a `RuntimeError: Event loop is closed` in my async Python script. Walk me through the likely causes and how to fix each one.",
            icon="/public/icons/bug.svg",
        ),
        cl.Starter(
            label="Explain a concept",
            message="Explain how RAG works to someone who already knows how embeddings work. Keep it under 200 words and include a diagram in text form.",
            icon="/public/icons/spark.svg",
        ),
        cl.Starter(
            label="Generate an image",
            message="Create an image of a minimal 3D isometric workstation, deep blue palette, soft volumetric light, clean studio background.",
            icon="/public/icons/image.svg",
        ),
        cl.Starter(
            label="Review my code",
            message="Review this for bugs and style:\n\n```python\ndef get_user(users, id):\n    for u in users:\n        if u['id'] == id:\n            return u\n```",
            icon="/public/icons/code.svg",
        ),
    ]


@cl.on_chat_start
async def on_chat_start() -> None:
    cl.user_session.set("agent", build_agent())
    cl.user_session.set("history", [])


@cl.on_chat_resume
async def on_chat_resume(thread) -> None:
    """Rebuild the agent's input list from a persisted thread.

    Without this, clicking a thread in the sidebar shows the old transcript but the
    agent starts with an empty history, so follow-up questions lose all context.
    """
    history = []
    for step in thread.get("steps") or []:
        step_type = step.get("type")
        content = step.get("output") or ""
        if not content:
            continue
        if step_type == "user_message":
            history.append({"role": "user", "content": content})
        elif step_type == "assistant_message":
            history.append({"role": "assistant", "content": content})

    cl.user_session.set("agent", build_agent())
    cl.user_session.set("history", history)


def _extract_image(raw_item) -> Optional[str]:
    """Return base64 PNG data from an image_generation_call item, if it has any."""
    if getattr(raw_item, "type", None) != "image_generation_call":
        return None
    return getattr(raw_item, "result", None)


async def _save_image(b64_data: str) -> cl.Image:
    """Decode a generated image to public/uploads and wrap it as a Chainlit element."""
    name = f"nova-{uuid.uuid4().hex[:12]}.png"
    path = UPLOADS_DIR / name
    path.write_bytes(base64.b64decode(b64_data))
    return cl.Image(path=str(path), name=name, display="inline", size="large")


@cl.on_message
async def on_message(message: cl.Message) -> None:
    agent = cast(Agent, cl.user_session.get("agent"))
    history = cl.user_session.get("history") or []
    history.append({"role": "user", "content": message.content})

    # The thinking indicator is the empty assistant bubble itself, animated by
    # public/style.css (.ai-message .message-content:empty). An earlier version
    # sent a separate cl.Step and removed it on the first token; this does the
    # same job with one element instead of two, and nothing to tear down -- the
    # indicator disappears simply because the bubble stops being empty.
    msg = cl.Message(content="")
    await msg.send()

    seen_images: set = set()
    pending: List[str] = []
    started = False

    def collect(raw) -> bool:
        """Queue a generated image if this item carries one we haven't saved."""
        b64 = _extract_image(raw)
        if not b64:
            return False
        key = getattr(raw, "id", None) or id(raw)
        if key in seen_images:
            return False
        seen_images.add(key)
        pending.append(b64)
        return True

    try:
        result: RunResultStreaming = Runner.run_streamed(agent, history)
        cl.user_session.set("running", result)

        async for event in result.stream_events():
            if event.type == "raw_response_event":
                data = event.data
                if getattr(data, "type", None) == "response.output_text.delta":
                    started = True
                    await msg.stream_token(data.delta)

            elif event.type == "run_item_stream_event":
                collect(getattr(event.item, "raw_item", None))

        # new_items holds the settled versions; an image item can arrive over the
        # stream before its result is populated, so sweep again at the end.
        for item in result.new_items:
            collect(getattr(item, "raw_item", None))

        for b64 in pending:
            msg.elements.append(await _save_image(b64))

        # An image-only turn produces no text. Left empty, the assistant message
        # persists blank and the turn vanishes from a resumed conversation.
        if not started and msg.elements:
            msg.content = "Here's the image you asked for."
        elif not started and not msg.elements:
            msg.content = "_(no response generated)_"

        await msg.update()
        cl.user_session.set("history", result.to_input_list())

    except Exception as exc:
        detail = str(exc)
        if not IMAGE_TOOL_AVAILABLE or "image" in detail.lower():
            detail += (
                "\n\nIf this was an image request, your API key may not have access "
                "to image generation \u2014 text chat still works."
            )
        msg.content = f"**Something went wrong.**\n\n```\n{detail}\n```"
        await msg.update()

    finally:
        cl.user_session.set("running", None)


@cl.on_stop
async def on_stop() -> None:
    """Make the stop button actually stop generation instead of just hiding it."""
    result = cl.user_session.get("running")
    if result is not None:
        result.cancel()
