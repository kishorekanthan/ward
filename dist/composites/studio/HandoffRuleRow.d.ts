import { ReactNode } from 'react';
export type HandoffRule = {
    when: string;
    then: string;
};
export declare function HandoffRules({ children, label }: {
    children: ReactNode;
    label?: string;
}): import("react").JSX.Element;
export declare function HandoffRuleRow({ rule }: {
    rule: HandoffRule;
}): import("react").JSX.Element;
