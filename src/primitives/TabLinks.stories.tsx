import { bothThemes } from "../../.storybook/bothThemes";
import { TabLinks } from "./TabLinks";

const studio = [
  { id: "streams", label: "Streams", href: "#/studio/streams" },
  { id: "gates", label: "Gates", href: "#/studio/gates" },
  { id: "connectors", label: "Connectors", href: "#/studio/connectors" },
  { id: "console", label: "Test console", href: "#/studio/console" },
  { id: "audit", label: "Audit", href: "#/studio/audit" },
];

export default {
  title: "Primitives/TabLinks",
  component: TabLinks,
  decorators: [bothThemes],
};

export const Default = {
  args: { links: studio, active: "gates", label: "Studio sections" },
};

export const SecondLevel = {
  args: { links: studio, active: "console", level: 2, label: "Studio sections" },
};

// Five links at phone width scroll inside the strip; the current last link starts in view, clear of the fades.
export const PhoneWidth = {
  args: { links: studio, active: "audit", label: "Studio sections" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
