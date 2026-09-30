import { render, screen, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { contrast } from "../../scripts/contrast.mjs";
import { BarChart } from "./BarChart";

const weeks = ["8 Sep", "15 Sep", "22 Sep"];
const two = [
  { name: "Payments", values: [4, 0, 8] },
  { name: "Ledger", values: [2, null, 6] },
];

function barOf(row: string, column: number): HTMLElement | null {
  const cells = within(screen.getByRole("row", { name: new RegExp(row) })).getAllByRole("cell");
  return cells[column].querySelector(".ward-barchart-bar");
}

describe("BarChart", () => {
  it("sizes each bar against the largest value in the chart", () => {
    render(<BarChart title="Done per week" categories={weeks} series={two} />);
    expect(barOf("8 Sep", 0)?.style.getPropertyValue("--share")).toBe("50%");
    expect(barOf("8 Sep", 1)?.style.getPropertyValue("--share")).toBe("25%");
    expect(barOf("22 Sep", 0)?.style.getPropertyValue("--share")).toBe("100%");
    expect(barOf("22 Sep", 1)?.style.getPropertyValue("--share")).toBe("75%");
  });

  it("draws no bar for zero or missing; zero shows its value, missing the empty mark", () => {
    render(<BarChart title="Done per week" categories={weeks} series={two} />);
    const row = within(screen.getByRole("row", { name: /15 Sep/ })).getAllByRole("cell");
    expect(row.map((cell) => cell.textContent)).toEqual(["0", "—"]);
    expect(barOf("15 Sep", 0)).toBeNull();
    expect(barOf("15 Sep", 1)).toBeNull();
  });

  it("reads as a captioned table with named rows and columns and every value as text", () => {
    render(<BarChart title="Hours by stage" categories={["build", "review"]} series={[{ name: "Hours", values: [1.5, 12] }]} format={(v) => `${v} h`} />);
    const table = screen.getByRole("table", { name: "Hours by stage" });
    expect(within(table).getAllByRole("columnheader").map((h) => h.textContent)).toEqual(["Category", "Hours"]);
    expect(within(table).getAllByRole("rowheader").map((h) => h.textContent)).toEqual(["build", "review"]);
    expect(within(table).getAllByRole("cell").map((c) => c.textContent)).toEqual(["1.5 h", "12 h"]);
  });

  it("gives two or more series a step each and one series none", () => {
    const { container, unmount } = render(<BarChart title="t" categories={weeks} series={two} />);
    expect([...container.querySelectorAll("th [data-step]")].map((el) => el.getAttribute("data-step"))).toEqual(["1", "2"]);
    unmount();
    const single = render(<BarChart title="t" categories={weeks} series={two.slice(0, 1)} />).container;
    expect(single.querySelector("[data-step]")).toBeNull();
    expect(single.querySelectorAll(".ward-barchart-bar")).toHaveLength(2);
  });

  it("says so in one line when there is nothing to draw", () => {
    render(<BarChart title="Done per week" categories={weeks} series={[{ name: "Done", values: [0, null, 0] }]} empty="No items finished yet." />);
    expect(screen.queryByRole("table")).toBeNull();
    expect(screen.getByText("No items finished yet.")).toBeTruthy();
  });

  it("refuses no series, more than six, and a series that does not match the categories", () => {
    const seven = Array.from({ length: 7 }, (_, i) => ({ name: `s${i}`, values: [1, 1, 1] }));
    expect(() => render(<BarChart title="t" categories={weeks} series={[]} />)).toThrow(/one to 6/);
    expect(() => render(<BarChart title="t" categories={weeks} series={seven} />)).toThrow(/one to 6/);
    expect(() => render(<BarChart title="t" categories={weeks} series={[{ name: "short", values: [1, 2] }]} />)).toThrow(/2 values for 3 categories/);
  });
});

describe("BarChart series colours", () => {
  const tokens = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "..", "tokens.json"), "utf8"));

  it.each(["color", "dark"])("each of six series reaches 3:1 on surface and surface2 in %s", (theme) => {
    const colours = tokens[theme];
    for (let step = 1; step <= 6; step += 1) {
      for (const ground of ["surface", "surface2"]) {
        expect(contrast(colours[`series${step}`], colours[ground])).toBeGreaterThanOrEqual(3);
      }
    }
  });
});
