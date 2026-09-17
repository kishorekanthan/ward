import { bothThemes } from "../../../.storybook/bothThemes";
import { OverCapNote } from "./OverCapNote";

export default {
  title: "Board/OverCapNote",
  component: OverCapNote,
  decorators: [bothThemes],
};

export const OverCap = {
  args: { label: "In review", count: 7, cap: 6 },
};

export const FarOverCap = {
  args: { label: "In review", count: 14, cap: 6 },
};

export const LongLabel = {
  args: { label: "Waiting on a named reviewer", count: 9, cap: 4 },
};
