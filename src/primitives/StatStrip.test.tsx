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

describe("StatStrip links", () => {
  it("renders a cell with href as a link named by label and value", () => {
    render(<StatStrip cells={[{ ...cells[0], href: "#/board?stream=pay" }, cells[1]]} />);
    const link = screen.getByRole("link", { name: "In flight: 14" });
    expect(link.getAttribute("href")).toBe("#/board?stream=pay");
  });

  it("puts the visible label inside the one link, beside the value", () => {
    const { container } = render(<StatStrip cells={[{ ...cells[0], href: "#/board" }, { ...cells[1], href: "#/runs" }]} />);
    const linked = [...container.querySelectorAll("dl > div")];
    expect(linked.map((cell) => cell.querySelectorAll("a").length)).toEqual([1, 1]);
    const link = screen.getByRole("link", { name: "Median cycle: 3.4 d" });
    expect([...link.children].map((part) => part.textContent)).toEqual(["3.4 d", "Median cycle"]);
  });

  it("keeps a term for a linked cell, hidden from sight but not from assistive tech", () => {
    render(<StatStrip cells={[{ ...cells[0], href: "#/board" }, cells[1]]} />);
    const term = screen.getAllByRole("term").find((dt) => dt.textContent === "In flight");
    expect(term?.className).toBe("ward-visually-hidden");
    expect(term?.closest("div")?.querySelector("dd a")).not.toBeNull();
  });

  it("leaves a cell without href as plain text", () => {
    render(<StatStrip cells={cells} />);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("14").tagName).toBe("DD");
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

describe("StatStrip hints", () => {
  it("puts a cell's hint on its value as tooltip and description, leaving the value as is", () => {
    render(<StatStrip cells={[{ ...cells[0], hint: "Items running, held or blocked" }, cells[1]]} />);
    const value = screen.getByText("14");
    expect(value.tagName).toBe("DD");
    expect(value.getAttribute("title")).toBe("Items running, held or blocked");
    expect(screen.getByRole("definition", { description: "Items running, held or blocked" })).toBe(value);
    expect(value.textContent).toBe("14");
  });

  it("adds no title without a hint", () => {
    const { container } = render(<StatStrip cells={cells} />);
    expect(container.querySelector("[title]")).toBeNull();
  });
});
