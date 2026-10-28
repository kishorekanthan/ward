import { bothThemes } from "../../.storybook/bothThemes";
import { Switch } from "./Switch";

export default {
  title: "Primitives/Switch",
  component: Switch,
  decorators: [bothThemes],
};

export const Off = {
  args: { label: "Review notifications", checked: false, onChange: () => {} },
};

export const On = {
  args: { label: "Review notifications", checked: true, onChange: () => {} },
};

export const Disabled = {
  args: { label: "Review notifications", checked: false, disabled: true, onChange: () => {} },
};

export const Locked = {
  args: { label: "Audit trail", checked: false, locked: true, disabledReason: "Every change is audited.", onChange: () => {} },
};
