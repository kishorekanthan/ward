import { ChipRole, StreamStep } from '../../tokens';
export type BoardField = "key" | "lastAgentAction" | "cost" | "jiraLink";
export type BoardRun = {
    agent: string;
    startedAt: string;
    turn?: [number, number];
    lastStep?: {
        label: string;
        at: string;
    };
};
export type BoardItem = {
    key: string;
    title: string;
    stage: string;
    timeInStage: number;
    waitsOn: string;
    streamStep: StreamStep;
    changedAt: string;
    state?: {
        role: ChipRole;
        label: string;
    };
    lastAgentAction?: string;
    finding?: string;
    cost?: number;
    jiraKey?: string;
    flagged?: boolean;
    blockedReason?: string;
    run?: BoardRun;
};
export type BoardColumnConfig = {
    id: string;
    label: string;
    cap?: number;
    gate: boolean;
};
export type BoardConfig = {
    columns: BoardColumnConfig[];
    fields: BoardField[];
    sort: "oldest" | "newest";
};
