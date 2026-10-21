import { ReactNode } from 'react';
import { HeadingLevel } from './heading';
export type PageIntroProps = {
    title: ReactNode;
    eyebrow?: string;
    eyebrowHref?: string;
    lead?: ReactNode;
    headingLevel?: HeadingLevel;
    children?: ReactNode;
};
export declare function PageIntro({ title, eyebrow, eyebrowHref, lead, headingLevel, children }: PageIntroProps): import("react").JSX.Element;
