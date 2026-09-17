import { bothThemes } from "../../.storybook/bothThemes";
import { Switch } from "./Switch";

export default {
  title: "Primitives/Switch",
  component: Switch,
  decorators: [bothThemes],
};

export const Off = {
  args: { label: "Gate notifications", checked: false, onChange: () => {} },
};

export const On = {
  args: { label: "Gate notifications", checked: true, onChange: () => {} },
};

export const Disabled = {
  args: { label: "Gate notifications", checked: false, disabled: true, onChange: () => {} },
};

export const Locked = {
  args: { label: "Audit trail", checked: false, locked: true, onChange: () => {} },
};
