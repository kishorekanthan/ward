import { bothThemes } from "../../.storybook/bothThemes";
import { FlowChain } from "./FlowChain";

export default {
  title: "Site/FlowChain",
  component: FlowChain,
  decorators: [bothThemes],
};

export const Pipeline = {
  args: { steps: ["Source events", "Hourly batch", "Warehouse", "Reports"], label: "Data flow" },
};

export const Narrow = {
  render: () => (
    <div style={{ maxInlineSize: "var(--ward-width-colFloor)" }}>
      <FlowChain steps={["Source events", "Hourly batch", "Warehouse", "Reports"]} label="Data flow" />
    </div>
  ),
};

export const Revealed = {
  args: { steps: ["Read", "Load", "Check"], label: "Loader steps", animate: "run" },
};
