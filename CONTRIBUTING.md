# Contributing to Ward

Thanks for your interest in Ward (`@trellis/ward`), a React 19 component library. This guide explains how to set up the project, how to check your work, and how to get a change merged. You don't need to have contributed to open source before.

By taking part you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## The short version

1. Find or open an **issue** (a GitHub page that describes one piece of work).
2. Say in the issue that you'd like to work on it.
3. Make the change on a **branch** (your own line of work, separate from `main`).
4. Run `make check` until it passes.
5. Open a **pull request** (a "PR": a request to merge your branch into `main`) that says `Closes #<issue number>`.

## 1. Start with an issue

Every change, even a small one, starts with an issue. This lets us agree on the problem before anyone spends time on code.

- Look through the [open issues](https://github.com/kishorekanthan/ward/issues). Issues labelled `good first issue` are a gentle place to start; `help wanted` means we'd especially welcome a hand.
- If nothing fits, open a new issue with the **Feature or change** form or the **Bug report** form.
- A feature issue needs three things before work starts:
  - **Why**: the problem, and who has it.
  - **What**: what will change, and what is out of scope (deliberately left out).
  - **Acceptance criteria**: a list of statements that must be true when the work is done, each checked by an automated test or a named manual check.
- Comment on the issue to say you're working on it, so two people don't do the same work.

Security problems are different: please follow [SECURITY.md](SECURITY.md) and don't open a public issue.

## 2. Set up

You need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/). The exact Node version is in `.nvmrc`; if you use [nvm](https://github.com/nvm-sh/nvm) (a Node version manager), run `nvm use` in the project folder.

```sh
# Fork the repo on GitHub first (a fork is your own copy), then:
git clone https://github.com/<your-username>/ward.git
cd ward
make install        # installs exact dependency versions (npm ci)
npx playwright install chromium   # a browser the tests use
```

Useful commands:

| Command | What it does |
|---|---|
| `make check` | Runs every check: tokens, contrast, types, lint, tests, build, and a packed-install test. Must pass before you open a PR. |
| `npm test` | Runs just the tests. |
| `npm run storybook` | Opens the component catalogue in your browser at http://localhost:6006. |
| `npm run gen` | Regenerates the CSS after you edit `tokens.json`. |

## 3. Make your change

Name your branch after the issue: `<issue number>-<short-description>`, for example `42-wrap-long-titles`.

```sh
git checkout -b 42-wrap-long-titles
```

Ward's rules for code:

- **Spec first.** A new component is added to the library spec (`SPEC.md`) first: its parts, states, data and rule. Then it is built. Code without a spec entry fails review.
- **One folder per component**, holding the component, its styles, its stories, its tests and an `index.ts` that re-exports it.
- **Tokens only.** A token is a named design value such as a colour or spacing size, defined in `tokens.json`. Use tokens, never raw values like `#ff0000`. To change a token, edit `tokens.json` by hand and run `npm run gen`.
- **Every state has a story.** A story is one example of a component in Storybook (for example "loading" or "empty"). Each story must pass axe, an automated accessibility checker, with no violations.
- **Each component rule has a test that fails if the rule breaks.** Tests that only repeat the code, or that check a mock instead of real behaviour, don't count.
- **Formatters** (functions that turn numbers or dates into text) are tested against the checked-in "golden" JSON files, which hold known-good output. Never compute the expected values in the test itself.
- **No banned motion.** `make check` reports any animation that isn't allowed.
- **Keep functions simple.** The linter fails any function whose cyclomatic complexity (a count of its branches and loops) is over 5. Split the function instead; don't raise the limit or add `eslint-disable`.
- **Props are data-shaped and typed from the contracts.** A hand-written type for data from the API is allowed only as a stop-gap: mark it as provisional, and delete it once its schema exists.
- **Don't run Prettier** (a code formatter) on Ward files.
- **Comments** are one or two lines and explain *why*, not *what*.
- **`dist/` is committed.** If you change anything in `src/`, run `npm run build` and commit the updated `dist/` too.

## 4. Check your work

```sh
make check
```

Everything must be green. The same command runs on every pull request, so a PR that fails here will fail there too.

If your change affects people who use Ward, add a **changeset** (a short note that feeds the changelog and picks the next version number):

```sh
npm run changeset
```

Changes to tokens are at least a minor version.

## 5. Open a pull request

1. Commit only the files you mean to change. Add them by name (`git add src/WorkCard/WorkCard.tsx`) rather than adding everything at once.
2. Push your branch to your fork and open a pull request against `main`.
3. The PR form asks for:
   - what changed and why;
   - `Closes #<issue number>`, so the issue closes when the PR merges;
   - how you checked each acceptance criterion;
   - a short checklist.
4. A maintainer will review it. Reviews are a conversation, so expect questions or small change requests; they're normal and not a judgement of you.

Once it's approved and the checks pass, a maintainer merges it (as a single "squash" commit) and the issue closes automatically.

## Releases

Maintainers release Ward by bumping `version` in `package.json`, running `make check`, committing, and pushing a tag such as `v0.2.3`. Apps install Ward by that tag.

## Questions

Ask in the issue you're working on. If you're unsure where to start, open an issue and ask; there are no silly questions.
