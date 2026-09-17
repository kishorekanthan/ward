import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("paints from the role's own token trio", () => {
    render(<Chip role="attention" label="ON HOLD" />);
    const el = screen.getByText("ON HOLD");
    expect(el.style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-attention-bg)");
    expect(el.style.getPropertyValue("--ward-chip-fg")).toBe("var(--ward-chip-attention-fg)");
    expect(el.style.getPropertyValue("--ward-chip-line")).toBe("var(--ward-chip-attention-line)");
  });

  it("takes a stream fill only from the stream chip vars, never the identity value", () => {
    render(<Chip role="stream" label="DATA-ENG" streamStep={1} />);
    const el = screen.getByText("DATA-ENG");
    expect(el.style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-stream-1-chip)");
    expect(el.style.getPropertyValue("--ward-chip-fg")).toBe("var(--ward-stream-1-chipText)");
    expect(el.style.getPropertyValue("--ward-chip-bg")).not.toBe("var(--ward-stream-1-id)");
  });

  it("refuses a stream step with no measured dark pair", () => {
    expect(() => render(<Chip role="stream" label="FOUR" streamStep={4} />)).toThrow(/not validated/);
  });

  it("refuses a stream colour on a status role — two meanings are two chips", () => {
    expect(() => render(<Chip role="done" label="PASSED" streamStep={1} />)).toThrow(/only valid when role is 'stream'/);
  });

  it("refuses a wordless chip", () => {
    expect(() => render(<Chip role="meta" label="" />)).toThrow(/label is required/);
  });
});
