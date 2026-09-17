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

  it("takes an allowed path", () => {
    const onChoose = vi.fn();
    render(<ResolveBlock paths={paths} onChoose={onChoose} />);
    fireEvent.click(screen.getByRole("button", { name: "Ask a clarifying question" }));
    expect(onChoose).toHaveBeenCalledWith("clarify");
  });
});
