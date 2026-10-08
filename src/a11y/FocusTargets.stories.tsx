import { bothThemes } from "../../.storybook/bothThemes";
import { Crumb } from "../primitives/Crumb";
import { StreamRow, type Stream } from "../composites/studio/StreamRow";
import { AgentCard } from "../composites/studio/AgentCard";
import { StageColumn } from "../composites/studio/StageColumn";
import { SessionRow, type Session } from "../composites/intake/SessionRow";
import { BoardFootnote } from "../composites/board/BoardFootnote";
import { Sidebar } from "../layout/Sidebar";
import { TopBar } from "../primitives/TopBar";
import { StatStrip } from "../primitives/StatStrip";
import { TabLinks } from "../primitives/TabLinks";
import { ConfigRow } from "../composites/board/ConfigRow";
import { Btn } from "../primitives/Btn";
import { Switch } from "../primitives/Switch";
import { Field } from "../primitives/Field";
import { SegmentedControl } from "../primitives/SegmentedControl";
import { Menu, MenuButton } from "../primitives/Menu";

// Every small link and small control Ward draws, in tab order; scripts/focus-targets.mjs tabs through them against src/goldens/focus-targets.json.
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

const destinations = [
  { id: "board", label: "Board", href: "#/board" },
  { id: "intake", label: "Intake", href: "#/intake" },
];

const sections = [
  { id: "streams", label: "Streams", href: "/studio/streams" },
  { id: "gates", label: "Gates", href: "/studio/gates" },
  { id: "audit", label: "Audit", href: "/studio/audit" },
];

const shared = { heading: "Shared", links: [{ label: "Tool registry", href: "/shared/tools" }, { label: "Prompt library", href: "/shared/prompts" }] };

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
      <div>
        <Btn variant="overflow" onClick={() => {}}>···</Btn>
      </div>
      <BoardFootnote configureHref="#/studio/streams/ledger" />
      <TopBar destinations={destinations} active="board" />
      <StatStrip cells={[{ value: "14", label: "In flight", href: "/board" }, { value: "0", label: "Failed runs 24h", href: "/runs" }]} />
      <div style={{ width: "var(--ward-width-streamKey)" }}>
        <StatStrip cells={[{ value: "2", label: "Items waiting at a gate", href: "/gates" }, { value: "5", label: "Done", href: "/done" }]} />
      </div>
      <Sidebar brand="Studio" nav={[]} agentsHeading="Agents" agents={[]} shared={shared} />
      <TabLinks links={sections} active="gates" label="Studio sections" />
      <ConfigRow stage={{ id: "review", name: "Review", gate: false, terminal: false, agentsMounted: 0 }} config={{ label: "Review", shown: true }} onChange={() => {}} />
      <Switch label="Hidden as a column" labelHidden checked={false} onChange={() => {}} />
      <Field label="Stream name" value="" onChange={() => {}} />
      <SegmentedControl label="Presentation" options={[{ value: "workflow", label: "Workflow" }, { value: "board", label: "Board" }]} value="workflow" onChange={() => {}} />
      {/* Not a Ward control: a line2 edge below 3:1, so the probe's edged fact keeps a failing case (Ward #168). */}
      <div>
        <button type="button" style={{ boxShadow: "inset 0 0 0 var(--ward-border) var(--ward-color-line2)" }}>Below-floor edge</button>
      </div>
    </div>
  ),
};

// Below 768px TopBar swaps its links for a destination select, so the probe also tabs this story at phone width.
export const Phone = {
  render: () => <TopBar destinations={destinations} active="board" />,
};

// Menu items are not tab stops: the probe opens each copy's menu with Enter and walks the items with ArrowDown, skipping Billing.
export const MenuItems = {
  render: () => (
    <div style={{ minHeight: "calc(var(--ward-space-7) * 7)" }}>
      <MenuButton label="Account">
        <Menu
          entries={[
            { heading: "Account", items: [{ label: "Settings" }, { label: "Profile" }] },
            { label: "Billing", disabled: true },
            "separator",
            { label: "Help", href: "/help" },
          ]}
          footer="Signed in as Sam Lee"
        />
      </MenuButton>
    </div>
  ),
};
