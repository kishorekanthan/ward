import { useId, type ReactNode } from "react";
import { safeHref } from "../primitives/safeHref";
import { Eyebrow } from "./Eyebrow";
import { headingTag, type HeadingLevel } from "./heading";
import s from "./Section.module.css";

export type SectionSpace = "6" | "7" | "8" | "9";

type SectionLink = { href: string; label: string };

export type SectionProps = {
  title: ReactNode;
  children: ReactNode;
  id?: string;
  eyebrow?: string;
  link?: SectionLink;
  headingLevel?: HeadingLevel;
  space?: SectionSpace;
};

type HeadProps = { title: ReactNode; headingId: string; eyebrow?: string; link?: SectionLink; headingLevel: HeadingLevel };

function Head({ title, headingId, eyebrow, link, headingLevel }: HeadProps) {
  const H = headingTag(headingLevel);
  return (
    <div className={s.head}>
      <div className={s.titles}>
        {eyebrow === undefined ? null : <Eyebrow>{eyebrow}</Eyebrow>}
        <H className={s.title} id={headingId}>
          {title}
        </H>
      </div>
      {link === undefined ? null : (
        <a className={`${s.link} ward-target`} href={safeHref(link.href)}>
          {link.label}
        </a>
      )}
    </div>
  );
}

// A page section named by its heading (h2 by default), padded by a space token.
export function Section({ title, children, id, eyebrow, link, headingLevel = 2, space = "8" }: SectionProps) {
  const auto = useId();
  const headingId = `${id ?? auto}-title`;
  return (
    <section className={s.section} id={id} aria-labelledby={headingId} data-space={space}>
      <Head title={title} headingId={headingId} eyebrow={eyebrow} link={link} headingLevel={headingLevel} />
      {children}
    </section>
  );
}
