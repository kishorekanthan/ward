import { act, fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { stubMatchMedia } from "../test-setup";
import { AnimatedDiagram } from "./AnimatedDiagram";
import { canvasSize, edgeSegment, nodeBox } from "./diagram";

const nodes = [
  { id: "a", label: "A", col: 0, row: 0 },
  { id: "b", label: "B", col: 1, row: 0 },
  { id: "c", label: "C", col: 1, row: 1 },
];
const edges = [
  { from: "a", to: "b" },
  { from: "b", to: "c" },
];
const steps = [
  { text: "A sends to B.", nodes: ["a", "b"] },
  { text: "B sends to C.", nodes: ["b", "c"] },
];

const diagram = () => <AnimatedDiagram label="Flow" nodes={nodes} edges={edges} steps={steps} />;
const activeNodes = (c: HTMLElement) => Array.from(c.querySelectorAll('[data-node][data-active="true"]'), (g) => g.getAttribute("data-node"));
const activeEdges = (c: HTMLElement) => c.querySelectorAll('line[data-active="true"]').length;

describe("AnimatedDiagram (#321)", () => {
  it("stays static under reduced motion: no buttons, no highlight", () => {
    stubMatchMedia(false);
    const { container } = render(diagram());
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(activeNodes(container)).toEqual([]);
    expect(Array.from(container.querySelectorAll("ol li"), (li) => li.textContent)).toEqual(["A sends to B.", "B sends to C."]);
  });

  it("walks the steps with Next and Back when motion is welcome", () => {
    stubMatchMedia(true);
    const { container } = render(diagram());
    const live = () => container.querySelector("[aria-live]")?.textContent;
    expect(activeNodes(container)).toEqual(["a", "b"]);
    expect(activeEdges(container)).toBe(1);
    expect(live()).toBe("Step 1 of 2: A sends to B.");
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(activeNodes(container)).toEqual(["b", "c"]);
    expect(live()).toBe("Step 2 of 2: B sends to C.");
    expect(container.querySelector('[aria-current="step"]')?.textContent).toBe("B sends to C.");
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(live()).toBe("Step 1 of 2: A sends to B.");
  });

  it("drops the controls when reduced motion is switched on", () => {
    const media = stubMatchMedia(true);
    render(diagram());
    expect(screen.getAllByRole("button")).toHaveLength(2);
    act(() => media.setMatches(false));
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("holds no raw colour in the component or its stylesheet", () => {
    for (const file of ["AnimatedDiagram.tsx", "AnimatedDiagram.module.css", "diagram.ts"]) {
      const text = readFileSync(`src/site/${file}`, "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
      expect(text).not.toMatch(/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(|oklch\(/i);
      expect(text).not.toMatch(/\b(fill|stroke)="(?!none)/);
    }
    const css = readFileSync("src/site/AnimatedDiagram.module.css", "utf8");
    for (const [, value] of css.matchAll(/(?:^|\s)(?:fill|stroke|color|background):\s*([^;]+);/g)) {
      expect(value).toMatch(/^var\(--ward-color-[a-zA-Z0-9]+\)$/);
    }
  });
});

describe("diagram geometry (#321)", () => {
  it("places a node by column and row on a 184 by 96 grid with 16 padding", () => {
    expect(nodeBox({ id: "x", label: "X", col: 2, row: 1 })).toEqual({ x: 384, y: 112, w: 152, h: 48 });
  });

  it("sizes the canvas to the last column and row", () => {
    expect(canvasSize(nodes)).toEqual({ w: 16 + 184 + 152 + 16, h: 16 + 96 + 48 + 16 });
  });

  it("cuts a level edge at the facing sides of the two boxes", () => {
    const a = { x: 16, y: 16, w: 152, h: 48 };
    const b = { x: 200, y: 16, w: 152, h: 48 };
    expect(edgeSegment(a, b)).toEqual({ x1: 168, y1: 40, x2: 200, y2: 40 });
  });

  it("cuts a vertical edge at the bottom and top", () => {
    const a = { x: 200, y: 16, w: 152, h: 48 };
    const b = { x: 200, y: 112, w: 152, h: 48 };
    expect(edgeSegment(a, b)).toEqual({ x1: 276, y1: 64, x2: 276, y2: 112 });
  });
});
