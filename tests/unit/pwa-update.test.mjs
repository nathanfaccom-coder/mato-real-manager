import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import {readFile} from 'node:fs/promises';
const code=await readFile(new URL('../../scripts/update.js',import.meta.url),'utf8');
test('recovery deletes only game offline cache and worker, preserving other storage',async()=>{
 let click,target;const deleted=[],removed=[];const button={addEventListener:(n,fn)=>click=fn},status={};
 const context={URL,Date,Promise,Error,document:{getElementById:id=>id==='update-game'?button:status},location:{href:'https://example.test/game/update.html',replace:u=>target=u},navigator:{onLine:true,serviceWorker:{getRegistrations:async()=>[{scope:'https://example.test/game/',unregister:async()=>removed.push('game')},{scope:'https://example.test/other/',unregister:async()=>removed.push('other')}]}},fetch:async()=>({ok:true}),caches:{keys:async()=>['matoreal-static-old','unrelated-cache'],delete:async k=>deleted.push(k)},localStorage:{clear:()=>assert.fail('Must preserve user data')},indexedDB:{deleteDatabase:()=>assert.fail('Must preserve Firebase cache')}};
 context.window=context;vm.runInNewContext(code,context);await click();assert.deepEqual(deleted,['matoreal-static-old']);assert.deepEqual(removed,['game']);assert.match(target,/game\/index.html\?updated=/);
});
test('offline recovery keeps the old installation and allows retry',async()=>{
 let click;const button={addEventListener:(n,fn)=>click=fn},status={};vm.runInNewContext(code,{document:{getElementById:id=>id==='update-game'?button:status},navigator:{onLine:false},Error});await click();assert.equal(button.disabled,false);assert.match(status.textContent,/internet/);
});
