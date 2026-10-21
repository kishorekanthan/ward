import { bothThemes } from "../../.storybook/bothThemes";
import { Tag } from "./Tag";

export default {
  title: "Site/Tag",
  component: Tag,
  decorators: [bothThemes],
};

export const Plain = {
  args: { label: "Data platforms" },
};

export const Linked = {
  args: { label: "Cost and FinOps", href: "/topics/cost" },
};

export const Row = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--ward-space-2)" }}>
      <Tag label="TypeScript" />
      <Tag label="React" />
      <Tag label="Data platforms" href="/topics/data" />
    </div>
  ),
};
