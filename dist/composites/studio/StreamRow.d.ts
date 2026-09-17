import { StreamStep } from '../../tokens';
export type Stream = {
    name: string;
    key: string;
    streamStep: StreamStep;
    owner: string;
    members: number;
    stages: {
        name: string;
        gate: boolean;
    }[];
    agents: {
        live: number;
        draft: number;
        paused: number;
    };
    policy: {
        id: string;
        summary: string;
    };
    inFlight: number;
    p50?: number;
    draft?: boolean;
};
export type StreamRowSummary = {
    name: string;
    key: string;
    streamStep: StreamStep;
    owner: string;
    members?: number;
    stages: {
        name: string;
        gate?: boolean;
    }[];
    agents?: {
        live: number;
        draft: number;
        paused: number;
    };
    policy?: {
        id: string;
        summary: string;
    };
    inFlight?: number;
    p50?: string;
    draft?: boolean;
};
export type StreamRowPresentation = {
    columns: 5;
    className?: string;
};
type CompactStreamRowProps = {
    stream: StreamRowSummary;
    href: string;
    presentation: StreamRowPresentation;
};
export type StreamRowProps = {
    stream: Stream;
    href: string;
    presentation?: undefined;
} | CompactStreamRowProps;
export declare function StreamRow(props: StreamRowProps): import("react").JSX.Element;
export {};
