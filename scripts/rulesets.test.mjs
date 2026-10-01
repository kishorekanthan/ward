// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { covers, rulesetFindings } from "./rulesets.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const expected = JSON.parse(readFileSync(join(ROOT, ".github", "rulesets.json"), "utf8"));

// Written by hand in the shape of GitHub's "get a repository ruleset" response, extra fields included.
const liveMain = () => ({
  id: 101,
  name: "main",
  target: "branch",
  source_type: "Repository",
  source: "kishorekanthan/ward",
  enforcement: "active",
  bypass_actors: [],
  current_user_can_bypass: "never",
  node_id: "RRS_1",
  conditions: { ref_name: { exclude: [], include: ["refs/heads/main"] } },
  rules: [
    { type: "deletion" },
    { type: "non_fast_forward" },
    {
      type: "pull_request",
      parameters: {
        required_approving_review_count: 0,
        dismiss_stale_reviews_on_push: false,
        require_code_owner_review: false,
        require_last_push_approval: false,
        required_review_thread_resolution: false,
        allowed_merge_methods: ["merge", "squash", "rebase"],
      },
    },
    {
      type: "required_status_checks",
      parameters: {
        strict_required_status_checks_policy: false,
        do_not_enforce_on_create: false,
        required_status_checks: [{ context: "check", integration_id: 15368 }],
      },
    },
  ],
  created_at: "2026-10-01T14:30:00.000+01:00",
  updated_at: "2026-10-01T14:30:00.000+01:00",
});

const liveTags = () => ({
  id: 102,
  name: "release tags",
  target: "tag",
  enforcement: "active",
  bypass_actors: [],
  conditions: { ref_name: { exclude: [], include: ["refs/tags/v*"] } },
  rules: [{ type: "deletion" }, { type: "update", parameters: { update_allows_fetch_and_merge: false } }],
});

const findingsWith = (main, tags = liveTags()) => rulesetFindings(expected, [main, tags]);

describe("rulesetFindings", () => {
  it("finds nothing when the repo carries both rulesets", () => {
    expect(findingsWith(liveMain())).toEqual([]);
  });

  it("names a ruleset that is missing", () => {
    expect(rulesetFindings(expected, [liveMain()])).toEqual(['ruleset "release tags" is missing']);
    expect(rulesetFindings(expected, [])).toEqual(['ruleset "main" is missing', 'ruleset "release tags" is missing']);
  });

  it("names each rule removed from main", () => {
    for (const type of ["deletion", "non_fast_forward", "pull_request", "required_status_checks"]) {
      const main = liveMain();
      main.rules = main.rules.filter((r) => r.type !== type);
      expect(findingsWith(main)).toEqual([`ruleset "main": rule ${type} is missing`]);
    }
  });

  it("names a tag rule removed", () => {
    const tags = liveTags();
    tags.rules = [{ type: "deletion" }];
    expect(findingsWith(liveMain(), tags)).toEqual(['ruleset "release tags": rule update is missing']);
  });

  it("names a ruleset left in evaluate mode, or given a bypass", () => {
    expect(findingsWith({ ...liveMain(), enforcement: "evaluate" })).toEqual(['ruleset "main": enforcement differs']);
    const bypass = [{ actor_id: 5, actor_type: "RepositoryRole", bypass_mode: "always" }];
    expect(findingsWith(liveMain(), { ...liveTags(), bypass_actors: bypass })).toEqual(['ruleset "release tags": bypass_actors differs']);
  });

  it("names a ruleset moved to the other ref type, so its refs match nothing", () => {
    expect(findingsWith(liveMain(), { ...liveTags(), target: "branch" })).toEqual(['ruleset "release tags": target differs']);
    expect(findingsWith({ ...liveMain(), target: "tag" })).toEqual(['ruleset "main": target differs']);
  });

  it("names conditions that narrow which refs the rules cover", () => {
    const narrowed = { ref_name: { exclude: ["refs/tags/v0*"], include: ["refs/tags/v*"] } };
    expect(findingsWith(liveMain(), { ...liveTags(), conditions: narrowed })).toEqual(['ruleset "release tags": conditions differs']);
    const other = { ref_name: { exclude: [], include: ["refs/heads/dev"] } };
    expect(findingsWith({ ...liveMain(), conditions: other })).toEqual(['ruleset "main": conditions differs']);
  });

  it("names a required check that is renamed, unbound from GitHub Actions, or joined by another", () => {
    const checksWith = (list) => {
      const main = liveMain();
      main.rules[3].parameters.required_status_checks = list;
      return findingsWith(main);
    };
    const differs = ['ruleset "main": rule required_status_checks parameters differ'];
    expect(checksWith([{ context: "lint", integration_id: 15368 }])).toEqual(differs);
    expect(checksWith([{ context: "check" }])).toEqual(differs);
    expect(checksWith([])).toEqual(differs);
  });

  it("names a pull request rule that changes a required parameter", () => {
    const main = liveMain();
    main.rules[2].parameters.required_approving_review_count = 1;
    expect(findingsWith(main)).toEqual(['ruleset "main": rule pull_request parameters differ']);
  });
});

describe("covers", () => {
  it("tells arrays from objects and counts array items", () => {
    expect(covers([1], { 0: 1 })).toBe(false);
    expect(covers({ 0: 1 }, [1])).toBe(false);
    expect(covers([1], [1, 2])).toBe(false);
    expect(covers({ a: [] }, { a: null })).toBe(false);
    expect(covers({ a: 1 }, { a: 1, b: 2 })).toBe(true);
    expect(covers({ a: 0 }, { a: false })).toBe(false);
  });
});
