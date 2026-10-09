import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "storybook-static/**", "node_modules/**"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}", "*.{ts,mjs}", "scripts/attribution.mjs", "scripts/dist-fresh.mjs", "scripts/workflows.mjs", "scripts/rulesets.mjs", "scripts/verify-tag.mjs", "scripts/verify-tags.mjs", "scripts/focus-targets.mjs", "scripts/header-geometry.mjs", "scripts/affordance.mjs", "scripts/studio-frame.mjs", "scripts/board-toolbar.mjs"],
    rules: {
      "complexity": ["error", 5],
    },
  },
);
