import { ReactNode } from 'react';
export type ResolvedField = {
    key: string;
    value: ReactNode;
    evidence?: string;
    state: "resolved" | "confirm" | "unresolved";
};
export type ResolvedFieldRowProps = {
    field: ResolvedField;
};
export declare function ResolvedFieldRow({ field }: ResolvedFieldRowProps): import("react").JSX.Element;
