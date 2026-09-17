import { LiveConnection } from '../../live/types';
import { StreamStep } from '../../tokens';
export type AgentVersion = {
    v: string;
    status: "live" | "draft" | "paused";
    label?: string;
    by?: string;
    at?: string;
};
export type Agent = {
    id: string;
    name: string;
    streamStep: StreamStep;
    description?: string;
    versions: AgentVersion[];
    run?: {
        itemKey: string;
        startedAt: string;
        turn?: [number, number];
    };
};
export type AgentCardProps = {
    agent: Agent;
    href: string;
    selected?: boolean;
    connection?: LiveConnection;
    lastEvent?: {
        label: string;
        at: string;
    };
    className?: string;
};
export declare function AgentCard({ agent, href, selected, connection, lastEvent, className }: AgentCardProps): import("react").JSX.Element;
