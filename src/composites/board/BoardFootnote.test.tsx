import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BoardFootnote } from "./BoardFootnote";

describe("BoardFootnote", () => {
  it("says filters are not saved, with no link when there is no board config to open", () => {
    render(<BoardFootnote />);
    expect(screen.getByRole("contentinfo").textContent).toBe("Filters you set are not saved.");
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("follows the note with the link to the board config", () => {
    render(<BoardFootnote configureHref="#/studio/streams/ledger" />);
    const link = screen.getByRole("link", { name: "Configure board" });
    expect(link.getAttribute("href")).toBe("#/studio/streams/ledger");
    expect(screen.getByRole("contentinfo").textContent).toBe("Filters you set are not saved.Configure board");
  });
});
