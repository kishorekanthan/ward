// @vitest-environment node
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, rmSync, rmdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it } from "vitest";
import { sweepFindings } from "./sweep-scheduled.mjs";

const SCRIPT = fileURLToPath(new URL("./sweep-scheduled.mjs", import.meta.url));
const NOW = Date.parse("2026-10-10T12:00:00Z");
const ACTIVE = { name: "tag sweep", path: ".github/workflows/tag-sweep.yml", state: "active" };
const ranAt = (created_at) => ({ total_count: 1, workflow_runs: [{ created_at, event: "schedule", conclusion: "success" }] });
const DAY = 86_400_000;
const NO_RUNS = { total_count: 0, workflow_runs: [] };

describe("sweepFindings", () => {
  it("passes an active workflow with a run from yesterday", () => {
    expect(sweepFindings(ACTIVE, ranAt("2026-10-09T05:17:00Z"), NOW)).toEqual([]);
  });

  it("passes a run just inside the week", () => {
    expect(sweepFindings(ACTIVE, ranAt("2026-10-03T13:00:00Z"), NOW)).toEqual([]);
  });

  it("names a workflow GitHub disabled for inactivity", () => {
    const findings = sweepFindings({ ...ACTIVE, state: "disabled_inactivity" }, ranAt("2026-10-09T05:17:00Z"), NOW);
    expect(findings).toEqual(["tag sweep workflow is disabled_inactivity; enable it in the Actions tab"]);
  });

  it("names a workflow disabled by hand", () => {
    expect(sweepFindings({ ...ACTIVE, state: "disabled_manually" }, NO_RUNS, NOW)).toEqual([
      "tag sweep workflow is disabled_manually; enable it in the Actions tab",
    ]);
  });

  it("passes a run exactly a week old", () => {
    expect(sweepFindings(ACTIVE, ranAt("2026-10-03T12:00:00Z"), NOW)).toEqual([]);
  });

  it("names a run older than a week", () => {
    expect(sweepFindings(ACTIVE, ranAt("2026-10-03T11:00:00Z"), NOW)).toEqual(["tag sweep last ran on schedule 7 days ago (limit 7)"]);
  });

  it.each([[undefined], [null], [""], ["last tuesday"]])("names a run whose created_at is %j", (created_at) => {
    expect(sweepFindings(ACTIVE, ranAt(created_at), NOW)).toEqual(["tag sweep's last scheduled run has no readable run time"]);
  });

  it("names the absence of any scheduled run", () => {
    expect(sweepFindings(ACTIVE, NO_RUNS, NOW)).toEqual(["tag sweep has no scheduled run"]);
  });
});

// A fake gh answers from files written next to it, so the real script runs end to end.
describe("sweep-scheduled CLI", () => {
  const dir = mkdtempSync(join(tmpdir(), "ward-sweep-scheduled-"));
  afterAll(() => {
    ["gh", "workflow.json", "runs.json"].forEach((f) => rmSync(join(dir, f), { force: true }));
    rmdirSync(dir);
  });

  const run = (workflow, runs) => {
    writeFileSync(join(dir, "workflow.json"), JSON.stringify(workflow));
    writeFileSync(join(dir, "runs.json"), JSON.stringify(runs));
    writeFileSync(join(dir, "gh"), `#!/bin/sh\ncase "$2" in */workflows/tag-sweep.yml/runs?event=schedule*) cat "${dir}/runs.json";; */workflows/tag-sweep.yml) cat "${dir}/workflow.json";; *) exit 1;; esac\n`);
    chmodSync(join(dir, "gh"), 0o755);
    return spawnSync("node", [SCRIPT], { env: { ...process.env, PATH: `${dir}:${process.env.PATH}` }, encoding: "utf8" });
  };

  it("exits 0 for an active workflow with a fresh run", () => {
    const fresh = new Date(Date.now() - DAY).toISOString();
    expect(run(ACTIVE, ranAt(fresh)).status).toBe(0);
  });

  it("exits 1 naming the age when the last scheduled run is stale", () => {
    const stale = new Date(Date.now() - 8.5 * DAY).toISOString();
    const result = run(ACTIVE, ranAt(stale));
    expect([result.status, result.stderr]).toEqual([1, "tag sweep last ran on schedule 8 days ago (limit 7)\n"]);
  });

  it.each([[undefined], ["not a date"]])("exits 1 when the last run's created_at is %j", (created_at) => {
    const result = run(ACTIVE, ranAt(created_at));
    expect([result.status, result.stderr]).toEqual([1, "tag sweep's last scheduled run has no readable run time\n"]);
  });

  it("exits 1 naming the cause when the workflow is disabled", () => {
    const result = run({ ...ACTIVE, state: "disabled_inactivity" }, NO_RUNS);
    expect([result.status, result.stderr]).toEqual([1, "tag sweep workflow is disabled_inactivity; enable it in the Actions tab\n"]);
  });
});
