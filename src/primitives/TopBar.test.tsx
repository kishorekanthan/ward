import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { chooseOption, optionLabels } from "../test-setup";
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
    const select = screen.getByRole("button", { name: "Destination" });
    expect(select.textContent).toBe("Board");
    expect(optionLabels(select)).toEqual(["Board", "Studio"]);
  });

  it("navigates to the destination picked in the narrow select", () => {
    const onNavigate = vi.fn();
    render(<TopBar wordmark="TRELLIS" destinations={destinations} active="board" onNavigate={onNavigate} />);
    chooseOption(screen.getByRole("button", { name: "Destination" }), "Studio");
    expect(onNavigate).toHaveBeenCalledWith("studio");
  });

  it("does not give the nav and its narrow-width select the same name", () => {
    render(<TopBar wordmark="TRELLIS" destinations={destinations} active="board" />);
    expect(screen.getByRole("button", { name: "Destination" }).getAttribute("aria-label")).not.toBe("Primary");
  });
});
