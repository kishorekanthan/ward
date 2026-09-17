export type Session = {
    title: string;
    turns: number;
    turnsNote?: string;
    waitingOn?: string;
    resolved: string[];
    cost?: number;
    lastActivity: string;
    state: "open" | "draft" | "created" | "duplicate" | "expired";
    link?: {
        key: string;
        href: string;
    };
};
export type SessionRowProps = {
    session: Session;
    presentation?: "card";
    href?: never;
} | {
    session: Session;
    presentation: "table";
    href: string;
};
export declare function agoSince(iso: string): string;
export declare function SessionRow(props: SessionRowProps): import("react").JSX.Element;
