import { ReactElement } from 'react';
export type Tool = {
    name: string;
    scope: string;
    classification: "read" | "write";
    grant: "granted" | "available" | "locked";
    reason?: string;
};
export type ToolRowPresentation = {
    as?: "div" | "li";
    className?: string;
    lockedReasonFallback?: string;
};
export type ToolRowProps = {
    tool: Tool;
    onChange: (granted: boolean) => void;
    presentation?: ToolRowPresentation;
};
export declare function ToolRow({ tool, onChange, presentation }: ToolRowProps): ReactElement;
