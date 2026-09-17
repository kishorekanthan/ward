import { bothThemes } from "../../.storybook/bothThemes";
import { Crumb } from "./Crumb";

const path = [
  { label: "Studio", href: "/studio" },
  { label: "data-eng", href: "/studio/data-eng" },
  { label: "intake-advisor" },
];

export default {
  title: "Primitives/Crumb",
  component: Crumb,
  decorators: [bothThemes],
};

export const Default = {
  args: { path },
};

export const WithChips = {
  args: {
    path,
    chips: [
      { role: "stream", label: "data-eng", streamStep: 1 },
      { role: "done", label: "V3 LIVE" },
    ],
  },
};

export const SingleStep = {
  args: { path: [{ label: "Studio" }] },
};

export const UnlinkedAncestor = {
  args: { path: [{ label: "Studio" }, { label: "data-eng" }, { label: "FL-229" }] },
};
