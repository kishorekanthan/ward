export function contrast(a: string, b: string): number;
export type FloorPair = [fg: string, bg: string, label: string, need: number];
export function derivedDarkPairs(dark: Record<string, string>): FloorPair[];
export function belowFloor(pairs: FloorPair[]): string[];
export function contrastProblems(derived: string[], sweep: { broken: string[]; failures: unknown[] }): number;
