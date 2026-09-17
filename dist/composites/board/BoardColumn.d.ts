import { KeyboardEventHandler } from 'react';
import { WorkCardFeed } from './WorkCard';
import { BoardColumnConfig, BoardField, BoardItem } from './types';
export type BoardColumnProps = {
    column: BoardColumnConfig;
    items: BoardItem[];
    fields?: BoardField[];
    sort: "oldest" | "newest";
    onOpen: (key: string, source: HTMLElement) => void;
    selectedKey?: string;
    feed?: WorkCardFeed | null;
    roving?: {
        base: number;
        itemProps: (i: number) => Record<string, unknown>;
    };
    onKeyDown?: KeyboardEventHandler<HTMLElement>;
};
export declare function ordered(items: BoardItem[], sort: "oldest" | "newest"): BoardItem[];
export declare function BoardColumn({ column, items, fields, sort, onOpen, selectedKey, feed, roving, onKeyDown }: BoardColumnProps): import("react").JSX.Element;
