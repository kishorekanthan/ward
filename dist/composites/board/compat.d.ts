import { ReactElement, ReactNode, RefCallback } from 'react';
import { LiveConnection, LiveEvent } from '../../live/types';
import { ChipRole, StreamStep } from '../../tokens';
export type LegacyLiveFeed = {
    connection: LiveConnection;
    lastEventAt: string | null;
    subscribe: (itemKey: string | "*", handler: (event: LiveEvent) => void) => () => void;
};
export type LegacyBoardItemView = {
    key: string;
    title: string;
    state?: {
        role: ChipRole;
        label: string;
    };
    streamStep: StreamStep;
    timeInStage: number;
    waitsOn: string;
    lastAgentAction?: string;
    finding?: string;
    cost?: number;
    jiraKey?: string;
    flagged?: boolean;
    run?: {
        agent: string;
        startedAt: string;
        turn?: [number, number];
        lastStep?: string;
    };
    changedAt: string;
};
export type LegacyCardField = "key" | "lastAgentAction" | "cost" | "jiraLink";
export type LegacyCardRoving = {
    tabIndex: 0 | -1;
    ref: RefCallback<HTMLButtonElement>;
    onFocus?: () => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
    "data-ward-roving"?: true;
};
export type LegacyWorkCardProps = {
    item: LegacyBoardItemView;
    fields?: LegacyCardField[];
    onOpen: (key: string) => void;
    feed: LegacyLiveFeed | null;
    selected?: boolean;
    tabIndex?: 0 | -1;
    connection?: LiveConnection;
    rovingItem?: LegacyCardRoving;
};
export declare function LegacyWorkCard(props: LegacyWorkCardProps): ReactElement;
export type LegacyOverCapNoteProps = {
    count: number;
    cap: number;
};
export declare function LegacyOverCapNote({ count, cap }: LegacyOverCapNoteProps): ReactElement;
export type LegacyBoardColumnDef = {
    id: string;
    label: string;
    cap?: number;
    gate?: boolean;
};
export type LegacyBoardColumnProps = {
    column: LegacyBoardColumnDef;
    items: LegacyBoardItemView[];
    fields?: LegacyCardField[];
    onOpen: (key: string) => void;
    selectedKey?: string | null;
    feed: LegacyLiveFeed | null;
    connection?: LiveConnection;
    roving?: {
        itemProps: (index: number) => LegacyWorkCardProps["rovingItem"];
    };
};
export declare function LegacyBoardColumn(props: LegacyBoardColumnProps): ReactElement;
export type LegacyBoardHeaderProps = {
    stream: {
        name: string;
        key: string;
        streamStep: StreamStep;
    };
    rollups: {
        inFlight: number;
        loadedThisWeek: number;
        agentsWorking: number;
        p50?: number;
        p90?: number;
    };
    connection: LiveConnection;
    lastEventAt: string | null;
    owners?: string[];
    owner?: string;
    onOwnerChange?: (owner: string) => void;
    onConfigure?: () => void;
};
export declare function LegacyBoardHeader(props: LegacyBoardHeaderProps): ReactElement;
export type LegacyConfigStage = {
    id: string;
    name: string;
    gate?: boolean;
    terminal?: boolean;
    agentsMounted?: number;
};
export type LegacyStageConfig = {
    label: string;
    cap?: string;
    shown: boolean;
};
export type LegacyConfigRowProps = {
    stage: LegacyConfigStage;
    config: LegacyStageConfig;
    onChange: (config: LegacyStageConfig) => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
};
export declare function LegacyConfigRow(props: LegacyConfigRowProps): ReactElement;
export type LegacyPreviewEffect = {
    met: boolean;
    text: string;
};
export type LegacyPreviewRailProps = {
    sample: LegacyBoardItemView[];
    fields?: LegacyCardField[];
    cap?: number;
    gate?: boolean;
    columnLabel: string;
    effects: LegacyPreviewEffect[];
    onOpen?: (key: string) => void;
};
export declare function LegacyPreviewRail(props: LegacyPreviewRailProps): ReactElement;
export type LegacyDrawerItem = {
    key: string;
    title: string;
    state?: {
        role: ChipRole;
        label: string;
    };
    stream?: {
        name: string;
        streamStep: StreamStep;
    };
    workflow?: string;
    timeInStage?: number;
    waitsOn?: string;
    agentSay?: string;
    cost?: number;
    run?: {
        agent: string;
        startedAt: string;
        turn?: [number, number];
        lastStep?: string;
    };
};
export type LegacyItemDrawerProps = {
    item: LegacyDrawerItem;
    actions?: ReactNode[];
    onClose: () => void;
    returnFocusTo?: HTMLElement | null;
    feed?: LegacyLiveFeed | null;
};
export declare function LegacyItemDrawer(props: LegacyItemDrawerProps): ReactElement;
