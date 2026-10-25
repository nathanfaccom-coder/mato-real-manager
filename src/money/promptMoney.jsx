import React, {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {MoneyInput} from './MoneyInput.jsx';
import {validMoney} from './money.js';
function MoneyDialog({message,initial,allowNegative,finish}) {
  const [value,setValue]=useState(String(initial ?? ''));
  const dialog=useRef(null);
  useEffect(()=>{dialog.current.showModal();dialog.current.querySelector('input')?.focus();},[]);
  return <dialog ref={dialog} className="money-dialog" onCancel={e=>{e.preventDefault();finish(null);}} aria-labelledby="money-dialog-title">
    <form onSubmit={e=>{e.preventDefault();if(validMoney(value,allowNegative))finish(value);}}>
      <h3 id="money-dialog-title">Informar valor</h3>
      <p style={{whiteSpace:'pre-wrap'}}>{message}</p>
      <MoneyInput className="input-field" value={value} allowNegative={allowNegative} onChange={e=>setValue(e.target.value)} required aria-label="Valor em ₣" />
      <p className="money-hint">Exemplo: 100.000 = cem mil. Para centavos, use vírgula.</p>
      <div style={{display:'flex',gap:10}}><button type="button" className="btn btn-ghost" onClick={()=>finish(null)}>Cancelar</button><button type="submit" className="btn btn-green" disabled={!validMoney(value,allowNegative)}>Confirmar</button></div>
    </form>
  </dialog>;
}
export function promptMoney(message,initial='',options={}) {
  return new Promise(resolve=>{
    const previous=document.activeElement, host=document.createElement('div');document.body.appendChild(host);
    const root=createRoot(host);let done=false;
    const finish=value=>{if(done)return;done=true;host.querySelector('dialog')?.close();queueMicrotask(()=>{root.unmount();host.remove();previous?.focus();resolve(value);});};
    root.render(<MoneyDialog message={message} initial={initial} allowNegative={!!options.allowNegative} finish={finish}/>);
  });
}
