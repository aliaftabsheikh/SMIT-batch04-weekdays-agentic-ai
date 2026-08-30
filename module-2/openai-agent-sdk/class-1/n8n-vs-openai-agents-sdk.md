# n8n vs OpenAI Agents SDK — A Detailed Guide

*Last updated: July 2026*

---

## 0. The one-line answer

**They are not competitors. They sit at different layers of the stack.**

- **n8n** is a *workflow automation platform* that happens to have AI agent nodes bolted on top of a visual canvas and 500+ pre-built integrations.
- **OpenAI Agents SDK** is a *code library* that gives you the agent loop, handoffs, guardrails, sessions, and tracing — and nothing else. No integrations, no UI, no scheduler, no database.

The honest framing for your students:

> n8n gives you **plumbing + a weak brain**. The Agents SDK gives you **a strong brain + no plumbing**.

Most production systems in 2026 end up using both.

---

## 1. Category difference (the part most tutorials get wrong)

| | n8n | OpenAI Agents SDK |
|---|---|---|
| **What it is** | Workflow automation platform (fair-code licensed) | Open-source Python/TypeScript library |
| **Primary artifact** | A JSON workflow you draw on a canvas | A Python/TS program you deploy |
| **Who it's for** | Ops teams, integrators, automation engineers | Backend/AI engineers |
| **Unit of work** | A *workflow execution* | A *run* (`Runner.run()`) |
| **Deployment** | You run the n8n server (self-host or cloud) | You deploy your own app |
| **Cost model** | Per workflow execution + LLM tokens | LLM tokens only (SDK is free) |
| **Lock-in** | Platform lock-in (workflow JSON is n8n-specific) | Low — <cite index="1-1">the SDK is provider-agnostic and works with 100+ non-OpenAI LLMs via the Chat Completions API</cite> |

The mental model I'd teach:

```
n8n            = Zapier + Make + LangChain, wrapped in a GUI
Agents SDK     = LangGraph's competitor, minus the graph abstraction
```

If you already know **LangGraph**, the Agents SDK is the "opinionated, fewer-primitives" version of the same idea. If you know **Make/Zapier**, n8n is the open-source, self-hostable, AI-native version of that.

---

## 2. Architecture: how each one actually executes

### n8n execution model

```
Trigger (webhook / cron / app event)
    │
    ▼
Node 1 ──► Node 2 ──► AI Agent Node ──► Node 4 ──► Node 5
                          │
                    ┌─────┼─────┬──────────┐
                    ▼     ▼     ▼          ▼
                  Chat  Memory Tool    Vector Store
                  Model Node   Nodes      Node
```

Key properties:

- **Data flows as items** (arrays of JSON objects). Every node receives `[{json: {...}}, ...]` and emits the same shape. This is n8n's core abstraction, and it's why n8n is great at batch/bulk work.
- **The AI Agent node is one node in a bigger graph.** The agent loop happens *inside* that node. Everything before and after it is deterministic workflow.
- **Sub-nodes** hang off the agent: Chat Model, Memory, Tool, Output Parser. This is the LangChain adapter layer under the hood.
- **State lives in n8n.** <cite index="13-1">n8n ships four memory node types for AI Agent workflows: in-memory (default, stores context within a single execution), Redis, Postgres, and Motorhead</cite>.

**2026 improvements worth knowing:** <cite index="13-1">The AI Agent node got its most substantial update in v1.28 (January 2026), adding structured tool calling that prevents infinite loops, four memory options, and a ReAct execution mode that shows intermediate reasoning steps in the execution log rather than only the final output.</cite> <cite index="11-1">The 2026 update also enforces JSON schema validation on every tool call response — if an LLM returns badly formatted data, n8n automatically retries before failing.</cite>

Also new: <cite index="12-1">n8n moved from single-agent execution to structured multi-agent orchestration — a central coordination agent that classifies intent and delegates to purpose-built sub-agents, each with its own memory context, tool access, and error handling</cite>. And <cite index="12-1">evaluation tooling that lets teams run regression tests against AI workflows, detect prompt drift, and compare model performance across versions</cite>.

---

### Agents SDK execution model

