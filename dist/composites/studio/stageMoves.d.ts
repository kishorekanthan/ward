import { ReactElement, RefObject } from 'react';
export type Direction = "up" | "down";
export type MoveTarget = {
    id: string;
    direction: Direction;
};
export declare function moveRow<T>(rows: T[], from: number, to: number): T[];
export declare function moveTo(index: number, direction: Direction): number;
export declare function moveAnnouncement(name: string, to: number, total: number): string;
export declare function useMoveFocus<T extends HTMLElement>(): {
    root: RefObject<T | null>;
    announcement: string;
    moved: (target: MoveTarget, announcement: string) => void;
};
export declare function MoveAnnouncer({ text }: {
    text: string;
}): ReactElement;
export declare function MoveButton({ id, name, direction, onMove }: {
    id: string;
    name: string;
    direction: Direction;
    onMove: () => void;
}): ReactElement;
