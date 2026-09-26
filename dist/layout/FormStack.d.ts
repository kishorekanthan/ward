import { ReactNode } from 'react';
export type FormStackProps = {
    label: string;
    children: ReactNode;
    actions?: ReactNode;
    onSubmit?: () => void;
};
export declare function FormStack({ label, children, actions, onSubmit }: FormStackProps): import("react").JSX.Element;
