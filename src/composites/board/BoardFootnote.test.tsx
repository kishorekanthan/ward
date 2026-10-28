import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BoardFootnote } from "./BoardFootnote";

describe("BoardFootnote", () => {
  it("draws nothing when there is no board config to link to", () => {
    const { container } = render(<BoardFootnote />);
    expect(container.innerHTML).toBe("");
  });

  it("carries only the link to the board config, with no note explaining the board", () => {
    render(<BoardFootnote configureHref="#/studio/streams/ledger" />);
    const link = screen.getByRole("link", { name: "Configure board" });
    expect(link.getAttribute("href")).toBe("#/studio/streams/ledger");
    expect(screen.getByRole("contentinfo").textContent).toBe("Configure board");
  });
});
