// @vitest-environment jsdom
import { readFileSync } from "node:fs";
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
    expect(screen.getByText("Write").className).toContain("ward-chip--write");
    expect(screen.getByText("Locked").className).toContain("ward-chip--meta");
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
    const chip = screen.getByText("Write");
    expect(chip.style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-write-bg)");
  });

  it("grants an available tool when asked", () => {
    const onChange = vi.fn();
    render(<ToolRow tool={tool} onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

const css = readFileSync("src/composites/studio/ToolRow.module.css", "utf8");
const nameRule = /\.name\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";

describe("ToolRow names (#35)", () => {
  it("keeps a tool name too wide for the minimum column in the story", () => {
    const story = readFileSync("src/composites/studio/ToolRow.stories.tsx", "utf8");
    const name = /export const LongName\s*=\s*\{[\s\S]*?name:\s*"([^"]+)"/.exec(story)?.[1] ?? "";
    expect(name.length).toBeGreaterThan(25);
  });

  it("gives the name the comp's width as a minimum, never a fixed width or an ellipsis", () => {
    expect(nameRule).toMatch(/min-width:\s*var\(--ward-width-toolName\)/);
    expect(nameRule).not.toMatch(/(^|[\s;])width:/);
    expect(nameRule).not.toMatch(/text-overflow|overflow:\s*hidden|white-space:\s*nowrap/);
  });

  it("wraps a name too long for the row instead of overflowing it", () => {
    expect(nameRule).toMatch(/overflow-wrap:\s*anywhere/);
  });

  it("labels the checkbox with the whole of a long name", () => {
    const name = "foundry_actions.lookup_catalogue_entries";
    render(<ToolRow tool={{ ...tool, name }} onChange={() => {}} />);
    expect(screen.getByRole("checkbox", { name }).id).toBe(screen.getByText(name).getAttribute("for"));
  });
});
