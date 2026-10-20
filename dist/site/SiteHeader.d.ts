export type SiteLink = {
    href: string;
    label: string;
};
export type SiteHeaderProps = {
    brand: string;
    links: SiteLink[];
    current?: string;
    homeHref?: string;
    mainId?: string;
    skipLabel?: string;
};
export declare function SiteHeader({ brand, links, current, homeHref, mainId, skipLabel }: SiteHeaderProps): import("react").JSX.Element;
