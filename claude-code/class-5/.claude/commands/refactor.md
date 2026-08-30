---
argument-hint: [file-or-path]
description: Refactor code for readability without changing behavior
---

Refactor $ARGUMENTS for clarity and maintainability.

Rules:
- Do not change observable behavior.
- Improve naming, remove duplication, simplify control flow, and split
  oversized functions.
- Match the existing style of the codebase.
- If tests exist, run them before and after to prove behavior is unchanged.

Explain each change you make and why.
