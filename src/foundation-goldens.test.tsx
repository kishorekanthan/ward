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

  // TRELLIS-422 faint inks, darkened (light) or lightened (dark) to pass 4.5:1 on every neutral ground.
  // The dark console is darker than the page, so both panels reuse faint.
  it("keeps the contrast-corrected faint inks on the page and in both console panels", () => {
    expect([actual.color.faint, actual.dark.faint]).toEqual(["#63605A", "#A09D97"]);
    expect([actual.color.consoleFaint, actual.dark.consoleFaint]).toEqual(["#63605A", "#A09D97"]);
  });

  it("keeps a near-black console block in dark and a light panel in light", () => {
    expect([actual.dark.console, actual.color.console]).toEqual(["#121212", "#F1F1EF"]);
  });

  it("generates colHead and chip at 12px in Figtree, the type scale's floor (#215)", () => {
    const wardCss = readFileSync(join(root, "src", "ward.css"), "utf8");
    expect(wardCss).toContain("--ward-type-colHead: 600 12px/1 Figtree, system-ui, sans-serif;");
    expect(wardCss).toContain("--ward-type-chip: 500 12px/1 Figtree, system-ui, sans-serif;");
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
