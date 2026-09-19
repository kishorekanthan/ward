# Tickets

| ID | Title | Status |
|---|---|---|
| W-016 | Ticket-before-code rule in AGENTS.md | done |

`01`–`15` and `rebuild/01`–`03` are the older unprefixed tickets (see `SUPERSEDED.md`); W-NNN continues that sequence.

## Template

One file per ticket: `tickets/W-NNN-<slug>.md`. Write it before any code.

```markdown
# W-NNN — <title>

Status: open

## Why
The problem, and who it is for.

## What
Scope of the change.

Out of scope: what this ticket does not do.

## Acceptance criteria
- <checkable statement> — test: `<test path>` | manual check: <named check>

## Verify
Added when done: what was run and what it showed, per criterion.

## Follow-up
Added when done: what is left, or "none".
```

Status goes `open` → `in-progress` → `done`.
