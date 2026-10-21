import type { ReactNode } from "react";
import s from "./Figure.module.css";

export type FigureRatio = "16/9" | "4/3" | "3/2" | "2/1" | "1/1";

type Image = { src: string; alt: string; width: number; height: number; children?: never };
type Media = { children: ReactNode; src?: never; alt?: never; width?: never; height?: never };

export type FigureProps = (Image | Media) & {
  ratio?: FigureRatio;
  caption?: ReactNode;
};

function Content(props: FigureProps) {
  if (props.src === undefined) return <>{props.children}</>;
  return <img src={props.src} alt={props.alt} width={props.width} height={props.height} loading="lazy" decoding="async" />;
}

// An image or custom media, with a box that reserves its ratio so the page never jumps.
export function Figure(props: FigureProps) {
  return (
    <figure className={s.figure}>
      <div className={s.media} data-ratio={props.ratio}>
        <Content {...props} />
      </div>
      {props.caption === undefined ? null : <figcaption className={s.caption}>{props.caption}</figcaption>}
    </figure>
  );
}
