import { count } from "../../fmt/count";
import { Marker } from "../../primitives/Marker";
import s from "./DeliveryHealth.module.css";

export type DeliveryRow = {
  label: string;
  n: number;
  failed?: boolean;
  cause?: string;
};

function validateRow(row: DeliveryRow) {
  if (row.failed && !row.cause) throw new Error(`DeliveryHealth: the failed row "${row.label}" names no cause`);
}

// Red against green is not readable by everyone, so each marker also names its state.
const MARK = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } } as const;

function Row({ row, formatNumber }: { row: DeliveryRow; formatNumber: (value: number) => string }) {
  validateRow(row);
  return (
    <li className={`${s.row} ward-healthrow`} data-failed={row.failed ? "true" : null}>
      <Marker size={8} {...MARK[row.failed ? "failed" : "ok"]} />
      <span className={s.label}>{row.label}</span>
      <span className={`${s.n} ward-stat-value`}>{formatNumber(row.n)}</span>
      <Cause cause={row.cause} />
    </li>
  );
}

function Cause({ cause }: { cause?: string }) {
  return cause ? <span className={`${s.cause} ward-healthrow-cause`}>{cause}</span> : null;
}

export interface DeliveryHealthProps {
  rows: DeliveryRow[];
  /** Allows consumers with an established numeric-text contract to opt out of count formatting. */
  formatNumber?: (value: number) => string;
}

export function DeliveryHealth({ rows, formatNumber = count }: DeliveryHealthProps) {
  return (
    <ul className={`${s.list} ward-checklist`}>
      {rows.map((r) => (
        <Row row={r} formatNumber={formatNumber} key={r.label} />
      ))}
    </ul>
  );
}
