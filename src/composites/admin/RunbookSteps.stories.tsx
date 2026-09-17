import { bothThemes } from "../../../.storybook/bothThemes";
import { Btn } from "../../primitives/Btn";
import { RunbookSteps, type RunbookStep } from "./RunbookSteps";

const steps: RunbookStep[] = [
  { title: "Raise the change", detail: "Ticket CHG-4120 approved by the platform owner.", state: "done" },
  { title: "Rotate the secret", detail: "The new value is written to the vault first.", state: "pending" },
  { title: "Restart the consumers", detail: "Relay and workers pick the new value up on boot.", state: "pending" },
];

export default { title: "Admin/RunbookSteps", component: RunbookSteps, decorators: [bothThemes] };

export const NotStarted = { render: () => <RunbookSteps steps={steps} actions={<Btn variant="primary">Start rotation</Btn>} /> };

export const Running = {
  render: () => (
    <RunbookSteps
      steps={steps.map((s, i) => (i === 1 ? { ...s, state: "running" as const, startedAt: new Date(Date.now() - 42_000).toISOString() } : s))}
      actions={<Btn disabled describedBy="runbook-reason">Start rotation</Btn>}
    />
  ),
};

export const Finished = { render: () => <RunbookSteps steps={steps.map((s) => ({ ...s, state: "done" as const }))} /> };

export const Stale = {
  render: () => (
    <RunbookSteps
      connection="stale"
      steps={steps.map((s, i) => (i === 1 ? { ...s, state: "running" as const, startedAt: new Date(Date.now() - 42_000).toISOString() } : s))}
    />
  ),
};
