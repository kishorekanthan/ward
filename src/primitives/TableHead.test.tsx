import { render, screen } from "@testing-library/react";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { injectModuleCss } from "../test-css";
import { TableHead } from "./TableHead";
import s from "./TableHead.module.css";

let removeCss = () => {};
afterEach(() => removeCss());

function table() {
  return render(
    <table>
      <TableHead columns={[{ key: "name", header: "Server", width: "180px" }, { key: "tools", header: "Tools", width: 96 }, { key: "state", header: "State" }]} />
      <tbody><tr><td>jira</td><td>4</td><td>connected</td></tr></tbody>
    </table>,
  );
}

describe("TableHead", () => {
  it("renders one titled column header per column, sized only where a width is given", () => {
    table();
    const headers = screen.getAllByRole("columnheader");
    expect(headers.map((th) => [th.parentElement?.parentElement?.tagName, th.textContent, th.getAttribute("scope"), th.title, th.style.width])).toEqual([
      ["THEAD", "Server", "col", "Server", "180px"],
      ["THEAD", "Tools", "col", "Tools", "96px"],
      ["THEAD", "State", "col", "State", ""],
    ]);
  });

  it("truncates each label on one line as a block", () => {
    removeCss = injectModuleCss(join(dirname(fileURLToPath(import.meta.url)), "TableHead.module.css"), s);
    table();
    const label = getComputedStyle(screen.getByText("Server"));
    expect([label.display, label.whiteSpace, label.overflow, label.textOverflow]).toEqual(["block", "nowrap", "hidden", "ellipsis"]);
  });
});
