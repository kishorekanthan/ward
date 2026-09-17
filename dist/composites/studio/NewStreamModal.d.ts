import { ReactElement } from 'react';
import { StreamStep } from '../../tokens';
import { LadderStep } from './ColourLadder';
export type StageDraft = {
    id: string;
    name: string;
    gate?: boolean;
};
export type PolicyOption = {
    value: string;
    label: string;
    consequence: string;
};
export type StreamDraft = {
    name: string;
    key: string;
    streamStep: StreamStep;
    owner: string;
    stages: StageDraft[];
    policy: string;
};
export type NewStreamModalProps = {
    owners: {
        value: string;
        label: string;
    }[];
    ladder: LadderStep[];
    takenBy?: Record<number, string>;
    stages?: StageDraft[];
    policies?: PolicyOption[];
    onCreate: (draft: StreamDraft) => void;
    onDraft: (draft: StreamDraft) => void;
    onClose: () => void;
    returnFocusTo?: HTMLElement | null;
};
export type WebStreamStageDraft = {
    name: string;
    kind: "entry" | "agent" | "gate" | "terminal";
};
export type WebNewStreamDraft = {
    name: string;
    key: string;
    owner: string;
    colourStep: number | null;
    writePolicyMode: "relay" | "direct" | "readonly";
    stages: WebStreamStageDraft[];
};
export type WebNewStreamModalProps = {
    presentation: "web";
    owners: string[];
    ladder: {
        step: number;
        name?: string;
        reserved?: boolean;
    }[];
    takenBy?: Record<number, string>;
    onCreate: (draft: WebNewStreamDraft) => void;
    onDraft?: (draft: WebNewStreamDraft) => void;
    onClose: () => void;
    returnFocusTo?: HTMLElement | null;
};
type NewStreamModalRenderProps = NewStreamModalProps | WebNewStreamModalProps;
export declare function colourStatus(colourStep: number | null, takenBy: Record<number, string>): string;
export declare function NewStreamModal(props: NewStreamModalRenderProps): ReactElement;
export {};
