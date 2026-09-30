import { bothThemes } from "../../.storybook/bothThemes";
import { BarChart } from "./BarChart";

export default {
  title: "Primitives/BarChart",
  component: BarChart,
  decorators: [bothThemes],
};

const weeks = ["8 Sep", "15 Sep", "22 Sep", "29 Sep"];

export const OneSeries = {
  args: { title: "Done per week", categories: weeks, series: [{ name: "Done", values: [3, 5, 0, 7] }] },
};

export const SixSeries = {
  args: {
    title: "Done per week, by stream",
    categories: weeks,
    series: ["Payments", "Ledger", "Onboarding", "Risk", "Reports", "Search"].map((name, i) => ({
      name,
      values: weeks.map((_, w) => ((i + 1) * (w + 2)) % 9),
    })),
  },
};

export const Hours = {
  args: {
    title: "Time by stage",
    categories: ["intake", "build", "review", "load"],
    series: [{ name: "Hours", values: [2.5, 30, 12.25, null] }],
    format: (value: number) => `${value} h`,
  },
};

export const Empty = {
  args: { title: "Done per week", categories: weeks, series: [{ name: "Done", values: [0, 0, 0, 0] }], empty: "No items finished yet." },
};
