.PHONY: check install hooks pr-check

install: hooks
	npm ci

# githooks/ refuses AI attribution in commit messages; repo config, so every worktree shares it.
hooks:
	git config core.hooksPath githooks

# Refuses a PR whose title, body or commits carry AI attribution: make pr-check PR=N.
pr-check:
	node scripts/attribution.mjs pr $(PR)

# Lint carries the complexity gate (eslint complexity 5).
check:
	npm run check
	npm run lint
	npm test
	npm run build
	npm run test:consumer
