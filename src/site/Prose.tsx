import type { ReactNode } from "react";
import { headingTag } from "./heading";
import { slug } from "./slug";
import s from "./Prose.module.css";

export type ProseProps = { children: ReactNode };

// Styles the long-form HTML inside it at a readable measure.
export function Prose({ children }: ProseProps) {
  return <div className={s.prose}>{children}</div>;
}

export type ProseHeadingProps = {
  level: 2 | 3 | 4;
  children: string;
  id?: string;
};

// A section heading with an id and a small link to itself.
export function ProseHeading({ level, children, id }: ProseHeadingProps) {
  const H = headingTag(level);
  const anchor = id ?? slug(children);
  return (
    <H id={anchor}>
      {children}{" "}
      <a className={`${s.anchor} ward-target`} href={`#${anchor}`} aria-label={`Link to section: ${children}`}>
        #
      </a>
    </H>
  );
}
