import type { ReactNode } from "react";
import { bothThemes } from "../../../.storybook/bothThemes";
import { ConfigRow, ConfigRowHead, type ColumnDraft, type ConfigStage } from "./ConfigRow";
import s from "./ConfigRow.module.css";

// The head is what names the row's controls, so every story shows it rather than a bare row.
function Table({ children }: { children: ReactNode }) {
  return (
    <div className={s.frame} tabIndex={0} role="region" aria-label="Column configuration">
      <ConfigRowHead />
      {children}
    </div>
  );
}

const ordinary: ConfigStage = { id: "triage", name: "Triage", gate: false, terminal: false, agentsMounted: 2 };
const gate: ConfigStage = { id: "review", name: "Review", gate: true, terminal: false, agentsMounted: 0 };
const terminal: ConfigStage = { id: "done", name: "Done", gate: false, terminal: true, agentsMounted: 0 };

const draft: ColumnDraft = { label: "Triage", cap: 6, shown: true };

const noop = () => {};

export default {
  title: "Board/ConfigRow",
  component: ConfigRow,
  decorators: [bothThemes],
};

export const Ordinary = {
  render: () => (
    <Table>
      <ConfigRow stage={ordinary} config={draft} onChange={noop} onReorder={noop} />
    </Table>
  ),
};

export const Gate = {
  render: () => (
    <Table>
      <ConfigRow stage={gate} config={{ label: "In review", cap: 4, shown: false }} onChange={noop} onReorder={noop} />
    </Table>
  ),
};

export const Terminal = {
  render: () => (
    <Table>
      <ConfigRow stage={terminal} config={{ label: "Done", shown: true }} onChange={noop} onReorder={noop} />
    </Table>
  ),
};

export const NoCap = {
  render: () => (
    <Table>
      <ConfigRow stage={ordinary} config={{ label: "Triage", shown: true }} onChange={noop} onReorder={noop} />
    </Table>
  ),
};

export const Hidden = {
  render: () => (
    <Table>
      <ConfigRow stage={ordinary} config={{ label: "Triage", cap: 6, shown: false }} onChange={noop} onReorder={noop} />
    </Table>
  ),
};

export const NoAgentsMounted = {
  render: () => (
    <Table>
      <ConfigRow stage={{ ...ordinary, agentsMounted: 0 }} config={draft} onChange={noop} onReorder={noop} />
    </Table>
  ),
};

/* All five stages together, which is the state the comp actually draws and the
   only way to see that the columns line up between head and rows. */
export const FullTable = {
  render: () => (
    <Table>
      <ConfigRow stage={{ id: "intake", name: "Intake", gate: false, terminal: false, agentsMounted: 1 }} config={{ label: "New", shown: true }} onChange={noop} onReorder={noop} />
      <ConfigRow stage={ordinary} config={draft} onChange={noop} onReorder={noop} />
      <ConfigRow stage={gate} config={{ label: "Waiting on us", cap: 6, shown: false }} onChange={noop} onReorder={noop} />
      <ConfigRow stage={{ id: "ready", name: "Ready", gate: false, terminal: false, agentsMounted: 0 }} config={{ label: "Ready", cap: 4, shown: true }} onChange={noop} onReorder={noop} />
      <ConfigRow stage={terminal} config={{ label: "Done", shown: true }} onChange={noop} onReorder={noop} />
    </Table>
  ),
};
