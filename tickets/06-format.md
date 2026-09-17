# 06: Formatters

**What to build:** the four in-package formatters every screen shares, with no date or
utility dependency.

**Blocked by:** None (pure functions; can start immediately, land after 01).

**Status:** ready-for-agent

- [ ] duration (day/hour/second shapes; never zero-padded empties)
- [ ] datetime (day-month + time; no year within twelve months)
- [ ] money (always two decimal places)
- [ ] identifier (mono, non-wrapping, title attribute when truncated)
- [ ] Golden tests against hand-computed expectations captured at build time, never recomputed at test time
