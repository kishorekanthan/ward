# 08: Final audit (tautology + complexity)

**What to build:** the end-gate verification that the whole package honors the hard rules —
run once, after all layers land, before release.

**Blocked by:** 01–07 (runs last).

**Status:** green-2026-09-06 (verdict: SHIP; see `## Verify` below)

- [x] No-tautology audit: walk every test file; any test that would pass against a deliberately broken implementation is deleted or rewritten. Spot-prove with mutation controls per layer (break rule → red → restore → green), recorded in the audit report
- [x] Cyclomatic complexity audit: complexity rule wired into the lint command with a numeric threshold; full-package report clean, baseline recorded, zero new offenders
- [x] Full gate run green in one command: strict `tsc`, no-hex, contrast both themes, axe on every story, rule tests, banned motion, complexity
- [x] React 19 confirmation: lockfile and installed tree contain no React 18; all layers re-verified under 19
- [x] Audit report checked in as `AUDIT.md` (scope, mutations run, findings, fixes); folded into this ticket's `## Verify` section on archive freeze (2026-09-20), root file deleted — see git history. Ticket 07 release ships only after this ticket is green

## Verify

Folded from the root `AUDIT.md` on archive freeze (2026-09-20); the root file is
deleted, git history keeps the original. Two historical notes added inline below where
this report no longer matches the current tree or config.

# Ward final audit (ticket 08)

Date: 2026-09-06. Auditor: ward-audit agent. Scope: Ward's `src/` (historical name `packages/ward/` in the monorepo this repo split out of; now the repo root) only, React 19 only.

## Scope

- Read `SPEC.md` (incl. Hard rules) and `tickets/08-final-audit.md`, then walked all 58 test
  files under `src/` (57 component tests + `src/format/format.test.ts`).
- No-tautology audit with fresh mutation controls, one per layer (tokens, primitives,
  composites, patterns, states, format): break, observe red, restore, observe green.
- Complexity audit against the wired rule; React 19 confirmation; per-component coverage
  sanity (story with CSF default export, rule test, axe test); full gate green in one command.

## Layer-inversion ruling (known open item)

`NewStreamModal` does NOT import the trap from `patterns/ItemDrawer`. Current tree state:

- `src/primitives/FocusTrap/trap.ts` owns `focusables`/`useFocusTrap`.
- `NewStreamModal.tsx` and `ItemDrawer.tsx` both import from `../../primitives/FocusTrap/index.js`.
- `ItemDrawer/index.ts` re-exports the trap as back-compat; the root barrel exports it only
  from `./primitives/FocusTrap/index.js`. Grep confirms zero importers take the trap via the
  patterns layer.

This is already the prescribed end-state (trap in a lower layer, ItemDrawer re-exporting),
so no relocation and no importer updates were needed. No code changed for this item.

**Historical note (added on archive freeze, 2026-09-20):** the tree has since moved. The
trap now lives at `src/a11y/useFocusTrap.ts`, exported directly from the root barrel;
there is no `src/primitives/FocusTrap/` directory and no `ItemDrawer` re-export of it.
This section's file paths no longer describe the tree — the audit event and verdict below
are not in question, only these specific paths.

## Mutations run (all break -> red -> restore -> green)

- M1 tokens: `"blue": "#0066F5"` -> `"#0066F6"` in `src/tokens/tokens.json`. Red: check.mjs
  reported 3 FAILs (upstream drift, tokens.css stale, tokens.ts stale). Restored: green.
- M2 primitives: removed the disabled-without-reason throw in `Btn.tsx`. Red: Btn.test
  1 failed / 3 passed (`refuses a disabled action with no adjacent reason`). Restored: 4 passed.
- M3 composites: unlocked LOCKED rows in `ToolRow.tsx` (`disabled={false}`, guard removed).
  Red: ToolRow.test 1 failed / 3 passed (`never enables a LOCKED row`). Restored: 4 passed.
- M4 patterns: dropped the role filter in `NotificationCard.tsx` (`allowed = actions`).
  Red: 1 failed / 2 passed (`keeps verdict actions absent for other roles`). Restored: 3 passed.
- M5 states: removed `role="alert"` in `LoadFailed.tsx`. Red: 1 failed / 3 passed
  (`fails the region`). Restored: 4 passed.
- M6 format: `ms / 100` -> `ms / 1000` in `duration.ts`. Red: format.test 16 failed /
  32 passed against the checked-in goldens. Restored: 48 passed.

## No-tautology findings

No test deleted or rewritten. Every rule test asserts a throw with a message regex, an
absence (`queryBy*` null / `querySelector` null / `not.toHaveBeenCalled`), or verbatim copy
that fails if the implementation drops or changes it; `getBy*` queries throw on absence, so
even the `toBeDefined()`-style assertions fail against broken code (proven by M2-M6, where
exactly the rule/negative tests went red and nothing else). Accepted weaknesses, not
tautologies: axe tests cover the a11y axis only and pass against rule-broken code by design
(each file pairs them with rule tests); the Chip word test does not assert colour (colour is
covered by the contrast gate, not unit tests).

## Complexity audit

Rule `complexity: ["error", 10]` wired in `eslint.config.mjs`, executed inside
`scripts/check.mjs` ("eslint" gate) alongside tsc, no-hex, contrast, banned motion, and
stylelint. `npx eslint .` exits 0 with no output. Baseline recorded: 0 offenders at
threshold 10 on 2026-09-06. Zero new offenders; no fixes needed.

**Historical note (added on archive freeze, 2026-09-20):** the threshold in the current
`eslint.config.mjs` is 5, not 10 — it was tightened at some point after this audit ran.
Not re-verified against the tightened threshold here; `make check` on this branch is the
current, live answer for whether the tree clears it.

## React 19 confirmation

Installed `react`/`react-dom` are 19.2.8 only; no `react@18`/`react-dom@18` in the lockfile
or tree. `react-is@18.3.1` appears only as npm-alias dev-transitives of Jest 30
`pretty-format` (`react-is-18`/`@jest/react-is-18`, alongside the `react-is-19` alias) for
dual element-symbol support; it bundles no React runtime. Documented alias shim, accepted.
Full suite (58 files / 263 tests) green under React 19.

## Coverage sanity per component

All 57 components ship a story with a CSF default export, a rule/negative test, and an axe
test (57 story files, 57 `export default` hits, 57 `await axe(container)` hits; the 58th test
file is the golden-based format suite, which needs no axe run). No component missing any of
the three. Sole exception: `primitives/FocusTrap` is a hook, not a component — no story file
by design; its behavior is covered by the trap tests in `ItemDrawer.test.tsx` and
`NewStreamModal.test.tsx` plus their axe runs.

## Fixes applied

None. The audit found zero tautological tests, zero complexity offenders, and the layer
inversion already resolved; all mutations restored byte-identical (verified by content check).

## Verdict: SHIP

Full gate green in one command (`npm run check`: tsc strict PASS, no-hex 57 files PASS,
contrast 24 pairs PASS, banned motion 297 files PASS, eslint PASS, stylelint PASS,
vitest 58 files / 263 tests PASS; 1 skip: the known faint-below-threshold note), plus
`npm run build` clean. Ticket 07 release may proceed.
