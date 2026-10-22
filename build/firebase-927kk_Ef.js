var ou={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},bf=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],a=n[t++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},qc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,a=o?n[s+1]:0,u=s+2<n.length,c=u?n[s+2]:0,l=i>>2,h=(i&3)<<4|a>>4;let d=(a&15)<<2|c>>6,g=c&63;u||(g=64,o||(d=64)),r.push(t[l],t[h],t[d],t[g])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Uc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):bf(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const h=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||a==null||c==null||h==null)throw new Tf;const d=i<<2|a>>4;if(r.push(d),c!==64){const g=a<<4&240|c>>2;if(r.push(g),h!==64){const w=c<<6&192|h;r.push(w)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Tf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Sf=function(n){const e=Uc(n);return qc.encodeByteArray(e,!0)},ds=function(n){return Sf(n).replace(/\./g,"")},_f=function(n){try{return qc.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function fs(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Df(t)||(n[t]=fs(n[t],e[t]));return n}function Df(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xf=()=>Cf().__FIREBASE_DEFAULTS__,Af=()=>{if(typeof process>"u"||typeof ou>"u")return;const n=ou.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Nf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&_f(n[1]);return e&&JSON.parse(e)},ko=()=>{try{return xf()||Af()||Nf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},jc=()=>{var n;return(n=ko())===null||n===void 0?void 0:n.config},vI=n=>{var e;return(e=ko())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},n);return[ds(JSON.stringify(t)),ds(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function or(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function II(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(or())}function Of(){var n;const e=(n=ko())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Mf(){return typeof self=="object"&&self.self===self}function EI(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function bI(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function TI(){const n=or();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ff(){return!Of()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function zc(){try{return typeof indexedDB=="object"}catch{return!1}}function Lf(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf="FirebaseError";class Xt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Pf,Object.setPrototypeOf(this,Xt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Vs.prototype.create)}}class Vs{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Vf(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Xt(s,a,r)}}function Vf(n,e){return n.replace(Bf,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Bf=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function au(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function SI(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function qi(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(uu(i)&&uu(o)){if(!qi(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function uu(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _I(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function DI(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function CI(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function $f(n,e){const t=new Uf(n,e);return t.subscribe.bind(t)}class Uf{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");qf(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Si),s.error===void 0&&(s.error=Si),s.complete===void 0&&(s.complete=Si);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function qf(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Si(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(n){return n&&n._delegate?n._delegate:n}class $t{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new kf;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Gf(e))try{this.getOrInitializeService({instanceIdentifier:Ct})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Ct){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ct){return this.instances.has(e)}getOptions(e=Ct){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:zf(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Ct){return this.component?this.component.multipleInstances?e:Ct:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function zf(n){return n===Ct?void 0:n}function Gf(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new jf(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro=[];var F;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(F||(F={}));const Gc={debug:F.DEBUG,verbose:F.VERBOSE,info:F.INFO,warn:F.WARN,error:F.ERROR,silent:F.SILENT},Qf=F.INFO,Hf={[F.DEBUG]:"log",[F.VERBOSE]:"log",[F.INFO]:"info",[F.WARN]:"warn",[F.ERROR]:"error"},Wf=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Hf[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Oo{constructor(e){this.name=e,this._logLevel=Qf,this._logHandler=Wf,this._userLogHandler=null,Ro.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in F))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Gc[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,F.DEBUG,...e),this._logHandler(this,F.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,F.VERBOSE,...e),this._logHandler(this,F.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,F.INFO,...e),this._logHandler(this,F.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,F.WARN,...e),this._logHandler(this,F.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,F.ERROR,...e),this._logHandler(this,F.ERROR,...e)}}function Yf(n){Ro.forEach(e=>{e.setLogLevel(n)})}function Xf(n,e){for(const t of Ro){let r=null;e&&e.level&&(r=Gc[e.level]),n===null?t.userLogHandler=null:t.userLogHandler=(s,i,...o)=>{const a=o.map(u=>{if(u==null)return null;if(typeof u=="string")return u;if(typeof u=="number"||typeof u=="boolean")return u.toString();if(u instanceof Error)return u.message;try{return JSON.stringify(u)}catch{return null}}).filter(u=>u).join(" ");i>=(r??s.logLevel)&&n({level:F[i].toLowerCase(),message:a,args:o,type:s.name})}}}const Jf=(n,e)=>e.some(t=>n instanceof t);let cu,lu;function Zf(){return cu||(cu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function em(){return lu||(lu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Kc=new WeakMap,ji=new WeakMap,Qc=new WeakMap,_i=new WeakMap,Mo=new WeakMap;function tm(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(ot(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Kc.set(t,n)}).catch(()=>{}),Mo.set(e,n),e}function nm(n){if(ji.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});ji.set(n,e)}let zi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ji.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Qc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ot(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function rm(n){zi=n(zi)}function sm(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Di(this),e,...t);return Qc.set(r,e.sort?e.sort():[e]),ot(r)}:em().includes(n)?function(...e){return n.apply(Di(this),e),ot(Kc.get(this))}:function(...e){return ot(n.apply(Di(this),e))}}function im(n){return typeof n=="function"?sm(n):(n instanceof IDBTransaction&&nm(n),Jf(n,Zf())?new Proxy(n,zi):n)}function ot(n){if(n instanceof IDBRequest)return tm(n);if(_i.has(n))return _i.get(n);const e=im(n);return e!==n&&(_i.set(n,e),Mo.set(e,n)),e}const Di=n=>Mo.get(n);function om(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),a=ot(o);return r&&o.addEventListener("upgradeneeded",u=>{r(ot(o.result),u.oldVersion,u.newVersion,ot(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),a.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const am=["get","getKey","getAll","getAllKeys","count"],um=["put","add","delete","clear"],Ci=new Map;function hu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ci.get(e))return Ci.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=um.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||am.includes(t)))return;const i=async function(o,...a){const u=this.transaction(o,s?"readwrite":"readonly");let c=u.store;return r&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&u.done]))[0]};return Ci.set(e,i),i}rm(n=>({...n,get:(e,t,r)=>hu(e,t)||n.get(e,t,r),has:(e,t)=>!!hu(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cm{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(lm(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function lm(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Gi="@firebase/app",du="0.9.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut=new Oo("@firebase/app"),hm="@firebase/app-compat",dm="@firebase/analytics-compat",fm="@firebase/analytics",mm="@firebase/app-check-compat",gm="@firebase/app-check",pm="@firebase/auth",ym="@firebase/auth-compat",wm="@firebase/database",vm="@firebase/database-compat",Im="@firebase/functions",Em="@firebase/functions-compat",bm="@firebase/installations",Tm="@firebase/installations-compat",Sm="@firebase/messaging",_m="@firebase/messaging-compat",Dm="@firebase/performance",Cm="@firebase/performance-compat",xm="@firebase/remote-config",Am="@firebase/remote-config-compat",Nm="@firebase/storage",km="@firebase/storage-compat",Rm="@firebase/firestore",Om="@firebase/firestore-compat",Mm="firebase",Fm="9.22.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="[DEFAULT]",Lm={[Gi]:"fire-core",[hm]:"fire-core-compat",[fm]:"fire-analytics",[dm]:"fire-analytics-compat",[gm]:"fire-app-check",[mm]:"fire-app-check-compat",[pm]:"fire-auth",[ym]:"fire-auth-compat",[wm]:"fire-rtdb",[vm]:"fire-rtdb-compat",[Im]:"fire-fn",[Em]:"fire-fn-compat",[bm]:"fire-iid",[Tm]:"fire-iid-compat",[Sm]:"fire-fcm",[_m]:"fire-fcm-compat",[Dm]:"fire-perf",[Cm]:"fire-perf-compat",[xm]:"fire-rc",[Am]:"fire-rc-compat",[Nm]:"fire-gcs",[km]:"fire-gcs-compat",[Rm]:"fire-fst",[Om]:"fire-fst-compat","fire-js":"fire-js",[Mm]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct=new Map,ar=new Map;function ms(n,e){try{n.container.addComponent(e)}catch(t){Ut.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Hc(n,e){n.container.addOrOverwriteComponent(e)}function pn(n){const e=n.name;if(ar.has(e))return Ut.debug(`There were multiple attempts to register component ${e}.`),!1;ar.set(e,n);for(const t of ct.values())ms(t,n);return!0}function Wc(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Pm(n,e,t=ut){Wc(n,e).clearInstance(t)}function Vm(){ar.clear()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},He=new Vs("app","Firebase",Bm);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $m=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new $t("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw He.create("app-deleted",{appName:this._name})}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo=Fm;function Lo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ut,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw He.create("bad-app-name",{appName:String(s)});if(t||(t=jc()),!t)throw He.create("no-options");const i=ct.get(s);if(i){if(qi(t,i.options)&&qi(r,i.config))return i;throw He.create("duplicate-app",{appName:s})}const o=new Kf(s);for(const u of ar.values())o.addComponent(u);const a=new $m(t,r,o);return ct.set(s,a),a}function Um(n=ut){const e=ct.get(n);if(!e&&n===ut&&jc())return Lo();if(!e)throw He.create("no-app",{appName:n});return e}function qm(){return Array.from(ct.values())}async function Yc(n){const e=n.name;ct.has(e)&&(ct.delete(e),await Promise.all(n.container.getProviders().map(t=>t.delete())),n.isDeleted=!0)}function at(n,e,t){var r;let s=(r=Lm[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ut.warn(a.join(" "));return}pn(new $t(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}function Xc(n,e){if(n!==null&&typeof n!="function")throw He.create("invalid-log-argument");Xf(n,e)}function Jc(n){Yf(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jm="firebase-heartbeat-database",zm=1,ur="firebase-heartbeat-store";let xi=null;function Zc(){return xi||(xi=om(jm,zm,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(ur)}}}).catch(n=>{throw He.create("idb-open",{originalErrorMessage:n.message})})),xi}async function Gm(n){try{return await(await Zc()).transaction(ur).objectStore(ur).get(el(n))}catch(e){if(e instanceof Xt)Ut.warn(e.message);else{const t=He.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ut.warn(t.message)}}}async function fu(n,e){try{const r=(await Zc()).transaction(ur,"readwrite");await r.objectStore(ur).put(e,el(n)),await r.done}catch(t){if(t instanceof Xt)Ut.warn(t.message);else{const r=He.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ut.warn(r.message)}}}function el(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Km=1024,Qm=30*24*60*60*1e3;class Hm{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ym(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=mu();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{const i=new Date(s.date).valueOf();return Date.now()-i<=Qm}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=mu(),{heartbeatsToSend:t,unsentEntries:r}=Wm(this._heartbeatsCache.heartbeats),s=ds(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}}function mu(){return new Date().toISOString().substring(0,10)}function Wm(n,e=Km){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),gu(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),gu(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Ym{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return zc()?Lf().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await Gm(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return fu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return fu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function gu(n){return ds(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xm(n){pn(new $t("platform-logger",e=>new cm(e),"PRIVATE")),pn(new $t("heartbeat",e=>new Hm(e),"PRIVATE")),at(Gi,du,n),at(Gi,du,"esm2017"),at("fire-js","")}Xm("");const Jm=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:Xt,SDK_VERSION:Fo,_DEFAULT_ENTRY_NAME:ut,_addComponent:ms,_addOrOverwriteComponent:Hc,_apps:ct,_clearComponents:Vm,_components:ar,_getProvider:Wc,_registerComponent:pn,_removeServiceInstance:Pm,deleteApp:Yc,getApp:Um,getApps:qm,initializeApp:Lo,onLog:Xc,registerVersion:at,setLogLevel:Jc},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(e,t){this._delegate=e,this.firebase=t,ms(e,new $t("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),Yc(this._delegate)))}_getService(e,t=ut){var r;this._delegate.checkDestroyed();const s=this._delegate.container.getProvider(e);return!s.isInitialized()&&((r=s.getComponent())===null||r===void 0?void 0:r.instantiationMode)==="EXPLICIT"&&s.initialize(),s.getImmediate({identifier:t})}_removeServiceInstance(e,t=ut){this._delegate.container.getProvider(e).clearInstance(t)}_addComponent(e){ms(this._delegate,e)}_addOrOverwriteComponent(e){Hc(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eg={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},pu=new Vs("app-compat","Firebase",eg);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tg(n){const e={},t={__esModule:!0,initializeApp:i,app:s,registerVersion:at,setLogLevel:Jc,onLog:Xc,apps:null,SDK_VERSION:Fo,INTERNAL:{registerComponent:a,removeApp:r,useAsService:u,modularAPIs:Jm}};t.default=t,Object.defineProperty(t,"apps",{get:o});function r(c){delete e[c]}function s(c){if(c=c||ut,!au(e,c))throw pu.create("no-app",{appName:c});return e[c]}s.App=n;function i(c,l={}){const h=Lo(c,l);if(au(e,h.name))return e[h.name];const d=new n(h,t);return e[h.name]=d,d}function o(){return Object.keys(e).map(c=>e[c])}function a(c){const l=c.name,h=l.replace("-compat","");if(pn(c)&&c.type==="PUBLIC"){const d=(g=s())=>{if(typeof g[h]!="function")throw pu.create("invalid-app-argument",{appName:l});return g[h]()};c.serviceProps!==void 0&&fs(d,c.serviceProps),t[h]=d,n.prototype[h]=function(...g){return this._getService.bind(this,l).apply(this,c.multipleInstances?g:[])}}return c.type==="PUBLIC"?t[h]:null}function u(c,l){return l==="serverAuth"?null:l}return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(){const n=tg(Zm);n.INTERNAL=Object.assign(Object.assign({},n.INTERNAL),{createFirebaseNamespace:tl,extendNamespace:e,createSubscribe:$f,ErrorFactory:Vs,deepExtend:fs});function e(t){fs(n,t)}return n}const ng=tl();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yu=new Oo("@firebase/app-compat"),rg="@firebase/app-compat",sg="0.2.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ig(n){at(rg,sg,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */if(Mf()&&self.firebase!==void 0){yu.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);const n=self.firebase.SDK_VERSION;n&&n.indexOf("LITE")>=0&&yu.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `)}const nl=ng;ig();var og="firebase",ag="9.22.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */nl.registerVersion(og,ag,"app-compat");var ug=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},E,Po=Po||{},C=ug||self;function gs(){}function Bs(n){var e=typeof n;return e=e!="object"?e:n?Array.isArray(n)?"array":e:"null",e=="array"||e=="object"&&typeof n.length=="number"}function $s(n){var e=typeof n;return e=="object"&&n!=null||e=="function"}function cg(n,e,t){return n.call.apply(n.bind,arguments)}function lg(n,e,t){if(!n)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,r),n.apply(e,s)}}return function(){return n.apply(e,arguments)}}function we(n,e,t){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?we=cg:we=lg,we.apply(null,arguments)}function Qr(n,e){var t=Array.prototype.slice.call(arguments,1);return function(){var r=t.slice();return r.push.apply(r,arguments),n.apply(this,r)}}function ce(n,e){function t(){}t.prototype=e.prototype,n.$=e.prototype,n.prototype=new t,n.prototype.constructor=n,n.ac=function(r,s,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[s].apply(r,o)}}function vt(){this.s=this.s,this.o=this.o}var hg=0;vt.prototype.s=!1;vt.prototype.ra=function(){!this.s&&(this.s=!0,this.N(),hg!=0)};vt.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const rl=Array.prototype.indexOf?function(n,e){return Array.prototype.indexOf.call(n,e,void 0)}:function(n,e){if(typeof n=="string")return typeof e!="string"||e.length!=1?-1:n.indexOf(e,0);for(let t=0;t<n.length;t++)if(t in n&&n[t]===e)return t;return-1};function Vo(n){const e=n.length;if(0<e){const t=Array(e);for(let r=0;r<e;r++)t[r]=n[r];return t}return[]}function wu(n,e){for(let t=1;t<arguments.length;t++){const r=arguments[t];if(Bs(r)){const s=n.length||0,i=r.length||0;n.length=s+i;for(let o=0;o<i;o++)n[s+o]=r[o]}else n.push(r)}}function ve(n,e){this.type=n,this.g=this.target=e,this.defaultPrevented=!1}ve.prototype.h=function(){this.defaultPrevented=!0};var dg=function(){if(!C.addEventListener||!Object.defineProperty)return!1;var n=!1,e=Object.defineProperty({},"passive",{get:function(){n=!0}});try{C.addEventListener("test",gs,e),C.removeEventListener("test",gs,e)}catch{}return n}();function ps(n){return/^[\s\xa0]*$/.test(n)}var vu=String.prototype.trim?function(n){return n.trim()}:function(n){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(n)[1]};function Ai(n,e){return n<e?-1:n>e?1:0}function Us(){var n=C.navigator;return n&&(n=n.userAgent)?n:""}function Pe(n){return Us().indexOf(n)!=-1}function Bo(n){return Bo[" "](n),n}Bo[" "]=gs;function sl(n,e,t){return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}var fg=Pe("Opera"),yn=Pe("Trident")||Pe("MSIE"),il=Pe("Edge"),Ki=il||yn,ol=Pe("Gecko")&&!(Us().toLowerCase().indexOf("webkit")!=-1&&!Pe("Edge"))&&!(Pe("Trident")||Pe("MSIE"))&&!Pe("Edge"),mg=Us().toLowerCase().indexOf("webkit")!=-1&&!Pe("Edge");function al(){var n=C.document;return n?n.documentMode:void 0}var ys;e:{var Ni="",ki=function(){var n=Us();if(ol)return/rv:([^\);]+)(\)|;)/.exec(n);if(il)return/Edge\/([\d\.]+)/.exec(n);if(yn)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(n);if(mg)return/WebKit\/(\S+)/.exec(n);if(fg)return/(?:Version)[ \/]?(\S+)/.exec(n)}();if(ki&&(Ni=ki?ki[1]:""),yn){var Ri=al();if(Ri!=null&&Ri>parseFloat(Ni)){ys=String(Ri);break e}}ys=Ni}var gg={};function pg(){return sl(gg,9,function(){let n=0;const e=vu(String(ys)).split("."),t=vu("9").split("."),r=Math.max(e.length,t.length);for(let o=0;n==0&&o<r;o++){var s=e[o]||"",i=t[o]||"";do{if(s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],s[0].length==0&&i[0].length==0)break;n=Ai(s[1].length==0?0:parseInt(s[1],10),i[1].length==0?0:parseInt(i[1],10))||Ai(s[2].length==0,i[2].length==0)||Ai(s[2],i[2]),s=s[3],i=i[3]}while(n==0)}return 0<=n})}var Qi;if(C.document&&yn){var Iu=al();Qi=Iu||parseInt(ys,10)||void 0}else Qi=void 0;var yg=Qi;function cr(n,e){if(ve.call(this,n?n.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,n){var t=this.type=n.type,r=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:null;if(this.target=n.target||n.srcElement,this.g=e,e=n.relatedTarget){if(ol){e:{try{Bo(e.nodeName);var s=!0;break e}catch{}s=!1}s||(e=null)}}else t=="mouseover"?e=n.fromElement:t=="mouseout"&&(e=n.toElement);this.relatedTarget=e,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0),this.button=n.button,this.key=n.key||"",this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.pointerId=n.pointerId||0,this.pointerType=typeof n.pointerType=="string"?n.pointerType:wg[n.pointerType]||"",this.state=n.state,this.i=n,n.defaultPrevented&&cr.$.h.call(this)}}ce(cr,ve);var wg={2:"touch",3:"pen",4:"mouse"};cr.prototype.h=function(){cr.$.h.call(this);var n=this.i;n.preventDefault?n.preventDefault():n.returnValue=!1};var qs="closure_listenable_"+(1e6*Math.random()|0),vg=0;function Ig(n,e,t,r,s){this.listener=n,this.proxy=null,this.src=e,this.type=t,this.capture=!!r,this.la=s,this.key=++vg,this.fa=this.ia=!1}function js(n){n.fa=!0,n.listener=null,n.proxy=null,n.src=null,n.la=null}function $o(n,e,t){for(const r in n)e.call(t,n[r],r,n)}function ul(n){const e={};for(const t in n)e[t]=n[t];return e}const Eu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function cl(n,e){let t,r;for(let s=1;s<arguments.length;s++){r=arguments[s];for(t in r)n[t]=r[t];for(let i=0;i<Eu.length;i++)t=Eu[i],Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}}function zs(n){this.src=n,this.g={},this.h=0}zs.prototype.add=function(n,e,t,r,s){var i=n.toString();n=this.g[i],n||(n=this.g[i]=[],this.h++);var o=Wi(n,e,r,s);return-1<o?(e=n[o],t||(e.ia=!1)):(e=new Ig(e,this.src,i,!!r,s),e.ia=t,n.push(e)),e};function Hi(n,e){var t=e.type;if(t in n.g){var r=n.g[t],s=rl(r,e),i;(i=0<=s)&&Array.prototype.splice.call(r,s,1),i&&(js(e),n.g[t].length==0&&(delete n.g[t],n.h--))}}function Wi(n,e,t,r){for(var s=0;s<n.length;++s){var i=n[s];if(!i.fa&&i.listener==e&&i.capture==!!t&&i.la==r)return s}return-1}var Uo="closure_lm_"+(1e6*Math.random()|0),Oi={};function ll(n,e,t,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)ll(n,e[i],t,r,s);return null}return t=fl(t),n&&n[qs]?n.O(e,t,$s(r)?!!r.capture:!1,s):Eg(n,e,t,!1,r,s)}function Eg(n,e,t,r,s,i){if(!e)throw Error("Invalid event type");var o=$s(s)?!!s.capture:!!s,a=jo(n);if(a||(n[Uo]=a=new zs(n)),t=a.add(e,t,r,o,i),t.proxy)return t;if(r=bg(),t.proxy=r,r.src=n,r.listener=t,n.addEventListener)dg||(s=o),s===void 0&&(s=!1),n.addEventListener(e.toString(),r,s);else if(n.attachEvent)n.attachEvent(dl(e.toString()),r);else if(n.addListener&&n.removeListener)n.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return t}function bg(){function n(t){return e.call(n.src,n.listener,t)}const e=Tg;return n}function hl(n,e,t,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)hl(n,e[i],t,r,s);else r=$s(r)?!!r.capture:!!r,t=fl(t),n&&n[qs]?(n=n.i,e=String(e).toString(),e in n.g&&(i=n.g[e],t=Wi(i,t,r,s),-1<t&&(js(i[t]),Array.prototype.splice.call(i,t,1),i.length==0&&(delete n.g[e],n.h--)))):n&&(n=jo(n))&&(e=n.g[e.toString()],n=-1,e&&(n=Wi(e,t,r,s)),(t=-1<n?e[n]:null)&&qo(t))}function qo(n){if(typeof n!="number"&&n&&!n.fa){var e=n.src;if(e&&e[qs])Hi(e.i,n);else{var t=n.type,r=n.proxy;e.removeEventListener?e.removeEventListener(t,r,n.capture):e.detachEvent?e.detachEvent(dl(t),r):e.addListener&&e.removeListener&&e.removeListener(r),(t=jo(e))?(Hi(t,n),t.h==0&&(t.src=null,e[Uo]=null)):js(n)}}}function dl(n){return n in Oi?Oi[n]:Oi[n]="on"+n}function Tg(n,e){if(n.fa)n=!0;else{e=new cr(e,this);var t=n.listener,r=n.la||n.src;n.ia&&qo(n),n=t.call(r,e)}return n}function jo(n){return n=n[Uo],n instanceof zs?n:null}var Mi="__closure_events_fn_"+(1e9*Math.random()>>>0);function fl(n){return typeof n=="function"?n:(n[Mi]||(n[Mi]=function(e){return n.handleEvent(e)}),n[Mi])}function ue(){vt.call(this),this.i=new zs(this),this.S=this,this.J=null}ce(ue,vt);ue.prototype[qs]=!0;ue.prototype.removeEventListener=function(n,e,t,r){hl(this,n,e,t,r)};function ge(n,e){var t,r=n.J;if(r)for(t=[];r;r=r.J)t.push(r);if(n=n.S,r=e.type||e,typeof e=="string")e=new ve(e,n);else if(e instanceof ve)e.target=e.target||n;else{var s=e;e=new ve(r,n),cl(e,s)}if(s=!0,t)for(var i=t.length-1;0<=i;i--){var o=e.g=t[i];s=Hr(o,r,!0,e)&&s}if(o=e.g=n,s=Hr(o,r,!0,e)&&s,s=Hr(o,r,!1,e)&&s,t)for(i=0;i<t.length;i++)o=e.g=t[i],s=Hr(o,r,!1,e)&&s}ue.prototype.N=function(){if(ue.$.N.call(this),this.i){var n=this.i,e;for(e in n.g){for(var t=n.g[e],r=0;r<t.length;r++)js(t[r]);delete n.g[e],n.h--}}this.J=null};ue.prototype.O=function(n,e,t,r){return this.i.add(String(n),e,!1,t,r)};ue.prototype.P=function(n,e,t,r){return this.i.add(String(n),e,!0,t,r)};function Hr(n,e,t,r){if(e=n.i.g[String(e)],!e)return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.fa&&o.capture==t){var a=o.listener,u=o.la||o.src;o.ia&&Hi(n.i,o),s=a.call(u,r)!==!1&&s}}return s&&!r.defaultPrevented}var zo=C.JSON.stringify;function Sg(){var n=pl;let e=null;return n.g&&(e=n.g,n.g=n.g.next,n.g||(n.h=null),e.next=null),e}class _g{constructor(){this.h=this.g=null}add(e,t){const r=ml.get();r.set(e,t),this.h?this.h.next=r:this.g=r,this.h=r}}var ml=new class{constructor(n,e){this.i=n,this.j=e,this.h=0,this.g=null}get(){let n;return 0<this.h?(this.h--,n=this.g,this.g=n.next,n.next=null):n=this.i(),n}}(()=>new Dg,n=>n.reset());class Dg{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}function Cg(n){C.setTimeout(()=>{throw n},0)}function gl(n,e){Yi||xg(),Xi||(Yi(),Xi=!0),pl.add(n,e)}var Yi;function xg(){var n=C.Promise.resolve(void 0);Yi=function(){n.then(Ag)}}var Xi=!1,pl=new _g;function Ag(){for(var n;n=Sg();){try{n.h.call(n.g)}catch(t){Cg(t)}var e=ml;e.j(n),100>e.h&&(e.h++,n.next=e.g,e.g=n)}Xi=!1}function Gs(n,e){ue.call(this),this.h=n||1,this.g=e||C,this.j=we(this.qb,this),this.l=Date.now()}ce(Gs,ue);E=Gs.prototype;E.ga=!1;E.T=null;E.qb=function(){if(this.ga){var n=Date.now()-this.l;0<n&&n<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-n):(this.T&&(this.g.clearTimeout(this.T),this.T=null),ge(this,"tick"),this.ga&&(Go(this),this.start()))}};E.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Go(n){n.ga=!1,n.T&&(n.g.clearTimeout(n.T),n.T=null)}E.N=function(){Gs.$.N.call(this),Go(this),delete this.g};function Ko(n,e,t){if(typeof n=="function")t&&(n=we(n,t));else if(n&&typeof n.handleEvent=="function")n=we(n.handleEvent,n);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:C.setTimeout(n,e||0)}function yl(n){n.g=Ko(()=>{n.g=null,n.i&&(n.i=!1,yl(n))},n.j);const e=n.h;n.h=null,n.m.apply(null,e)}class Ng extends vt{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:yl(this)}N(){super.N(),this.g&&(C.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function lr(n){vt.call(this),this.h=n,this.g={}}ce(lr,vt);var bu=[];function wl(n,e,t,r){Array.isArray(t)||(t&&(bu[0]=t.toString()),t=bu);for(var s=0;s<t.length;s++){var i=ll(e,t[s],r||n.handleEvent,!1,n.h||n);if(!i)break;n.g[i.key]=i}}function vl(n){$o(n.g,function(e,t){this.g.hasOwnProperty(t)&&qo(e)},n),n.g={}}lr.prototype.N=function(){lr.$.N.call(this),vl(this)};lr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function Ks(){this.g=!0}Ks.prototype.Ea=function(){this.g=!1};function kg(n,e,t,r,s,i){n.info(function(){if(n.g)if(i)for(var o="",a=i.split("&"),u=0;u<a.length;u++){var c=a[u].split("=");if(1<c.length){var l=c[0];c=c[1];var h=l.split("_");o=2<=h.length&&h[1]=="type"?o+(l+"="+c+"&"):o+(l+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+`
`+t+`
`+o})}function Rg(n,e,t,r,s,i,o){n.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+`
`+t+`
`+i+" "+o})}function hn(n,e,t,r){n.info(function(){return"XMLHTTP TEXT ("+e+"): "+Mg(n,t)+(r?" "+r:"")})}function Og(n,e){n.info(function(){return"TIMEOUT: "+e})}Ks.prototype.info=function(){};function Mg(n,e){if(!n.g)return e;if(!e)return null;try{var t=JSON.parse(e);if(t){for(n=0;n<t.length;n++)if(Array.isArray(t[n])){var r=t[n];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return zo(t)}catch{return e}}var Jt={},Tu=null;function Qs(){return Tu=Tu||new ue}Jt.Ta="serverreachability";function Il(n){ve.call(this,Jt.Ta,n)}ce(Il,ve);function hr(n){const e=Qs();ge(e,new Il(e))}Jt.STAT_EVENT="statevent";function El(n,e){ve.call(this,Jt.STAT_EVENT,n),this.stat=e}ce(El,ve);function be(n){const e=Qs();ge(e,new El(e,n))}Jt.Ua="timingevent";function bl(n,e){ve.call(this,Jt.Ua,n),this.size=e}ce(bl,ve);function Cr(n,e){if(typeof n!="function")throw Error("Fn must not be null and must be a function");return C.setTimeout(function(){n()},e)}var Hs={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},Tl={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function Qo(){}Qo.prototype.h=null;function Su(n){return n.h||(n.h=n.i())}function Sl(){}var xr={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function Ho(){ve.call(this,"d")}ce(Ho,ve);function Wo(){ve.call(this,"c")}ce(Wo,ve);var Ji;function Ws(){}ce(Ws,Qo);Ws.prototype.g=function(){return new XMLHttpRequest};Ws.prototype.i=function(){return{}};Ji=new Ws;function Ar(n,e,t,r){this.l=n,this.j=e,this.m=t,this.W=r||1,this.U=new lr(this),this.P=Fg,n=Ki?125:void 0,this.V=new Gs(n),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.aa=-1,this.J=!1,this.O=0,this.M=null,this.ca=this.K=this.ba=this.S=!1,this.h=new _l}function _l(){this.i=null,this.g="",this.h=!1}var Fg=45e3,Zi={},ws={};E=Ar.prototype;E.setTimeout=function(n){this.P=n};function eo(n,e,t){n.L=1,n.v=Xs(We(e)),n.s=t,n.S=!0,Dl(n,null)}function Dl(n,e){n.G=Date.now(),Nr(n),n.A=We(n.v);var t=n.A,r=n.W;Array.isArray(r)||(r=[String(r)]),Ml(t.i,"t",r),n.C=0,t=n.l.I,n.h=new _l,n.g=th(n.l,t?e:null,!n.s),0<n.O&&(n.M=new Ng(we(n.Pa,n,n.g),n.O)),wl(n.U,n.g,"readystatechange",n.nb),e=n.I?ul(n.I):{},n.s?(n.u||(n.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",n.g.ha(n.A,n.u,n.s,e)):(n.u="GET",n.g.ha(n.A,n.u,null,e)),hr(),kg(n.j,n.u,n.A,n.m,n.W,n.s)}E.nb=function(n){n=n.target;const e=this.M;e&&Ge(n)==3?e.l():this.Pa(n)};E.Pa=function(n){try{if(n==this.g)e:{const l=Ge(this.g);var e=this.g.Ia();const h=this.g.da();if(!(3>l)&&(l!=3||Ki||this.g&&(this.h.h||this.g.ja()||xu(this.g)))){this.J||l!=4||e==7||(e==8||0>=h?hr(3):hr(2)),Ys(this);var t=this.g.da();this.aa=t;t:if(Cl(this)){var r=xu(this.g);n="";var s=r.length,i=Ge(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Mt(this),Zn(this);var o="";break t}this.h.i=new C.TextDecoder}for(e=0;e<s;e++)this.h.h=!0,n+=this.h.i.decode(r[e],{stream:i&&e==s-1});r.splice(0,s),this.h.g+=n,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=t==200,Rg(this.j,this.u,this.A,this.m,this.W,l,t),this.i){if(this.ba&&!this.K){t:{if(this.g){var a,u=this.g;if((a=u.g?u.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!ps(a)){var c=a;break t}}c=null}if(t=c)hn(this.j,this.m,t,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,to(this,t);else{this.i=!1,this.o=3,be(12),Mt(this),Zn(this);break e}}this.S?(xl(this,l,o),Ki&&this.i&&l==3&&(wl(this.U,this.V,"tick",this.mb),this.V.start())):(hn(this.j,this.m,o,null),to(this,o)),l==4&&Mt(this),this.i&&!this.J&&(l==4?Xl(this.l,this):(this.i=!1,Nr(this)))}else t==400&&0<o.indexOf("Unknown SID")?(this.o=3,be(12)):(this.o=0,be(13)),Mt(this),Zn(this)}}}catch{}finally{}};function Cl(n){return n.g?n.u=="GET"&&n.L!=2&&n.l.Ha:!1}function xl(n,e,t){let r=!0,s;for(;!n.J&&n.C<t.length;)if(s=Lg(n,t),s==ws){e==4&&(n.o=4,be(14),r=!1),hn(n.j,n.m,null,"[Incomplete Response]");break}else if(s==Zi){n.o=4,be(15),hn(n.j,n.m,t,"[Invalid Chunk]"),r=!1;break}else hn(n.j,n.m,s,null),to(n,s);Cl(n)&&s!=ws&&s!=Zi&&(n.h.g="",n.C=0),e!=4||t.length!=0||n.h.h||(n.o=1,be(16),r=!1),n.i=n.i&&r,r?0<t.length&&!n.ca&&(n.ca=!0,e=n.l,e.g==n&&e.ca&&!e.L&&(e.j.info("Great, no buffering proxy detected. Bytes received: "+t.length),na(e),e.L=!0,be(11))):(hn(n.j,n.m,t,"[Invalid Chunked Response]"),Mt(n),Zn(n))}E.mb=function(){if(this.g){var n=Ge(this.g),e=this.g.ja();this.C<e.length&&(Ys(this),xl(this,n,e),this.i&&n!=4&&Nr(this))}};function Lg(n,e){var t=n.C,r=e.indexOf(`
`,t);return r==-1?ws:(t=Number(e.substring(t,r)),isNaN(t)?Zi:(r+=1,r+t>e.length?ws:(e=e.substr(r,t),n.C=r+t,e)))}E.cancel=function(){this.J=!0,Mt(this)};function Nr(n){n.Y=Date.now()+n.P,Al(n,n.P)}function Al(n,e){if(n.B!=null)throw Error("WatchDog timer not null");n.B=Cr(we(n.lb,n),e)}function Ys(n){n.B&&(C.clearTimeout(n.B),n.B=null)}E.lb=function(){this.B=null;const n=Date.now();0<=n-this.Y?(Og(this.j,this.A),this.L!=2&&(hr(),be(17)),Mt(this),this.o=2,Zn(this)):Al(this,this.Y-n)};function Zn(n){n.l.H==0||n.J||Xl(n.l,n)}function Mt(n){Ys(n);var e=n.M;e&&typeof e.ra=="function"&&e.ra(),n.M=null,Go(n.V),vl(n.U),n.g&&(e=n.g,n.g=null,e.abort(),e.ra())}function to(n,e){try{var t=n.l;if(t.H!=0&&(t.g==n||no(t.h,n))){if(!n.K&&no(t.h,n)&&t.H==3){try{var r=t.Ja.g.parse(e)}catch{r=null}if(Array.isArray(r)&&r.length==3){var s=r;if(s[0]==0){e:if(!t.u){if(t.g)if(t.g.G+3e3<n.G)Es(t),ei(t);else break e;ta(t),be(18)}}else t.Fa=s[1],0<t.Fa-t.V&&37500>s[2]&&t.M&&t.A==0&&!t.v&&(t.v=Cr(we(t.ib,t),6e3));if(1>=Pl(t.h)&&t.na){try{t.na()}catch{}t.na=void 0}}else Ft(t,11)}else if((n.K||t.g==n)&&Es(t),!ps(e))for(s=t.Ja.g.parse(e),e=0;e<s.length;e++){let c=s[e];if(t.V=c[0],c=c[1],t.H==2)if(c[0]=="c"){t.J=c[1],t.oa=c[2];const l=c[3];l!=null&&(t.qa=l,t.j.info("VER="+t.qa));const h=c[4];h!=null&&(t.Ga=h,t.j.info("SVER="+t.Ga));const d=c[5];d!=null&&typeof d=="number"&&0<d&&(r=1.5*d,t.K=r,t.j.info("backChannelRequestTimeoutMs_="+r)),r=t;const g=n.g;if(g){const w=g.g?g.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(w){var i=r.h;i.g||w.indexOf("spdy")==-1&&w.indexOf("quic")==-1&&w.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(Yo(i,i.h),i.h=null))}if(r.F){const b=g.g?g.g.getResponseHeader("X-HTTP-Session-Id"):null;b&&(r.Da=b,j(r.G,r.F,b))}}t.H=3,t.l&&t.l.Ba(),t.ca&&(t.S=Date.now()-n.G,t.j.info("Handshake RTT: "+t.S+"ms")),r=t;var o=n;if(r.wa=eh(r,r.I?r.oa:null,r.Y),o.K){Vl(r.h,o);var a=o,u=r.K;u&&a.setTimeout(u),a.B&&(Ys(a),Nr(a)),r.g=o}else Wl(r);0<t.i.length&&ti(t)}else c[0]!="stop"&&c[0]!="close"||Ft(t,7);else t.H==3&&(c[0]=="stop"||c[0]=="close"?c[0]=="stop"?Ft(t,7):ea(t):c[0]!="noop"&&t.l&&t.l.Aa(c),t.A=0)}}hr(4)}catch{}}function Pg(n){if(n.Z&&typeof n.Z=="function")return n.Z();if(typeof Map<"u"&&n instanceof Map||typeof Set<"u"&&n instanceof Set)return Array.from(n.values());if(typeof n=="string")return n.split("");if(Bs(n)){for(var e=[],t=n.length,r=0;r<t;r++)e.push(n[r]);return e}e=[],t=0;for(r in n)e[t++]=n[r];return e}function Vg(n){if(n.sa&&typeof n.sa=="function")return n.sa();if(!n.Z||typeof n.Z!="function"){if(typeof Map<"u"&&n instanceof Map)return Array.from(n.keys());if(!(typeof Set<"u"&&n instanceof Set)){if(Bs(n)||typeof n=="string"){var e=[];n=n.length;for(var t=0;t<n;t++)e.push(t);return e}e=[],t=0;for(const r in n)e[t++]=r;return e}}}function Nl(n,e){if(n.forEach&&typeof n.forEach=="function")n.forEach(e,void 0);else if(Bs(n)||typeof n=="string")Array.prototype.forEach.call(n,e,void 0);else for(var t=Vg(n),r=Pg(n),s=r.length,i=0;i<s;i++)e.call(void 0,r[i],t&&t[i],n)}var kl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Bg(n,e){if(n){n=n.split("&");for(var t=0;t<n.length;t++){var r=n[t].indexOf("="),s=null;if(0<=r){var i=n[t].substring(0,r);s=n[t].substring(r+1)}else i=n[t];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function Vt(n,e){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,n instanceof Vt){this.h=e!==void 0?e:n.h,vs(this,n.j),this.s=n.s,this.g=n.g,Is(this,n.m),this.l=n.l,e=n.i;var t=new dr;t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),_u(this,t),this.o=n.o}else n&&(t=String(n).match(kl))?(this.h=!!e,vs(this,t[1]||"",!0),this.s=Hn(t[2]||""),this.g=Hn(t[3]||"",!0),Is(this,t[4]),this.l=Hn(t[5]||"",!0),_u(this,t[6]||"",!0),this.o=Hn(t[7]||"")):(this.h=!!e,this.i=new dr(null,this.h))}Vt.prototype.toString=function(){var n=[],e=this.j;e&&n.push(Wn(e,Du,!0),":");var t=this.g;return(t||e=="file")&&(n.push("//"),(e=this.s)&&n.push(Wn(e,Du,!0),"@"),n.push(encodeURIComponent(String(t)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t=this.m,t!=null&&n.push(":",String(t))),(t=this.l)&&(this.g&&t.charAt(0)!="/"&&n.push("/"),n.push(Wn(t,t.charAt(0)=="/"?qg:Ug,!0))),(t=this.i.toString())&&n.push("?",t),(t=this.o)&&n.push("#",Wn(t,zg)),n.join("")};function We(n){return new Vt(n)}function vs(n,e,t){n.j=t?Hn(e,!0):e,n.j&&(n.j=n.j.replace(/:$/,""))}function Is(n,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);n.m=e}else n.m=null}function _u(n,e,t){e instanceof dr?(n.i=e,Gg(n.i,n.h)):(t||(e=Wn(e,jg)),n.i=new dr(e,n.h))}function j(n,e,t){n.i.set(e,t)}function Xs(n){return j(n,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),n}function Hn(n,e){return n?e?decodeURI(n.replace(/%25/g,"%2525")):decodeURIComponent(n):""}function Wn(n,e,t){return typeof n=="string"?(n=encodeURI(n).replace(e,$g),t&&(n=n.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n):null}function $g(n){return n=n.charCodeAt(0),"%"+(n>>4&15).toString(16)+(n&15).toString(16)}var Du=/[#\/\?@]/g,Ug=/[#\?:]/g,qg=/[#\?]/g,jg=/[#\?@]/g,zg=/#/g;function dr(n,e){this.h=this.g=null,this.i=n||null,this.j=!!e}function It(n){n.g||(n.g=new Map,n.h=0,n.i&&Bg(n.i,function(e,t){n.add(decodeURIComponent(e.replace(/\+/g," ")),t)}))}E=dr.prototype;E.add=function(n,e){It(this),this.i=null,n=Nn(this,n);var t=this.g.get(n);return t||this.g.set(n,t=[]),t.push(e),this.h+=1,this};function Rl(n,e){It(n),e=Nn(n,e),n.g.has(e)&&(n.i=null,n.h-=n.g.get(e).length,n.g.delete(e))}function Ol(n,e){return It(n),e=Nn(n,e),n.g.has(e)}E.forEach=function(n,e){It(this),this.g.forEach(function(t,r){t.forEach(function(s){n.call(e,s,r,this)},this)},this)};E.sa=function(){It(this);const n=Array.from(this.g.values()),e=Array.from(this.g.keys()),t=[];for(let r=0;r<e.length;r++){const s=n[r];for(let i=0;i<s.length;i++)t.push(e[r])}return t};E.Z=function(n){It(this);let e=[];if(typeof n=="string")Ol(this,n)&&(e=e.concat(this.g.get(Nn(this,n))));else{n=Array.from(this.g.values());for(let t=0;t<n.length;t++)e=e.concat(n[t])}return e};E.set=function(n,e){return It(this),this.i=null,n=Nn(this,n),Ol(this,n)&&(this.h-=this.g.get(n).length),this.g.set(n,[e]),this.h+=1,this};E.get=function(n,e){return n?(n=this.Z(n),0<n.length?String(n[0]):e):e};function Ml(n,e,t){Rl(n,e),0<t.length&&(n.i=null,n.g.set(Nn(n,e),Vo(t)),n.h+=t.length)}E.toString=function(){if(this.i)return this.i;if(!this.g)return"";const n=[],e=Array.from(this.g.keys());for(var t=0;t<e.length;t++){var r=e[t];const i=encodeURIComponent(String(r)),o=this.Z(r);for(r=0;r<o.length;r++){var s=i;o[r]!==""&&(s+="="+encodeURIComponent(String(o[r]))),n.push(s)}}return this.i=n.join("&")};function Nn(n,e){return e=String(e),n.j&&(e=e.toLowerCase()),e}function Gg(n,e){e&&!n.j&&(It(n),n.i=null,n.g.forEach(function(t,r){var s=r.toLowerCase();r!=s&&(Rl(this,r),Ml(this,s,t))},n)),n.j=e}var Kg=class{constructor(n,e){this.h=n,this.g=e}};function Fl(n){this.l=n||Qg,C.PerformanceNavigationTiming?(n=C.performance.getEntriesByType("navigation"),n=0<n.length&&(n[0].nextHopProtocol=="hq"||n[0].nextHopProtocol=="h2")):n=!!(C.g&&C.g.Ka&&C.g.Ka()&&C.g.Ka().ec),this.j=n?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Qg=10;function Ll(n){return n.h?!0:n.g?n.g.size>=n.j:!1}function Pl(n){return n.h?1:n.g?n.g.size:0}function no(n,e){return n.h?n.h==e:n.g?n.g.has(e):!1}function Yo(n,e){n.g?n.g.add(e):n.h=e}function Vl(n,e){n.h&&n.h==e?n.h=null:n.g&&n.g.has(e)&&n.g.delete(e)}Fl.prototype.cancel=function(){if(this.i=Bl(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const n of this.g.values())n.cancel();this.g.clear()}};function Bl(n){if(n.h!=null)return n.i.concat(n.h.F);if(n.g!=null&&n.g.size!==0){let e=n.i;for(const t of n.g.values())e=e.concat(t.F);return e}return Vo(n.i)}function Xo(){}Xo.prototype.stringify=function(n){return C.JSON.stringify(n,void 0)};Xo.prototype.parse=function(n){return C.JSON.parse(n,void 0)};function Hg(){this.g=new Xo}function Wg(n,e,t){const r=t||"";try{Nl(n,function(s,i){let o=s;$s(s)&&(o=zo(s)),e.push(r+i+"="+encodeURIComponent(o))})}catch(s){throw e.push(r+"type="+encodeURIComponent("_badmap")),s}}function Yg(n,e){const t=new Ks;if(C.Image){const r=new Image;r.onload=Qr(Wr,t,r,"TestLoadImage: loaded",!0,e),r.onerror=Qr(Wr,t,r,"TestLoadImage: error",!1,e),r.onabort=Qr(Wr,t,r,"TestLoadImage: abort",!1,e),r.ontimeout=Qr(Wr,t,r,"TestLoadImage: timeout",!1,e),C.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=n}else e(!1)}function Wr(n,e,t,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch{}}function kr(n){this.l=n.fc||null,this.j=n.ob||!1}ce(kr,Qo);kr.prototype.g=function(){return new Js(this.l,this.j)};kr.prototype.i=function(n){return function(){return n}}({});function Js(n,e){ue.call(this),this.F=n,this.u=e,this.m=void 0,this.readyState=Jo,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}ce(Js,ue);var Jo=0;E=Js.prototype;E.open=function(n,e){if(this.readyState!=Jo)throw this.abort(),Error("Error reopening a connection");this.C=n,this.B=e,this.readyState=1,fr(this)};E.send=function(n){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};n&&(e.body=n),(this.F||C).fetch(new Request(this.B,e)).then(this.$a.bind(this),this.ka.bind(this))};E.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Rr(this)),this.readyState=Jo};E.$a=function(n){if(this.g&&(this.l=n,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=n.headers,this.readyState=2,fr(this)),this.g&&(this.readyState=3,fr(this),this.g)))if(this.responseType==="arraybuffer")n.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof C.ReadableStream<"u"&&"body"in n){if(this.j=n.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;$l(this)}else n.text().then(this.Za.bind(this),this.ka.bind(this))};function $l(n){n.j.read().then(n.Xa.bind(n)).catch(n.ka.bind(n))}E.Xa=function(n){if(this.g){if(this.u&&n.value)this.response.push(n.value);else if(!this.u){var e=n.value?n.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!n.done}))&&(this.response=this.responseText+=e)}n.done?Rr(this):fr(this),this.readyState==3&&$l(this)}};E.Za=function(n){this.g&&(this.response=this.responseText=n,Rr(this))};E.Ya=function(n){this.g&&(this.response=n,Rr(this))};E.ka=function(){this.g&&Rr(this)};function Rr(n){n.readyState=4,n.l=null,n.j=null,n.A=null,fr(n)}E.setRequestHeader=function(n,e){this.v.append(n,e)};E.getResponseHeader=function(n){return this.h&&this.h.get(n.toLowerCase())||""};E.getAllResponseHeaders=function(){if(!this.h)return"";const n=[],e=this.h.entries();for(var t=e.next();!t.done;)t=t.value,n.push(t[0]+": "+t[1]),t=e.next();return n.join(`\r
`)};function fr(n){n.onreadystatechange&&n.onreadystatechange.call(n)}Object.defineProperty(Js.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(n){this.m=n?"include":"same-origin"}});var Xg=C.JSON.parse;function W(n){ue.call(this),this.headers=new Map,this.u=n||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=Ul,this.L=this.M=!1}ce(W,ue);var Ul="",Jg=/^https?$/i,Zg=["POST","PUT"];E=W.prototype;E.Oa=function(n){this.M=n};E.ha=function(n,e,t,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+n);e=e?e.toUpperCase():"GET",this.I=n,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():Ji.g(),this.C=this.u?Su(this.u):Su(Ji),this.g.onreadystatechange=we(this.La,this);try{this.G=!0,this.g.open(e,String(n),!0),this.G=!1}catch(i){Cu(this,i);return}if(n=t||"",t=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)t.set(s,r[s]);else if(typeof r.keys=="function"&&typeof r.get=="function")for(const i of r.keys())t.set(i,r.get(i));else throw Error("Unknown input type for opt_headers: "+String(r));r=Array.from(t.keys()).find(i=>i.toLowerCase()=="content-type"),s=C.FormData&&n instanceof C.FormData,!(0<=rl(Zg,e))||r||s||t.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of t)this.g.setRequestHeader(i,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{zl(this),0<this.B&&((this.L=ep(this.g))?(this.g.timeout=this.B,this.g.ontimeout=we(this.ua,this)):this.A=Ko(this.ua,this.B,this)),this.v=!0,this.g.send(n),this.v=!1}catch(i){Cu(this,i)}};function ep(n){return yn&&pg()&&typeof n.timeout=="number"&&n.ontimeout!==void 0}E.ua=function(){typeof Po<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,ge(this,"timeout"),this.abort(8))};function Cu(n,e){n.h=!1,n.g&&(n.l=!0,n.g.abort(),n.l=!1),n.j=e,n.m=5,ql(n),Zs(n)}function ql(n){n.F||(n.F=!0,ge(n,"complete"),ge(n,"error"))}E.abort=function(n){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=n||7,ge(this,"complete"),ge(this,"abort"),Zs(this))};E.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Zs(this,!0)),W.$.N.call(this)};E.La=function(){this.s||(this.G||this.v||this.l?jl(this):this.kb())};E.kb=function(){jl(this)};function jl(n){if(n.h&&typeof Po<"u"&&(!n.C[1]||Ge(n)!=4||n.da()!=2)){if(n.v&&Ge(n)==4)Ko(n.La,0,n);else if(ge(n,"readystatechange"),Ge(n)==4){n.h=!1;try{const a=n.da();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var t;if(!(t=e)){var r;if(r=a===0){var s=String(n.I).match(kl)[1]||null;if(!s&&C.self&&C.self.location){var i=C.self.location.protocol;s=i.substr(0,i.length-1)}r=!Jg.test(s?s.toLowerCase():"")}t=r}if(t)ge(n,"complete"),ge(n,"success");else{n.m=6;try{var o=2<Ge(n)?n.g.statusText:""}catch{o=""}n.j=o+" ["+n.da()+"]",ql(n)}}finally{Zs(n)}}}}function Zs(n,e){if(n.g){zl(n);const t=n.g,r=n.C[0]?gs:null;n.g=null,n.C=null,e||ge(n,"ready");try{t.onreadystatechange=r}catch{}}}function zl(n){n.g&&n.L&&(n.g.ontimeout=null),n.A&&(C.clearTimeout(n.A),n.A=null)}function Ge(n){return n.g?n.g.readyState:0}E.da=function(){try{return 2<Ge(this)?this.g.status:-1}catch{return-1}};E.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};E.Wa=function(n){if(this.g){var e=this.g.responseText;return n&&e.indexOf(n)==0&&(e=e.substring(n.length)),Xg(e)}};function xu(n){try{if(!n.g)return null;if("response"in n.g)return n.g.response;switch(n.K){case Ul:case"text":return n.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in n.g)return n.g.mozResponseArrayBuffer}return null}catch{return null}}E.Ia=function(){return this.m};E.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function Gl(n){let e="";return $o(n,function(t,r){e+=r,e+=":",e+=t,e+=`\r
`}),e}function Zo(n,e,t){e:{for(r in t){var r=!1;break e}r=!0}r||(t=Gl(t),typeof n=="string"?t!=null&&encodeURIComponent(String(t)):j(n,e,t))}function $n(n,e,t){return t&&t.internalChannelParams&&t.internalChannelParams[n]||e}function Kl(n){this.Ga=0,this.i=[],this.j=new Ks,this.oa=this.wa=this.G=this.Y=this.g=this.Da=this.F=this.ma=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=$n("failFast",!1,n),this.M=this.v=this.u=this.m=this.l=null,this.aa=!0,this.ta=this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=$n("baseRetryDelayMs",5e3,n),this.hb=$n("retryDelaySeedMs",1e4,n),this.eb=$n("forwardChannelMaxRetries",2,n),this.xa=$n("forwardChannelRequestTimeoutMs",2e4,n),this.va=n&&n.xmlHttpFactory||void 0,this.Ha=n&&n.dc||!1,this.K=void 0,this.I=n&&n.supportsCrossDomainXhr||!1,this.J="",this.h=new Fl(n&&n.concurrentRequestLimit),this.Ja=new Hg,this.P=n&&n.fastHandshake||!1,this.O=n&&n.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=n&&n.bc||!1,n&&n.Ea&&this.j.Ea(),n&&n.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&n&&n.detectBufferingProxy||!1,this.na=void 0,this.S=0,this.L=!1,this.pa=this.B=null}E=Kl.prototype;E.qa=8;E.H=1;function ea(n){if(Ql(n),n.H==3){var e=n.W++,t=We(n.G);j(t,"SID",n.J),j(t,"RID",e),j(t,"TYPE","terminate"),Or(n,t),e=new Ar(n,n.j,e,void 0),e.L=2,e.v=Xs(We(t)),t=!1,C.navigator&&C.navigator.sendBeacon&&(t=C.navigator.sendBeacon(e.v.toString(),"")),!t&&C.Image&&(new Image().src=e.v,t=!0),t||(e.g=th(e.l,null),e.g.ha(e.v)),e.G=Date.now(),Nr(e)}Zl(n)}function ei(n){n.g&&(na(n),n.g.cancel(),n.g=null)}function Ql(n){ei(n),n.u&&(C.clearTimeout(n.u),n.u=null),Es(n),n.h.cancel(),n.m&&(typeof n.m=="number"&&C.clearTimeout(n.m),n.m=null)}function ti(n){Ll(n.h)||n.m||(n.m=!0,gl(n.Na,n),n.C=0)}function tp(n,e){return Pl(n.h)>=n.h.j-(n.m?1:0)?!1:n.m?(n.i=e.F.concat(n.i),!0):n.H==1||n.H==2||n.C>=(n.cb?0:n.eb)?!1:(n.m=Cr(we(n.Na,n,e),Jl(n,n.C)),n.C++,!0)}E.Na=function(n){if(this.m)if(this.m=null,this.H==1){if(!n){this.W=Math.floor(1e5*Math.random()),n=this.W++;const s=new Ar(this,this.j,n,void 0);let i=this.s;if(this.U&&(i?(i=ul(i),cl(i,this.U)):i=this.U),this.o!==null||this.O||(s.I=i,i=null),this.P)e:{for(var e=0,t=0;t<this.i.length;t++){t:{var r=this.i[t];if("__data__"in r.g&&(r=r.g.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(e+=r,4096<e){e=t;break e}if(e===4096||t===this.i.length-1){e=t+1;break e}}e=1e3}else e=1e3;e=Hl(this,s,e),t=We(this.G),j(t,"RID",n),j(t,"CVER",22),this.F&&j(t,"X-HTTP-Session-Id",this.F),Or(this,t),i&&(this.O?e="headers="+encodeURIComponent(String(Gl(i)))+"&"+e:this.o&&Zo(t,this.o,i)),Yo(this.h,s),this.bb&&j(t,"TYPE","init"),this.P?(j(t,"$req",e),j(t,"SID","null"),s.ba=!0,eo(s,t,null)):eo(s,t,e),this.H=2}}else this.H==3&&(n?Au(this,n):this.i.length==0||Ll(this.h)||Au(this))};function Au(n,e){var t;e?t=e.m:t=n.W++;const r=We(n.G);j(r,"SID",n.J),j(r,"RID",t),j(r,"AID",n.V),Or(n,r),n.o&&n.s&&Zo(r,n.o,n.s),t=new Ar(n,n.j,t,n.C+1),n.o===null&&(t.I=n.s),e&&(n.i=e.F.concat(n.i)),e=Hl(n,t,1e3),t.setTimeout(Math.round(.5*n.xa)+Math.round(.5*n.xa*Math.random())),Yo(n.h,t),eo(t,r,e)}function Or(n,e){n.ma&&$o(n.ma,function(t,r){j(e,r,t)}),n.l&&Nl({},function(t,r){j(e,r,t)})}function Hl(n,e,t){t=Math.min(n.i.length,t);var r=n.l?we(n.l.Va,n.l,n):null;e:{var s=n.i;let i=-1;for(;;){const o=["count="+t];i==-1?0<t?(i=s[0].h,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let u=0;u<t;u++){let c=s[u].h;const l=s[u].g;if(c-=i,0>c)i=Math.max(0,s[u].h-100),a=!1;else try{Wg(l,o,"req"+c+"_")}catch{r&&r(l)}}if(a){r=o.join("&");break e}}}return n=n.i.splice(0,t),e.F=n,r}function Wl(n){n.g||n.u||(n.ba=1,gl(n.Ma,n),n.A=0)}function ta(n){return n.g||n.u||3<=n.A?!1:(n.ba++,n.u=Cr(we(n.Ma,n),Jl(n,n.A)),n.A++,!0)}E.Ma=function(){if(this.u=null,Yl(this),this.ca&&!(this.L||this.g==null||0>=this.S)){var n=2*this.S;this.j.info("BP detection timer enabled: "+n),this.B=Cr(we(this.jb,this),n)}};E.jb=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.M=!1,this.L=!0,be(10),ei(this),Yl(this))};function na(n){n.B!=null&&(C.clearTimeout(n.B),n.B=null)}function Yl(n){n.g=new Ar(n,n.j,"rpc",n.ba),n.o===null&&(n.g.I=n.s),n.g.O=0;var e=We(n.wa);j(e,"RID","rpc"),j(e,"SID",n.J),j(e,"CI",n.M?"0":"1"),j(e,"AID",n.V),j(e,"TYPE","xmlhttp"),Or(n,e),n.o&&n.s&&Zo(e,n.o,n.s),n.K&&n.g.setTimeout(n.K);var t=n.g;n=n.oa,t.L=1,t.v=Xs(We(e)),t.s=null,t.S=!0,Dl(t,n)}E.ib=function(){this.v!=null&&(this.v=null,ei(this),ta(this),be(19))};function Es(n){n.v!=null&&(C.clearTimeout(n.v),n.v=null)}function Xl(n,e){var t=null;if(n.g==e){Es(n),na(n),n.g=null;var r=2}else if(no(n.h,e))t=e.F,Vl(n.h,e),r=1;else return;if(n.H!=0){if(n.ta=e.aa,e.i)if(r==1){t=e.s?e.s.length:0,e=Date.now()-e.G;var s=n.C;r=Qs(),ge(r,new bl(r,t)),ti(n)}else Wl(n);else if(s=e.o,s==3||s==0&&0<n.ta||!(r==1&&tp(n,e)||r==2&&ta(n)))switch(t&&0<t.length&&(e=n.h,e.i=e.i.concat(t)),s){case 1:Ft(n,5);break;case 4:Ft(n,10);break;case 3:Ft(n,6);break;default:Ft(n,2)}}}function Jl(n,e){let t=n.ab+Math.floor(Math.random()*n.hb);return n.l||(t*=2),t*e}function Ft(n,e){if(n.j.info("Error code "+e),e==2){var t=null;n.l&&(t=null);var r=we(n.pb,n);t||(t=new Vt("//www.google.com/images/cleardot.gif"),C.location&&C.location.protocol=="http"||vs(t,"https"),Xs(t)),Yg(t.toString(),r)}else be(2);n.H=0,n.l&&n.l.za(e),Zl(n),Ql(n)}E.pb=function(n){n?(this.j.info("Successfully pinged google.com"),be(2)):(this.j.info("Failed to ping google.com"),be(1))};function Zl(n){if(n.H=0,n.pa=[],n.l){const e=Bl(n.h);(e.length!=0||n.i.length!=0)&&(wu(n.pa,e),wu(n.pa,n.i),n.h.i.length=0,Vo(n.i),n.i.length=0),n.l.ya()}}function eh(n,e,t){var r=t instanceof Vt?We(t):new Vt(t,void 0);if(r.g!="")e&&(r.g=e+"."+r.g),Is(r,r.m);else{var s=C.location;r=s.protocol,e=e?e+"."+s.hostname:s.hostname,s=+s.port;var i=new Vt(null,void 0);r&&vs(i,r),e&&(i.g=e),s&&Is(i,s),t&&(i.l=t),r=i}return t=n.F,e=n.Da,t&&e&&j(r,t,e),j(r,"VER",n.qa),Or(n,r),r}function th(n,e,t){if(e&&!n.I)throw Error("Can't create secondary domain capable XhrIo object.");return e=t&&n.Ha&&!n.va?new W(new kr({ob:!0})):new W(n.va),e.Oa(n.I),e}function nh(){}E=nh.prototype;E.Ba=function(){};E.Aa=function(){};E.za=function(){};E.ya=function(){};E.Va=function(){};function bs(){if(yn&&!(10<=Number(yg)))throw Error("Environmental error: no available transport.")}bs.prototype.g=function(n,e){return new Ne(n,e)};function Ne(n,e){ue.call(this),this.g=new Kl(e),this.l=n,this.h=e&&e.messageUrlParams||null,n=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(n?n["X-Client-Protocol"]="webchannel":n={"X-Client-Protocol":"webchannel"}),this.g.s=n,n=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(n?n["X-WebChannel-Content-Type"]=e.messageContentType:n={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.Ca&&(n?n["X-WebChannel-Client-Profile"]=e.Ca:n={"X-WebChannel-Client-Profile":e.Ca}),this.g.U=n,(n=e&&e.cc)&&!ps(n)&&(this.g.o=n),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!ps(e)&&(this.g.F=e,n=this.h,n!==null&&e in n&&(n=this.h,e in n&&delete n[e])),this.j=new kn(this)}ce(Ne,ue);Ne.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.I=!0);var n=this.g,e=this.l,t=this.h||void 0;be(0),n.Y=e,n.ma=t||{},n.M=n.aa,n.G=eh(n,null,n.Y),ti(n)};Ne.prototype.close=function(){ea(this.g)};Ne.prototype.u=function(n){var e=this.g;if(typeof n=="string"){var t={};t.__data__=n,n=t}else this.v&&(t={},t.__data__=zo(n),n=t);e.i.push(new Kg(e.fb++,n)),e.H==3&&ti(e)};Ne.prototype.N=function(){this.g.l=null,delete this.j,ea(this.g),delete this.g,Ne.$.N.call(this)};function rh(n){Ho.call(this);var e=n.__sm__;if(e){e:{for(const t in e){n=t;break e}n=void 0}(this.i=n)&&(n=this.i,e=e!==null&&n in e?e[n]:void 0),this.data=e}else this.data=n}ce(rh,Ho);function sh(){Wo.call(this),this.status=1}ce(sh,Wo);function kn(n){this.g=n}ce(kn,nh);kn.prototype.Ba=function(){ge(this.g,"a")};kn.prototype.Aa=function(n){ge(this.g,new rh(n))};kn.prototype.za=function(n){ge(this.g,new sh)};kn.prototype.ya=function(){ge(this.g,"b")};function np(){this.blockSize=-1}function Fe(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}ce(Fe,np);Fe.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function Fi(n,e,t){t||(t=0);var r=Array(16);if(typeof e=="string")for(var s=0;16>s;++s)r[s]=e.charCodeAt(t++)|e.charCodeAt(t++)<<8|e.charCodeAt(t++)<<16|e.charCodeAt(t++)<<24;else for(s=0;16>s;++s)r[s]=e[t++]|e[t++]<<8|e[t++]<<16|e[t++]<<24;e=n.g[0],t=n.g[1],s=n.g[2];var i=n.g[3],o=e+(i^t&(s^i))+r[0]+3614090360&4294967295;e=t+(o<<7&4294967295|o>>>25),o=i+(s^e&(t^s))+r[1]+3905402710&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(t^i&(e^t))+r[2]+606105819&4294967295,s=i+(o<<17&4294967295|o>>>15),o=t+(e^s&(i^e))+r[3]+3250441966&4294967295,t=s+(o<<22&4294967295|o>>>10),o=e+(i^t&(s^i))+r[4]+4118548399&4294967295,e=t+(o<<7&4294967295|o>>>25),o=i+(s^e&(t^s))+r[5]+1200080426&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(t^i&(e^t))+r[6]+2821735955&4294967295,s=i+(o<<17&4294967295|o>>>15),o=t+(e^s&(i^e))+r[7]+4249261313&4294967295,t=s+(o<<22&4294967295|o>>>10),o=e+(i^t&(s^i))+r[8]+1770035416&4294967295,e=t+(o<<7&4294967295|o>>>25),o=i+(s^e&(t^s))+r[9]+2336552879&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(t^i&(e^t))+r[10]+4294925233&4294967295,s=i+(o<<17&4294967295|o>>>15),o=t+(e^s&(i^e))+r[11]+2304563134&4294967295,t=s+(o<<22&4294967295|o>>>10),o=e+(i^t&(s^i))+r[12]+1804603682&4294967295,e=t+(o<<7&4294967295|o>>>25),o=i+(s^e&(t^s))+r[13]+4254626195&4294967295,i=e+(o<<12&4294967295|o>>>20),o=s+(t^i&(e^t))+r[14]+2792965006&4294967295,s=i+(o<<17&4294967295|o>>>15),o=t+(e^s&(i^e))+r[15]+1236535329&4294967295,t=s+(o<<22&4294967295|o>>>10),o=e+(s^i&(t^s))+r[1]+4129170786&4294967295,e=t+(o<<5&4294967295|o>>>27),o=i+(t^s&(e^t))+r[6]+3225465664&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^t&(i^e))+r[11]+643717713&4294967295,s=i+(o<<14&4294967295|o>>>18),o=t+(i^e&(s^i))+r[0]+3921069994&4294967295,t=s+(o<<20&4294967295|o>>>12),o=e+(s^i&(t^s))+r[5]+3593408605&4294967295,e=t+(o<<5&4294967295|o>>>27),o=i+(t^s&(e^t))+r[10]+38016083&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^t&(i^e))+r[15]+3634488961&4294967295,s=i+(o<<14&4294967295|o>>>18),o=t+(i^e&(s^i))+r[4]+3889429448&4294967295,t=s+(o<<20&4294967295|o>>>12),o=e+(s^i&(t^s))+r[9]+568446438&4294967295,e=t+(o<<5&4294967295|o>>>27),o=i+(t^s&(e^t))+r[14]+3275163606&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^t&(i^e))+r[3]+4107603335&4294967295,s=i+(o<<14&4294967295|o>>>18),o=t+(i^e&(s^i))+r[8]+1163531501&4294967295,t=s+(o<<20&4294967295|o>>>12),o=e+(s^i&(t^s))+r[13]+2850285829&4294967295,e=t+(o<<5&4294967295|o>>>27),o=i+(t^s&(e^t))+r[2]+4243563512&4294967295,i=e+(o<<9&4294967295|o>>>23),o=s+(e^t&(i^e))+r[7]+1735328473&4294967295,s=i+(o<<14&4294967295|o>>>18),o=t+(i^e&(s^i))+r[12]+2368359562&4294967295,t=s+(o<<20&4294967295|o>>>12),o=e+(t^s^i)+r[5]+4294588738&4294967295,e=t+(o<<4&4294967295|o>>>28),o=i+(e^t^s)+r[8]+2272392833&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^t)+r[11]+1839030562&4294967295,s=i+(o<<16&4294967295|o>>>16),o=t+(s^i^e)+r[14]+4259657740&4294967295,t=s+(o<<23&4294967295|o>>>9),o=e+(t^s^i)+r[1]+2763975236&4294967295,e=t+(o<<4&4294967295|o>>>28),o=i+(e^t^s)+r[4]+1272893353&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^t)+r[7]+4139469664&4294967295,s=i+(o<<16&4294967295|o>>>16),o=t+(s^i^e)+r[10]+3200236656&4294967295,t=s+(o<<23&4294967295|o>>>9),o=e+(t^s^i)+r[13]+681279174&4294967295,e=t+(o<<4&4294967295|o>>>28),o=i+(e^t^s)+r[0]+3936430074&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^t)+r[3]+3572445317&4294967295,s=i+(o<<16&4294967295|o>>>16),o=t+(s^i^e)+r[6]+76029189&4294967295,t=s+(o<<23&4294967295|o>>>9),o=e+(t^s^i)+r[9]+3654602809&4294967295,e=t+(o<<4&4294967295|o>>>28),o=i+(e^t^s)+r[12]+3873151461&4294967295,i=e+(o<<11&4294967295|o>>>21),o=s+(i^e^t)+r[15]+530742520&4294967295,s=i+(o<<16&4294967295|o>>>16),o=t+(s^i^e)+r[2]+3299628645&4294967295,t=s+(o<<23&4294967295|o>>>9),o=e+(s^(t|~i))+r[0]+4096336452&4294967295,e=t+(o<<6&4294967295|o>>>26),o=i+(t^(e|~s))+r[7]+1126891415&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~t))+r[14]+2878612391&4294967295,s=i+(o<<15&4294967295|o>>>17),o=t+(i^(s|~e))+r[5]+4237533241&4294967295,t=s+(o<<21&4294967295|o>>>11),o=e+(s^(t|~i))+r[12]+1700485571&4294967295,e=t+(o<<6&4294967295|o>>>26),o=i+(t^(e|~s))+r[3]+2399980690&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~t))+r[10]+4293915773&4294967295,s=i+(o<<15&4294967295|o>>>17),o=t+(i^(s|~e))+r[1]+2240044497&4294967295,t=s+(o<<21&4294967295|o>>>11),o=e+(s^(t|~i))+r[8]+1873313359&4294967295,e=t+(o<<6&4294967295|o>>>26),o=i+(t^(e|~s))+r[15]+4264355552&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~t))+r[6]+2734768916&4294967295,s=i+(o<<15&4294967295|o>>>17),o=t+(i^(s|~e))+r[13]+1309151649&4294967295,t=s+(o<<21&4294967295|o>>>11),o=e+(s^(t|~i))+r[4]+4149444226&4294967295,e=t+(o<<6&4294967295|o>>>26),o=i+(t^(e|~s))+r[11]+3174756917&4294967295,i=e+(o<<10&4294967295|o>>>22),o=s+(e^(i|~t))+r[2]+718787259&4294967295,s=i+(o<<15&4294967295|o>>>17),o=t+(i^(s|~e))+r[9]+3951481745&4294967295,n.g[0]=n.g[0]+e&4294967295,n.g[1]=n.g[1]+(s+(o<<21&4294967295|o>>>11))&4294967295,n.g[2]=n.g[2]+s&4294967295,n.g[3]=n.g[3]+i&4294967295}Fe.prototype.j=function(n,e){e===void 0&&(e=n.length);for(var t=e-this.blockSize,r=this.m,s=this.h,i=0;i<e;){if(s==0)for(;i<=t;)Fi(this,n,i),i+=this.blockSize;if(typeof n=="string"){for(;i<e;)if(r[s++]=n.charCodeAt(i++),s==this.blockSize){Fi(this,r),s=0;break}}else for(;i<e;)if(r[s++]=n[i++],s==this.blockSize){Fi(this,r),s=0;break}}this.h=s,this.i+=e};Fe.prototype.l=function(){var n=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);n[0]=128;for(var e=1;e<n.length-8;++e)n[e]=0;var t=8*this.i;for(e=n.length-8;e<n.length;++e)n[e]=t&255,t/=256;for(this.j(n),n=Array(16),e=t=0;4>e;++e)for(var r=0;32>r;r+=8)n[t++]=this.g[e]>>>r&255;return n};function P(n,e){this.h=e;for(var t=[],r=!0,s=n.length-1;0<=s;s--){var i=n[s]|0;r&&i==e||(t[s]=i,r=!1)}this.g=t}var rp={};function ra(n){return-128<=n&&128>n?sl(rp,n,function(e){return new P([e|0],0>e?-1:0)}):new P([n|0],0>n?-1:0)}function Ve(n){if(isNaN(n)||!isFinite(n))return dn;if(0>n)return fe(Ve(-n));for(var e=[],t=1,r=0;n>=t;r++)e[r]=n/t|0,t*=ro;return new P(e,0)}function ih(n,e){if(n.length==0)throw Error("number format error: empty string");if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(n.charAt(0)=="-")return fe(ih(n.substring(1),e));if(0<=n.indexOf("-"))throw Error('number format error: interior "-" character');for(var t=Ve(Math.pow(e,8)),r=dn,s=0;s<n.length;s+=8){var i=Math.min(8,n.length-s),o=parseInt(n.substring(s,s+i),e);8>i?(i=Ve(Math.pow(e,i)),r=r.R(i).add(Ve(o))):(r=r.R(t),r=r.add(Ve(o)))}return r}var ro=4294967296,dn=ra(0),so=ra(1),Nu=ra(16777216);E=P.prototype;E.ea=function(){if(Re(this))return-fe(this).ea();for(var n=0,e=1,t=0;t<this.g.length;t++){var r=this.D(t);n+=(0<=r?r:ro+r)*e,e*=ro}return n};E.toString=function(n){if(n=n||10,2>n||36<n)throw Error("radix out of range: "+n);if(Ke(this))return"0";if(Re(this))return"-"+fe(this).toString(n);for(var e=Ve(Math.pow(n,6)),t=this,r="";;){var s=Ss(t,e).g;t=Ts(t,s.R(e));var i=((0<t.g.length?t.g[0]:t.h)>>>0).toString(n);if(t=s,Ke(t))return i+r;for(;6>i.length;)i="0"+i;r=i+r}};E.D=function(n){return 0>n?0:n<this.g.length?this.g[n]:this.h};function Ke(n){if(n.h!=0)return!1;for(var e=0;e<n.g.length;e++)if(n.g[e]!=0)return!1;return!0}function Re(n){return n.h==-1}E.X=function(n){return n=Ts(this,n),Re(n)?-1:Ke(n)?0:1};function fe(n){for(var e=n.g.length,t=[],r=0;r<e;r++)t[r]=~n.g[r];return new P(t,~n.h).add(so)}E.abs=function(){return Re(this)?fe(this):this};E.add=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0,s=0;s<=e;s++){var i=r+(this.D(s)&65535)+(n.D(s)&65535),o=(i>>>16)+(this.D(s)>>>16)+(n.D(s)>>>16);r=o>>>16,i&=65535,o&=65535,t[s]=o<<16|i}return new P(t,t[t.length-1]&-2147483648?-1:0)};function Ts(n,e){return n.add(fe(e))}E.R=function(n){if(Ke(this)||Ke(n))return dn;if(Re(this))return Re(n)?fe(this).R(fe(n)):fe(fe(this).R(n));if(Re(n))return fe(this.R(fe(n)));if(0>this.X(Nu)&&0>n.X(Nu))return Ve(this.ea()*n.ea());for(var e=this.g.length+n.g.length,t=[],r=0;r<2*e;r++)t[r]=0;for(r=0;r<this.g.length;r++)for(var s=0;s<n.g.length;s++){var i=this.D(r)>>>16,o=this.D(r)&65535,a=n.D(s)>>>16,u=n.D(s)&65535;t[2*r+2*s]+=o*u,Yr(t,2*r+2*s),t[2*r+2*s+1]+=i*u,Yr(t,2*r+2*s+1),t[2*r+2*s+1]+=o*a,Yr(t,2*r+2*s+1),t[2*r+2*s+2]+=i*a,Yr(t,2*r+2*s+2)}for(r=0;r<e;r++)t[r]=t[2*r+1]<<16|t[2*r];for(r=e;r<2*e;r++)t[r]=0;return new P(t,0)};function Yr(n,e){for(;(n[e]&65535)!=n[e];)n[e+1]+=n[e]>>>16,n[e]&=65535,e++}function Un(n,e){this.g=n,this.h=e}function Ss(n,e){if(Ke(e))throw Error("division by zero");if(Ke(n))return new Un(dn,dn);if(Re(n))return e=Ss(fe(n),e),new Un(fe(e.g),fe(e.h));if(Re(e))return e=Ss(n,fe(e)),new Un(fe(e.g),e.h);if(30<n.g.length){if(Re(n)||Re(e))throw Error("slowDivide_ only works with positive integers.");for(var t=so,r=e;0>=r.X(n);)t=ku(t),r=ku(r);var s=sn(t,1),i=sn(r,1);for(r=sn(r,2),t=sn(t,2);!Ke(r);){var o=i.add(r);0>=o.X(n)&&(s=s.add(t),i=o),r=sn(r,1),t=sn(t,1)}return e=Ts(n,s.R(e)),new Un(s,e)}for(s=dn;0<=n.X(e);){for(t=Math.max(1,Math.floor(n.ea()/e.ea())),r=Math.ceil(Math.log(t)/Math.LN2),r=48>=r?1:Math.pow(2,r-48),i=Ve(t),o=i.R(e);Re(o)||0<o.X(n);)t-=r,i=Ve(t),o=i.R(e);Ke(i)&&(i=so),s=s.add(i),n=Ts(n,o)}return new Un(s,n)}E.gb=function(n){return Ss(this,n).h};E.and=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0;r<e;r++)t[r]=this.D(r)&n.D(r);return new P(t,this.h&n.h)};E.or=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0;r<e;r++)t[r]=this.D(r)|n.D(r);return new P(t,this.h|n.h)};E.xor=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],r=0;r<e;r++)t[r]=this.D(r)^n.D(r);return new P(t,this.h^n.h)};function ku(n){for(var e=n.g.length+1,t=[],r=0;r<e;r++)t[r]=n.D(r)<<1|n.D(r-1)>>>31;return new P(t,n.h)}function sn(n,e){var t=e>>5;e%=32;for(var r=n.g.length-t,s=[],i=0;i<r;i++)s[i]=0<e?n.D(i+t)>>>e|n.D(i+t+1)<<32-e:n.D(i+t);return new P(s,n.h)}bs.prototype.createWebChannel=bs.prototype.g;Ne.prototype.send=Ne.prototype.u;Ne.prototype.open=Ne.prototype.m;Ne.prototype.close=Ne.prototype.close;Hs.NO_ERROR=0;Hs.TIMEOUT=8;Hs.HTTP_ERROR=6;Tl.COMPLETE="complete";Sl.EventType=xr;xr.OPEN="a";xr.CLOSE="b";xr.ERROR="c";xr.MESSAGE="d";ue.prototype.listen=ue.prototype.O;W.prototype.listenOnce=W.prototype.P;W.prototype.getLastError=W.prototype.Sa;W.prototype.getLastErrorCode=W.prototype.Ia;W.prototype.getStatus=W.prototype.da;W.prototype.getResponseJson=W.prototype.Wa;W.prototype.getResponseText=W.prototype.ja;W.prototype.send=W.prototype.ha;W.prototype.setWithCredentials=W.prototype.Oa;Fe.prototype.digest=Fe.prototype.l;Fe.prototype.reset=Fe.prototype.reset;Fe.prototype.update=Fe.prototype.j;P.prototype.add=P.prototype.add;P.prototype.multiply=P.prototype.R;P.prototype.modulo=P.prototype.gb;P.prototype.compare=P.prototype.X;P.prototype.toNumber=P.prototype.ea;P.prototype.toString=P.prototype.toString;P.prototype.getBits=P.prototype.D;P.fromNumber=Ve;P.fromString=ih;var sp=function(){return new bs},ip=function(){return Qs()},Li=Hs,op=Tl,ap=Jt,Ru={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},up=kr,Xr=Sl,cp=W,lp=Fe,fn=P,hp={};const Ou="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}oe.UNAUTHENTICATED=new oe(null),oe.GOOGLE_CREDENTIALS=new oe("google-credentials-uid"),oe.FIRST_PARTY=new oe("first-party-uid"),oe.MOCK_USER=new oe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rn="9.22.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lt=new Oo("@firebase/firestore");function io(){return lt.logLevel}function dp(n){lt.setLogLevel(n)}function y(n,...e){if(lt.logLevel<=F.DEBUG){const t=e.map(sa);lt.debug(`Firestore (${Rn}): ${n}`,...t)}}function X(n,...e){if(lt.logLevel<=F.ERROR){const t=e.map(sa);lt.error(`Firestore (${Rn}): ${n}`,...t)}}function Le(n,...e){if(lt.logLevel<=F.WARN){const t=e.map(sa);lt.warn(`Firestore (${Rn}): ${n}`,...t)}}function sa(n){if(typeof n=="string")return n;try{return e=n,JSON.stringify(e)}catch{return n}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(n="Unexpected state"){const e=`FIRESTORE (${Rn}) INTERNAL ASSERTION FAILED: `+n;throw X(e),new Error(e)}function _(n,e){n||T()}function fp(n,e){n||T()}function I(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class p extends Xt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class mp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(oe.UNAUTHENTICATED))}shutdown(){}}class gp{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class pp{constructor(e){this.t=e,this.currentUser=oe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new ae;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ae,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},a=u=>{y("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(u=>a(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?a(u):(y("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ae)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(y("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(_(typeof r.accessToken=="string"),new oh(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return _(e===null||typeof e=="string"),new oe(e)}}class yp{constructor(e,t,r){this.h=e,this.l=t,this.m=r,this.type="FirstParty",this.user=oe.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);const e=this.p();return e&&this.g.set("Authorization",e),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class wp{constructor(e,t,r){this.h=e,this.l=t,this.m=r}getToken(){return Promise.resolve(new yp(this.h,this.l,this.m))}start(e,t){e.enqueueRetryable(()=>t(oe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class vp{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ip{constructor(e){this.I=e,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(e,t){const r=i=>{i.error!=null&&y("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.T;return this.T=i.token,y("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{y("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.I.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.I.getImmediate({optional:!0});i?s(i):y("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(_(typeof t.token=="string"),this.T=t.token,new vp(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ep(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=Ep(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%e.length))}return r}}function x(n,e){return n<e?-1:n>e?1:0}function wn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}function uh(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new p(m.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new p(m.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new p(m.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new p(m.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return G.fromMillis(Date.now())}static fromDate(e){return G.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new G(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?x(this.nanoseconds,e.nanoseconds):x(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e){this.timestamp=e}static fromTimestamp(e){return new S(e)}static min(){return new S(new G(0,0))}static max(){return new S(new G(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr{constructor(e,t,r){t===void 0?t=0:t>e.length&&T(),r===void 0?r=e.length-t:r>e.length-t&&T(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return mr.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof mr?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=e.get(s),o=t.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class R extends mr{construct(e,t,r){return new R(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new p(m.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new R(t)}static emptyPath(){return new R([])}}const bp=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class J extends mr{construct(e,t,r){return new J(e,t,r)}static isValidIdentifier(e){return bp.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),J.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new J(["__name__"])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new p(m.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new p(m.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new p(m.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new p(m.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new J(t)}static emptyPath(){return new J([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(e){this.path=e}static fromPath(e){return new v(R.fromString(e))}static fromName(e){return new v(R.fromString(e).popFirst(5))}static empty(){return new v(R.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&R.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return R.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new v(new R(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function oo(n){return n.fields.find(e=>e.kind===2)}function xt(n){return n.fields.filter(e=>e.kind!==2)}ch.UNKNOWN_ID=-1;class Tp{constructor(e,t){this.fieldPath=e,this.kind=t}}class _s{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new _s(0,ke.min())}}function lh(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=S.fromTimestamp(r===1e9?new G(t+1,0):new G(t,r));return new ke(s,v.empty(),e)}function hh(n){return new ke(n.readTime,n.key,-1)}class ke{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new ke(S.min(),v.empty(),-1)}static max(){return new ke(S.max(),v.empty(),-1)}}function ia(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=v.comparator(n.documentKey,e.documentKey),t!==0?t:x(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class fh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Et(n){if(n.code!==m.FAILED_PRECONDITION||n.message!==dh)throw n;y("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&T(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new f((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof f?t:f.resolve(t)}catch(t){return f.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):f.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):f.reject(t)}static resolve(e){return new f((t,r)=>{t(e)})}static reject(e){return new f((t,r)=>{r(e)})}static waitFor(e){return new f((t,r)=>{let s=0,i=0,o=!1;e.forEach(a=>{++s,a.next(()=>{++i,o&&i===s&&t()},u=>r(u))}),o=!0,i===s&&t()})}static or(e){let t=f.resolve(!1);for(const r of e)t=t.next(s=>s?f.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new f((r,s)=>{const i=e.length,o=new Array(i);let a=0;for(let u=0;u<i;u++){const c=u;t(e[c]).next(l=>{o[c]=l,++a,a===i&&r(o)},l=>s(l))}})}static doWhile(e,t){return new f((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.v=new ae,this.transaction.oncomplete=()=>{this.v.resolve()},this.transaction.onabort=()=>{t.error?this.v.reject(new er(e,t.error)):this.v.resolve()},this.transaction.onerror=r=>{const s=oa(r.target.error);this.v.reject(new er(e,s))}}static open(e,t,r,s){try{return new ni(t,e.transaction(s,r))}catch(i){throw new er(t,i)}}get R(){return this.v.promise}abort(e){e&&this.v.reject(e),this.aborted||(y("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}P(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new _p(t)}}class Me{constructor(e,t,r){this.name=e,this.version=t,this.V=r,Me.S(or())===12.2&&X("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return y("SimpleDb","Removing database:",e),At(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!zc())return!1;if(Me.C())return!0;const e=or(),t=Me.S(e),r=0<t&&t<10,s=Me.N(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static C(){var e;return typeof process<"u"&&((e=hp)===null||e===void 0?void 0:e.k)==="YES"}static M(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}static N(e){const t=e.match(/Android ([\d.]+)/i),r=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(r)}async $(e){return this.db||(y("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new er(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new p(m.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new p(m.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new er(e,o))},s.onupgradeneeded=i=>{y("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.V.O(o,s.transaction,i.oldVersion,this.version).next(()=>{y("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.F&&(this.db.onversionchange=t=>this.F(t)),this.db}B(e){this.F=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.$(e);const a=ni.open(this.db,e,i?"readonly":"readwrite",r),u=s(a).next(c=>(a.P(),c)).catch(c=>(a.abort(c),f.reject(c))).toPromise();return u.catch(()=>{}),await a.R,u}catch(a){const u=a,c=u.name!=="FirebaseError"&&o<3;if(y("SimpleDb","Transaction failed with error:",u.message,"Retrying:",c),this.close(),!c)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}class Sp{constructor(e){this.L=e,this.q=!1,this.U=null}get isDone(){return this.q}get K(){return this.U}set cursor(e){this.L=e}done(){this.q=!0}G(e){this.U=e}delete(){return At(this.L.delete())}}class er extends p{constructor(e,t){super(m.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function bt(n){return n.name==="IndexedDbTransactionError"}class _p{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(y("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):(y("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),At(r)}add(e){return y("SimpleDb","ADD",this.store.name,e,e),At(this.store.add(e))}get(e){return At(this.store.get(e)).next(t=>(t===void 0&&(t=null),y("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return y("SimpleDb","DELETE",this.store.name,e),At(this.store.delete(e))}count(){return y("SimpleDb","COUNT",this.store.name),At(this.store.count())}j(e,t){const r=this.options(e,t);if(r.index||typeof this.store.getAll!="function"){const s=this.cursor(r),i=[];return this.W(s,(o,a)=>{i.push(a)}).next(()=>i)}{const s=this.store.getAll(r.range);return new f((i,o)=>{s.onerror=a=>{o(a.target.error)},s.onsuccess=a=>{i(a.target.result)}})}}H(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new f((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}})}J(e,t){y("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const s=this.cursor(r);return this.W(s,(i,o,a)=>a.delete())}X(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.W(s,t)}Z(e){const t=this.cursor({});return new f((r,s)=>{t.onerror=i=>{const o=oa(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(a=>{a?o.continue():r()}):r()}})}W(e,t){const r=[];return new f((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void s();const u=new Sp(a),c=t(a.primaryKey,a.value,u);if(c instanceof f){const l=c.catch(h=>(u.done(),f.reject(h)));r.push(l)}u.isDone?s():u.K===null?a.continue():a.continue(u.K)}}).next(()=>f.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function At(n){return new f((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=oa(r.target.error);t(s)}})}let Mu=!1;function oa(n){const e=Me.S(or());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new p("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Mu||(Mu=!0,setTimeout(()=>{throw r},0)),r}}return n}class Dp{constructor(e,t){this.asyncQueue=e,this.tt=t,this.task=null}start(){this.et(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}et(e){y("IndexBackiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{y("IndexBackiller",`Documents written: ${await this.tt.nt()}`)}catch(t){bt(t)?y("IndexBackiller","Ignoring IndexedDB error during index backfill: ",t):await Et(t)}await this.et(6e4)})}}class Cp{constructor(e,t){this.localStore=e,this.persistence=t}async nt(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.st(t,e))}st(e,t){const r=new Set;let s=t,i=!0;return f.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return y("IndexBackiller",`Processing collection: ${o}`),this.it(e,o,s).next(a=>{s-=a,r.add(o)});i=!1})).next(()=>t-s)}it(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.rt(s,i)).next(a=>(y("IndexBackiller",`Updating offset: ${a}`),this.localStore.indexManager.updateCollectionGroup(e,t,a))).next(()=>o.size)}))}rt(e,t){let r=e;return t.changes.forEach((s,i)=>{const o=hh(i);ia(o,r)>0&&(r=o)}),new ke(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ot(r),this.ut=r=>t.writeSequenceNumber(r))}ot(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ut&&this.ut(e),e}}De.ct=-1;function Mr(n){return n==null}function gr(n){return n===0&&1/n==-1/0}function mh(n){return typeof n=="number"&&Number.isInteger(n)&&!gr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Fu(e)),e=xp(n.get(t),e);return Fu(e)}function xp(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case"":t+="";break;default:t+=i}}return t}function Fu(n){return n+""}function Be(n){const e=n.length;if(_(e>=2),e===2)return _(n.charAt(0)===""&&n.charAt(1)===""),R.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf("",i);switch((o<0||o>t)&&T(),n.charAt(o+1)){case"":const a=n.substring(i,o);let u;s.length===0?u=a:(s+=a,u=s,s=""),r.push(u);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:T()}i=o+2}return new R(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lu=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function is(n,e){return[n,Te(e)]}function gh(n,e,t){return[n,Te(e),t]}const Ap={},Np=["prefixPath","collectionGroup","readTime","documentId"],kp=["prefixPath","collectionGroup","documentId"],Rp=["collectionGroup","readTime","prefixPath","documentId"],Op=["canonicalId","targetId"],Mp=["targetId","path"],Fp=["path","targetId"],Lp=["collectionId","parent"],Pp=["indexId","uid"],Vp=["uid","sequenceNumber"],Bp=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],$p=["indexId","uid","orderedDocumentKey"],Up=["userId","collectionPath","documentId"],qp=["userId","collectionPath","largestBatchId"],jp=["userId","collectionGroup","largestBatchId"],ph=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],zp=[...ph,"documentOverlays"],yh=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],wh=yh,Gp=[...wh,"indexConfiguration","indexState","indexEntries"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao extends fh{constructor(e,t){super(),this.ht=e,this.currentSequenceNumber=t}}function le(n,e){const t=I(n);return Me.M(t.ht,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Zt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function vh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e,t){this.comparator=e,this.root=t||de.EMPTY}insert(e,t){return new B(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,de.BLACK,null,null))}remove(e){return new B(this.comparator,this.root.remove(e,this.comparator).copy(null,null,de.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Jr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Jr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Jr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Jr(this.root,e,this.comparator,!0)}}class Jr{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class de{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??de.RED,this.left=s??de.EMPTY,this.right=i??de.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new de(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return de.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return de.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,de.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,de.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw T();const e=this.left.check();if(e!==this.right.check())throw T();return e+(this.isRed()?0:1)}}de.EMPTY=null,de.RED=!0,de.BLACK=!1;de.EMPTY=new class{constructor(){this.size=0}get key(){throw T()}get value(){throw T()}get color(){throw T()}get left(){throw T()}get right(){throw T()}copy(n,e,t,r,s){return this}insert(n,e,t){return new de(n,e)}remove(n,e){return this}isEmpty(){return!0}inorderTraversal(n){return!1}reverseTraversal(n){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.comparator=e,this.data=new B(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Vu(this.data.getIterator())}getIteratorFrom(e){return new Vu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof U)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new U(this.comparator);return t.data=e,t}}class Vu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function on(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this.fields=e,e.sort(J.comparator)}static empty(){return new Ce([])}unionWith(e){let t=new U(J.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ce(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return wn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kp(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Ih("Invalid base64 string: "+s):s}}(e);return new se(t)}static fromUint8Array(e){const t=function(r){let s="";for(let i=0;i<r.length;++i)s+=String.fromCharCode(r[i]);return s}(e);return new se(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return x(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}se.EMPTY_BYTE_STRING=new se("");const Qp=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ht(n){if(_(!!n),typeof n=="string"){let e=0;const t=Qp.exec(n);if(_(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:H(n.seconds),nanos:H(n.nanos)}}function H(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function dt(n){return typeof n=="string"?se.fromBase64String(n):se.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ri(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function aa(n){const e=n.mapValue.fields.__previous_value__;return ri(e)?aa(e):e}function pr(n){const e=ht(n.mapValue.fields.__local_write_time__.timestampValue);return new G(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp{constructor(e,t,r,s,i,o,a,u,c){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=u,this.useFetchStreams=c}}class ft{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new ft("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ft&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},os={nullValue:"NULL_VALUE"};function qt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ri(n)?4:Eh(n)?9007199254740991:10:T()}function je(n,e){if(n===e)return!0;const t=qt(n);if(t!==qt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return pr(n).isEqual(pr(e));case 3:return function(r,s){if(typeof r.timestampValue=="string"&&typeof s.timestampValue=="string"&&r.timestampValue.length===s.timestampValue.length)return r.timestampValue===s.timestampValue;const i=ht(r.timestampValue),o=ht(s.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,s){return dt(r.bytesValue).isEqual(dt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,s){return H(r.geoPointValue.latitude)===H(s.geoPointValue.latitude)&&H(r.geoPointValue.longitude)===H(s.geoPointValue.longitude)}(n,e);case 2:return function(r,s){if("integerValue"in r&&"integerValue"in s)return H(r.integerValue)===H(s.integerValue);if("doubleValue"in r&&"doubleValue"in s){const i=H(r.doubleValue),o=H(s.doubleValue);return i===o?gr(i)===gr(o):isNaN(i)&&isNaN(o)}return!1}(n,e);case 9:return wn(n.arrayValue.values||[],e.arrayValue.values||[],je);case 10:return function(r,s){const i=r.mapValue.fields||{},o=s.mapValue.fields||{};if(Pu(i)!==Pu(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!je(i[a],o[a])))return!1;return!0}(n,e);default:return T()}}function yr(n,e){return(n.values||[]).find(t=>je(t,e))!==void 0}function mt(n,e){if(n===e)return 0;const t=qt(n),r=qt(e);if(t!==r)return x(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return x(n.booleanValue,e.booleanValue);case 2:return function(s,i){const o=H(s.integerValue||s.doubleValue),a=H(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(n,e);case 3:return Bu(n.timestampValue,e.timestampValue);case 4:return Bu(pr(n),pr(e));case 5:return x(n.stringValue,e.stringValue);case 6:return function(s,i){const o=dt(s),a=dt(i);return o.compareTo(a)}(n.bytesValue,e.bytesValue);case 7:return function(s,i){const o=s.split("/"),a=i.split("/");for(let u=0;u<o.length&&u<a.length;u++){const c=x(o[u],a[u]);if(c!==0)return c}return x(o.length,a.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,i){const o=x(H(s.latitude),H(i.latitude));return o!==0?o:x(H(s.longitude),H(i.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(s,i){const o=s.values||[],a=i.values||[];for(let u=0;u<o.length&&u<a.length;++u){const c=mt(o[u],a[u]);if(c)return c}return x(o.length,a.length)}(n.arrayValue,e.arrayValue);case 10:return function(s,i){if(s===it.mapValue&&i===it.mapValue)return 0;if(s===it.mapValue)return 1;if(i===it.mapValue)return-1;const o=s.fields||{},a=Object.keys(o),u=i.fields||{},c=Object.keys(u);a.sort(),c.sort();for(let l=0;l<a.length&&l<c.length;++l){const h=x(a[l],c[l]);if(h!==0)return h;const d=mt(o[a[l]],u[c[l]]);if(d!==0)return d}return x(a.length,c.length)}(n.mapValue,e.mapValue);default:throw T()}}function Bu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return x(n,e);const t=ht(n),r=ht(e),s=x(t.seconds,r.seconds);return s!==0?s:x(t.nanos,r.nanos)}function vn(n){return uo(n)}function uo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(r){const s=ht(r);return`time(${s.seconds},${s.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?dt(n.bytesValue).toBase64():"referenceValue"in n?(t=n.referenceValue,v.fromName(t).toString()):"geoPointValue"in n?`geo(${(e=n.geoPointValue).latitude},${e.longitude})`:"arrayValue"in n?function(r){let s="[",i=!0;for(const o of r.values||[])i?i=!1:s+=",",s+=uo(o);return s+"]"}(n.arrayValue):"mapValue"in n?function(r){const s=Object.keys(r.fields||{}).sort();let i="{",o=!0;for(const a of s)o?o=!1:i+=",",i+=`${a}:${uo(r.fields[a])}`;return i+"}"}(n.mapValue):T();var e,t}function jt(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function co(n){return!!n&&"integerValue"in n}function wr(n){return!!n&&"arrayValue"in n}function $u(n){return!!n&&"nullValue"in n}function Uu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function as(n){return!!n&&"mapValue"in n}function tr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Zt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=tr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=tr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Eh(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}function Wp(n){return"nullValue"in n?os:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?jt(ft.empty(),v.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?{mapValue:{}}:T()}function Yp(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?jt(ft.empty(),v.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?{mapValue:{}}:"mapValue"in n?it:T()}function qu(n,e){const t=mt(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function ju(n,e){const t=mt(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e){this.value=e}static empty(){return new me({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!as(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=tr(t)}setAll(e){let t=J.emptyPath(),r={},s=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=a.popLast()}o?r[a.lastSegment()]=tr(o):s.push(a.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());as(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return je(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];as(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Zt(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new me(tr(this.value))}}function bh(n){const e=[];return Zt(n.fields,(t,r)=>{const s=new J([t]);if(as(r)){const i=bh(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Ce(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e,t,r,s,i,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new $(e,0,S.min(),S.min(),S.min(),me.empty(),0)}static newFoundDocument(e,t,r,s){return new $(e,1,t,S.min(),r,s,0)}static newNoDocument(e,t){return new $(e,2,t,S.min(),S.min(),me.empty(),0)}static newUnknownDocument(e,t){return new $(e,3,t,S.min(),S.min(),me.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(S.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=me.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=me.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=S.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof $&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new $(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,t){this.position=e,this.inclusive=t}}function zu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=v.comparator(v.fromName(o.referenceValue),t.key):r=mt(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Gu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!je(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,t="asc"){this.field=e,this.dir=t}}function Xp(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{}class N extends Th{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Jp(e,t,r):t==="array-contains"?new ty(e,r):t==="in"?new Ah(e,r):t==="not-in"?new ny(e,r):t==="array-contains-any"?new ry(e,r):new N(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Zp(e,r):new ey(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(mt(t,this.value)):t!==null&&qt(this.value)===qt(t)&&this.matchesComparison(mt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return T()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class L extends Th{constructor(e,t){super(),this.filters=e,this.op=t,this.lt=null}static create(e,t){return new L(e,t)}matches(e){return In(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.lt!==null||(this.lt=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.lt}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.ft(t=>t.isInequality());return e!==null?e.field:null}ft(e){for(const t of this.getFlattenedFilters())if(e(t))return t;return null}}function In(n){return n.op==="and"}function lo(n){return n.op==="or"}function ua(n){return Sh(n)&&In(n)}function Sh(n){for(const e of n.filters)if(e instanceof L)return!1;return!0}function ho(n){if(n instanceof N)return n.field.canonicalString()+n.op.toString()+vn(n.value);if(ua(n))return n.filters.map(e=>ho(e)).join(",");{const e=n.filters.map(t=>ho(t)).join(",");return`${n.op}(${e})`}}function _h(n,e){return n instanceof N?function(t,r){return r instanceof N&&t.op===r.op&&t.field.isEqual(r.field)&&je(t.value,r.value)}(n,e):n instanceof L?function(t,r){return r instanceof L&&t.op===r.op&&t.filters.length===r.filters.length?t.filters.reduce((s,i,o)=>s&&_h(i,r.filters[o]),!0):!1}(n,e):void T()}function Dh(n,e){const t=n.filters.concat(e);return L.create(t,n.op)}function Ch(n){return n instanceof N?function(e){return`${e.field.canonicalString()} ${e.op} ${vn(e.value)}`}(n):n instanceof L?function(e){return e.op.toString()+" {"+e.getFilters().map(Ch).join(" ,")+"}"}(n):"Filter"}class Jp extends N{constructor(e,t,r){super(e,t,r),this.key=v.fromName(r.referenceValue)}matches(e){const t=v.comparator(e.key,this.key);return this.matchesComparison(t)}}class Zp extends N{constructor(e,t){super(e,"in",t),this.keys=xh("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class ey extends N{constructor(e,t){super(e,"not-in",t),this.keys=xh("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function xh(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>v.fromName(r.referenceValue))}class ty extends N{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return wr(t)&&yr(t.arrayValue,this.value)}}class Ah extends N{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&yr(this.value.arrayValue,t)}}class ny extends N{constructor(e,t){super(e,"not-in",t)}matches(e){if(yr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!yr(this.value.arrayValue,t)}}class ry extends N{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!wr(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>yr(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy{constructor(e,t=null,r=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.dt=null}}function fo(n,e=null,t=[],r=[],s=null,i=null,o=null){return new sy(n,e,t,r,s,i,o)}function zt(n){const e=I(n);if(e.dt===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>ho(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Mr(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>vn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>vn(r)).join(",")),e.dt=t}return e.dt}function Fr(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Xp(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!_h(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Gu(n.startAt,e.startAt)&&Gu(n.endAt,e.endAt)}function Ds(n){return v.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Cs(n,e){return n.filters.filter(t=>t instanceof N&&t.field.isEqual(e))}function Ku(n,e,t){let r=os,s=!0;for(const i of Cs(n,e)){let o=os,a=!0;switch(i.op){case"<":case"<=":o=Wp(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,a=!1;break;case"!=":case"not-in":o=os}qu({value:r,inclusive:s},{value:o,inclusive:a})<0&&(r=o,s=a)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];qu({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function Qu(n,e,t){let r=it,s=!0;for(const i of Cs(n,e)){let o=it,a=!0;switch(i.op){case">=":case">":o=Yp(i.value),a=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,a=!1;break;case"!=":case"not-in":o=it}ju({value:r,inclusive:s},{value:o,inclusive:a})>0&&(r=o,s=a)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];ju({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,t=null,r=[],s=[],i=null,o="F",a=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=u,this.wt=null,this._t=null,this.startAt,this.endAt}}function Nh(n,e,t,r,s,i,o,a){return new Xe(n,e,t,r,s,i,o,a)}function On(n){return new Xe(n)}function Hu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function ca(n){return n.explicitOrderBy.length>0?n.explicitOrderBy[0].field:null}function si(n){for(const e of n.filters){const t=e.getFirstInequalityField();if(t!==null)return t}return null}function la(n){return n.collectionGroup!==null}function Bt(n){const e=I(n);if(e.wt===null){e.wt=[];const t=si(e),r=ca(e);if(t!==null&&r===null)t.isKeyField()||e.wt.push(new mn(t)),e.wt.push(new mn(J.keyField(),"asc"));else{let s=!1;for(const i of e.explicitOrderBy)e.wt.push(i),i.field.isKeyField()&&(s=!0);if(!s){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.wt.push(new mn(J.keyField(),i))}}}return e.wt}function Ae(n){const e=I(n);if(!e._t)if(e.limitType==="F")e._t=fo(e.path,e.collectionGroup,Bt(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const i of Bt(e)){const o=i.dir==="desc"?"asc":"desc";t.push(new mn(i.field,o))}const r=e.endAt?new gt(e.endAt.position,e.endAt.inclusive):null,s=e.startAt?new gt(e.startAt.position,e.startAt.inclusive):null;e._t=fo(e.path,e.collectionGroup,t,e.filters,e.limit,r,s)}return e._t}function mo(n,e){e.getFirstInequalityField(),si(n);const t=n.filters.concat([e]);return new Xe(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function xs(n,e,t){return new Xe(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Lr(n,e){return Fr(Ae(n),Ae(e))&&n.limitType===e.limitType}function kh(n){return`${zt(Ae(n))}|lt:${n.limitType}`}function go(n){return`Query(target=${function(e){let t=e.path.canonicalString();return e.collectionGroup!==null&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(r=>Ch(r)).join(", ")}]`),Mr(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(r=>function(s){return`${s.field.canonicalString()} (${s.dir})`}(r)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>vn(r)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>vn(r)).join(",")),`Target(${t})`}(Ae(n))}; limitType=${n.limitType})`}function Pr(n,e){return e.isFoundDocument()&&function(t,r){const s=r.key.path;return t.collectionGroup!==null?r.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(s):v.isDocumentKey(t.path)?t.path.isEqual(s):t.path.isImmediateParentOf(s)}(n,e)&&function(t,r){for(const s of Bt(t))if(!s.field.isKeyField()&&r.data.field(s.field)===null)return!1;return!0}(n,e)&&function(t,r){for(const s of t.filters)if(!s.matches(r))return!1;return!0}(n,e)&&function(t,r){return!(t.startAt&&!function(s,i,o){const a=zu(s,i,o);return s.inclusive?a<=0:a<0}(t.startAt,Bt(t),r)||t.endAt&&!function(s,i,o){const a=zu(s,i,o);return s.inclusive?a>=0:a>0}(t.endAt,Bt(t),r))}(n,e)}function Rh(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Oh(n){return(e,t)=>{let r=!1;for(const s of Bt(n)){const i=iy(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function iy(n,e,t){const r=n.field.isKeyField()?v.comparator(e.key,t.key):function(s,i,o){const a=i.data.field(s),u=o.data.field(s);return a!==null&&u!==null?mt(a,u):T()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return T()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Zt(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return vh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oy=new B(v.comparator);function xe(){return oy}const Mh=new B(v.comparator);function Yn(...n){let e=Mh;for(const t of n)e=e.insert(t.key,t);return e}function Fh(n){let e=Mh;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function $e(){return nr()}function Lh(){return nr()}function nr(){return new Tt(n=>n.toString(),(n,e)=>n.isEqual(e))}const ay=new B(v.comparator),uy=new U(v.comparator);function A(...n){let e=uy;for(const t of n)e=e.add(t);return e}const cy=new U(x);function ha(){return cy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ph(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:gr(e)?"-0":e}}function Vh(n){return{integerValue:""+n}}function Bh(n,e){return mh(e)?Vh(e):Ph(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(){this._=void 0}}function ly(n,e,t){return n instanceof En?function(r,s){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return s&&ri(s)&&(s=aa(s)),s&&(i.fields.__previous_value__=s),{mapValue:i}}(t,e):n instanceof Gt?Uh(n,e):n instanceof Kt?qh(n,e):function(r,s){const i=$h(r,s),o=Wu(i)+Wu(r.gt);return co(i)&&co(r.gt)?Vh(o):Ph(r.serializer,o)}(n,e)}function hy(n,e,t){return n instanceof Gt?Uh(n,e):n instanceof Kt?qh(n,e):t}function $h(n,e){return n instanceof bn?co(t=e)||function(r){return!!r&&"doubleValue"in r}(t)?e:{integerValue:0}:null;var t}class En extends ii{}class Gt extends ii{constructor(e){super(),this.elements=e}}function Uh(n,e){const t=jh(e);for(const r of n.elements)t.some(s=>je(s,r))||t.push(r);return{arrayValue:{values:t}}}class Kt extends ii{constructor(e){super(),this.elements=e}}function qh(n,e){let t=jh(e);for(const r of n.elements)t=t.filter(s=>!je(s,r));return{arrayValue:{values:t}}}class bn extends ii{constructor(e,t){super(),this.serializer=e,this.gt=t}}function Wu(n){return H(n.integerValue||n.doubleValue)}function jh(n){return wr(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e,t){this.field=e,this.transform=t}}function dy(n,e){return n.field.isEqual(e.field)&&function(t,r){return t instanceof Gt&&r instanceof Gt||t instanceof Kt&&r instanceof Kt?wn(t.elements,r.elements,je):t instanceof bn&&r instanceof bn?je(t.gt,r.gt):t instanceof En&&r instanceof En}(n.transform,e.transform)}class fy{constructor(e,t){this.version=e,this.transformResults=t}}class z{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new z}static exists(e){return new z(void 0,e)}static updateTime(e){return new z(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function us(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class oi{}function zh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Fn(n.key,z.none()):new Mn(n.key,n.data,z.none());{const t=n.data,r=me.empty();let s=new U(J.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Je(n.key,r,new Ce(s.toArray()),z.none())}}function my(n,e,t){n instanceof Mn?function(r,s,i){const o=r.value.clone(),a=Xu(r.fieldTransforms,s,i.transformResults);o.setAll(a),s.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(n,e,t):n instanceof Je?function(r,s,i){if(!us(r.precondition,s))return void s.convertToUnknownDocument(i.version);const o=Xu(r.fieldTransforms,s,i.transformResults),a=s.data;a.setAll(Gh(r)),a.setAll(o),s.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(n,e,t):function(r,s,i){s.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,t)}function rr(n,e,t,r){return n instanceof Mn?function(s,i,o,a){if(!us(s.precondition,i))return o;const u=s.value.clone(),c=Ju(s.fieldTransforms,a,i);return u.setAll(c),i.convertToFoundDocument(i.version,u).setHasLocalMutations(),null}(n,e,t,r):n instanceof Je?function(s,i,o,a){if(!us(s.precondition,i))return o;const u=Ju(s.fieldTransforms,a,i),c=i.data;return c.setAll(Gh(s)),c.setAll(u),i.convertToFoundDocument(i.version,c).setHasLocalMutations(),o===null?null:o.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(l=>l.field))}(n,e,t,r):function(s,i,o){return us(s.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):o}(n,e,t)}function gy(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=$h(r.transform,s||null);i!=null&&(t===null&&(t=me.empty()),t.set(r.field,i))}return t||null}function Yu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(t,r){return t===void 0&&r===void 0||!(!t||!r)&&wn(t,r,(s,i)=>dy(s,i))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Mn extends oi{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Je extends oi{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Gh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Xu(n,e,t){const r=new Map;_(n.length===t.length);for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,hy(o,a,t[s]))}return r}function Ju(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,ly(i,o,e))}return r}class Fn extends oi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class da extends oi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&my(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=rr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=rr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Lh();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=t.has(s.key)?null:a;const u=zh(o,a);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(S.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),A())}isEqual(e){return this.batchId===e.batchId&&wn(this.mutations,e.mutations,(t,r)=>Yu(t,r))&&wn(this.baseMutations,e.baseMutations,(t,r)=>Yu(t,r))}}class ma{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){_(e.mutations.length===r.length);let s=ay;const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new ma(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ga{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class py{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var te,k;function Kh(n){switch(n){default:return T();case m.CANCELLED:case m.UNKNOWN:case m.DEADLINE_EXCEEDED:case m.RESOURCE_EXHAUSTED:case m.INTERNAL:case m.UNAVAILABLE:case m.UNAUTHENTICATED:return!1;case m.INVALID_ARGUMENT:case m.NOT_FOUND:case m.ALREADY_EXISTS:case m.PERMISSION_DENIED:case m.FAILED_PRECONDITION:case m.ABORTED:case m.OUT_OF_RANGE:case m.UNIMPLEMENTED:case m.DATA_LOSS:return!0}}function Qh(n){if(n===void 0)return X("GRPC error has no .code"),m.UNKNOWN;switch(n){case te.OK:return m.OK;case te.CANCELLED:return m.CANCELLED;case te.UNKNOWN:return m.UNKNOWN;case te.DEADLINE_EXCEEDED:return m.DEADLINE_EXCEEDED;case te.RESOURCE_EXHAUSTED:return m.RESOURCE_EXHAUSTED;case te.INTERNAL:return m.INTERNAL;case te.UNAVAILABLE:return m.UNAVAILABLE;case te.UNAUTHENTICATED:return m.UNAUTHENTICATED;case te.INVALID_ARGUMENT:return m.INVALID_ARGUMENT;case te.NOT_FOUND:return m.NOT_FOUND;case te.ALREADY_EXISTS:return m.ALREADY_EXISTS;case te.PERMISSION_DENIED:return m.PERMISSION_DENIED;case te.FAILED_PRECONDITION:return m.FAILED_PRECONDITION;case te.ABORTED:return m.ABORTED;case te.OUT_OF_RANGE:return m.OUT_OF_RANGE;case te.UNIMPLEMENTED:return m.UNIMPLEMENTED;case te.DATA_LOSS:return m.DATA_LOSS;default:return T()}}(k=te||(te={}))[k.OK=0]="OK",k[k.CANCELLED=1]="CANCELLED",k[k.UNKNOWN=2]="UNKNOWN",k[k.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",k[k.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",k[k.NOT_FOUND=5]="NOT_FOUND",k[k.ALREADY_EXISTS=6]="ALREADY_EXISTS",k[k.PERMISSION_DENIED=7]="PERMISSION_DENIED",k[k.UNAUTHENTICATED=16]="UNAUTHENTICATED",k[k.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",k[k.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",k[k.ABORTED=10]="ABORTED",k[k.OUT_OF_RANGE=11]="OUT_OF_RANGE",k[k.UNIMPLEMENTED=12]="UNIMPLEMENTED",k[k.INTERNAL=13]="INTERNAL",k[k.UNAVAILABLE=14]="UNAVAILABLE",k[k.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa{constructor(){this.onExistenceFilterMismatchCallbacks=new Map}static get instance(){return Zr}static getOrCreateInstance(){return Zr===null&&(Zr=new pa),Zr}onExistenceFilterMismatch(e){const t=Symbol();return this.onExistenceFilterMismatchCallbacks.set(t,e),()=>this.onExistenceFilterMismatchCallbacks.delete(t)}notifyOnExistenceFilterMismatch(e){this.onExistenceFilterMismatchCallbacks.forEach(t=>t(e))}}let Zr=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hh(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yy=new fn([4294967295,4294967295],0);function Zu(n){const e=Hh().encode(n),t=new lp;return t.update(e),new Uint8Array(t.digest())}function ec(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new fn([t,r],0),new fn([s,i],0)]}class ya{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Xn(`Invalid padding: ${t}`);if(r<0)throw new Xn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Xn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Xn(`Invalid padding when bitmap length is 0: ${t}`);this.It=8*e.length-t,this.Tt=fn.fromNumber(this.It)}Et(e,t,r){let s=e.add(t.multiply(fn.fromNumber(r)));return s.compare(yy)===1&&(s=new fn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Tt).toNumber()}At(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}vt(e){if(this.It===0)return!1;const t=Zu(e),[r,s]=ec(t);for(let i=0;i<this.hashCount;i++){const o=this.Et(r,s,i);if(!this.At(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new ya(i,s,t);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.It===0)return;const t=Zu(e),[r,s]=ec(t);for(let i=0;i<this.hashCount;i++){const o=this.Et(r,s,i);this.Rt(o)}}Rt(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Xn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,$r.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Br(S.min(),s,new B(x),xe(),A())}}class $r{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new $r(r,t,A(),A(),A())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(e,t,r,s){this.Pt=e,this.removedTargetIds=t,this.key=r,this.bt=s}}class Wh{constructor(e,t){this.targetId=e,this.Vt=t}}class Yh{constructor(e,t,r=se.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class tc{constructor(){this.St=0,this.Dt=rc(),this.Ct=se.EMPTY_BYTE_STRING,this.xt=!1,this.Nt=!0}get current(){return this.xt}get resumeToken(){return this.Ct}get kt(){return this.St!==0}get Mt(){return this.Nt}$t(e){e.approximateByteSize()>0&&(this.Nt=!0,this.Ct=e)}Ot(){let e=A(),t=A(),r=A();return this.Dt.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:T()}}),new $r(this.Ct,this.xt,e,t,r)}Ft(){this.Nt=!1,this.Dt=rc()}Bt(e,t){this.Nt=!0,this.Dt=this.Dt.insert(e,t)}Lt(e){this.Nt=!0,this.Dt=this.Dt.remove(e)}qt(){this.St+=1}Ut(){this.St-=1}Kt(){this.Nt=!0,this.xt=!0}}class wy{constructor(e){this.Gt=e,this.Qt=new Map,this.jt=xe(),this.zt=nc(),this.Wt=new B(x)}Ht(e){for(const t of e.Pt)e.bt&&e.bt.isFoundDocument()?this.Jt(t,e.bt):this.Yt(t,e.key,e.bt);for(const t of e.removedTargetIds)this.Yt(t,e.key,e.bt)}Xt(e){this.forEachTarget(e,t=>{const r=this.Zt(t);switch(e.state){case 0:this.te(t)&&r.$t(e.resumeToken);break;case 1:r.Ut(),r.kt||r.Ft(),r.$t(e.resumeToken);break;case 2:r.Ut(),r.kt||this.removeTarget(t);break;case 3:this.te(t)&&(r.Kt(),r.$t(e.resumeToken));break;case 4:this.te(t)&&(this.ee(t),r.$t(e.resumeToken));break;default:T()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Qt.forEach((r,s)=>{this.te(s)&&t(s)})}ne(e){var t;const r=e.targetId,s=e.Vt.count,i=this.se(r);if(i){const o=i.target;if(Ds(o))if(s===0){const a=new v(o.path);this.Yt(r,a,$.newNoDocument(a,S.min()))}else _(s===1);else{const a=this.ie(r);if(a!==s){const u=this.re(e,a);if(u!==0){this.ee(r);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Wt=this.Wt.insert(r,c)}(t=pa.instance)===null||t===void 0||t.notifyOnExistenceFilterMismatch(function(c,l,h){var d,g,w,b,D,V;const K={localCacheCount:l,existenceFilterCount:h.count},O=h.unchangedNames;return O&&(K.bloomFilter={applied:c===0,hashCount:(d=O==null?void 0:O.hashCount)!==null&&d!==void 0?d:0,bitmapLength:(b=(w=(g=O==null?void 0:O.bits)===null||g===void 0?void 0:g.bitmap)===null||w===void 0?void 0:w.length)!==null&&b!==void 0?b:0,padding:(V=(D=O==null?void 0:O.bits)===null||D===void 0?void 0:D.padding)!==null&&V!==void 0?V:0}),K}(u,a,e.Vt))}}}}re(e,t){const{unchangedNames:r,count:s}=e.Vt;if(!r||!r.bits)return 1;const{bits:{bitmap:i="",padding:o=0},hashCount:a=0}=r;let u,c;try{u=dt(i).toUint8Array()}catch(l){if(l instanceof Ih)return Le("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),1;throw l}try{c=new ya(u,o,a)}catch(l){return Le(l instanceof Xn?"BloomFilter error: ":"Applying bloom filter failed: ",l),1}return c.It===0?1:s!==t-this.oe(e.targetId,c)?2:0}oe(e,t){const r=this.Gt.getRemoteKeysForTarget(e);let s=0;return r.forEach(i=>{const o=this.Gt.ue(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;t.vt(a)||(this.Yt(e,i,null),s++)}),s}ce(e){const t=new Map;this.Qt.forEach((i,o)=>{const a=this.se(o);if(a){if(i.current&&Ds(a.target)){const u=new v(a.target.path);this.jt.get(u)!==null||this.ae(o,u)||this.Yt(o,u,$.newNoDocument(u,e))}i.Mt&&(t.set(o,i.Ot()),i.Ft())}});let r=A();this.zt.forEach((i,o)=>{let a=!0;o.forEachWhile(u=>{const c=this.se(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(i))}),this.jt.forEach((i,o)=>o.setReadTime(e));const s=new Br(e,t,this.Wt,this.jt,r);return this.jt=xe(),this.zt=nc(),this.Wt=new B(x),s}Jt(e,t){if(!this.te(e))return;const r=this.ae(e,t.key)?2:0;this.Zt(e).Bt(t.key,r),this.jt=this.jt.insert(t.key,t),this.zt=this.zt.insert(t.key,this.he(t.key).add(e))}Yt(e,t,r){if(!this.te(e))return;const s=this.Zt(e);this.ae(e,t)?s.Bt(t,1):s.Lt(t),this.zt=this.zt.insert(t,this.he(t).delete(e)),r&&(this.jt=this.jt.insert(t,r))}removeTarget(e){this.Qt.delete(e)}ie(e){const t=this.Zt(e).Ot();return this.Gt.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}qt(e){this.Zt(e).qt()}Zt(e){let t=this.Qt.get(e);return t||(t=new tc,this.Qt.set(e,t)),t}he(e){let t=this.zt.get(e);return t||(t=new U(x),this.zt=this.zt.insert(e,t)),t}te(e){const t=this.se(e)!==null;return t||y("WatchChangeAggregator","Detected inactive target",e),t}se(e){const t=this.Qt.get(e);return t&&t.kt?null:this.Gt.le(e)}ee(e){this.Qt.set(e,new tc),this.Gt.getRemoteKeysForTarget(e).forEach(t=>{this.Yt(e,t,null)})}ae(e,t){return this.Gt.getRemoteKeysForTarget(e).has(t)}}function nc(){return new B(v.comparator)}function rc(){return new B(v.comparator)}const vy={asc:"ASCENDING",desc:"DESCENDING"},Iy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Ey={and:"AND",or:"OR"};class by{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function po(n,e){return n.useProto3Json||Mr(e)?e:{value:e}}function Tn(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Xh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Ty(n,e){return Tn(n,e.toTimestamp())}function Z(n){return _(!!n),S.fromTimestamp(function(e){const t=ht(e);return new G(t.seconds,t.nanos)}(n))}function wa(n,e){return function(t){return new R(["projects",t.projectId,"databases",t.database])}(n).child("documents").child(e).canonicalString()}function Jh(n){const e=R.fromString(n);return _(ad(e)),e}function vr(n,e){return wa(n.databaseId,e.path)}function Ue(n,e){const t=Jh(e);if(t.get(1)!==n.databaseId.projectId)throw new p(m.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new p(m.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new v(ed(t))}function yo(n,e){return wa(n.databaseId,e)}function Zh(n){const e=Jh(n);return e.length===4?R.emptyPath():ed(e)}function Ir(n){return new R(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ed(n){return _(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function sc(n,e,t){return{name:vr(n,e),fields:t.value.mapValue.fields}}function td(n,e,t){const r=Ue(n,e.name),s=Z(e.updateTime),i=e.createTime?Z(e.createTime):S.min(),o=new me({mapValue:{fields:e.fields}}),a=$.newFoundDocument(r,s,i,o);return t&&a.setHasCommittedMutations(),t?a.setHasCommittedMutations():a}function Sy(n,e){return"found"in e?function(t,r){_(!!r.found),r.found.name,r.found.updateTime;const s=Ue(t,r.found.name),i=Z(r.found.updateTime),o=r.found.createTime?Z(r.found.createTime):S.min(),a=new me({mapValue:{fields:r.found.fields}});return $.newFoundDocument(s,i,o,a)}(n,e):"missing"in e?function(t,r){_(!!r.missing),_(!!r.readTime);const s=Ue(t,r.missing),i=Z(r.readTime);return $.newNoDocument(s,i)}(n,e):T()}function _y(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:T()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(u,c){return u.useProto3Json?(_(c===void 0||typeof c=="string"),se.fromBase64String(c||"")):(_(c===void 0||c instanceof Uint8Array),se.fromUint8Array(c||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(u){const c=u.code===void 0?m.UNKNOWN:Qh(u.code);return new p(c,u.message||"")}(o);t=new Yh(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ue(n,r.document.name),i=Z(r.document.updateTime),o=r.document.createTime?Z(r.document.createTime):S.min(),a=new me({mapValue:{fields:r.document.fields}}),u=$.newFoundDocument(s,i,o,a),c=r.targetIds||[],l=r.removedTargetIds||[];t=new cs(c,l,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Ue(n,r.document),i=r.readTime?Z(r.readTime):S.min(),o=$.newNoDocument(s,i),a=r.removedTargetIds||[];t=new cs([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Ue(n,r.document),i=r.removedTargetIds||[];t=new cs([],i,s,null)}else{if(!("filter"in e))return T();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new py(s,i),a=r.targetId;t=new Wh(a,o)}}return t}function Er(n,e){let t;if(e instanceof Mn)t={update:sc(n,e.key,e.value)};else if(e instanceof Fn)t={delete:vr(n,e.key)};else if(e instanceof Je)t={update:sc(n,e.key,e.data),updateMask:ky(e.fieldMask)};else{if(!(e instanceof da))return T();t={verify:vr(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,i){const o=i.transform;if(o instanceof En)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof Gt)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof Kt)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof bn)return{fieldPath:i.field.canonicalString(),increment:o.gt};throw T()}(0,r))),e.precondition.isNone||(t.currentDocument=function(r,s){return s.updateTime!==void 0?{updateTime:Ty(r,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:T()}(n,e.precondition)),t}function wo(n,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?z.updateTime(Z(s.updateTime)):s.exists!==void 0?z.exists(s.exists):z.none()}(e.currentDocument):z.none(),r=e.updateTransforms?e.updateTransforms.map(s=>function(i,o){let a=null;if("setToServerValue"in o)_(o.setToServerValue==="REQUEST_TIME"),a=new En;else if("appendMissingElements"in o){const c=o.appendMissingElements.values||[];a=new Gt(c)}else if("removeAllFromArray"in o){const c=o.removeAllFromArray.values||[];a=new Kt(c)}else"increment"in o?a=new bn(i,o.increment):T();const u=J.fromServerFormat(o.fieldPath);return new Vr(u,a)}(n,s)):[];if(e.update){e.update.name;const s=Ue(n,e.update.name),i=new me({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(a){const u=a.fieldPaths||[];return new Ce(u.map(c=>J.fromServerFormat(c)))}(e.updateMask);return new Je(s,i,o,t,r)}return new Mn(s,i,t,r)}if(e.delete){const s=Ue(n,e.delete);return new Fn(s,t)}if(e.verify){const s=Ue(n,e.verify);return new da(s,t)}return T()}function Dy(n,e){return n&&n.length>0?(_(e!==void 0),n.map(t=>function(r,s){let i=r.updateTime?Z(r.updateTime):Z(s);return i.isEqual(S.min())&&(i=Z(s)),new fy(i,r.transformResults||[])}(t,e))):[]}function nd(n,e){return{documents:[yo(n,e.path)]}}function rd(n,e){const t={structuredQuery:{}},r=e.path;e.collectionGroup!==null?(t.parent=yo(n,r),t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(t.parent=yo(n,r.popLast()),t.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(u){if(u.length!==0)return od(L.create(u,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const i=function(u){if(u.length!==0)return u.map(c=>function(l){return{field:un(l.field),direction:xy(l.dir)}}(c))}(e.orderBy);i&&(t.structuredQuery.orderBy=i);const o=po(n,e.limit);var a;return o!==null&&(t.structuredQuery.limit=o),e.startAt&&(t.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(t.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),t}function sd(n){let e=Zh(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){_(r===1);const l=t.from[0];l.allDescendants?s=l.collectionId:e=e.child(l.collectionId)}let i=[];t.where&&(i=function(l){const h=id(l);return h instanceof L&&ua(h)?h.getFilters():[h]}(t.where));let o=[];t.orderBy&&(o=t.orderBy.map(l=>function(h){return new mn(cn(h.field),function(d){switch(d){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(l)));let a=null;t.limit&&(a=function(l){let h;return h=typeof l=="object"?l.value:l,Mr(h)?null:h}(t.limit));let u=null;t.startAt&&(u=function(l){const h=!!l.before,d=l.values||[];return new gt(d,h)}(t.startAt));let c=null;return t.endAt&&(c=function(l){const h=!l.before,d=l.values||[];return new gt(d,h)}(t.endAt)),Nh(e,s,o,i,a,"F",u,c)}function Cy(n,e){const t=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return T()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function id(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=cn(e.unaryFilter.field);return N.create(t,"==",{doubleValue:NaN});case"IS_NULL":const r=cn(e.unaryFilter.field);return N.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=cn(e.unaryFilter.field);return N.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=cn(e.unaryFilter.field);return N.create(i,"!=",{nullValue:"NULL_VALUE"});default:return T()}}(n):n.fieldFilter!==void 0?function(e){return N.create(cn(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return T()}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return L.create(e.compositeFilter.filters.map(t=>id(t)),function(t){switch(t){case"AND":return"and";case"OR":return"or";default:return T()}}(e.compositeFilter.op))}(n):T()}function xy(n){return vy[n]}function Ay(n){return Iy[n]}function Ny(n){return Ey[n]}function un(n){return{fieldPath:n.canonicalString()}}function cn(n){return J.fromServerFormat(n.fieldPath)}function od(n){return n instanceof N?function(e){if(e.op==="=="){if(Uu(e.value))return{unaryFilter:{field:un(e.field),op:"IS_NAN"}};if($u(e.value))return{unaryFilter:{field:un(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Uu(e.value))return{unaryFilter:{field:un(e.field),op:"IS_NOT_NAN"}};if($u(e.value))return{unaryFilter:{field:un(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:un(e.field),op:Ay(e.op),value:e.value}}}(n):n instanceof L?function(e){const t=e.getFilters().map(r=>od(r));return t.length===1?t[0]:{compositeFilter:{op:Ny(e.op),filters:t}}}(n):T()}function ky(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ad(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e,t,r,s,i=S.min(),o=S.min(),a=se.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=u}withSequenceNumber(e){return new Qe(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Qe(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Qe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Qe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud{constructor(e){this.fe=e}}function Ry(n,e){let t;if(e.document)t=td(n.fe,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=v.fromSegments(e.noDocument.path),s=Ht(e.noDocument.readTime);t=$.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return T();{const r=v.fromSegments(e.unknownDocument.path),s=Ht(e.unknownDocument.version);t=$.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime(function(r){const s=new G(r[0],r[1]);return S.fromTimestamp(s)}(e.readTime)),t}function ic(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:As(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,i){return{name:vr(s,i.key),fields:i.data.value.mapValue.fields,updateTime:Tn(s,i.version.toTimestamp()),createTime:Tn(s,i.createTime.toTimestamp())}}(n.fe,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Qt(e.version)};else{if(!e.isUnknownDocument())return T();r.unknownDocument={path:t.path.toArray(),version:Qt(e.version)}}return r}function As(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Qt(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Ht(n){const e=new G(n.seconds,n.nanoseconds);return S.fromTimestamp(e)}function Nt(n,e){const t=(e.baseMutations||[]).map(i=>wo(n.fe,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const a=e.mutations[i+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map(i=>wo(n.fe,i)),s=G.fromMillis(e.localWriteTimeMs);return new fa(e.batchId,s,t,r)}function Jn(n){const e=Ht(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Ht(n.lastLimboFreeSnapshotVersion):S.min();let r;var s;return n.query.documents!==void 0?(_((s=n.query).documents.length===1),r=Ae(On(Zh(s.documents[0])))):r=function(i){return Ae(sd(i))}(n.query),new Qe(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,se.fromBase64String(n.resumeToken))}function cd(n,e){const t=Qt(e.snapshotVersion),r=Qt(e.lastLimboFreeSnapshotVersion);let s;s=Ds(e.target)?nd(n.fe,e.target):rd(n.fe,e.target);const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:zt(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function va(n){const e=sd({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?xs(e,e.limit,"L"):e}function Pi(n,e){return new ga(e.largestBatchId,wo(n.fe,e.overlayMutation))}function oc(n,e){const t=e.path.lastSegment();return[n,Te(e.path.popLast()),t]}function ac(n,e,t,r){return{indexId:n,uid:e.uid||"",sequenceNumber:t,readTime:Qt(r.readTime),documentKey:Te(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oy{getBundleMetadata(e,t){return uc(e).get(t).next(r=>{if(r)return{id:(s=r).bundleId,createTime:Ht(s.createTime),version:s.version};var s})}saveBundleMetadata(e,t){return uc(e).put({bundleId:(r=t).id,createTime:Qt(Z(r.createTime)),version:r.version});var r}getNamedQuery(e,t){return cc(e).get(t).next(r=>{if(r)return{name:(s=r).name,query:va(s.bundledQuery),readTime:Ht(s.readTime)};var s})}saveNamedQuery(e,t){return cc(e).put(function(r){return{name:r.name,readTime:Qt(Z(r.readTime)),bundledQuery:r.bundledQuery}}(t))}}function uc(n){return le(n,"bundles")}function cc(n){return le(n,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(e,t){this.serializer=e,this.userId=t}static de(e,t){const r=t.uid||"";return new ai(e,r)}getOverlay(e,t){return qn(e).get(oc(this.userId,t)).next(r=>r?Pi(this.serializer,r):null)}getOverlays(e,t){const r=$e();return f.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){const s=[];return r.forEach((i,o)=>{const a=new ga(t,o);s.push(this.we(e,a))}),f.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach(o=>s.add(Te(o.getCollectionPath())));const i=[];return s.forEach(o=>{const a=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(qn(e).J("collectionPathOverlayIndex",a))}),f.waitFor(i)}getOverlaysForCollection(e,t,r){const s=$e(),i=Te(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return qn(e).j("collectionPathOverlayIndex",o).next(a=>{for(const u of a){const c=Pi(this.serializer,u);s.set(c.getKey(),c)}return s})}getOverlaysForCollectionGroup(e,t,r,s){const i=$e();let o;const a=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return qn(e).X({index:"collectionGroupOverlayIndex",range:a},(u,c,l)=>{const h=Pi(this.serializer,c);i.size()<s||h.largestBatchId===o?(i.set(h.getKey(),h),o=h.largestBatchId):l.done()}).next(()=>i)}we(e,t){return qn(e).put(function(r,s,i){const[o,a,u]=oc(s,i.mutation.key);return{userId:s,collectionPath:a,documentId:u,collectionGroup:i.mutation.key.getCollectionGroup(),largestBatchId:i.largestBatchId,overlayMutation:Er(r.fe,i.mutation)}}(this.serializer,this.userId,t))}}function qn(n){return le(n,"documentOverlays")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(){}_e(e,t){this.me(e,t),t.ge()}me(e,t){if("nullValue"in e)this.ye(t,5);else if("booleanValue"in e)this.ye(t,10),t.pe(e.booleanValue?1:0);else if("integerValue"in e)this.ye(t,15),t.pe(H(e.integerValue));else if("doubleValue"in e){const r=H(e.doubleValue);isNaN(r)?this.ye(t,13):(this.ye(t,15),gr(r)?t.pe(0):t.pe(r))}else if("timestampValue"in e){const r=e.timestampValue;this.ye(t,20),typeof r=="string"?t.Ie(r):(t.Ie(`${r.seconds||""}`),t.pe(r.nanos||0))}else if("stringValue"in e)this.Te(e.stringValue,t),this.Ee(t);else if("bytesValue"in e)this.ye(t,30),t.Ae(dt(e.bytesValue)),this.Ee(t);else if("referenceValue"in e)this.ve(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.ye(t,45),t.pe(r.latitude||0),t.pe(r.longitude||0)}else"mapValue"in e?Eh(e)?this.ye(t,Number.MAX_SAFE_INTEGER):(this.Re(e.mapValue,t),this.Ee(t)):"arrayValue"in e?(this.Pe(e.arrayValue,t),this.Ee(t)):T()}Te(e,t){this.ye(t,25),this.be(e,t)}be(e,t){t.Ie(e)}Re(e,t){const r=e.fields||{};this.ye(t,55);for(const s of Object.keys(r))this.Te(s,t),this.me(r[s],t)}Pe(e,t){const r=e.values||[];this.ye(t,50);for(const s of r)this.me(s,t)}ve(e,t){this.ye(t,37),v.fromName(e).path.forEach(r=>{this.ye(t,60),this.be(r,t)})}ye(e,t){e.pe(t)}Ee(e){e.pe(2)}}kt.Ve=new kt;function My(n){if(n===0)return 8;let e=0;return!(n>>4)&&(e+=4,n<<=4),!(n>>6)&&(e+=2,n<<=2),!(n>>7)&&(e+=1),e}function lc(n){const e=64-function(t){let r=0;for(let s=0;s<8;++s){const i=My(255&t[s]);if(r+=i,i!==8)break}return r}(n);return Math.ceil(e/8)}class Fy{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Se(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.De(r.value),r=t.next();this.Ce()}xe(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ne(r.value),r=t.next();this.ke()}Me(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.De(r);else if(r<2048)this.De(960|r>>>6),this.De(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.De(480|r>>>12),this.De(128|63&r>>>6),this.De(128|63&r);else{const s=t.codePointAt(0);this.De(240|s>>>18),this.De(128|63&s>>>12),this.De(128|63&s>>>6),this.De(128|63&s)}}this.Ce()}$e(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ne(r);else if(r<2048)this.Ne(960|r>>>6),this.Ne(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ne(480|r>>>12),this.Ne(128|63&r>>>6),this.Ne(128|63&r);else{const s=t.codePointAt(0);this.Ne(240|s>>>18),this.Ne(128|63&s>>>12),this.Ne(128|63&s>>>6),this.Ne(128|63&s)}}this.ke()}Oe(e){const t=this.Fe(e),r=lc(t);this.Be(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Le(e){const t=this.Fe(e),r=lc(t);this.Be(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}qe(){this.Ue(255),this.Ue(255)}Ke(){this.Ge(255),this.Ge(255)}reset(){this.position=0}seed(e){this.Be(e.length),this.buffer.set(e,this.position),this.position+=e.length}Qe(){return this.buffer.slice(0,this.position)}Fe(e){const t=function(s){const i=new DataView(new ArrayBuffer(8));return i.setFloat64(0,s,!1),new Uint8Array(i.buffer)}(e),r=(128&t[0])!=0;t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}De(e){const t=255&e;t===0?(this.Ue(0),this.Ue(255)):t===255?(this.Ue(255),this.Ue(0)):this.Ue(t)}Ne(e){const t=255&e;t===0?(this.Ge(0),this.Ge(255)):t===255?(this.Ge(255),this.Ge(0)):this.Ge(e)}Ce(){this.Ue(0),this.Ue(1)}ke(){this.Ge(0),this.Ge(1)}Ue(e){this.Be(1),this.buffer[this.position++]=e}Ge(e){this.Be(1),this.buffer[this.position++]=~e}Be(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class Ly{constructor(e){this.je=e}Ae(e){this.je.Se(e)}Ie(e){this.je.Me(e)}pe(e){this.je.Oe(e)}ge(){this.je.qe()}}class Py{constructor(e){this.je=e}Ae(e){this.je.xe(e)}Ie(e){this.je.$e(e)}pe(e){this.je.Le(e)}ge(){this.je.Ke()}}class jn{constructor(){this.je=new Fy,this.ze=new Ly(this.je),this.We=new Py(this.je)}seed(e){this.je.seed(e)}He(e){return e===0?this.ze:this.We}Qe(){return this.je.Qe()}reset(){this.je.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,t,r,s){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=s}Je(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new Rt(this.indexId,this.documentKey,this.arrayValue,r)}}function et(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=hc(n.arrayValue,e.arrayValue),t!==0?t:(t=hc(n.directionalValue,e.directionalValue),t!==0?t:v.comparator(n.documentKey,e.documentKey)))}function hc(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vy{constructor(e){this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.Ye=e.orderBy,this.Xe=[];for(const t of e.filters){const r=t;r.isInequality()?this.Ze=r:this.Xe.push(r)}}tn(e){_(e.collectionGroup===this.collectionId);const t=oo(e);if(t!==void 0&&!this.en(t))return!1;const r=xt(e);let s=0,i=0;for(;s<r.length&&this.en(r[s]);++s);if(s===r.length)return!0;if(this.Ze!==void 0){const o=r[s];if(!this.nn(this.Ze,o)||!this.sn(this.Ye[i++],o))return!1;++s}for(;s<r.length;++s){const o=r[s];if(i>=this.Ye.length||!this.sn(this.Ye[i++],o))return!1}return!0}en(e){for(const t of this.Xe)if(this.nn(t,e))return!0;return!1}nn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}sn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ld(n){var e,t;if(_(n instanceof N||n instanceof L),n instanceof N){if(n instanceof Ah){const s=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(i=>N.create(n.field,"==",i)))||[];return L.create(s,"or")}return n}const r=n.filters.map(s=>ld(s));return L.create(r,n.op)}function By(n){if(n.getFilters().length===0)return[];const e=Eo(ld(n));return _(hd(e)),vo(e)||Io(e)?[e]:e.getFilters()}function vo(n){return n instanceof N}function Io(n){return n instanceof L&&ua(n)}function hd(n){return vo(n)||Io(n)||function(e){if(e instanceof L&&lo(e)){for(const t of e.getFilters())if(!vo(t)&&!Io(t))return!1;return!0}return!1}(n)}function Eo(n){if(_(n instanceof N||n instanceof L),n instanceof N)return n;if(n.filters.length===1)return Eo(n.filters[0]);const e=n.filters.map(r=>Eo(r));let t=L.create(e,n.op);return t=Ns(t),hd(t)?t:(_(t instanceof L),_(In(t)),_(t.filters.length>1),t.filters.reduce((r,s)=>Ia(r,s)))}function Ia(n,e){let t;return _(n instanceof N||n instanceof L),_(e instanceof N||e instanceof L),t=n instanceof N?e instanceof N?function(r,s){return L.create([r,s],"and")}(n,e):dc(n,e):e instanceof N?dc(e,n):function(r,s){if(_(r.filters.length>0&&s.filters.length>0),In(r)&&In(s))return Dh(r,s.getFilters());const i=lo(r)?r:s,o=lo(r)?s:r,a=i.filters.map(u=>Ia(u,o));return L.create(a,"or")}(n,e),Ns(t)}function dc(n,e){if(In(e))return Dh(e,n.getFilters());{const t=e.filters.map(r=>Ia(n,r));return L.create(t,"or")}}function Ns(n){if(_(n instanceof N||n instanceof L),n instanceof N)return n;const e=n.getFilters();if(e.length===1)return Ns(e[0]);if(Sh(n))return n;const t=e.map(s=>Ns(s)),r=[];return t.forEach(s=>{s instanceof N?r.push(s):s instanceof L&&(s.op===n.op?r.push(...s.filters):r.push(s))}),r.length===1?r[0]:L.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(){this.rn=new Ea}addToCollectionParentIndex(e,t){return this.rn.add(t),f.resolve()}getCollectionParents(e,t){return f.resolve(this.rn.getEntries(t))}addFieldIndex(e,t){return f.resolve()}deleteFieldIndex(e,t){return f.resolve()}getDocumentsMatchingTarget(e,t){return f.resolve(null)}getIndexType(e,t){return f.resolve(0)}getFieldIndexes(e,t){return f.resolve([])}getNextCollectionGroupToUpdate(e){return f.resolve(null)}getMinOffset(e,t){return f.resolve(ke.min())}getMinOffsetFromCollectionGroup(e,t){return f.resolve(ke.min())}updateCollectionGroup(e,t,r){return f.resolve()}updateIndexEntries(e,t){return f.resolve()}}class Ea{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new U(R.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new U(R.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es=new Uint8Array(0);class Uy{constructor(e,t){this.user=e,this.databaseId=t,this.on=new Ea,this.un=new Tt(r=>zt(r),(r,s)=>Fr(r,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.on.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.on.add(t)});const i={collectionId:r,parent:Te(s)};return fc(e).put(i)}return f.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[uh(t),""],!1,!0);return fc(e).j(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;r.push(Be(o.parent))}return r})}addFieldIndex(e,t){const r=ts(e),s=function(o){return{indexId:o.indexId,collectionGroup:o.collectionGroup,fields:o.fields.map(a=>[a.fieldPath.canonicalString(),a.kind])}}(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=Gn(e);return i.next(a=>{o.put(ac(a,this.user,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const r=ts(e),s=Gn(e),i=zn(e);return r.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}getDocumentsMatchingTarget(e,t){const r=zn(e);let s=!0;const i=new Map;return f.forEach(this.cn(t),o=>this.an(e,o).next(a=>{s&&(s=!!a),i.set(o,a)})).next(()=>{if(s){let o=A();const a=[];return f.forEach(i,(u,c)=>{var l;y("IndexedDbIndexManager",`Using index ${l=u,`id=${l.indexId}|cg=${l.collectionGroup}|f=${l.fields.map(O=>`${O.fieldPath}:${O.kind}`).join(",")}`} to execute ${zt(t)}`);const h=function(O,ee){const re=oo(ee);if(re===void 0)return null;for(const Q of Cs(O,re.fieldPath))switch(Q.op){case"array-contains-any":return Q.value.arrayValue.values||[];case"array-contains":return[Q.value]}return null}(c,u),d=function(O,ee){const re=new Map;for(const Q of xt(ee))for(const Se of Cs(O,Q.fieldPath))switch(Se.op){case"==":case"in":re.set(Q.fieldPath.canonicalString(),Se.value);break;case"not-in":case"!=":return re.set(Q.fieldPath.canonicalString(),Se.value),Array.from(re.values())}return null}(c,u),g=function(O,ee){const re=[];let Q=!0;for(const Se of xt(ee)){const _t=Se.kind===0?Ku(O,Se.fieldPath,O.startAt):Qu(O,Se.fieldPath,O.startAt);re.push(_t.value),Q&&(Q=_t.inclusive)}return new gt(re,Q)}(c,u),w=function(O,ee){const re=[];let Q=!0;for(const Se of xt(ee)){const _t=Se.kind===0?Qu(O,Se.fieldPath,O.endAt):Ku(O,Se.fieldPath,O.endAt);re.push(_t.value),Q&&(Q=_t.inclusive)}return new gt(re,Q)}(c,u),b=this.hn(u,c,g),D=this.hn(u,c,w),V=this.ln(u,c,d),K=this.fn(u.indexId,h,b,g.inclusive,D,w.inclusive,V);return f.forEach(K,O=>r.H(O,t.limit).next(ee=>{ee.forEach(re=>{const Q=v.fromSegments(re.documentKey);o.has(Q)||(o=o.add(Q),a.push(Q))})}))}).next(()=>a)}return f.resolve(null)})}cn(e){let t=this.un.get(e);return t||(e.filters.length===0?t=[e]:t=By(L.create(e.filters,"and")).map(r=>fo(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.un.set(e,t),t)}fn(e,t,r,s,i,o,a){const u=(t!=null?t.length:1)*Math.max(r.length,i.length),c=u/(t!=null?t.length:1),l=[];for(let h=0;h<u;++h){const d=t?this.dn(t[h/c]):es,g=this.wn(e,d,r[h%c],s),w=this._n(e,d,i[h%c],o),b=a.map(D=>this.wn(e,d,D,!0));l.push(...this.createRange(g,w,b))}return l}wn(e,t,r,s){const i=new Rt(e,v.empty(),t,r);return s?i:i.Je()}_n(e,t,r,s){const i=new Rt(e,v.empty(),t,r);return s?i.Je():i}an(e,t){const r=new Vy(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const a of i)r.tn(a)&&(!o||a.fields.length>o.fields.length)&&(o=a);return o})}getIndexType(e,t){let r=2;const s=this.cn(t);return f.forEach(s,i=>this.an(e,i).next(o=>{o?r!==0&&o.fields.length<function(a){let u=new U(J.comparator),c=!1;for(const l of a.filters)for(const h of l.getFlattenedFilters())h.field.isKeyField()||(h.op==="array-contains"||h.op==="array-contains-any"?c=!0:u=u.add(h.field));for(const l of a.orderBy)l.field.isKeyField()||(u=u.add(l.field));return u.size+(c?1:0)}(i)&&(r=1):r=0})).next(()=>function(i){return i.limit!==null}(t)&&s.length>1&&r===2?1:r)}mn(e,t){const r=new jn;for(const s of xt(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.He(s.kind);kt.Ve._e(i,o)}return r.Qe()}dn(e){const t=new jn;return kt.Ve._e(e,t.He(0)),t.Qe()}gn(e,t){const r=new jn;return kt.Ve._e(jt(this.databaseId,t),r.He(function(s){const i=xt(s);return i.length===0?0:i[i.length-1].kind}(e))),r.Qe()}ln(e,t,r){if(r===null)return[];let s=[];s.push(new jn);let i=0;for(const o of xt(e)){const a=r[i++];for(const u of s)if(this.yn(t,o.fieldPath)&&wr(a))s=this.pn(s,o,a);else{const c=u.He(o.kind);kt.Ve._e(a,c)}}return this.In(s)}hn(e,t,r){return this.ln(e,t,r.position)}In(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].Qe();return t}pn(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const a of s){const u=new jn;u.seed(a.Qe()),kt.Ve._e(o,u.He(t.kind)),i.push(u)}return i}yn(e,t){return!!e.filters.find(r=>r instanceof N&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=ts(e),s=Gn(e);return(t?r.j("collectionGroupIndex",IDBKeyRange.bound(t,t)):r.j()).next(i=>{const o=[];return f.forEach(i,a=>s.get([a.indexId,this.uid]).next(u=>{o.push(function(c,l){const h=l?new _s(l.sequenceNumber,new ke(Ht(l.readTime),new v(Be(l.documentKey)),l.largestBatchId)):_s.empty(),d=c.fields.map(([g,w])=>new Tp(J.fromServerFormat(g),w));return new ch(c.indexId,c.collectionGroup,d,h)}(a,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:x(r.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const s=ts(e),i=Gn(e);return this.Tn(e).next(o=>s.j("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(a=>f.forEach(a,u=>i.put(ac(u.indexId,this.user,o,r)))))}updateIndexEntries(e,t){const r=new Map;return f.forEach(t,(s,i)=>{const o=r.get(s.collectionGroup);return(o?f.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(a=>(r.set(s.collectionGroup,a),f.forEach(a,u=>this.En(e,s,u).next(c=>{const l=this.An(i,u);return c.isEqual(l)?f.resolve():this.vn(e,i,u,c,l)}))))})}Rn(e,t,r,s){return zn(e).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.gn(r,t.key),documentKey:t.key.path.toArray()})}Pn(e,t,r,s){return zn(e).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.gn(r,t.key),t.key.path.toArray()])}En(e,t,r){const s=zn(e);let i=new U(et);return s.X({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.gn(r,t)])},(o,a)=>{i=i.add(new Rt(r.indexId,t,a.arrayValue,a.directionalValue))}).next(()=>i)}An(e,t){let r=new U(et);const s=this.mn(t,e);if(s==null)return r;const i=oo(t);if(i!=null){const o=e.data.field(i.fieldPath);if(wr(o))for(const a of o.arrayValue.values||[])r=r.add(new Rt(t.indexId,e.key,this.dn(a),s))}else r=r.add(new Rt(t.indexId,e.key,es,s));return r}vn(e,t,r,s,i){y("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return function(a,u,c,l,h){const d=a.getIterator(),g=u.getIterator();let w=on(d),b=on(g);for(;w||b;){let D=!1,V=!1;if(w&&b){const K=c(w,b);K<0?V=!0:K>0&&(D=!0)}else w!=null?V=!0:D=!0;D?(l(b),b=on(g)):V?(h(w),w=on(d)):(w=on(d),b=on(g))}}(s,i,et,a=>{o.push(this.Rn(e,t,r,a))},a=>{o.push(this.Pn(e,t,r,a))}),f.waitFor(o)}Tn(e){let t=1;return Gn(e).X({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,a)=>et(o,a)).filter((o,a,u)=>!a||et(o,u[a-1])!==0);const s=[];s.push(e);for(const o of r){const a=et(o,e),u=et(o,t);if(a===0)s[0]=e.Je();else if(a>0&&u<0)s.push(o),s.push(o.Je());else if(u>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.bn(s[o],s[o+1]))return[];const a=[s[o].indexId,this.uid,s[o].arrayValue,s[o].directionalValue,es,[]],u=[s[o+1].indexId,this.uid,s[o+1].arrayValue,s[o+1].directionalValue,es,[]];i.push(IDBKeyRange.bound(a,u))}return i}bn(e,t){return et(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(mc)}getMinOffset(e,t){return f.mapArray(this.cn(t),r=>this.an(e,r).next(s=>s||T())).next(mc)}}function fc(n){return le(n,"collectionParents")}function zn(n){return le(n,"indexEntries")}function ts(n){return le(n,"indexConfiguration")}function Gn(n){return le(n,"indexState")}function mc(n){_(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;ia(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new ke(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class _e{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new _e(e,_e.DEFAULT_COLLECTION_PERCENTILE,_e.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dd(n,e,t){const r=n.store("mutations"),s=n.store("documentMutations"),i=[],o=IDBKeyRange.only(t.batchId);let a=0;const u=r.X({range:o},(l,h,d)=>(a++,d.delete()));i.push(u.next(()=>{_(a===1)}));const c=[];for(const l of t.mutations){const h=gh(e,l.key.path,t.batchId);i.push(s.delete(h)),c.push(l.key)}return f.waitFor(i).next(()=>c)}function ks(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw T();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */_e.DEFAULT_COLLECTION_PERCENTILE=10,_e.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,_e.DEFAULT=new _e(41943040,_e.DEFAULT_COLLECTION_PERCENTILE,_e.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),_e.DISABLED=new _e(-1,0,0);class ui{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Vn={}}static de(e,t,r,s){_(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new ui(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return tt(e).X({index:"userMutationsIndex",range:r},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,s){const i=ln(e),o=tt(e);return o.add({}).next(a=>{_(typeof a=="number");const u=new fa(a,t,r,s),c=function(d,g,w){const b=w.baseMutations.map(V=>Er(d.fe,V)),D=w.mutations.map(V=>Er(d.fe,V));return{userId:g,batchId:w.batchId,localWriteTimeMs:w.localWriteTime.toMillis(),baseMutations:b,mutations:D}}(this.serializer,this.userId,u),l=[];let h=new U((d,g)=>x(d.canonicalString(),g.canonicalString()));for(const d of s){const g=gh(this.userId,d.key.path,a);h=h.add(d.key.path.popLast()),l.push(o.put(c)),l.push(i.put(g,Ap))}return h.forEach(d=>{l.push(this.indexManager.addToCollectionParentIndex(e,d))}),e.addOnCommittedListener(()=>{this.Vn[a]=u.keys()}),f.waitFor(l).next(()=>u)})}lookupMutationBatch(e,t){return tt(e).get(t).next(r=>r?(_(r.userId===this.userId),Nt(this.serializer,r)):null)}Sn(e,t){return this.Vn[t]?f.resolve(this.Vn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const s=r.keys();return this.Vn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return tt(e).X({index:"userMutationsIndex",range:s},(o,a,u)=>{a.userId===this.userId&&(_(a.batchId>=r),i=Nt(this.serializer,a)),u.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return tt(e).X({index:"userMutationsIndex",range:t,reverse:!0},(s,i,o)=>{r=i.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return tt(e).j("userMutationsIndex",t).next(r=>r.map(s=>Nt(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=is(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return ln(e).X({range:s},(o,a,u)=>{const[c,l,h]=o,d=Be(l);if(c===this.userId&&t.path.isEqual(d))return tt(e).get(h).next(g=>{if(!g)throw T();_(g.userId===this.userId),i.push(Nt(this.serializer,g))});u.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new U(x);const s=[];return t.forEach(i=>{const o=is(this.userId,i.path),a=IDBKeyRange.lowerBound(o),u=ln(e).X({range:a},(c,l,h)=>{const[d,g,w]=c,b=Be(g);d===this.userId&&i.path.isEqual(b)?r=r.add(w):h.done()});s.push(u)}),f.waitFor(s).next(()=>this.Dn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=is(this.userId,r),o=IDBKeyRange.lowerBound(i);let a=new U(x);return ln(e).X({range:o},(u,c,l)=>{const[h,d,g]=u,w=Be(d);h===this.userId&&r.isPrefixOf(w)?w.length===s&&(a=a.add(g)):l.done()}).next(()=>this.Dn(e,a))}Dn(e,t){const r=[],s=[];return t.forEach(i=>{s.push(tt(e).get(i).next(o=>{if(o===null)throw T();_(o.userId===this.userId),r.push(Nt(this.serializer,o))}))}),f.waitFor(s).next(()=>r)}removeMutationBatch(e,t){return dd(e.ht,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.Cn(t.batchId)}),f.forEach(r,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}Cn(e){delete this.Vn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return f.resolve();const r=IDBKeyRange.lowerBound([this.userId]),s=[];return ln(e).X({range:r},(i,o,a)=>{if(i[0]===this.userId){const u=Be(i[1]);s.push(u)}else a.done()}).next(()=>{_(s.length===0)})})}containsKey(e,t){return fd(e,this.userId,t)}xn(e){return md(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function fd(n,e,t){const r=is(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return ln(n).X({range:i,Y:!0},(a,u,c)=>{const[l,h,d]=a;l===e&&h===s&&(o=!0),c.done()}).next(()=>o)}function tt(n){return le(n,"mutations")}function ln(n){return le(n,"documentMutations")}function md(n){return le(n,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e){this.Nn=e}next(){return this.Nn+=2,this.Nn}static kn(){return new Wt(0)}static Mn(){return new Wt(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.$n(e).next(t=>{const r=new Wt(t.highestTargetId);return t.highestTargetId=r.next(),this.On(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.$n(e).next(t=>S.fromTimestamp(new G(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.$n(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.$n(e).next(s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.On(e,s)))}addTargetData(e,t){return this.Fn(e,t).next(()=>this.$n(e).next(r=>(r.targetCount+=1,this.Bn(t,r),this.On(e,r))))}updateTargetData(e,t){return this.Fn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>an(e).delete(t.targetId)).next(()=>this.$n(e)).next(r=>(_(r.targetCount>0),r.targetCount-=1,this.On(e,r)))}removeTargets(e,t,r){let s=0;const i=[];return an(e).X((o,a)=>{const u=Jn(a);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))}).next(()=>f.waitFor(i)).next(()=>s)}forEachTarget(e,t){return an(e).X((r,s)=>{const i=Jn(s);t(i)})}$n(e){return pc(e).get("targetGlobalKey").next(t=>(_(t!==null),t))}On(e,t){return pc(e).put("targetGlobalKey",t)}Fn(e,t){return an(e).put(cd(this.serializer,t))}Bn(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.$n(e).next(t=>t.targetCount)}getTargetData(e,t){const r=zt(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return an(e).X({range:s,index:"queryTargetsIndex"},(o,a,u)=>{const c=Jn(a);Fr(t,c.target)&&(i=c,u.done())}).next(()=>i)}addMatchingKeys(e,t,r){const s=[],i=rt(e);return t.forEach(o=>{const a=Te(o.path);s.push(i.put({targetId:r,path:a})),s.push(this.referenceDelegate.addReference(e,r,o))}),f.waitFor(s)}removeMatchingKeys(e,t,r){const s=rt(e);return f.forEach(t,i=>{const o=Te(i.path);return f.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])})}removeMatchingKeysForTargetId(e,t){const r=rt(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=rt(e);let i=A();return s.X({range:r,Y:!0},(o,a,u)=>{const c=Be(o[1]),l=new v(c);i=i.add(l)}).next(()=>i)}containsKey(e,t){const r=Te(t.path),s=IDBKeyRange.bound([r],[uh(r)],!1,!0);let i=0;return rt(e).X({index:"documentTargetsIndex",Y:!0,range:s},([o,a],u,c)=>{o!==0&&(i++,c.done())}).next(()=>i>0)}le(e,t){return an(e).get(t).next(r=>r?Jn(r):null)}}function an(n){return le(n,"targets")}function pc(n){return le(n,"targetGlobal")}function rt(n){return le(n,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yc([n,e],[t,r]){const s=x(n,t);return s===0?x(e,r):s}class jy{constructor(e){this.Ln=e,this.buffer=new U(yc),this.qn=0}Un(){return++this.qn}Kn(e){const t=[e,this.Un()];if(this.buffer.size<this.Ln)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();yc(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class zy{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Gn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Qn(6e4)}stop(){this.Gn&&(this.Gn.cancel(),this.Gn=null)}get started(){return this.Gn!==null}Qn(e){y("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.Gn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Gn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){bt(t)?y("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Et(t)}await this.Qn(3e5)})}}class Gy{constructor(e,t){this.jn=e,this.params=t}calculateTargetCount(e,t){return this.jn.zn(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return f.resolve(De.ct);const r=new jy(t);return this.jn.forEachTarget(e,s=>r.Kn(s.sequenceNumber)).next(()=>this.jn.Wn(e,s=>r.Kn(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.jn.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(y("LruGarbageCollector","Garbage collection skipped; disabled"),f.resolve(gc)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(y("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),gc):this.Hn(e,t))}getCacheSize(e){return this.jn.getCacheSize(e)}Hn(e,t){let r,s,i,o,a,u,c;const l=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(h=>(h>this.params.maximumSequenceNumbersToCollect?(y("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${h}`),s=this.params.maximumSequenceNumbersToCollect):s=h,o=Date.now(),this.nthSequenceNumber(e,s))).next(h=>(r=h,a=Date.now(),this.removeTargets(e,r,t))).next(h=>(i=h,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(h=>(c=Date.now(),io()<=F.DEBUG&&y("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-l}ms
	Determined least recently used ${s} in `+(a-o)+`ms
	Removed ${i} targets in `+(u-a)+`ms
	Removed ${h} documents in `+(c-u)+`ms
Total Duration: ${c-l}ms`),f.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:h})))}}function Ky(n,e){return new Gy(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(e,t){this.db=e,this.garbageCollector=Ky(this,t)}zn(e){const t=this.Jn(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}Jn(e){let t=0;return this.Wn(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Wn(e,t){return this.Yn(e,(r,s)=>t(s))}addReference(e,t,r){return ns(e,r)}removeReference(e,t,r){return ns(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return ns(e,t)}Xn(e,t){return function(r,s){let i=!1;return md(r).Z(o=>fd(r,o,s).next(a=>(a&&(i=!0),f.resolve(!a)))).next(()=>i)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.Yn(e,(o,a)=>{if(a<=t){const u=this.Xn(e,o).next(c=>{if(!c)return i++,r.getEntry(e,o).next(()=>(r.removeEntry(o,S.min()),rt(e).delete([0,Te(o.path)])))});s.push(u)}}).next(()=>f.waitFor(s)).next(()=>r.apply(e)).next(()=>i)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return ns(e,t)}Yn(e,t){const r=rt(e);let s,i=De.ct;return r.X({index:"documentTargetsIndex"},([o,a],{path:u,sequenceNumber:c})=>{o===0?(i!==De.ct&&t(new v(Be(s)),i),i=c,s=u):i=De.ct}).next(()=>{i!==De.ct&&t(new v(Be(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function ns(n,e){return rt(n).put(function(t,r){return{targetId:0,path:Te(t.path),sequenceNumber:r}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gd{constructor(){this.changes=new Tt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,$.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?f.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hy{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Dt(e).put(r)}removeEntry(e,t,r){return Dt(e).delete(function(s,i){const o=s.path.toArray();return[o.slice(0,o.length-2),o[o.length-2],As(i),o[o.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.Zn(e,r)))}getEntry(e,t){let r=$.newInvalidDocument(t);return Dt(e).X({index:"documentKeyIndex",range:IDBKeyRange.only(Kn(t))},(s,i)=>{r=this.ts(t,i)}).next(()=>r)}es(e,t){let r={size:0,document:$.newInvalidDocument(t)};return Dt(e).X({index:"documentKeyIndex",range:IDBKeyRange.only(Kn(t))},(s,i)=>{r={document:this.ts(t,i),size:ks(i)}}).next(()=>r)}getEntries(e,t){let r=xe();return this.ns(e,t,(s,i)=>{const o=this.ts(s,i);r=r.insert(s,o)}).next(()=>r)}ss(e,t){let r=xe(),s=new B(v.comparator);return this.ns(e,t,(i,o)=>{const a=this.ts(i,o);r=r.insert(i,a),s=s.insert(i,ks(o))}).next(()=>({documents:r,rs:s}))}ns(e,t,r){if(t.isEmpty())return f.resolve();let s=new U(Ic);t.forEach(u=>s=s.add(u));const i=IDBKeyRange.bound(Kn(s.first()),Kn(s.last())),o=s.getIterator();let a=o.getNext();return Dt(e).X({index:"documentKeyIndex",range:i},(u,c,l)=>{const h=v.fromSegments([...c.prefixPath,c.collectionGroup,c.documentId]);for(;a&&Ic(a,h)<0;)r(a,null),a=o.getNext();a&&a.isEqual(h)&&(r(a,c),a=o.hasNext()?o.getNext():null),a?l.G(Kn(a)):l.done()}).next(()=>{for(;a;)r(a,null),a=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,s){const i=t.path,o=[i.popLast().toArray(),i.lastSegment(),As(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],a=[i.popLast().toArray(),i.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Dt(e).j(IDBKeyRange.bound(o,a,!0)).next(u=>{let c=xe();for(const l of u){const h=this.ts(v.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);h.isFoundDocument()&&(Pr(t,h)||s.has(h.key))&&(c=c.insert(h.key,h))}return c})}getAllFromCollectionGroup(e,t,r,s){let i=xe();const o=vc(t,r),a=vc(t,ke.max());return Dt(e).X({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,a,!0)},(u,c,l)=>{const h=this.ts(v.fromSegments(c.prefixPath.concat(c.collectionGroup,c.documentId)),c);i=i.insert(h.key,h),i.size===s&&l.done()}).next(()=>i)}newChangeBuffer(e){return new Wy(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return wc(e).get("remoteDocumentGlobalKey").next(t=>(_(!!t),t))}Zn(e,t){return wc(e).put("remoteDocumentGlobalKey",t)}ts(e,t){if(t){const r=Ry(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(S.min())))return r}return $.newInvalidDocument(e)}}function pd(n){return new Hy(n)}class Wy extends gd{constructor(e,t){super(),this.os=e,this.trackRemovals=t,this.us=new Tt(r=>r.toString(),(r,s)=>r.isEqual(s))}applyChanges(e){const t=[];let r=0,s=new U((i,o)=>x(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const a=this.us.get(i);if(t.push(this.os.removeEntry(e,i,a.readTime)),o.isValidDocument()){const u=ic(this.os.serializer,o);s=s.add(i.path.popLast());const c=ks(u);r+=c-a.size,t.push(this.os.addEntry(e,i,u))}else if(r-=a.size,this.trackRemovals){const u=ic(this.os.serializer,o.convertToNoDocument(S.min()));t.push(this.os.addEntry(e,i,u))}}),s.forEach(i=>{t.push(this.os.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.os.updateMetadata(e,r)),f.waitFor(t)}getFromCache(e,t){return this.os.es(e,t).next(r=>(this.us.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.os.ss(e,t).next(({documents:r,rs:s})=>(s.forEach((i,o)=>{this.us.set(i,{size:o,readTime:r.get(i).readTime})}),r))}}function wc(n){return le(n,"remoteDocumentGlobal")}function Dt(n){return le(n,"remoteDocumentsV14")}function Kn(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function vc(n,e){const t=e.documentKey.path.toArray();return[n,As(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Ic(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=x(t[i],r[i]),s)return s;return s=x(t.length,r.length),s||(s=x(t[t.length-2],r[r.length-2]),s||x(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&rr(r.mutation,s,Ce.empty(),G.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,A()).next(()=>r))}getLocalViewOfDocuments(e,t,r=A()){const s=$e();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let o=Yn();return i.forEach((a,u)=>{o=o.insert(a,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=$e();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,A()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,a)=>{t.set(o,a)})})}computeViews(e,t,r,s){let i=xe();const o=nr(),a=nr();return t.forEach((u,c)=>{const l=r.get(c.key);s.has(c.key)&&(l===void 0||l.mutation instanceof Je)?i=i.insert(c.key,c):l!==void 0?(o.set(c.key,l.mutation.getFieldMask()),rr(l.mutation,c,l.mutation.getFieldMask(),G.now())):o.set(c.key,Ce.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((c,l)=>o.set(c,l)),t.forEach((c,l)=>{var h;return a.set(c,new Yy(l,(h=o.get(c))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,t){const r=nr();let s=new B((o,a)=>o-a),i=A();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const a of o)a.keys().forEach(u=>{const c=t.get(u);if(c===null)return;let l=r.get(u)||Ce.empty();l=a.applyToLocalView(c,l),r.set(u,l);const h=(s.get(a.batchId)||A()).add(u);s=s.insert(a.batchId,h)})}).next(()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const u=a.getNext(),c=u.key,l=u.value,h=Lh();l.forEach(d=>{if(!i.has(d)){const g=zh(t.get(d),r.get(d));g!==null&&h.set(d,g),i=i.add(d)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,h))}return f.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r){return function(s){return v.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):la(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r):this.getDocumentsMatchingCollectionQuery(e,t,r)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):f.resolve($e());let a=-1,u=i;return o.next(c=>f.forEach(c,(l,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),i.get(l)?f.resolve():this.remoteDocumentCache.getEntry(e,l).next(d=>{u=u.insert(l,d)}))).next(()=>this.populateOverlays(e,c,i)).next(()=>this.computeViews(e,u,c,A())).next(l=>({batchId:a,changes:Fh(l)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new v(t)).next(r=>{let s=Yn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r){const s=t.collectionGroup;let i=Yn();return this.indexManager.getCollectionParents(e,s).next(o=>f.forEach(o,a=>{const u=function(c,l){return new Xe(l,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt)}(t,a.child(s));return this.getDocumentsMatchingCollectionQuery(e,u,r).next(c=>{c.forEach((l,h)=>{i=i.insert(l,h)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s))).next(i=>{s.forEach((a,u)=>{const c=u.getKey();i.get(c)===null&&(i=i.insert(c,$.newInvalidDocument(c)))});let o=Yn();return i.forEach((a,u)=>{const c=s.get(a);c!==void 0&&rr(c.mutation,u,Ce.empty(),G.now()),Pr(t,u)&&(o=o.insert(a,u))}),o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy{constructor(e){this.serializer=e,this.cs=new Map,this.hs=new Map}getBundleMetadata(e,t){return f.resolve(this.cs.get(t))}saveBundleMetadata(e,t){var r;return this.cs.set(t.id,{id:(r=t).id,version:r.version,createTime:Z(r.createTime)}),f.resolve()}getNamedQuery(e,t){return f.resolve(this.hs.get(t))}saveNamedQuery(e,t){return this.hs.set(t.name,function(r){return{name:r.name,query:va(r.bundledQuery),readTime:Z(r.readTime)}}(t)),f.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jy{constructor(){this.overlays=new B(v.comparator),this.ls=new Map}getOverlay(e,t){return f.resolve(this.overlays.get(t))}getOverlays(e,t){const r=$e();return f.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.we(e,t,i)}),f.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.ls.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.ls.delete(r)),f.resolve()}getOverlaysForCollection(e,t,r){const s=$e(),i=t.length+1,o=new v(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const u=a.getNext().value,c=u.getKey();if(!t.isPrefixOf(c.path))break;c.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return f.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new B((c,l)=>c-l);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===t&&c.largestBatchId>r){let l=i.get(c.largestBatchId);l===null&&(l=$e(),i=i.insert(c.largestBatchId,l)),l.set(c.getKey(),c)}}const a=$e(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,l)=>a.set(c,l)),!(a.size()>=s)););return f.resolve(a)}we(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.ls.get(s.largestBatchId).delete(r.key);this.ls.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new ga(t,r));let i=this.ls.get(t);i===void 0&&(i=A(),this.ls.set(t,i)),this.ls.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(){this.fs=new U(ie.ds),this.ws=new U(ie._s)}isEmpty(){return this.fs.isEmpty()}addReference(e,t){const r=new ie(e,t);this.fs=this.fs.add(r),this.ws=this.ws.add(r)}gs(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.ys(new ie(e,t))}ps(e,t){e.forEach(r=>this.removeReference(r,t))}Is(e){const t=new v(new R([])),r=new ie(t,e),s=new ie(t,e+1),i=[];return this.ws.forEachInRange([r,s],o=>{this.ys(o),i.push(o.key)}),i}Ts(){this.fs.forEach(e=>this.ys(e))}ys(e){this.fs=this.fs.delete(e),this.ws=this.ws.delete(e)}Es(e){const t=new v(new R([])),r=new ie(t,e),s=new ie(t,e+1);let i=A();return this.ws.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new ie(e,0),r=this.fs.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ie{constructor(e,t){this.key=e,this.As=t}static ds(e,t){return v.comparator(e.key,t.key)||x(e.As,t.As)}static _s(e,t){return x(e.As,t.As)||v.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zy{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.vs=1,this.Rs=new U(ie.ds)}checkEmpty(e){return f.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.vs;this.vs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new fa(i,t,r,s);this.mutationQueue.push(o);for(const a of s)this.Rs=this.Rs.add(new ie(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return f.resolve(o)}lookupMutationBatch(e,t){return f.resolve(this.Ps(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.bs(r),i=s<0?0:s;return f.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return f.resolve(this.mutationQueue.length===0?-1:this.vs-1)}getAllMutationBatches(e){return f.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ie(t,0),s=new ie(t,Number.POSITIVE_INFINITY),i=[];return this.Rs.forEachInRange([r,s],o=>{const a=this.Ps(o.As);i.push(a)}),f.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new U(x);return t.forEach(s=>{const i=new ie(s,0),o=new ie(s,Number.POSITIVE_INFINITY);this.Rs.forEachInRange([i,o],a=>{r=r.add(a.As)})}),f.resolve(this.Vs(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;v.isDocumentKey(i)||(i=i.child(""));const o=new ie(new v(i),0);let a=new U(x);return this.Rs.forEachWhile(u=>{const c=u.key.path;return!!r.isPrefixOf(c)&&(c.length===s&&(a=a.add(u.As)),!0)},o),f.resolve(this.Vs(a))}Vs(e){const t=[];return e.forEach(r=>{const s=this.Ps(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){_(this.Ss(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.Rs;return f.forEach(t.mutations,s=>{const i=new ie(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Rs=r})}Cn(e){}containsKey(e,t){const r=new ie(t,0),s=this.Rs.firstAfterOrEqual(r);return f.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,f.resolve()}Ss(e,t){return this.bs(e)}bs(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Ps(e){const t=this.bs(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ew{constructor(e){this.Ds=e,this.docs=new B(v.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.Ds(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return f.resolve(r?r.document.mutableCopy():$.newInvalidDocument(t))}getEntries(e,t){let r=xe();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():$.newInvalidDocument(s))}),f.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=xe();const o=t.path,a=new v(o.child("")),u=this.docs.getIteratorFrom(a);for(;u.hasNext();){const{key:c,value:{document:l}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||ia(hh(l),r)<=0||(s.has(l.key)||Pr(t,l))&&(i=i.insert(l.key,l.mutableCopy()))}return f.resolve(i)}getAllFromCollectionGroup(e,t,r,s){T()}Cs(e,t){return f.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new tw(this)}getSize(e){return f.resolve(this.size)}}class tw extends gd{constructor(e){super(),this.os=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.os.addEntry(e,s)):this.os.removeEntry(r)}),f.waitFor(t)}getFromCache(e,t){return this.os.getEntry(e,t)}getAllFromCache(e,t){return this.os.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nw{constructor(e){this.persistence=e,this.xs=new Tt(t=>zt(t),Fr),this.lastRemoteSnapshotVersion=S.min(),this.highestTargetId=0,this.Ns=0,this.ks=new ba,this.targetCount=0,this.Ms=Wt.kn()}forEachTarget(e,t){return this.xs.forEach((r,s)=>t(s)),f.resolve()}getLastRemoteSnapshotVersion(e){return f.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return f.resolve(this.Ns)}allocateTargetId(e){return this.highestTargetId=this.Ms.next(),f.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Ns&&(this.Ns=t),f.resolve()}Fn(e){this.xs.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Ms=new Wt(t),this.highestTargetId=t),e.sequenceNumber>this.Ns&&(this.Ns=e.sequenceNumber)}addTargetData(e,t){return this.Fn(t),this.targetCount+=1,f.resolve()}updateTargetData(e,t){return this.Fn(t),f.resolve()}removeTargetData(e,t){return this.xs.delete(t.target),this.ks.Is(t.targetId),this.targetCount-=1,f.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.xs.forEach((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.xs.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)}),f.waitFor(i).next(()=>s)}getTargetCount(e){return f.resolve(this.targetCount)}getTargetData(e,t){const r=this.xs.get(t)||null;return f.resolve(r)}addMatchingKeys(e,t,r){return this.ks.gs(t,r),f.resolve()}removeMatchingKeys(e,t,r){this.ks.ps(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),f.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ks.Is(t),f.resolve()}getMatchingKeysForTargetId(e,t){const r=this.ks.Es(t);return f.resolve(r)}containsKey(e,t){return f.resolve(this.ks.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd{constructor(e,t){this.$s={},this.overlays={},this.Os=new De(0),this.Fs=!1,this.Fs=!0,this.referenceDelegate=e(this),this.Bs=new nw(this),this.indexManager=new $y,this.remoteDocumentCache=function(r){return new ew(r)}(r=>this.referenceDelegate.Ls(r)),this.serializer=new ud(t),this.qs=new Xy(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Fs=!1,Promise.resolve()}get started(){return this.Fs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Jy,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.$s[e.toKey()];return r||(r=new Zy(t,this.referenceDelegate),this.$s[e.toKey()]=r),r}getTargetCache(){return this.Bs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qs}runTransaction(e,t,r){y("MemoryPersistence","Starting transaction:",e);const s=new rw(this.Os.next());return this.referenceDelegate.Us(),r(s).next(i=>this.referenceDelegate.Ks(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Gs(e,t){return f.or(Object.values(this.$s).map(r=>()=>r.containsKey(e,t)))}}class rw extends fh{constructor(e){super(),this.currentSequenceNumber=e}}class ci{constructor(e){this.persistence=e,this.Qs=new ba,this.js=null}static zs(e){return new ci(e)}get Ws(){if(this.js)return this.js;throw T()}addReference(e,t,r){return this.Qs.addReference(r,t),this.Ws.delete(r.toString()),f.resolve()}removeReference(e,t,r){return this.Qs.removeReference(r,t),this.Ws.add(r.toString()),f.resolve()}markPotentiallyOrphaned(e,t){return this.Ws.add(t.toString()),f.resolve()}removeTarget(e,t){this.Qs.Is(t.targetId).forEach(s=>this.Ws.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.Ws.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Us(){this.js=new Set}Ks(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return f.forEach(this.Ws,r=>{const s=v.fromPath(r);return this.Hs(e,s).next(i=>{i||t.removeEntry(s,S.min())})}).next(()=>(this.js=null,t.apply(e)))}updateLimboDocument(e,t){return this.Hs(e,t).next(r=>{r?this.Ws.delete(t.toString()):this.Ws.add(t.toString())})}Ls(e){return 0}Hs(e,t){return f.or([()=>f.resolve(this.Qs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Gs(e,t)])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sw{constructor(e){this.serializer=e}O(e,t,r,s){const i=new ni("createOrUpgrade",t);r<1&&s>=1&&(function(a){a.createObjectStore("owner")}(e),function(a){a.createObjectStore("mutationQueues",{keyPath:"userId"}),a.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Lu,{unique:!0}),a.createObjectStore("documentMutations")}(e),Ec(e),function(a){a.createObjectStore("remoteDocuments")}(e));let o=f.resolve();return r<3&&s>=3&&(r!==0&&(function(a){a.deleteObjectStore("targetDocuments"),a.deleteObjectStore("targets"),a.deleteObjectStore("targetGlobal")}(e),Ec(e)),o=o.next(()=>function(a){const u=a.store("targetGlobal"),c={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:S.min().toTimestamp(),targetCount:0};return u.put("targetGlobalKey",c)}(i))),r<4&&s>=4&&(r!==0&&(o=o.next(()=>function(a,u){return u.store("mutations").j().next(c=>{a.deleteObjectStore("mutations"),a.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Lu,{unique:!0});const l=u.store("mutations"),h=c.map(d=>l.put(d));return f.waitFor(h)})}(e,i))),o=o.next(()=>{(function(a){a.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),r<5&&s>=5&&(o=o.next(()=>this.Ys(i))),r<6&&s>=6&&(o=o.next(()=>(function(a){a.createObjectStore("remoteDocumentGlobal")}(e),this.Xs(i)))),r<7&&s>=7&&(o=o.next(()=>this.Zs(i))),r<8&&s>=8&&(o=o.next(()=>this.ti(e,i))),r<9&&s>=9&&(o=o.next(()=>{(function(a){a.objectStoreNames.contains("remoteDocumentChanges")&&a.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&s>=10&&(o=o.next(()=>this.ei(i))),r<11&&s>=11&&(o=o.next(()=>{(function(a){a.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(a){a.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),r<12&&s>=12&&(o=o.next(()=>{(function(a){const u=a.createObjectStore("documentOverlays",{keyPath:Up});u.createIndex("collectionPathOverlayIndex",qp,{unique:!1}),u.createIndex("collectionGroupOverlayIndex",jp,{unique:!1})})(e)})),r<13&&s>=13&&(o=o.next(()=>function(a){const u=a.createObjectStore("remoteDocumentsV14",{keyPath:Np});u.createIndex("documentKeyIndex",kp),u.createIndex("collectionGroupIndex",Rp)}(e)).next(()=>this.ni(e,i)).next(()=>e.deleteObjectStore("remoteDocuments"))),r<14&&s>=14&&(o=o.next(()=>this.si(e,i))),r<15&&s>=15&&(o=o.next(()=>function(a){a.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),a.createObjectStore("indexState",{keyPath:Pp}).createIndex("sequenceNumberIndex",Vp,{unique:!1}),a.createObjectStore("indexEntries",{keyPath:Bp}).createIndex("documentKeyIndex",$p,{unique:!1})}(e))),o}Xs(e){let t=0;return e.store("remoteDocuments").X((r,s)=>{t+=ks(s)}).next(()=>{const r={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)})}Ys(e){const t=e.store("mutationQueues"),r=e.store("mutations");return t.j().next(s=>f.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,-1],[i.userId,i.lastAcknowledgedBatchId]);return r.j("userMutationsIndex",o).next(a=>f.forEach(a,u=>{_(u.userId===i.userId);const c=Nt(this.serializer,u);return dd(e,i.userId,c).next(()=>{})}))}))}Zs(e){const t=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(s=>{const i=[];return r.X((o,a)=>{const u=new R(o),c=function(l){return[0,Te(l)]}(u);i.push(t.get(c).next(l=>l?f.resolve():(h=>t.put({targetId:0,path:Te(h),sequenceNumber:s.highestListenSequenceNumber}))(u)))}).next(()=>f.waitFor(i))})}ti(e,t){e.createObjectStore("collectionParents",{keyPath:Lp});const r=t.store("collectionParents"),s=new Ea,i=o=>{if(s.add(o)){const a=o.lastSegment(),u=o.popLast();return r.put({collectionId:a,parent:Te(u)})}};return t.store("remoteDocuments").X({Y:!0},(o,a)=>{const u=new R(o);return i(u.popLast())}).next(()=>t.store("documentMutations").X({Y:!0},([o,a,u],c)=>{const l=Be(a);return i(l.popLast())}))}ei(e){const t=e.store("targets");return t.X((r,s)=>{const i=Jn(s),o=cd(this.serializer,i);return t.put(o)})}ni(e,t){const r=t.store("remoteDocuments"),s=[];return r.X((i,o)=>{const a=t.store("remoteDocumentsV14"),u=(c=o,c.document?new v(R.fromString(c.document.name).popFirst(5)):c.noDocument?v.fromSegments(c.noDocument.path):c.unknownDocument?v.fromSegments(c.unknownDocument.path):T()).path.toArray();var c;/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/const l={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(a.put(l))}).next(()=>f.waitFor(s))}si(e,t){const r=t.store("mutations"),s=pd(this.serializer),i=new wd(ci.zs,this.serializer.fe);return r.j().next(o=>{const a=new Map;return o.forEach(u=>{var c;let l=(c=a.get(u.userId))!==null&&c!==void 0?c:A();Nt(this.serializer,u).keys().forEach(h=>l=l.add(h)),a.set(u.userId,l)}),f.forEach(a,(u,c)=>{const l=new oe(c),h=ai.de(this.serializer,l),d=i.getIndexManager(l),g=ui.de(l,this.serializer,d,i.referenceDelegate);return new yd(s,g,h,d).recalculateAndSaveOverlaysForDocumentKeys(new ao(t,De.ct),u).next()})})}}function Ec(n){n.createObjectStore("targetDocuments",{keyPath:Mp}).createIndex("documentTargetsIndex",Fp,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",Op,{unique:!0}),n.createObjectStore("targetGlobal")}const Vi="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Ta{constructor(e,t,r,s,i,o,a,u,c,l,h=15){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.ii=i,this.window=o,this.document=a,this.ri=c,this.oi=l,this.ui=h,this.Os=null,this.Fs=!1,this.isPrimary=!1,this.networkEnabled=!0,this.ci=null,this.inForeground=!1,this.ai=null,this.hi=null,this.li=Number.NEGATIVE_INFINITY,this.fi=d=>Promise.resolve(),!Ta.D())throw new p(m.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Qy(this,s),this.di=t+"main",this.serializer=new ud(u),this.wi=new Me(this.di,this.ui,new sw(this.serializer)),this.Bs=new qy(this.referenceDelegate,this.serializer),this.remoteDocumentCache=pd(this.serializer),this.qs=new Oy,this.window&&this.window.localStorage?this._i=this.window.localStorage:(this._i=null,l===!1&&X("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new p(m.FAILED_PRECONDITION,Vi);return this.gi(),this.yi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Bs.getHighestSequenceNumber(e))}).then(e=>{this.Os=new De(e,this.ri)}).then(()=>{this.Fs=!0}).catch(e=>(this.wi&&this.wi.close(),Promise.reject(e)))}Ii(e){return this.fi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.wi.B(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ii.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>rs(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Ti(e).next(t=>{t||(this.isPrimary=!1,this.ii.enqueueRetryable(()=>this.fi(!1)))})}).next(()=>this.Ei(e)).next(t=>this.isPrimary&&!t?this.Ai(e).next(()=>!1):!!t&&this.vi(e).next(()=>!0))).catch(e=>{if(bt(e))return y("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return y("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ii.enqueueRetryable(()=>this.fi(e)),this.isPrimary=e})}Ti(e){return Qn(e).get("owner").next(t=>f.resolve(this.Ri(t)))}Pi(e){return rs(e).delete(this.clientId)}async bi(){if(this.isPrimary&&!this.Vi(this.li,18e5)){this.li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=le(t,"clientMetadata");return r.j().next(s=>{const i=this.Si(s,18e5),o=s.filter(a=>i.indexOf(a)===-1);return f.forEach(o,a=>r.delete(a.clientId)).next(()=>o)})}).catch(()=>[]);if(this._i)for(const t of e)this._i.removeItem(this.Di(t.clientId))}}pi(){this.hi=this.ii.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.bi()).then(()=>this.pi()))}Ri(e){return!!e&&e.ownerId===this.clientId}Ei(e){return this.oi?f.resolve(!0):Qn(e).get("owner").next(t=>{if(t!==null&&this.Vi(t.leaseTimestampMs,5e3)&&!this.Ci(t.ownerId)){if(this.Ri(t)&&this.networkEnabled)return!0;if(!this.Ri(t)){if(!t.allowTabSynchronization)throw new p(m.FAILED_PRECONDITION,Vi);return!1}}return!(!this.networkEnabled||!this.inForeground)||rs(e).j().next(r=>this.Si(r,5e3).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,a=this.networkEnabled===s.networkEnabled;if(i||o&&a)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&y("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Fs=!1,this.xi(),this.hi&&(this.hi.cancel(),this.hi=null),this.Ni(),this.ki(),await this.wi.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new ao(e,De.ct);return this.Ai(t).next(()=>this.Pi(t))}),this.wi.close(),this.Mi()}Si(e,t){return e.filter(r=>this.Vi(r.updateTimeMs,t)&&!this.Ci(r.clientId))}$i(){return this.runTransaction("getActiveClients","readonly",e=>rs(e).j().next(t=>this.Si(t,18e5).map(r=>r.clientId)))}get started(){return this.Fs}getMutationQueue(e,t){return ui.de(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Bs}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Uy(e,this.serializer.fe.databaseId)}getDocumentOverlayCache(e){return ai.de(this.serializer,e)}getBundleCache(){return this.qs}runTransaction(e,t,r){y("IndexedDbPersistence","Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(o=this.ui)===15?Gp:o===14?wh:o===13?yh:o===12?zp:o===11?ph:void T();var o;let a;return this.wi.runTransaction(e,s,i,u=>(a=new ao(u,this.Os?this.Os.next():De.ct),t==="readwrite-primary"?this.Ti(a).next(c=>!!c||this.Ei(a)).next(c=>{if(!c)throw X(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ii.enqueueRetryable(()=>this.fi(!1)),new p(m.FAILED_PRECONDITION,dh);return r(a)}).next(c=>this.vi(a).next(()=>c)):this.Oi(a).next(()=>r(a)))).then(u=>(a.raiseOnCommittedEvent(),u))}Oi(e){return Qn(e).get("owner").next(t=>{if(t!==null&&this.Vi(t.leaseTimestampMs,5e3)&&!this.Ci(t.ownerId)&&!this.Ri(t)&&!(this.oi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new p(m.FAILED_PRECONDITION,Vi)})}vi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Qn(e).put("owner",t)}static D(){return Me.D()}Ai(e){const t=Qn(e);return t.get("owner").next(r=>this.Ri(r)?(y("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):f.resolve())}Vi(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(X(`Detected an update time that is in the future: ${e} > ${r}`),!1))}gi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.ai=()=>{this.ii.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.ai),this.inForeground=this.document.visibilityState==="visible")}Ni(){this.ai&&(this.document.removeEventListener("visibilitychange",this.ai),this.ai=null)}yi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.ci=()=>{this.xi();const t=/(?:Version|Mobile)\/1[456]/;Ff()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ii.enterRestrictedMode(!0),this.ii.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.ci))}ki(){this.ci&&(this.window.removeEventListener("pagehide",this.ci),this.ci=null)}Ci(e){var t;try{const r=((t=this._i)===null||t===void 0?void 0:t.getItem(this.Di(e)))!==null;return y("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return X("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}xi(){if(this._i)try{this._i.setItem(this.Di(this.clientId),String(Date.now()))}catch(e){X("Failed to set zombie client id.",e)}}Mi(){if(this._i)try{this._i.removeItem(this.Di(this.clientId))}catch{}}Di(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Qn(n){return le(n,"owner")}function rs(n){return le(n,"clientMetadata")}function Sa(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Fi=r,this.Bi=s}static Li(e,t){let r=A(),s=A();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new _a(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{constructor(){this.qi=!1}initialize(e,t){this.Ui=e,this.indexManager=t,this.qi=!0}getDocumentsMatchingQuery(e,t,r,s){return this.Ki(e,t).next(i=>i||this.Gi(e,t,s,r)).next(i=>i||this.Qi(e,t))}Ki(e,t){if(Hu(t))return f.resolve(null);let r=Ae(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=xs(t,null,"F"),r=Ae(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=A(...i);return this.Ui.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(u=>{const c=this.ji(t,a);return this.zi(t,c,o,u.readTime)?this.Ki(e,xs(t,null,"F")):this.Wi(e,c,t,u)}))})))}Gi(e,t,r,s){return Hu(t)||s.isEqual(S.min())?this.Qi(e,t):this.Ui.getDocuments(e,r).next(i=>{const o=this.ji(t,i);return this.zi(t,o,r,s)?this.Qi(e,t):(io()<=F.DEBUG&&y("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),go(t)),this.Wi(e,o,t,lh(s,-1)))})}ji(e,t){let r=new U(Oh(e));return t.forEach((s,i)=>{Pr(e,i)&&(r=r.add(i))}),r}zi(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Qi(e,t){return io()<=F.DEBUG&&y("QueryEngine","Using full collection scan to execute query:",go(t)),this.Ui.getDocumentsMatchingQuery(e,t,ke.min())}Wi(e,t,r,s){return this.Ui.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iw{constructor(e,t,r,s){this.persistence=e,this.Hi=t,this.serializer=s,this.Ji=new B(x),this.Yi=new Tt(i=>zt(i),Fr),this.Xi=new Map,this.Zi=e.getRemoteDocumentCache(),this.Bs=e.getTargetCache(),this.qs=e.getBundleCache(),this.tr(r)}tr(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new yd(this.Zi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Zi.setIndexManager(this.indexManager),this.Hi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ji))}}function Id(n,e,t,r){return new iw(n,e,t,r)}async function Ed(n,e){const t=I(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.tr(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],a=[];let u=A();for(const c of s){o.push(c.batchId);for(const l of c.mutations)u=u.add(l.key)}for(const c of i){a.push(c.batchId);for(const l of c.mutations)u=u.add(l.key)}return t.localDocuments.getDocuments(r,u).next(c=>({er:c,removedBatchIds:o,addedBatchIds:a}))})})}function ow(n,e){const t=I(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Zi.newChangeBuffer({trackRemovals:!0});return function(o,a,u,c){const l=u.batch,h=l.keys();let d=f.resolve();return h.forEach(g=>{d=d.next(()=>c.getEntry(a,g)).next(w=>{const b=u.docVersions.get(g);_(b!==null),w.version.compareTo(b)<0&&(l.applyToRemoteDocument(w,u),w.isValidDocument()&&(w.setReadTime(u.commitVersion),c.addEntry(w)))})}),d.next(()=>o.mutationQueue.removeMutationBatch(a,l))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(o){let a=A();for(let u=0;u<o.mutationResults.length;++u)o.mutationResults[u].transformResults.length>0&&(a=a.add(o.batch.mutations[u].key));return a}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function bd(n){const e=I(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Bs.getLastRemoteSnapshotVersion(t))}function aw(n,e){const t=I(n),r=e.snapshotVersion;let s=t.Ji;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.Zi.newChangeBuffer({trackRemovals:!0});s=t.Ji;const a=[];e.targetChanges.forEach((l,h)=>{const d=s.get(h);if(!d)return;a.push(t.Bs.removeMatchingKeys(i,l.removedDocuments,h).next(()=>t.Bs.addMatchingKeys(i,l.addedDocuments,h)));let g=d.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(h)!==null?g=g.withResumeToken(se.EMPTY_BYTE_STRING,S.min()).withLastLimboFreeSnapshotVersion(S.min()):l.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(l.resumeToken,r)),s=s.insert(h,g),function(w,b,D){return w.resumeToken.approximateByteSize()===0||b.snapshotVersion.toMicroseconds()-w.snapshotVersion.toMicroseconds()>=3e8?!0:D.addedDocuments.size+D.modifiedDocuments.size+D.removedDocuments.size>0}(d,g,l)&&a.push(t.Bs.updateTargetData(i,g))});let u=xe(),c=A();if(e.documentUpdates.forEach(l=>{e.resolvedLimboDocuments.has(l)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(i,l))}),a.push(Td(i,o,e.documentUpdates).next(l=>{u=l.nr,c=l.sr})),!r.isEqual(S.min())){const l=t.Bs.getLastRemoteSnapshotVersion(i).next(h=>t.Bs.setTargetsMetadata(i,i.currentSequenceNumber,r));a.push(l)}return f.waitFor(a).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,c)).next(()=>u)}).then(i=>(t.Ji=s,i))}function Td(n,e,t){let r=A(),s=A();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let o=xe();return t.forEach((a,u)=>{const c=i.get(a);u.isFoundDocument()!==c.isFoundDocument()&&(s=s.add(a)),u.isNoDocument()&&u.version.isEqual(S.min())?(e.removeEntry(a,u.readTime),o=o.insert(a,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(a,u)):y("LocalStore","Ignoring outdated watch update for ",a,". Current version:",c.version," Watch version:",u.version)}),{nr:o,sr:s}})}function uw(n,e){const t=I(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Sn(n,e){const t=I(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Bs.getTargetData(r,e).next(i=>i?(s=i,f.resolve(s)):t.Bs.allocateTargetId(r).next(o=>(s=new Qe(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Bs.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ji.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ji=t.Ji.insert(r.targetId,r),t.Yi.set(e,r.targetId)),r})}async function _n(n,e,t){const r=I(n),s=r.Ji.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!bt(o))throw o;y("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ji=r.Ji.remove(e),r.Yi.delete(s.target)}function Rs(n,e,t){const r=I(n);let s=S.min(),i=A();return r.persistence.runTransaction("Execute query","readonly",o=>function(a,u,c){const l=I(a),h=l.Yi.get(c);return h!==void 0?f.resolve(l.Ji.get(h)):l.Bs.getTargetData(u,c)}(r,o,Ae(e)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.Bs.getMatchingKeysForTargetId(o,a.targetId).next(u=>{i=u})}).next(()=>r.Hi.getDocumentsMatchingQuery(o,e,t?s:S.min(),t?i:A())).next(a=>(Dd(r,Rh(e),a),{documents:a,ir:i})))}function Sd(n,e){const t=I(n),r=I(t.Bs),s=t.Ji.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",i=>r.le(i,e).next(o=>o?o.target:null))}function _d(n,e){const t=I(n),r=t.Xi.get(e)||S.min();return t.persistence.runTransaction("Get new document changes","readonly",s=>t.Zi.getAllFromCollectionGroup(s,e,lh(r,-1),Number.MAX_SAFE_INTEGER)).then(s=>(Dd(t,e,s),s))}function Dd(n,e,t){let r=n.Xi.get(e)||S.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Xi.set(e,r)}async function cw(n,e,t,r){const s=I(n);let i=A(),o=xe();for(const c of t){const l=e.rr(c.metadata.name);c.document&&(i=i.add(l));const h=e.ur(c);h.setReadTime(e.cr(c.metadata.readTime)),o=o.insert(l,h)}const a=s.Zi.newChangeBuffer({trackRemovals:!0}),u=await Sn(s,function(c){return Ae(On(R.fromString(`__bundle__/docs/${c}`)))}(r));return s.persistence.runTransaction("Apply bundle documents","readwrite",c=>Td(c,a,o).next(l=>(a.apply(c),l)).next(l=>s.Bs.removeMatchingKeysForTargetId(c,u.targetId).next(()=>s.Bs.addMatchingKeys(c,i,u.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(c,l.nr,l.sr)).next(()=>l.nr)))}async function lw(n,e,t=A()){const r=await Sn(n,Ae(va(e.bundledQuery))),s=I(n);return s.persistence.runTransaction("Save named query","readwrite",i=>{const o=Z(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return s.qs.saveNamedQuery(i,e);const a=r.withResumeToken(se.EMPTY_BYTE_STRING,o);return s.Ji=s.Ji.insert(a.targetId,a),s.Bs.updateTargetData(i,a).next(()=>s.Bs.removeMatchingKeysForTargetId(i,r.targetId)).next(()=>s.Bs.addMatchingKeys(i,t,r.targetId)).next(()=>s.qs.saveNamedQuery(i,e))})}function bc(n,e){return`firestore_clients_${n}_${e}`}function Tc(n,e,t){let r=`firestore_mutations_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function Bi(n,e){return`firestore_targets_${n}_${e}`}class Os{constructor(e,t,r,s){this.user=e,this.batchId=t,this.state=r,this.error=s}static ar(e,t,r){const s=JSON.parse(r);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new p(s.error.code,s.error.message))),o?new Os(e,t,s.state,i):(X("SharedClientState",`Failed to parse mutation state for ID '${t}': ${r}`),null)}hr(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class sr{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static ar(e,t){const r=JSON.parse(t);let s,i=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return i&&r.error&&(i=typeof r.error.message=="string"&&typeof r.error.code=="string",i&&(s=new p(r.error.code,r.error.message))),i?new sr(e,r.state,s):(X("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}hr(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ms{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static ar(e,t){const r=JSON.parse(t);let s=typeof r=="object"&&r.activeTargetIds instanceof Array,i=ha();for(let o=0;s&&o<r.activeTargetIds.length;++o)s=mh(r.activeTargetIds[o]),i=i.add(r.activeTargetIds[o]);return s?new Ms(e,i):(X("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class Da{constructor(e,t){this.clientId=e,this.onlineState=t}static ar(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Da(t.clientId,t.onlineState):(X("SharedClientState",`Failed to parse online state: ${e}`),null)}}class bo{constructor(){this.activeTargetIds=ha()}lr(e){this.activeTargetIds=this.activeTargetIds.add(e)}dr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}hr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class $i{constructor(e,t,r,s,i){this.window=e,this.ii=t,this.persistenceKey=r,this.wr=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this._r=this.mr.bind(this),this.gr=new B(x),this.started=!1,this.yr=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.pr=bc(this.persistenceKey,this.wr),this.Ir=function(a){return`firestore_sequence_number_${a}`}(this.persistenceKey),this.gr=this.gr.insert(this.wr,new bo),this.Tr=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Er=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ar=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.vr=function(a){return`firestore_online_state_${a}`}(this.persistenceKey),this.Rr=function(a){return`firestore_bundle_loaded_v2_${a}`}(this.persistenceKey),this.window.addEventListener("storage",this._r)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.$i();for(const r of e){if(r===this.wr)continue;const s=this.getItem(bc(this.persistenceKey,r));if(s){const i=Ms.ar(r,s);i&&(this.gr=this.gr.insert(i.clientId,i))}}this.Pr();const t=this.storage.getItem(this.vr);if(t){const r=this.br(t);r&&this.Vr(r)}for(const r of this.yr)this.mr(r);this.yr=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ir,JSON.stringify(e))}getAllActiveQueryTargets(){return this.Sr(this.gr)}isActiveQueryTarget(e){let t=!1;return this.gr.forEach((r,s)=>{s.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.Dr(e,"pending")}updateMutationState(e,t,r){this.Dr(e,t,r),this.Cr(e)}addLocalQueryTarget(e){let t="not-current";if(this.isActiveQueryTarget(e)){const r=this.storage.getItem(Bi(this.persistenceKey,e));if(r){const s=sr.ar(e,r);s&&(t=s.state)}}return this.Nr.lr(e),this.Pr(),t}removeLocalQueryTarget(e){this.Nr.dr(e),this.Pr()}isLocalQueryTarget(e){return this.Nr.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Bi(this.persistenceKey,e))}updateQueryState(e,t,r){this.kr(e,t,r)}handleUserChange(e,t,r){t.forEach(s=>{this.Cr(s)}),this.currentUser=e,r.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(e){this.Mr(e)}notifyBundleLoaded(e){this.$r(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this._r),this.removeItem(this.pr),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return y("SharedClientState","READ",e,t),t}setItem(e,t){y("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){y("SharedClientState","REMOVE",e),this.storage.removeItem(e)}mr(e){const t=e;if(t.storageArea===this.storage){if(y("SharedClientState","EVENT",t.key,t.newValue),t.key===this.pr)return void X("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ii.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.Tr.test(t.key)){if(t.newValue==null){const r=this.Or(t.key);return this.Fr(r,null)}{const r=this.Br(t.key,t.newValue);if(r)return this.Fr(r.clientId,r)}}else if(this.Er.test(t.key)){if(t.newValue!==null){const r=this.Lr(t.key,t.newValue);if(r)return this.qr(r)}}else if(this.Ar.test(t.key)){if(t.newValue!==null){const r=this.Ur(t.key,t.newValue);if(r)return this.Kr(r)}}else if(t.key===this.vr){if(t.newValue!==null){const r=this.br(t.newValue);if(r)return this.Vr(r)}}else if(t.key===this.Ir){const r=function(s){let i=De.ct;if(s!=null)try{const o=JSON.parse(s);_(typeof o=="number"),i=o}catch(o){X("SharedClientState","Failed to read sequence number from WebStorage",o)}return i}(t.newValue);r!==De.ct&&this.sequenceNumberHandler(r)}else if(t.key===this.Rr){const r=this.Gr(t.newValue);await Promise.all(r.map(s=>this.syncEngine.Qr(s)))}}}else this.yr.push(t)})}}get Nr(){return this.gr.get(this.wr)}Pr(){this.setItem(this.pr,this.Nr.hr())}Dr(e,t,r){const s=new Os(this.currentUser,e,t,r),i=Tc(this.persistenceKey,this.currentUser,e);this.setItem(i,s.hr())}Cr(e){const t=Tc(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Mr(e){const t={clientId:this.wr,onlineState:e};this.storage.setItem(this.vr,JSON.stringify(t))}kr(e,t,r){const s=Bi(this.persistenceKey,e),i=new sr(e,t,r);this.setItem(s,i.hr())}$r(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Rr,t)}Or(e){const t=this.Tr.exec(e);return t?t[1]:null}Br(e,t){const r=this.Or(e);return Ms.ar(r,t)}Lr(e,t){const r=this.Er.exec(e),s=Number(r[1]),i=r[2]!==void 0?r[2]:null;return Os.ar(new oe(i),s,t)}Ur(e,t){const r=this.Ar.exec(e),s=Number(r[1]);return sr.ar(s,t)}br(e){return Da.ar(e)}Gr(e){return JSON.parse(e)}async qr(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.jr(e.batchId,e.state,e.error);y("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Kr(e){return this.syncEngine.zr(e.targetId,e.state,e.error)}Fr(e,t){const r=t?this.gr.insert(e,t):this.gr.remove(e),s=this.Sr(this.gr),i=this.Sr(r),o=[],a=[];return i.forEach(u=>{s.has(u)||o.push(u)}),s.forEach(u=>{i.has(u)||a.push(u)}),this.syncEngine.Wr(o,a).then(()=>{this.gr=r})}Vr(e){this.gr.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}Sr(e){let t=ha();return e.forEach((r,s)=>{t=t.unionWith(s.activeTargetIds)}),t}}class Cd{constructor(){this.Hr=new bo,this.Jr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e){return this.Hr.lr(e),this.Jr[e]||"not-current"}updateQueryState(e,t,r){this.Jr[e]=t}removeLocalQueryTarget(e){this.Hr.dr(e)}isLocalQueryTarget(e){return this.Hr.activeTargetIds.has(e)}clearQueryState(e){delete this.Jr[e]}getAllActiveQueryTargets(){return this.Hr.activeTargetIds}isActiveQueryTarget(e){return this.Hr.activeTargetIds.has(e)}start(){return this.Hr=new bo,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hw{Yr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{constructor(){this.Xr=()=>this.Zr(),this.eo=()=>this.no(),this.so=[],this.io()}Yr(e){this.so.push(e)}shutdown(){window.removeEventListener("online",this.Xr),window.removeEventListener("offline",this.eo)}io(){window.addEventListener("online",this.Xr),window.addEventListener("offline",this.eo)}Zr(){y("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.so)e(0)}no(){y("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.so)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ss=null;function Ui(){return ss===null?ss=268435456+Math.round(2147483648*Math.random()):ss++,"0x"+ss.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dw={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw{constructor(e){this.ro=e.ro,this.oo=e.oo}uo(e){this.co=e}ao(e){this.ho=e}onMessage(e){this.lo=e}close(){this.oo()}send(e){this.ro(e)}fo(){this.co()}wo(e){this.ho(e)}_o(e){this.lo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye="WebChannelConnection";class mw extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http";this.mo=t+"://"+e.host,this.yo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get po(){return!1}Io(e,t,r,s,i){const o=Ui(),a=this.To(e,t);y("RestConnection",`Sending RPC '${e}' ${o}:`,a,r);const u={};return this.Eo(u,s,i),this.Ao(e,a,u,r).then(c=>(y("RestConnection",`Received RPC '${e}' ${o}: `,c),c),c=>{throw Le("RestConnection",`RPC '${e}' ${o} failed with error: `,c,"url: ",a,"request:",r),c})}vo(e,t,r,s,i,o){return this.Io(e,t,r,s,i)}Eo(e,t,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+Rn,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}To(e,t){const r=dw[e];return`${this.mo}/v1/${t}:${r}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ao(e,t,r,s){const i=Ui();return new Promise((o,a)=>{const u=new cp;u.setWithCredentials(!0),u.listenOnce(op.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Li.NO_ERROR:const l=u.getResponseJson();y(ye,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(l)),o(l);break;case Li.TIMEOUT:y(ye,`RPC '${e}' ${i} timed out`),a(new p(m.DEADLINE_EXCEEDED,"Request time out"));break;case Li.HTTP_ERROR:const h=u.getStatus();if(y(ye,`RPC '${e}' ${i} failed with status:`,h,"response text:",u.getResponseText()),h>0){let d=u.getResponseJson();Array.isArray(d)&&(d=d[0]);const g=d==null?void 0:d.error;if(g&&g.status&&g.message){const w=function(b){const D=b.toLowerCase().replace(/_/g,"-");return Object.values(m).indexOf(D)>=0?D:m.UNKNOWN}(g.status);a(new p(w,g.message))}else a(new p(m.UNKNOWN,"Server responded with status "+u.getStatus()))}else a(new p(m.UNAVAILABLE,"Connection failed."));break;default:T()}}finally{y(ye,`RPC '${e}' ${i} completed.`)}});const c=JSON.stringify(s);y(ye,`RPC '${e}' ${i} sending request:`,s),u.send(t,"POST",c,r,15)})}Ro(e,t,r){const s=Ui(),i=[this.mo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=sp(),a=ip(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.xmlHttpFactory=new up({})),this.Eo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const l=i.join("");y(ye,`Creating RPC '${e}' stream ${s}: ${l}`,u);const h=o.createWebChannel(l,u);let d=!1,g=!1;const w=new fw({ro:D=>{g?y(ye,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(d||(y(ye,`Opening RPC '${e}' stream ${s} transport.`),h.open(),d=!0),y(ye,`RPC '${e}' stream ${s} sending:`,D),h.send(D))},oo:()=>h.close()}),b=(D,V,K)=>{D.listen(V,O=>{try{K(O)}catch(ee){setTimeout(()=>{throw ee},0)}})};return b(h,Xr.EventType.OPEN,()=>{g||y(ye,`RPC '${e}' stream ${s} transport opened.`)}),b(h,Xr.EventType.CLOSE,()=>{g||(g=!0,y(ye,`RPC '${e}' stream ${s} transport closed`),w.wo())}),b(h,Xr.EventType.ERROR,D=>{g||(g=!0,Le(ye,`RPC '${e}' stream ${s} transport errored:`,D),w.wo(new p(m.UNAVAILABLE,"The operation could not be completed")))}),b(h,Xr.EventType.MESSAGE,D=>{var V;if(!g){const K=D.data[0];_(!!K);const O=K,ee=O.error||((V=O[0])===null||V===void 0?void 0:V.error);if(ee){y(ye,`RPC '${e}' stream ${s} received error:`,ee);const re=ee.status;let Q=function(_t){const iu=te[_t];if(iu!==void 0)return Qh(iu)}(re),Se=ee.message;Q===void 0&&(Q=m.INTERNAL,Se="Unknown error status: "+re+" with message "+ee.message),g=!0,w.wo(new p(Q,Se)),h.close()}else y(ye,`RPC '${e}' stream ${s} received:`,K),w._o(K)}}),b(a,ap.STAT_EVENT,D=>{D.stat===Ru.PROXY?y(ye,`RPC '${e}' stream ${s} detected buffering proxy`):D.stat===Ru.NOPROXY&&y(ye,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{w.fo()},0),w}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xd(){return typeof window<"u"?window:null}function ls(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ur(n){return new by(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e,t,r=1e3,s=1.5,i=6e4){this.ii=e,this.timerId=t,this.Po=r,this.bo=s,this.Vo=i,this.So=0,this.Do=null,this.Co=Date.now(),this.reset()}reset(){this.So=0}xo(){this.So=this.Vo}No(e){this.cancel();const t=Math.floor(this.So+this.ko()),r=Math.max(0,Date.now()-this.Co),s=Math.max(0,t-r);s>0&&y("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.So} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.Do=this.ii.enqueueAfterDelay(this.timerId,s,()=>(this.Co=Date.now(),e())),this.So*=this.bo,this.So<this.Po&&(this.So=this.Po),this.So>this.Vo&&(this.So=this.Vo)}Mo(){this.Do!==null&&(this.Do.skipDelay(),this.Do=null)}cancel(){this.Do!==null&&(this.Do.cancel(),this.Do=null)}ko(){return(Math.random()-.5)*this.So}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(e,t,r,s,i,o,a,u){this.ii=e,this.$o=r,this.Oo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=u,this.state=0,this.Fo=0,this.Bo=null,this.Lo=null,this.stream=null,this.qo=new Ca(e,t)}Uo(){return this.state===1||this.state===5||this.Ko()}Ko(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Go()}async stop(){this.Uo()&&await this.close(0)}Qo(){this.state=0,this.qo.reset()}jo(){this.Ko()&&this.Bo===null&&(this.Bo=this.ii.enqueueAfterDelay(this.$o,6e4,()=>this.zo()))}Wo(e){this.Ho(),this.stream.send(e)}async zo(){if(this.Ko())return this.close(0)}Ho(){this.Bo&&(this.Bo.cancel(),this.Bo=null)}Jo(){this.Lo&&(this.Lo.cancel(),this.Lo=null)}async close(e,t){this.Ho(),this.Jo(),this.qo.cancel(),this.Fo++,e!==4?this.qo.reset():t&&t.code===m.RESOURCE_EXHAUSTED?(X(t.toString()),X("Using maximum backoff delay to prevent overloading the backend."),this.qo.xo()):t&&t.code===m.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Yo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.ao(t)}Yo(){}auth(){this.state=1;const e=this.Xo(this.Fo),t=this.Fo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Fo===t&&this.Zo(r,s)},r=>{e(()=>{const s=new p(m.UNKNOWN,"Fetching auth token failed: "+r.message);return this.tu(s)})})}Zo(e,t){const r=this.Xo(this.Fo);this.stream=this.eu(e,t),this.stream.uo(()=>{r(()=>(this.state=2,this.Lo=this.ii.enqueueAfterDelay(this.Oo,1e4,()=>(this.Ko()&&(this.state=3),Promise.resolve())),this.listener.uo()))}),this.stream.ao(s=>{r(()=>this.tu(s))}),this.stream.onMessage(s=>{r(()=>this.onMessage(s))})}Go(){this.state=5,this.qo.No(async()=>{this.state=0,this.start()})}tu(e){return y("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Xo(e){return t=>{this.ii.enqueueAndForget(()=>this.Fo===e?t():(y("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class gw extends Ad{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}eu(e,t){return this.connection.Ro("Listen",e,t)}onMessage(e){this.qo.reset();const t=_y(this.serializer,e),r=function(s){if(!("targetChange"in s))return S.min();const i=s.targetChange;return i.targetIds&&i.targetIds.length?S.min():i.readTime?Z(i.readTime):S.min()}(e);return this.listener.nu(t,r)}su(e){const t={};t.database=Ir(this.serializer),t.addTarget=function(s,i){let o;const a=i.target;if(o=Ds(a)?{documents:nd(s,a)}:{query:rd(s,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0){o.resumeToken=Xh(s,i.resumeToken);const u=po(s,i.expectedCount);u!==null&&(o.expectedCount=u)}else if(i.snapshotVersion.compareTo(S.min())>0){o.readTime=Tn(s,i.snapshotVersion.toTimestamp());const u=po(s,i.expectedCount);u!==null&&(o.expectedCount=u)}return o}(this.serializer,e);const r=Cy(this.serializer,e);r&&(t.labels=r),this.Wo(t)}iu(e){const t={};t.database=Ir(this.serializer),t.removeTarget=e,this.Wo(t)}}class pw extends Ad{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i,this.ru=!1}get ou(){return this.ru}start(){this.ru=!1,this.lastStreamToken=void 0,super.start()}Yo(){this.ru&&this.uu([])}eu(e,t){return this.connection.Ro("Write",e,t)}onMessage(e){if(_(!!e.streamToken),this.lastStreamToken=e.streamToken,this.ru){this.qo.reset();const t=Dy(e.writeResults,e.commitTime),r=Z(e.commitTime);return this.listener.cu(r,t)}return _(!e.writeResults||e.writeResults.length===0),this.ru=!0,this.listener.au()}hu(){const e={};e.database=Ir(this.serializer),this.Wo(e)}uu(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>Er(this.serializer,r))};this.Wo(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yw extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.lu=!1}fu(){if(this.lu)throw new p(m.FAILED_PRECONDITION,"The client has already been terminated.")}Io(e,t,r){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Io(e,t,r,s,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===m.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new p(m.UNKNOWN,s.toString())})}vo(e,t,r,s){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.vo(e,t,r,i,o,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===m.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new p(m.UNKNOWN,i.toString())})}terminate(){this.lu=!0}}class ww{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.wu=0,this._u=null,this.mu=!0}gu(){this.wu===0&&(this.yu("Unknown"),this._u=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._u=null,this.pu("Backend didn't respond within 10 seconds."),this.yu("Offline"),Promise.resolve())))}Iu(e){this.state==="Online"?this.yu("Unknown"):(this.wu++,this.wu>=1&&(this.Tu(),this.pu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.yu("Offline")))}set(e){this.Tu(),this.wu=0,e==="Online"&&(this.mu=!1),this.yu(e)}yu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}pu(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.mu?(X(t),this.mu=!1):y("OnlineStateTracker",t)}Tu(){this._u!==null&&(this._u.cancel(),this._u=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Eu=[],this.Au=new Map,this.vu=new Set,this.Ru=[],this.Pu=i,this.Pu.Yr(o=>{r.enqueueAndForget(async()=>{St(this)&&(y("RemoteStore","Restarting streams for network reachability change."),await async function(a){const u=I(a);u.vu.add(4),await Ln(u),u.bu.set("Unknown"),u.vu.delete(4),await qr(u)}(this))})}),this.bu=new ww(r,s)}}async function qr(n){if(St(n))for(const e of n.Ru)await e(!0)}async function Ln(n){for(const e of n.Ru)await e(!1)}function li(n,e){const t=I(n);t.Au.has(e.targetId)||(t.Au.set(e.targetId,e),Na(t)?Aa(t):Vn(t).Ko()&&xa(t,e))}function br(n,e){const t=I(n),r=Vn(t);t.Au.delete(e),r.Ko()&&Nd(t,e),t.Au.size===0&&(r.Ko()?r.jo():St(t)&&t.bu.set("Unknown"))}function xa(n,e){if(n.Vu.qt(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(S.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Vn(n).su(e)}function Nd(n,e){n.Vu.qt(e),Vn(n).iu(e)}function Aa(n){n.Vu=new wy({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),le:e=>n.Au.get(e)||null,ue:()=>n.datastore.serializer.databaseId}),Vn(n).start(),n.bu.gu()}function Na(n){return St(n)&&!Vn(n).Uo()&&n.Au.size>0}function St(n){return I(n).vu.size===0}function kd(n){n.Vu=void 0}async function Iw(n){n.Au.forEach((e,t)=>{xa(n,e)})}async function Ew(n,e){kd(n),Na(n)?(n.bu.Iu(e),Aa(n)):n.bu.set("Unknown")}async function bw(n,e,t){if(n.bu.set("Online"),e instanceof Yh&&e.state===2&&e.cause)try{await async function(r,s){const i=s.cause;for(const o of s.targetIds)r.Au.has(o)&&(await r.remoteSyncer.rejectListen(o,i),r.Au.delete(o),r.Vu.removeTarget(o))}(n,e)}catch(r){y("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Fs(n,r)}else if(e instanceof cs?n.Vu.Ht(e):e instanceof Wh?n.Vu.ne(e):n.Vu.Xt(e),!t.isEqual(S.min()))try{const r=await bd(n.localStore);t.compareTo(r)>=0&&await function(s,i){const o=s.Vu.ce(i);return o.targetChanges.forEach((a,u)=>{if(a.resumeToken.approximateByteSize()>0){const c=s.Au.get(u);c&&s.Au.set(u,c.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach((a,u)=>{const c=s.Au.get(a);if(!c)return;s.Au.set(a,c.withResumeToken(se.EMPTY_BYTE_STRING,c.snapshotVersion)),Nd(s,a);const l=new Qe(c.target,a,u,c.sequenceNumber);xa(s,l)}),s.remoteSyncer.applyRemoteEvent(o)}(n,t)}catch(r){y("RemoteStore","Failed to raise snapshot:",r),await Fs(n,r)}}async function Fs(n,e,t){if(!bt(e))throw e;n.vu.add(1),await Ln(n),n.bu.set("Offline"),t||(t=()=>bd(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{y("RemoteStore","Retrying IndexedDB access"),await t(),n.vu.delete(1),await qr(n)})}function Rd(n,e){return e().catch(t=>Fs(n,t,e))}async function Pn(n){const e=I(n),t=pt(e);let r=e.Eu.length>0?e.Eu[e.Eu.length-1].batchId:-1;for(;Tw(e);)try{const s=await uw(e.localStore,r);if(s===null){e.Eu.length===0&&t.jo();break}r=s.batchId,Sw(e,s)}catch(s){await Fs(e,s)}Od(e)&&Md(e)}function Tw(n){return St(n)&&n.Eu.length<10}function Sw(n,e){n.Eu.push(e);const t=pt(n);t.Ko()&&t.ou&&t.uu(e.mutations)}function Od(n){return St(n)&&!pt(n).Uo()&&n.Eu.length>0}function Md(n){pt(n).start()}async function _w(n){pt(n).hu()}async function Dw(n){const e=pt(n);for(const t of n.Eu)e.uu(t.mutations)}async function Cw(n,e,t){const r=n.Eu.shift(),s=ma.from(r,e,t);await Rd(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Pn(n)}async function xw(n,e){e&&pt(n).ou&&await async function(t,r){if(s=r.code,Kh(s)&&s!==m.ABORTED){const i=t.Eu.shift();pt(t).Qo(),await Rd(t,()=>t.remoteSyncer.rejectFailedWrite(i.batchId,r)),await Pn(t)}var s}(n,e),Od(n)&&Md(n)}async function _c(n,e){const t=I(n);t.asyncQueue.verifyOperationInProgress(),y("RemoteStore","RemoteStore received new credentials");const r=St(t);t.vu.add(3),await Ln(t),r&&t.bu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.vu.delete(3),await qr(t)}async function To(n,e){const t=I(n);e?(t.vu.delete(2),await qr(t)):e||(t.vu.add(2),await Ln(t),t.bu.set("Unknown"))}function Vn(n){return n.Su||(n.Su=function(e,t,r){const s=I(e);return s.fu(),new gw(t,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(n.datastore,n.asyncQueue,{uo:Iw.bind(null,n),ao:Ew.bind(null,n),nu:bw.bind(null,n)}),n.Ru.push(async e=>{e?(n.Su.Qo(),Na(n)?Aa(n):n.bu.set("Unknown")):(await n.Su.stop(),kd(n))})),n.Su}function pt(n){return n.Du||(n.Du=function(e,t,r){const s=I(e);return s.fu(),new pw(t,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,r)}(n.datastore,n.asyncQueue,{uo:_w.bind(null,n),ao:xw.bind(null,n),au:Dw.bind(null,n),cu:Cw.bind(null,n)}),n.Ru.push(async e=>{e?(n.Du.Qo(),await Pn(n)):(await n.Du.stop(),n.Eu.length>0&&(y("RemoteStore",`Stopping write stream with ${n.Eu.length} pending writes`),n.Eu=[]))})),n.Du}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new ae,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,a=new ka(e,t,o,s,i);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new p(m.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Bn(n,e){if(X("AsyncQueue",`${e}: ${n}`),bt(n))return new p(m.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e){this.comparator=e?(t,r)=>e(t,r)||v.comparator(t.key,r.key):(t,r)=>v.comparator(t.key,r.key),this.keyedMap=Yn(),this.sortedSet=new B(this.comparator)}static emptySet(e){return new gn(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof gn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new gn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(){this.Cu=new B(v.comparator)}track(e){const t=e.doc.key,r=this.Cu.get(t);r?e.type!==0&&r.type===3?this.Cu=this.Cu.insert(t,e):e.type===3&&r.type!==1?this.Cu=this.Cu.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.Cu=this.Cu.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.Cu=this.Cu.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.Cu=this.Cu.remove(t):e.type===1&&r.type===2?this.Cu=this.Cu.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.Cu=this.Cu.insert(t,{type:2,doc:e.doc}):T():this.Cu=this.Cu.insert(t,e)}xu(){const e=[];return this.Cu.inorderTraversal((t,r)=>{e.push(r)}),e}}class Dn{constructor(e,t,r,s,i,o,a,u,c){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach(a=>{o.push({type:0,doc:a})}),new Dn(e,t,gn.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Lr(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aw{constructor(){this.Nu=void 0,this.listeners=[]}}class Nw{constructor(){this.queries=new Tt(e=>kh(e),Lr),this.onlineState="Unknown",this.ku=new Set}}async function Ra(n,e){const t=I(n),r=e.query;let s=!1,i=t.queries.get(r);if(i||(s=!0,i=new Aw),s)try{i.Nu=await t.onListen(r)}catch(o){const a=Bn(o,`Initialization of query '${go(e.query)}' failed`);return void e.onError(a)}t.queries.set(r,i),i.listeners.push(e),e.Mu(t.onlineState),i.Nu&&e.$u(i.Nu)&&Ma(t)}async function Oa(n,e){const t=I(n),r=e.query;let s=!1;const i=t.queries.get(r);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),s=i.listeners.length===0)}if(s)return t.queries.delete(r),t.onUnlisten(r)}function kw(n,e){const t=I(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const a of o.listeners)a.$u(s)&&(r=!0);o.Nu=s}}r&&Ma(t)}function Rw(n,e,t){const r=I(n),s=r.queries.get(e);if(s)for(const i of s.listeners)i.onError(t);r.queries.delete(e)}function Ma(n){n.ku.forEach(e=>{e.next()})}class Fa{constructor(e,t,r){this.query=e,this.Ou=t,this.Fu=!1,this.Bu=null,this.onlineState="Unknown",this.options=r||{}}$u(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Dn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Fu?this.Lu(e)&&(this.Ou.next(e),t=!0):this.qu(e,this.onlineState)&&(this.Uu(e),t=!0),this.Bu=e,t}onError(e){this.Ou.error(e)}Mu(e){this.onlineState=e;let t=!1;return this.Bu&&!this.Fu&&this.qu(this.Bu,e)&&(this.Uu(this.Bu),t=!0),t}qu(e,t){if(!e.fromCache)return!0;const r=t!=="Offline";return(!this.options.Ku||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Lu(e){if(e.docChanges.length>0)return!0;const t=this.Bu&&this.Bu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Uu(e){e=Dn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Fu=!0,this.Ou.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ow{constructor(e,t){this.Gu=e,this.byteLength=t}Qu(){return"metadata"in this.Gu}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{constructor(e){this.serializer=e}rr(e){return Ue(this.serializer,e)}ur(e){return e.metadata.exists?td(this.serializer,e.document,!1):$.newNoDocument(this.rr(e.metadata.name),this.cr(e.metadata.readTime))}cr(e){return Z(e)}}class Mw{constructor(e,t,r){this.ju=e,this.localStore=t,this.serializer=r,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=Fd(e)}zu(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.Gu.namedQuery)this.queries.push(e.Gu.namedQuery);else if(e.Gu.documentMetadata){this.documents.push({metadata:e.Gu.documentMetadata}),e.Gu.documentMetadata.exists||++t;const r=R.fromString(e.Gu.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.Gu.document&&(this.documents[this.documents.length-1].document=e.Gu.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}Wu(e){const t=new Map,r=new Cc(this.serializer);for(const s of e)if(s.metadata.queries){const i=r.rr(s.metadata.name);for(const o of s.metadata.queries){const a=(t.get(o)||A()).add(i);t.set(o,a)}}return t}async complete(){const e=await cw(this.localStore,new Cc(this.serializer),this.documents,this.ju.id),t=this.Wu(this.documents);for(const r of this.queries)await lw(this.localStore,r,t.get(r.name));return this.progress.taskState="Success",{progress:this.progress,Hu:this.collectionGroups,Ju:e}}}function Fd(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(e){this.key=e}}class Pd{constructor(e){this.key=e}}class Vd{constructor(e,t){this.query=e,this.Yu=t,this.Xu=null,this.hasCachedResults=!1,this.current=!1,this.Zu=A(),this.mutatedKeys=A(),this.tc=Oh(e),this.ec=new gn(this.tc)}get nc(){return this.Yu}sc(e,t){const r=t?t.ic:new Dc,s=t?t.ec:this.ec;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,a=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,c=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((l,h)=>{const d=s.get(l),g=Pr(this.query,h)?h:null,w=!!d&&this.mutatedKeys.has(d.key),b=!!g&&(g.hasLocalMutations||this.mutatedKeys.has(g.key)&&g.hasCommittedMutations);let D=!1;d&&g?d.data.isEqual(g.data)?w!==b&&(r.track({type:3,doc:g}),D=!0):this.rc(d,g)||(r.track({type:2,doc:g}),D=!0,(u&&this.tc(g,u)>0||c&&this.tc(g,c)<0)&&(a=!0)):!d&&g?(r.track({type:0,doc:g}),D=!0):d&&!g&&(r.track({type:1,doc:d}),D=!0,(u||c)&&(a=!0)),D&&(g?(o=o.add(g),i=b?i.add(l):i.delete(l)):(o=o.delete(l),i=i.delete(l)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const l=this.query.limitType==="F"?o.last():o.first();o=o.delete(l.key),i=i.delete(l.key),r.track({type:1,doc:l})}return{ec:o,ic:r,zi:a,mutatedKeys:i}}rc(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r){const s=this.ec;this.ec=e.ec,this.mutatedKeys=e.mutatedKeys;const i=e.ic.xu();i.sort((c,l)=>function(h,d){const g=w=>{switch(w){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return T()}};return g(h)-g(d)}(c.type,l.type)||this.tc(c.doc,l.doc)),this.oc(r);const o=t?this.uc():[],a=this.Zu.size===0&&this.current?1:0,u=a!==this.Xu;return this.Xu=a,i.length!==0||u?{snapshot:new Dn(this.query,e.ec,s,i,e.mutatedKeys,a===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),cc:o}:{cc:o}}Mu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ec:this.ec,ic:new Dc,mutatedKeys:this.mutatedKeys,zi:!1},!1)):{cc:[]}}ac(e){return!this.Yu.has(e)&&!!this.ec.has(e)&&!this.ec.get(e).hasLocalMutations}oc(e){e&&(e.addedDocuments.forEach(t=>this.Yu=this.Yu.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Yu=this.Yu.delete(t)),this.current=e.current)}uc(){if(!this.current)return[];const e=this.Zu;this.Zu=A(),this.ec.forEach(r=>{this.ac(r.key)&&(this.Zu=this.Zu.add(r.key))});const t=[];return e.forEach(r=>{this.Zu.has(r)||t.push(new Pd(r))}),this.Zu.forEach(r=>{e.has(r)||t.push(new Ld(r))}),t}hc(e){this.Yu=e.ir,this.Zu=A();const t=this.sc(e.documents);return this.applyChanges(t,!0)}lc(){return Dn.fromInitialDocuments(this.query,this.ec,this.mutatedKeys,this.Xu===0,this.hasCachedResults)}}class Fw{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Lw{constructor(e){this.key=e,this.fc=!1}}class Pw{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.dc={},this.wc=new Tt(a=>kh(a),Lr),this._c=new Map,this.mc=new Set,this.gc=new B(v.comparator),this.yc=new Map,this.Ic=new ba,this.Tc={},this.Ec=new Map,this.Ac=Wt.Mn(),this.onlineState="Unknown",this.vc=void 0}get isPrimaryClient(){return this.vc===!0}}async function Vw(n,e){const t=$a(n);let r,s;const i=t.wc.get(e);if(i)r=i.targetId,t.sharedClientState.addLocalQueryTarget(r),s=i.view.lc();else{const o=await Sn(t.localStore,Ae(e)),a=t.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,s=await La(t,e,r,a==="current",o.resumeToken),t.isPrimaryClient&&li(t.remoteStore,o)}return s}async function La(n,e,t,r,s){n.Rc=(h,d,g)=>async function(w,b,D,V){let K=b.view.sc(D);K.zi&&(K=await Rs(w.localStore,b.query,!1).then(({documents:re})=>b.view.sc(re,K)));const O=V&&V.targetChanges.get(b.targetId),ee=b.view.applyChanges(K,w.isPrimaryClient,O);return So(w,b.targetId,ee.cc),ee.snapshot}(n,h,d,g);const i=await Rs(n.localStore,e,!0),o=new Vd(e,i.ir),a=o.sc(i.documents),u=$r.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),c=o.applyChanges(a,n.isPrimaryClient,u);So(n,t,c.cc);const l=new Fw(e,t,o);return n.wc.set(e,l),n._c.has(t)?n._c.get(t).push(e):n._c.set(t,[e]),c.snapshot}async function Bw(n,e){const t=I(n),r=t.wc.get(e),s=t._c.get(r.targetId);if(s.length>1)return t._c.set(r.targetId,s.filter(i=>!Lr(i,e))),void t.wc.delete(e);t.isPrimaryClient?(t.sharedClientState.removeLocalQueryTarget(r.targetId),t.sharedClientState.isActiveQueryTarget(r.targetId)||await _n(t.localStore,r.targetId,!1).then(()=>{t.sharedClientState.clearQueryState(r.targetId),br(t.remoteStore,r.targetId),Cn(t,r.targetId)}).catch(Et)):(Cn(t,r.targetId),await _n(t.localStore,r.targetId,!0))}async function $w(n,e,t){const r=Ua(n);try{const s=await function(i,o){const a=I(i),u=G.now(),c=o.reduce((d,g)=>d.add(g.key),A());let l,h;return a.persistence.runTransaction("Locally write mutations","readwrite",d=>{let g=xe(),w=A();return a.Zi.getEntries(d,c).next(b=>{g=b,g.forEach((D,V)=>{V.isValidDocument()||(w=w.add(D))})}).next(()=>a.localDocuments.getOverlayedDocuments(d,g)).next(b=>{l=b;const D=[];for(const V of o){const K=gy(V,l.get(V.key).overlayedDocument);K!=null&&D.push(new Je(V.key,K,bh(K.value.mapValue),z.exists(!0)))}return a.mutationQueue.addMutationBatch(d,u,D,o)}).next(b=>{h=b;const D=b.applyToLocalDocumentSet(l,w);return a.documentOverlayCache.saveOverlays(d,b.batchId,D)})}).then(()=>({batchId:h.batchId,changes:Fh(l)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(i,o,a){let u=i.Tc[i.currentUser.toKey()];u||(u=new B(x)),u=u.insert(o,a),i.Tc[i.currentUser.toKey()]=u}(r,s.batchId,t),await Ze(r,s.changes),await Pn(r.remoteStore)}catch(s){const i=Bn(s,"Failed to persist write");t.reject(i)}}async function Bd(n,e){const t=I(n);try{const r=await aw(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.yc.get(i);o&&(_(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.fc=!0:s.modifiedDocuments.size>0?_(o.fc):s.removedDocuments.size>0&&(_(o.fc),o.fc=!1))}),await Ze(t,r,e)}catch(r){await Et(r)}}function xc(n,e,t){const r=I(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.wc.forEach((i,o)=>{const a=o.view.Mu(e);a.snapshot&&s.push(a.snapshot)}),function(i,o){const a=I(i);a.onlineState=o;let u=!1;a.queries.forEach((c,l)=>{for(const h of l.listeners)h.Mu(o)&&(u=!0)}),u&&Ma(a)}(r.eventManager,e),s.length&&r.dc.nu(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Uw(n,e,t){const r=I(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.yc.get(e),i=s&&s.key;if(i){let o=new B(v.comparator);o=o.insert(i,$.newNoDocument(i,S.min()));const a=A().add(i),u=new Br(S.min(),new Map,new B(x),o,a);await Bd(r,u),r.gc=r.gc.remove(i),r.yc.delete(e),Ba(r)}else await _n(r.localStore,e,!1).then(()=>Cn(r,e,t)).catch(Et)}async function qw(n,e){const t=I(n),r=e.batch.batchId;try{const s=await ow(t.localStore,e);Va(t,r,null),Pa(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Ze(t,s)}catch(s){await Et(s)}}async function jw(n,e,t){const r=I(n);try{const s=await function(i,o){const a=I(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let c;return a.mutationQueue.lookupMutationBatch(u,o).next(l=>(_(l!==null),c=l.keys(),a.mutationQueue.removeMutationBatch(u,l))).next(()=>a.mutationQueue.performConsistencyCheck(u)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(u,c,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,c)).next(()=>a.localDocuments.getDocuments(u,c))})}(r.localStore,e);Va(r,e,t),Pa(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Ze(r,s)}catch(s){await Et(s)}}async function zw(n,e){const t=I(n);St(t.remoteStore)||y("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await function(i){const o=I(i);return o.persistence.runTransaction("Get highest unacknowledged batch id","readonly",a=>o.mutationQueue.getHighestUnacknowledgedBatchId(a))}(t.localStore);if(r===-1)return void e.resolve();const s=t.Ec.get(r)||[];s.push(e),t.Ec.set(r,s)}catch(r){const s=Bn(r,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function Pa(n,e){(n.Ec.get(e)||[]).forEach(t=>{t.resolve()}),n.Ec.delete(e)}function Va(n,e,t){const r=I(n);let s=r.Tc[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Tc[r.currentUser.toKey()]=s}}function Cn(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n._c.get(e))n.wc.delete(r),t&&n.dc.Pc(r,t);n._c.delete(e),n.isPrimaryClient&&n.Ic.Is(e).forEach(r=>{n.Ic.containsKey(r)||$d(n,r)})}function $d(n,e){n.mc.delete(e.path.canonicalString());const t=n.gc.get(e);t!==null&&(br(n.remoteStore,t),n.gc=n.gc.remove(e),n.yc.delete(t),Ba(n))}function So(n,e,t){for(const r of t)r instanceof Ld?(n.Ic.addReference(r.key,e),Gw(n,r)):r instanceof Pd?(y("SyncEngine","Document no longer in limbo: "+r.key),n.Ic.removeReference(r.key,e),n.Ic.containsKey(r.key)||$d(n,r.key)):T()}function Gw(n,e){const t=e.key,r=t.path.canonicalString();n.gc.get(t)||n.mc.has(r)||(y("SyncEngine","New document in limbo: "+t),n.mc.add(r),Ba(n))}function Ba(n){for(;n.mc.size>0&&n.gc.size<n.maxConcurrentLimboResolutions;){const e=n.mc.values().next().value;n.mc.delete(e);const t=new v(R.fromString(e)),r=n.Ac.next();n.yc.set(r,new Lw(t)),n.gc=n.gc.insert(t,r),li(n.remoteStore,new Qe(Ae(On(t.path)),r,"TargetPurposeLimboResolution",De.ct))}}async function Ze(n,e,t){const r=I(n),s=[],i=[],o=[];r.wc.isEmpty()||(r.wc.forEach((a,u)=>{o.push(r.Rc(u,e,t).then(c=>{if((c||t)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(u.targetId,c!=null&&c.fromCache?"not-current":"current"),c){s.push(c);const l=_a.Li(u.targetId,c);i.push(l)}}))}),await Promise.all(o),r.dc.nu(s),await async function(a,u){const c=I(a);try{await c.persistence.runTransaction("notifyLocalViewChanges","readwrite",l=>f.forEach(u,h=>f.forEach(h.Fi,d=>c.persistence.referenceDelegate.addReference(l,h.targetId,d)).next(()=>f.forEach(h.Bi,d=>c.persistence.referenceDelegate.removeReference(l,h.targetId,d)))))}catch(l){if(!bt(l))throw l;y("LocalStore","Failed to update sequence numbers: "+l)}for(const l of u){const h=l.targetId;if(!l.fromCache){const d=c.Ji.get(h),g=d.snapshotVersion,w=d.withLastLimboFreeSnapshotVersion(g);c.Ji=c.Ji.insert(h,w)}}}(r.localStore,i))}async function Kw(n,e){const t=I(n);if(!t.currentUser.isEqual(e)){y("SyncEngine","User change. New user:",e.toKey());const r=await Ed(t.localStore,e);t.currentUser=e,function(s,i){s.Ec.forEach(o=>{o.forEach(a=>{a.reject(new p(m.CANCELLED,i))})}),s.Ec.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ze(t,r.er)}}function Qw(n,e){const t=I(n),r=t.yc.get(e);if(r&&r.fc)return A().add(r.key);{let s=A();const i=t._c.get(e);if(!i)return s;for(const o of i){const a=t.wc.get(o);s=s.unionWith(a.view.nc)}return s}}async function Hw(n,e){const t=I(n),r=await Rs(t.localStore,e.query,!0),s=e.view.hc(r);return t.isPrimaryClient&&So(t,e.targetId,s.cc),s}async function Ww(n,e){const t=I(n);return _d(t.localStore,e).then(r=>Ze(t,r))}async function Yw(n,e,t,r){const s=I(n),i=await function(o,a){const u=I(o),c=I(u.mutationQueue);return u.persistence.runTransaction("Lookup mutation documents","readonly",l=>c.Sn(l,a).next(h=>h?u.localDocuments.getDocuments(l,h):f.resolve(null)))}(s.localStore,e);i!==null?(t==="pending"?await Pn(s.remoteStore):t==="acknowledged"||t==="rejected"?(Va(s,e,r||null),Pa(s,e),function(o,a){I(I(o).mutationQueue).Cn(a)}(s.localStore,e)):T(),await Ze(s,i)):y("SyncEngine","Cannot apply mutation batch with id: "+e)}async function Xw(n,e){const t=I(n);if($a(t),Ua(t),e===!0&&t.vc!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),s=await Ac(t,r.toArray());t.vc=!0,await To(t.remoteStore,!0);for(const i of s)li(t.remoteStore,i)}else if(e===!1&&t.vc!==!1){const r=[];let s=Promise.resolve();t._c.forEach((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):s=s.then(()=>(Cn(t,o),_n(t.localStore,o,!0))),br(t.remoteStore,o)}),await s,await Ac(t,r),function(i){const o=I(i);o.yc.forEach((a,u)=>{br(o.remoteStore,u)}),o.Ic.Ts(),o.yc=new Map,o.gc=new B(v.comparator)}(t),t.vc=!1,await To(t.remoteStore,!1)}}async function Ac(n,e,t){const r=I(n),s=[],i=[];for(const o of e){let a;const u=r._c.get(o);if(u&&u.length!==0){a=await Sn(r.localStore,Ae(u[0]));for(const c of u){const l=r.wc.get(c),h=await Hw(r,l);h.snapshot&&i.push(h.snapshot)}}else{const c=await Sd(r.localStore,o);a=await Sn(r.localStore,c),await La(r,Ud(c),o,!1,a.resumeToken)}s.push(a)}return r.dc.nu(i),s}function Ud(n){return Nh(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function Jw(n){const e=I(n);return I(I(e.localStore).persistence).$i()}async function Zw(n,e,t,r){const s=I(n);if(s.vc)return void y("SyncEngine","Ignoring unexpected query state notification.");const i=s._c.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await _d(s.localStore,Rh(i[0])),a=Br.createSynthesizedRemoteEventForCurrentChange(e,t==="current",se.EMPTY_BYTE_STRING);await Ze(s,o,a);break}case"rejected":await _n(s.localStore,e,!0),Cn(s,e,r);break;default:T()}}async function ev(n,e,t){const r=$a(n);if(r.vc){for(const s of e){if(r._c.has(s)){y("SyncEngine","Adding an already active target "+s);continue}const i=await Sd(r.localStore,s),o=await Sn(r.localStore,i);await La(r,Ud(i),o.targetId,!1,o.resumeToken),li(r.remoteStore,o)}for(const s of t)r._c.has(s)&&await _n(r.localStore,s,!1).then(()=>{br(r.remoteStore,s),Cn(r,s)}).catch(Et)}}function $a(n){const e=I(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Bd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Qw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Uw.bind(null,e),e.dc.nu=kw.bind(null,e.eventManager),e.dc.Pc=Rw.bind(null,e.eventManager),e}function Ua(n){const e=I(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=qw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=jw.bind(null,e),e}function tv(n,e,t){const r=I(n);(async function(s,i,o){try{const a=await i.getMetadata();if(await function(h,d){const g=I(h),w=Z(d.createTime);return g.persistence.runTransaction("hasNewerBundle","readonly",b=>g.qs.getBundleMetadata(b,d.id)).then(b=>!!b&&b.createTime.compareTo(w)>=0)}(s.localStore,a))return await i.close(),o._completeWith(function(h){return{taskState:"Success",documentsLoaded:h.totalDocuments,bytesLoaded:h.totalBytes,totalDocuments:h.totalDocuments,totalBytes:h.totalBytes}}(a)),Promise.resolve(new Set);o._updateProgress(Fd(a));const u=new Mw(a,s.localStore,i.serializer);let c=await i.bc();for(;c;){const h=await u.zu(c);h&&o._updateProgress(h),c=await i.bc()}const l=await u.complete();return await Ze(s,l.Ju,void 0),await function(h,d){const g=I(h);return g.persistence.runTransaction("Save bundle","readwrite",w=>g.qs.saveBundleMetadata(w,d))}(s.localStore,a),o._completeWith(l.progress),Promise.resolve(l.Hu)}catch(a){return Le("SyncEngine",`Loading bundle failed with ${a}`),o._failWith(a),Promise.resolve(new Set)}})(r,e,t).then(s=>{r.sharedClientState.notifyBundleLoaded(s)})}class _o{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=Ur(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return Id(this.persistence,new vd,e.initialUser,this.serializer)}createPersistence(e){return new wd(ci.zs,this.serializer)}createSharedClientState(e){return new Cd}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class qd extends _o{constructor(e,t,r){super(),this.Vc=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Vc.initialize(this,e),await Ua(this.Vc.syncEngine),await Pn(this.Vc.remoteStore),await this.persistence.Ii(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}createLocalStore(e){return Id(this.persistence,new vd,e.initialUser,this.serializer)}createGarbageCollectionScheduler(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new zy(r,e.asyncQueue,t)}createIndexBackfillerScheduler(e,t){const r=new Cp(t,this.persistence);return new Dp(e.asyncQueue,r)}createPersistence(e){const t=Sa(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?_e.withCacheSize(this.cacheSizeBytes):_e.DEFAULT;return new Ta(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,xd(),ls(),this.serializer,this.sharedClientState,!!this.forceOwnership)}createSharedClientState(e){return new Cd}}class nv extends qd{constructor(e,t){super(e,t,!1),this.Vc=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Vc.syncEngine;this.sharedClientState instanceof $i&&(this.sharedClientState.syncEngine={jr:Yw.bind(null,t),zr:Zw.bind(null,t),Wr:ev.bind(null,t),$i:Jw.bind(null,t),Qr:Ww.bind(null,t)},await this.sharedClientState.start()),await this.persistence.Ii(async r=>{await Xw(this.Vc.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}createSharedClientState(e){const t=xd();if(!$i.D(t))throw new p(m.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=Sa(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new $i(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class qa{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>xc(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Kw.bind(null,this.syncEngine),await To(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Nw}createDatastore(e){const t=Ur(e.databaseInfo.databaseId),r=(s=e.databaseInfo,new mw(s));var s;return function(i,o,a,u){return new yw(i,o,a,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return t=this.localStore,r=this.datastore,s=e.asyncQueue,i=a=>xc(this.syncEngine,a,0),o=Sc.D()?new Sc:new hw,new vw(t,r,s,i,o);var t,r,s,i,o}createSyncEngine(e,t){return function(r,s,i,o,a,u,c){const l=new Pw(r,s,i,o,a,u);return c&&(l.vc=!0),l}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){const t=I(e);y("RemoteStore","RemoteStore shutting down."),t.vu.add(5),await Ln(t),t.Pu.shutdown(),t.bu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nc(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Sc(this.observer.next,e)}error(e){this.observer.error?this.Sc(this.observer.error,e):X("Uncaught Error in snapshot listener:",e.toString())}Dc(){this.muted=!0}Sc(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rv{constructor(e,t){this.Cc=e,this.serializer=t,this.metadata=new ae,this.buffer=new Uint8Array,this.xc=new TextDecoder("utf-8"),this.Nc().then(r=>{r&&r.Qu()?this.metadata.resolve(r.Gu.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.Gu)}`))},r=>this.metadata.reject(r))}close(){return this.Cc.cancel()}async getMetadata(){return this.metadata.promise}async bc(){return await this.getMetadata(),this.Nc()}async Nc(){const e=await this.kc();if(e===null)return null;const t=this.xc.decode(e),r=Number(t);isNaN(r)&&this.Mc(`length string (${t}) is not valid number`);const s=await this.$c(r);return new Ow(JSON.parse(s),e.length+r)}Oc(){return this.buffer.findIndex(e=>e===123)}async kc(){for(;this.Oc()<0&&!await this.Fc(););if(this.buffer.length===0)return null;const e=this.Oc();e<0&&this.Mc("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async $c(e){for(;this.buffer.length<e;)await this.Fc()&&this.Mc("Reached the end of bundle when more is expected.");const t=this.xc.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}Mc(e){throw this.Cc.cancel(),new Error(`Invalid bundle format: ${e}`)}async Fc(){const e=await this.Cc.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new p(m.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");const t=await async function(r,s){const i=I(r),o=Ir(i.serializer)+"/documents",a={documents:s.map(h=>vr(i.serializer,h))},u=await i.vo("BatchGetDocuments",o,a,s.length),c=new Map;u.forEach(h=>{const d=Sy(i.serializer,h);c.set(d.key.toString(),d)});const l=[];return s.forEach(h=>{const d=c.get(h.toString());_(!!d),l.push(d)}),l}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastWriteError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Fn(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{const s=v.fromPath(r);this.mutations.push(new da(s,this.precondition(s)))}),await async function(t,r){const s=I(t),i=Ir(s.serializer)+"/documents",o={writes:r.map(a=>Er(s.serializer,a))};await s.Io("Commit",i,o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw T();t=S.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new p(m.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(S.min())?z.exists(!1):z.updateTime(t):z.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(S.min()))throw new p(m.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return z.updateTime(t)}return z.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iv{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.Bc=r.maxAttempts,this.qo=new Ca(this.asyncQueue,"transaction_retry")}run(){this.Bc-=1,this.Lc()}Lc(){this.qo.No(async()=>{const e=new sv(this.datastore),t=this.qc(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(s=>{this.Uc(s)}))}).catch(r=>{this.Uc(r)})})}qc(e){try{const t=this.updateFunction(e);return!Mr(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Uc(e){this.Bc>0&&this.Kc(e)?(this.Bc-=1,this.asyncQueue.enqueueAndForget(()=>(this.Lc(),Promise.resolve()))):this.deferred.reject(e)}Kc(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Kh(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(e,t,r,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=oe.UNAUTHENTICATED,this.clientId=ah.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async i=>{y("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(r,i=>(y("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new p(m.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ae;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Bn(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function hs(n,e){n.asyncQueue.verifyOperationInProgress(),y("FirestoreClient","Initializing OfflineComponentProvider");const t=await n.getConfiguration();await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Ed(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Do(n,e){n.asyncQueue.verifyOperationInProgress();const t=await ja(n);y("FirestoreClient","Initializing OnlineComponentProvider");const r=await n.getConfiguration();await e.initialize(t,r),n.setCredentialChangeListener(s=>_c(e.remoteStore,s)),n.setAppCheckTokenChangeListener((s,i)=>_c(e.remoteStore,i)),n._onlineComponents=e}function jd(n){return n.name==="FirebaseError"?n.code===m.FAILED_PRECONDITION||n.code===m.UNIMPLEMENTED:!(typeof DOMException<"u"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function ja(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){y("FirestoreClient","Using user provided OfflineComponentProvider");try{await hs(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!jd(t))throw t;Le("Error using user provided cache. Falling back to memory cache: "+t),await hs(n,new _o)}}else y("FirestoreClient","Using default OfflineComponentProvider"),await hs(n,new _o);return n._offlineComponents}async function di(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(y("FirestoreClient","Using user provided OnlineComponentProvider"),await Do(n,n._uninitializedComponentsProvider._online)):(y("FirestoreClient","Using default OnlineComponentProvider"),await Do(n,new qa))),n._onlineComponents}function zd(n){return ja(n).then(e=>e.persistence)}function za(n){return ja(n).then(e=>e.localStore)}function Gd(n){return di(n).then(e=>e.remoteStore)}function Ga(n){return di(n).then(e=>e.syncEngine)}function av(n){return di(n).then(e=>e.datastore)}async function xn(n){const e=await di(n),t=e.eventManager;return t.onListen=Vw.bind(null,e.syncEngine),t.onUnlisten=Bw.bind(null,e.syncEngine),t}function uv(n){return n.asyncQueue.enqueue(async()=>{const e=await zd(n),t=await Gd(n);return e.setNetworkEnabled(!0),function(r){const s=I(r);return s.vu.delete(0),qr(s)}(t)})}function cv(n){return n.asyncQueue.enqueue(async()=>{const e=await zd(n),t=await Gd(n);return e.setNetworkEnabled(!1),async function(r){const s=I(r);s.vu.add(0),await Ln(s),s.bu.set("Offline")}(t)})}function lv(n,e){const t=new ae;return n.asyncQueue.enqueueAndForget(async()=>async function(r,s,i){try{const o=await function(a,u){const c=I(a);return c.persistence.runTransaction("read document","readonly",l=>c.localDocuments.getDocument(l,u))}(r,s);o.isFoundDocument()?i.resolve(o):o.isNoDocument()?i.resolve(null):i.reject(new p(m.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(o){const a=Bn(o,`Failed to get document '${s} from cache`);i.reject(a)}}(await za(n),e,t)),t.promise}function Kd(n,e,t={}){const r=new ae;return n.asyncQueue.enqueueAndForget(async()=>function(s,i,o,a,u){const c=new hi({next:h=>{i.enqueueAndForget(()=>Oa(s,l));const d=h.docs.has(o);!d&&h.fromCache?u.reject(new p(m.UNAVAILABLE,"Failed to get document because the client is offline.")):d&&h.fromCache&&a&&a.source==="server"?u.reject(new p(m.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(h)},error:h=>u.reject(h)}),l=new Fa(On(o.path),c,{includeMetadataChanges:!0,Ku:!0});return Ra(s,l)}(await xn(n),n.asyncQueue,e,t,r)),r.promise}function hv(n,e){const t=new ae;return n.asyncQueue.enqueueAndForget(async()=>async function(r,s,i){try{const o=await Rs(r,s,!0),a=new Vd(s,o.ir),u=a.sc(o.documents),c=a.applyChanges(u,!1);i.resolve(c.snapshot)}catch(o){const a=Bn(o,`Failed to execute query '${s} against cache`);i.reject(a)}}(await za(n),e,t)),t.promise}function Qd(n,e,t={}){const r=new ae;return n.asyncQueue.enqueueAndForget(async()=>function(s,i,o,a,u){const c=new hi({next:h=>{i.enqueueAndForget(()=>Oa(s,l)),h.fromCache&&a.source==="server"?u.reject(new p(m.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(h)},error:h=>u.reject(h)}),l=new Fa(o,c,{includeMetadataChanges:!0,Ku:!0});return Ra(s,l)}(await xn(n),n.asyncQueue,e,t,r)),r.promise}function dv(n,e){const t=new hi(e);return n.asyncQueue.enqueueAndForget(async()=>function(r,s){I(r).ku.add(s),s.next()}(await xn(n),t)),()=>{t.Dc(),n.asyncQueue.enqueueAndForget(async()=>function(r,s){I(r).ku.delete(s)}(await xn(n),t))}}function fv(n,e,t,r){const s=function(i,o){let a;return a=typeof i=="string"?Hh().encode(i):i,function(u,c){return new rv(u,c)}(function(u,c){if(u instanceof Uint8Array)return Nc(u,c);if(u instanceof ArrayBuffer)return Nc(new Uint8Array(u),c);if(u instanceof ReadableStream)return u.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(a),o)}(t,Ur(e));n.asyncQueue.enqueueAndForget(async()=>{tv(await Ga(n),s,r)})}function mv(n,e){return n.asyncQueue.enqueue(async()=>function(t,r){const s=I(t);return s.persistence.runTransaction("Get named query","readonly",i=>s.qs.getNamedQuery(i,r))}(await za(n),e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hd(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kc=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ka(n,e,t){if(!t)throw new p(m.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Wd(n,e,t,r){if(e===!0&&r===!0)throw new p(m.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Rc(n){if(!v.isDocumentKey(n))throw new p(m.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Oc(n){if(v.isDocumentKey(n))throw new p(m.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function fi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(t){return t.constructor?t.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":T()}function M(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new p(m.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=fi(n);throw new p(m.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Yd(n,e){if(e<=0)throw new p(m.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new p(m.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.cache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new p(m.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Wd("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Hd((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new p(m.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new p(m.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new p(m.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,r=e.experimentalLongPollingOptions,t.timeoutSeconds===r.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var t,r}}class jr{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Mc({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new p(m.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new p(m.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Mc(e),e.credentials!==void 0&&(this._authCredentials=function(t){if(!t)return new mp;switch(t.type){case"firstParty":return new wp(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new p(m.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=kc.get(e);t&&(y("ComponentProvider","Removing Datastore"),kc.delete(e),t.terminate())}(this),Promise.resolve()}}function gv(n,e,t,r={}){var s;const i=(n=M(n,jr))._getSettings();if(i.host!=="firestore.googleapis.com"&&i.host!==e&&Le("Host has been set in both settings() and useEmulator(), emulator host will be used"),n._setSettings(Object.assign(Object.assign({},i),{host:`${e}:${t}`,ssl:!1})),r.mockUserToken){let o,a;if(typeof r.mockUserToken=="string")o=r.mockUserToken,a=oe.MOCK_USER;else{o=Rf(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const u=r.mockUserToken.sub||r.mockUserToken.user_id;if(!u)throw new p(m.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");a=new oe(u)}n._authCredentials=new gp(new oh(o,a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new qe(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new q(this.firestore,e,this._key)}}class pe{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new pe(this.firestore,e,this._query)}}class qe extends pe{constructor(e,t,r){super(e,t,On(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new q(this.firestore,null,new v(e))}withConverter(e){return new qe(this.firestore,e,this._path)}}function Xd(n,e,...t){if(n=ne(n),Ka("collection","path",e),n instanceof jr){const r=R.fromString(e,...t);return Oc(r),new qe(n,null,r)}{if(!(n instanceof q||n instanceof qe))throw new p(m.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(R.fromString(e,...t));return Oc(r),new qe(n.firestore,null,r)}}function pv(n,e){if(n=M(n,jr),Ka("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new p(m.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new pe(n,null,function(t){return new Xe(R.emptyPath(),t)}(e))}function Ls(n,e,...t){if(n=ne(n),arguments.length===1&&(e=ah.A()),Ka("doc","path",e),n instanceof jr){const r=R.fromString(e,...t);return Rc(r),new q(n,null,new v(r))}{if(!(n instanceof q||n instanceof qe))throw new p(m.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(R.fromString(e,...t));return Rc(r),new q(n.firestore,n instanceof qe?n.converter:null,new v(r))}}function Jd(n,e){return n=ne(n),e=ne(e),(n instanceof q||n instanceof qe)&&(e instanceof q||e instanceof qe)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function Zd(n,e){return n=ne(n),e=ne(e),n instanceof pe&&e instanceof pe&&n.firestore===e.firestore&&Lr(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yv{constructor(){this.Gc=Promise.resolve(),this.Qc=[],this.jc=!1,this.zc=[],this.Wc=null,this.Hc=!1,this.Jc=!1,this.Yc=[],this.qo=new Ca(this,"async_queue_retry"),this.Xc=()=>{const t=ls();t&&y("AsyncQueue","Visibility state changed to "+t.visibilityState),this.qo.Mo()};const e=ls();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Xc)}get isShuttingDown(){return this.jc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Zc(),this.ta(e)}enterRestrictedMode(e){if(!this.jc){this.jc=!0,this.Jc=e||!1;const t=ls();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Xc)}}enqueue(e){if(this.Zc(),this.jc)return new Promise(()=>{});const t=new ae;return this.ta(()=>this.jc&&this.Jc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qc.push(e),this.ea()))}async ea(){if(this.Qc.length!==0){try{await this.Qc[0](),this.Qc.shift(),this.qo.reset()}catch(e){if(!bt(e))throw e;y("AsyncQueue","Operation failed with retryable error: "+e)}this.Qc.length>0&&this.qo.No(()=>this.ea())}}ta(e){const t=this.Gc.then(()=>(this.Hc=!0,e().catch(r=>{this.Wc=r,this.Hc=!1;const s=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(r);throw X("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.Hc=!1,r))));return this.Gc=t,t}enqueueAfterDelay(e,t,r){this.Zc(),this.Yc.indexOf(e)>-1&&(t=0);const s=ka.createAndSchedule(this,e,t,r,i=>this.na(i));return this.zc.push(s),s}Zc(){this.Wc&&T()}verifyOperationInProgress(){}async sa(){let e;do e=this.Gc,await e;while(e!==this.Gc)}ia(e){for(const t of this.zc)if(t.timerId===e)return!0;return!1}ra(e){return this.sa().then(()=>{this.zc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.zc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.sa()})}oa(e){this.Yc.push(e)}na(e){const t=this.zc.indexOf(e);this.zc.splice(t,1)}}function Co(n){return function(e,t){if(typeof e!="object"||e===null)return!1;const r=e;for(const s of t)if(s in r&&typeof r[s]=="function")return!0;return!1}(n,["next","error","complete"])}class wv{constructor(){this._progressObserver={},this._taskCompletionResolver=new ae,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vv=-1;class Y extends jr{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new yv,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||ef(this),this._firestoreClient.terminate()}}function he(n){return n._firestoreClient||ef(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function ef(n){var e,t,r;const s=n._freezeSettings(),i=function(o,a,u,c){return new Hp(o,a,u,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,Hd(c.experimentalLongPollingOptions),c.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._firestoreClient=new ov(n._authCredentials,n._appCheckCredentials,n._queue,i),!((t=s.cache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.cache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:s.cache.kind,_offline:s.cache._offlineComponentProvider,_online:s.cache._onlineComponentProvider})}function Iv(n,e){nf(n=M(n,Y));const t=he(n);if(t._uninitializedComponentsProvider)throw new p(m.FAILED_PRECONDITION,"SDK cache is already specified.");Le("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const r=n._freezeSettings(),s=new qa;return tf(t,s,new qd(s,r.cacheSizeBytes,e==null?void 0:e.forceOwnership))}function Ev(n){nf(n=M(n,Y));const e=he(n);if(e._uninitializedComponentsProvider)throw new p(m.FAILED_PRECONDITION,"SDK cache is already specified.");Le("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings(),r=new qa;return tf(e,r,new nv(r,t.cacheSizeBytes))}function tf(n,e,t){const r=new ae;return n.asyncQueue.enqueue(async()=>{try{await hs(n,t),await Do(n,e),r.resolve()}catch(s){const i=s;if(!jd(i))throw i;Le("Error enabling indexeddb cache. Falling back to memory cache: "+i),r.reject(i)}}).then(()=>r.promise)}function bv(n){if(n._initialized&&!n._terminated)throw new p(m.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new ae;return n._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(t){if(!Me.D())return Promise.resolve();const r=t+"main";await Me.delete(r)}(Sa(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function Tv(n){return function(e){const t=new ae;return e.asyncQueue.enqueueAndForget(async()=>zw(await Ga(e),t)),t.promise}(he(n=M(n,Y)))}function Sv(n){return uv(he(n=M(n,Y)))}function _v(n){return cv(he(n=M(n,Y)))}function Dv(n,e){const t=he(n=M(n,Y)),r=new wv;return fv(t,n._databaseId,e,r),r}function Cv(n,e){return mv(he(n=M(n,Y)),e).then(t=>t?new pe(n,null,t.query):null)}function nf(n){if(n._initialized||n._terminated)throw new p(m.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ze(se.fromBase64String(e))}catch(t){throw new p(m.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ze(se.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new p(m.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new J(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new p(m.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new p(m.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return x(this._lat,e._lat)||x(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xv=/^__.*__$/;class Av{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Je(e,this.data,this.fieldMask,t,this.fieldTransforms):new Mn(e,this.data,t,this.fieldTransforms)}}class rf{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Je(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function sf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw T()}}class gi{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.ua(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get ca(){return this.settings.ca}aa(e){return new gi(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ha(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.aa({path:r,la:!1});return s.fa(e),s}da(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.aa({path:r,la:!1});return s.ua(),s}wa(e){return this.aa({path:void 0,la:!0})}_a(e){return Ps(e,this.settings.methodName,this.settings.ma||!1,this.path,this.settings.ga)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}ua(){if(this.path)for(let e=0;e<this.path.length;e++)this.fa(this.path.get(e))}fa(e){if(e.length===0)throw this._a("Document fields must not be empty");if(sf(this.ca)&&xv.test(e))throw this._a('Document fields cannot begin and end with "__"')}}class Nv{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ur(e)}ya(e,t,r,s=!1){return new gi({ca:e,methodName:t,ga:r,path:J.emptyPath(),la:!1,ma:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function tn(n){const e=n._freezeSettings(),t=Ur(n._databaseId);return new Nv(n._databaseId,!!e.ignoreUndefinedProperties,t)}function pi(n,e,t,r,s,i={}){const o=n.ya(i.merge||i.mergeFields?2:0,e,t,s);Ya("Data must be an object, but it was:",o,r);const a=uf(r,o);let u,c;if(i.merge)u=new Ce(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const l=[];for(const h of i.mergeFields){const d=xo(e,h,t);if(!o.contains(d))throw new p(m.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);lf(l,d)||l.push(d)}u=new Ce(l),c=o.fieldTransforms.filter(h=>u.covers(h.field))}else u=null,c=o.fieldTransforms;return new Av(new me(a),u,c)}class zr extends en{_toFieldTransform(e){if(e.ca!==2)throw e.ca===1?e._a(`${this._methodName}() can only appear at the top level of your update data`):e._a(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof zr}}function of(n,e,t){return new gi({ca:3,ga:e.settings.ga,methodName:n._methodName,la:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Qa extends en{_toFieldTransform(e){return new Vr(e.path,new En)}isEqual(e){return e instanceof Qa}}class kv extends en{constructor(e,t){super(e),this.pa=t}_toFieldTransform(e){const t=of(this,e,!0),r=this.pa.map(i=>nn(i,t)),s=new Gt(r);return new Vr(e.path,s)}isEqual(e){return this===e}}class Rv extends en{constructor(e,t){super(e),this.pa=t}_toFieldTransform(e){const t=of(this,e,!0),r=this.pa.map(i=>nn(i,t)),s=new Kt(r);return new Vr(e.path,s)}isEqual(e){return this===e}}class Ov extends en{constructor(e,t){super(e),this.Ia=t}_toFieldTransform(e){const t=new bn(e.serializer,Bh(e.serializer,this.Ia));return new Vr(e.path,t)}isEqual(e){return this===e}}function Ha(n,e,t,r){const s=n.ya(1,e,t);Ya("Data must be an object, but it was:",s,r);const i=[],o=me.empty();Zt(r,(u,c)=>{const l=Xa(e,u,t);c=ne(c);const h=s.da(l);if(c instanceof zr)i.push(l);else{const d=nn(c,h);d!=null&&(i.push(l),o.set(l,d))}});const a=new Ce(i);return new rf(o,a,s.fieldTransforms)}function Wa(n,e,t,r,s,i){const o=n.ya(1,e,t),a=[xo(e,r,t)],u=[s];if(i.length%2!=0)throw new p(m.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(xo(e,i[d])),u.push(i[d+1]);const c=[],l=me.empty();for(let d=a.length-1;d>=0;--d)if(!lf(c,a[d])){const g=a[d];let w=u[d];w=ne(w);const b=o.da(g);if(w instanceof zr)c.push(g);else{const D=nn(w,b);D!=null&&(c.push(g),l.set(g,D))}}const h=new Ce(c);return new rf(l,h,o.fieldTransforms)}function af(n,e,t,r=!1){return nn(t,n.ya(r?4:3,e))}function nn(n,e){if(cf(n=ne(n)))return Ya("Unsupported field value:",e,n),uf(n,e);if(n instanceof en)return function(t,r){if(!sf(r.ca))throw r._a(`${t._methodName}() can only be used with update() and set()`);if(!r.path)throw r._a(`${t._methodName}() is not currently supported inside arrays`);const s=t._toFieldTransform(r);s&&r.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.la&&e.ca!==4)throw e._a("Nested arrays are not supported");return function(t,r){const s=[];let i=0;for(const o of t){let a=nn(o,r.wa(i));a==null&&(a={nullValue:"NULL_VALUE"}),s.push(a),i++}return{arrayValue:{values:s}}}(n,e)}return function(t,r){if((t=ne(t))===null)return{nullValue:"NULL_VALUE"};if(typeof t=="number")return Bh(r.serializer,t);if(typeof t=="boolean")return{booleanValue:t};if(typeof t=="string")return{stringValue:t};if(t instanceof Date){const s=G.fromDate(t);return{timestampValue:Tn(r.serializer,s)}}if(t instanceof G){const s=new G(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Tn(r.serializer,s)}}if(t instanceof mi)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof ze)return{bytesValue:Xh(r.serializer,t._byteString)};if(t instanceof q){const s=r.databaseId,i=t.firestore._databaseId;if(!i.isEqual(s))throw r._a(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:wa(t.firestore._databaseId||r.databaseId,t._key.path)}}throw r._a(`Unsupported field value: ${fi(t)}`)}(n,e)}function uf(n,e){const t={};return vh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Zt(n,(r,s)=>{const i=nn(s,e.ha(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function cf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof G||n instanceof mi||n instanceof ze||n instanceof q||n instanceof en)}function Ya(n,e,t){if(!cf(t)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(t)){const r=fi(t);throw r==="an object"?e._a(n+" a custom object"):e._a(n+" "+r)}}function xo(n,e,t){if((e=ne(e))instanceof yt)return e._internalPath;if(typeof e=="string")return Xa(n,e);throw Ps("Field path arguments must be of type string or ",n,!1,void 0,t)}const Mv=new RegExp("[~\\*/\\[\\]]");function Xa(n,e,t){if(e.search(Mv)>=0)throw Ps(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new yt(...e.split("."))._internalPath}catch{throw Ps(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ps(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new p(m.INVALID_ARGUMENT,a+n+u)}function lf(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new q(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Fv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(yi("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Fv extends Tr{data(){return super.data()}}function yi(n,e){return typeof e=="string"?Xa(n,e):e instanceof yt?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new p(m.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ja{}class Gr extends Ja{}function nt(n,e,...t){let r=[];e instanceof Ja&&r.push(e),r=r.concat(t),function(s){const i=s.filter(a=>a instanceof Za).length,o=s.filter(a=>a instanceof wi).length;if(i>1||i>0&&o>0)throw new p(m.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class wi extends Gr{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new wi(e,t,r)}_apply(e){const t=this._parse(e);return ff(e._query,t),new pe(e.firestore,e.converter,mo(e._query,t))}_parse(e){const t=tn(e.firestore);return function(s,i,o,a,u,c,l){let h;if(u.isKeyField()){if(c==="array-contains"||c==="array-contains-any")throw new p(m.INVALID_ARGUMENT,`Invalid Query. You can't perform '${c}' queries on documentId().`);if(c==="in"||c==="not-in"){Lc(l,c);const d=[];for(const g of l)d.push(Fc(a,s,g));h={arrayValue:{values:d}}}else h=Fc(a,s,l)}else c!=="in"&&c!=="not-in"&&c!=="array-contains-any"||Lc(l,c),h=af(o,i,l,c==="in"||c==="not-in");return N.create(u,c,h)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Lv(n,e,t){const r=e,s=yi("where",n);return wi._create(s,r,t)}class Za extends Ja{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Za(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:L.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(r,s){let i=r;const o=s.getFlattenedFilters();for(const a of o)ff(i,a),i=mo(i,a)}(e._query,t),new pe(e.firestore,e.converter,mo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class eu extends Gr{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new eu(e,t)}_apply(e){const t=function(r,s,i){if(r.startAt!==null)throw new p(m.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new p(m.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const o=new mn(s,i);return function(a,u){if(ca(a)===null){const c=si(a);c!==null&&mf(a,c,u.field)}}(r,o),o}(e._query,this._field,this._direction);return new pe(e.firestore,e.converter,function(r,s){const i=r.explicitOrderBy.concat([s]);return new Xe(r.path,r.collectionGroup,i,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,t))}}function Pv(n,e="asc"){const t=e,r=yi("orderBy",n);return eu._create(r,t)}class vi extends Gr{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new vi(e,t,r)}_apply(e){return new pe(e.firestore,e.converter,xs(e._query,this._limit,this._limitType))}}function Vv(n){return Yd("limit",n),vi._create("limit",n,"F")}function Bv(n){return Yd("limitToLast",n),vi._create("limitToLast",n,"L")}class Ii extends Gr{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Ii(e,t,r)}_apply(e){const t=df(e,this.type,this._docOrFields,this._inclusive);return new pe(e.firestore,e.converter,function(r,s){return new Xe(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,s,r.endAt)}(e._query,t))}}function $v(...n){return Ii._create("startAt",n,!0)}function Uv(...n){return Ii._create("startAfter",n,!1)}class Ei extends Gr{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Ei(e,t,r)}_apply(e){const t=df(e,this.type,this._docOrFields,this._inclusive);return new pe(e.firestore,e.converter,function(r,s){return new Xe(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,r.startAt,s)}(e._query,t))}}function qv(...n){return Ei._create("endBefore",n,!1)}function jv(...n){return Ei._create("endAt",n,!0)}function df(n,e,t,r){if(t[0]=ne(t[0]),t[0]instanceof Tr)return function(s,i,o,a,u){if(!a)throw new p(m.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${o}().`);const c=[];for(const l of Bt(s))if(l.field.isKeyField())c.push(jt(i,a.key));else{const h=a.data.field(l.field);if(ri(h))throw new p(m.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+l.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(h===null){const d=l.field.canonicalString();throw new p(m.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${d}' (used as the orderBy) does not exist.`)}c.push(h)}return new gt(c,u)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=tn(n.firestore);return function(i,o,a,u,c,l){const h=i.explicitOrderBy;if(c.length>h.length)throw new p(m.INVALID_ARGUMENT,`Too many arguments provided to ${u}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const d=[];for(let g=0;g<c.length;g++){const w=c[g];if(h[g].field.isKeyField()){if(typeof w!="string")throw new p(m.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${u}(), but got a ${typeof w}`);if(!la(i)&&w.indexOf("/")!==-1)throw new p(m.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${u}() must be a plain document ID, but '${w}' contains a slash.`);const b=i.path.child(R.fromString(w));if(!v.isDocumentKey(b))throw new p(m.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${u}() must result in a valid document path, but '${b}' is not because it contains an odd number of segments.`);const D=new v(b);d.push(jt(o,D))}else{const b=af(a,u,w);d.push(b)}}return new gt(d,l)}(n._query,n.firestore._databaseId,s,e,t,r)}}function Fc(n,e,t){if(typeof(t=ne(t))=="string"){if(t==="")throw new p(m.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!la(e)&&t.indexOf("/")!==-1)throw new p(m.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(R.fromString(t));if(!v.isDocumentKey(r))throw new p(m.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return jt(n,new v(r))}if(t instanceof q)return jt(n,t._key);throw new p(m.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${fi(t)}.`)}function Lc(n,e){if(!Array.isArray(n)||n.length===0)throw new p(m.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function ff(n,e){if(e.isInequality()){const r=si(n),s=e.field;if(r!==null&&!r.isEqual(s))throw new p(m.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${r.toString()}' and '${s.toString()}'`);const i=ca(n);i!==null&&mf(n,s,i)}const t=function(r,s){for(const i of r)for(const o of i.getFlattenedFilters())if(s.indexOf(o.op)>=0)return o.op;return null}(n.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new p(m.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new p(m.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function mf(n,e,t){if(!t.isEqual(e))throw new p(m.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${t.toString()}' instead.`)}class tu{convertValue(e,t="none"){switch(qt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return H(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(dt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw T()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Zt(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertGeoPoint(e){return new mi(H(e.latitude),H(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=aa(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(pr(e));default:return null}}convertTimestamp(e){const t=ht(e);return new G(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=R.fromString(e);_(ad(r));const s=new ft(r.get(1),r.get(3)),i=new v(r.popFirst(5));return s.isEqual(t)||X(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bi(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class zv extends tu{constructor(e){super(),this.firestore=e}convertBytes(e){return new ze(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new q(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ye extends Tr{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ir(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(yi("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class ir extends Ye{data(e={}){return super.data(e)}}class wt{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Lt(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new ir(this._firestore,this._userDataWriter,r.key,r,new Lt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new p(m.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(r,s){if(r._snapshot.oldDocs.isEmpty()){let i=0;return r._snapshot.docChanges.map(o=>{const a=new ir(r._firestore,r._userDataWriter,o.doc.key,o.doc,new Lt(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);return o.doc,{type:"added",doc:a,oldIndex:-1,newIndex:i++}})}{let i=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(o=>s||o.type!==3).map(o=>{const a=new ir(r._firestore,r._userDataWriter,o.doc.key,o.doc,new Lt(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);let u=-1,c=-1;return o.type!==0&&(u=i.indexOf(o.doc.key),i=i.delete(o.doc.key)),o.type!==1&&(i=i.add(o.doc),c=i.indexOf(o.doc.key)),{type:Gv(o.type),doc:a,oldIndex:u,newIndex:c}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Gv(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return T()}}function gf(n,e){return n instanceof Ye&&e instanceof Ye?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof wt&&e instanceof wt&&n._firestore===e._firestore&&Zd(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kv(n){n=M(n,q);const e=M(n.firestore,Y);return Kd(he(e),n._key).then(t=>nu(e,n,t))}class rn extends tu{constructor(e){super(),this.firestore=e}convertBytes(e){return new ze(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new q(this.firestore,null,t)}}function Qv(n){n=M(n,q);const e=M(n.firestore,Y),t=he(e),r=new rn(e);return lv(t,n._key).then(s=>new Ye(e,r,n._key,s,new Lt(s!==null&&s.hasLocalMutations,!0),n.converter))}function Hv(n){n=M(n,q);const e=M(n.firestore,Y);return Kd(he(e),n._key,{source:"server"}).then(t=>nu(e,n,t))}function Wv(n){n=M(n,pe);const e=M(n.firestore,Y),t=he(e),r=new rn(e);return hf(n._query),Qd(t,n._query).then(s=>new wt(e,r,n,s))}function Yv(n){n=M(n,pe);const e=M(n.firestore,Y),t=he(e),r=new rn(e);return hv(t,n._query).then(s=>new wt(e,r,n,s))}function Xv(n){n=M(n,pe);const e=M(n.firestore,Y),t=he(e),r=new rn(e);return Qd(t,n._query,{source:"server"}).then(s=>new wt(e,r,n,s))}function Pc(n,e,t){n=M(n,q);const r=M(n.firestore,Y),s=bi(n.converter,e,t);return Kr(r,[pi(tn(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,z.none())])}function Vc(n,e,t,...r){n=M(n,q);const s=M(n.firestore,Y),i=tn(s);let o;return o=typeof(e=ne(e))=="string"||e instanceof yt?Wa(i,"updateDoc",n._key,e,t,r):Ha(i,"updateDoc",n._key,e),Kr(s,[o.toMutation(n._key,z.exists(!0))])}function Jv(n){return Kr(M(n.firestore,Y),[new Fn(n._key,z.none())])}function Zv(n,e){const t=M(n.firestore,Y),r=Ls(n),s=bi(n.converter,e);return Kr(t,[pi(tn(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,z.exists(!1))]).then(()=>r)}function pf(n,...e){var t,r,s;n=ne(n);let i={includeMetadataChanges:!1},o=0;typeof e[o]!="object"||Co(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(Co(e[o])){const h=e[o];e[o]=(t=h.next)===null||t===void 0?void 0:t.bind(h),e[o+1]=(r=h.error)===null||r===void 0?void 0:r.bind(h),e[o+2]=(s=h.complete)===null||s===void 0?void 0:s.bind(h)}let u,c,l;if(n instanceof q)c=M(n.firestore,Y),l=On(n._key.path),u={next:h=>{e[o]&&e[o](nu(c,n,h))},error:e[o+1],complete:e[o+2]};else{const h=M(n,pe);c=M(h.firestore,Y),l=h._query;const d=new rn(c);u={next:g=>{e[o]&&e[o](new wt(c,d,h,g))},error:e[o+1],complete:e[o+2]},hf(n._query)}return function(h,d,g,w){const b=new hi(w),D=new Fa(d,b,g);return h.asyncQueue.enqueueAndForget(async()=>Ra(await xn(h),D)),()=>{b.Dc(),h.asyncQueue.enqueueAndForget(async()=>Oa(await xn(h),D))}}(he(c),l,a,u)}function eI(n,e){return dv(he(n=M(n,Y)),Co(e)?e:{next:e})}function Kr(n,e){return function(t,r){const s=new ae;return t.asyncQueue.enqueueAndForget(async()=>$w(await Ga(t),r,s)),s.promise}(he(n),e)}function nu(n,e,t){const r=t.docs.get(e._key),s=new rn(n);return new Ye(n,s,e._key,r,new Lt(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tI={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nI{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=tn(e)}set(e,t,r){this._verifyNotCommitted();const s=st(e,this._firestore),i=bi(s.converter,t,r),o=pi(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(o.toMutation(s._key,z.none())),this}update(e,t,r,...s){this._verifyNotCommitted();const i=st(e,this._firestore);let o;return o=typeof(t=ne(t))=="string"||t instanceof yt?Wa(this._dataReader,"WriteBatch.update",i._key,t,r,s):Ha(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,z.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=st(e,this._firestore);return this._mutations=this._mutations.concat(new Fn(t._key,z.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new p(m.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function st(n,e){if((n=ne(n)).firestore!==e)throw new p(m.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI extends class{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=tn(e)}get(e){const t=st(e,this._firestore),r=new zv(this._firestore);return this._transaction.lookup([t._key]).then(s=>{if(!s||s.length!==1)return T();const i=s[0];if(i.isFoundDocument())return new Tr(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new Tr(this._firestore,r,t._key,null,t.converter);throw T()})}set(e,t,r){const s=st(e,this._firestore),i=bi(s.converter,t,r),o=pi(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,o),this}update(e,t,r,...s){const i=st(e,this._firestore);let o;return o=typeof(t=ne(t))=="string"||t instanceof yt?Wa(this._dataReader,"Transaction.update",i._key,t,r,s):Ha(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,o),this}delete(e){const t=st(e,this._firestore);return this._transaction.delete(t._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=st(e,this._firestore),r=new rn(this._firestore);return super.get(e).then(s=>new Ye(this._firestore,r,t._key,s._document,new Lt(!1,!1),t.converter))}}function sI(n,e,t){n=M(n,Y);const r=Object.assign(Object.assign({},tI),t);return function(s){if(s.maxAttempts<1)throw new p(m.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(s,i,o){const a=new ae;return s.asyncQueue.enqueueAndForget(async()=>{const u=await av(s);new iv(s.asyncQueue,u,o,i,a).run()}),a.promise}(he(n),s=>e(new rI(n,s)),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iI(){return new zr("deleteField")}function oI(){return new Qa("serverTimestamp")}function aI(...n){return new kv("arrayUnion",n)}function uI(...n){return new Rv("arrayRemove",n)}function cI(n){return new Ov("increment",n)}(function(n,e=!0){(function(t){Rn=t})(Fo),pn(new $t("firestore",(t,{instanceIdentifier:r,options:s})=>{const i=t.getProvider("app").getImmediate(),o=new Y(new pp(t.getProvider("auth-internal")),new Ip(t.getProvider("app-check-internal")),function(a,u){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new p(m.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ft(a.options.projectId,u)}(i,r),i);return s=Object.assign({useFetchStreams:e},s),o._setSettings(s),o},"PUBLIC").setMultipleInstances(!0)),at(Ou,"3.12.0",n),at(Ou,"3.12.0","esm2017")})();const lI="@firebase/firestore-compat",hI="0.3.9";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ru(n,e){if(e===void 0)return{merge:!1};if(e.mergeFields!==void 0&&e.merge!==void 0)throw new p("invalid-argument",`Invalid options passed to function ${n}(): You cannot specify both "merge" and "mergeFields".`);return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bc(){if(typeof Uint8Array>"u")throw new p("unimplemented","Uint8Arrays are not available in this environment.")}function $c(){if(!Kp())throw new p("unimplemented","Blobs are unavailable in Firestore in this environment.")}class Sr{constructor(e){this._delegate=e}static fromBase64String(e){return $c(),new Sr(ze.fromBase64String(e))}static fromUint8Array(e){return Bc(),new Sr(ze.fromUint8Array(e))}toBase64(){return $c(),this._delegate.toBase64()}toUint8Array(){return Bc(),this._delegate.toUint8Array()}isEqual(e){return this._delegate.isEqual(e._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ao(n){return dI(n,["next","error","complete"])}function dI(n,e){if(typeof n!="object"||n===null)return!1;const t=n;for(const r of e)if(r in t&&typeof t[r]=="function")return!0;return!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{enableIndexedDbPersistence(e,t){return Iv(e._delegate,{forceOwnership:t})}enableMultiTabIndexedDbPersistence(e){return Ev(e._delegate)}clearIndexedDbPersistence(e){return bv(e._delegate)}}class yf{constructor(e,t,r){this._delegate=t,this._persistenceProvider=r,this.INTERNAL={delete:()=>this.terminate()},e instanceof ft||(this._appCompat=e)}get _databaseId(){return this._delegate._databaseId}settings(e){const t=this._delegate._getSettings();!e.merge&&t.host!==e.host&&Le("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."),e.merge&&(e=Object.assign(Object.assign({},t),e),delete e.merge),this._delegate._setSettings(e)}useEmulator(e,t,r={}){gv(this._delegate,e,t,r)}enableNetwork(){return Sv(this._delegate)}disableNetwork(){return _v(this._delegate)}enablePersistence(e){let t=!1,r=!1;return e&&(t=!!e.synchronizeTabs,r=!!e.experimentalForceOwningTab,Wd("synchronizeTabs",t,"experimentalForceOwningTab",r)),t?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,r)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore-compat"),this._appCompat._removeServiceInstance("firestore")),this._delegate._delete()}waitForPendingWrites(){return Tv(this._delegate)}onSnapshotsInSync(e){return eI(this._delegate,e)}get app(){if(!this._appCompat)throw new p("failed-precondition","Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(e){try{return new An(this,Xd(this._delegate,e))}catch(t){throw Ee(t,"collection()","Firestore.collection()")}}doc(e){try{return new Oe(this,Ls(this._delegate,e))}catch(t){throw Ee(t,"doc()","Firestore.doc()")}}collectionGroup(e){try{return new Ie(this,pv(this._delegate,e))}catch(t){throw Ee(t,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(e){return sI(this._delegate,t=>e(new wf(this,t)))}batch(){return he(this._delegate),new vf(new nI(this._delegate,e=>Kr(this._delegate,e)))}loadBundle(e){return Dv(this._delegate,e)}namedQuery(e){return Cv(this._delegate,e).then(t=>t?new Ie(this,t):null)}}class Ti extends tu{constructor(e){super(),this.firestore=e}convertBytes(e){return new Sr(new ze(e))}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return Oe.forKey(t,this.firestore,null)}}function mI(n){dp(n)}class wf{constructor(e,t){this._firestore=e,this._delegate=t,this._userDataWriter=new Ti(e)}get(e){const t=Pt(e);return this._delegate.get(t).then(r=>new _r(this._firestore,new Ye(this._firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,t.converter)))}set(e,t,r){const s=Pt(e);return r?(ru("Transaction.set",r),this._delegate.set(s,t,r)):this._delegate.set(s,t),this}update(e,t,r,...s){const i=Pt(e);return arguments.length===2?this._delegate.update(i,t):this._delegate.update(i,t,r,...s),this}delete(e){const t=Pt(e);return this._delegate.delete(t),this}}class vf{constructor(e){this._delegate=e}set(e,t,r){const s=Pt(e);return r?(ru("WriteBatch.set",r),this._delegate.set(s,t,r)):this._delegate.set(s,t),this}update(e,t,r,...s){const i=Pt(e);return arguments.length===2?this._delegate.update(i,t):this._delegate.update(i,t,r,...s),this}delete(e){const t=Pt(e);return this._delegate.delete(t),this}commit(){return this._delegate.commit()}}class Yt{constructor(e,t,r){this._firestore=e,this._userDataWriter=t,this._delegate=r}fromFirestore(e,t){const r=new ir(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,null);return this._delegate.fromFirestore(new Dr(this._firestore,r),t??{})}toFirestore(e,t){return t?this._delegate.toFirestore(e,t):this._delegate.toFirestore(e)}static getInstance(e,t){const r=Yt.INSTANCES;let s=r.get(e);s||(s=new WeakMap,r.set(e,s));let i=s.get(t);return i||(i=new Yt(e,new Ti(e),t),s.set(t,i)),i}}Yt.INSTANCES=new WeakMap;class Oe{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new Ti(e)}static forPath(e,t,r){if(e.length%2!==0)throw new p("invalid-argument",`Invalid document reference. Document references must have an even number of segments, but ${e.canonicalString()} has ${e.length}`);return new Oe(t,new q(t._delegate,r,new v(e)))}static forKey(e,t,r){return new Oe(t,new q(t._delegate,r,e))}get id(){return this._delegate.id}get parent(){return new An(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(e){try{return new An(this.firestore,Xd(this._delegate,e))}catch(t){throw Ee(t,"collection()","DocumentReference.collection()")}}isEqual(e){return e=ne(e),e instanceof q?Jd(this._delegate,e):!1}set(e,t){t=ru("DocumentReference.set",t);try{return t?Pc(this._delegate,e,t):Pc(this._delegate,e)}catch(r){throw Ee(r,"setDoc()","DocumentReference.set()")}}update(e,t,...r){try{return arguments.length===1?Vc(this._delegate,e):Vc(this._delegate,e,t,...r)}catch(s){throw Ee(s,"updateDoc()","DocumentReference.update()")}}delete(){return Jv(this._delegate)}onSnapshot(...e){const t=If(e),r=Ef(e,s=>new _r(this.firestore,new Ye(this.firestore._delegate,this._userDataWriter,s._key,s._document,s.metadata,this._delegate.converter)));return pf(this._delegate,t,r)}get(e){let t;return(e==null?void 0:e.source)==="cache"?t=Qv(this._delegate):(e==null?void 0:e.source)==="server"?t=Hv(this._delegate):t=Kv(this._delegate),t.then(r=>new _r(this.firestore,new Ye(this.firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,this._delegate.converter)))}withConverter(e){return new Oe(this.firestore,e?this._delegate.withConverter(Yt.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function Ee(n,e,t){return n.message=n.message.replace(e,t),n}function If(n){for(const e of n)if(typeof e=="object"&&!Ao(e))return e;return{}}function Ef(n,e){var t,r;let s;return Ao(n[0])?s=n[0]:Ao(n[1])?s=n[1]:typeof n[0]=="function"?s={next:n[0],error:n[1],complete:n[2]}:s={next:n[1],error:n[2],complete:n[3]},{next:i=>{s.next&&s.next(e(i))},error:(t=s.error)===null||t===void 0?void 0:t.bind(s),complete:(r=s.complete)===null||r===void 0?void 0:r.bind(s)}}class _r{constructor(e,t){this._firestore=e,this._delegate=t}get ref(){return new Oe(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(e){return this._delegate.data(e)}get(e,t){return this._delegate.get(e,t)}isEqual(e){return gf(this._delegate,e._delegate)}}class Dr extends _r{data(e){const t=this._delegate.data(e);return fp(t!==void 0),t}}class Ie{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new Ti(e)}where(e,t,r){try{return new Ie(this.firestore,nt(this._delegate,Lv(e,t,r)))}catch(s){throw Ee(s,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(e,t){try{return new Ie(this.firestore,nt(this._delegate,Pv(e,t)))}catch(r){throw Ee(r,/(orderBy|where)\(\)/,"Query.$1()")}}limit(e){try{return new Ie(this.firestore,nt(this._delegate,Vv(e)))}catch(t){throw Ee(t,"limit()","Query.limit()")}}limitToLast(e){try{return new Ie(this.firestore,nt(this._delegate,Bv(e)))}catch(t){throw Ee(t,"limitToLast()","Query.limitToLast()")}}startAt(...e){try{return new Ie(this.firestore,nt(this._delegate,$v(...e)))}catch(t){throw Ee(t,"startAt()","Query.startAt()")}}startAfter(...e){try{return new Ie(this.firestore,nt(this._delegate,Uv(...e)))}catch(t){throw Ee(t,"startAfter()","Query.startAfter()")}}endBefore(...e){try{return new Ie(this.firestore,nt(this._delegate,qv(...e)))}catch(t){throw Ee(t,"endBefore()","Query.endBefore()")}}endAt(...e){try{return new Ie(this.firestore,nt(this._delegate,jv(...e)))}catch(t){throw Ee(t,"endAt()","Query.endAt()")}}isEqual(e){return Zd(this._delegate,e._delegate)}get(e){let t;return(e==null?void 0:e.source)==="cache"?t=Yv(this._delegate):(e==null?void 0:e.source)==="server"?t=Xv(this._delegate):t=Wv(this._delegate),t.then(r=>new No(this.firestore,new wt(this.firestore._delegate,this._userDataWriter,this._delegate,r._snapshot)))}onSnapshot(...e){const t=If(e),r=Ef(e,s=>new No(this.firestore,new wt(this.firestore._delegate,this._userDataWriter,this._delegate,s._snapshot)));return pf(this._delegate,t,r)}withConverter(e){return new Ie(this.firestore,e?this._delegate.withConverter(Yt.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}class gI{constructor(e,t){this._firestore=e,this._delegate=t}get type(){return this._delegate.type}get doc(){return new Dr(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class No{constructor(e,t){this._firestore=e,this._delegate=t}get query(){return new Ie(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map(e=>new Dr(this._firestore,e))}docChanges(e){return this._delegate.docChanges(e).map(t=>new gI(this._firestore,t))}forEach(e,t){this._delegate.forEach(r=>{e.call(t,new Dr(this._firestore,r))})}isEqual(e){return gf(this._delegate,e._delegate)}}class An extends Ie{constructor(e,t){super(e,t),this.firestore=e,this._delegate=t}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const e=this._delegate.parent;return e?new Oe(this.firestore,e):null}doc(e){try{return e===void 0?new Oe(this.firestore,Ls(this._delegate)):new Oe(this.firestore,Ls(this._delegate,e))}catch(t){throw Ee(t,"doc()","CollectionReference.doc()")}}add(e){return Zv(this._delegate,e).then(t=>new Oe(this.firestore,t))}isEqual(e){return Jd(this._delegate,e._delegate)}withConverter(e){return new An(this.firestore,e?this._delegate.withConverter(Yt.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function Pt(n){return M(n,q)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(...e){this._delegate=new yt(...e)}static documentId(){return new su(J.keyField().canonicalString())}isEqual(e){return e=ne(e),e instanceof yt?this._delegate._internalPath.isEqual(e._internalPath):!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e){this._delegate=e}static serverTimestamp(){const e=oI();return e._methodName="FieldValue.serverTimestamp",new Ot(e)}static delete(){const e=iI();return e._methodName="FieldValue.delete",new Ot(e)}static arrayUnion(...e){const t=aI(...e);return t._methodName="FieldValue.arrayUnion",new Ot(t)}static arrayRemove(...e){const t=uI(...e);return t._methodName="FieldValue.arrayRemove",new Ot(t)}static increment(e){const t=cI(e);return t._methodName="FieldValue.increment",new Ot(t)}isEqual(e){return this._delegate.isEqual(e._delegate)}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pI={Firestore:yf,GeoPoint:mi,Timestamp:G,Blob:Sr,Transaction:wf,WriteBatch:vf,DocumentReference:Oe,DocumentSnapshot:_r,Query:Ie,QueryDocumentSnapshot:Dr,QuerySnapshot:No,CollectionReference:An,FieldPath:su,FieldValue:Ot,setLogLevel:mI,CACHE_SIZE_UNLIMITED:vv};function yI(n,e){n.INTERNAL.registerComponent(new $t("firestore-compat",t=>{const r=t.getProvider("app-compat").getImmediate(),s=t.getProvider("firestore").getImmediate();return e(r,s)},"PUBLIC").setServiceProps(Object.assign({},pI)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wI(n){yI(n,(e,t)=>new yf(e,t,new fI)),n.registerVersion(lI,hI)}wI(nl);export{$t as C,Vs as E,Xt as F,Oo as L,Fo as S,pn as _,bI as a,EI as b,ne as c,$f as d,F as e,nl as f,vI as g,or as h,II as i,_f as j,DI as k,CI as l,TI as m,SI as n,Of as o,zc as p,_I as q,at as r};
