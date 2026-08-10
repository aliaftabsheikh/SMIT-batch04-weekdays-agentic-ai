import asyncio

from dotenv import load_dotenv
from openai.types.responses import ResponseTextDeltaEvent

from agents import Agent, Runner

load_dotenv()


async def main() -> None:
    agent = Agent(
        name="Assistant",
        instructions="You are a helpful assistant",
    )

    result = Runner.run_streamed(agent, "Hello, how are you?")

    async for event in result.stream_events():
        if event.type == "raw_response_event" and isinstance(
            event.data, ResponseTextDeltaEvent
        ):
            print(event.data.delta, end="", flush=True)

    print()


if __name__ == "__main__":
    asyncio.run(main())
