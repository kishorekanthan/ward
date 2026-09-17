import { useEffect, useRef, useState, type ReactNode } from "react";
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

function ActionItems({ actions, collapsed, onOverflow }: { actions: ReactNode[]; collapsed: boolean; onOverflow?: () => void }) {
  if (collapsed) return <Btn variant="overflow" onClick={onOverflow}>···</Btn>;
  return actions.map((action, index) => <span key={index} className={s.action} data-action="">{action}</span>);
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

function needsCollapse(row: HTMLDivElement, heading: HTMLDivElement | null, box: HTMLDivElement | null, measure: HTMLDivElement | null, actionCount: number): boolean {
  if (actionCount === 0 || missingMeasure(heading, box, measure)) return false;
  const [readyHeading, readyBox, readyMeasure] = [heading, box, measure] as [HTMLDivElement, HTMLDivElement, HTMLDivElement];
  const gap = Number.parseFloat(getComputedStyle(row).columnGap);
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
            <ActionItems actions={actions} collapsed={collapsed} onOverflow={onOverflow} />
          </div>
        </div>
      </div>
      <div className={s.measure} ref={measureRef} aria-hidden="true">
        {actions.map((action, index) => <span key={index}>{action}</span>)}
      </div>
    </header>
  );
}
