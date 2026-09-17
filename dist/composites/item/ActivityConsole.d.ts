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
export declare function ActivityConsole({ lines, connection, idleSince, label }: ActivityConsoleProps): import("react").JSX.Element;
