import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { mediaSplit, ruleBody, ruleBodyIn } from "../test-css";
import { CopyValue } from "./CopyValue";

const css = "src/primitives/CopyValue.module.css";
const token = "scim_7Hq2v9KxR4mWn8Lp3Tz6Yb1Cd5Fg0Jk2Ns4Uw7Xa9Ze3Qr6Vt8Hm1Pb5Lc0Dy";

function withClipboard(clipboard: unknown) {
  Object.defineProperty(navigator, "clipboard", { value: clipboard, configurable: true });
}

async function tapCopy() {
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
  });
}

afterEach(() => {
  withClipboard(undefined);
  window.getSelection()?.removeAllRanges();
});

describe("CopyValue", () => {
  it("names the group by its label and shows the label and the value", () => {
    render(<CopyValue label="Redirect address" value="https://trellis.example.com/" />);
    const group = screen.getByRole("group", { name: "Redirect address" });
    expect(group.querySelector("code")?.textContent).toBe("https://trellis.example.com/");
    expect(group.textContent).toContain("Redirect address");
    expect(screen.getByRole("status").textContent).toBe("");
  });

  it("shows the value in the mono face and the Copy button as secondary and small", () => {
    render(<CopyValue label="Token" value={token} />);
    const button = screen.getByRole("button", { name: "Copy" });
    expect(button.classList.contains("ward-btn--secondary")).toBe(true);
    expect(button.classList.contains("ward-btn--sm")).toBe(true);
    expect(ruleBody(css, ".value")).toContain("font: var(--ward-type-monoId)");
  });

  it("writes exactly the value to the clipboard and says it was copied", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    withClipboard({ writeText });
    render(<CopyValue label="Token" value={token} />);
    await tapCopy();
    expect(writeText).toHaveBeenCalledWith(token);
    expect(screen.getByRole("status").textContent).toBe("Copied.");
    expect(window.getSelection()?.toString()).toBe("");
  });

  it("selects the value when the clipboard refuses", async () => {
    withClipboard({ writeText: vi.fn().mockRejectedValue(new Error("denied")) });
    render(<><p>Earlier text</p><CopyValue label="Token" value={token} /></>);
    window.getSelection()?.selectAllChildren(screen.getByText("Earlier text"));
    await tapCopy();
    expect(screen.getByRole("status").textContent).toBe("Select it to copy it.");
    expect(window.getSelection()?.toString()).toBe(token);
  });

  it("selects the value when the browser has no clipboard", async () => {
    render(<CopyValue label="Token" value={token} />);
    await tapCopy();
    expect(screen.getByRole("status").textContent).toBe("Select it to copy it.");
    expect(window.getSelection()?.toString()).toBe(token);
  });
});

describe("CopyValue layout", () => {
  it("wraps a long value inside its column and hides an empty note", () => {
    expect(ruleBody(css, ".value")).toContain("min-width: 0;\noverflow-wrap: anywhere");
    expect(ruleBody(css, ".root")).toContain("grid-template-columns: minmax(0, 12rem) minmax(0, 1fr) auto");
    expect(ruleBody(css, ".note:empty")).toBe("display: none");
    expect(ruleBody(css, ".label")).toBe("color: var(--ward-color-muted)");
    expect(ruleBody(css, ".root")).toContain("gap: var(--ward-space-2) var(--ward-space-3);\nalign-items: center;\npadding-block: var(--ward-space-2)");
  });

  it("puts the label on its own row at phone width", () => {
    const { inside } = mediaSplit(css, "(max-width: 767.98px)");
    expect(ruleBodyIn(inside, ".root")).toBe("grid-template-columns: minmax(0, 1fr) auto");
    expect(ruleBodyIn(inside, ".label,\n  .note")).toBe("grid-column: 1 / -1");
  });
});
