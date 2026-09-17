import { bothThemes } from "../../../.storybook/bothThemes";
import type { ReactNode } from "react";
import { RuleRow, type Rule } from "./RuleRow";

function Table({ children }: { children: ReactNode }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>{children}</tbody>
    </table>
  );
}

const when = { field: "carrier_reference", op: "is", value: "missing" };
const rule = (then: Rule["then"]): Rule => ({ when, then });

const noop = () => {};

export default {
  title: "Studio/RuleRow",
  component: RuleRow,
  decorators: [bothThemes],
};

export const Advance = {
  render: () => (
    <Table>
      <RuleRow rule={rule("advance")} onChange={noop} />
    </Table>
  ),
};

export const Block = {
  render: () => (
    <Table>
      <RuleRow rule={rule("block")} onChange={noop} />
    </Table>
  ),
};

export const Escalate = {
  render: () => (
    <Table>
      <RuleRow rule={rule("escalate")} onChange={noop} />
    </Table>
  ),
};

export const RequestReview = {
  render: () => (
    <Table>
      <RuleRow rule={rule("requestReview")} onChange={noop} />
    </Table>
  ),
};

export const ReadOnly = {
  render: () => (
    <Table>
      <RuleRow rule={rule("block")} readOnly />
    </Table>
  ),
};

export const NoHandler = {
  render: () => (
    <Table>
      <RuleRow rule={rule("escalate")} />
    </Table>
  ),
};
