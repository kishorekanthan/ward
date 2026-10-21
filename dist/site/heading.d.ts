export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingTag = `h${HeadingLevel}`;
export declare function headingTag(level: HeadingLevel): HeadingTag;
