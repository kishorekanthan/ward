import { bothThemes } from "../../../.storybook/bothThemes";
import { SessionRow } from "./SessionRow";

export default {
  title: "Intake/SessionRow",
  component: SessionRow,
  decorators: [bothThemes],
};

const base = {
  title: "Late-arriving shipments view",
  turns: 6,
  waitingOn: "you",
  resolved: ["Stream", "Owner"],
  lastActivity: "2026-09-06T02:14:00Z",
  state: "open",
};

export const Open = { args: { session: { ...base, cost: 0.34 } } };
export const OpenWithoutCost = { args: { session: base } };
export const Draft = { args: { session: { ...base, state: "draft", waitingOn: "you", cost: 0.12 } } };
export const Created = {
  args: { session: { ...base, state: "created", link: { key: "FL-229", href: "/items/FL-229" }, cost: 0.46 } },
};
export const Duplicate = { args: { session: { ...base, state: "duplicate", resolved: [] } } };
export const Expired = { args: { session: { ...base, state: "expired", waitingOn: undefined, resolved: [] } } };
