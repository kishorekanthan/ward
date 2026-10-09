import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode, type RefObject } from "react";
import s from "./AppShell.module.css";
import { stream, type StreamStep } from "../tokens";
import { Btn } from "../primitives/Btn";
import { Overlay } from "../primitives/Overlay";
import { safeHref } from "../primitives/safeHref";
import { useRevealActive } from "../primitives/useRevealActive";
import { useEdgeFades } from "./useEdgeFades";
import { useMediaQuery } from "./useMediaQuery";
import { PanelIcon } from "./NavIcons";
import { useSidebarCollapse } from "./useSidebarCollapse";

export type AppShellDestination = {
  id: string;
  label: string;
  href: string;
  /** Marks the item in the collapsed sidebar, such as HomeIcon; the top bar ignores it. */
  icon?: ReactNode;
};

/** One item of the collapsed sidebar: its icon, else its stream's colour square, else its first letter. */
export type AppShellRailItem = AppShellDestination & { streamStep?: StreamStep; current?: boolean };

export type StudioShellProps = {
  /** The 236px left column; the consumer supplies its landmark. */
  sidebar: ReactNode;
  /** Sits at the top of the centre column, outside the page inset. */
  header?: ReactNode;
  children: ReactNode;
  /** The 316px right column; omitted or null draws no third track. */
  rail?: ReactNode;
  /** Below 792px the sidebar folds into a drawer: this labels its toggle and titles it, and names the collapsed rail. */
  sidebarLabel?: string;
  /** Given, a panel button at the top of the sidebar collapses it to a 60px rail of these items; each viewer's choice is kept. */
  iconRail?: AppShellRailItem[];
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

type SidebarDrawer = { narrow: boolean; open: boolean; drawerId: string; slotRef: RefObject<HTMLSpanElement | null>; toggle: () => void; close: () => void };

// Same width as the rail-stack reflow: below it three columns cannot coexist, so the sidebar leaves the grid.
function useSidebarDrawer(): SidebarDrawer {
  const narrow = useMediaQuery("(max-width: 791.98px)");
  const drawerId = useId();
  const slotRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  if (open && !narrow) setOpen(false);
  return { narrow, open, drawerId, slotRef, toggle: () => setOpen(!open), close: () => setOpen(false) };
}

function StudioHeader({ header, label, drawer }: { header: ReactNode; label: string; drawer: SidebarDrawer }) {
  if (!drawer.narrow) return header;
  return (
    <div className={s.headerRow}>
      <span ref={drawer.slotRef} className={s.sidebarToggle}>
        <Btn variant="ghost" size="sm" onClick={drawer.toggle} expanded={drawer.open} controls={drawer.drawerId}>
          {label}
        </Btn>
      </span>
      <div className={s.headerSlot}>{header}</div>
    </div>
  );
}

// Following a link in the drawer is a navigation, so the drawer gets out of the way.
function SidebarDrawerPanel({ sidebar, label, drawer }: { sidebar: ReactNode; label: string; drawer: SidebarDrawer }) {
  if (!drawer.open) return null;
  const closeOnLink = (event: MouseEvent) => {
    if ((event.target as Element).closest("a[href]")) drawer.close();
  };
  return (
    <Overlay kind="start" id={drawer.drawerId} title={label} flush onClose={drawer.close} returnFocusTo={drawer.slotRef.current?.querySelector("button")}>
      <div className={s.drawerSide} onClick={closeOnLink}>
        {sidebar}
      </div>
    </Overlay>
  );
}

type SidebarFold = { enabled: boolean; collapsed: boolean; toggle: () => void };

// The collapse is for the wide layout only: below 792px the drawer shows the whole sidebar.
function useSidebarFold(iconRail: AppShellRailItem[] | undefined, narrow: boolean): SidebarFold {
  const enabled = iconRail !== undefined && !narrow;
  const { collapsed, toggle } = useSidebarCollapse(enabled);
  return { enabled, collapsed: enabled && collapsed, toggle };
}

function FoldToggle({ fold }: { fold: SidebarFold }) {
  if (!fold.enabled) return null;
  return (
    <div className={s.sideTop}>
      <Btn variant="ghost" size="sm" onClick={fold.toggle} expanded={!fold.collapsed}>
        <PanelIcon />
        <span className="ward-visually-hidden">{fold.collapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
      </Btn>
    </div>
  );
}

function RailMark({ item }: { item: AppShellRailItem }) {
  if (item.icon !== undefined) return <span className={s.railIcon} aria-hidden="true">{item.icon}</span>;
  if (item.streamStep !== undefined) return <span className={s.railDot} aria-hidden="true" style={{ "--dot": stream(item.streamStep).id } as CSSProperties} />;
  return <span className={s.railLetter} aria-hidden="true">{item.label.charAt(0)}</span>;
}

// Ward has no tooltip primitive, so the title is the tooltip and the hidden label the accessible name.
function IconRail({ items, label }: { items: AppShellRailItem[]; label: string }) {
  return (
    <nav className={s.iconRail} aria-label={label}>
      {items.map((item) => (
        <a key={item.id} className={s.railItem} href={safeHref(item.href)} title={item.label} aria-current={item.current === true ? "page" : undefined}>
          <RailMark item={item} />
          <span className="ward-visually-hidden">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

// The sidebar stays mounted while collapsed, so its own state (open groups, a search) survives the round trip.
function SidePanel({ sidebar, label, iconRail, fold }: { sidebar: ReactNode; label: string; iconRail?: AppShellRailItem[]; fold: SidebarFold }) {
  return (
    <div className={s.side} data-ward-shell-side="">
      <FoldToggle fold={fold} />
      <div className={s.sideBody} hidden={fold.collapsed}>
        {sidebar}
      </div>
      {fold.collapsed && <IconRail items={iconRail ?? []} label={label} />}
    </div>
  );
}

function StudioShell({ sidebar, header, children, rail, sidebarLabel, iconRail }: StudioShellProps) {
  const hasRail = rail !== undefined && rail !== null;
  const drawer = useSidebarDrawer();
  const fold = useSidebarFold(iconRail, drawer.narrow);
  const label = sidebarLabel ?? "Menu";
  return (
    <div className={s.app} data-rail={String(hasRail)} data-collapsed={String(fold.collapsed)}>
      {!drawer.narrow && <SidePanel sidebar={sidebar} label={label} iconRail={iconRail} fold={fold} />}
      <main className={s.main}>
        <StudioHeader header={header} label={label} drawer={drawer} />
        <div className={s.page}>{children}</div>
      </main>
      {hasRail && <div className={s.rail}>{rail}</div>}
      <SidebarDrawerPanel sidebar={sidebar} label={label} drawer={drawer} />
    </div>
  );
}

// A phone hides its scrollbar, so the Tabs edge fades say more links wait off screen.
function Navigation({ destinations, active }: { destinations: AppShellDestination[]; active: string }) {
  const navRef = useRef<HTMLElement>(null);
  useEdgeFades(navRef, destinations.length);
  useRevealActive(navRef, destinations.findIndex((destination) => destination.id === active), "a");
  return (
    <nav ref={navRef} className={s.nav} aria-label="Primary">
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

function useToolsMenu(): ToolsMenu {
  const narrow = useMediaQuery("(max-width: 767.98px)");
  const panelId = useId();
  const slotRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
    slotRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
  };
  return { narrow, open, panelId, slotRef, toggle: () => setOpen(!open), close };
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
