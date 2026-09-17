# 02: Primitives

**What to build:** the full primitive set, each token-driven with stories, rule tests, and
a11y coverage, so composites have honest building blocks.

**Blocked by:** 01 (tokens, corrected schema map, folder convention).

**Status:** ready-for-agent

- [ ] Btn (primary/default/ghost/disabled; md/sm; disabled keeps label plus adjacent reason)
- [ ] Chip (closed variant set; word always present; status and classification mutually exclusive; stream chip fills meet contrast)
- [ ] Input, Select, TextArea (rest/focus/invalid; micro-label above, never placeholder-as-label)
- [ ] Checkbox, Radio (native; radio rows carry consequence copy)
- [ ] Grid (`th[scope]`; mono numerics; declared column-drop order; stacked-kv phone policy)
- [ ] SH section header (numbered micro-label + hairline + right counter)
- [ ] Crumb (uppercase path with inline chips)
- [ ] Tabs (text tabs, active underline, optional count; never pills, never wrap)
- [ ] SegmentedControl (2–3 options, filled choice)
- [ ] TreeRow (depths 0–2, indent + inset rule, roving focus)
- [ ] Callout (info/warn, always cites its ticket)
- [ ] StatStrip (2–4 cells, accent only on the argument cell)
- [ ] Per-component DoD: token values only, every state a story, axe clean, rule test failing-if-broken, no banned motion
