import { bothThemes } from "../../.storybook/bothThemes";
import { FeaturedCard } from "./FeaturedCard";

const picture = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 16 9'><rect width='16' height='9' fill='gray' fill-opacity='0.25'/><rect x='3' y='3' width='10' height='3' fill='gray'/></svg>",
)}`;

export default {
  title: "Site/FeaturedCard",
  component: FeaturedCard,
  decorators: [bothThemes],
};

const card = {
  href: "/work/batch-loads",
  eyebrow: "Flagship case study",
  title: "Batch loads in place of a nightly job",
  summary: "How a data team cut a four-hour load to twenty minutes and a third of the cost.",
  tags: ["Python", "Postgres", "Cost"],
  cta: "Read the case study",
};

export const Featured = {
  render: () => <FeaturedCard {...card} media={<img src={picture} alt="" width={1600} height={900} />} />,
};

export const Narrow = {
  render: () => (
    <div style={{ maxInlineSize: "var(--ward-width-dryrun)" }}>
      <FeaturedCard {...card} media={<img src={picture} alt="" width={1600} height={900} />} />
    </div>
  ),
};