```
your_app.py
    │
    ▼
Runner.run(agent, input, session=...)
    │
    ├── input guardrails (parallel) ──► tripwire? → raise
    │
    ▼
  ┌─────────── agent loop ───────────┐
  │  LLM call                        │
  │    ├─ tool_call? → run tool ─────┤ (loop)
  │    ├─ handoff?   → switch agent ─┤ (loop)
  │    └─ final output? → exit       │
  └──────────────────────────────────┘
    │
    ▼
  output guardrails ──► tripwire? → raise
    │
    ▼
  RunResult (typed, via Pydantic)
```

<cite index="17-1">The runner performs the tool loop, switches agents after handoffs, and stops when the run finishes or pauses for approval.</cite>

**The five primitives** — this is genuinely the whole API surface:

1. **Agents** — an LLM with instructions + tools
2. **Handoffs / Agents-as-tools** — delegation between agents
3. **Guardrails** — <cite index="18-1">input validation and safety checks that run in parallel with agent execution and fail fast</cite>
4. **Sessions** — <cite index="18-1">a persistent memory layer for maintaining working context within an agent loop</cite>
5. **Tracing** — <cite index="18-1">built-in tracing for visualizing, debugging, and monitoring workflows</cite>

**The April 2026 release changed the game.** <cite index="9-1">OpenAI added native sandbox execution and a more capable model-native harness. Sandboxing lets agents operate in controlled, siloed computer environments — accessing only the files, tools, and code they need for a specific task. The new in-distribution harness is built to align with how frontier models perform best, improving reliability on long-running, multi-step, multi-tool tasks. A Manifest abstraction provides a consistent way to describe the agent's workspace, with support for AWS S3, Google Cloud Storage, Azure Blob Storage, and Cloudflare R2.</cite>

<cite index="7-1">It also includes configurable memory, sandbox-aware orchestration, Codex-like filesystem tools, and standardized integrations with agent system primitives including tool use via MCP and progressive disclosure via skills.</cite>

Caveats to flag: <cite index="9-1">the new capabilities launched first in Python, with TypeScript support planned for a future release</cite>, and <cite index="3-1">code mode and subagents are still being brought to both languages</cite>.

---

## 3. The same use case, built both ways

**Task:** A customer emails support. Classify the intent. If it's a refund request under $50, approve it and update the CRM. Otherwise escalate to a human on Slack.

### In n8n

```
[Gmail Trigger]
   → [AI Agent: classify intent]
        ├ Chat Model: GPT-5.4
        ├ Memory: Postgres
        └ Tool: HTTP Request → order lookup API
   → [Switch: intent]
        ├ "refund" → [IF: amount < 50]
        │              ├ true  → [HubSpot: update deal]
        │              │       → [Gmail: send confirmation]
        │              └ false → [Slack: post to #escalations]
        └ "other"  → [Slack: post to #support]
```

**Time to build:** ~45 minutes, mostly clicking. Zero lines of code except maybe a Code node for date formatting.

**What you get for free:** Gmail OAuth, HubSpot OAuth, Slack OAuth, retry logic, execution history, error workflows, a visual log of every run.

**What hurts:** The branching logic is now *pictures*. Version control is a JSON blob. Testing means clicking "Execute Workflow." Two engineers can't merge changes cleanly.

---

### In Agents SDK

```python
# pip install "openai-agents>=0.14.0"

from agents import Agent, Runner, function_tool, SQLiteSession
from agents import GuardrailFunctionOutput, input_guardrail
from pydantic import BaseModel

# ---------- typed output ----------
class Triage(BaseModel):
    intent: str          # "refund" | "billing" | "technical" | "other"
    order_id: str | None
    amount: float | None
    confidence: float

# ---------- tools ----------
@function_tool
def lookup_order(order_id: str) -> str:
    """Fetch order details from the internal orders API."""
    return orders_api.get(order_id)          # your code

@function_tool
def issue_refund(order_id: str, amount: float) -> str:
    """Issue a refund. Only call for amounts under 50 USD."""
    if amount >= 50:
        return "REFUSED: amount requires human approval"
    return billing.refund(order_id, amount)   # your code

@function_tool
def escalate(summary: str, channel: str = "#escalations") -> str:
    """Post an escalation to Slack."""
    return slack.post(channel, summary)       # your code

# ---------- guardrail ----------
class PIICheck(BaseModel):
    contains_card_number: bool

pii_agent = Agent(
    name="PII detector",
    instructions="Detect raw credit card numbers in the text.",
    output_type=PIICheck,
)

@input_guardrail
async def no_raw_cards(ctx, agent, input_data):
    result = await Runner.run(pii_agent, input_data, context=ctx.context)
    return GuardrailFunctionOutput(
        output_info=result.final_output,
        tripwire_triggered=result.final_output.contains_card_number,
    )

# ---------- specialists ----------
refund_agent = Agent(
    name="Refund specialist",
    instructions=(
        "Handle refunds. Look up the order first. "
        "Refund only if under $50, otherwise escalate with a clear summary."
    ),
    tools=[lookup_order, issue_refund, escalate],
)

general_agent = Agent(
    name="General support",
    instructions="Answer support questions. Escalate anything you can't resolve.",
    tools=[lookup_order, escalate],
)

# ---------- orchestrator ----------
triage_agent = Agent(
    name="Triage",
    instructions="Classify the customer email and hand off to the right specialist.",
    handoffs=[refund_agent, general_agent],
    input_guardrails=[no_raw_cards],
)

# ---------- run ----------
session = SQLiteSession(f"customer:{customer_id}")
result = await Runner.run(triage_agent, email_body, session=session)
print(result.final_output)
```

