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
  args: { links: studio, active: "gates", level: "page", label: "Studio sections" },
};

export const Section = {
  args: { links: studio, active: "console", level: "section", label: "Studio sections" },
};

// Five links at phone width: those that do not fit wait in More, and the current last link stays in the strip.
export const PhoneWidth = {
  args: { links: studio, active: "audit", level: "page", label: "Studio sections" },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
