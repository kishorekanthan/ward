import { safeHref } from "../primitives/safeHref";
import s from "./SiteHeader.module.css";

export type SiteLink = { href: string; label: string };

export type SiteHeaderProps = {
  brand: string;
  links: SiteLink[];
  current?: string;
  homeHref?: string;
  mainId?: string;
  skipLabel?: string;
};

// A content site's header: skip link, site name, then a nav that wraps. Static HTML, no script.
export function SiteHeader({ brand, links, current, homeHref = "/", mainId = "main", skipLabel = "Skip to content" }: SiteHeaderProps) {
  return (
    <header className={s.header}>
      <a className={s.skip} href={`#${mainId}`}>
        {skipLabel}
      </a>
      <a className={`${s.brand} ward-target`} href={safeHref(homeHref)}>
        {brand}
      </a>
      <nav aria-label="Main" className={s.nav}>
        <ul className={s.list} role="list">
          {links.map((link) => (
            <li key={link.href}>
              <a className={`${s.link} ward-target`} href={safeHref(link.href)} aria-current={link.href === current ? "page" : undefined}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
