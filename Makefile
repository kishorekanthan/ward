.PHONY: check install

install:
	npm ci

# Lint carries the complexity gate (eslint complexity 5).
check:
	npm run check
	npm run lint
	npm test
	npm run build
	npm run test:consumer
