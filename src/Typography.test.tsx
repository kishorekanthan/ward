import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import typography from "./Typography.stories";

describe("typography foundations", () => {
  it("shows each agreed scale step in both themes", () => {
    const { container } = render(typography.decorators[0](typography.component));
    for (const theme of ["light", "dark"]) {
      const copy = container.querySelector(`[data-theme="${theme}"]`)!;
      const rows = Array.from(copy.querySelectorAll("[data-scale-step]"));
      expect(rows.map((row) => Number(row.getAttribute("data-scale-step")))).toEqual([12, 13, 14, 15, 18, 22, 26]);
      for (const row of rows) {
        const specimen = row.querySelector<HTMLElement>("[data-specimen]")!;
        expect(specimen.style.fontSize).toBe(`${row.getAttribute("data-scale-step")}px`);
        expect(specimen.style.fontFamily).toBe("Figtree, system-ui, sans-serif");
      }
    }
  });
});
