import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { edge, injectModuleCss, leftBorders, ruleBody } from "../test-css";
import { Tree, TreeRow } from "./Tree";
import s from "./Tree.module.css";

function Sample({ expanded }: { expanded: boolean }) {
  return (
    <Tree label="People and access">
      <TreeRow index={0} depth={0} label="Data engineering" expanded={expanded} onToggle={() => {}}>
        <TreeRow index={1} depth={1} label="Stream admin" leaf />
      </TreeRow>
    </Tree>
  );
}

describe("Tree", () => {
  it("nests child rows in a group list, never an <li> directly inside an <li>", () => {
    const { container } = render(<Sample expanded />);
    const group = screen.getByRole("group");
    expect(group.tagName).toBe("UL");
    expect(group.parentElement?.tagName).toBe("LI");
    expect(container.querySelector("li > li")).toBeNull();
    expect(group.textContent).toContain("Stream admin");
  });

  it("renders no empty group for a collapsed row", () => {
    render(<Sample expanded={false} />);
    expect(screen.queryByRole("group")).toBeNull();
    expect(screen.queryByText("Stream admin")).toBeNull();
  });
});

describe("unresolved tree row", () => {
  it("shows the waiting tint alone, never a left stripe", () => {
    expect(ruleBody("src/primitives/Tree.module.css", '.row[data-unresolved="true"]')).toBe("background: var(--ward-color-waitingTint)");
  });

  it("renders an unresolved row with the tint and no edge, whatever rule draws them", () => {
    const removeCss = injectModuleCss("src/primitives/Tree.module.css", s);
    render(<Tree label="Fields"><TreeRow index={0} depth={0} label="Carrier reference" leaf unresolved /></Tree>);
    const row = edge(screen.getByRole("treeitem"));
    removeCss();
    expect(row).toEqual({ shadow: "", ground: "var(--ward-color-waitingtint)" });
    expect(leftBorders("src/primitives/Tree.module.css")).toEqual([]);
  });
});
