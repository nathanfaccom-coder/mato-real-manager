import{j as t}from"./app--GBijVkU.js";import"./react-nf7bT_Uh.js";const m=({player:i,teamName:g,teamLogo:r,onFaceUpload:o})=>{if(!i)return null;const d=i.attributes||{},a=i.overall||50,c=i.position||"ATA",s=x=>{let f=0,n=0;return x.forEach(p=>{d[p]!==void 0&&(f+=d[p],n++)}),n?Math.round(f/n):50};let e=[];c==="GOL"?e=[{l:"DIV",v:s(["gk","jump"])},{l:"HAN",v:s(["gk","balance"])},{l:"KIC",v:s(["longPass","gk"])},{l:"REF",v:s(["response","gk"])},{l:"SPD",v:s(["speed","accel"])},{l:"POS",v:s(["mentality","gk"])}]:e=[{l:"RIT",v:s(["speed","accel"])},{l:"FIN",v:s(["shot","shotPower","shotTech"])},{l:"PAS",v:s(["shortPass","longPass","curve"])},{l:"DRI",v:s(["dribble","agility","tech"])},{l:"DEF",v:s(["defense","aggression"])},{l:"FÍS",v:s(["stamina","balance","jump"])}];let l="fut-bronze";return a>=80?l="fut-gold":a>=65&&(l="fut-silver"),t.jsxs("div",{style:{display:"flex",justifyContent:"center",marginBottom:"15px"},children:[t.jsx("style",{children:`
                .fut-card {
                    width: 220px; height: 320px; position: relative;
                    border-radius: 10px 10px 40px 40px; padding: 15px; color: #333;
                    font-family: 'Arial', sans-serif; box-shadow: 0 10px 25px rgba(0,0,0,0.8);
                    overflow: hidden; text-transform: uppercase;
                }
                .fut-card::after {
                    content: ''; position: absolute; top:0; left:0; right:0; bottom:0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 100%);
                    pointer-events: none;
                }
                .fut-gold { background: linear-gradient(135deg, #f9d976 0%, #e9b646 50%, #c4952d 100%); color: #4a3600; border: 2px solid #ffe699; }
                .fut-silver { background: linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 50%, #9e9e9e 100%); color: #222; border: 2px solid #f5f5f5; }
                .fut-bronze { background: linear-gradient(135deg, #d29d71 0%, #b87333 50%, #8c531b 100%); color: #3e2004; border: 2px solid #eab890; }
                
                .fut-top { display: flex; justify-content: space-between; align-items: flex-start; }
                .fut-top-left { text-align: center; }
                .fut-ovr { font-size: 32px; font-weight: 900; line-height: 1; }
                .fut-pos { font-size: 14px; font-weight: bold; }
                .fut-logo { width: 30px; height: 30px; object-fit: contain; }
                
                .fut-img-container { text-align: center; margin-top: -10px; position: relative; z-index: 2; }
                .fut-img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(255,255,255,0.5); box-shadow: 0 5px 15px rgba(0,0,0,0.4); background: #333; }
                
                .fut-name { text-align: center; font-size: 18px; font-weight: 900; margin-top: 10px; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: 1px; }
                
                .fut-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 15px; font-size: 13px; margin-top: 12px; padding: 0 20px; }
                .fut-stat-row { display: flex; justify-content: center; align-items: center; font-weight: bold; }
                .fut-stat-val { font-weight: 900; font-size: 16px; width: 28px; text-align: right; margin-right: 6px; }
                .fut-stat-row span:last-child { width: 30px; text-align: left; }
            `}),t.jsxs("div",{className:`fut-card ${l}`,children:[t.jsxs("div",{className:"fut-top",children:[t.jsxs("div",{className:"fut-top-left",children:[t.jsx("div",{className:"fut-ovr",children:a}),t.jsx("div",{className:"fut-pos",children:c})]}),r&&t.jsx("img",{src:r,className:"fut-logo"})]}),t.jsxs("div",{className:"fut-img-container",children:[i.face?t.jsx("img",{src:i.face,className:"fut-img"}):t.jsx("div",{className:"fut-img",style:{display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,color:"#fff"},children:"👤"}),o&&t.jsxs("label",{style:{position:"absolute",bottom:5,right:25,background:"var(--blue)",color:"white",borderRadius:"50%",width:25,height:25,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:12,border:"2px solid #121212",zIndex:10},children:["📷"," ",t.jsx("input",{type:"file",style:{display:"none"},accept:"image/*",onChange:o})]})]}),t.jsx("div",{className:"fut-name",children:i.name}),t.jsxs("div",{className:"fut-stats",children:[t.jsxs("div",{children:[t.jsxs("div",{className:"fut-stat-row",children:[t.jsx("span",{className:"fut-stat-val",children:e[0].v}),t.jsx("span",{children:e[0].l})]}),t.jsxs("div",{className:"fut-stat-row",children:[t.jsx("span",{className:"fut-stat-val",children:e[1].v}),t.jsx("span",{children:e[1].l})]}),t.jsxs("div",{className:"fut-stat-row",children:[t.jsx("span",{className:"fut-stat-val",children:e[2].v}),t.jsx("span",{children:e[2].l})]})]}),t.jsxs("div",{children:[t.jsxs("div",{className:"fut-stat-row",children:[t.jsx("span",{className:"fut-stat-val",children:e[3].v}),t.jsx("span",{children:e[3].l})]}),t.jsxs("div",{className:"fut-stat-row",children:[t.jsx("span",{className:"fut-stat-val",children:e[4].v}),t.jsx("span",{children:e[4].l})]}),t.jsxs("div",{className:"fut-stat-row",children:[t.jsx("span",{className:"fut-stat-val",children:e[5].v}),t.jsx("span",{children:e[5].l})]})]})]})]})]})};export{m as P};
