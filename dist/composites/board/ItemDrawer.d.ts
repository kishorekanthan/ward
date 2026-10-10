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
/** A fact row the app adds to the drawer's facts list; Ward renders it like a built-in row. */
export type DrawerFact = {
    label: string;
    value: ReactNode;
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
    facts?: DrawerFact[];
    /** Shows the item key as a chip; off by default, as a generated id is noise to most readers. */
    showKey?: boolean;
};
export declare function ItemDrawer({ item, actions, onClose, returnFocusTo, feed, resolve, resolveLabel, actionsNote, facts, showKey }: ItemDrawerProps): import("react").JSX.Element;
