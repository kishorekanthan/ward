import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

const entry = join(dirname(fileURLToPath(import.meta.url)), "src", "index.ts");

export default defineConfig({
  // Relative font URLs in dist/index.css, so a consumer's bundler copies the files rather than fetching a host path.
  base: "./",
  // Stories import from .storybook, which would lift the declaration root above src and bury index.d.ts.
  plugins: [react(), dts({ include: ["src"], exclude: ["src/**/*.stories.tsx", "src/**/*.test.*", "src/test-setup.ts"] })],
  build: {
    lib: {
      entry,
      name: "Ward",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: { assetFileNames: (asset) => (asset.names[0]?.endsWith(".woff2") ? "assets/[name][extname]" : "[name][extname]") },
    },
  },
});
