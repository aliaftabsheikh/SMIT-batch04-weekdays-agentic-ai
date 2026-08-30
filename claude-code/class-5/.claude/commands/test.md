---
argument-hint: [file-or-path]
description: Write tests for the given file or the current changes
---

Write tests for $ARGUMENTS (if empty, test the files in the current diff).

Use the `test-writer` subagent: detect the project's test framework, cover the
happy path, edge cases, and error paths, then run the tests and confirm they
pass.
