import { render, screen } from "@testing-library/react";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { injectModuleCss } from "../test-css";
import s from "./layout.module.css";
import { SubjectRail } from "./SubjectRail";

let removeCss = () => {};
beforeEach(() => {
  removeCss = injectModuleCss(join(dirname(fileURLToPath(import.meta.url)), "layout.module.css"), s);
});
afterEach(() => removeCss());

const willChange = () => getComputedStyle(screen.getByRole("complementary", { name: "Supporting details" })).willChange;

describe("SubjectRail", () => {
  it("gives a sticky rail its own layer, so its rows land on the same pixels on every load", () => {
    render(<SubjectRail rail={<p>Cost</p>} sticky>Record</SubjectRail>);
    expect(willChange()).toBe("transform");
  });

  it("leaves a rail that scrolls with the page on no layer of its own", () => {
    render(<SubjectRail rail={<p>Cost</p>}>Record</SubjectRail>);
    expect(willChange()).toBe("auto");
  });
});
