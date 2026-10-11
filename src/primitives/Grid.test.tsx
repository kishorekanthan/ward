import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ruleBody } from "../test-css";
import { Grid, type GridColumn } from "./Grid";

const GRID_CSS = "src/primitives/Grid.module.css";

type Row = { id: string; name: string };

const columns: GridColumn[] = [
  { key: "name", header: "Name" },
  { key: "note", header: "Note", dropPriority: 1 },
];

describe("Grid frame", () => {
  it("wraps the table in the frame that hosts its column-drop container queries", () => {
    render(
      <Grid<Row> label="Agents" columns={columns} rows={[{ id: "a", name: "Reviewer" }]} rowId={(r) => r.id} renderCell={(r) => r.name} empty="None" />,
    );
    const frame = screen.getByRole("table", { name: "Agents" }).parentElement as HTMLElement;
    expect(frame.tagName).toBe("DIV");
    expect(frame.className).toMatch(/frame/);
  });

  it("renders the empty sentence without a frame or table", () => {
    const { container } = render(<Grid<Row> label="Agents" columns={columns} rows={[]} rowId={(r) => r.id} renderCell={() => null} empty="No agents yet." />);
    expect(screen.queryByRole("table")).toBeNull();
    expect(container.textContent).toBe("No agents yet.");
  });

  it("labels every body cell with its column header when it stacks on a narrow screen", () => {
    render(
      <Grid<Row> label="Agents" columns={columns} rows={[{ id: "a", name: "Reviewer" }]} rowId={(r) => r.id} renderCell={(r) => r.name} empty="None" narrow="stack" />,
    );
    const cells = Array.from(screen.getByRole("table").querySelectorAll("tbody td"));
    expect(cells.map((cell) => cell.getAttribute("data-label"))).toEqual(["Name", "Note"]);
    expect(screen.getByRole("table").parentElement?.getAttribute("data-narrow")).toBe("stack");
  });

  it("leaves cells unlabelled when the grid does not stack", () => {
    render(<Grid<Row> label="Agents" columns={columns} rows={[{ id: "a", name: "Reviewer" }]} rowId={(r) => r.id} renderCell={(r) => r.name} empty="None" />);
    expect(screen.getByRole("table").querySelectorAll("[data-label]")).toHaveLength(0);
    expect(screen.getByRole("table").parentElement?.hasAttribute("data-narrow")).toBe(false);
  });

  it("stacks on the narrowest container step the column drops use, one card line per cell", () => {
    const steps = Array.from(readFileSync(GRID_CSS, "utf8").matchAll(/@container \(max-width: ([\d.]+)px\)/g), (m) => m[1]);
    // The stack is the last container rule and sits on the narrowest step the drops use.
    expect(Number(steps[steps.length - 1])).toBe(Math.min(...steps.slice(0, -1).map(Number)));
    const cell = ruleBody(GRID_CSS, '[data-narrow="stack"] .td');
    for (const declaration of ["display: grid", "white-space: normal", "text-align: left"]) expect(cell).toContain(declaration);
    expect(cell).toMatch(/grid-template-columns: minmax\(0, 2fr\) minmax\(0, 3fr\)/);
    expect(cell).toMatch(/column-gap: var\(--ward-space-3\)/);
    expect(ruleBody(GRID_CSS, '[data-narrow="stack"] .td::before')).toContain("content: attr(data-label)");
  });
});
