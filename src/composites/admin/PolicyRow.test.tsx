import { readFileSync } from "node:fs";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { POLICY_CHIP_WIDTH, PolicyRow, type PolicyInheritance } from "./PolicyRow";

function inTable(row: ReactElement) {
  return render(
    <table>
      <tbody>{row}</tbody>
    </table>,
  );
}

function texts(container: HTMLElement, selector: string): Array<string | null> {
  return Array.from(container.querySelectorAll(selector)).map((el) => el.textContent);
}

const RERUN = [
  { value: "implement", label: "implement" },
  { value: "producing-stage", label: "producing stage" },
];

describe("PolicyRow compact", () => {
  it("heads the row with name, consequence and reason, locks the switch on and pins the chip width", () => {
    const onChange = vi.fn();
    const { container } = inTable(
      <PolicyRow
        setting={{ name: "No-regression check", consequence: "An attempt that unmets a met criterion is rejected." }}
        control={{ kind: "switch", checked: false, onChange }}
        inheritance="locked"
        reason="platform-locked"
      />,
    );
    expect(texts(container, "th[scope='row']")).toEqual(["No-regression checkAn attempt that unmets a met criterion is rejected.platform-locked"]);
    const sw = container.querySelector("[role='switch']") as HTMLButtonElement;
    expect(sw.getAttribute("aria-checked")).toBe("true");
    expect(sw.disabled).toBe(true);
    fireEvent.click(sw);
    expect(onChange).not.toHaveBeenCalled();
    const cells = container.querySelectorAll("td");
    expect(cells).toHaveLength(2);
    expect((cells[1] as HTMLElement).style.width).toBe("104px");
    expect(container.querySelector(".ward-chip")?.className).toContain("ward-chip--meta");
    expect(container.querySelector(".ward-chip")?.textContent).toBe("LOCKED");
  });

  it("refuses a locked setting without a reason", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => inTable(<PolicyRow setting={{ name: "x", consequence: "y" }} control={{ kind: "value", text: "z" }} inheritance="locked" />)).toThrow(
      "PolicyRow: a locked setting must say why in the row",
    );
    vi.restoreAllMocks();
  });

  it("labels an overridden segment with the setting name and reports the picked value", () => {
    const onChange = vi.fn();
    const { container } = inTable(
      <PolicyRow setting={{ name: "rerun.pr_review_entry", consequence: "Where a PR review rerun enters." }} control={{ kind: "segment", options: RERUN, value: "implement", onChange }} inheritance="overridden" />,
    );
    expect(container.querySelector("[role='radiogroup']")?.getAttribute("aria-label")).toBe("rerun.pr_review_entry");
    fireEvent.click(Array.from(container.querySelectorAll("[role='radio']"))[1] as HTMLElement);
    expect(onChange.mock.calls).toEqual([["producing-stage"]]);
    expect(container.querySelector(".ward-chip")?.className).toContain("ward-chip--running");
  });
});

