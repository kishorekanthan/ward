import { HTMLAttributes, ReactNode, RefObject } from 'react';
export type OverflowRowProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
    label: string;
    children?: ReactNode;
    count?: number;
    as?: "div" | "nav";
    focusable?: boolean;
    rowRef?: RefObject<HTMLElement | null>;
};
export declare function OverflowRow({ label, children, count, as: Tag, focusable, rowRef, className, ...rest }: OverflowRowProps): import("react").JSX.Element;
