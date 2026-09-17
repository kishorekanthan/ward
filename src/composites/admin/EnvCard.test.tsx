import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EnvCard, type Env } from "./EnvCard";

function texts(container: HTMLElement, selector: string): Array<string | null> {
  return Array.from(container.querySelectorAll(selector)).map((el) => el.textContent);
}

function chipClass(container: HTMLElement): string {
  return container.querySelector(".ward-chip")?.className ?? "";
}

describe("EnvCard", () => {
  it("keeps the compact Ward card: labelled section, upper-case env, deployed line and promoter line", () => {
    const { container } = render(
      <EnvCard env={{ env: "prod", version: "v2.13.0", deployedAt: "2026-08-28T06:30:00Z", by: "J. Rao", ticket: "SNOW-4502", state: "live" }} />,
    );
    const section = container.querySelector("section");
    expect(section?.getAttribute("aria-label")).toBe("PROD");
    expect(texts(container, "p")).toEqual(["v2.13.0", "deployed 28 Aug 07:30", "J. Rao · SNOW-4502"]);
    expect(chipClass(container)).toContain("ward-chip--done");
    expect(container.querySelector(".ward-envcard")).toBeNull();
  });

  it("omits the compact promoter line when neither promoter nor ticket is known", () => {
    const { container } = render(<EnvCard env={{ env: "dev", version: "v2.14.0", deployedAt: "2026-01-15T10:05:00Z", state: "current" }} />);
    expect(texts(container, "p")).toEqual(["v2.14.0", "deployed 15 Jan 10:05"]);
  });

  it("renders the web card with lower-case env, legacy classes and a single promoted-by meta line", () => {
    const { container } = render(
      <EnvCard presentation="web" env="prod" version="v2.13.0" deployedAt="2026-08-28T06:30:00Z" by="J. Rao" ticket="SNOW-4502" state="live" />,
    );
    expect(container.querySelector("section")).toBeNull();
    expect(texts(container, "article.ward-envcard > span")).toEqual(["prodLIVE", "v2.13.0", "28 Aug 07:30 · promoted by J. Rao · SNOW-4502"]);
    expect(texts(container, ".ward-envrow > .ward-stagecol-title")).toEqual(["prod"]);
    expect(texts(container, ".ward-envmeta")).toEqual(["v2.13.0"]);
    expect(chipClass(container)).toContain("ward-chip--done");
  });

  it.each([
    [{ by: "P. Nayar" }, "soaking", "SOAKING", "ward-chip--running", "04 Sep 18:40 · promoted by P. Nayar · "],
    [{}, "current", "CURRENT", "ward-chip--done", "04 Sep 18:40 · "],
    [{ ticket: "SNOW-4502" }, "current", "CURRENT", "ward-chip--done", "04 Sep 18:40 · SNOW-4502"],
  ] as const)("keeps the web meta join for %o in state %s", (extra, state, label, role, meta) => {
    const { container } = render(
      <EnvCard presentation="web" env="uat" version="v2.13.2" deployedAt="2026-09-04T17:40:00Z" state={state} {...extra} />,
    );
    expect(texts(container, ".ward-chip")).toEqual([label]);
    expect(chipClass(container)).toContain(role);
    expect(texts(container, ".ward-cellmeta")).toEqual([meta]);
  });
});

const specEnv: Env = {
  env: "uat",
  version: "2026.9.4-rc2",
  deployedAt: "2026-09-06T01:14:00Z",
  by: "M. Chen",
  ticket: "CHG-4120",
  state: "soaking",
};

describe("EnvCard spec", () => {
  it("reads a soak as running, never as a warning or a stream colour", () => {
    render(<EnvCard env={specEnv} />);
    const chip = screen.getByText("SOAKING");
    expect(chip.style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-running-bg)");
    expect(chip.style.getPropertyValue("--ward-chip-bg")).not.toBe("var(--ward-chip-attention-bg)");
  });

  it("keeps current and live on done", () => {
    render(<EnvCard env={{ ...specEnv, env: "prod", state: "live" }} />);
    expect(screen.getByText("LIVE").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-done-bg)");
    render(<EnvCard env={{ ...specEnv, env: "dev", state: "current" }} />);
    expect(screen.getByText("CURRENT").style.getPropertyValue("--ward-chip-bg")).toBe("var(--ward-chip-done-bg)");
  });

  it("stamps the deploy time rather than printing the instant", () => {
    render(<EnvCard env={specEnv} />);
    expect(screen.getByText("deployed 06 Sep 02:14")).not.toBeNull();
    expect(screen.queryByText(new RegExp(specEnv.deployedAt))).toBeNull();
  });

  it("leaves the who-and-why line out when nobody is named", () => {
    render(<EnvCard env={{ env: "dev", version: "2026.9.4", deployedAt: specEnv.deployedAt, state: "current" }} />);
    expect(screen.queryByText(/CHG-/)).toBeNull();
  });
});
