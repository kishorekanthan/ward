import { bothThemes } from "../../../.storybook/bothThemes";
import type { ReactNode } from "react";
import { StreamRow, type Stream } from "./StreamRow";
import s from "./StreamRow.module.css";

function Table({ children }: { children: ReactNode }) {
  return (
    <div className={s.frame} tabIndex={0} role="region" aria-label="Streams">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

const stream: Stream = {
  name: "data-eng",
  key: "FL",
  streamStep: 1,
  owner: "J. Rao",
  members: 12,
  stages: [
    { name: "Intake", gate: false },
    { name: "Triage", gate: false },
    { name: "Review", gate: true },
    { name: "Done", gate: false },
  ],
  agents: { live: 3, draft: 1, paused: 2 },
  policy: { id: "PLT-118", summary: "Hold every item at the gate." },
  inFlight: 14,
  p50: 5_400_000,
};

export default {
  title: "Studio/StreamRow",
  component: StreamRow,
  decorators: [bothThemes],
};

export const Default = {
  render: () => (
    <Table>
      <StreamRow stream={stream} href="/studio/data-eng" />
    </Table>
  ),
};

export const Draft = {
  render: () => (
    <Table>
      <StreamRow stream={{ ...stream, draft: true }} href="/studio/data-eng" />
    </Table>
  ),
};

export const NoGate = {
  render: () => (
    <Table>
      <StreamRow
        stream={{
          ...stream,
          name: "front-end",
          key: "FE",
          streamStep: 2,
          owner: "A. Whyte",
          stages: [
            { name: "Intake", gate: false },
            { name: "Build", gate: false },
            { name: "Done", gate: false },
          ],
        }}
        href="/studio/front-end"
      />
    </Table>
  ),
};

export const NoMedian = {
  render: () => (
    <Table>
      <StreamRow
        stream={{ ...stream, name: "integration", key: "IN", streamStep: 3, owner: "M. Chen", p50: undefined }}
        href="/studio/integration"
      />
    </Table>
  ),
};

export const NoAgentsMounted = {
  render: () => (
    <Table>
      <StreamRow stream={{ ...stream, agents: { live: 0, draft: 0, paused: 0 }, inFlight: 0 }} href="/studio/data-eng" />
    </Table>
  ),
};

const summary = { ...stream, name: "Data Engineering", key: "DE", members: 9, p50: "4.2h" };

export const Summary = {
  render: () => (
    <Table>
      <StreamRow stream={summary} href="/studio/data-eng" presentation={{ columns: 5 }} />
      <StreamRow stream={{ name: "Regulatory Ops", key: "REG", streamStep: 3, owner: "unassigned", stages: [], draft: true }} href="/studio/reg" presentation={{ columns: 5 }} />
    </Table>
  ),
};
