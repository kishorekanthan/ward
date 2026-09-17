import { ReactNode } from 'react';
import { LiveConnection } from '../../live/types';
import { AgentCardProps } from './AgentCard';
export type StageKind = "entry" | "agent" | "gate" | "terminal";
export type Stage = {
    index: number;
    name: string;
    kind: StageKind;
    count: number;
    medianWait?: number;
    reviewers?: string[];
    gateShare?: number;
    closedThisWeek?: number;
};
export type StageColumnProps = {
    stage: Stage;
    agents?: AgentCardProps[];
    onMount?: () => void;
    feed?: {
        connection: LiveConnection;
    } | null;
};
export type StageColumnReviewer = {
    initials: string;
    name: string;
};
export type StageColumnSummary = {
    index: number;
    name: string;
    kind: StageKind;
    count?: number;
    medianWait?: string;
    reviewers?: StageColumnReviewer[];
    gateShare?: number;
    closedThisWeek?: number;
};
export type StageColumnWorkflowProps = {
    stage: StageColumnSummary;
    agentCards?: ReactNode;
    onMount?: (index: number) => void;
    presentation: {
        mode: "workflow";
    };
};
type RenderProps = StageColumnProps | StageColumnWorkflowProps;
export declare function StageColumn(props: RenderProps): import("react").JSX.Element;
export {};
