import { bothThemes } from "../../.storybook/bothThemes";
import { SectionHeader } from "./SectionHeader";

export default {
  title: "Primitives/SectionHeader",
  component: SectionHeader,
  decorators: [bothThemes],
};

export const Default = {
  args: { index: "01", title: "Tools" },
};

/* The comp's own shape: a plain label with its note on the same baseline, no
   number. Three of the six comps declare exactly this. */
export const PlainLabelAndNote = {
  args: { title: "Description", note: "from Jira · never edited here" },
};

export const WithNote = {
  args: {
    index: "02",
    title: "Contract",
    note: "The four actions a rule may take are fixed.",
  },
};

export const WithCounter = {
  args: { index: "03", title: "Tools", counter: "6 granted of 14" },
};

export const NoteAndCounter = {
  args: {
    index: "04",
    title: "Reviewers",
    note: "A gate needs two named reviewers before it can go live.",
    counter: "2 named",
  },
};
