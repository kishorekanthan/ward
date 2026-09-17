export type StateAction = {
    label: string;
    onClick: () => void;
};
export type EmptyStateProps = {
    sentence: string;
    action?: StateAction;
};
export declare function EmptyState(props: EmptyStateProps): import("react").JSX.Element;
export type FilteredEmptyProps = {
    sentence: string;
    total: number;
    action?: StateAction;
};
export declare function FilteredEmpty({ sentence, total, action }: FilteredEmptyProps): import("react").JSX.Element;
export declare function DeniedState(props: EmptyStateProps): import("react").JSX.Element;
export type LoadFailedProps = {
    sentence: string;
    at: string;
    onRetry: () => void;
};
export declare function LoadFailed({ sentence, at, onRetry }: LoadFailedProps): import("react").JSX.Element;
export type StaleStripProps = {
    lastReachableAt: string;
    snapshotAt: string;
};
export declare function StaleStrip({ lastReachableAt, snapshotAt }: StaleStripProps): import("react").JSX.Element;
export type WriteUnavailableStripProps = {
    queued: number;
    since: string;
};
export declare function WriteUnavailableStrip({ queued, since }: WriteUnavailableStripProps): import("react").JSX.Element;
