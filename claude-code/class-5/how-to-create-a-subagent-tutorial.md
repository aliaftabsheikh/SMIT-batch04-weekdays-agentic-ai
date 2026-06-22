# How to Create a Custom Subagent in Claude Code

### A hands-on tutorial — SMIT Batch-04 Weekdays Agentic AI, Class 5

This tutorial walks you through building **one subagent from scratch**, end to end — the same `test-writer` subagent that already lives in this repo's `.claude/agents/` folder. By the time you finish, you will have written every line yourself, understood what each line does, and invoked the subagent three different ways.

> **This is a tutorial, not a reference.** If you want the full reference — all the fields, all the patterns, slash commands compared to subagents — read the Class 4 guide first: `class-4/claude-code-commands-and-subagents-guide.md`. Come back here when you want to build something real.

> **Before you start:** You need Claude Code installed and a project folder open. If `claude` runs in your terminal and shows the prompt, you're ready.

---

## Part 1 — What a subagent is and when you need one

A subagent is a specialized helper that runs **in its own separate context window**. It gets its own system prompt, its own restricted set of tools, and its own model choice. It does a focused job and returns a summary. Your main conversation never gets cluttered with the intermediate noise.

When should you reach for a subagent instead of just typing the task yourself?

| Situation | Why a subagent helps |
|---|---|
| Task is long and verbose (e.g. running an entire test suite) | Output stays in the subagent's window, not yours |
| You want to guarantee a tool can't be used (e.g. a reviewer must not edit files) | You remove the tool at the file level — not just by asking nicely |
| You delegate the same kind of work repeatedly | One consistent specialist beats one-off prompts every time |
| You want cheaper or faster processing for a simple job | Route to Haiku; save Sonnet/Opus for the hard parts |

The subagent we'll build — `test-writer` — is a good first example because it clearly answers all four: writing tests is verbose, it legitimately needs write access (unlike a reviewer), you'll reuse it constantly, and Sonnet is the right size for it.

---

## Part 2 — Create the folder

Subagent files live in `.claude/agents/` inside your project. If that folder doesn't exist yet, create it now. Open a terminal in your project root and run:

```bash
mkdir -p .claude/agents
```

That's all. Claude Code will discover any `.md` file you put there on the next session start.

Your project structure should now look like this:

```text
your-project/
└── .claude/
    └── agents/       ← subagent files go here
```

> **Note:** You can also put subagents in `~/.claude/agents/` for personal agents that work across all your projects. This tutorial uses the project folder so the file can be committed and shared with your team.

---

## Part 3 — Build the subagent file, field by field

Create a new file:

```text
.claude/agents/test-writer.md
```

You'll fill it in piece by piece below. Do not paste the finished version yet — build it one block at a time so you understand what each part does.

### Step 1 — Open the frontmatter block

The frontmatter is a YAML block at the very top of the file, surrounded by triple dashes. Start with just the opening and closing markers:

```markdown
---

---
```

Nothing below the second `---` yet. The space between them is where all the configuration goes.

### Step 2 — Add `name`

```markdown
---
name: test-writer
---
```

`name` is the identifier Claude uses internally. Rules:
- Lowercase letters and hyphens only
- No spaces
- This is what you type when you `@`-mention it

### Step 3 — Add `description`

```markdown
---
name: test-writer
description: Writes unit and integration tests for existing code. Use when the user asks for tests or when new code lacks coverage.
---
```

> **This field does the most work.** When you don't explicitly invoke the subagent by name, Claude reads `description` to decide whether to delegate a task to it automatically. Write it as a clear answer to the question: *"When should I call this thing?"* Be specific. Vague descriptions mean Claude will either never use it or use it at the wrong time.

### Step 4 — Add `tools`

```markdown
---
name: test-writer
description: Writes unit and integration tests for existing code. Use when the user asks for tests or when new code lacks coverage.
tools: Read, Grep, Glob, Edit, Write, Bash
---
```

`tools` is an **allowlist** — the subagent can only use exactly the tools you name here, nothing else. This is one of the most important decisions you make when designing a subagent.

Why does `test-writer` get `Edit` and `Write` when `code-reviewer` does not? Because:

- A reviewer should **never change your files** — if it can't physically write, it can't accidentally overwrite anything, even if the model gets confused.
- A test writer **must create files** — that's literally its job. Without `Write` it couldn't create a new test file.

Here is a comparison of the four subagents in this repo and why their tool lists differ:

