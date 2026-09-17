import { bothThemes } from "../../.storybook/bothThemes";
import type { CSSProperties } from "react";
import { Marker } from "./Marker";

export default {
  title: "Primitives/Marker",
  component: Marker,
  decorators: [bothThemes],
};

export const Green = { args: { size: 8, kind: "green" } };
export const Blue = { args: { size: 8, kind: "blue" } };
export const Orange = { args: { size: 8, kind: "orange" } };
export const Red = { args: { size: 8, kind: "red" } };
export const Amber = { args: { size: 8, kind: "amber" } };
export const Neutral = { args: { size: 8, kind: "neutral" } };

export const Labelled = {
  args: { size: 14, kind: "green", label: "Met" },
};

export const Sizes = {
  render: () => (
    <div>
      <Marker size={6} kind="green" />
      <Marker size={8} kind="blue" />
      <Marker size={9} kind="amber" />
      <Marker size={14} kind="red" />
    </div>
  ),
};

export const StreamColour = {
  render: () => (
    <div style={{ "--stream": "var(--ward-stream-1-id)" } as CSSProperties}>
      <Marker size={14} kind="stream" label="data-eng" />
    </div>
  ),
};
