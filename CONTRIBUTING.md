# Contributing to @trellis/ward

One rule: a new component is added to the library spec first — anatomy, states,
data, rule — then built. Code without a spec entry fails review.

Every component ships in its own folder (component, styles, stories, tests,
barrel): token values only, every state a story, axe clean through the story,
a rule test that fails if the rule breaks, and no banned motion. Formatters
test against the checked-in golden JSON fixtures, never recomputed values.

Run `npm run check` before opening a PR: tsc strict, no-hex, contrast both
themes, banned motion, eslint complexity ≤ 10, stylelint, and the full vitest
suite must all be green. Add a changeset; token changes are minor or above.
Props stay data-shaped and contract-typed — hand-written payload types are
provisional only, marked as such, and deleted when their schemas land.
