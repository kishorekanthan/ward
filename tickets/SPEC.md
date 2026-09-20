# Ward UI library — build spec (REBUILD)

**Historical note (added on archive freeze, 2026-09-20):** moved here from the repo root,
where it sat as if it were still live policy. Ward is standalone at v0.2.2 today; this
document is the plan tickets `rebuild/01–03` partially executed (`rebuild/04–08` were
never written — see `SUPERSEDED.md`). Kept for history only; not a current spec.

Status: full rebuild. Ward's `src/` (called `packages/ward/src` in the monorepo this repo
split out of) is rebuilt from zero against the two review documents. The previous build
(tickets 01–15) is superseded; see `SUPERSEDED.md`.

## Source of truth (in order)

**All four files below are gone from disk.** `/Users/kkishore3k/open-code/Trellis/` does
not exist any more and these are not recoverable. This section is kept as a record of
what the rebuild once cited as authoritative, not as a live reference.

1. **Lost:** `/Users/kkishore3k/open-code/Trellis/Claude outputs/WARD-REVIEW.md` — tokens
   0.2.0, architecture, live rules, component contracts, constraints.
2. **Lost:** `/Users/kkishore3k/open-code/Trellis/Claude outputs/SCREENS-REVIEW.md` —
   screen corrections, phase 1/3/4 additions, build order, constraints.
3. **Lost** (same missing directory): `Trellis/Understood design handoff/ward/tokens.json` + `Trellis/Understood design handoff/ward/screens/*.dc.html` — raw values and visual reference where the reviews cite them.

## Architecture (per WARD-REVIEW)

- `tokens.json` 0.2.0 is the only hand-typed source; `scripts/gen-css` emits `src/ward.css`
  (`:root` + `[data-theme="dark"]`, font-face, focus ring, reset, reduced-motion) and
  `src/tokens.ts` (typed var names). CI diffs generated output; must be empty.
- CSS Modules per component; values only via `var(--ward-*)`. No hex/px/duration literals
  outside the generated files. Theme is `data-theme` on `<html>`; components never read it.
- Stream colour arrives as `style={{'--stream': ...}}` set by the composite that knows the
  step — never a hex prop.
- Layers: `fmt/`, `a11y/`, `live/`, `primitives/`, `states/`, `composites/{board,studio,item}`,
  `index.ts` barrel. Stories: one file per component, every state in both themes.

## Hard rules (unchanged, no exceptions)

- No tautological tests: assert against independently captured expectations; every ticket
  records mutation controls (break → red → restore → green).
- Cyclomatic complexity gated in the lint command (numeric threshold); zero new offenders.
- React 19 only. All work and verification inside the repo root (historical name `packages/ward/` in the monorepo this repo split out of; app work was in historical `apps/trellis/`, now the separate `products/trellis/web` repo) — never /tmp or scratch mirrors. Comments: at most one line.
- No new runtime dependencies. Native EventSource. No CSS-in-JS, no Tailwind, no icons.
- Closed unions (chip roles, rule actions, glyphs, event types, marker kinds, stream
  steps) — extending one is a tokens.json change first.

## Build order (tickets rebuild/01–08)

Phase 0 foundation → primitives + states → board → studio → item/intake/collab →
stories/dark/barrel → audit → app adoption. Each ticket lists its components and the
review sections that contract them.

**Historical note:** only `rebuild/01–03` were ever written; `rebuild/04–08` do not
exist. The tree today holds composites well beyond `rebuild/02`'s board-only scope —
studio, admin, intake and item composites, plus `layout/` and `visibility/` — with no
ticket of record for that work. See `SUPERSEDED.md`.
