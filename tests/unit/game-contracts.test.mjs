import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import { format } from "prettier";
const original = execFileSync(
  "git",
  ["show", "9b3f279480b532650eeeb7faeed879fe367f2378:index.html"],
  { encoding: "utf8", maxBuffer: 5000000 },
).match(/<script type="text\/babel">([\s\S]*?)<\/script>/)[1];
const nodes = parse(original, { sourceType: "script", plugins: ["jsx"] })
  .program.body;
const definitions = new Map(
  nodes.flatMap((node) =>
    node.type === "VariableDeclaration"
      ? node.declarations.map((d) => [d.id.name, d])
      : [],
  ),
);
const print = (node) =>
  format("const " + generate(node, { comments: false }).code + ";", {
    parser: "babel",
  });
test("extracted game formulas, prices, injuries and formation constants match the original", async () => {
  let count = 0;
  for (const file of readdirSync("src/game").filter((f) => f.endsWith(".js") && f !== "progression.js")) {
    const ast = parse(readFileSync("src/game/" + file, "utf8"), {
      sourceType: "module",
    });
    for (const node of ast.program.body) {
      if (
        node.type !== "ExportNamedDeclaration" ||
        node.declaration?.type !== "VariableDeclaration"
      )
        continue;
      for (const d of node.declaration.declarations) {
        assert.ok(definitions.has(d.id.name), d.id.name);
        assert.equal(
          await print(d),
          await print(definitions.get(d.id.name)),
          d.id.name,
        );
        count++;
      }
    }
  }
  assert.ok(count >= 30, `Compared ${count} extracted definitions`);
});
