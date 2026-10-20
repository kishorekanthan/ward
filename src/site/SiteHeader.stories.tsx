import { bothThemes } from "../../.storybook/bothThemes";
import { SiteHeader } from "./SiteHeader";

export default {
  title: "Site/SiteHeader",
  component: SiteHeader,
  decorators: [bothThemes],
};

const links = [
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

export const Header = {
  args: { brand: "Sam Rivera", links, current: "/writing" },
};

export const Narrow = {
  render: () => (
    <div style={{ maxInlineSize: "var(--ward-width-colFloor)" }}>
      <SiteHeader brand="Sam Rivera" links={links} current="/work" />
    </div>
  ),
};
