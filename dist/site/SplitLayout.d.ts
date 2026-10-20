import { ReactNode } from 'react';
export type SplitLayoutProps = {
    children: ReactNode;
    aside: ReactNode;
    asideLabel: string;
};
export declare function SplitLayout({ children, aside, asideLabel }: SplitLayoutProps): import("react").JSX.Element;
