import type { CSSProperties, ReactNode } from "react";
import { bothThemes } from "../../.storybook/bothThemes";
import { WorkCard } from "../composites/board/WorkCard";
import type { BoardItem } from "../composites/board/types";
import { Btn } from "../primitives/Btn";
import { Chip } from "../primitives/Chip";
import { Grid, type GridColumn } from "../primitives/Grid";
import { Tabs } from "../primitives/Tabs";
import { ACCENT_PRESETS, DENSITIES, v } from "../tokens";
import { ThemeProvider, type ThemeProviderProps } from "./ThemeProvider";

// Each panel pins its own theme beside its accent, so a preset shows the same under either toolbar theme.
const panel: CSSProperties = {
  display: "grid",
  gap: v.space.s3,
  padding: v.space.s4,
  background: v.color.bg,
  color: v.color.text,
  borderRadius: v.radiusCard,
};

const tabs = [
  { id: "board", label: "Board" },
  { id: "history", label: "History" },
];

function Sample({ title }: { title: string }) {
  return (
    <>
      <p style={{ font: v.type.title }}>{title}</p>
      <Tabs tabs={tabs} active="board" onChange={() => {}} label={`${title} tabs`} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: v.space.s2, alignItems: "center" }}>
        <Btn variant="primary">Save changes</Btn>
        <Chip role="owed" label="Owed to you" />
        <Chip role="done" label="Done" />
        <span aria-hidden="true" style={{ width: v.space.s4, height: v.space.s4, borderRadius: v.radiusChip, background: v.color.sage }} />
      </div>
    </>
  );
}

function Presets() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: v.space.s3 }}>
      {ACCENT_PRESETS.flatMap(({ name, label }) =>
        (["light", "dark"] as const).map((theme) => (
          <section key={`${name}-${theme}`} data-theme={theme} data-accent={name} style={panel}>
            <Sample title={`${label}, ${theme}`} />
          </section>
        )),
      )}
    </div>
  );
}

const item: BoardItem = {
  key: "Shipment review",
  title: "Late-arriving shipments view",
  stage: "triage",
  timeInStage: 93_600_000,
  waitsOn: "A. Whyte",
  streamStep: 1,
  changedAt: "2026-09-06T02:14:00Z",
  state: { role: "attention", label: "Needs a human" },
};

type Row = { id: string; title: string; owner: string };
const columns: GridColumn[] = [
  { key: "id", header: "Item", width: 100, mono: true },
  { key: "title", header: "Title" },
  { key: "owner", header: "Owner", width: 120 },
];
const rows: Row[] = [
  { id: "Shipment review", title: "Late-arriving shipments view", owner: "J. Rao" },
  { id: "Carrier check", title: "Carrier reference missing on inbound loads", owner: "A. Whyte" },
];

function DensityPanel({ name, label }: { name: string; label: string }): ReactNode {
  return (
    <section data-density={name} style={{ display: "grid", gap: v.space.s3 }}>
      <p style={{ font: v.type.title }}>{label}</p>
      <div role="list" style={{ display: "grid", gap: v.gap.boardColumn }}>
        <WorkCard item={item} onOpen={() => {}} />
        <WorkCard item={{ ...item, key: "Carrier check", title: "Carrier reference missing on inbound loads" }} onOpen={() => {}} />
      </div>
      <Grid label={`${label} items`} columns={columns} rows={rows} rowId={(row) => row.id} renderCell={(row, key) => row[key as keyof Row]} empty="No items yet." />
    </section>
  );
}

function DensityPair() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: v.space.s5 }}>
      {DENSITIES.map(({ name, label }) => (
        <DensityPanel key={name} name={name} label={label} />
      ))}
    </div>
  );
}

export default {
  title: "Tokens/Theme",
  component: ThemeProvider,
};

export const AccentPresets = { render: () => <Presets /> };

export const Densities = { render: () => <DensityPair />, decorators: [bothThemes] };

// The provider writes to the page root, so this story sets the theme for the whole canvas.
export const Provider = {
  args: { theme: "light", accent: "blue", density: "compact" },
  render: (args: ThemeProviderProps) => (
    <ThemeProvider {...args}>
      <div style={panel}>
        <Sample title="Set from the controls" />
      </div>
    </ThemeProvider>
  ),
};
