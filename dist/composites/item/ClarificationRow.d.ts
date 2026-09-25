export type Delivery = "queued" | "delivered" | "retrying" | "failed";
export type Clarification = {
    author: string;
    body: string;
    delivery: Delivery;
    etaOrAttempt: string;
    editedAt?: string;
    originalId?: string;
};
export type ClarificationRowProps = {
    comment: Clarification;
    onEdit?: () => void;
    onWithdraw?: () => void;
    onCancelDelivery?: () => void;
    onViewOriginal?: () => void;
    unavailable?: string;
    /** Display name of the tracker the comment is delivered to. */
    tracker?: string;
};
export declare function ClarificationRow(props: ClarificationRowProps): import("react").JSX.Element;
