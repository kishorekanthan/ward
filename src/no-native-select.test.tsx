import { render } from "@testing-library/react";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { StageListEditor } from "./composites/studio/StageListEditor";
import { BoardScroller } from "./layout/BoardScroller";
import { Field, type FieldVariant } from "./primitives/Field";
import { TopBar } from "./primitives/TopBar";
import { stubMatchMedia } from "./test-setup";

const SRC = dirname(fileURLToPath(import.meta.url));
const NATIVE_SELECT = /<select[\s>/]|createElement\(\s*["'`]select["'`]/;

function shippedSources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return shippedSources(path);
    return /\.tsx?$/.test(entry.name) && !/\.(test|stories)\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
];
const variants: FieldVariant[] = ["form", "inline", "tag", "tagGate"];
const lane = (id: string) => ({ id, label: id, count: 1, content: <p>{id}</p> });

const rendered: Array<[string, () => ReactElement]> = [
  ...variants.map((variant): [string, () => ReactElement] => [`Field ${variant}`, () => <Field kind="select" variant={variant} label="Pick" value="a" options={options} onChange={() => {}} />]),
  ["TopBar", () => <TopBar wordmark="TRELLIS" destinations={[{ id: "board", label: "Board", href: "/board" }, { id: "studio", label: "Studio", href: "/studio" }]} active="board" />],
  ["StageListEditor", () => <StageListEditor stages={[{ name: "triage", kind: "entry" }]} catalogue={["triage", "qa"]} onChange={() => {}} />],
  ["BoardScroller", () => <BoardScroller lanes={[lane("build"), lane("gate")]} />],
];

describe("no native select", () => {
  it("no shipped source writes a native select element", () => {
    const offenders = shippedSources(SRC).filter((path) => NATIVE_SELECT.test(readFileSync(path, "utf8")));
    expect(offenders.map((path) => relative(SRC, path))).toEqual([]);
  });

  it.each(rendered)("%s renders the Ward listbox trigger in place of a native select", (_name, ui) => {
    stubMatchMedia(true);
    const { container } = render(ui());
    expect(container.querySelector("select")).toBeNull();
    expect(container.querySelector('button[aria-haspopup="listbox"]')).not.toBeNull();
  });
});
