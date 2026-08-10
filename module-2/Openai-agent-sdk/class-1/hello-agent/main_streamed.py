import asyncio

from dotenv import load_dotenv
from openai.types.responses import ResponseTextDeltaEvent

from agents import Agent, Runner

load_dotenv()


async def stream_prompt(agent: Agent, label: str, prompt: str) -> None:
    result = Runner.run_streamed(agent, prompt)

    async for event in result.stream_events():
        if event.type == "raw_response_event" and isinstance(
            event.data, ResponseTextDeltaEvent
        ):
            print(f" {event.data.delta}", end="", flush=True)

    print()


async def main() -> None:
    agent = Agent(
        name="Assistant",
        instructions="You are a helpful assistant",
    )

    await stream_prompt(agent, "War", "In recent pakistan india war, Who came out as winner?"),
    


if __name__ == "__main__":
    asyncio.run(main())
