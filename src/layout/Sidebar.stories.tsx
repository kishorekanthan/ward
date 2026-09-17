import type { ReactNode } from "react";
import { bothThemes } from "../../.storybook/bothThemes";
import { Sidebar, type SidebarAgent } from "./Sidebar";

function Column({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "var(--ward-width-sidebar)",
        minHeight: "var(--ward-height-app)",
        background: "var(--ward-color-surface)",
        borderRight: "var(--ward-border) solid var(--ward-color-line)",
      }}
    >
      {children}
    </div>
  );
}

const nav = [
  { label: "Board", href: "/board" },
  { label: "Overview", href: "/overview" },
  { label: "Studio", href: "/studio", current: true },
];

const agents: SidebarAgent[] = [
  { label: "Claims Extract Reviewer", href: "/studio/claims-extract-reviewer", meta: "v7 draft · edited 12m ago", streamStep: 1, current: true },
  { label: "Schema Drift Watcher", href: "/studio/schema-drift-watcher", meta: "v3 live · 41 runs / 7d", streamStep: 1 },
  { label: "Component Deprecation", href: "/studio/component-deprecation", meta: "v2 live · 6 runs / 7d", streamStep: 2 },
  { label: "Jira Outbox Reconciler", href: "/studio/jira-outbox-reconciler", meta: "v5 live · 212 runs / 7d", streamStep: 3 },
  { label: "Vendor SLA Digest", href: "/studio/vendor-sla-digest", meta: "paused 3 Sep", streamStep: 1, paused: true },
];

const shared = {
  heading: "Shared",
  links: [
    { label: "Tool registry", href: "/shared/tools" },
    { label: "Prompt library", href: "/shared/prompts" },
    { label: "Run history", href: "/shared/runs" },
  ],
};

export default {
  title: "Layout/Sidebar",
  component: Sidebar,
  decorators: [bothThemes],
};

export const Studio = {
  render: () => (
    <Column>
      <Sidebar
        brand="Trellis"
        nav={nav}
        agentsHeading="Agents"
        agents={agents}
        newAction={{ label: "New", href: "/studio/new" }}
        shared={shared}
      />
    </Column>
  ),
};

export const NoAgentsYet = {
  render: () => (
    <Column>
      <Sidebar
        brand="Trellis"
        nav={nav}
        agentsHeading="Agents"
        agents={[]}
        newAction={{ label: "New", href: "/studio/new" }}
        shared={shared}
      />
    </Column>
  ),
};

export const EveryAgentPaused = {
  render: () => (
    <Column>
      <Sidebar
        brand="Trellis"
        nav={nav}
        agentsHeading="Agents"
        agents={agents.map((a) => ({ ...a, paused: true, current: false, meta: "paused 3 Sep" }))}
        shared={shared}
      />
    </Column>
  ),
};

export const NoSharedSection = {
  render: () => (
    <Column>
      <Sidebar brand="Trellis" nav={nav} agentsHeading="Agents" agents={agents} newAction={{ label: "New", href: "/studio/new" }} />
    </Column>
  ),
};

export const EveryStreamHue = {
  render: () => (
    <Column>
      <Sidebar
        brand="Trellis"
        nav={nav}
        agentsHeading="Agents"
        agents={[1, 2, 3, 4, 5, 6].map((n) => ({
          label: `Stream ${n} agent`,
          href: `/studio/s${n}`,
          meta: `v1 live · ${n} runs / 7d`,
          streamStep: n as SidebarAgent["streamStep"],
        }))}
        shared={shared}
      />
    </Column>
  ),
};
