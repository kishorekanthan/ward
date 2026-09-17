import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useReturnFocus } from "./useReturnFocus";

function Gate({ open, target, useGetter }: { open: boolean; target: HTMLElement | null; useGetter?: boolean }) {
  useReturnFocus(useGetter ? () => target : target, open);
  return open ? <div role="dialog">overlay</div> : null;
}

describe("useReturnFocus", () => {
  it("restores focus to the return element when it unmounts", () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    const { unmount } = render(<Gate open target={trigger} />);
    unmount();
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  it("accepts a getter for the return element", () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    const { unmount } = render(<Gate open target={trigger} useGetter />);
    unmount();
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  it("falls back to the element focused at mount when no target is given", () => {
    const fallbackTarget = document.createElement("button");
    document.body.appendChild(fallbackTarget);
    fallbackTarget.focus();
    const { unmount } = render(<Gate open target={null} />);
    unmount();
    expect(document.activeElement).toBe(fallbackTarget);
    fallbackTarget.remove();
  });

  it("returns focus when active flips false, without waiting for unmount", () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    const { rerender } = render(<Gate open target={trigger} />);
    rerender(<Gate open={false} target={trigger} />);
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });
});
