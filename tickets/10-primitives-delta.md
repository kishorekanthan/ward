# 10: Primitives delta — Switch, Overlay, Marker, Tabs, ConnectionMark, CostMeter

**What to build:** the primitives the screens draw that the library never contracted,
plus the Tabs/Chip changes. Chip gets the new role enum in expand mode only — call-site
migration is ticket 13.

**Blocked by:** 09 (tokens 0.2.0).

**Status:** ready-for-agent

- [ ] Switch — `{checked, onChange, label, disabled?, locked?}`; 26×14 track, radius 0; locked = checked + disabled + "always on"; states on/off/disabled/locked-on; `<button role="switch" aria-checked>`; a locked switch never renders as off
- [ ] Overlay — the one dialog container: `kind: drawer|sheet|modal`, labelledBy, onClose, returnFocusTo; drawer 430 → 88vh sheet <1024 → full-screen <768; modal refuses <768; `role="dialog" aria-modal`, trap, Esc, scrim click, background inert
- [ ] Marker — `{size: 6|8|9|14, kind: ok|finding|action|hollow|attention|tick|box}`; the one square for trace/history/ladder/checklists
- [ ] Tabs — `level: 1|2` (level-2 underline `color-text`, only beneath level 1, filter semantics), cap 7
- [ ] ConnectionMark — `{connection, lastEventAt}`; 6px square + LIVE / RECONNECTING · elapsed / STALE · as-of; `role="status"`, announces on state change only
- [ ] CostMeter — `{spent, ceiling, breakdown?}`; `type-stat` figure, 4px static bar, `<meter aria-valuetext>` from money; never animates
- [ ] Chip — add role-enum API (`role` + `label`, `streamStep` iff stream, two meanings = two chips) alongside the legacy props (legacy removed in 13); visual treatment is a private lookup
- [ ] Per-component DoD with mutation controls recorded; check + vitest + build green
