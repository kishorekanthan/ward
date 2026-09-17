# 04: Patterns

**What to build:** the screen-level patterns that compose primitives and composites into
drawer, history, console, policy, session, and navigation behavior.

**Blocked by:** 01 (tokens), 02 (primitives); 03 (composites) for the patterns that embed them.

**Status:** ready-for-agent

- [ ] ItemDrawer (bottom sheet from tablet down, full-screen phone sheet; focus trapped, Esc returns to the card)
- [ ] CriteriaList (read-only; unmet criteria render the consequence)
- [ ] StageHistory (every entry names an actor; the current wait is an entry)
- [ ] ActivityConsole (SSE reveal cadence; idle caret plus last-event time; border flash once on data change)
- [ ] ResolveBlock (the one sanctioned grey: names who to ask)
- [ ] ClarificationRow (per-delivery-state edit consequences stated in the row)
- [ ] RequeueSheet (rerun entry points: rejection and findings rerun, human gates never do)
- [ ] ColourLadder (no free colour input; steps 4–6 gated)
- [ ] MarkUpload, ValidationList, AppearanceStrip
- [ ] CapabilityRow (role-decided rows render without toggles), RoleMatrixRow, PolicyRow (locked rows show value plus reason; looser-than-ceiling refused with the ceiling named), RoutingTable
- [ ] SessionRow, ReadyChecklist, NotificationCard (buttons from the recipient role), DeliveryHealth, GateChecklist
- [ ] TopBar (server-resolved destinations; absent, never disabled), PageHeader (actions collapse before wrapping)
- [ ] Per-pattern DoD as in 02; responsive behavior per the breakpoint table
