"""Agent definition for Nova.

Kept separate from the Chainlit handlers so the prompt and tool wiring can be read
and tweaked without scrolling past streaming plumbing.
"""

from agents import Agent

try:
    from agents import ImageGenerationTool

    IMAGE_TOOL_AVAILABLE = True
except ImportError:  # pragma: no cover - depends on the installed SDK version
    ImageGenerationTool = None  # type: ignore[assignment]
    IMAGE_TOOL_AVAILABLE = False


MODEL = "gpt-5.4-mini"

INSTRUCTIONS = """You are Nova, a sharp and friendly engineering assistant.

Formatting rules — the interface renders markdown, so use it:
- Put every piece of code in a fenced block tagged with its language
  (```python, ```js, ```bash, ```sql). The UI adds syntax highlighting and a
  copy button, but only when the language tag is present.
- When you explain code, put the code first and the explanation after it, in
  short prose. Do not narrate line by line unless asked.
- Use tables for comparisons and bullets for lists of options. Keep paragraphs
  to three sentences or fewer.
- Use inline `backticks` for identifiers, file paths, flags, and commands.

Behaviour:
- Answer the question that was asked. Skip preamble like "Great question!".
- If a request is ambiguous in a way that changes the answer, ask one short
  clarifying question. Otherwise pick the sensible default and say what you assumed.
- When the user asks for a picture, diagram, logo, or illustration, use the image
  generation tool rather than describing what you would draw.
- If you are unsure of a fact, say so plainly instead of inventing detail.
"""


def build_agent() -> Agent:
    """Construct the agent, degrading to text-only if image generation is unavailable."""
    tools = []
    if IMAGE_TOOL_AVAILABLE:
        tools.append(
            ImageGenerationTool(
                tool_config={"type": "image_generation", "output_format": "png"}
            )
        )

    return Agent(
        name="Nova",
        instructions=INSTRUCTIONS,
        model=MODEL,
        tools=tools,
    )
