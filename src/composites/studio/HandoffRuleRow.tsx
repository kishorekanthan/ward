import { createContext, useContext, type ReactNode } from "react";
import { Chip } from "../../primitives/Chip";
import s from "./HandoffRuleRow.module.css";

// An orphan <li> is invalid HTML, so a row refuses to render outside HandoffRules.
const InHandoffRules = createContext(false);

// Free text on both sides: the comp's actions name people and combine steps, which RuleRow's enum cannot express.
export type HandoffRule = { when: string; then: string };

// An <ol>, because the comp evaluates rules top to bottom and first match wins.
export function HandoffRules({ children, label = "Handoff rules" }: { children: ReactNode; label?: string }) {
  return (
    <InHandoffRules.Provider value={true}>
      <ol className={s.list} aria-label={label}>
        {children}
      </ol>
    </InHandoffRules.Provider>
  );
}

export function HandoffRuleRow({ rule }: { rule: HandoffRule }) {
  if (!useContext(InHandoffRules)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return (
    <li className={s.row}>
      <Chip role="system" label="WHEN" />
      <span className={s.condition}>{rule.when}</span>
      <Chip role="meta" label="THEN" />
      <span className={s.action}>{rule.then}</span>
    </li>
  );
}
