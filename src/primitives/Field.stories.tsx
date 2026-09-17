import { bothThemes } from "../../.storybook/bothThemes";
import { Field } from "./Field";

const owners = [
  { value: "j.rao", label: "J. Rao" },
  { value: "a.whyte", label: "A. Whyte" },
  { value: "m.chen", label: "M. Chen" },
];

export default {
  title: "Primitives/Field",
  component: Field,
  decorators: [bothThemes],
};

export const Input = {
  args: { kind: "input", label: "Column label", value: "In review", onChange: () => {} },
};

export const Select = {
  args: { kind: "select", label: "Owner", value: "a.whyte", options: owners, onChange: () => {} },
};

export const Textarea = {
  args: {
    kind: "textarea",
    label: "Requeue note",
    value: "Carrier reference was missing on FL-229.",
    onChange: () => {},
  },
};

export const Mono = {
  args: { kind: "input", label: "WIP cap", mono: true, value: "6", onChange: () => {} },
};

export const Invalid = {
  args: {
    kind: "input",
    label: "WIP cap",
    mono: true,
    value: "0",
    invalid: "A cap of 0 would hide every item in the column.",
    onChange: () => {},
  },
};

export const Disabled = {
  args: { kind: "input", label: "Stream key", value: "data-eng", disabled: true, onChange: () => {} },
};

export const FormVariant = {
  args: { kind: "input", label: "Name", variant: "form", value: "Data Engineering", onChange: () => {} },
};

export const TagVariant = {
  args: {
    kind: "select",
    label: "Stage kind",
    labelHidden: true,
    variant: "tagGate",
    value: "gate",
    options: [{ value: "agent", label: "AGENT ALLOWED" }, { value: "gate", label: "HUMAN GATE" }],
    onChange: () => {},
  },
};
