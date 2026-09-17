// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ToolRow, type Tool } from "./ToolRow";

describe("ToolRow", () => {
  it("keeps the existing callback form while allowing list presentation", () => {
    const onChange = vi.fn();
    const { container } = render(<ul><ToolRow tool={{ name: "claims.read", scope: "claims", classification: "read", grant: "available" }} onChange={onChange} presentation={{ as: "li" }} /></ul>);
    const box = screen.getByRole("checkbox") as HTMLInputElement;
    expect(box.checked).toBe(false);
    expect(container.querySelector("li.ward-toolrow")).not.toBeNull();
    fireEvent.click(box);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("leaves locked tools unchecked, disabled, marked locked, and described", () => {
    render(<ToolRow tool={{ name: "claims.write", scope: "claims", classification: "write", grant: "locked" }} onChange={() => undefined} />);
    const box = screen.getByRole("checkbox") as HTMLInputElement;
    expect(box.checked).toBe(false);
    expect(box.disabled).toBe(true);
    expect(box.closest(".ward-toolrow")?.getAttribute("data-locked")).toBe("true");
    expect((box.closest(".ward-toolrow") as HTMLElement).style.opacity).toBe("");
    expect(document.getElementById(box.getAttribute("aria-describedby") ?? "")?.textContent).toBe("locked by stream policy");
    expect(screen.getByText("WRITE").className).toContain("ward-chip--write");
    expect(screen.getByText("LOCKED").className).toContain("ward-chip--meta");
  });
});

const tool: Tool = { name: "foundry.query", scope: "dataset:shipments", classification: "read", grant: "available" };

describe("ToolRow (spec)", () => {
  it("never enables a LOCKED row", () => {
    const onChange = vi.fn();
    render(<ToolRow tool={{ ...tool, grant: "locked", reason: "Denied by stream policy FL-118." }} onChange={onChange} />);
    const box = screen.getByRole("checkbox") as HTMLInputElement;
    expect(box.disabled).toBe(true);
    fireEvent.click(box);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("says where a locked grant is decided, beside the row", () => {
    render(<ToolRow tool={{ ...tool, grant: "locked", reason: "Denied by stream policy FL-118." }} onChange={() => {}} />);
    expect(screen.getByRole("checkbox").getAttribute("aria-describedby")).toBe(
      screen.getByText("Denied by stream policy FL-118.").id,
    );
  });

  it("marks a write tool as write, not as a status", () => {
    render(<ToolRow tool={{ ...tool, classification: "write" }} onChange={() => {}} />);
    const chip = screen.getByText("WRITE");
    expect(chip.style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-write-bg)");
  });

  it("grants an available tool when asked", () => {
    const onChange = vi.fn();
    render(<ToolRow tool={tool} onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
