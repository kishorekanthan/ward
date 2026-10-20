import { ReactNode } from 'react';
import { FigureRatio } from './Figure';
import { HeadingLevel } from './heading';
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
export declare function CardMedia({ media, ratio }: Pick<CardProps, "media" | "ratio">): import("react").JSX.Element | null;
export declare function CardHead({ eyebrow, ...title }: Pick<CardProps, "eyebrow" | "href" | "title" | "headingLevel">): import("react").JSX.Element;
export declare function CardText({ summary, tags }: Pick<CardProps, "summary" | "tags">): import("react").JSX.Element;
export type ProjectCardProps = CardProps;
export declare function ProjectCard({ media, ratio, eyebrow, summary, tags, ...title }: ProjectCardProps): import("react").JSX.Element;
