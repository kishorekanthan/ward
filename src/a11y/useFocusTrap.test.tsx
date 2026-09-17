import { fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it } from "vitest";
import { useFocusTrap } from "./useFocusTrap";

function Dialog() {
  const ref = useRef<HTMLDivElement>(null);
  const trap = useFocusTrap(ref);
  return (
    <div ref={ref} data-testid="dialog" onKeyDown={trap.onKeyDown}>
      <button type="button">close</button>
      <a href="#x">link</a>
      <button type="button">save</button>
    </div>
  );
}

describe("useFocusTrap", () => {
  it("wraps Tab from the last item back to the first", () => {
    render(<Dialog />);
    screen.getByText("save").focus();
    fireEvent.keyDown(screen.getByTestId("dialog"), { key: "Tab" });
    expect(document.activeElement).toBe(screen.getByText("close"));
  });

  it("wraps Shift+Tab from the first item back to the last", () => {
    render(<Dialog />);
    screen.getByText("close").focus();
    fireEvent.keyDown(screen.getByTestId("dialog"), { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(screen.getByText("save"));
  });

  it("pulls focus to the first item when focus escapes the trap", () => {
    render(<Dialog />);
    fireEvent.keyDown(screen.getByTestId("dialog"), { key: "Tab" });
    expect(document.activeElement).toBe(screen.getByText("close"));
  });
});
