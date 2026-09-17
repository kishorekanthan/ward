import { ReactElement, ReactNode } from 'react';
import { GridColumn } from '../../primitives/Grid';
export type MatrixRole = "platformAdmin" | "approver" | "streamAdmin" | "member" | "viewer";
export type MatrixNode = {
    name: string;
    matrixRole?: MatrixRole;
    adGroup?: string;
    people?: number;
    requestedVia?: string;
    unresolved?: boolean;
    inherited?: boolean;
    floor?: boolean;
};
export type WebRoleMatrixRowSpec = {
    depth: 0 | 1 | 2;
    label: string;
    role?: {
        role: "gate" | "running" | "meta" | "warn";
        label: string;
    };
    group?: string;
    people?: string;
    requestedVia?: string;
    state?: "normal" | "inherited" | "unresolved" | "floor";
    leaf?: boolean;
    expanded?: boolean;
};
export type WebRoleMatrixRowProps = {
    presentation: "web";
    rows: WebRoleMatrixRowSpec[];
    label?: string;
};
type CompactRoleMatrixRowProps = {
    index: number;
    depth: 0 | 1 | 2;
    node: MatrixNode;
    expanded?: boolean;
    leaf?: boolean;
    onToggle?: () => void;
    children?: ReactNode;
};
export declare const ROLE_MATRIX_COLUMNS: GridColumn[];
export declare function RoleMatrixRow(props: CompactRoleMatrixRowProps | WebRoleMatrixRowProps): ReactElement;
export {};
