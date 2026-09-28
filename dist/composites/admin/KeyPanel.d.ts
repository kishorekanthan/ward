import { ReactElement, ReactNode } from 'react';
export type KeyPanelProps = {
    label: string;
    status: string;
    value: string;
    onChange: (value: string) => void;
    actions: ReactNode;
    note?: string;
};
export declare function KeyPanel(props: KeyPanelProps): ReactElement;
