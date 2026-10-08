import { bothThemes } from "../../.storybook/bothThemes";
import { Chip } from "./Chip";

export default {
  title: "Primitives/Chip",
  component: Chip,
  decorators: [bothThemes],
};

export const Gate = { args: { role: "gate", label: "Gate" } };
export const System = { args: { role: "system", label: "When" } };
export const Write = { args: { role: "write", label: "Write" } };
export const Drift = { args: { role: "drift", label: "Drift flag" } };
export const Done = { args: { role: "done", label: "v3 live" } };
export const Attention = { args: { role: "attention", label: "Needs a human" } };
export const Failed = { args: { role: "failed", label: "Failed" } };
export const Pending = { args: { role: "pending", label: "Queued" } };
export const Running = { args: { role: "running", label: "Agent working" } };
export const Warn = { args: { role: "warn", label: "Over cap" } };
export const Meta = { args: { role: "meta", label: "Locked" } };
export const Soft = { args: { role: "soft", label: "Terminal" } };
export const Owed = { args: { role: "owed", label: "Owed by you" } };

export const StreamDataEng = { args: { role: "stream", label: "data-eng", streamStep: 1 } };
export const StreamFrontEnd = { args: { role: "stream", label: "front-end", streamStep: 2 } };
export const StreamIntegration = { args: { role: "stream", label: "integration", streamStep: 3 } };
