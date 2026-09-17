import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ReadyChecklist } from "./ReadyChecklist";

const items = [
  { met: true, text: "A stream is chosen" },
  { met: false, text: "An owner is confirmed" },
];

const note = "You can create the item now; anything unticked is asked again on the item.";

describe("ReadyChecklist", () => {
  it("stays enabled while items are unticked, and says so verbatim", () => {
    const onAction = vi.fn();
    render(<ReadyChecklist items={items} note={note} onAction={onAction} />);
    const primary = screen.getByRole("button") as HTMLButtonElement;
    expect(primary.textContent).toBe("Review & create");
    expect(primary.disabled).toBe(false);
    fireEvent.click(primary);
    expect(onAction).toHaveBeenCalled();
  });

  it("stays enabled with nothing ticked at all", () => {
    render(<ReadyChecklist items={items.map((i) => ({ ...i, met: false }))} note={note} onAction={() => {}} />);
    expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBe(false);
  });

  it("reads the checklist from GateChecklist, unticked items included", () => {
    render(<ReadyChecklist items={items} note={note} onAction={() => {}} />);
    expect(screen.getByRole("checkbox", { name: "An owner is confirmed" }).getAttribute("aria-checked")).toBe("false");
    expect(screen.getByText(note)).not.toBeNull();
  });

  it("lets a consumer relabel the primary action", () => {
    render(<ReadyChecklist items={items} note={note} actionLabel="Create the item" onAction={() => {}} />);
    expect(screen.getByRole("button").textContent).toBe("Create the item");
  });
});
