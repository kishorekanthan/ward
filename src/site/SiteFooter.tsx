import type { ReactNode } from "react";
import { safeHref } from "../primitives/safeHref";
import type { SiteLink } from "./SiteHeader";
import s from "./SiteFooter.module.css";

export type SiteFooterProps = {
  note: ReactNode;
  links?: SiteLink[];
  label?: string;
};

// A content site's footer: a note and an optional labelled nav.
export function SiteFooter({ note, links = [], label = "Footer" }: SiteFooterProps) {
  return (
    <footer className={s.footer}>
      <p className={s.note}>{note}</p>
      {links.length === 0 ? null : (
        <nav aria-label={label}>
          <ul className={s.list} role="list">
            {links.map((link) => (
              <li key={link.href}>
                <a className={`${s.link} ward-target`} href={safeHref(link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </footer>
  );
}
