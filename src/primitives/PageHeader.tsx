import { isValidElement, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import type { LiveConnection } from "../live/types";
import { Btn } from "./Btn";
import { Chip, type ChipProps } from "./Chip";
import { ConnectionMark } from "./ConnectionMark";
import { Crumb, type CrumbPath } from "./Crumb";
import s from "./PageHeader.module.css";

export type PageHeaderProps = {
  crumb: CrumbPath[];
  chips?: ChipProps[];
  title: string;
  consequence?: string;
  /** Tooltip saying what the consequence line counts. */
  consequenceHint?: string;
  actions?: ReactNode[];
  /** Secondary actions behind an always-present ··· button, before the actions. */
  more?: ReactNode[];
  connection?: { connection: LiveConnection; since: string };
  /** Replaces the built-in panel that lists collapsed actions. */
  onOverflow?: () => void;
  /** "record" is Board Item 8b's case head: 16px 20px 13px with a 19px title. */
  density?: "page" | "record";
};

function Heading({ title, consequence, consequenceHint }: Pick<PageHeaderProps, "title" | "consequence" | "consequenceHint">) {
  return (
    <div className={s.heading}>
      <h1 className={s.title}>{title}</h1>
      {consequence && <p className={s.consequence} title={consequenceHint}>{consequence}</p>}
    </div>
  );
}

type Disclosure = { open: boolean; panelId: string; toggle: () => void };

function ActionList({ actions }: { actions: ReactNode[] }) {
  return actions.map((action, index) => <span key={index} className={s.action} data-action="">{action}</span>);
}

function DisclosureToggle({ disclosure }: { disclosure: Disclosure }) {
  return (
    <Btn variant="overflow" onClick={disclosure.toggle} expanded={disclosure.open} controls={disclosure.panelId}>
      ···
    </Btn>
  );
}

type ActionItemsProps = { actions: ReactNode[]; hasMore: boolean; collapsed: boolean; onOverflow?: () => void; disclosure: Disclosure };

function ActionItems({ actions, hasMore, collapsed, onOverflow, disclosure }: ActionItemsProps) {
  if (!collapsed) return hasMore ? [<DisclosureToggle key="more" disclosure={disclosure} />, <ActionList key="actions" actions={actions} />] : <ActionList actions={actions} />;
  if (onOverflow) return <Btn variant="overflow" onClick={onOverflow}>···</Btn>;
  return <DisclosureToggle disclosure={disclosure} />;
}

// Collapsed, the panel lists everything the strip no longer shows; otherwise only the more items.
function panelItems(more: ReactNode[], actions: ReactNode[], collapsed: boolean, onOverflow?: () => void): ReactNode[] | null {
  if (collapsed) return onOverflow ? null : [...more, ...actions];
  return more.length > 0 ? more : null;
}

function OverflowPanel({ actions, disclosure, onEscape }: { actions: ReactNode[] | null; disclosure: Disclosure; onEscape: () => void }) {
  if (actions === null) return null;
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") onEscape();
  };
  return (
    <div id={disclosure.panelId} className={s.overflowPanel} data-ward-overflow-panel="" hidden={!disclosure.open} onKeyDown={onKeyDown}>
      <ActionList actions={actions} />
    </div>
  );
}

// Without more items, open state only counts while collapsed, so widening the header closes the panel.
function useDisclosure(togglable: boolean, actionsRef: RefObject<HTMLDivElement | null>) {
  const panelId = useId();
  const [requested, setRequested] = useState(false);
  const open = requested && togglable;
  const toggle = () => setRequested(!open);
  const close = () => {
    setRequested(false);
    actionsRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  };
  return { disclosure: { open, panelId, toggle }, close };
}

function HeaderContext({ crumb, chips }: Pick<PageHeaderProps, "crumb" | "chips">) {
  return (
    <div className={s.context}>
      <Crumb path={crumb} />
      {chips?.length ? <div className={s.chips}>{chips.map((chip) => <Chip key={chip.label} {...chip} />)}</div> : null}
    </div>
  );
}

