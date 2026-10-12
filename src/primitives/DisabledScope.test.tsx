import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ConfigRow, type ConfigStage } from "../composites/board/ConfigRow";
import { Btn } from "./Btn";
import { Checkbox } from "./Checkbox";
import { DisabledScope } from "./DisabledScope";
import { Field } from "./Field";
import { Select } from "./Select";
import { Switch } from "./Switch";

const REASON = "Read only. You can look but not change anything here.";
const options = [{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }];
const stage: ConfigStage = { id: "implement", name: "Implement", gate: false, terminal: false, agentsMounted: 2 };

afterEach(cleanup);

// The text an assistive technology reads as the element's description.
function description(element: HTMLElement): string {
  const ids = (element.getAttribute("aria-describedby") ?? "").split(" ").filter(Boolean);
  return ids.map((id) => document.getElementById(id)?.textContent ?? "").join(" ");
}

function Controls(props: { onClick: () => void; onChange: () => void }) {
  return (
    <>
      <Btn label="Save" onClick={props.onClick} />
      <Field label="Name" value="x" onChange={props.onChange} />
      <Field kind="textarea" label="Notes" value="x" onChange={props.onChange} />
      <Field kind="select" label="Kind" value="a" options={options} onChange={props.onChange} />
      <Select aria-label="Plain select" value="a" options={options} onChange={props.onChange} />
      <Switch label="Shown" checked onChange={props.onChange} />
      <Checkbox label="Keep" checked onChange={props.onChange} />
    </>
  );
}

const fields = () => [
  screen.getByLabelText("Name"),
  screen.getByLabelText("Notes"),
  screen.getByRole("button", { name: /Kind/ }),
  screen.getByRole("button", { name: /Plain select/ }),
  screen.getByRole("switch"),
  screen.getByRole("checkbox"),
] as HTMLButtonElement[];
const controls = () => [screen.getByRole("button", { name: "Save" }) as HTMLButtonElement, ...fields()];

describe("DisabledScope", () => {
  it("disables every Ward control inside it and gives each the scope's reason", () => {
    const onClick = vi.fn();
    const onChange = vi.fn();
    render(<DisabledScope reason={REASON}><Controls onClick={onClick} onChange={onChange} /></DisabledScope>);
    for (const control of controls()) {
      expect(control.disabled).toBe(true);
      expect(description(control)).toContain(REASON);
      expect(control.title).toBe(REASON);
      fireEvent.click(control);
    }
    expect(onClick).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("names the reason once on a Field's select", () => {
    render(<DisabledScope reason={REASON}><Field kind="select" label="Kind" value="a" options={options} /></DisabledScope>);
    const trigger = screen.getByRole("button", { name: /Kind/ });
    expect(description(trigger).split(REASON).length).toBe(2);
  });

  it("gives the scope's reason in place of a button's own", () => {
    render(<DisabledScope reason={REASON}><Btn label="Publish" disabled disabledReason="A dry run has to pass first." /></DisabledScope>);
    const button = screen.getByRole("button", { name: "Publish" });
    expect(description(button)).toBe(REASON);
    expect(button.title).toBe(REASON);
  });

  it("disables plain app controls through the fieldset", () => {
    render(<DisabledScope reason={REASON}><button type="button">Run</button><input aria-label="Query" /></DisabledScope>);
    expect(screen.getByRole("button", { name: "Run" }).matches(":disabled")).toBe(true);
    expect(screen.getByLabelText("Query").matches(":disabled")).toBe(true);
  });

  it("stops a ConfigRow from reordering or toggling", () => {
    const onChange = vi.fn();
    const onReorder = vi.fn();
    render(<DisabledScope reason={REASON}><ConfigRow stage={stage} config={{ label: "Implementing", cap: 6, shown: true }} onChange={onChange} onReorder={onReorder} /></DisabledScope>);
    const handle = screen.getByRole("button", { name: "Reorder Implement" }) as HTMLButtonElement;
    expect(handle.disabled).toBe(true);
    expect(description(handle)).toBe(REASON);
    expect(handle.title).toBe(REASON);
    fireEvent.keyDown(handle, { key: "ArrowUp" });
    fireEvent.click(screen.getByText("on"));
    expect(onReorder).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    expect((screen.getByLabelText("Column label") as HTMLInputElement).disabled).toBe(true);
  });

  it("leaves the same controls live outside a scope", () => {
    const onClick = vi.fn();
    const onChange = vi.fn();
    render(<Controls onClick={onClick} onChange={onChange} />);
    for (const control of controls()) {
      expect(control.disabled).toBe(false);
      expect(description(control)).not.toContain(REASON);
    }
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    fireEvent.click(screen.getByRole("switch"));
    expect(onClick).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledOnce();
  });
});

describe("DisabledScope with hidden actions", () => {
  it("renders no Btn, whatever its variant or own disabled state", () => {
    render(
      <DisabledScope reason={REASON} actions="hide">
        <Btn variant="primary" label="Save" onClick={() => {}} />
        <Btn variant="destructive" label="Delete" onClick={() => {}} />
        <Btn label="Publish" disabled disabledReason="A dry run has to pass first." />
      </DisabledScope>,
    );
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(screen.queryByText("A dry run has to pass first.")).toBeNull();
  });

  it("keeps every field, select, switch and checkbox, disabled with the scope's reason", () => {
    const onChange = vi.fn();
    render(<DisabledScope reason={REASON} actions="hide"><Controls onClick={() => {}} onChange={onChange} /></DisabledScope>);
    expect(screen.queryByRole("button", { name: "Save" })).toBeNull();
    const kept = fields();
    for (const control of kept) {
      expect(control.disabled).toBe(true);
      expect(description(control)).toContain(REASON);
      fireEvent.click(control);
    }
    expect(onChange).not.toHaveBeenCalled();
  });

  it("drops a ConfigRow's reorder handle and keeps its fields disabled", () => {
    const onChange = vi.fn();
    render(<DisabledScope reason={REASON} actions="hide"><ConfigRow stage={stage} config={{ label: "Implementing", cap: 6, shown: true }} onChange={onChange} onReorder={() => {}} /></DisabledScope>);
    expect(screen.queryByRole("button", { name: "Reorder Implement" })).toBeNull();
    const line = screen.getByLabelText("Column label").closest("span")!.parentElement!;
    expect(line.children).toHaveLength(5);
    expect(line.firstElementChild!.childElementCount).toBe(0);
    expect((screen.getByLabelText("Column label") as HTMLInputElement).disabled).toBe(true);
    expect((screen.getByRole("switch") as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByText("on"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("still disables plain app controls through the fieldset", () => {
    render(<DisabledScope reason={REASON} actions="hide"><button type="button">Run</button><input aria-label="Query" /></DisabledScope>);
    expect(screen.getByRole("button", { name: "Run" }).matches(":disabled")).toBe(true);
    expect(screen.getByLabelText("Query").matches(":disabled")).toBe(true);
  });

  it("disables as before when the mode is named disable", () => {
    render(<DisabledScope reason={REASON} actions="disable"><Btn label="Save" onClick={() => {}} /></DisabledScope>);
    const button = screen.getByRole("button", { name: "Save" }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(description(button)).toBe(REASON);
  });
});
