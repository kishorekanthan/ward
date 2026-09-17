import { bothThemes } from "../../../.storybook/bothThemes";
import { AgentCard, type Agent } from "./AgentCard";

const agent: Agent = {
  id: "intake-advisor",
  name: "intake-advisor",
  streamStep: 1,
  description: "Reads an inbound request and proposes the stream it belongs to.",
  versions: [{ v: "v3", status: "live", by: "J. Rao", at: "2026-09-06T02:10:00Z" }],
};

const base = { href: "/studio/data-eng/intake-advisor" };

export default {
  title: "Studio/AgentCard",
  component: AgentCard,
  decorators: [bothThemes],
};

export const LiveVersion = { args: { ...base, agent } };

export const DraftVersion = {
  args: {
    ...base,
    agent: { ...agent, versions: [{ v: "v3", status: "live" }, { v: "v4", status: "draft" }] },
  },
};

export const PausedVersion = {
  args: {
    ...base,
    agent: { ...agent, versions: [{ v: "v2", status: "paused" }] },
  },
};

export const Running = {
  args: {
    ...base,
    agent: {
      ...agent,
      run: { itemKey: "FL-229", startedAt: new Date(Date.now() - 94_000).toISOString(), turn: [3, 8] },
    },
  },
};

export const Selected = { args: { ...base, agent, selected: true } };

export const Stale = {
  args: {
    ...base,
    connection: "stale",
    agent: {
      ...agent,
      run: { itemKey: "FL-229", startedAt: "2026-09-06T02:10:00Z", turn: [3, 8] },
    },
  },
};

export const OtherStream = {
  args: {
    ...base,
    agent: {
      ...agent,
      id: "dpm_resolver",
      name: "dpm_resolver",
      streamStep: 3,
      description: "Resolves the data product manager for an inbound request.",
      versions: [{ v: "v1", status: "live" }],
    },
  },
};
