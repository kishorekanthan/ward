# Mutation control — rebuild/01

Mutation testing proving the gates and goldens are not tautological. Run 2026-09-06,
`packages/ward/`, `npm run check` / `npx vitest run src/fmt`.

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
