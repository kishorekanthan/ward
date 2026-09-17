# Ward UI library — build spec (REBUILD)

Status: full rebuild. `packages/ward/src` is rebuilt from zero against the two review
documents. The previous build (tickets 01–15) is superseded; see `tickets/SUPERSEDED.md`.

## Source of truth (in order)

1. `/Users/kkishore3k/open-code/Trellis/Claude outputs/WARD-REVIEW.md` — tokens 0.2.0,
   architecture, live rules, component contracts, constraints.
2. `/Users/kkishore3k/open-code/Trellis/Claude outputs/SCREENS-REVIEW.md` — screen
   corrections, phase 1/3/4 additions, build order, constraints.
3. `Trellis/Understood design handoff/ward/tokens.json` + `Trellis/Understood design handoff/ward/screens/*.dc.html` — raw values and visual reference where
   the reviews cite them.

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
- React 19 only. All work and verification inside `packages/ward/` (app work in
  `apps/trellis/`) — never /tmp or scratch mirrors. Comments: at most one line.
- No new runtime dependencies. Native EventSource. No CSS-in-JS, no Tailwind, no icons.
- Closed unions (chip roles, rule actions, glyphs, event types, marker kinds, stream
  steps) — extending one is a tokens.json change first.

## Build order (tickets rebuild/01–08)

Phase 0 foundation → primitives + states → board → studio → item/intake/collab →
stories/dark/barrel → audit → app adoption. Each ticket lists its components and the
review sections that contract them.
