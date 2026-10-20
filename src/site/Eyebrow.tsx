import { safeHref } from "../primitives/safeHref";
import s from "./Eyebrow.module.css";

export type EyebrowProps = {
  children: string;
  href?: string;
};

// The short line above a heading: a kind, a topic or a date.
export function Eyebrow({ children, href }: EyebrowProps) {
  return (
    <p className={s.eyebrow}>
      {href === undefined ? (
        children
      ) : (
        <a className={`${s.link} ward-target`} href={safeHref(href)}>
          {children}
        </a>
      )}
    </p>
  );
}
