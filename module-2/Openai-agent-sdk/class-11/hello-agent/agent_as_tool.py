"""Part 11 — Agents as tools.

The Writing Coach owns specialists. It CALLS them; it never hands the mic over.
Run:  uv run agent_as_tool.py
"""

import asyncio

from dotenv import load_dotenv

from agents import (
    Agent,
    MessageOutputItem,
    Runner,
    ToolCallItem,
    ToolCallOutputItem,
    trace,
)

load_dotenv()

# ------------------------------------------------------------- the specialists
spanish = Agent(
    name="Spanish Translator",
    instructions="Translate what the user says into Spanish. Only output Spanish.",
)

urdu = Agent(
    name="Urdu Translator",
    instructions="Translate what the user says into Urdu. Only output Urdu.",
)

summarizer = Agent(
    name="Summarizer",
    instructions="Summarize the given text in 2 short bullet points.",
)

# ------------------------------------------------------------ the orchestrator
coach = Agent(
    name="Writing Coach",
    instructions=(
        "You help users improve messages.\n"
        "- If they ask for Spanish, call translate_to_spanish.\n"
        "- If they ask for a summary, call summarize_text.\n"
        "- If they ask for Urdu, call translate_to_urdu.\n"
        "- Otherwise, give a short tip yourself."
    ),
    tools=[
        spanish.as_tool(
            tool_name="translate_to_spanish",
            tool_description="Translate user text to Spanish.",
        ),
        urdu.as_tool(
            tool_name="translate_to_urdu",
            tool_description="Translate user text to Urdu.",
        ),
        summarizer.as_tool(
            tool_name="summarize_text",
            tool_description="Summarize text in 2 bullets.",
        ),
    ],
)

# ------------------------------------------------------------------ the inputs
REQUESTS = [
    "Please translate to Spanish: I love hands-on examples.",
    (
        "Summarize this for me: Our team shipped the new billing dashboard on "
        "Friday after three weeks of work. Support tickets about invoices "
        "dropped by half over the weekend, and two enterprise customers asked "
        "if they could get the same view for their own users."
    ),
    "How do I make my emails sound less robotic?",
    "Please translate to Urdu: I love hands-on examples.",
]


def show_trace_of_run(result) -> None:
    """Print what the coach actually did, in order, from result.new_items."""
    for item in result.new_items:
        if isinstance(item, ToolCallItem):
            raw = item.raw_item
            name = getattr(raw, "name", "?")
            args = getattr(raw, "arguments", "")
            print(f"    -> TOOL CALL   {name}({args})")
        elif isinstance(item, ToolCallOutputItem):
            text = str(item.output).replace("\n", " ")
            print(f"    <- TOOL OUTPUT {text[:90]}")
        elif isinstance(item, MessageOutputItem):
            print(f"    == COACH SPEAKS (agent: {item.agent.name})")


async def main() -> None:
    with trace("Writing Coach demo"):
        for i, request in enumerate(REQUESTS, start=1):
            print("=" * 78)
            print(f"REQUEST {i}: {request[:70]}{'...' if len(request) > 70 else ''}")
            print("=" * 78)

            result = await Runner.run(coach, request)

            show_trace_of_run(result)
            print(f"\n  FINAL (from {result.last_agent.name}):")
            print(f"  {result.final_output}\n")


if __name__ == "__main__":
    asyncio.run(main())
