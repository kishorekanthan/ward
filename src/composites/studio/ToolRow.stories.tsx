import { bothThemes } from "../../../.storybook/bothThemes";
import { ToolRow, type Tool } from "./ToolRow";

const read: Tool = {
  name: "foundry.query",
  scope: "dataset:shipments",
  classification: "read",
  grant: "granted",
};

export default {
  title: "Studio/ToolRow",
  component: ToolRow,
  decorators: [bothThemes],
};

const base = { onChange: () => {} };

export const Granted = { args: { ...base, tool: read } };

export const Available = {
  args: { ...base, tool: { ...read, grant: "available" } },
};

export const WriteTool = {
  args: {
    ...base,
    tool: { name: "jira.comment", scope: "project:FL", classification: "write", grant: "granted" },
  },
};

export const Locked = {
  args: {
    ...base,
    tool: {
      name: "jira.transition",
      scope: "project:FL",
      classification: "write",
      grant: "locked",
      reason: "Write tools are frozen during the change window.",
    },
  },
};

export const LockedWithoutReason = {
  args: { ...base, tool: { ...read, grant: "locked" } },
};
