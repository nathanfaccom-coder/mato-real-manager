import test from 'node:test';import assert from 'node:assert/strict';
import {moneyDraft,displayMoney,validMoney} from '../../src/money/money.js';
test('Brazilian grouped input is preserved numerically, including millions and pasted currency',()=>{
 for(const [input,raw] of [['100000','100000'],['100.000','100000'],['1.000.000','1000000'],['₣ 100.000,50','100000.50'],['R$ 1.234,56','1234.56'],['0001000','1000']])assert.equal(moneyDraft(input),raw);
 assert.equal(displayMoney('100000'),'100.000');assert.equal(displayMoney('100000.50'),'100.000,50');
});
test('empty and fractional edits remain editable while validation protects submission',()=>{
 assert.equal(moneyDraft(''),'');assert.equal(moneyDraft('1.000,'),'1000.');assert.equal(displayMoney('1000.'),'1.000,');
 assert.equal(validMoney(''),false);assert.equal(validMoney('-'),false);assert.equal(validMoney('1000.50'),true);
 for(const input of ['1e6','100abc','10,50,2','10,123','1/2','9999999999999999']) assert.equal(moneyDraft(input),null);
});
test('negative balances are explicit and regular amounts cannot become negative',()=>{
 assert.equal(moneyDraft('-1.000'),null);assert.equal(moneyDraft('-1.000',true),'-1000');assert.equal(displayMoney('-1000'),'-1.000');
 assert.equal(validMoney('-1000'),false);assert.equal(validMoney('-1000',true),true);
});
