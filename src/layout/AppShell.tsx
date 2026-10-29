import { createContext, useContext, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode, type RefObject } from "react";
import s from "./AppShell.module.css";
import { stream, type StreamStep } from "../tokens";
import { Btn } from "../primitives/Btn";
import { Overlay } from "../primitives/Overlay";
import { safeHref } from "../primitives/safeHref";
import { useRevealActive } from "../primitives/useRevealActive";
import { OverflowRow } from "./OverflowRow";
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
  /** The 236px left column; the consumer supplies its landmark. A function is told whether the column shows folded. */
  sidebar: ReactNode | ((folded: boolean) => ReactNode);
  /** Sits at the top of the centre column, outside the page inset. */
  header?: ReactNode;
  /** The app's primary action, drawn at the end of the phone header row; wider bands leave it to the sidebar. */
  action?: ReactNode;
  children: ReactNode;
  /** The 316px right column; omitted or null draws no third track. */
  rail?: ReactNode;
  /** Below 768px the sidebar folds into a drawer: this labels its toggle and titles it, and names the collapsed rail. */
  sidebarLabel?: string;
  /** The folded strip shows these items; without them a function sidebar draws its own strip. */
  iconRail?: AppShellRailItem[];
  /** Given, the consumer owns the fold: true narrows the track to the 60px strip, and Ward draws no panel button or rail. */
  collapsed?: boolean;
  /** The page fills the content panel edge to edge, with no padding, and scrolls both ways inside it (a board). */
  pageFill?: boolean;
  /** The consumer places SidebarFoldButton in its own sidebar row, so Ward draws no row for the fold button. */
  foldButtonInSidebar?: boolean;
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

type Band = "wide" | "medium" | "phone";

// Wide shows both panels, medium folds the sidebar to its strip, a phone puts it in a drawer.
function useBand(): Band {
  const phone = useMediaQuery("(max-width: 767.98px)");
  const medium = useMediaQuery("(max-width: 1023.98px)");
  if (phone) return "phone";
  return medium ? "medium" : "wide";
}

function useSidebarDrawer(band: Band): SidebarDrawer {
  const narrow = band === "phone";
  const drawerId = useId();
  const slotRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  if (open && !narrow) setOpen(false);
  return { narrow, open, drawerId, slotRef, toggle: () => setOpen(!open), close: () => setOpen(false) };
}

function StudioHeader({ header, action, label, drawer }: { header: ReactNode; action: ReactNode; label: string; drawer: SidebarDrawer }) {
  if (!drawer.narrow) return header;
  return (
    <div className={s.headerRow}>
      <span ref={drawer.slotRef} className={s.sidebarToggle}>
        <Btn variant="ghost" size="sm" onClick={drawer.toggle} expanded={drawer.open} controls={drawer.drawerId}>
          {label}
        </Btn>
      </span>
      <div className={s.headerSlot}>{header}</div>
      {isPresent(action) && <span className={s.headerAction}>{action}</span>}
    </div>
  );
}

// Any navigation closes the drawer, whether a link inside it or the history moving.
function useCloseOnNavigation(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return undefined;
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("popstate", close);
    };
  }, [open, close]);
}

function SidebarDrawerPanel({ sidebar, label, drawer }: { sidebar: StudioShellProps["sidebar"]; label: string; drawer: SidebarDrawer }) {
  useCloseOnNavigation(drawer.open, drawer.close);
  if (!drawer.open) return null;
  const closeOnLink = (event: MouseEvent) => {
    if ((event.target as Element).closest("a[href]")) drawer.close();
  };
  return (
    <Overlay kind="start" id={drawer.drawerId} title={label} flush onClose={drawer.close} returnFocusTo={drawer.slotRef.current?.querySelector("button")}>
      <div className={s.drawerSide} onClick={closeOnLink}>
        {drawSidebar(sidebar, false)}
      </div>
    </Overlay>
  );
}

// `enabled` draws Ward's panel button; `rail` shows the icon rail; `drawsStrip` lets the sidebar draw its own folded strip.
type SidebarFold = { enabled: boolean; collapsed: boolean; rail: boolean; drawsStrip: boolean; toggle: () => void };

// A phone has the drawer, so no fold. At medium width the strip shows first; opening it lasts the visit, not the stored choice.
function useMediumOpen(band: Band): { open: boolean; toggle: () => void } {
  const [open, setOpen] = useState(false);
  if (open && band !== "medium") setOpen(false);
  return { open, toggle: () => setOpen(!open) };
}

function useWardFold(band: Band, owned: boolean): { collapsed: boolean; toggle: () => void } {
  const stored = useSidebarCollapse(band === "wide" && !owned);
  const medium = useMediumOpen(band);
  if (band === "medium") return { collapsed: !medium.open, toggle: medium.toggle };
  return { collapsed: band === "wide" && stored.collapsed, toggle: stored.toggle };
}

