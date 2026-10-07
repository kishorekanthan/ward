import { bothThemes } from "../../../.storybook/bothThemes";
import type { ReactNode } from "react";
import { Field } from "../../primitives/Field";
import { SegmentedControl } from "../../primitives/SegmentedControl";
import { PolicyRow, type PolicyControl, type PolicySetting } from "./PolicyRow";

const setting: PolicySetting = {
  name: "Gate notifications",
  consequence: "Approvers stop hearing about waiting gates when this is off.",
};

const toggle: PolicyControl = { kind: "switch", checked: true, onChange: () => {} };

function Table({ children }: { children: ReactNode }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>{children}</tbody>
    </table>
  );
}

export default { title: "Admin/PolicyRow", component: PolicyRow, decorators: [bothThemes] };

export const Inherited = {
  render: () => (
    <Table>
      <PolicyRow setting={setting} control={toggle} inheritance="inherited" />
    </Table>
  ),
};

export const Overridden = {
  render: () => (
    <Table>
      <PolicyRow setting={setting} control={toggle} inheritance="overridden" reason="Overridden for Data engineering." />
    </Table>
  ),
};

export const Locked = {
  render: () => (
    <Table>
      <PolicyRow setting={setting} control={toggle} inheritance="locked" reason="Set by platform policy PLT-118." />
    </Table>
  ),
};

export const Derived = {
  render: () => (
    <Table>
      <PolicyRow
        setting={{ name: "Digest window", consequence: "Derived from the stream's working hours." }}
        control={{ kind: "value", text: "09:00 – 18:00 Europe/London" }}
        inheritance="derived"
      />
    </Table>
  ),
};

export const Segmented = {
  render: () => (
    <Table>
      <PolicyRow
        setting={{ name: "Card delivery", consequence: "Where a Teams notification lands." }}
        control={{ kind: "segment", options: [{ value: "channel", label: "Channel" }, { value: "chat", label: "Direct chat" }], value: "channel", onChange: () => {} }}
        inheritance="overridden"
      />
    </Table>
  ),
};

const RERUN = [
  { value: "implement", label: "implement" },
  { value: "producing-stage", label: "producing stage" },
];

// Narrow controls keep the 150px value column; a wide segment, drawn or passed in, widens it and stays clear of the chip (#185).
// At phone width each row stacks: the setting on its own line, control and chip below (#189).
export const WebWideControls = {
  render: () => (
    <div>
      <PolicyRow presentation="web" setting={{ name: "Create issues in Jira", consequence: "When a request is confirmed." }} control={{ kind: "switch", value: true }} inheritance="inherited" />
      <PolicyRow
        presentation="web"
        setting={{ name: "Duplicate similarity threshold", consequence: "Above this, a request is a duplicate." }}
        control={{ kind: "value", value: "0.75" }}
        inheritance="inherited"
        renderControl={(describedBy) => <Field label="Duplicate similarity threshold" labelHidden mono value="0.75" describedBy={describedBy} onChange={() => {}} />}
      />
      <PolicyRow presentation="web" setting={{ name: "Label prefix", consequence: "Set by the platform." }} control={{ kind: "value", value: "trellis:" }} inheritance="locked" />
      <PolicyRow
        presentation="web"
        setting={{ name: "Rejected by the PR review agent", consequence: "Where the item goes back to." }}
        control={{ kind: "segment", value: "implement", options: RERUN }}
        inheritance="inherited"
        renderControl={(describedBy) => <SegmentedControl label="Rejected by the PR review agent" options={RERUN} value="implement" describedBy={describedBy} onChange={() => {}} />}
      />
      <PolicyRow presentation="web" setting={{ name: "Rejected by a test run", consequence: "Where the item goes back to." }} control={{ kind: "segment", value: "producing-stage", options: RERUN }} inheritance="overridden" />
    </div>
  ),
};
