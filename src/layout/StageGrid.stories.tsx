import { bothThemes } from "../../.storybook/bothThemes";
import { StageGrid } from "./StageGrid";

export default {
  title: "Layout/StageGrid",
  component: StageGrid,
  decorators: [bothThemes],
};

const stages = ["Intake", "Triage", "Build", "Review", "Release", "Done"];

const column = (label: string) => (
  <section key={label} aria-label={label} style={{ padding: "var(--ward-space-3)", borderRight: "var(--ward-border) solid var(--ward-color-line)" }}>
    {label}
  </section>
);

export const Stages = {
  args: { columns: stages.length, label: "Workflow stages", children: stages.map(column) },
};

export const BoardColumns = {
  args: { columns: 4, floor: "column", label: "Tracker statuses", children: stages.slice(0, 4).map(column) },
};

// Six stage columns at phone width scroll inside the grid; the end fade says more columns wait to the right.
export const PhoneWidth = {
  ...Stages,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
