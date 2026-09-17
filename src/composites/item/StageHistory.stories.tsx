import { bothThemes } from "../../../.storybook/bothThemes";
import { StageHistory } from "./StageHistory";

export default {
  title: "Item/StageHistory",
  component: StageHistory,
  decorators: [bothThemes],
};

const done = {
  stage: "Intake",
  sentence: "Raised from a chat session.",
  at: "2026-09-02T09:04:00Z",
  actor: "M. Chen",
  state: "done",
};

const agent = {
  stage: "Triage",
  sentence: "Draft KPI config produced.",
  at: "2026-09-03T11:20:00Z",
  actor: "triage v2",
  version: "v7",
  cost: 0.34,
  state: "done",
};

const hold = {
  stage: "DPM sign-off",
  sentence: "Waiting on a decision about the late-arrival window.",
  at: "2026-09-04T08:10:00Z",
  actor: "J. Rao",
  state: "hold",
};

const pending = {
  stage: "Build",
  sentence: "Not started.",
  at: "2026-09-04T08:10:00Z",
  actor: "build v3",
  state: "pending",
};

export const Held = { args: { entries: [done, agent, hold] } };
export const Complete = { args: { entries: [done, agent, { ...hold, state: "done" }] } };
export const Ahead = { args: { entries: [done, agent, hold, pending] } };
export const SingleEntry = { args: { entries: [done] } };
