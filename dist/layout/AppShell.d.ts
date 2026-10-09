import { ReactNode } from 'react';
import { StreamStep } from '../tokens';
export type AppShellDestination = {
    id: string;
    label: string;
    href: string;
    /** Marks the item in the collapsed sidebar, such as HomeIcon; the top bar ignores it. */
    icon?: ReactNode;
};
/** One item of the collapsed sidebar: its icon, else its stream's colour square, else its first letter. */
export type AppShellRailItem = AppShellDestination & {
    streamStep?: StreamStep;
    current?: boolean;
};
export type StudioShellProps = {
    /** The 236px left column; the consumer supplies its landmark. */
    sidebar: ReactNode;
    /** Sits at the top of the centre column, outside the page inset. */
    header?: ReactNode;
    children: ReactNode;
    /** The 316px right column; omitted or null draws no third track. */
    rail?: ReactNode;
    /** Below 792px the sidebar folds into a drawer: this labels its toggle and titles it, and names the collapsed rail. */
    sidebarLabel?: string;
    /** Given, a panel button at the top of the sidebar collapses it to a 60px rail of these items; each viewer's choice is kept. */
    iconRail?: AppShellRailItem[];
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
