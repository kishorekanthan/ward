export type Rung = {
    name: string;
    state: "passed" | "waiting" | "pending";
    actor?: string;
};
export declare function GateLadder({ rungs }: {
    rungs: Rung[];
}): import("react").JSX.Element;
