import React,{useLayoutEffect,useRef} from 'react';
import {fmt} from '../game/fmt.js';
export function HeaderBalance({value}) {
 const outer=useRef(null),inner=useRef(null),text=fmt(value);
 useLayoutEffect(()=>{
  const fit=()=>{if(!outer.current||!inner.current)return;inner.current.style.fontSize='16px';const w=inner.current.scrollWidth, available=outer.current.clientWidth; if(w>available)inner.current.style.fontSize=`${16*available/w}px`;};
  fit();const observer=new ResizeObserver(fit);observer.observe(outer.current);return ()=>observer.disconnect();
 },[text]);
 return <div ref={outer} className="header-balance" title={text} aria-label={`Saldo: ${text}`}><span ref={inner}>{text}</span></div>;
}
