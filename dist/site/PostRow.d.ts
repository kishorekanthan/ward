import { ReactNode } from 'react';
import { HeadingLevel } from './heading';
export type PostRowProps = {
    href: string;
    title: string;
    date: string;
    meta?: string;
    summary?: ReactNode;
    headingLevel?: HeadingLevel;
};
export declare function PostRow({ href, title, date, meta, summary, headingLevel }: PostRowProps): import("react").JSX.Element;
