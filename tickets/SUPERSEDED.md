# Ticket archive index

`tickets/` is frozen history. Nothing here is worked; current work is tracked in
[GitHub Issues](https://github.com/kishorekanthan/ward/issues), per `AGENTS.md`. This
file is the accurate index of every file in the archive, with a status for each
established from evidence in the tree or the git log — not from a ticket's own prose.

Two ground facts behind every entry below:

- **Git history was squashed.** The commit `ff22b1c` ("Ward 0.2.0: standalone repo") is
  the single commit that introduced the entire current `src/` tree, plus `AGENTS.md`,
  `SPEC.md`, and the audit/mutation/delta/schema reports, all at once, when this repo
  split out of the monorepo. There is no earlier commit in this repo's log to check any
  pre-split ticket's work against directly — the tree at `ff22b1c` (and its current state)
  is the only first-hand evidence available.
- **`packages/ward/` and `apps/trellis/` no longer exist.** Ward is standalone at the
  repo root. The web app that was `apps/trellis/` is now the separate
  `products/trellis/web` repo. `foundryloop-v2` is now the separate `trellis-api` repo.

## Original build — tickets 01–08

**Status: superseded.** `tickets/rebuild/01-foundation.md` opens with an explicit
instruction — "Clear `src/` (old build superseded; keep nothing)" — and its own status
line records that step done. Whatever 01–08 built, it was deliberately wiped before the
rebuild that produced the current tree. Because git history was squashed at the split
(see above), there is no commit to confirm 01–08 ever fully shipped before the wipe; the
wipe instruction and `SUPERSEDED.md`'s own historical claim are the only evidence either
way.

| File | Status | Evidence |
|---|---|---|
| `01-tokens-foundations.md` | superseded | Wiped per `rebuild/01`. Its own deliverable (component→schema map) is folded into its `## Verify` section below as `SCHEMA-MAP.md`; that map cites `foundryloop-v2` schema files that predate the `trellis-api` rename and are not re-verified against it today. |
| `02-primitives.md` | superseded | Wiped per `rebuild/01`. Current `src/primitives/` uses a different primitive set and API shape (e.g. `Field` where this ticket specced separate `Input`/`Select`/`TextArea`) — confirms replacement, not continuation. |
| `03-composites.md` | superseded | Wiped per `rebuild/01`. Current composites live under `src/composites/{board,studio,item,admin,intake,platform}/`, a layering this ticket never specced (it names a flat composite list); `BoardHeader` (from the delta, not this ticket) exists in the current tree. |
| `04-patterns.md` | superseded | Wiped per `rebuild/01`. This ticket's flat "patterns" layer does not exist in the current tree; equivalent components (`ItemDrawer`, `ActivityConsole`, `StageHistory`) live under `src/composites/item/` and `src/composites/board/` instead. |
| `05-states.md` | superseded | Wiped per `rebuild/01`. Current `src/states/` (`Loading.tsx`, `States.tsx`) does not match this ticket's per-state file list (`EmptyState`, `FilteredEmpty`, `DeniedState`, etc. as separate files) — a different implementation shape occupies the same slot. |
| `06-format.md` | superseded | Wiped per `rebuild/01`. Current `src/fmt/` ships `clock`, `count`, `duration`, `elapsed`, `money`, `ratio`, `stamp` — `elapsed`, `count`, `ratio`, `stamp`, `clock` are not in this ticket's list (`duration`, `datetime`, `money`, `identifier`); the set was replaced, matching `rebuild/01`'s fmt checklist instead. |
| `07-release-docs.md` | superseded, but its intended outcome is visibly live | The release infrastructure this ticket wanted exists today — `package.json` is versioned `0.2.2`, git tags `v0.2.0`/`v0.2.1`/`v0.2.2` exist, `.changeset/config.json` and `.github/workflows/check.yml` are present. Git history is squashed, so none of this can be attributed to this ticket's own execution rather than later work; the outcome matches, the authorship doesn't verify. |
| `08-final-audit.md` | **done**, partially stale | Its own `## Verify` section (folded from root `AUDIT.md`) records a dated audit (2026-09-06, verdict SHIP) with mutation controls, matching every checkbox on this ticket. But the audit describes a tree that has since moved — it locates the focus trap at `src/primitives/FocusTrap/`, which does not exist; the trap is now `src/a11y/useFocusTrap.ts`. It also records the complexity threshold as 10; the current `eslint.config.mjs` sets it to 5. The audit event and verdict are not in doubt; several of its specific claims about the tree are no longer true of the tree that exists now. |

## Delta — tickets 09–15

**Status: superseded**, and unlike 01–08, these were never executed as written — every
checkbox in 09–15 is unchecked. `REVIEW-DELTA.md` (folded into `tickets/rebuild/02-board.md`'s
`## Verify` section) describes the same functional scope these tickets specify: Chip
role enum, tokens 0.2.0, Switch/Overlay/Marker/ConnectionMark/CostMeter primitives, the
live layer, board contract changes, colour-role corrections. That scope was delivered
fresh through the rebuild instead — `src/primitives/{Switch,Overlay,Marker,ConnectionMark,CostMeter}.tsx`,
`src/live/*`, and `src/composites/board/BoardHeader.tsx` all exist, and `src/primitives/Chip.tsx`
implements a role enum. These tickets' own text was never the vehicle; treat them as
superseded specification, not partial progress.

| File | Status | Evidence |
|---|---|---|
| `09-tokens-02.md` | superseded, unexecuted | Unchecked. Scope (tokens 0.2.0, `elapsed`/`count`/`ratio` fmt) matches what `rebuild/01`'s checklist delivered instead. |
| `10-primitives-delta.md` | superseded, unexecuted | Unchecked. Every primitive it names (Switch, Overlay, Marker, Tabs, ConnectionMark, CostMeter) exists in `src/primitives/` today, delivered via `rebuild/01`/`rebuild/02`, not this ticket. |
| `11-live.md` | superseded, unexecuted | Unchecked. `src/live/{useLiveFeed,useTicker,useBorderFlash,LiveIndicator}` all exist, delivered via `rebuild/01`. |
| `12-board-delta.md` | superseded, unexecuted | Unchecked. `src/composites/board/{WorkCard,BoardHeader,BoardColumn,ItemDrawer,ConfigRow}.tsx` all exist, delivered via `rebuild/02`. |
| `13-corrections-migration.md` | superseded, unexecuted | Unchecked. `NotificationCard` does not exist anywhere in `src/` (consistent with this ticket's plan to retire it), and `src/primitives/Chip.tsx` is role-enum shaped, not the legacy tone/classification/stream props this ticket set out to migrate away from. |
| `14-*.md` | **never written** | No file `tickets/14-*.md` exists. `tickets/13-corrections-migration.md` and `tickets/15-reaudit.md` are adjacent; nothing fills the gap. Stated here as fact, not inferred. |
| `15-reaudit.md` | superseded, unexecuted | Unchecked. Blocked by `09–14`; `14` was never written and `09–13` were superseded before completion, so this ticket was never actionable. Its unchecked line about updating `AUDIT.md` is now additionally stale: that file no longer exists at the root (folded into `08-final-audit.md`'s `## Verify` section). |

## Rebuild — `tickets/rebuild/`

**Status: incomplete as a ticket set.** The plan in `SPEC.md` (now archived alongside
these) calls for `rebuild/01–08`. Only `rebuild/01`, `rebuild/02`, and `rebuild/03` were
ever written; `rebuild/04–08` do not exist and never did. Stated here as fact.

| File | Status | Evidence |
|---|---|---|
| `rebuild/01-foundation.md` | **done** | Its own status line says so, and its `## Verify` section (folded from root `MUTATION-CONTROL.md`) records two mutation controls (token contrast, `duration.ts` golden) matching this ticket's checklist exactly. `src/tokens.ts`, `src/ward.css`, `src/fmt/*`, `src/a11y/*`, `src/live/*`, and `src/primitives/{Overlay,Marker,ConnectionMark}.tsx` all exist. |
| `rebuild/02-board.md` | **done, though the ticket file was never updated to say so** | Status line still reads `ready-for-agent` and every checkbox is unticked, but every component it lists exists in `src/` (see this ticket's own `## Verify` section for the full list), landed in the same squash commit `ff22b1c` as everything else. The ticket's own metadata is stale documentation, not evidence the work is missing. |
| `rebuild/03-app-board.md` | **not applicable to this repo** | Its target, `apps/trellis`, does not exist here — Ward split to standalone and the web app is now the separate `products/trellis/web` repo. Annotated inline in the ticket. Nothing in this tree can confirm or deny whether this work happened elsewhere; that repo is out of scope for this archive. |
| `rebuild/04–08` | **never written** | No such files exist. Yet the tree contains their presumed scope and more: `src/composites/studio/`, `src/composites/admin/`, `src/composites/intake/`, `src/composites/item/`, `src/composites/platform/`, `src/layout/`, and `src/visibility/` are all populated — including items `REVIEW-DELTA.md` explicitly deferred (`CredentialRow`, `McpServerRow`, `RunbookSteps`, `EnvCard`, `ComponentRow`, `GateLadder`). This work shipped with no ticket ever recording it. That gap is not resolved by this index — it is stated as a fact of the archive. A new GitHub Issue would be the place to decide whether it needs backfilled ticket records at all. |

## `SPEC.md`

Moved into this folder from the repo root (was live-policy-shaped, is now archived
alongside the tickets it specced). Its "source of truth" section is annotated in place:
the four `open-code/Trellis` files it names are gone from disk and not recoverable.

## The four folded reports

`AUDIT.md`, `MUTATION-CONTROL.md`, `REVIEW-DELTA.md`, and `SCHEMA-MAP.md` no longer exist
at the repo root. Each is folded into the `## Verify` section of the ticket its content
proves or specifies (see the tables above for which ticket). Git history keeps the
original root files.
