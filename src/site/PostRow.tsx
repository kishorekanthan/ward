import type { ReactNode } from "react";
import { safeHref } from "../primitives/safeHref";
import { formatDate } from "./formatDate";
import { headingTag, type HeadingLevel } from "./heading";
import s from "./PostRow.module.css";

export type PostRowProps = {
  href: string;
  title: string;
  date: string;
  meta?: string;
  summary?: ReactNode;
  headingLevel?: HeadingLevel;
};

// One post in a list: the title link stretches over the row, with its date as a time element.
export function PostRow({ href, title, date, meta, summary, headingLevel = 3 }: PostRowProps) {
  const H = headingTag(headingLevel);
  return (
    <article className={s.row} data-ward-rowlink="">
      <H className={s.title}>
        <a className={s.link} href={safeHref(href)}>
          {title}
        </a>
      </H>
      <p className={s.meta}>
        <time dateTime={date}>{formatDate(date)}</time>
        {meta === undefined ? null : ` · ${meta}`}
      </p>
      {summary === undefined ? null : <p className={s.summary}>{summary}</p>}
    </article>
  );
}
