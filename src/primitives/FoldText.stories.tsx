import { bothThemes } from "../../.storybook/bothThemes";
import { FoldText } from "./FoldText";

export default {
  title: "Primitives/FoldText",
  component: FoldText,
  decorators: [bothThemes],
};

export const ThreeLines = {
  args: {
    children: (
      <ul>
        <li>Analysts need one clean customer table for reports.</li>
        <li>Today each report joins raw sources by hand.</li>
        <li>Keep names and emails as they are in the source.</li>
        <li>One row per customer, keyed by a surrogate key.</li>
        <li>Refresh once a day.</li>
      </ul>
    ),
  },
};
