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
