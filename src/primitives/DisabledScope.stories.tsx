import { bothThemes } from "../../.storybook/bothThemes";
import { ConfigRow } from "../composites/board/ConfigRow";
import { Btn } from "./Btn";
import { DisabledScope } from "./DisabledScope";
import { Field } from "./Field";
import { Switch } from "./Switch";

export default {
  title: "Primitives/DisabledScope",
  component: DisabledScope,
  decorators: [bothThemes],
};

const stage = { id: "implement", name: "Implement", gate: false, terminal: false, agentsMounted: 2 };

// A read-only region: one reason, every control inside disabled and naming it.
export const ReadOnlyRegion = {
  render: () => (
    <DisabledScope reason="Read only. You can look but not change anything here.">
      <ConfigRow stage={stage} config={{ label: "Implementing", cap: 6, shown: true }} onChange={() => {}} onReorder={() => {}} />
      <Field label="Stream name" value="Regulatory Ops" onChange={() => {}} />
      <Field kind="select" label="Owner" value="priya" options={[{ value: "priya", label: "Priya" }]} onChange={() => {}} />
      <Switch label="Gate notifications" checked onChange={() => {}} />
      <Btn variant="primary" label="Save changes" onClick={() => {}} />
    </DisabledScope>
  ),
};
