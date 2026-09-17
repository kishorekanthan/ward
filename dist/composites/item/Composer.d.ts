export type ComposerProps = {
    placeholder: string;
    asUser: string;
    attachTo?: {
        label: string;
        onChange: () => void;
    };
    requeueAfter?: {
        checked: boolean;
        agent: string;
        consequence?: string;
        onChange?: (checked: boolean) => void;
    };
    onPost: (asUser: string, body: string) => void;
    onDraft?: (body: string) => void;
    variant?: "reply";
};
export declare function Composer(props: ComposerProps): import("react").JSX.Element;
