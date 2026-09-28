import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const SRC = dirname(fileURLToPath(import.meta.url));
// An em dash with a word on either side is prose; a lone "—" stands in for an empty value.
const PROSE_DASH = /[^\s—]\s*—\s*[^\s—]/;
const LONE_DASH = /(["'`])—\1/g;

function shippedSources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return shippedSources(path);
    return /\.tsx?$/.test(entry.name) && !/\.(test|stories)\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

// Comments and thrown errors speak to developers, so only the words a product shows are swept.
function productLines(path: string): string[] {
  return readFileSync(path, "utf8")
    .split("\n")
    .map((line, index) => [line.replace(LONE_DASH, '""'), index + 1] as const)
    .filter(([line]) => !/^\s*(\/\/|\*|\/\*)/.test(line) && !/Error\(/.test(line) && PROSE_DASH.test(line.replace(/\/\/.*$/, "")))
    .map(([line, number]) => `${relative(SRC, path)}:${number}: ${line.trim()}`);
}

describe("Ward's own copy", () => {
  it("joins no clauses with an em dash", () => {
    expect(shippedSources(SRC).flatMap(productLines)).toEqual([]);
  });
});
