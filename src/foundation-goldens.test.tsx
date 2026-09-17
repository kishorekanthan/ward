import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BoardScroller, PageFrame, SectionBand, SubjectRail } from "./index";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const expected = JSON.parse(readFileSync(join(root, "src", "goldens", "foundation.json"), "utf8"));
const actual = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));

describe("Ward foundation goldens", () => {
  it("matches the measurements captured from the six canonical Trellis references", () => {
    for (const [group, values] of Object.entries(expected) as [string, Record<string, unknown>][]) {
      expect(actual[group], group).toMatchObject(values);
    }
  });

  // The comp's faint greys fail 4.5:1 on surface; these darkened pairs are the reviewed replacements,
  // and consoleFaint is the separate ink the dark console panel needs in both themes.
  it("keeps the contrast-corrected faint inks rather than the comp's lighter greys", () => {
    expect([actual.color.faint, actual.dark.faint]).toEqual(["#616C7E", "#8491A3"]);
    expect([actual.color.consoleFaint, actual.dark.consoleFaint]).toEqual(["#8B97AB", "#8B97AB"]);
    expect(actual.color.faint).not.toBe(actual.color.consoleFaint);
  });

  it("renders the default layout spine and explicit rail override", () => {
    render(
      <PageFrame>
        <SectionBand label="Stage controls">Controls</SectionBand>
        <SubjectRail rail="Preview" railLabel="Preview">
          <BoardScroller>Board</BoardScroller>
        </SubjectRail>
        <SubjectRail width="dryrun" rail="Dry run" railLabel="Dry run">Studio</SubjectRail>
      </PageFrame>,
    );

    expect(screen.getByRole("main").getAttribute("data-inset")).toBe("page");
    expect(screen.getByRole("region", { name: "Workflow board" }).getAttribute("tabindex")).toBe("0");
    expect(screen.getByRole("complementary", { name: "Preview" }).parentElement?.dataset.wardSubjectRail).toBe("preview");
    expect(screen.getByRole("complementary", { name: "Dry run" }).parentElement?.dataset.wardSubjectRail).toBe("dryrun");
  });
});
