import { bothThemes } from "../../.storybook/bothThemes";
import { TopBar } from "./TopBar";

const destinations = [
  { id: "board", label: "Board", href: "/board" },
  { id: "studio", label: "Studio", href: "/studio" },
  { id: "intake", label: "Intake", href: "/intake" },
  { id: "admin", label: "Admin", href: "/admin" },
];

export default {
  title: "Primitives/TopBar",
  component: TopBar,
  decorators: [bothThemes],
};

export const Default = {
  args: { wordmark: "Trellis", destinations, active: "board", onNavigate: () => {} },
};

export const WithActor = {
  args: {
    wordmark: "Trellis",
    destinations,
    active: "studio",
    actor: { label: "kkishore3k" },
    onNavigate: () => {},
  },
};

export const SingleDestination = {
  args: {
    wordmark: "Trellis",
    destinations: [destinations[0]],
    active: "board",
    onNavigate: () => {},
  },
};

export const SkipTarget = {
  args: {
    wordmark: "Trellis",
    destinations,
    active: "admin",
    actor: { label: "kkishore3k" },
    skipTo: "admin-main",
    onNavigate: () => {},
  },
};
