import "../src/ward.css";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Ward light / dark ramp",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? "light";
      document.documentElement.dataset.theme = theme;
      document.body.style.background = "var(--ward-color-bg)";
      document.body.style.color = "var(--ward-color-text)";
      document.body.style.padding = "var(--ward-space-5)";
      return Story();
    },
  ],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    // bothThemes renders every story twice, so duplicate-landmark reports are the harness, not a defect; every other rule stays on.
    a11y: {
      test: "todo",
      config: {
        rules: [
          { id: "landmark-no-duplicate-main", enabled: false },
          { id: "landmark-no-duplicate-banner", enabled: false },
          { id: "landmark-no-duplicate-contentinfo", enabled: false },
          { id: "landmark-unique", enabled: false },
        ],
      },
    },
    options: {
      storySort: {
        order: ["Tokens", "Primitives", "Layout", "States", "Live", "Board", "Studio", "Admin", "Item", "Intake", "Platform"],
      },
    },
  },
};

export default preview;
