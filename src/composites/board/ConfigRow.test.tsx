import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ConfigRow, ConfigRowHead, type ConfigStage } from "./ConfigRow";

const stage: ConfigStage = { id: "implement", name: "Implement", gate: false, terminal: false, agentsMounted: 2 };
const config = { label: "Implementing", cap: 6, shown: true };

const row = (s: Partial<ConfigStage>, onChange = vi.fn()) => {
  render(<ConfigRow stage={{ ...stage, ...s }} config={config} onChange={onChange} />);
  return onChange;
};

/* The control is a switch, not a checkbox — the comp's Shown cell holds a 26x14
   track — so state is read from aria-checked rather than from input.checked. */
const shown = () => screen.getByRole("switch") as HTMLButtonElement;

describe("ConfigRow", () => {
  it("locks a human gate on as a column and says why", () => {
    const onChange = row({ gate: true });
    expect(shown().getAttribute("aria-checked")).toBe("true");
    expect(shown().disabled).toBe(true);
    fireEvent.click(shown());
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText("can't be hidden or collapsed")).not.toBeNull();
    expect(screen.getByText("locked")).not.toBeNull();
  });

  it("keeps a terminal stage off the board and counted instead", () => {
    row({ terminal: true });
    expect(shown().getAttribute("aria-checked")).toBe("false");
    expect(shown().disabled).toBe(true);
    expect(screen.getByText("terminal · counted, not a column")).not.toBeNull();
    expect(screen.queryByLabelText("WIP cap")).toBeNull();
  });

  it("says how many agents are mounted and shows the switch state in words", () => {
    row({});
    expect(screen.getByText("2 agents mounted")).not.toBeNull();
    expect(screen.getByText("on")).not.toBeNull();
    cleanup();
    row({ agentsMounted: 0 });
    expect(screen.queryByText(/mounted/)).toBeNull();
  });

  it("leaves an ordinary stage editable", () => {
    const onChange = row({});
    expect(shown().disabled).toBe(false);
    fireEvent.click(shown());
    expect(onChange).toHaveBeenCalledWith({ ...config, shown: false });
  });

  it("reorders from the keyboard, not by drag alone", () => {
    const onReorder = vi.fn();
    render(<ConfigRow stage={stage} config={config} onChange={() => {}} onReorder={onReorder} />);
    fireEvent.keyDown(screen.getByRole("button", { name: "Reorder Implement" }), { key: "ArrowUp" });
    expect(onReorder).toHaveBeenCalledWith(-1);
  });

  it("clears the cap rather than storing an empty string", () => {
    const onChange = row({});
    fireEvent.change(screen.getByLabelText("WIP cap"), { target: { value: "" } });
    expect(onChange).toHaveBeenCalledWith({ ...config, cap: undefined });
  });

  /* The visible column names live in the header row, so the row's own controls
     hide their labels. They must still be findable by name, or the inputs are
     unlabelled for anyone not reading the header. */
  it("keeps its controls named even though the labels are visually hidden", () => {
    row({});
    expect(screen.getByLabelText("Column label")).not.toBeNull();
    expect(screen.getByLabelText("WIP cap")).not.toBeNull();
    expect(screen.getByRole("switch", { name: "Shown as a column" })).not.toBeNull();
  });

  it("has a header row whose columns match the row's", () => {
    const { container } = render(<ConfigRowHead />);
    expect(container.textContent).toContain("Stage");
    expect(container.textContent).toContain("Column label");
    expect(container.textContent).toContain("WIP cap");
    expect(container.textContent).toContain("Shown");
  });
});
