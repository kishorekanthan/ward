export type ContractCondition = {
    field: string;
    op: string;
    value: string;
};
export declare const RULE_ACTIONS: readonly ["advance", "block", "escalate", "requestReview"];
export type RuleAction = (typeof RULE_ACTIONS)[number];
export type Rule = {
    when: ContractCondition;
    then: RuleAction;
};
export type RuleRowPresentation = {
    cellLayout?: "two" | "four" | "contract";
    conditionText?: string;
};
export type RuleRowProps = {
    rule: Rule;
    onChange?: (next: Rule) => void;
    readOnly?: boolean;
    presentation?: RuleRowPresentation;
};
export declare function RuleRow(props: RuleRowProps): import("react").JSX.Element;
