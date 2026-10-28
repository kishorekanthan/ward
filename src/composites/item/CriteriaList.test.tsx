import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CriteriaList, type Criterion } from "./CriteriaList";

const criteria: Criterion[] = [
  { met: true, text: "Signed off by the data product manager", evidence: "sig:8f21c4" },
  { met: false, text: "Late-arrival window agreed with Ops" },
];

describe("CriteriaList", () => {
  it("offers nothing to edit — criteria are read, never changed here", () => {
    const { container } = render(<CriteriaList criteria={criteria} />);
    expect(container.querySelector("input, button, textarea, select, [contenteditable]")).toBeNull();
  });

  it("lets the unticked box say an unmet criterion holds, with no tail of its own", () => {
    render(<CriteriaList criteria={criteria} />);
    expect(screen.getAllByRole("checkbox")[1].getAttribute("aria-checked")).toBe("false");
    expect(screen.queryByText(/keeps the item held/)).toBeNull();
  });

  it("keeps the reason on an unmet criterion that carries its own", () => {
    render(<CriteriaList criteria={[{ met: false, text: "Ops sign-off", why: "Ops has not replied" }]} />);
    expect(screen.getByText("Ops has not replied")).not.toBeNull();
  });

  it("says nothing about consequence for a met criterion", () => {
    render(<CriteriaList criteria={[criteria[0]]} />);
    expect(screen.queryByText(/keeps the item held/)).toBeNull();
  });

  it("keeps evidence readable in one line", () => {
    render(<CriteriaList criteria={criteria} />);
    const code = screen.getByText("sig:8f21c4");
    expect(code.tagName).toBe("CODE");
    expect(code.getAttribute("title")).toBe("sig:8f21c4");
  });

  it("adds no hold note under the list, even while a criterion is unmet", () => {
    const { container } = render(<CriteriaList criteria={criteria} />);
    expect(container.querySelector("p")).toBeNull();
    expect(screen.queryByText(/Nothing advances/)).toBeNull();
  });

  it("names each row as one sentence, with the evidence and consequence set apart", () => {
    render(<CriteriaList criteria={[...criteria, { met: false, text: "Ops sign-off", evidence: "none", why: "Ops has not replied" }]} />);
    expect(screen.getAllByRole("checkbox").map((row) => row.textContent)).toEqual([
      "Signed off by the data product manager · sig:8f21c4",
      "Late-arrival window agreed with Ops",
      "Ops sign-off · none · Ops has not replied",
    ]);
  });
});
