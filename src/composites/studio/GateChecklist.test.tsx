// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GateChecklist } from "./GateChecklist";

const items = [
  { met: true, text: "Dry run passed" },
  { met: false, text: "Owner sign-off" },
];

describe("GateChecklist", () => {
  it("keeps each item a disabled checkbox with an unlabelled mark", () => {
    render(<GateChecklist items={items} />);
    const boxes = screen.getAllByRole("checkbox");
    expect(boxes.map((box) => box.getAttribute("aria-checked"))).toEqual(["true", "false"]);
    expect(boxes.every((box) => box.getAttribute("aria-disabled") === "true")).toBe(true);
    expect(boxes.map((box) => box.querySelector("[data-testid='mark']")?.getAttribute("data-state"))).toEqual(["met", "unmet"]);
    expect(screen.queryByRole("img")).toBeNull();
    expect(document.querySelector(".ward-checklist")).not.toBeNull();
  });

  it("renders an explicitly supplied note below the ordered list", () => {
    render(<GateChecklist items={items} note="Publish waits for sign-off." />);
    expect(document.querySelector(".ward-checklist-note")?.textContent).toBe("Publish waits for sign-off.");
    expect(Array.from(document.querySelectorAll(".ward-checklist-item")).map((item) => item.textContent)).toEqual([
      "✓Dry run passed",
      "Owner sign-off",
    ]);
  });

  it("marks unmet rows in the compact list so they can be muted", () => {
    render(<GateChecklist items={items} density="compact" />);
    const rows = Array.from(document.querySelectorAll(".ward-checklist-item"));
    expect(rows.map((row) => row.getAttribute("data-met"))).toEqual(["true", "false"]);
  });
});

const specItems = [
  { met: true, text: "One successful run" },
  { met: false, text: "A separately approved golden" },
];

describe("GateChecklist (spec)", () => {
  it("states every rung as a checkbox nobody can tick here", () => {
    render(<GateChecklist items={specItems} />);
    const boxes = screen.getAllByRole("checkbox");
    expect(boxes.map((b) => b.getAttribute("aria-checked"))).toEqual(["true", "false"]);
    expect(boxes.every((b) => b.getAttribute("aria-disabled") === "true")).toBe(true);
  });

  it("names each rung by its own sentence, never by colour", () => {
    render(<GateChecklist items={specItems} />);
    expect(screen.getByRole("checkbox", { name: "A separately approved golden" })).not.toBeNull();
  });

  it("carries the note when the gate needs one", () => {
    render(<GateChecklist items={specItems} note="Console output never becomes the golden by itself." />);
    expect(screen.getByText("Console output never becomes the golden by itself.")).not.toBeNull();
  });
});
