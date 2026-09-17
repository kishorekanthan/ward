import { bothThemes } from "../../../.storybook/bothThemes";
import { DeliveryHealth } from "./DeliveryHealth";

export default {
  title: "Intake/DeliveryHealth",
  component: DeliveryHealth,
  decorators: [bothThemes],
};

export const Healthy = {
  args: {
    rows: [
      { label: "Cards delivered", n: 4182 },
      { label: "Deep links followed", n: 934 },
    ],
  },
};

export const WithFailures = {
  args: {
    rows: [
      { label: "Cards delivered", n: 4182 },
      { label: "Cards failed", n: 12, failed: true, cause: "Teams webhook rejected the payload (413)" },
      { label: "Relay retries", n: 41 },
    ],
  },
};

export const AllFailed = {
  args: { rows: [{ label: "Cards failed", n: 128, failed: true, cause: "Relay credential expired 6d ago" }] },
};

export const Empty = { args: { rows: [] } };