**Time to build:** ~3 hours, plus however long it takes to write `orders_api`, `billing`, and `slack` clients. Plus deployment. Plus a webhook receiver for the email trigger. Plus a database.

**What you get:** Real tests. Real git history. Typed outputs. Guardrails that run in parallel. Full tracing. Deploy anywhere. Swap the model provider.

---

That contrast *is* the whole comparison. Everything below is detail.

---

## 4. Feature-by-feature

| Capability | n8n | Agents SDK |
|---|---|---|
| **Multi-agent orchestration** | Orchestrator + sub-agent nodes on canvas | Handoffs + agents-as-tools |
| **Memory / sessions** | 4 memory nodes (in-memory, Redis, Postgres, Motorhead) | `Session` objects; you pick the backend |
| **Tool definition** | Drag a node, or MCP Client node | `@function_tool` decorator on any Python function, auto schema from type hints |
| **Structured output** | Output Parser sub-node | `output_type=PydanticModel` — enforced |
| **Guardrails** | Manual (IF nodes, validation nodes) | First-class, parallel, tripwire-based |
| **Human in the loop** | Wait node, approval nodes, Slack/email approvals | <cite index="17-1">Resumable approval flows — the run pauses for approval</cite> |
| **Code execution / sandbox** | Code node (JS/Python, limited) | <cite index="9-1">Native sandbox execution, siloed environments, Manifest workspace abstraction</cite> |
| **MCP** | <cite index="11-1">Both MCP client and MCP server — expose any workflow as a callable tool, or let agents discover external MCP tools</cite> | <cite index="18-1">Built-in MCP server tool calling that works the same way as function tools</cite> (client only) |
| **RAG / vector stores** | Native nodes: Pinecone, Qdrant, Weaviate, Supabase, PGVector | You wire it yourself, or use `FileSearchTool` |
| **Observability** | Execution list, execution replay debugger | Tracing dashboard, OTEL exporters, third-party integrations |
| **Evals** | <cite index="12-1">Built-in evaluation tooling for regression tests and prompt drift detection</cite> | OpenAI Evals integration |
| **Integrations** | 500+ nodes with OAuth handled | Zero. Write your own HTTP clients. |
| **Scheduling / triggers** | Cron, webhook, 200+ app triggers | Zero. Bring FastAPI + Celery. |
| **Version control** | Git sync (paid tiers), JSON diffs are painful | Native — it's just code |
| **Testing** | Manual execution, limited unit testing | pytest, mocks, CI — normal software testing |
| **Model flexibility** | Any provider via chat model nodes, incl. Ollama | <cite index="1-1">100+ LLMs via Chat Completions</cite>, or LiteLLM |

---

## 5. Where n8n genuinely wins

1. **Integration surface.** You will not out-build 500 OAuth integrations. If the task is "when a Stripe payment fails, check the CRM, ask an LLM to draft an apology, send via Gmail, log to Notion" — n8n does that in 20 minutes and the SDK does it in two days.

2. **Non-engineers can maintain it.** Your ops person can look at the canvas and understand it. Nobody's ops person can read `RunContextWrapper[AppContext]`.

3. **Batteries-included infrastructure.** Retries, queues, cron, credential vault, execution history, error workflows. All of that is *your* problem with the SDK.

