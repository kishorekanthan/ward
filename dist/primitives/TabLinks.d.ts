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
    level?: 1 | 2;
};
export declare function TabLinks({ links, active, label, level }: TabLinksProps): import("react").JSX.Element;
