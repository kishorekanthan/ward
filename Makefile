.PHONY: check install hooks pr-check rulesets rulesets-apply signing

install: hooks
	npm ci

# githooks/ refuses AI attribution in commit messages; repo config, so every worktree shares it.
hooks:
	git config core.hooksPath githooks

# Signed release tags (git tag -s / -v); repo config, run from the repo root so the relative signers path resolves.
signing:
	git config gpg.format ssh
	git config user.signingkey $(HOME)/.ssh/id_ed25519.pub
	git config gpg.ssh.allowedSignersFile .github/allowed_signers

# Refuses a PR whose title, body or commits carry AI attribution: make pr-check PR=N.
pr-check:
	node scripts/attribution.mjs pr $(PR)

# Release rules (#99): fails when the repo's rulesets drift from .github/rulesets.json; apply needs repo admin.
rulesets:
	node scripts/rulesets.mjs check

rulesets-apply:
	node scripts/rulesets.mjs apply

# Lint carries the complexity gate (eslint complexity 5).
check:
	npm run check
	npm run lint
	npm test
	npm run build
	npm run test:consumer
