import { bothThemes } from "../../.storybook/bothThemes";
import { ProjectCard } from "./ProjectCard";

const picture = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 16 9'><rect width='16' height='9' fill='gray' fill-opacity='0.25'/><rect x='3' y='3' width='10' height='3' fill='gray'/></svg>",
)}`;

export default {
  title: "Site/ProjectCard",
  component: ProjectCard,
  decorators: [bothThemes],
};

export const Grid = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(var(--ward-width-colFloor), 1fr))", gap: "var(--ward-space-4)" }}>
      <ProjectCard
        href="/work/batch-loads"
        eyebrow="Case study"
        title="Batch loads in place of a nightly job"
        summary="Four hours down to twenty minutes."
        tags={["Python", "Postgres"]}
        media={<img src={picture} alt="" width={1600} height={900} />}
      />
      <ProjectCard href="/projects/cost-meter" eyebrow="Side project" title="A cost meter for the warehouse" summary="Shows spend per team, per day." tags={["TypeScript"]} />
      <ProjectCard href="/projects/notes" title="Notes" />
    </div>
  ),
};
