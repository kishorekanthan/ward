export type StreamAvatarProps = {
    /** The stream's full name; its initials are drawn. */
    name: string;
    /** The stream's colour step; none, or one without a validated colour, draws neutral. */
    step?: number | null;
    /** md is 22px, beside a name; lg is 26px, alone in a folded sidebar. */
    size?: "md" | "lg";
};
export declare function streamInitials(name: string): string;
export declare function StreamAvatar({ name, step, size }: StreamAvatarProps): import("react").JSX.Element;
