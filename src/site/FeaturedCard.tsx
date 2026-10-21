import { CardHead, CardMedia, CardText, type CardProps } from "./ProjectCard";
import s from "./Card.module.css";

export type FeaturedCardProps = CardProps & { cta?: string };

// A wide work card with the media beside the text and a call-to-action line.
export function FeaturedCard({ media, ratio, eyebrow, summary, tags, cta, ...title }: FeaturedCardProps) {
  return (
    <article className={`${s.card} ${s.featured}`} data-ward-rowlink="">
      <CardMedia media={media} ratio={ratio} />
      <div className={s.body}>
        <CardHead eyebrow={eyebrow} {...title} />
        <CardText summary={summary} tags={tags} />
        {cta === undefined ? null : (
          <span className={s.cta} aria-hidden="true">
            {cta} →
          </span>
        )}
      </div>
    </article>
  );
}
