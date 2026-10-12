import { bothThemes } from "../../.storybook/bothThemes";
import { StreamAvatar } from "./StreamAvatar";

export default {
  title: "Primitives/StreamAvatar",
  component: StreamAvatar,
  decorators: [bothThemes],
};

const streams = [
  { name: "Data Engineering", step: 1 },
  { name: "Integration", step: 2 },
  { name: "KPI Config", step: 3 },
  { name: "Demo", step: null },
];

function Named({ name, step }: { name: string; step: number | null }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: "var(--ward-space-2)", font: "var(--ward-type-body)" }}>
      <StreamAvatar name={name} step={step} />
      {name}
    </span>
  );
}

// Each stream keeps its colour everywhere, so people learn which is which; a stream with no colour step is neutral.
export const Beside = {
  render: () => (
    <span style={{ display: "flex", flexDirection: "column", gap: "var(--ward-space-2)" }}>
      {streams.map((stream) => <Named key={stream.name} {...stream} />)}
    </span>
  ),
};

// The 26px size, alone in a folded sidebar.
export const Large = {
  render: () => (
    <span style={{ display: "flex", gap: "var(--ward-space-2)" }}>
      {streams.map((stream) => <StreamAvatar key={stream.name} name={stream.name} step={stream.step} size="lg" />)}
    </span>
  ),
};
