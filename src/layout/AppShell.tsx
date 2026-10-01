import { useId, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import s from "./AppShell.module.css";
import { Btn } from "../primitives/Btn";
import { safeHref } from "../primitives/safeHref";
import { useMediaQuery } from "./useMediaQuery";

export type AppShellDestination = {
  id: string;
  label: string;
  href: string;
};

export type StudioShellProps = {
  /** The 236px left column; the consumer supplies its landmark. */
  sidebar: ReactNode;
  /** Sits at the top of the centre column, outside the page inset. */
  header?: ReactNode;
  children: ReactNode;
  /** The 316px right column; omitted or null draws no third track. */
  rail?: ReactNode;
};

export type TopBarShellProps = {
  destinations?: AppShellDestination[];
  active?: string;
  children: ReactNode;
  actor?: string;
  brand?: string;
  tagline?: string;
  metadata?: ReactNode;
  /** Controls at the bar's trailing edge; below 768px they sit behind one toggle. */
  tools?: ReactNode;
  /** The toggle's visible label below 768px. */
  toolsLabel?: string;
};

export type AppShellProps = StudioShellProps | TopBarShellProps;

function StudioShell({ sidebar, header, children, rail }: StudioShellProps) {
  const hasRail = rail !== undefined && rail !== null;
  return (
    <div className={s.app} data-rail={hasRail ? "true" : "false"}>
      <div className={s.side}>{sidebar}</div>
      <main className={s.main}>
        {header}
        <div className={s.page}>{children}</div>
      </main>
      {hasRail && <div className={s.rail}>{rail}</div>}
    </div>
  );
}

function Navigation({ destinations, active }: { destinations: AppShellDestination[]; active: string }) {
  return (
    <nav className={s.nav} aria-label="Primary">
      {destinations.map((destination) => (
        <a key={destination.id} href={safeHref(destination.href)} aria-current={destination.id === active ? "page" : undefined}>
          {destination.label}
        </a>
      ))}
    </nav>
  );
}

function OptionalText({ value, className }: { value?: ReactNode; className: string }) {
  return value === undefined ? null : <span className={className}>{value}</span>;
}

function Identity({ actor, metadata }: Pick<TopBarShellProps, "actor" | "metadata">) {
  if (actor === undefined && metadata === undefined) return null;
  return (
    <span className={s.metadata}>
      <OptionalText value={actor} className={s.actor} />
      {actor !== undefined && metadata !== undefined ? <span aria-hidden="true"> · </span> : null}
      <OptionalText value={metadata} className={s.detail} />
    </span>
  );
}

type ToolsMenu = { narrow: boolean; open: boolean; panelId: string; slotRef: RefObject<HTMLSpanElement | null>; toggle: () => void; close: () => void };

// Open only counts while narrow, so widening the bar puts the tools back inline.
function useToolsMenu(): ToolsMenu {
  const narrow = useMediaQuery("(max-width: 767.98px)");
  const panelId = useId();
  const slotRef = useRef<HTMLSpanElement>(null);
  const [requested, setRequested] = useState(false);
  const open = requested && narrow;
  const close = () => {
    setRequested(false);
    slotRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  };
  return { narrow, open, panelId, slotRef, toggle: () => setRequested(!open), close };
}

function ToolsSlot({ tools, toolsLabel, menu }: Pick<TopBarShellProps, "tools" | "toolsLabel"> & { menu: ToolsMenu }) {
  if (tools === undefined) return null;
  if (!menu.narrow) return <span className={s.tools}>{tools}</span>;
  return (
    <span ref={menu.slotRef} className={s.tools}>
      <Btn variant="ghost" size="sm" onClick={menu.toggle} expanded={menu.open} controls={menu.panelId}>
        {toolsLabel ?? "Settings"}
      </Btn>
    </span>
  );
}

function ToolsPanel({ tools, menu }: Pick<TopBarShellProps, "tools"> & { menu: ToolsMenu }) {
  if (tools === undefined || !menu.narrow) return null;
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") menu.close();
  };
  return (
    <div id={menu.panelId} className={s.toolsPanel} hidden={!menu.open} onKeyDown={onKeyDown}>
      {tools}
    </div>
  );
}

function ShellHeader(props: Omit<TopBarShellProps, "children"> & { menu: ToolsMenu }) {
  return (
    <header className={s.topbar}>
      <span className={s.mark} data-ward-shell-mark="" aria-hidden="true" />
      <span className={s.brand}>{props.brand ?? "Trellis"}</span>
      <OptionalText value={props.tagline} className={s.tagline} />
      <Navigation destinations={props.destinations ?? []} active={props.active ?? ""} />
      <span className={s.identity}>
        <Identity actor={props.actor} metadata={props.metadata} />
      </span>
      <ToolsSlot tools={props.tools} toolsLabel={props.toolsLabel} menu={props.menu} />
    </header>
  );
}

function TopBarShell(props: TopBarShellProps) {
  const contentId = useId();
  const menu = useToolsMenu();
  return (
    <div className={`${s.root} ward-root`} data-ward-shell="">
      <a className={s.skip} href={`#${contentId}`}>
        Skip to content
      </a>
      <ShellHeader {...props} menu={menu} />
      <ToolsPanel tools={props.tools} menu={menu} />
      <div id={contentId} className={s.content}>
        {props.children}
      </div>
    </div>
  );
}

function isStudio(props: AppShellProps): props is StudioShellProps {
  return "sidebar" in props && props.sidebar !== undefined;
}

// Studio's three-track grid when a sidebar is given; otherwise the app's top-bar shell.
export function AppShell(props: AppShellProps) {
  return isStudio(props) ? <StudioShell {...props} /> : <TopBarShell {...props} />;
}
