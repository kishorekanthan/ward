export type StreamAvatarProps = {
    /** The stream's full name; its initials are drawn. */
    name: string;
    /** The stream's colour step; none, or one without a validated colour, draws neutral. */
    step?: number | null;
    /** md is 22px, beside a name; lg is 26px, alone in a folded sidebar. */
    size?: "md" | "lg";
    /** Drawn in place of the name's own initials, such as one from uniqueStreamInitials. */
    initials?: string;
};
export declare function streamInitials(name: string): string;
/** Initials for each name, none shared: in the order given, a name whose initials are taken gets its next free pair. */
export declare function uniqueStreamInitials(names: readonly string[]): Map<string, string>;
export declare function StreamAvatar({ name, step, size, initials }: StreamAvatarProps): import("react").JSX.Element;
