import { ReactNode } from 'react';
export type SectionHeaderProps = {
    title: string;
    index?: string;
    note?: ReactNode;
    counter?: string;
    kind?: "micro" | "key" | "bare";
    trailing?: ReactNode;
};
export declare function SectionHeader({ title, index, note, counter, kind, trailing }: SectionHeaderProps): import("react").JSX.Element;
