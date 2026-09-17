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
