import { ReactElement } from 'react';
export type StageListRow = {
    name: string;
    kind: "entry" | "agent" | "gate" | "terminal";
};
export type StageListEditorProps = {
    stages: StageListRow[];
    onChange: (stages: StageListRow[]) => void;
    catalogue?: string[];
    stageLabel?: (name: string) => string;
};
export declare function StageListEditor({ stages, onChange, catalogue, stageLabel }: StageListEditorProps): ReactElement;
