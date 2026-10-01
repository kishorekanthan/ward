import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { request } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { serveStatic } from "./story-server.mjs";

const work = mkdtempSync(join(tmpdir(), "ward-story-server-"));
mkdirSync(join(work, "storybook-static"));
mkdirSync(join(work, "storybook-static-old"));
writeFileSync(join(work, "storybook-static", "iframe.html"), "<p>story</p>");
writeFileSync(join(work, "package.json"), "SECRET-PACKAGE");
writeFileSync(join(work, "storybook-static-old", "leak.txt"), "SECRET-SIBLING");

const server = serveStatic(join(work, "storybook-static"));
let port;

function get(path, host = `127.0.0.1:${port}`) {
  return new Promise((done, fail) => {
    const req = request({ host: "127.0.0.1", port, path, headers: { host } }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => done({ status: res.statusCode, body }));
    });
    req.on("error", fail);
    req.end();
  });
}

beforeAll(async () => {
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  port = server.address().port;
});
afterAll(() => new Promise((r) => server.close(r)));

describe("story server", () => {
  it("serves a story asset", async () => {
    expect(await get("/iframe.html?viewMode=story")).toEqual({ status: 200, body: "<p>story</p>" });
  });

  it("refuses an encoded climb out of the static folder with no file bytes", async () => {
    expect(await get("/%2e%2e/package.json")).toEqual({ status: 403, body: "" });
  });

  it("refuses a climb into a sibling folder that shares the static folder's name as a prefix", async () => {
    expect(await get("/%2e%2e/storybook-static-old/leak.txt")).toEqual({ status: 403, body: "" });
  });

  it("refuses a foreign Host header even for a real asset", async () => {
    expect(await get("/iframe.html", "attacker.example")).toEqual({ status: 403, body: "" });
  });

  it("refuses any Host other than 127.0.0.1 and its port", async () => {
    expect(await get("/iframe.html", `localhost:${port}`)).toEqual({ status: 403, body: "" });
  });

  it("answers a malformed escape with 403 instead of throwing", async () => {
    expect(await get("/%E0%A4%A")).toEqual({ status: 403, body: "" });
  });

  it("answers 404 for a missing file inside the folder", async () => {
    expect((await get("/nope.js")).status).toBe(404);
  });
});
