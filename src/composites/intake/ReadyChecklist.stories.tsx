import { bothThemes } from "../../../.storybook/bothThemes";
import { ReadyChecklist } from "./ReadyChecklist";

export default {
  title: "Intake/ReadyChecklist",
  component: ReadyChecklist,
  decorators: [bothThemes],
};

const note = "You can create the item now; anything unticked is asked again on the item.";

export const Ready = {
  args: {
    items: [
      { met: true, text: "A stream is chosen" },
      { met: true, text: "An owner is confirmed" },
    ],
    note,
    onAction: () => {},
  },
};

export const PartlyResolved = {
  args: {
    items: [
      { met: true, text: "A stream is chosen" },
      { met: false, text: "An owner is confirmed" },
    ],
    note,
    onAction: () => {},
  },
};

export const NothingResolved = {
  args: {
    items: [
      { met: false, text: "A stream is chosen" },
      { met: false, text: "An owner is confirmed" },
    ],
    note,
    onAction: () => {},
  },
};

export const NoChecks = { args: { items: [], note, onAction: () => {} } };
