import { useState } from "react";
import { bothThemes } from "../../../.storybook/bothThemes";
import { BoardHeader } from "./BoardHeader";
import { Btn } from "../../primitives/Btn";
import { Field } from "../../primitives/Field";

const owners = [
  { value: "all", label: "Everyone" },
  { value: "j.rao", label: "J. Rao" },
  { value: "a.whyte", label: "A. Whyte" },
  { value: "m.chen", label: "M. Chen" },
];

const base = {
  stream: { name: "data-eng", key: "FL", streamStep: 1 },
  rollups: { inFlight: 14, loadedThisWeek: 31, agentsWorking: 4, p50: 5_400_000, p90: 219_600_000 },
  connection: "live",
  lastEventAt: new Date(Date.now() - 22_000).toISOString(),
  owners,
  owner: "all",
  onOwnerChange: () => {},
  onConfigure: () => {},
};

const streams = [
  { value: "data", label: "Data Engineering" },
  { value: "integration", label: "Integration" },
  { value: "payments", label: "Payments" },
];

// Holds its choice, so a pick from the open menu shows on the trigger.
function StreamField() {
  const [value, setValue] = useState("data");
  return <Field kind="select" label="Stream" value={value} options={streams} onChange={setValue} />;
}

export default {
  title: "Board/BoardHeader",
  component: BoardHeader,
  decorators: [bothThemes],
};

export const Live = { args: base };

export const CrowdedToolbar = {
  args: {
    ...base,
    owners: [{ value: "all", label: "All owners" }, ...owners.slice(1)],
    actions: <>
      <Field label="Filter items" labelHidden variant="form" placeholder="Filter by key or title" value="" onChange={() => {}} />
      <StreamField />
      <Btn variant="primary">Raise a request</Btn>
    </>,
  },
};

export const CrowdedToolbarLongNames = {
  args: {
    ...CrowdedToolbar.args,
    actions: <>
      <Field label="Filter items" labelHidden variant="form" placeholder="Filter by key or title" value="" onChange={() => {}} />
      <Field kind="select" label="Stream" value="recovery" options={[
        { value: "recovery", label: "Customer Onboarding, Identity Verification and Account Recovery" },
        { value: "integration", label: "Integration" },
      ]} onChange={() => {}} />
      <Btn variant="primary">Raise a request for this stream</Btn>
    </>,
  },
};

export const Reconnecting ={ args: { ...base, connection: "reconnecting" } };

export const Stale = {
  args: { ...base, connection: "stale", lastEventAt: "2026-09-06T02:14:00Z" },
};

export const NoPercentiles = {
  args: { ...base, rollups: { inFlight: 14, loadedThisWeek: 31, agentsWorking: 4 } },
};

export const OwnerFiltered = { args: { ...base, owner: "m.chen" } };

export const QuietBoard = {
  args: { ...base, rollups: { inFlight: 0, loadedThisWeek: 0, agentsWorking: 0 } },
};

export const OtherStream = {
  args: { ...base, stream: { name: "integration", key: "IN", streamStep: 3 } },
};

export const NoValidatedColour = {
  args: { ...base, stream: { name: "KPI config", key: "KPI", streamStep: null } },
};
