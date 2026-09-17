import { GateItem } from '../studio/GateChecklist';
export type ReadyChecklistProps = {
    items: GateItem[];
    note: string;
    actionLabel?: string;
    onAction: () => void;
    density?: "rail";
};
export declare function ReadyChecklist({ items, note, actionLabel, onAction, density }: ReadyChecklistProps): import("react").JSX.Element;
