# 05: States

**What to build:** the closed set of empty, denied, stale, and loading states, so no screen
invents its own.

**Blocked by:** 01 (tokens).

**Status:** ready-for-agent

- [ ] EmptyState, FilteredEmpty, DeniedState
- [ ] StaleProjection, WriteUnavailable, LoadFailed
- [ ] Loading (hairline frame + micro-label; mono elapsed counter past ~800ms; no spinner, no shimmer)
- [ ] Role-blocked destinations stay absent from payloads (never disabled); denied states explain, never grey out reachable UI
- [ ] Each state a story with axe coverage
