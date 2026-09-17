import { bothThemes } from "../../../.storybook/bothThemes";
import { RoutingTable } from "./RoutingTable";

export default {
  title: "Intake/RoutingTable",
  component: RoutingTable,
  decorators: [bothThemes],
};

const routed = { id: "1", rejectedBy: "DPM", reEntersAt: "Triage", skips: "Nothing", typedInput: "reason, window" };
const noRerun = {
  id: "2",
  rejectedBy: "Approver",
  reEntersAt: "—",
  skips: "Build",
  typedInput: "reason",
  noRerun: true,
  why: "the agent has no write tools left in this window",
};

export const Routed = { args: { rows: [routed] } };
export const WithNoRerun = { args: { rows: [routed, noRerun] } };
export const Empty = { args: { rows: [] } };
