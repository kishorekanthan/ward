import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StreamAvatar, streamInitials } from "./StreamAvatar";

const avatar = (container: HTMLElement) => container.firstElementChild as HTMLElement;

describe("StreamAvatar", () => {
  it("draws two words as their first letters and one word as its first two, in upper case", () => {
    expect(["Data Engineering", "kpi config", "Integration", "  demo  ", "ops-team", "X"].map(streamInitials)).toEqual(["DE", "KC", "IN", "DE", "OT", "X"]);
  });

  it("fills a validated step with that step's chip pair and leaves any other stream neutral", () => {
    const fill = (step?: number | null) => {
      const el = avatar(render(<StreamAvatar name="Data Engineering" step={step} />).container);
      return [el.style.getPropertyValue("--stream"), el.style.getPropertyValue("--streamText")];
    };
    expect(fill(2)).toEqual(["var(--ward-stream-2-chip)", "var(--ward-stream-2-chipText)"]);
    expect([fill(), fill(null), fill(5), fill(0)]).toEqual([["", ""], ["", ""], ["", ""], ["", ""]]);
  });

  it("is hidden from assistive tech and carries its size", () => {
    const md = avatar(render(<StreamAvatar name="Integration" />).container);
    const lg = avatar(render(<StreamAvatar name="Integration" size="lg" />).container);
    expect([md.getAttribute("aria-hidden"), md.dataset.size, lg.dataset.size, md.textContent]).toEqual(["true", "md", "lg", "IN"]);
  });
});
