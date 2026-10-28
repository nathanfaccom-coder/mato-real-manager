export function createMatchClient({auth,endpoint,fetchImpl=fetch}) {
 async function request(route,payload) {
  const identity=auth.currentUser;
  if(!identity)throw Error('Entre na sua conta para acompanhar partidas.');
  const token=await identity.getIdToken(route==='fixture-review'||route==='fixture-approve');
  if(auth.currentUser!==identity)throw Error('A sessão mudou. Entre novamente.');
  const response=await fetchImpl(`${endpoint}/${route}`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(payload),credentials:'omit',redirect:'error',cache:'no-store',signal:AbortSignal.timeout(20000)});
  if(response.status===401)throw Error(route.startsWith('fixture-')?'Confirme novamente sua senha de ADM para continuar.':'Sessão expirada. Entre novamente.');
  if(!response.ok)throw Error('Não foi possível consultar ou atualizar a partida. Confira a conexão e sua autorização.');
  const result=await response.json();
  if(auth.currentUser!==identity)throw Error('A sessão mudou. Entre novamente.');
  return result;
 }
 return {
  reviewFixture:fixtureId=>request('fixture-review',{fixtureId}),
  approveFixture:({fixtureId,homeId,awayId,competitionId,seasonId,approved,expectedRevision,reason})=>request('fixture-approve',{fixtureId,homeId,awayId,competitionId,seasonId,approved,expectedRevision,reason}),
  list:()=>request('match-list',{}),
  read:matchId=>request('match-view',{matchId}),
  start:({requestId,fixtureId,homeId,awayId})=>request('start',fixtureId?{requestId,fixtureId}:{requestId,homeId,awayId}),
  command:({matchId,requestId,kind,formation,posture,changes,playerId,penaltyAt})=>request('command',{matchId,requestId,kind,...(kind==='tactics'?{formation,posture}:kind==='substitutions'?{changes:changes.map(({outId,inId})=>({outId,inId}))}:{playerId,penaltyAt})}),
 };
}
