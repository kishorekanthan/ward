import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRovingTabindex } from "./useRovingTabindex";

type Roving = ReturnType<typeof useRovingTabindex>;

function Row({ i, itemProps, label }: { i: number; itemProps: Roving["itemProps"]; label: string }) {
  return (
    <button type="button" {...itemProps(i)}>
      {label}
    </button>
  );
}

function List({ orientation }: { orientation?: "both" | "vertical" | "horizontal" }) {
  const roving = useRovingTabindex(orientation ? { orientation } : {});
  return (
    <div data-testid="list" {...roving.containerProps}>
      {["a", "b", "c"].map((label, i) => (
        <Row key={label} i={i} itemProps={roving.itemProps} label={label} />
      ))}
    </div>
  );
}

function SparseList({ collapsed = false }: { collapsed?: boolean }) {
  const roving = useRovingTabindex({ orientation: "vertical" });
  return (
    <div data-testid="sparse-list" {...roving.containerProps}>
      <Row i={0} itemProps={roving.itemProps} label="parent" />
      {!collapsed && <Row i={2} itemProps={roving.itemProps} label="child" />}
    </div>
  );
}

const tabindices = () => screen.getAllByRole("button").map((b) => b.getAttribute("tabindex"));

describe("useRovingTabindex", () => {
  it("puts exactly one tab stop in the set, on the first item", () => {
    render(<List />);
    expect(tabindices()).toEqual(["0", "-1", "-1"]);
  });

  it("moves focus and the tab stop with the arrow keys", () => {
    render(<List />);
    screen.getByText("a").focus();
    fireEvent.keyDown(screen.getByTestId("list"), { key: "ArrowDown" });
    expect(document.activeElement).toBe(screen.getByText("b"));
    expect(tabindices()).toEqual(["-1", "0", "-1"]);
  });

  it("clamps at the ends", () => {
    render(<List />);
    screen.getByText("a").focus();
    fireEvent.keyDown(screen.getByTestId("list"), { key: "ArrowUp" });
    expect(document.activeElement).toBe(screen.getByText("a"));
    fireEvent.keyDown(screen.getByTestId("list"), { key: "ArrowLeft" });
    expect(document.activeElement).toBe(screen.getByText("a"));
    fireEvent.keyDown(screen.getByTestId("list"), { key: "ArrowRight" });
    expect(document.activeElement).toBe(screen.getByText("b"));
  });

  it("Home and End jump to the first and last items", () => {
    render(<List />);
    fireEvent.keyDown(screen.getByTestId("list"), { key: "End" });
    expect(document.activeElement).toBe(screen.getByText("c"));
    fireEvent.keyDown(screen.getByTestId("list"), { key: "Home" });
    expect(document.activeElement).toBe(screen.getByText("a"));
  });

  it("horizontal orientation ignores vertical arrows", () => {
    render(<List orientation="horizontal" />);
    screen.getByText("a").focus();
    fireEvent.keyDown(screen.getByTestId("list"), { key: "ArrowDown" });
    expect(document.activeElement).toBe(screen.getByText("a"));
    fireEvent.keyDown(screen.getByTestId("list"), { key: "ArrowRight" });
    expect(document.activeElement).toBe(screen.getByText("b"));
  });

  it("navigates sparse visible keys instead of map positions", () => {
    render(<SparseList />);
    const list = screen.getByTestId("sparse-list");
    const parent = screen.getByText("parent");
    const child = screen.getByText("child");
    parent.focus();
    fireEvent.keyDown(list, { key: "ArrowDown" });
    expect(document.activeElement).toBe(child);
    fireEvent.keyDown(list, { key: "End" });
    expect(document.activeElement).toBe(child);
    fireEvent.keyDown(list, { key: "ArrowUp" });
    expect(document.activeElement).toBe(parent);
    fireEvent.keyDown(list, { key: "Home" });
    expect(document.activeElement).toBe(parent);
  });

  it("restores the visible parent when the focused child disappears", () => {
    const view = render(<SparseList />);
    screen.getByText("child").focus();
    act(() => view.rerender(<SparseList collapsed />));
    const parent = screen.getByText("parent");
    expect(document.activeElement).toBe(parent);
    expect(parent.getAttribute("tabindex")).toBe("0");
  });
});
