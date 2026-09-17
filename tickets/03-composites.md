# 03: Composites

**What to build:** data-shaped composites in dependency order, each enforcing its product
rule, with preview and board sharing one renderer.

**Blocked by:** 01 (tokens), 02 (primitives).

**Status:** ready-for-agent

- [ ] StreamRow → StageColumn (+ gate panel, terminal counter) → AgentCard
- [ ] ToolRow (LOCKED rows can never enable; policy change points at the stream Policy tab)
- [ ] RuleRow (closed action set; anything else fails validation)
- [ ] DryRunRail (publish enables only on complete checklist; human-wait trace step always present and always hollow)
- [ ] ConfigRow (columns derive from workflow stages; add-column disabled with link to Workflow; human gates unhideable)
- [ ] BoardColumn + WorkCard + OverCapNote (uniform card floor, max five fields, finding truncates first; over-cap carries its sentence)
- [ ] PreviewRail (shares the board renderer — no second implementation)
- [ ] NewStreamModal (identity / stages / write-policy with consequence copy; gate removal blocked after items passed)
- [ ] ChatMessage (+ MissPanel once its design lands; every bot claim carries its evidence cite)
- [ ] Props typed from the corrected schema map or marked provisional; per-component DoD as in 02
