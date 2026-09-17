import { bothThemes } from "../../../.storybook/bothThemes";
import type { ReactNode } from "react";
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
