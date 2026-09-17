import { bothThemes } from "../../../.storybook/bothThemes";
import { GateChecklist, type GateItem } from "./GateChecklist";

const met: GateItem[] = [
  { met: true, text: "Two reviewers named." },
  { met: true, text: "Dry run replayed on a real item." },
];

const mixed: GateItem[] = [
  { met: true, text: "Two reviewers named." },
  { met: false, text: "Dry run replayed on a real item." },
];

export default {
  title: "Studio/GateChecklist",
  component: GateChecklist,
  decorators: [bothThemes],
};

export const AllMet = { args: { items: met } };

export const SomeUnmet = { args: { items: mixed } };

export const NoneMet = {
  args: { items: mixed.map((i) => ({ ...i, met: false })) },
};

export const WithNote = {
  args: { items: mixed, note: "Publishing mounts the agent on the live stream." },
};

export const Empty = { args: { items: [] } };
