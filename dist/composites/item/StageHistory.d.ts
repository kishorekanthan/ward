import { ReactElement } from 'react';
export interface HistoryEntry {
    stage: string;
    sentence: string;
    at: string;
    actor: string;
    version?: string;
    cost?: number;
    state: "done" | "hold" | "pending";
}
/** @deprecated Use HistoryEntry, retained for consumers of the original Ward API. */
export type StageEntry = HistoryEntry;
export interface StageHistoryProps {
    entries: HistoryEntry[];
}
export declare function StageHistory({ entries }: StageHistoryProps): ReactElement;
