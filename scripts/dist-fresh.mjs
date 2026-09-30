import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

function filesUnder(dir, base = dir, out = new Map()) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) filesUnder(path, base, out);
    else out.set(relative(base, path), path);
  }
  return out;
}

// Paths missing from either tree, or differing by any byte.
export function distDrift(built, dist) {
  const fresh = filesUnder(built);
  const committed = filesUnder(dist);
  const same = (name) => fresh.has(name) && committed.has(name) && readFileSync(fresh.get(name)).equals(readFileSync(committed.get(name)));
  return [...new Set([...fresh.keys(), ...committed.keys()])].sort().filter((name) => !same(name));
}

// Builds into node_modules/.cache so dist/ is never touched and vite empties the folder on each run.
export function buildFresh(root) {
  const out = join(root, "node_modules", ".cache", "ward-dist-fresh");
  execFileSync("npx", ["--no-install", "vite", "build", "--outDir", out, "--emptyOutDir", "--logLevel", "error"], { cwd: root, stdio: "pipe" });
  return out;
}
