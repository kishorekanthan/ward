import { ReactNode } from 'react';
import { HeadingLevel } from './heading';
export type SectionSpace = "6" | "7" | "8" | "9";
type SectionLink = {
    href: string;
    label: string;
};
export type SectionProps = {
    title: ReactNode;
    children: ReactNode;
    id?: string;
    eyebrow?: string;
    link?: SectionLink;
    headingLevel?: HeadingLevel;
    space?: SectionSpace;
};
export declare function Section({ title, children, id, eyebrow, link, headingLevel, space }: SectionProps): import("react").JSX.Element;
export {};
