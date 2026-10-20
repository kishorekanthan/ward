import { bothThemes } from "../../.storybook/bothThemes";
import { Eyebrow } from "./Eyebrow";

export default {
  title: "Site/Eyebrow",
  component: Eyebrow,
  decorators: [bothThemes],
};

export const Plain = {
  args: { children: "Flagship · Data platforms" },
};

export const Linked = {
  args: { children: "Article", href: "/writing" },
};
