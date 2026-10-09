import type { ComponentType, ReactNode } from "react";
import { bothThemes } from "../../.storybook/bothThemes";
import { fullPage } from "../../.storybook/fullPage";
import { AppShell, type AppShellRailItem } from "./AppShell";
import { BoardIcon, HomeIcon, StudioIcon } from "./NavIcons";
import { Sidebar, type SidebarAgent } from "./Sidebar";
import { SIDEBAR_COLLAPSED_KEY } from "./useSidebarCollapse";
import { Btn } from "../primitives/Btn";
import { SegmentedControl } from "../primitives/SegmentedControl";

/* Slot filler only — the real Sidebar, TopBar and RightRail are separate
   components. Padding comes from tokens so the story does not plant raw px. */
const sidebar = (
  <nav aria-label="Trellis sections" style={{ padding: "var(--ward-pad-bar)" }}>
    Board · Overview · Studio
  </nav>
);

const header = <div style={{ padding: "var(--ward-pad-bar)" }}>Claims Extraction</div>;

const rail = <div style={{ padding: "var(--ward-space-4)" }}>Dry run · 3/8 turns</div>;

const body = <p>The centre column, inset by pad-page — 0 20px 22px, as the comp has it.</p>;

export default {
  title: "Layout/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  decorators: [bothThemes],
  args: { sidebar, header, rail, children: body },
};

export const NoRail = {
  decorators: [bothThemes],
  args: { sidebar, header, children: body },
};

export const NoHeader = {
  decorators: [bothThemes],
  args: { sidebar, rail, children: body },
};

export const LongWordInPage = {
  decorators: [bothThemes],
  args: {
    sidebar,
    header,
    rail,
    children: (
      <p>
        The centre track is 1fr with min-width: 0, so this does not push the rail off:
        Reticulating_splines_across_an_unbroken_identifier_that_never_wraps_anywhere_at_all_1234567890
      </p>
    ),
  },
};

const destinations = ["Home", "Board", "Studio", "Intake", "Tracker", "Admin"].map((label) => ({ id: label.toLowerCase(), label, href: `#/${label.toLowerCase()}` }));

const themes = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const tools = (
  <>
    <SegmentedControl label="Theme" options={themes} value="system" onChange={() => {}} />
    <Btn variant="ghost" size="sm">Sign out</Btn>
  </>
);

// At phone width the theme switch and Sign out sit behind the Settings toggle, which opens a row under the bar.
export const TopBarPhoneWidth = {
  decorators: [bothThemes],
  args: { destinations, active: "board", actor: "P. Nayar", metadata: "operator", tools, children: <p>Page content.</p> },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// Five links overflow a 375px bar; the current one, past the right edge, scrolls into view and the start fade says more wait left.
export const TopBarPhoneWidthCurrentPastEdge = {
  decorators: [bothThemes],
  args: { destinations: destinations.slice(1), active: "admin", actor: "P. Nayar", metadata: "operator", tools, children: <p>Page content.</p> },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

// More links and more text than a 1280 by 720 window holds: the sidebar and page scroll inside a frame exactly the viewport tall.
// Below 792px the sidebar folds into a drawer behind the Sections toggle. One copy, so the frame measures the real viewport.
const manyDestinations = Array.from({ length: 24 }, (_, i) => ({ id: `stream-${i + 1}`, label: `Stream ${i + 1}`, href: `#/streams/${i + 1}` }));

export const StudioFullPage = {
  decorators: [fullPage],
  args: {
    sidebar: <Sidebar brand="Trellis" label="Streams" destinations={manyDestinations} active="stream-3" />,
    sidebarLabel: "Sections",
    header,
    rail,
    children: Array.from({ length: 60 }, (_, i) => <p key={i}>Paragraph {i + 1} of the centre column, long enough that the page body has to scroll.</p>),
  },
};

// Three destinations: the Studio sidebar's pill row fits three across the floating panel.
const studioNav = [
  { label: "Home", href: "#/" },
  { label: "Board", href: "#/board", current: true },
  { label: "Studio", href: "#/studio" },
];

const studioAgents: SidebarAgent[] = [
  { label: "Data Engineering", href: "#/streams/data", meta: "18 in flight", streamStep: 1 },
  { label: "Integration", href: "#/streams/integration", meta: "6 in flight", streamStep: 3 },
  { label: "UI and UX", href: "#/streams/ui", meta: "4 in flight", streamStep: 2 },
];

const iconRail: AppShellRailItem[] = [
  { id: "home", label: "Home", href: "#/", icon: <HomeIcon /> },
  { id: "board", label: "Board", href: "#/board", icon: <BoardIcon />, current: true },
  { id: "studio", label: "Studio", href: "#/studio", icon: <StudioIcon /> },
  ...studioAgents.map((agent) => ({ id: agent.href, label: agent.label, href: agent.href, streamStep: agent.streamStep })),
];

const floatingArgs = {
  sidebar: <Sidebar brand="Trellis" nav={studioNav} agentsHeading="Streams" agents={studioAgents} />,
  iconRail,
  header,
  children: body,
};

// The viewer's choice lives in storage, so each story sets it before the shell reads it on mount.
function storedFold(collapsed: boolean) {
  return function StoredFold(Story: ComponentType): ReactNode {
    try {
      window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
    } catch {
      // A story without storage opens expanded.
    }
    return <Story />;
  };
}

// The floating panel with its labels; the panel button at the top, or `[`, collapses it.
export const SidebarExpanded = {
  decorators: [bothThemes, storedFold(false)],
  args: floatingArgs,
};

// The 60px icon rail: each item keeps its name as a tooltip, and streams show their colour square.
export const SidebarCollapsed = {
  decorators: [bothThemes, storedFold(true)],
  args: floatingArgs,
};

// Below 792px the collapse does not apply: the Menu toggle opens the whole sidebar in a drawer.
export const SidebarNarrow = {
  decorators: [bothThemes, storedFold(true)],
  args: floatingArgs,
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
