import { bothThemes } from "../../../.storybook/bothThemes";
import { ClarificationRow } from "./ClarificationRow";

export default {
  title: "Item/ClarificationRow",
  component: ClarificationRow,
  decorators: [bothThemes],
};

const base = {
  author: "M. Chen",
  body: "Which window counts as late — 24h or the agreed SLA?",
  etaOrAttempt: "sends in 2m",
};

const handlers = { onEdit: () => {}, onWithdraw: () => {}, onCancelDelivery: () => {}, onViewOriginal: () => {} };

export const Queued = { args: { comment: { ...base, delivery: "queued" }, ...handlers } };
export const Delivered = {
  args: { comment: { ...base, delivery: "delivered", etaOrAttempt: "delivered 02:14", originalId: "c-11", editedAt: "2026-09-06T02:10:00Z" }, ...handlers },
};
export const Retrying = { args: { comment: { ...base, delivery: "retrying", etaOrAttempt: "attempt 2 of 5" }, ...handlers } };
export const Failed = { args: { comment: { ...base, delivery: "failed", etaOrAttempt: "gave up after 5 attempts" }, ...handlers } };
export const BuiltInTracker = { args: { comment: { ...base, delivery: "delivered", etaOrAttempt: "delivered 02:14" }, ...handlers, tracker: "Trellis" } };
