import { bothThemes } from "../../.storybook/bothThemes";
import { SiteFooter } from "./SiteFooter";

export default {
  title: "Site/SiteFooter",
  component: SiteFooter,
  decorators: [bothThemes],
};

export const Footer = {
  args: {
    note: "Built with Astro and Ward. Last updated October 2026.",
    links: [
      { href: "https://github.com/example", label: "GitHub" },
      { href: "/rss.xml", label: "RSS" },
      { href: "/about", label: "Contact" },
    ],
  },
};

export const NoteOnly = {
  args: { note: "Built with Astro and Ward." },
};
