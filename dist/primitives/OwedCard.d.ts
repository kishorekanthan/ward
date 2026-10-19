import { ReactNode } from 'react';
export type OwedCardProps = {
    title: string;
    sentence: string;
    actions?: ReactNode;
    label?: string;
};
export declare function OwedCard({ title, sentence, actions, label }: OwedCardProps): import("react").JSX.Element;