function useSidebarFold(props: StudioShellProps, band: Band): SidebarFold {
  const ward = useWardFold(band, props.collapsed !== undefined);
  if (props.collapsed !== undefined) return consumerFold(props.collapsed, band);
  const collapsed = ward.collapsed;
  const rail = collapsed && props.iconRail !== undefined;
  return { enabled: band !== "phone", collapsed, rail, drawsStrip: !rail && typeof props.sidebar === "function", toggle: ward.toggle };
}

const drawsOwnStrip = (fold: SidebarFold): boolean => fold.collapsed && fold.drawsStrip;

function consumerFold(collapsed: boolean, band: Band): SidebarFold {
  const folded = band === "medium" || (collapsed && band === "wide");
  return { enabled: false, collapsed: folded, rail: false, drawsStrip: true, toggle: () => undefined };
}

const presence = (on: boolean): "" | undefined => (on ? "" : undefined);

function drawSidebar(sidebar: StudioShellProps["sidebar"], folded: boolean): ReactNode {
  return typeof sidebar === "function" ? sidebar(folded) : sidebar;
}

// The wrapper carries the name for the folded strip's tip.
function FoldButton({ fold }: { fold: SidebarFold }) {
  const name = fold.collapsed ? "Expand sidebar" : "Collapse sidebar";
  return (
    <span className={s.foldSlot} data-ward-tip={name}>
      <Btn variant="ghost" size="sm" onClick={fold.toggle} expanded={!fold.collapsed}>
        <PanelIcon />
        <span className="ward-visually-hidden">{name}</span>
      </Btn>
    </span>
  );
}

function FoldToggle({ fold, inSidebar }: { fold: SidebarFold; inSidebar: boolean }) {
  if (!fold.enabled || inSidebar) return null;
  return (
    <div className={s.sideTop}>
      <FoldButton fold={fold} />
    </div>
  );
}

const FoldContext = createContext<SidebarFold | null>(null);

/** The frame's fold button, for a row of the consumer's own sidebar; it renders nothing where the sidebar does not fold. */
export function SidebarFoldButton() {
  const fold = useContext(FoldContext);
  if (fold === null || !fold.enabled) return null;
  return <FoldButton fold={fold} />;
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
function SidePanel({ sidebar, label, iconRail, fold, inSidebar }: { sidebar: StudioShellProps["sidebar"]; label: string; iconRail?: AppShellRailItem[]; fold: SidebarFold; inSidebar: boolean }) {
  const bodyHidden = fold.collapsed && !fold.drawsStrip;
  return (
    <div className={s.side} data-ward-shell-side="">
      <FoldToggle fold={fold} inSidebar={inSidebar && !bodyHidden} />
      <div className={s.sideBody} hidden={bodyHidden}>
        {drawSidebar(sidebar, fold.collapsed)}
      </div>
      {fold.rail && <IconRail items={iconRail ?? []} label={label} />}
    </div>
  );
}

const isPresent = (node: ReactNode): boolean => node !== undefined && node !== null;

// Two rounded panels, the sidebar and the content panel; the header sits inside the content panel, above the page.
function StudioShell(props: StudioShellProps) {
  const { sidebar, header, action, children, rail, iconRail, pageFill } = props;
  const hasRail = isPresent(rail);
  const band = useBand();
  const drawer = useSidebarDrawer(band);
  const fold = useSidebarFold(props, band);
  const label = props.sidebarLabel ?? "Menu";
  return (
    <div className={s.app} data-rail={String(hasRail)} data-collapsed={String(fold.collapsed)} data-consumer-fold={presence(drawsOwnStrip(fold))} data-band={band}>
      {!drawer.narrow && (
        <FoldContext.Provider value={fold}>
          <SidePanel sidebar={sidebar} label={label} iconRail={iconRail} fold={fold} inSidebar={props.foldButtonInSidebar === true} />
        </FoldContext.Provider>
      )}
      <main className={s.main} data-ward-shell-content="">
        <StudioHeader header={header} action={action} label={label} drawer={drawer} />
        <div className={s.page} data-fill={presence(pageFill === true)}>{children}</div>
      </main>
      {hasRail && <div className={s.rail}>{rail}</div>}
      <SidebarDrawerPanel sidebar={sidebar} label={label} drawer={drawer} />
    </div>
  );
}

// A phone hides its scrollbar, so the Tabs edge fades say more links wait off screen.
function Navigation({ destinations, active }: { destinations: AppShellDestination[]; active: string }) {
  const navRef = useRef<HTMLElement>(null);
  useRevealActive(navRef, destinations.findIndex((destination) => destination.id === active), "a");
  return (
    <OverflowRow as="nav" rowRef={navRef} className={s.nav} label="Primary" count={destinations.length} focusable={false}>
      {destinations.map((destination) => (
        <a key={destination.id} href={safeHref(destination.href)} aria-current={destination.id === active ? "page" : undefined}>
          {destination.label}
        </a>
      ))}
    </OverflowRow>
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
