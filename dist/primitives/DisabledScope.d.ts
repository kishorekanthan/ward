import { ReactNode } from 'react';
export type ScopeReason = {
    reason: string;
    reasonId: string;
};
export type DisabledScopeProps = {
    reason: string;
    children?: ReactNode;
};
export declare function DisabledScope({ reason, children }: DisabledScopeProps): import("react").JSX.Element;
export declare function useDisabledScope(): ScopeReason | null;
export declare function describedByScope(describedBy: string | undefined, scope: ScopeReason | null): string | undefined;
