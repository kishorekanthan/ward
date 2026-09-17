import { ReactElement } from 'react';
export type StageListRow = {
    name: string;
    kind: "entry" | "agent" | "gate" | "terminal";
};
export type StageListEditorProps = {
    stages: StageListRow[];
    onChange: (stages: StageListRow[]) => void;
};
export declare function StageListEditor({ stages, onChange }: StageListEditorProps): ReactElement;
