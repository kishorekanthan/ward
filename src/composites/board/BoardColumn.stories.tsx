import { bothThemes } from "../../../.storybook/bothThemes";
import { BoardColumn } from "./BoardColumn";
import type { WorkCardFeed } from "./WorkCard";
import type { BoardItem } from "./types";
import type { LiveConnection } from "../../live/types";

const stubFeed = (connection: LiveConnection): WorkCardFeed => ({
  connection,
  subscribe: () => () => {},
});

const items: BoardItem[] = [
  {
    key: "FL-229",
    title: "Late-arriving shipments view",
    stage: "review",
    timeInStage: 93_600_000,
    waitsOn: "A. Whyte",
    streamStep: 1,
    changedAt: "2026-09-06T02:14:00Z",
    state: { role: "attention", label: "NEEDS A HUMAN" },
  },
  {
    key: "FL-231",
    title: "Carrier reference missing on inbound loads",
    stage: "review",
    timeInStage: 5_400_000,
    waitsOn: "J. Rao",
    streamStep: 1,
    changedAt: "2026-09-06T02:12:00Z",
    state: { role: "pending", label: "QUEUED" },
  },
  {
    key: "FL-244",
    title: "Reconcile September shipment feed",
    stage: "review",
    timeInStage: 219_600_000,
    waitsOn: "M. Chen",
    streamStep: 1,
    changedAt: "2026-09-06T02:10:00Z",
    flagged: true,
    finding: "Late rows fall outside the agreed window.",
  },
];

const column = { id: "review", label: "In review", cap: 6, gate: false };

const base = { column, items, sort: "oldest", onOpen: () => {} };

export default {
  title: "Board/BoardColumn",
  component: BoardColumn,
  decorators: [bothThemes],
};

export const Default = { args: base };

export const Gate = {
  args: { ...base, column: { id: "review", label: "In review", cap: 6, gate: true } },
};

export const OverCap = {
  args: { ...base, column: { id: "review", label: "In review", cap: 2, gate: false } },
};

export const NoCap = {
  args: { ...base, column: { id: "review", label: "In review", gate: false } },
};

export const NewestFirst = { args: { ...base, sort: "newest" } };

export const SelectedItem = { args: { ...base, selectedKey: "FL-231" } };

export const WithFields = {
  args: { ...base, fields: ["key", "cost"] },
};

export const EmptyColumn = { args: { ...base, items: [] } };

export const Stale = { args: { ...base, feed: stubFeed("stale") } };
