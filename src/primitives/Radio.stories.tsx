import { bothThemes } from "../../.storybook/bothThemes";
import { Radio } from "./Radio";

const options = [
  { value: "oldest", label: "Oldest first" },
  { value: "newest", label: "Newest first" },
];

const withConsequences = [
  {
    value: "hold",
    label: "Hold every item at the gate",
    consequence: "Every item waits for a named reviewer, whatever the agent found.",
  },
  {
    value: "findings",
    label: "Hold only items with a finding",
    consequence: "Clean items advance without a reviewer.",
  },
];

export default {
  title: "Primitives/Radio",
  component: Radio,
  decorators: [bothThemes],
};

export const Default = {
  args: { legend: "Column sort", options, value: "oldest", onChange: () => {} },
};

export const WithConsequences = {
  args: { legend: "Gate policy", options: withConsequences, value: "hold", onChange: () => {} },
};

export const Disabled = {
  args: { legend: "Column sort", options, value: "newest", disabled: true, onChange: () => {} },
};

export const Cards = {
  args: { legend: "Write policy", options: withConsequences, value: "hold", variant: "cards", onChange: () => {} },
};
