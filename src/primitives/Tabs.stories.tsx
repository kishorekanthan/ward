import { bothThemes } from "../../.storybook/bothThemes";
import { Tabs } from "./Tabs";

const board = [
  { id: "board", label: "Board" },
  { id: "agents", label: "Agents" },
  { id: "policy", label: "Policy" },
];

const counted = [
  { id: "open", label: "Open", count: 14 },
  { id: "gate", label: "At a gate", count: 3 },
  { id: "done", label: "Done", count: 61 },
];

const admin = [
  { id: "people", label: "People" },
  { id: "roles", label: "Roles" },
  { id: "policy", label: "Policy" },
  { id: "credentials", label: "Credentials" },
  { id: "servers", label: "Servers" },
  { id: "appearance", label: "Appearance" },
  { id: "runbooks", label: "Runbooks" },
];

const stream = [
  { id: "overview", label: "Overview" },
  { id: "workflow", label: "Workflow" },
  { id: "agents", label: "Agents" },
  { id: "skills", label: "Skills" },
  { id: "rules", label: "Rules" },
  { id: "connections", label: "Connections" },
  { id: "settings", label: "Settings" },
  { id: "history", label: "Run history", count: 12 },
];

export default {
  title: "Primitives/Tabs",
  component: Tabs,
  decorators: [bothThemes],
};

export const Default = {
  args: { tabs: board, active: "board", label: "Stream sections", onChange: () => {} },
};

export const WithCounts = {
  args: { tabs: counted, active: "gate", label: "Item states", onChange: () => {} },
};

export const SecondLevel = {
  args: { tabs: board, active: "agents", level: 2, label: "Agent sections", onChange: () => {} },
};

export const SevenTabs = {
  args: { tabs: admin, active: "roles", label: "Admin sections", onChange: () => {} },
};

// Eight tabs at phone width: those that do not fit wait in More, and the selected sixth tab stays in the strip.
export const PhoneWidth = {
  args: { tabs: stream, active: "connections", label: "Stream sections", onChange: () => {} },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
