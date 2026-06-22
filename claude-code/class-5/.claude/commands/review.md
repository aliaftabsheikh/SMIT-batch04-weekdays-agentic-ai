---
allowed-tools: Bash(git diff *), Bash(git status *), Bash(git log *)
description: Review the current code changes
---

## Context
- Current status: !`git status`
- Current diff: !`git diff HEAD`

## Task
Review the changes above using the `code-reviewer` subagent. Report bugs,
risks, and suggested improvements grouped by priority (critical / warning /
suggestion), each with a file:line and a concrete fix.
