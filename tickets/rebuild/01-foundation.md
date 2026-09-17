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

**Status:** done. Measured dark chip pairs (deep-tint rule): s1 #45C4B4/#0E2622 7.44:1, s2 #C0A2F0/#1D1533 8.01:1, s3 #F0A46B/#27160A 8.48:1. Controls in `MUTATION-CONTROL.md`.
