import React, {useLayoutEffect,useRef,useState} from 'react';
import {displayMoney,moneyDraft,validMoney} from './money.js';
export function MoneyInput({value,defaultValue='',onChange,onBlur,id,name,allowNegative=false,type,min,max,step,...props}) {
  const controlled=value!==undefined;
  const initial=String(value ?? defaultValue ?? '');
  const [raw,setRaw]=useState(initial);
  const ref=useRef(null), lastSent=useRef(initial), caret=useRef(null);
  useLayoutEffect(()=>{
    if (!controlled) return;
    const next=String(value ?? '');
    // Keep a trailing comma/zero while handlers normalize the numeric value.
    if (next===lastSent.current || (validMoney(next,true)&&validMoney(lastSent.current,true)&&Number(next)===Number(lastSent.current))) return;
    lastSent.current=next;setRaw(next);
  },[value,controlled]);
  useLayoutEffect(()=>{
    const input=ref.current;
    input?.setCustomValidity(raw && !validMoney(raw,allowNegative)?'Informe um valor válido. Use vírgula para centavos.':'');
    if(input && caret.current!==null){input.setSelectionRange(caret.current,caret.current);caret.current=null;}
  });
  function change(e){
    const input=e.target, text=input.value, next=moneyDraft(text,allowNegative);
    if(next===null){input.value=displayMoney(raw);return;}
    const before=text.slice(0,input.selectionStart), count=before.replace(/\./g,'').length;
    const formatted=displayMoney(next);let n=0,pos=0;
    for(;pos<formatted.length && n<count;pos++) if(formatted[pos]!=='.')n++;
    caret.current=pos;lastSent.current=next;setRaw(next);
    onChange?.({...e,target:{...input,value:next,id,name},currentTarget:{...input,value:next,id,name}});
  }
  return <>
    <input {...props} ref={ref} id={id?`${id}-display`:undefined} type="text" inputMode="decimal" autoComplete="off" aria-label={props['aria-label'] || props.placeholder || 'Valor em ₣'} value={displayMoney(raw)} onChange={change} onBlur={e=>onBlur?.({...e,target:{...e.target,value:raw}})} />
    {(id || name) && <input type="hidden" id={id} name={name} value={raw} />}
  </>;
}
