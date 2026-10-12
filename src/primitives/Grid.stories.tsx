import { bothThemes } from "../../.storybook/bothThemes";
import type { ReactNode } from "react";
import { Checkbox } from "./Checkbox";
import { Grid, type GridColumn } from "./Grid";

type Item = { id: string; key: string; title: string; owner: string; cost: string };

const columns: GridColumn[] = [
  { key: "key", header: "Item", width: 120, mono: true, sortable: true },
  { key: "title", header: "Title", sortable: true },
  { key: "owner", header: "Owner", width: 140, dropPriority: 1 },
  { key: "cost", header: "Cost", width: 90, align: "end", mono: true },
];

const rows: Item[] = [
  { id: "FL-229", key: "FL-229", title: "Late-arriving shipments view", owner: "J. Rao", cost: "$0.46" },
  { id: "FL-231", key: "FL-231", title: "Carrier reference missing on inbound loads", owner: "A. Whyte", cost: "$0.12" },
  { id: "FL-244", key: "FL-244", title: "Reconcile September shipment feed", owner: "M. Chen", cost: "$1.94" },
];

function renderCell(row: Item, key: string): ReactNode {
  if (key === "key") return row.key;
  if (key === "title") return row.title;
  if (key === "owner") return row.owner;
  return row.cost;
}

const base = {
  label: "Items",
  columns,
  rows,
  rowId: (row: Item) => row.id,
  renderCell,
  empty: "No items in this stream yet.",
};

export default {
  title: "Primitives/Grid",
  component: Grid,
  decorators: [bothThemes],
};

export const Default = { args: base };

export const Sorted = {
  args: { ...base, sort: { key: "key", direction: "asc" }, onSort: () => {} },
};

export const Selected = {
  args: { ...base, selectedId: "FL-231" },
};

export const LockedRow = {
  args: { ...base, lockedIds: ["FL-244"] },
};

export const Empty = {
  args: { ...base, rows: [], empty: "No items match the current filter." },
};

type Connection = { id: string; port: string; adapter: string; owner: string; health: string; approver: boolean };

const connectionColumns: GridColumn[] = [
  { key: "id", header: "Connection" },
  { key: "port", header: "Port" },
  { key: "adapter", header: "Adapter", mono: true },
  { key: "owner", header: "Owner", dropPriority: 1 },
  { key: "health", header: "Health" },
  { key: "approver", header: "Approver sees it" },
];

const connections: Connection[] = [
  { id: "tracker", port: "Work tracker", adapter: "jira-cloud", owner: "Delivery team", health: "Working", approver: true },
  { id: "codehost", port: "Code host", adapter: "github", owner: "Platform team", health: "Not tested", approver: false },
  { id: "databricks", port: "Data platform", adapter: "databricks-sql", owner: "Data engineering", health: "Failed", approver: true },
];

function connectionCell(row: Connection, key: string): ReactNode {
  if (key === "approver") return <Checkbox label="Approver sees it" labelHidden checked={row.approver} onChange={() => {}} />;
  return row[key as Exclude<keyof Connection, "approver">];
}

// At 375px each row is a card of header and value lines; at 1280px the same grid is a table.
export const Stacked = {
  render: () => (
    <Grid<Connection>
      label="Connections"
      columns={connectionColumns}
      rows={connections}
      rowId={(row) => row.id}
      renderCell={connectionCell}
      empty="No connections yet."
      narrow="stack"
    />
  ),
};
