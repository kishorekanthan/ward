import { bothThemes } from "../../.storybook/bothThemes";
import { Callout } from "./Callout";

export default {
  title: "Primitives/Callout",
  component: Callout,
  decorators: [bothThemes],
};

export const Info = {
  args: {
    variant: "info",
    ticket: "FL-118",
    children: "A terminal stage is counted, not columned.",
  },
};

export const Warn = {
  args: {
    variant: "warn",
    ticket: "FL-229",
    children: "Publishing mounts the agent on the live stream.",
  },
};

export const LongBody = {
  args: {
    variant: "warn",
    ticket: "FL-244",
    children:
      "Write tools stay frozen for the whole change window, so a requeue here queues the change and writes nothing until the window closes.",
  },
};
