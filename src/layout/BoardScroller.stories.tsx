import { bothThemes } from "../../.storybook/bothThemes";
import { BoardScroller, type BoardLane } from "./BoardScroller";

export default {
  title: "Layout/BoardScroller",
  component: BoardScroller,
  decorators: [bothThemes],
};

const column = (label: string) => (
  <section aria-label={label} style={{ minWidth: "var(--ward-width-colFloor)", padding: "var(--ward-space-3)" }}>
    {label}
  </section>
);

const lanes: BoardLane[] = [
  { id: "triage", label: "Triage", count: 3, content: column("Triage") },
  { id: "build", label: "Build", count: 5, content: column("Build") },
  { id: "review", label: "Review", count: 1, content: column("Review") },
];

export const Children = {
  render: () => (
    <BoardScroller>
      {column("Triage")}
      {column("Build")}
      {column("Review")}
    </BoardScroller>
  ),
};

export const Lanes = { render: () => <BoardScroller lanes={lanes} /> };
