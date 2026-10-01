import { ReactNode } from 'react';
import { LiveConnection } from '../../live/types';
export type ConsoleKind = "tool" | "warn" | "ok" | "dim";
export type ConsoleLine = {
    at: string;
    kind: ConsoleKind;
    text: string;
};
export type ActivityConsoleProps = {
    lines: ConsoleLine[];
    connection: LiveConnection;
    idleSince?: string;
    label?: string;
};
export type ConsoleAnnounceProviderProps = {
    announce?: boolean;
    onAnnounceChange?: (announce: boolean) => void;
    children: ReactNode;
};
export declare function ConsoleAnnounceProvider({ announce, onAnnounceChange, children }: ConsoleAnnounceProviderProps): import("react").JSX.Element;
export declare function ActivityConsole({ lines, connection, idleSince, label }: ActivityConsoleProps): import("react").JSX.Element;
