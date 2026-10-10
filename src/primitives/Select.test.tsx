import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { stubLayout, unstubLayout } from "../test-layout";
import { Select, type SelectOption } from "./Select";

const owners: SelectOption[] = [
  { value: "j.rao", label: "J. Rao" },
  { value: "a.whyte", label: "A. Whyte" },
  { value: "m.chen", label: "M. Chen" },
];

// Seven and eight options: the Find box appears from eight.
const seven: SelectOption[] = ["Intake", "Triage", "Design", "Implement", "Review", "Security review", "Release"].map((label, i) => ({ value: `s${i}`, label }));
const eight: SelectOption[] = [...seven, { value: "s7", label: "Verify" }];

function Live({ options = owners, initial = "a.whyte", onChange }: { options?: SelectOption[]; initial?: string; onChange?: (value: string) => void }) {
  const [value, setValue] = useState(initial);
  const change = (next: string) => {
    setValue(next);
    onChange?.(next);
  };
  return (
    <>
      <Select aria-label="Owner" options={options} value={value} onChange={change} />
      <button type="button">After</button>
    </>
  );
}

const trigger = () => screen.getByRole("button", { name: "Owner" });
const listbox = () => screen.getByRole("listbox");
// The option the focused element points at with aria-activedescendant.
const activeText = () => document.getElementById(document.activeElement?.getAttribute("aria-activedescendant") ?? "")?.textContent;
const optionTexts = () => screen.queryAllByRole("option").map((option) => option.textContent);

function openWith(key: string) {
  fireEvent.keyDown(trigger(), { key });
}

afterEach(() => vi.useRealTimers());

