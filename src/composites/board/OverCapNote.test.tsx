import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OverCapNote } from "./OverCapNote";

describe("OverCapNote", () => {
  it("keeps the drawn sentence and substitutes only the numbers", () => {
    render(<OverCapNote label="Waiting on us" count={7} cap={6} />);
    expect(screen.getByRole("status").textContent).toBe("Waiting on us is over cap now — 7 items against 6");
  });

  it("carries the sentence, not colour alone", () => {
    render(<OverCapNote label="Extracting" count={9} cap={8} />);
    expect(screen.getByRole("status").textContent).toContain("over cap now");
  });
});
