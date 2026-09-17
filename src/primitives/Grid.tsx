import type { ReactNode } from "react";
import s from "./Grid.module.css";

export type GridColumn = {
  key: string;
  header: string;
  width?: number | string;
  align?: "start" | "end";
  mono?: boolean;
  sortable?: boolean;
  dropPriority?: number;
};

export type GridProps<Row> = {
  label: string;
  columns: GridColumn[];
  rows: Row[];
  rowId: (row: Row) => string;
  renderCell: (row: Row, key: string) => ReactNode;
  selectedId?: string;
  lockedIds?: string[];
  sort?: { key: string; direction: "asc" | "desc" };
  onSort?: (key: string) => void;
  empty: ReactNode;
};

const ARIA_SORT = { asc: "ascending", desc: "descending" } as const;

function selectedSort(column: GridColumn, sort?: GridProps<never>["sort"]) {
  if (sort === undefined || sort.key !== column.key) return undefined;
  return ARIA_SORT[sort.direction];
}

function headerContent(column: GridColumn, onSort?: (key: string) => void) {
  return column.sortable && onSort ? (
    <button type="button" className={s.sort} onClick={() => onSort(column.key)}>
      {column.header}
    </button>
  ) : column.header;
}

function widthStyle(width?: number | string) {
  return width === undefined ? undefined : { width };
}

function HeaderCell({ column, sort, onSort }: { column: GridColumn; sort?: GridProps<never>["sort"]; onSort?: (key: string) => void }) {
  return (
    <th
      scope="col"
      className={s.th}
      style={widthStyle(column.width)}
      data-align={column.align}
      data-drop={column.dropPriority}
      aria-sort={selectedSort(column, sort)}
    >
      {headerContent(column, onSort)}
    </th>
  );
}

function BodyRow<Row>({ row, props }: { row: Row; props: GridProps<Row> }) {
  const id = props.rowId(row);
  const locked = (props.lockedIds ?? []).includes(id);
  return (
    <tr
      className={s.row}
      data-selected={id === props.selectedId ? true : undefined}
      data-locked={locked ? true : undefined}
      inert={locked ? true : undefined}
    >
      {props.columns.map((column) => (
        <td key={column.key} className={s.td} data-align={column.align} data-mono={column.mono} data-drop={column.dropPriority}>
          {props.renderCell(row, column.key)}
        </td>
      ))}
    </tr>
  );
}

export function Grid<Row>({
  label,
  columns,
  rows,
  rowId,
  renderCell,
  selectedId,
  lockedIds = [],
  sort,
  onSort,
  empty,
}: GridProps<Row>) {
  if (rows.length === 0) return <div className={s.empty}>{empty}</div>;
  // The frame is a size container, so columns drop on the width the grid actually gets rather than the viewport's.
  return (
    <div className={s.frame}>
      <table className={s.table} aria-label={label}>
        <thead>
          <tr className={s.head}>
            {columns.map((column) => (
              <HeaderCell key={column.key} column={column} sort={sort} onSort={onSort} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => <BodyRow key={rowId(row)} row={row} props={{ label, columns, rows, rowId, renderCell, selectedId, lockedIds, sort, onSort, empty }} />)}
        </tbody>
      </table>
    </div>
  );
}
