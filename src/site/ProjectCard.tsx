import type { ReactNode } from "react";
import { safeHref } from "../primitives/safeHref";
import { Eyebrow } from "./Eyebrow";
import { Figure, type FigureRatio } from "./Figure";
import { headingTag, type HeadingLevel } from "./heading";
import { Tag } from "./Tag";
import s from "./Card.module.css";

export type CardProps = {
  href: string;
  title: string;
  summary?: ReactNode;
  eyebrow?: string;
  tags?: string[];
  media?: ReactNode;
  ratio?: FigureRatio;
  headingLevel?: HeadingLevel;
};

export function CardMedia({ media, ratio = "16/9" }: Pick<CardProps, "media" | "ratio">) {
  if (media === undefined) return null;
  return (
    <div className={s.media}>
      <Figure ratio={ratio}>{media}</Figure>
    </div>
  );
}

// The title holds the card's one link; its overlay stretches it over the whole card.
function CardTitle({ href, title, headingLevel = 3 }: Pick<CardProps, "href" | "title" | "headingLevel">) {
  const H = headingTag(headingLevel);
  return (
    <H className={s.title}>
      <a className={s.link} href={safeHref(href)}>
        {title}
      </a>
    </H>
  );
}

// The eyebrow, then the title with the card's one link.
export function CardHead({ eyebrow, ...title }: Pick<CardProps, "eyebrow" | "href" | "title" | "headingLevel">) {
  return (
    <>
      {eyebrow === undefined ? null : <Eyebrow>{eyebrow}</Eyebrow>}
      <CardTitle {...title} />
    </>
  );
}

export function CardText({ summary, tags = [] }: Pick<CardProps, "summary" | "tags">) {
  return (
    <>
      {summary === undefined ? null : <p className={s.summary}>{summary}</p>}
      {tags.length === 0 ? null : (
        <span className={s.tags}>
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </span>
      )}
    </>
  );
}

export type ProjectCardProps = CardProps;

// A linked work card: the whole card opens the page, and the link's name is the title only.
export function ProjectCard({ media, ratio, eyebrow, summary, tags, ...title }: ProjectCardProps) {
  return (
    <article className={s.card} data-ward-rowlink="">
      <CardMedia media={media} ratio={ratio} />
      <div className={s.body}>
        <CardHead eyebrow={eyebrow} {...title} />
        <CardText summary={summary} tags={tags} />
      </div>
    </article>
  );
}
