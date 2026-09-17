import { Chip } from "../../primitives/Chip";
import { Field } from "../../primitives/Field";
import s from "./RuleRow.module.css";

export type ContractCondition = { field: string; op: string; value: string };

export const RULE_ACTIONS = ["advance", "block", "escalate", "requestReview"] as const;
export type RuleAction = (typeof RULE_ACTIONS)[number];

export type Rule = { when: ContractCondition; then: RuleAction };

const LABEL: Record<RuleAction, string> = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review",
};

// contract: Studio 2a's boxed list row, which must sit inside an <ol> (rules evaluate top to bottom).
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

function conditionText(rule: Rule, presentation: RuleRowPresentation | undefined): string {
  return presentation?.conditionText ?? `${rule.when.field} ${rule.when.op} ${rule.when.value}`;
}

function actionField(rule: Rule, onChange: RuleRowProps["onChange"], readOnly: boolean | undefined, labelHidden?: boolean) {
  if (readOnly || !onChange) return <span className={s.action}>{LABEL[rule.then]}</span>;
  return (
    <Field
      kind="select"
      label="Then"
      labelHidden={labelHidden}
      value={rule.then}
      onChange={(next) => onChange({ ...rule, then: next as RuleAction })}
      options={RULE_ACTIONS.map((action) => ({ value: action, label: LABEL[action] }))}
    />
  );
}

function FourCellRow({ rule, onChange, readOnly, presentation }: RuleRowProps) {
  return (
    <tr className={s.row}>
      <td className={s.cell}><Chip role="system" label="WHEN" /></td>
      <td className={s.cell}><span className={s.condition} title={conditionText(rule, presentation)}>{conditionText(rule, presentation)}</span></td>
      <td className={s.cell}><Chip role="system" label="THEN" /></td>
      <td className={s.cell}>{actionField(rule, onChange, readOnly)}</td>
    </tr>
  );
}

function TwoCellRow({ rule, onChange, readOnly, presentation }: RuleRowProps) {
  return (
    <tr className={s.row}>
      <td className={s.cell}>
        <Chip role="system" label="WHEN" />
        <span className={s.condition}>{conditionText(rule, presentation)}</span>
      </td>
      <td className={s.cell}>{actionField(rule, onChange, readOnly)}</td>
    </tr>
  );
}

function ContractRow({ rule, onChange, readOnly, presentation }: RuleRowProps) {
  return (
    <li className={s.contract}>
      <Chip role="system" label="WHEN" />
      <span className={s.contractCondition}>{conditionText(rule, presentation)}</span>
      <Chip role="meta" label="THEN" />
      <span className={s.contractAction}>{actionField(rule, onChange, readOnly, true)}</span>
    </li>
  );
}

const LAYOUTS = { two: TwoCellRow, four: FourCellRow, contract: ContractRow };

export function RuleRow(props: RuleRowProps) {
  if (!RULE_ACTIONS.includes(props.rule.then)) throw new Error(`RuleRow: '${props.rule.then}' is not a contract action`);
  const Layout = LAYOUTS[props.presentation?.cellLayout ?? "two"];
  return <Layout {...props} />;
}
