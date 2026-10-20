import { ReactNode } from 'react';
export type Fact = {
    term: string;
    value: ReactNode;
};
export type FactListProps = {
    facts: Fact[];
};
export declare function FactList({ facts }: FactListProps): import("react").JSX.Element;
