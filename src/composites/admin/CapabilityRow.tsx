import type { ReactElement } from "react";
import { Chip } from "../../primitives/Chip";
import { Switch } from "../../primitives/Switch";
import type { StreamStep } from "../../tokens";
import s from "./CapabilityRow.module.css";

export type CapabilityValue = "on" | "off" | "pilot" | "byRole";

export type CapabilityCell = {
  streamStep: StreamStep;
  stream: string;
  value: CapabilityValue;
};

export type Capability = {
  name: string;
  consequence: string;
  governedBy: string;
  ticket?: string;
};

export type CapabilityRowProps = {
  capability: Capability;
  cells: CapabilityCell[];
  onChange: (streamStep: StreamStep, on: boolean) => void;
};

export type WebCapabilityCell = {
  streamStep: 1 | 2 | 3;
  value: CapabilityValue;
};

export type WebCapabilityRowProps = {
  presentation: "web";
  capability: Capability;
  cells: WebCapabilityCell[];
  onChange?: (streamStep: WebCapabilityCell["streamStep"], value: "on" | "off") => void;
};

function CellControl({
  capability,
  cell,
  onChange,
}: {
  capability: Capability;
  cell: CapabilityCell;
  onChange: (streamStep: StreamStep, on: boolean) => void;
}) {
  if (cell.value === "byRole") return <span className={s.byRole}>by role</span>;
  return (
    <span className={s.control}>
      <Switch
        label={`${capability.name} — ${cell.stream}`}
        checked={cell.value !== "off"}
        onChange={(on) => onChange(cell.streamStep, on)}
      />
      {cell.value === "pilot" && <Chip role="running" label="PILOT" />}
    </span>
  );
}

function CompactCapabilityRow({ capability, cells, onChange }: CapabilityRowProps) {
  return (
    <tr className={s.row}>
      <th scope="row" className={s.headCell}>
        <span className={s.name}>{capability.name}</span>
        <span className={s.consequence}>{capability.consequence}</span>
        <span className={s.governed}>
          governed by {capability.governedBy}
          {capability.ticket ? ` · ${capability.ticket}` : ""}
        </span>
      </th>
      {cells.map((cell) => (
        <td className={s.cell} key={cell.streamStep}>
          <CellControl capability={capability} cell={cell} onChange={onChange} />
        </td>
      ))}
    </tr>
  );
}

function webGoverned(capability: Capability): string {
  return capability.ticket === undefined ? capability.governedBy : `${capability.governedBy} · ${capability.ticket}`;
}

// A pilot surface is not yet on for the stream, so the web switch stays unchecked beside its chip.
function WebCellControl({ name, cell, onChange }: { name: string; cell: WebCapabilityCell; onChange?: WebCapabilityRowProps["onChange"] }): ReactElement {
  if (cell.value === "byRole") return <span className={`${s.webControl} ${s.byRole} ward-envrow`}>by role</span>;
  const control = (
    <Switch
      label={`${name} — step ${cell.streamStep}`}
      checked={cell.value === "on"}
      disabled={onChange === undefined}
      onChange={(on) => onChange?.(cell.streamStep, on ? "on" : "off")}
    />
  );
  if (cell.value !== "pilot") return control;
  return (
    <span className={`${s.webControl} ward-envrow`}>
      <Chip role="running" label="PILOT" />
      {control}
    </span>
  );
}

function WebCapabilityRow({ capability, cells, onChange }: WebCapabilityRowProps): ReactElement {
  return (
    <tr className={s.row}>
      <td className={s.cell}>
        <span className={s.name}>{capability.name}</span>
        <p className={`${s.webConsequence} ward-policy-consequence`}>{capability.consequence}</p>
      </td>
      {cells.map((cell) => (
        <td className={s.cell} key={String(cell.streamStep)}>
          <WebCellControl name={capability.name} cell={cell} onChange={onChange} />
        </td>
      ))}
      <td className={s.cell}>
        <span className={`${s.webGoverned} ward-cellmeta`}>{webGoverned(capability)}</span>
      </td>
    </tr>
  );
}

export function CapabilityRow(props: CapabilityRowProps | WebCapabilityRowProps): ReactElement {
  return "presentation" in props ? <WebCapabilityRow {...props} /> : <CompactCapabilityRow {...props} />;
}
