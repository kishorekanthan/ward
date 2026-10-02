.PHONY: check install hooks pr-check rulesets rulesets-apply signing verify-tag verify-tags sweep-check

install: hooks
	npm ci

# githooks/ refuses AI attribution in commit messages; repo config, so every worktree shares it.
hooks:
	git config core.hooksPath githooks

# Signs release tags (repo config); no signers file, so a bare git tag -v cannot trust the checked-out tree's list (#100).
signing:
	git config gpg.format ssh
	git config user.signingkey $(HOME)/.ssh/id_ed25519.pub
	git config --unset-all gpg.ssh.allowedSignersFile || true

# Verifies a release tag against main's .github/allowed_signers: make verify-tag TAG=vX.Y.Z.
verify-tag:
	@test -n "$(TAG)" || { echo "usage: make verify-tag TAG=vX.Y.Z" >&2; exit 2; }
	node scripts/verify-tag.mjs $(TAG)

# Verifies every local v* and signature-test-* tag, as the daily tag sweep does (#135); fetch tags first.
verify-tags:
	node scripts/verify-tags.mjs

# Fails when the tag sweep workflow is disabled or has not run on schedule in 7 days (#153); needs gh.
sweep-check:
	node scripts/sweep-scheduled.mjs

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
