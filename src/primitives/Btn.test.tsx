import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Btn } from "./Btn";

describe("Btn", () => {
  it("refuses a disabled action that does not state its condition", () => {
    // @ts-expect-error describedBy is type-required when disabled; this proves the runtime guard too
    expect(() => render(<Btn disabled>Publish</Btn>)).toThrow(/must name its reason/);
  });

  it("points a disabled action at its reason and keeps its label", () => {
    render(
      <>
        <Btn disabled describedBy="why">Publish</Btn>
        <p id="why">dry run in progress</p>
      </>,
    );
    const btn = screen.getByRole("button", { name: "Publish" });
    expect((btn as HTMLButtonElement).disabled).toBe(true);
    expect(btn.getAttribute("aria-describedby")).toBe("why");
    expect(btn.textContent).toBe("Publish");
  });

  it("states its own disabled reason as a description and a tooltip", () => {
    render(<Btn disabled disabledReason="A dry run has to pass first">Publish</Btn>);
    const btn = screen.getByRole("button", { name: "Publish" });
    const reason = document.getElementById(btn.getAttribute("aria-describedby") ?? "");
    expect(reason?.textContent).toBe("A dry run has to pass first");
    expect(reason?.className).toBe("ward-visually-hidden");
    expect(btn.getAttribute("title")).toBe("A dry run has to pass first");
    expect(btn.textContent).toBe("Publish");
  });

  it("keeps a page reason alongside its own", () => {
    render(
      <>
        <Btn disabled describedBy="why" disabledReason="Viewers cannot publish">Publish</Btn>
        <p id="why">dry run in progress</p>
      </>,
    );
    const ids = screen.getByRole("button").getAttribute("aria-describedby")?.split(" ") ?? [];
    expect(ids.map((id) => document.getElementById(id)?.textContent)).toEqual(["dry run in progress", "Viewers cannot publish"]);
  });

  it("says nothing about a reason while enabled", () => {
    const { container } = render(<Btn disabledReason="A dry run has to pass first">Publish</Btn>);
    const btn = screen.getByRole("button", { name: "Publish" });
    expect(btn.hasAttribute("title")).toBe(false);
    expect(btn.hasAttribute("aria-describedby")).toBe(false);
    expect(container.children).toHaveLength(1);
    expect(container.textContent).toBe("Publish");
  });

  it("names the overflow button and declares its menu", () => {
    render(<Btn variant="overflow">···</Btn>);
    const btn = screen.getByRole("button", { name: "More actions" });
    expect(btn.getAttribute("aria-haspopup")).toBe("menu");
  });

  it("does not fire when disabled", () => {
    const onClick = vi.fn();
    render(<Btn disabled describedBy="why" onClick={onClick}>Publish</Btn>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
