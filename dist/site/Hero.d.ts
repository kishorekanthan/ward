import { ReactNode } from 'react';
export type HeroAction = {
    href: string;
    label: string;
};
export type HeroProps = {
    title: ReactNode;
    eyebrow?: string;
    lead?: ReactNode;
    actions?: HeroAction[];
    visual?: ReactNode;
};
export declare function Hero({ visual, ...text }: HeroProps): import("react").JSX.Element;
