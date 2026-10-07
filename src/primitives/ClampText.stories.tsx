import { bothThemes } from "../../.storybook/bothThemes";
import { ClampText } from "./ClampText";

export default {
  title: "Primitives/ClampText",
  component: ClampText,
  decorators: [bothThemes],
};

export const Short = { args: { text: "Late-arriving shipments view" } };

export const LongTitle = {
  args: { as: "p", text: "Reconcile late-arriving inbound shipments against the carrier's manifest before the nightly warehouse cut-off has closed" },
};

export const UnbrokenId = { args: { text: "warehouse.analytics.customer_lifetime_value_daily_rollup_v2.partition_2026_10_07_backfill" } };
