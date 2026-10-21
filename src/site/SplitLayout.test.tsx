import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import tokens from "../../tokens.json";
import { SplitLayout } from "./SplitLayout";
import { declared, resolve } from "../test-site";

describe("SplitLayout (#313)", () => {
  it("renders the main content and a labelled aside", () => {
    render(
      <SplitLayout aside={<p>Facts</p>} asideLabel="Project facts">
        <p>Body</p>
      </SplitLayout>,
    );
    const aside = screen.getByRole("complementary", { name: "Project facts" });
    expect(aside.textContent).toBe("Facts");
    expect(screen.getByText("Body").closest("aside")).toBeNull();
  });

  it("wraps the aside under the main column below a 480px main width", () => {
    expect(declared("SplitLayout.module.css", ".split", "flex-wrap")).toBe("wrap");
    expect(declared("SplitLayout.module.css", ".main", "min-inline-size")).toBe("min(100%, var(--ward-width-splitMain))");
    expect(resolve("var(--ward-width-splitMain)")).toBe("480px");
    expect(tokens.width.splitMain).toBe(480);
  });

  it("starts the aside at the 316px rail width", () => {
    expect(declared("SplitLayout.module.css", ".aside", "flex")).toBe("1 1 var(--ward-width-rail)");
    expect(resolve("var(--ward-width-rail)")).toBe("316px");
  });
});
