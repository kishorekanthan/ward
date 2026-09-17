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
});
