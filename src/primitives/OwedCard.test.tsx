import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OwedCard } from "./OwedCard";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "OwedCard.module.css"), "utf8");

describe("OwedCard", () => {
  it("names the region and shows the title, the sentence and the actions", () => {
    render(<OwedCard title="Your approval is needed" sentence="The build is done." actions={<button type="button">Approve</button>} />);
    const card = screen.getByRole("region", { name: "Needs you" });
    expect(within(card).getByText("Your approval is needed").tagName).toBe("STRONG");
    expect(within(card).getByText("The build is done.")).toBeTruthy();
    expect(within(card).getByRole("button", { name: "Approve" })).toBeTruthy();
  });

  it("leaves out the action row when there is no action", () => {
    const { container } = render(<OwedCard title="Your answer is needed" sentence="Which source?" label="Owed" />);
    expect(screen.getByRole("region", { name: "Owed" })).toBeTruthy();
    expect(container.querySelectorAll("section > div")).toHaveLength(1);
  });

  it("paints the owed peach pair", () => {
    expect(css).toMatch(/\.root \{[^}]*color: var\(--ward-chip-owed-fg\);[^}]*background: var\(--ward-chip-owed-bg\);/);
  });

  it("keeps a row gap from what follows it on the page head", () => {
    expect(css).toMatch(/\.root \{[^}]*margin-block-end: var\(--ward-space-3\);/);
  });
});
