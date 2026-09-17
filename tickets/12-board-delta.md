# 12: Board composites delta

**What to build:** the board contracts the reviews fix — WorkCard anatomy, BoardHeader,
Overlay-based drawer, column label behavior.

**Blocked by:** 09, 10, 11.

**Status:** ready-for-agent

- [ ] WorkCard — `timeInStage` + `waitsOn` mandatory outside `fields`; height = card floor + 16px × ceil(fields/2); `run` state: AGENT WORKING running chip, LiveIndicator in the meta line, reserved last row shows last step verbatim; flagged 2px orange frame kept; per-event flash coloured by event kind
- [ ] BoardHeader (new) — `{stream, rollups, connection, lastEventAt, owners, onOwnerChange, onConfigure}`; mono rollup line is the board's only `aria-live="polite"` region; ConnectionMark right side
- [ ] BoardColumn — label nowrap + truncate + `title`; over-cap 8% red tint + verbatim OverCapNote; gate blueSoft + GATE chip; item.moved applies instantly, no transition; `aria-label` override kept
- [ ] ItemDrawer and NewStreamModal refactored onto Overlay (their own dialog markup removed); behaviour identical, returnFocus guaranteed by Overlay
- [ ] ConfigRow — mandatory card fields render `Checkbox locked`; gate row locked toggle + note kept
- [ ] Mutation controls per rule recorded; check + vitest + build green
