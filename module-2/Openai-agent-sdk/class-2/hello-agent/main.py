import asyncio

from dotenv import load_dotenv
from agents import Agent, Runner, WebSearchTool
from agents.run import RunConfig

load_dotenv()



agent = Agent(
    name="Assistant",
    instructions="You are a helpful assistant",
    tools=[WebSearchTool()]
)

# @tool
# def run_agent(agent: Agent, query: str, run_config: RunConfig) -> None:
#     pass

# config = RunConfig(
#     model="gpt-5.6-terra",
    
# )

config1 = RunConfig(
    model="gpt-5.4-mini",
)


async def main() -> None:
    # result = await Runner.run(agent, "What is AGI ?", run_config=config)
    # print(result.final_output)
    
    
    result1 = await Runner.run(agent, "Who is the winner of FIFA 2026? Search for the latest information.", run_config=config1)
    print(result1.final_output)


if __name__ == "__main__":
    asyncio.run(main())