4. **Speed of iteration for prototypes.** Client demo on Thursday? n8n.

5. **Self-hosting with data residency.** <cite index="16-1">The Self-Hosted AI Starter Kit v2 ships pre-packaged local vector databases (Qdrant/Milvus) and Ollama optimizations to run models locally.</cite> For regulated clients who can't send data anywhere, this matters a lot.

6. **Deterministic scaffolding around a small AI core.** Honestly this is the best use of n8n: 90% deterministic nodes, one AI node doing the fuzzy bit.

---

## 6. Where the Agents SDK genuinely wins

1. **Anything with real branching complexity.** Once your agent logic has more than ~10 decision points, the canvas becomes unreadable and the code becomes *more* readable.

2. **Testing and CI.** You cannot meaningfully unit-test an n8n workflow. You can absolutely unit-test an agent, mock its tools, and assert on typed outputs.

3. **Team collaboration.** Git, PRs, code review, semantic diffs. n8n workflow JSON merge conflicts are a genuine operational hazard.

4. **Long-horizon autonomous tasks.** <cite index="2-1">The harness and sandbox are specifically built for agents that inspect files, run commands, edit code, and work on long-horizon tasks.</cite> n8n's agent node is designed for request/response, not for a 40-minute autonomous session.

5. **Cost at scale.** n8n charges per workflow execution. A high-volume agent (millions of runs) gets expensive on a platform, and free on a library.

6. **Custom control flow.** Retry with a different model, dynamic tool selection based on user tier, custom context compaction, streaming partial results to a frontend — all trivial in code, all awkward or impossible on canvas.

7. **Portability.** Your agent code runs on Lambda, ECS, a VPS, or a Raspberry Pi. Your n8n workflow runs on n8n.

---

## 7. The hybrid pattern (what I'd actually build)

This is the most important section, and it's the one your students should walk away with.

Because <cite index="11-1">n8n can act as an MCP server, you can expose any n8n workflow as a callable tool to external AI clients</cite>, the two products compose cleanly:

```
┌──────────────────────────────────────────────┐
│  Your app (Python)                           │
│                                              │
│  Agents SDK                                  │
│   ├─ triage_agent                            │
│   ├─ specialist_agents                       │
│   ├─ guardrails                              │
│   ├─ sessions (Postgres)                     │
│   └─ tools:                                  │
│       ├─ @function_tool (your core logic)    │
│       └─ MCP client ────────────┐            │
└─────────────────────────────────┼────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │  n8n (MCP Server Trigger)│
                    │                          │
                    │  workflow: send_invoice  │
                    │  workflow: update_crm    │
                    │  workflow: post_to_slack │
                    │  workflow: sync_sheets   │
                    └──────────────────────────┘
```

**Division of labour:**

| Concern | Owner |
|---|---|
| Reasoning, planning, orchestration | Agents SDK |
| Guardrails, safety, typed contracts | Agents SDK |
| Session memory, tracing, evals | Agents SDK |
| SaaS integrations + OAuth | n8n |
| Cron/scheduled jobs | n8n |
| Long-running deterministic ETL | n8n |

You get the SDK's testability and the platform's integration surface. The n8n workflows become **dumb, deterministic, single-purpose tools** — which is exactly what they're good at — and the intelligence stays in code where you can test it.

**This is the architecture I'd recommend for most serious 2026 builds.**

---

## 8. Decision framework

Ask these in order:

**Q1 — Is the AI part more than ~30% of the system's logic?**
No → n8n. You have an automation with a sprinkle of LLM.
Yes → continue.

**Q2 — Will this be maintained by engineers or by ops people?**
Ops → n8n.
Engineers → continue.

**Q3 — Does it need to run autonomously for more than a couple of minutes, touch a filesystem, or execute code?**
Yes → Agents SDK (the sandbox/harness is built for exactly this).
No → continue.

**Q4 — Do you need >5 third-party SaaS integrations?**
Yes → hybrid (SDK brain + n8n MCP tools).
No → continue.

**Q5 — Does it need real tests and CI?**
Yes → Agents SDK.
No → n8n is fine, ship it.

**Q6 — Volume above ~100k runs/month?**
Yes → Agents SDK (execution-based pricing bites).
No → either.

---

## 9. Cost model

