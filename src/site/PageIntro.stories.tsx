import { bothThemes } from "../../.storybook/bothThemes";
import { PageIntro } from "./PageIntro";

export default {
  title: "Site/PageIntro",
  component: PageIntro,
  decorators: [bothThemes],
};

export const Intro = {
  args: {
    eyebrow: "Case study",
    eyebrowHref: "/work",
    title: "Cutting a nightly load from four hours to twenty minutes",
    lead: "How a data team moved to small batch loads, and what it cost them.",
  },
};

export const TitleOnly = {
  args: { title: "Writing" },
};
