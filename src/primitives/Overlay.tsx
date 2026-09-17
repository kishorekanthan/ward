import { createContext, useCallback, useContext, useEffect, useId, useRef, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../a11y/useFocusTrap";
import { useMediaQuery } from "../layout/useMediaQuery";
import s from "./Overlay.module.css";

export type OverlayKind = "drawer" | "sheet" | "modal";

// Portal target for callers that do not render the Overlay themselves; null means document.body.
export const OverlayContainerContext = createContext<HTMLElement | null>(null);

export type OverlayProps = {
  kind: OverlayKind;
  labelledBy?: string;
  label?: string;
  title?: string;
  onClose: () => void;
  closeLabel?: string;
  returnFocusTo?: HTMLElement | null;
  wide?: boolean;
  flush?: boolean;
  container?: HTMLElement | null;
  children: ReactNode;
};

type StackEntry = {
  root: HTMLElement;
  claims: HTMLElement[];
};

type InertClaim = {
  owners: Set<StackEntry>;
  wasInert: boolean;
};

const overlayStack: StackEntry[] = [];
const inertClaims = new Map<HTMLElement, InertClaim>();

function isOverlayRoot(element: HTMLElement): boolean {
  return element.hasAttribute("data-ward-overlay-root");
}

function claimInert(entry: StackEntry, element: HTMLElement): void {
  let claim = inertClaims.get(element);
  if (!claim) {
    claim = { owners: new Set(), wasInert: element.hasAttribute("inert") };
    inertClaims.set(element, claim);
  }
  if (claim.owners.has(entry)) return;
  claim.owners.add(entry);
  entry.claims.push(element);
  element.setAttribute("inert", "");
}

// Scoped to the portal target's children: inerting body's children would inert a nested target's own ancestor.
function claimBackground(entry: StackEntry, target: HTMLElement): void {
  for (const child of Array.from(target.children) as HTMLElement[]) {
    if (!isOverlayRoot(child)) claimInert(entry, child);
  }
}

function releaseInert(entry: StackEntry): void {
  for (const element of entry.claims) {
    const claim = inertClaims.get(element);
    if (!claim) continue;
    claim.owners.delete(entry);
    if (claim.owners.size > 0) continue;
    if (!claim.wasInert) element.removeAttribute("inert");
    inertClaims.delete(element);
  }
}

function registerOverlay(root: HTMLElement, target: HTMLElement): StackEntry {
  const entry = { root, claims: [] };
  overlayStack.push(entry);
  claimBackground(entry, target);
  return entry;
}

function unregisterOverlay(entry: StackEntry): void {
  const index = overlayStack.indexOf(entry);
  if (index >= 0) overlayStack.splice(index, 1);
  releaseInert(entry);
}

function isTopmost(entry: StackEntry | null): boolean {
  return entry !== null && overlayStack.at(-1) === entry;
}

function useOverlayStack(rootRef: RefObject<HTMLDivElement | null>, target: HTMLElement, returnFocusTo: HTMLElement | null | undefined) {
  const entryRef = useRef<StackEntry | null>(null);
  const returnRef = useRef(returnFocusTo);
  returnRef.current = returnFocusTo;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fallback = document.activeElement as HTMLElement | null;
    const entry = registerOverlay(root, target);
    entryRef.current = entry;
    return () => {
      const shouldRestore = isTopmost(entry);
      unregisterOverlay(entry);
      entryRef.current = null;
      if (shouldRestore) (returnRef.current ?? fallback)?.focus?.();
    };
  }, [target]);

  return useCallback(() => isTopmost(entryRef.current), []);
}

function renderedKind(kind: OverlayKind, wideEnough: boolean): OverlayKind {
  return kind === "modal" && !wideEnough ? "sheet" : kind;
}

function dialogName(props: OverlayProps, titleId: string) {
  if (props.title !== undefined) return { labelledBy: titleId, label: undefined };
  if (props.labelledBy !== undefined) return { labelledBy: props.labelledBy, label: undefined };
  return { labelledBy: undefined, label: props.label ?? "Dialog" };
}

function OverlayBody({ props, titleId }: { props: OverlayProps; titleId: string }) {
  if (props.title === undefined)
    return <div className={`${s.body} ward-drawer-body`} data-untitled="" data-flush={props.flush || undefined}>{props.children}</div>;
  return (
    <>
      <header className={`${s.header} ward-drawer-head`}><h2 className={`${s.title} ward-drawer-title ward-truncate`} id={titleId}>{props.title}</h2></header>
      <div className={`${s.body} ward-drawer-body`}>{props.children}</div>
    </>
  );
}

function scrimClass(kind: OverlayKind): string {
  return `${s.scrim} ${s[kind]} ward-overlay-scrim ward-overlay-scrim--${kind}`;
}

function panelClass(kind: OverlayKind, wide?: boolean): string {
  const legacyKind = kind === "drawer" ? "" : ` ward-overlay-panel--${kind}`;
  const legacyWide = wide ? " ward-overlay-panel--wide" : "";
  return `${s.panel} ${s[kind]} ward-overlay-panel${legacyKind}${legacyWide}`;
}

function usePortalTarget(container?: HTMLElement | null): HTMLElement {
  const fromContext = useContext(OverlayContainerContext);
  return container ?? fromContext ?? document.body;
}

export function Overlay(props: OverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const target = usePortalTarget(props.container);
  const wideEnough = useMediaQuery("(min-width: 768px)");
  const actualKind = renderedKind(props.kind, wideEnough);
  const name = dialogName(props, titleId);
  const trap = useFocusTrap(panelRef);
  const topmost = useOverlayStack(rootRef, target, props.returnFocusTo);
  const requestClose = useCallback(() => {
    if (topmost()) props.onClose();
  }, [props.onClose, topmost]);

  useEffect(() => {
    if (topmost()) panelRef.current?.querySelector<HTMLElement>("button")?.focus();
  }, [topmost]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [requestClose]);

  return createPortal(
    <div
      ref={rootRef}
      className={scrimClass(actualKind)}
      data-ward-overlay-kind={actualKind}
      data-ward-overlay-root=""
      onClick={requestClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={name.labelledBy}
        aria-label={name.label}
        className={panelClass(actualKind, props.wide)}
        data-wide={props.wide || undefined}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(event) => topmost() && trap.onKeyDown(event)}
      >
        <button type="button" className={`${s.close} ward-btn ward-btn--sm ward-btn--ghost`} aria-label={props.closeLabel ?? "Close"} onClick={requestClose}>
          {props.closeLabel ?? "✕"}
        </button>
        <OverlayBody props={props} titleId={titleId} />
      </div>
    </div>,
    target,
  );
}
