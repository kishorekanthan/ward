import { ReactNode } from 'react';
import { StreamStep } from '../tokens';
export type SidebarDestination = {
    id: string;
    label: string;
    href: string;
    note?: string;
};
export type SidebarItem = SidebarDestination;
export type SidebarLink = {
    label: string;
    href: string;
};
export type SidebarNavItem = SidebarLink & {
    current?: boolean;
};
export type SidebarAgent = SidebarLink & {
    meta: string;
    streamStep: StreamStep;
    current?: boolean;
    paused?: boolean;
};
export type StudioSidebarProps = {
    brand: string;
    nav: SidebarNavItem[];
    agentsHeading: string;
    agents: SidebarAgent[];
    newAction?: SidebarLink;
    shared?: {
        heading: string;
        links: SidebarLink[];
    };
};
export type LinkSidebarProps = {
    destinations?: SidebarDestination[];
    items?: SidebarItem[];
    active?: string;
    brand?: string;
    label?: string;
    children?: ReactNode;
};
export type SidebarProps = StudioSidebarProps | LinkSidebarProps;
export declare function Sidebar(props: SidebarProps): import("react").JSX.Element;
