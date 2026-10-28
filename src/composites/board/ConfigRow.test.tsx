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
const described = (el: HTMLElement) =>
  (el.getAttribute("aria-describedby") ?? "").split(" ").filter(Boolean).map((id) => document.getElementById(id)?.textContent).join(" ");

describe("ConfigRow", () => {
  it("locks a review stage on as a column, says why once, and adds no sub-line", () => {
    const onChange = row({ gate: true });
    expect(shown().getAttribute("aria-checked")).toBe("true");
    expect(shown().disabled).toBe(true);
    fireEvent.click(shown());
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByText("can't be hidden or collapsed")).toBeNull();
    expect(screen.getByText("Review")).not.toBeNull();
    expect(screen.getByText("locked")).not.toBeNull();
    expect(described(shown())).toBe("Review stages always show.");
    expect(shown().title).toBe("Review stages always show.");
  });

  it("keeps a terminal stage off the board and counted instead", () => {
    row({ terminal: true });
    expect(shown().getAttribute("aria-checked")).toBe("false");
    expect(shown().disabled).toBe(true);
    expect(screen.queryByText(/terminal/)).toBeNull();
    expect(described(shown())).toBe("Done stages are counted, not shown.");
    expect(screen.queryByLabelText("WIP cap")).toBeNull();
  });

  it("leaves the agent count to the Agents tab and shows the switch state in words", () => {
    row({});
    expect(screen.queryByText(/agents?/)).toBeNull();
    expect(screen.getByText("on")).not.toBeNull();
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

  it("toggles only its own row when the visible state word is clicked", () => {
    const first = vi.fn();
    const second = vi.fn();
    render(
      <>
        <ConfigRow stage={stage} config={config} onChange={first} />
        <ConfigRow stage={{ ...stage, id: "review", name: "Review" }} config={{ ...config, shown: false }} onChange={second} />
      </>,
    );
    fireEvent.click(screen.getByText("off"));
    expect(second).toHaveBeenCalledWith({ ...config, shown: true });
    expect(first).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText("on"));
    expect(first).toHaveBeenCalledWith({ ...config, shown: false });
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("keeps the switch named after its field, not its state word", () => {
    row({});
    expect(shown().getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("switch", { name: "Shown as a column" })).toBe(shown());
  });

  it("leaves a gate or terminal row alone when its state word is clicked", () => {
    const gate = row({ gate: true });
    fireEvent.click(screen.getByText("locked"));
    cleanup();
    const terminal = row({ terminal: true });
    fireEvent.click(screen.getByText("off"));
    expect(gate).not.toHaveBeenCalled();
    expect(terminal).not.toHaveBeenCalled();
  });

  it("has a header row whose columns match the row's", () => {
    const { container } = render(<ConfigRowHead />);
    expect(container.textContent).toContain("Stage");
    expect(container.textContent).toContain("Column label");
    expect(container.textContent).toContain("WIP cap");
    expect(container.textContent).toContain("Shown");
  });
});
