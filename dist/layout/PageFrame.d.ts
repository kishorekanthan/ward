import { ElementType, ReactNode } from 'react';
export type PageFrameProps = {
    children: ReactNode;
    as?: ElementType;
    inset?: "page" | "none" | "board";
};
export declare function PageFrame({ children, as: Root, inset }: PageFrameProps): import("react").JSX.Element;
