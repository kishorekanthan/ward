import { ReactNode } from 'react';
import { BoardItem } from './types';
import { WorkCardFeed } from './WorkCard';
export type ItemDetail = BoardItem & {
    summary: string;
    workflow: string;
    stateLabel: string;
    agentSentence?: string;
    agentMeta?: string;
    streamName?: string;
};
export type ItemDrawerProps = {
    item: ItemDetail;
    actions: ReactNode[];
    onClose: () => void;
    returnFocusTo?: HTMLElement | null;
    feed?: WorkCardFeed | null;
    resolve?: ReactNode;
    resolveLabel?: string;
    actionsNote?: string;
};
export declare function ItemDrawer({ item, actions, onClose, returnFocusTo, feed, resolve, resolveLabel, actionsNote }: ItemDrawerProps): import("react").JSX.Element;
