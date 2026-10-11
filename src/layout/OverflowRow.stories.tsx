import { bothThemes } from "../../.storybook/bothThemes";
import { OverflowRow } from "./OverflowRow";

export default {
  title: "Layout/OverflowRow",
  component: OverflowRow,
  decorators: [bothThemes],
};

const words = ["Intake", "Extract", "Classify", "Enrich", "Review", "Approve", "Schedule", "Ready for load", "Loaded"];

const strip = (
  <div style={{ display: "flex", gap: "var(--ward-space-4)", whiteSpace: "nowrap" }}>
    {words.map((word) => (
      <span key={word} style={{ padding: "var(--ward-space-3)", border: "var(--ward-border) solid var(--ward-color-line)" }}>
        {word}
      </span>
    ))}
  </div>
);

// Nine stages in a phone column: the end fades; hover or focus shows the scrollbar, arrow keys scroll it.
export const PhoneWidth = {
  args: { label: "Workflow stages", count: words.length, children: strip },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

export const Fits = {
  args: { label: "Workflow stages", count: 3, children: words.slice(0, 3).join(" · ") },
};
