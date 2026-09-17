import type { CSSProperties, ReactNode } from "react";
import { count } from "../fmt/count";
import { stream, type StreamStep } from "../tokens";
import s from "./Sidebar.module.css";

export type SidebarDestination = { id: string; label: string; href: string; note?: string };
export type SidebarItem = SidebarDestination;

export type SidebarLink = {
  label: string;
  href: string;
};

export type SidebarNavItem = SidebarLink & {
  current?: boolean;
};

export type SidebarAgent = SidebarLink & {
  meta: string;
  streamStep: StreamStep;
  current?: boolean;
  paused?: boolean;
};

export type StudioSidebarProps = {
  brand: string;
  nav: SidebarNavItem[];
  agentsHeading: string;
  agents: SidebarAgent[];
  newAction?: SidebarLink;
  shared?: { heading: string; links: SidebarLink[] };
};

export type LinkSidebarProps = {
  destinations?: SidebarDestination[];
  items?: SidebarItem[];
  active?: string;
  brand?: string;
  label?: string;
  children?: ReactNode;
};

export type SidebarProps = StudioSidebarProps | LinkSidebarProps;

function Agent({ agent }: { agent: SidebarAgent }) {
  const paused = agent.paused === true;
  return (
    <li>
      <a
        className={s.agent}
        href={agent.href}
        aria-current={agent.current === true ? "page" : undefined}
        data-paused={paused ? "true" : undefined}
      >
        <span className={s.agentTop}>
          <span
            className={s.dot}
            data-paused={paused ? "true" : undefined}
            style={{ "--dot": stream(agent.streamStep).id } as CSSProperties}
          />
          <span className={s.agentName}>{agent.label}</span>
        </span>
        <span className={s.agentMeta}>{agent.meta}</span>
      </a>
    </li>
  );
}

function SharedLinks({ shared }: Pick<StudioSidebarProps, "shared">) {
  if (!shared) return null;
  return (
    <div className={s.foot}>
      <span className={s.footName}>{shared.heading}</span>
      <div className={s.footLinks}>
        {shared.links.map((link) => (
          <a key={link.href} className={s.footLink} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function StudioSidebar({ brand, nav, agentsHeading, agents, newAction, shared }: StudioSidebarProps) {
  if (!brand) throw new Error("Sidebar: brand is required");
  return (
    <nav className={s.sidebar} aria-label={brand}>
      <div className={s.brand}>
        <span className={s.mark} />
        <span className={s.word}>{brand}</span>
      </div>
      <div className={s.nav}>
        {nav.map((item) => (
          <a key={item.href} className={s.navItem} href={item.href} aria-current={item.current === true ? "page" : undefined}>
            {item.label}
          </a>
        ))}
      </div>
      <div className={s.group}>
        <span className={s.groupName}>
          {agentsHeading} · {count(agents.length)}
        </span>
        {newAction && (
          <a className={s.new} href={newAction.href}>
            {newAction.label}
          </a>
        )}
      </div>
      <ul className={s.agents}>
        {agents.map((agent) => (
          <Agent key={agent.href} agent={agent} />
        ))}
      </ul>
      <SharedLinks shared={shared} />
    </nav>
  );
}

function linksOf(props: LinkSidebarProps): SidebarDestination[] {
  return props.destinations ?? props.items ?? [];
}

function LinkBrand({ brand }: { brand?: string }) {
  return brand === undefined ? null : <div className={s.linkBrand}>{brand}</div>;
}

function LinkFooter({ children }: { children?: ReactNode }) {
  return children === undefined ? null : <div className={s.footer}>{children}</div>;
}

function DestinationLink({ link, active }: { link: SidebarDestination; active: boolean }) {
  return (
    <a href={link.href} aria-current={active ? "page" : undefined}>
      <span className={s.label}>{link.label}</span>
      {link.note === undefined ? null : <span className={s.note}>{link.note}</span>}
    </a>
  );
}

function LinkSidebar(props: LinkSidebarProps) {
  return (
    <aside className={`${s.root} ward-sidebar`} data-ward-sidebar>
      <LinkBrand brand={props.brand} />
      <nav aria-label={props.label ?? "Sidebar"}>
        {linksOf(props).map((link) => (
          <DestinationLink key={link.id} link={link} active={link.id === props.active} />
        ))}
      </nav>
      <LinkFooter>{props.children}</LinkFooter>
    </aside>
  );
}

function isStudio(props: SidebarProps): props is StudioSidebarProps {
  return "agents" in props;
}

// Studio's agent column when agents are given; otherwise a plain destination list.
export function Sidebar(props: SidebarProps) {
  return isStudio(props) ? <StudioSidebar {...props} /> : <LinkSidebar {...props} />;
}
