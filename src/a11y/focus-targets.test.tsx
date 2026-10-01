import { render } from "@testing-library/react";
import { Links } from "./FocusTargets.stories";

// jsdom has no layout, so the 24px band itself is read in Chromium by scripts/focus-targets.mjs; this pins which links carry it.
// A linked stat cell is touch-tall on its own (the probe's touch fact), so it takes no band.
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
      ["+ Mount agent", true],
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
    ]);
  });
});
