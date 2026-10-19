import { bothThemes } from "../../.storybook/bothThemes";
import { StageSteps } from "./StageSteps";

export default {
  title: "Primitives/StageSteps",
  component: StageSteps,
  decorators: [bothThemes],
};

const steps = (now: number) => ["Triage", "Plan", "Build", "Done"].map((label, i) => ({ label, state: i < now ? "done" : i === now ? "now" : "next" }) as const);

export const Running = { args: { steps: steps(2), running: true } };

export const Waiting = { args: { steps: steps(2), running: false } };

export const Finished = { args: { steps: steps(4).map((step, i) => (i === 3 ? { ...step, state: "now" as const } : step)) } };
