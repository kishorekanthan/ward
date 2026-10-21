import { bothThemes } from "../../.storybook/bothThemes";
import { PostRow } from "./PostRow";

export default {
  title: "Site/PostRow",
  component: PostRow,
  decorators: [bothThemes],
};

export const Posts = {
  render: () => (
    <div style={{ maxInlineSize: "var(--ward-width-measure)" }}>
      <PostRow href="/writing/batch-loads" title="Why batch loads won" date="2026-10-03" meta="6 min read" summary="A nightly job, four hours, and the move to small batches." />
      <PostRow href="/writing/cost-reviews" title="Running a cost review that sticks" date="2026-09-14" meta="4 min read" />
      <PostRow href="/writing/notes" title="Notes on warehouse naming" date="2026-01-30" />
    </div>
  ),
};
