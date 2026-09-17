import { bothThemes } from "../../../.storybook/bothThemes";
import type { BoardItem } from "../board/types";
import { AppearanceStrip, type Identity } from "./AppearanceStrip";

const sample: BoardItem = {
  key: "T-024",
  title: "Reconcile September shipment feed",
  stage: "Agent review",
  timeInStage: 280_000,
  waitsOn: "J. Rao",
  streamStep: 1,
  changedAt: "2026-09-06T01:14:00Z",
  state: { role: "pending", label: "QUEUED" },
};

const streams: Identity[] = [
  { name: "Data engineering", key: "DE", streamStep: 1 },
  { name: "Legal", key: "LEG", streamStep: 3 },
];

export default { title: "Admin/AppearanceStrip", component: AppearanceStrip, decorators: [bothThemes] };

export const Draft = {
  render: () => <AppearanceStrip draft={{ name: "Finance ops", key: "FIN", streamStep: 2 }} sample={sample} streams={streams} />,
};

export const FirstStream = {
  render: () => <AppearanceStrip draft={{ name: "Data engineering", key: "DE", streamStep: 1 }} sample={sample} streams={[]} />,
};

export const Flagged = {
  render: () => (
    <AppearanceStrip
      draft={{ name: "Legal", key: "LEG", streamStep: 3 }}
      sample={{ ...sample, flagged: true, finding: "Two invoices resolve to one PO." }}
      streams={streams}
    />
  ),
};

export const Running = {
  render: () => (
    <AppearanceStrip
      draft={{ name: "Finance ops", key: "FIN", streamStep: 2 }}
      sample={{ ...sample, run: { agent: "reconcile-v7", startedAt: new Date(Date.now() - 22_000).toISOString(), turn: [3, 8] } }}
      streams={streams}
    />
  ),
};
