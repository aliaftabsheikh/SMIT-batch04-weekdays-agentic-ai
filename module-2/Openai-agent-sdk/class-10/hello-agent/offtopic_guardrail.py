"""Deterministic (model-free) input guardrail + proof from the trace that a
blocked request never reached a model.

Two things make the "no model call" claim actually true:

1. The guardrail function is pure Python - no Runner.run, no LLM.
2. run_in_parallel=False. This matters: in openai-agents 0.20 the default is
   True, which runs the guardrail *concurrently* with the first model call. The
   tripwire still raises either way, but with a guardrail that takes real time
   (e.g. an LLM-based one) the model request is already in flight - measured:
   a 2s parallel guardrail produced a `response` span in the trace even though
   the tripwire tripped. run_in_parallel=False makes the guardrail a true gate:
   it finishes before the agent starts, so no request is ever issued.
"""

from agents import (
    Agent,
    Runner,
    GuardrailFunctionOutput,
    RunContextWrapper,
    input_guardrail,
    InputGuardrailTripwireTriggered,
)
from agents.tracing import Span, Trace, TracingProcessor, add_trace_processor, trace

from dotenv import load_dotenv

load_dotenv()


# --------------------------------------------------------------------------
# 1. A trace recorder, so we can read the trace from inside the program
# --------------------------------------------------------------------------
class SpanLedger(TracingProcessor):
    """Records every span the SDK emits, keyed by trace."""

    def __init__(self):
        self.traces: dict[str, dict] = {}
        self.completed: list[str] = []

    def on_trace_start(self, t: Trace) -> None:
        self.traces[t.trace_id] = {"name": t.name, "spans": []}

    def on_trace_end(self, t: Trace) -> None:
        self.completed.append(t.trace_id)

    def on_span_start(self, span: Span) -> None:
        pass

    def on_span_end(self, span: Span) -> None:
        self.traces.setdefault(span.trace_id, {"name": "?", "spans": []})
        self.traces[span.trace_id]["spans"].append(span)

    def shutdown(self) -> None:
        pass

    def force_flush(self) -> None:
        pass

    def report(self, label: str) -> None:
        """Print the span ledger of the most recently finished trace."""
        trace_id = self.completed[-1]
        recorded = self.traces[trace_id]

        print(f"\n=== TRACE PROOF: {label} ===")
        print(f"trace_id: {trace_id}")
        print(f"dashboard: https://platform.openai.com/traces/trace?trace_id={trace_id}")

        billed_spans, requests, in_tok, out_tok = [], 0, 0, 0
        for span in recorded["spans"]:
            data = span.span_data
            line = f"  [{data.type:<9}] {getattr(data, 'name', '') or ''}"
            if data.type == "guardrail":
                line += f" triggered={data.triggered}"
            if data.type in ("response", "generation"):
                billed_spans.append(span)
                usage = getattr(data, "usage", None) or {}
                requests += usage.get("requests", 1)
                in_tok += usage.get("input_tokens", 0)
                out_tok += usage.get("output_tokens", 0)
                model = getattr(data, "model", None) or getattr(
                    getattr(data, "response", None), "model", None
                )
                line += f" model={model} usage={usage}"
            print(line)

        print(f"  ---> model spans: {len(billed_spans)} | API requests: {requests}"
              f" | tokens in/out: {in_tok}/{out_tok}")
        if not billed_spans:
            print("  ---> VERDICT: no response/generation span in this trace."
                  " Nothing was sent to a model, so nothing was billed.")
        else:
            print("  ---> VERDICT: a model call happened in this trace.")


ledger = SpanLedger()
add_trace_processor(ledger)  # added alongside the default OpenAI exporter


# --------------------------------------------------------------------------
# 2. The guardrail: plain Python, zero model calls
# --------------------------------------------------------------------------
WEATHER_TERMS = {
    "weather", "forecast", "temperature", "rain", "raining", "snow", "storm",
    "humidity", "wind", "windy", "sunny", "cloudy", "hot", "cold", "climate",
    "monsoon", "heatwave", "umbrella",
}


@input_guardrail(name="off_topic_filter", run_in_parallel=False)
def weather_only(
    ctx: RunContextWrapper, agent: Agent, user_input
) -> GuardrailFunctionOutput:
    text = user_input if isinstance(user_input, str) else str(user_input)
    words = {w.strip(".,!?'\"").lower() for w in text.split()}
    hits = words & WEATHER_TERMS

    return GuardrailFunctionOutput(
        output_info={
            "matched_terms": sorted(hits),
            "reason": "on-topic" if hits else "no weather keyword found in the request",
        },
        tripwire_triggered=not hits,
    )


weather_agent = Agent(
    name="WeatherAgent",
    instructions="Answer weather questions briefly and plainly.",
    model="gpt-4o-mini",
    input_guardrails=[weather_only],
)


# --------------------------------------------------------------------------
# 3. Ask politely instead of crashing
# --------------------------------------------------------------------------
def ask(question: str, label: str) -> None:
    print(f"\n>>> user: {question}")
    with trace(label):
        try:
            result = Runner.run_sync(weather_agent, question)
            print(f"<<< agent: {result.final_output}")
        except InputGuardrailTripwireTriggered as exc:
            info = exc.guardrail_result.output.output_info
            print("<<< agent: Sorry, I can only help with weather questions. "
                  f"I couldn't answer that one ({info['reason']}).")
    ledger.report(label)


if __name__ == "__main__":
    ask("Current petrol price in Pakistan?", "blocked off-topic request")
    ask("Will it rain in Karachi tomorrow?", "allowed weather request")
