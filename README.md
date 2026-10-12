# `@kishorekanthan/ward`

Ward is Trellis’s standalone React 19 UI package. It owns the tokens, reset, fonts, accessibility helpers, live-view helpers, states, primitives, layout spine, and reusable board, item, intake, studio, and admin composites. It does not import FoundryLoop application code.

## Install and use

```sh
npm install "github:kishorekanthan/ward#v0.2.3" react react-dom
```

Use the package root for every public component, hook, formatter, token, and type. Deep imports are intentionally private.

```tsx
import { AppShell, Btn, PageFrame, SectionBand, WorkCard } from "@kishorekanthan/ward";
import "@kishorekanthan/ward/styles.css";

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

The root JavaScript entry bundles Ward’s CSS side effect for ordinary client builds. The explicit `@kishorekanthan/ward/styles.css` entry is stable and recommended in application entry points, SSR manifests, and CSS pipelines.

Components provide usable labels and layout defaults; props such as `brand`, `destinations`, `actor`, `metadata`, `width`, `railLabel`, `sidebarLabel`, and `inset` override them without app-specific dependencies. Theme a subtree with `data-theme="dark"` or override any `--ward-*` variable after the stylesheet import.

`AppShell` with a `sidebar` is the app frame: pass `sidebar`, `header` and the page, and Ward draws the layout. The sidebar and the content panel are two rounded panels, 10 px from the window and from each other, ringed in `color.panelEdge`; the header sits inside the content panel. From 1024 px wide both panels show; from 768 to 1023 px the sidebar folds to a 60 px strip; below 768 px the shell is one column and the sidebar moves into a modal drawer. From 768 px wide the frame is exactly the viewport tall: the sidebar, the page body and the rail each scroll inside it, and the document does not. A panel button folds the sidebar at any width from 768 px; the choice is kept for wide screens, and at medium width opening the strip lasts the visit. A function `sidebar` is told when it is folded and draws its own strip; `iconRail` items draw it otherwise. A toggle at the start of the header row opens the drawer; `sidebarLabel` (default "Menu") names the toggle and the drawer. Escape, the close button, the backdrop, a followed link or any navigation closes the drawer, and focus returns to the toggle. `pageFill` lets a wide page such as a board meet the content panel's edges, with no padding, and scroll sideways inside the panel.

## Typography

Uppercase mono (`chip`, `colHead`, `micro`) is for identifiers only: keys, ids, statuses, stage codes. Never set a sentence in it. A section kicker or label that reads as words uses a prose or named style in sentence case, such as `title` (what `RecordSection` renders).

## Focus and targets

Every focusable element gets the global `:focus-visible` ring; an ancestor that clips keeps `border + --ward-focus-offset` of room so the ring is not cut. A small link or link-like button takes the `ward-target` class: it answers across 24 px (`--ward-height-target`, WCAG 2.5.8) without moving its line.

## Verify the package

```sh
npm run check
npm run test:consumer
```

`check` verifies generated tokens, contrast, strict TypeScript, complexity ≤ 5, CSS rules, and tests. `test:consumer` packs Ward, installs the tarball into a clean temporary app, imports its root and CSS entries, renders on the server, and creates a production build.

## Contributing

Bug reports, ideas and pull requests are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md). Please report security problems privately, as described in [SECURITY.md](SECURITY.md). Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md).
