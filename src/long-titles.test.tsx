import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkCard } from "./composites/board/WorkCard";
import w from "./composites/board/WorkCard.module.css";
import type { BoardItem } from "./composites/board/types";
import { SessionRow, type Session } from "./composites/intake/SessionRow";
import { PageHeader } from "./primitives/PageHeader";
import c from "./primitives/ClampText.module.css";

const src = dirname(fileURLToPath(import.meta.url));
const TITLE = "Reconcile late-arriving inbound shipments against the carrier's manifest before the nightly warehouse cut-off has closed";
const OWNER = "Alexandra Whitfield-Montgomery Okafor-Li";

// The clamped element holding exactly this text, with the tooltip that shows it whole.
function clamped(root: HTMLElement, text: string): HTMLElement {
  const el = Array.from(root.querySelectorAll<HTMLElement>("[data-ward-clamp]")).find((node) => node.textContent === text);
  if (!el) throw new Error(`no clamped element reads "${text}"`);
  expect(el.classList.contains(c.clamp)).toBe(true);
  return el;
}

const item: BoardItem = {
  key: "FL-229",
  title: TITLE,
  stage: "triage",
  timeInStage: 93_600_000,
  waitsOn: OWNER,
  streamStep: 1,
  changedAt: "2026-09-06T02:14:00Z",
  state: { role: "attention", label: "Needs a human" },
};

const session: Session = { title: TITLE, turns: 6, waitingOn: OWNER, resolved: ["Stream"], lastActivity: "2026-09-06T02:14:00Z", state: "open" };

describe("long titles and owners keep their full text: titles wrap to two lines (#199), card meta wraps whole (#227)", () => {
  it("uses a 120-character title and a 40-character owner", () => {
    expect([TITLE.length, OWNER.length]).toEqual([120, 40]);
  });

  it("clamps the WorkCard title, keeps the owner whole in a meta line that is never clamped, and names the card's button with the whole title", () => {
    const { container } = render(<WorkCard item={item} onOpen={() => {}} />);
    const title = clamped(container, TITLE);
    expect([title.tagName, title.classList.contains(w.title), title.getAttribute("title")]).toEqual(["P", true, TITLE]);
    const meta = container.querySelector("[data-ward-card-meta]") as HTMLElement;
    expect([meta.textContent, meta.querySelector("[data-ward-clamp]")]).toEqual([`waits on ${OWNER}\u00a0· 1d 2h in stage`, null]);
    expect(screen.getByRole("button", { name: `FL-229 ${TITLE}` })).not.toBeNull();
  });

  it("clamps the SessionRow card title and owner, and names the row with the whole title", () => {
    const { container } = render(<SessionRow session={session} />);
    expect(clamped(container, TITLE).getAttribute("title")).toBe(TITLE);
    expect(clamped(container, OWNER).getAttribute("title")).toBe(OWNER);
    expect(screen.getByRole("region", { name: TITLE })).not.toBeNull();
  });

  it("clamps the SessionRow table title and owner, and names the link with the whole title", () => {
    const { container } = render(<table><tbody><SessionRow session={session} presentation="table" href="/intake/sessions/7" /></tbody></table>);
    const link = screen.getByRole("link", { name: TITLE });
    expect(clamped(link, TITLE).getAttribute("title")).toBe(TITLE);
    expect(clamped(container, `waiting on ${OWNER}`)).not.toBeNull();
  });

  it("clamps the case file title, names the heading with the whole title and wraps the owner line", () => {
    render(<PageHeader density="record" crumb={[{ label: "data-eng", href: "/streams/data-eng" }, { label: "FL-229" }]} title={TITLE} consequence={`Owner ${OWNER}`} />);
    const heading = screen.getByRole("heading", { level: 1, name: TITLE });
    expect([heading.hasAttribute("data-ward-clamp"), heading.getAttribute("title")]).toEqual([true, TITLE]);
    expect(within(heading.parentElement as HTMLElement).getByText(`Owner ${OWNER}`).tagName).toBe("P");
    const css = readFileSync(join(src, "primitives", "PageHeader.module.css"), "utf8");
    expect(css.slice(css.indexOf(".consequence {"), css.indexOf("}", css.indexOf(".consequence {")))).toContain("overflow-wrap: anywhere");
  });

  it("leaves a page title unclamped, so an asset id still wraps whole at phone width (#190)", () => {
    render(<PageHeader crumb={[{ label: "Signals" }]} title={TITLE} />);
    expect(screen.getByRole("heading", { level: 1, name: TITLE }).hasAttribute("data-ward-clamp")).toBe(false);
  });
});
