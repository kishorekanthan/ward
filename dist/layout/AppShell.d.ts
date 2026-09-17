import { ReactNode } from 'react';
export type AppShellDestination = {
    id: string;
    label: string;
    href: string;
};
export type StudioShellProps = {
    /** The 236px left column; the consumer supplies its landmark. */
    sidebar: ReactNode;
    /** Sits at the top of the centre column, outside the page inset. */
    header?: ReactNode;
    children: ReactNode;
    /** The 316px right column; omitted or null draws no third track. */
    rail?: ReactNode;
};
export type TopBarShellProps = {
    destinations?: AppShellDestination[];
    active?: string;
    children: ReactNode;
    actor?: string;
    brand?: string;
    tagline?: string;
    metadata?: ReactNode;
    /** Controls at the bar's trailing edge, kept visible when the identity chips collapse. */
    tools?: ReactNode;
};
export type AppShellProps = StudioShellProps | TopBarShellProps;
export declare function AppShell(props: AppShellProps): import("react").JSX.Element;
