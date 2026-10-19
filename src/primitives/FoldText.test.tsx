import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FoldText } from "./FoldText";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "FoldText.module.css"), "utf8");
const TEXT = "Analysts need one clean customer table for reports.";

describe("FoldText", () => {
  it("folds to three lines by default, opens on Show more and folds again on Show less", () => {
    render(<FoldText><p>{TEXT}</p></FoldText>);
    const body = screen.getByText(TEXT).parentElement as HTMLElement;
    const toggle = screen.getByRole("button", { name: "Show more" });
    expect(body.getAttribute("data-lines")).toBe("3");
    expect(body.hasAttribute("data-open")).toBe(false);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(toggle.getAttribute("aria-controls")).toBe(body.id);
    fireEvent.click(toggle);
    expect(body.hasAttribute("data-open")).toBe(true);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Show less" }));
    expect(body.hasAttribute("data-open")).toBe(false);
  });

  it("keeps the whole text in the DOM while folded and takes another line count", () => {
    render(<FoldText lines={2}><p>{TEXT}</p></FoldText>);
    expect(screen.getByText(TEXT).parentElement?.getAttribute("data-lines")).toBe("2");
  });

  it("cuts the folded body to its line count and lifts the cut once open", () => {
    expect(css).toContain('.body[data-lines="3"] { max-height: 3lh; }');
    expect(css).toMatch(/\.body \{[^}]*overflow: hidden;/);
    expect(css).toMatch(/\.body\[data-open\] \{\s*max-height: none;/);
  });
});
