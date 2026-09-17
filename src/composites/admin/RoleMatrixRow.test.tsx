import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tree } from "../../primitives/Tree";
import { ROLE_MATRIX_COLUMNS, RoleMatrixRow, type MatrixNode, type MatrixRole } from "./RoleMatrixRow";

function texts(container: HTMLElement, selector: string): Array<string | null> {
  return Array.from(container.querySelectorAll(selector)).map((el) => el.textContent);
}

function attrs(container: HTMLElement, selector: string, name: string): Array<string | null> {
  return Array.from(container.querySelectorAll(selector)).map((el) => el.getAttribute(name));
}

describe("RoleMatrixRow compact", () => {
  it("puts name, role chips and the three droppable AD columns in the label, with grouped people counts", () => {
    const { container } = render(
      <Tree label="Access">
        <RoleMatrixRow
          index={0}
          depth={1}
          node={{ name: "Platform Admin", matrixRole: "platformAdmin", adGroup: "AD-TRELLIS-PLATFORM-ADMIN", people: 1234.9, requestedVia: "SNOW-4471", floor: true, unresolved: true }}
        />
      </Tree>,
    );
    const item = container.querySelector("[role='treeitem']") as HTMLElement;
    expect(item.getAttribute("aria-level")).toBe("2");
    expect(item.className).toContain("ward-treerow--unresolved");
    expect(texts(container, ".ward-chip")).toEqual(["PLATFORM ADMIN", "FLOOR", "UNRESOLVED"]);
    expect(attrs(container, ".ward-chip", "data-ward-chip")).toEqual(["gate", "soft", "warn"]);
    expect(texts(container, "[data-drop], [data-mono]")).toEqual(["AD-TRELLIS-PLATFORM-ADMIN", "1,234", "SNOW-4471"]);
    expect(attrs(container, "[data-drop], [data-mono]", "data-drop")).toEqual([null, "2", "1"]);
    expect(container.querySelector(".ward-rolecols")).toBeNull();
  });

  it("maps every matrix role to its chip and toggles an expandable branch that shows its children", () => {
    const onToggle = vi.fn();
    const { container } = render(
      <Tree label="Access">
        <RoleMatrixRow index={0} depth={0} node={{ name: "Global", matrixRole: "approver" }} expanded onToggle={onToggle}>
          <RoleMatrixRow index={1} depth={1} node={{ name: "child", matrixRole: "streamAdmin", inherited: true }} leaf />
        </RoleMatrixRow>
        <RoleMatrixRow index={2} depth={0} node={{ name: "m", matrixRole: "member" }} />
        <RoleMatrixRow index={3} depth={0} node={{ name: "v", matrixRole: "viewer" }} />
      </Tree>,
    );
    expect(texts(container, ".ward-chip")).toEqual(["APPROVER", "STREAM ADMIN", "MEMBER", "VIEWER"]);
    expect(attrs(container, ".ward-chip", "data-ward-chip")).toEqual(["running", "meta", "meta", "meta"]);
    expect(attrs(container, "[role='treeitem']", "aria-expanded")).toEqual(["true", null, "false", "false"]);
    expect(container.querySelectorAll(".ward-treerow--inherited")).toHaveLength(1);
    fireEvent.click(container.querySelector(".ward-treeitem-btn") as HTMLElement);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});

describe("RoleMatrixRow web presentation", () => {
  it("renders its own labelled tree with one item per row and dash-filled AD columns in the detail", () => {
    const { container } = render(
      <RoleMatrixRow
        presentation="web"
        rows={[
          { depth: 0, label: "Global scope", people: "6", expanded: true },
          { depth: 1, label: "Platform Admin", role: { role: "gate", label: "PLATFORM ADMIN" }, group: "AD-TRELLIS-PLATFORM-ADMIN", requestedVia: "SNOW-4471" },
          { depth: 2, label: "Priya Nayar", leaf: true, state: "inherited" },
        ]}
      />,
    );
    expect(container.querySelector("[role='tree']")?.getAttribute("aria-label")).toBe("Role matrix");
    expect(container.querySelector("[data-ward-rolematrix] > [aria-hidden='true']")?.textContent).toBe("Scope → role → personAD groupPeopleRequested via");
    expect(attrs(container, "[role='treeitem']", "aria-level")).toEqual(["1", "2", "3"]);
    expect(attrs(container, "[role='treeitem']", "aria-expanded")).toEqual(["true", "false", null]);
    expect(texts(container, ".ward-rolecols > .ward-cellmeta")).toEqual(["—", "", "AD-TRELLIS-PLATFORM-ADMIN", "SNOW-4471", "—", ""]);
    expect(texts(container, ".ward-rolecols > .ward-rolepeople")).toEqual(["6", "", ""]);
    expect(attrs(container, ".ward-rolecols > .ward-truncate", "title")).toEqual(["—", "6", "", "AD-TRELLIS-PLATFORM-ADMIN", "", "SNOW-4471", "—", "", ""]);
    expect(texts(container, ".ward-envrow > span:first-child")).toEqual(["Global scope", "Platform Admin", "Priya Nayar"]);
    expect(container.querySelector(".ward-treerow--inherited")?.textContent).toContain("Priya Nayar");
  });

  it("uses the given tree label, orders the role chip before the implicit-floor chip and flags unresolved rows", () => {
    const { container } = render(
      <RoleMatrixRow
        presentation="web"
        label="People"
        rows={[
          { depth: 1, label: "Viewer", role: { role: "meta", label: "VIEWER" }, state: "floor" },
          { depth: 1, label: "Nested", role: { role: "warn", label: "UNRESOLVED" }, state: "unresolved", expanded: false, leaf: true },
          { depth: 1, label: "Plain", state: "normal" },
        ]}
      />,
    );
    expect(container.querySelector("[role='tree']")?.getAttribute("aria-label")).toBe("People");
    expect(texts(container, ".ward-envrow > .ward-chip")).toEqual(["VIEWER", "implicit floor", "UNRESOLVED"]);
    expect(attrs(container, ".ward-envrow > .ward-chip", "data-ward-chip")).toEqual(["meta", "meta", "warn"]);
    expect(attrs(container, "[role='treeitem']", "aria-expanded")).toEqual(["false", null, "false"]);
    expect(texts(container, ".ward-treerow--unresolved .ward-envrow > span:first-child")).toEqual(["Nested"]);
    expect(container.querySelectorAll(".ward-treerow--inherited")).toHaveLength(0);
  });
});

function renderSpecRow(node: MatrixNode, depth: 0 | 1 | 2 = 1) {
  return render(
    <Tree label="People and access">
      <RoleMatrixRow index={0} depth={depth} node={node} leaf />
    </Tree>,
  );
}

const roleBg: Record<MatrixRole, string> = {
  platformAdmin: "var(--ward-chip-gate-bg)",
  approver: "var(--ward-chip-running-bg)",
  streamAdmin: "var(--ward-chip-meta-bg)",
  member: "var(--ward-chip-meta-bg)",
  viewer: "var(--ward-chip-meta-bg)",
};

describe("RoleMatrixRow spec", () => {
  it("gives every role its fixed chip and never a stream colour", () => {
    const labels: Record<MatrixRole, string> = {
      platformAdmin: "PLATFORM ADMIN",
      approver: "APPROVER",
      streamAdmin: "STREAM ADMIN",
      member: "MEMBER",
      viewer: "VIEWER",
    };
    for (const key of Object.keys(labels) as MatrixRole[]) {
      const { unmount } = renderSpecRow({ name: "M. Chen", matrixRole: key });
      const chip = screen.getByText(labels[key]);
      expect(chip.style.getPropertyValue("--ward-chip-bg")).toBe(roleBg[key]);
      expect(chip.style.getPropertyValue("--ward-chip-bg")).not.toContain("--ward-stream-");
      unmount();
    }
  });

  it("refuses a role the matrix does not have", () => {
    expect(() => renderSpecRow({ name: "M. Chen", matrixRole: "owner" as MatrixRole })).toThrow(/is not a Trellis role/);
  });

  it("marks an unresolved branch with a warn chip and the warn inset row", () => {
    renderSpecRow({ name: "MEMBER?", unresolved: true });
    expect(screen.getByText("UNRESOLVED").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-warn-bg)");
    expect(screen.getByRole("treeitem").getAttribute("data-unresolved")).toBe("true");
  });

  it("is read-only: it offers no control to change access", () => {
    renderSpecRow({ name: "Data engineering", matrixRole: "streamAdmin", adGroup: "AAD-TRELLIS-DE-ADMIN", people: 4 });
    // Ward's Tree gives every row one roving navigation button; nothing else here is interactive.
    expect(screen.queryAllByRole("button").map((b) => b.getAttribute("data-ward-roving"))).toEqual(["true"]);
    expect(screen.queryByRole("checkbox")).toBeNull();
    expect(screen.queryByRole("switch")).toBeNull();
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  it("carries the drawn column widths and drops right to left", () => {
    expect(ROLE_MATRIX_COLUMNS.map((c) => c.width)).toEqual([228, 92, 168]);
    expect(ROLE_MATRIX_COLUMNS.map((c) => c.dropPriority)).toEqual([undefined, 2, 1]);
  });
});
