from itertools import count

from agents import Agent, AgentHooks, Runner, function_tool
from dotenv import load_dotenv

load_dotenv()


class LoudHooks(AgentHooks):
    """Prints every agent-lifecycle event, numbered, so the order is visible."""

    def __init__(self, label: str):
        self.label = label
        self.step = count(1)

    def _log(self, message: str) -> None:
        print(f"{next(self.step)}. [{self.label}] {message}")

    async def on_start(self, context, agent):
        self._log(f"on_start       -> {agent.name} is now responsible for the answer")

    async def on_llm_start(self, context, agent, system_prompt, input_items):
        self._log(f"on_llm_start   -> asking the model ({len(input_items)} input items so far)")

    async def on_llm_end(self, context, agent, response):
        tool_calls = [i for i in response.output if i.type == "function_call"]
        asked_for = ", ".join(c.name for c in tool_calls) if tool_calls else "nothing"
        self._log(f"on_llm_end     -> model replied, tools requested: {asked_for}")

    async def on_tool_start(self, context, agent, tool):
        self._log(f"on_tool_start  -> calling {tool.name}")

    async def on_tool_end(self, context, agent, tool, result):
        self._log(f"on_tool_end    -> {tool.name} returned {result!r}")

    async def on_end(self, context, agent, output):
        self._log(f"on_end         -> final output ready: {output!r}")


@function_tool
def get_weather(city: str) -> str:
    """A simple function to get the weather for a user."""
    print(f"   (tool body running for {city})")
    return f"The weather for {city} is sunny."


agent = Agent(
    name="WeatherAgent",
    instructions="You are a helpful assistant. Use the tools you have to answer.",
    tools=[get_weather],
    hooks=LoudHooks("weather"),
)

result = Runner.run_sync(agent, "What's the weather in Karachi?")
print("\nfinal_output:", result.final_output)
print("model calls (turns) in this run:", len(result.raw_responses))
