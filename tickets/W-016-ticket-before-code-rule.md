# W-016 — Ticket-before-code rule in AGENTS.md

Status: done

## Why
Agents (Claude Code and Codex) started code changes without a written problem, scope or acceptance criteria, so work could not be checked against intent. The rule has to live in `AGENTS.md`, which both tools read; `CLAUDE.md` only imports it.

## What
- `AGENTS.md`: a `## Tickets` section near the top: no code without a ticket (Why / What / Acceptance criteria), `W-NNN: ...` commit and PR titles with the PR body linking the ticket, `Status: done` plus Verify and Follow-up on completion, and this repo's numbering.
- `tickets/README.md`: a ticket template with those sections.
- `CLAUDE.md` stays exactly `@AGENTS.md`; no other `CLAUDE.md` holds rules.

Out of scope: tooling that enforces the rule (hooks, CI), and backfilling old tickets to the new sections.

## Acceptance criteria
- `AGENTS.md` has `## Tickets` above `## Scope` with the four points above. Manual check: read the section.
- Every existing rule line in `AGENTS.md` is kept. Manual check: `git diff origin/main -- AGENTS.md` shows additions only.
- `CLAUDE.md` is byte-identical to `@AGENTS.md\n`. Check: `printf '@AGENTS.md\n' | cmp - CLAUDE.md`.
- No other `CLAUDE.md` in the repo outside `node_modules` and `.claude/worktrees`. Check: `find . -name CLAUDE.md -not -path '*/node_modules/*' -not -path './.claude/worktrees/*'` prints only `./CLAUDE.md`.
- `tickets/README.md` has a template with Why, What and Acceptance criteria. Manual check: read it.
- `make check` passes.

## Verify
- `printf '@AGENTS.md\n' | cmp - CLAUDE.md`: identical.
- `find` for other `CLAUDE.md`: only `./CLAUDE.md`.
- `git diff origin/main -- AGENTS.md`: 6 lines added, 0 removed.
- `make check`: green.
- Manual check: `## Tickets` sits above `## Scope`; `tickets/README.md` template has Why, What, Acceptance criteria, Verify, Follow-up.

## Follow-up
- None in this repo.
