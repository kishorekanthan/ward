import { bothThemes } from "../../.storybook/bothThemes";
import { Checkbox } from "./Checkbox";

export default {
  title: "Primitives/Checkbox",
  component: Checkbox,
  decorators: [bothThemes],
};

export const Unchecked = {
  args: { label: "Shown as a column", checked: false, onChange: () => {} },
};

export const Checked = {
  args: { label: "Shown as a column", checked: true, onChange: () => {} },
};

export const WithConsequence = {
  args: {
    label: "Shown as a column",
    consequence: "Items in this stage stop appearing on the board.",
    checked: true,
    onChange: () => {},
  },
};

export const Disabled = {
  args: {
    label: "Shown as a column",
    consequence: "A terminal stage is counted, not columned.",
    checked: false,
    disabled: true,
    onChange: () => {},
  },
};

export const Locked = {
  args: {
    label: "Shown as a column",
    consequence: "A human gate is always a column.",
    checked: false,
    locked: true,
    onChange: () => {},
  },
};

export const Cell = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px 12px", maxWidth: 520 }}>
      <Checkbox label="Item key" checked onChange={() => {}} variant="cell" sample="T-012" />
      <Checkbox label="Time in stage" checked locked variant="cell" sample="2d 4h" />
      <Checkbox label="Cost so far" checked={false} onChange={() => {}} variant="cell" />
      <Checkbox label="Jira link" checked={false} disabled variant="cell" />
    </div>
  ),
};
