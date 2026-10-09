import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Chip } from "./primitives/Chip";
import { Crumb } from "./primitives/Crumb";
import { SectionHeader } from "./primitives/SectionHeader";

const src = dirname(fileURLToPath(import.meta.url));
const wardCss = readFileSync(join(src, "ward.css"), "utf8");
const rootVars = new Map(Array.from(wardCss.matchAll(/(--ward-[\w-]+): ([^;]+);/g), (m) => [m[1], m[2].trim()]));
const resolve = (value: string) => value.replace(/var\((--ward-[\w-]+)\)/g, (whole, name: string) => rootVars.get(name) ?? whole).trim();
const sheets = ["ward.css", ...readdirSync(src, { recursive: true, encoding: "utf8" }).filter((f) => f.endsWith(".module.css"))];
const transforms = sheets.flatMap((f) => Array.from(readFileSync(join(src, f), "utf8").matchAll(/text-transform:\s*([^;]+);/g), (m) => `${f}: ${resolve(m[1])}`));
const LABEL_ROLES = ["chip", "micro", "colHead", "keyCol", "microHead", "tag"];

describe("sentence case labels (#199)", () => {
  it("resolves every text-transform in Ward's stylesheets to none, so no chip, label or heading is upper-cased", () => {
    expect(transforms.length).toBeGreaterThan(30);
    expect(transforms.filter((t) => !t.endsWith(": none"))).toEqual([]);
  });

  it("sets the label roles in the sans face with normal tracking and no transform", () => {
    for (const role of LABEL_ROLES) {
      expect(rootVars.get(`--ward-type-${role}`), role).toContain("Figtree, system-ui, sans-serif");
      expect(rootVars.get(`--ward-type-${role}-tracking`), role).toBe("normal");
      expect(rootVars.get(`--ward-type-${role}-transform`), role).toBe("none");
    }
  });

  it("renders a chip, a crumb and a section heading in the case it was given", () => {
    render(
      <>
        <Chip role="gate" label="Awaiting review" />
        <Crumb path={[{ label: "Studio", href: "/studio" }, { label: "data-eng" }]} />
        <SectionHeader title="Open items" />
      </>,
    );
    expect(screen.getByText("Awaiting review").textContent).toBe("Awaiting review");
    expect(screen.getByRole("link", { name: "Studio" })).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Open items" }).textContent).toBe("Open items");
  });
});
