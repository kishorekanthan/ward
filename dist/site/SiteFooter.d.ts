import { ReactNode } from 'react';
import { SiteLink } from './SiteHeader';
export type SiteFooterProps = {
    note: ReactNode;
    links?: SiteLink[];
    label?: string;
};
export declare function SiteFooter({ note, links, label }: SiteFooterProps): import("react").JSX.Element;
