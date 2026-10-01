import s from "./TableHead.module.css";

export type TableHeadColumn = { key: string; header: string; width?: number | string };

export type TableHeadProps = { columns: TableHeadColumn[] };

// The head for a table that renders its own rows; Grid keeps its own header.
// Labels truncate only under table-layout: fixed; in an auto-layout table a long label widens its column.
export function TableHead({ columns }: TableHeadProps) {
  return (
    <thead data-ward-table-head="">
      <tr>
        {columns.map((column) => (
          <th key={column.key} scope="col" title={column.header} style={column.width === undefined ? undefined : { width: column.width }}>
            <span className={s.label}>{column.header}</span>
          </th>
        ))}
      </tr>
    </thead>
  );
}
