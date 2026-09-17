// @vitest-environment jsdom
import { describe, expect, it, test, vi } from "vitest";
import { render as renderCard, within } from "@testing-library/react";
import { createRoot } from "react-dom/client";
import { act, type ReactNode } from "react";
import { agoSince, SessionRow, type Session } from "./SessionRow";

const SESSION: Session = {
  title: "Shipments missing after nightly cut",
  turns: 4,
  turnsNote: "agent asked about the backfill window",
  resolved: ["product", "components"],
  cost: 0.06,
  lastActivity: "2026-09-06T09:04:00Z",
  state: "draft",
};

function render(row: ReactNode): HTMLDivElement {
  const host = document.createElement("div");
  document.body.append(host);
  act(() => createRoot(host).render(<table><tbody>{row}</tbody></table>));
  return host;
}

test("table presentation preserves the five-cell session-list contract", () => {
  const host = render(<SessionRow session={{ ...SESSION, waitingOn: "data owner", link: { key: "DATAENG-4388", href: "#/cases/DATAENG-4388" } }} presentation="table" href="#/sessions/1" />);
  expect(host.querySelectorAll("td")).toHaveLength(5);
  expect(host.querySelector("a")?.getAttribute("href")).toBe("#/sessions/1");
  expect(host.textContent).toContain("4 turns · agent asked about the backfill window");
  expect(host.textContent).toContain("waiting on");
  expect(host.textContent).toContain("DRAFT");
  expect(host.textContent).toContain("DATAENG-4388");
});

test("table presentation keeps an absent cost cell empty", () => {
  const host = render(<SessionRow session={{ ...SESSION, cost: undefined }} presentation="table" href="#/sessions/1" />);
  expect(host.querySelectorAll("td")[2]?.textContent).toBe("");
});

test("relative activity labels preserve the established boundaries", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-06T10:04:00Z"));
  expect(agoSince("")).toBe("—");
  expect(agoSince("2026-09-06T10:03:30Z")).toBe("just now");
  expect(agoSince("2026-09-06T09:04:00Z")).toBe("1h ago");
  expect(agoSince("2026-09-05T10:04:00Z")).toBe("1d ago");
  vi.useRealTimers();
});

const CARD: Session = {
  title: "Late-arriving shipments view",
  turns: 6,
  waitingOn: "you",
  resolved: ["Stream", "Owner"],
  lastActivity: "2026-09-06T02:14:00Z",
  state: "open",
};

describe("SessionRow card presentation", () => {
  it("leaves the cost cell empty when there is no cost to show, rather than reading zero", () => {
    const { container } = renderCard(<SessionRow session={CARD} />);
    const card = within(container);
    expect(card.getByTestId("session-cost").textContent).toBe("");
    expect(card.queryByText(/\$/)).toBeNull();
  });

  it("shows a real zero as a zero", () => {
    const { container } = renderCard(<SessionRow session={{ ...CARD, cost: 0 }} />);
    expect(within(container).getByTestId("session-cost").textContent).toBe("$0.00");
  });

  it("gives each session state its own chip", () => {
    const pairs: [Session["state"], string, string][] = [
      ["open", "OPEN", "pending"],
      ["draft", "DRAFT", "running"],
      ["created", "CREATED", "done"],
      ["duplicate", "DUPLICATE", "meta"],
      ["expired", "EXPIRED", "meta"],
    ];
    for (const [state, label, role] of pairs) {
      const { container, unmount } = renderCard(<SessionRow session={{ ...CARD, state }} />);
      expect(within(container).getByText(label).getAttribute("data-ward-chip")).toBe(role);
      unmount();
    }
  });

  it("links to the item it created, and to nothing when it created none", () => {
    const { container, rerender } = renderCard(<SessionRow session={CARD} />);
    expect(within(container).queryByRole("link")).toBeNull();
    rerender(<SessionRow session={{ ...CARD, state: "created", link: { key: "FL-229", href: "/items/FL-229" } }} />);
    expect(within(container).getByRole("link", { name: "FL-229" }).getAttribute("href")).toBe("/items/FL-229");
  });

  it("is a focusable region named by its session title", () => {
    const { container } = renderCard(<SessionRow session={CARD} />);
    const region = within(container).getByRole("region", { name: "Late-arriving shipments view" });
    expect(region.getAttribute("tabindex")).toBe("0");
  });
});
