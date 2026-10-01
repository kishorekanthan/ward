// Verifies a release tag against .github/allowed_signers as it is on protected main, never the checked-out tree (#100).
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, rmdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export function verifyTag(tag, cwd = process.cwd()) {
  const git = (args, stdio = "pipe") => execFileSync("git", args, { cwd, encoding: "utf8", stdio });
  git(["fetch", "--quiet", "origin", "main"], "inherit");
  const dir = mkdtempSync(join(tmpdir(), "ward-signers-"));
  const signers = join(dir, "allowed_signers");
  try {
    writeFileSync(signers, git(["show", "origin/main:.github/allowed_signers"]));
    git(["-c", `gpg.ssh.allowedSignersFile=${signers}`, "verify-tag", tag], "inherit");
  } finally {
    rmSync(signers, { force: true });
    rmdirSync(dir);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    verifyTag(process.argv[2]);
  } catch (error) {
    process.exit(error.status || 1);
  }
}
