// UI uses Brazilian punctuation; application state keeps an ungrouped decimal string.
export function moneyDraft(text, allowNegative = false) {
  let s=String(text ?? '').replace(/(?:R\$|₣)/g,'').replace(/\s/g,'');
  if (!/^-?[\d.,]*$/.test(s) || (!allowNegative && s.startsWith('-')) || (s.match(/,/g)||[]).length>1) return null;
  s=s.replace(/\./g,'');
  const [integer, decimals]=s.split(',');
  if ((decimals?.length || 0)>2) return null;
  const negative=integer.startsWith('-');
  const digits=integer.replace('-','').replace(/^0+(?=\d)/,'');
  if (digits.length>15) return null;
  const whole=(negative?'-':'')+(digits || (decimals!==undefined?'0':''));
  return whole + (decimals!==undefined?'.'+decimals:'');
}
export function displayMoney(raw) {
  if (raw===null || raw===undefined || raw==='' || Number.isNaN(raw)) return '';
  const [integer,decimal]=String(raw).split('.');
  return integer.replace(/\B(?=(\d{3})+(?!\d))/g,'.')+(decimal!==undefined?','+decimal:'');
}
export function validMoney(raw, allowNegative = false) {
  return /^-?\d+(\.\d{0,2})?$/.test(String(raw)) && Number.isFinite(Number(raw)) && Math.abs(Number(raw))<=999999999999999 && (allowNegative || Number(raw)>=0);
}
