import { bothThemes } from "../../.storybook/bothThemes";
import { AnimatedDiagram } from "./AnimatedDiagram";

export default {
  title: "Site/AnimatedDiagram",
  component: AnimatedDiagram,
  decorators: [bothThemes],
};

export const Pipeline = {
  render: () => (
    <AnimatedDiagram
      label="How a batch moves through the pipeline"
      nodes={[
        { id: "source", label: "Source files", col: 0, row: 0 },
        { id: "loader", label: "Loader", col: 1, row: 0 },
        { id: "retry", label: "Retry queue", col: 1, row: 1 },
        { id: "warehouse", label: "Warehouse", col: 2, row: 0 },
      ]}
      edges={[
        { from: "source", to: "loader" },
        { from: "loader", to: "retry" },
        { from: "loader", to: "warehouse" },
        { from: "retry", to: "warehouse" },
      ]}
      steps={[
        { text: "A new file lands and the loader picks it up.", nodes: ["source", "loader"] },
        { text: "A failed batch goes to the retry queue.", nodes: ["loader", "retry"] },
        { text: "A good batch lands in the warehouse.", nodes: ["loader", "warehouse"] },
        { text: "A retried batch lands there too.", nodes: ["retry", "warehouse"] },
      ]}
    />
  ),
};
