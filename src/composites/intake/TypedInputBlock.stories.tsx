import { bothThemes } from "../../../.storybook/bothThemes";
import { TypedInputBlock } from "./TypedInputBlock";

export default {
  title: "Intake/TypedInputBlock",
  component: TypedInputBlock,
  decorators: [bothThemes],
};

export const Contract = {
  args: {
    lines: [
      { kind: "dim", text: "// typed input required at rejection" },
      { kind: "tool", text: "reason: string" },
      { kind: "tool", text: "window: '24h' | 'sla'" },
      { kind: "ok", text: "accepted by triage v2" },
    ],
  },
};

export const WithWarning = {
  args: {
    lines: [
      { kind: "tool", text: "reason: string" },
      { kind: "warn", text: "window: unset — the agent will ask again" },
    ],
  },
};

export const Empty = { args: { lines: [] } };
