import { describe, expect, it } from "vitest";
import { tocTree } from "./toc";

describe("tocTree (#320)", () => {
  it("nests a deeper heading under the last shallower one and climbs back out", () => {
    const tree = tocTree([
      { id: "a", text: "A", level: 3 },
      { id: "b", text: "B", level: 2 },
      { id: "b1", text: "B1", level: 4 },
      { id: "c", text: "C", level: 2 },
    ]);
    const shape = (nodes: typeof tree): unknown[] => nodes.map((n) => (n.children.length ? [n.id, shape(n.children)] : n.id));
    expect(shape(tree)).toEqual(["a", ["b", ["b1"]], "c"]);
  });
});
