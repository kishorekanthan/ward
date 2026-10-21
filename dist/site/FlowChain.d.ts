import { ReactNode } from 'react';
export type FlowAnimate = "ready" | "run";
export type FlowChainProps = {
    steps: ReactNode[];
    label?: string;
    animate?: FlowAnimate;
};
export declare function FlowChain({ steps, label, animate }: FlowChainProps): import("react").JSX.Element;
