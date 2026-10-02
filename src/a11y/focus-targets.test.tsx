import { render } from "@testing-library/react";
import { Links } from "./FocusTargets.stories";

// Tab links are full-height controls, so they need no band; the probe still checks their 24px reach.
// jsdom has no layout, so the 24px band itself is read in Chromium by scripts/focus-targets.mjs; this pins which links carry it.
// A linked stat cell is touch-tall on its own (the probe's touch fact), so it takes no band; nor does a small Btn (26px).
describe("small links take the 24px target", () => {
  it("gives every link and link-like button in the story the ward-target band", () => {
    const { container } = render(Links.render());
    const targets = Array.from(container.querySelectorAll("a, button"));
    expect(targets.map((el) => [el.textContent?.trim(), el.classList.contains("ward-target")])).toEqual([
      ["Studio", true],
      ["data-eng", true],
      ["Regulatory Ops", true],
      ["ledger", true],
      ["Late-arriving shipments view", true],
      ["→ FL-229", true],
      ["intake-advisor", true],
      ["+ Mount agent", false],
      ["Configure board", true],
      ["Skip to content", true],
      ["Board", true],
      ["Intake", true],
      ["14In flight", false],
      ["0Failed runs 24h", false],
      ["2Items waiting at a gate", false],
      ["5Done", false],
      ["Tool registry", true],
      ["Prompt library", true],
      ["Streams", false],
      ["Gates", false],
      ["Audit", false],
      // The ConfigRow handle and its Switch centre their own 24px hit box; the probe reads it both ways.
      ["⠿", false],
      ["", false],
    ]);
  });
});