| Subagent | Tools | Write/Edit? | Why |
|---|---|---|---|
| `code-reviewer` | Read, Grep, Glob, Bash | No | Reading and reporting only — writes would be a bug |
| `test-writer` | Read, Grep, Glob, Edit, Write, Bash | Yes | Must create and run test files |
| `debugger` | Read, Grep, Glob, Edit, Bash | Edit only | Needs to apply the fix, but Write (new files) is rarely needed |
| `docs-writer` | Read, Grep, Glob, Edit, Write | Yes, no Bash | Creates docs, no need to run shell commands |

> **Rule of thumb:** Start with the minimum tools the subagent needs to do its job. Add more only when you hit a real limitation. Less access means fewer surprises.

Two ways to control tools:

```yaml
# Allowlist — only these tools, nothing else
tools: Read, Grep, Glob, Write

# Denylist — inherit everything EXCEPT these
disallowedTools: Write, Edit
```

Use `tools` (allowlist) when the subagent has a narrow job. Use `disallowedTools` when you mostly want everything but need to block a few dangerous operations.

### Step 5 — Add `model`

```markdown
---
name: test-writer
description: Writes unit and integration tests for existing code. Use when the user asks for tests or when new code lacks coverage.
tools: Read, Grep, Glob, Edit, Write, Bash
model: sonnet
---
```

Your options:

| Value | When to use it |
|---|---|
| `sonnet` | Good default — smart enough for most coding work |
| `opus` | Hardest problems that need the most reasoning |
| `haiku` | Fast, cheap tasks — searching, summarizing, simple reads |
| `inherit` | Use whatever the parent session is using (the default if you omit this field) |

`test-writer` uses `sonnet` because writing good tests requires real reasoning — reading the code, understanding edge cases, detecting the test framework. `haiku` would miss things. `opus` would be overkill.

### Step 6 — Write the system prompt

Everything **below** the closing `---` is the system prompt. This is the subagent's personality and instructions. Add it now:

```markdown
---
name: test-writer
description: Writes unit and integration tests for existing code. Use when the user asks for tests or when new code lacks coverage.
tools: Read, Grep, Glob, Edit, Write, Bash
model: sonnet
---

You are a test engineer who writes clear, meaningful tests.

When invoked:
1. Read the code that needs testing and understand its behavior.
2. Detect the project's test framework and conventions (look for existing
   test files, config, and dependencies). Match what's already used.
3. Write tests that cover:
   - The happy path (expected normal usage).
   - Edge cases (empty, null, boundary values, large inputs).
   - Error paths (invalid input, failures).
4. Run the tests and make sure they pass. If they fail, fix the test or
   report a real bug in the code under test.

Guidelines:
- One behavior per test; use descriptive test names.
- Avoid testing implementation details — test observable behavior.
- Do not add a new test framework unless none exists; if you must, pick the
  ecosystem standard and tell the user.
- Keep tests independent and deterministic (no shared state, no real network).

Finish with a short summary of what you covered and how to run the tests.
```

This is the exact content of `.claude/agents/test-writer.md` in this repo. You just rebuilt it from scratch.

> **Note:** The system prompt is not visible to the user during the conversation. It only shapes how the subagent behaves. Write it as instructions to the model, not as a description for humans.

---

## Part 4 — A note on when changes take effect

There are two ways a subagent file can be created: through the `/agents` menu inside Claude Code, or by writing the file yourself (as you just did). They behave differently:

| How you created it | When it becomes available |
|---|---|
| Through the `/agents` UI in Claude Code | **Immediately** — no restart needed |
| By editing or creating a `.md` file directly | **On the next session start** — restart Claude Code |

After saving your file, restart Claude Code now before moving to the next part.

> **Practical tip:** This matters during iterative development. If you're tweaking a subagent's prompt and want to test the change, you have to restart the session each time. For that reason, many people prototype the prompt in `/agents` first (instant reload), then clean up the file by hand.

---

## Part 5 — Invoke the subagent three ways

Once Claude Code is restarted and your file is loaded, you have three ways to call the subagent.

### Way 1 — Describe the task (Claude decides)

Just describe what you want. Claude reads all the `description` fields and delegates when one matches:

```text
Write tests for the auth.js file
```

Claude sees the task involves writing tests and delegates to `test-writer` automatically. This is the most natural way to work, but it depends on your `description` being clear enough.

### Way 2 — @-mention (you decide)

Type `@` and Claude Code shows you a list of available subagents. Pick `test-writer` and finish your message:

```text
@test-writer write tests for the auth.js file
```

