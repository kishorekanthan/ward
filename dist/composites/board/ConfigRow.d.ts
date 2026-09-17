export type ConfigStage = {
    id: string;
    name: string;
    gate: boolean;
    terminal: boolean;
    agentsMounted: number;
};
export type ColumnDraft = {
    label: string;
    cap?: number;
    shown: boolean;
};
export type ConfigRowProps = {
    stage: ConfigStage;
    config: ColumnDraft;
    onChange: (next: ColumnDraft) => void;
    onReorder?: (direction: -1 | 1) => void;
};
export declare function ConfigRowHead(): import("react").JSX.Element;
export declare function ConfigRow({ stage, config, onChange, onReorder }: ConfigRowProps): import("react").JSX.Element;
