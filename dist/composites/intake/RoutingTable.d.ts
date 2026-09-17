import { ReactNode } from 'react';
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
export declare function RoutingTable({ rows, empty, requireNoRerunReason }: RoutingTableProps): import("react").JSX.Element;
