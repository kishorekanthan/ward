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

## Verify

Folded from the root `SCHEMA-MAP.md` on archive freeze (2026-09-20); the root file is
deleted, git history keeps the original. Path note added below; the map itself is
otherwise unchanged from what was checked in for this ticket.

# Ward component → schema map (corrected, ticket 01)

Historical snapshot, verified at the time against the real filenames in `foundryloop-v2/contracts/schemas/` and the real tables in `foundryloop-v2/alembic/versions/0001_init.py` — **`foundryloop-v2` is now the `trellis-api` repo** and its schema head has moved on many revisions since; not re-verified against it today. The handoff table
in `Trellis/Understood design handoff/ward/HANDOFF.md` §9 was inferred from tickets;
every name it cites that has no schema file is listed under "Missing" below. Nothing
here is guessed: a source is either a file, a table, or missing.

## Real schema files (9)

| File | Title | What it types |
|---|---|---|
| `envelope.json` | AgentOutput | Agent output envelope |
| `triage_result.json` | TriageResult | Triage stage payload |
| `design_result.json` | DesignResult | Design stage payload |
| `config_plan.json` | ConfigPlan | Config stage payload |
| `route_decision.json` | RouteDecision | Routing payload |
| `report_draft.json` | ReportDraft | Report payload |
| `review_verdict.json` | ReviewVerdict | Review payload |
| `qa_report.json` | QAReport | QA payload |
| `owner.json` | Owner | Owner payload |

## Real tables in `0001_init` (9)

`work_items`, `stage_outputs`, `costs`, `outbox`, `idempotency_keys`,
`status_history`, `agents`, `audit`, `intake_conversations`.

## Corrected map

| Component | Correct source | Basis |
|---|---|---|
| `WorkCard`, `BoardColumn`, `ItemDrawer` | `work_items` row projected by the server; board config is provisional (`src/types/provisional.ts`) | no `work_item` / `board_config` schema file exists |
| `CriteriaList` | Jira-owned (summary, description, criteria); no schema, no table | Jira owns the request per handoff §6 |
| `StageHistory`, `ActivityConsole` | `status_history` + `stage_outputs` tables; payloads typed by the agent schemas above | `status_history` / `stage_output` exist only as tables |
| `StreamRow`, `StageColumn`, `ConfigRow` | workflow YAML projected by the server; no schema yet | no `workflow` / `stream` file or table |
| `AgentCard`, `RuleRow`, `DryRunRail` | `agents` table (`spec` JSONB) + agent schemas; `test_run` has no source | `agent` / `agent_spec` exist only as table + column |
| `ToolRow` | stream write policy projected by the server; no schema yet | no `tool_registry` / `agent_grant` file or table |
| `ClarificationRow` | `outbox` table + Jira comment id | `outbox` exists only as a table |
| `RoutingTable`, `RequeueSheet` | provisional (`ProvisionalRerunRecord`, `ProvisionalRejectionRecord`) | no `attempt` / `rejection` file or table; attempt survives only as a column |
| `SessionRow`, `ChatMessage` | provisional (`ProvisionalIntakeSession`, `ProvisionalSessionTurn`) | `intake_conversations` table exists but `intake_session` / `session_turn` files do not |
| `RoleMatrixRow`, `CapabilityRow` | provisional (`ProvisionalCapability`) | AD claims and `capability` have no file or table |
| `NotificationCard`, `DeliveryHealth` | provisional (`ProvisionalNotification`) over the `outbox` table (Teams is a channel on the outbox) | no `notification` file or table |
| TopBar destinations | server-resolved role projection; no schema yet | per handoff §5, absent ones are not passed |
| Snapshots / PreviewRail | provisional (`ProvisionalSnapshot`; Jira etag projection) | no `jira_snapshot` table despite handoff §6 naming it |

## Missing: every handoff-named source with no schema file

`work_item`, `board_config`, `acceptance_criterion`, `evidence`, `status_history`
(table only), `stage_output` (table `stage_outputs` only), run events, `workflow`,
`stream`, `agent` (table only), `agent_spec` (`agents.spec` column only), `test_run`,
`tool_registry`, `agent_grant`, `outbox` (table only), Jira comment id, `attempt`
(columns only), `rejection`, `intake_session` (table `intake_conversations` only),
`session_turn`, AD claim projection, `capability`, `notification`,
`jira_snapshot` (named in handoff §6, no table in `0001_init`).

Rule: no component types a prop from a Missing source. Contract-typed props wait on
`@trellis/contracts` generation; everything else uses the provisional interfaces, which
are deleted — not adapted — when their schemas land.
