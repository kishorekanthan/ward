import { describe, expect, it } from "vitest";
import { streamChipProps, streamColour } from "./streamColour";

describe("streamColour", () => {
  it("paints validated steps in their own colour and everything else neutral", () => {
    expect([1, 2, 3].map((step) => streamColour(step, "id"))).toEqual(["var(--ward-stream-1-id)", "var(--ward-stream-2-id)", "var(--ward-stream-3-id)"]);
    expect(streamColour(2, "chip")).toBe("var(--ward-stream-2-chip)");
    expect([null, undefined, 0, 4, 5, 6, 2.5].map((step) => streamColour(step, "id"))).toEqual(Array(7).fill("var(--ward-color-line2)"));
    expect(streamColour(4, "chip")).toBe("var(--ward-color-line2)");
  });

  it("gives a validated step a stream chip and any other step a meta chip with the same label", () => {
    expect(streamChipProps("DE", 1)).toEqual({ role: "stream", label: "DE", streamStep: 1 });
    expect(streamChipProps("KPI", 4)).toEqual({ role: "meta", label: "KPI" });
    expect(streamChipProps("KPI", null)).toEqual({ role: "meta", label: "KPI" });
  });
});
