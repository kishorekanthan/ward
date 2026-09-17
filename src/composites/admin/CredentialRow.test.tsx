import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { CREDENTIAL_COLUMNS, CredentialRow, CredentialRowHead, type Credential, type CredentialState } from "./CredentialRow";

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

function chipClass(container: HTMLElement, label: string): string {
  const found = Array.from(container.querySelectorAll(".ward-chip")).find((el) => el.textContent === label);
  return found?.className ?? "";
}

function only(container: HTMLElement, selector: string): HTMLElement {
  const found = container.querySelector<HTMLElement>(selector);
  if (found === null) throw new Error(`missing ${selector}`);
  return found;
}

describe("CredentialRow", () => {
  it("keeps the compact Ward row: purpose first, lower-case class upper-cased and urgent next flagged by data attribute", () => {
    const { container } = inTable(
      <CredentialRow cred={{ id: "trellis-relay", purpose: "Outbox delivery", cls: "write", tier: "Manual", next: "6d", state: "rotateNow" }} />,
    );
    expect(cellTexts(container)).toEqual(["Outbox delivery", "trellis-relay", "ROTATE NOW", "WRITE", "Manual", "6d"]);
    expect(chipClass(container, "WRITE")).toContain("ward-chip--write");
    expect(chipClass(container, "ROTATE NOW")).toContain("ward-chip--failed");
    expect(only(container, "[data-urgent='true']").textContent).toBe("6d");
    expect(container.querySelector(".ward-redink")).toBeNull();
  });

  it("labels a compact IdP-owned credential with a spaced label", () => {
    const { container } = inTable(
      <CredentialRow cred={{ id: "oidc", purpose: "Client secret", cls: "identity", tier: "Short-lived", next: "with IdP", state: "idpOwned" }} />,
    );
    expect(chipClass(container, "IDP OWNED")).toContain("ward-chip--meta");
    expect(chipClass(container, "IDENTITY")).toContain("ward-chip--meta");
    expect(container.querySelector("[data-urgent]")).toBeNull();
  });

  it("renders the web row id-first with write chip and inline red ink on an overdue window", () => {
    const { container } = inTable(
      <CredentialRow
        presentation="web"
        cred={{ id: "trellis-relay", purpose: "Outbox delivery — comments, labels", cls: "JIRA WRITE", tier: "Scriptable", next: "6d", state: "rotateNow" }}
      />,
    );
    expect(cellTexts(container)).toEqual(["trellis-relay", "Outbox delivery — comments, labels", "JIRA WRITE", "Scriptable", "6d", "ROTATE NOW"]);
    expect(only(container, ".ward-toolname").textContent).toBe("trellis-relay");
    expect(only(container, ".ward-resfield-value.ward-truncate").getAttribute("title")).toBe("Outbox delivery — comments, labels");
    expect(chipClass(container, "JIRA WRITE")).toContain("ward-chip--write");
    expect(chipClass(container, "ROTATE NOW")).toContain("ward-chip--failed");
    const red = only(container, ".ward-cellmeta.ward-redink");
    expect(red.textContent).toBe("6d");
    expect(red.style.color).toBe("var(--ward-color-red)");
  });

  it.each([
    ["healthy", "HEALTHY", "ward-chip--done"],
    ["rotateSoon", "ROTATE SOON", "ward-chip--attention"],
    ["idpOwned", "IDP-OWNED", "ward-chip--meta"],
    ["configured", "CONFIGURED", "ward-chip--meta"],
  ] as const)("maps web state %s to %s without red ink", (state, label, role) => {
    const { container } = inTable(
      <CredentialRow presentation="web" cred={{ id: "trellis-watcher", purpose: "JQL polling", cls: "JIRA READ", tier: "Scriptable", next: "34d", state }} />,
    );
    expect(chipClass(container, label)).toContain(role);
    expect(chipClass(container, "JIRA READ")).toContain("ward-chip--meta");
    expect(container.querySelector(".ward-redink")).toBeNull();
    expect(Array.from(container.querySelectorAll<HTMLElement>(".ward-cellmeta")).map((el) => [el.textContent, el.style.color])).toEqual([
      ["Scriptable", ""],
      ["34d", ""],
    ]);
  });
});

const specCred: Credential = {
  id: "sp-foundry-read",
  purpose: "Foundry dataset reads",
  cls: "read",
  tier: "Platform",
  next: "in 41d",
  state: "healthy",
};

function bg(label: string) {
  return screen.getByText(label).style.getPropertyValue("--ward-chip-bg");
}

function renderState(state: CredentialState) {
  return render(
    <table>
      <tbody>
        <CredentialRow cred={{ ...specCred, state }} />
      </tbody>
    </table>,
  );
}

describe("CredentialRow spec", () => {
  it("reads a rotation past its window as a failure", () => {
    renderState("rotateNow");
    expect(bg("ROTATE NOW")).toBe("var(--ward-chip-failed-bg)");
  });

  it("holds a coming rotation on attention, never on drift orange", () => {
    renderState("rotateSoon");
    expect(bg("ROTATE SOON")).toBe("var(--ward-chip-attention-bg)");
    const chips = document.querySelectorAll("[data-ward-chip]");
    for (const chip of chips) {
      expect((chip as HTMLElement).style.getPropertyValue("--ward-chip-bg")).not.toBe("var(--ward-chip-drift-bg)");
    }
  });

  it("keeps a healthy credential done and an IdP-owned one meta", () => {
    renderState("healthy");
    expect(bg("HEALTHY")).toBe("var(--ward-chip-done-bg)");
    renderState("idpOwned");
    expect(bg("IDP OWNED")).toBe("var(--ward-chip-meta-bg)");
  });

  it("reinforces the date in red only when the rotation is due", () => {
    const { container } = renderState("rotateNow");
    expect(container.querySelector("[data-urgent='true']")?.textContent).toBe("in 41d");
    const soon = renderState("rotateSoon");
    expect(soon.container.querySelector("[data-urgent='true']")).toBeNull();
  });

  it("carries the drawn column widths", () => {
    const widths = CREDENTIAL_COLUMNS.filter((c) => c.width).map((c) => c.width);
    expect(widths).toEqual([168, 106, 112, 124, 96]);
  });

  it("drops columns right to left, never from the middle", () => {
    const dropped = CREDENTIAL_COLUMNS.map((c, i) => ({ i, p: c.dropPriority })).filter((c) => c.p !== undefined);
    const last = CREDENTIAL_COLUMNS.length - 1;
    expect(dropped.map((d) => d.i)).toEqual([last - 1, last]);
    expect(dropped.map((d) => d.p)).toEqual([2, 1]);
  });

  it("heads the table with one column header per drawn column, dropping the same ones", () => {
    const { container } = render(
      <table>
        <thead>
          <CredentialRowHead />
        </thead>
      </table>,
    );
    const heads = Array.from(container.querySelectorAll("th[scope='col']"));
    expect(heads.map((th) => th.textContent)).toEqual(["Purpose", "Credential", "State", "Class", "Tier", "Next rotation"]);
    expect(heads.map((th) => th.getAttribute("data-drop"))).toEqual([null, null, null, null, "2", "1"]);
    expect((heads[1] as HTMLElement).style.width).toBe("168px");
  });
});
