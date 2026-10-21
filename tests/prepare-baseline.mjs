import { readFile, writeFile, mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { transform } from "esbuild";
const original = execFileSync(
  "git",
  ["show", "9b3f279480b532650eeeb7faeed879fe367f2378:index.html"],
  { encoding: "utf8", maxBuffer: 5000000 },
);
const code = original.match(
  /<script type="text\/babel">([\s\S]*?)<\/script>/,
)[1];
const compiled = await transform(code, {
  loader: "jsx",
  jsx: "transform",
  target: "es2020",
});
await mkdir("tests/.baseline", { recursive: true });
let html = original
  .replace("<head>", '<head><base href="/">')
  .replace(/\s*<script src="https:\/\/(?:unpkg.com|www.gstatic.com)[^\n]+/g, "")
  .replace(/\s*<script src="scripts\/emergency.js"><\/script>/, "")
  .replace(
    /<script type="text\/babel">[\s\S]*?<\/script>/,
    '<script type="module" src="/tests/.baseline/main.js"></script>',
  );
await writeFile("tests/.baseline/index.html", html);
await writeFile(
  "tests/.baseline/main.js",
  `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport firebase from '../fixtures/firebase.js';\n${compiled.code}`,
);
console.log(
  "Baseline prepared from original commit; uses isolated test database.",
);
