import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GateLadder, type Rung } from "./GateLadder";

const rungs: Rung[] = [
  { name: "Criteria met", state: "passed", actor: "triage v2" },
  { name: "DPM sign-off", state: "waiting", actor: "J. Rao" },
  { name: "Build", state: "pending" },
];

describe("GateLadder", () => {
  it("marks a wait as attention and names who it waits on", () => {
    render(<GateLadder rungs={rungs} />);
    const chip = screen.getByText("WAITING");
    expect(chip.getAttribute("data-ward-chip")).toBe("attention");
    expect(screen.getByText("J. Rao")).not.toBeNull();
  });

  it("refuses a wait with nobody at the other end", () => {
    expect(() => render(<GateLadder rungs={[{ name: "DPM sign-off", state: "waiting" }]} />)).toThrow(/names no actor/);
  });

  it("keeps passed and pending on their own chips", () => {
    render(<GateLadder rungs={rungs} />);
    expect(screen.getByText("PASSED").getAttribute("data-ward-chip")).toBe("done");
    expect(screen.getByText("PENDING").getAttribute("data-ward-chip")).toBe("pending");
  });

  it("is an ordered list of rungs", () => {
    render(<GateLadder rungs={rungs} />);
    expect(screen.getByRole("list").tagName).toBe("OL");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});
