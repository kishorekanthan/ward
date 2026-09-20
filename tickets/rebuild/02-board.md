# rebuild/02: Board slice — primitives + board composites

**What to build:** everything the Board screen (mock 4b) and item drawer (8a) draw, on
the new foundation. Studio-only pieces wait.

**Blocked by:** rebuild/01.

**Status:** ready-for-agent

- [ ] Primitives: Chip (role enum, 11 roles + stream, two meanings = two chips), Btn (describedBy required when disabled), Field (input/select/textarea), Checkbox (+locked), PageHeader (ResizeObserver overflow collapse), TopBar (role-filtered destinations, select <768)
- [ ] Board: WorkCard (mandatory timeInStage+waitsOn, height formula, run state → AGENT WORKING running chip + LiveIndicator + reserved last-row last-step, flagged 2px orange frame, per-event coloured flash), OverCapNote (verbatim), BoardColumn (nowrap label + title, gate blueSoft + GATE navy chip, over-cap 8% tint + note, instant item.moved), BoardHeader (mono rollup line = only aria-live, ConnectionMark right, owners select, Configure board action)
- [ ] Item: ItemDrawer on Overlay (kv block, agent sentence behind 2px blue rule, LiveIndicator row when running)
- [ ] useRovingTabindex across columns owned by the board (arrows move, Enter opens, one stop per card)
- [ ] Stories for every state in both themes; tests + axe; mutation controls recorded; gates green

## Verify

This ticket's own **Status:** line above was never updated from `ready-for-agent` and
its checkboxes were never ticked — but the work shipped. Evidence, from the tree rather
than this ticket's prose: every component this checklist names is present today —
`src/primitives/{Chip,Btn,Field,Checkbox,PageHeader,TopBar}.tsx`,
`src/composites/board/{WorkCard,OverCapNote,BoardColumn,BoardHeader,ItemDrawer}.tsx`, and
`src/a11y/useRovingTabindex.ts` — all landed in the single squash commit `ff22b1c` ("Ward
0.2.0: standalone repo"), the same commit that introduced the whole current `src/` tree.
Git history was collapsed to that one commit when this repo split out of the monorepo, so
there is no earlier commit to check this against directly; the tree itself is the
evidence. Treat this ticket's own status field as stale documentation, not stalled work.

Folded from the root `REVIEW-DELTA.md` on archive freeze (2026-09-20); the root file is
deleted, git history keeps the original. `REVIEW-DELTA.md` is the rationale tickets
09–15 were written to implement on top of the pre-rebuild tree; the same scope exists in
the current tree, though which work delivered it does not verify (see `SUPERSEDED.md`).

**Every source path named below is lost.** `Trellis/Claude outputs/WARD-REVIEW.md`,
`Trellis/Claude outputs/SCREENS-REVIEW.md`, `Trellis/Understood design handoff/ward/HANDOFF.md`
and its `tokens.json` 0.1.0 were monorepo paths that did not come across the split, and are
not in this repo's history — `ff22b1c` is the first commit and does not contain them. They
are unrecoverable here. The text below is reproduced as written, so it still refers to them
in the present tense; read every such reference as naming a document that no longer exists.
Nothing else in it was corrected.

# Ward delta — reconciliation to WARD-REVIEW / SCREENS-REVIEW

Status: `Trellis/Claude outputs/WARD-REVIEW.md` + `SCREENS-REVIEW.md` now win where they
conflict with `Trellis/Understood design handoff/ward/HANDOFF.md` / `tokens.json` 0.1.0. This file is the bridge: what
changes, what defers. Tickets 09–15 implement it.

## Why visuals drifted

The library was built to the older handoff. The reviews resolve conflicts it left open
and add primitives the screens draw but the handoff never contracted. Principal deltas:

1. **Chip becomes one `role` enum** (gate, system, write, drift, stream, done, attention, failed, pending, running, warn, meta, soft) with a private visual lookup — replacing the `tone`/`classification`/`stream` mutual-exclusion props. Two meanings = two chips, in DRIFT FLAG then ON HOLD order.
2. **Tokens 0.2.0**: `--ward-<group>-<name>` names, space scale 4/8/12/16/20/24/32, new colors (runningTint, amber, warnInk, scrim, stream-`n`-{id,chip,chipText} vars), `type-control`/`type-chip`, the chip role bg/fg/line table. `tokens.json` is again the only hand-typed source.
3. **New primitives**: Switch (locked-on is real value + LOCKED, never grey-off), Overlay (drawer/sheet/modal — ItemDrawer and NewStreamModal refactor onto it), Marker (closed size/kind squares), ConnectionMark, CostMeter; Tabs gains `level: 1|2` and a cap of 7.
4. **Live layer**: useLiveFeed/useTicker/useBorderFlash/LiveIndicator; LiveTick counters are a permitted motion (text only); connection is a state (live/reconnecting/stale), never a spinner; BoardHeader owns the only `aria-live` region.
5. **Board contracts**: WorkCard carries mandatory `timeInStage`+`waitsOn` outside `fields`, height formula, `run` state (AGENT WORKING chip, last-step row, per-event flash coloured blue/orange/green); BoardHeader exists; column labels nowrap+title.
6. **Colour-role corrections** (SCREENS-REVIEW): holds/waits/RETRYING → attention/amber, never drift orange; role chips are fixed roles, never stream colours; PASSED → done; blue numerals → muted; one ConnectionMark, not three live dots.
7. **fmt expands**: elapsed (fixed-width), count, ratio join duration/datetime(stamp)/money.

## Explicitly deferred (per the reviews' own build order)

Studio- and Admin-only additions (CredentialRow, McpServerRow, RunbookSteps, EnvCard,
ComponentRow, Composer, ResolvedFieldRow, TypedInputBlock, GateLadder) are specced when
their screens are scheduled. NotificationCard leaves the library (Teams payload template;
Ward renders only a preview) — deprecate in ticket 13. Dark chip pairs for stream steps
1–3: derive by the deep-tint rule and measure ≥4.5:1 in ticket 09; record values.

## Rules unchanged

Hard rules hold: no tautological tests (mutation controls per ticket), complexity gate,
React 19 only, all work inside the target folder, comments ≤1 line. Breaking component
changes are expand–contract inside the package: new API lands, all call sites migrate,
old props removed before the ticket closes, check green at every step.
