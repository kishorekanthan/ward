// @vitest-environment node
import { mkdtempSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { findingsFor, workflowFindings } from "./workflows.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SHA = "11d5960a326750d5838078e36cf38b85af677262";

const hardened = `
on:
  push:
    branches: [main]
  pull_request:
permissions:
  contents: read
jobs:
  check:
    steps:
      - uses: actions/checkout@${SHA} # v4.4.0
      - run: make check
`;

describe("findingsFor", () => {
  it("accepts a read-only, sha-pinned, main-only workflow", () => {
    expect(findingsFor("check.yml", hardened)).toEqual([]);
  });

  it("names a missing permissions block", () => {
    expect(findingsFor("check.yml", hardened.replace("permissions:\n  contents: read\n", ""))).toEqual([
      "check.yml: top-level permissions must be exactly contents: read",
    ]);
  });

  it("names a permissions block that grants more than contents: read", () => {
    const wide = hardened.replace("contents: read", "contents: read\n  pull-requests: write");
    expect(findingsFor("check.yml", wide)).toEqual(["check.yml: top-level permissions must be exactly contents: read"]);
    expect(findingsFor("check.yml", hardened.replace("contents: read", "contents: write"))).toHaveLength(1);
    expect(findingsFor("check.yml", hardened.replace("permissions:\n  contents: read", "permissions: write-all"))).toHaveLength(1);
  });

  it("names a job that widens the token past contents: read", () => {
    const widened = hardened.replace("  check:\n", "  check:\n    permissions: write-all\n");
    expect(findingsFor("check.yml", widened)).toEqual(["check.yml: job check widens permissions beyond contents: read"]);
    expect(findingsFor("check.yml", hardened.replace("  check:\n", "  check:\n    permissions:\n      contents: read\n"))).toEqual([]);
  });

  it("names a step or reusable workflow on a tag or a short sha", () => {
    const moving = hardened.replace(`@${SHA} # v4.4.0`, "@v4").replace("jobs:\n", "jobs:\n  reuse:\n    uses: org/repo/.github/workflows/x.yml@11d5960\n");
    expect(findingsFor("check.yml", moving)).toEqual([
      "check.yml: org/repo/.github/workflows/x.yml@11d5960 is not pinned to a 40-hex commit sha",
      "check.yml: actions/checkout@v4 is not pinned to a 40-hex commit sha",
    ]);
    expect(findingsFor("check.yml", hardened.replace(`@${SHA}`, `@${SHA}-rc`))).toHaveLength(1);
  });

  it("names a push trigger on every branch or on branches besides main", () => {
    const expected = ["check.yml: push must be restricted to main"];
    expect(findingsFor("check.yml", hardened.replace("  push:\n    branches: [main]\n", "  push:\n"))).toEqual(expected);
    expect(findingsFor("check.yml", hardened.replace("[main]", "[main, dev]"))).toEqual(expected);
    expect(findingsFor("check.yml", hardened.replace("[main]", "[dev]"))).toEqual(expected);
    expect(findingsFor("check.yml", hardened.replace("[main]\n", "[main]\n    tags: [v*]\n"))).toEqual(expected);
    expect(findingsFor("check.yml", hardened.replace("branches: [main]", "branches-ignore: [dev]"))).toEqual(expected);
    expect(findingsFor("check.yml", hardened.replace("[main]\n", "[main]\n    paths: [src/**]\n"))).toEqual([]);
    expect(findingsFor("check.yml", hardened.replace("on:\n  push:\n    branches: [main]\n  pull_request:\n", "on: [push, pull_request]\n"))).toEqual(expected);
  });
});

describe("workflowFindings", () => {
  it("finds nothing in this repo's workflows", () => {
    expect(workflowFindings(join(ROOT, ".github", "workflows"))).toEqual([]);
  });

  it("reads .yaml files as well as .yml", () => {
    const dir = mkdtempSync(join(tmpdir(), "ward-workflows-"));
    const file = join(dir, "release.yaml");
    writeFileSync(file, hardened.replace(`@${SHA}`, "@v4"));
    try {
      expect(workflowFindings(dir)).toEqual(["release.yaml: actions/checkout@v4 is not pinned to a 40-hex commit sha"]);
    } finally {
      unlinkSync(file);
      rmdirSync(dir);
    }
  });
});
