import { bothThemes } from "../../.storybook/bothThemes";
import { Prose, ProseHeading } from "./Prose";

export default {
  title: "Site/Prose",
  component: Prose,
  decorators: [bothThemes],
};

export const Article = {
  render: () => (
    <Prose>
      <p>
        The nightly job took four hours. We moved it to small batch loads and it now takes twenty minutes. The <a href="/writing/batch">full write-up</a> has
        the numbers.
      </p>
      <ProseHeading level={2}>What changed</ProseHeading>
      <p>
        Each batch holds one day of data. The loader reads <code>events_daily</code> and writes one partition.
      </p>
      <ul>
        <li>Loads run every hour.</li>
        <li>A failed batch retries on its own.</li>
        <li>Costs fell by a third.</li>
      </ul>
      <ProseHeading level={3}>The loader</ProseHeading>
      <pre tabIndex={0}>
        <code>{"for day in days:\n    load(read_partition(day), target=\"warehouse.events_daily\", mode=\"overwrite\", retries=3, timeout_seconds=900)"}</code>
      </pre>
      <blockquote>
        <p>Small batches fail small.</p>
      </blockquote>
      <ProseHeading level={4}>Next steps</ProseHeading>
      <ol>
        <li>Move the reports.</li>
        <li>Turn off the nightly job.</li>
      </ol>
    </Prose>
  ),
};
