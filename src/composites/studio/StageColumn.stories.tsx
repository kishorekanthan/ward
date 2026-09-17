import { bothThemes } from "../../../.storybook/bothThemes";
import { StageColumn } from "./StageColumn";
import type { AgentCardProps } from "./AgentCard";

const agents: AgentCardProps[] = [
  {
    agent: {
      id: "triage",
      name: "Shipment triage",
      streamStep: 1,
      description: "Sorts inbound loads and proposes a lane.",
      versions: [{ v: "V7", status: "live" }],
      run: { itemKey: "T-024", startedAt: new Date().toISOString(), turn: [3, 8] },
    },
    href: "/agents/triage",
  },
];

export default {
  title: "Studio/StageColumn",
  component: StageColumn,
  decorators: [bothThemes],
};

export const Entry = {
  args: { stage: { index: 1, name: "Intake", kind: "entry", count: 9, medianWait: 5_400_000 } },
};

export const AgentStage = {
  args: { stage: { index: 2, name: "Build", kind: "agent", count: 4, medianWait: 93_600_000 }, agents, onMount: () => {} },
};

export const Gate = {
  args: {
    stage: { index: 3, name: "Review", kind: "gate", count: 6, medianWait: 219_600_000, reviewers: ["J. Rao", "M. Chen"], gateShare: 0.68 },
  },
};

export const Terminal = {
  args: { stage: { index: 4, name: "Done", kind: "terminal", count: 12, closedThisWeek: 31 } },
};

export const NoAgentsMounted = {
  args: { stage: { index: 2, name: "Build", kind: "agent", count: 0 }, agents: [], onMount: () => {} },
};

export const Stale = {
  args: { stage: { index: 2, name: "Build", kind: "agent", count: 4 }, agents, feed: { connection: "stale" } },
};
