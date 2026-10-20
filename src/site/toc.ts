export type TocHeading = { id: string; text: string; level: number };
export type TocNode = TocHeading & { children: TocNode[] };

// Nests flat headings by level: each heading goes under the nearest earlier one with a lower level.
export function tocTree(headings: TocHeading[]): TocNode[] {
  const root: TocNode[] = [];
  const open: TocNode[] = [];
  for (const heading of headings) {
    const node: TocNode = { ...heading, children: [] };
    while (open.length > 0 && open[open.length - 1].level >= heading.level) open.pop();
    const parent = open[open.length - 1];
    (parent === undefined ? root : parent.children).push(node);
    open.push(node);
  }
  return root;
}
