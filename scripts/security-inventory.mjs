import {readdir,readFile,writeFile} from 'node:fs/promises';
import {parse} from '@babel/parser';
const files=[];async function scan(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=`${dir}/${entry.name}`;if(entry.isDirectory()&&!['node_modules','tests'].includes(entry.name))await scan(path);else if(entry.isFile()&&/\.(js|jsx|mjs)$/.test(path))files.push(path);}}
await scan('src');await scan('server');
const entries=[];const methods=new Set(['collection','doc','where','orderBy','limit','get','add','set','update','delete','onSnapshot','runTransaction','batch']);
for(const file of files){const code=await readFile(file,'utf8');const ast=parse(code,{sourceType:'module',plugins:['jsx']});
 function walk(node){if(!node||typeof node!=='object')return;if(node.type==='CallExpression'&&node.callee?.type==='MemberExpression'&&!node.callee.computed&&methods.has(node.callee.property.name))entries.push({file,line:node.loc.start.line,method:node.callee.property.name,expression:code.slice(node.start,node.end)});for(const [key,value]of Object.entries(node)){if(['loc','start','end','comments','tokens'].includes(key))continue;if(Array.isArray(value))value.forEach(walk);else if(value&&typeof value==='object')walk(value);}}
 walk(ast);
}
const result={scope:'All JS/JSX/MJS under src and server, excluding dependencies and tests. Candidate SDK operations, not a data-flow proof; Map and auth methods can also appear.',filesScanned:files.length,operationCandidates:entries.length,entries};
await writeFile(process.argv[2]||'security-audit.local.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({filesScanned:files.length,operationCandidates:entries.length,collections:[...new Set(entries.filter(x=>x.method==='collection').map(x=>x.expression.match(/\.collection\(([^)]*)\)/)?.[1]))].sort(),queries:entries.filter(x=>['where','orderBy','limit'].includes(x.method)).map(({file,line,expression})=>({file,line,expression}))},null,2));
