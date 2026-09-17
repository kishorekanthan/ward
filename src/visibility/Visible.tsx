import { createContext, useContext, useMemo, type ReactNode } from "react";

const HiddenIds = createContext<ReadonlySet<string>>(new Set());

export interface VisibilityProviderProps {
  /** Component ids the viewer may not see; anything not listed renders. */
  hidden: readonly string[];
  children?: ReactNode;
}

export function VisibilityProvider({ hidden, children }: VisibilityProviderProps) {
  const ids = useMemo(() => new Set(hidden), [hidden]);
  return <HiddenIds.Provider value={ids}>{children}</HiddenIds.Provider>;
}

export function useVisible(id: string): boolean {
  return !useContext(HiddenIds).has(id);
}

export interface VisibleProps {
  id: string;
  children?: ReactNode;
  /** Rendered in place of the children when the id is hidden. */
  fallback?: ReactNode;
}

export function Visible({ id, children, fallback = null }: VisibleProps) {
  return <>{useVisible(id) ? children : fallback}</>;
}