describe("Select roles and names", () => {
  it("names the trigger, shows the chosen label and never the raw value", () => {
    render(<Live />);
    const button = trigger();
    expect(button.tagName).toBe("BUTTON");
    expect(button.getAttribute("type")).toBe("button");
    expect(button.getAttribute("aria-haspopup")).toBe("listbox");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(button.textContent).toBe("A. Whyte");
    expect(screen.queryByText("a.whyte")).toBeNull();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("opens a named listbox whose options mark only the chosen one selected", () => {
    render(<Live />);
    fireEvent.click(trigger());
    expect(trigger().getAttribute("aria-expanded")).toBe("true");
    expect(trigger().getAttribute("aria-controls")).toBe(listbox().id);
    expect(screen.getByRole("listbox", { name: "Owner" })).toBe(listbox());
    const options = within(listbox()).getAllByRole("option");
    expect(options.map((option) => option.textContent)).toEqual(["J. Rao", "A. Whyte", "M. Chen"]);
    expect(options.map((option) => option.getAttribute("aria-selected"))).toEqual(["false", "true", "false"]);
  });

  it("takes its name from aria-labelledby and announces the value as a description", () => {
    render(
      <>
        <span id="owner-label">Accountable owner</span>
        <Select aria-labelledby="owner-label" options={owners} value="m.chen" />
      </>,
    );
    const button = screen.getByRole("button", { name: "Accountable owner" });
    const described = (button.getAttribute("aria-describedby") ?? "").split(" ").map((id) => document.getElementById(id)?.textContent);
    expect(described).toEqual(["M. Chen"]);
  });

  it("shows the placeholder when no option holds the value, and posts the value under its name", () => {
    const { container } = render(<Select aria-label="Stage" name="stage" options={owners} value="" placeholder="Choose a stage" />);
    expect(screen.getByRole("button", { name: "Stage" }).textContent).toBe("Choose a stage");
    render(<Select aria-label="Owner" name="owner" options={owners} value="j.rao" />);
    expect((document.querySelector('input[name="owner"]') as HTMLInputElement).value).toBe("j.rao");
    expect(container.querySelector('input[name="stage"]')?.getAttribute("type")).toBe("hidden");
  });

  it("does not open while disabled", () => {
    render(<Select aria-label="Owner" options={owners} value="j.rao" disabled />);
    fireEvent.click(screen.getByRole("button", { name: "Owner" }));
    fireEvent.keyDown(screen.getByRole("button", { name: "Owner" }), { key: "ArrowDown" });
    expect(screen.queryByRole("listbox")).toBeNull();
  });
});

describe("Select keyboard", () => {
  it.each(["ArrowDown", "ArrowUp", "Enter", " "])("opens from the trigger on %j with focus on the chosen option", (key) => {
    render(<Live />);
    openWith(key);
    expect(document.activeElement).toBe(listbox());
    expect(activeText()).toBe("A. Whyte");
  });

  it("moves with Down and Up, stopping at each end", () => {
    render(<Live />);
    openWith("ArrowDown");
    fireEvent.keyDown(listbox(), { key: "ArrowDown" });
    expect(activeText()).toBe("M. Chen");
    fireEvent.keyDown(listbox(), { key: "ArrowDown" });
    expect(activeText()).toBe("M. Chen");
    fireEvent.keyDown(listbox(), { key: "ArrowUp" });
    fireEvent.keyDown(listbox(), { key: "ArrowUp" });
    expect(activeText()).toBe("J. Rao");
    fireEvent.keyDown(listbox(), { key: "ArrowUp" });
    expect(activeText()).toBe("J. Rao");
  });

  it("jumps to the ends with Home and End", () => {
    render(<Live />);
    openWith("ArrowDown");
    fireEvent.keyDown(listbox(), { key: "End" });
    expect(activeText()).toBe("M. Chen");
    fireEvent.keyDown(listbox(), { key: "Home" });
    expect(activeText()).toBe("J. Rao");
  });

  it("picks with Enter, closes and returns focus to the trigger", () => {
    const onChange = vi.fn();
    render(<Live onChange={onChange} />);
    openWith("ArrowDown");
    fireEvent.keyDown(listbox(), { key: "ArrowDown" });
    fireEvent.keyDown(listbox(), { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("m.chen");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(trigger());
    expect(trigger().textContent).toBe("M. Chen");
    expect(trigger().getAttribute("aria-expanded")).toBe("false");
  });

  it("closes on Esc without a change, returns focus, and keeps Esc from an enclosing dialog", () => {
    const onChange = vi.fn();
    const outer = vi.fn();
    render(<Live onChange={onChange} />);
    openWith("ArrowDown");
    fireEvent.keyDown(listbox(), { key: "ArrowDown" });
    document.addEventListener("keydown", outer);
    fireEvent.keyDown(listbox(), { key: "Escape" });
    document.removeEventListener("keydown", outer);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(trigger());
    expect(trigger().textContent).toBe("A. Whyte");
    expect(outer).not.toHaveBeenCalled();
  });

  it("closes on Tab with focus back on the trigger, so the browser moves on from there", () => {
    const onChange = vi.fn();
    render(<Live onChange={onChange} />);
    openWith("ArrowDown");
    const tab = fireEvent.keyDown(listbox(), { key: "Tab" });
    expect(tab).toBe(true);
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(trigger());
    expect(onChange).not.toHaveBeenCalled();
  });

  it("jumps to the first label starting with the typed prefix", () => {
    vi.useFakeTimers();
    render(<Live options={seven} initial="s0" />);
    openWith("ArrowDown");
    fireEvent.keyDown(listbox(), { key: "r" });
    expect(activeText()).toBe("Review");
    act(() => vi.advanceTimersByTime(100));
    fireEvent.keyDown(listbox(), { key: "E" });
    fireEvent.keyDown(listbox(), { key: "l" });
    expect(activeText()).toBe("Release");
  });

  it("starts a new prefix once the typing pauses for half a second", () => {
    vi.useFakeTimers();
    render(<Live options={seven} initial="s0" />);
    openWith("ArrowDown");
    fireEvent.keyDown(listbox(), { key: "s" });
    expect(activeText()).toBe("Security review");
    act(() => vi.advanceTimersByTime(600));
    fireEvent.keyDown(listbox(), { key: "d" });
    expect(activeText()).toBe("Design");
  });
});

describe("Select pointer", () => {
  it("picks a clicked option and returns focus to the trigger", () => {
    const onChange = vi.fn();
    render(<Live onChange={onChange} />);
    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole("option", { name: "J. Rao" }));
    expect(onChange).toHaveBeenCalledWith("j.rao");
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(trigger());
  });

  it("closes when the pointer goes down outside, and the trigger click toggles", () => {
    render(<Live />);
    fireEvent.click(trigger());
    fireEvent.mouseDown(screen.getByRole("button", { name: "After" }));
    expect(screen.queryByRole("listbox")).toBeNull();
    fireEvent.click(trigger());
    fireEvent.mouseDown(screen.getByRole("option", { name: "M. Chen" }));
    expect(screen.queryByRole("listbox")).not.toBeNull();
    fireEvent.click(trigger());
    expect(screen.queryByRole("listbox")).toBeNull();
  });
});

describe("Select Find", () => {
  it("shows no Find box for seven options", () => {
    render(<Live options={seven} initial="s0" />);
    fireEvent.click(trigger());
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(optionTexts()).toHaveLength(7);
  });

  it("shows a Find box for eight options and narrows by label, ignoring case", () => {
    render(<Live options={eight} initial="s0" />);
    fireEvent.click(trigger());
    const find = screen.getByRole("textbox", { name: "Find" });
    expect(find.getAttribute("placeholder")).toBe("Find");
    expect(document.activeElement).toBe(find);
    expect(optionTexts()).toHaveLength(8);
    fireEvent.change(find, { target: { value: "REV" } });
    expect(optionTexts()).toEqual(["Review", "Security review"]);
    fireEvent.change(find, { target: { value: "zz" } });
    expect(optionTexts()).toEqual([]);
    expect(screen.getByText("No match")).toBeDefined();
  });

  it("moves through the narrowed list from the Find box and picks with Enter", () => {
    const onChange = vi.fn();
    render(<Live options={eight} initial="s0" onChange={onChange} />);
    fireEvent.click(trigger());
    const find = screen.getByRole("textbox", { name: "Find" });
    fireEvent.change(find, { target: { value: "rev" } });
    expect(activeText()).toBe("Review");
    fireEvent.keyDown(find, { key: "ArrowDown" });
    expect(activeText()).toBe("Security review");
    fireEvent.keyDown(find, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("s5");
    expect(document.activeElement).toBe(trigger());
  });

  it("closes from the Find box on Esc without a change", () => {
    const onChange = vi.fn();
    render(<Live options={eight} initial="s0" onChange={onChange} />);
    fireEvent.click(trigger());
    fireEvent.change(screen.getByRole("textbox", { name: "Find" }), { target: { value: "ver" } });
    fireEvent.keyDown(screen.getByRole("textbox", { name: "Find" }), { key: "Escape" });
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(document.activeElement).toBe(trigger());
  });
});

describe("Select placement", () => {
  afterEach(unstubLayout);

  it("opens above a trigger near the bottom of the viewport, as wide as the trigger", () => {
    const layout = stubLayout({ width: 1024, height: 768 }, { width: 160, height: 120 });
    render(<Live />);
    layout.place(trigger(), { left: 100, top: 700, width: 160, height: 32 });
    fireEvent.click(trigger());
    const menu = listbox().parentElement as HTMLElement;
    expect([menu.style.top, menu.style.left, menu.style.maxHeight, menu.style.getPropertyValue("--ward-anchor-width")]).toEqual(["576px", "100px", "692px", "160px"]);
  });

  it("follows the trigger when any box scrolls or the window resizes", () => {
    const layout = stubLayout({ width: 1024, height: 768 }, { width: 160, height: 120 });
    render(<Live />);
    layout.place(trigger(), { left: 100, top: 100, width: 160, height: 32 });
    fireEvent.click(trigger());
    const menu = listbox().parentElement as HTMLElement;
    expect(menu.style.top).toBe("136px");
    layout.place(trigger(), { left: 100, top: 40, width: 160, height: 32 });
    fireEvent.scroll(document.body);
    expect(menu.style.top).toBe("76px");
    layout.place(trigger(), { left: 20, top: 200, width: 160, height: 32 });
    fireEvent(window, new Event("resize"));
    expect([menu.style.top, menu.style.left]).toEqual(["236px", "20px"]);
  });
});
