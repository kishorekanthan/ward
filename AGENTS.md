# Ward — agent guide

Ward (`@kishorekanthan/ward`) is a standalone React 19 UI library. It must never import app code.

## Issues
- No code change without a GitHub issue. Before editing code, an issue must exist with **Why** (the problem, who it's for), **What** (scope, and what is out of scope) and **Acceptance criteria** (checkable statements, each verified by a test or a named manual check). No issue, no code: open the issue first (`.github/ISSUE_TEMPLATE/`).
- The branch and PR reference the issue (branch `<N>-<slug>`, PR title ends `(#N)`), and the PR body says `Closes #N`.
- When done, the PR body records how each acceptance criterion was verified and any follow-up (as new issues).
- `tickets/` is history only; do not add to it.

## Clones
- One clone per repo, at its canonical path (layout: `~/projects/README.md`): api `~/projects/products/trellis/api`, web `~/projects/products/trellis/web`, ward `~/projects/libs/ward`.
- Never clone a repo again anywhere else, including a tool's own workspace folders or `/tmp`.
- Parallel work uses `git worktree add` from the canonical clone.

## Scope
- Work only inside this folder. Consumers (e.g. `products/trellis/web`) pin Ward by git tag.

## Commands
- `make install` — `npm ci`, and `make hooks`: `core.hooksPath` → `githooks/`, whose `commit-msg` refuses AI attribution (patterns: `githooks/attribution-patterns.txt`, kept identical to trellis-api's and trellis-web's) and then runs the global hooks it shadows.
- `make pr-check PR=N` — refuses a PR whose title, body or commits carry AI attribution, naming each.
- `make rulesets` — fails when the repo's rulesets (main: PR and `check` required, no force-push or deletion; `v*` tags: no update or deletion) drift from `.github/rulesets.json`. `make rulesets-apply` writes them (repo admin).
- `make check` — token/story/provenance checks, old package name (`scripts/old-name.mjs`: no file outside `tickets/` names the pre-rename name), lint (complexity <= 5), tests, build, packed-consumer check. Must pass before commit.
- `npm run storybook` — local component catalogue.

## Rules
- Never raise the complexity threshold or add `eslint-disable`.
- Never run prettier on Ward files; edit `tokens.json` textually, then `npm run gen`.
- `dist/` is committed: run `npm run build` and commit `dist/` with any `src/` change.
- Release: `make pr-check PR=N` before merging, bump `version` in package.json, `make check`, commit, `git tag -s vX.Y.Z -m vX.Y.Z`, `make verify-tag TAG=vX.Y.Z`, push the tag. Consumers pin the tag's commit sha, never the tag.
- Tags are signed with SSH keys listed in `.github/allowed_signers` (code-owned). `make verify-tag` checks a tag against that file as it is on `origin/main`, never the checked-out tree's copy, which a branch could extend. `make signing` sets this clone's signing key to `~/.ssh/id_ed25519.pub` (repo config, so every worktree shares it) and sets no signers file, so a bare `git tag -v` refuses rather than trusting the tree.
- The `tag signature` workflow runs `git verify-tag` on every pushed `v*` tag against main's `.github/allowed_signers`; a red run means an unsigned or unknown-key tag. `signature-test-*` tags run the same job outside the ruleset, for testing, and are deleted after.
- The `tag sweep` workflow (daily on main, and on `signature-test-*` pushes) runs `scripts/verify-tags.mjs` (`make verify-tags`) on every `v*` and `signature-test-*` tag; `.github/unsigned_tags` (code-owned) grandfathers the tags cut before signing, each pinned to its object sha. Never add a tag to it. Both checks also fail a tag whose object names another tag, so a signed tag cannot be re-pushed as a new version.
- `make check` fails when `dist/` differs by one byte from a fresh build (`scripts/dist-fresh.mjs`).
- Comments: one or two lines max. No tautological tests.
- No Claude attribution in commits or PRs. Never `git add -A`; stage paths explicitly.
