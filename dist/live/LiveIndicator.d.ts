export type LiveIndicatorProps = {
    startedAt: string;
    lastEvent?: {
        label: string;
        at: string;
    };
    connection: "live" | "reconnecting" | "stale";
    turn?: [number, number];
};
export declare function LiveIndicator({ startedAt, lastEvent, connection, turn }: LiveIndicatorProps): import("react").JSX.Element;
