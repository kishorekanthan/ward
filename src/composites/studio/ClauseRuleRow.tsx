import { createContext, useContext, type ReactElement, type ReactNode } from "react";
import { Btn } from "../../primitives/Btn";
import { Chip } from "../../primitives/Chip";
import { Field, type FieldOption } from "../../primitives/Field";
import s from "./ClauseRuleRow.module.css";

// An orphan <li> is invalid HTML, so a row refuses to render outside ClauseRules.
const InClauseRules = createContext(false);

export type RuleClause = { key: string; label: string; value: string; options?: FieldOption[]; invalid?: string };

export type ClauseRule = { id: string; clauses: RuleClause[]; locked?: boolean; lockedReason?: string };

export type ClauseRuleRowProps = {
  rule: ClauseRule;
  onChange?: (key: string, value: string) => void;
  onRemove?: () => void;
};

export function ClauseRules({ children, label = "Rules" }: { children: ReactNode; label?: string }): ReactElement {
  return (
    <InClauseRules.Provider value={true}>
      <ol className={s.list} aria-label={label}>
        {children}
      </ol>
    </InClauseRules.Provider>
  );
}

function ClauseValue({ clause, ruleId, onChange }: { clause: RuleClause; ruleId: string; onChange?: ClauseRuleRowProps["onChange"] }): ReactElement {
  if (!onChange) return <span className={s.value}>{clause.value}</span>;
  const kind = clause.options ? "select" : "input";
  return (
    <Field kind={kind} labelHidden label={`${ruleId} ${clause.label}`} value={clause.value} options={clause.options} invalid={clause.invalid} onChange={(value) => onChange(clause.key, value)} />
  );
}

function LockMarker({ reason }: { reason?: string }): ReactElement {
  return (
    <span className={s.lock}>
      <Chip role="quiet" label="Locked" />
      {reason && <span className={s.reason}>{reason}</span>}
    </span>
  );
}

function RowHead({ rule, onRemove }: { rule: ClauseRule; onRemove?: () => void }): ReactElement {
  return (
    <span className={s.head}>
      <span className={s.id}>{rule.id}</span>
      {rule.locked && <LockMarker reason={rule.lockedReason} />}
      {onRemove && <span className={s.remove}><Btn variant="ghost" size="sm" onClick={onRemove}>Remove {rule.id}</Btn></span>}
    </span>
  );
}

// A locked row drops its handlers, so no control can render however it is called.
function unlessLocked<T>(rule: ClauseRule, handler: T | undefined): T | undefined {
  return rule.locked ? undefined : handler;
}

export function ClauseRuleRow({ rule, onChange, onRemove }: ClauseRuleRowProps): ReactElement {
  if (!useContext(InClauseRules)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const edit = unlessLocked(rule, onChange);
  return (
    <li className={s.row} data-locked={rule.locked ? "true" : undefined}>
      <RowHead rule={rule} onRemove={unlessLocked(rule, onRemove)} />
      <dl className={s.clauses}>
        {rule.clauses.map((clause) => (
          <div key={clause.key} className={s.clause}>
            <dt className={s.label}>{clause.label}</dt>
            <dd className={s.cell}><ClauseValue clause={clause} ruleId={rule.id} onChange={edit} /></dd>
          </div>
        ))}
      </dl>
    </li>
  );
}
