import s from "./Crumb.module.css";
import { Chip, type ChipProps } from "./Chip";
import { safeHref } from "./safeHref";

export type CrumbPath = { label: string; href?: string };

export type CrumbProps = { path: CrumbPath[]; chips?: ChipProps[] };

export function Crumb({ path, chips }: CrumbProps) {
  return (
    <div className={s.root}>
      <nav aria-label="Breadcrumb" className={s.nav}>
        <ol className={s.list}>
          {path.map((c, i) => (
            <li key={c.label} className={s.item}>
              {i > 0 ? (
                <span className={s.sep} aria-hidden="true">
                  ›
                </span>
              ) : null}
              {i < path.length - 1 ? (
                c.href ? (
                  <a className={`${s.link} ward-target`} href={safeHref(c.href)} title={c.label}>
                    {c.label}
                  </a>
                ) : (
                  <span title={c.label}>{c.label}</span>
                )
              ) : (
                <span className={s.current} aria-current="page" title={c.label}>
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
        {chips?.length ? (
          <span className={`${s.chips} ward-chiprow`}>
            {chips.map((chip) => (
              <Chip key={chip.label} {...chip} />
            ))}
          </span>
        ) : null}
      </nav>
    </div>
  );
}
