import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const temporary = mkdtempSync(join(tmpdir(), "ward-consumer-"));
const app = join(temporary, "consumer");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function run(command, args, cwd, env) {
  return execFileSync(command, args, { cwd, encoding: "utf8", env, stdio: "pipe" });
}

function linkRuntime(modules) {
  for (const dependency of ["react", "react-dom", "scheduler"]) {
    const source = join(root, "node_modules", dependency);
    assert(existsSync(source), `runtime ${dependency} is missing`);
    symlinkSync(source, join(modules, dependency), "dir");
  }
}

function builtCss(appRoot) {
  const html = readFileSync(join(appRoot, "dist", "index.html"), "utf8");
  const asset = html.match(/assets\/(index-[^"]+\.css)/)?.[1];
  assert(asset, "external build CSS asset is missing");
  return readFileSync(join(appRoot, "dist", "assets", asset), "utf8");
}

try {
  const env = { ...process.env, NPM_CONFIG_CACHE: join(temporary, "npm-cache") };
  run("npm", ["run", "build"], root, env);
  const packed = JSON.parse(run("npm", ["pack", "--json", "--pack-destination", temporary], root, env));
  const archive = join(temporary, packed[0].filename);
  mkdirSync(app);
  writeFileSync(join(app, "package.json"), JSON.stringify({ name: "ward-external-consumer", private: true, type: "module" }));
  run("npm", ["install", "--offline", "--ignore-scripts", "--legacy-peer-deps", "--no-audit", "--no-fund", archive], app, env);

  const modules = join(app, "node_modules");
  linkRuntime(modules);
  const wardRoot = join(modules, "@trellis", "ward");
  const manifest = JSON.parse(readFileSync(join(wardRoot, "package.json"), "utf8"));
  const css = readFileSync(join(wardRoot, "dist", "index.css"), "utf8");
  assert(manifest.exports["./styles.css"] === "./dist/index.css", "packed styles export is missing");
  assert(Object.keys(manifest.exports).sort().join(",") === ".,./styles.css", "packed deep imports leaked");
  assert(css.includes("@font-face") && css.includes("box-sizing:border-box"), "packed fonts or reset are missing");
  assert(!readFileSync(join(wardRoot, "dist", "index.js"), "utf8").includes("foundryloop-v2"), "packed code depends on app internals");

  writeFileSync(join(app, "render.mjs"), `
    import React from "react";
    import { renderToStaticMarkup } from "react-dom/server";
    import { ActivityConsole, Btn, NewStreamModal, PageFrame, SectionBand } from "@trellis/ward";
    const html = renderToStaticMarkup(React.createElement(PageFrame, null,
      React.createElement(SectionBand, { label: "Actions" }, React.createElement(Btn, null, "Ship")),
      React.createElement(ActivityConsole, { lines: [{ at: "2026-09-04T02:06:11Z", kind: "ok", text: "External event" }], connection: "live" })));
    if (!NewStreamModal || !html.includes("Ship") || !html.includes("External event") || !html.includes("data-ward-page-frame")) throw new Error("Ward did not render");
  `);
  run(process.execPath, [join(app, "render.mjs")], app, env);

  writeFileSync(join(app, "index.html"), "<div id=app></div><script type=module src=/main.js></script>");
  writeFileSync(join(app, "main.js"), `
    import React from "react";
    import { createRoot } from "react-dom/client";
    import { AppShell, PageFrame, WorkCard } from "@trellis/ward";
    import "@trellis/ward/styles.css";
    const item = { id: "1", key: "TR-1", title: "External Ward consumer", streamStep: 1, timeInStage: 60, waitsOn: "review" };
    createRoot(document.getElementById("app")).render(React.createElement(AppShell, null,
      React.createElement(PageFrame, null, React.createElement(WorkCard, { item }))));
  `);
  run(join(root, "node_modules", ".bin", "vite"), ["build"], app, env);
  assert(existsSync(join(app, "dist", "index.html")), "external production build is missing");
  assert(builtCss(app).includes("--ward-color-bg"), "external build omitted Ward CSS");
  console.log("packed Ward consumer: install + import + render + build green");
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
