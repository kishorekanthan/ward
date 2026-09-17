# 08: Final audit (tautology + complexity)

**What to build:** the end-gate verification that the whole package honors the hard rules —
run once, after all layers land, before release.

**Blocked by:** 01–07 (runs last).

**Status:** green-2026-09-06 (verdict: SHIP; see `AUDIT.md`)

- [x] No-tautology audit: walk every test file; any test that would pass against a deliberately broken implementation is deleted or rewritten. Spot-prove with mutation controls per layer (break rule → red → restore → green), recorded in the audit report
- [x] Cyclomatic complexity audit: complexity rule wired into the lint command with a numeric threshold; full-package report clean, baseline recorded, zero new offenders
- [x] Full gate run green in one command: strict `tsc`, no-hex, contrast both themes, axe on every story, rule tests, banned motion, complexity
- [x] React 19 confirmation: lockfile and installed tree contain no React 18; all layers re-verified under 19
- [x] Audit report checked in as `AUDIT.md` (scope, mutations run, findings, fixes); ticket 07 release ships only after this ticket is green
