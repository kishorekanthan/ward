import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatStrip } from "./StatStrip";

const cells = [
  { value: "14", label: "In flight" },
  { value: "3.4 d", label: "Median cycle" },
];

describe("StatStrip", () => {
  it("refuses a strip outside two to four cells", () => {
    expect(() => render(<StatStrip cells={cells.slice(0, 1)} />)).toThrow(/takes two to four/);
  });

  it("refuses a second accent — one cell carries the argument", () => {
    expect(() => render(<StatStrip cells={[{ ...cells[0], accent: "amber" }, { ...cells[1], accent: "blue" }]} />)).toThrow(
      /only the cell carrying the argument/,
    );
  });

  it("pairs each value with its label as a description list", () => {
    render(<StatStrip cells={cells} />);
    expect(screen.getByText("3.4 d").tagName).toBe("DD");
    expect(screen.getByText("Median cycle").tagName).toBe("DT");
  });
});

describe("StatStrip divided", () => {
  it("marks itself divided only when asked", () => {
    const plain = render(<StatStrip cells={cells} />).container.querySelector("dl");
    expect(plain?.hasAttribute("data-divided")).toBe(false);
    const split = render(<StatStrip cells={cells} divided />).container.querySelector("dl");
    expect(split?.getAttribute("data-divided")).toBe("true");
  });

  it("keeps the description-list semantics and both guards", () => {
    render(<StatStrip cells={cells} divided />);
    expect(screen.getByText("3.4 d").tagName).toBe("DD");
    expect(() => render(<StatStrip cells={cells.slice(0, 1)} divided />)).toThrow(/takes two to four/);
  });
});
