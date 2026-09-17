import { bothThemes } from "../../.storybook/bothThemes";
import { PageFrame } from "./PageFrame";

export default {
  title: "Layout/PageFrame",
  component: PageFrame,
  decorators: [bothThemes],
};

export const PageInset = {
  args: { as: "div", children: <p>Page content inset by the page gutter.</p> },
};

export const NoInset = {
  args: { as: "div", inset: "none", children: <p>Full-bleed content with no gutter.</p> },
};
