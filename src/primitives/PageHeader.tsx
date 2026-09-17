import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";
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
  actions?: ReactNode[];
  connection?: { connection: LiveConnection; since: string };
  /** Replaces the built-in panel that lists collapsed actions. */
  onOverflow?: () => void;
  /** "record" is Board Item 8b's case head: 16px 20px 13px with a 19px title. */
  density?: "page" | "record";
};

function Heading({ title, consequence }: Pick<PageHeaderProps, "title" | "consequence">) {
  return (
    <div className={s.heading}>
      <h1 className={s.title}>{title}</h1>
      {consequence && <p className={s.consequence}>{consequence}</p>}
    </div>
  );
}

type Disclosure = { open: boolean; panelId: string; toggle: () => void };

function ActionList({ actions }: { actions: ReactNode[] }) {
  return actions.map((action, index) => <span key={index} className={s.action} data-action="">{action}</span>);
}

function ActionItems({ actions, collapsed, onOverflow, disclosure }: { actions: ReactNode[]; collapsed: boolean; onOverflow?: () => void; disclosure: Disclosure }) {
  if (!collapsed) return <ActionList actions={actions} />;
  if (onOverflow) return <Btn variant="overflow" onClick={onOverflow}>···</Btn>;
  return (
    <Btn variant="overflow" onClick={disclosure.toggle} expanded={disclosure.open} controls={disclosure.panelId}>
      ···
    </Btn>
  );
}

function OverflowPanel({ actions, disclosure, onEscape }: { actions: ReactNode[]; disclosure: Disclosure; onEscape: () => void }) {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") onEscape();
  };
  return (
    <div id={disclosure.panelId} className={s.overflowPanel} data-ward-overflow-panel="" hidden={!disclosure.open} onKeyDown={onKeyDown}>
      <ActionList actions={actions} />
    </div>
  );
}

// Open state only counts while collapsed, so widening the header closes the panel.
function useDisclosure(collapsed: boolean, actionsRef: RefObject<HTMLDivElement | null>) {
  const panelId = useId();
  const [requested, setRequested] = useState(false);
  const open = requested && collapsed;
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

function useActionOverflow(actions: ReactNode[]) {
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
  return { rowRef, headingRef, actionsRef, measureRef, collapsed };
}

function Connection({ connection }: Pick<PageHeaderProps, "connection">) {
  return connection ? <ConnectionMark connection={connection.connection} since={connection.since} /> : null;
}

export function PageHeader({ crumb, chips, title, consequence, actions = [], connection, onOverflow, density = "page" }: PageHeaderProps) {
  const { rowRef, headingRef, actionsRef, measureRef, collapsed } = useActionOverflow(actions);
  const { disclosure, close } = useDisclosure(collapsed, actionsRef);
  return (
    <header className={s.root} data-density={density}>
      <HeaderContext crumb={crumb} chips={chips} />
      <div className={s.row} ref={rowRef}>
        <div ref={headingRef} className={s.headingWrap}>
          <Heading title={title} consequence={consequence} />
        </div>
        <div className={s.actionsWrap}>
          <Connection connection={connection} />
          <div className={s.actions} ref={actionsRef} data-ward-actions>
            <ActionItems actions={actions} collapsed={collapsed} onOverflow={onOverflow} disclosure={disclosure} />
          </div>
        </div>
      </div>
      {collapsed && !onOverflow ? <OverflowPanel actions={actions} disclosure={disclosure} onEscape={close} /> : null}
      <div className={s.measure} ref={measureRef} aria-hidden="true">
        {actions.map((action, index) => <span key={index}>{action}</span>)}
      </div>
    </header>
  );
}
