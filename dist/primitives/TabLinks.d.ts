import { TabLevel } from './Tabs';
export type TabLink = {
    id: string;
    label: string;
    href: string;
    count?: number;
};
export type TabLinksProps = {
    links: TabLink[];
    active: string;
    label: string;
    level: TabLevel;
};
export declare function TabLinks({ links, active, label, level }: TabLinksProps): import("react").JSX.Element;
