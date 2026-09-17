import { ReactElement } from 'react';
export type ComponentState = "ready" | "drainFirst" | "restartDue";
export type DeployComponent = {
    name: string;
    pods: number;
    note: string;
    state: ComponentState;
};
export type ComponentRowProps = {
    component: DeployComponent;
    onRestart: (name: string) => void;
};
export type WebDeployComponent = {
    name: string;
    pods: string;
    note: string;
    state: ComponentState;
};
export type WebComponentRowProps = {
    presentation: "web";
    component: WebDeployComponent;
    onRestart?: (name: string) => void;
};
export declare function restartLabel(state: ComponentState): string;
export declare function ComponentRow(props: ComponentRowProps | WebComponentRowProps): ReactElement;
