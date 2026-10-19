import { ReactNode } from 'react';
export type FoldTextProps = {
    children: ReactNode;
    lines?: 2 | 3 | 4;
    label?: string;
};
export declare function FoldText({ children, lines, label }: FoldTextProps): import("react").JSX.Element;
