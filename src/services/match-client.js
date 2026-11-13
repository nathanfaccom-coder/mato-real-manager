export function createMatchClient({auth,endpoint,fetchImpl=fetch}) {
 async function request(route,payload) {
  const identity=auth.currentUser;
  if(!identity)throw Error('Entre na sua conta para acompanhar partidas.');
  const token=await identity.getIdToken(route==='fixture-review'||route==='fixture-approve'||route==='match-correction-review'||route==='match-correct');
  if(auth.currentUser!==identity)throw Error('A sessão mudou. Entre novamente.');
  const response=await fetchImpl(`${endpoint}/${route}`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(payload),credentials:'omit',redirect:'error',cache:'no-store',signal:AbortSignal.timeout(20000)});
  if(response.status===401)throw Error((route.startsWith('fixture-')||route==='match-correction-review'||route==='match-correct')?'Confirme novamente sua senha de ADM para continuar.':'Sessão expirada. Entre novamente.');
  if(route==='surgery-execute'&&response.status===409)throw Object.assign(Error('As condições mudaram. Confira a cirurgia novamente.'),{code:'SURGERY_REVIEW_REQUIRED'});
  if(!response.ok)throw Error('Não foi possível consultar ou atualizar a partida. Confira a conexão e sua autorização.');
  const result=await response.json();
  if(auth.currentUser!==identity)throw Error('A sessão mudou. Entre novamente.');
  return result;
 }
 return {
  consumeStaffItem:({requestId,itemId})=>request('staff-consume',{requestId,itemId}),
  consumeItem:({requestId,itemId})=>request('consume-item',{requestId,itemId}),
  equipItem:({requestId,itemId})=>request('equip-item',{requestId,itemId}),
  trainSolo:({requestId,type})=>request('solo-training',{requestId,type}),
  reviewSurgery:playerId=>request('surgery-review',{playerId}),
  operate:({requestId,playerId,procedureId,quote})=>request('surgery-execute',{requestId,playerId,procedureId,quote}),
  evaluatePlayer:({requestId,playerId})=>request('medical-evaluate',{requestId,playerId}),
  doctorStudy:({requestId})=>request('doctor-study',{requestId}),
  staffPerks:()=>request('staff-perks',{}),
  chooseStaffPerk:({revision,perkId})=>request('staff-perk-choose',{revision,perkId}),
  assistantPerks:()=>request('assistant-perks',{}),
  chooseAssistantPerk:({revision,perkId})=>request('assistant-perk-choose',{revision,perkId}),
  study:({requestId})=>request('staff-study',{requestId}),
  recover:({requestId,playerIds})=>request('staff-recovery',{requestId,playerIds}),
  standings:({competitionId,seasonId})=>request('competition-standings',{competitionId,seasonId}),
  reviewCorrection:matchId=>request('match-correction-review',{matchId}),
  correct:({matchId,expectedRevision,reason,score,ownGoals,players})=>request('match-correct',{matchId,expectedRevision,reason,score,ownGoals,players:Object.fromEntries(Object.entries(players).map(([id,{goals,assists,tackles,saves,yellows,reds,rating}])=>[id,{goals,assists,tackles,saves,yellows,reds,rating}]))}),
  reviewFixture:fixtureId=>request('fixture-review',{fixtureId}),
  approveFixture:({fixtureId,homeId,awayId,competitionId,seasonId,approved,expectedRevision,reason})=>request('fixture-approve',{fixtureId,homeId,awayId,competitionId,seasonId,approved,expectedRevision,reason}),
  list:()=>request('match-list',{}),
  read:matchId=>request('match-view',{matchId}),
  start:({requestId,fixtureId,homeId,awayId})=>request('start',fixtureId?{requestId,fixtureId}:{requestId,homeId,awayId}),
  command:({matchId,requestId,kind,formation,posture,changes,playerId,penaltyAt})=>request('command',{matchId,requestId,kind,...(kind==='tactics'?{formation,posture}:kind==='substitutions'?{changes:changes.map(({outId,inId})=>({outId,inId}))}:{playerId,penaltyAt})}),
 };
}
