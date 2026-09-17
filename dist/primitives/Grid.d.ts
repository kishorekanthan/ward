import { ReactNode } from 'react';
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
    sort?: {
        key: string;
        direction: "asc" | "desc";
    };
    onSort?: (key: string) => void;
    empty: ReactNode;
};
export declare function Grid<Row>({ label, columns, rows, rowId, renderCell, selectedId, lockedIds, sort, onSort, empty, }: GridProps<Row>): import("react").JSX.Element;
