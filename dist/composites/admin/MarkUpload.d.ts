export type ValidationResult = {
    ok: boolean;
    reasons: string[];
};
export type MarkValidation = {
    ok: true;
    svg: string;
} | {
    ok: false;
    reasons: string[];
};
export declare function validateMark(source: string): MarkValidation;
type StatusPresentation = {
    idle: string;
    accepted: string;
    rejected: (reasons: string[]) => string;
    classNames: {
        idle: string;
        accepted: string;
        rejected: string;
    };
};
export type MarkUploadPresentation = {
    useInitialsLabel?: string;
    status?: StatusPresentation;
};
export type MarkUploadProps = {
    current?: {
        svg: string;
        colour: string;
    };
    onUpload: (file: File) => ValidationResult | Promise<ValidationResult>;
    onUseInitials: () => void;
    presentation?: MarkUploadPresentation;
};
export declare function MarkUpload({ current, onUpload, onUseInitials, presentation }: MarkUploadProps): import("react").JSX.Element;
export {};
