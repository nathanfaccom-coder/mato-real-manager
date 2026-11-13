import {INJURIES_DB} from '../game/INJURIES_DB.js';

export const SURGERY_OPTIONS = {
 MODERADA:[{id:'PRP',name:'Fisioterapia PRP',timeRed:2,cost:750000,baseSuccess:0.85}],
 GRAVE:[{id:'ARTHROSCOPY',name:'Artroscopia',timeRed:3,cost:1500000,baseSuccess:0.8},{id:'MENISCAL',name:'Sutura Meniscal',timeRed:4,cost:3500000,baseSuccess:0.7}],
 EXTREMA:[{id:'GRAFT',name:'Enxerto Ligamentar',timeRed:6,cost:8000000,baseSuccess:0.65},{id:'ROBOTIC',name:'Cirurgia Robótica',timeRed:8,cost:15000000,baseSuccess:0.5}],
};
export function surgeryCategory(injury) {
 const name=typeof injury==='object'?injury?.label:injury;
 return ['MODERADA','GRAVE','EXTREMA'].find(category=>INJURIES_DB[category].includes(name))??'LEVE';
}
// Convert a finite nonnegative decimal percentage to a rational without binary
// floating-point loss at half-cent boundaries (including scientific notation).
function coveredCost(baseCost,coverage) {
 const [mantissa,exponent='0']=String(coverage).split('e');
 const places=(mantissa.split('.')[1]??'').length-Number(exponent);
 const numerator=BigInt(mantissa.replace('.',''))*(places<0?10n**BigInt(-places):1n);
 const denominator=places>0?10n**BigInt(places):1n;
 const divisor=100n*denominator;
 const cents=BigInt(Math.round(baseCost*100))*(divisor-numerator);
 return Number((cents+divisor/2n)/divisor)/100;
}
// Shared sporting/economic policy only. This does not authorize a database write.
export function surgeryTerms({procedureId,doctor,player,team}) {
 const category=surgeryCategory(player.injury),procedure=SURGERY_OPTIONS[category]?.find(p=>p.id===procedureId);
 if(!procedure)throw Error('Procedimento incompatível com a lesão.');
 const energy=doctor.energy??100,level=doctor.level??1;
 if(!Number.isFinite(energy)||energy<40||energy>100||!Number.isSafeInteger(level)||level<1)throw Error('Médico sem condições para operar.');
 const has=id=>Array.isArray(doctor.perks)&&doctor.perks.some(p=>p?.id===id);
 const coverageValues=[team?.healthPlan?.coverage??0,player.healthPlan?.coverage??0];
 if(coverageValues.some(v=>!Number.isFinite(v)||v<0||v>100))throw Error('Cobertura médica inválida.');
 const coverage=Math.max(...coverageValues);
 const baseCost=has('VIP_DISCOUNT')?procedure.cost*0.9:procedure.cost;
 // Round payable money once to cents; never subtract an unbounded coverage.
 const finalCost=coveredCost(baseCost,coverage);
 const doctorFee=Math.round(baseCost*10)/100;
 const chance=Math.min(0.99,Math.max(0.1,procedure.baseSuccess+level*0.02-(energy<50?0.15:0)+(has('GOLDEN_HANDS')?0.1:0)));
 return {procedureId,category,name:procedure.name,baseCost,finalCost,doctorFee,coverage,chance,energyCost:40,timeRed:procedure.timeRed+(has('MIRACLE_WORKER')?1:0),failurePenalty:has('COLD_BLOOD')?0:2};
}
