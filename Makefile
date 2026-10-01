.PHONY: check install hooks pr-check signing verify-tag

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
	node scripts/verify-tag.mjs $(TAG)

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
