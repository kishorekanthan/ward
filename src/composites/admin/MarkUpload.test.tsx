import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
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

const SVG_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">';
const BYPASSES = [
  '<a xlink:href="javascript:alert(document.domain)"><rect/></a>',
  '<a href="javascript:alert(1)"><rect/></a>',
  '<style>@import url("https://attacker.example/x.css")</style>',
  '<use href="https://attacker.example/x.svg#p"/>',
  '<feImage href="https://attacker.example/t.png"/>',
];
const FURTHER_REFERENCES = [
  '<linearGradient id="g" href="https://attacker.example/g.svg#x"/>',
  '<linearGradient id="g" xlink:href="https://attacker.example/g.svg#x"/>',
  '<rect fill="url(https://attacker.example/p.svg#g)"/>',
  '<rect style="fill:url(https://attacker.example/p.svg#g)"/>',
  '<rect mask="u\\72l(https://attacker.example/m.svg#m)"/>',
  '<rect fill="u\\72l(https://attacker.example/p.svg#g)"/>',
  '<rect mask="image-set(\'https://attacker.example/m.png\' 1x)"/>',
  '<animate attributeName="fill" to="red"/>',
  '<set attributeName="fill" to="red"/>',
];
// Entity-expanding parsers (Gecko's expat) build <rect onclick> from this; the source never spells "onclick=".
const ENTITY_HANDLER = '<!DOCTYPE svg [<!ENTITY r "<rect o&#110;click=\'alert(1)\'/>">]><svg viewBox="0 0 24 24">&r;</svg>';
const EXPANDED_HANDLER = '<svg viewBox="0 0 24 24"><rect onclick="alert(1)"/></svg>';

describe("validateMark sanitiser", () => {
  afterEach(() => vi.unstubAllGlobals());

  it.each(BYPASSES)("rejects %s as a link or external reference", (inner) => {
    expect(validateMark(`${SVG_OPEN}${inner}</svg>`)).toEqual({ ok: false, reasons: ["links or external references"] });
  });

  it.each(FURTHER_REFERENCES)("rejects %s as a link or external reference", (inner) => {
    expect(validateMark(`${SVG_OPEN}${inner}</svg>`)).toEqual({ ok: false, reasons: ["links or external references"] });
  });

  it("keeps a quoted fill that points at a gradient inside the mark", () => {
    const quoted = '<svg viewBox="0 0 24 24"><defs><linearGradient id="g"><stop offset="0" stop-color="#00776B"/></linearGradient></defs><path fill="url(\'#g\')" d="M0 0h24v24H0z"/></svg>';
    expect(validateMark(quoted)).toEqual({ ok: true, svg: quoted });
  });

  it("keeps a fill that points at a gradient inside the mark", () => {
    const gradient = '<svg viewBox="0 0 24 24"><defs><linearGradient id="g"><stop offset="0" stop-color="#00776B"/></linearGradient></defs><path fill="url(#g)" d="M0 0h24v24H0z"/></svg>';
    expect(validateMark(gradient)).toEqual({ ok: true, svg: gradient });
  });

  it("judges handlers on the parsed tree, not the source text", () => {
    const RealParser = DOMParser;
    vi.stubGlobal("DOMParser", class {
      parseFromString(source: string, type: DOMParserSupportedType) {
        return new RealParser().parseFromString(source === ENTITY_HANDLER ? EXPANDED_HANDLER : source, type);
      }
    });
    expect(validateMark(ENTITY_HANDLER)).toEqual({ ok: false, reasons: ["script elements or event handlers"] });
  });

  it("treats an svg root outside the SVG namespace as invalid", () => {
    expect(validateMark('<svg xmlns="urn:not-svg" viewBox="0 0 24 24"><path fill="#00776B" d="M0 0h24v24H0z"/></svg>')).toEqual({ ok: false, reasons: ["embedded rasters"] });
  });

  it("returns the allow-listed tree serialised, not the uploaded source", () => {
    const stray = '<svg viewBox="0 0 24 24"><!-- editor --><metadata>x</metadata><path fill="#00776B" data-x="1" d="M0 0h24v24H0z"/></svg>';
    expect(validateMark(stray)).toEqual({ ok: true, svg: '<svg viewBox="0 0 24 24"><path fill="#00776B" d="M0 0h24v24H0z"/></svg>' });
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
