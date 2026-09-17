# 07: Release and docs

**What to build:** the publishable open-source surface: reproducible builds, versioning,
docs, and the full CI gate chain.

**Blocked by:** 01–06 (ships last).

**Status:** ready-for-agent

- [ ] Pinned Node/package-manager versions and monorepo tooling for reproducible installs
- [ ] React 19 only (peer `^19`, devDeps, types): re-install and re-run layers 01/02/05/06 green under 19; anything verified under 18 is re-verified, not assumed
- [ ] In-package toolchain only: all installs, tests, and typechecks run inside `packages/ward/` — scratch mirrors and `/tmp` verification are banned
- [ ] Library build (ESM + CJS + `.d.ts`), peer-dep discipline, no deep imports; apply the collected barrel export lines from layers 01/02/05/06
- [ ] Changesets for versioning; token changes always minor or above
- [ ] README (install, theme override via variable, dark pass notes), full dark review pass, Storybook published
- [ ] CI gates green: strict types, no-hex styles, token contrast both themes, axe on every story, rule tests, no banned motion, complexity rule wired into the same lint command with new-code-offender failures
