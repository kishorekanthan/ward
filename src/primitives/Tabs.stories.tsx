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

export const AtCap = {
  args: { tabs: admin, active: "roles", label: "Admin sections", onChange: () => {} },
};
