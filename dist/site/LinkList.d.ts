export type LinkItem = {
    href: string;
    label: string;
    note?: string;
};
export type LinkListProps = {
    label: string;
    links: LinkItem[];
};
export declare function LinkList({ label, links }: LinkListProps): import("react").JSX.Element;