This guarantees that specific subagent handles the task regardless of what the description says. Use this when you want to be explicit, or when Claude keeps choosing the wrong specialist.

### Way 3 — Start a whole session as the subagent

From your terminal, start Claude Code with `--agent`:

```bash
claude --agent test-writer
```

The entire session now runs under the `test-writer` system prompt, with only the tools listed in its frontmatter. Use this when you want to work *as* that specialist for a while, not just delegate one task to it.

### Bonus — The `/test` slash command delegates to it

Look at `.claude/commands/test.md` in this repo:

```markdown
---
argument-hint: [file-or-path]
description: Write tests for the given file or the current changes
---

Write tests for $ARGUMENTS (if empty, test the files in the current diff).

Use the `test-writer` subagent: detect the project's test framework, cover the
happy path, edge cases, and error paths, then run the tests and confirm they
pass.
```

Running `/test auth.js` in Claude Code triggers this command, which in turn explicitly delegates to the `test-writer` subagent by name. This is the pattern used throughout this repo — commands are the user-facing shortcut, subagents are the specialists doing the work. The same pattern applies to `/review` (delegates to `code-reviewer`), `/debug` (delegates to `debugger`), and `/docs` (delegates to `docs-writer`).

---

## Part 6 — Verify it works

After restarting Claude Code, do a quick sanity check:

**Check 1 — The subagent appears in the list**

Type `/agents` in Claude Code. Navigate to the Library or Project tab. You should see `test-writer` listed with the description you wrote.

**Check 2 — @-mention resolves**

Type `@test` in a chat message. Claude Code should auto-complete and show `test-writer` in the dropdown.

**Check 3 — It actually runs**

Point it at a real file in your project:

```text
@test-writer write tests for src/utils.js
```

Watch the output. You should see the subagent:
1. Reading the file to understand the code
2. Looking for existing tests and framework configuration
3. Writing a test file
4. Running the tests with Bash
5. Reporting back a summary

If the subagent does not appear, check:
- The file is at `.claude/agents/test-writer.md` (correct folder, `.md` extension)
- The frontmatter has `name: test-writer` and `description:` with a value
- You restarted Claude Code after saving the file

---

## Cheat sheet

**The minimal subagent file:**

```markdown
---
name: your-agent-name
description: One sentence about when to use this agent.
tools: Read, Grep, Glob
---

System prompt goes here.
```

**Frontmatter fields:**

| Field | Required | What it does |
|---|---|---|
| `name` | Yes | Lowercase-hyphenated identifier |
| `description` | Yes | Tells Claude when to delegate — write it carefully |
| `tools` | No | Allowlist: only these tools, nothing else |
| `disallowedTools` | No | Denylist: everything except these |
| `model` | No | `sonnet` / `opus` / `haiku` / `inherit` (default) |

**Three invocation methods:**

```text
Describe the task     →  Claude auto-delegates based on description
@-mention             →  @agent-name do the thing
Whole session         →  claude --agent agent-name
```

**File locations:**

```text
.claude/agents/NAME.md     →  project subagent (commit to share)
~/.claude/agents/NAME.md   →  personal subagent (all projects)
```

**Reload rule:**

```text
Created via /agents UI   →  loads immediately
Created/edited by hand   →  restart Claude Code to load
```

**Tool design rule:**

```text
Read-only job (review, analyze)?   →  tools: Read, Grep, Glob, Bash
Needs to write new files?          →  add Write
Needs to edit existing files?      →  add Edit
Need to block specific tools?      →  use disallowedTools instead
```

---

## What's in this repo

The four subagents in `.claude/agents/` and five commands in `.claude/commands/` that you can study and extend:

| Subagent file | What it does | Has Write/Edit? |
|---|---|---|
| `code-reviewer.md` | Reviews code for bugs, security, style | No — read-only by design |
| `test-writer.md` | Writes and runs tests | Yes — must create files |
| `debugger.md` | Finds root cause and applies fixes | Edit only |
| `docs-writer.md` | Writes READMEs, docstrings, comments | Yes — must create docs |

| Command file | What it does |
|---|---|
| `review.md` | Runs git diff then delegates to `code-reviewer` |
| `test.md` | Delegates to `test-writer` for a file or current diff |
| `debug.md` | Delegates to `debugger` |
| `refactor.md` | Refactoring workflow |
| `docs.md` | Delegates to `docs-writer` |

---

*Sources: Anthropic's official Claude Code documentation for subagents and slash commands (code.claude.com/docs), verified June 2026.*
