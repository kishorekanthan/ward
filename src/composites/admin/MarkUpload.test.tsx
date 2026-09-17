import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MarkUpload, validateMark, type ValidationResult } from "./MarkUpload";

const CLEAN = '<svg viewBox="0 0 24 24"><path fill="#00776B" d="M0 0h24v24H0z"/></svg>';

function choose(svg: string): void {
  const input = screen.getByLabelText("Mark file") as HTMLInputElement;
  fireEvent.change(input, { target: { files: [new File([svg], "mark.svg", { type: "image/svg+xml" })] } });
}

describe("validateMark", () => {
  it("accepts a clean single-fill glyph", () => {
    expect(validateMark(CLEAN)).toEqual({ ok: true, svg: CLEAN });
  });

  it("rejects unsafe and unsupported SVG content with the established reasons", () => {
    const invalid = '<svg viewBox="0 0 240 240"><path fill="#00776B"/><circle fill="#BF5310"/><image/><text>x</text><script>x</script><rect stroke-width="4"/></svg>';
    expect(validateMark(invalid)).toEqual({
      ok: false,
      reasons: ["multiple fills", "embedded rasters", "text elements", "script elements or event handlers", "a stroke under 1.5px at 22px"],
    });
  });
});

describe("MarkUpload", () => {
  it("keeps the synchronous Ward upload contract and initials action", () => {
    const onUseInitials = vi.fn();
    render(<MarkUpload onUpload={() => ({ ok: false, reasons: ["multiple fills"] })} onUseInitials={onUseInitials} />);
    choose(CLEAN);
    expect(screen.getByRole("status").textContent).toContain("multiple fills");
    fireEvent.click(screen.getByRole("button", { name: "Use initials" }));
    expect(onUseInitials).toHaveBeenCalledTimes(1);
  });
});

const REASONS = [
  "The file is not an SVG.",
  "The mark must be a single path with no embedded raster.",
  "The mark must be square within 2%.",
];

function upload(result: ValidationResult) {
  const onUpload = vi.fn(() => result);
  render(<MarkUpload onUpload={onUpload} onUseInitials={() => {}} />);
  const input = screen.getByLabelText("Mark file") as HTMLInputElement;
  fireEvent.change(input, { target: { files: [new File(["<svg/>"], "mark.svg", { type: "image/svg+xml" })] } });
  return onUpload;
}

describe("MarkUpload spec", () => {
  it("gives back the reason list verbatim, in a status region", () => {
    upload({ ok: false, reasons: REASONS });
    const status = screen.getByRole("status");
    for (const reason of REASONS) expect(within(status).getByText(reason)).not.toBeNull();
  });

  it("does not rewrite or summarise a rejection", () => {
    upload({ ok: false, reasons: [REASONS[1]] });
    const status = screen.getByRole("status");
    expect(status.textContent).toBe(REASONS[1]);
  });

  it("takes SVG only", () => {
    render(<MarkUpload onUpload={() => ({ ok: true, reasons: [] })} onUseInitials={() => {}} />);
    expect(screen.getByLabelText("Mark file").getAttribute("accept")).toBe("image/svg+xml");
  });

  it("says nothing before a file is chosen", () => {
    render(<MarkUpload onUpload={() => ({ ok: true, reasons: [] })} onUseInitials={() => {}} />);
    expect(screen.getByRole("status").textContent).toBe("");
  });

  it("hands the chosen file to the validator", () => {
    const onUpload = upload({ ok: true, reasons: [] });
    expect(onUpload).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status").textContent).toBe("Mark accepted.");
  });

  it("offers initials without a file", () => {
    const onUseInitials = vi.fn();
    render(<MarkUpload onUpload={() => ({ ok: true, reasons: [] })} onUseInitials={onUseInitials} />);
    fireEvent.click(screen.getByRole("button", { name: "Use initials" }));
    expect(onUseInitials).toHaveBeenCalledTimes(1);
  });
});
