import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { headingTag, type HeadingLevel } from "./heading";
import s from "./PageIntro.module.css";

export type PageIntroProps = {
  title: ReactNode;
  eyebrow?: string;
  eyebrowHref?: string;
  lead?: ReactNode;
  headingLevel?: HeadingLevel;
  children?: ReactNode;
};

// The opening of a content page: an eyebrow, the title (h1 by default) and a lead.
export function PageIntro({ title, eyebrow, eyebrowHref, lead, headingLevel = 1, children }: PageIntroProps) {
  const H = headingTag(headingLevel);
  return (
    <header className={s.intro}>
      {eyebrow === undefined ? null : <Eyebrow href={eyebrowHref}>{eyebrow}</Eyebrow>}
      <H className={s.title}>{title}</H>
      {lead === undefined ? null : <p className={s.lead}>{lead}</p>}
      {children}
    </header>
  );
}