**n8n**
- Cloud: priced per *workflow execution*. <cite index="12-1">You pay for complete workflow runs, not individual task calls.</cite>
- Self-hosted community edition: free, you pay for the VPS. This is what most of your students should use.
- Plus LLM tokens on top.
- Hidden cost: an agent that loops 8 times still counts as one execution, but burns 8× tokens.

**Agents SDK**
- SDK: free, MIT-licensed.
- <cite index="3-1">The new sandbox and harness capabilities are offered to all customers via the API at standard pricing</cite> — <cite index="9-1">no separate tier required</cite>.
- You pay: tokens + your own compute + your own database + your own engineering time.
- Hidden cost: **engineering time is the real bill.** A three-week SDK build vs. a two-day n8n build is a $10k+ difference at contractor rates. Factor that in before evangelizing "code is cheaper."

---

## 10. Common misconceptions to correct in class

**"n8n is just for no-coders."**
Wrong. n8n has Code nodes, custom nodes, sub-workflows, and a full API. Some of the most complex production automations I've seen are n8n. The limitation is *maintainability at complexity*, not capability.

**"The Agents SDK locks you into OpenAI."**
No longer true. <cite index="1-1">It's provider-agnostic and works with 100+ non-OpenAI LLMs.</cite> Tracing is the piece that's still OpenAI-flavoured, and you can swap in OTEL exporters.

**"You should pick one."**
The hybrid is the mature answer. Teach the hybrid.

**"Agents SDK replaces LangGraph."**
Different philosophies. LangGraph gives you an explicit state graph — better when you need precise control over cycles, checkpointing, and complex state transitions. The Agents SDK hides the graph behind handoffs — better when your topology is "specialists delegating to specialists." Given your LangGraph background: LangGraph = imperative graph, Agents SDK = declarative delegation. Neither replaces the other.

**"n8n's agent node is a toy."**
It was in 2024. <cite index="13-1">The v1.28 update fixed the infinite-loop problem with structured tool calling, added four memory backends, and added ReAct mode with visible intermediate reasoning.</cite> It's serviceable now for bounded tasks.

---

## 11. Suggested teaching sequence

If you're building a module around this:

1. **Week 1 — n8n basics.** Build a non-AI automation. Teach the item model, the canvas, credentials, error handling. No LLM yet.
2. **Week 2 — n8n AI Agent node.** Add the agent, memory sub-node, one tool. Show them a ReAct trace. Show them it failing.
3. **Week 3 — Agents SDK from zero.** Same use case, in code. Let them feel the pain of writing the Gmail client.
4. **Week 4 — Guardrails, handoffs, typed outputs, sessions.** Show what the code buys you that the canvas can't.
5. **Week 5 — The hybrid.** n8n as MCP server, SDK as MCP client. This is the payoff lecture.
6. **Week 6 — Evals and observability.** Both sides. Show them that "it worked in the demo" is not shipping.

**Assessment idea:** Give them a spec with 12 requirements. Three of them (real tests, git-based collaboration, dynamic model routing by user tier) are effectively impossible in pure n8n. Three others (Gmail + HubSpot + Slack OAuth) are miserable in pure SDK. The passing submission is the hybrid. Students who reach for one tool will hit a wall around requirement 8 — which is the actual lesson.

---

## 12. Quick reference card

```
CHOOSE n8n WHEN:
  ✓ Heavy SaaS integration requirements
  ✓ Ops team owns maintenance
  ✓ Prototype / client demo speed matters
  ✓ Deterministic workflow with a small AI step
  ✓ Self-hosting for data residency
  ✓ Low-to-medium volume

CHOOSE AGENTS SDK WHEN:
  ✓ Complex reasoning is the core product
  ✓ Engineers own maintenance
  ✓ Tests, CI, and code review are required
  ✓ Long-horizon / sandboxed / file-touching tasks
  ✓ High volume
  ✓ Model portability matters
  ✓ Custom control flow (streaming, routing, compaction)

CHOOSE BOTH WHEN:
  ✓ You want to ship something that survives contact
    with production   ← this is most real projects
```

---

## Sources worth reading directly

- OpenAI Agents SDK docs (Python): `openai.github.io/openai-agents-python`
- OpenAI "The next evolution of the Agents SDK" (April 2026) — sandbox + harness announcement
- n8n release notes / changelog — the AI Agent node history from v1.28 onward
- n8n MCP Server Trigger docs — the key to the hybrid pattern
