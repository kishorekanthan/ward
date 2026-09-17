import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { stubMatchMedia } from "../test-setup";
import { Overlay, OverlayContainerContext } from "./Overlay";

const overlayCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "Overlay.module.css"), "utf8");

function rule(css: string, selector: string): string {
  const start = css.indexOf(selector + " {");
  return start === -1 ? "" : css.slice(start, css.indexOf("}", start));
}

afterEach(() => {
  stubMatchMedia(false);
  document.querySelectorAll("[data-overlay-test-fixture]").forEach((element) => element.remove());
});

type HarnessProps = { kind: "drawer" | "sheet" | "modal"; returnFocusTo?: HTMLElement | null; container?: HTMLElement | null };

function Harness({ kind, returnFocusTo, container }: HarnessProps) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        open
      </button>
      {open && (
        <Overlay kind={kind} labelledBy="dlg-title" onClose={() => setOpen(false)} returnFocusTo={returnFocusTo} container={container}>
          <h2 id="dlg-title">Item drawer</h2>
          <a href="#body">a link</a>
          <button type="button">save</button>
        </Overlay>
      )}
    </>
  );
}

function StackHarness({ nestedKind }: { nestedKind: "sheet" | "modal" }) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [nestedOpen, setNestedOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setDrawerOpen(true)}>
        launch drawer
      </button>
      {drawerOpen && (
        <Overlay kind="drawer" labelledBy="drawer-title" onClose={() => setDrawerOpen(false)}>
          <h2 id="drawer-title">Parent drawer</h2>
          <button type="button" onClick={() => setNestedOpen(true)}>
            open nested
          </button>
          <button type="button">drawer action</button>
          {nestedOpen && (
            <Overlay kind={nestedKind} labelledBy="nested-title" onClose={() => setNestedOpen(false)}>
              <h2 id="nested-title">Nested overlay</h2>
              <button type="button">nested action</button>
            </Overlay>
          )}
        </Overlay>
      )}
    </>
  );
}

