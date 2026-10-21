import { ReactNode } from 'react';
export type ProseProps = {
    children: ReactNode;
};
export declare function Prose({ children }: ProseProps): import("react").JSX.Element;
export type ProseHeadingProps = {
    level: 2 | 3 | 4;
    children: string;
    id?: string;
};
export declare function ProseHeading({ level, children, id }: ProseHeadingProps): import("react").JSX.Element;
