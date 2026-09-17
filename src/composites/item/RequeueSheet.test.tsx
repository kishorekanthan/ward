import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { RequeueSheet, type RequeueSheetProps } from "./RequeueSheet";

const props = {
  run: { agent: "reviewer v4", stage: "review" },
  effects: ["Keep the previous attempt readable.", "Re-evaluate all criteria."],
  refusals: [],
  cost: { spent: 0.13, more: 0.15, itemTotal: 3.7, ceiling: 25 },
  onClose: () => undefined,
};

describe("RequeueSheet", () => {
  it("passes the optional audit note through the canonical sheet action", () => {
    const onRequeue = vi.fn();
    render(<RequeueSheet {...props} onRequeue={onRequeue} />);

    fireEvent.change(screen.getByRole("textbox", { name: "Note for the agent" }), {
      target: { value: "Input changed upstream" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Requeue" }));

    expect(onRequeue).toHaveBeenCalledWith("Input changed upstream");
  });

  it("keeps refusal authorization disabled and ties it to the first reason", () => {
    const onRequeue = vi.fn();
    const reason = "A human gate cannot be requeued.";
    render(<RequeueSheet {...props} refusals={[{ reason }]} onRequeue={onRequeue} />);

    const requeue = screen.getByRole("button", { name: "Requeue" });
    expect((requeue as HTMLButtonElement).disabled).toBe(true);
    expect(document.getElementById(requeue.getAttribute("aria-describedby") ?? "")?.textContent).toBe(reason);
    fireEvent.click(requeue);
    expect(onRequeue).not.toHaveBeenCalled();
  });

  it("returns focus to the originating control after Escape closes the nested sheet", () => {
    const origin = document.createElement("button");
    origin.textContent = "Open requeue";
    document.body.appendChild(origin);
    origin.focus();

    function Harness() {
      const [open, setOpen] = useState(true);
      return open ? <RequeueSheet {...props} returnFocusTo={origin} onClose={() => setOpen(false)} /> : null;
    }

    render(<Harness />);
    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(origin);
    origin.remove();
  });

  const sourceProps: RequeueSheetProps = {
    run: { agent: "triage v2", stage: "Triage" },
    effects: ["The current draft is replaced.", "The clarification thread stays."],
    refusals: [],
    cost: { spent: 0.34, more: 0.12, itemTotal: 0.46, ceiling: 2 },
    onRequeue: () => {},
    onClose: () => {},
  };

  it("refuses the requeue and names the first reason on the button", () => {
    const onRequeue = vi.fn();
    render(<RequeueSheet {...sourceProps} onRequeue={onRequeue} refusals={[{ reason: "Write tools are frozen during the change window." }, { reason: "Ceiling reached." }]} />);
    const primary = screen.getByRole("button", { name: "Requeue" }) as HTMLButtonElement;
    expect(primary.disabled).toBe(true);
    expect(document.getElementById(primary.getAttribute("aria-describedby") ?? "")?.textContent).toBe(
      "Write tools are frozen during the change window.",
    );
    fireEvent.click(primary);
    expect(onRequeue).not.toHaveBeenCalled();
  });

  it("requeues with the note that was typed", () => {
    const onRequeue = vi.fn();
    render(<RequeueSheet {...sourceProps} onRequeue={onRequeue} />);
    fireEvent.change(screen.getByLabelText("Note for the agent"), { target: { value: "Use the agreed window." } });
    fireEvent.click(screen.getByRole("button", { name: "Requeue" }));
    expect(onRequeue).toHaveBeenCalledWith("Use the agreed window.");
  });

  it("sends no note rather than an empty one", () => {
    const onRequeue = vi.fn();
    render(<RequeueSheet {...sourceProps} onRequeue={onRequeue} />);
    fireEvent.click(screen.getByRole("button", { name: "Requeue" }));
    expect(onRequeue).toHaveBeenCalledWith(undefined);
  });

  it("is a dialog named by its title, and shows what the run will cost", () => {
    render(<RequeueSheet {...sourceProps} />);
    expect(screen.getByRole("dialog", { name: "Requeue triage v2" }).getAttribute("aria-modal")).toBe("true");
    expect(screen.getByText("This requeue adds").nextElementSibling?.textContent).toBe("$0.12");
  });

  it("closes on Escape", () => {
    const onClose = vi.fn();
    render(<RequeueSheet {...sourceProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });
});
