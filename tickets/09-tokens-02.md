# 09: Tokens 0.2.0 + fmt expansion

**What to build:** the review-spec token foundation — `tokens.json` 0.2.0 as the only
hand-typed source, regenerated CSS/TS with `--ward-<group>-<name>` names, and the
expanded formatter set. Everything else in the delta depends on this.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] tokens.json 0.2.0 per WARD-REVIEW §Tokens: color-* incl. runningTint/amber/warnInk/scrim, chip-<role>-bg/fg/line table, stream-<n>-{id,chip,chipText} (validated steps 1–3), space 4/8/12/16/20/24/32, width rails/floor, heights incl. card 96, type-control + type-chip, motion-fast/flash/reveal/tick, live-heartbeat/-reconnectMax/-staleAfter
- [ ] Generator emits `:root` + `[data-theme="dark"]` with the new names; all `*.module.css` and TS call sites mechanically renamed (expand–contract inside the package; check green at close)
- [ ] Dark chip pairs for stream steps 1–3 derived by the deep-tint rule and measured ≥ 4.5:1; values recorded in the ticket and tokens.json
- [ ] fmt: add `elapsed` (fixed-width), `count`, `ratio`; goldens hand-computed and captured, never recomputed at test time
- [ ] Full gate green: check + vitest + build; mutation control (flip one token → contrast/audit tests red → restore)
