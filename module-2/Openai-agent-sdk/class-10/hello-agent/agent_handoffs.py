"""Part 11b — The same Writing Coach, but with handoffs instead of as_tool.

The coach no longer CALLS the specialists. It hands the mic over, and whoever
holds the mic at the end is the one who answers the user.
Run:  uv run agent_handoffs.py
"""

import asyncio

from dotenv import load_dotenv

from agents import (
    Agent,
    HandoffCallItem,
    HandoffOutputItem,
    MessageOutputItem,
    Runner,
    ToolCallItem,
    ToolCallOutputItem,
    trace,
)

load_dotenv()

# ------------------------------------------------------------- the specialists
# Same three agents. The only change: a handoff_description, which is what the
# coach's model reads when deciding where to send the conversation. It plays the
# role tool_description played in the as_tool version.
spanish = Agent(
    name="Spanish Translator",
    instructions="Translate what the user says into Spanish. Only output Spanish.",
    handoff_description="Translates the user's text to Spanish.",
)

urdu = Agent(
    name="Urdu Translator",
    instructions="Translate what the user says into Urdu. Only output Urdu.",
    handoff_description="Translates the user's text to Urdu.",
)

summarizer = Agent(
    name="Summarizer",
    instructions="Summarize the given text in 2 short bullet points.",
    handoff_description="Summarizes text in 2 bullet points.",
)

# ------------------------------------------------------------------- the coach
# tools=[...] becomes handoffs=[...]. Note the wording of the instructions: we
# are no longer telling it to "call" anything, we are telling it to leave.
coach = Agent(
    name="Writing Coach",
    instructions=(
        "You help users improve messages.\n"
        "- If they ask for Spanish, hand off to the Spanish Translator.\n"
        "- If they ask for a summary, hand off to the Summarizer.\n"
        "- If they ask for Urdu, hand off to the Urdu Translator.\n"
        "- Otherwise, give a short tip yourself and do NOT hand off.\n"
        "When you hand off, the specialist answers the user directly. Do not "
        "add commentary before handing off."
    ),
    handoffs=[spanish, urdu, summarizer],
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
    """Print what happened, in order, from result.new_items.

    The two new item types are the whole point of this file:
      HandoffCallItem   - the coach DECIDED to transfer (a tool call under the hood)
      HandoffOutputItem - the transfer HAPPENED (carries source_agent + target_agent)
    """
    for item in result.new_items:
        if isinstance(item, HandoffCallItem):
            raw = item.raw_item
            print(
                f"    -> HANDOFF CALL   name={getattr(raw, 'name', '?')} "
                f"args={getattr(raw, 'arguments', '')} "
                f"(decided by: {item.agent.name})"
            )
        elif isinstance(item, HandoffOutputItem):
            print(
                f"    <- HANDOFF OUTPUT {item.source_agent.name} "
                f"--> {item.target_agent.name}"
            )
            print(f"       raw_item: {item.raw_item}")
        elif isinstance(item, ToolCallItem):
            raw = item.raw_item
            print(
                f"    -> TOOL CALL   {getattr(raw, 'name', '?')}"
                f"({getattr(raw, 'arguments', '')})"
            )
        elif isinstance(item, ToolCallOutputItem):
            print(f"    <- TOOL OUTPUT {str(item.output).replace(chr(10), ' ')[:90]}")
        elif isinstance(item, MessageOutputItem):
            print(f"    == SPEAKS (agent: {item.agent.name})")


async def main() -> None:
    with trace("Writing Coach handoffs demo"):
        for i, request in enumerate(REQUESTS, start=1):
            print("=" * 78)
            print(f"REQUEST {i}: {request[:70]}{'...' if len(request) > 70 else ''}")
            print("=" * 78)

            result = await Runner.run(coach, request)

            show_trace_of_run(result)
            # In the as_tool version this was ALWAYS "Writing Coach".
            # Here it changes, and that is the tell.
            print(f"\n  result.last_agent.name = {result.last_agent.name!r}")
            print(f"  FINAL: {result.final_output}\n")


if __name__ == "__main__":
    asyncio.run(main())
