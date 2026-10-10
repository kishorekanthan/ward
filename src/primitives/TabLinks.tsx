import { useRef } from "react";
import { useEdgeFades } from "../layout/useEdgeFades";
import { tabClass } from "./Tabs";
import { useRevealActive } from "./useRevealActive";
import s from "./Tabs.module.css";

const MAX_TABS = 7;

export type TabLink = { id: string; label: string; href: string; count?: number };

export type TabLinksProps = {
  links: TabLink[];
  active: string;
  label: string;
  level?: 1 | 2;
};

// The Tabs strip for moving between pages: each entry is a link, and the current page is marked for assistive tech.
export function TabLinks({ links, active, label, level = 1 }: TabLinksProps) {
  if (links.length > MAX_TABS) throw new Error(`TabLinks: ${links.length} links exceeds the cap of ${MAX_TABS} — the set is fixed`);
  const stripRef = useRef<HTMLElement>(null);
  useEdgeFades(stripRef, links.length);
  useRevealActive(stripRef, links.findIndex((link) => link.id === active), "a");
  return (
    <nav ref={stripRef} className={tabClass(level)} aria-label={label} data-level={level}>
      {links.map((link) => (
        <a key={link.id} href={link.href} className={`${s.tab} ward-tab`} aria-current={link.id === active ? "page" : undefined}>
          {link.label}
          {link.count === undefined ? null : <> <span className={s.count}>{`· ${link.count}`}</span></>}
        </a>
      ))}
    </nav>
  );
}
