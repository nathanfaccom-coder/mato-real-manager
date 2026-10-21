import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
const root = resolve("dist");
const server = createServer(async (req, res) => {
  try {
    const relative = new URL(req.url, "http://localhost").pathname.replace(
      /^\/game\//,
      "",
    );
    const path = resolve(root, relative || "index.html");
    if (!path.startsWith(root + "/")) throw new Error("Invalid path");
    res.setHeader(
      "Content-Type",
      {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".webp": "image/webp",
        ".jpg": "image/jpeg",
      }[extname(path)] || "application/octet-stream",
    );
    res.end(await readFile(path));
  } catch {
    res.statusCode = 404;
    res.end("Not found");
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
let browser;
try {
  browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--no-zygote"],
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [],
    missing = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) missing.push(r.url());
  });
  await page.route("**/*", (r) =>
    new URL(r.request().url()).hostname === "127.0.0.1"
      ? r.continue()
      : r.abort(),
  );
  await page.goto(`http://127.0.0.1:${server.address().port}/game/index.html`);
  await page.locator(".login-wrapper").waitFor();
  assert.deepEqual(errors, []);
  assert.deepEqual(missing, []);
  const sw = await readFile("dist/service-worker.js", "utf8");
  const paths = JSON.parse(sw.match(/const PRECACHE = (\[.*?\]);/s)[1]);
  for (const path of paths) await readFile(resolve(root, path));
  console.log(
    `Production build renders from a subdirectory; all ${paths.length} precache files exist. External services blocked.`,
  );
} finally {
  await browser?.close();
  await new Promise((r) => server.close(r));
}
