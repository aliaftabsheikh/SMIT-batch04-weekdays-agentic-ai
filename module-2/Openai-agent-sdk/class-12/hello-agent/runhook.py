from agents import Agent, Runner, RunHooks, WebSearchTool, function_tool
from dotenv import load_dotenv
from agents.run import AgentRunner, set_default_agent_runner

load_dotenv()


class SystemMonitor(RunHooks):
    """One RunHooks instance watches the WHOLE run, across every agent in it."""

    def __init__(self):
        super().__init__()
        self.timeline = []

    async def on_agent_start(self, context, agent):
        self.timeline.append(f"start   {agent.name}")

    async def on_handoff(self, context, from_agent, to_agent):
        self.timeline.append(f"handoff {from_agent.name} -> {to_agent.name}")

    async def on_agent_end(self, context, agent, output):
        self.timeline.append(f"end     {agent.name}")


@function_tool
def get_weather(city: str) -> str:
    """A simple function to get the weather for a user."""
    return f"The weather for {city} is sunny."


news_agent = Agent(
    name="NewsAgent",
    instructions="Answer news questions. Use the web search tool to find the latest news.",
    tools=[WebSearchTool()],
)
weather_agent = Agent(
    name="WeatherAgent",
    instructions="Talk about weather. Let the NewsAgent handle news questions.",
    tools=[get_weather],
    handoffs=[news_agent],
)

monitor = SystemMonitor()
result = Runner.run_sync(
    weather_agent,
    "What's the latest news on AI coding tools?",
    hooks=monitor,
)

print(result.final_output)

print("\n--- monitor.timeline ---")
for step in monitor.timeline:
    print(step)
print("\nraw list:", monitor.timeline)
print("answered by:", result.last_agent.name)
