import { PlainList } from "../primitives/PlainList";
import { safeHref } from "../primitives/safeHref";
import s from "./LinkList.module.css";

export type LinkItem = { href: string; label: string; note?: string };

export type LinkListProps = { label: string; links: LinkItem[] };

// A labelled group of links, each with an optional note under it.
export function LinkList({ label, links }: LinkListProps) {
  return (
    <nav aria-label={label} className={s.nav}>
      <PlainList>
        {links.map((link) => (
          <li className={s.item} key={link.href}>
            <a className={`${s.link} ward-target`} href={safeHref(link.href)}>
              {link.label}
            </a>
            {link.note === undefined ? null : <span className={s.note}>{link.note}</span>}
          </li>
        ))}
      </PlainList>
    </nav>
  );
}