function missingMeasure(...elements: Array<HTMLElement | null>): boolean {
  return elements.some((element) => element === null);
}

// "normal" or an unresolved gap parses to NaN, which would silently disable collapsing.
function columnGap(row: HTMLDivElement): number {
  return Number.parseFloat(getComputedStyle(row).columnGap) || 0;
}

function needsCollapse(row: HTMLDivElement, heading: HTMLDivElement | null, box: HTMLDivElement | null, measure: HTMLDivElement | null, actionCount: number): boolean {
  if (actionCount === 0 || missingMeasure(heading, box, measure)) return false;
  const [readyHeading, readyBox, readyMeasure] = [heading, box, measure] as [HTMLDivElement, HTMLDivElement, HTMLDivElement];
  const gap = columnGap(row);
  const available = Math.max(0, row.clientWidth - readyHeading.offsetWidth - gap);
  return readyMeasure.offsetWidth > available || readyBox.scrollWidth > readyBox.clientWidth + 1;
}

function canObserve(row: HTMLDivElement | null): row is HTMLDivElement {
  return row !== null && typeof ResizeObserver !== "undefined";
}

function isLink(action: ReactNode): boolean {
  return isValidElement<{ href?: unknown }>(action) && (action.type === "a" || typeof action.props.href === "string");
}

// A menu holding one link costs a tap and hides its name, so a lone link never folds.
function isLoneLink(actions: ReactNode[], more: ReactNode[]): boolean {
  return more.length === 0 && actions.length === 1 && isLink(actions[0]);
}

function useActionOverflow(actions: ReactNode[], keepShown: boolean) {
  const rowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const row = rowRef.current;
    if (!canObserve(row)) return;
    const fit = () => setCollapsed(needsCollapse(row, headingRef.current, actionsRef.current, measureRef.current, actions.length));
    const ro = new ResizeObserver(fit);
    ro.observe(row);
    fit();
    return () => ro.disconnect();
  }, [actions]);
  return { rowRef, headingRef, actionsRef, measureRef, collapsed: collapsed && !keepShown };
}

// Off-screen copy of the strip, ··· included, that decides whether the actions still fit.
function Measure({ actions, hasMore, measureRef }: { actions: ReactNode[]; hasMore: boolean; measureRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div className={s.measureClip}>
      <div className={s.measure} ref={measureRef} aria-hidden="true" data-ward-measure>
        {hasMore ? <span><Btn variant="overflow">···</Btn></span> : null}
        {actions.map((action, index) => <span key={index}>{action}</span>)}
      </div>
    </div>
  );
}

function Connection({ connection }: Pick<PageHeaderProps, "connection">) {
  return connection ? <ConnectionMark connection={connection.connection} since={connection.since} /> : null;
}

export function PageHeader({ crumb, chips, title, consequence, consequenceHint, actions = [], more = [], connection, onOverflow, density = "page" }: PageHeaderProps) {
  const { rowRef, headingRef, actionsRef, measureRef, collapsed } = useActionOverflow(actions, isLoneLink(actions, more));
  const hasMore = more.length > 0;
  const { disclosure, close } = useDisclosure(collapsed || hasMore, actionsRef);
  const panel = panelItems(more, actions, collapsed, onOverflow);
  return (
    <header className={s.root} data-density={density}>
      <HeaderContext crumb={crumb} chips={chips} />
      <div className={s.row} ref={rowRef}>
        <div ref={headingRef} className={s.headingWrap}>
          <Heading title={title} consequence={consequence} consequenceHint={consequenceHint} />
        </div>
        <div className={s.actionsWrap}>
          <Connection connection={connection} />
          <div className={s.actions} ref={actionsRef} data-ward-actions>
            <ActionItems actions={actions} hasMore={hasMore} collapsed={collapsed} onOverflow={onOverflow} disclosure={disclosure} />
          </div>
        </div>
      </div>
      <OverflowPanel actions={panel} disclosure={disclosure} onEscape={close} />
      <Measure actions={actions} hasMore={hasMore} measureRef={measureRef} />
    </header>
  );
}
