import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DisabledScope } from "./DisabledScope";
import { Switch } from "./Switch";

describe("Switch labelHidden", () => {
  it("keeps the accessible name while hiding the visible label", () => {
    render(<Switch label="Gate notifications" checked onChange={() => {}} labelHidden />);
    const label = screen.getByText("Gate notifications");
    expect(screen.getByRole("switch", { name: "Gate notifications" })).not.toBeNull();
    expect(label.className).toMatch(/labelHidden/);
  });

  it("shows the label by default", () => {
    render(<Switch label="Gate notifications" checked onChange={() => {}} />);
    expect(screen.getByText("Gate notifications").className).not.toMatch(/labelHidden/);
  });
});

describe("Switch label click", () => {
  it("toggles the switch when its visible label is clicked", () => {
    const seen: boolean[] = [];
    render(<Switch label="Gate notifications" checked={false} onChange={(next) => seen.push(next)} />);
    fireEvent.click(screen.getByText("Gate notifications"));
    expect(seen).toEqual([true]);
  });

  it("toggles only its own switch when several share a page", () => {
    const seen: string[] = [];
    render(
      <>
        <Switch label="Intake" checked={false} onChange={() => seen.push("Intake")} />
        <Switch label="Review" checked={false} onChange={() => seen.push("Review")} />
      </>,
    );
    fireEvent.click(screen.getByText("Review"));
    expect(seen).toEqual(["Review"]);
  });

  it("leaves a disabled or locked switch alone when its label is clicked", () => {
    const seen: boolean[] = [];
    render(
      <>
        <Switch label="Paused lane" checked={false} disabled onChange={(next) => seen.push(next)} />
        <Switch label="Gate lane" checked locked onChange={(next) => seen.push(next)} />
      </>,
    );
    fireEvent.click(screen.getByText("Paused lane"));
    fireEvent.click(screen.getByText("Gate lane"));
    expect(seen).toEqual([]);
  });
});

const described = (el: HTMLElement) =>
  (el.getAttribute("aria-describedby") ?? "").split(" ").filter(Boolean).map((id) => document.getElementById(id)?.textContent).join(" | ");

describe("Switch disabledReason", () => {
  it("describes a disabled or locked switch by its reason", () => {
    render(
      <>
        <p id="note">Paused by the owner.</p>
        <Switch label="Paused lane" checked={false} disabled disabledReason="Nothing runs here." describedBy="note" />
        <Switch label="Gate lane" checked locked disabledReason="Gates always show." />
      </>,
    );
    const paused = screen.getByRole("switch", { name: "Paused lane" });
    expect(described(paused)).toBe("Paused by the owner. | Nothing runs here.");
    expect(paused.title).toBe("Nothing runs here.");
    expect(described(screen.getByRole("switch", { name: /^Gate lane/ }))).toBe("Gates always show.");
  });

  it("says nothing of a reason while the switch can change", () => {
    render(<Switch label="Intake" checked={false} disabledReason="Nothing runs here." onChange={() => {}} />);
    const live = screen.getByRole("switch", { name: "Intake" });
    expect(live.getAttribute("aria-describedby")).toBeNull();
    expect(live.title).toBe("");
    expect(screen.queryByText("Nothing runs here.")).toBeNull();
  });

  it("keeps only the scope's reason inside a disabled scope", () => {
    render(
      <DisabledScope reason="Read only for viewers.">
        <Switch label="Gate lane" checked locked disabledReason="Gates always show." />
      </DisabledScope>,
    );
    const gate = screen.getByRole("switch", { name: /^Gate lane/ });
    expect(described(gate)).toBe("Read only for viewers.");
    expect(gate.title).toBe("Read only for viewers.");
  });
});
