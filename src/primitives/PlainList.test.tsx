import { render, screen } from "@testing-library/react";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { injectModuleCss } from "../test-css";
import { PlainList } from "./PlainList";
import s from "./PlainList.module.css";

let removeCss = () => {};
afterEach(() => removeCss());

describe("PlainList", () => {
  it("renders a labelled ul list whose items keep list semantics", () => {
    render(<PlainList label="MCP servers"><li>jira</li><li>github</li></PlainList>);
    const list = screen.getByRole("list", { name: "MCP servers" });
    expect(list.tagName).toBe("UL");
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["jira", "github"]);
  });

  it("drops the bullets, margin and padding", () => {
    removeCss = injectModuleCss(join(dirname(fileURLToPath(import.meta.url)), "PlainList.module.css"), s);
    render(<PlainList><li>jira</li></PlainList>);
    const style = getComputedStyle(screen.getByRole("list"));
    expect([style.listStyleType, style.paddingLeft, style.marginTop, style.marginBottom]).toEqual(["none", "0px", "0px", "0px"]);
  });
});
