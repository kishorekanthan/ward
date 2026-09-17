# 11: Live layer

**What to build:** the live hooks and indicator per WARD-REVIEW §Live — counters and
words change, one flash per event, connection is a state.

**Blocked by:** 09 (tokens incl. live-* + motion-tick), 10 (ConnectionMark).

**Status:** ready-for-agent

- [ ] useLiveFeed — `{connection: live|reconnecting|stale, lastEventAt, subscribe(itemKey|'*', handler)}`; heartbeat/reconnect/backoff per review; event shape `{id, type, at, itemKey?, runId?, agent?, turn?, step?}`
- [ ] useTicker (1 Hz, visibility-aware, resync on visibilitychange), useBorderFlash (reduced-motion aware, never on mount/hover/reconnect)
- [ ] LiveIndicator — `{startedAt, lastEvent?, connection, turn?}`; mono fixed-width elapsed; frozen `as of HH:MM` when stale; `role="timer"`, elapsed aria-hidden, hidden "started HH:MM"
- [ ] Flash colours: blue running / orange finding / green finish — from data the event carries, never a prop colour
- [ ] No CSS animation anywhere in the layer; text content changes only; tests assert tick/flash/reconnect behavior against a simulated feed (no network)
