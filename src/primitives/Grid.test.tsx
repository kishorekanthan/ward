import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Grid, type GridColumn } from "./Grid";

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
});
