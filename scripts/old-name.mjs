import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const NAME = "@kishorekanthan/ward";
// Built from parts so this file and its test never name the old package themselves.
export const OLD_NAME = ["@trellis", "ward"].join("/");
// npm pack named the old package's tarball this, plus -<version>.tgz.
export const OLD_TARBALL = ["trellis", "ward"].join("-");

// Tracked and untracked (not ignored) files outside tickets/ that still name the pre-#60 package or its tarball.
export function oldNameFiles(root = REPO_ROOT) {
  try {
    const out = execFileSync("git", ["grep", "--untracked", "-l", "-F", "-e", OLD_NAME, "-e", OLD_TARBALL, "--", ".", ":!tickets"], { cwd: root, encoding: "utf8", stdio: "pipe" });
    return out.trim().split("\n");
  } catch (e) {
    if (e.status === 1) return [];
    throw new Error(`git grep failed: ${e.stderr?.toString().trim()}`);
  }
}
