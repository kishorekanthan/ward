import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ClauseRuleRow, ClauseRules, type ClauseRule } from "./ClauseRuleRow";

const APPROVERS = [
  { value: "dpm", label: "DPM" },
  { value: "po", label: "Product owner" },
];

const rule: ClauseRule = {
  id: "kpi-in-inventory",
  clauses: [
    { key: "when", label: "When", value: "adds kpi" },
    { key: "approver", label: "Approved by", value: "dpm", options: APPROVERS },
  ],
};

const locked: ClauseRule = { ...rule, id: "dictionary-on-pipeline-change", locked: true, lockedReason: "Set by the platform" };

const inList = (children: React.ReactNode) => render(<ClauseRules label="Stream rules">{children}</ClauseRules>);

describe("ClauseRuleRow", () => {
  it("shows a locked rule's clauses and reason with no control, even when handlers are given", () => {
    const { container } = inList(<ClauseRuleRow rule={locked} onChange={vi.fn()} onRemove={vi.fn()} />);
    expect(container.querySelector("input, select, textarea, button")).toBeNull();
    expect(screen.getByText("Locked")).toBeTruthy();
    expect(screen.getByText("Set by the platform")).toBeTruthy();
    expect(screen.getByRole("listitem").textContent).toBe("dictionary-on-pipeline-changeLockedSet by the platformWhenadds kpiApproved bydpm");
  });

  it("edits a clause with options as a select and one without as a text input, reporting (key, value)", () => {
    const onChange = vi.fn();
    inList(<ClauseRuleRow rule={rule} onChange={onChange} />);
    const when = screen.getByLabelText("kpi-in-inventory When") as HTMLInputElement;
    const approver = screen.getByLabelText("kpi-in-inventory Approved by") as HTMLSelectElement;
    expect(when.tagName).toBe("INPUT");
    expect(approver.tagName).toBe("SELECT");
    expect([...approver.options].map((o) => o.value)).toEqual(["dpm", "po"]);
    fireEvent.change(when, { target: { value: "adds metric" } });
    fireEvent.change(approver, { target: { value: "po" } });
    expect(onChange.mock.calls).toEqual([["when", "adds metric"], ["approver", "po"]]);
    expect(screen.queryByText("Locked")).toBeNull();
  });

  it("removes an editable rule through its own button", () => {
    const onRemove = vi.fn();
    inList(<ClauseRuleRow rule={rule} onRemove={onRemove} />);
    fireEvent.click(screen.getByRole("button", { name: "Remove kpi-in-inventory" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("shows a clause's invalid message against its own field only", () => {
    const bad = { ...rule, clauses: [rule.clauses[0], { ...rule.clauses[1], invalid: "names no approver" }] };
    inList(<ClauseRuleRow rule={bad} onChange={vi.fn()} />);
    const approver = screen.getByLabelText("kpi-in-inventory Approved by");
    expect(approver.getAttribute("aria-invalid")).toBe("true");
    expect(document.getElementById(approver.getAttribute("aria-describedby") ?? "")?.textContent).toBe("names no approver");
    expect(screen.getByLabelText("kpi-in-inventory When").getAttribute("aria-invalid")).toBeNull();
    expect(screen.getAllByText("names no approver")).toHaveLength(1);
  });

  it("puts rules in a labelled ordered list", () => {
    const { container } = inList([<ClauseRuleRow key="a" rule={rule} />, <ClauseRuleRow key="b" rule={locked} />]);
    expect(screen.getByRole("list", { name: "Stream rules" }).tagName).toBe("OL");
    expect(container.querySelectorAll("li")).toHaveLength(2);
  });

  it("refuses to render outside ClauseRules", () => {
    const quiet = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ClauseRuleRow rule={rule} />)).toThrow(/must be rendered inside ClauseRules/);
    quiet.mockRestore();
  });
});
