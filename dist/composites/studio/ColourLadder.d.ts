import { ReactElement } from 'react';
import { StreamStep } from '../../tokens';
export type LadderStep = {
    step: StreamStep;
    name: string;
    reserved?: boolean;
};
type CompatibilityLadderStep = {
    step: number;
    name?: string;
    reserved?: boolean;
};
export type ColourLadderProps = {
    label: string;
    steps: LadderStep[];
    value: StreamStep;
    onChange: (step: StreamStep) => void;
    takenBy?: Record<number, string>;
};
export type ColourLadderCompatibilityProps = {
    label?: string;
    steps: CompatibilityLadderStep[];
    value: number | null;
    onChange?: (step: number) => void;
    takenBy?: Record<number, string>;
    presentation?: "swatches";
};
type Validation = "validated" | "partial" | "reserved";
export declare const PARTIAL_STEP_REASON = "not validated \u2014 needs CVD matrix and dark stepping";
export declare function ladderValidation(step: CompatibilityLadderStep): Validation;
export declare function ColourLadder(props: ColourLadderProps): ReactElement;
export declare function ColourLadder(props: ColourLadderCompatibilityProps): ReactElement;
export {};