describe("PolicyRow web presentation", () => {
  it("lays out setting, control and chip in a div row and accepts a locked row without a reason", () => {
    const { container } = render(
      <PolicyRow presentation="web" setting={{ name: "Label prefix", consequence: "Fixed at trellis:." }} control={{ kind: "value", value: "trellis:" }} inheritance="locked" />,
    );
    const row = container.querySelector("div.ward-policyrow[data-inheritance='locked']") as HTMLElement;
    expect(container.querySelector("tr, th, td")).toBeNull();
    expect(Array.from(row.children).map((el) => el.textContent)).toEqual(["Label prefixFixed at trellis:.", "trellis:", "LOCKED"]);
    expect(texts(row, ":scope > .ward-envmeta")).toEqual(["trellis:"]);
    expect((row.querySelector(".ward-policy-chip") as HTMLElement).style.width).toBe("104px");
  });

  it("appends the reason after a space and maps each inheritance to its chip", () => {
    const { container } = render(
      <div>
        <PolicyRow presentation="web" setting={{ name: "a", consequence: "Inherited." }} control={{ kind: "value" }} inheritance="inherited" reason="from platform" />
        <PolicyRow presentation="web" setting={{ name: "b", consequence: "Overridden." }} control={{ kind: "value" }} inheritance="overridden" />
        <PolicyRow presentation="web" setting={{ name: "c", consequence: "Derived." }} control={{ kind: "value" }} inheritance="derived" />
      </div>,
    );
    expect(texts(container, ".ward-policy-consequence")).toEqual(["Inherited. from platform", "Overridden.", "Derived."]);
    expect(texts(container, ".ward-envmeta")).toEqual(["—", "—", "—"]);
    const chips = Array.from(container.querySelectorAll(".ward-policy-chip > .ward-chip"));
    expect(chips.map((chip) => chip.textContent)).toEqual(["INHERITED", "OVERRIDDEN", "DERIVED"]);
    expect(chips.map((chip) => chip.getAttribute("data-ward-chip"))).toEqual(["meta", "running", "soft"]);
  });

  it("keeps a locked switch on and inert, and fires an open switch with the flipped value", () => {
    const onChange = vi.fn();
    const { container } = render(
      <div>
        <PolicyRow presentation="web" setting={{ name: "locked", consequence: "c" }} control={{ kind: "switch", value: false }} inheritance="locked" onChange={onChange} />
        <PolicyRow presentation="web" setting={{ name: "open", consequence: "c" }} control={{ kind: "switch", value: false }} inheritance="overridden" onChange={onChange} />
        <PolicyRow presentation="web" setting={{ name: "bare", consequence: "c" }} control={{ kind: "switch", value: "true" }} inheritance="inherited" />
      </div>,
    );
    const [locked, open, bare] = Array.from(container.querySelectorAll("[role='switch']")) as HTMLButtonElement[];
    expect([locked.getAttribute("aria-checked"), locked.disabled]).toEqual(["true", true]);
    expect([open.getAttribute("aria-label"), open.disabled]).toEqual(["open", false]);
    expect([bare.getAttribute("aria-checked"), bare.disabled]).toEqual(["false", false]);
    fireEvent.click(locked);
    fireEvent.click(open);
    fireEvent.click(bare);
    expect(onChange.mock.calls).toEqual([[true]]);
  });

  it("edits an open segment but reads a locked or option-less segment as text", () => {
    const onChange = vi.fn();
    const { container } = render(
      <div>
        <PolicyRow presentation="web" setting={{ name: "open", consequence: "c" }} control={{ kind: "segment", value: "implement", options: RERUN }} inheritance="inherited" onChange={onChange} />
        <PolicyRow presentation="web" setting={{ name: "locked", consequence: "c" }} control={{ kind: "segment", value: "producing-stage", options: RERUN }} inheritance="locked" />
        <PolicyRow presentation="web" setting={{ name: "unknown", consequence: "c" }} control={{ kind: "segment", value: "p75", options: RERUN }} inheritance="locked" />
        <PolicyRow presentation="web" setting={{ name: "optionless", consequence: "c" }} control={{ kind: "segment", value: "implement" }} inheritance="inherited" />
      </div>,
    );
    const radios = Array.from(container.querySelectorAll("[role='radio']"));
    expect(radios.map((radio) => [radio.textContent, radio.getAttribute("aria-checked")])).toEqual([
      ["implement", "true"],
      ["producing stage", "false"],
    ]);
    fireEvent.click(radios[1] as HTMLElement);
    expect(onChange.mock.calls).toEqual([["producing-stage"]]);
    expect(texts(container, ".ward-envmeta")).toEqual(["producing stage", "p75", "implement"]);
  });
});

const specSetting = { name: "Gate notifications", consequence: "Approvers stop hearing about waiting gates when this is off." };
const css = readFileSync("src/composites/admin/PolicyRow.module.css", "utf8");

function renderRow(inheritance: PolicyInheritance, onChange = () => {}, reason?: string) {
  return render(
    <table>
      <tbody>
        <PolicyRow
          setting={specSetting}
          control={{ kind: "switch", checked: true, onChange }}
          inheritance={inheritance}
          reason={reason}
        />
      </tbody>
    </table>,
  );
}

describe("PolicyRow spec", () => {
  it("never renders a locked control off", () => {
    const onChange = vi.fn();
    renderRow("locked", onChange, "Set by platform policy PLT-118.");
    const sw = screen.getByRole("switch") as HTMLButtonElement;
    expect(sw.getAttribute("aria-checked")).toBe("true");
    expect(sw.disabled).toBe(true);
    expect(screen.getByText("always on")).not.toBeNull();
    fireEvent.click(sw);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("refuses a locked setting that does not say why", () => {
    expect(() => renderRow("locked")).toThrow(/must say why in the row/);
  });

  it("puts the reason in the row beside the control", () => {
    renderRow("locked", () => {}, "Set by platform policy PLT-118.");
    expect(screen.getByText("Set by platform policy PLT-118.")).not.toBeNull();
  });

  it("bands a locked row on surface2 and an overridden row on blueSoft", () => {
    const { container } = renderRow("locked", () => {}, "Set by platform policy PLT-118.");
    expect(container.querySelector("tr")?.getAttribute("data-inheritance")).toBe("locked");
    expect(/\[data-inheritance="locked"\]\s*\{[^}]*--ward-color-surface2/.test(css)).toBe(true);
    expect(/\[data-inheritance="overridden"\]\s*\{[^}]*--ward-color-blueSoft/.test(css)).toBe(true);
  });

  it("keeps LOCKED neutral, OVERRIDDEN running and DERIVED soft — a blue chip is not an action", () => {
    renderRow("locked", () => {}, "Set by platform policy PLT-118.");
    expect(screen.getByText("LOCKED").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-meta-bg)");
    renderRow("overridden");
    expect(screen.getByText("OVERRIDDEN").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-running-bg)");
    renderRow("derived");
    expect(screen.getByText("DERIVED").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-soft-bg)");
  });

  it("holds the inheritance column at its drawn width", () => {
    const { container } = renderRow("inherited");
    const cells = container.querySelectorAll("td");
    expect((cells[cells.length - 1] as HTMLElement).style.width).toBe(`${POLICY_CHIP_WIDTH}px`);
    expect(POLICY_CHIP_WIDTH).toBe(104);
  });

  it("changes an unlocked setting", () => {
    const onChange = vi.fn();
    renderRow("inherited", onChange);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(false);
  });
});
