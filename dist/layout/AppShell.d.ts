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
    /** Below 792px the sidebar folds into a drawer: this labels its toggle and titles it. */
    sidebarLabel?: string;
};
export type TopBarShellProps = {
    destinations?: AppShellDestination[];
    active?: string;
    children: ReactNode;
    actor?: string;
    brand?: string;
    tagline?: string;
    metadata?: ReactNode;
    /** Controls at the bar's trailing edge; below 768px they sit behind one toggle. */
    tools?: ReactNode;
    /** The toggle's visible label below 768px. */
    toolsLabel?: string;
};
export type AppShellProps = StudioShellProps | TopBarShellProps;
export declare function AppShell(props: AppShellProps): import("react").JSX.Element;
