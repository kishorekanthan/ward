import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BoardFootnote } from "./BoardFootnote";

describe("BoardFootnote", () => {
  it("states where the board's columns come from, as the comp footer does", () => {
    render(<BoardFootnote />);
    expect(screen.getByRole("contentinfo").textContent).toBe(
      "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it.",
    );
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("links to the board config after the note when given a target", () => {
    render(<BoardFootnote configureHref="#/studio/streams/ledger" />);
    const link = screen.getByRole("link", { name: "Configure board" });
    expect(link.getAttribute("href")).toBe("#/studio/streams/ledger");
    expect(link.previousElementSibling?.tagName).toBe("P");
  });
});
