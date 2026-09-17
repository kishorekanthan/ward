import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TopBar } from "./TopBar";

const destinations = [
  { id: "board", label: "Board", href: "/board" },
  { id: "studio", label: "Studio", href: "/studio" },
];

describe("TopBar", () => {
  it("never carries connection state", () => {
    const { container } = render(<TopBar wordmark="TRELLIS" destinations={destinations} active="board" />);
    expect(container.querySelector('[role="status"]')).toBeNull();
  });

  it("renders a single resolved destination as a nav row, not as chrome", () => {
    render(<TopBar wordmark="TRELLIS" destinations={destinations.slice(0, 1)} active="board" />);
    expect(screen.getByRole("navigation", { name: "Primary" })).not.toBeNull();
    expect(screen.getAllByRole("link", { name: "Board" })).toHaveLength(1);
  });

  it("marks the current destination for assistive tech", () => {
    render(<TopBar wordmark="TRELLIS" destinations={destinations} active="studio" />);
    const current = screen.getAllByRole("link").filter((l) => l.getAttribute("aria-current") === "page");
    expect(current.map((l) => l.textContent)).toEqual(["Studio"]);
  });

  it("puts the skip link before everything else", () => {
    const { container } = render(<TopBar wordmark="TRELLIS" destinations={destinations} active="board" />);
    expect((container.querySelector("header")?.firstElementChild as HTMLElement).textContent).toBe("Skip to content");
  });

  it("offers the same destinations to the narrow select", () => {
    render(<TopBar wordmark="TRELLIS" destinations={destinations} active="board" />);
    const options = screen.getAllByRole("option").map((o) => o.textContent);
    expect(options).toEqual(["Board", "Studio"]);
  });

  it("does not give the nav and its narrow-width select the same name", () => {
    render(<TopBar wordmark="TRELLIS" destinations={destinations} active="board" />);
    expect(screen.getByRole("combobox").getAttribute("aria-label")).not.toBe("Primary");
  });
});
