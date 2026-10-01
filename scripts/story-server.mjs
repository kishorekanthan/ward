/* The static server every rendered check uses. It answers only for files under its folder and only to
   requests addressed to 127.0.0.1:<its port>, so another local process or a rebound DNS name gets 403. */
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

function decodedPath(url) {
  try {
    return decodeURIComponent(url.split("?")[0]);
  } catch {
    return null;
  }
}

function fileFor(dir, url) {
  const path = decodedPath(url);
  if (path === null) return null;
  const file = join(dir, path);
  return file.startsWith(dir + sep) ? file : null;
}

function answer(res, status, body, type) {
  res.writeHead(status, type ? { "content-type": type } : {});
  res.end(body);
}

export function serveStatic(staticDir) {
  const dir = resolve(staticDir);
  const server = createServer((req, res) => {
    const file = req.headers.host === `127.0.0.1:${server.address().port}` ? fileFor(dir, req.url) : null;
    if (!file) return answer(res, 403);
    try {
      answer(res, 200, readFileSync(file), MIME[extname(file)] ?? "application/octet-stream");
    } catch {
      answer(res, 404);
    }
  });
  return server;
}
