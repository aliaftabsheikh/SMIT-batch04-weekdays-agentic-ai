import asyncio

from dotenv import load_dotenv

from agents import Agent, Runner

load_dotenv()


async def main() -> None:
    agent = Agent(
        name="Assistant",
        instructions="You are a helpful assistant",
        # model="gpt-5.6-terra",
    )

    result1, result2 = await asyncio.gather(
        Runner.run(agent, "What is the agentic ai"),
        Runner.run(agent, "And what is the role of agentic ai in robotics?"),
    )

    print(result1.final_output)
    print("----------------------------------------------------------")
    print(result2.final_output)


if __name__ == "__main__":
    asyncio.run(main())
