import type { ReactNode } from "react";
import { Grid, type GridColumn } from "../../primitives/Grid";
import { EmptyState } from "../../states/States";
import s from "./RoutingTable.module.css";

export type RoutingRow = {
  id?: string;
  rejectedBy: string;
  reEntersAt?: string;
  skips?: string;
  typedInput: string;
  noRerun?: boolean;
  why?: string;
};

export type RoutingTableProps = {
  rows: RoutingRow[];
  empty?: ReactNode;
  requireNoRerunReason?: boolean;
};

const COLUMNS: GridColumn[] = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: true },
];

function reEntryText(row: RoutingRow): string {
  if (!row.noRerun) return row.reEntersAt ?? "—";
  if (!row.why) return "No rerun";
  return `No rerun — ${row.why}`;
}

function validateRows(rows: RoutingRow[], requireNoRerunReason: boolean) {
  const missingReason = rows.find((row) => row.noRerun && !row.why);
  if (requireNoRerunReason && missingReason) throw new Error(`RoutingTable: the "${missingReason.rejectedBy}" row never reruns and says nothing about why`);
}

function cellText(row: RoutingRow, key: string): string {
  const values: Record<string, string> = {
    rejectedBy: row.rejectedBy,
    reEntersAt: reEntryText(row),
    skips: row.skips ?? "—",
    typedInput: row.typedInput,
  };
  return values[key] ?? "—";
}

function withIds(rows: RoutingRow[]) {
  return rows.map((row, index) => ({ ...row, id: row.id ?? String(index) }));
}

export function RoutingTable({ rows, empty, requireNoRerunReason = true }: RoutingTableProps) {
  validateRows(rows, requireNoRerunReason);
  const identifiedRows = withIds(rows);
  return (
    <Grid
      label="Rejection routing"
      columns={COLUMNS}
      rows={identifiedRows}
      rowId={(r) => r.id}
      renderCell={(r, key) => (
        <span className={s.cell} data-norerun={r.noRerun ? true : undefined}>
          {cellText(r, key)}
        </span>
      )}
      empty={empty ?? <EmptyState sentence="No rejection route is configured for this stream yet." />}
    />
  );
}
