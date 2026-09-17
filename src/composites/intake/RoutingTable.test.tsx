// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RoutingTable, type RoutingRow } from "./RoutingTable";

const rows: RoutingRow[] = [
  { id: "review", rejectedBy: "PR review", reEntersAt: "Implement", skips: "Intake", typedInput: "Quote the rejection" },
  { id: "gate", rejectedBy: "Human gate", typedInput: "No input", noRerun: true, why: "Approval is final" },
];

describe("RoutingTable", () => {
  it("keeps the four routing columns aligned and marks every no-rerun cell", () => {
    const { container, getAllByRole } = render(<RoutingTable rows={rows} />);
    expect(getAllByRole("columnheader").map((header) => header.textContent)).toEqual(["Rejected by", "Re-enters at", "Skips", "Typed input"]);
    expect(container.querySelectorAll("tbody tr")[1]?.querySelectorAll("[data-norerun='true']")).toHaveLength(4);
    expect(container.textContent).toContain("No rerun — Approval is final");
  });

  it("uses a dash for omitted route stages and a positional key when an id is omitted", () => {
    const { container } = render(<RoutingTable rows={[{ rejectedBy: "Lint", typedInput: "Exact error" }]} />);
    expect(container.querySelectorAll("td")[1]?.textContent).toBe("—");
    expect(container.querySelectorAll("td")[2]?.textContent).toBe("—");
  });

  it("requires an explanation for no-rerun records by default", () => {
    expect(() => render(<RoutingTable rows={[{ rejectedBy: "Gate", typedInput: "None", noRerun: true }]} />)).toThrow(/says nothing about why/);
  });

  it("says why a row will not rerun, in warn ink", () => {
    render(<RoutingTable rows={rows} />);
    expect(screen.getByText("No rerun — Approval is final").getAttribute("data-norerun")).toBe("true");
  });

  it("leaves an ordinary row unmarked", () => {
    render(<RoutingTable rows={rows} />);
    expect(screen.getByText("Implement").getAttribute("data-norerun")).toBeNull();
  });

  it("says so when nothing is routed", () => {
    render(<RoutingTable rows={[]} />);
    expect(screen.getByText("No rejection route is configured for this stream yet.")).not.toBeNull();
  });

  it("lets a consumer replace the empty state and drop the no-rerun reason requirement", () => {
    render(<RoutingTable rows={[]} empty={<p>Nothing routes here.</p>} />);
    expect(screen.getByText("Nothing routes here.")).not.toBeNull();
    render(<RoutingTable rows={[{ rejectedBy: "Gate", typedInput: "None", noRerun: true }]} requireNoRerunReason={false} />);
    expect(screen.getByText("No rerun")).not.toBeNull();
  });
});
