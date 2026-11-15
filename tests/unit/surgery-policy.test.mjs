import test from 'node:test';
import assert from 'node:assert/strict';
import {SURGERY_OPTIONS,surgeryCategory,surgeryTerms} from '../../src/medical/surgery-policy.js';
import {INJURIES_DB} from '../../src/game/INJURIES_DB.js';
const quote=(changes={})=>surgeryTerms({procedureId:'ARTHROSCOPY',doctor:{energy:100,level:1},player:{injury:INJURIES_DB.GRAVE[0]},team:{},...changes});
test('surgical catalog retains all five procedures and category matching',()=>{
 assert.equal(Object.values(SURGERY_OPTIONS).flat().length,5);
 for(const category of Object.keys(SURGERY_OPTIONS))for(const injury of INJURIES_DB[category]){
  assert.equal(surgeryCategory({label:injury}),category);
  for(const procedure of SURGERY_OPTIONS[category]){const terms=quote({procedureId:procedure.id,player:{injury}});assert.equal(terms.finalCost,procedure.cost);assert.equal(terms.timeRed,procedure.timeRed);}
 }
 assert.equal(surgeryCategory(null),'LEVE');assert.throws(()=>quote({player:{injury:'Intoxicação Alimentar'}}));assert.throws(()=>quote({procedureId:'ROBOTIC'}));
});
test('coverage uses the better policy, discount precedes coverage and fee excludes coverage',()=>{
 const doctor={energy:100,level:5,perks:[{id:'VIP_DISCOUNT'},{id:'MIRACLE_WORKER'},{id:'COLD_BLOOD'}]};
 const q=quote({doctor,team:{healthPlan:{coverage:50}},player:{injury:INJURIES_DB.GRAVE[0],healthPlan:{coverage:80}}});
 assert.equal(q.baseCost,1350000);assert.equal(q.finalCost,270000);assert.equal(q.doctorFee,135000);assert.equal(q.timeRed,4);assert.equal(q.failurePenalty,0);
 assert.equal(quote({team:{healthPlan:{coverage:100}}}).finalCost,0);
});
test('precision respects fatigue, golden hands and 99 percent cap',()=>{
 assert.ok(Math.abs(quote({doctor:{energy:40,level:1}}).chance-0.67)<1e-12);
 assert.ok(Math.abs(quote({doctor:{energy:50,level:1,perks:[{id:'GOLDEN_HANDS'}]}}).chance-0.92)<1e-12);
 assert.equal(quote({doctor:{energy:100,level:100}}).chance,0.99);
 assert.throws(()=>quote({doctor:{energy:39,level:1}}));
});
test('invalid financial input cannot produce negative or NaN surgery costs',()=>{
 for(const coverage of [-1,101,NaN,Infinity,'50'])assert.throws(()=>quote({team:{healthPlan:{coverage}}}));
 const q=quote({team:{healthPlan:{coverage:33.333333}}});assert.equal(q.finalCost,1000000.01);
});
