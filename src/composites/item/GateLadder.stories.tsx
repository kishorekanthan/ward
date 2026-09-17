import { bothThemes } from "../../../.storybook/bothThemes";
import { GateLadder } from "./GateLadder";

export default {
  title: "Item/GateLadder",
  component: GateLadder,
  decorators: [bothThemes],
};

export const Waiting = {
  args: {
    rungs: [
      { name: "Criteria met", state: "passed", actor: "triage v2" },
      { name: "DPM sign-off", state: "waiting", actor: "J. Rao" },
      { name: "Build", state: "pending" },
    ],
  },
};

export const AllPassed = {
  args: {
    rungs: [
      { name: "Criteria met", state: "passed", actor: "triage v2" },
      { name: "DPM sign-off", state: "passed", actor: "J. Rao" },
    ],
  },
};

export const NothingStarted = {
  args: {
    rungs: [
      { name: "Criteria met", state: "pending" },
      { name: "DPM sign-off", state: "pending" },
    ],
  },
};

export const Empty = { args: { rungs: [] } };
