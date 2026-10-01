import { bothThemes } from "../../.storybook/bothThemes";
import { Crumb } from "../primitives/Crumb";
import { StreamRow, type Stream } from "../composites/studio/StreamRow";
import { AgentCard } from "../composites/studio/AgentCard";
import { StageColumn } from "../composites/studio/StageColumn";
import { SessionRow, type Session } from "../composites/intake/SessionRow";
import { BoardFootnote } from "../composites/board/BoardFootnote";
import { StatStrip } from "../primitives/StatStrip";

// Every small link Ward draws, in tab order; scripts/focus-targets.mjs tabs through them against src/goldens/focus-targets.json.
const session: Session = {
  title: "Late-arriving shipments view",
  turns: 6,
  waitingOn: "you",
  resolved: ["Stream", "Owner"],
  lastActivity: "2026-09-06T02:14:00Z",
  state: "created",
  link: { key: "FL-229", href: "/items/FL-229" },
};

const draft = { name: "Regulatory Ops", key: "REG", streamStep: 3 as const, owner: "unassigned", stages: [], draft: true, inFlight: 0, inFlightHint: "Items running, held or blocked in this stream" };

const ledger: Stream = {
  name: "ledger",
  key: "LG",
  streamStep: 2,
  owner: "J. Rao",
  members: 4,
  stages: [{ name: "Intake", gate: false }],
  agents: { live: 1, draft: 0, paused: 0 },
  policy: { id: "PLT-201", summary: "Hold every item at the gate." },
  inFlight: 2,
  inFlightHint: "Items running, held or blocked in this stream",
};

const agent = {
  id: "intake-advisor",
  name: "intake-advisor",
  streamStep: 1 as const,
  description: "Reads an inbound request and proposes the stream it belongs to.",
  versions: [{ v: "v3", status: "live" as const }],
};

export default {
  title: "A11y/FocusTargets",
  decorators: [bothThemes],
};

export const Links = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--ward-space-4)", maxWidth: "var(--ward-width-form)" }}>
      <Crumb path={[{ label: "Studio", href: "/studio" }, { label: "data-eng", href: "/studio/data-eng" }, { label: "intake-advisor" }]} />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <StreamRow stream={draft} href="/studio/reg" presentation={{ columns: 5 }} />
          <StreamRow stream={ledger} href="/studio/ledger" />
          <SessionRow session={session} presentation="table" href="/intake/42" />
        </tbody>
      </table>
      <AgentCard agent={agent} href="/studio/data-eng/intake-advisor" />
      <StageColumn stage={{ index: 2, name: "Build", kind: "agent", count: 0 }} presentation={{ mode: "workflow" }} onMount={() => {}} />
      <BoardFootnote configureHref="#/studio/streams/ledger" />
      <StatStrip cells={[{ value: "14", label: "In flight", href: "/board" }, { value: "0", label: "Failed runs 24h", href: "/runs" }]} />
      <div style={{ width: "var(--ward-width-streamKey)" }}>
        <StatStrip cells={[{ value: "2", label: "Items waiting at a gate", href: "/gates" }, { value: "5", label: "Done", href: "/done" }]} />
      </div>
    </div>
  ),
};
