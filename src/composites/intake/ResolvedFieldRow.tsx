import type { ReactNode } from "react";
import { Chip } from "../../primitives/Chip";
import { Mark } from "../../primitives/Mark";
import s from "./ResolvedFieldRow.module.css";

export type ResolvedField = {
  key: string;
  value: ReactNode;
  evidence?: string;
  state: "resolved" | "confirm" | "unresolved";
};

export type ResolvedFieldRowProps = {
  field: ResolvedField;
};

// Mark mirrors the comp's `.ok`/`.no` glyph pair; Marker paints a solid decorative
// square, and this mark carries the state.
function StateMark({ state }: { state: ResolvedField["state"] }) {
  if (state === "confirm") return <Chip role="warn" label="CONFIRM" />;
  return <Mark state={state === "resolved" ? "met" : "unmet"} label={state === "resolved" ? "Resolved" : "Unresolved"} />;
}

export function ResolvedFieldRow({ field }: ResolvedFieldRowProps) {
  return (
    <li className={`${s.row} ward-resfield`} data-state={field.state}>
      <span className={`${s.key} ward-resfield-key`}>{field.key}</span>
      {/* No placeholder when evidence is absent: a stack just has one line instead of two. */}
      <span className={`${s.stack} ward-resfield-stack`}>
        <span className={`${s.value} ward-resfield-value`}>{field.value}</span>
        {field.evidence && (
          <span className={`${s.evidence} ward-resfield-evidence`} title={field.evidence}>
            {field.evidence}
          </span>
        )}
      </span>
      <span className={`${s.mark} ward-resfield-mark`}>
        <StateMark state={field.state} />
      </span>
    </li>
  );
}
