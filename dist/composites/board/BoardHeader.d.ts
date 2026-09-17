import { ReactNode } from 'react';
import { LiveConnection } from '../../live/types';
import { FieldOption } from '../../primitives/Field';
import { StreamStep } from '../../tokens';
export type BoardRollups = {
    inFlight: number;
    loadedThisWeek?: number;
    agentsWorking?: number;
    p50?: number;
    p90?: number;
};
export type BoardHeaderProps = {
    stream: {
        name: string;
        key: string;
        streamStep: StreamStep;
        markRef?: string | null;
    };
    rollups: BoardRollups;
    connection: LiveConnection;
    lastEventAt: string | null;
    owners?: FieldOption[];
    owner?: string;
    onOwnerChange?: (value: string) => void;
    onConfigure?: () => void;
    actions?: ReactNode;
};
export declare function BoardHeader({ stream, rollups, connection, lastEventAt, owners, owner, onOwnerChange, onConfigure, actions, }: BoardHeaderProps): import("react").JSX.Element;
