import { bothThemes } from "../../../.storybook/bothThemes";
import type { ComponentType, ReactNode } from "react";
import { WorkCard, type WorkCardFeed } from "./WorkCard";
import type { BoardItem } from "./types";
import type { LiveConnection, LiveEvent } from "../../live/types";

const inList = (Story: ComponentType): ReactNode => (
  <div role="list">
    <Story />
  </div>
);

function stubFeed(connection: LiveConnection, emit?: LiveEvent): WorkCardFeed {
  return {
    connection,
    subscribe: (itemKey, handler) => {
      if (!emit || (itemKey !== "*" && itemKey !== emit.itemKey)) return () => {};
      const id = setTimeout(() => handler(emit), 600);
      return () => clearTimeout(id);
    },
  };
}

const item: BoardItem = {
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
};

const running: BoardItem = {
  ...item,
  key: "FL-231",
  title: "Carrier reference missing on inbound loads",
  run: {
    agent: "triage v2",
    startedAt: new Date(Date.now() - 94_000).toISOString(),
    turn: [3, 8],
    lastStep: { label: "foundry.query", at: new Date(Date.now() - 12_000).toISOString() },
  },
};

export default {
  title: "Board/WorkCard",
  component: WorkCard,
  decorators: [inList, bothThemes],
};

const base = { onOpen: () => {} };

export const Default = { args: { ...base, item } };

export const Selected = { args: { ...base, item, selected: true } };

export const AgentWorking = { args: { ...base, item: running } };

export const Flagged = {
  args: { ...base, item: { ...item, flagged: true } },
};

export const WithFields = {
  args: { ...base, item, fields: ["key", "lastAgentAction", "cost", "jiraLink"] },
};

export const WithFinding = {
  args: {
    ...base,
    item: { ...item, finding: "Late rows fall outside the agreed window." },
  },
};

export const NothingToReport = {
  args: {
    ...base,
    item: { ...item, state: undefined, lastAgentAction: undefined, cost: undefined, jiraKey: undefined },
  },
};

export const Stale = {
  args: { ...base, item: running, feed: stubFeed("stale") },
};

export const EventFlash = {
  args: {
    ...base,
    item: running,
    feed: stubFeed("live", {
      id: "e1",
      type: "run.step",
      at: new Date().toISOString(),
      itemKey: "FL-231",
      step: { label: "foundry.query", tool: "foundry", ms: 1200 },
    }),
  },
};
