import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "storybook-static/**", "node_modules/**"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}", "*.{ts,mjs}"],
    rules: {
      "complexity": ["error", 5],
    },
  },
);
