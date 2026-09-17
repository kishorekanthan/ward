import { overlayThemes } from "../../../.storybook/overlayThemes";
import { RequeueSheet } from "./RequeueSheet";

export default {
  title: "Item/RequeueSheet",
  component: RequeueSheet,
  decorators: [overlayThemes],
};

const base = {
  run: { agent: "triage v2", stage: "Triage" },
  effects: ["The current draft is replaced.", "The clarification thread stays.", "Time in stage restarts."],
  refusals: [],
  cost: { spent: 0.34, more: 0.12, itemTotal: 0.46, ceiling: 2 },
  onRequeue: () => {},
  onClose: () => {},
};

export const Allowed = { args: base };
export const Refused = {
  args: { ...base, refusals: [{ reason: "Write tools are frozen during the change window." }, { reason: "The item is held for approval." }] },
};
export const NoEffectsListed = { args: { ...base, effects: [] } };
export const AtCeiling = { args: { ...base, cost: { spent: 1.94, more: 0.12, itemTotal: 1.94, ceiling: 2 }, refusals: [{ reason: "The item is at its cost ceiling." }] } };
