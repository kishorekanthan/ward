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
    /** The 236px left column; the consumer supplies its landmark. A function is told whether the column shows folded. */
    sidebar: ReactNode | ((folded: boolean) => ReactNode);
    /** Sits at the top of the centre column, outside the page inset. */
    header?: ReactNode;
    /** The app's primary action, drawn at the end of the phone header row; wider bands leave it to the sidebar. */
    action?: ReactNode;
    children: ReactNode;
    /** The 316px right column; omitted or null draws no third track. */
    rail?: ReactNode;
    /** Below 768px the sidebar folds into a drawer: this labels its toggle and titles it, and names the collapsed rail. */
    sidebarLabel?: string;
    /** The folded strip shows these items; without them a function sidebar draws its own strip. */
    iconRail?: AppShellRailItem[];
    /** Given, the consumer owns the fold: true narrows the track to the 60px strip, and Ward draws no panel button or rail. */
    collapsed?: boolean;
    /** The page fills the content panel edge to edge, with no padding, and scrolls both ways inside it (a board). */
    pageFill?: boolean;
    /** The consumer places SidebarFoldButton in its own sidebar row, so Ward draws no row for the fold button. */
    foldButtonInSidebar?: boolean;
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
/** The frame's fold button, for a row of the consumer's own sidebar; it renders nothing where the sidebar does not fold. */
export declare function SidebarFoldButton(): import("react").JSX.Element | null;
export declare function AppShell(props: AppShellProps): import("react").JSX.Element;
