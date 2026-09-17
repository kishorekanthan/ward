import { bothThemes } from "../../.storybook/bothThemes";
import type { ReactNode } from "react";
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
