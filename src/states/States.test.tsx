import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { borders, edge, injectModuleCss, leftBorders } from "../test-css";
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
