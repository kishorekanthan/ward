export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingTag = `h${HeadingLevel}`;

// The element name for a heading level, so a component can sit at any depth in a page's outline.
export function headingTag(level: HeadingLevel): HeadingTag {
  return `h${level}`;
}
