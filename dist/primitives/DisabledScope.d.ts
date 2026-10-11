import { ReactNode } from 'react';
export type ScopeActions = "disable" | "hide";
export type ScopeReason = {
    reason: string;
    reasonId: string;
    actions: ScopeActions;
};
export type DisabledScopeProps = {
    reason: string;
    actions?: ScopeActions;
    children?: ReactNode;
};
export declare function DisabledScope({ reason, actions, children }: DisabledScopeProps): import("react").JSX.Element;
export declare function useDisabledScope(): ScopeReason | null;
export declare function describedByScope(describedBy: string | undefined, scope: ScopeReason | null): string | undefined;
