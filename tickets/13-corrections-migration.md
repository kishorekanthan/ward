# 13: Colour-role corrections + chip migration

**What to build:** the SCREENS-REVIEW corrections across existing components, the
chip role-enum migration for every call site, and the NotificationCard retirement.

**Blocked by:** 10 (role-enum Chip), 12 (board delta).

**Status:** ready-for-agent

- [ ] Holds/waits/RETRYING become attention/amber everywhere: StageHistory hold node+rail, DryRunRail wait steps, ClarificationRow retrying, RequeueSheet wait copy — drift orange never marks a wait; DRIFT FLAG stays a second chip when both apply
- [ ] Role chips fixed: PLATFORM ADMIN gate, APPROVER running, STREAM ADMIN/MEMBER/VIEWER meta — never a stream colour (RoleMatrixRow and any role chip call site)
- [ ] PASSED/ok markers → done/green; blue step numerals → muted (RequeueSheet); DEGRADED → attention, FAILED → failed (DeliveryHealth)
- [ ] PolicyRow — LOCKED meta + Switch locked + reason; OVERRIDDEN running + blueSoft row; DERIVED soft; chip column fixed 104px
- [ ] CapabilityRow — byRole renders words, no switch; ResolveBlock — disallowed path greyed with askInstead describedBy; RequeueSheet refusals disable primary with first reason describedBy
- [ ] Chip migration: every call site on the role enum; legacy tone/classification/stream props removed; two-meaning sites render two chips (drift then hold order)
- [ ] NotificationCard deprecated out of the public barrel (Teams template note in its place); DeliveryHealth stays
- [ ] Full gate green; mutation controls per correction recorded
