import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FlowChain } from "./FlowChain";
import { declared, sheet } from "../test-site";

const MEDIA = "@media (prefers-reduced-motion: no-preference) {";

// The stylesheet split into the no-preference block and everything outside it.
function split(css: string): { inside: string; outside: string } {
  const start = css.indexOf(MEDIA);
  const end = css.indexOf("\n}\n", start);
  return { inside: css.slice(start + MEDIA.length, end), outside: css.slice(0, start) + css.slice(end + 3) };
}

describe("FlowChain (#315)", () => {
  it("renders an ol with one item per step, in order", () => {
    render(<FlowChain steps={["Source", "Batch", "Warehouse"]} label="Data flow" />);
    const list = screen.getByRole("list", { name: "Data flow" });
    expect(list.tagName).toBe("OL");
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["Source", "→Batch", "→Warehouse"]);
  });

  it("hides every arrow from assistive tech", () => {
    const { container } = render(<FlowChain steps={["A", "B", "C"]} />);
    const arrows = Array.from(container.querySelectorAll("li > span")).filter((el) => el.textContent === "→");
    expect(arrows).toHaveLength(2);
    for (const arrow of arrows) expect(arrow.getAttribute("aria-hidden")).toBe("true");
  });

  it("gives each step its index for the reveal", () => {
    const { container } = render(<FlowChain steps={["A", "B", "C"]} animate="ready" />);
    expect(container.querySelector("ol")?.getAttribute("data-ward-animate")).toBe("ready");
    const steps = Array.from(container.querySelectorAll("li"), (li) => li.style.getPropertyValue("--ward-step"));
    expect(steps).toEqual(["0", "1", "2"]);
  });

  it("wraps the chain", () => {
    expect(declared("FlowChain.module.css", ".chain", "flex-wrap")).toBe("wrap");
  });

  it("keeps every reveal rule inside no-preference and on the hook", () => {
    const { inside, outside } = split(sheet("FlowChain.module.css"));
    expect(inside).toContain("opacity: 0");
    expect(outside).not.toMatch(/opacity|transition|animation/);
    const selectors = Array.from(inside.matchAll(/([^{}]+)\{/g), (m) => m[1].trim());
    expect(selectors).toEqual(['.chain[data-ward-animate="ready"] .step', '.chain[data-ward-animate="run"] .step']);
  });
});
