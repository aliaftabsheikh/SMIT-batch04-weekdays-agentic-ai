import asyncio

from dotenv import load_dotenv
from agents import Agent, Runner, WebSearchTool, function_tool, ModelSettings
from agents.run import RunConfig

load_dotenv()

@function_tool
def get_weather(city: str, temperature: float)-> str:
    print(f"Getting weather for {city}...")
    """Get the current weather for a given city."""
    return f"The weather in {city} and temperatue is {temperature} ."


weather_agent = Agent(
    name="WeatherAgent",
    instructions="You are a weather assistant. First call the WebSearch tool and then call get_weather tool with city and temperature parameters ",
    tools=[get_weather, WebSearchTool()],
    model_settings=ModelSettings(
        temperature=0.1,
        tool_choice="required",
        max_tokens=300,
        top_p=0.8
        
        
    )
)


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
    
    
    result1 = await Runner.run(weather_agent, "What is the current weather of karachi ? ", run_config=config1)
    print(result1.final_output)


if __name__ == "__main__":
    asyncio.run(main())
