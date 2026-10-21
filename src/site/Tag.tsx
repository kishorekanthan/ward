import { safeHref } from "../primitives/safeHref";
import s from "./Tag.module.css";

export type TagProps = {
  label: string;
  href?: string;
};

// A topic label; with an href it links to the topic's page.
export function Tag({ label, href }: TagProps) {
  if (href === undefined) return <span className={s.tag}>{label}</span>;
  return (
    <a className={`${s.tag} ${s.link}`} href={safeHref(href)}>
      {label}
    </a>
  );
}
