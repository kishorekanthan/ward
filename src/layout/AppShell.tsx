import { useId, type ReactNode } from "react";
import s from "./AppShell.module.css";

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
  /** Controls at the bar's trailing edge, kept visible when the identity chips collapse. */
  tools?: ReactNode;
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
        <a key={destination.id} href={destination.href} aria-current={destination.id === active ? "page" : undefined}>
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

function ShellHeader(props: Omit<TopBarShellProps, "children">) {
  return (
    <header className={s.topbar}>
      <span className={s.mark} data-ward-shell-mark="" aria-hidden="true" />
      <span className={s.brand}>{props.brand ?? "Trellis"}</span>
      <OptionalText value={props.tagline} className={s.tagline} />
      <Navigation destinations={props.destinations ?? []} active={props.active ?? ""} />
      <span className={s.identity}>
        <Identity actor={props.actor} metadata={props.metadata} />
      </span>
      <OptionalText value={props.tools} className={s.tools} />
    </header>
  );
}

function TopBarShell(props: TopBarShellProps) {
  const contentId = useId();
  return (
    <div className={`${s.root} ward-root`} data-ward-shell="">
      <a className={s.skip} href={`#${contentId}`}>
        Skip to content
      </a>
      <ShellHeader {...props} />
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
