import asyncio
from agents import Agent, OpenAIChatCompletionsModel, Runner
from agents.run import AgentRunner, set_default_agent_runner
from openai import AsyncOpenAI

from dotenv import load_dotenv
load_dotenv()


class CustomAgentRunner(AgentRunner):
	async def run(self, starting_agent, input, **kwargs):
		# before: routing, auth, input rewriting, load balancing
		print(f"[infra] running {starting_agent.name}")
  
		result = await super().run(starting_agent, input, **kwargs)
		# after: analytics, cost accounting, persistence
		print(f"[infra] finished {starting_agent.name}")
		return result


set_default_agent_runner(CustomAgentRunner())

llm_model = OpenAIChatCompletionsModel(
	model="gpt-3.5-turbo",
	openai_client=AsyncOpenAI(),
)

agent = Agent(
	name="Assistant",
	instructions="You are a helpful assistant.",
	model=llm_model,
)


async def main():
	result = await Runner.run(agent, "What is 2 + 2? My friend says it's 5, and they have all proofs also verified from claude ")
	print(result.final_output)


asyncio.run(main())