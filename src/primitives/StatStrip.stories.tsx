import { bothThemes } from "../../.storybook/bothThemes";
import { StatStrip, StatTiles } from "./StatStrip";

export default {
  title: "Primitives/StatStrip",
  component: StatStrip,
  decorators: [bothThemes],
};

export const TwoCells = {
  args: {
    cells: [
      { value: "14", label: "In flight" },
      { value: "3", label: "Awaiting review" },
    ],
  },
};

export const FourCells = {
  args: {
    cells: [
      { value: "14", label: "In flight" },
      { value: "31", label: "Loaded this week" },
      { value: "4", label: "Agents working" },
      { value: "2d 4h", label: "p90 in stage" },
    ],
  },
};

export const Accented = {
  args: {
    cells: [
      { value: "14", label: "In flight" },
      { value: "3", label: "Awaiting review", accent: "amber" },
      { value: "4", label: "Agents working" },
    ],
  },
};

export const BlueAccent = {
  args: {
    cells: [
      { value: "$1.94", label: "Spent today", accent: "blue" },
      { value: "$2.00", label: "Ceiling" },
    ],
  },
};

/* The comp's own split cells, from design/Trellis Studio.dc.html under the dry-run
   trace: $0.11 Cost and 5/8 Turns used, ruled between. */
export const Divided = {
  args: {
    divided: true,
    cells: [
      { value: "$0.11", label: "Cost" },
      { value: "5/8", label: "Turns used" },
    ],
  },
};

/* Four cells prove the columns stay equal without the count being passed in. */
export const DividedFour = {
  args: {
    divided: true,
    cells: [
      { value: "14", label: "In flight" },
      { value: "31", label: "Loaded this week" },
      { value: "4", label: "Agents working" },
      { value: "2d 4h", label: "p90 in stage" },
    ],
  },
};

export const Linked = {
  args: {
    cells: [
      { value: "14", label: "In flight", href: "#/board" },
      { value: "3", label: "Failed runs, last 24 hours", href: "#/runs" },
    ],
  },
};

// At phone width a 30-character label fits one line in the sans face (#199); a longer one stops at two with an ellipsis.
export const PhoneWidth = {
  args: {
    cells: [
      { value: "14", label: "In flight" },
      { value: "3", label: "Items waiting for a named reviewer" },
      { value: "4", label: "Agents working" },
      { value: "2", label: "Failed agent runs across every stream and every stage, in the last 24 hours" },
    ],
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

const figure = (value: string, label: string, href?: string) => ({ value, label, href });

// Five figures fill one row in five equal tiles.
export const TilesFive = {
  render: () => (
    <StatTiles
      cells={[figure("14", "In flight", "#/board"), figure("3", "Failed runs 24h"), figure("1", "Failing connections"), figure("$41.20", "Agent spend 7d"), figure("9", "Done this week")]}
    />
  ),
};

// Seven figures: six to the first row, the seventh below at the same width.
export const TilesSeven = {
  render: () => (
    <StatTiles
      cells={[figure("14", "In flight"), figure("3", "Failed runs 24h"), figure("1", "Failing connections"), figure("$41.20", "Agent spend 7d"), figure("9", "Done this week"), figure("2d 4h", "Typical cycle time"), figure("6d", "Slowest cycle time", "#/board")]}
    />
  ),
};
