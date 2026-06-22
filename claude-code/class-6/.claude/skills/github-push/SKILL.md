---
name: github-push
description: Stages, commits, and pushes the current changes to GitHub with a Conventional Commits message generated from the diff. This skill should be used when the user asks to push their code, commit and push, save work to GitHub, or "push to github".
---

# GitHub Push

Stage the working tree, create a Conventional Commits message from the actual
diff, commit, and push to the current branch's remote — in one flow.

## When to use

Use when the user asks to push code, commit and push, "save to GitHub", or
otherwise get their local changes up to the remote. Do **not** use for opening
pull requests — this skill stops at `git push`.

## Workflow

Run these steps in order. Stop and report if any step fails.

1. **Inspect state.** Run `git status --short` and `git diff HEAD` to see what
   changed. If there is nothing to commit (clean tree), tell the user and stop —
   do not create an empty commit.

2. **Confirm the branch.** Run `git rev-parse --abbrev-ref HEAD`. If the branch
   is `main` or `master`, warn the user that this pushes directly to the default
   branch and confirm before continuing (unless they already said to push).

3. **Stage changes.** Run `git add -A`. If the user named specific files, stage
   only those instead.

4. **Write a Conventional Commits message** from the diff (not from guesswork):
   - Format: `<type>(<optional scope>): <summary>`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
     `build`, `ci`, `chore`, `revert`.
   - Summary: imperative mood, lower-case, no trailing period, ≤ 72 chars.
   - Pick the scope from the dominant directory/module in the diff when one is
     clear (e.g. `feat(class-6): ...`), matching this repo's existing history.
   - Add a short body only when the change needs explanation; keep it wrapped.
   - Commit with a heredoc so multi-line messages work:
     ```bash
     git commit -m "$(cat <<'EOF'
     feat(scope): concise summary of the change

     Optional body explaining the why.
     EOF
     )"
     ```

5. **Push.** Run `git push`. If the branch has no upstream, push and set it:
   `git push -u origin "$(git rev-parse --abbrev-ref HEAD)"`.

6. **Report.** Show the commit hash, the branch, and the remote it went to.
   Surface the remote URL so the user can click through.

## Rules

- Generate the commit message from the real diff; never invent changes that
  aren't there.
- Never use `git push --force` unless the user explicitly asks for it.
- Do not skip hooks (`--no-verify`) or signing. If a pre-commit/pre-push hook
  fails, report the failure and fix the cause rather than bypassing it.
- Do not `git add` files that look like secrets (`.env`, key/credential files)
  unless the user explicitly confirms.
- If the push is rejected because the remote is ahead, report it and suggest
  `git pull --rebase`; do not force-push to resolve it.
