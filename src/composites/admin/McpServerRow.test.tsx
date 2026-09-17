import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { MCP_SERVER_COLUMNS, McpServerRow, McpServerRowHead, mcpConnectionChip, mcpToolName, type McpConnection, type McpServer } from "./McpServerRow";

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

function buttonLabels(container: HTMLElement): Array<string | null> {
  return Array.from(container.querySelectorAll("button")).map((b) => b.textContent);
}

describe("McpServerRow compact", () => {
  it("keeps the Ward row: name with class chip and pin line, connection, transport, credential, qualified tools", () => {
    const { container } = inTable(
      <McpServerRow
        server={{ name: "jira", transport: "http", credentialId: "trellis-relay", tools: ["comment", "label"], cls: "write", pinned: "v1.9.0", connection: "degraded" }}
      />,
    );
    expect(cellTexts(container)).toEqual(["jiraWRITEpinned v1.9.0", "DEGRADED", "http", "trellis-relay", "mcp.jira.comment · mcp.jira.label"]);
    expect(chipClass(container, "WRITE")).toContain("ward-chip--write");
    expect(chipClass(container, "DEGRADED")).toContain("ward-chip--attention");
    expect(container.querySelector("button")).toBeNull();
  });

  it("omits the pin line for an unpinned read server", () => {
    const { container } = inTable(
      <McpServerRow server={{ name: "foundry", transport: "stdio", credentialId: "trellis-mcp", tools: [], cls: "read", connection: "failed" }} />,
    );
    expect(cellTexts(container)[0]).toBe("foundryREAD");
    expect(chipClass(container, "READ")).toContain("ward-chip--meta");
    expect(chipClass(container, "FAILED")).toContain("ward-chip--failed");
    expect(container.textContent).not.toContain("unpinned");
  });
});

describe("McpServerRow web presentation", () => {
  it("renders six cells with transport line, discovered count, write class and pinned version", () => {
    const { container } = inTable(
      <McpServerRow
        presentation="web"
        server={{
          name: "jira",
          transport: "http",
          credential_id: "trellis-relay",
          pinned_version: "v1.9.0",
          connection: "healthy",
          tools: [{ tool: "comment", write_class: true }, { tool: "label" }],
          write_tools: ["comment"],
        }}
      />,
    );
    expect(cellTexts(container)).toEqual(["jirahttp · trellis-relay", "2 discovered", "WRITE CLASS", "v1.9.0", "HEALTHY", ""]);
    expect(container.querySelector(".ward-toolname")?.textContent).toBe("jira");
    expect(container.querySelector(".ward-truncate")?.getAttribute("title")).toBe("comment, label");
    expect(chipClass(container, "WRITE CLASS")).toContain("ward-chip--write");
    expect(chipClass(container, "HEALTHY")).toContain("ward-chip--done");
    expect(container.querySelector(".ward-warnink")).toBeNull();
  });

  it("treats a sparse record as read only, unpinned and unknown with blank transport and zero tools", () => {
    const { container } = inTable(<McpServerRow presentation="web" server={{ name: "bare", tools: [{ tool: "x", write_class: true }], write_tools: [] }} />);
    expect(cellTexts(container)).toEqual(["bare · ", "1 discovered", "READ ONLY", "unpinned", "UNKNOWN", ""]);
    expect(container.querySelector(".ward-warnink")?.textContent).toBe("unpinned");
    expect(chipClass(container, "READ ONLY")).toContain("ward-chip--meta");
    expect(chipClass(container, "UNKNOWN")).toContain("ward-chip--pending");
  });

  it("offers restart and pin with the server name when a supervisor exists and the version is unpinned", () => {
    const onRestart = vi.fn();
    const onPin = vi.fn();
    const { container } = inTable(
      <McpServerRow presentation="web" server={{ name: "confluence", pinned_version: null, restart: { implemented: true } }} onRestart={onRestart} onPin={onPin} />,
    );
    expect(buttonLabels(container)).toEqual(["Restart server", "Pin version"]);
    const [restart, pin] = Array.from(container.querySelectorAll("button"));
    fireEvent.click(restart);
    fireEvent.click(pin);
    expect(onRestart.mock.calls).toEqual([["confluence"]]);
    expect(onPin.mock.calls).toEqual([["confluence"]]);
  });

  it("explains an unsupervised restart and hides pin once a version is pinned", () => {
    const { container } = inTable(
      <McpServerRow presentation="web" server={{ name: "foundry", pinned_version: "v2.4.1", restart: { implemented: false } }} onRestart={vi.fn()} onPin={vi.fn()} />,
    );
    expect(buttonLabels(container)).toEqual([]);
    expect(cellTexts(container)[5]).toBe("Restart unavailable — no supervisor configured");
  });

  it("shows no actions at all without handlers", () => {
    const { container } = inTable(<McpServerRow presentation="web" server={{ name: "foundry", pinned_version: null, restart: { implemented: true } }} />);
    expect(cellTexts(container)[5]).toBe("");
  });
});

