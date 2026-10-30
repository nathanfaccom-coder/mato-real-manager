import {mkdir,rm,writeFile,readFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
// Fixed last published production source, not HEAD or an automatically accepted
// screenshot. Both versions run against the same isolated Firebase fixture.
const production='c1bf3866a99011be0a34e76db19343666ed2fb02';
const target='tests/.baseline';
await rm(target,{recursive:true,force:true});
await mkdir(target,{recursive:true});
const archive=execFileSync('git',['archive',production,'app.html','src','styles','assets','pwa','scripts'],{maxBuffer:50_000_000});
execFileSync('tar',['-xf','-','-C',target],{input:archive});
const html=await readFile(`${target}/app.html`,'utf8');
if(!html.includes('src="/src/main.jsx"'))throw Error('Production entrypoint changed; review baseline setup.');
await writeFile(`${target}/app.html`,html.replace('src="/src/main.jsx"','src="/tests/.baseline/src/main.jsx"'));
await writeFile(`${target}/PRODUCTION_COMMIT`,production+'\n');
console.log(`Visual baseline pinned to published 2.9.11 (${production}).`);
