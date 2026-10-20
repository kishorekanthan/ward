import { bothThemes } from "../../.storybook/bothThemes";
import { CaseStudy } from "./CaseStudy";
import { ProseHeading } from "./Prose";

export default {
  title: "Site/CaseStudy",
  component: CaseStudy,
  decorators: [bothThemes],
};

const body = (
  <>
    <p>The nightly load took four hours and failed often. We moved it to small batches that ran every fifteen minutes.</p>
    <ProseHeading level={2}>What changed</ProseHeading>
    <p>Each batch was small enough to retry. A failure now cost minutes, not a night.</p>
  </>
);

export const Full = {
  render: () => (
    <CaseStudy
      title="From nightly loads to small batches"
      summary="A data platform that stopped failing at night."
      eyebrow="Case study"
      eyebrowHref="/work"
      role="Lead engineer"
      period="2024 to 2025"
      focus={["Reliability", "Cost"]}
      stack={["Python", "SQL", "Airflow"]}
      related={[
        { href: "/writing/batch-loads", label: "Why batch loads won", note: "Article" },
        { href: "/projects/loader", label: "Loader", note: "Side project" },
      ]}
    >
      {body}
    </CaseStudy>
  ),
};

export const Minimal = {
  render: () => (
    <CaseStudy title="A cost review that stuck" summary="Three changes that cut the bill by a third.">
      <p>We read every line of the bill with the team that owned it.</p>
    </CaseStudy>
  ),
};
