import s from "./Crumb.module.css";
import { Chip, type ChipProps } from "./Chip";

export type CrumbPath = { label: string; href?: string };

export type CrumbProps = { path: CrumbPath[]; chips?: ChipProps[] };

export function Crumb({ path, chips }: CrumbProps) {
  return (
    <div>
      <nav aria-label="Breadcrumb" className={s.nav}>
        <ol className={s.list}>
          {path.map((c, i) => (
            <li key={c.label} className={s.item}>
              {i < path.length - 1 ? (
                c.href ? (
                  <a className={s.link} href={c.href}>
                    {c.label}
                  </a>
                ) : (
                  c.label
                )
              ) : (
                <span className={s.current} aria-current="page">
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
