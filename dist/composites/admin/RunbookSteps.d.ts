import { ReactElement, ReactNode } from 'react';
import { LiveConnection } from '../../live/types';
export type RunbookStepState = "done" | "running" | "pending";
export type RunbookStep = {
    title: string;
    detail: string;
    state: RunbookStepState;
    startedAt?: string;
};
type RunbookStepsBaseProps = {
    steps: RunbookStep[];
    actions?: ReactNode;
    connection?: LiveConnection;
};
export type WebRunbookStepsProps = RunbookStepsBaseProps & {
    presentation: "web";
};
export declare function RunbookSteps(props: RunbookStepsBaseProps | WebRunbookStepsProps): ReactElement;
export {};
