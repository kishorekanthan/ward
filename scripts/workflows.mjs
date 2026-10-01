import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

const PINNED = /@[0-9a-f]{40}$/;
const PUSH_FILTERS = new Set(["branches", "paths", "paths-ignore"]);

function isReadOnly(permissions) {
  const keys = Object.keys(permissions ?? {});
  return keys.length === 1 && permissions.contents === "read";
}

function usesOf(workflow) {
  return Object.values(workflow.jobs ?? {}).flatMap((job) => [job.uses, ...(job.steps ?? []).map((s) => s.uses)].filter(Boolean));
}

// `on` may be a trigger name, a list of names, or a map of trigger to filters.
function triggers(on) {
  if (typeof on === "string" || Array.isArray(on)) return Object.fromEntries([on].flat().map((t) => [t, null]));
  return on ?? {};
}

function pushFilters(workflow) {
  const on = triggers(workflow.on);
  return Object.hasOwn(on, "push") ? (on.push ?? {}) : undefined;
}

// Tags and ignore-lists add refs beyond main, so only path filters may sit beside `branches: [main]`.
function isMainOnly(push) {
  const branches = push.branches ?? [];
  const onlyPathFilters = Object.keys(push).every((k) => PUSH_FILTERS.has(k));
  return onlyPathFilters && branches.length === 1 && branches[0] === "main";
}

function permissionFindings(workflow) {
  const out = isReadOnly(workflow.permissions) ? [] : ["top-level permissions must be exactly contents: read"];
  const widened = Object.entries(workflow.jobs ?? {}).filter(([, spec]) => spec.permissions !== undefined && !isReadOnly(spec.permissions));
  return out.concat(widened.map(([job]) => `job ${job} widens permissions beyond contents: read`));
}

function pinFindings(workflow) {
  return usesOf(workflow).filter((u) => !PINNED.test(u)).map((ref) => `${ref} is not pinned to a 40-hex commit sha`);
}

function pushFindings(workflow) {
  const push = pushFilters(workflow);
  return push === undefined || isMainOnly(push) ? [] : ["push must be restricted to main"];
}

// Findings for one workflow file: token scope, moving action refs, and push triggers beyond main.
export function findingsFor(name, text) {
  const workflow = parse(text) ?? {};
  return [permissionFindings, pinFindings, pushFindings].flatMap((rule) => rule(workflow)).map((f) => `${name}: ${f}`);
}

export function workflowFindings(dir) {
  const files = readdirSync(dir).filter((f) => /\.ya?ml$/.test(f));
  return files.flatMap((f) => findingsFor(f, readFileSync(join(dir, f), "utf8")));
}
