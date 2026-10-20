import { ReactNode } from 'react';
import { Fact } from './FactList';
import { LinkItem } from './LinkList';
export type CaseStudyProps = {
    title: string;
    summary: ReactNode;
    children: ReactNode;
    eyebrow?: string;
    eyebrowHref?: string;
    role?: string;
    period?: string;
    focus?: string[];
    stack?: string[];
    related?: LinkItem[];
};
type FactSource = [term: string, value: string | string[] | undefined];
export declare function factsFrom(sources: FactSource[]): Fact[];
type PageBodyProps = {
    facts: Fact[];
    links?: LinkItem[];
    linksLabel: string;
    asideLabel: string;
    children: ReactNode;
};
export declare function PageBody({ facts, links, linksLabel, asideLabel, children }: PageBodyProps): import("react").JSX.Element;
export declare function CaseStudy({ title, summary, children, eyebrow, eyebrowHref, role, period, focus, stack, related }: CaseStudyProps): import("react").JSX.Element;
export {};
