
from agents import Agent, Runner, function_tool, StopAtTools, ModelSettings
from dotenv import load_dotenv
from agents.exceptions import MaxTurnsExceeded

load_dotenv()

@function_tool
def get_weather(city:str) -> str:
    """Get the weather in Lahore."""
    return "Sunny"


@function_tool
def get_travel_plan(city: str) -> str:
    """Plan travel for the given city."""
    return "Travel plan is not available"


agent = Agent(
    name="TravelAgent",
    instructions="You are a helpful assistant. First call the get_weather tool to get the weather in Lahore, then call the get_travel_plan tool to get the travel plan for Lahore.",
    model="gpt-4o-mini",
    tools=[get_weather, get_travel_plan],
    model_settings=ModelSettings(tool_choice="required"),
    
    # tool_use_behavior="stop_on_first_tool",  # Stop after calling a tool, do not run the LLM again
    # tool_use_behavior=StopAtTools(stop_at_tool_names=["get_weather"])
    
    # tool_use_behavior="run_llm_again" Default behavior: run the LLM again after tool calls to decide what to do next
)

# result = Runner.run_sync(agent, "What is the weather in Lahore and what is the travel plan from karachi to lahore?", max_turns=2)
# print(result.final_output)


try:
    result = Runner.run_sync(agent, "What is the weather in Lahore?", max_turns=1)
    print(result.final_output)
except MaxTurnsExceeded as e:
    print("LIMIT MUKAMMAL HOI :)")

  