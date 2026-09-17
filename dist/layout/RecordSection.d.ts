import { ReactNode } from 'react';
export type RecordSectionProps = {
    title: string;
    children: ReactNode;
    note?: string;
    trailing?: ReactNode;
    pad?: "block" | "criteria" | "history" | "rail" | "cost" | "railList" | "placement";
    label?: string;
};
export declare function RecordSection({ title, children, note, trailing, pad, label }: RecordSectionProps): import("react").JSX.Element;
