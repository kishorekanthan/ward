import s from "./Crumb.module.css";
import { Chip, type ChipProps } from "./Chip";
import { safeHref } from "./safeHref";

export type CrumbPath = { label: string; href?: string };

export type CrumbProps = {
  path: CrumbPath[];
  chips?: ChipProps[];
  /** false: the path stops at the page's parent, so its last step links back and no step is the current page. */
  current?: boolean;
};

function Step({ step, isCurrent }: { step: CrumbPath; isCurrent: boolean }) {
  if (isCurrent) {
    return (
      <span className={s.current} aria-current="page" title={step.label}>
        {step.label}
      </span>
    );
  }
  return step.href ? (
    <a className={`${s.link} ward-target`} href={safeHref(step.href)} title={step.label}>
      {step.label}
    </a>
  ) : (
    <span title={step.label}>{step.label}</span>
  );
}

export function Crumb({ path, chips, current = true }: CrumbProps) {
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
              <Step step={c} isCurrent={current && i === path.length - 1} />
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