describe("mcpConnectionChip", () => {
  it.each([
    ["healthy", "done", "HEALTHY"],
    ["degraded", "attention", "DEGRADED"],
    ["failed", "failed", "FAILED"],
    ["unknown", "pending", "UNKNOWN"],
    [undefined, "pending", "UNKNOWN"],
    ["rebooting", "pending", "UNKNOWN"],
    ["constructor", "pending", "UNKNOWN"],
  ])("maps %s to %s %s", (connection, role, label) => {
    expect(mcpConnectionChip(connection)).toEqual({ role, label });
  });
});

const specServer: McpServer = {
  name: "foundry",
  transport: "streamable-http",
  credentialId: "sp-foundry-read",
  tools: ["query", "listDatasets"],
  cls: "read",
  connection: "healthy",
};

function renderConnection(connection: McpConnection) {
  return render(
    <table>
      <tbody>
        <McpServerRow server={{ ...specServer, connection }} />
      </tbody>
    </table>,
  );
}

describe("McpServerRow spec", () => {
  it("reads a degraded server as attention, not as a failure", () => {
    renderConnection("degraded");
    const chip = screen.getByText("DEGRADED");
    expect(chip.style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-attention-bg)");
    expect(chip.style.getPropertyValue("--ward-chip-bg")).not.toBe("var(--ward-chip-failed-bg)");
  });

  it("keeps a failed server on failed and an unknown one on pending", () => {
    renderConnection("failed");
    expect(screen.getByText("FAILED").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-failed-bg)");
    renderConnection("unknown");
    expect(screen.getByText("UNKNOWN").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-pending-bg)");
  });

  it("names a tool as mcp.<server>.<tool> and grants none of them itself", () => {
    const { container } = renderConnection("healthy");
    expect(container.textContent).toContain(mcpToolName("foundry", "query"));
    expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
    expect(screen.queryAllByRole("switch")).toHaveLength(0);
  });

  it("carries the drawn column widths and drops right to left", () => {
    expect(MCP_SERVER_COLUMNS.filter((c) => c.width).map((c) => c.width)).toEqual([196, 120, 118, 108]);
    const dropped = MCP_SERVER_COLUMNS.map((c, i) => ({ i, p: c.dropPriority })).filter((c) => c.p !== undefined);
    const last = MCP_SERVER_COLUMNS.length - 1;
    expect(dropped.map((d) => d.i)).toEqual([last - 1, last]);
    expect(dropped.map((d) => d.p)).toEqual([2, 1]);
  });
  it("heads the table with one column header per drawn column, dropping the same ones", () => {
    const { container } = render(
      <table>
        <thead>
          <McpServerRowHead />
        </thead>
      </table>,
    );
    const heads = Array.from(container.querySelectorAll("th[scope='col']"));
    expect(heads.map((th) => th.textContent)).toEqual(["Server", "Connection", "Transport", "Credential", "Tools"]);
    expect(heads.map((th) => th.getAttribute("data-drop"))).toEqual([null, null, null, "2", "1"]);
    expect((heads[0] as HTMLElement).style.width).toBe("196px");
  });
});
