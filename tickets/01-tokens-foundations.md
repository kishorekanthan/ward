# 01: Tokens and foundations

**What to build:** the token pipeline and package skeleton every later layer builds on:
verified token source, generated CSS/TS outputs, contract-type baseline, and the corrected
component→schema map.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] Verify real filenames under `contracts/schemas/` and real tables in the init migration; write the corrected component→schema map into the ticket before typing any prop
- [ ] Token generation (JSON in, CSS custom properties + TS out) checked in via a build step, never hand-edited; dark theme as derived `data-theme` pass with the inverted chip pattern
- [ ] Provisional interfaces explicitly marked for sources with no schema yet (rerun/rejection records, intake sessions/turns, notifications, capabilities, board config, snapshots)
- [ ] Root barrel as sole public entry; per-component folder convention established
- [ ] Token contrast test green in both themes; no-literal-colour and banned-motion checks wired into the same check command
- [ ] Package skeleton carries its open-source identity (license, contribution rule: spec-first components)
