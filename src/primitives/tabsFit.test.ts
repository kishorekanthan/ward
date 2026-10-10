import { describe, expect, it } from "vitest";
import { shownTabs } from "./tabsFit";

describe("shownTabs", () => {
  it("shows every tab when they fill the room exactly, gaps included", () => {
    // 50 + 8 + 70 + 8 + 60 = 196.
    expect(shownTabs({ room: 196, widths: [50, 70, 60], more: 40, gap: 8 }, 0)).toEqual([0, 1, 2]);
  });

  it("stops at the first tab that does not fit, so a narrower later tab still waits in More", () => {
    // Selected 50 + gap 8 + More 40 = 98; Tab 1 brings 176 > 160, and Tab 2 at 30 would have fit.
    expect(shownTabs({ room: 160, widths: [50, 70, 30, 40], more: 40, gap: 8 }, 0)).toEqual([0]);
  });

  it("keeps the selected tab even when only it and More fit", () => {
    expect(shownTabs({ room: 100, widths: [60, 60, 60], more: 40, gap: 0 }, 2)).toEqual([2]);
  });
});
