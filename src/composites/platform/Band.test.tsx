import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Chip } from "../../primitives/Chip";
import { Band, type BandCell } from "./Band";

const cells: BandCell[] = [
  { title: "Claim → role resolution", body: "One read at login.", tag: <Chip role="done" label="T-022" /> },
  { title: "Enforcement map", body: "Endpoint → required role." },
  { title: "Act-as-user writes", body: "Comments go out on the human's token." },
  { title: "Access review export", body: "Nothing produces it.", tag: <Chip role="warn" label="GAP" /> },
];

const band = { index: "01", title: "Identity & access", note: "Trellis should never own accounts." };

describe("Band", () => {
  it("refuses any cell count other than the comp's four", () => {
    expect(() => render(<Band {...band} cells={cells.slice(0, 3)} />)).toThrow(/fixed 4-cell grid/);
    expect(() => render(<Band {...band} cells={[...cells, cells[0]]} />)).toThrow(/5 cells/);
  });

  it("names the region by ordinal and title, so the number is not read as a bare digit", () => {
    render(<Band {...band} cells={cells} />);
    expect(screen.getByRole("region", { name: "01 Identity & access" })).not.toBeNull();
  });

  it("keeps the zero-padded ordinal as written", () => {
    render(<Band {...band} cells={cells} />);
    expect(screen.getByText("01").textContent).toBe("01");
  });

  it("renders the head plus exactly four cells as siblings of the grid", () => {
    const { container } = render(<Band {...band} cells={cells} />);
    expect((container.firstElementChild as HTMLElement).children).toHaveLength(5);
  });

  it("omits the tag element entirely when a cell has no verdict", () => {
    render(<Band {...band} cells={cells} />);
    const untagged = screen.getByText("Enforcement map").parentElement as HTMLElement;
    expect(untagged.children).toHaveLength(2);
    const tagged = screen.getByText("Claim → role resolution").parentElement as HTMLElement;
    expect(tagged.children).toHaveLength(3);
    expect(screen.getByText("GAP")).not.toBeNull();
  });
});
