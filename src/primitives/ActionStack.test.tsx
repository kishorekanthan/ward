import { render, screen } from "@testing-library/react";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { injectModuleCss } from "../test-css";
import { ActionStack } from "./ActionStack";
import s from "./ActionStack.module.css";

let removeCss = () => {};
afterEach(() => removeCss());

describe("ActionStack", () => {
  it("stacks the action over its note as an inline, start-aligned column, space.s1 apart", () => {
    removeCss = injectModuleCss(join(dirname(fileURLToPath(import.meta.url)), "ActionStack.module.css"), s);
    render(
      <ActionStack>
        <button type="button" disabled>Open in Jira</button>
        <span>No Jira issue yet</span>
      </ActionStack>,
    );
    const stack = screen.getByText("No Jira issue yet").parentElement as HTMLElement;
    const style = getComputedStyle(stack);
    expect([style.display, style.flexDirection, style.alignItems, style.getPropertyValue("gap")]).toEqual(["inline-flex", "column", "flex-start", "var(--ward-space-s1)"]);
    expect(stack.firstElementChild?.textContent).toBe("Open in Jira");
  });
});
