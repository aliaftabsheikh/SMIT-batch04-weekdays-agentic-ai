import asyncio

from dotenv import load_dotenv
from agents import Agent, Runner

load_dotenv()

agent = Agent(
    name="Assistant",
    instructions="You are a helpful assistant",
)


async def main() -> None:
    result1, result2 = await asyncio.gather(
        Runner.run(agent, "Write a haiku about recursion in programming."),
        Runner.run(agent, "Write a haiku about the ocean."),
    )
    print("Result 1:")
    print(result1.final_output)
    print()
    print("Result 2:")
    print(result2.final_output)


if __name__ == "__main__":
    asyncio.run(main())
