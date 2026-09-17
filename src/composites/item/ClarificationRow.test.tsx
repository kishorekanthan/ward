import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ClarificationRow, type Clarification } from "./ClarificationRow";

const queued = {
  author: "P. Nayar",
  body: "The type change is upstream and intentional.",
  delivery: "queued" as const,
  etaOrAttempt: "delivers in ~40s",
};

describe("ClarificationRow", () => {
  it("keeps queued delivery actionable and exposes its state in the DOM", () => {
    const onEdit = vi.fn();
    const onWithdraw = vi.fn();
    render(<ClarificationRow comment={queued} onEdit={onEdit} onWithdraw={onWithdraw} />);

    expect(screen.getByText("QUEUED")).toBeDefined();
    expect(screen.getByText("The type change is upstream and intentional.")).toBeDefined();
    expect(screen.getByText("delivers in ~40s")).toBeDefined();
    expect(screen.getByText("QUEUED").closest("[data-delivery]")?.getAttribute("data-queued")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.click(screen.getByRole("button", { name: "Withdraw" }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onWithdraw).toHaveBeenCalledTimes(1);
  });

  it("blocks edits during retrying delivery and describes why", () => {
    const onCancelDelivery = vi.fn();
    render(
      <ClarificationRow
        comment={{ ...queued, delivery: "retrying", etaOrAttempt: "attempt 3 of 5 · next in 2m" }}
        onEdit={() => undefined}
        onCancelDelivery={onCancelDelivery}
      />,
    );

    const edit = screen.getByRole("button", { name: "Edit" });
    expect((edit as HTMLButtonElement).disabled).toBe(true);
    expect(document.getElementById(edit.getAttribute("aria-describedby") ?? "")?.textContent).toContain(
      "Edit is unavailable mid-flight",
    );
    fireEvent.click(screen.getByRole("button", { name: "Cancel delivery" }));
    expect(onCancelDelivery).toHaveBeenCalledTimes(1);
  });

  it("keeps delivered metadata and only offers the original when one exists", () => {
    render(
      <ClarificationRow
        comment={{ ...queued, delivery: "delivered", editedAt: "2m ago", originalId: "c-1" }}
        onEdit={() => undefined}
        onViewOriginal={() => undefined}
      />,
    );

    expect(screen.getByText("edited 2m ago")).toBeDefined();
    expect(screen.getByRole("button", { name: "View original" })).toBeDefined();
  });

  it("shows the comment with a disabled Edit when the deployment exposes no edit route", () => {
    render(
      <ClarificationRow
        comment={{ ...queued, delivery: "delivered" }}
        unavailable="Editing needs a relay edit route, which this deployment does not expose."
      />,
    );

    expect(screen.getByText("The type change is upstream and intentional.")).toBeDefined();
    expect(screen.queryByRole("button", { name: "Withdraw" })).toBeNull();
    const edit = screen.getByRole("button", { name: "Edit" });
    expect((edit as HTMLButtonElement).disabled).toBe(true);
    expect(document.getElementById(edit.getAttribute("aria-describedby") ?? "")?.textContent).toBe(
      "Editing needs a relay edit route, which this deployment does not expose.",
    );
  });

  it("refuses to render an editable comment that names no edit handler", () => {
    expect(() => render(<ClarificationRow comment={queued} />)).toThrowError(
      /must say why editing is unavailable/,
    );
  });

  const comment: Clarification = {
    author: "M. Chen",
    body: "Which window counts as late — 24h or the agreed SLA?",
    delivery: "queued",
    etaOrAttempt: "sends in 2m",
  };
  const noop = { onEdit: () => {}, onWithdraw: () => {}, onCancelDelivery: () => {} };

  it("makes editing the primary act while the comment is still queued", () => {
    render(<ClarificationRow comment={comment} {...noop} />);
    expect(screen.getByText("Edit").className).toMatch(/_primary_/);
    expect(screen.getByText("QUEUED").getAttribute("data-ward-chip")).toBe("running");
  });

  it("demotes editing once delivered, and offers the original", () => {
    render(<ClarificationRow comment={{ ...comment, delivery: "delivered", originalId: "c-11" }} {...noop} />);
    expect(screen.getByText("Edit").className).toMatch(/_ghost_/);
    expect(screen.getByText("View original")).not.toBeNull();
    expect(screen.getByText("DELIVERED").getAttribute("data-ward-chip")).toBe("done");
  });

  // Reason copy is design/Trellis Board Item.dc.html:125, which the target renders; the source wrote its own.
  it("closes editing while a delivery is retrying, and says why", () => {
    const onEdit = vi.fn();
    render(<ClarificationRow comment={{ ...comment, delivery: "retrying", etaOrAttempt: "attempt 2 of 5" }} {...noop} onEdit={onEdit} />);
    const edit = screen.getByText("Edit") as HTMLButtonElement;
    expect(edit.disabled).toBe(true);
    expect(document.getElementById(edit.getAttribute("aria-describedby") ?? "")?.textContent).toBe(
      "Edit is unavailable mid-flight: a delivery may already have reached Jira. Cancel first, then edit.",
    );
    fireEvent.click(edit);
    expect(onEdit).not.toHaveBeenCalled();
    expect(screen.getByText("RETRYING").getAttribute("data-ward-chip")).toBe("attention");
  });

  it("lets a retrying delivery be called off", () => {
    const onCancelDelivery = vi.fn();
    render(<ClarificationRow comment={{ ...comment, delivery: "retrying" }} {...noop} onCancelDelivery={onCancelDelivery} />);
    fireEvent.click(screen.getByText("Cancel delivery"));
    expect(onCancelDelivery).toHaveBeenCalled();
  });

  it("marks a failed delivery as failed, not as attention", () => {
    render(<ClarificationRow comment={{ ...comment, delivery: "failed", etaOrAttempt: "gave up after 5 attempts" }} {...noop} />);
    expect(screen.getByText("FAILED").getAttribute("data-ward-chip")).toBe("failed");
    expect(screen.queryByText("Cancel delivery")).toBeNull();
  });

  it("offers a failed delivery a secondary edit and a withdraw", () => {
    const onWithdraw = vi.fn();
    render(<ClarificationRow comment={{ ...comment, delivery: "failed" }} {...noop} onWithdraw={onWithdraw} />);
    expect(screen.getByText("Edit").className).toMatch(/_secondary_/);
    fireEvent.click(screen.getByRole("button", { name: "Withdraw" }));
    expect(onWithdraw).toHaveBeenCalledTimes(1);
  });
});
