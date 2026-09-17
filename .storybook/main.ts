import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const require = createRequire(import.meta.url);

// The workspace hoists storybook to the root but may nest framework packages here, so resolve each from this package.
function packageDir(name: string): string {
  return dirname(require.resolve(join(name, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [packageDir("@storybook/addon-essentials"), packageDir("@storybook/addon-a11y")],
  framework: {
    name: packageDir("@storybook/react-vite") as "@storybook/react-vite",
    options: {},
  },
  docs: { autodocs: "tag" },
};

export default config;
