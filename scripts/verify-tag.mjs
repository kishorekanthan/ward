// Verifies a release tag against .github/allowed_signers as it is on protected main, never the checked-out tree (#100).
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, rmdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Calls fn with the path of a temp copy of main's allowed_signers, removed afterwards.
export function withMainSigners(cwd, fn) {
  const git = (args, stdio = "pipe") => execFileSync("git", args, { cwd, encoding: "utf8", stdio });
  git(["fetch", "--quiet", "origin", "main"], "inherit");
  const dir = mkdtempSync(join(tmpdir(), "ward-signers-"));
  const signers = join(dir, "allowed_signers");
  try {
    writeFileSync(signers, git(["show", "origin/main:.github/allowed_signers"]));
    return fn(signers);
  } finally {
    rmSync(signers, { force: true });
    rmdirSync(dir);
  }
}

export function verifyTag(tag, cwd = process.cwd()) {
  withMainSigners(cwd, (signers) =>
    execFileSync("git", ["-c", `gpg.ssh.allowedSignersFile=${signers}`, "verify-tag", tag], { cwd, stdio: "inherit" }),
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    verifyTag(process.argv[2]);
  } catch (error) {
    process.exit(error.status || 1);
  }
}
