export type TableHeadColumn = {
    key: string;
    header: string;
    width?: number | string;
};
export type TableHeadProps = {
    columns: TableHeadColumn[];
};
export declare function TableHead({ columns }: TableHeadProps): import("react").JSX.Element;
