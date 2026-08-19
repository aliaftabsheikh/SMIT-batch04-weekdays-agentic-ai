import asyncio
from curses import wrapper

from dotenv import load_dotenv
from agents import Agent, Runner, WebSearchTool, function_tool, ModelSettings, RunContextWrapper
from agents.run import RunConfig
from dataclasses import dataclass

load_dotenv()


@dataclass
class UserInfo:
    name: str
    uid: int
    age: int

# @function_tool
# def get_weather(city: str, temperature: float)-> str:
#     print(f"Getting weather for {city}...")
#     """Get the current weather for a given city."""
#     return f"The weather in {city} and temperatue is {temperature} ."


# weather_agent = Agent(
#     name="WeatherAgent",
#     instructions="You are a weather assistant. First call the WebSearch tool and then call get_weather tool with city and temperature parameters ",
#     tools=[get_weather, WebSearchTool()],
#     model_settings=ModelSettings(
#         temperature=0.1,
#         tool_choice="required",
#         max_tokens=300,
#         top_p=0.8
#     )
# )


# agent = Agent(
#     name="Assistant",
#     instructions="You are a helpful assistant",
#     tools=[WebSearchTool()]
    
# )

# @tool
# def run_agent(agent: Agent, query: str, run_config: RunConfig) -> None:
#     pass

# config = RunConfig(
#     model="gpt-5.6-terra",
    
# )

def special_prompt(ctx: RunContextWrapper[UserInfo], agent: Agent) -> str:
    print(f"Generating special prompt for user {ctx.context.name}...")
    return (
        f"You are a math expert. User: {ctx.context.name}, Agent: {agent.name}. "
        "Please assist with math-related queries."
)

@function_tool
async def fetch_user_age(wrapper: RunContextWrapper[UserInfo]) -> str:
    
    # FILTER 
    
    print(f"Fetching age for user {wrapper.context.name}...")
    """Returns the age of the user."""
    return f"User {wrapper.context.name} is {wrapper.context.age} years old"

config1 = RunConfig(
    model="gpt-5.4-mini",
)

agent = Agent(
    name="Assistant",
    # instructions="You are a helpful assistant. You have access to the user information use the fetch_user_age tool to get the age of the user.",
    instructions=special_prompt,
    tools=[fetch_user_age],
)


async def main() -> None:
    
    result = await Runner.run(agent, "What is the age and the name of user ?", run_config=config1, context=UserInfo(name="Ali", uid=123, age=25))
    print(result.final_output)
    
    
    # result = await Runner.run(agent, "What is AGI ?", run_config=config)
    # print(result.final_output)
    
    
    # result1 = await Runner.run(weather_agent, "What is the current weather of karachi ? ", run_config=config1)
    # print(result1.final_output)


if __name__ == "__main__":
    asyncio.run(main())
