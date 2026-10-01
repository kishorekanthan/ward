import { bothThemes } from "../../.storybook/bothThemes";
import { fullPage } from "../../.storybook/fullPage";
import { BoardColumn } from "../composites/board/BoardColumn";
import type { BoardItem } from "../composites/board/types";
import { PageHeader } from "../primitives/PageHeader";
import { AppShell } from "./AppShell";
import { BoardScroller, type BoardLane } from "./BoardScroller";
import { PageFrame } from "./PageFrame";

export default {
  title: "Layout/BoardScroller",
  component: BoardScroller,
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
  decorators: [bothThemes],
  render: () => (
    <BoardScroller>
      {column("Triage")}
      {column("Build")}
      {column("Review")}
    </BoardScroller>
  ),
};

export const Lanes = { decorators: [bothThemes], render: () => <BoardScroller lanes={lanes} /> };

const STAGES = ["Intake", "Triage", "Build", "Review", "Release", "Verify", "Rollout", "Watch", "Done"];

const card = (stage: string, n: number): BoardItem => ({
  key: `FL-${200 + n}`,
  title: `Reconcile shipment feed batch ${n + 1}`,
  stage,
  timeInStage: (n + 1) * 3_600_000,
  waitsOn: "A. Whyte",
  streamStep: 1,
  changedAt: "2026-09-06T02:14:00Z",
});

// The first lane holds 30 cards, more than any viewport shows; the rest hold two.
function boardLanes(count: number): BoardLane[] {
  return STAGES.slice(0, count).map((label, i) => {
    const items = Array.from({ length: i === 0 ? 30 : 2 }, (_, n) => card(label, n + i * 30));
    const config = { id: label.toLowerCase(), label, gate: label === "Review" };
    return { id: config.id, label, count: items.length, content: <BoardColumn column={config} items={items} sort="oldest" onOpen={() => {}} /> };
  });
}

function BoardPage({ count }: { count: number }) {
  return (
    <AppShell destinations={[{ id: "board", label: "Board", href: "#board" }]} active="board">
      <PageFrame inset="board">
        <PageHeader crumb={[{ label: "Board" }]} title="Shipments" />
        <BoardScroller lanes={boardLanes(count)} />
      </PageFrame>
    </AppShell>
  );
}

// Lanes fill the height under the header and scroll on their own; the page itself never scrolls.
export const BoardPageFiveLanes = {
  decorators: [fullPage],
  parameters: { layout: "fullscreen" },
  render: () => <BoardPage count={5} />,
};

// Nine lanes overflow a 1024px page: a right-edge fade and the lane count say more lanes sit off the edge.
export const BoardPageNineLanes = {
  decorators: [fullPage],
  parameters: { layout: "fullscreen" },
  render: () => <BoardPage count={9} />,
};
