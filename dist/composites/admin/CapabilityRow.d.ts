import { ReactElement } from 'react';
import { StreamStep } from '../../tokens';
export type CapabilityValue = "on" | "off" | "pilot" | "byRole";
export type CapabilityCell = {
    streamStep: StreamStep;
    stream: string;
    value: CapabilityValue;
};
export type Capability = {
    name: string;
    consequence: string;
    governedBy: string;
    ticket?: string;
};
export type CapabilityRowProps = {
    capability: Capability;
    cells: CapabilityCell[];
    onChange: (streamStep: StreamStep, on: boolean) => void;
};
export type WebCapabilityCell = {
    streamStep: 1 | 2 | 3;
    value: CapabilityValue;
};
export type WebCapabilityRowProps = {
    presentation: "web";
    capability: Capability;
    cells: WebCapabilityCell[];
    onChange?: (streamStep: WebCapabilityCell["streamStep"], value: "on" | "off") => void;
};
export declare function CapabilityRow(props: CapabilityRowProps | WebCapabilityRowProps): ReactElement;
