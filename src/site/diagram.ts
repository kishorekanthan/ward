export type DiagramNode = { id: string; label: string; col: number; row: number };
export type DiagramEdge = { from: string; to: string };
export type Box = { x: number; y: number; w: number; h: number };
export type Segment = { x1: number; y1: number; x2: number; y2: number };

export const CELL = { w: 184, h: 96 };
export const NODE = { w: 152, h: 48 };
export const PAD = 16;

const round = (n: number) => Math.round(n * 10) / 10;

// The node's box: its grid cell's top-left, plus the outer padding.
export function nodeBox(node: DiagramNode): Box {
  return { x: PAD + node.col * CELL.w, y: PAD + node.row * CELL.h, w: NODE.w, h: NODE.h };
}

// The SVG size that holds every node with the padding on all sides.
export function canvasSize(nodes: DiagramNode[]): { w: number; h: number } {
  const cols = Math.max(0, ...nodes.map((n) => n.col));
  const rows = Math.max(0, ...nodes.map((n) => n.row));
  return { w: 2 * PAD + cols * CELL.w + NODE.w, h: 2 * PAD + rows * CELL.h + NODE.h };
}

// How far along (dx, dy) from a box's centre the line leaves the box.
function exit(box: Box, dx: number, dy: number): number {
  return Math.min(box.w / 2 / Math.abs(dx), box.h / 2 / Math.abs(dy));
}

// The line between two boxes' centres, cut where it leaves each box.
export function edgeSegment(a: Box, b: Box): Segment {
  const ax = a.x + a.w / 2;
  const ay = a.y + a.h / 2;
  const dx = b.x + b.w / 2 - ax;
  const dy = b.y + b.h / 2 - ay;
  const start = exit(a, dx, dy);
  const end = 1 - exit(b, dx, dy);
  return { x1: round(ax + dx * start), y1: round(ay + dy * start), x2: round(ax + dx * end), y2: round(ay + dy * end) };
}
