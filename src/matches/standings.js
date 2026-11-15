export const TABLE_COUNTERS=['played','pts','wins','draws','losses','gf','ga'];
export function tableResult(score,side){
 const gf=score[side],ga=score[1-side];
 return {played:1,pts:gf>ga?3:gf===ga?1:0,wins:Number(gf>ga),draws:Number(gf===ga),losses:Number(gf<ga),gf,ga};
}
export function reviseTable(current={},before,after){
 return Object.fromEntries(TABLE_COUNTERS.map(k=>[k,(current[k]||0)-(before?.[k]||0)+(after?.[k]||0)]));
}
