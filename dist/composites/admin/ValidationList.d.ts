export type ValidationCheck = {
    passed: boolean | null;
    text: string;
    measured?: string;
    runsWhen?: string;
};
export type ValidationListProps = {
    checks: ValidationCheck[];
};
export declare function ValidationList({ checks }: ValidationListProps): import("react").JSX.Element;
