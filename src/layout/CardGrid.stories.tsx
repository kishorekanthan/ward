import type { ReactNode } from "react";
import { bothThemes } from "../../.storybook/bothThemes";
import { AgentCard, type Agent } from "../composites/studio/AgentCard";
import { CardGrid } from "./CardGrid";
import { StageGrid } from "./StageGrid";

export default {
  title: "Layout/CardGrid",
  component: CardGrid,
  decorators: [bothThemes],
};

const card = (title: string, lines: string[]): ReactNode => (
  <section key={title} aria-label={title} style={{ padding: "var(--ward-space-4)", background: "var(--ward-color-surface)", boxShadow: "var(--ward-shadow-card)", borderRadius: "var(--ward-radius-card)" }}>
    <h3 style={{ margin: 0 }}>{title}</h3>
    {lines.map((line) => <p key={line}>{line}</p>)}
  </section>
);

// A short card beside a tall one: both end on the same line.
export const Ragged = {
  args: {
    label: "Stream overview",
    children: [
      card("Needs you", ["Nothing needs you in this stream."]),
      card("Open by stage", ["Intake 4", "Triage 2", "Build 7", "Review 1", "Release 3"]),
      card("Agents at work", ["intake-advisor on Customer churn report", "schema-drift on Orders feed", "loader on Ledger"]),
      card("Done per week", ["12 this week"]),
    ],
  },
};

const facts = [
  { label: "Model", value: "claude-sonnet" },
  { label: "Stages", value: "Intake" },
  { label: "Last run", value: "done 2026-09-26 09:14" },
];

const agent = (name: string, description: string): Agent => ({ id: name, name, streamStep: 1, description, versions: [{ v: "V6", status: "live" }] });

// Four agent cards in one row; the long description makes one taller, and the facts still share one foot line.
export const AgentRow = {
  render: () => (
    <StageGrid columns={4} label="Stream agents">
      <AgentCard agent={agent("intake-advisor", "Reads a request.")} href="#/a" facts={facts} />
      <AgentCard agent={agent("schema-drift-watcher", "Watches every source table for a column that changed type, moved or went missing since the last load.")} href="#/b" facts={facts} />
      <AgentCard agent={agent("loader", "Loads a batch.")} href="#/c" facts={facts} />
      <AgentCard agent={agent("reviewer", "Checks a load.")} href="#/d" facts={facts} />
    </StageGrid>
  ),
};
