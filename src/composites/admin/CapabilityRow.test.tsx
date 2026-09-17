import { fireEvent, render, screen, within } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { CapabilityRow, type Capability, type CapabilityCell } from "./CapabilityRow";

const capability = { name: "Agents may run", consequence: "Master switch.", governedBy: "platform admin", ticket: "T-015" };

function inTable(row: ReactElement) {
  return render(
    <table>
      <tbody>{row}</tbody>
    </table>,
  );
}

describe("CapabilityRow", () => {
  it("keeps the compact Ward row: stream labels, row header, checked pilot and boolean changes", () => {
    const onChange = vi.fn();
    const { container } = inTable(
      <CapabilityRow
        capability={capability}
        cells={[
          { streamStep: 1, stream: "Data", value: "off" },
          { streamStep: 2, stream: "Design", value: "pilot" },
          { streamStep: 3, stream: "Ops", value: "byRole" },
        ]}
        onChange={onChange}
      />,
    );
    const head = container.querySelector("th[scope='row']");
    expect(head?.textContent).toBe("Agents may runMaster switch.governed by platform admin · T-015");
    expect(container.querySelectorAll("td")).toHaveLength(3);
    expect(screen.getByRole("switch", { name: "Agents may run — Design" }).getAttribute("aria-checked")).toBe("true");
    fireEvent.click(screen.getByRole("switch", { name: "Agents may run — Data" }));
    expect(onChange).toHaveBeenCalledWith(1, true);
  });

  it("renders the web row as name, one cell per step and a governed-by column", () => {
    const { container } = inTable(
      <CapabilityRow
        presentation="web"
        capability={capability}
        cells={[
          { streamStep: 1, value: "on" },
          { streamStep: 2, value: "pilot" },
          { streamStep: 3, value: "byRole" },
        ]}
      />,
    );
    const cells = Array.from(container.querySelectorAll("td")).map((td) => td.textContent);
    expect(cells).toEqual(["Agents may runMaster switch.", "Agents may run — step 1", "PILOTAgents may run — step 2", "by role", "platform admin · T-015"]);
    expect(container.querySelector("th")).toBeNull();
    expect(container.querySelector(".ward-cellmeta")?.textContent).toBe("platform admin · T-015");
  });

  it("disables web switches without onChange and leaves the pilot switch unchecked", () => {
    inTable(<CapabilityRow presentation="web" capability={capability} cells={[{ streamStep: 1, value: "on" }, { streamStep: 2, value: "pilot" }]} />);
    const on = screen.getByRole("switch", { name: "Agents may run — step 1" });
    const pilot = screen.getByRole("switch", { name: "Agents may run — step 2" });
    expect(on.hasAttribute("disabled")).toBe(true);
    expect(on.getAttribute("aria-checked")).toBe("true");
    expect(pilot.getAttribute("aria-checked")).toBe("false");
    expect(screen.getByText("PILOT").className).toContain("ward-chip--running");
  });

  it("omits the ticket suffix and sends on/off words for web changes", () => {
    const onChange = vi.fn();
    const { container } = inTable(
      <CapabilityRow
        presentation="web"
        capability={{ name: "Dry run only", consequence: "Relay commits nothing.", governedBy: "stream admin" }}
        cells={[{ streamStep: 2, value: "off" }, { streamStep: 3, value: "on" }]}
        onChange={onChange}
      />,
    );
    expect(container.querySelector(".ward-cellmeta")?.textContent).toBe("stream admin");
    fireEvent.click(screen.getByRole("switch", { name: "Dry run only — step 2" }));
    fireEvent.click(screen.getByRole("switch", { name: "Dry run only — step 3" }));
    expect(onChange.mock.calls).toEqual([[2, "on"], [3, "off"]]);
  });
});

const specCapability: Capability = {
  name: "Card buttons respect role",
  consequence: "A viewer sees the button and is refused on click when this is off.",
  governedBy: "role matrix",
  ticket: "PLT-118",
};

const specCells: CapabilityCell[] = [
  { streamStep: 1, stream: "Data engineering", value: "on" },
  { streamStep: 2, stream: "Finance", value: "pilot" },
  { streamStep: 3, stream: "Legal", value: "byRole" },
];

function renderRow(onChange = () => {}) {
  return render(
    <table>
      <tbody>
        <CapabilityRow capability={specCapability} cells={specCells} onChange={onChange} />
      </tbody>
    </table>,
  );
}

describe("CapabilityRow spec", () => {
  it("asks nothing twice: a capability the role decides has no switch of its own", () => {
    const onChange = vi.fn();
    const { container } = renderRow(onChange);
    const byRole = container.querySelectorAll("td")[2];
    expect(within(byRole as HTMLElement).queryByRole("switch")).toBeNull();
    expect(byRole.textContent).toBe("by role");
    fireEvent.click(byRole);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("keeps one switch per governed stream, never one per cell", () => {
    renderRow();
    expect(screen.getAllByRole("switch")).toHaveLength(2);
  });

  it("names each switch by capability and stream", () => {
    renderRow();
    expect(screen.getByRole("switch", { name: "Card buttons respect role — Data engineering" })).not.toBeNull();
  });

  it("shows a pilot as on plus the pilot chip", () => {
    renderRow();
    expect(screen.getByRole("switch", { name: "Card buttons respect role — Finance" }).getAttribute("aria-checked")).toBe("true");
    expect(screen.getByText("PILOT").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-running-bg)");
  });

  it("reports the stream it was changed for", () => {
    const onChange = vi.fn();
    renderRow(onChange);
    fireEvent.click(screen.getByRole("switch", { name: "Card buttons respect role — Data engineering" }));
    expect(onChange).toHaveBeenCalledWith(1, false);
  });

  it("says where the capability is decided", () => {
    renderRow();
    expect(screen.getByText("governed by role matrix · PLT-118")).not.toBeNull();
  });
});
