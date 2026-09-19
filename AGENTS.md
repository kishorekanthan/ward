# Ward — agent guide

Ward (`@trellis/ward`) is a standalone React 19 UI library. It must never import app code.

## Tickets
- No code change without a ticket. Before editing code, `tickets/W-NNN-<slug>.md` must exist with **Why** (the problem, who it's for), **What** (scope, and what is out of scope) and **Acceptance criteria** (checkable statements, each verified by a test or a named manual check). No ticket, no code: write the ticket first. Template: `tickets/README.md`.
- Commits and PR titles name the ticket (`W-NNN: ...`); the PR body links the ticket file.
- When done, the ticket gets `Status: done` plus **Verify** and **Follow-up** sections.
- Numbering: Ward has its own W-NNN sequence, continuing the older unprefixed tickets (`01`–`15`, `rebuild/01`–`03`, now history). Next number above the highest used (W-016 onward).

## Scope
- Work only inside this folder. Consumers (e.g. `products/trellis/web`) pin Ward by git tag.

## Commands
- `make install` — `npm ci`
- `make check` — token/story/provenance checks, lint (complexity <= 5), tests, build, packed-consumer check. Must pass before commit.
- `npm run storybook` — local component catalogue.

## Rules
- Never raise the complexity threshold or add `eslint-disable`.
- Never run prettier on Ward files; edit `tokens.json` textually, then `npm run gen`.
- `dist/` is committed: run `npm run build` and commit `dist/` with any `src/` change.
- Release: bump `version` in package.json, `make check`, commit, `git tag vX.Y.Z`, push the tag.
- Comments: one or two lines max. No tautological tests.
- No Claude attribution in commits or PRs. Never `git add -A`; stage paths explicitly.
