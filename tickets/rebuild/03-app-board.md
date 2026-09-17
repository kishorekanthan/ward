# rebuild/03: App board — rebuild apps/trellis on the new API

**What to build:** the front-end app board matching mock 4b + drawer 8a, so the result
is visible in the browser.

**Blocked by:** rebuild/02.

**Status:** ready-for-agent

- [ ] Board route rebuilt on new WorkCard/BoardColumn/BoardHeader: rollups (in flight, loaded this week, P50/P90), owners filter, GATE column tint + 7/6 over-cap + sentence, AGENT WORKING card with elapsed counter + last step, DRIFT FLAG + ON HOLD as two chips in order, flagged frame
- [ ] Fixture data mirrors the mock (New 3, Extracting 6/8, Waiting on us 7/6 gate, Ready 2) plus run events for the live card
- [ ] Drawer over board with focus return; case-file route with kv + criteria + history + console from fixtures
- [ ] Phone: single column via select, drawer full-screen; Studio/Admin refusals one line
- [ ] Route tests + axe desk/phone; trellis + ward checks green; app runs with `npm run dev -w @trellis/trellis`
