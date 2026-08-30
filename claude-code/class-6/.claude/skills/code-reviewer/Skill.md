---
name: code-reviewer
description: Reviews the entire codebase for bugs, security, and quality issues. Use when the user asks for a full code review, a codebase audit, or to review the whole project. Always delegates to the code-reviewer subagent so the review runs in a separate context window.
---

# Code Reviewer

Runs a full-codebase review. The actual review **always** runs in a separate
context window via the `code-reviewer` subagent, keeping the main conversation
clean and giving the review its own budget to read every file.

## What to do when this skill is invoked

1. Immediately delegate to the **code-reviewer** subagent using the Agent tool
   (`subagent_type: "code-reviewer"`). Do not review the code yourself in the
   main context.
2. Pass the subagent this instruction:

   > Review the entire codebase rooted at the current working directory. Follow
   > your standard checklist and return the full prioritized report.

   If the user scoped the request (e.g. "review the storefront" or "just the
   auth code"), pass that scope along instead of the whole tree.
3. When the subagent returns, relay its report to the user verbatim, preserving
   the summary and the 🔴 / 🟡 / 🟢 grouping. Add a one-line note at the top
   stating that the review ran in a separate context.

## Notes
- This skill is delegation-only — it never edits code.
- If there is no code to review (empty directory), say so instead of spawning
  the subagent.
