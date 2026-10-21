import type { ReactNode } from "react";
import { safeHref } from "../primitives/safeHref";
import { PageBody } from "./CaseStudy";
import type { Fact } from "./FactList";
import { Figure, type FigureRatio } from "./Figure";
import { PageIntro } from "./PageIntro";
import s from "./ProjectPage.module.css";

export type Screenshot = { src: string; alt: string; width: number; height: number; caption?: ReactNode };

export type SourceLink = { href: string; label: string };

export type ProjectPageProps = {
  title: string;
  summary: ReactNode;
  children: ReactNode;
  source: SourceLink;
  facts?: Fact[];
  screenshots?: Screenshot[];
  ratio?: FigureRatio;
  eyebrow?: string;
  eyebrowHref?: string;
};

type ShotsProps = { shots: Screenshot[]; ratio: FigureRatio };

// No screenshot renders nothing, one is a single figure, more are a list of figures.
function Screenshots({ shots, ratio }: ShotsProps) {
  if (shots.length === 0) return null;
  if (shots.length === 1) return <Figure {...shots[0]} ratio={ratio} />;
  return (
    <ul className={s.shots} role="list" aria-label="Screenshots">
      {shots.map((shot, i) => (
        <li key={i}>
          <Figure {...shot} ratio={ratio} />
        </li>
      ))}
    </ul>
  );
}

// A side project page: intro with its required source link, screenshots, then the body with any facts beside it.
export function ProjectPage(props: ProjectPageProps) {
  const { title, summary, children, source, facts = [], screenshots = [], ratio = "16/9" } = props;
  return (
    <article className={s.page}>
      <PageIntro title={title} lead={summary} eyebrow={props.eyebrow} eyebrowHref={props.eyebrowHref}>
        <a className={s.source} href={safeHref(source.href)}>
          {source.label}
        </a>
      </PageIntro>
      <Screenshots shots={screenshots} ratio={ratio} />
      <PageBody facts={facts} linksLabel="Links" asideLabel="Project facts">
        {children}
      </PageBody>
    </article>
  );
}
