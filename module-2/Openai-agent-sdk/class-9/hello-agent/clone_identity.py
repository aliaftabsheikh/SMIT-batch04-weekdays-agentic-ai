"""Class 5 - Agent.clone() is a SHALLOW copy.

Run:  uv run clone_identity.py
Nothing here calls the model, so no API key / network is needed.
"""

from dataclasses import replace

from agents import Agent, ModelSettings, function_tool


@function_tool
def get_weather(city: str) -> str:
    """Get the current weather for a given city."""
    return f"The weather in {city} is sunny."


# ---------------------------------------------------------------- base agent
base = Agent(
    name="BaseAgent",
    instructions="You are a helpful assistant.",
    tools=[get_weather],
    model_settings=ModelSettings(temperature=0.7),
)

# ------------------------------------------------------------------- clones
# Only what we pass to clone() is replaced; everything else is copied BY
# REFERENCE (dataclasses.replace under the hood).
creative = base.clone(
    name="CreativeVariant",
    model_settings=replace(base.model_settings, temperature=1.4),
)

precise = base.clone(
    name="PreciseVariant",
    instructions="You are a precise assistant. Answer in one short sentence.",
    model_settings=replace(base.model_settings, temperature=0.1),
)

plain = base.clone()  # no overrides at all -> maximum sharing


def row(label: str, a, b) -> None:
    same = a is b
    mark = "SHARED    " if same else "NOT shared"
    print(f"  {label:<34} {mark}  ({id(a)} vs {id(b)})")


def report(title: str, clone: Agent) -> None:
    print(f"\n{title}")
    row("agent object", base, clone)
    row("name", base.name, clone.name)
    row("instructions", base.instructions, clone.instructions)
    row("model_settings", base.model_settings, clone.model_settings)
    row("tools (the list)", base.tools, clone.tools)
    row("tools[0] (the tool itself)", base.tools[0], clone.tools[0])
    row("handoffs (the list)", base.handoffs, clone.handoffs)
    row("input_guardrails (the list)", base.input_guardrails, clone.input_guardrails)
    row("output_guardrails (the list)", base.output_guardrails, clone.output_guardrails)
    row("mcp_servers (the list)", base.mcp_servers, clone.mcp_servers)


print("=" * 78)
print("1. WHAT IS SHARED BETWEEN base AND ITS CLONES  (`is` comparisons)")
print("=" * 78)
report("base  vs  plain    = base.clone()", plain)
report("base  vs  creative = base.clone(name=..., model_settings=...)", creative)
report("base  vs  precise  = base.clone(name=..., instructions=..., model_settings=...)", precise)

print("\n" + "=" * 78)
print("2. TEMPERATURES (values differ, but only because we passed new objects)")
print("=" * 78)
for a in (base, plain, creative, precise):
    print(f"  {a.name:<16} temperature={a.model_settings.temperature}")

print("\n" + "=" * 78)
print("3. THE GOTCHA: the tools LIST object is shared, so mutating it leaks")
print("=" * 78)


@function_tool
def get_time(city: str) -> str:
    """Get the current time for a given city."""
    return f"It is 5pm in {city}."


print(f"  before: base={len(base.tools)}  creative={len(creative.tools)}  precise={len(precise.tools)}")
base.tools.append(get_time)          # mutating IN PLACE
print(f"  after base.tools.append(get_time):")
print(f"          base={len(base.tools)}  creative={len(creative.tools)}  precise={len(precise.tools)}")
print("  -> every clone grew a tool it was never given.")

print("\n" + "=" * 78)
print("4. THE FIX: pass a NEW list to clone() to break the sharing")
print("=" * 78)
isolated = base.clone(name="Isolated", tools=[get_weather])
row("tools (the list)", base.tools, isolated.tools)
row("tools[0] (the tool itself)", base.tools[0], isolated.tools[0])
print("  -> new list object, but the SAME tool objects inside it (still shallow).")

print("\n" + "=" * 78)
print("RULE OF THUMB: clone() gives you a new Agent whose fields point at the")
print("SAME objects, except the ones you explicitly override. Replace, never mutate.")
print("=" * 78)
