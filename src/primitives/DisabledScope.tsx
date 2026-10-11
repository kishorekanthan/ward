import { createContext, useContext, useId, type ReactNode } from "react";
import { joinIds } from "../a11y/joinIds";
import s from "./DisabledScope.module.css";

export type ScopeReason = { reason: string; reasonId: string };

const Scope = createContext<ScopeReason | null>(null);

export type DisabledScopeProps = { reason: string; children?: ReactNode };

// One reason disables every control inside: Ward controls name it, native ones follow the fieldset.
export function DisabledScope({ reason, children }: DisabledScopeProps) {
  const reasonId = useId();
  return (
    <fieldset disabled className={`${s.scope} ward-disabled-scope`}>
      <span id={reasonId} className="ward-visually-hidden">
        {reason}
      </span>
      <Scope.Provider value={{ reason, reasonId }}>{children}</Scope.Provider>
    </fieldset>
  );
}

// The enclosing scope's reason, or null outside any scope.
export function useDisabledScope(): ScopeReason | null {
  return useContext(Scope);
}

// Adds the scope's reason to a control's description once, so a Field's Select does not repeat it.
export function describedByScope(describedBy: string | undefined, scope: ScopeReason | null): string | undefined {
  if (!scope || (describedBy ?? "").split(" ").includes(scope.reasonId)) return describedBy;
  return joinIds(describedBy, scope.reasonId);
}
