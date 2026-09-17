import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DeliveryHealth, type DeliveryRow } from "./DeliveryHealth";

const rows: DeliveryRow[] = [
  { label: "Cards delivered", n: 4182 },
  { label: "Cards failed", n: 12, failed: true, cause: "Teams webhook rejected the payload (413)" },
];

describe("DeliveryHealth", () => {
  it("names the cause on a failed row, and marks the row failed", () => {
    render(<DeliveryHealth rows={rows} />);
    const row = screen.getByText("Teams webhook rejected the payload (413)").closest("li");
    expect(row?.getAttribute("data-failed")).toBe("true");
  });

  it("refuses a failure with no cause", () => {
    expect(() => render(<DeliveryHealth rows={[{ label: "Cards failed", n: 12, failed: true }]} />)).toThrow(/names no cause/);
  });

  it("leaves a healthy row unmarked and uncaused", () => {
    render(<DeliveryHealth rows={rows} />);
    const row = screen.getByText("Cards delivered").closest("li");
    expect(row?.getAttribute("data-failed")).toBeNull();
    expect(row?.textContent).toBe("Cards delivered4,182");
  });

  it("names each marker state, so red against green is not the only signal", () => {
    render(<DeliveryHealth rows={rows} />);
    expect(screen.getByLabelText("ok").className).toContain("ward-marker--green");
    expect(screen.getByLabelText("failed").className).toContain("ward-marker--red");
  });

  it("lets a consumer with its own numeric-text contract opt out of count formatting", () => {
    render(<DeliveryHealth rows={rows} formatNumber={String} />);
    const row = screen.getByText("Cards delivered").closest("li");
    expect(row?.querySelector(".ward-stat-value")?.textContent).toBe("4182");
  });
});
