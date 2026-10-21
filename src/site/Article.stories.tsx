import { bothThemes } from "../../.storybook/bothThemes";
import { Article } from "./Article";
import { ProseHeading } from "./Prose";

export default {
  title: "Site/Article",
  component: Article,
  decorators: [bothThemes],
};

const headings = [
  { id: "the-problem", text: "The problem", level: 2 },
  { id: "what-we-tried", text: "What we tried", level: 2 },
  { id: "smaller-batches", text: "Smaller batches", level: 3 },
  { id: "what-it-cost", text: "What it cost", level: 2 },
];

export const Full = {
  render: () => (
    <Article
      title="Why batch loads won"
      date="2026-10-03"
      minutes={6}
      eyebrow="Writing"
      eyebrowHref="/writing"
      tldr={<p>Small batches fail small. Retrying one costs minutes, not a night.</p>}
      headings={headings}
    >
      <ProseHeading level={2}>The problem</ProseHeading>
      <p>The nightly load took four hours. When it failed, the morning reports were late.</p>
      <ProseHeading level={2}>What we tried</ProseHeading>
      <p>First we added more machines. The load got faster but failed just as often.</p>
      <ProseHeading level={3}>Smaller batches</ProseHeading>
      <p>Then we split the load into batches of fifteen minutes each.</p>
      <ProseHeading level={2}>What it cost</ProseHeading>
      <p>Less than before: the retries were cheap.</p>
    </Article>
  ),
};

export const Short = {
  render: () => (
    <Article title="A note on naming" date="2026-01-30" minutes={1}>
      <p>Name a table for what one row means.</p>
    </Article>
  ),
};
