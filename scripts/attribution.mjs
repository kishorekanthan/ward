// Refuses AI attribution (#49): `msg FILE` for githooks/commit-msg, `pr N` for `make pr-check`.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PATTERNS_FILE = join(dirname(fileURLToPath(import.meta.url)), "..", "githooks", "attribution-patterns.txt");
const SCISSORS = "# ------------------------ >8 ------------------------";
const FIX = "Delete those lines and commit again. Patterns: githooks/attribution-patterns.txt";

export function loadPatterns(path = PATTERNS_FILE) {
  const lines = readFileSync(path, "utf8").split("\n").map((line) => line.trim());
  return lines.filter((line) => line !== "" && !line.startsWith("#")).map((line) => new RegExp(line, "i"));
}

// Each line of `text` that attributes work to an assistant or provider.
export function attributions(text, patterns = loadPatterns()) {
  return text.split("\n").filter((line) => patterns.some((p) => p.test(line))).map((line) => line.trim());
}

// The message git records: no comment lines, nothing below `commit -v`'s scissors.
export function commitMessage(raw) {
  return raw.split(SCISSORS)[0].split("\n").filter((line) => !line.startsWith("#")).join("\n");
}

// Every "<where> carries AI attribution: <line>" in a PR's title, body and commits.
export function prFaults(pr) {
  const texts = [[`PR #${pr.number} title or body`, `${pr.title}\n${pr.body ?? ""}`]];
  for (const commit of pr.commits ?? []) {
    texts.push([`commit ${commit.oid.slice(0, 7)}`, `${commit.messageHeadline}\n${commit.messageBody ?? ""}`]);
  }
  return texts.flatMap(([where, text]) => attributions(text).map((line) => `${where} carries AI attribution: ${line}`));
}

function checkMessage(file) {
  const lines = attributions(commitMessage(readFileSync(file, "utf8")));
  if (lines.length > 0) {
    console.error(["commit refused: AI attribution is banned (AGENTS.md). Matched:", ...lines.map((l) => `  ${l}`), FIX].join("\n"));
  }
  return lines.length === 0 ? 0 : 1;
}

function checkPr(number) {
  const fields = ["number", "title", "body", "commits"].join(",");
  const pr = JSON.parse(execFileSync("gh", ["pr", "view", number, "--json", fields], { encoding: "utf8" }));
  const faults = prFaults(pr);
  console.log(faults.length === 0 ? `PR #${pr.number}: no AI attribution` : ["pr-check refused:", ...faults].join("\n"));
  return faults.length === 0 ? 0 : 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [mode, target] = process.argv.slice(2);
  process.exit(mode === "pr" ? checkPr(target) : checkMessage(target));
}