describe("Overlay", () => {
  it("renders a dialog into a portal with aria-modal and labelledBy", () => {
    render(<Harness kind="drawer" />);
    const dlg = screen.getByRole("dialog");
    expect(dlg.getAttribute("aria-modal")).toBe("true");
    expect(dlg.getAttribute("aria-labelledby")).toBe("dlg-title");
  });

  it("moves focus to the close control on open", () => {
    render(<Harness kind="drawer" />);
    expect(document.activeElement?.getAttribute("aria-label")).toBe("Close");
  });

  it("closes on Escape", () => {
    render(<Harness kind="drawer" />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("stays open on panel click and closes on scrim click", () => {
    render(<Harness kind="drawer" />);
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.getByRole("dialog")).toBeDefined();
    fireEvent.click(screen.getByRole("dialog").parentElement!);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("sets inert on the background and removes it on close", () => {
    const { container } = render(<Harness kind="drawer" />);
    const app = container.querySelector("button")!.parentElement!;
    expect(app.hasAttribute("inert")).toBe(true);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(app.hasAttribute("inert")).toBe(false);
  });

  it("returns focus to returnFocusTo on close", () => {
    const trigger = document.createElement("button");
    trigger.textContent = "origin";
    document.body.appendChild(trigger);
    render(<Harness kind="drawer" returnFocusTo={trigger} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  it("traps Tab inside the panel", () => {
    render(<Harness kind="drawer" />);
    const panel = screen.getByRole("dialog");
    screen.getByText("save").focus();
    fireEvent.keyDown(panel, { key: "Tab" });
    expect(document.activeElement?.getAttribute("aria-label")).toBe("Close");
  });

  it("keeps drawer and nested sheet portals operable while focus belongs to the sheet", () => {
    const { container } = render(<StackHarness nestedKind="sheet" />);
    const trigger = screen.getByRole("button", { name: "open nested" });
    trigger.focus();
    fireEvent.click(trigger);

    const drawer = screen.getByRole("dialog", { name: "Parent drawer" });
    const nested = screen.getByRole("dialog", { name: "Nested overlay" });
    const roots = document.querySelectorAll<HTMLElement>("[data-ward-overlay-root]");
    expect(roots).toHaveLength(2);
    expect(Array.from(roots, (root) => root.hasAttribute("inert"))).toEqual([false, false]);
    expect(container.hasAttribute("inert")).toBe(true);
    expect(document.activeElement).toBe(within(nested).getByRole("button", { name: "Close" }));

    fireEvent.click(within(drawer).getByRole("button", { name: "Close" }));
    expect(screen.getAllByRole("dialog")).toHaveLength(2);
    const nestedAction = within(nested).getByRole("button", { name: "nested action" });
    nestedAction.focus();
    fireEvent.keyDown(nested, { key: "Tab" });
    expect(document.activeElement).toBe(within(nested).getByRole("button", { name: "Close" }));

    const drawerAction = within(drawer).getByRole("button", { name: "drawer action" });
    drawerAction.focus();
    fireEvent.keyDown(drawer, { key: "Tab" });
    expect(document.activeElement).toBe(drawerAction);
  });

  it("unwinds a nested responsive modal before its drawer and restores inert ownership", () => {
    const alreadyInert = document.createElement("aside");
    alreadyInert.setAttribute("data-overlay-test-fixture", "");
    alreadyInert.setAttribute("inert", "");
    document.body.appendChild(alreadyInert);
    const { container } = render(<StackHarness nestedKind="modal" />);
    const trigger = screen.getByRole("button", { name: "open nested" });
    trigger.focus();
    fireEvent.click(trigger);

    const nested = screen.getByRole("dialog", { name: "Nested overlay" });
    expect(nested.parentElement?.getAttribute("data-ward-overlay-kind")).toBe("sheet");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Nested overlay" })).toBeNull();
    expect(screen.getByRole("dialog", { name: "Parent drawer" })).toBeDefined();
    expect(document.activeElement).toBe(trigger);
    expect(container.hasAttribute("inert")).toBe(true);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(container.hasAttribute("inert")).toBe(false);
    expect(alreadyInert.hasAttribute("inert")).toBe(true);
  });

  it("renders a modal as a reachable sheet below 768px", () => {
    stubMatchMedia(false);
    render(<Harness kind="modal" />);
    const dialog = screen.getByRole("dialog", { name: "Item drawer" });
    const overlay = dialog.parentElement!;

    expect(overlay.getAttribute("data-ward-overlay-kind")).toBe("sheet");
  });

  it("applies inert only alongside the small-screen dialog", () => {
    stubMatchMedia(false);
    const { container } = render(<Harness kind="modal" />);
    const app = container;

    expect(screen.getByRole("dialog")).toBeDefined();
    expect(app.hasAttribute("inert")).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(app.hasAttribute("inert")).toBe(false);
  });

  it("moves focus into the small-screen dialog", () => {
    stubMatchMedia(false);
    render(<Harness kind="modal" />);

    expect(document.activeElement?.getAttribute("aria-label")).toBe("Close");
  });

  it("keeps the dialog reachable while resizing across 768px", () => {
    const media = stubMatchMedia(false);
    const { container } = render(<Harness kind="modal" />);
    const app = container;
    const overlay = screen.getByRole("dialog").parentElement!;

    act(() => media.setMatches(true));
    expect(screen.getByRole("dialog")).toBeDefined();
    expect(overlay.getAttribute("data-ward-overlay-kind")).toBe("modal");
    expect(app.hasAttribute("inert")).toBe(true);
    expect(document.activeElement?.getAttribute("aria-label")).toBe("Close");

    act(() => media.setMatches(false));
    expect(screen.getByRole("dialog")).toBeDefined();
    expect(overlay.getAttribute("data-ward-overlay-kind")).toBe("sheet");
    expect(app.hasAttribute("inert")).toBe(true);
    expect(document.activeElement?.getAttribute("aria-label")).toBe("Close");
  });

  it("renders a centered modal at 768px and above", () => {
    stubMatchMedia(true);
    render(<Harness kind="modal" />);
    const overlay = screen.getByRole("dialog").parentElement!;
    expect(overlay.getAttribute("data-ward-overlay-kind")).toBe("modal");
  });

  it("sheet kind renders at every width", () => {
    stubMatchMedia(false);
    render(<Harness kind="sheet" />);
    expect(screen.getByRole("dialog")).toBeDefined();
  });

  it("portals into a given container and scopes inert to that container", () => {
    const wrapper = document.createElement("div");
    const target = document.createElement("div");
    const decoy = document.createElement("div");
    wrapper.setAttribute("data-overlay-test-fixture", "");
    target.appendChild(decoy);
    wrapper.appendChild(target);
    document.body.appendChild(wrapper);

    render(<Harness kind="drawer" container={target} />);

    expect(screen.getByRole("dialog").parentElement!.parentElement).toBe(target);
    expect(decoy.hasAttribute("inert")).toBe(true);
    // The ancestor holding the overlay must stay reachable, or the overlay itself goes inert.
    expect(wrapper.hasAttribute("inert")).toBe(false);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(decoy.hasAttribute("inert")).toBe(false);
  });

  it("takes its portal target from context when no container prop is given", () => {
    const host = document.createElement("section");
    host.setAttribute("data-overlay-test-fixture", "");
    document.body.appendChild(host);

    render(
      <OverlayContainerContext.Provider value={host}>
        <Harness kind="sheet" />
      </OverlayContainerContext.Provider>,
    );

    expect(screen.getByRole("dialog").parentElement!.parentElement).toBe(host);
  });

  it("draws a titled header that names the dialog, so the caller need not supply labelledBy", () => {
    render(
      <Overlay kind="drawer" title="New stream" onClose={() => {}}>
        <p>body</p>
      </Overlay>,
    );

    const dlg = screen.getByRole("dialog");
    const heading = within(dlg).getByRole("heading", { level: 2 });
    expect(heading.textContent).toBe("New stream");
    expect(dlg.getAttribute("aria-labelledby")).toBe(heading.id);
    expect(heading.id).not.toBe("");
    expect(dlg.querySelector(".ward-drawer-body")?.textContent).toBe("body");
  });

  it("pads an untitled overlay's content and starts it below the close button", () => {
    render(
      <Overlay kind="drawer" labelledBy="own-title" onClose={() => {}}>
        <h2 id="own-title">Own title</h2>
      </Overlay>,
    );

    const body = screen.getByRole("dialog").querySelector("[data-untitled]");
    expect(body?.textContent).toBe("Own title");
    expect(body?.className).toContain("ward-drawer-body");
    expect(rule(overlayCss, ".close")).toContain("top: var(--ward-space-3)");
    expect(rule(overlayCss, ".close")).toContain("height: var(--ward-height-control)");
    expect(rule(overlayCss, ".body[data-untitled]")).toContain("padding-top: calc(var(--ward-space-3) + var(--ward-height-control))");
  });

  it("widens a modal to the overlayWide token only when wide is asked for", () => {
    const { rerender } = render(
      <Overlay kind="sheet" label="Plain" onClose={() => {}}>
        <p>body</p>
      </Overlay>,
    );
    const plain = screen.getByRole("dialog");
    expect(plain.hasAttribute("data-wide")).toBe(false);
    expect(plain.className).not.toContain("ward-overlay-panel--wide");

    rerender(
      <Overlay kind="sheet" label="Wide" wide onClose={() => {}}>
        <p>body</p>
      </Overlay>,
    );
    const wide = screen.getByRole("dialog");
    expect(wide.getAttribute("data-wide")).toBe("true");
    expect(wide.className).toContain("ward-overlay-panel--wide");
    expect(rule(overlayCss, '.panel[data-wide="true"]')).toContain("var(--ward-width-overlayWide)");
  });
});
