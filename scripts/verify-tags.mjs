// Re-verifies every release tag against main's allowed_signers: a tag on a commit without tag-signature.yml gets no run (#135).
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { withMainSigners } from "./verify-tag.mjs";

export const PATTERNS = ["v*", "signature-test-*"];
export const UNSIGNED = ".github/unsigned_tags";

// Tags cut before signing began, one "<tag> <object sha>" per line; a listed tag that moved is checked like any other.
function grandfathered(cwd) {
  const lines = readFileSync(join(cwd, UNSIGNED), "utf8").split("\n").filter(Boolean);
  return new Map(lines.map((line) => line.split(" ")));
}

function tagRefs(cwd) {
  const args = ["for-each-ref", "--format=%(refname:lstrip=2) %(objectname) %(tag)", ...PATTERNS.map((p) => `refs/tags/${p}`)];
  const out = execFileSync("git", args, { cwd, encoding: "utf8" });
  return out.split("\n").filter(Boolean).map((line) => line.split(" "));
}

// Returns the tags that neither verify under their own name nor sit unchanged on the grandfathered list.
export function unverifiedTags(cwd = process.cwd()) {
  const refs = tagRefs(cwd);
  if (!refs.some(([tag]) => tag.startsWith("v"))) throw new Error("no v* tags found; fetch tags first");
  const legacy = grandfathered(cwd);
  return withMainSigners(cwd, (signers) => {
    const verifies = (sha) => spawnSync("git", ["-c", `gpg.ssh.allowedSignersFile=${signers}`, "verify-tag", sha], { cwd }).status === 0;
    return refs.filter(([tag, sha, named]) => legacy.get(tag) !== sha && (named !== tag || !verifies(sha))).map(([tag]) => tag);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const bad = unverifiedTags();
  bad.forEach((tag) => console.error(`unverified tag: ${tag}`));
  if (bad.length) process.exit(1);
  console.log("every tag verifies against main's allowed_signers or is grandfathered unsigned");
}
