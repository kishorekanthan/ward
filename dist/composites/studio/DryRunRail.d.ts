import { ReactElement } from 'react';
import { LiveConnection, LiveEvent } from '../../live/types';
import { GateItem } from './GateChecklist';
export type DryRunStepKind = "ok" | "finding" | "action" | "notSimulated" | "running";
export type DryRunStep = {
    kind: DryRunStepKind;
    title: string;
    detail: string;
};
export type DryRun = {
    status: "passed" | "failed" | "running" | "notRun";
    startedAt?: string;
    sample?: {
        key: string;
        title: string;
        replayedFrom: string;
    };
    steps: DryRunStep[];
    cost?: number;
    turns?: [number, number];
    durationMs?: number;
};
export type FoundryDryRun = Omit<DryRun, "sample" | "steps"> & {
    sample?: {
        key: string;
        title: string;
        replayedFrom?: string;
    };
    steps: Array<Omit<DryRunStep, "detail"> & {
        detail?: string;
    }>;
    gateCount?: number;
};
export type DryRunFeed = {
    connection: LiveConnection;
    subscribe?: (itemKey: string | "*", handler: (event: LiveEvent) => void) => () => void;
};
type WardProps = {
    run: DryRun;
    checklist: GateItem[];
    publishNote: string;
    onPublish: () => void;
    feed?: DryRunFeed | null;
    presentation?: "ward";
};
type FoundryProps = {
    run: FoundryDryRun;
    checklist: GateItem[];
    publishNote?: string;
    onPublish?: () => void;
    feed: DryRunFeed | null;
    presentation: "foundry";
};
export type DryRunRailProps = WardProps | FoundryProps;
export declare function DryRunRail(props: DryRunRailProps): ReactElement;
export {};
