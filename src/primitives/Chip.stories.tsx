import { bothThemes } from "../../.storybook/bothThemes";
import { Chip } from "./Chip";

export default {
  title: "Primitives/Chip",
  component: Chip,
  decorators: [bothThemes],
};

export const Gate = { args: { role: "gate", label: "GATE" } };
export const System = { args: { role: "system", label: "WHEN" } };
export const Write = { args: { role: "write", label: "WRITE" } };
export const Drift = { args: { role: "drift", label: "DRIFT FLAG" } };
export const Done = { args: { role: "done", label: "V3 LIVE" } };
export const Attention = { args: { role: "attention", label: "NEEDS A HUMAN" } };
export const Failed = { args: { role: "failed", label: "FAILED" } };
export const Pending = { args: { role: "pending", label: "QUEUED" } };
export const Running = { args: { role: "running", label: "AGENT WORKING" } };
export const Warn = { args: { role: "warn", label: "OVER CAP" } };
export const Meta = { args: { role: "meta", label: "LOCKED" } };
export const Soft = { args: { role: "soft", label: "TERMINAL" } };

export const StreamDataEng = { args: { role: "stream", label: "data-eng", streamStep: 1 } };
export const StreamFrontEnd = { args: { role: "stream", label: "front-end", streamStep: 2 } };
export const StreamIntegration = { args: { role: "stream", label: "integration", streamStep: 3 } };
