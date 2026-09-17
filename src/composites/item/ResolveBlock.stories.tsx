import { bothThemes } from "../../../.storybook/bothThemes";
import { ResolveBlock } from "./ResolveBlock";

export default {
  title: "Item/ResolveBlock",
  component: ResolveBlock,
  decorators: [bothThemes],
};

const clarify = {
  kind: "clarify",
  consequence: "The agent waits for your answer, then continues.",
  requiredRole: "MEMBER",
  allowed: true,
};

const requeue = { kind: "requeue", consequence: "The agent runs the stage again.", requiredRole: "MEMBER", allowed: true };

const override = {
  kind: "override",
  consequence: "The item advances without the gate.",
  requiredRole: "APPROVER",
  allowed: false,
  askInstead: "Ask J. Rao to approve this override.",
};

export const MemberView = { args: { paths: [clarify, requeue, override], onChoose: () => {} } };
export const ApproverView = { args: { paths: [clarify, requeue, { ...override, allowed: true }], onChoose: () => {} } };
export const AllDenied = {
  args: {
    paths: [
      { ...clarify, allowed: false, askInstead: "Ask a stream member to raise the question." },
      { ...override },
    ],
    onChoose: () => {},
  },
};
