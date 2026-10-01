import { ReactNode } from 'react';
export type StageGridProps = {
    columns: number;
    children: ReactNode;
    label?: string;
    floor?: "stage" | "column";
};
export declare function StageGrid({ columns, children, label, floor }: StageGridProps): import("react").JSX.Element;
