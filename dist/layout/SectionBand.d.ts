import { ReactNode } from 'react';
export type SectionBandProps = {
    children: ReactNode;
    actions?: ReactNode;
    label?: string;
};
export declare function SectionBand({ children, actions, label }: SectionBandProps): import("react").JSX.Element;
