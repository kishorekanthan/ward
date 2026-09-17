import { ReactElement, ReactNode } from 'react';
import { Segment } from '../../primitives/SegmentedControl';
export type PolicyInheritance = "inherited" | "overridden" | "locked" | "derived";
export type PolicyControl = {
    kind: "switch";
    checked: boolean;
    onChange: (checked: boolean) => void;
} | {
    kind: "segment";
    options: Segment[];
    value: string;
    onChange: (value: string) => void;
} | {
    kind: "value";
    text: string;
};
export type PolicySetting = {
    name: string;
    consequence: string;
};
export type WebPolicyControl = {
    kind: "switch" | "segment" | "value";
    value?: boolean | string;
    options?: Segment[];
};
export type WebPolicyRowProps = {
    presentation: "web";
    setting: PolicySetting;
    control: WebPolicyControl;
    inheritance: PolicyInheritance;
    reason?: string;
    onChange?: (value: boolean | string) => void;
    renderControl?: (describedBy: string) => ReactNode;
};
type CompactPolicyRowProps = {
    setting: PolicySetting;
    control: PolicyControl;
    inheritance: PolicyInheritance;
    reason?: string;
};
export declare const POLICY_CHIP_WIDTH = 104;
export declare function PolicyRow(props: CompactPolicyRowProps | WebPolicyRowProps): ReactElement;
export {};
