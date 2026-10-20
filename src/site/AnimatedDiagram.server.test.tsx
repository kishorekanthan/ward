// @vitest-environment node
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AnimatedDiagram } from "./AnimatedDiagram";

describe("AnimatedDiagram on the server (#321)", () => {
  it("renders every node, every edge and the step list, with no buttons and no window", () => {
    expect(typeof window).toBe("undefined");
    const html = renderToString(
      <AnimatedDiagram
        label="Flow"
        nodes={[
          { id: "a", label: "Alpha", col: 0, row: 0 },
          { id: "b", label: "Beta", col: 1, row: 0 },
          { id: "c", label: "Gamma", col: 1, row: 1 },
        ]}
        edges={[
          { from: "a", to: "b" },
          { from: "b", to: "c" },
        ]}
        steps={[
          { text: "First step.", nodes: ["a", "b"] },
          { text: "Second step.", nodes: ["b", "c"] },
        ]}
      />,
    );
    expect(html.match(/<text[^>]*>([^<]*)<\/text>/g)?.map((t) => t.replace(/<[^>]*>/g, ""))).toEqual(["Alpha", "Beta", "Gamma"]);
    expect(html.match(/<line /g)).toHaveLength(2);
    expect(html.match(/<li[^>]*>([^<]*)<\/li>/g)?.map((t) => t.replace(/<[^>]*>/g, ""))).toEqual(["First step.", "Second step."]);
    expect(html).not.toContain("<button");
    expect(html).not.toContain('data-active="true"');
  });
});
