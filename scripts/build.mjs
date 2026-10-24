import { build } from "vite";
import { createHash } from "node:crypto";
import {
  cp,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
// Vite can keep old hashed bundles when emptyOutDir is disabled. Clear its
// output directory first so the release and service-worker cache only contain
// assets referenced by the current HTML.
await rm("dist/build", { recursive: true, force: true });
await mkdir("dist/build", { recursive: true });
await build();
await rename("dist/app.html", "dist/index.html");
// Keep manifest paths relative to pwa/, not to Vite's hashed build/ directory.
let html = await readFile("dist/index.html", "utf8");
html = html.replace(
  /href="[^"]*manifest-[^"]+\.json"/,
  'href="./pwa/manifest.json"',
);
await writeFile("dist/index.html", html);
const builtFiles = (await readdir("dist/build"))
  .filter((file) => /\.(js|css)$/.test(file))
  .sort();
const version = createHash("sha256").update(html).update(builtFiles.join("\n")).update(await readFile("scripts/pwa.js")).update(await readFile("scripts/service-worker.template.js")).digest("hex").slice(0, 12);
const precache = [
  "./index.html",
  ...builtFiles.map((file) => "./build/" + file),
  "./assets/icon.png",
  "./assets/img1.webp",
  "./assets/img2.jpg",
  "./assets/img3.jpg",
  "./scripts/pwa.js",
];
const sw = (await readFile("scripts/service-worker.template.js", "utf8"))
  .replace("__VERSION__", version)
  .replace("__PRECACHE__", JSON.stringify(precache));
await writeFile("service-worker.js", sw);
await writeFile("dist/service-worker.js", sw);
for (const folder of ["assets", "pwa", "scripts"]) {
  await cp(folder, `dist/${folder}`, {
    recursive: true,
    filter: (path) =>
      !path.endsWith("build.mjs") && !path.endsWith("emergency.js"),
  });
}
// Keep the existing GitHub Pages /main/root deployment working without changing
// repository settings. The generated entry point is never edited by hand.
await rm("build", { recursive: true, force: true });
await cp("dist/build", "build", { recursive: true });
await cp("dist/index.html", "index.html");
await cp("update.html", "dist/update.html");
await writeFile(".nojekyll", "");
await writeFile("dist/.nojekyll", "");
console.log("Built dist/ and the existing static GitHub Pages entry point.");
