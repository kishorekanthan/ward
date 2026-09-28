import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResolveBlock, type ResolvePath } from "./ResolveBlock";

const paths: ResolvePath[] = [
  { kind: "clarify", consequence: "The agent waits for your answer, then continues.", requiredRole: "MEMBER", allowed: true },
  {
    kind: "override",
    consequence: "The item advances without the gate.",
    requiredRole: "APPROVER",
    allowed: false,
    askInstead: "Ask J. Rao to approve this override.",
  },
];

describe("ResolveBlock", () => {
  it("keeps a path you may not take on screen, greyed, and says who to ask", () => {
    render(<ResolveBlock paths={paths} onChoose={() => {}} />);
    const path = screen.getByText("The item advances without the gate.").closest("li");
    expect(path).not.toBeNull();
    expect(path?.getAttribute("data-allowed")).toBe("false");
    const button = screen.getAllByRole("button", { name: "Override and advance" })[0] as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(document.getElementById(button.getAttribute("aria-describedby") ?? "")?.textContent).toBe(
      "Ask J. Rao to approve this override.",
    );
  });

  it("never fires the choice it just refused", () => {
    const onChoose = vi.fn();
    render(<ResolveBlock paths={paths} onChoose={onChoose} />);
    fireEvent.click(screen.getByRole("button", { name: "Override and advance" }));
    expect(onChoose).not.toHaveBeenCalled();
  });

  it("refuses a disallowed path that names nobody to ask", () => {
    const orphan: ResolvePath = { kind: "requeue", consequence: "Runs again.", requiredRole: "APPROVER", allowed: false };
    expect(() => render(<ResolveBlock paths={[orphan]} onChoose={() => {}} />)).toThrow(/askInstead is required/);
  });

  it("draws only the first path primary, even when a later one is refused", () => {
    const refused: ResolvePath = { ...paths[1], kind: "requeue", askInstead: "Ask J. Rao to requeue." };
    render(<ResolveBlock paths={[...paths, refused]} onChoose={() => {}} />);
    const variants = screen.getAllByRole("button").map((button) => [button.textContent, button.getAttribute("data-ward-btn")]);
    expect(variants).toEqual([
      ["Ask a clarifying question", "primary"],
      ["Override and advance", "secondary"],
      ["Requeue the agent", "secondary"],
    ]);
  });

  it("keeps a refused first path primary", () => {
    render(<ResolveBlock paths={[paths[1]]} onChoose={() => {}} />);
    expect(screen.getByRole("button", { name: "Override and advance" }).getAttribute("data-ward-btn")).toBe("primary");
  });

  it("takes an allowed path", () => {
    const onChoose = vi.fn();
    render(<ResolveBlock paths={paths} onChoose={onChoose} />);
    fireEvent.click(screen.getByRole("button", { name: "Ask a clarifying question" }));
    expect(onChoose).toHaveBeenCalledWith("clarify");
  });
});
