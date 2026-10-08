import { bothThemes } from "../../../.storybook/bothThemes";
import type { ComponentType, ReactNode } from "react";
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

// A 120-character title and a 40-character owner wrap to two lines, then cut, in the card and the table (#199).
const long = {
  ...base,
  title: "Reconcile late-arriving inbound shipments against the carrier's manifest before the nightly warehouse cut-off has closed",
  waitingOn: "Alexandra Whitfield-Montgomery Okafor-Li",
  cost: 0.34,
};

const inTable = (Story: ComponentType): ReactNode => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <tbody>
      <Story />
    </tbody>
  </table>
);

export const LongTitle = { args: { session: long } };

export const LongTitleTable = { args: { session: long, presentation: "table", href: "/intake/sessions/7" }, decorators: [inTable] };

// The expired title stays a link in the title colour; only the state cell says it expired (#201).
export const ExpiredTable = {
  args: { session: { ...base, state: "expired", waitingOn: undefined, resolved: [] }, presentation: "table", href: "/intake/sessions/7" },
  decorators: [inTable],
};
