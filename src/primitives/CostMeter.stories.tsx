import { bothThemes } from "../../.storybook/bothThemes";
import { CostMeter } from "./CostMeter";

export default {
  title: "Primitives/CostMeter",
  component: CostMeter,
  decorators: [bothThemes],
};

export const UnderCeiling = {
  args: { spent: 0.46, ceiling: 2 },
};

export const NearCeiling = {
  args: { spent: 1.94, ceiling: 2 },
};

export const AtCeiling = {
  args: { spent: 2, ceiling: 2 },
};

export const OverCeiling = {
  args: { spent: 2.4, ceiling: 2 },
};

export const WithBreakdown = {
  args: {
    spent: 0.46,
    ceiling: 2,
    breakdown: [
      { label: "intake-advisor v3", amount: 0.21 },
      { label: "triage v2", amount: 0.13 },
      { label: "dpm_resolver v1", amount: 0.12 },
    ],
  },
};
