import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { ComponentRow, restartLabel, type ComponentState, type DeployComponent } from "./ComponentRow";

function inTable(row: ReactElement) {
  return render(
    <table>
      <tbody>{row}</tbody>
    </table>,
  );
}

function cellTexts(container: HTMLElement): Array<string | null> {
  return Array.from(container.querySelectorAll("td")).map((td) => td.textContent);
}

describe("ComponentRow", () => {
  it("keeps the compact Ward row: counted pods, note cell and a blocked drain-first restart", () => {
    const onRestart = vi.fn();
    const { container } = inTable(<ComponentRow component={{ name: "worker", pods: 4, note: "6 stages leased", state: "drainFirst" }} onRestart={onRestart} />);
    expect(cellTexts(container)).toEqual(["worker", "4 pods", "DRAIN FIRST", "6 stages leased", "Restart"]);
    const button = screen.getByRole("button", { name: "Restart" });
    expect(button.hasAttribute("disabled")).toBe(true);
    expect(document.getElementById(button.getAttribute("aria-describedby") ?? "")?.textContent).toBe("6 stages leased");
    fireEvent.click(button);
    expect(onRestart).not.toHaveBeenCalled();
  });

  it("restarts a compact restart-due component by name", () => {
    const onRestart = vi.fn();
    inTable(<ComponentRow component={{ name: "relay", pods: 1, note: "secret synced", state: "restartDue" }} onRestart={onRestart} />);
    fireEvent.click(screen.getByRole("button", { name: "Restart" }));
    expect(onRestart).toHaveBeenCalledWith("relay");
  });

  it("renders the web row as four cells with pods and note joined and an actionable drain restart", () => {
    const onRestart = vi.fn();
    const { container } = inTable(
      <ComponentRow presentation="web" component={{ name: "worker", pods: "4 pods", note: "6 stages leased", state: "drainFirst" }} onRestart={onRestart} />,
    );
    expect(cellTexts(container)).toEqual(["worker", "4 pods · 6 stages leased", "DRAIN FIRST", "Drain & restart"]);
    expect(container.querySelector(".ward-toolname")?.textContent).toBe("worker");
    const meta = container.querySelector(".ward-cellmeta.ward-truncate");
    expect(meta?.getAttribute("title")).toBe("6 stages leased");
    expect(screen.getByText("DRAIN FIRST").className).toContain("ward-chip--attention");
    const button = screen.getByRole("button", { name: "Drain & restart" });
    expect(button.hasAttribute("disabled")).toBe(false);
    expect(button.className).toContain("ward-btn--sm");
    fireEvent.click(button);
    expect(onRestart).toHaveBeenCalledWith("worker");
  });

  it("omits the web restart button when no handler is wired", () => {
    const { container } = inTable(<ComponentRow presentation="web" component={{ name: "api", pods: "2 pods", note: "up 9d", state: "ready" }} />);
    expect(cellTexts(container)).toEqual(["api", "2 pods · up 9d", "READY", ""]);
    expect(container.querySelector("button")).toBeNull();
    expect(screen.getByText("READY").className).toContain("ward-chip--done");
  });

  it("labels restarts by state", () => {
    expect([restartLabel("ready"), restartLabel("drainFirst"), restartLabel("restartDue")]).toEqual(["Restart", "Drain & restart", "Restart"]);
  });
});

const specComponent: DeployComponent = {
  name: "relay-worker",
  pods: 6,
  note: "Drain the queue before restarting; in-flight deliveries are lost otherwise.",
  state: "ready",
};

function renderState(state: ComponentState, onRestart = () => {}) {
  return render(
    <table>
      <tbody>
        <ComponentRow component={{ ...specComponent, state }} onRestart={onRestart} />
      </tbody>
    </table>,
  );
}

describe("ComponentRow spec", () => {
  it("holds a drain-first component on attention, never on drift orange", () => {
    renderState("drainFirst");
    const chip = screen.getByText("DRAIN FIRST");
    expect(chip.style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-attention-bg)");
    expect(chip.style.getPropertyValue("--ward-chip-bg")).not.toBe("var(--ward-chip-drift-bg)");
  });

  it("refuses a restart that must be drained first, and says why on the button", () => {
    const onRestart = vi.fn();
    renderState("drainFirst", onRestart);
    const btn = screen.getByRole("button", { name: "Restart" }) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(document.getElementById(btn.getAttribute("aria-describedby") ?? "")?.textContent).toBe(specComponent.note);
    fireEvent.click(btn);
    expect(onRestart).not.toHaveBeenCalled();
  });

  it("reads a due restart as a failure and a ready one as done", () => {
    renderState("restartDue");
    expect(screen.getByText("RESTART DUE").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-failed-bg)");
    renderState("ready");
    expect(screen.getByText("READY").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-done-bg)");
  });

  it("restarts a ready component when asked", () => {
    const onRestart = vi.fn();
    renderState("ready", onRestart);
    fireEvent.click(screen.getByRole("button", { name: "Restart" }));
    expect(onRestart).toHaveBeenCalledWith("relay-worker");
  });
});
