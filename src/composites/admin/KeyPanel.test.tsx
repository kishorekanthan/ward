import { readFileSync } from "node:fs";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { KeyPanel } from "./KeyPanel";

const css = readFileSync("src/composites/admin/KeyPanel.module.css", "utf8");

function draw(extra: { note?: string; value?: string; onChange?: (value: string) => void } = {}) {
  return render(
    <KeyPanel
      label="Provider key"
      status="Set, ends in 4f2a."
      value={extra.value ?? ""}
      onChange={extra.onChange ?? (() => undefined)}
      actions={<button type="button">Replace key</button>}
      note={extra.note}
    />,
  );
}

describe("KeyPanel", () => {
  it("draws the status, a masked input, the actions and the outcome note", () => {
    draw({ note: "Key saved." });
    expect(screen.getByText("Set, ends in 4f2a.")).toBeTruthy();
    const input = screen.getByLabelText("New provider key");
    expect(input.getAttribute("type")).toBe("password");
    expect(input.getAttribute("autocomplete")).toBe("off");
    expect(screen.getByRole("button", { name: "Replace key" })).toBeTruthy();
    expect(screen.getByRole("status").textContent).toBe("Key saved.");
  });

  it("shows the draft it is given and reports typing", () => {
    const onChange = vi.fn();
    draw({ value: "sk-old", onChange });
    const input = screen.getByLabelText("New provider key") as HTMLInputElement;
    expect(input.value).toBe("sk-old");
    fireEvent.change(input, { target: { value: "sk-new" } });
    expect(onChange).toHaveBeenCalledWith("sk-new");
  });

  it("keeps an empty status region when there is no note", () => {
    draw();
    expect(screen.getByRole("status").textContent).toBe("");
  });

  it("wraps the action row on narrow widths", () => {
    expect(css).toMatch(/\.actions\s*\{[^}]*flex-wrap:\s*wrap/);
  });
});
