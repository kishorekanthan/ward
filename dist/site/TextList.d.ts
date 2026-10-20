import { ReactNode } from 'react';
export type TextListProps = {
    children: ReactNode;
    rules?: boolean;
    label?: string;
};
export declare function TextList({ children, rules, label }: TextListProps): import("react").JSX.Element;
