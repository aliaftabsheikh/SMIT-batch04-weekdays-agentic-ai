from agents import (
	Agent,
	Runner,
	GuardrailFunctionOutput,
	RunContextWrapper,
	input_guardrail,
	InputGuardrailTripwireTriggered,
)

from dotenv import load_dotenv
load_dotenv()


@input_guardrail
async def homework_check(
	ctx: RunContextWrapper, agent: Agent, user_input
) -> GuardrailFunctionOutput:
	text = user_input if isinstance(user_input, str) else str(user_input)
	return GuardrailFunctionOutput(
		output_info={"checked": True},
		tripwire_triggered="homework" in text.lower(),
	)


tutor = Agent(
	name="Tutor",
	instructions="Explain concepts. Never complete assignments.",
	input_guardrails=[homework_check],
)


try:
	result = Runner.run_sync(tutor, "plan my trip for lahore")
	print(result.final_output)
except InputGuardrailTripwireTriggered as e:
	print("Blocked before the model ran:", e.guardrail_result.output.output_info)