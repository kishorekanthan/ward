import { bothThemes } from "../../../.storybook/bothThemes";
import { PreviewRail } from "./PreviewRail";
import type { BoardConfig, BoardItem } from "./types";
import type { GateItem } from "../studio/GateChecklist";

const sample: BoardItem[] = [
  {
    key: "FL-229",
    title: "Late-arriving shipments view",
    stage: "triage",
    timeInStage: 93_600_000,
    waitsOn: "A. Whyte",
    streamStep: 1,
    changedAt: "2026-09-06T02:14:00Z",
    state: { role: "attention", label: "NEEDS A HUMAN" },
    lastAgentAction: "asked for the carrier reference",
    cost: 0.46,
    jiraKey: "FL-229",
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
    cost: 0.12,
  },
];

const draft: BoardConfig = {
  columns: [
    { id: "triage", label: "Triage", cap: 6, gate: false },
    { id: "review", label: "In review", cap: 4, gate: true },
  ],
  fields: ["key", "cost"],
  sort: "oldest",
};

const effects: GateItem[] = [
  { met: true, text: "Review stays a column — a human gate always is." },
  { met: false, text: "Done drops off the board and is counted instead." },
];

export default {
  title: "Board/PreviewRail",
  component: PreviewRail,
  decorators: [bothThemes],
};

export const Default = { args: { draft, sample, effects } };

export const NoFields = {
  args: { draft: { ...draft, fields: [] }, sample, effects },
};

export const AllFields = {
  args: {
    draft: { ...draft, fields: ["key", "lastAgentAction", "cost", "jiraLink"] },
    sample,
    effects,
  },
};

export const NewestFirst = {
  args: { draft: { ...draft, sort: "newest" }, sample, effects },
};

export const OverCap = {
  args: {
    draft: { ...draft, columns: [{ id: "triage", label: "Triage", cap: 0, gate: false }] },
    sample,
    effects,
  },
};

export const NoEffects = { args: { draft, sample, effects: [] } };

export const EmptySample = { args: { draft, sample: [], effects } };

export const Skeleton = {
  args: { draft, sample, effects, strip: "skeleton", columnsNote: "Done shows as a counter in the board header." },
};
