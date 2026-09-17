# `@trellis/ward`

Ward is Trellis’s standalone React 19 UI package. It owns the tokens, reset, fonts, accessibility helpers, live-view helpers, states, primitives, layout spine, and reusable board, item, intake, studio, and admin composites. It does not import FoundryLoop application code.

## Install and use

```sh
npm install "github:kishorekanthan/ward#v0.2.2" react react-dom
```

Use the package root for every public component, hook, formatter, token, and type. Deep imports are intentionally private.

```tsx
import { AppShell, Btn, PageFrame, SectionBand, WorkCard } from "@trellis/ward";
import "@trellis/ward/styles.css";

export function App() {
  return (
    <AppShell>
      <PageFrame>
        <SectionBand actions={<Btn>New item</Btn>}>Board</SectionBand>
        <WorkCard item={{ id: "1", key: "TR-1", title: "First item", streamStep: 1, timeInStage: 60, waitsOn: "review" }} />
      </PageFrame>
    </AppShell>
  );
}
```

The root JavaScript entry bundles Ward’s CSS side effect for ordinary client builds. The explicit `@trellis/ward/styles.css` entry is stable and recommended in application entry points, SSR manifests, and CSS pipelines.

Components provide usable labels and layout defaults; props such as `brand`, `destinations`, `actor`, `metadata`, `width`, `railLabel`, and `inset` override them without app-specific dependencies. Theme a subtree with `data-theme="dark"` or override any `--ward-*` variable after the stylesheet import.

## Verify the package

```sh
npm run check
npm run test:consumer
```

`check` verifies generated tokens, contrast, strict TypeScript, complexity ≤ 5, CSS rules, and tests. `test:consumer` packs Ward, installs the tarball into a clean temporary app, imports its root and CSS entries, renders on the server, and creates a production build.
