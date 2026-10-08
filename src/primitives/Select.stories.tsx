import { useState } from "react";
import { bothThemes } from "../../.storybook/bothThemes";
import { Select, type SelectProps } from "./Select";

const owners = [
  { value: "j.rao", label: "J. Rao" },
  { value: "a.whyte", label: "A. Whyte" },
  { value: "m.chen", label: "M. Chen" },
];

const stages = [
  "Intake",
  "Triage",
  "Design",
  "Implement",
  "Review",
  "Security review",
  "Release",
  "Verify",
  "Done",
].map((label) => ({ value: label.toLowerCase().replace(/\s+/g, "-"), label }));

const longLabels = [
  { value: "carrier", label: "Carrier reference reconciliation for nightly shipment manifests" },
  { value: "invoice", label: "Invoice line matching against the purchase order ledger" },
  { value: "returns", label: "Returns" },
];

// Holds the value, so a story answers a pick the way a consumer would.
function Live(args: SelectProps) {
  const [value, setValue] = useState(args.value);
  return <Select {...args} value={value} onChange={setValue} />;
}

// Room below the trigger keeps an open menu inside its own themed copy.
function Roomy(args: SelectProps) {
  return (
    <div style={{ minHeight: "calc(var(--ward-space-7) * 8)", maxWidth: "var(--ward-width-dryrun)" }}>
      <Live {...args} />
    </div>
  );
}

const narrow = (args: SelectProps) => (
  <div style={{ maxWidth: "var(--ward-width-dryrun)" }}>
    <Live {...args} />
  </div>
);

export default {
  title: "Primitives/Select",
  component: Select,
  decorators: [bothThemes],
};

export const Default = {
  args: { "aria-label": "Owner", options: owners, value: "a.whyte" },
  render: narrow,
};

export const ShortList = {
  args: { "aria-label": "Owner", options: owners, value: "j.rao", defaultOpen: true },
  render: Roomy,
};

export const LongListWithFind = {
  args: { "aria-label": "Stage", options: stages, value: "review", defaultOpen: true },
  render: Roomy,
};

export const Placeholder = {
  args: { "aria-label": "Stage", options: stages, value: "", placeholder: "Choose a stage" },
  render: narrow,
};

export const Disabled = {
  args: { "aria-label": "Owner", options: owners, value: "m.chen", disabled: true },
  render: narrow,
};

export const LongLabels = {
  args: { "aria-label": "Workflow", options: longLabels, value: "carrier", defaultOpen: true },
  render: Roomy,
};
