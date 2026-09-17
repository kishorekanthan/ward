import { LiveConnection, LiveEvent } from '../../live/types';
import { BoardField, BoardItem } from './types';
export type WorkCardFeed = {
    connection: LiveConnection;
    subscribe: (itemKey: string | "*", handler: (e: LiveEvent) => void) => () => void;
};
export type WorkCardProps = {
    item: BoardItem;
    fields?: BoardField[];
    onOpen?: (key: string, source: HTMLElement) => void;
    selected?: boolean;
    feed?: WorkCardFeed | null;
    rovingProps?: Record<string, unknown>;
    inList?: boolean;
};
export declare function WorkCard(props: WorkCardProps): import("react").JSX.Element;
