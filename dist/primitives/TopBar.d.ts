import { ReactNode } from 'react';
export type Destination = {
    id: string;
    label: string;
    href: string;
};
export type TopBarProps = {
    wordmark?: string;
    destinations: Destination[];
    active: string;
    actor?: {
        label: string;
    } | string;
    tagline?: ReactNode;
    onNavigate?: (id: string) => void;
    skipTo?: string;
};
export declare function TopBar({ wordmark, destinations, active, actor, tagline, onNavigate, skipTo }: TopBarProps): import("react").JSX.Element;
