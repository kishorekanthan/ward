import type { CSSProperties } from "react";
import { bothThemes } from "../.storybook/bothThemes";
import { AgentCard } from "./composites/studio/AgentCard";
import { StatTiles } from "./primitives/StatStrip";
import { v } from "./tokens";

// The app frame's three levels (Ward #287): the window ground, a panel on it, and cards on the panel.
const ground: CSSProperties = { background: v.color.ground, padding: v.space.s5 };
const panel: CSSProperties = {
  display: "grid",
  gap: v.space.s4,
  padding: v.space.s5,
  borderRadius: v.radiusCard,
  background: v.color.surface,
  boxShadow: `0 0 0 var(--ward-border) ${v.color.panelEdge}, ${v.shadow.card}`,
};

function ThreeLevelsFrame() {
  return (
    <div data-level="ground" style={ground}>
      <div data-level="panel" style={panel}>
        <StatTiles cells={[{ value: "14", label: "In flight", href: "#flight" }, { value: "3", label: "Awaiting review", href: "#gate" }]} />
        <AgentCard
          href="#agent"
          agent={{ id: "intake-advisor", name: "intake-advisor", streamStep: 1, description: "Reads a request and proposes its stream.", versions: [{ v: "v3", status: "live" }] }}
        />
      </div>
    </div>
  );
}

export default {
  title: "Tokens/Surfaces",
  component: ThreeLevelsFrame,
  decorators: [bothThemes],
};

export const ThreeLevels = {};
