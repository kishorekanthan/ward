import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Visible, VisibilityProvider, useVisible } from "./Visible";

function Probe({ id }: { id: string }) {
  return <span>{`${id}:${useVisible(id) ? "shown" : "hidden"}`}</span>;
}

describe("Visible", () => {
  it("hides only the listed ids and renders the fallback in their place", () => {
    render(
      <VisibilityProvider hidden={["usage.tokens"]}>
        <Visible id="usage.costs"><span>cost $0.42</span></Visible>
        <Visible id="usage.tokens" fallback={<span>tokens withheld</span>}><span>120,000 tokens</span></Visible>
        <Probe id="board.trace" />
      </VisibilityProvider>,
    );
    expect(screen.getByText("cost $0.42")).toBeDefined();
    expect(screen.queryByText("120,000 tokens")).toBeNull();
    expect(screen.getByText("tokens withheld")).toBeDefined();
    expect(screen.getByText("board.trace:shown")).toBeDefined();
  });

  it("shows everything when no provider is mounted", () => {
    render(
      <>
        <Visible id="usage.tokens"><span>120,000 tokens</span></Visible>
        <Probe id="usage.costs" />
      </>,
    );
    expect(screen.getByText("120,000 tokens")).toBeDefined();
    expect(screen.getByText("usage.costs:shown")).toBeDefined();
  });

  it("renders nothing for a hidden id without a fallback", () => {
    const { container } = render(
      <VisibilityProvider hidden={["usage.costs"]}>
        <Visible id="usage.costs">cost $0.42</Visible>
      </VisibilityProvider>,
    );
    expect(container.textContent).toBe("");
  });
});
