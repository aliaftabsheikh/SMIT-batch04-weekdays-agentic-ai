# Connect Claude Code to n8n with MCP — A Beginner's Step-by-Step Guide

> **Goal of this tutorial:** By the end, Claude Code will be connected directly to your n8n instance and able to *read, understand, and modify your workflows for you* — through plain-English instructions, without you clicking around inside n8n node by node.

This guide is written for beginners. Every step is spelled out. If you have never used an MCP before, that's fine — we explain what it is and why it matters as we go.

---

## Table of Contents

1. [What you're going to build](#1-what-youre-going-to-build)
2. [What an MCP actually is (plain English)](#2-what-an-mcp-actually-is)
3. [Prerequisites](#3-prerequisites)
4. [Step 1 — Install VS Code and the Claude Code extension](#step-1--install-vs-code-and-the-claude-code-extension)
5. [Step 2 — Create your project folder](#step-2--create-your-project-folder)
6. [Step 3 — Gather your credentials (n8n + GitHub)](#step-3--gather-your-credentials)
7. [Step 4 — Connect the MCP servers (mcp.json)](#step-4--connect-the-mcp-servers)
8. [Step 5 — Write a CLAUDE.md so Claude knows the rules](#step-5--write-a-claudemd)
9. [Step 6 — Understand Plan Mode vs Auto-Edit Mode](#step-6--plan-mode-vs-auto-edit-mode)
10. [Step 7 — Ask Claude to find and audit a workflow](#step-7--find-and-audit-a-workflow)
11. [Step 8 — Let Claude make the changes](#step-8--let-claude-make-the-changes)
12. [Step 9 — Edit a workflow's system prompt through Claude](#step-9--edit-a-workflows-system-prompt-through-claude)
13. [Step 10 — Verify the change actually landed](#step-10--verify-the-change)
14. [Security best practices](#security-best-practices)
15. [Common problems and fixes](#common-problems-and-fixes)
16. [Where to go next](#where-to-go-next)

---

## 1. What you're going to build

Most people build n8n workflows by dragging nodes around in the browser. That works, but it's slow, and it means *you* have to know exactly which node to change and how.

In this tutorial we flip that around. We give Claude Code a secure connection into your n8n instance so it can:

- **List and search** the workflows in your account
- **Read** any workflow's node structure, connections, and configuration
- **Modify** a workflow — swap a trigger, add a node, rewire connections, change a system prompt
- **Save and re-publish** the updated workflow back to n8n

You'll be able to say something like *"Look at my Fitness Coach workflow and get it ready to talk to a web app"* and Claude will do the work — while explaining what it's doing.

That connection is made possible by something called an **MCP**.

---

## 2. What an MCP actually is

**MCP** stands for *Model Context Protocol*. Think of it as a **standard adapter** that lets Claude talk to an outside tool.

An analogy: Claude on its own is like a very smart assistant sitting in a locked room. It can think and write, but it can't touch your apps. An MCP is a **doorway with a keycard** — it lets Claude reach out to a specific service (n8n, GitHub, etc.), but only in the ways that service allows.

For this tutorial we use two MCPs:

| MCP | What it lets Claude do |
|-----|------------------------|
| **n8n MCP** | Search, read, and edit workflows on your n8n instance |
| **GitHub MCP** *(optional)* | Push project code to a GitHub repository |

We also use **Skills**, which are bundles of best-practice instructions Claude loads on demand — for example an *n8n skill* that teaches Claude how n8n nodes and connections are structured, so it edits them correctly.

> **The one-line mental model:** *Skills* teach Claude *how* to do something well. *MCPs* give Claude the *ability* to reach out and actually do it.

---

## 3. Prerequisites

Before you start, make sure you have:

- A running **n8n instance** (cloud or self-hosted) with at least one workflow in it
- An **Anthropic / Claude account** (a Pro plan is enough to start; heavy sessions may hit usage limits)
- **VS Code** installed — a free code editor
- A **GitHub account** — only needed if you also want to deploy a web app later
- Basic comfort copying and pasting text and following on-screen menus. No coding experience required.

---

## Step 1 — Install VS Code and the Claude Code extension

We use VS Code because the Claude Code side-panel is cleaner and friendlier than a bare terminal.

1. Download and install **VS Code** if you don't have it.
2. Open VS Code and click the **Extensions** icon in the left-hand menu (it looks like four squares).
3. In the search box, type **Claude Code**.
4. Click **Install**.
5. When prompted, **sign in with your Anthropic / Claude account** to link the extension.
6. After installing, you'll see a **Claude Code icon** in the left sidebar. Click it to open the chat panel where you'll type your instructions.

You now have Claude Code living inside your editor.

---

## Step 2 — Create your project folder

Claude Code works inside a folder. Give it a clean space to work in.

1. Create a new empty folder on your computer, e.g. `n8n-app`.
2. In VS Code go to **File → Open Folder** and select it.
3. This folder is your project. Any files Claude creates (config, front-end code, etc.) live here.

---

## Step 3 — Gather your credentials

To let Claude reach your services, you need a few keys. Collect them now so the next step is smooth. **Keep these private** — treat them like passwords.

### 3a. Your n8n URL and API key

1. Note your n8n instance **base URL** (e.g. `https://your-name.app.n8n.cloud`).
2. In n8n, open **Settings → n8n API**.
3. Click **Create an API key**, give it a name, and copy the key somewhere safe.

### 3b. Your GitHub Personal Access Token (only if deploying later)

1. In GitHub, go to **Settings → Developer settings → Personal access tokens → Fine-grained tokens**.
2. Click **Generate new token**.
3. Set which repositories it can access and what permissions it has (repository read/write is enough for pushing code).
4. Click **Generate token** and copy it. GitHub only shows it once.

> ⚠️ You will **not** paste these into a public file. In the next step they go into a local config that stays on your machine. More on keeping them safe in the [Security](#security-best-practices) section.

---

## Step 4 — Connect the MCP servers

This is the heart of the tutorial — the actual connection between Claude and n8n.

Claude Code reads a file called **`mcp.json`** that lists which MCP servers it's allowed to talk to and how to authenticate with them.

You have two ways to create it:

### Option A — Let Claude write it for you (recommended for beginners)

In the Claude Code chat panel, tell Claude what you want, for example:

> *"Set up my mcp.json to connect to my n8n instance and to GitHub. My n8n URL is `<your URL>`. I'll give you the API keys. Also load the n8n skill and the front-end design skill."*

Claude will ask for the values it needs, then generate the `mcp.json` for you.

### Option B — Understand the file yourself

A minimal `mcp.json` looks roughly like this (yours will vary depending on the exact MCP servers you use):

```json
{
  "mcpServers": {
    "n8n": {
      "command": "npx",
      "args": ["-y", "<n8n-mcp-server-package>"],
      "env": {
        "N8N_API_URL": "https://your-name.app.n8n.cloud",
        "N8N_API_KEY": "your-n8n-api-key-here"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "<github-mcp-server-package>"],
      "env": {
        "GITHUB_TOKEN": "your-github-token-here"
      }
    }
  }
}
```

The idea is the same regardless of the exact package names: each entry names a server, tells Claude how to launch it, and passes in your URL + key through `env` so the server can authenticate.

### ‼️ The step everyone forgets

> **After creating or editing `mcp.json`, restart VS Code.** MCP servers are only loaded when Claude Code starts up. If you skip this, Claude won't see your n8n connection and you'll think it's broken.

Once restarted, type `/` in the Claude chat panel — you'll see slash commands for managing MCPs, switching models, attaching files, and clearing context. If your n8n MCP shows up in the list, the connection is live.

---

## Step 5 — Write a CLAUDE.md

`CLAUDE.md` is a plain-text file in your project that acts as a **standing set of instructions** — a system prompt Claude reads every time. It stops you from re-explaining your project in every message.

Ask Claude (in **Plan Mode** — see the next step) to create it, describing:

- **What the project is** — e.g. "We connect to n8n workflows, audit their inputs/outputs, and prepare them to talk to a front end."
- **What tools it may use** — the n8n MCP, the n8n skill, and any front-end/GitHub skills.
- **Conventions** — styling choices (e.g. Tailwind CSS), your GitHub repo strategy, folder layout.

Claude will ask a few clarifying questions and then write the `CLAUDE.md` for you. From now on, every instruction you give is interpreted with this context in mind.

---

## Step 6 — Plan Mode vs Auto-Edit Mode

Claude Code has execution modes. Knowing the difference keeps you in control.

| Mode | When to use it |
|------|----------------|
| **Plan Mode** | Claude *thinks and proposes* but doesn't change files or your workflows yet. Perfect for auditing and brainstorming. Always start here. |
| **Auto-Edit / Bypass Permissions** | Claude makes edits automatically without asking for approval on every single step. Faster, but only switch to it once you trust the plan. |

To enable auto-edit: **VS Code Settings → search "Claude Code" → enable "Allow Dangerously Skip Permissions."** The name is scary on purpose — it means Claude won't pause to ask before each action, so only use it when you're comfortable.

**Beginner workflow:** audit in Plan Mode → read the plan → switch to Auto-Edit → let it run.

---

## Step 7 — Find and audit a workflow

Now the payoff. Let's have Claude look at a real workflow. We'll use a simple example: a **"Fitness Coach" AI agent** in n8n.

In **Plan Mode**, type:

> *"I have a workflow called 'Fitness Coach'. Please look at it and prepare it to talk to a front end."*

Here's what Claude does behind the scenes:

1. Uses the **n8n MCP** to search your instance and locate the workflow by name.
2. Reads its nodes and connections.
3. Notices problems — for example, that it uses a **Chat Trigger**, which isn't ideal for a custom web app.
4. Produces a **plan**, such as:
   - Replace the Chat Trigger with a **Webhook Trigger** (so a website can call it).
   - Add **Window Buffer Memory** so the agent remembers the conversation.
   - Rewire node connections and agent inputs to match.
   - Save and publish the updated workflow.

Read this plan carefully. This is your chance to catch anything you disagree with *before* a single change is made.

---

## Step 8 — Let Claude make the changes

Happy with the plan? Switch to **Auto-Edit / Bypass Permissions** and approve it.

Claude will:

- Turn the plan into a **checklist / to-do list**.
- Run each modification against your n8n instance **through the MCP** — swapping the trigger, adding the memory node, reconnecting everything.
- **Catch its own configuration errors** as it goes and fix them.
- Save and re-publish the workflow.

When it finishes, your n8n workflow is genuinely different — updated by Claude, not by you dragging nodes. Open n8n in your browser and you'll see the new structure.

This is the core skill of the whole tutorial: **describe the outcome you want, and Claude edits the live workflow for you.**

---

## Step 9 — Edit a workflow's system prompt through Claude

A very common real-world task: your AI agent replies with heavy Markdown (**bold everywhere**, bullet lists) and you want plain, natural paragraphs instead.

You don't need to hunt for the agent node. Just tell Claude:

> *"Update the Fitness Coach workflow's system prompt so the AI agent replies in natural-language paragraphs instead of bold Markdown."*

Claude connects via the MCP, locates the agent node, rewrites its system prompt, saves, and re-publishes — all from one sentence.

This same pattern works for almost any change: *"add a node that logs each request,"* *"route errors to a separate branch,"* *"make the webhook return a success message and a URL."* You describe it; Claude edits the workflow.

---

## Step 10 — Verify the change

Never assume — always check. Two quick ways:

1. **Open n8n in your browser.** Look at the workflow you changed. Confirm the new nodes/connections/prompt are there.
2. **Run a test execution.** Trigger the workflow and watch the **execution log** in n8n. A new execution should appear, and the output should reflect your change (e.g. natural paragraphs instead of Markdown).

If something's off, tell Claude what you saw — you can even paste a screenshot — and it will adjust.

---

## Security best practices

Connecting AI to your live tools is powerful, so treat security seriously.

- **Never commit secrets.** Your `mcp.json` holds your n8n API key and GitHub token. As long as it stays **on your local disk and is not pushed to GitHub**, those credentials stay safe. Add it to `.gitignore`.
- **Ask Claude to audit for you.** Before publishing anything, say: *"Do a full security review of anything about to be pushed to GitHub and make sure no API keys, tokens, or credentials are exposed."*
- **Don't hardcode secret URLs into public code.** If you later build a web app, put your webhook URL in an **environment variable**, not directly in the front-end code that ends up in a public repo.
- **Scope your keys narrowly.** Give the GitHub token access only to the repositories it needs, and only the permissions it needs.
- **Rotate keys** if you ever suspect one leaked.

---

## Common problems and fixes

| Problem | Likely cause | Fix |
|---------|-------------|-----|
| Claude says it can't find your n8n workflows | MCP not loaded | Restart VS Code after editing `mcp.json` |
| "Unauthorized" / auth errors from n8n | Wrong or expired API key, or wrong URL | Re-copy the key from **Settings → n8n API**; double-check the base URL |
| Claude edits nothing, only talks | You're still in Plan Mode | Switch to Auto-Edit / Bypass Permissions |
| Workflow output comes back as raw JSON | Front end/agent returning the whole payload | Ask Claude to extract only the `output` field |
| Changes don't appear in n8n | Workflow wasn't re-published | Ask Claude to save **and publish**, then refresh the browser |
| Slash commands / MCP list empty | Extension not fully restarted | Fully close and reopen VS Code |

---

## Where to go next

You've now got the essential loop: **Claude ↔ n8n through MCP, editing real workflows from plain English.** From here you can extend it:

- **Build a front end** for a workflow (ask Claude to use its front-end design skill), then push the code to **GitHub** via the GitHub MCP and deploy it live on a hosting platform.
- **Add more MCPs** — anything with an MCP server (databases, docs, project tools) becomes something Claude can operate.
- **Refine your `CLAUDE.md`** as your project grows so Claude gets more consistent every session.

The big takeaway: once the MCP connection exists, you stop thinking in "which node do I click" and start thinking in "what outcome do I want" — and let Claude handle the wiring.

---

*Happy building. Start small — audit one existing workflow in Plan Mode — and grow from there.*
