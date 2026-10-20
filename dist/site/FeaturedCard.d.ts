import { CardProps } from './ProjectCard';
export type FeaturedCardProps = CardProps & {
    cta?: string;
};
export declare function FeaturedCard({ media, ratio, eyebrow, summary, tags, cta, ...title }: FeaturedCardProps): import("react").JSX.Element;
