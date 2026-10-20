import { ReactNode } from 'react';
import { Fact } from './FactList';
import { FigureRatio } from './Figure';
export type Screenshot = {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: ReactNode;
};
export type SourceLink = {
    href: string;
    label: string;
};
export type ProjectPageProps = {
    title: string;
    summary: ReactNode;
    children: ReactNode;
    source: SourceLink;
    facts?: Fact[];
    screenshots?: Screenshot[];
    ratio?: FigureRatio;
    eyebrow?: string;
    eyebrowHref?: string;
};
export declare function ProjectPage(props: ProjectPageProps): import("react").JSX.Element;
