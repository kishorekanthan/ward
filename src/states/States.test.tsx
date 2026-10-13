import { readFileSync } from "node:fs";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { borders, edge, injectModuleCss, leftBorders, ruleBody } from "../test-css";
import { DeniedState, EmptyState, FilteredEmpty, LoadFailed, StaleStrip, WriteUnavailableStrip } from "./States";
import s from "./states.module.css";

describe("empty-state card class", () => {
  it("marks only EmptyState with .ward-emptystate, so a page can count its empty cards", () => {
    const { container } = render(
      <>
        <EmptyState sentence="No description in Jira yet." />
        <DeniedState sentence="Only stream admins see this." />
        <FilteredEmpty sentence="Nothing matches." total={4} />
      </>,
    );
    const cards = container.querySelectorAll(".ward-emptystate");
    expect(cards).toHaveLength(1);
    expect(cards[0].textContent).toBe("No description in Jira yet.");
  });
});

describe("state tones", () => {
  it("marks a load failure as failed, an empty state as untoned", () => {
    render(
      <>
        <EmptyState sentence="No items in this stage." />
        <LoadFailed sentence="The board could not be reached." at="2026-09-06T02:14:00Z" onRetry={() => {}} />
      </>,
    );
    expect(screen.getByRole("status").hasAttribute("data-tone")).toBe(false);
    expect(screen.getByRole("alert").getAttribute("data-tone")).toBe("failed");
  });

  it("tones a stale snapshot as a warning and unwritten changes as a failure", () => {
    render(
      <>
        <StaleStrip lastReachableAt="2026-09-06T02:14:00Z" snapshotAt="2026-09-06T02:13:00Z" />
        <WriteUnavailableStrip queued={2} since="2026-09-06T02:14:00Z" />
      </>,
    );
    expect(screen.getByRole("status").getAttribute("data-tone")).toBe("warn");
    expect(screen.getByRole("alert").getAttribute("data-tone")).toBe("failed");
  });

  it("wraps the action so it sits on its own line below the sentence", () => {
    render(<EmptyState sentence="No items yet." action={{ label: "Load an item", onClick: () => {} }} />);
    expect(screen.getByRole("button", { name: "Load an item" }).parentElement?.tagName).toBe("SPAN");
  });
});

describe("state blocks take their holder's ground (#248)", () => {
  it("draws no frame or fill on any state block, whatever rule draws them", () => {
    const removeCss = injectModuleCss("src/states/states.module.css", s);
    render(
      <>
        <EmptyState sentence="Nothing here yet." />
        <FilteredEmpty sentence="No match." total={4} />
        <DeniedState sentence="You cannot see this." />
        <LoadFailed sentence="Board did not load." at="2026-10-08T09:00:00Z" onRetry={() => {}} />
      </>,
    );
    const blocks = ["Nothing here yet.", "No match.", "You cannot see this.", "Board did not load."].map((text) => screen.getByText(text).parentElement!);
    const frames = blocks.map((block) => ({ ...edge(block), border: getComputedStyle(block).getPropertyValue("border-style") }));
    const inks = ["Board did not load.", "Nothing here yet."].map((text) => getComputedStyle(screen.getByText(text)).getPropertyValue("color"));
    removeCss();
    expect(frames).toEqual(Array(4).fill({ shadow: "", ground: "", border: "none" }));
    expect(inks).toEqual(["var(--ward-color-danger)", "var(--ward-color-text)"]);
    expect(borders("src/states/states.module.css")).toEqual([]);
    expect(readFileSync("src/states/states.module.css", "utf8")).not.toMatch(/outline/);
    expect(leftBorders("src/states/states.module.css")).toEqual([]);
  });
});

describe("DeniedState says who to ask and offers ways on (#290)", () => {
  const ways = [{ label: "Open My work", onClick: vi.fn() }, { label: "Open Payments", onClick: vi.fn() }];

  it("sets the ask clause in bold after the sentence, in the same paragraph", () => {
    render(<DeniedState sentence="You need the StreamAdmin role on Payments." ask="Ask S. Rao." />);
    const ask = screen.getByText("Ask S. Rao.");
    expect(ask.tagName).toBe("STRONG");
    expect(ask.parentElement?.textContent).toBe("You need the StreamAdmin role on Payments. Ask S. Rao.");
  });

  it("sets nothing in bold without an ask", () => {
    const { container } = render(<DeniedState sentence="You cannot see this." ask="" />);
    expect(container.querySelector("strong")).toBeNull();
  });

  it("keeps the plain denied state's markup when no ways are given", () => {
    const { container } = render(<DeniedState sentence="You cannot see this." ways={[]} />);
    expect(container.querySelector(".ward-state-ways")).toBeNull();
    expect(container.firstElementChild?.childElementCount).toBe(1);
  });

  it("renders one secondary button per way, in order, each calling its own handler", () => {
    render(<DeniedState sentence="You cannot see this." ways={ways} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.map((b) => b.textContent)).toEqual(["Open My work", "Open Payments"]);
    expect(buttons.every((b) => b.classList.contains("ward-btn--secondary"))).toBe(true);
    fireEvent.click(buttons[1]);
    expect(ways[1].onClick).toHaveBeenCalledTimes(1);
    expect(ways[0].onClick).not.toHaveBeenCalled();
  });

  it("stays a normal state: no tone, no Retry", () => {
    render(<DeniedState sentence="You cannot see this." ask="Ask S. Rao." ways={ways} />);
    expect(screen.getByRole("status").hasAttribute("data-tone")).toBe(false);
    expect(screen.queryByRole("button", { name: "Retry" })).toBeNull();
  });

  it("stacks the ways full width below 768px and wraps them in a row above", () => {
    const css = readFileSync("src/states/states.module.css", "utf8");
    expect(ruleBody("src/states/states.module.css", ".ways")).toMatch(/display: flex;[\s\S]*flex-wrap: wrap;/);
    expect(css).toMatch(/@media \(max-width: 767\.98px\) \{\s*\.ways > \* \{\s*width: 100%;/);
  });
});
