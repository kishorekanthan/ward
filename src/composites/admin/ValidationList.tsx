import { Mark, type MarkState } from "../../primitives/Mark";
import s from "./ValidationList.module.css";

export type ValidationCheck = {
  passed: boolean | null;
  text: string;
  measured?: string;
  runsWhen?: string;
};

export type ValidationListProps = {
  checks: ValidationCheck[];
};

// A pending check gets an empty box and a failed one a filled red mark: not-yet-run
// and ran-and-failed are different statements.
function markOf(passed: boolean | null): { state: MarkState; label: string } {
  if (passed === null) return { state: "unmet", label: "pending" };
  return passed ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}

function Check({ check }: { check: ValidationCheck }) {
  const mark = markOf(check.passed);
  return (
    <li className={`${s.check} ward-checklist-item`} data-pending={check.passed === null ? true : undefined}>
      <Mark state={mark.state} label={mark.label} />
      <span className={s.body}>
        <span className={s.text}>{check.text}</span>
        {check.passed === null && check.runsWhen && <span className={s.pending}>runs when {check.runsWhen}</span>}
      </span>
      {check.measured && <span className={s.measured}>{check.measured}</span>}
    </li>
  );
}

export function ValidationList({ checks }: ValidationListProps) {
  return (
    <ul className={`${s.list} ward-checklist`}>
      {checks.map((check) => (
        <Check key={check.text} check={check} />
      ))}
    </ul>
  );
}
