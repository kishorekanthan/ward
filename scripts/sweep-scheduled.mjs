// Release check: GitHub switches off a quiet repo's schedules after 60 days, which would silence the daily tag sweep (#153).
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const WORKFLOW = "tag-sweep.yml";
export const MAX_AGE_DAYS = 7;
const DAY_MS = 86_400_000;

// Returns why the sweep is not running on schedule, or an empty list when it is.
export function sweepFindings(workflow, runs, now) {
  if (workflow.state !== "active") return [`tag sweep workflow is ${workflow.state}; enable it in the Actions tab`];
  const latest = runs.workflow_runs?.[0];
  if (!latest) return ["tag sweep has no scheduled run"];
  const ageDays = (now - Date.parse(latest.created_at)) / DAY_MS;
  if (ageDays > MAX_AGE_DAYS) return [`tag sweep last ran on schedule ${Math.floor(ageDays)} days ago (limit ${MAX_AGE_DAYS})`];
  return [];
}

const gh = (path) => JSON.parse(execFileSync("gh", ["api", path], { encoding: "utf8" }));

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const base = `repos/{owner}/{repo}/actions/workflows/${WORKFLOW}`;
  const findings = sweepFindings(gh(base), gh(`${base}/runs?event=schedule&per_page=1`), Date.now());
  findings.forEach((f) => console.error(f));
  if (findings.length) process.exit(1);
  console.log("tag sweep is enabled and ran on schedule within the last week");
}
