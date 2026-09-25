import { ReactElement, ReactNode } from 'react';
import { FieldOption } from '../../primitives/Field';
export type RuleClause = {
    key: string;
    label: string;
    value: string;
    options?: FieldOption[];
    invalid?: string;
};
export type ClauseRule = {
    id: string;
    clauses: RuleClause[];
    locked?: boolean;
    lockedReason?: string;
};
export type ClauseRuleRowProps = {
    rule: ClauseRule;
    onChange?: (key: string, value: string) => void;
    onRemove?: () => void;
};
export declare function ClauseRules({ children, label }: {
    children: ReactNode;
    label?: string;
}): ReactElement;
export declare function ClauseRuleRow({ rule, onChange, onRemove }: ClauseRuleRowProps): ReactElement;
