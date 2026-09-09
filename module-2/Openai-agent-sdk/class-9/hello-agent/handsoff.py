import asyncio
from unittest import result
from agents import Agent, Runner, handoff
from dotenv import load_dotenv

load_dotenv()

llm_model = "gpt-4o-mini"

fitness_coach = Agent(
	name="Fitness Coach",
	instructions=(
		"You're a running coach. Ask 1-2 quick questions, then give a week plan. "
		"Keep it simple and encouraging. No medical advice."
	),
	model=llm_model,
)
study_coach = Agent(
	name="Study Coach",
	instructions=(
		"You're a study planner. Ask for the current routine, then give a "
		"one-week schedule. Keep steps small and doable."
	),
	model=llm_model,
)
router = Agent(
	name="Coach Router",
	instructions=(
		"Route the user:\n"
		"- running, workout, stamina -> hand off to the Fitness Coach.\n"
		"- exams, study plan, focus, notes -> hand off to the Study Coach.\n"
		"After the handoff the specialist continues the conversation."
	),
	model=llm_model,
	handoffs=[study_coach, handoff(fitness_coach)],
)

async def main():
	result = await Runner.run(router, "I want to run 5km in 8 weeks. Can you help?")
	print(result.final_output)
	print("answered by:", result.last_agent.name)
 
	follow_up = result.to_input_list() + [
		{"role": "user", "content": "Right now I jog about 2 km, 3 days a week."}
]
	second = await Runner.run(result.last_agent, follow_up)
	print(second.final_output)
 
	# print("\n---\n")

	# print("Runner response--->", result.to_input_list())

	# print("\n---\n")

	# result = await Runner.run(router, "I have exams next week. Can you help me study?")
	# print(result.final_output)
	# print("answered by:", result.last_agent.name)

asyncio.run(main())