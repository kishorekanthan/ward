// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("lastInputWasKey", () => {
  let lastInputWasKey: () => boolean;
  beforeEach(async () => {
    vi.resetModules();
    ({ lastInputWasKey } = await import("./inputModality"));
  });

  it("is off before any input, so a deep-linked dialog opens quietly", () => {
    expect(lastInputWasKey()).toBe(false);
  });

  it("follows the last key or pointer press and ignores shortcut chords", () => {
    const seen: boolean[] = [];
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    seen.push(lastInputWasKey());
    document.dispatchEvent(new Event("pointerdown"));
    seen.push(lastInputWasKey());
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
    seen.push(lastInputWasKey());
    expect(seen).toEqual([true, false, false]);
  });
});
