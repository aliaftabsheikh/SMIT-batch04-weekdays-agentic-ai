"""Same two-agent handoff as runhook.py, but the hooks hang off ONE agent.

Run this next to runhook.py: identical agents, identical question, and a
noticeably shorter trail.
"""

from agents import Agent, AgentHooks, Runner, WebSearchTool, function_tool
from dotenv import load_dotenv

load_dotenv()


class AgentTrail(AgentHooks):
    """AgentHooks only ever hears about the ONE agent it is attached to."""

    def __init__(self):
        self.trail = []

    async def on_start(self, context, agent):
        self.trail.append(f"start   {agent.name}")

    async def on_handoff(self, context, agent, source):
        # In this SDK version the SOURCE agent's hooks get this callback:
        # `source` is me, `agent` is who I am handing the run to.
        self.trail.append(f"handoff {source.name} -> {agent.name}")

    async def on_end(self, context, agent, output):
        self.trail.append(f"end     {agent.name}")


@function_tool
def get_weather(city: str) -> str:
    """A simple function to get the weather for a user."""
    return f"The weather for {city} is sunny."


news_agent = Agent(
    name="NewsAgent",
    instructions="Answer news questions. Use the web search tool to find the latest news.",
    tools=[WebSearchTool()],
    # no hooks here on purpose
)

trail = AgentTrail()
weather_agent = Agent(
    name="WeatherAgent",
    instructions="Talk about weather. Let the NewsAgent handle news questions.",
    tools=[get_weather],
    handoffs=[news_agent],
    hooks=trail,  # <-- the only hooks in this whole script
)

result = Runner.run_sync(
    weather_agent,
    "What's the latest news on AI coding tools?",
)

print(result.final_output)

print("\n--- trail.trail (WeatherAgent's hooks only) ---")
for step in trail.trail:
    print(step)
print("<<< trail stops here >>>")

print("\nraw list:", trail.trail)
print("answered by:", result.last_agent.name)
print("model turns in the run:", len(result.raw_responses))
