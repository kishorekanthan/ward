import { bothThemes } from "../../../.storybook/bothThemes";
import { ColourLadder, type LadderStep } from "./ColourLadder";

const steps: LadderStep[] = [
  { step: 1, name: "Teal" },
  { step: 2, name: "Violet" },
  { step: 3, name: "Rust" },
  { step: 4, name: "Step 4", reserved: true },
];

const base = { label: "Stream colour", steps, onChange: () => {} };

export default {
  title: "Studio/ColourLadder",
  component: ColourLadder,
  decorators: [bothThemes],
};

export const AllFree = { args: { ...base, value: 1 } };

export const Selected = { args: { ...base, value: 2 } };

export const SomeTaken = {
  args: { ...base, value: 3, takenBy: { 1: "data-eng", 2: "front-end" } },
};

export const FullyTaken = {
  args: { ...base, value: 0, takenBy: { 1: "data-eng", 2: "front-end", 3: "integration" } },
};

export const Unvalidated = {
  args: {
    ...base,
    value: 1,
    steps: [...steps, { step: 5, name: "Step 5" }, { step: 6, name: "Step 6" }],
  },
};

export const ReservedOnly = {
  args: { ...base, value: 1, steps: [{ step: 1, name: "Teal" }, { step: 4, name: "Step 4", reserved: true }] },
};

export const Swatches = {
  args: { ...base, value: 2, presentation: "swatches", takenBy: { 1: "data-eng" } },
};
