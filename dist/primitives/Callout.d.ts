import { ReactNode } from 'react';
export type CalloutProps = {
    variant?: "info" | "warn";
    ticket: string;
    children: ReactNode;
};
export declare function Callout({ variant, ticket, children }: CalloutProps): import("react").JSX.Element;
