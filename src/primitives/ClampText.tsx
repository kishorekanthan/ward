import s from "./ClampText.module.css";

export type ClampTextProps = {
  text: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  className?: string;
};

// The whole text stays in the DOM, so assistive tech reads it all; the title shows it on hover once cut.
export function ClampText({ text, as: Tag = "span", className }: ClampTextProps) {
  return (
    <Tag className={className === undefined ? s.clamp : `${s.clamp} ${className}`} data-ward-clamp="" title={text}>
      {text}
    </Tag>
  );
}
