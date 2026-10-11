import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ruleBody } from "../test-css";

const here = dirname(fileURLToPath(import.meta.url));
const btn = join(here, "Btn.module.css");
const select = join(here, "Select.module.css");
const field = join(here, "Field.module.css");

function declarations(path: string, selector: string): Record<string, string> {
  return Object.fromEntries(ruleBody(path, selector).split(";\n").map((line) => line.split(/:\s*/, 2) as [string, string]));
}

// Hand-written from #253: one height, inline padding and radius per size, for a button and a dropdown trigger alike.
const SIZES = {
  md: { height: "var(--ward-height-control)", inline: "var(--ward-space-3)", radius: "var(--ward-radius)" },
  sm: { height: "var(--ward-height-controlSm)", inline: "var(--ward-space-3)", radius: "var(--ward-radius)" },
};

describe("button and dropdown sizes", () => {
  it("a Btn reads the size tokens", () => {
    const base = declarations(btn, ".btn");
    expect(base.padding).toBe(`0 ${SIZES.md.inline}`);
    expect(base["border-radius"]).toBe(SIZES.md.radius);
    expect(base.height).toBe(SIZES.md.height);
    expect(declarations(btn, ".sm").height).toBe(SIZES.sm.height);
  });

  it("a sized Select trigger reads the same tokens for each size", () => {
    const sized = declarations(select, '.trigger[data-ward-size]');
    expect(sized["padding-block"]).toBe("0");
    expect(sized["padding-inline-start"]).toBe(SIZES.md.inline);
    expect(sized["border-radius"]).toBe(SIZES.md.radius);
    expect(declarations(select, '.trigger[data-ward-size="md"]').height).toBe(SIZES.md.height);
    expect(declarations(select, '.trigger[data-ward-size="sm"]').height).toBe(SIZES.sm.height);
  });

  it("an unsized Select trigger keeps the input padding", () => {
    expect(declarations(select, ".trigger").padding).toBe("var(--ward-pad-input)");
  });

  it("a toolbar Field input takes the md button box", () => {
    const input = declarations(field, '.field[data-variant="toolbar"] input.control');
    expect(input.height).toBe(SIZES.md.height);
    expect(input["padding-inline"]).toBe(SIZES.md.inline);
  });

  it("button and dropdown text share one size", () => {
    const type = JSON.parse(readFileSync(join(here, "../../tokens.json"), "utf8")).type;
    expect(type.control.size).toBe(12);
    expect(type.inputText.size).toBe(12);
  });
});
