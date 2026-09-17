import { bothThemes } from "../../.storybook/bothThemes";
import { SegmentedControl } from "./SegmentedControl";

const two = [
  { value: "oldest", label: "Oldest" },
  { value: "newest", label: "Newest" },
];

const three = [
  { value: "all", label: "All" },
  { value: "mine", label: "Mine" },
  { value: "gate", label: "At a gate" },
];

export default {
  title: "Primitives/SegmentedControl",
  component: SegmentedControl,
  decorators: [bothThemes],
};

export const TwoOptions = {
  args: { label: "Board sort", options: two, value: "oldest", onChange: () => {} },
};

export const ThreeOptions = {
  args: { label: "Board filter", options: three, value: "mine", onChange: () => {} },
};

export const Disabled = {
  args: { label: "Board sort", options: two, value: "newest", disabled: true, onChange: () => {} },
};
