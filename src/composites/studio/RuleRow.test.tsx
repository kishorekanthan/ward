// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RuleRow, type Rule } from "./RuleRow";

const rule: Rule = { when: { field: "total", op: ">", value: "0" }, then: "escalate" };

function table(child: React.JSX.Element) {
  return <table><tbody>{child}</tbody></table>;
}

describe("RuleRow", () => {
  it("keeps the structured rule and returns its complete next value", () => {
    const onChange = vi.fn();
    const { container } = render(table(<RuleRow rule={rule} onChange={onChange} />));
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "block" } });
    expect(container.querySelectorAll("td")).toHaveLength(2);
    expect(screen.getByText("total > 0")).not.toBeNull();
    expect(onChange).toHaveBeenCalledWith({ when: rule.when, then: "block" });
  });

  it("shows read-only as words and rejects unknown actions", () => {
    const { unmount } = render(table(<RuleRow rule={rule} readOnly />));
    expect(screen.queryByRole("combobox")).toBeNull();
    expect(screen.getByText("Escalate")).not.toBeNull();
    unmount();
    expect(() => render(table(<RuleRow rule={{ ...rule, then: "merge" as never }} />))).toThrow("not a contract action");
  });

  it("supports explicit four-cell condition presentation", () => {
    const { container } = render(table(<RuleRow rule={rule} presentation={{ cellLayout: "four", conditionText: "count delta > 0.5%" }} />));
    expect(container.querySelectorAll("td")).toHaveLength(4);
    expect(screen.getByText("count delta > 0.5%")).not.toBeNull();
    expect(container.querySelectorAll("td")[3]?.textContent).toBe("Escalate");
  });

  it("renders the contract layout as one list row whose action select keeps its name", () => {
    const onChange = vi.fn();
    const { container } = render(<ol><RuleRow rule={rule} onChange={onChange} presentation={{ cellLayout: "contract", conditionText: "row count delta > 0.5%" }} /></ol>);
    expect(container.querySelectorAll("ol > li")).toHaveLength(1);
    expect(container.querySelector("li")?.textContent).toContain("WHENrow count delta > 0.5%THEN");
    fireEvent.change(screen.getByRole("combobox", { name: "Then" }), { target: { value: "advance" } });
    expect(onChange).toHaveBeenCalledWith({ when: rule.when, then: "advance" });
  });
});

const specRule: Rule = { when: { field: "rows", op: "==", value: "0" }, then: "block" };

const wrap = (ui: React.ReactNode) =>
  render(
    <table>
      <tbody>{ui}</tbody>
    </table>,
  );

describe("RuleRow (spec)", () => {
  it("refuses an action outside the closed set", () => {
    expect(() => wrap(<RuleRow rule={{ ...specRule, then: "merge" as never }} />)).toThrow(/not a contract action/);
  });

  it("offers only the four contract actions", () => {
    wrap(<RuleRow rule={specRule} onChange={() => {}} />);
    expect(screen.getAllByRole("option").map((o) => o.getAttribute("value"))).toEqual([
      "advance",
      "block",
      "escalate",
      "requestReview",
    ]);
  });

  it("shows a read-only rule as words, with nothing to change", () => {
    wrap(<RuleRow rule={specRule} readOnly onChange={() => {}} />);
    expect(screen.queryByRole("combobox")).toBeNull();
    expect(screen.getByText("Block")).not.toBeNull();
  });

  it("reports the new action", () => {
    const onChange = vi.fn();
    wrap(<RuleRow rule={specRule} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("Then"), { target: { value: "escalate" } });
    expect(onChange).toHaveBeenCalledWith({ ...specRule, then: "escalate" });
  });
});
