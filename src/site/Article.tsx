import { useId, type ReactNode } from "react";
import { formatDate } from "./formatDate";
import { PageIntro } from "./PageIntro";
import { Prose } from "./Prose";
import { tocTree, type TocHeading, type TocNode } from "./toc";
import s from "./Article.module.css";

export type ArticleProps = {
  title: string;
  date: string;
  children: ReactNode;
  minutes?: number;
  tldr?: ReactNode;
  headings?: TocHeading[];
  eyebrow?: string;
  eyebrowHref?: string;
};

function Meta({ date, minutes }: { date: string; minutes?: number }) {
  return (
    <p className={s.meta}>
      <time dateTime={date}>{formatDate(date)}</time>
      {minutes === undefined ? null : ` · ${minutes} min read`}
    </p>
  );
}

function Tldr({ children }: { children: ReactNode }) {
  return (
    <div className={s.tldr} role="note" aria-label="TL;DR">
      <p className={s.tldrLabel}>TL;DR</p>
      <div className={s.tldrText}>{children}</div>
    </div>
  );
}

function TocList({ nodes }: { nodes: TocNode[] }) {
  return (
    <ol className={s.tocList} role="list">
      {nodes.map((node) => (
        <li key={node.id}>
          <a className={`${s.tocLink} ward-target`} href={`#${node.id}`}>
            {node.text}
          </a>
          {node.children.length === 0 ? null : <TocList nodes={node.children} />}
        </li>
      ))}
    </ol>
  );
}

// "On this page": the headings as nested links, or nothing when there are none.
function Toc({ headings }: { headings: TocHeading[] }) {
  const id = useId();
  if (headings.length === 0) return null;
  return (
    <nav className={s.toc} aria-labelledby={id}>
      <h2 className={s.tocTitle} id={id}>
        On this page
      </h2>
      <TocList nodes={tocTree(headings)} />
    </nav>
  );
}

// A long post: title, date and read time, an optional TL;DR, the section list, then the body.
export function Article({ title, date, children, minutes, tldr, headings = [], eyebrow, eyebrowHref }: ArticleProps) {
  return (
    <article className={s.article}>
      <PageIntro title={title} eyebrow={eyebrow} eyebrowHref={eyebrowHref}>
        <Meta date={date} minutes={minutes} />
      </PageIntro>
      {tldr === undefined ? null : <Tldr>{tldr}</Tldr>}
      <Toc headings={headings} />
      <Prose>{children}</Prose>
    </article>
  );
}
