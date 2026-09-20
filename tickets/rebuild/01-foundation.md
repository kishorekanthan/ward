# rebuild/01: Phase 0 — foundation (wipe + rebuild)

**What to build:** the review-spec foundation, replacing all existing `src/`. Per
WARD-REVIEW §Architecture, §Tokens, §Live, Phase 0.

**Blocked by:** None.

**Status:** ready-for-agent

- [x] Clear `src/` (old build superseded; keep nothing) and scaffold: `tokens.json` 0.2.0 (full §Tokens table incl. chip roles, stream vars, scrim, live-*), `scripts/gen-css` → `src/ward.css` + `src/tokens.ts`, CI diff check of generated output
- [x] `ward.css` carries font-face (Archivo / Source Sans 3 / IBM Plex Mono), focus ring, reset, reduced-motion; dark stream chip pairs for steps 1–3 derived by deep-tint rule and measured ≥ 4.5:1, recorded
- [x] `fmt/`: duration, elapsed (fixed-width), stamp, money, count, ratio — goldens hand-computed, checked in
- [x] `a11y/`: useRovingTabindex, useFocusTrap, useReturnFocus
- [x] `live/`: useLiveFeed (simulatable, no network), useTicker, useBorderFlash, LiveIndicator per §Live (roles, frozen stale, flash colours from event data)
- [x] `primitives/`: Overlay (drawer/sheet/modal), Marker, ConnectionMark
- [x] Package toolchain: package.json scripts (gen, check incl. generated-diff + tsc strict + no-hex + complexity ≤10 + vitest), tsconfig, eslint, stylelint, vitest; React 19 only; barrel exports layers built so far
- [x] Mutation controls recorded; check + vitest + build green

**Status:** done. Measured dark chip pairs (deep-tint rule): s1 #45C4B4/#0E2622 7.44:1, s2 #C0A2F0/#1D1533 8.01:1, s3 #F0A46B/#27160A 8.48:1. Controls recorded below in `## Verify` (folded from root `MUTATION-CONTROL.md`, deleted on archive freeze — see git history).

## Verify

Folded from the root `MUTATION-CONTROL.md` on archive freeze (2026-09-20); the root file
is deleted, git history keeps the original. One path note added below.

# Mutation control — rebuild/01

Mutation testing proving the gates and goldens are not tautological. Run 2026-09-06,
Ward's `src/` (historical name `packages/ward/` in the monorepo this repo split out of), `npm run check` / `npx vitest run src/fmt`.

## 1. Token mutation → contrast gate red

- **Mutated:** `tokens.json` → `chipDark.done.fg` `#4FD08B` → `#22432F` (one token only, no regeneration).
- **Command:** `npm run check`
- **Result: RED**

```
FAIL  generated output fresh — run npm run gen
FAIL  token contrast — dark chip done #22432F on #12261C = 1.45
check: 2 failure(s)
```

- **Restored:** `chipDark.done.fg` back to `#4FD08B`.
- **Result after restore: GREEN** (8/8 gates, 45/45 contrast pairs).

Note the double catch: the diff gate flags the drifted generated output *and* the
contrast gate recomputes from `tokens.json` and fails on the broken pair — the gate
measures the file, not a hard-coded expectation.

## 2. Implementation mutation → golden test red

- **Mutated:** `src/fmt/duration.ts` hours branch `${totalMinutes % 60}m` →
  `${totalMinutes % 60 + 1}m` (off-by-one against the checked-in goldens).
- **Command:** `npx vitest run src/fmt`
- **Result: RED**

```
× fmt/duration > matches the hand-computed golden file
✓ fmt/elapsed · ✓ fmt/stamp · ✓ fmt/money · ✓ fmt/count · ✓ fmt/ratio
```

- **Restored:** branch back to `${totalMinutes % 60}m`.
- **Result after restore: GREEN** (`npm run check` 8/8, `npm run build` clean).

The goldens are hand-computed fixtures checked into `src/fmt/goldens/` and asserted
verbatim; the tests share no computation with the implementation, so a broken
implementation cannot pass.
