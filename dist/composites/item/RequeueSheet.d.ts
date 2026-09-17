export type RequeueSheetProps = {
    run: {
        agent: string;
        stage: string;
    };
    effects: string[];
    refusals: {
        reason: string;
    }[];
    cost: {
        spent: number;
        more: number;
        itemTotal: number;
        ceiling: number;
    };
    onRequeue?: (note?: string) => void;
    onClose: () => void;
    returnFocusTo?: HTMLElement | null;
};
export declare function RequeueSheet({ run, effects, refusals, cost, onRequeue, onClose, returnFocusTo }: RequeueSheetProps): import("react").JSX.Element;
