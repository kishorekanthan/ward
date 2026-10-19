export type StepState = "done" | "now" | "next";
export type Step = {
    label: string;
    state: StepState;
};
export type StageStepsProps = {
    steps: Step[];
    running?: boolean;
    label?: string;
};
export declare function StageSteps({ steps, running, label }: StageStepsProps): import("react").JSX.Element;
