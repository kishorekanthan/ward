import { bothThemes } from "../../.storybook/bothThemes";
import { InfoTip } from "./InfoTip";

export default {
  title: "Primitives/InfoTip",
  component: InfoTip,
  decorators: [bothThemes],
};

export const BesideALabel = {
  render: () => (
    <span>
      Open
      <InfoTip label="Open" text="Requests in any stage that are not done or cancelled." />
    </span>
  ),
};

export const EndAligned = {
  render: () => (
    <span>
      Cache hit
      <InfoTip label="Cache hit" text="Share of input tokens read from the prompt cache." align="end" />
    </span>
  ),
};
