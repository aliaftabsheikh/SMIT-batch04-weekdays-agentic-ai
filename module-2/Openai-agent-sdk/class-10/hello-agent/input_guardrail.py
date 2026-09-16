import re

from agents import (
	Agent,
	Runner,
	GuardrailFunctionOutput,
	RunContextWrapper,
	input_guardrail,
	output_guardrail,
	InputGuardrailTripwireTriggered,
	OutputGuardrailTripwireTriggered,
)
from pydantic import BaseModel


from dotenv import load_dotenv
load_dotenv()


# @input_guardrail
# async def homework_check(
# 	ctx: RunContextWrapper, agent: Agent, user_input
# ) -> GuardrailFunctionOutput:
# 	text = user_input if isinstance(user_input, str) else str(user_input)
# 	return GuardrailFunctionOutput(
# 		output_info={"checked": True},
# 		tripwire_triggered="homework" in text.lower(),
# 	)


# tutor = Agent(
# 	name="Tutor",
# 	instructions="Explain concepts. Never complete assignments.",
# 	input_guardrails=[homework_check],
# )


# try:
# 	result = Runner.run_sync(tutor, "plan my trip for lahore")
# 	print(result.final_output)
# except InputGuardrailTripwireTriggered as e:
# 	print("Blocked before the model ran:", e.guardrail_result.output.output_info)





class WeatherCheck(BaseModel):
	weather_related: bool
	reason: str | None = None


weather_sanitizer = Agent(
	name="WeatherSanitizer",
	instructions="Decide whether the user's message is a weather question.",
	model="gpt-4o-mini",
	output_type=WeatherCheck,
)


@input_guardrail(run_in_parallel=False)
async def weather_only(
	ctx: RunContextWrapper, agent: Agent, user_input
) -> GuardrailFunctionOutput:
	# run_in_parallel=False is what makes the message below honest. The default is
	# True, which runs this guardrail *alongside* the first model call - the tripwire
	# still raises, but the agent's request has already gone out.
	res = await Runner.run(weather_sanitizer, user_input)
	return GuardrailFunctionOutput(
		output_info=res.final_output.reason,
		tripwire_triggered=not res.final_output.weather_related,
	)


# ---------------------------------------------------------------------------
# OUTPUT GUARDRAILS
# Input guardrails guard what goes in; output guardrails guard what comes out.
# They run on the FINAL output only, after the agent has already produced it -
# so unlike an input guardrail they cannot save you the model call. Their job is
# to stop a bad answer from reaching the user.
# ---------------------------------------------------------------------------

CONTACT_PATTERN = re.compile(r"[\w.+-]+@[\w-]+\.[\w.]+|\+?\d[\d\s-]{8,}\d")


@output_guardrail(name="no_contact_info")
def no_contact_info(
	ctx: RunContextWrapper, agent: Agent, agent_output
) -> GuardrailFunctionOutput:
	"""Deterministic: no model call, so it costs nothing and never flakes."""
	text = agent_output if isinstance(agent_output, str) else str(agent_output)
	leaks = CONTACT_PATTERN.findall(text)
	return GuardrailFunctionOutput(
		output_info={"leaked": leaks, "reason": "answer contained an email or phone number"},
		tripwire_triggered=bool(leaks),
	)


class AnswerCheck(BaseModel):
	on_topic: bool
	reason: str | None = None


answer_auditor = Agent(
	name="AnswerAuditor",
	instructions=(
		"You are given an assistant's answer. Decide whether it stays on the topic "
		"of weather. Anything else - prices, politics, medical or financial advice - "
		"is off topic."
	),
	model="gpt-4o-mini",
	output_type=AnswerCheck,
)


@output_guardrail(name="weather_answer_only")
async def weather_answer_only(
	ctx: RunContextWrapper, agent: Agent, agent_output
) -> GuardrailFunctionOutput:
	"""Model-based: catches drift a regex can't, but costs one extra call per answer."""
	res = await Runner.run(answer_auditor, str(agent_output))
	return GuardrailFunctionOutput(
		output_info={"reason": res.final_output.reason or "answer drifted off weather"},
		tripwire_triggered=not res.final_output.on_topic,
	)


weather_agent = Agent(
	name="WeatherAgent",
	instructions="Only answer weather-related questions.",
	model="gpt-4o-mini",
	input_guardrails=[weather_only],
	output_guardrails=[no_contact_info, weather_answer_only],
)


# Same guardrails, but its instructions push it into leaking a contact address,
# so the deterministic output guardrail has something to catch.
leaky_agent = weather_agent.clone(
	name="LeakyWeatherAgent",
	instructions=(
		"Answer weather questions. Always end your answer with our support address "
		"alerts@weatherdesk.example.com so the user can subscribe."
	),
)


def ask(agent: Agent, question: str) -> None:
	print(f"\n>>> [{agent.name}] {question}")
	try:
		result = Runner.run_sync(agent, question)
		print(f"<<< {result.final_output}")
	except InputGuardrailTripwireTriggered as exception:
		print("<<< Blocked before the model ran:", exception.guardrail_result.output.output_info)
	except OutputGuardrailTripwireTriggered as exception:
		info = exception.guardrail_result.output.output_info
		print(f"<<< Answer withheld by '{exception.guardrail_result.guardrail.get_name()}':", info)
		# The answer exists - it was generated and billed - it just never reaches the user.
		print("    (suppressed draft:", repr(exception.guardrail_result.agent_output)[:80], "...)")


if __name__ == "__main__":
	ask(weather_agent, "Current petrol price in pakistan?")   # input tripwire
	ask(weather_agent, "Will it rain in Karachi tomorrow?")   # passes both gates
	ask(leaky_agent, "Will it rain in Karachi tomorrow?")     # output tripwire
