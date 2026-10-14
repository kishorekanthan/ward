import { useRef } from "react";
import { Menu, MenuButton } from "./Menu";
import menuCss from "./Menu.module.css";
import { usePageStrip } from "./pageStrip";
import { tabClass, type TabLevel } from "./Tabs";
import { useShownTabs } from "./tabsFit";
import s from "./Tabs.module.css";

const MAX_TABS = 7;
const MORE = "More";
const LINKS = ":scope > a";

export type TabLink = { id: string; label: string; href: string; count?: number };

export type TabLinksProps = {
  links: TabLink[];
  active: string;
  label: string;
  level: TabLevel;
};

const labelOf = (link: TabLink) => (link.count === undefined ? link.label : `${link.label} · ${link.count}`);

// A link waiting in More stays mounted, unseen, so the strip can measure it.
const WAITING = { tabIndex: -1, "aria-hidden": true, "data-overflow": "" } as const;

function placeOf(shown: number[] | null, index: number): object {
  return !shown || shown.includes(index) ? {} : WAITING;
}

function StripLink({ link, current, place }: { link: TabLink; current: boolean; place: object }) {
  return (
    <a href={link.href} className={`${s.tab} ward-tab`} aria-current={current ? "page" : undefined} {...place}>
      {link.label}
      {link.count === undefined ? null : <> <span className={s.count}>{`· ${link.count}`}</span></>}
    </a>
  );
}

function MoreLinks({ links }: { links: TabLink[] }) {
  return (
    <MenuButton label={MORE} className={s.moreRoot} trigger={{ className: s.more }}>
      <Menu align="end" entries={links.map((link) => ({ label: labelOf(link), href: link.href }))} />
    </MenuButton>
  );
}

// The Tabs strip for moving between pages: each entry is a link, the current page is marked, and links that do not fit wait in More.
export function TabLinks({ links, active, label, level }: TabLinksProps) {
  if (links.length > MAX_TABS) throw new Error(`TabLinks: ${links.length} links exceeds the cap of ${MAX_TABS} — the set is fixed`);
  const stripRef = useRef<HTMLElement>(null);
  usePageStrip(stripRef, level);
  const current = Math.max(0, links.findIndex((link) => link.id === active));
  const shown = useShownTabs(stripRef, current, links.map(labelOf).join("\n"), LINKS);
  const waiting = shown ? links.filter((_, i) => !shown.includes(i)) : [];
  return (
    <nav ref={stripRef} className={`${tabClass(level)} ${s.fits}`} aria-label={label} data-level={level}>
      {links.map((link, i) => (
        <StripLink key={link.id} link={link} current={link.id === active} place={placeOf(shown, i)} />
      ))}
      <span aria-hidden="true" data-more-probe="" className={`${menuCss.trigger} ${s.more} ${s.probe}`}>
        {MORE}
      </span>
      {waiting.length > 0 && <MoreLinks links={waiting} />}
    </nav>
  );
}
