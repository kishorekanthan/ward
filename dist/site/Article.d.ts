import { ReactNode } from 'react';
import { TocHeading } from './toc';
export type ArticleProps = {
    title: string;
    date: string;
    children: ReactNode;
    minutes?: number;
    tldr?: ReactNode;
    headings?: TocHeading[];
    eyebrow?: string;
    eyebrowHref?: string;
};
export declare function Article({ title, date, children, minutes, tldr, headings, eyebrow, eyebrowHref }: ArticleProps): import("react").JSX.Element;
