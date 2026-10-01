// Release rules as repo settings (#99): `check` fails on drift from .github/rulesets.json, `apply` writes them.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const EXPECTED_FILE = join(dirname(fileURLToPath(import.meta.url)), "..", ".github", "rulesets.json");
const API = "repos/{owner}/{repo}/rulesets";
const TOP_FIELDS = ["target", "enforcement", "bypass_actors", "conditions"];

const isObject = (value) => value !== null && typeof value === "object";

function sameShape(expected, actual) {
  if (!isObject(actual) || Array.isArray(expected) !== Array.isArray(actual)) return false;
  return !Array.isArray(expected) || expected.length === actual.length;
}

// Every key of `expected` holds the same value in `actual`; arrays must also match in length.
export function covers(expected, actual) {
  if (!isObject(expected)) return expected === actual;
  return sameShape(expected, actual) && Object.keys(expected).every((key) => covers(expected[key], actual[key]));
}

function ruleFindings(name, expectedRules, actualRules) {
  return expectedRules.flatMap((rule) => {
    const found = actualRules.find((r) => r.type === rule.type);
    if (found === undefined) return [`ruleset "${name}": rule ${rule.type} is missing`];
    return covers(rule.parameters ?? {}, found.parameters ?? {}) ? [] : [`ruleset "${name}": rule ${rule.type} parameters differ`];
  });
}

function oneRulesetFindings(expected, actual) {
  if (actual === undefined) return [`ruleset "${expected.name}" is missing`];
  const fields = TOP_FIELDS.filter((f) => !covers(expected[f], actual[f])).map((f) => `ruleset "${expected.name}": ${f} differs`);
  return fields.concat(ruleFindings(expected.name, expected.rules, actual.rules ?? []));
}

// Each way the repo's rulesets (full GET bodies) fall short of the expected ones, matched by name.
export function rulesetFindings(expected, actual) {
  return expected.flatMap((ruleset) => oneRulesetFindings(ruleset, actual.find((r) => r.name === ruleset.name)));
}

function gh(args, input) {
  return JSON.parse(execFileSync("gh", ["api", ...args], { encoding: "utf8", input }) || "null");
}

function liveRulesets() {
  return gh([API]).map((r) => gh([`${API}/${r.id}`]));
}

function check(expected) {
  const findings = rulesetFindings(expected, liveRulesets());
  console.log(findings.length === 0 ? `rulesets: ${expected.map((r) => r.name).join(", ")} match` : ["rulesets drift:", ...findings].join("\n"));
  return findings.length === 0 ? 0 : 1;
}

function apply(expected) {
  const live = liveRulesets();
  for (const ruleset of expected) {
    const current = live.find((r) => r.name === ruleset.name);
    const args = current === undefined ? ["-X", "POST", API] : ["-X", "PUT", `${API}/${current.id}`];
    gh([...args, "--input", "-"], JSON.stringify(ruleset));
  }
  return check(expected);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const expected = JSON.parse(readFileSync(EXPECTED_FILE, "utf8"));
  process.exit(process.argv[2] === "apply" ? apply(expected) : check(expected));
}
