import { overlayThemes } from "../../../.storybook/overlayThemes";
import { NewStreamModal } from "./NewStreamModal";
import type { LadderStep } from "./ColourLadder";

const ladder: LadderStep[] = [
  { step: 1, name: "Teal" },
  { step: 2, name: "Violet" },
  { step: 3, name: "Rust" },
  { step: 4, name: "Step 4", reserved: true },
];

const owners = [
  { value: "j.rao", label: "J. Rao" },
  { value: "m.chen", label: "M. Chen" },
];

export default {
  title: "Studio/NewStreamModal",
  component: NewStreamModal,
  decorators: [overlayThemes],
};

const base = { owners, ladder, onCreate: () => {}, onDraft: () => {}, onClose: () => {} };

export const Blocked = { args: base };

export const LadderMostlyTaken = {
  args: { ...base, takenBy: { 1: "front-end", 2: "risk" } },
};

export const SingleOwner = {
  args: { ...base, owners: [owners[0]] },
};

export const NoGateStage = {
  args: {
    ...base,
    stages: [
      { id: "intake", name: "Intake" },
      { id: "build", name: "In progress" },
      { id: "done", name: "Done" },
    ],
  },
};

export const OnePolicy = {
  args: {
    ...base,
    policies: [{ value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." }],
  },
};

export const Web = {
  args: {
    presentation: "web",
    owners: ["Priya Nayar", "Dan Kovac"],
    ladder,
    takenBy: { 1: "front-end" },
    onCreate: () => {},
    onDraft: () => {},
    onClose: () => {},
  },
};
