import { bothThemes } from "../../.storybook/bothThemes";
import { StatStrip } from "./StatStrip";

export default {
  title: "Primitives/StatStrip",
  component: StatStrip,
  decorators: [bothThemes],
};

export const TwoCells = {
  args: {
    cells: [
      { value: "14", label: "In flight" },
      { value: "3", label: "At a gate" },
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
      { value: "3", label: "At a gate", accent: "amber" },
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

// A 30-character label at phone width wraps to two lines rather than clipping.
export const PhoneWidth = {
  args: {
    cells: [
      { value: "14", label: "In flight" },
      { value: "3", label: "Items waiting at a review gate" },
      { value: "4", label: "Agents working" },
      { value: "2d 4h", label: "p90 in stage" },
    ],
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
