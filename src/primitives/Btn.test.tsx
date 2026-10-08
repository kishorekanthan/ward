import { fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { injectModuleCss } from "../test-css";
import { Btn } from "./Btn";
import s from "./Btn.module.css";

const here = dirname(fileURLToPath(import.meta.url));
const wardCss = readFileSync(join(here, "..", "ward.css"), "utf8");
// jsdom leaves var() unresolved, so each theme's block in ward.css supplies the value.
function themeVar(selector: string, name: string): string | undefined {
  const start = wardCss.indexOf(`${selector} {`);
  const block = wardCss.slice(start, wardCss.indexOf("}", start));
  return new RegExp(`${name}: ([^;]+);`).exec(block)?.[1];
}
const THEMES = { light: ":root", dark: '[data-theme="dark"]' } as const;
function resolved(value: string, theme: keyof typeof THEMES): string {
  return value.replace(/var\((--ward-[\w-]+)\)/g, (whole, name: string) => themeVar(THEMES[theme], name) ?? whole);
}

describe("Btn", () => {
  it("refuses a disabled action that does not state its condition", () => {
    // @ts-expect-error describedBy is type-required when disabled; this proves the runtime guard too
    expect(() => render(<Btn disabled>Publish</Btn>)).toThrow(/must name its reason/);
  });

  it("points a disabled action at its reason and keeps its label", () => {
    render(
      <>
        <Btn disabled describedBy="why">Publish</Btn>
        <p id="why">dry run in progress</p>
      </>,
    );
    const btn = screen.getByRole("button", { name: "Publish" });
    expect((btn as HTMLButtonElement).disabled).toBe(true);
    expect(btn.getAttribute("aria-describedby")).toBe("why");
    expect(btn.textContent).toBe("Publish");
  });

  it("states its own disabled reason as a description and a tooltip", () => {
    render(<Btn disabled disabledReason="A dry run has to pass first">Publish</Btn>);
    const btn = screen.getByRole("button", { name: "Publish" });
    const reason = document.getElementById(btn.getAttribute("aria-describedby") ?? "");
    expect(reason?.textContent).toBe("A dry run has to pass first");
    expect(reason?.className).toBe("ward-visually-hidden");
    expect(btn.getAttribute("title")).toBe("A dry run has to pass first");
    expect(btn.textContent).toBe("Publish");
  });

  it("keeps a page reason alongside its own", () => {
    render(
      <>
        <Btn disabled describedBy="why" disabledReason="Viewers cannot publish">Publish</Btn>
        <p id="why">dry run in progress</p>
      </>,
    );
    const ids = screen.getByRole("button").getAttribute("aria-describedby")?.split(" ") ?? [];
    expect(ids.map((id) => document.getElementById(id)?.textContent)).toEqual(["dry run in progress", "Viewers cannot publish"]);
  });

  it("says nothing about a reason while enabled", () => {
    const { container } = render(<Btn disabledReason="A dry run has to pass first">Publish</Btn>);
    const btn = screen.getByRole("button", { name: "Publish" });
    expect(btn.hasAttribute("title")).toBe(false);
    expect(btn.hasAttribute("aria-describedby")).toBe(false);
    expect(container.children).toHaveLength(1);
    expect(container.textContent).toBe("Publish");
  });

  it("keeps only the page description while enabled", () => {
    render(<Btn describedBy="hint" disabledReason="A dry run has to pass first">Publish</Btn>);
    const btn = screen.getByRole("button", { name: "Publish" });
    expect(btn.getAttribute("aria-describedby")).toBe("hint");
    expect(btn.hasAttribute("title")).toBe(false);
  });

  it("points each disabled button at its own reason", () => {
    render(
      <>
        <Btn disabled disabledReason="Viewers cannot publish">Publish</Btn>
        <Btn disabled disabledReason="Nothing to archive">Archive</Btn>
      </>,
    );
    const reasonOf = (name: string) =>
      document.getElementById(screen.getByRole("button", { name }).getAttribute("aria-describedby") ?? "")?.textContent;
    expect([reasonOf("Publish"), reasonOf("Archive")]).toEqual(["Viewers cannot publish", "Nothing to archive"]);
  });

  it("names the overflow button and declares its menu", () => {
    render(<Btn variant="overflow">···</Btn>);
    const btn = screen.getByRole("button", { name: "More actions" });
    expect(btn.getAttribute("aria-haspopup")).toBe("menu");
  });

  it("does not fire when disabled", () => {
    const onClick = vi.fn();
    render(<Btn disabled describedBy="why" onClick={onClick}>Publish</Btn>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("fills a destructive action with the destructive colour, which is not the warning colour, in both themes", () => {
    const removeCss = injectModuleCss(join(here, "Btn.module.css"), s);
    render(<Btn variant="destructive">Override and advance</Btn>);
    const fill = getComputedStyle(screen.getByRole("button", { name: "Override and advance" })).backgroundColor;
    removeCss();
    expect([resolved(fill, "light"), resolved(fill, "dark")]).toEqual(["#8A3040", "#DC99A5"]);
    expect([resolved("var(--ward-color-waiting)", "light"), resolved("var(--ward-color-waiting)", "dark")]).toEqual(["#7A5D14", "#E6D5A9"]);
  });
});
