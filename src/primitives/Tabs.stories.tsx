import { bothThemes } from "../../.storybook/bothThemes";
import { useState } from "react";
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
  args: { tabs: board, active: "board", level: "page", label: "Stream sections", onChange: () => {} },
};

export const WithCounts = {
  args: { tabs: counted, active: "gate", level: "page", label: "Item states", onChange: () => {} },
};

export const Section = {
  args: { tabs: board, active: "agents", level: "section", label: "Agent sections", onChange: () => {} },
};

export const SevenTabs = {
  args: { tabs: admin, active: "roles", level: "page", label: "Admin sections", onChange: () => {} },
};

// Eight tabs at phone width: those that do not fit wait in More, and the selected sixth tab stays in the strip.
export const PhoneWidth = {
  args: { tabs: stream, active: "connections", level: "page", label: "Stream sections", onChange: () => {} },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

const studio = [
  { id: "streams", label: "Streams" },
  { id: "gates", label: "Gates" },
  { id: "audit", label: "Audit" },
];

function PageOverSection() {
  const [page, setPage] = useState("streams");
  const [section, setSection] = useState("workflow");
  return (
    <div>
      <Tabs tabs={studio} active={page} level="page" label="Studio" onChange={setPage} />
      <h1>Data Engineering</h1>
      <Tabs tabs={stream.slice(0, 4)} active={section} level="section" label="Stream sections" onChange={setSection} />
    </div>
  );
}

// One page strip above the title and one section strip below it: only the page strip draws a pill.
export const PageAndSection = { render: () => <PageOverSection /> };
