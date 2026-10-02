import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "storybook-static/**", "node_modules/**"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}", "*.{ts,mjs}", "scripts/attribution.mjs", "scripts/dist-fresh.mjs", "scripts/workflows.mjs", "scripts/rulesets.mjs", "scripts/verify-tag.mjs", "scripts/verify-tags.mjs"],
    rules: {
      "complexity": ["error", 5],
    },
  },
);
