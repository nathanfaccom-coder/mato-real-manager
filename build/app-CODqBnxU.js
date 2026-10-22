const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./NationalTeams-DvfkwIDK.js","./react-nf7bT_Uh.js","./firebase-927kk_Ef.js","./AdminPanel-DRlf5BOM.js","./getProdCost-BOBAoKhR.js","./TeamDashboard-Dg0Ku_Q4.js","./AttributeGrid-BJ9JViRt.js","./AssistantDashboard-CS79-UAa.js","./VisitorDashboard-BppKCi4l.js","./LeagueTable-DDW6q2hK.js","./MatchCenter-DAMJHTUX.js","./MatchTeamLogo-BsbNf4zN.js","./TournamentHub-CBr-eL5w.js","./Market-C_1lgY-5.js","./getRecommendedPrice-J9S5cFrD.js","./ShoppingScreen-T3oIYVPI.js","./Ranking-B3XC4pPV.js","./PlayerCard-CSN4PBiN.js","./SocialHub-DvZRNc69.js","./OffersScreen-C2aEKA7r.js","./PublicServices-Comg5qMn.js","./CompanyDashboard-aJzBQ3SI.js","./PlayerDashboard-dwWVvU_S.js","./CoachDashboard-hhBsgPj6.js","./DoctorDashboard-COQkj1bX.js","./ScoutDashboard-Bk_TPpcT.js","./PlayerForm-ZlJzwEYQ.js","./TeamRequestPlayerModal-CztH_ZgU.js","./AdminPlayerModal-BNzf3goB.js","./TrainingCenterManager-748B8gDE.js","./OfferForm-h0DccGwh.js","./SettingsForm-CVo5iJPY.js","./MatchPerformanceForm-DECybEUE.js","./TeamStandingsEditor-DJPYNsg_.js","./PrizeEditor-DpiDBtkD.js","./AwardsManager-_Yh3gwY8.js","./TournamentManagerModal-CuKQxS-x.js","./StatsEditor-CNckeEOJ.js","./MatchManagerForm-B4_Kigko.js"])))=>i.map(i=>d[i]);
import{r as Y,a as Tr,R as ue}from"./react-nf7bT_Uh.js";import{f as q,L as Sr,g as br,i as _r,a as sa,_ as qa,C as Gn,r as Ka,b as Ii,S as Ht,E as ra,c as pe,d as Cr,e as vi,h as be,F as Je,j as Rr,q as vt,k as pt,l as Pt,m as Ti,n as Or,o as Si,p as $n}from"./firebase-927kk_Ef.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();var bi={exports:{}},gn={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wr=Y,Nr=Symbol.for("react.element"),Pr=Symbol.for("react.fragment"),xr=Object.prototype.hasOwnProperty,Lr=wr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,kr={key:!0,ref:!0,__self:!0,__source:!0};function _i(t,e,n){var a,i={},r=null,o=null;n!==void 0&&(r=""+n),e.key!==void 0&&(r=""+e.key),e.ref!==void 0&&(o=e.ref);for(a in e)xr.call(e,a)&&!kr.hasOwnProperty(a)&&(i[a]=e[a]);if(t&&t.defaultProps)for(a in e=t.defaultProps,e)i[a]===void 0&&(i[a]=e[a]);return{$$typeof:Nr,type:t,key:r,ref:o,props:i,_owner:Lr.current}}gn.Fragment=Pr;gn.jsx=_i;gn.jsxs=_i;bi.exports=gn;var s=bi.exports,Ci,Za=Tr;Ci=Za.createRoot,Za.hydrateRoot;const Ri=new Set(["USER","PLAYER","COMPANY","PRESS","PRESS_WORKER","COACH","DOCTOR","SCOUT","ASSISTANT"]);function Dr(t=localStorage){var e;try{const n=JSON.parse(t.getItem("user")||"null");return!n||!Ri.has(n.type)||typeof((e=n.data)==null?void 0:e.id)!="string"?null:{type:n.type,data:{id:n.data.id}}}catch{return null}}function Hn(t,e=localStorage){var n;try{Ri.has(t==null?void 0:t.type)&&((n=t.data)!=null&&n.id)?e.setItem("user",JSON.stringify({type:t.type,data:{id:t.data.id}})):e.removeItem("user")}catch{}}function xt(t=localStorage){try{const e=Array.from({length:t.length||0},(n,a)=>t.key(a));for(const n of e)n!=null&&n.startsWith("navigation:")&&t.removeItem(n)}catch{}for(const e of["user","savedScreen","lastRead"])try{t.removeItem(e)}catch{}}function Bn(t,e=localStorage){try{return e.getItem(t)}catch{return null}}function zn(t,e,n=localStorage){try{n.setItem(t,e)}catch{}}const Mr={USER:"teams",PLAYER:"players",COMPANY:"companies",PRESS:"newspapers",PRESS_WORKER:"journalists",COACH:"users",DOCTOR:"users",SCOUT:"users",ASSISTANT:"users"};function Wn(t){return{PLAYER:"PLAYER_DASH",COACH:"COACH_DASH",DOCTOR:"DOCTOR_DASH",SCOUT:"SCOUT_DASH",ASSISTANT:"ASSISTANT_DASH",COMPANY:"COMPANY_DASH",PRESS:"PRESS_DASH",PRESS_WORKER:"PRESS_DASH",VISITOR:"RANKING"}[t]||"HOME"}function Oi(t,e){return["NATIONAL_TEAMS","MATCHES","MARKET","SHOPPING","RANKING","NEWS","SOCIAL","OFFERS","PUBLIC_SERVICES"].includes(e)||e===Wn(t)||e==="SPONSORSHIPS"&&t==="USER"||e==="COMPANY_HOME"&&t==="COMPANY"?e:Wn(t)}function wi(t,e){return`navigation:${t.type}:${t.data.id}:${e}`}function qn(t,e,n=null){return Bn(wi(t,e))??n}function Ya(t,e,n){zn(wi(t,e),n)}class jr extends ue.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,n){console.error("Crash:",e,n)}render(){return this.state.hasError?s.jsxs("div",{className:"error-screen",children:[s.jsx("h2",{children:"Ocorreu um erro!"}),s.jsx("p",{children:"O aplicativo encontrou um problema inesperado."}),s.jsx("button",{className:"btn btn-red",onClick:()=>{xt(),window.location.reload()},children:"REINICIAR APLICATIVO"})]}):this.props.children}}const Fr="modulepreload",Vr=function(t,e){return new URL(t,e).href},Ja={},me=function(e,n,a){let i=Promise.resolve();if(n&&n.length>0){const o=document.getElementsByTagName("link"),u=document.querySelector("meta[property=csp-nonce]"),m=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));i=Promise.allSettled(n.map(O=>{if(O=Vr(O,a),O in Ja)return;Ja[O]=!0;const _=O.endsWith(".css"),N=_?'[rel="stylesheet"]':"";if(!!a)for(let ne=o.length-1;ne>=0;ne--){const G=o[ne];if(G.href===O&&(!_||G.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${O}"]${N}`))return;const Z=document.createElement("link");if(Z.rel=_?"stylesheet":Fr,_||(Z.as="script"),Z.crossOrigin="",Z.href=O,m&&Z.setAttribute("nonce",m),document.head.appendChild(Z),_)return new Promise((ne,G)=>{Z.addEventListener("load",ne),Z.addEventListener("error",()=>G(new Error(`Unable to preload CSS for ${O}`)))})}))}function r(o){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=o,window.dispatchEvent(u),!u.defaultPrevented)throw o}return i.then(o=>{for(const u of o||[])u.status==="rejected"&&r(u.reason);return e().catch(r)})},Bt="NEXLYzsJfLPsTxzp3LKHKwaPhEZ2",Ni=Object.freeze({teams:"Times e jogadores (cadastros, elencos e configurações)",finance:"Finanças e premiações",press:"Imprensa e jornalistas",companies:"Empresas",staff:"Comissão técnica",calendar:"Calendário",competitions:"Campeonatos, partidas e súmulas",nationalTeams:"Seleções, técnicos e convocações"}),An=t=>{var e;return(t==null?void 0:t.type)==="ADMIN"&&((e=t.data)==null?void 0:e.id)===Bt},En=t=>(t==null?void 0:t.type)==="ADMIN"&&!An(t);function Ze(t,e){var n,a;return An(t)||En(t)&&Object.hasOwn(Ni,e)&&((a=(n=t.data)==null?void 0:n.permissions)==null?void 0:a.includes(e))}function yn(t){if(!Array.isArray(t)||t.some(e=>!Object.hasOwn(Ni,e)))throw Error("Permissão inválida.");return[...new Set(t)]}const Ur={TEAM_TABLE:"competitions",POST_NEWS:"press",EDIT_PRIZES:"finance",STATS_SEARCH:"competitions",MATCH_REPORT:"competitions",ADMIN_PLAYER:"teams",PLAYER:"teams",SETTINGS:"teams",STATS:"competitions",TEAM_STANDINGS:"competitions",TOURN_MANAGER:"competitions",MATCH_MANAGER:"competitions",MATCH_PERFORMANCE:"competitions",AWARDS_MANAGER:"finance",PRIZES:"finance"};function Gr(t,e){return!En(t)||!e||["VIEW_LINEUP","VIEW_PLAYER"].includes(e.type)?!0:Ze(t,Ur[e.type])}const $r={approveTeam:"teams",deleteTeam:"teams",savePlayer:"teams",deletePaper:"press",deleteJournalist:"press",postNews:"press",handleFinanceApprove:"finance",updateBalance:"finance",handleSaveMatch:"competitions",handleDeleteMatch:"competitions",generateFixtures:"competitions",saveMatchStats:"competitions",updateTeamStats:"competitions",handleSocialDelete:"press"};function Hr(t,e,n=a=>alert(a)){return En(e)?Object.fromEntries(Object.entries(t).map(([a,i])=>[a,(...r)=>{if(!Ze(e,$r[a])){n("Você não tem permissão para esta função.");return}return i(...r)}])):t}const Br={apiKey:"AIzaSyBrtJFfWAqT0AZYHlm4it-noB5h9jIPJEI",authDomain:"gerenciador-de-times-matoreal.firebaseapp.com",projectId:"gerenciador-de-times-matoreal",storageBucket:"gerenciador-de-times-matoreal.firebasestorage.app",messagingSenderId:"29096266740",appId:"1:29096266740:web:ec48e7225c18c20dbc07a1"};q.apps.length||q.initializeApp(Br);const d=q.firestore();d.enablePersistence({synchronizeTabs:!0}).catch(t=>{["failed-precondition","unimplemented"].includes(t.code)||console.warn("Cache indisponível:",t.code)});function oa(t,e){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.indexOf(a)<0&&(n[a]=t[a]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(t);i<a.length;i++)e.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(t,a[i])&&(n[a[i]]=t[a[i]]);return n}const Ot={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",TWITTER:"twitter.com"},ut={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
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
 */function zr(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registed for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend."}}function Pi(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Wr=zr,qr=Pi,xi=new ra("auth","Firebase",Pi());/**
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
 */const cn=new Sr("@firebase/auth");function Kr(t,...e){cn.logLevel<=vi.WARN&&cn.warn(`Auth (${Ht}): ${t}`,...e)}function an(t,...e){cn.logLevel<=vi.ERROR&&cn.error(`Auth (${Ht}): ${t}`,...e)}/**
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
 */function Re(t,...e){throw la(t,...e)}function Ce(t,...e){return la(t,...e)}function Li(t,e,n){const a=Object.assign(Object.assign({},qr()),{[e]:n});return new ra("auth","Firebase",a).create(e,{appName:t.name})}function Tt(t,e,n){const a=n;if(!(e instanceof a))throw a.name!==e.constructor.name&&Re(t,"argument-error"),Li(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function la(t,...e){if(typeof t!="string"){const n=e[0],a=[...e.slice(1)];return a[0]&&(a[0].appName=t.name),t._errorFactory.create(n,...a)}return xi.create(t,...e)}function F(t,e,...n){if(!t)throw la(e,...n)}function Ue(t){const e="INTERNAL ASSERTION FAILED: "+t;throw an(e),new Error(e)}function De(t,e){t||Ue(e)}/**
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
 */function jt(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function ca(){return Xa()==="http:"||Xa()==="https:"}function Xa(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function Zr(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ca()||Ii()||"connection"in navigator)?navigator.onLine:!0}function Yr(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class zt{constructor(e,n){this.shortDelay=e,this.longDelay=n,De(n>e,"Short delay should be less than long delay!"),this.isMobile=_r()||sa()}get(){return Zr()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function da(t,e){De(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class ki{static initialize(e,n,a){this.fetchImpl=e,n&&(this.headersImpl=n),a&&(this.responseImpl=a)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Ue("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Ue("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Ue("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Jr={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Xr=new zt(3e4,6e4);function Te(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Se(t,e,n,a,i={}){return Di(t,i,async()=>{let r={},o={};a&&(e==="GET"?o=a:r={body:JSON.stringify(a)});const u=vt(Object.assign({key:t.config.apiKey},o)).slice(1),m=await t._getAdditionalHeaders();return m["Content-Type"]="application/json",t.languageCode&&(m["X-Firebase-Locale"]=t.languageCode),ki.fetch()(Mi(t,t.config.apiHost,n,u),Object.assign({method:e,headers:m,referrerPolicy:"no-referrer"},r))})}async function Di(t,e,n){t._canInitEmulator=!1;const a=Object.assign(Object.assign({},Jr),e);try{const i=new Qr(t),r=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Lt(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const u=r.ok?o.errorMessage:o.error.message,[m,O]=u.split(" : ");if(m==="FEDERATED_USER_ID_ALREADY_LINKED")throw Lt(t,"credential-already-in-use",o);if(m==="EMAIL_EXISTS")throw Lt(t,"email-already-in-use",o);if(m==="USER_DISABLED")throw Lt(t,"user-disabled",o);const _=a[m]||m.toLowerCase().replace(/[_\s]+/g,"-");if(O)throw Li(t,_,O);Re(t,_)}}catch(i){if(i instanceof Je)throw i;Re(t,"network-request-failed",{message:String(i)})}}async function We(t,e,n,a,i={}){const r=await Se(t,e,n,a,i);return"mfaPendingCredential"in r&&Re(t,"multi-factor-auth-required",{_serverResponse:r}),r}function Mi(t,e,n,a){const i=`${e}${n}?${a}`;return t.config.emulator?da(t.config,i):`${t.config.apiScheme}://${i}`}class Qr{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,a)=>{this.timer=setTimeout(()=>a(Ce(this.auth,"network-request-failed")),Xr.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Lt(t,e,n){const a={appName:t.name};n.email&&(a.email=n.email),n.phoneNumber&&(a.phoneNumber=n.phoneNumber);const i=Ce(t,e,a);return i.customData._tokenResponse=n,i}/**
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
 */async function eo(t,e){return Se(t,"POST","/v1/accounts:delete",e)}async function to(t,e){return Se(t,"POST","/v1/accounts:update",e)}async function no(t,e){return Se(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function kt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ao(t,e=!1){const n=pe(t),a=await n.getIdToken(e),i=In(a);F(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const r=typeof i.firebase=="object"?i.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:i,token:a,authTime:kt(Ln(i.auth_time)),issuedAtTime:kt(Ln(i.iat)),expirationTime:kt(Ln(i.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Ln(t){return Number(t)*1e3}function In(t){const[e,n,a]=t.split(".");if(e===void 0||n===void 0||a===void 0)return an("JWT malformed, contained fewer than 3 sections"),null;try{const i=Rr(n);return i?JSON.parse(i):(an("Failed to decode base64 JWT payload"),null)}catch(i){return an("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function io(t){const e=In(t);return F(e,"internal-error"),F(typeof e.exp<"u","internal-error"),F(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ze(t,e,n=!1){if(n)return e;try{return await e}catch(a){throw a instanceof Je&&so(a)&&t.auth.currentUser===t&&await t.auth.signOut(),a}}function so({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class ro{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const a=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),a}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ji{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=kt(this.lastLoginAt),this.creationTime=kt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ft(t){var e;const n=t.auth,a=await t.getIdToken(),i=await ze(t,no(n,{idToken:a}));F(i==null?void 0:i.users.length,n,"internal-error");const r=i.users[0];t._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?co(r.providerUserInfo):[],u=lo(t.providerData,o),m=t.isAnonymous,O=!(t.email&&r.passwordHash)&&!(u!=null&&u.length),_=m?O:!1,N={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:u,metadata:new ji(r.createdAt,r.lastLoginAt),isAnonymous:_};Object.assign(t,N)}async function oo(t){const e=pe(t);await Ft(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function lo(t,e){return[...t.filter(a=>!e.some(i=>i.providerId===a.providerId)),...e]}function co(t){return t.map(e=>{var{providerId:n}=e,a=oa(e,["providerId"]);return{providerId:n,uid:a.rawId||"",displayName:a.displayName||null,email:a.email||null,phoneNumber:a.phoneNumber||null,photoURL:a.photoUrl||null}})}/**
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
 */async function uo(t,e){const n=await Di(t,{},async()=>{const a=vt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:r}=t.config,o=Mi(t,i,"/v1/token",`key=${r}`),u=await t._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",ki.fetch()(o,{method:"POST",headers:u,body:a})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
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
 */class Vt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken<"u","internal-error"),F(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):io(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return F(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:a,refreshToken:i,expiresIn:r}=await uo(e,n);this.updateTokensAndExpiration(a,i,Number(r))}updateTokensAndExpiration(e,n,a){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+a*1e3}static fromJSON(e,n){const{refreshToken:a,accessToken:i,expirationTime:r}=n,o=new Vt;return a&&(F(typeof a=="string","internal-error",{appName:e}),o.refreshToken=a),i&&(F(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),r&&(F(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Vt,this.toJSON())}_performRefresh(){return Ue("not implemented")}}/**
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
 */function Ke(t,e){F(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class nt{constructor(e){var{uid:n,auth:a,stsTokenManager:i}=e,r=oa(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ro(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=a,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new ji(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await ze(this,this.stsTokenManager.getToken(this.auth,e));return F(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return ao(this,e)}reload(){return oo(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new nt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let a=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),a=!0),n&&await Ft(this),await this.auth._persistUserIfCurrent(this),a&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await ze(this,eo(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var a,i,r,o,u,m,O,_;const N=(a=n.displayName)!==null&&a!==void 0?a:void 0,x=(i=n.email)!==null&&i!==void 0?i:void 0,Z=(r=n.phoneNumber)!==null&&r!==void 0?r:void 0,ne=(o=n.photoURL)!==null&&o!==void 0?o:void 0,G=(u=n.tenantId)!==null&&u!==void 0?u:void 0,ae=(m=n._redirectEventId)!==null&&m!==void 0?m:void 0,ce=(O=n.createdAt)!==null&&O!==void 0?O:void 0,ee=(_=n.lastLoginAt)!==null&&_!==void 0?_:void 0,{uid:w,emailVerified:k,isAnonymous:T,providerData:f,stsTokenManager:I}=n;F(w&&I,e,"internal-error");const p=Vt.fromJSON(this.name,I);F(typeof w=="string",e,"internal-error"),Ke(N,e.name),Ke(x,e.name),F(typeof k=="boolean",e,"internal-error"),F(typeof T=="boolean",e,"internal-error"),Ke(Z,e.name),Ke(ne,e.name),Ke(G,e.name),Ke(ae,e.name),Ke(ce,e.name),Ke(ee,e.name);const b=new nt({uid:w,auth:e,email:x,emailVerified:k,displayName:N,isAnonymous:T,photoURL:ne,phoneNumber:Z,tenantId:G,stsTokenManager:p,createdAt:ce,lastLoginAt:ee});return f&&Array.isArray(f)&&(b.providerData=f.map(C=>Object.assign({},C))),ae&&(b._redirectEventId=ae),b}static async _fromIdTokenResponse(e,n,a=!1){const i=new Vt;i.updateFromServerResponse(n);const r=new nt({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:a});return await Ft(r),r}}/**
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
 */const Qa=new Map;function xe(t){De(t instanceof Function,"Expected a class definition");let e=Qa.get(t);return e?(De(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Qa.set(t,e),e)}/**
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
 */class Fi{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Fi.type="NONE";const Et=Fi;/**
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
 */function at(t,e,n){return`firebase:${t}:${e}:${n}`}class mt{constructor(e,n,a){this.persistence=e,this.auth=n,this.userKey=a;const{config:i,name:r}=this.auth;this.fullUserKey=at(this.userKey,i.apiKey,r),this.fullPersistenceKey=at("persistence",i.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?nt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,a="authUser"){if(!n.length)return new mt(xe(Et),e,a);const i=(await Promise.all(n.map(async O=>{if(await O._isAvailable())return O}))).filter(O=>O);let r=i[0]||xe(Et);const o=at(a,e.config.apiKey,e.name);let u=null;for(const O of n)try{const _=await O._get(o);if(_){const N=nt._fromJSON(e,_);O!==r&&(u=N),r=O;break}}catch{}const m=i.filter(O=>O._shouldAllowMigration);return!r._shouldAllowMigration||!m.length?new mt(r,e,a):(r=m[0],u&&await r._set(o,u.toJSON()),await Promise.all(n.map(async O=>{if(O!==r)try{await O._remove(o)}catch{}})),new mt(r,e,a))}}/**
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
 */function ei(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Gi(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Vi(e))return"Firefox";if(e.includes("silk/"))return"Silk";if($i(e))return"Blackberry";if(Hi(e))return"Webos";if(ua(e))return"Safari";if((e.includes("chrome/")||Ui(e))&&!e.includes("edge/"))return"Chrome";if(Wt(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,a=t.match(n);if((a==null?void 0:a.length)===2)return a[1]}return"Other"}function Vi(t=be()){return/firefox\//i.test(t)}function ua(t=be()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ui(t=be()){return/crios\//i.test(t)}function Gi(t=be()){return/iemobile/i.test(t)}function Wt(t=be()){return/android/i.test(t)}function $i(t=be()){return/blackberry/i.test(t)}function Hi(t=be()){return/webos/i.test(t)}function St(t=be()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function ho(t=be()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(t)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(t)}function po(t=be()){var e;return St(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function mo(){return Ti()&&document.documentMode===10}function Bi(t=be()){return St(t)||Wt(t)||Hi(t)||$i(t)||/windows phone/i.test(t)||Gi(t)}function fo(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function zi(t,e=[]){let n;switch(t){case"Browser":n=ei(be());break;case"Worker":n=`${ei(be())}-${t}`;break;default:n=t}const a=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ht}/${a}`}/**
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
 */async function go(t){return(await Se(t,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Wi(t,e){return Se(t,"GET","/v2/recaptchaConfig",Te(t,e))}/**
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
 */function ti(t){return t!==void 0&&t.getResponse!==void 0}function ni(t){return t!==void 0&&t.enterprise!==void 0}class qi{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}/**
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
 */function Ao(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function ha(t){return new Promise((e,n)=>{const a=document.createElement("script");a.setAttribute("src",t),a.onload=e,a.onerror=i=>{const r=Ce("internal-error");r.customData=i,n(r)},a.type="text/javascript",a.charset="UTF-8",Ao().appendChild(a)})}function Ki(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const Eo="https://www.google.com/recaptcha/enterprise.js?render=",yo="recaptcha-enterprise",Io="NO_RECAPTCHA";class Zi{constructor(e){this.type=yo,this.auth=ye(e)}async verify(e="verify",n=!1){async function a(r){if(!n){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,u)=>{Wi(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(m=>{if(m.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const O=new qi(m);return r.tenantId==null?r._agentRecaptchaConfig=O:r._tenantRecaptchaConfigs[r.tenantId]=O,o(O.siteKey)}}).catch(m=>{u(m)})})}function i(r,o,u){const m=window.grecaptcha;ni(m)?m.enterprise.ready(()=>{m.enterprise.execute(r,{action:e}).then(O=>{o(O)}).catch(()=>{o(Io)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,o)=>{a(this.auth).then(u=>{if(!n&&ni(window.grecaptcha))i(u,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}ha(Eo+u).then(()=>{i(u,r,o)}).catch(m=>{o(m)})}}).catch(u=>{o(u)})})}}async function Xe(t,e,n,a=!1){const i=new Zi(t);let r;try{r=await i.verify(n)}catch{r=await i.verify(n,!0)}const o=Object.assign({},e);return a?Object.assign(o,{captchaResp:r}):Object.assign(o,{captchaResponse:r}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}/**
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
 */class vo{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const a=r=>new Promise((o,u)=>{try{const m=e(r);o(m)}catch(m){u(m)}});a.onAbort=n,this.queue.push(a);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const a of this.queue)await a(e),a.onAbort&&n.push(a.onAbort)}catch(a){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:a==null?void 0:a.message})}}}/**
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
 */class To{constructor(e,n,a,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=a,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ai(this),this.idTokenSubscription=new ai(this),this.beforeStateQueue=new vo(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=xi,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=xe(n)),this._initializationPromise=this.queue(async()=>{var a,i;if(!this._deleted&&(this.persistenceManager=await mt.create(this,e),!this._deleted)){if(!((a=this._popupRedirectResolver)===null||a===void 0)&&a._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const a=await this.assertedPersistence.getCurrentUser();let i=a,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,u=i==null?void 0:i._redirectEventId,m=await this.tryRedirectSignIn(e);(!o||o===u)&&(m!=null&&m.user)&&(i=m.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=a,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ft(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Yr()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?pe(e):null;return n&&F(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(xe(e))})}async initializeRecaptchaConfig(){const e=await Wi(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new qi(e);this.tenantId==null?this._agentRecaptchaConfig=n:this._tenantRecaptchaConfigs[this.tenantId]=n,n.emailPasswordEnabled&&new Zi(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ra("auth","Firebase",e())}onAuthStateChanged(e,n,a){return this.registerStateListener(this.authStateSubscription,e,n,a)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,a){return this.registerStateListener(this.idTokenSubscription,e,n,a)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const a=await this.getOrInitRedirectPersistenceManager(n);return e===null?a.removeCurrentUser():a.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&xe(e)||this._popupRedirectResolver;F(n,this,"argument-error"),this.redirectPersistenceManager=await mt.create(this,[xe(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,a;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((a=this.redirectUser)===null||a===void 0?void 0:a._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const a=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==a&&(this.lastNotifiedUid=a,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,a,i){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return F(o,this,"internal-error"),o.then(()=>r(this.currentUser)),typeof n=="function"?e.addObserver(n,a,i):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=zi(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const a=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());a&&(n["X-Firebase-Client"]=a);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&Kr(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function ye(t){return pe(t)}class ai{constructor(e){this.auth=e,this.observer=null,this.addObserver=Cr(n=>this.observer=n)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function So(t,e){const n=(e==null?void 0:e.persistence)||[],a=(Array.isArray(n)?n:[n]).map(xe);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(a,e==null?void 0:e.popupRedirectResolver)}function bo(t,e,n){const a=ye(t);F(a._canInitEmulator,a,"emulator-config-failed"),F(/^https?:\/\//.test(e),a,"invalid-emulator-scheme");const i=!!(n!=null&&n.disableWarnings),r=Yi(e),{host:o,port:u}=_o(e),m=u===null?"":`:${u}`;a.config.emulator={url:`${r}//${o}${m}/`},a.settings.appVerificationDisabledForTesting=!0,a.emulatorConfig=Object.freeze({host:o,port:u,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Co()}function Yi(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function _o(t){const e=Yi(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const a=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(a);if(i){const r=i[1];return{host:r,port:ii(a.substr(r.length+1))}}else{const[r,o]=a.split(":");return{host:r,port:ii(o)}}}function ii(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Co(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class bt{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ue("not implemented")}_getIdTokenResponse(e){return Ue("not implemented")}_linkToIdToken(e,n){return Ue("not implemented")}_getReauthenticationResolver(e){return Ue("not implemented")}}/**
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
 */async function Ji(t,e){return Se(t,"POST","/v1/accounts:resetPassword",Te(t,e))}async function Xi(t,e){return Se(t,"POST","/v1/accounts:update",e)}async function Ro(t,e){return Se(t,"POST","/v1/accounts:update",Te(t,e))}/**
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
 */async function kn(t,e){return We(t,"POST","/v1/accounts:signInWithPassword",Te(t,e))}async function vn(t,e){return Se(t,"POST","/v1/accounts:sendOobCode",Te(t,e))}async function Oo(t,e){return vn(t,e)}async function Dn(t,e){return vn(t,e)}async function Mn(t,e){return vn(t,e)}async function wo(t,e){return vn(t,e)}/**
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
 */async function No(t,e){return We(t,"POST","/v1/accounts:signInWithEmailLink",Te(t,e))}async function Po(t,e){return We(t,"POST","/v1/accounts:signInWithEmailLink",Te(t,e))}/**
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
 */class Ut extends bt{constructor(e,n,a,i=null){super("password",a),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new Ut(e,n,"password")}static _fromEmailAndCode(e,n,a=null){return new Ut(e,n,"emailLink",a)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){var n;switch(this.signInMethod){case"password":const a={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((n=e._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const i=await Xe(e,a,"signInWithPassword");return kn(e,i)}else return kn(e,a).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const r=await Xe(e,a,"signInWithPassword");return kn(e,r)}else return Promise.reject(i)});case"emailLink":return No(e,{email:this._email,oobCode:this._password});default:Re(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return Xi(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Po(e,{idToken:n,email:this._email,oobCode:this._password});default:Re(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Be(t,e){return We(t,"POST","/v1/accounts:signInWithIdp",Te(t,e))}/**
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
 */const xo="http://localhost";class Ge extends bt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Ge(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Re("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:a,signInMethod:i}=n,r=oa(n,["providerId","signInMethod"]);if(!a||!i)return null;const o=new Ge(a,i);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Be(e,n)}_linkToIdToken(e,n){const a=this.buildRequest();return a.idToken=n,Be(e,a)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Be(e,n)}buildRequest(){const e={requestUri:xo,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=vt(n)}return e}}/**
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
 */async function Lo(t,e){return Se(t,"POST","/v1/accounts:sendVerificationCode",Te(t,e))}async function ko(t,e){return We(t,"POST","/v1/accounts:signInWithPhoneNumber",Te(t,e))}async function Do(t,e){const n=await We(t,"POST","/v1/accounts:signInWithPhoneNumber",Te(t,e));if(n.temporaryProof)throw Lt(t,"account-exists-with-different-credential",n);return n}const Mo={USER_NOT_FOUND:"user-not-found"};async function jo(t,e){const n=Object.assign(Object.assign({},e),{operation:"REAUTH"});return We(t,"POST","/v1/accounts:signInWithPhoneNumber",Te(t,n),Mo)}/**
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
 */class it extends bt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new it({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new it({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return ko(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return Do(e,Object.assign({idToken:n},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return jo(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:a,verificationCode:i}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:a,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:a,phoneNumber:i,temporaryProof:r}=e;return!a&&!n&&!i&&!r?null:new it({verificationId:n,verificationCode:a,phoneNumber:i,temporaryProof:r})}}/**
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
 */function Fo(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Vo(t){const e=pt(Pt(t)).link,n=e?pt(Pt(e)).deep_link_id:null,a=pt(Pt(t)).deep_link_id;return(a?pt(Pt(a)).link:null)||a||n||e||t}class Tn{constructor(e){var n,a,i,r,o,u;const m=pt(Pt(e)),O=(n=m.apiKey)!==null&&n!==void 0?n:null,_=(a=m.oobCode)!==null&&a!==void 0?a:null,N=Fo((i=m.mode)!==null&&i!==void 0?i:null);F(O&&_&&N,"argument-error"),this.apiKey=O,this.operation=N,this.code=_,this.continueUrl=(r=m.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=m.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(u=m.tenantId)!==null&&u!==void 0?u:null}static parseLink(e){const n=Vo(e);try{return new Tn(n)}catch{return null}}}/**
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
 */class Qe{constructor(){this.providerId=Qe.PROVIDER_ID}static credential(e,n){return Ut._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const a=Tn.parseLink(n);return F(a,"argument-error"),Ut._fromEmailAndCode(e,a.code,a.tenantId)}}Qe.PROVIDER_ID="password";Qe.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Qe.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class qe{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class _t extends qe{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class ft extends _t{static credentialFromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;return F("providerId"in n&&"signInMethod"in n,"argument-error"),Ge._fromParams(n)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return F(e.idToken||e.accessToken,"argument-error"),Ge._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return ft.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return ft.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:a,oauthTokenSecret:i,pendingToken:r,nonce:o,providerId:u}=e;if(!a&&!i&&!n&&!r||!u)return null;try{return new ft(u)._credential({idToken:n,accessToken:a,nonce:o,pendingToken:r})}catch{return null}}}/**
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
 */class Me extends _t{constructor(){super("facebook.com")}static credential(e){return Ge._fromParams({providerId:Me.PROVIDER_ID,signInMethod:Me.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Me.credentialFromTaggedObject(e)}static credentialFromError(e){return Me.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Me.credential(e.oauthAccessToken)}catch{return null}}}Me.FACEBOOK_SIGN_IN_METHOD="facebook.com";Me.PROVIDER_ID="facebook.com";/**
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
 */class je extends _t{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Ge._fromParams({providerId:je.PROVIDER_ID,signInMethod:je.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return je.credentialFromTaggedObject(e)}static credentialFromError(e){return je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:a}=e;if(!n&&!a)return null;try{return je.credential(n,a)}catch{return null}}}je.GOOGLE_SIGN_IN_METHOD="google.com";je.PROVIDER_ID="google.com";/**
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
 */class Fe extends _t{constructor(){super("github.com")}static credential(e){return Ge._fromParams({providerId:Fe.PROVIDER_ID,signInMethod:Fe.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Fe.credentialFromTaggedObject(e)}static credentialFromError(e){return Fe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Fe.credential(e.oauthAccessToken)}catch{return null}}}Fe.GITHUB_SIGN_IN_METHOD="github.com";Fe.PROVIDER_ID="github.com";/**
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
 */const Uo="http://localhost";class yt extends bt{constructor(e,n){super(e,e),this.pendingToken=n}_getIdTokenResponse(e){const n=this.buildRequest();return Be(e,n)}_linkToIdToken(e,n){const a=this.buildRequest();return a.idToken=n,Be(e,a)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Be(e,n)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:a,signInMethod:i,pendingToken:r}=n;return!a||!i||!r||a!==i?null:new yt(a,r)}static _create(e,n){return new yt(e,n)}buildRequest(){return{requestUri:Uo,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
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
 */const Go="saml.";class dn extends qe{constructor(e){F(e.startsWith(Go),"argument-error"),super(e)}static credentialFromResult(e){return dn.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return dn.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const n=yt.fromJSON(e);return F(n,"argument-error"),n}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:n,providerId:a}=e;if(!n||!a)return null;try{return yt._create(a,n)}catch{return null}}}/**
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
 */class Ve extends _t{constructor(){super("twitter.com")}static credential(e,n){return Ge._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:a}=e;if(!n||!a)return null;try{return Ve.credential(n,a)}catch{return null}}}Ve.TWITTER_SIGN_IN_METHOD="twitter.com";Ve.PROVIDER_ID="twitter.com";/**
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
 */async function sn(t,e){return We(t,"POST","/v1/accounts:signUp",Te(t,e))}/**
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
 */class ke{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,a,i=!1){const r=await nt._fromIdTokenResponse(e,a,i),o=si(a);return new ke({user:r,providerId:o,_tokenResponse:a,operationType:n})}static async _forOperation(e,n,a){await e._updateTokensIfNecessary(a,!0);const i=si(a);return new ke({user:e,providerId:i,_tokenResponse:a,operationType:n})}}function si(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function $o(t){var e;const n=ye(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new ke({user:n.currentUser,providerId:null,operationType:"signIn"});const a=await sn(n,{returnSecureToken:!0}),i=await ke._fromIdTokenResponse(n,"signIn",a,!0);return await n._updateCurrentUser(i.user),i}/**
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
 */class un extends Je{constructor(e,n,a,i){var r;super(n.code,n.message),this.operationType=a,this.user=i,Object.setPrototypeOf(this,un.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:n.customData._serverResponse,operationType:a}}static _fromErrorAndOperation(e,n,a,i){return new un(e,n,a,i)}}function Qi(t,e,n,a){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?un._fromErrorAndOperation(t,r,e,a):r})}/**
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
 */function es(t){return new Set(t.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function Ho(t,e){const n=pe(t);await Sn(!0,n,e);const{providerUserInfo:a}=await to(n.auth,{idToken:await n.getIdToken(),deleteProvider:[e]}),i=es(a||[]);return n.providerData=n.providerData.filter(r=>i.has(r.providerId)),i.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n}async function pa(t,e,n=!1){const a=await ze(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ke._forOperation(t,"link",a)}async function Sn(t,e,n){await Ft(e);const a=es(e.providerData),i=t===!1?"provider-already-linked":"no-such-provider";F(a.has(n)===t,e.auth,i)}/**
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
 */async function ts(t,e,n=!1){const{auth:a}=t,i="reauthenticate";try{const r=await ze(t,Qi(a,i,e,t),n);F(r.idToken,a,"internal-error");const o=In(r.idToken);F(o,a,"internal-error");const{sub:u}=o;return F(t.uid===u,a,"user-mismatch"),ke._forOperation(t,i,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Re(a,"user-mismatch"),r}}/**
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
 */async function ns(t,e,n=!1){const a="signIn",i=await Qi(t,a,e),r=await ke._fromIdTokenResponse(t,a,i);return n||await t._updateCurrentUser(r.user),r}async function bn(t,e){return ns(ye(t),e)}async function as(t,e){const n=pe(t);return await Sn(!1,n,e.providerId),pa(n,e)}async function is(t,e){return ts(pe(t),e)}/**
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
 */async function Bo(t,e){return We(t,"POST","/v1/accounts:signInWithCustomToken",Te(t,e))}/**
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
 */async function zo(t,e){const n=ye(t),a=await Bo(n,{token:e,returnSecureToken:!0}),i=await ke._fromIdTokenResponse(n,"signIn",a);return await n._updateCurrentUser(i.user),i}/**
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
 */class qt{constructor(e,n){this.factorId=e,this.uid=n.mfaEnrollmentId,this.enrollmentTime=new Date(n.enrolledAt).toUTCString(),this.displayName=n.displayName}static _fromServerResponse(e,n){return"phoneInfo"in n?ma._fromServerResponse(e,n):"totpInfo"in n?fa._fromServerResponse(e,n):Re(e,"internal-error")}}class ma extends qt{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,n){return new ma(n)}}class fa extends qt{constructor(e){super("totp",e)}static _fromServerResponse(e,n){return new fa(n)}}/**
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
 */function gt(t,e,n){var a;F(((a=n.url)===null||a===void 0?void 0:a.length)>0,t,"invalid-continue-uri"),F(typeof n.dynamicLinkDomain>"u"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(F(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(F(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
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
 */async function Wo(t,e,n){var a;const i=ye(t),r={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};if(!((a=i._getRecaptchaConfig())===null||a===void 0)&&a.emailPasswordEnabled){const o=await Xe(i,r,"getOobCode",!0);n&&gt(i,o,n),await Dn(i,o)}else n&&gt(i,r,n),await Dn(i,r).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log("Password resets are protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the password reset flow.");const u=await Xe(i,r,"getOobCode",!0);n&&gt(i,u,n),await Dn(i,u)}else return Promise.reject(o)})}async function qo(t,e,n){await Ji(pe(t),{oobCode:e,newPassword:n})}async function Ko(t,e){await Ro(pe(t),{oobCode:e})}async function ss(t,e){const n=pe(t),a=await Ji(n,{oobCode:e}),i=a.requestType;switch(F(i,n,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":F(a.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":F(a.mfaInfo,n,"internal-error");default:F(a.email,n,"internal-error")}let r=null;return a.mfaInfo&&(r=qt._fromServerResponse(ye(n),a.mfaInfo)),{data:{email:(a.requestType==="VERIFY_AND_CHANGE_EMAIL"?a.newEmail:a.email)||null,previousEmail:(a.requestType==="VERIFY_AND_CHANGE_EMAIL"?a.email:a.newEmail)||null,multiFactorInfo:r},operation:i}}async function Zo(t,e){const{data:n}=await ss(pe(t),e);return n.email}async function Yo(t,e,n){var a;const i=ye(t),r={returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"};let o;if(!((a=i._getRecaptchaConfig())===null||a===void 0)&&a.emailPasswordEnabled){const O=await Xe(i,r,"signUpPassword");o=sn(i,O)}else o=sn(i,r).catch(async O=>{if(O.code==="auth/missing-recaptcha-token"){console.log("Sign-up is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-up flow.");const _=await Xe(i,r,"signUpPassword");return sn(i,_)}else return Promise.reject(O)});const u=await o.catch(O=>Promise.reject(O)),m=await ke._fromIdTokenResponse(i,"signIn",u);return await i._updateCurrentUser(m.user),m}function Jo(t,e,n){return bn(pe(t),Qe.credential(e,n))}/**
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
 */async function Xo(t,e,n){var a;const i=ye(t),r={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function o(u,m){F(m.handleCodeInApp,i,"argument-error"),m&&gt(i,u,m)}if(!((a=i._getRecaptchaConfig())===null||a===void 0)&&a.emailPasswordEnabled){const u=await Xe(i,r,"getOobCode",!0);o(u,n),await Mn(i,u)}else o(r,n),await Mn(i,r).catch(async u=>{if(u.code==="auth/missing-recaptcha-token"){console.log("Email link sign-in is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const m=await Xe(i,r,"getOobCode",!0);o(m,n),await Mn(i,m)}else return Promise.reject(u)})}function Qo(t,e){const n=Tn.parseLink(e);return(n==null?void 0:n.operation)==="EMAIL_SIGNIN"}async function el(t,e,n){const a=pe(t),i=Qe.credentialWithLink(e,n||jt());return F(i._tenantId===(a.tenantId||null),a,"tenant-id-mismatch"),bn(a,i)}/**
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
 */async function tl(t,e){return Se(t,"POST","/v1/accounts:createAuthUri",Te(t,e))}/**
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
 */async function nl(t,e){const n=ca()?jt():"http://localhost",a={identifier:e,continueUri:n},{signinMethods:i}=await tl(pe(t),a);return i||[]}async function al(t,e){const n=pe(t),i={requestType:"VERIFY_EMAIL",idToken:await t.getIdToken()};e&&gt(n.auth,i,e);const{email:r}=await Oo(n.auth,i);r!==t.email&&await t.reload()}async function il(t,e,n){const a=pe(t),r={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await t.getIdToken(),newEmail:e};n&&gt(a.auth,r,n);const{email:o}=await wo(a.auth,r);o!==t.email&&await t.reload()}/**
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
 */async function sl(t,e){return Se(t,"POST","/v1/accounts:update",e)}/**
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
 */async function rl(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const a=pe(t),r={idToken:await a.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await ze(a,sl(a.auth,r));a.displayName=o.displayName||null,a.photoURL=o.photoUrl||null;const u=a.providerData.find(({providerId:m})=>m==="password");u&&(u.displayName=a.displayName,u.photoURL=a.photoURL),await a._updateTokensIfNecessary(o)}function ol(t,e){return rs(pe(t),e,null)}function ll(t,e){return rs(pe(t),null,e)}async function rs(t,e,n){const{auth:a}=t,r={idToken:await t.getIdToken(),returnSecureToken:!0};e&&(r.email=e),n&&(r.password=n);const o=await ze(t,Xi(a,r));await t._updateTokensIfNecessary(o,!0)}/**
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
 */function cl(t){var e,n;if(!t)return null;const{providerId:a}=t,i=t.rawUserInfo?JSON.parse(t.rawUserInfo):{},r=t.isNewUser||t.kind==="identitytoolkit#SignupNewUserResponse";if(!a&&(t!=null&&t.idToken)){const o=(n=(e=In(t.idToken))===null||e===void 0?void 0:e.firebase)===null||n===void 0?void 0:n.sign_in_provider;if(o){const u=o!=="anonymous"&&o!=="custom"?o:null;return new At(r,u)}}if(!a)return null;switch(a){case"facebook.com":return new dl(r,i);case"github.com":return new ul(r,i);case"google.com":return new hl(r,i);case"twitter.com":return new pl(r,i,t.screenName||null);case"custom":case"anonymous":return new At(r,null);default:return new At(r,a,i)}}class At{constructor(e,n,a={}){this.isNewUser=e,this.providerId=n,this.profile=a}}class os extends At{constructor(e,n,a,i){super(e,n,a),this.username=i}}class dl extends At{constructor(e,n){super(e,"facebook.com",n)}}class ul extends os{constructor(e,n){super(e,"github.com",n,typeof(n==null?void 0:n.login)=="string"?n==null?void 0:n.login:null)}}class hl extends At{constructor(e,n){super(e,"google.com",n)}}class pl extends os{constructor(e,n,a){super(e,"twitter.com",n,a)}}function ml(t){const{user:e,_tokenResponse:n}=t;return e.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:cl(n)}class tt{constructor(e,n,a){this.type=e,this.credential=n,this.auth=a}static _fromIdtoken(e,n){return new tt("enroll",e,n)}static _fromMfaPendingCredential(e){return new tt("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var n,a;if(e!=null&&e.multiFactorSession){if(!((n=e.multiFactorSession)===null||n===void 0)&&n.pendingCredential)return tt._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((a=e.multiFactorSession)===null||a===void 0)&&a.idToken)return tt._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
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
 */class ga{constructor(e,n,a){this.session=e,this.hints=n,this.signInResolver=a}static _fromError(e,n){const a=ye(e),i=n.customData._serverResponse,r=(i.mfaInfo||[]).map(u=>qt._fromServerResponse(a,u));F(i.mfaPendingCredential,a,"internal-error");const o=tt._fromMfaPendingCredential(i.mfaPendingCredential);return new ga(o,r,async u=>{const m=await u._process(a,o);delete i.mfaInfo,delete i.mfaPendingCredential;const O=Object.assign(Object.assign({},i),{idToken:m.idToken,refreshToken:m.refreshToken});switch(n.operationType){case"signIn":const _=await ke._fromIdTokenResponse(a,n.operationType,O);return await a._updateCurrentUser(_.user),_;case"reauthenticate":return F(n.user,a,"internal-error"),ke._forOperation(n.user,n.operationType,O);default:Re(a,"internal-error")}})}async resolveSignIn(e){const n=e;return this.signInResolver(n)}}function fl(t,e){var n;const a=pe(t),i=e;return F(e.customData.operationType,a,"argument-error"),F((n=i.customData._serverResponse)===null||n===void 0?void 0:n.mfaPendingCredential,a,"argument-error"),ga._fromError(a,i)}/**
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
 */function gl(t,e){return Se(t,"POST","/v2/accounts/mfaEnrollment:start",Te(t,e))}function Al(t,e){return Se(t,"POST","/v2/accounts/mfaEnrollment:finalize",Te(t,e))}function El(t,e){return Se(t,"POST","/v2/accounts/mfaEnrollment:withdraw",Te(t,e))}class Aa{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(n=>{n.mfaInfo&&(this.enrolledFactors=n.mfaInfo.map(a=>qt._fromServerResponse(e.auth,a)))})}static _fromUser(e){return new Aa(e)}async getSession(){return tt._fromIdtoken(await this.user.getIdToken(),this.user.auth)}async enroll(e,n){const a=e,i=await this.getSession(),r=await ze(this.user,a._process(this.user.auth,i,n));return await this.user._updateTokensIfNecessary(r),this.user.reload()}async unenroll(e){const n=typeof e=="string"?e:e.uid,a=await this.user.getIdToken();try{const i=await ze(this.user,El(this.user.auth,{idToken:a,mfaEnrollmentId:n}));this.enrolledFactors=this.enrolledFactors.filter(({uid:r})=>r!==n),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const jn=new WeakMap;function yl(t){const e=pe(t);return jn.has(e)||jn.set(e,Aa._fromUser(e)),jn.get(e)}const hn="__sak";/**
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
 */class ls{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(hn,"1"),this.storage.removeItem(hn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function Il(){const t=be();return ua(t)||St(t)}const vl=1e3,Tl=10;class cs extends ls{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Il()&&fo(),this.fallbackToPolling=Bi(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const a=this.storage.getItem(n),i=this.localCache[n];a!==i&&e(n,i,a)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,u,m)=>{this.notifyListeners(o,m)});return}const a=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(a);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(a,e.newValue):this.storage.removeItem(a);else if(this.localCache[a]===e.newValue&&!n)return}const i=()=>{const o=this.storage.getItem(a);!n&&this.localCache[a]===o||this.notifyListeners(a,o)},r=this.storage.getItem(a);mo()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Tl):i()}notifyListeners(e,n){this.localCache[e]=n;const a=this.listeners[e];if(a)for(const i of Array.from(a))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,a)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:a}),!0)})},vl)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}cs.type="LOCAL";const Ea=cs;/**
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
 */class ds extends ls{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}ds.type="SESSION";const rt=ds;/**
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
 */function Sl(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class _n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const a=new _n(e);return this.receivers.push(a),a}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:a,eventType:i,data:r}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:a,eventType:i});const u=Array.from(o).map(async O=>O(n.origin,r)),m=await Sl(u);n.ports[0].postMessage({status:"done",eventId:a,eventType:i,response:m})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}_n.receivers=[];/**
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
 */function Kt(t="",e=10){let n="";for(let a=0;a<e;a++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class bl{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,a=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let r,o;return new Promise((u,m)=>{const O=Kt("",20);i.port1.start();const _=setTimeout(()=>{m(new Error("unsupported_event"))},a);o={messageChannel:i,onMessage(N){const x=N;if(x.data.eventId===O)switch(x.data.status){case"ack":clearTimeout(_),r=setTimeout(()=>{m(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),u(x.data.response);break;default:clearTimeout(_),clearTimeout(r),m(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:O,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function ve(){return window}function _l(t){ve().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */function ya(){return typeof ve().WorkerGlobalScope<"u"&&typeof ve().importScripts=="function"}async function Cl(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Rl(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Ol(){return ya()?self:null}/**
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
 */const us="firebaseLocalStorageDb",wl=1,pn="firebaseLocalStorage",hs="fbase_key";class Zt{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Cn(t,e){return t.transaction([pn],e?"readwrite":"readonly").objectStore(pn)}function Nl(){const t=indexedDB.deleteDatabase(us);return new Zt(t).toPromise()}function Kn(){const t=indexedDB.open(us,wl);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const a=t.result;try{a.createObjectStore(pn,{keyPath:hs})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const a=t.result;a.objectStoreNames.contains(pn)?e(a):(a.close(),await Nl(),e(await Kn()))})})}async function ri(t,e,n){const a=Cn(t,!0).put({[hs]:e,value:n});return new Zt(a).toPromise()}async function Pl(t,e){const n=Cn(t,!1).get(e),a=await new Zt(n).toPromise();return a===void 0?null:a.value}function oi(t,e){const n=Cn(t,!0).delete(e);return new Zt(n).toPromise()}const xl=800,Ll=3;class ps{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Kn(),this.db)}async _withRetries(e){let n=0;for(;;)try{const a=await this._openDb();return await e(a)}catch(a){if(n++>Ll)throw a;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ya()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=_n._getInstance(Ol()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Cl(),!this.activeServiceWorker)return;this.sender=new bl(this.activeServiceWorker);const a=await this.sender._send("ping",{},800);a&&!((e=a[0])===null||e===void 0)&&e.fulfilled&&!((n=a[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Rl()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Kn();return await ri(e,hn,"1"),await oi(e,hn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(a=>ri(a,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(a=>Pl(a,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>oi(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const r=Cn(i,!1).getAll();return new Zt(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],a=new Set;for(const{fbase_key:i,value:r}of e)a.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!a.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const a=this.listeners[e];if(a)for(const i of Array.from(a))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),xl)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ps.type="LOCAL";const Gt=ps;/**
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
 */function kl(t,e){return Se(t,"POST","/v2/accounts/mfaSignIn:start",Te(t,e))}function Dl(t,e){return Se(t,"POST","/v2/accounts/mfaSignIn:finalize",Te(t,e))}/**
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
 */const Ml=500,jl=6e4,en=1e12;class Fl{constructor(e){this.auth=e,this.counter=en,this._widgets=new Map}render(e,n){const a=this.counter;return this._widgets.set(a,new Vl(e,this.auth.name,n||{})),this.counter++,a}reset(e){var n;const a=e||en;(n=this._widgets.get(a))===null||n===void 0||n.delete(),this._widgets.delete(a)}getResponse(e){var n;const a=e||en;return((n=this._widgets.get(a))===null||n===void 0?void 0:n.getResponse())||""}async execute(e){var n;const a=e||en;return(n=this._widgets.get(a))===null||n===void 0||n.execute(),""}}class Vl{constructor(e,n,a){this.params=a,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;F(i,"argument-error",{appName:n}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=Ul(50);const{callback:e,"expired-callback":n}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,n)try{n()}catch{}this.isVisible&&this.execute()},jl)},Ml))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function Ul(t){const e=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let a=0;a<t;a++)e.push(n.charAt(Math.floor(Math.random()*n.length)));return e.join("")}/**
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
 */const Fn=Ki("rcb"),Gl=new zt(3e4,6e4),$l="https://www.google.com/recaptcha/api.js?";class Hl{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=ve().grecaptcha)===null||e===void 0)&&e.render)}load(e,n=""){return F(Bl(n),e,"argument-error"),this.shouldResolveImmediately(n)&&ti(ve().grecaptcha)?Promise.resolve(ve().grecaptcha):new Promise((a,i)=>{const r=ve().setTimeout(()=>{i(Ce(e,"network-request-failed"))},Gl.get());ve()[Fn]=()=>{ve().clearTimeout(r),delete ve()[Fn];const u=ve().grecaptcha;if(!u||!ti(u)){i(Ce(e,"internal-error"));return}const m=u.render;u.render=(O,_)=>{const N=m(O,_);return this.counter++,N},this.hostLanguage=n,a(u)};const o=`${$l}?${vt({onload:Fn,render:"explicit",hl:n})}`;ha(o).catch(()=>{clearTimeout(r),i(Ce(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var n;return!!(!((n=ve().grecaptcha)===null||n===void 0)&&n.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function Bl(t){return t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t)}class zl{async load(e){return new Fl(e)}clearedOneInstance(){}}/**
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
 */const ms="recaptcha",Wl={theme:"light",type:"image"};let ql=class{constructor(e,n=Object.assign({},Wl),a){this.parameters=n,this.type=ms,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=ye(a),this.isInvisible=this.parameters.size==="invisible",F(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof e=="string"?document.getElementById(e):e;F(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new zl:new Hl,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),n=this.getAssertedRecaptcha(),a=n.getResponse(e);return a||new Promise(i=>{const r=o=>{o&&(this.tokenChangeListeners.delete(r),i(o))};this.tokenChangeListeners.add(r),this.isInvisible&&n.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){F(!this.parameters.sitekey,this.auth,"argument-error"),F(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),F(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return n=>{if(this.tokenChangeListeners.forEach(a=>a(n)),typeof e=="function")e(n);else if(typeof e=="string"){const a=ve()[e];typeof a=="function"&&a(n)}}}assertNotDestroyed(){F(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const n=document.createElement("div");e.appendChild(n),e=n}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){F(ca()&&!ya(),this.auth,"internal-error"),await Kl(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await go(this.auth);F(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return F(this.recaptcha,this.auth,"internal-error"),this.recaptcha}};function Kl(){let t=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}t=()=>e(),window.addEventListener("load",t)}).catch(e=>{throw t&&window.removeEventListener("load",t),e})}/**
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
 */class Ia{constructor(e,n){this.verificationId=e,this.onConfirmation=n}confirm(e){const n=it._fromVerification(this.verificationId,e);return this.onConfirmation(n)}}async function Zl(t,e,n){const a=ye(t),i=await Rn(a,e,pe(n));return new Ia(i,r=>bn(a,r))}async function Yl(t,e,n){const a=pe(t);await Sn(!1,a,"phone");const i=await Rn(a.auth,e,pe(n));return new Ia(i,r=>as(a,r))}async function Jl(t,e,n){const a=pe(t),i=await Rn(a.auth,e,pe(n));return new Ia(i,r=>is(a,r))}async function Rn(t,e,n){var a;const i=await n.verify();try{F(typeof i=="string",t,"argument-error"),F(n.type===ms,t,"argument-error");let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){const o=r.session;if("phoneNumber"in r)return F(o.type==="enroll",t,"internal-error"),(await gl(t,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{F(o.type==="signin",t,"internal-error");const u=((a=r.multiFactorHint)===null||a===void 0?void 0:a.uid)||r.multiFactorUid;return F(u,t,"missing-multi-factor-info"),(await kl(t,{mfaPendingCredential:o.credential,mfaEnrollmentId:u,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await Lo(t,{phoneNumber:r.phoneNumber,recaptchaToken:i});return o}}finally{n._reset()}}async function Xl(t,e){await pa(pe(t),e)}/**
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
 */let ot=class rn{constructor(e){this.providerId=rn.PROVIDER_ID,this.auth=ye(e)}verifyPhoneNumber(e,n){return Rn(this.auth,e,pe(n))}static credential(e,n){return it._fromVerification(e,n)}static credentialFromResult(e){const n=e;return rn.credentialFromTaggedObject(n)}static credentialFromError(e){return rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:n,temporaryProof:a}=e;return n&&a?it._fromTokenResponse(n,a):null}};ot.PROVIDER_ID="phone";ot.PHONE_SIGN_IN_METHOD="phone";/**
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
 */function ct(t,e){return e?xe(e):(F(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class va extends bt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Be(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Be(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Be(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Ql(t){return ns(t.auth,new va(t),t.bypassAuthState)}function ec(t){const{auth:e,user:n}=t;return F(n,e,"internal-error"),ts(n,new va(t),t.bypassAuthState)}async function tc(t){const{auth:e,user:n}=t;return F(n,e,"internal-error"),pa(n,new va(t),t.bypassAuthState)}/**
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
 */class fs{constructor(e,n,a,i,r=!1){this.auth=e,this.resolver=a,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(a){this.reject(a)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:a,postBody:i,tenantId:r,error:o,type:u}=e;if(o){this.reject(o);return}const m={auth:this.auth,requestUri:n,sessionId:a,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(m))}catch(O){this.reject(O)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ql;case"linkViaPopup":case"linkViaRedirect":return tc;case"reauthViaPopup":case"reauthViaRedirect":return ec;default:Re(this.auth,"internal-error")}}resolve(e){De(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){De(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const nc=new zt(2e3,1e4);async function ac(t,e,n){const a=ye(t);Tt(t,e,qe);const i=ct(a,n);return new $e(a,"signInViaPopup",e,i).executeNotNull()}async function ic(t,e,n){const a=pe(t);Tt(a.auth,e,qe);const i=ct(a.auth,n);return new $e(a.auth,"reauthViaPopup",e,i,a).executeNotNull()}async function sc(t,e,n){const a=pe(t);Tt(a.auth,e,qe);const i=ct(a.auth,n);return new $e(a.auth,"linkViaPopup",e,i,a).executeNotNull()}class $e extends fs{constructor(e,n,a,i,r){super(e,n,i,r),this.provider=a,this.authWindow=null,this.pollId=null,$e.currentPopupAction&&$e.currentPopupAction.cancel(),$e.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return F(e,this.auth,"internal-error"),e}async onExecution(){De(this.filter.length===1,"Popup operations only handle one event");const e=Kt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ce(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ce(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,$e.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,a;if(!((a=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||a===void 0)&&a.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ce(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,nc.get())};e()}}$e.currentPopupAction=null;/**
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
 */const rc="pendingRedirect",Dt=new Map;class oc extends fs{constructor(e,n,a=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,a),this.eventId=null}async execute(){let e=Dt.get(this.auth._key());if(!e){try{const a=await lc(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(a)}catch(n){e=()=>Promise.reject(n)}Dt.set(this.auth._key(),e)}return this.bypassAuthState||Dt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function lc(t,e){const n=As(e),a=gs(t);if(!await a._isAvailable())return!1;const i=await a._get(n)==="true";return await a._remove(n),i}async function Ta(t,e){return gs(t)._set(As(e),"true")}function cc(){Dt.clear()}function Sa(t,e){Dt.set(t._key(),e)}function gs(t){return xe(t._redirectPersistence)}function As(t){return at(rc,t.config.apiKey,t.name)}/**
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
 */function dc(t,e,n){return uc(t,e,n)}async function uc(t,e,n){const a=ye(t);Tt(t,e,qe),await a._initializationPromise;const i=ct(a,n);return await Ta(i,a),i._openRedirect(a,e,"signInViaRedirect")}function hc(t,e,n){return pc(t,e,n)}async function pc(t,e,n){const a=pe(t);Tt(a.auth,e,qe),await a.auth._initializationPromise;const i=ct(a.auth,n);await Ta(i,a.auth);const r=await Es(a);return i._openRedirect(a.auth,e,"reauthViaRedirect",r)}function mc(t,e,n){return fc(t,e,n)}async function fc(t,e,n){const a=pe(t);Tt(a.auth,e,qe),await a.auth._initializationPromise;const i=ct(a.auth,n);await Sn(!1,a,e.providerId),await Ta(i,a.auth);const r=await Es(a);return i._openRedirect(a.auth,e,"linkViaRedirect",r)}async function gc(t,e){return await ye(t)._initializationPromise,On(t,e,!1)}async function On(t,e,n=!1){const a=ye(t),i=ct(a,e),o=await new oc(a,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await a._persistUserIfCurrent(o.user),await a._setRedirectUser(null,e)),o}async function Es(t){const e=Kt(`${t.uid}:::`);return t._redirectEventId=e,await t.auth._setRedirectUser(t),await t.auth._persistUserIfCurrent(t),e}/**
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
 */const Ac=10*60*1e3;class ys{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(a=>{this.isEventForConsumer(e,a)&&(n=!0,this.sendToConsumer(e,a),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Ec(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var a;if(e.error&&!Is(e)){const i=((a=e.error.code)===null||a===void 0?void 0:a.split("auth/")[1])||"internal-error";n.onError(Ce(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const a=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&a}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ac&&this.cachedEventUids.clear(),this.cachedEventUids.has(li(e))}saveEventToCache(e){this.cachedEventUids.add(li(e)),this.lastProcessedEventTime=Date.now()}}function li(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Is({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Ec(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Is(t);default:return!1}}/**
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
 */async function vs(t,e={}){return Se(t,"GET","/v1/projects",e)}/**
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
 */const yc=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ic=/^https?/;async function vc(t){if(t.config.emulator)return;const{authorizedDomains:e}=await vs(t);for(const n of e)try{if(Tc(n))return}catch{}Re(t,"unauthorized-domain")}function Tc(t){const e=jt(),{protocol:n,hostname:a}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&a===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===a}if(!Ic.test(n))return!1;if(yc.test(t))return a===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(a)}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const Sc=new zt(3e4,6e4);function ci(){const t=ve().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function bc(t){return new Promise((e,n)=>{var a,i,r;function o(){ci(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ci(),n(Ce(t,"network-request-failed"))},timeout:Sc.get()})}if(!((i=(a=ve().gapi)===null||a===void 0?void 0:a.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((r=ve().gapi)===null||r===void 0)&&r.load)o();else{const u=Ki("iframefcb");return ve()[u]=()=>{gapi.load?o():n(Ce(t,"network-request-failed"))},ha(`https://apis.google.com/js/api.js?onload=${u}`).catch(m=>n(m))}}).catch(e=>{throw on=null,e})}let on=null;function _c(t){return on=on||bc(t),on}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const Cc=new zt(5e3,15e3),Rc="__/auth/iframe",Oc="emulator/auth/iframe",wc={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Nc=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Pc(t){const e=t.config;F(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?da(e,Oc):`https://${t.config.authDomain}/${Rc}`,a={apiKey:e.apiKey,appName:t.name,v:Ht},i=Nc.get(t.config.apiHost);i&&(a.eid=i);const r=t._getFrameworks();return r.length&&(a.fw=r.join(",")),`${n}?${vt(a).slice(1)}`}async function xc(t){const e=await _c(t),n=ve().gapi;return F(n,t,"internal-error"),e.open({where:document.body,url:Pc(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:wc,dontclear:!0},a=>new Promise(async(i,r)=>{await a.restyle({setHideOnLeave:!1});const o=Ce(t,"network-request-failed"),u=ve().setTimeout(()=>{r(o)},Cc.get());function m(){ve().clearTimeout(u),i(a)}a.ping(m).then(m,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const Lc={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},kc=500,Dc=600,Mc="_blank",jc="http://localhost";class di{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Fc(t,e,n,a=kc,i=Dc){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-a)/2,0).toString();let u="";const m=Object.assign(Object.assign({},Lc),{width:a.toString(),height:i.toString(),top:r,left:o}),O=be().toLowerCase();n&&(u=Ui(O)?Mc:n),Vi(O)&&(e=e||jc,m.scrollbars="yes");const _=Object.entries(m).reduce((x,[Z,ne])=>`${x}${Z}=${ne},`,"");if(po(O)&&u!=="_self")return Vc(e||"",u),new di(null);const N=window.open(e||"",u,_);F(N,t,"popup-blocked");try{N.focus()}catch{}return new di(N)}function Vc(t,e){const n=document.createElement("a");n.href=t,n.target=e;const a=document.createEvent("MouseEvent");a.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(a)}/**
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
 */const Uc="__/auth/handler",Gc="emulator/auth/handler",$c=encodeURIComponent("fac");async function Zn(t,e,n,a,i,r){F(t.config.authDomain,t,"auth-domain-config-required"),F(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:a,v:Ht,eventId:i};if(e instanceof qe){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Or(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[_,N]of Object.entries(r||{}))o[_]=N}if(e instanceof _t){const _=e.getScopes().filter(N=>N!=="");_.length>0&&(o.scopes=_.join(","))}t.tenantId&&(o.tid=t.tenantId);const u=o;for(const _ of Object.keys(u))u[_]===void 0&&delete u[_];const m=await t._getAppCheckToken(),O=m?`#${$c}=${encodeURIComponent(m)}`:"";return`${Hc(t)}?${vt(u).slice(1)}${O}`}function Hc({config:t}){return t.emulator?da(t,Gc):`https://${t.authDomain}/${Uc}`}/**
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
 */const Vn="webStorageSupport";class Bc{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=rt,this._completeRedirectFn=On,this._overrideRedirectResult=Sa}async _openPopup(e,n,a,i){var r;De((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Zn(e,n,a,jt(),i);return Fc(e,o,Kt())}async _openRedirect(e,n,a,i){await this._originValidation(e);const r=await Zn(e,n,a,jt(),i);return _l(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:r}=this.eventManagers[n];return i?Promise.resolve(i):(De(r,"If manager is not set, promise should be"),r)}const a=this.initAndGetManager(e);return this.eventManagers[n]={promise:a},a.catch(()=>{delete this.eventManagers[n]}),a}async initAndGetManager(e){const n=await xc(e),a=new ys(e);return n.register("authEvent",i=>(F(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:a.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:a},this.iframes[e._key()]=n,a}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Vn,{type:Vn},i=>{var r;const o=(r=i==null?void 0:i[0])===null||r===void 0?void 0:r[Vn];o!==void 0&&n(!!o),Re(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=vc(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Bi()||ua()||St()}}const zc=Bc;class Wc{constructor(e){this.factorId=e}_process(e,n,a){switch(n.type){case"enroll":return this._finalizeEnroll(e,n.credential,a);case"signin":return this._finalizeSignIn(e,n.credential);default:return Ue("unexpected MultiFactorSessionType")}}}class ba extends Wc{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new ba(e)}_finalizeEnroll(e,n,a){return Al(e,{idToken:n,displayName:a,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,n){return Dl(e,{mfaPendingCredential:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class Ts{constructor(){}static assertion(e){return ba._fromCredential(e)}}Ts.FACTOR_ID="phone";var ui="@firebase/auth",hi="0.23.2";/**
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
 */class qc{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(a=>{e((a==null?void 0:a.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Kc(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function Zc(t){qa(new Gn("auth",(e,{options:n})=>{const a=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:u}=a.options;F(o&&!o.includes(":"),"invalid-api-key",{appName:a.name});const m={apiKey:o,authDomain:u,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:zi(t)},O=new To(a,i,r,m);return So(O,n),O},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,a)=>{e.getProvider("auth-internal").initialize()})),qa(new Gn("auth-internal",e=>{const n=ye(e.getProvider("auth").getImmediate());return(a=>new qc(a))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ka(ui,hi,Kc(t)),Ka(ui,hi,"esm2017")}/**
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
 */const Yc=5*60;br("authIdTokenMaxAge");Zc("Browser");/**
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
 */function lt(){return window}/**
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
 */const Jc=2e3;async function Xc(t,e,n){var a;const{BuildInfo:i}=lt();De(e.sessionId,"AuthEvent did not contain a session ID");const r=await ad(e.sessionId),o={};return St()?o.ibi=i.packageName:Wt()?o.apn=i.packageName:Re(t,"operation-not-supported-in-this-environment"),i.displayName&&(o.appDisplayName=i.displayName),o.sessionId=r,Zn(t,n,e.type,void 0,(a=e.eventId)!==null&&a!==void 0?a:void 0,o)}async function Qc(t){const{BuildInfo:e}=lt(),n={};St()?n.iosBundleId=e.packageName:Wt()?n.androidPackageName=e.packageName:Re(t,"operation-not-supported-in-this-environment"),await vs(t,n)}function ed(t){const{cordova:e}=lt();return new Promise(n=>{e.plugins.browsertab.isAvailable(a=>{let i=null;a?e.plugins.browsertab.openUrl(t):i=e.InAppBrowser.open(t,ho()?"_blank":"_system","location=yes"),n(i)})})}async function td(t,e,n){const{cordova:a}=lt();let i=()=>{};try{await new Promise((r,o)=>{let u=null;function m(){var N;r();const x=(N=a.plugins.browsertab)===null||N===void 0?void 0:N.close;typeof x=="function"&&x(),typeof(n==null?void 0:n.close)=="function"&&n.close()}function O(){u||(u=window.setTimeout(()=>{o(Ce(t,"redirect-cancelled-by-user"))},Jc))}function _(){(document==null?void 0:document.visibilityState)==="visible"&&O()}e.addPassiveListener(m),document.addEventListener("resume",O,!1),Wt()&&document.addEventListener("visibilitychange",_,!1),i=()=>{e.removePassiveListener(m),document.removeEventListener("resume",O,!1),document.removeEventListener("visibilitychange",_,!1),u&&window.clearTimeout(u)}})}finally{i()}}function nd(t){var e,n,a,i,r,o,u,m,O,_;const N=lt();F(typeof((e=N==null?void 0:N.universalLinks)===null||e===void 0?void 0:e.subscribe)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),F(typeof((n=N==null?void 0:N.BuildInfo)===null||n===void 0?void 0:n.packageName)<"u",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),F(typeof((r=(i=(a=N==null?void 0:N.cordova)===null||a===void 0?void 0:a.plugins)===null||i===void 0?void 0:i.browsertab)===null||r===void 0?void 0:r.openUrl)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),F(typeof((m=(u=(o=N==null?void 0:N.cordova)===null||o===void 0?void 0:o.plugins)===null||u===void 0?void 0:u.browsertab)===null||m===void 0?void 0:m.isAvailable)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),F(typeof((_=(O=N==null?void 0:N.cordova)===null||O===void 0?void 0:O.InAppBrowser)===null||_===void 0?void 0:_.open)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}async function ad(t){const e=id(t),n=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n)).map(i=>i.toString(16).padStart(2,"0")).join("")}function id(t){if(De(/[0-9a-zA-Z]+/.test(t),"Can only convert alpha-numeric strings"),typeof TextEncoder<"u")return new TextEncoder().encode(t);const e=new ArrayBuffer(t.length),n=new Uint8Array(e);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);return n}/**
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
 */const sd=20;class rd extends ys{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInialized(),this.passiveListeners.forEach(n=>n(e)),super.onEvent(e)}async initialized(){await this.initPromise}}function od(t,e,n=null){return{type:e,eventId:n,urlResponse:null,sessionId:dd(),postBody:null,tenantId:t.tenantId,error:Ce(t,"no-auth-event")}}function ld(t,e){return Yn()._set(Jn(t),e)}async function pi(t){const e=await Yn()._get(Jn(t));return e&&await Yn()._remove(Jn(t)),e}function cd(t,e){var n,a;const i=hd(e);if(i.includes("/__/auth/callback")){const r=ln(i),o=r.firebaseError?ud(decodeURIComponent(r.firebaseError)):null,u=(a=(n=o==null?void 0:o.code)===null||n===void 0?void 0:n.split("auth/"))===null||a===void 0?void 0:a[1],m=u?Ce(u):null;return m?{type:t.type,eventId:t.eventId,tenantId:t.tenantId,error:m,urlResponse:null,sessionId:null,postBody:null}:{type:t.type,eventId:t.eventId,tenantId:t.tenantId,sessionId:t.sessionId,urlResponse:i,postBody:null}}return null}function dd(){const t=[],e="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<sd;n++){const a=Math.floor(Math.random()*e.length);t.push(e.charAt(a))}return t.join("")}function Yn(){return xe(Ea)}function Jn(t){return at("authEvent",t.config.apiKey,t.name)}function ud(t){try{return JSON.parse(t)}catch{return null}}function hd(t){const e=ln(t),n=e.link?decodeURIComponent(e.link):void 0,a=ln(n).link,i=e.deep_link_id?decodeURIComponent(e.deep_link_id):void 0;return ln(i).link||i||a||n||t}function ln(t){if(!(t!=null&&t.includes("?")))return{};const[e,...n]=t.split("?");return pt(n.join("?"))}/**
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
 */const pd=500;class md{constructor(){this._redirectPersistence=rt,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=On,this._overrideRedirectResult=Sa}async _initialize(e){const n=e._key();let a=this.eventManagers.get(n);return a||(a=new rd(e),this.eventManagers.set(n,a),this.attachCallbackListeners(e,a)),a}_openPopup(e){Re(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,n,a,i){nd(e);const r=await this._initialize(e);await r.initialized(),r.resetRedirect(),cc(),await this._originValidation(e);const o=od(e,a,i);await ld(e,o);const u=await Xc(e,o,n),m=await ed(u);return td(e,r,m)}_isIframeWebStorageSupported(e,n){throw new Error("Method not implemented.")}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Qc(e)),this.originValidationPromises[n]}attachCallbackListeners(e,n){const{universalLinks:a,handleOpenURL:i,BuildInfo:r}=lt(),o=setTimeout(async()=>{await pi(e),n.onEvent(mi())},pd),u=async _=>{clearTimeout(o);const N=await pi(e);let x=null;N&&(_!=null&&_.url)&&(x=cd(N,_.url)),n.onEvent(x||mi())};typeof a<"u"&&typeof a.subscribe=="function"&&a.subscribe(null,u);const m=i,O=`${r.packageName.toLowerCase()}://`;lt().handleOpenURL=async _=>{if(_.toLowerCase().startsWith(O)&&u({url:_}),typeof m=="function")try{m(_)}catch(N){console.error(N)}}}}const fd=md;function mi(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:Ce("no-auth-event")}}/**
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
 */function gd(t,e){ye(t)._logFramework(e)}var Ad="@firebase/auth-compat",Ed="0.4.2";/**
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
 */const yd=1e3;function Mt(){var t;return((t=self==null?void 0:self.location)===null||t===void 0?void 0:t.protocol)||null}function Id(){return Mt()==="http:"||Mt()==="https:"}function Ss(t=be()){return!!((Mt()==="file:"||Mt()==="ionic:"||Mt()==="capacitor:")&&t.toLowerCase().match(/iphone|ipad|ipod|android/))}function vd(){return sa()||Si()}function Td(){return Ti()&&(document==null?void 0:document.documentMode)===11}function Sd(t=be()){return/Edge\/\d+/.test(t)}function bd(t=be()){return Td()||Sd(t)}function bs(){try{const t=self.localStorage,e=Kt();if(t)return t.setItem(e,"1"),t.removeItem(e),bd()?$n():!0}catch{return _a()&&$n()}return!1}function _a(){return typeof global<"u"&&"WorkerGlobalScope"in global&&"importScripts"in global}function Un(){return(Id()||Ii()||Ss())&&!vd()&&bs()&&!_a()}function _s(){return Ss()&&typeof document<"u"}async function _d(){return _s()?new Promise(t=>{const e=setTimeout(()=>{t(!1)},yd);document.addEventListener("deviceready",()=>{clearTimeout(e),t(!0)})}):!1}function Cd(){return typeof window<"u"?window:null}/**
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
 */const Pe={LOCAL:"local",NONE:"none",SESSION:"session"},wt=F,Cs="persistence";function Rd(t,e){if(wt(Object.values(Pe).includes(e),t,"invalid-persistence-type"),sa()){wt(e!==Pe.SESSION,t,"unsupported-persistence-type");return}if(Si()){wt(e===Pe.NONE,t,"unsupported-persistence-type");return}if(_a()){wt(e===Pe.NONE||e===Pe.LOCAL&&$n(),t,"unsupported-persistence-type");return}wt(e===Pe.NONE||bs(),t,"unsupported-persistence-type")}async function Xn(t){await t._initializationPromise;const e=Rs(),n=at(Cs,t.config.apiKey,t.name);e&&e.setItem(n,t._getPersistence())}function Od(t,e){const n=Rs();if(!n)return[];const a=at(Cs,t,e);switch(n.getItem(a)){case Pe.NONE:return[Et];case Pe.LOCAL:return[Gt,rt];case Pe.SESSION:return[rt];default:return[]}}function Rs(){var t;try{return((t=Cd())===null||t===void 0?void 0:t.sessionStorage)||null}catch{return null}}/**
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
 */const wd=F;class Ye{constructor(){this.browserResolver=xe(zc),this.cordovaResolver=xe(fd),this.underlyingResolver=null,this._redirectPersistence=rt,this._completeRedirectFn=On,this._overrideRedirectResult=Sa}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,n,a,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,n,a,i)}async _openRedirect(e,n,a,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,n,a,i)}_isIframeWebStorageSupported(e,n){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,n)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return _s()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return wd(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await _d();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}/**
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
 */function Os(t){return t.unwrap()}function Nd(t){return t.wrapped()}/**
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
 */function Pd(t){return ws(t)}function xd(t,e){var n;const a=(n=e.customData)===null||n===void 0?void 0:n._tokenResponse;if((e==null?void 0:e.code)==="auth/multi-factor-auth-required"){const i=e;i.resolver=new Ld(t,fl(t,e))}else if(a){const i=ws(e),r=e;i&&(r.credential=i,r.tenantId=a.tenantId||void 0,r.email=a.email||void 0,r.phoneNumber=a.phoneNumber||void 0)}}function ws(t){const{_tokenResponse:e}=t instanceof Je?t.customData:t;if(!e)return null;if(!(t instanceof Je)&&"temporaryProof"in e&&"phoneNumber"in e)return ot.credentialFromResult(t);const n=e.providerId;if(!n||n===Ot.PASSWORD)return null;let a;switch(n){case Ot.GOOGLE:a=je;break;case Ot.FACEBOOK:a=Me;break;case Ot.GITHUB:a=Fe;break;case Ot.TWITTER:a=Ve;break;default:const{oauthIdToken:i,oauthAccessToken:r,oauthTokenSecret:o,pendingToken:u,nonce:m}=e;return!r&&!o&&!i&&!u?null:u?n.startsWith("saml.")?yt._create(n,u):Ge._fromParams({providerId:n,signInMethod:n,pendingToken:u,idToken:i,accessToken:r}):new ft(n).credential({idToken:i,accessToken:r,rawNonce:m})}return t instanceof Je?a.credentialFromError(t):a.credentialFromResult(t)}function Ne(t,e){return e.catch(n=>{throw n instanceof Je&&xd(t,n),n}).then(n=>{const a=n.operationType,i=n.user;return{operationType:a,credential:Pd(n),additionalUserInfo:ml(n),user:He.getOrCreate(i)}})}async function Qn(t,e){const n=await e;return{verificationId:n.verificationId,confirm:a=>Ne(t,n.confirm(a))}}class Ld{constructor(e,n){this.resolver=n,this.auth=Nd(e)}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return Ne(Os(this.auth),this.resolver.resolveSignIn(e))}}/**
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
 */class He{constructor(e){this._delegate=e,this.multiFactor=yl(e)}static getOrCreate(e){return He.USER_MAP.has(e)||He.USER_MAP.set(e,new He(e)),He.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return Ne(this.auth,as(this._delegate,e))}async linkWithPhoneNumber(e,n){return Qn(this.auth,Yl(this._delegate,e,n))}async linkWithPopup(e){return Ne(this.auth,sc(this._delegate,e,Ye))}async linkWithRedirect(e){return await Xn(ye(this.auth)),mc(this._delegate,e,Ye)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return Ne(this.auth,is(this._delegate,e))}reauthenticateWithPhoneNumber(e,n){return Qn(this.auth,Jl(this._delegate,e,n))}reauthenticateWithPopup(e){return Ne(this.auth,ic(this._delegate,e,Ye))}async reauthenticateWithRedirect(e){return await Xn(ye(this.auth)),hc(this._delegate,e,Ye)}sendEmailVerification(e){return al(this._delegate,e)}async unlink(e){return await Ho(this._delegate,e),this}updateEmail(e){return ol(this._delegate,e)}updatePassword(e){return ll(this._delegate,e)}updatePhoneNumber(e){return Xl(this._delegate,e)}updateProfile(e){return rl(this._delegate,e)}verifyBeforeUpdateEmail(e,n){return il(this._delegate,e,n)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}He.USER_MAP=new WeakMap;/**
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
 */const Nt=F;class ea{constructor(e,n){if(this.app=e,n.isInitialized()){this._delegate=n.getImmediate(),this.linkUnderlyingAuth();return}const{apiKey:a}=e.options;Nt(a,"invalid-api-key",{appName:e.name}),Nt(a,"invalid-api-key",{appName:e.name});const i=typeof window<"u"?Ye:void 0;this._delegate=n.initialize({options:{persistence:kd(a,e.name),popupRedirectResolver:i}}),this._delegate._updateErrorMap(Wr),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?He.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,n){bo(this._delegate,e,n)}applyActionCode(e){return Ko(this._delegate,e)}checkActionCode(e){return ss(this._delegate,e)}confirmPasswordReset(e,n){return qo(this._delegate,e,n)}async createUserWithEmailAndPassword(e,n){return Ne(this._delegate,Yo(this._delegate,e,n))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return nl(this._delegate,e)}isSignInWithEmailLink(e){return Qo(this._delegate,e)}async getRedirectResult(){Nt(Un(),this._delegate,"operation-not-supported-in-this-environment");const e=await gc(this._delegate,Ye);return e?Ne(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){gd(this._delegate,e)}onAuthStateChanged(e,n,a){const{next:i,error:r,complete:o}=fi(e,n,a);return this._delegate.onAuthStateChanged(i,r,o)}onIdTokenChanged(e,n,a){const{next:i,error:r,complete:o}=fi(e,n,a);return this._delegate.onIdTokenChanged(i,r,o)}sendSignInLinkToEmail(e,n){return Xo(this._delegate,e,n)}sendPasswordResetEmail(e,n){return Wo(this._delegate,e,n||void 0)}async setPersistence(e){Rd(this._delegate,e);let n;switch(e){case Pe.SESSION:n=rt;break;case Pe.LOCAL:n=await xe(Gt)._isAvailable()?Gt:Ea;break;case Pe.NONE:n=Et;break;default:return Re("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(n)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return Ne(this._delegate,$o(this._delegate))}signInWithCredential(e){return Ne(this._delegate,bn(this._delegate,e))}signInWithCustomToken(e){return Ne(this._delegate,zo(this._delegate,e))}signInWithEmailAndPassword(e,n){return Ne(this._delegate,Jo(this._delegate,e,n))}signInWithEmailLink(e,n){return Ne(this._delegate,el(this._delegate,e,n))}signInWithPhoneNumber(e,n){return Qn(this._delegate,Zl(this._delegate,e,n))}async signInWithPopup(e){return Nt(Un(),this._delegate,"operation-not-supported-in-this-environment"),Ne(this._delegate,ac(this._delegate,e,Ye))}async signInWithRedirect(e){return Nt(Un(),this._delegate,"operation-not-supported-in-this-environment"),await Xn(this._delegate),dc(this._delegate,e,Ye)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return Zo(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}ea.Persistence=Pe;function fi(t,e,n){let a=t;typeof t!="function"&&({next:a,error:e,complete:n}=t);const i=a;return{next:o=>i(o&&He.getOrCreate(o)),error:e,complete:n}}function kd(t,e){const n=Od(t,e);if(typeof self<"u"&&!n.includes(Gt)&&n.push(Gt),typeof window<"u")for(const a of[Ea,rt])n.includes(a)||n.push(a);return n.includes(Et)||n.push(Et),n}/**
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
 */class Ca{constructor(){this.providerId="phone",this._delegate=new ot(Os(q.auth()))}static credential(e,n){return ot.credential(e,n)}verifyPhoneNumber(e,n){return this._delegate.verifyPhoneNumber(e,n)}unwrap(){return this._delegate}}Ca.PHONE_SIGN_IN_METHOD=ot.PHONE_SIGN_IN_METHOD;Ca.PROVIDER_ID=ot.PROVIDER_ID;/**
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
 */const Dd=F;class Md{constructor(e,n,a=q.app()){var i;Dd((i=a.options)===null||i===void 0?void 0:i.apiKey,"invalid-api-key",{appName:a.name}),this._delegate=new ql(e,n,a.auth()),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}/**
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
 */const jd="auth-compat";function Fd(t){t.INTERNAL.registerComponent(new Gn(jd,e=>{const n=e.getProvider("app-compat").getImmediate(),a=e.getProvider("auth");return new ea(n,a)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:ut.EMAIL_SIGNIN,PASSWORD_RESET:ut.PASSWORD_RESET,RECOVER_EMAIL:ut.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:ut.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:ut.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:ut.VERIFY_EMAIL}},EmailAuthProvider:Qe,FacebookAuthProvider:Me,GithubAuthProvider:Fe,GoogleAuthProvider:je,OAuthProvider:ft,SAMLAuthProvider:dn,PhoneAuthProvider:Ca,PhoneMultiFactorGenerator:Ts,RecaptchaVerifier:Md,TwitterAuthProvider:Ve,Auth:ea,AuthCredential:bt,Error:Je}).setInstantiationMode("LAZY").setMultipleInstances(!1)),t.registerVersion(Ad,Ed)}Fd(q);const st=q.auth(),Yt=t=>d.collection("adminProfiles").doc(t),ta=(t,e)=>({type:"ADMIN",data:{...e,id:t}});async function Vd(t,e){const n=t.trim().includes("@")?t.trim():`${t.trim().toLowerCase()}@subadmins.matoreal.invalid`;await st.setPersistence(q.auth.Auth.Persistence.SESSION);const{user:a}=await st.signInWithEmailAndPassword(n,e);if(a.uid===Bt)return ta(a.uid,{name:"FEDERAÇÃO (ADM PRINCIPAL)",permissions:[]});try{const i=await Yt(a.uid).get();if(!i.exists||i.data().active!==!0)throw Error("Este acesso administrativo foi removido ou não foi autorizado.");return ta(a.uid,{name:i.data().name,permissions:yn(i.data().permissions)})}catch(i){throw await st.signOut(),i}}function Ud(t,e,n){return An(t)?()=>{}:Yt(t.data.id).onSnapshot(a=>{if(!a.exists||a.data().active!==!0)return n();try{e(ta(a.id,{name:a.data().name,permissions:yn(a.data().permissions)}))}catch{n()}},n)}async function Ra(){var t;if(((t=st.currentUser)==null?void 0:t.uid)!==Bt)throw Error("Somente o ADM principal pode gerenciar acessos.")}async function Ns(){return q.initializeApp(q.app().options,`subadmin-${crypto.randomUUID()}`)}async function Gd(){await Ra();const t=await Ns();try{try{await t.firestore().collection("adminProfiles").doc("__access_probe__").get({source:"server"})}catch(e){if(e.code==="permission-denied")return!0;throw e}throw Error("Antes de cadastrar subADMs, publique as regras de proteção de adminProfiles fornecidas com esta atualização. Seu banco ainda permite acesso público a esses perfis.")}finally{await t.delete()}}async function ah({name:t,login:e,password:n,permissions:a}){if(await Gd(),t=t.trim(),e=e.trim().toLowerCase(),t.length<2||t.length>80)throw Error("Nome deve ter entre 2 e 80 caracteres.");if(!/^[a-z0-9][a-z0-9._-]{2,31}$/.test(e))throw Error("Login: de 3 a 32 letras, números, pontos, traços ou sublinhados.");if(n.length<12||n.length>128)throw Error("Use uma senha de 12 a 128 caracteres.");a=yn(a);const i=await Ns();let r;try{return await i.auth().setPersistence(q.auth.Auth.Persistence.NONE),r=(await i.auth().createUserWithEmailAndPassword(`${e}@subadmins.matoreal.invalid`,n)).user,await Yt(r.uid).set({name:t,login:e,permissions:a,active:!0,createdAt:Date.now()}),r.uid}catch(o){throw r&&await r.delete().catch(()=>{}),o}finally{await i.auth().signOut().catch(()=>{}),await i.delete()}}async function ih(t,e){if(await Ra(),t===Bt)throw Error("O ADM principal não pode ser alterado aqui.");await Yt(t).update({permissions:yn(e)})}async function sh(t){if(await Ra(),t===Bt)throw Error("O ADM principal não pode ser excluído.");await Yt(t).delete()}const $d={AFC:"AF AU BH BD BT BN KH CN TW GU HK IN ID IR IQ JP JO KP KR KW KG LA LB MO MY MV MN MM NP OM PK PS PH QA SA SG LK SY TJ TH TL TM AE UZ VN YE",CAF:"DZ AO BJ BW BF BI CV CM CF TD KM CG CD CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU MA MZ NA NE NG RW ST SN SC SL SO ZA SS SD TZ TG TN UG ZM ZW",CONCACAF:"AI AG AW BS BB BZ BM VG CA KY CR CU CW DM DO SV GD GT GY HT HN JM MX MS NI PA PR KN LC VC SR TT TC US VI",CONMEBOL:"AR BO BR CL CO EC PY PE UY VE",OFC:"AS CK FJ NC NZ PG WS SB PF TO VU",UEFA:"AL AD AM AT AZ BY BE BA BG HR CY CZ DK ENG EE FO FI FR GE DE GI GR HU IS IL IT KZ XK LV LI LT LU MT MD ME NL MK NIR NO PL PT IE RO RU SM SCO RS SK SI ES SE CH TR UA WAL"},Hd={MTR:"Mato Real",ENG:"Inglaterra",SCO:"Escócia",WAL:"País de Gales",NIR:"Irlanda do Norte",TW:"Taipé Chinês",CD:"RD Congo",CG:"Congo",CI:"Costa do Marfim",SZ:"Essuatíni",CZ:"Tchéquia",TR:"Turquia",HK:"Hong Kong",MO:"Macau",PF:"Taiti",VG:"Ilhas Virgens Britânicas",VI:"Ilhas Virgens Americanas",KR:"Coreia do Sul",KP:"Coreia do Norte",US:"Estados Unidos",XK:"Kosovo"},Bd=new Intl.DisplayNames(["pt-BR"],{type:"region"}),Ps=[{id:"MTR",name:"Mato Real",confederation:"MATO REAL"},...Object.entries($d).flatMap(([t,e])=>e.split(" ").map(n=>({id:n,name:Hd[n]||Bd.of(n),confederation:t})))].sort((t,e)=>t.id==="MTR"?-1:e.id==="MTR"?1:t.name.localeCompare(e.name,"pt-BR")),xs=Object.fromEntries(Ps.map(t=>[t.id,t])),zd=t=>(t==null?void 0:t.nationality)||"MTR",rh=t=>{var e;return((e=xs[t])==null?void 0:e.name)||"Mato Real"};function Wd(t){return t==="MTR"?"🌟":t==="ENG"||t==="SCO"||t==="WAL"?"🏴":t==="NIR"?"⚽":/^[A-Z]{2}$/.test(t)?String.fromCodePoint(...[...t].map(e=>127397+e.charCodeAt(0))):"🏳️"}const Ls={"4-3-3 OFENSIVO":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MEI","PTD","ATA","PTE"],"4-3-3 DEFENSIVO":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MC","PTD","ATA","PTE"],"4-3-3 FALSO 9":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","PTD","SA","PTE"],"4-3-3 POSSE":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","SA","ATA","SA"],"4-4-2 CLÁSSICO":["GOL","LD","ZAG","ZAG","LE","MD","MC","MC","ME","ATA","ATA"],"4-4-2 LOSANGO":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","MEI","ATA","ATA"],"4-4-2 LINHA":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","MEI","ATA","ATA"],"4-4-1-1":["GOL","LD","ZAG","ZAG","LE","MD","MC","MC","ME","SA","ATA"],"4-2-3-1 LARGO":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","PTD","ATA","PTE"],"4-2-3-1 ESTREITO":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","MEI","MEI","ATA"],"4-1-4-1":["GOL","LD","ZAG","ZAG","LE","VOL","MD","MC","MC","ME","ATA"],"4-1-2-1-2":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","MEI","ATA","ATA"],"4-2-2-2 (BRASIL)":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","MEI","ATA","ATA"],"4-2-4 OFENSIVO":["GOL","LD","ZAG","ZAG","LE","MC","MC","PTD","ATA","ATA","PTE"],"4-5-1 RETRANCA":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MC","MD","ME","ATA"],"4-3-2-1 (NATAL)":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","MEI","MEI","ATA"],"3-5-2 TÁTICO":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MD","ME","MEI","ATA","ATA"],"3-4-3 (CRUYFF)":["GOL","ZAG","ZAG","ZAG","VOL","MC","MD","ME","PTD","ATA","PTE"],"3-4-3 LINHA":["GOL","ZAG","ZAG","ZAG","MD","MC","MC","ME","PTD","ATA","PTE"],"3-4-1-2":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MD","ME","MEI","ATA","ATA"],"3-6-1 CONTROLE":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MD","MC","MC","ME","ATA"],"3-3-1-3 (BIELSA)":["GOL","ZAG","ZAG","ZAG","VOL","MC","MC","MEI","PTD","ATA","PTE"],"3-1-4-2":["GOL","ZAG","ZAG","ZAG","VOL","MD","MC","MC","ME","ATA","ATA"],"5-4-1 ÔNIBUS":["GOL","LD","ZAG","ZAG","ZAG","LE","VOL","VOL","MD","ME","ATA"],"5-3-2 CONTRA":["GOL","LD","ZAG","ZAG","ZAG","LE","VOL","MC","MC","ATA","ATA"],"5-2-3 ALAS":["GOL","LD","ZAG","ZAG","ZAG","LE","MC","MC","PTD","ATA","PTE"],"5-2-1-2":["GOL","LD","ZAG","ZAG","ZAG","LE","VOL","VOL","MEI","ATA","ATA"],"WM (ANOS 30)":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MEI","MEI","PTD","ATA","PTE"],"2-3-5 (PIRÂMIDE)":["GOL","ZAG","ZAG","VOL","MC","VOL","PTD","SA","ATA","SA","PTE"],"4-6-0 (SEM ATA)":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MD","ME","MEI","MEI"],"1-1-8 (KAMIKAZE)":["GOL","ZAG","MC","PTD","SA","SA","ATA","ATA","SA","SA","PTE"],"VÁRZEA (TUDO P/ FRENTE)":["GOL","ZAG","ZAG","VOL","MEI","PTD","ATA","ATA","ATA","ATA","PTE"],"VÁRZEA (VOLANTAÇO)":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","VOL","VOL","MEI","ATA"]},qd=23;function Oa(t){if(!xs[t])throw Error("Seleção inválida.")}function Kd(t,e){return zd(t)===e&&!["PENDING","BLOCKED"].includes(t.status)}function oh(t,e,n){if(Oa(t),!Array.isArray(e)||e.length>qd||new Set(e).size!==e.length)throw Error("Convoque até 23 jogadores, sem repetidos.");if(e.some(a=>!n.some(i=>i.id===a&&Kd(i,t))))throw Error("Jogador indisponível ou de outra nacionalidade.")}function lh(t,e,n,a){if(!Ls[t])throw Error("Formação inválida.");if(e.length!==11||new Set(e).size!==11||e.some(r=>!r||!n.includes(r)))throw Error("Selecione 11 titulares distintos da convocação.");const i=e.map(r=>a.find(o=>o.id===r));if(i.some(r=>!r||(r.recoveryLeft||0)>0||(r.energy??100)<25))throw Error("Titular lesionado, indisponível ou com menos de 25 de energia.");if(i[0].position!=="GOL"||i.slice(1).some(r=>r.position==="GOL"))throw Error("Escale um goleiro na primeira posição e dez jogadores de linha.")}function ch(t,e){if(t.length<2||t.length>16||new Set(t).size!==t.length)throw Error("Escolha de 2 a 16 seleções distintas.");if(t.forEach(Oa),!/^\d{4}-\d{2}-\d{2}$/.test(e)||Number.isNaN(Date.parse(e)))throw Error("Escolha uma data válida.");const n=[...t];n.length%2&&n.push(null);const a=[];for(let i=0;i<n.length-1;i++){const r=new Date(e+"T12:00:00Z");r.setUTCDate(r.getUTCDate()+i*7);for(let o=0;o<n.length/2;o++){const u=n[o],m=n[n.length-1-o];u&&m&&a.push({homeId:i%2?m:u,awayId:i%2?u:m,date:r.toISOString().slice(0,10),round:i+1})}n.splice(1,0,n.pop())}return a}function dh(t,e){const n=new Map(t.map(a=>[a,{id:a,pts:0,played:0,wins:0,gf:0,ga:0}]));for(const a of e.filter(i=>i.status==="FINISHED"&&i.stage!=="FINAL")){const i=n.get(a.homeId),r=n.get(a.awayId);if(!(!i||!r))if(i.played++,r.played++,i.gf+=a.homeScore,i.ga+=a.awayScore,r.gf+=a.awayScore,r.ga+=a.homeScore,a.homeScore===a.awayScore)i.pts++,r.pts++;else{const o=a.homeScore>a.awayScore?i:r;o.pts+=3,o.wins++}}return[...n.values()].sort((a,i)=>i.pts-a.pts||i.wins-a.wins||i.gf-i.ga-(a.gf-a.ga)||i.gf-a.gf||a.id.localeCompare(i.id))}const wn={COMERCIO:{label:"Comércio Local",start:25e5,tax:5e4,desc:"Ideal para iniciantes. Imposto baixo."},MEDIA:{label:"Média Empresa",start:2e7,tax:35e4,desc:"Poder moderado. Imposto médio."},GRANDE:{label:"Grande Empresa",start:1e8,tax:2e6,desc:"Gigante do mercado. Imposto alto."}},na={balance:"⚖️ Equilíbrio",stamina:"🔋 Resistência",speed:"⚡ Veloc. Máx.",accel:"🚀 Aceleração",agility:"🤸 Agilidade",jump:"🦘 Impulsão",condition:"💪 Cond. Física",attack:"⚔️ Ataque",dribble:"⚽ Drible",dribbleSpd:"🏃💨 Drib. Veloc.",shortPass:"🎯 Passe Curto",shortPassSpd:"⏩ P. Curto Vel.",longPass:"📡 Passe Longo",longPassSpd:"🚀 P. Longo Vel.",shot:"🔫 Finalização",shotPower:"💣 Força Chute",shotTech:"🎨 Téc. Chute",freeKick:"🎯 Falta",curve:"🍌 Efeito",header:"🤕 Cabeceio",tech:"✨ Técnica",weakFootAcc:"🦶 Pior Pé Prec.",weakFootFreq:"🔄 Pior Pé Freq.",defense:"🛡️ Defesa",response:"🧠 Resposta",aggression:"😡 Agressividade",mentality:"🧠 Atitude",teamwork:"🤝 Trabalho Eq.",gk:"🧤 Hab. Goleiro"},mn=(t,e)=>{const n=parseInt(e)||50,a={},i=Object.keys(na);let r=[],o=[];t==="GOL"?(r=["gk","response","jump","longPass"],o=["balance","condition","mentality","defense"]):t.includes("ZAG")?(r=["defense","header","balance","jump","aggression"],o=["stamina","response","shortPass","longPass"]):t.includes("LAT")||t.includes("LD")||t.includes("LE")?(r=["speed","accel","stamina","shortPass","dribble"],o=["defense","longPass","curve","attack"]):t.includes("VOL")||t.includes("MC")||t==="MD"||t==="ME"?(r=["shortPass","stamina","teamwork","defense","balance"],o=["longPass","tech","shotPower","vision"]):t.includes("MEI")||t.includes("MAT")?(r=["dribble","shortPass","vision","tech","curve","agility"],o=["shot","speed","attack","freeKick"]):t==="PTD"||t==="PTE"?(r=["speed","accel","dribble","agility","curve"],o=["shot","stamina","longPass","technique"]):(t.includes("ATA")||t.includes("SA")||t.includes("PNT"))&&(r=["shot","attack","header","shotPower","balance"],o=["speed","reaction","dribble","strength"]),i.forEach(N=>{let x=n;r.includes(N)?x+=Math.floor(Math.random()*6)+2:o.includes(N)?x-=Math.floor(Math.random()*4):x-=Math.floor(Math.random()*10)+5,t!=="GOL"&&N==="gk"&&(x=10),t==="GOL"&&["shot","attack","dribble","curve","freeKick"].includes(N)&&(x=Math.max(15,x-20)),n<80&&x>88&&(x=88),x>99&&(x=99),x<1&&(x=1),a[N]=x});const u=i.filter(N=>t==="GOL"?!["shot","attack","dribble","curve","freeKick","weakFootAcc","weakFootFreq"].includes(N):N!=="gk");let m=0;u.forEach(N=>m+=a[N]);const O=m/u.length,_=n-O;return u.forEach(N=>{let x=_;a[N]>90&&n<85&&_>0&&(x=0);let Z=a[N]+x;Z>99&&(Z=99),Z<1&&(Z=1),a[N]=Math.round(Z)}),a};function Zd(t,e){const{setLoading:n,teams:a,players:i,companies:r,coaches:o,papers:u,journalists:m,setUser:O,setScreen:_}=t;return{login:async(w,k,T)=>{n(!0);try{await st.signOut();let f=null,I="";if(T==="TEAM"||T==="USER"){const p=a.find(b=>b.id===w&&b.password===k);p&&(f=p,I="USER")}else if(T==="PLAYER"){const p=i.find(b=>b.id===w&&b.password===k);p&&(f=p,I="PLAYER")}else if(T==="COMPANY"){const p=r.find(b=>b.id===w&&b.password===k);p&&(f=p,I="COMPANY")}else if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(T)){const p=o.find(b=>b.id===w&&b.password===k);p&&(f=p,I=p.type)}else if(T==="PRESS"||T==="PAPER"){const p=u.find(b=>b.id===w&&b.password===k);p&&(f=p,I="PRESS")}else if(T==="PRESS_WORKER"||T==="JOURNALIST"){const p=m.find(b=>b.id===w&&b.password===k);if(p){const b=u.find(C=>C.id===p.newspaperId);f={...p,paperName:b==null?void 0:b.name},I="PRESS_WORKER"}}else{let p=a.find(b=>(b.id===w||b.name===w)&&b.password===k);if(p&&(f=p,I="USER"),!f){let b=i.find(C=>(C.id===w||C.name===w)&&C.password===k);b&&(f=b,I="PLAYER")}if(!f){let b=o.find(C=>(C.id===w||C.name===w)&&C.password===k);b&&(f=b,I=b.type)}if(!f){let b=r.find(C=>(C.id===w||C.name===w)&&C.password===k);b&&(f=b,I="COMPANY")}if(!f){let b=u.find(C=>(C.id===w||C.name===w)&&C.password===k);b&&(f=b,I="PRESS")}if(!f){let b=m.find(C=>(C.id===w||C.name===w)&&C.password===k);if(b){const C=u.find(l=>l.id===b.newspaperId);f={...b,paperName:C==null?void 0:C.name},I="PRESS_WORKER"}}}f?f.status==="PENDING"?alert("Conta em análise pela Federação. Aguarde aprovação."):f.status==="BLOCKED"?alert("Conta bloqueada."):(O({type:I,data:f}),Hn({type:I,data:f}),_(I==="COACH"?"COACH_DASH":I==="DOCTOR"?"DOCTOR_DASH":I==="ASSISTANT"?"ASSISTANT_DASH":I==="SCOUT"?"SCOUT_DASH":I==="COMPANY"?"COMPANY_DASH":I==="PLAYER"?"PLAYER_DASH":I==="PRESS"||I==="PRESS_WORKER"?"PRESS_DASH":"HOME")):alert("ID ou Senha incorretos!")}catch(f){console.error(f),alert("Erro no login: "+f.message)}n(!1)},loginAdmin:async(w,k)=>{const T=await Vd(w,k);Hn(T),O(T),_(Oi("ADMIN",qn(T,"screen")))},createTeam:async(w,k,T,f,I,p)=>{if(!p)return alert("Escolha um Estado!");if(a.find(b=>b.name.toLowerCase()===w.toLowerCase()))return alert("Nome em uso!");await d.collection("teams").add({name:w,balance:parseFloat(k),serie:T,estado:p,password:f,stadiumLevel:1,logo:I||null,status:"PENDING",stats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0},stateStats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}}),alert("Clube fundado! Aguarde aprovação da Federação.")},createPlayerAccount:async w=>{try{Oa(w.nationality)}catch(k){alert(k.message);return}if(!w.name||!w.password||!w.instagram)return alert("Preencha todos os campos!");n(!0);try{const k=w.position==="GOL"?60:45,T=mn(w.position,k);await d.collection("players").add({name:w.name,nationality:w.nationality,instagram:w.instagram,position:w.position,password:w.password,overall:k,attributes:T,teamId:"FREE",status:"PENDING",balance:0,salary:1500,value:4e4,contract:0,mood:"😐",fame:0,stats:{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0}}),alert(`✅ Inscrição enviada!
A Federação avaliará seu Instagram em breve. Assim que aprovado, você aparecerá no mercado de Agentes Livres.`),window.location.reload()}catch(k){alert("Erro ao criar: "+k.message),n(!1)}},createStaff:async w=>{if(!w.name||!w.password||!w.role)return alert("Preencha todos os campos obrigatórios!");n(!0);try{const k=`staff_${Date.now()}`;await d.collection("users").doc(k).set({id:k,name:w.name,password:w.password,type:w.role,level:1,xp:0,salary:2500,affinities:[w.affinity||"Geral"],pendingPerks:0,pendingAffinity:0,teamId:"FREE",status:"ACTIVE",trainingsLeft:2,clause:5e4,perks:[],face:w.face||null,createdAt:Date.now()}),alert(`✅ Licença de ${{COACH:"Técnico",DOCTOR:"Médico",SCOUT:"Olheiro",ASSISTANT:"Auxiliar"}[w.role]} gerada com sucesso!
Você já está ativo nos Agentes Livres. Pode fazer o login!`),window.location.reload()}catch(k){console.error(k),alert("Erro ao criar perfil profissional."),n(!1)}},createNewspaper:async(w,k,T)=>{await d.collection("newspapers").add({name:w,password:k,ownerName:T,status:"PENDING"}),alert("Jornal criado! Aguarde Federação.")},createJournalist:async(w,k,T)=>{await d.collection("journalists").add({name:w,password:k,newspaperId:T,status:"PENDING"}),alert("Conta criada! Aguarde seu Chefe.")},createCompany:async w=>{if(!w.n||!w.p)return alert("Preencha tudo!");await d.collection("companies").add({name:w.n,owner:w.owner,password:w.p,companyType:w.type,balance:wn[w.type].start,status:"PENDING"}),alert("Solicitação enviada! Aguarde a Federação.")}}}const Q=t=>"₣ "+parseFloat(t||0).toLocaleString("pt-BR"),It={1:{name:"O Terrão",cap:1e3,minTic:10,maxTic:30,upgCost:5e6,maint:0,prompt:"Campo de futebol de terra e grama falha, alambrado enferrujado, pequena arquibancada de concreto, dia ensolarado, futebol de várzea --ar 16:9"},2:{name:"Estádio Municipal",cap:5e3,minTic:20,maxTic:60,upgCost:15e6,maint:15e3,prompt:"Estádio municipal pequeno, gramado razoável, arquibancadas baixas de concreto, luzes simples, dia de jogo --ar 16:9"},3:{name:"Estádio Profissional",cap:15e3,minTic:40,maxTic:100,upgCost:35e6,maint:6e4,prompt:"Estádio de futebol profissional, arquibancadas cobertas de um lado, cadeiras de plástico coloridas, refletores altos, torcida --ar 16:9"},4:{name:"Arena Moderna",cap:4e4,minTic:80,maxTic:200,upgCost:8e7,maint:15e4,prompt:"Arena de futebol moderna, dois anéis de arquibancada, cobertura completa, telões digitais, cadeiras padronizadas --ar 16:9"},5:{name:"Padrão FIFA",cap:8e4,minTic:120,maxTic:350,upgCost:0,maint:4e5,prompt:"Estádio de futebol padrão Copa do Mundo, arquitetura futurista de vidro e aço, 80 mil lugares, iluminação cênica de LED noturna, lotado --ar 16:9"}},Yd=(t,e)=>{if(!t)return 0;const a={A:1e4,B:4e3,C:1500,D:500,VARZEA:100}[t.serie||"VARZEA"]||100,i=e.reduce((N,x)=>N+(x.fame||0),0),r=Math.floor(i/20),o=t.recentForm||[];let u=1;if(o.length>0){const N=o.filter(Z=>Z==="VITORIA").length,x=o.filter(Z=>Z==="DERROTA").length;N>x&&(u+=N*.06),x>N&&(u-=x*.08)}const m=Math.floor((a+r)*u),O=t.socioPrice||40;let _=1;return O>10&&(_=1-(O-10)*.006428),_<.05&&(_=.05),Math.max(0,Math.floor(m*_))},aa={A:{champ:3e7,vice:2e7,third:15e6,mid:8e6,rel:5e6},B:{champ:12e6,vice:8e6,mid:5e6,rel:3e6},C:{champ:7e6,vice:5e6,mid:3e6,rel:15e5},D:{champ:35e5,vice:25e5,mid:12e5,rel:5e5},VARZEA:{champ:1e6,vice:8e5,third:6e5,mid:2e5}};function Jd(t,e){const{user:n,setModal:a,conf:i,setLoading:r,players:o,teams:u,companies:m,sps:O,coaches:_}=t,N=(...ee)=>e.postNews(...ee);return{adminAction:async(ee,w)=>{if(ee==="EDIT_PRIZES"){a({type:"EDIT_PRIZES",data:i.prizes||aa});return}if(ee==="MARKET"&&(d.collection("config").doc("system").update({marketOpen:w}),N(w?"📢 JANELA ABERTA":"🔒 JANELA FECHADA","infra")),ee==="VARZEA"&&(d.collection("config").doc("system").update({varzeaOpen:w}),N(w?`🔓 **INSCRIÇÕES ABERTAS!**
A Várzea voltou a aceitar novos times!`:`🛑 **INSCRIÇÕES ENCERRADAS!**
O limite de times na Várzea foi atingido. Apenas na próxima temporada!`,"infra")),ee==="WEEK"){if(!confirm(`⚠️ VIRAR SEMANA?

1. Pagar Salários (+)
2. Cobrar Imposto Jogador (3%)
3. Recuperar Energia (100%)
4. Empresas, Técnicos e XP`))return;r(!0);const k=d.batch();o.forEach(p=>{if(p.teamId&&p.teamId!=="FREE"&&u.some(b=>b.id===p.teamId)){const b=parseFloat(p.balance)||0,C=parseFloat(p.salary)||0,l=b*.03,h=p.healthPlan&&p.healthPlan.cost||0;let g=0;if(p.personalSponsor){const D=p.personalSponsor.companyId,S=m.find($=>$.id===D),R=parseFloat(p.personalSponsor.value)||0;S&&S.status==="ACTIVE"&&(S.balance||0)>=R?(g=R,k.update(d.collection("companies").doc(D),{balance:q.firestore.FieldValue.increment(-R)})):(k.update(d.collection("players").doc(p.id),{personalSponsor:q.firestore.FieldValue.delete(),mood:"😡"}),d.collection("news").add({text:`📉 **CALOTE!** A empresa **${p.personalSponsor.companyName}** não teve fundos para pagar o patrocínio de **${p.name}** e o contrato foi rompido!`,type:"press",date:Date.now(),likes:[]}))}const v=b+C+g-l-h,P=(p.xp||0)+(p.pendingXP||0);k.update(d.collection("players").doc(p.id),{balance:v,energy:100,xp:P,pendingXP:0})}}),u.forEach(p=>{const b=parseFloat(p.balance)||0,C=o.filter(A=>A.teamId===p.id),l=O.filter(A=>A.teamId===p.id&&A.status==="ACTIVE").reduce((A,te)=>A+parseFloat(te.value),0),g={A:65e4,B:5e5,C:4e5,D:3e5,VARZEA:1e5}[p.serie||"VARZEA"]||1e5,P=Yd(p,C)*(p.socioPrice||40),D=g+l+P,S=C.reduce((A,te)=>A+(parseFloat(te.salary)||0),0),R=_.filter(A=>A.teamId===p.id&&A.status==="ACTIVE").reduce((A,te)=>A+(parseFloat(te.salary)||0),0),$=p.healthPlan&&p.healthPlan.cost||0,B=p.stadiumLevel||1,re=It[B]?It[B].maint:0;let X={},oe=0,de=0,z=0;if(p.bankInvestment&&p.bankInvestment.amount>0){const A=p.bankInvestment.amount;z=A*.02;const te=Math.max(0,(p.bankInvestment.weeksLocked||0)-1);X.bankInvestment={amount:A+z,weeksLocked:te}}if(p.bankLoan&&p.bankLoan.installments>0){oe=p.bankLoan.weeklyPayment;const A=p.bankLoan.installments-1;A<=0?X.bankLoan=q.firestore.FieldValue.delete():X.bankLoan={...p.bankLoan,installments:A}}if(p.stadiumLoan&&p.stadiumLoan.installments>0){de=p.stadiumLoan.weeklyPayment;const A=p.stadiumLoan.installments-1;A<=0?X.stadiumLoan=q.firestore.FieldValue.delete():X.stadiumLoan={...p.stadiumLoan,installments:A}}const U=S+R+$+re+oe+de;X.balance=b+D-U;let j=`🟢 RECEITAS:
`;j+=`+ Federação/TV: ${Q(g)}
`,P>0&&(j+=`+ Sócios-Torcedores: ${Q(P)}
`),l>0&&(j+=`+ Patrocinadores: ${Q(l)}
`),j+=`
🔴 DESPESAS:
`,S>0&&(j+=`- Salários (Elenco): ${Q(S)}
`),R>0&&(j+=`- Salários (Comissão): ${Q(R)}
`),$>0&&(j+=`- Convênio Médico: ${Q($)}
`),re>0&&(j+=`- Manutenção Arena: ${Q(re)}
`),oe>0&&(j+=`- Parcela Empréstimo: ${Q(oe)}
`),de>0&&(j+=`- Parcela Arena: ${Q(de)}
`);const W=D-U;j+=`
⚖️ RESULTADO FINAL: ${W>=0?"Lucro de "+Q(W):"Prejuízo de "+Q(W)}`,z>0&&(j+=`

📈 Sua Renda Fixa rendeu +${Q(z)} (O valor continua aplicado no Banco).`);let y=[...p.trainingLogs||[]];y.unshift({date:Date.now(),type:"📊 BALANÇO FINANCEIRO",report:j}),y.length>15&&y.pop(),X.trainingLogs=y,k.update(d.collection("teams").doc(p.id),X)});const T=d.collection("news").doc();k.set(T,{text:`💰 **COTAS DA FEDERAÇÃO PAGAS!**
O apoio financeiro semanal foi depositado. Diretorias, confiram o Extrato no Diário Oficial do Clube (CT) para ver os lucros e despesas de sua equipe.`,date:Date.now(),type:"money",likes:[]}),m.forEach(p=>{if(p.status==="ACTIVE"){const b=parseFloat(p.balance)||0,C=p.companyType||"COMERCIO",l=(wn[C]||{}).tax||5e4;k.update(d.collection("companies").doc(p.id),{balance:b-l})}}),(await d.collection("users").where("type","in",["COACH","DOCTOR","SCOUT","ASSISTANT"]).get()).docs.forEach(p=>{const b=p.data();let C={trainingsLeft:2};if(b.teamId&&b.teamId!=="FREE")if(u.some(h=>h.id===b.teamId)){const h=parseFloat(b.balance)||0;C.balance=h+parseFloat(b.salary)}else C.teamId="FREE",C.contract=0;k.update(d.collection("users").doc(p.id),C)}),(await d.collection("debts").get()).docs.forEach(p=>{const b=p.data(),C=u.some(h=>h.id===b.buyerId),l=u.some(h=>h.id===b.sellerId);!C||!l?k.delete(p.ref):b.weeksRemaining>0&&(k.update(d.collection("teams").doc(b.buyerId),{balance:q.firestore.FieldValue.increment(-b.installmentVal)}),k.update(d.collection("teams").doc(b.sellerId),{balance:q.firestore.FieldValue.increment(b.installmentVal)}),b.weeksRemaining-1===0?(k.delete(p.ref),N(`✅ **DÍVIDA QUITADA**
${b.buyerName} terminou de pagar ${b.playerName}.`,"money")):(k.update(p.ref,{weeksRemaining:b.weeksRemaining-1}),N(`💳 **PARCELA PAGA**
${b.buyerName} pagou a parcela (${b.weeksRemaining}x) de ${b.playerName}.`,"money-minus")))});try{await k.commit(),alert("Semana processada! Salários pagos e treinos resetados.")}catch(p){alert("Erro: "+p.message)}r(!1)}if(ee==="SEASON"){if(!confirm(`⚠️ VIRAR TEMPORADA?

1. Evoluir Atributos (XP)
2. Envelhecer Contratos
3. Processar Retornos
4. Envelhecer Técnicos`))return;r(!0);const k=d.batch();o.forEach(f=>{let I={};const p=(f.xp||0)+(f.pendingXP||0),b=Math.floor(p/100),C=p%100;if(f.attributes&&b!==0){let h={...f.attributes};const g=Object.keys(h),v=Math.abs(b),P=b>0;for(let R=0;R<v;R++){const $=g[Math.floor(Math.random()*g.length)];P?h[$]<99&&h[$]++:h[$]>1&&h[$]--}I.attributes=h;const D=Object.values(h),S=Math.round(D.reduce((R,$)=>R+$,0)/D.length);I.overall=S,I.xp=C,I.pendingXP=0}else I.xp=0,I.pendingXP=0;let l=(parseInt(f.contract)||0)-1;if(l<0&&(l=0),I.contract=l,l===0&&f.loanMeta&&f.loanMeta.ownerId){const h=f.loanMeta.ownerId,g=u.find(v=>v.id===h);if(f.loanMeta.hasBuyOption&&f.loanMeta.buyOpt>0){const v=u.find(D=>D.id===f.teamId),P=d.collection("offers").doc();k.set(P,{type:"COMPRA_DEFINITIVA",playerId:f.id,playerName:f.name,buyerId:f.teamId,buyerName:(v==null?void 0:v.name)||"Clube Atual",sellerId:h,recipientId:f.teamId,value:f.loanMeta.buyOpt,status:"PENDING",description:`🏁 **FIM DE EMPRÉSTIMO**
Deseja exercer a opção de compra de **${f.name}** por ${Q(f.loanMeta.buyOpt)}?
Caso recuse, o jogador retornará ao clube de origem.`,date:Date.now(),isLoanOption:!0}),I.status="INTRANSFERIVEL"}else{let v=(parseInt(f.loanMeta.originalContract)||1)-1;if(v<=0){const P=d.collection("offers").doc();k.set(P,{type:"RENOVACAO_URGENTE",playerId:f.id,playerName:f.name,buyerId:h,buyerName:(g==null?void 0:g.name)||"Clube de Origem",sellerId:"SISTEMA",recipientId:h,status:"PENDING",description:`⚠️ **URGENTE: FIM DE VÍNCULO**
O empréstimo de **${f.name}** acabou e ele está sem contrato com você.`,date:Date.now()}),I.teamId=h,I.contract=0,I.status="INTRANSFERIVEL"}else{I.teamId=h,I.contract=v,I.status="NAO_A_VENDA";const P=d.collection("offers").doc();k.set(P,{type:"NOTIFICACAO",playerId:f.id,playerName:f.name,buyerName:"Sistema",recipientId:h,status:"PENDING",description:`🔙 **RETORNO DE EMPRÉSTIMO**
O jogador **${f.name}** retornou ao seu elenco.

📄 Contrato Restante: ${v} temporada(s).`,date:Date.now()}),N(`🔙 **RETORNO**
${f.name} voltou ao ${g==null?void 0:g.name} (${v} anos rest.).`,"transfer")}I.loanMeta=q.firestore.FieldValue.delete()}}else l===0&&(!f.loanMeta||!f.loanMeta.ownerId)&&(f.preContract&&u.some(h=>h.id===f.preContract.teamId)?(I.teamId=f.preContract.teamId,I.contract=2,I.status="NAO_A_VENDA",I.preContract=q.firestore.FieldValue.delete()):(I.teamId="FREE",I.status="VENDA",I.mood="😐",I.loanMeta=q.firestore.FieldValue.delete()));k.update(d.collection("players").doc(f.id),I)}),(await d.collection("users").where("type","==","COACH").get()).docs.forEach(f=>{const I=f.data();if(I.teamId&&I.teamId!=="FREE"){const p=(I.contract||1)-1;p<=0?k.update(d.collection("users").doc(f.id),{teamId:"FREE",contract:0,salary:2500}):k.update(d.collection("users").doc(f.id),{contract:p})}});try{await k.commit(),alert("Temporada virada! Jogadores e técnicos atualizados.")}catch(f){alert("Erro: "+f.message)}r(!1),N(`💪 **PRÉ-TEMPORADA**
Os jogadores treinaram e contratos foram renovados!`,"season")}},resetDatabase:async()=>{if(!An(n))return alert("Somente o ADM principal pode resetar o jogo.");if(prompt("⚠️ PERIGO: Isso apagará TODOS os dados do jogo. Digite RESETAR para confirmar:")!=="RESETAR"||!confirm("TEM CERTEZA? Todos os times, jogadores e finanças sumirão para sempre!"))return;r(!0);const w=["teams","players","users","news","offers","sponsorships","sales","debts","financeRequests","products","companies","journalists","newspapers","nationalTeams","nationalMatches","nationalCompetitions","nationalWindows"];try{let k=[d.batch()],T=0;for(const f of w)(await d.collection(f).get()).docs.forEach(p=>{T>=450&&(k.push(d.batch()),T=0),k[k.length-1].delete(p.ref),T++});for(let f of k)await f.commit();alert("💥 BANCO DE DADOS RESETADO! O sistema irá reiniciar."),window.location.reload()}catch(k){alert("Erro ao resetar: "+k.message)}r(!1)},approveTeam:async(ee,w)=>{await d.collection("teams").doc(ee).update({status:"ACTIVE",balance:parseFloat(w)});const k=u.find(T=>T.id===ee);N(`🛡️ **NOVO CLUBE!**
O **${k.name}** foi aprovado na Série ${k.serie}.`,"infra"),alert("Aprovado!")},deleteTeam:async ee=>{if(!confirm("⚠️ PERIGO: Excluir time e jogadores?"))return;const w=d.batch();w.delete(d.collection("teams").doc(ee)),(await d.collection("players").where("teamId","==",ee).get()).docs.forEach(T=>w.delete(T.ref)),await w.commit(),N(`🚫 **CLUBE EXTINTO**
Um time encerrou atividades.`,"infra")},deletePaper:async ee=>{if(!confirm("Excluir Jornal e demitir jornalistas?"))return;const w=d.batch();w.delete(d.collection("newspapers").doc(ee)),(await d.collection("journalists").where("newspaperId","==",ee).get()).docs.forEach(T=>w.delete(T.ref)),await w.commit(),alert("Jornal fechado!")},deleteJournalist:async ee=>{confirm("Demitir Jornalista?")&&(await d.collection("journalists").doc(ee).delete(),alert("Demitido!"))}}}const ia={GOL:{train:"GOLEIRO",attrs:["gk","response","jump"]},ZAG:{train:"DEFESA",attrs:["defense","aggression","header"]},LD:{train:"VELOCIDADE",attrs:["speed","stamina","shortPass"]},LE:{train:"VELOCIDADE",attrs:["speed","stamina","shortPass"]},VOL:{train:"DEFESA",attrs:["defense","shortPass","stamina"]},MC:{train:"PASSE",attrs:["shortPass","longPass","teamwork"]},MD:{train:"DRIBLE",attrs:["dribble","speed","tech"]},ME:{train:"DRIBLE",attrs:["dribble","speed","tech"]},MEI:{train:"PASSE",attrs:["tech","shortPass","agility"]},PTD:{train:"VELOCIDADE",attrs:["speed","accel","dribble"]},PTE:{train:"VELOCIDADE",attrs:["speed","accel","dribble"]},ATA:{train:"CHUTE",attrs:["shot","shotPower","header"]},SA:{train:"CHUTE",attrs:["attack","shot","dribble"]}},wa=["Vale do Mato","Lua Mare","Rio Manso","Serra Verde","Lagoa Azul"];function Xd(t,e){const{setModal:n,setLoading:a,teams:i,conf:r,players:o,user:u}=t,m=(...G)=>e.postNews(...G);return{handleSaveMatch:async G=>{if(!G){n(null);return}a(!0);try{G.id?(await d.collection("matches").doc(G.id).update(G),alert("Partida atualizada!")):(await d.collection("matches").add(G),alert("Partida criada!")),n(null)}catch(ae){alert("Erro: "+ae.message)}a(!1)},handleDeleteMatch:async G=>{confirm("Tem certeza que deseja excluir esta partida permanentemente?")&&(await d.collection("matches").doc(G).delete(),n(null),alert("Partida excluída."))},generateFixtures:async()=>{if(!confirm("Gerar tabela de jogos para TODAS as séries (A, B, C, D e Várzea)?"))return;a(!0);const G=q.firestore();let ae=[G.batch()],ce=0;const ee=()=>(ce>=450&&(ae.push(G.batch()),ce=0),ce++,ae[ae.length-1]);try{["A","B","C","D","VARZEA"].forEach(k=>{const T=i.filter(p=>p.serie===k&&p.status==="ACTIVE");if(T.length<2)return;const f=(T.length-1)*2;let I=T.map(p=>p.id);I.length%2!==0&&I.push(null);for(let p=0;p<f;p++){const b=p>=f/2;for(let C=0;C<I.length/2;C++){let l=I[C],h=I[I.length-1-C];if(!l||!h)continue;b&&([l,h]=[h,l]);const g=i.find(P=>P.id===l),v=i.find(P=>P.id===h);ee().set(G.collection("matches").doc(),{serie:k,round:p+1,homeId:l,homeName:g.name,homeLogo:g.logo||null,awayId:h,awayName:v.name,awayLogo:v.logo||null,scoreHome:0,scoreAway:0,status:"PENDING",played:!1})}I.splice(1,0,I.pop())}}),wa.forEach(k=>{const T=i.filter(p=>p.estado===k&&p.status==="ACTIVE");if(T.length<2)return;const f=T.length-1;let I=T.map(p=>p.id);I.length%2!==0&&I.push(null);for(let p=0;p<f;p++){for(let b=0;b<I.length/2;b++){let C=I[b],l=I[I.length-1-b];if(!C||!l)continue;Math.random()>.5&&([C,l]=[l,C]);const h=i.find(v=>v.id===C),g=i.find(v=>v.id===l);ee().set(G.collection("matches").doc(),{serie:"ESTADUAL",estado:k,round:`Fase 1 (Rod. ${p+1})`,homeId:C,homeName:h.name,homeLogo:h.logo||null,awayId:l,awayName:g.name,awayLogo:g.logo||null,scoreHome:0,scoreAway:0,status:"PENDING",played:!1,isEstadual:!0})}I.splice(1,0,I.pop())}});for(let k of ae)await k.commit();a(!1),m(`📅 **TABELA DIVULGADA!**
A Federação liberou o calendário de jogos da temporada (incluindo Várzea).`,"infra"),alert("Jogos gerados com sucesso e sem travamentos!")}catch(w){a(!1),console.error(w),alert("Erro ao gerar tabela: "+w.message)}},handleSeasonTurnAdvanced:async()=>{var U,j,W;if(!confirm(`⚠️ ATENÇÃO: Isso encerrará a temporada atual!

1. Pagará Premiações Finais
2. Aplica Promoção/Rebaixamento
3. Evolui Atributos e Overall (XP)
4. Envelhece contratos e Zera estatísticas`))return;a(!0);const G=q.firestore(),ae=r.season||1;let ce=[G.batch()],ee=0;const w=()=>(ee>=450&&(ce.push(G.batch()),ee=0),ee++,ce[ce.length-1]),k=y=>y.sort((A,te)=>{var le,ge,Ie,fe,Le,Oe,Ee,et,Jt,Xt;const L=((le=A.stats)==null?void 0:le.pts)||0,J=((ge=te.stats)==null?void 0:ge.pts)||0;if(L!==J)return J-L;const Ae=((Ie=A.stats)==null?void 0:Ie.wins)||0,E=((fe=te.stats)==null?void 0:fe.wins)||0;if(Ae!==E)return E-Ae;const H=(((Le=A.stats)==null?void 0:Le.gf)||0)-(((Oe=A.stats)==null?void 0:Oe.ga)||0),K=(((Ee=te.stats)==null?void 0:Ee.gf)||0)-(((et=te.stats)==null?void 0:et.ga)||0);if(H!==K)return K-H;const _e=((Jt=A.stats)==null?void 0:Jt.cards)||0,se=((Xt=te.stats)==null?void 0:Xt.cards)||0;return _e-se}),T=k(i.filter(y=>y.serie==="A"&&y.status!=="PENDING")),f=k(i.filter(y=>y.serie==="B"&&y.status!=="PENDING")),I=k(i.filter(y=>y.serie==="C"&&y.status!=="PENDING")),p=k(i.filter(y=>y.serie==="D"&&y.status!=="PENDING")),b=k(i.filter(y=>y.serie==="VARZEA"&&y.status!=="PENDING")),C=r.prizes||aa,l=(y,A,te)=>{const L=A+1,J=(y==="A"||y==="B"||y==="C")&&A>=te-2,Ae=y==="D"&&A>=te-3,E=C[y]||aa[y];return y==="A"?L===1?E.champ:L===2?E.vice:L===3?E.third:J?E.rel:E.mid:y==="B"||y==="C"?L===1?E.champ:L===2?E.vice:J?E.rel:E.mid:y==="D"?L===1?E.champ:L===2?E.vice:Ae?E.rel:E.mid:y==="VARZEA"?L===1?E.champ:L===2?E.vice:L===3?E.third:E.mid:0},h=(y,A)=>{y.forEach((te,L)=>{const J=l(A,L,y.length);w().update(G.collection("teams").doc(te.id),{balance:q.firestore.FieldValue.increment(J)})})};h(T,"A"),h(f,"B"),h(I,"C"),h(p,"D"),h(b,"VARZEA");const g=T[0],v=f[0],P=I[0],D=p[0],S=b[0],R=[...o].sort((y,A)=>(A.stats&&A.stats.goals||0)-(y.stats&&y.stats.goals||0))[0],$=[...o].sort((y,A)=>(A.stats&&A.stats.assists||0)-(y.stats&&y.stats.assists||0))[0],B=[...o].sort((y,A)=>(A.stats&&A.stats.saves||0)-(y.stats&&y.stats.saves||0))[0],re=[...o].filter(y=>y.pressRatingCount>0).sort((y,A)=>(A.pressRatingAvg||0)-(y.pressRatingAvg||0))[0],X=G.collection("hallOfFame").doc(`season_${ae}`);w().set(X,{season:ae,date:Date.now(),champA:g?{name:g.name,logo:g.logo}:null,champB:v?{name:v.name,logo:v.logo}:null,champC:P?{name:P.name,logo:P.logo}:null,champD:D?{name:D.name,logo:D.logo}:null,champVarzea:S?{name:S.name,logo:S.logo}:null,topScorer:R&&((U=R.stats)==null?void 0:U.goals)>0?{name:R.name,face:R.face,val:R.stats.goals}:null,topAssist:$&&((j=$.stats)==null?void 0:j.assists)>0?{name:$.name,face:$.face,val:$.stats.assists}:null,topSaves:B&&((W=B.stats)==null?void 0:W.saves)>0?{name:B.name,face:B.face,val:B.stats.saves}:null,topRating:re?{name:re.name,face:re.face,val:re.pressRatingAvg}:null}),(T.length>0||f.length>0)&&(T.slice(-2).forEach(y=>w().update(G.collection("teams").doc(y.id),{serie:"B"})),f.slice(0,2).forEach(y=>w().update(G.collection("teams").doc(y.id),{serie:"A"})),f.slice(-2).forEach(y=>w().update(G.collection("teams").doc(y.id),{serie:"C"})),I.slice(0,2).forEach(y=>w().update(G.collection("teams").doc(y.id),{serie:"B"})),I.slice(-2).forEach(y=>w().update(G.collection("teams").doc(y.id),{serie:"D"})),p.slice(0,2).forEach(y=>w().update(G.collection("teams").doc(y.id),{serie:"C"})),p.slice(-3).forEach(y=>w().update(G.collection("teams").doc(y.id),{serie:"VARZEA"})),b.slice(0,3).forEach(y=>w().update(G.collection("teams").doc(y.id),{serie:"D"}))),i.forEach(y=>{w().update(G.collection("teams").doc(y.id),{stats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0}})}),w().update(G.collection("config").doc("system"),{season:ae+1});const oe=y=>y==="GOL"?["gk","response","jump","longPass","balance","condition"]:y.includes("ZAG")?["defense","header","balance","jump","aggression","stamina"]:y.includes("LAT")||y.includes("LD")||y.includes("LE")?["speed","accel","stamina","shortPass","dribble","defense"]:y.includes("VOL")||y.includes("MC")||y==="MD"||y==="ME"?["shortPass","stamina","teamwork","defense","balance","tech"]:y.includes("MEI")||y.includes("MAT")?["dribble","shortPass","vision","tech","curve","agility"]:y==="PTD"||y==="PTE"?["speed","accel","dribble","agility","curve","stamina"]:y.includes("ATA")||y.includes("SA")||y.includes("PNT")?["shot","attack","header","shotPower","balance","speed"]:["stamina","balance","speed","shortPass","dribble","shot"],de=y=>y<=50?50:y<=60?80:y<=70?150:y<=80?300:y<=85?600:y<=90?1e3:2e3;o.forEach(y=>{let A={stats:{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0},pressRatingSum:0,pressRatingCount:0,pressRatingAvg:0},te=(y.xp||0)+(y.pendingXP||0);const L=y.position||"ATA",J=de(y.overall||50);let Ae=te>=0,E=Math.abs(te),H=Math.floor(E/J),K=Ae?E%J:-(E%J);if(y.attributes&&H!==0){let se={...y.attributes};const le=Object.keys(na),ge=oe(L);for(let Oe=0;Oe<H;Oe++){let Ee;Math.random()<.75?Ee=ge[Math.floor(Math.random()*ge.length)]:Ee=le[Math.floor(Math.random()*le.length)],L==="GOL"&&["shot","attack","dribble","curve","freeKick","weakFootAcc"].includes(Ee)&&(Ee="gk"),L!=="GOL"&&Ee==="gk"&&(Ee=ge[0]),se[Ee]===void 0&&(se[Ee]=50),Ae?se[Ee]<99&&se[Ee]++:se[Ee]>1&&se[Ee]--}const Ie=L==="GOL"?["shot","attack","dribble","curve","freeKick","weakFootAcc","weakFootFreq"]:["gk"];let fe=0,Le=0;Object.entries(se).forEach(([Oe,Ee])=>{!Ie.includes(Oe)&&na[Oe]&&(fe+=Ee,Le++)}),A.attributes=se,A.overall=Le===0?y.overall:Math.round(fe/Le),A.xp=K,A.pendingXP=0}else A.xp=K,A.pendingXP=0;if(y.pendingPosBoosts&&y.attributes){let se=A.attributes?{...A.attributes}:{...y.attributes};y.pendingPosBoosts.forEach(Le=>{const Oe=ia[Le];Oe&&Oe.attrs.forEach(Ee=>{se[Ee]<99&&(se[Ee]=Math.min(99,se[Ee]+3))})}),A.attributes=se;const ge=(y.position||"ATA")==="GOL"?["shot","attack","dribble","curve","freeKick","weakFootAcc","weakFootFreq"]:["gk"];let Ie=0,fe=0;Object.entries(se).forEach(([Le,Oe])=>{ge.includes(Le)||(Ie+=Oe,fe++)}),A.overall=fe===0?y.overall:Math.round(Ie/fe),A.pendingPosBoosts=q.firestore.FieldValue.delete()}let _e=(parseInt(y.contract)||0)-1;_e<0&&(_e=0),_e===0?!y.loanMeta||!y.loanMeta.ownerId?(A.contract=0,A.teamId="FREE",A.status="VENDA",A.mood="😐"):(A.teamId=y.loanMeta.ownerId,A.contract=parseInt(y.loanMeta.originalContract)>0?parseInt(y.loanMeta.originalContract):1,A.status="NAO_A_VENDA",A.loanMeta=q.firestore.FieldValue.delete()):A.contract=_e,w().update(G.collection("players").doc(y.id),A)}),(await G.collection("users").where("type","in",["COACH","DOCTOR","SCOUT","ASSISTANT"]).get()).docs.forEach(y=>{const A=y.data();if(A.teamId&&A.teamId!=="FREE"){const te=(A.contract||1)-1;te<=0?w().update(y.ref,{teamId:"FREE",contract:0,salary:2500}):w().update(y.ref,{contract:te})}});try{for(let y of ce)await y.commit();a(!1),m(`🏆 **FIM DA TEMPORADA ${ae}!**
As premiações foram depositadas! Parabéns aos campeões:

🥇 Série A: ${(g==null?void 0:g.name)||"Ninguém"}
🥈 Série B: ${(v==null?void 0:v.name)||"Ninguém"}
🥉 Série C: ${(P==null?void 0:P.name)||"Ninguém"}
🏅 Série D: ${(D==null?void 0:D.name)||"Ninguém"}`,"finance"),alert(`Temporada ${ae} encerrada com sucesso!

Premiações pagas, acessos e descensos definidos, atributos evoluídos e Museu atualizado!`)}catch(y){a(!1),alert("Erro na virada: "+y.message)}},saveTactics:async(G,ae)=>{await d.collection("teams").doc(u.data.teamId).update({tactics:{formation:G,lineup:ae}}),alert("Escalação salva na súmula!")},saveMatchStats:async(G,ae,ce,ee=null,w=null)=>{let k=[];if(ae&&ae.goals!==void 0?k=[{player:G,match:ae,xpOverride:ce}]:k=Array.isArray(G)?G:[G],k.length===0)return alert("Nenhum dataPayload para salvar.");a(!0);const T=d.batch();let f=0;const I={GOAL:20,ASSIST:15,TACKLE:10,SAVE:12,WIN:30,DRAW:10,LOSS:-10,YELLOW:-10,RED:-30,RATING_MULT:5};if(k.forEach(l=>{var j,W,y,A,te,L;const{player:h,match:g,xpOverride:v}=l;if(!h||!g)return;let P=0;v!==void 0?P=v:(P+=(g.goals||0)*I.GOAL,P+=(g.assists||0)*I.ASSIST,P+=(g.tackles||0)*I.TACKLE,P+=(g.saves||0)*I.SAVE,P+=(g.yellows||0)*I.YELLOW,P+=(g.reds||0)*I.RED,g.result==="VITORIA"&&(P+=I.WIN),g.result==="EMPATE"&&(P+=I.DRAW),g.result==="DERROTA"&&(P+=I.LOSS),P+=(parseFloat(g.rating)||0)*I.RATING_MULT);const D=parseInt(P),S=d.collection("players").doc(h.id),R={goals:(((j=h.stats)==null?void 0:j.goals)||0)+(g.goals||0),assists:(((W=h.stats)==null?void 0:W.assists)||0)+(g.assists||0),tackles:(((y=h.stats)==null?void 0:y.tackles)||0)+(g.tackles||0),saves:(((A=h.stats)==null?void 0:A.saves)||0)+(g.saves||0),yellows:(((te=h.stats)==null?void 0:te.yellows)||0)+(g.yellows||0),reds:(((L=h.stats)==null?void 0:L.reds)||0)+(g.reds||0)},$=h.pressRatingSum||0,B=h.pressRatingCount||0,re=$+parseFloat(g.rating||0),X=B+1,oe=re/X,de={stats:R,pendingXP:(h.pendingXP||0)+D,pressRatingSum:re,pressRatingCount:X,pressRatingAvg:parseFloat(oe.toFixed(1)),energy:Math.max(0,(h.energy||100)-25)};g.injury&&(g.recoveryLeft||0)>0&&(de.injury=g.injury,de.recoveryLeft=parseInt(g.recoveryLeft),de.mood="😡");const z=w?w.serie:g.serie;if(z&&!["A","B","C","D","VARZEA"].includes(z)){const J=z,Ae=h.tournaments||{},E=Ae[J]||{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0,ratingSum:0,ratingCount:0};de.tournaments={...Ae,[J]:{goals:E.goals+(g.goals||0),assists:E.assists+(g.assists||0),tackles:E.tackles+(g.tackles||0),saves:E.saves+(g.saves||0),yellows:E.yellows+(g.yellows||0),reds:E.reds+(g.reds||0),ratingSum:E.ratingSum+(parseFloat(g.rating)||0),ratingCount:E.ratingCount+1}}}T.update(S,de),f++}),ee&&ee.id&&w&&!w.neutralFinal){const l=ee.stadiumLevel||1,h=It[l]||It[1],g=ee.ticketPrice||h.minTic,v=1-(g-h.minTic)/(h.maxTic-h.minTic||1)*.6,P=(Math.floor(Math.random()*41)+80)/100;let D=Math.floor(h.cap*v*P);D>h.cap&&(D=h.cap);const S=D*g,R=[0,.05,.1,.15,.2,.25][l]||.05;let $=0;const re=[...ee.storeProducts||[]].map(oe=>{let de=1;oe.price>30&&(de=Math.max(.05,30/oe.price));const z=Math.floor(D*R*de),U=Math.min(z,oe.stock);return $+=U*oe.price,{...oe,stock:oe.stock-U}}),X=d.collection("teams").doc(ee.id);T.update(X,{balance:q.firestore.FieldValue.increment(S),storeBalance:q.firestore.FieldValue.increment($),storeProducts:re})}const p={};let b=0;k.forEach(l=>{l.player&&l.player.teamId&&l.player.teamId!=="FREE"&&(p[l.player.teamId]=l.match.result,b+=l.match.goals||0)});const C=Object.keys(p)[0];if(Object.keys(p).forEach(l=>{if(p[l]!=="NENHUM"){const h=i.find(g=>g.id===l);if(h){let g={},v=h.recentForm||[];v.unshift(p[l]),v.length>5&&v.pop(),g.recentForm=v;const P=w&&w.isEstadual;if(["A","B","C","D","VARZEA"].includes(h.serie)||P){let R={...P?h.stateStats||{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}:h.stats||{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0}};R.gf+=b,p[l]==="VITORIA"?(R.pts+=3,R.wins+=1):p[l]==="EMPATE"?(R.pts+=1,R.draws+=1):p[l]==="DERROTA"&&(R.losses+=1),P?g.stateStats=R:g.stats=R}T.update(d.collection("teams").doc(l),g)}}}),w&&w.id&&C){let l={};C===w.homeId?l.scoreHome=b:C===w.awayId&&(l.scoreAway=b),l.status="FINISHED",T.update(d.collection("matches").doc(w.id),l)}await T.commit(),a(!1),n(null),alert(`${f} súmula(s) lançada(s) com sucesso!${ee&&!(w!=null&&w.neutralFinal)?`
🏟️ Bilheteria e vendas da Loja contabilizadas!`:""}`)}}}const gi=[{minOv:0,maxOv:45,minSal:500,maxSal:1500,label:"Várzea/Amador"},{minOv:46,maxOv:55,minSal:1500,maxSal:6e3,label:"Iniciante"},{minOv:56,maxOv:65,minSal:5e3,maxSal:18e3,label:"Profissional"},{minOv:66,maxOv:75,minSal:15e3,maxSal:45e3,label:"Estrela"},{minOv:76,maxOv:85,minSal:4e4,maxSal:11e4,label:"Craque"},{minOv:86,maxOv:99,minSal:1e5,maxSal:3e5,label:"Lenda"}],Qd=t=>{const e=parseInt(t)||0;return gi.find(n=>e>=n.minOv&&e<=n.maxOv)||gi[0]},eu=(t,e,n)=>{const a=Qd(n.overall).minSal,i=parseFloat(t.meta.newSalary)||0,r=e.recentForm||[],o=r.filter(_=>_==="VITORIA").length,u=r.filter(_=>_==="DERROTA").length;let m=1;u>o&&(m=1.2),o>u&&(m=.9);const O=a*m;return i>=O?{decision:"ACCEPT",message:`🤖 O empresário de ${n.name} achou a oferta excelente e aceitou os termos contratuais!`}:i>=O*.8?{decision:"COUNTER",counterValue:O,message:`🤖 O jogador tem interesse no ${e.name}, mas pede um ajuste salarial para ${Q(O)}.`}:{decision:"REJECT",message:`🤖 A proposta salarial foi considerada muito baixa pelo staff de ${n.name}. Negociação encerrada.`}},tu={USER:"teams",PLAYER:"players",COACH:"users",DOCTOR:"users",SCOUT:"users",ASSISTANT:"users"},nu=new Set(["VEICULO","IMOVEL","TECNOLOGIA","LUXO"]);async function au(t,e,{user:n,productId:a,sellerId:i,giftTarget:r,expectedPrice:o,now:u=Date.now()}){var ae;const m=tu[n==null?void 0:n.type];if(!m||!((ae=n.data)!=null&&ae.id))throw new Error("Entre em uma conta para comprar.");const O=t.collection(m).doc(n.data.id),_=t.collection("products").doc(a),N=t.collection("companies").doc(i),x=t.collection("sales").doc(),Z=t.collection("news").doc(),ne=r?t.collection("players").doc(r.id):O,G=new Date(u).toDateString();return t.runTransaction(async ce=>{const[ee,w,k,T]=await Promise.all([ce.get(O),ce.get(_),ce.get(N),ce.get(ne)]);if(![ee,w,k,T].every(S=>S.exists))throw new Error("Conta, produto ou destinatário não encontrado.");const f=ee.data(),I=w.data(),p=k.data(),b=T.data(),C=Number(I.price),l=Number(I.stock),h=Number(f.balance||0);if(!Number.isFinite(C)||C<0||!Number.isFinite(h))throw new Error("Preço ou saldo inválido.");if(C!==Number(o))throw new Error("O preço mudou. Abra o produto novamente antes de comprar.");if(I.companyId!==i||p.status!=="ACTIVE")throw new Error("Esta loja não está disponível.");if(!Number.isFinite(l)||l<1)throw new Error("Produto Esgotado!");if(h<C)throw new Error("Saldo insuficiente!");const g=f.giftTracker||{date:"",count:0},v=g.date===G&&Number(g.count)||0;if(r&&v>=7)throw new Error("Você atingiu o limite máximo de 7 presentes enviados por dia!");const P=nu.has(I.cat)?(parseInt(I.power)||0)*100:0,D={balance:e.increment(-C)};return r&&(D.giftTracker={date:G,count:v+1}),ce.update(O,D),ce.update(N,{balance:e.increment(C)}),ce.update(_,{stock:e.increment(-1)}),r&&P>0&&ce.update(ne,{fame:e.increment(P)}),ce.set(x,{companyId:i,buyerId:ne.id,buyerName:b.name||"",giftedBy:r?f.name||"":null,productOriginalId:a,productName:I.name||"",price:C,cost:0,profit:C,img:I.img||null,cat:I.cat||"",power:parseInt(I.power)||0,fameGained:P,date:u}),r&&(P>0||C>5e5)&&ce.set(Z,{text:`🎁 **MIMO DE LUXO!**
O ${f.name} acabou de enviar um(a) **${I.name}** caríssimo(a) de presente para **${b.name}**! O que será que está por trás dessa generosidade? 👀`,type:"biz",date:u,likes:[]}),{fameBonus:P,balance:h-C,giftTracker:D.giftTracker||f.giftTracker}})}const iu={SAUDE:"💊 Saúde (+Energia)",CONSUMIVEL:"⚡ Consumível (+Energia)",CHUTEIRA:"👟 Chuteira (+XP Treino)",LUVAS:"🧤 Luvas (+XP Treino)",VEICULO:"🚗 Veículo (+Fama)",IMOVEL:"🏠 Imóvel (+Fama)",TECNOLOGIA:"📱 Tecnologia (+Fama)",LUXO:"💎 Luxo/Moda (+Fama)"};function su(t,e){const{coaches:n,user:a,setModal:i,products:r,sps:o,companies:u,buyingRef:m,setLoading:O,players:_,teams:N}=t,x=(...l)=>e.postNews(...l);return{handleSendCoachOffer:async(l,h,g,v)=>{const P=n.find(D=>D.id===l);P&&(await d.collection("offers").add({type:"COACH_OFFER",coachId:l,staffType:P.type,recipientId:l,senderId:a.data.id,teamId:a.data.id,teamName:a.data.name,coachName:P.name,salary:parseFloat(h),contract:parseInt(g),clause:parseFloat(v),status:"PENDING",createdAt:Date.now()}),i(null),alert(`Proposta enviada para ${P.name}!`))},handleCounterCoachOffer:async(l,h,g,v)=>{if(a.data.level<2)return alert("Apenas profissionais Nível 2+ podem negociar valores!");await d.collection("offers").doc(l.id).update({salary:parseFloat(h),contract:parseInt(g),clause:parseFloat(v),status:"COUNTERED",recipientId:l.teamId,senderId:a.data.id}),alert("Contra-proposta enviada ao clube!")},handleFinalizeCoachContract:async l=>{const h=l.teamId,g=l.coachId||(l.recipientId===h?l.senderId:l.recipientId),v=l.staffType||"COACH",D=(await d.collection("teams").doc(h).get()).data();if(D.balance<l.salary)return alert("O time não tem saldo para pagar as luvas (1º salário)!");const S=d.batch(),R=n.find(B=>B.teamId===h&&B.status==="ACTIVE"&&B.type===v);R&&S.update(d.collection("users").doc(R.id),{teamId:"FREE",contract:0});const $=parseFloat(l.luvas)||0;S.update(d.collection("users").doc(g),{teamId:h,salary:parseFloat(l.salary),contract:parseInt(l.contract),clause:parseFloat(l.clause),balance:q.firestore.FieldValue.increment($)}),S.update(d.collection("teams").doc(h),{balance:D.balance-l.salary-$}),S.delete(d.collection("offers").doc(l.id)),await S.commit(),alert(`Contrato assinado! ${l.coachName} agora integra o Staff do ${l.teamName}.`)},saveProduct:async l=>{const h=parseFloat(l.price),g={name:l.name,price:h,img:l.img,desc:l.desc,cat:l.cat||"CHUTEIRA",companyId:a.data.id,power:l.power||0,stock:parseInt(l.stock)||0};if(l.id){const v=r.find(P=>P.id===l.id);v&&h<v.price&&x(`🚨 **PROMOÇÃO!**
A **${a.data.name}** baixou o preço de **${l.name}**!
De: ${Q(v.price)} ➝ Por: ${Q(h)}`,"biz"),delete g.companyId,await d.collection("products").doc(l.id).update(g)}else await d.collection("products").add(g),x(`🛍️ **NOVIDADE**
A **${a.data.name}** lançou: **${l.name}** (${iu[g.cat]}) por ${Q(h)}.`,"biz")},requestSponsorship:async(l,h)=>{if(o.find(v=>v.companyId===l&&v.teamId===a.data.id))return alert("Já existe uma negociação ou contrato ativo com esta empresa.");const g=u.find(v=>v.id===l);await d.collection("sponsorships").add({companyId:l,companyName:g.name,teamId:a.data.id,teamName:a.data.name,value:parseFloat(h),status:"PENDING"}),alert("Proposta enviada para a empresa!")},processSponsorship:async(l,h)=>{h==="REJECTED"||h==="CANCELLED"?confirm(h==="REJECTED"?"Recusar proposta?":"Cancelar contrato?")&&await d.collection("sponsorships").doc(l.id).delete():h==="ACTIVE"&&(await d.collection("sponsorships").doc(l.id).update({status:"ACTIVE"}),x(`🤝 **NOVO PATROCÍNIO**
A **${a.data.name}** agora patrocina o **${l.teamName}**!`,"biz"))},buyProduct:async(l,h,g=null)=>{if(m.current)return;const v=Number(l.price);if(!Number.isFinite(v)||v<0)return alert("Preço inválido.");if(confirm(g?`Comprar ${l.name} como PRESENTE para ${g.name} por ${Q(v)}?`:`Comprar ${l.name} por ${Q(v)}?`)){m.current=!0,O(!0);try{const P=await au(d,q.firestore.FieldValue,{user:a,productId:l.id,sellerId:h.id,giftTarget:g,expectedPrice:v});let D=g?`✅ Presente enviado com sucesso para ${g.name}!`:"✅ Compra realizada com sucesso!";!g&&P.fameBonus>0&&(D+=`
🌟 FAMA +${P.fameBonus}`),alert(D)}catch(P){alert("Erro ao processar compra: "+P.message)}finally{m.current=!1,O(!1)}}},handleAcceptCoachOffer:async l=>{const h=l.teamId,g=a.data,P=(await d.collection("teams").doc(h).get()).data();if(P.balance<l.value)return alert("O time não tem mais saldo para te contratar! Proposta cancelada.");const D=d.batch(),S=n.find(R=>R.teamId===h&&R.status==="ACTIVE");S&&D.update(d.collection("users").doc(S.id),{teamId:"FREE"}),g.teamId&&g.teamId,D.update(d.collection("users").doc(g.id),{teamId:h,salary:l.value}),D.update(d.collection("teams").doc(h),{balance:P.balance-l.value}),D.delete(d.collection("offers").doc(l.id)),await D.commit(),alert(`Parabéns! Você agora é técnico do ${l.teamName}!`)},handleRejectCoachOffer:async l=>{await d.collection("offers").doc(l.id).delete(),alert("Proposta recusada.")},sendOffer:async(l,h,g,v,P,D,S)=>{const R=parseFloat(g)||0,$=parseInt(P)||1,B=a.data.name,re=l.name,X=parseFloat(D.newSalary)||0,oe=D.role||"ROTACAO";if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(l.type))try{O(!0);const j=parseFloat(D.signingBonus)||0,W=q.firestore();return S&&S.id?await W.collection("offers").doc(S.id).update({salary:X,contract:$,luvas:j,status:"PENDING",recipientId:l.id,senderId:a.data.id}):await W.collection("offers").add({type:"COACH_OFFER",coachId:l.id,staffType:l.type,recipientId:l.id,senderId:a.data.id,teamId:a.data.id,teamName:B,coachName:l.name,salary:X,contract:$,clause:X*10,luvas:j,status:"PENDING",createdAt:Date.now()}),O(!1),i(null),alert(`📋 Proposta formal enviada para ${l.name}! Aguarde a resposta na sua Caixa de Entrada.`)}catch{return O(!1),alert("Erro ao enviar proposta para a Comissão Técnica.")}if(l.isNPC&&a.type==="USER"){const j=_.filter(W=>W.teamId===a.data.id&&W.isNPC).length;if(j>=7&&l.teamId!==a.data.id){alert(`🚫 LIMITE DA BASE ATINGIDO!
Você já tem 7/7 BOTS no elenco. Você só poderá contratar outro quando 1 deles sair do elenco.`);return}if(l.teamId!==a.data.id&&!confirm(`⚠️ AVISO DA BASE

Atualmente você tem ${j}/7 BOTS no elenco.
Tem certeza que quer enviar esta proposta para ${l.name}?

Assim que você completar 7 de 7, você só poderá contratar outro quando 1 deles sair do elenco.`))return}let z;const U=l.teamId==="FREE"||!l.teamId;if(S&&S.id?S.type==="RENOVACAO_URGENTE"?z=S.playerId:S.sellerAccepted===!0?z=a.data.id===S.buyerId?S.playerId:S.buyerId:z=a.data.id===S.buyerId?S.sellerId==="FREE"||!S.sellerId?S.playerId:S.sellerId:S.buyerId:h==="PRE_CONTRATO"||h==="RENOVACAO"?z=l.id:z=U?l.id:l.teamId,l.isNPC&&a.type==="USER"&&z===l.id){const j=N.find(y=>y.id===a.data.id),W=eu({meta:{newSalary:X}},j,l);if(W.decision==="REJECT"){alert(W.message);return}else if(W.decision==="COUNTER")if(confirm(`${W.message}

Você aceita pagar ${Q(W.counterValue)} de salário para fechar negócio AGORA?`))D.newSalary=W.counterValue;else{alert("Negociação cancelada. O jogador encerrou as conversas.");return}else W.decision==="ACCEPT"&&alert(W.message);try{O(!0);const y=q.firestore(),A=y.batch(),te=parseFloat(D.signingBonus)||0;return j.balance<te?(O(!1),alert(`Seu clube não tem ${Q(te)} no caixa para pagar as Luvas de Assinatura. O negócio melou!`)):(te>0&&A.update(y.collection("teams").doc(a.data.id),{balance:q.firestore.FieldValue.increment(-te)}),A.update(y.collection("players").doc(l.id),{teamId:a.data.id,status:"NAO_A_VENDA",contract:$,salary:parseFloat(D.newSalary),role:oe,balance:q.firestore.FieldValue.increment(te),history:q.firestore.FieldValue.arrayUnion({date:Date.now(),from:U?"AGENTE LIVRE":"Clube Anterior",to:a.data.name,type:h,value:0})}),S&&S.id&&A.delete(y.collection("offers").doc(S.id)),await A.commit(),x(`🤝 **NOVA CONTRATAÇÃO!**
O Atleta da Base **${l.name}** aceitou os termos e assinou com o **${a.data.name}**!`,"transfer"),O(!1),i(null),alert(`Negócio fechado! ${l.name} já está no seu elenco.`))}catch(y){return O(!1),alert("Erro ao assinar com o Bot: "+y.message)}}try{let j=`💰 Taxa: ${Q(R)}
`;D.installments>1&&(j+=`📅 Parcelamento: ${D.installments}x de ${Q(R/D.installments)}
`),D.sellOn>0&&(j+=`📈 Revenda: ${D.sellOn}%
`),h==="PRE_CONTRATO"?j=`⚖️ **LEI BOSMAN (PRÉ-CONTRATO)**
O jogador virá a custo zero no início da próxima temporada.
`:h==="RENOVACAO"&&(j=`📝 **PROPOSTA DE RENOVAÇÃO**
A diretoria ofereceu um novo contrato.
`),j+=`📝 Contrato: ${$} anos
`,j+=`💵 Salário Sugerido: ${Q(X)}/sem
`,j+=`👔 Papel: ${oe}`;const W={playerId:l.id,playerName:re,buyerId:(S==null?void 0:S.buyerId)||a.data.id,buyerName:(S==null?void 0:S.buyerName)||B,sellerId:l.teamId||(S==null?void 0:S.sellerId)||"FREE",recipientId:z,type:(S==null?void 0:S.type)==="RENOVACAO_URGENTE"?"RENOVACAO":h,value:R,offerContract:$,description:j,status:"PENDING",sellerAccepted:S&&S.sellerAccepted||!1,meta:{...D,newSalary:X,signingBonus:parseFloat(D.signingBonus)||0,role:oe,installments:parseInt(D.installments)||1,sellOn:parseInt(D.sellOn)||0,hasBuyOption:D.hasBuyOption||!1},date:Date.now()},y=d.batch();S&&S.id&&y.delete(d.collection("offers").doc(S.id)),y.set(d.collection("offers").doc(),W),await y.commit();const A=S&&S.id?"🔄 CONTRAPROPOSTA":h==="PRE_CONTRATO"?"⚖️ PRÉ-CONTRATO":h==="RENOVACAO"?"📝 RENOVAÇÃO":"💼 NOVA OFERTA";x(`${A}
**${B}** enviou uma proposta para **${re}**!

${j}`,"transfer"),i(null),alert("Enviado com sucesso! Aguarde a resposta.")}catch(j){console.error("Erro no Firebase:",j),alert("Erro técnico ao gravar no banco de dados.")}},acceptOffer:async l=>{var h,g,v,P,D;try{if(l.type==="NOTIFICACAO"){await d.collection("offers").doc(l.id).delete(),alert("Confirmado!");return}if(l.type==="PERSONAL_SPONSOR_OFFER"){if(!confirm(`Aceitar o patrocínio da ${l.companyName} por ${Q(l.value)} semanais?
Seu rosto aparecerá na loja deles!`))return;const z=d.batch();z.update(d.collection("players").doc(l.recipientId),{personalSponsor:{companyId:l.senderId,companyName:l.companyName,value:l.value,clause:l.value*4}}),z.delete(d.collection("offers").doc(l.id)),await z.commit(),x(`📸 **NOVA ESTRELA!**
**${l.playerName}** é o mais novo garoto propaganda da marca **${l.companyName}**!`,"biz"),alert("Contrato assinado! Verifique seu Perfil.");return}if(l.type==="PRE_CONTRATO"){if(!confirm(`Confirmar assinatura de Pré-Contrato com ${l.buyerName}?
Você se juntará a eles na próxima temporada.`))return;const z=d.batch();z.update(d.collection("players").doc(l.playerId),{preContract:{teamId:l.buyerId,teamName:l.buyerName,salary:l.meta.newSalary,date:Date.now()},mood:"🤩"}),z.delete(d.collection("offers").doc(l.id)),await z.commit(),x(`📝 **PRÉ-CONTRATO ASSINADO**
**${l.playerName}** assinou com o **${l.buyerName}** e se apresentará na próxima temporada!`,"transfer"),alert("Pré-contrato assinado com sucesso!");return}const S=N.find(z=>z.id===l.buyerId),R=_.find(z=>z.id===l.playerId),$=!l.sellerId||l.sellerId==="FREE",B=$?null:N.find(z=>z.id===l.sellerId);if(l.type==="COMPRA_DEFINITIVA"){if(!S||!R)return alert("Erro: Dados incompletos.");if(S.balance<l.value)return alert(`Saldo insuficiente! Necessário: ${Q(l.value)}`);if(!confirm(`Exercer opção de compra de ${R.name} por ${Q(l.value)}?`))return;const z=d.batch();z.update(d.collection("teams").doc(S.id),{balance:S.balance-l.value}),B&&z.update(d.collection("teams").doc(B.id),{balance:B.balance+l.value}),z.update(d.collection("players").doc(R.id),{teamId:S.id,loanMeta:q.firestore.FieldValue.delete(),status:"NAO_A_VENDA",contract:3,history:q.firestore.FieldValue.arrayUnion({date:Date.now(),from:B?B.name:"EMPRÉSTIMO",to:S.name,type:"COMPRA_DEFINITIVA",value:l.value})}),z.delete(d.collection("offers").doc(l.id)),await z.commit(),x(`✅ **OPÇÃO EXERCIDA**
O **${S.name}** contratou **${R.name}** em definitivo!`,"transfer"),alert("Compra realizada!");return}const re=a.type==="USER"&&a.data.id===l.buyerId,X=a.type==="USER"&&a.data.id===l.sellerId,oe=a.type==="PLAYER"||$&&!re;if(!$&&!l.sellerAccepted&&(X||re)){if(re){if(!confirm(`Aceitar a pedida do clube vendedor (${Q(l.value)}) e negociar com o jogador?`))return}else if(!confirm("Aceitar os valores propostos? O jogador decidirá o contrato agora."))return;await d.collection("offers").doc(l.id).update({recipientId:l.playerId,sellerAccepted:!0,status:"PENDING"}),x(`💰 **ACORDO ENTRE CLUBES**
${S.name} e ${B.name} chegaram a um acordo por **${R.name}**. Falta o "Sim" do atleta!`,"transfer"),alert("Acordo financeiro selado! A proposta foi enviada para o jogador.");return}if(($||l.sellerAccepted)&&(oe||re)){if(!S||!R)return alert("Erro: Dados incompletos.");const z=((h=l.meta)==null?void 0:h.installments)>1?l.value/l.meta.installments:l.value,U=parseFloat((g=l.meta)==null?void 0:g.signingBonus)||0,j=z+U;if(S.balance<j)return alert(`Saldo insuficiente no caixa do comprador!
Necessário: ${Q(j)}`);if(re){if(!confirm(`Aceitar a pedida salarial do jogador e fechar a contratação?
Custo Imediato: ${Q(j)}`))return}else if(!confirm(`Deseja assinar com o ${S.name}?`))return;const W=d.batch();if(B){let te=z;if(R.sellOnClause&&R.sellOnClause.percentage>0){const L=R.sellOnClause.beneficiaryId;if(L&&L!==S.id){const J=z*R.sellOnClause.percentage/100;te-=J,W.update(d.collection("teams").doc(L),{balance:q.firestore.FieldValue.increment(J)})}}if(W.update(d.collection("teams").doc(B.id),{balance:B.balance+te}),((v=l.meta)==null?void 0:v.installments)>1){const L=d.collection("debts").doc();W.set(L,{buyerId:S.id,buyerName:S.name,sellerId:B.id,sellerName:B.name,playerName:R.name,installmentVal:z,weeksRemaining:parseInt(l.meta.installments)-1,date:Date.now()})}}W.update(d.collection("teams").doc(S.id),{balance:S.balance-j}),U>0&&W.update(d.collection("players").doc(R.id),{balance:q.firestore.FieldValue.increment(U)});const y=l.meta&&l.meta.sellOn>0&&B?{beneficiaryId:B.id,percentage:l.meta.sellOn}:q.firestore.FieldValue.delete();W.update(d.collection("players").doc(R.id),{teamId:S.id,status:"NAO_A_VENDA",contract:l.type==="EMPRESTIMO"?parseInt(l.meta.loanDuration)||1:parseInt(l.offerContract)||1,salary:parseFloat((P=l.meta)==null?void 0:P.newSalary)||R.salary,role:((D=l.meta)==null?void 0:D.role)||"ROTACAO",loanMeta:l.type==="EMPRESTIMO"?{ownerId:B==null?void 0:B.id,salarySplit:l.meta.salarySplit||100,hasBuyOption:l.meta.hasBuyOption||!1,buyOpt:l.meta.buyOpt||0,originalContract:R.contract}:null,sellOnClause:y,history:q.firestore.FieldValue.arrayUnion({date:Date.now(),from:$?"AGENTE LIVRE":B?B.name:"Desconhecido",to:S.name,type:l.type,value:l.value})}),W.delete(d.collection("offers").doc(l.id)),await W.commit();const A=$?`✍️ **ASSINOU!**
O Agente Livre **${R.name}** é o novo reforço do **${S.name}**!`:`🤝 **TRANSFERÊNCIA CONCLUÍDA**
**${R.name}** assinou com o **${S.name}**!`;x(A,"transfer"),B&&R.sellOnClause&&R.sellOnClause.percentage>0&&x(`💸 **CLÁUSULA DE REVENDA**
Uma parte da venda de **${R.name}** (${R.sellOnClause.percentage}%) foi repassada ao seu antigo clube formador.`,"money"),alert("Negócio fechado com sucesso!")}}catch(S){console.error(S),alert("Erro ao processar o aceite: "+S.message)}},rejectOffer:async l=>{try{if(l.type==="COMPRA_DEFINITIVA"&&l.isLoanOption){const h=_.find($=>$.id===l.playerId),g=l.sellerId,v=N.find($=>$.id===g);if(!confirm("Deseja recusar a compra? O jogador retornará ao clube de origem."))return;const P=d.batch(),D=d.collection("players").doc(h.id);let S=0;h.loanMeta&&h.loanMeta.originalContract?S=parseInt(h.loanMeta.originalContract):(console.warn("Contrato original não encontrado. Usando fallback de 6 anos."),S=6);let R=S-1;if(R<0&&(R=0),R<=0){const $=d.collection("offers").doc();P.set($,{type:"RENOVACAO_URGENTE",playerId:h.id,playerName:h.name,buyerId:g,buyerName:(v==null?void 0:v.name)||"Clube de Origem",sellerId:"SISTEMA",recipientId:g,status:"PENDING",description:`⚠️ **URGENTE: FIM DE CONTRATO**
O empréstimo de **${h.name}** acabou e o contrato dele com você expirou.

Renove ou libere para os passes livres.`,date:Date.now()}),P.update(D,{teamId:g,loanMeta:q.firestore.FieldValue.delete(),status:"INTRANSFERIVEL",contract:0}),x(`🔙 **RETORNO CRÍTICO**
O empréstimo de ${h.name} acabou e o contrato expirou!`,"rumor")}else{const $=d.collection("offers").doc();P.set($,{type:"NOTIFICACAO",playerId:h.id,playerName:h.name,buyerName:"Sistema",recipientId:g,status:"PENDING",description:`🔙 **RETORNO DE EMPRÉSTIMO**
A opção de compra foi recusada.
**${h.name}** voltou ao seu elenco.

📄 Contrato Restante: ${R} temporada(s).`,date:Date.now()}),P.update(D,{teamId:g,loanMeta:q.firestore.FieldValue.delete(),status:"NAO_A_VENDA",contract:R}),x(`🔙 **RETORNO**
${h.name} retornou ao ${v==null?void 0:v.name} (${R} anos rest.).`,"transfer")}P.delete(d.collection("offers").doc(l.id)),await P.commit(),alert("Opção recusada. Jogador devolvido ao clube de origem.");return}if(l.type==="RENOVACAO_URGENTE"){if(!confirm("Tem certeza? O jogador perderá o vínculo com o clube e irá para os Agentes Livres."))return;const h=d.batch();h.update(d.collection("players").doc(l.playerId),{teamId:"FREE",status:"VENDA",mood:"😐",contract:0}),h.delete(d.collection("offers").doc(l.id)),await h.commit(),x(`🆓 **AGENTE LIVRE**
O vínculo de **${l.playerName}** expirou e ele está livre no mercado!`,"transfer"),alert("Jogador enviado para os Agentes Livres.");return}if(!confirm("Deseja recusar e encerrar esta negociação?"))return;await d.collection("offers").doc(l.id).delete(),l.type!=="NOTIFICACAO"&&x(`❌ **NEGOCIAÇÃO ENCERRADA**
O acordo por **${l.playerName}** não avançou.`,"transfer")}catch(h){console.error(h),alert("Erro técnico ao processar a recusa.")}},renewContract:async l=>{if(!l.teamId||l.teamId==="FREE")return alert("Jogadores livres assinam novos contratos, não renovam!");const h=(parseFloat(l.value)||1e6)*.1;if(a.data.balance<h)return alert(`Saldo insuficiente para bônus de renovação (Custo: ${Q(h)})`);if(confirm(`Renovar com ${l.name}?
Custo: ${Q(h)} (Este valor irá para o saldo do jogador)`))try{const g=d.batch();g.update(d.collection("teams").doc(a.data.id),{balance:q.firestore.FieldValue.increment(-h)}),g.update(d.collection("players").doc(l.id),{contract:(parseInt(l.contract)||0)+1,balance:q.firestore.FieldValue.increment(h),status:"NAO_A_VENDA"}),await g.commit(),x(`📝 **RENOVAÇÃO**
O **${a.data.name}** renovou com **${l.name}**!`,"transfer"),i(null)}catch(g){alert("Erro ao renovar: "+g.message)}},handlePlayerActions:async(l,h)=>{const g=N.find(v=>v.id===h.teamId);if(l==="TRANSFER_REQUEST"){if(!g)return alert("Já és um Agente Livre!");if(h.status==="VENDA")return alert("Já estás na lista de transferências.");if(!confirm(`Tens a certeza que queres pedir para sair do ${g.name}? O adepto não vai gostar...`))return;await d.collection("players").doc(h.id).update({status:"VENDA",mood:"😡"}),x(`💣 **CRISE NO ${g.name.toUpperCase()}!**
O jogador **${h.name}** está insatisfeito e pediu para ser colocado na lista de transferências!`,"rumor"),alert("O pedido foi feito. O teu humor piorou.")}if(l==="ASK_RAISE"){if(!g)return alert("Precisas de um clube para pedir aumento.");if(!confirm("Ir à imprensa pedir um aumento salarial?"))return;x(`💰 **POLÉMICA**
**${h.name}** declara publicamente: "Mereço ganhar mais no ${g.name}. Espero uma renovação em breve."`,"press"),alert("Declaração feita à imprensa! O presidente foi notificado.")}if(l==="DECLARE_HAPPY"){if(!g)return alert("Precisas de um clube.");if(h.mood==="🤩")return alert("Já estás feliz!");await d.collection("players").doc(h.id).update({mood:"🤩",status:"NAO_A_VENDA"}),x(`💙 **AMOR À CAMISA**
**${h.name}** declarou: "Estou muito feliz no ${g.name} e quero fazer história aqui!"`,"press"),alert("Declaração feita! A torcida adorou.")}if(l==="RESET_MOOD"){if(!g)return alert("Precisas de um clube.");await d.collection("players").doc(h.id).update({mood:"😐",status:"NAO_A_VENDA"}),x(`🤝 **PAZES FEITAS**
**${h.name}** retirou seu pedido de transferência e foca novamente no ${g.name}.`,"press"),alert("Voltaste ao normal. Clima apaziguado.")}}}}function fn(t){return Array.isArray(t)?t.map(fn):t&&typeof t=="object"?Object.fromEntries(Object.keys(t).sort().map(e=>[e,fn(t[e])])):t}function $t(t,e){const n=[],a={update(i,r){return n.push(["update",i,r]),a},set(i,r,o){return n.push(["set",i,r,o]),a},delete(i){return n.push(["delete",i]),a},commit(){return t.runTransaction(async i=>{const r=await Promise.all(e.map(o=>i.get(o.ref)));e.forEach((o,u)=>{const m=r[u];if(!m.exists)throw new Error("Este registro já foi alterado ou removido. Atualize e tente novamente.");const O=m.data();for(const[_,N]of Object.entries(o.expected||{}))if(JSON.stringify(fn(O[_]))!==JSON.stringify(fn(N)))throw new Error("Os dados mudaram durante a operação. Confira os valores e tente novamente.")});for(const[o,u,m,O]of n)o==="delete"?i.delete(u):o==="set"&&O?i.set(u,m,O):i[o](u,m)})}};return a}function ru(t,e,n,a){return $t(t,[{ref:e,expected:n}]).update(e,a).commit()}const tn={LEVE:["Fadiga Muscular","Entorse de Tornozelo G1","Contusão na Canela","Corte no Supercílio","Bolhas no Pé","Luxação de Dedo","Pancada no Quadril","Torcicolo","Edema Leve","Câimbras Fortes","Desgaste Físico","Pequena Contusão Lombar","Arranhão na Córnea","Inflamação no Tendão","Pancada no Nariz"],MODERADA:["Estiramento na Coxa G1","Lesão no Adutor","Concussão Leve","Entorse de Tornozelo G2","Tendinite Aquileia","Contusão Óssea","Fibrose Muscular","Fissura no Metatarso","Estiramento na Panturrilha","Lesão no Ligamento Colateral","Sinovite no Joelho","Bursite no Quadril","Contusão Traumática","Luxação de Ombro Parcial","Hérnia Inguinal Inicial"],GRAVE:["Estiramento G2","Ruptura Parcial de Menisco","Pubalgia Crônica","Fratura de Nariz","Lesão de Cartilagem","Entorse de Joelho com Edema","Fratura de Costela","Ruptura Parcial de Tendão","Descolamento Muscular","Lesão Traumática Cervical","Fratura de Malar","Lesão Complexa no Psoas","Entorse de Tornozelo G3","Ruptura de Fibras Grau 3","Edema Ósseo Profundo"],EXTREMA:["Ruptura de LCA (Cruzado)","Ruptura do Tendão de Aquiles","Fratura de Tíbia e Fíbula","Ruptura Total de Isquiotibiais","Hérnia de Disco","Fratura por Estresse","Ruptura de Ligamento Cruzado Posterior","Fratura de Tornozelo","Luxação de Patela Grave","Ruptura Total de Adutor","Lesão Nervosa","Síndrome Compartimental","Fratura de Vértebra","Ruptura de Tendão Patelar","Pneumotórax Traumático"]},ou={1:{name:"Campo de Terra",bonusXP:0,healChance:0,upgCost:5e6,maint:5e3,prompt:"campo de futebol de terra batida amador --ar 16:9"},2:{name:"CT Básico",bonusXP:10,healChance:5,upgCost:15e6,maint:2e4,prompt:"centro de treinamento de futebol simples, campo gramado --ar 16:9"},3:{name:"CT Profissional",bonusXP:25,healChance:10,upgCost:35e6,maint:5e4,prompt:"centro de treinamento de futebol profissional, boa estrutura --ar 16:9"},4:{name:"CT Avançado",bonusXP:40,healChance:20,upgCost:8e7,maint:1e5,prompt:"centro de treinamento moderno com academia visível ao fundo --ar 16:9"},5:{name:"Academia de Elite",bonusXP:60,healChance:30,upgCost:0,maint:2e5,prompt:"melhor centro de treinamento do mundo, piscinas de gelo, tecnologia --ar 16:9"}};function lu(t,e){const{user:n,teams:a,setLoading:i,setSales:r,setUser:o,setModal:u,players:m}=t;return{handleFireCoach:async T=>{const f=n.data,p=(parseFloat(T.salary)||2500)*4;if(confirm(`Demitir ${T.name}?
Você terá que pagar uma multa rescisória de ${Q(p)}.`)){const b=parseFloat(f.balance)||0;if(b<p)return alert("Saldo insuficiente para pagar a rescisão!");const C=d.batch();C.update(d.collection("teams").doc(f.id),{balance:b-p}),C.update(d.collection("users").doc(T.id),{teamId:"FREE",contract:0,salary:2500,balance:q.firestore.FieldValue.increment(p)}),await C.commit(),alert(`${T.name} foi demitido e a multa de ${Q(p)} foi paga.`)}},handleCoachSelfActions:async(T,f)=>{const I=a.find(p=>p.id===f.teamId);if(I){if(T==="RAISE"){const p=prompt("Qual o novo salário semanal desejado?",f.salary);if(!p)return;const b=parseFloat(p);if(b<=f.salary)return alert("O valor deve ser maior que o atual.");await d.collection("offers").add({type:"COACH_RAISE",recipientId:I.id,senderId:f.id,teamName:I.name,coachName:f.name,currentSalary:f.salary,requestedSalary:b,status:"PENDING",description:`💰 **PEDIDO DE AUMENTO**
O técnico **${f.name}** pede um reajuste salarial.
Atual: ${Q(f.salary)} ➝ Pedido: ${Q(b)}`,date:Date.now()}),alert("Pedido de aumento enviado à diretoria!")}if(T==="RESIGN_REQ"){if(!confirm("Enviar pedido de demissão amigável? O clube pode recusar."))return;await d.collection("offers").add({type:"COACH_RESIGN",recipientId:I.id,senderId:f.id,teamName:I.name,coachName:f.name,status:"PENDING",description:`👋 **PEDIDO DE DESLIGAMENTO**
O técnico **${f.name}** deseja rescindir o contrato amigavelmente (sem multa).`,date:Date.now()}),alert("Pedido de desligamento enviado!")}if(T==="BUYOUT"){const p=f.clause||f.salary*10;if(f.balance<p)return alert(`Saldo insuficiente! Você precisa de ${Q(p)}.`);if(!confirm(`TEM CERTEZA? Você pagará ${Q(p)} do seu bolso para ficar livre agora.`))return;const b=d.batch(),C=parseFloat(f.balance)||0,l=parseFloat(I.balance)||0;b.update(d.collection("users").doc(f.id),{balance:C-p,teamId:"FREE",contract:0,salary:2500}),b.update(d.collection("teams").doc(I.id),{balance:l+p}),await b.commit(),alert("Multa paga! Você está livre no mercado."),window.location.reload()}}},handleCoachIndication:async(T,f)=>{await d.collection("offers").add({type:"COACH_SUGGESTION",teamId:n.data.teamId,recipientId:n.data.teamId,senderId:n.data.id,senderName:n.data.name,playerId:T.id,playerName:T.name,playerPos:T.position,playerOv:T.overall,playerVal:T.value,status:"PENDING",description:`💡 **INDICAÇÃO DO TÉCNICO**
${n.data.name} sugere a contratação de **${T.name}** (${T.position}).

📝 Obs: "${f||"Sem observações"}"`,date:Date.now()}),alert("Indicação enviada para a diretoria!")},handleCoachUseItem:async T=>{if(!n.data||!["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(n.type))return;const f=new Date().toDateString(),p=(n.data.lastToxicityDate||"")===f&&n.data.toxicity||0,b=n.data.energy!==void 0?n.data.energy:100;if(b>=100)return alert("Sua energia já está cheia! Guarde o item para depois.");i(!0);try{const C=$t(d,[{ref:d.collection("sales").doc(T.id),expected:{buyerId:n.data.id}},{ref:d.collection("users").doc(n.data.id),expected:{energy:n.data.energy,toxicity:n.data.toxicity,fame:n.data.fame,equippedItem:n.data.equippedItem}}]),l=d.collection("users").doc(n.data.id),h=d.collection("sales").doc(T.id);let g="SUCCESS";if(p===2?Math.random()<.4&&(g="SICK"):p>=3&&Math.random()<.95&&(g="VOMIT"),g==="VOMIT"||g==="SICK")C.update(l,{energy:0,toxicity:p+1,lastToxicityDate:f}),C.delete(h),await C.commit(),r(v=>v.filter(P=>P.id!==T.id)),o(v=>({...v,data:{...v.data,energy:0,toxicity:p+1}})),alert(g==="VOMIT"?`🤮 VÔMITO! Você comeu demais e seu estômago rejeitou tudo.
Resultado: Energia ZERADA.`:`🤢 ENJOO FORTE! O item não caiu bem.
Resultado: Você precisou deitar e sua energia zerou.`);else{const v=parseInt(T.power)||0,P=Math.min(100,b+v);C.update(l,{energy:P,toxicity:p+1,lastToxicityDate:f}),C.delete(h),await C.commit(),r(D=>D.filter(S=>S.id!==T.id)),o(D=>({...D,data:{...D.data,energy:P,toxicity:p+1}})),p===1?alert(`⚡ Energia recuperada: +${v}% (Total: ${P}%)
⚠️ CUIDADO: Foi seu 2º item hoje. O próximo tem risco de intoxicação.`):p>=2?alert(`⚡ Energia recuperada: +${v}%
⛔ PERIGO: Seu estômago está no limite! Pare de consumir agora!`):alert(`⚡ Energia recuperada: +${v}% (Total: ${P}%)`)}}catch(C){console.error(C),alert("Erro ao usar item: "+C.message)}i(!1)},handleUseItem:async(T,f)=>{var I;if(!(!n.data||n.type!=="PLAYER")){i(!0);try{const p=$t(d,[{ref:d.collection("sales").doc(T.id),expected:{buyerId:n.data.id}},{ref:d.collection("players").doc(n.data.id),expected:{energy:n.data.energy,toxicity:n.data.toxicity,fame:n.data.fame,equippedItem:n.data.equippedItem}}]),b=d.collection("sales").doc(T.id),C=d.collection("players").doc(n.data.id);if(f==="CONSUME"){const l=new Date().toDateString(),g=(n.data.lastToxicityDate||"")===l&&n.data.toxicity||0;if(((I=n.data.injury)==null?void 0:I.type)==="INTOXICACAO"){alert(`🤢 VOCÊ ESTÁ INTOXICADO!
Seu estômago não aceita nada. Espere o dia virar para melhorar.`),i(!1);return}let v="SUCCESS";if(g===2?Math.random()<.4&&(v="SICK"):g>=3&&Math.random()<.95&&(v="VOMIT"),v==="VOMIT"){p.update(C,{energy:0,mood:"😡",toxicity:g+1,lastToxicityDate:l}),p.delete(b),await p.commit(),r(R=>R.filter($=>$.id!==T.id)),o(R=>({...R,data:{...R.data,energy:0,mood:"😡",toxicity:g+1}})),alert(`🤮 VÔMITO!

Você consumiu demais! Seu corpo rejeitou tudo.

Efeito: Energia ZERADA e Humor piorado.`),i(!1);return}if(v==="SICK"){const R={type:"INTOXICACAO",label:"Intoxicação Alimentar",games:1,isIncurable:!0};p.update(C,{injury:R,recoveryLeft:1,toxicity:g+1,lastToxicityDate:l}),p.delete(b),await p.commit(),r($=>$.filter(B=>B.id!==T.id)),o($=>({...$,data:{...$.data,injury:R,toxicity:g+1}})),alert(`🤢 INTOXICAÇÃO ALIMENTAR!

Seu estômago não aguentou.

Efeito: Você foi internado e terá que esperar melhorar naturalmente (1 dia).`),i(!1);return}const P=parseInt(T.power)||0,D=n.data.energy||0;if(P>0&&D>=100){alert("Sua energia já está cheia!"),i(!1);return}const S=Math.min(100,D+P);p.update(C,{energy:S,toxicity:g+1,lastToxicityDate:l}),p.delete(b),await p.commit(),r(R=>R.filter($=>$.id!==T.id)),o(R=>({...R,data:{...R.data,energy:S,toxicity:g+1}})),g===1?alert(`⚡ Energia recuperada: +${P}%
⚠️ CUIDADO: Foi seu 2º energético hoje. O próximo tem risco de intoxicação.`):g>=2?alert(`⚡ Energia recuperada...
⛔ PERIGO: Seu estômago está no limite! Pare de consumir agora!`):alert(`⚡ Energia recuperada: +${P}% (Total: ${S}%)`)}f==="EQUIP"&&(p.update(C,{equippedItem:{id:T.id,name:T.productName,cat:T.cat,power:parseInt(T.power)||0,img:T.img}}),p.delete(b),await p.commit(),r(l=>l.filter(h=>h.id!==T.id)),alert(`🛡️ Item equipado: ${T.productName}
Ele será consumido automaticamente no próximo treino.`))}catch(p){console.error("Erro ao usar item:",p),alert("Erro ao processar item. Tente novamente.")}finally{i(!1)}}},savePlayer:async T=>{try{const f={...T};T.id?await d.collection("players").doc(T.id).update(f):(f.attributes||(f.attributes=mn(f.position||"ATA",f.overall||60)),await d.collection("players").add(f)),u(null)}catch(f){console.error(f),alert("Erro ao salvar jogador: "+f.message)}},handleUpdateCoachSalary:async T=>{if(n.data.level<2)return alert("Nível insuficiente!");if(T<1e3)return alert("Salário mínimo é 1.000!");await d.collection("users").doc(n.data.id).update({salary:parseInt(T)}),alert("Valor de mercado atualizado!")},handleAssistantRegen:async T=>{const f=n.data,I=f.perks||[],p=I.some(B=>B.id==="COFFEE_LOVER"),b=I.some(B=>B.id==="ICE_BATH"),C=I.some(B=>B.id==="GOOD_VIBES"),l=I.some(B=>B.id==="LIGHT_WORK"),h=p?10:20,g=f.energy!==void 0?f.energy:100;if(g<h)return alert(`Você está muito cansado! Energia atual: ${g}% (Necessário: ${h}%)`);if(T.length===0)return alert("Selecione os jogadores que vão pra banheira de gelo!");i(!0);const v=d.batch();let P=[];T.forEach(B=>{const re=m.find(j=>j.id===B);if(!re)return;if((re.recoveryLeft||0)>0){P.push(`⚠️ ${re.name} ignorado (Já está sob cuidados do DM).`);return}let X=25;b&&(X+=15);const oe=Math.min(100,(re.energy!==void 0?re.energy:100)+X);let de=Math.floor(Math.random()*3)+1;l&&(de+=5);let z={energy:oe,xp:(re.xp||0)+de},U="";C&&Math.random()<.3&&(z.mood="🤩",U=" e ficou muito feliz (🤩)!"),v.update(d.collection("players").doc(B),z),P.push(`🔋 ${re.name} recuperou +${X}⚡ (+${de} XP)${U}`)});let D=(f.xp||0)+20,S=f.level,R=f.pendingPerks||0;D>=S*100&&S<30&&(D-=S*100,S++,S%3===0&&R++,alert(`🎉 PARABÉNS! Nível ${S} alcançado!`)),v.update(d.collection("users").doc(f.id),{energy:g-h,xp:D,level:S,pendingPerks:R});const $=a.find(B=>B.id===f.teamId);if($){let B=[...$.trainingLogs||[]];B.unshift({date:Date.now(),type:"🧊 REGENERATIVO (AUXILIAR)",report:P.join(`
`)}),B.length>10&&B.pop(),v.update(d.collection("teams").doc($.id),{trainingLogs:B})}await v.commit(),i(!1),alert(`Sessão de Recuperação finalizada!

${P.join(`
`)}`)},handleCoachTrain:async(T,f)=>{const I=n.data,p=I.energy!==void 0?I.energy:100,b=T.length>0?20:30;if(p<b)return alert(`Você está muito cansado para realizar esta atividade! Energia atual: ${p}% (Necessário: ${b}%)`);i(!0);const C=d.batch();let l=0,h=[];const g=I.perks||[],v=g.find(L=>L.type==="ENERGY_SAVE"),P=v?Math.round(25*v.value):25,D=g.find(L=>L.type==="CRIT_CHANCE"),S=D?D.value:0,R=g.find(L=>L.type==="MIN_XP_BOOST"),$=R?R.value:0,B=g.find(L=>L.type==="AFFINITY_BOOST"),re=B?B.value:0,X=a.find(L=>L.id===I.teamId),oe=(X==null?void 0:X.ctLevel)||1,de=ou[oe].bonusXP/100;let z=[];f==="FISICO_BASE"?z=["stamina","balance","condition","strength"]:f==="VELOCIDADE"?z=["speed","accel","agility","dribbleSpd"]:f==="IMPULSAO"?z=["jump","header","condition"]:f==="CHUTE"?z=["shot","shotPower","shotTech","weakFootAcc"]:f==="PASSE"?z=["shortPass","longPass","shortPassSpd","longPassSpd","tech","weakFootFreq"]:f==="DRIBLE"?z=["dribble","dribbleSpd","agility","tech"]:f==="DEFESA"?z=["defense","aggression","response"]:f==="MENTAL"?z=["teamwork","mentality","response"]:f==="BOLA_PARADA"?z=["freeKick","curve","header","penalties"]:f==="GOLEIRO"?z=["gk","response","jump","longPass"]:f==="STUDY"&&(z=[]),T.forEach(L=>{const J=m.find(le=>le.id===L);if(!J)return;const Ae=J.energy!==void 0?J.energy:100;if((J.recoveryLeft||0)>0){h.push(`⚠️ ${J.name} ignorado (está lesionado)`);return}if(Ae<P){h.push(`⚠️ ${J.name} ignorado (exausto: ${Ae}%)`);return}if(Math.random()<.01){const le=tn.LEVE[Math.floor(Math.random()*tn.LEVE.length)];C.update(d.collection("players").doc(J.id),{injury:le,recoveryLeft:1,energy:Math.max(0,Ae-15),mood:"😡"}),h.push(`❌ ${J.name} se lesionou no treino: ${le}`);return}const E=Ae-P;let H=Math.floor(Math.random()*5)+8+$,K=H+Math.floor(H*de);if((I.affinities||[]).includes(J.position)&&(K+=5+re),J.equippedItem){const le=J.equippedItem.power||0,ge=Math.ceil(K*(le/100));K+=ge,h.push(`👟 ${J.name} usou ${J.equippedItem.name} (+${ge} XP)`),C.delete(d.collection("sales").doc(J.equippedItem.id)),C.update(d.collection("players").doc(L),{equippedItem:q.firestore.FieldValue.delete()})}g.forEach(le=>{le.type==="TRAIN_BOOST"&&le.attrs.some(Ie=>z.includes(Ie))&&(K=Math.round(K*le.multiplier)),le.type==="YOUTH_BOOST"&&(J.age||18)<=le.ageLimit&&(K=Math.round(K*le.multiplier))}),Math.random()<.1+S&&(K*=2,h.push(`🔥 ${J.name} teve uma GRANDE evolução (+${K} XP)!`));let _e={...J.attributes||{}};z.forEach(le=>{(_e[le]||50)<99&&Math.random()<K/80&&(_e[le]=(_e[le]||50)+1)});let se={xp:(J.xp||0)+K,energy:E,attributes:_e};if(J.learningPosition)if(f===ia[J.learningPosition.target].train){let le=10;(I.affinities||[]).includes(J.learningPosition.target)&&(le+=5),le+=oe*2;const ge=J.learningPosition.current+le;ge>=J.learningPosition.required?(h.push(`🌟 ${J.name} APRENDEU a jogar de ${J.learningPosition.target}! (O Boost de atributos entrará na próxima temporada)`),se.secondaryPositions=q.firestore.FieldValue.arrayUnion(J.learningPosition.target),se.learningPosition=q.firestore.FieldValue.delete(),se.pendingPosBoosts=q.firestore.FieldValue.arrayUnion(J.learningPosition.target)):(se["learningPosition.current"]=ge,h.push(`🔄 ${J.name} adaptando para ${J.learningPosition.target}: ${Math.min(100,Math.floor(ge/J.learningPosition.required*100))}%`))}else h.push(`⚠️ ${J.name} precisa do treino de ${ia[J.learningPosition.target].train} para evoluir na nova posição.`);C.update(d.collection("players").doc(L),se),l+=20,h.push(`✔️ ${J.name} evoluiu +${K} XP (Desgaste: -${P}⚡)`)}),f==="STUDY"&&(l=Math.floor(Math.random()*10)+15,h.push("📚 Você dedicou tempo estudando novas táticas e evoluiu como treinador."));let U=(I.xp||0)+l,j=I.level,W=I.pendingPerks||0,y=I.pendingAffinity||0;const A=j*120;if(U>=A&&j<30&&(U-=A,j++,j%5===0&&W++,[10,20,30].includes(j)&&y++,alert(`🎉 PARABÉNS! Nível ${j} alcançado!`)),C.update(d.collection("users").doc(I.id),{energy:p-b,xp:U,level:j,pendingPerks:W,pendingAffinity:y}),X){let L=[...X.trainingLogs||[]];L.unshift({date:Date.now(),type:f,report:h.join(`
`)}),L.length>10&&L.pop(),C.update(d.collection("teams").doc(X.id),{trainingLogs:L})}await C.commit(),i(!1);let te=f==="STUDY"?"Estudo concluído!":"Treino realizado com sucesso!";h.length>0&&(te+=`

`+h.join(`
`)),alert(te)},handleEvolveCoachPerk:async T=>{await d.collection("users").doc(n.data.id).update({perks:q.firestore.FieldValue.arrayUnion(T),pendingPerks:q.firestore.FieldValue.increment(-1)}),o(f=>({...f,data:{...f.data,perks:[...f.data.perks||[],T],pendingPerks:(f.data.pendingPerks||1)-1}})),alert(`Habilidade "${T.name}" aprendida!`)},updateTeamStats:async(T,f)=>{await d.collection("teams").doc(T).update({stats:f}),alert("Tabela atualizada!")},handlePlayerSoloTrain:async(T,f)=>{const I=T.energy!==void 0?T.energy:100;if(I<35)return alert(`Exausto (${I}%)! Precisa de 35%.`);if((T.recoveryLeft||0)>0)return alert("Você está lesionado e não pode treinar!");i(!0);const p=d.batch();let b=[];if(Math.random()<.02){const S=tn.LEVE[Math.floor(Math.random()*tn.LEVE.length)];return p.update(d.collection("players").doc(T.id),{injury:S,recoveryLeft:1,energy:Math.max(0,I-20),mood:"😡"}),await p.commit(),i(!1),alert(`❌ INFORTÚNIO!
Lesão no treino: ${S}
1 Jogo fora.`)}let C=[];f==="FISICO_BASE"?C=["stamina","balance","condition","strength"]:f==="VELOCIDADE"?C=["speed","accel","agility","dribbleSpd"]:f==="IMPULSAO"?C=["jump","header","condition"]:f==="CHUTE"?C=["shot","shotPower","shotTech","weakFootAcc"]:f==="PASSE"?C=["shortPass","longPass","shortPassSpd","longPassSpd","tech","weakFootFreq"]:f==="DRIBLE"?C=["dribble","dribbleSpd","agility","tech"]:f==="DEFESA"?C=["defense","aggression","response"]:f==="MENTAL"?C=["teamwork","mentality","response"]:f==="BOLA_PARADA"?C=["freeKick","curve","header","penalties"]:f==="GOLEIRO"&&(C=["gk","response","jump","longPass"]);let l=Math.floor(Math.random()*8)+8;const h=I-35;if(T.equippedItem){const S=Math.ceil(l*((T.equippedItem.power||0)/100));l+=S,b.push(`Usou ${T.equippedItem.name} (+${S} XP)`),p.delete(d.collection("sales").doc(T.equippedItem.id)),p.update(d.collection("players").doc(T.id),{equippedItem:q.firestore.FieldValue.delete()})}let g={...T.attributes||{}},v=!1;C.forEach(S=>{(g[S]||50)<99&&Math.random()<.15&&(g[S]=(g[S]||50)+1,v=!0)}),p.update(d.collection("players").doc(T.id),{xp:(T.xp||0)+l,energy:h,attributes:g});const P=a.find(S=>S.id===T.teamId);if(P){let S=[...P.trainingLogs||[]],R=`${T.name} fez um treino extra e ganhou +${l} XP.`;v&&(R+=" Alguns atributos evoluíram!"),S.unshift({date:Date.now(),type:"🏃‍♂️ TREINO SOLO",report:R}),S.length>15&&S.pop(),p.update(d.collection("teams").doc(P.id),{trainingLogs:S})}await p.commit(),i(!1);let D=`Treino concluído!
Energia: -35%
XP: +${l}`;b.length>0&&(D+=`
${b.join(`
`)}`),alert(D)}}}const Ai=60;async function cu(t,e){const n=await t.orderBy("date","desc").limit(Ai).get();if(n.docs.length<Ai)return;const a=await t.orderBy("date","desc").startAfter(n.docs.at(-1)).limit(100).get();if(a.empty)return;const i=e.batch();a.docs.forEach(r=>i.delete(r.ref)),await i.commit()}function du(t,e){const{user:n,posts:a,setChatMessages:i}=t;return{postNews:(x,Z="normal")=>d.collection("news").add({text:x,type:Z,date:Date.now()}),handleSocialPost:async(x,Z)=>{const ne=d.batch(),G=d.collection("posts").doc();if(ne.set(G,{authorId:n.data.id,authorName:n.data.name,authorLogo:n.data.logo||n.data.face||null,text:x,img:Z,date:Date.now(),likes:[]}),a.length>=50){const ae=a[a.length-1];if(ae){const ce=d.collection("posts").doc(ae.id);ne.delete(ce)}}await ne.commit()},handleSocialLike:async x=>{const Z=n.data.id;(x.likes||[]).includes(Z)?await d.collection("posts").doc(x.id).update({likes:q.firestore.FieldValue.arrayRemove(Z)}):await d.collection("posts").doc(x.id).update({likes:q.firestore.FieldValue.arrayUnion(Z)})},handleSocialDelete:async x=>{confirm("Apagar esta publicação?")&&await d.collection("posts").doc(x).delete()},subscribeToChat:x=>d.collection("chats").doc(x).collection("messages").orderBy("date","desc").limit(50).onSnapshot(Z=>{const ne=Z.docs.map(G=>({id:G.id,...G.data()})).reverse();i(ne)}),sendChatMessage:async(x,Z)=>{if(!Z.trim())return;const ne=d.collection("chats").doc(x).collection("messages");await ne.add({text:Z,authorId:n.data.id,authorName:n.data.name,authorType:n.type,date:Date.now()}),cu(ne,d).catch(G=>console.warn("Limpeza do chat adiada:",G.code))},toggleFollow:async x=>{const Z=n.type==="USER"?d.collection("teams").doc(n.data.id):d.collection("players").doc(n.data.id);(n.data.following||[]).includes(x)?(await Z.update({following:q.firestore.FieldValue.arrayRemove(x)}),alert("Deixou de seguir.")):(await Z.update({following:q.firestore.FieldValue.arrayUnion(x)}),alert("Seguindo!"))}}}function uu(t,e){const{user:n,setLoading:a,setModal:i}=t,r=(..._)=>e.postNews(..._);return{handleHospitalDonation:async(_,N)=>{if(!n.data||n.data.balance<N)return alert("Saldo insuficiente!");if(!Number.isFinite(N)||N<=0)return alert("Valor inválido.");const x=_.donors||{};if(x[n.data.id])return alert(`🛑 GESTO JÁ REALIZADO!
Você já contribuiu para o tratamento atual deste jogador. Aguarde a recuperação ou a cirurgia para ajudar novamente.`);if(n.type==="COMPANY"&&N>15e4)return alert(`🚫 LIMITE EMPRESARIAL!
Pelas leis de Mato Real, empresas podem doar no máximo ${Q(15e4)} (1% do teto cirúrgico) por procedimento para evitar monopólio.`);const Z=n.type==="PLAYER"?d.collection("players").doc(n.data.id):n.type==="USER"?d.collection("teams").doc(n.data.id):d.collection("companies").doc(n.data.id),ne=$t(d,[{ref:Z,expected:{balance:n.data.balance}},{ref:d.collection("players").doc(_.id),expected:{donors:_.donors}}]);ne.update(Z,{balance:q.firestore.FieldValue.increment(-N)});const G={[n.data.id]:{name:n.data.name,val:N,date:Date.now()}};ne.update(d.collection("players").doc(_.id),{hospitalFund:q.firestore.FieldValue.increment(N),donors:{...x,...G}});try{await ne.commit()}catch(ae){alert(ae.message);return}alert(`🙏 DOAÇÃO CONFIRMADA!
Obrigado, ${n.data.name}. Seus ${Q(N)} foram enviados para o fundo hospitalar.`)},handleFinanceApprove:async _=>{a(!0);const N=d.collection("financeRequests").doc(_.id),x=$t(d,[{ref:N,expected:{status:_.status,amount:_.amount,type:_.type,teamId:_.teamId}}]);let Z=null;try{if(!Number.isFinite(Number(_.amount))||Number(_.amount)<=0)throw new Error("Valor inválido.");if(!["INJECTION","SPONSORSHIP"].includes(_.type))throw new Error("Tipo de solicitação inválido.");if(_.type==="INJECTION"){const ne=d.collection("teams").doc(_.teamId);x.update(ne,{balance:q.firestore.FieldValue.increment(Number(_.amount))}),x.delete(N),Z=`💰 **INJEÇÃO FINANCEIRA**
A Federação aportou ${Q(_.amount)} no caixa do ${_.teamName}.`}else if(_.type==="SPONSORSHIP"){const ne=d.collection("sponsorships").doc();x.set(ne,{teamId:_.teamId,teamName:_.teamName,companyId:"FEDERACAO",companyName:"FEDERAÇÃO (Governo)",value:parseFloat(_.amount),status:"ACTIVE"}),x.delete(N),Z=`🤝 **PATROCÍNIO ESTATAL**
O ${_.teamName} fechou contrato com a Federação.
Valor: ${Q(_.amount)}/semana.`}await x.commit(),Z&&r(Z,"admin").catch(ne=>console.warn(ne)),alert("Solicitação Aprovada com Sucesso!")}catch(ne){alert("Erro ao aprovar: "+ne.message)}a(!1)},updateBalance:async(_,N)=>{await d.collection("teams").doc(_).update({balance:parseFloat(N)}),alert("Atualizado!")},withdrawMoney:async(_,N)=>{const x=parseFloat(_.replace(",","."));if(!Number.isFinite(x)||x<=0)return alert("Valor inválido!");if(n.data.balance<x)return alert("Saldo insuficiente!");try{await ru(d,d.collection("teams").doc(n.data.id),{balance:n.data.balance},{balance:q.firestore.FieldValue.increment(-x)})}catch(Z){alert(Z.message);return}r(`💸 **SAÍDA DE CAIXA**
O **${n.data.name}** retirou ${Q(x)}.
📝 Motivo: ${N}`,"money-minus"),i(null)}}}function hu(t){const e={};return Object.assign(e,Zd(t)),Object.assign(e,Jd(t,e)),Object.assign(e,Xd(t,e)),Object.assign(e,su(t,e)),Object.assign(e,lu(t)),Object.assign(e,du(t)),Object.assign(e,uu(t,e)),Hr(e,t.user)}function pu(t,e=[]){const n=new Set(t.docChanges().map(r=>r.doc.id)),a=new Map(e.map(r=>[r.id,r])),i=t.docs.map(r=>!n.has(r.id)&&a.has(r.id)?a.get(r.id):{...r.data(),id:r.id});return i.length===e.length&&i.every((r,o)=>r===e[o])?e:i}function mu(t,e,n){const a=t==="ADMIN",i=!!t;return{financeRequests:a,products:a||t==="COMPANY"||e==="SHOPPING",sponsorships:a||t==="USER"||t==="COMPANY",awards:a||["AWARDS_MANAGER","TOURN_MANAGER"].includes(n),tournaments:a||e==="MATCHES"||["TOURN_MANAGER","MATCH_MANAGER"].includes(n),hallOfFame:e==="RANKING",matches:a||e==="MATCHES"||["MATCH_MANAGER","MATCH_PERFORMANCE"].includes(n),posts:e==="SOCIAL",news:i,calendar:i}}function we(t,e,n=!0,a=null,i=null,r=!1){Y.useEffect(()=>{if(!n)return;let o=d.collection(t);r&&(o=o.where("type","in",["COACH","DOCTOR","SCOUT","ASSISTANT"])),a&&(o=o.orderBy(a,"desc")),i&&(o=o.limit(i));let u=[];return o.onSnapshot(m=>{u=pu(m,u),e(u)},m=>console.error(`Não foi possível atualizar ${t}:`,m.code))},[t,e,n,a,i,r])}function fu({value:t="MTR",onChange:e,disabled:n=!1,label:a="Nacionalidade"}){return s.jsxs("label",{style:{display:"block",marginBottom:10},children:[a,s.jsx("select",{className:"input-field","aria-label":a,value:t,onChange:i=>e(i.target.value),disabled:n,children:Ps.map(i=>s.jsxs("option",{value:i.id,children:[Wd(i.id)," ",i.name]},i.id))})]})}const nn=["A","B","C","D","VARZEA"],gu=["GOL","ZAG","LD","LE","VOL","MC","MEI","PTD","PTE","ATA"],Au=["GOL","ZAG","LD","LE","VOL","MC","MD","ME","MEI","PTD","PTE","SA","ATA"],Eu=({teams:t,players:e,papers:n,journalists:a,companies:i,coaches:r,onLogin:o,onCreateTeam:u,onCreatePaper:m,onCreateJourno:O,onCreateCompany:_,onAdmin:N,onVisitor:x,onCreateCoach:Z,onCreatePlayer:ne,config:G})=>{const[ae,ce]=Y.useState(!1),[ee,w]=Y.useState(""),[k,T]=Y.useState(""),[f,I]=Y.useState(""),[p,b]=Y.useState(!1),[C,l]=Y.useState("LOGIN"),[h,g]=Y.useState("TEAM"),[v,P]=Y.useState({n:"",b:"10000000",s:"A",p:""}),[D,S]=Y.useState({n:"",owner:"",p:"",type:"COMERCIO"}),[R,$]=Y.useState(null),[B,re]=Y.useState(null),[X,oe]=Y.useState(null),[de,z]=Y.useState(""),[U,j]=Y.useState(null),[W,y]=Y.useState({name:"",password:"",affinity:"ATA",role:"COACH",face:null}),[A,te]=Y.useState({nationality:"MTR",name:"",instagram:"",position:"ATA",password:""}),L=E=>{const H=E.target.files[0],K=new FileReader;K.onloadend=()=>P({...v,l:K.result}),H&&K.readAsDataURL(H)},J=wn[D.type]||{},Ae=()=>{if(R){if(String(R.password)!==String(de))return alert("Senha incorreta!");if(R.type==="TEAM"){if(R.status==="PENDING")return alert("Aguardando aprovação.");o(R.id,de,"TEAM")}else if(R.type==="PLAYER")o(R.id,de,"PLAYER");else if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(R.type)){if(R.status==="PENDING")return alert("Licença em análise.");o(R.id,de,R.type)}else if(R.type==="COMPANY"){if(R.status==="PENDING")return alert("Empresa em análise.");if(R.status==="BLOCKED")return alert("Empresa bloqueada.");o(R.id,de,"COMPANY")}else if(R.type==="PAPER"){if(R.status==="PENDING")return alert("Jornal em análise.");o(R.id,de,"PAPER")}else if(R.type==="JOURNALIST"){if(R.status==="PENDING")return alert("Registro em análise.");o(R.id,de,"JOURNALIST")}}};return s.jsxs("div",{className:"login-wrapper",children:[s.jsx("style",{children:`
                .login-header-container { 
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    margin-bottom: 30px; 
                    width: 100%;
                    padding-top: 20px;
                }
                .logos-wrapper { 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    gap: 20px; 
                    margin-bottom: 15px;
                    width: 100%;
                    max-width: 600px;
                }
                .side-logo {
                    height: 70px;
                    width: auto;
                    object-fit: contain;
                    filter: drop-shadow(0 0 10px rgba(255,255,255,0.1));
                }
                .main-logo {
                    height: 120px;
                    width: auto;
                    object-fit: contain;
                    filter: drop-shadow(0 0 20px rgba(0, 230, 118, 0.5));
                }
                .game-title { 
                    font-size: 52px; 
                    letter-spacing: 3px; 
                    margin: 0; 
                    color: #fff; 
                    text-transform: uppercase; 
                    font-family: Impact, sans-serif; 
                    text-shadow: 0px 4px 20px rgba(0, 230, 118, 0.6); 
                }
                .dev-info-row {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    margin-top: 10px;
                }
                .dev-credits-sub { 
                    font-size: 11px; 
                    color: #aaa; 
                    letter-spacing: 2px; 
                    text-transform: uppercase; 
                    font-weight: bold; 
                }
                .version-badge {
                    background: rgba(0, 230, 118, 0.15);
                    color: #00E676;
                    padding: 2px 10px;
                    border-radius: 20px;
                    font-size: 10px;
                    font-weight: 900;
                    border: 1px solid rgba(0, 230, 118, 0.3);
                    margin-top: 5px;
                }
                
                @media (max-width: 768px) {
                    .logos-wrapper { gap: 10px; }
                    .side-logo { height: 40px; }
                    .main-logo { height: 75px; }
                    .game-title { font-size: 34px; }
                }
            `}),s.jsxs("div",{className:"login-header-container animate-in",children:[s.jsxs("div",{className:"logos-wrapper",children:[s.jsx("img",{src:"assets/img1.webp",alt:"Sponsor 1",className:"side-logo"}),s.jsx("img",{src:"assets/img2.jpg",alt:"Brasão Central",className:"main-logo"}),s.jsx("img",{src:"assets/img3.jpg",alt:"Sponsor 2",className:"side-logo"})]}),s.jsx("h1",{className:"game-title",children:"MATO REAL"}),s.jsxs("div",{className:"dev-info-row",children:[s.jsxs("div",{className:"dev-credits-sub",children:["FUT PIXEL"," ",s.jsx("span",{style:{color:"#00E676",margin:"0 5px"},children:"•"})," POR NATHAN REIS"]}),s.jsxs("div",{className:"version-badge",children:["VERSÃO 2.4.0 — SELEÇÕES E SUBADMS"," "]})]})]}),s.jsxs("div",{className:"login-tabs",children:[s.jsx("div",{className:`tab ${C==="LOGIN"?"active":""}`,onClick:()=>l("LOGIN"),children:"ENTRAR"}),s.jsx("div",{className:`tab ${C==="CREATE"?"active":""}`,onClick:()=>l("CREATE"),children:"CRIAR TIME"}),s.jsx("div",{className:`tab ${C==="PRESS"?"active":""}`,onClick:()=>l("PRESS"),children:"IMPRENSA"}),s.jsx("div",{className:`tab ${C==="COMPANY"?"active":""}`,onClick:()=>l("COMPANY"),children:"EMPRESAS"}),s.jsx("div",{className:`tab ${C==="COACH"?"active":""}`,onClick:()=>l("COACH"),children:"COMISSÃO"}),s.jsx("div",{className:`tab ${C==="NEW_PLAYER"?"active":""}`,onClick:()=>l("NEW_PLAYER"),children:"JOGADOR"})]}),C==="LOGIN"&&s.jsxs("div",{children:[s.jsxs("div",{className:"login-tab-buttons",children:[s.jsx("button",{className:`btn ${h==="TEAM"?"btn-green":"btn-ghost"}`,style:{width:"auto"},onClick:()=>g("TEAM"),children:"TIMES"}),s.jsx("button",{className:`btn ${h==="PLAYER"?"btn-blue":"btn-ghost"}`,style:{width:"auto"},onClick:()=>{g("PLAYER"),oe(null)},children:"JOGADORES"}),s.jsx("button",{className:`btn ${h==="COMPANY"?"btn-purple":"btn-ghost"}`,style:{width:"auto"},onClick:()=>g("COMPANY"),children:"EMPRESAS"}),s.jsx("button",{className:`btn ${h==="COACH"?"btn-gold":"btn-ghost"}`,style:{width:"auto"},onClick:()=>{g("COACH"),oe(null),j(null)},children:"COMISSÃO"})]}),h==="TEAM"&&s.jsx("div",{className:"text-left",children:U?s.jsxs("div",{className:"animate-in",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>j(null),children:"⬅ VOLTAR PARA DIVISÕES"}),s.jsx("h4",{className:`login-series-header-team ${U==="VARZEA"?"login-series-title-varzea":"login-series-title-main"}`,children:U==="VARZEA"?"🚜 Terrão (Várzea)":`Série ${U}`}),(()=>{const E=(t||[]).filter(H=>H.status!=="PENDING"&&H.serie===U).sort((H,K)=>H.name.localeCompare(K.name));return E.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum time cadastrado nesta série."}):E.map(H=>s.jsxs("div",{className:"card card-row card-clickable",onClick:()=>$({...H,type:"TEAM"}),children:[H.logo?s.jsx("img",{src:H.logo,className:"login-team-card-logo"}):s.jsx("div",{className:"login-team-card-logo-placeholder",children:"🛡️"}),s.jsx("div",{children:s.jsx("b",{className:"card-main-title",children:H.name})})]},H.id))})()]}):s.jsxs("div",{className:"animate-in login-series-wrapper",children:[s.jsx("h4",{className:"login-series-title",children:"Selecione a Divisão"}),nn.map(E=>s.jsx("button",{className:"btn btn-ghost login-series-button-team",onClick:()=>j(E),children:E==="VARZEA"?"🚜 O Terrão (Várzea)":`🏆 Campeonato Série ${E}`},`btn-s-${E}`))]})}),h==="PLAYER"&&!X&&s.jsx("div",{className:"text-left",children:U?s.jsxs("div",{className:"animate-in",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>j(null),children:"⬅ VOLTAR PARA DIVISÕES"}),s.jsx("h4",{className:`login-series-header-team ${U==="VARZEA"?"login-series-title-varzea":""}`,children:U==="VARZEA"?"🚜 Terrão (Várzea)":`Série ${U}`}),(()=>{const E=(t||[]).filter(H=>H.status!=="PENDING"&&H.serie===U).sort((H,K)=>H.name.localeCompare(K.name));return E.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum time cadastrado nesta série."}):E.map(H=>s.jsxs("div",{className:"card",onClick:()=>oe(H),style:{display:"flex",alignItems:"center",gap:10,cursor:"pointer"},children:[H.logo?s.jsx("img",{src:H.logo,className:"login-player-team-logo"}):s.jsx("div",{className:"login-player-team-logo-placeholder",children:"🛡️"}),s.jsx("b",{style:{fontSize:15},children:H.name}),s.jsx("i",{className:"fas fa-chevron-right",style:{marginLeft:"auto",color:"#555"}})]},H.id))})()]}):s.jsxs("div",{className:"animate-in login-series-wrapper",children:[s.jsx("p",{className:"login-player-help",children:"Selecione o clube onde você joga ou acesse como livre:"}),s.jsx("div",{className:"card pulse login-free-agent-card",onClick:()=>oe({id:"FREE",name:"Agentes Livres"}),children:s.jsx("b",{className:"login-free-agent-title",children:"🆓 SOU AGENTE LIVRE"})}),nn.map(E=>s.jsx("button",{className:"btn btn-ghost login-series-button-player",onClick:()=>j(E),children:E==="VARZEA"?"🚜 O Terrão (Várzea)":`🏆 Campeonato Série ${E}`},`btn-p-s-${E}`))]})}),h==="PLAYER"&&X&&s.jsxs("div",{className:"animate-in text-left",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>oe(null),children:"⬅ VOLTAR AOS CLUBES"}),s.jsxs("h4",{className:"login-series-header-team",children:["Elenco: ",X.name]}),(()=>{const E=(e||[]).filter(H=>H.teamId===X.id).sort((H,K)=>H.name.localeCompare(K.name));return E.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum jogador encontrado neste clube."}):E.map(H=>s.jsxs("div",{className:"card card-row card-clickable card-accent-secondary",onClick:()=>$({...H,type:"PLAYER"}),children:[H.face?s.jsx("img",{src:H.face,className:"avatar-md"}):s.jsx("div",{className:"avatar-md-placeholder",children:"👤"}),s.jsxs("div",{className:"flex-1",children:[s.jsxs("b",{className:"card-main-title",children:[H.name," ",H.recoveryLeft>0?"❌":""]}),s.jsx("br",{}),s.jsx("span",{className:"login-player-position-badge",children:H.position})]}),s.jsx("i",{className:"fas fa-sign-in-alt icon-right-muted"})]},H.id))})()]}),h==="COMPANY"&&(i||[]).filter(E=>E.status!=="PENDING").map(E=>s.jsxs("div",{className:"card login-company-card",onClick:()=>$({...E,type:"COMPANY"}),children:["🏢 ",s.jsx("b",{children:E.name}),s.jsx("br",{}),s.jsx("small",{children:E.companyType})]},E.id)),h==="COACH"&&!X&&s.jsx("div",{className:"text-left",children:U?s.jsxs("div",{className:"animate-in",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>j(null),children:"⬅ VOLTAR PARA DIVISÕES"}),s.jsx("h4",{className:"login-coach-series-header",children:U==="VARZEA"?"🚜 Terrão (Várzea)":`Série ${U}`}),(()=>{const E=(t||[]).filter(H=>H.status!=="PENDING"&&H.serie===U).sort((H,K)=>H.name.localeCompare(K.name));return E.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum time cadastrado nesta série."}):E.map(H=>s.jsxs("div",{className:"card",onClick:()=>oe(H),style:{display:"flex",alignItems:"center",gap:10,cursor:"pointer"},children:[H.logo?s.jsx("img",{src:H.logo,className:"login-coach-team-logo"}):s.jsx("div",{className:"login-coach-team-logo-placeholder",children:"🛡️"}),s.jsx("b",{style:{fontSize:15},children:H.name}),s.jsx("i",{className:"fas fa-chevron-right",style:{marginLeft:"auto",color:"#555"}})]},H.id))})()]}):s.jsxs("div",{className:"animate-in login-series-wrapper",children:[s.jsx("p",{className:"login-coach-help",children:"Selecione o clube onde trabalha ou acesse como livre:"}),s.jsx("div",{className:"card pulse login-coach-free-card",onClick:()=>oe({id:"FREE",name:"Profissionais Livres"}),children:s.jsx("b",{className:"login-coach-free-title",children:"🆓 SOU PROFISSIONAL LIVRE"})}),nn.map(E=>s.jsx("button",{className:"btn btn-ghost login-coach-series-button",onClick:()=>j(E),children:E==="VARZEA"?"🚜 O Terrão (Várzea)":`🏆 Campeonato Série ${E}`},`btn-c-s-${E}`))]})}),h==="COACH"&&X&&s.jsxs("div",{className:"animate-in text-left",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>oe(null),children:"⬅ VOLTAR AOS CLUBES"}),s.jsx("h4",{className:"login-coach-list-header",children:X.id==="FREE"?"Mercado de Profissionais":`Staff: ${X.name}`}),(()=>{const E=(r||[]).filter(K=>K.status==="ACTIVE"&&K.teamId===X.id).sort((K,_e)=>K.name.localeCompare(_e.name));if(E.length===0)return s.jsx("p",{className:"login-empty-text",children:"Nenhum profissional contratado neste clube."});const H={COACH:"👔 Técnico",DOCTOR:"🩺 Médico",SCOUT:"🕵️‍♂️ Olheiro",ASSISTANT:"📋 Auxiliar"};return E.map(K=>s.jsxs("div",{className:"card login-coach-card card-clickable",onClick:()=>$({...K,type:K.type||"COACH"}),children:[K.face?s.jsx("img",{src:K.face,className:"login-coach-photo"}):s.jsx("div",{className:"login-coach-photo-placeholder",children:K.type==="DOCTOR"?"🩺":K.type==="SCOUT"?"🕵️‍♂️":K.type==="ASSISTANT"?"📋":"👔"}),s.jsxs("div",{className:"flex-1",children:[s.jsx("b",{className:"login-coach-name",children:K.name}),s.jsx("br",{}),s.jsxs("span",{className:"login-coach-subtitle",children:[H[K.type]||"👔 Técnico"," | Nível ",K.level,K.type==="COACH"&&K.affinities?` | Esp: ${K.affinities[0]}`:""]})]}),s.jsx("i",{className:"fas fa-sign-in-alt icon-login-gold"})]},K.id))})()]}),s.jsxs("div",{className:"login-footer-actions",children:[s.jsx("button",{className:"btn btn-blue",onClick:x,children:"ENTRAR COMO VISITANTE"}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>{ce(!0),I("")},children:"ADMIN"}),ae&&s.jsxs("form",{className:"card",onSubmit:async E=>{var H;E.preventDefault(),b(!0),I("");try{await N(ee,k),T("")}catch(K){I((H=K.code)!=null&&H.startsWith("auth/")?"Não foi possível entrar. Confira o login e a senha.":K.message)}finally{b(!1)}},children:[s.jsx("h3",{children:"Acesso administrativo"}),s.jsxs("label",{children:["E-mail do principal ou login do subADM",s.jsx("input",{className:"input-field",autoComplete:"username",required:!0,value:ee,onChange:E=>w(E.target.value)})]}),s.jsxs("label",{children:["Senha administrativa",s.jsx("input",{className:"input-field",type:"password",autoComplete:"current-password",required:!0,value:k,onChange:E=>T(E.target.value)})]}),f&&s.jsx("p",{role:"alert",children:f}),s.jsx("button",{className:"btn btn-green",disabled:p,children:"ENTRAR NO PAINEL"}),s.jsx("button",{type:"button",className:"btn",disabled:p,onClick:()=>{ce(!1),T("")},children:"CANCELAR"})]})]})]}),C==="CREATE"&&s.jsxs("div",{children:[s.jsx("h3",{style:{color:"var(--primary)"},children:"Fundar Novo Clube"}),s.jsxs("div",{className:"login-create-club-preview",children:[s.jsx("div",{children:v.l?s.jsx("img",{src:v.l,className:"login-club-logo"}):s.jsx("div",{className:"login-club-logo-placeholder",children:"🛡️"})}),s.jsxs("label",{className:"btn btn-blue login-upload-badge",children:[s.jsx("i",{className:"fas fa-upload",style:{marginRight:5}})," ","ESCOLHER ESCUDO",s.jsx("input",{type:"file",style:{display:"none"},accept:"image/*",onChange:L})]})]}),s.jsx("input",{className:"input-field",placeholder:"Nome do Clube",value:v.n,onChange:E=>P({...v,n:E.target.value})}),s.jsx("input",{className:`input-field ${v.s==="VARZEA"?"login-varzea-balance":""}`,type:"number",placeholder:"Saldo Inicial",value:v.s==="VARZEA"?2e5:v.b,onChange:E=>P({...v,b:E.target.value}),disabled:v.s==="VARZEA"}),s.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[s.jsxs("div",{children:[s.jsx("label",{style:{fontSize:11,color:"#aaa"},children:"Divisão Nacional"}),s.jsx("select",{className:"input-field",value:v.s,onChange:E=>{const H=E.target.value;P({...v,s:H,b:H==="VARZEA"?"200000":"10000000"})},children:nn.map(E=>s.jsx("option",{value:E,children:E==="VARZEA"?"Série E (Várzea)":`Série ${E}`},E))})]}),s.jsxs("div",{children:[s.jsx("label",{style:{fontSize:11,color:"#aaa"},children:"Federação Estadual"}),s.jsxs("select",{className:"input-field",value:v.estado||"",onChange:E=>P({...v,estado:E.target.value}),children:[s.jsx("option",{value:"",children:"-- Escolha --"}),wa.map(E=>s.jsx("option",{value:E,children:E},E))]})]})]}),s.jsx("input",{className:"input-field",type:"password",placeholder:"Crie uma Senha",value:v.p,onChange:E=>P({...v,p:E.target.value})}),v.s==="VARZEA"&&(G==null?void 0:G.varzeaOpen)===!1&&s.jsxs("div",{className:"login-varzea-warning",children:[s.jsx("b",{className:"login-varzea-warning-title",children:"🛑 INSCRIÇÕES ENCERRADAS!"}),s.jsx("span",{className:"login-varzea-warning-text",children:"A Federação informa que o limite de clubes da Várzea foi atingido."})]}),s.jsx("button",{className:`btn ${v.s==="VARZEA"&&(G==null?void 0:G.varzeaOpen)===!1?"btn-ghost":"btn-green"}`,disabled:v.s==="VARZEA"&&(G==null?void 0:G.varzeaOpen)===!1,onClick:()=>{if(!v.n||!v.p||!v.estado)return alert("⚠️ Preencha nome, senha e escolha o ESTADO!");if(t.find(K=>K.name&&K.name.toLowerCase()===v.n.toLowerCase()))return alert("🚫 Este nome de clube já está em uso!");const E=v.s==="VARZEA"?"ACTIVE":"PENDING",H=v.s==="VARZEA"?2e5:parseFloat(v.b);d.collection("teams").add({name:v.n,balance:H,serie:v.s,estado:v.estado,password:v.p,stadiumLevel:1,logo:v.l||null,status:E,stats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0},stateStats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}}).then(()=>{E==="ACTIVE"?(alert("✅ Clube de Várzea fundado! Bem-vindo ao Estadual de "+v.estado+"!"),window.location.reload()):(alert("✅ Solicitação enviada à Federação! Aguarde aprovação."),P({n:"",b:"10000000",s:"A",p:"",l:null,estado:""}),l("LOGIN"))})},children:"FUNDAR CLUBE E FILIAR À FEDERAÇÃO"}),v.s==="VARZEA"&&s.jsx("p",{className:"login-varzea-note",children:"* Times da Várzea iniciam com teto de ₣ 200.000 e aprovação imediata."})]}),C==="PRESS"&&s.jsxs("div",{children:[s.jsxs("div",{style:{display:"flex",gap:10,marginBottom:10},children:[s.jsx("button",{className:"btn btn-ghost",onClick:()=>g("LOGIN_P"),children:"LOGIN"}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>g("NEW_PAPER"),children:"CRIAR JORNAL"}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>g("NEW_JOURNO"),children:"SOU JORNALISTA"})]}),h==="LOGIN_P"&&!B&&s.jsxs("div",{children:[s.jsx("h4",{children:"Selecione o Jornal"}),(n||[]).filter(E=>E.status==="ACTIVE").map(E=>s.jsxs("div",{className:"card",onClick:()=>re(E),children:["📰 ",E.name]},E.id))]}),h==="LOGIN_P"&&B&&s.jsxs("div",{children:[s.jsx("button",{className:"btn",style:{marginBottom:10},onClick:()=>re(null),children:"⬅ VOLTAR"}),s.jsxs("h4",{children:[B.name," - Jornalistas"]}),s.jsxs("div",{className:"card",onClick:()=>$({...B,type:"PAPER"}),style:{border:"1px solid var(--primary)"},children:["👑 ",B.ownerName," (Dono)"]}),(a||[]).filter(E=>E.newspaperId===B.id&&E.status==="ACTIVE").map(E=>s.jsxs("div",{className:"card",onClick:()=>$({...E,type:"JOURNALIST"}),children:["✒️ ",E.name]},E.id))]}),h==="NEW_PAPER"&&s.jsxs("div",{children:[s.jsx("input",{className:"input-field",placeholder:"Nome do Jornal",id:"pn"}),s.jsx("input",{className:"input-field",placeholder:"Seu Nome (Dono)",id:"po"}),s.jsx("input",{className:"input-field",type:"number",placeholder:"Senha",id:"pp"}),s.jsx("button",{className:"btn btn-green",onClick:()=>m(document.getElementById("pn").value,document.getElementById("pp").value,document.getElementById("po").value),children:"SOLICITAR CRIAÇÃO"})]}),h==="NEW_JOURNO"&&s.jsxs("div",{children:[s.jsx("input",{className:"input-field",placeholder:"Seu Nome",id:"jn"}),s.jsxs("select",{className:"input-field",id:"jp_id",children:[s.jsx("option",{value:"",children:"Selecione o Jornal"}),(n||[]).filter(E=>E.status==="ACTIVE").map(E=>s.jsx("option",{value:E.id,children:E.name},E.id))]}),s.jsx("input",{className:"input-field",type:"number",placeholder:"Senha",id:"jp"}),s.jsx("button",{className:"btn btn-green",onClick:()=>O(document.getElementById("jn").value,document.getElementById("jp").value,document.getElementById("jp_id").value),children:"SOLICITAR EMPREGO"})]})]}),C==="COMPANY"&&s.jsxs("div",{children:[s.jsx("h3",{style:{color:"var(--purple)"},children:"Abrir Empresa"}),s.jsx("input",{className:"input-field",placeholder:"Nome da Empresa",value:D.n,onChange:E=>S({...D,n:E.target.value})}),s.jsx("input",{className:"input-field",placeholder:"Nome do Dono",value:D.owner,onChange:E=>S({...D,owner:E.target.value})}),s.jsx("label",{className:"login-company-label",children:"Porte da Empresa"}),s.jsxs("select",{className:"input-field",value:D.type,onChange:E=>S({...D,type:E.target.value}),children:[s.jsx("option",{value:"COMERCIO",children:"Comércio Local"}),s.jsx("option",{value:"MEDIA",children:"Média Empresa"}),s.jsx("option",{value:"GRANDE",children:"Grande Empresa"})]}),s.jsxs("div",{className:"login-company-box",children:[s.jsxs("div",{className:"login-info-row",style:{marginBottom:5},children:[s.jsx("span",{children:"💰 Capital Inicial:"}),s.jsx("span",{className:"login-company-highlight-primary",children:Q(J.start)})]}),s.jsxs("div",{className:"login-info-row",children:[s.jsx("span",{children:"💸 Imposto Semanal:"}),s.jsx("span",{className:"login-company-highlight-danger",children:Q(J.tax)})]}),s.jsxs("p",{className:"login-company-tax-note",children:['"',J.desc,'"']})]}),s.jsx("input",{className:"input-field",type:"number",placeholder:"Senha de Acesso",value:D.p,onChange:E=>S({...D,p:E.target.value})}),s.jsx("button",{className:"btn btn-purple",onClick:()=>_(D),children:"SOLICITAR ABERTURA"})]}),C==="COACH"&&s.jsxs("div",{children:[s.jsx("h3",{className:"login-coach-title",children:"🎓 Licença Profissional"}),s.jsx("p",{style:{fontSize:12,color:"#aaa"},children:"Inicie sua carreira no Staff de um Clube."}),s.jsx("div",{className:"card login-coach-card-info",children:s.jsxs("div",{className:"login-info-row",children:[s.jsxs("span",{children:["Nível Inicial: ",s.jsx("b",{children:"1"})]}),s.jsxs("span",{children:["Salário Base: ",s.jsx("b",{children:Q(2500)})]})]})}),s.jsxs("div",{className:"login-coach-avatar-wrapper",children:[s.jsx("div",{className:"login-coach-avatar",children:W.face?s.jsx("img",{src:W.face,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}):s.jsx("span",{style:{fontSize:30},children:"📷"})}),s.jsxs("label",{className:"btn btn-ghost login-coach-upload-label",children:["ESCOLHER FOTO DE PERFIL",s.jsx("input",{type:"file",style:{display:"none"},accept:"image/*",onChange:E=>{const H=E.target.files[0];if(!H)return;const K=new FileReader;K.readAsDataURL(H),K.onload=_e=>{const se=new Image;se.src=_e.target.result,se.onload=()=>{const le=document.createElement("canvas"),ge=150;let Ie=se.width,fe=se.height;Ie>fe?Ie>ge&&(fe*=ge/Ie,Ie=ge):fe>ge&&(Ie*=ge/fe,fe=ge),le.width=Ie,le.height=fe,le.getContext("2d").drawImage(se,0,0,Ie,fe),y({...W,face:le.toDataURL("image/jpeg",.8)})}}}})]})]}),s.jsx("label",{style:{textAlign:"left",display:"block",color:"#aaa",fontSize:12},children:"Qual a sua profissão?"}),s.jsxs("select",{className:"input-field",value:W.role,onChange:E=>y({...W,role:E.target.value}),style:{borderColor:"gold",color:"gold",fontWeight:"bold"},children:[s.jsx("option",{value:"COACH",children:"👔 Técnico Principal"}),s.jsx("option",{value:"ASSISTANT",children:"📋 Auxiliar Técnico"}),s.jsx("option",{value:"DOCTOR",children:"🩺 Médico Chefe"}),s.jsx("option",{value:"SCOUT",children:"🕵️‍♂️ Olheiro / Diretor"})]}),s.jsx("input",{className:"input-field",value:W.name,onChange:E=>y({...W,name:E.target.value}),placeholder:"Seu Nome"}),s.jsx("input",{className:"input-field",type:"password",value:W.password,onChange:E=>y({...W,password:E.target.value}),placeholder:"Senha de Acesso"}),W.role==="COACH"&&s.jsxs(s.Fragment,{children:[s.jsx("label",{style:{textAlign:"left",display:"block",color:"#aaa",fontSize:12},children:"Especialidade Inicial"}),s.jsx("select",{className:"input-field",value:W.affinity,onChange:E=>y({...W,affinity:E.target.value}),children:gu.map(E=>s.jsxs("option",{value:E,children:[E," - Especialista"]},E))})]}),s.jsx("button",{className:"btn btn-gold",onClick:()=>Z(W),children:"GERAR REGISTRO PROFISSIONAL"})]}),C==="NEW_PLAYER"&&s.jsxs("div",{children:[s.jsx("h3",{style:{color:"cyan"},children:"⚽ Inscrição de Atleta"}),s.jsx(fu,{value:A.nationality,onChange:E=>te({...A,nationality:E})}),s.jsx("small",{children:"A nacionalidade define qual seleção você poderá representar."}),s.jsx("p",{style:{fontSize:12,color:"#aaa"},children:"Crie seu jogador. Você começará nos Agentes Livres."}),s.jsx("div",{className:"card",style:{border:"1px solid cyan",background:"rgba(0, 255, 255, 0.05)",marginBottom:15},children:s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12},children:[s.jsxs("span",{children:["OVR Inicial (Linha): ",s.jsx("b",{children:"45"})]}),s.jsxs("span",{children:["OVR Inicial (Goleiro): ",s.jsx("b",{children:"60"})]})]})}),s.jsx("input",{className:"input-field",value:A.name,onChange:E=>te({...A,name:E.target.value}),placeholder:"Nome no Jogo (Ex: João Silva)"}),s.jsx("input",{className:"input-field",value:A.instagram,onChange:E=>te({...A,instagram:E.target.value}),placeholder:"@ do seu Instagram (Para verificação)"}),s.jsx("input",{className:"input-field",type:"password",value:A.password,onChange:E=>te({...A,password:E.target.value}),placeholder:"Crie uma Senha de Acesso"}),s.jsx("label",{style:{textAlign:"left",display:"block",color:"#aaa",fontSize:12},children:"Posição Inicial"}),s.jsx("select",{className:"input-field",value:A.position,onChange:E=>te({...A,position:E.target.value}),children:Au.map(E=>s.jsx("option",{value:E,children:E},E))}),s.jsx("button",{className:"btn btn-blue",onClick:()=>ne(A),children:"ENVIAR INSCRIÇÃO"})]}),R&&s.jsx("div",{className:"modal-overlay",children:s.jsxs("div",{className:"modal-content",children:[s.jsx("h3",{children:R.name}),s.jsx("input",{className:"input-field",type:"password",placeholder:"Senha",value:de,onChange:E=>z(E.target.value)}),s.jsx("button",{className:"btn btn-green",onClick:Ae,children:"ENTRAR"}),s.jsx("button",{className:"btn",onClick:()=>$(null),children:"CANCELAR"})]})})]})},yu=({calendar:t})=>{if(!t||!t.date)return null;const[e,n,a]=t.date.split("-"),r=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][parseInt(n)-1],o=(t.events||[]).filter(u=>u.date>=t.date).sort((u,m)=>new Date(u.date)-new Date(m.date));return s.jsxs("div",{className:"card",style:{background:"linear-gradient(45deg, #1a1a1a, #001a00)",border:"1px solid var(--primary)",marginBottom:20,display:"flex",gap:15,alignItems:"stretch"},children:[s.jsxs("div",{style:{background:"#000",padding:"10px",borderRadius:8,textAlign:"center",minWidth:"80px",border:"1px solid #333",display:"flex",flexDirection:"column",justifyContent:"center"},children:[s.jsx("div",{style:{fontSize:10,color:"var(--primary)",textTransform:"uppercase",fontWeight:"bold"},children:r}),s.jsx("div",{style:{fontSize:30,fontWeight:"900",color:"#fff",lineHeight:1},children:a}),s.jsx("div",{style:{fontSize:10,color:"#888"},children:e})]}),s.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"},children:[s.jsxs("div",{style:{fontSize:11,color:"#aaa",marginBottom:5,fontWeight:"bold"},children:[s.jsx("i",{className:"fas fa-calendar-alt"})," PRÓXIMOS EVENTOS:"]}),o.length===0?s.jsx("div",{style:{fontSize:12,color:"#666",fontStyle:"italic"},children:"Nenhum evento agendado."}):s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4,maxHeight:"60px",overflowY:"auto"},children:o.slice(0,3).map((u,m)=>{const O=u.date===t.date;return s.jsxs("div",{style:{fontSize:11,display:"flex",gap:5,alignItems:"center",color:O?"gold":"#ddd"},children:[s.jsx("b",{style:{color:O?"gold":"var(--primary)"},children:O?"HOJE":`${u.date.split("-")[2]}/${u.date.split("-")[1]}`}),s.jsxs("span",{children:["- ",u.text]})]},m)})})]})]})},Iu={"4-3-3 OFENSIVO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"45%",l:"35%"},{t:"35%",l:"65%"},{t:"20%",l:"85%"},{t:"10%",l:"50%"},{t:"20%",l:"15%"}],"4-3-3 DEFENSIVO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"30%"},{t:"65%",l:"70%"},{t:"45%",l:"50%"},{t:"20%",l:"85%"},{t:"10%",l:"50%"},{t:"20%",l:"15%"}],"4-3-3 FALSO 9":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"45%",l:"30%"},{t:"45%",l:"70%"},{t:"20%",l:"85%"},{t:"30%",l:"50%"},{t:"20%",l:"15%"}],"4-3-3 POSSE":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"45%",l:"35%"},{t:"45%",l:"65%"},{t:"25%",l:"75%"},{t:"15%",l:"50%"},{t:"25%",l:"25%"}],"4-4-2 CLÁSSICO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"50%",l:"90%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"50%",l:"10%"},{t:"15%",l:"60%"},{t:"15%",l:"40%"}],"4-4-2 LOSANGO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"50%"},{t:"50%",l:"30%"},{t:"50%",l:"70%"},{t:"35%",l:"50%"},{t:"15%",l:"60%"},{t:"15%",l:"40%"}],"4-4-2 LINHA":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"65%"},{t:"40%",l:"35%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"4-4-1-1":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"55%",l:"90%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"55%",l:"10%"},{t:"30%",l:"50%"},{t:"12%",l:"50%"}],"4-2-3-1 LARGO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"50%"},{t:"30%",l:"85%"},{t:"15%",l:"50%"},{t:"30%",l:"15%"}],"4-2-3-1 ESTREITO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"50%"},{t:"40%",l:"75%"},{t:"40%",l:"25%"},{t:"15%",l:"50%"}],"4-1-4-1":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"50%"},{t:"45%",l:"85%"},{t:"45%",l:"60%"},{t:"45%",l:"40%"},{t:"45%",l:"15%"},{t:"15%",l:"50%"}],"4-1-2-1-2":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"68%",l:"50%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"38%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"4-2-2-2 (BRASIL)":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"70%"},{t:"40%",l:"30%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"4-2-4 OFENSIVO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"20%",l:"85%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"},{t:"20%",l:"15%"}],"4-5-1 RETRANCA":[{t:"90%",l:"50%"},{t:"78%",l:"85%"},{t:"82%",l:"65%"},{t:"82%",l:"35%"},{t:"78%",l:"15%"},{t:"65%",l:"35%"},{t:"65%",l:"65%"},{t:"55%",l:"50%"},{t:"50%",l:"85%"},{t:"50%",l:"15%"},{t:"25%",l:"50%"}],"4-3-2-1 (NATAL)":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"55%",l:"70%"},{t:"55%",l:"30%"},{t:"35%",l:"65%"},{t:"35%",l:"35%"},{t:"12%",l:"50%"}],"3-5-2 TÁTICO":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"50%",l:"90%"},{t:"50%",l:"10%"},{t:"35%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"3-4-3 (CRUYFF)":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"65%",l:"50%"},{t:"50%",l:"50%"},{t:"50%",l:"85%"},{t:"50%",l:"15%"},{t:"20%",l:"85%"},{t:"10%",l:"50%"},{t:"20%",l:"15%"}],"3-4-3 LINHA":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"55%",l:"90%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"55%",l:"10%"},{t:"15%",l:"85%"},{t:"10%",l:"50%"},{t:"15%",l:"15%"}],"3-4-1-2":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"55%",l:"90%"},{t:"55%",l:"10%"},{t:"35%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"3-6-1 CONTROLE":[{t:"90%",l:"50%"},{t:"82%",l:"50%"},{t:"82%",l:"75%"},{t:"82%",l:"25%"},{t:"65%",l:"35%"},{t:"65%",l:"65%"},{t:"50%",l:"90%"},{t:"50%",l:"65%"},{t:"50%",l:"35%"},{t:"50%",l:"10%"},{t:"20%",l:"50%"}],"3-3-1-3 (BIELSA)":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"65%",l:"50%"},{t:"50%",l:"65%"},{t:"50%",l:"35%"},{t:"35%",l:"50%"},{t:"15%",l:"85%"},{t:"10%",l:"50%"},{t:"15%",l:"15%"}],"3-1-4-2":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"65%",l:"50%"},{t:"50%",l:"85%"},{t:"50%",l:"60%"},{t:"50%",l:"40%"},{t:"50%",l:"15%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"5-4-1 ÔNIBUS":[{t:"90%",l:"50%"},{t:"78%",l:"90%"},{t:"82%",l:"70%"},{t:"82%",l:"50%"},{t:"82%",l:"30%"},{t:"78%",l:"10%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"55%",l:"85%"},{t:"55%",l:"15%"},{t:"25%",l:"50%"}],"5-3-2 CONTRA":[{t:"90%",l:"50%"},{t:"75%",l:"90%"},{t:"80%",l:"70%"},{t:"80%",l:"50%"},{t:"80%",l:"30%"},{t:"75%",l:"10%"},{t:"60%",l:"50%"},{t:"55%",l:"75%"},{t:"55%",l:"25%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"5-2-3 ALAS":[{t:"90%",l:"50%"},{t:"75%",l:"90%"},{t:"80%",l:"70%"},{t:"80%",l:"50%"},{t:"80%",l:"30%"},{t:"75%",l:"10%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"18%",l:"85%"},{t:"10%",l:"50%"},{t:"18%",l:"15%"}],"5-2-1-2":[{t:"90%",l:"50%"},{t:"75%",l:"90%"},{t:"80%",l:"70%"},{t:"80%",l:"50%"},{t:"80%",l:"30%"},{t:"75%",l:"10%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"38%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"WM (ANOS 30)":[{t:"92%",l:"50%"},{t:"80%",l:"75%"},{t:"82%",l:"50%"},{t:"80%",l:"25%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"45%",l:"65%"},{t:"45%",l:"35%"},{t:"25%",l:"85%"},{t:"15%",l:"50%"},{t:"25%",l:"15%"}],"2-3-5 (PIRÂMIDE)":[{t:"90%",l:"50%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"60%",l:"80%"},{t:"65%",l:"50%"},{t:"60%",l:"20%"},{t:"35%",l:"90%"},{t:"20%",l:"70%"},{t:"15%",l:"50%"},{t:"20%",l:"30%"},{t:"35%",l:"10%"}],"4-6-0 (SEM ATA)":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"45%",l:"85%"},{t:"45%",l:"15%"},{t:"30%",l:"65%"},{t:"30%",l:"35%"}],"1-1-8 (KAMIKAZE)":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"65%",l:"50%"},{t:"40%",l:"90%"},{t:"25%",l:"75%"},{t:"25%",l:"60%"},{t:"15%",l:"55%"},{t:"15%",l:"45%"},{t:"25%",l:"40%"},{t:"25%",l:"25%"},{t:"40%",l:"10%"}],"VÁRZEA (TUDO P/ FRENTE)":[{t:"90%",l:"50%"},{t:"80%",l:"70%"},{t:"80%",l:"30%"},{t:"65%",l:"50%"},{t:"50%",l:"50%"},{t:"30%",l:"85%"},{t:"15%",l:"70%"},{t:"10%",l:"50%"},{t:"15%",l:"30%"},{t:"25%",l:"50%"},{t:"30%",l:"15%"}],"VÁRZEA (VOLANTAÇO)":[{t:"90%",l:"50%"},{t:"78%",l:"85%"},{t:"82%",l:"65%"},{t:"82%",l:"35%"},{t:"78%",l:"15%"},{t:"60%",l:"80%"},{t:"60%",l:"60%"},{t:"60%",l:"40%"},{t:"60%",l:"20%"},{t:"35%",l:"50%"},{t:"15%",l:"50%"}]},vu=t=>t==="GOL"?"#E65100":["ZAG","LD","LE"].includes(t)?"#2979FF":["VOL","MC","MD","ME","MEI"].includes(t)?"#00E676":["PTD","PTE","ATA","SA"].includes(t)?"#FF1744":"#888",Tu=ue.lazy(()=>me(()=>import("./NationalTeams-DvfkwIDK.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.NationalTeams}))),Su=ue.lazy(()=>me(()=>import("./AdminPanel-DRlf5BOM.js"),__vite__mapDeps([3,1,4,2]),import.meta.url).then(t=>({default:t.AdminPanel}))),bu=ue.lazy(()=>me(()=>import("./TeamDashboard-Dg0Ku_Q4.js"),__vite__mapDeps([5,1,6,2]),import.meta.url).then(t=>({default:t.TeamDashboard}))),_u=ue.lazy(()=>me(()=>import("./AssistantDashboard-CS79-UAa.js"),__vite__mapDeps([7,1,2]),import.meta.url).then(t=>({default:t.AssistantDashboard}))),Cu=ue.lazy(()=>me(()=>import("./VisitorDashboard-BppKCi4l.js"),__vite__mapDeps([8,1,2]),import.meta.url).then(t=>({default:t.VisitorDashboard}))),ht=ue.lazy(()=>me(()=>import("./LeagueTable-DDW6q2hK.js"),__vite__mapDeps([9,1,2]),import.meta.url).then(t=>({default:t.LeagueTable}))),Ei=ue.lazy(()=>me(()=>import("./MatchCenter-DAMJHTUX.js"),__vite__mapDeps([10,1,11,2]),import.meta.url).then(t=>({default:t.MatchCenter}))),Ru=ue.lazy(()=>me(()=>import("./TournamentHub-CBr-eL5w.js"),__vite__mapDeps([12,1,11,2]),import.meta.url).then(t=>({default:t.TournamentHub}))),Ou=ue.lazy(()=>me(()=>import("./Market-C_1lgY-5.js"),__vite__mapDeps([13,1,14,6,2]),import.meta.url).then(t=>({default:t.Market}))),wu=ue.lazy(()=>me(()=>import("./ShoppingScreen-T3oIYVPI.js"),__vite__mapDeps([15,1,2]),import.meta.url).then(t=>({default:t.ShoppingScreen}))),Nu=ue.lazy(()=>me(()=>import("./Ranking-B3XC4pPV.js"),__vite__mapDeps([16,1,14,17,2]),import.meta.url).then(t=>({default:t.Ranking}))),Pu=ue.lazy(()=>me(()=>import("./SocialHub-DvZRNc69.js"),__vite__mapDeps([18,1,2]),import.meta.url).then(t=>({default:t.SocialHub}))),xu=ue.lazy(()=>me(()=>import("./OffersScreen-C2aEKA7r.js"),__vite__mapDeps([19,1,2]),import.meta.url).then(t=>({default:t.OffersScreen}))),Lu=ue.lazy(()=>me(()=>import("./PublicServices-Comg5qMn.js"),__vite__mapDeps([20,1,2]),import.meta.url).then(t=>({default:t.PublicServices}))),ku=ue.lazy(()=>me(()=>import("./CompanyDashboard-aJzBQ3SI.js"),__vite__mapDeps([21,1,4,2]),import.meta.url).then(t=>({default:t.CompanyDashboard}))),Du=ue.lazy(()=>me(()=>import("./PlayerDashboard-dwWVvU_S.js"),__vite__mapDeps([22,1,17,2]),import.meta.url).then(t=>({default:t.PlayerDashboard}))),Mu=ue.lazy(()=>me(()=>import("./CoachDashboard-hhBsgPj6.js"),__vite__mapDeps([23,1,2]),import.meta.url).then(t=>({default:t.CoachDashboard}))),ju=ue.lazy(()=>me(()=>import("./DoctorDashboard-COQkj1bX.js"),__vite__mapDeps([24,1,2]),import.meta.url).then(t=>({default:t.DoctorDashboard}))),Fu=ue.lazy(()=>me(()=>import("./ScoutDashboard-Bk_TPpcT.js"),__vite__mapDeps([25,1,14,2]),import.meta.url).then(t=>({default:t.ScoutDashboard}))),Vu=ue.lazy(()=>me(()=>import("./PlayerForm-ZlJzwEYQ.js"),__vite__mapDeps([26,1,14,2]),import.meta.url).then(t=>({default:t.PlayerForm}))),Uu=ue.lazy(()=>me(()=>import("./TeamRequestPlayerModal-CztH_ZgU.js"),__vite__mapDeps([27,1,14,2]),import.meta.url).then(t=>({default:t.TeamRequestPlayerModal}))),Gu=ue.lazy(()=>me(()=>import("./AdminPlayerModal-BNzf3goB.js"),__vite__mapDeps([28,1,2]),import.meta.url).then(t=>({default:t.AdminPlayerModal}))),$u=ue.lazy(()=>me(()=>import("./TrainingCenterManager-748B8gDE.js"),__vite__mapDeps([29,1,2]),import.meta.url).then(t=>({default:t.TrainingCenterManager}))),Hu=ue.lazy(()=>me(()=>import("./OfferForm-h0DccGwh.js"),__vite__mapDeps([30,1,17,14,2]),import.meta.url).then(t=>({default:t.OfferForm}))),Bu=ue.lazy(()=>me(()=>import("./SettingsForm-CVo5iJPY.js"),__vite__mapDeps([31,1,2]),import.meta.url).then(t=>({default:t.SettingsForm}))),yi=ue.lazy(()=>me(()=>import("./MatchPerformanceForm-DECybEUE.js"),__vite__mapDeps([32,1,2]),import.meta.url).then(t=>({default:t.MatchPerformanceForm}))),zu=ue.lazy(()=>me(()=>import("./TeamStandingsEditor-DJPYNsg_.js"),__vite__mapDeps([33,1,2]),import.meta.url).then(t=>({default:t.TeamStandingsEditor}))),Wu=ue.lazy(()=>me(()=>import("./PrizeEditor-DpiDBtkD.js"),__vite__mapDeps([34,1,2]),import.meta.url).then(t=>({default:t.PrizeEditor}))),qu=ue.lazy(()=>me(()=>import("./AwardsManager-_Yh3gwY8.js"),__vite__mapDeps([35,1,2]),import.meta.url).then(t=>({default:t.AwardsManager}))),Ku=ue.lazy(()=>me(()=>import("./TournamentManagerModal-CuKQxS-x.js"),__vite__mapDeps([36,1,2]),import.meta.url).then(t=>({default:t.TournamentManagerModal}))),Zu=ue.lazy(()=>me(()=>import("./StatsEditor-CNckeEOJ.js"),__vite__mapDeps([37,1,2]),import.meta.url).then(t=>({default:t.StatsEditor}))),Yu=ue.lazy(()=>me(()=>import("./MatchManagerForm-B4_Kigko.js"),__vite__mapDeps([38,1,2]),import.meta.url).then(t=>({default:t.MatchManagerForm})));function Ju(){var ka,Da,Ma,ja,Fa,Va,Ua,Ga,$a,Ha,Ba,za,Wa;const[t,e]=Y.useState(null),[n,a]=Y.useState(!0),[i,r]=Y.useState(!1),[o,u]=Y.useState([]),[m,O]=Y.useState([]),[_,N]=Y.useState([]),[x,Z]=Y.useState([]),[ne,G]=Y.useState([]),[ae,ce]=Y.useState({marketOpen:!0}),[ee,w]=Y.useState({date:new Date().toISOString().split("T")[0],events:[]}),[k,T]=Y.useState([]),[f,I]=Y.useState([]),[p,b]=Y.useState([]),[C,l]=Y.useState([]),[h,g]=Y.useState([]),[v,P]=Y.useState([]),[D,S]=Y.useState([]),[R,$]=Y.useState([]),[B,re]=Y.useState([]),[X,oe]=Y.useState([]),[de,z]=Y.useState([]),[U,j]=Y.useState("HOME"),[W,y]=Y.useState("LIGAS"),[A,te]=Y.useState(null),L=c=>{if(!Gr(t,c)){alert("Você não tem permissão para esta função.");return}te(c)},[J,Ae]=Y.useState(!1),[E,H]=Y.useState(!1),[K,_e]=Y.useState(null),[se,le]=Y.useState([]),[ge,Ie]=Y.useState(null);Y.useEffect(()=>{if(En(t))return Ud(t,c=>{e(c),te(null)},()=>{xt(),e(null),te(null),st.signOut()})},[t==null?void 0:t.type,(ka=t==null?void 0:t.data)==null?void 0:ka.id]),Y.useEffect(()=>{let c=!0;const M=Dr();return M?d.collection(Mr[M.type]).doc(M.data.id).get().then(V=>{if(!c)return;if(!V.exists||["BLOCKED","PENDING"].includes(V.data().status)){xt();return}const ie={type:M.type,data:{...V.data(),id:V.id}};e(ie),Hn(ie),j(Oi(ie.type,qn(ie,"screen",Bn("savedScreen"))));const he=qn(ie,"matchesTab","LIGAS");y(["LIGAS","ESTADUAIS","COPAS"].includes(he)?he:"LIGAS")}).catch(V=>{console.error("Não foi possível restaurar a sessão:",V.code),c&&r(!0)}).finally(()=>{c&&a(!1)}):a(!1),()=>{c=!1}},[]),Y.useEffect(()=>{U&&t&&(zn("savedScreen",U),Ya(t,"screen",U))},[U,(Da=t==null?void 0:t.data)==null?void 0:Da.id,t==null?void 0:t.type]),Y.useEffect(()=>{t&&Ya(t,"matchesTab",W)},[W,(Ma=t==null?void 0:t.data)==null?void 0:Ma.id,t==null?void 0:t.type]);const fe=mu(t==null?void 0:t.type,U,A==null?void 0:A.type);we("teams",u),we("players",O),we("newspapers",T),we("journalists",I),we("companies",b),we("users",$,!0,null,null,!0),we("financeRequests",G,fe.financeRequests),we("products",l,fe.products),we("sponsorships",g,fe.sponsorships),we("awards",P,fe.awards),we("tournaments",S,fe.tournaments),we("hallOfFame",re,fe.hallOfFame,"season"),we("matches",oe,fe.matches),we("posts",z,fe.posts,"date",50),we("news",Z,fe.news,"date",50),Y.useEffect(()=>d.collection("config").doc("system").onSnapshot(c=>ce(c.exists?c.data():{marketOpen:!0}),c=>console.error("Configuração indisponível:",c.code)),[]),Y.useEffect(()=>{if(fe.calendar)return d.collection("config").doc("calendar").onSnapshot(c=>{c.exists&&w(c.data())},c=>console.error("Calendário indisponível:",c.code))},[fe.calendar]),Y.useEffect(()=>{const c=Number(Bn("lastRead")||0);x.length&&x[0].date>c&&H(!0)},[x]),Y.useEffect(()=>{if(!t||t.type==="ADMIN"||t.type==="VISITOR"){N([]);return}const c=d.collection("offers").where("recipientId","==",t.data.id).onSnapshot(M=>{const V=M.docs.map(ie=>({...ie.data(),id:ie.id}));N(V)},M=>{console.log("Erro ao buscar ofertas:",M)});return()=>c()},[(ja=t==null?void 0:t.data)==null?void 0:ja.id,t==null?void 0:t.type]),Y.useEffect(()=>{if(!t||!t.data||t.type==="VISITOR"){le([]);return}Ie(null);let c=d.collection("sales");t.type==="COMPANY"?c=c.where("companyId","==",t.data.id):["PLAYER","COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t.type)?c=c.where("buyerId","==",t.data.id):c=c.orderBy("date","desc").limit(300);const M=c.onSnapshot({includeMetadataChanges:!0},V=>{const ie=V.docs.map(he=>({id:he.id,...he.data()})).sort((he,xn)=>xn.date-he.date);le(ie),Ie(V.metadata.fromCache?null:t.data.id)},V=>{console.error("Erro ao carregar mochila:",V)});return()=>M()},[(Fa=t==null?void 0:t.data)==null?void 0:Fa.id,t==null?void 0:t.type]),Y.useEffect(()=>{if(!t||t.type!=="PLAYER"||!se||ge!==t.data.id)return;const M=se.filter(V=>V.buyerId===t.data.id).reduce((V,ie)=>{if(["VEICULO","IMOVEL","TECNOLOGIA","LUXO"].includes(ie.cat)){const he=parseInt(ie.fameGained)||0;return V+he}return V},0);typeof M=="number"&&(t.data.fame||0)!==M&&(console.log(`Corrigindo Fama: De ${t.data.fame} para ${M}`),d.collection("players").doc(t.data.id).update({fame:M}).catch(V=>console.error("Erro ao sincronizar fama:",V)),e(V=>({...V,data:{...V.data,fame:M}})))},[se,ge,(Va=t==null?void 0:t.data)==null?void 0:Va.id]),Y.useEffect(()=>{if((t==null?void 0:t.type)==="USER"||(t==null?void 0:t.type)==="PLAYER"){const c=t.type==="USER"?o.find(M=>M.id===t.data.id):m.find(M=>M.id===t.data.id);c&&c!==t.data&&e(M=>({...M,data:c}))}if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t==null?void 0:t.type)){const c=R.find(M=>M.id===t.data.id);c&&c!==t.data&&e(M=>({...M,data:c}))}if((t==null?void 0:t.type)==="COMPANY"){const c=p.find(M=>M.id===t.data.id);c&&(c.status==="BLOCKED"?(alert("🚫 Sua empresa foi bloqueada ou faliu."),window.location.reload()):c!==t.data&&e(M=>({...M,data:c})))}},[o,m,p,R,(Ua=t==null?void 0:t.data)==null?void 0:Ua.id,t==null?void 0:t.type]);const Le=ue.useRef(!1),[Oe,Ee]=Y.useState([]),{postNews:et,handleHospitalDonation:Jt,login:Xt,handleSaveMatch:ks,handleDeleteMatch:Ct,handleFinanceApprove:Ds,loginAdmin:Ms,createTeam:js,createPlayerAccount:Fs,createStaff:Vs,createNewspaper:Us,createJournalist:Gs,handleFireCoach:$s,handleCoachSelfActions:Qt,handleSendCoachOffer:Hs,handleCounterCoachOffer:Na,handleFinalizeCoachContract:Rt,adminAction:Bs,generateFixtures:zs,handleSeasonTurnAdvanced:Ws,createCompany:qs,saveProduct:Ks,requestSponsorship:Zs,processSponsorship:Ys,buyProduct:Js,handleCoachIndication:Xs,saveTactics:Qs,handleCoachUseItem:Nn,handleUseItem:er,resetDatabase:tr,approveTeam:nr,deleteTeam:ar,deletePaper:ir,deleteJournalist:sr,updateBalance:rr,withdrawMoney:or,savePlayer:lr,handleAcceptCoachOffer:Xu,handleRejectCoachOffer:Qu,handleUpdateCoachSalary:cr,handleAssistantRegen:dr,handleCoachTrain:Pa,handleEvolveCoachPerk:Pn,sendOffer:ur,acceptOffer:hr,rejectOffer:dt,renewContract:pr,handleSocialPost:mr,handleSocialLike:fr,handleSocialDelete:gr,updateTeamStats:Ar,saveMatchStats:xa,handlePlayerSoloTrain:La,handlePlayerActions:Er,subscribeToChat:yr,sendChatMessage:Ir,toggleFollow:vr}=hu({setLoading:Ae,teams:o,players:m,companies:p,coaches:R,papers:k,journalists:f,setUser:e,setScreen:j,setModal:L,conf:ae,sps:h,user:t,products:C,buyingRef:Le,setSales:le,posts:de,setChatMessages:Ee});return i?s.jsxs("div",{className:"container",role:"alert",children:[s.jsx("p",{children:"Não foi possível recuperar sua sessão. Verifique a conexão e tente novamente."}),s.jsx("button",{className:"btn btn-primary",onClick:()=>window.location.reload(),children:"TENTAR NOVAMENTE"}),s.jsx("button",{className:"btn",onClick:()=>{xt(),r(!1)},children:"VOLTAR AO LOGIN"})]}):J||n?s.jsx("div",{style:{display:"grid",placeItems:"center",height:"100vh"},children:"Carregando..."}):t?s.jsxs("div",{children:[s.jsxs("div",{className:"header",children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[t.type==="USER"&&t.data.logo&&s.jsx("img",{src:t.data.logo,style:{width:40,height:40,borderRadius:"50%",border:"2px solid var(--primary)",objectFit:"cover"}}),s.jsxs("div",{children:[s.jsx("div",{style:{fontWeight:"900",fontSize:16},children:t.type==="USER"?t.data.name:((Ga=t.data)==null?void 0:Ga.name)||t.type}),s.jsx("div",{className:"dev-credits",style:{textAlign:"left",margin:0},children:"Desenvolvido por: Nathan Reis | v2.4.0"})]})]}),s.jsxs("div",{style:{display:"flex",gap:15,alignItems:"center"},children:[["USER","PLAYER","COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t.type)&&s.jsxs("div",{onClick:()=>j("OFFERS"),style:{position:"relative",cursor:"pointer",padding:"5px",display:"flex",alignItems:"center"},children:[s.jsx("i",{className:"fas fa-bell",style:{fontSize:"20px",color:(_||[]).some(c=>c.recipientId===t.data.id&&(c.status==="PENDING"||c.status==="COUNTERED"))?"var(--warning)":"#666",transition:"0.3s"}}),(_||[]).some(c=>c.recipientId===t.data.id&&(c.status==="PENDING"||c.status==="COUNTERED"))&&s.jsx("span",{className:"pulse",style:{position:"absolute",top:"2px",right:"2px",background:"red",borderRadius:"50%",width:"10px",height:"10px",border:"2px solid var(--bg-card)"}})]}),["USER","COMPANY","PLAYER","COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t.type)&&s.jsx("div",{style:{color:"var(--primary)",fontWeight:"bold",marginLeft:10},children:Q(t.data.balance)}),t.type==="USER"&&s.jsx("i",{className:"fas fa-cog",style:{cursor:"pointer",marginLeft:10},onClick:()=>L({type:"SETTINGS",data:t.data})}),s.jsx("i",{className:"fas fa-sign-out-alt",style:{cursor:"pointer",marginLeft:10},onClick:()=>{confirm("Deseja realmente sair e trocar de conta?")&&(xt(),st.signOut().finally(()=>window.location.reload()))}})]})]}),s.jsxs("div",{className:"container",children:[U!=="LOGIN"&&s.jsx(yu,{calendar:ee}),U==="NATIONAL_TEAMS"&&s.jsx(Tu,{user:t,players:m,coaches:R,onBack:()=>j(Wn(t.type))}),U==="HOME"&&t.type==="ADMIN"&&s.jsx(Su,{onNationalTeams:()=>j("NATIONAL_TEAMS"),onCompetitions:()=>j("MATCHES"),user:t,matches:X,tourns:D,handleDeleteMatch:Ct,setModal:L,teams:o,papers:k,journalists:f,companies:p,reqs:ne,config:{...ae,calendar:ee},coaches:R,sps:h,players:m,onAct:Bs,onGenFixtures:zs,onTurnSeasonAdvanced:Ws,onPost:(c,M,V)=>et(`📢 **${c}**
${M}`,V),onApprove:Ds,onReject:c=>d.collection("financeRequests").doc(c).delete(),onEditT:c=>{_e(c),j("ADMIN_TEAM")},onApproveTeam:nr,onUpdateBal:rr,onDeleteTeam:ar,onApprovePaper:async c=>{await d.collection("newspapers").doc(c).update({status:"ACTIVE"}),alert("Jornal Aprovado com sucesso!")},onDeletePaper:ir,onDeleteJourno:sr,onRejectPaper:async c=>{await d.collection("newspapers").doc(c).delete(),alert("Jornal Recusado/Excluído!")},onConfig:c=>L({type:"SETTINGS",data:c}),onReset:tr,onApproveComp:async c=>{await d.collection("companies").doc(c).update({status:"ACTIVE"}),alert("Empresa Aprovada!")},onDeleteComp:async c=>{confirm("Excluir Empresa?")&&await d.collection("companies").doc(c).delete()},onUpdateCompBal:async(c,M)=>{await d.collection("companies").doc(c).update({balance:parseFloat(M)}),alert("Saldo Alterado!")},onGenAttrs:async()=>{if(!confirm("Isso vai gerar atributos para TODOS os jogadores que não têm. Continuar?"))return;Ae(!0);const c=d.batch();let M=0;m.forEach(V=>{if(!V.attributes){const ie=mn(V.position||"ATA",V.overall||60);c.update(d.collection("players").doc(V.id),{attributes:ie}),M++}}),await c.commit(),Ae(!1),alert(`Atributos gerados para ${M} jogadores!`)}}),U==="HOME"&&t.type==="USER"&&s.jsxs("div",{children:[s.jsx(bu,{team:t.data,players:m.filter(c=>c.teamId===t.data.id),staff:R.filter(c=>c.teamId===t.data.id&&c.status==="ACTIVE"),onFireCoach:$s,onRenewCoach:c=>L({type:"OFFER",data:c}),isVisitor:!1,setModal:L,onEdit:c=>L({type:"PLAYER",data:c}),onAdd:()=>L({type:"PLAYER",data:{teamId:t.data.id}})}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"user-home-view"),(U==="HOME"||U==="ASSISTANT_DASH")&&t.type==="ASSISTANT"&&s.jsxs("div",{children:[s.jsx(_u,{assistant:t.data,team:o.find(c=>c.id===t.data.teamId),players:m.filter(c=>c.teamId===t.data.teamId),offers:_,sales:se,onUseItem:Nn,onTrainRegen:dr,onSelfAction:(c,M)=>{c==="ACCEPT_OFFER"&&Rt(M.offer),c==="REJECT_OFFER"&&dt(M.offer),Qt(c,M)},onEvolvePerk:Pn,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"assistant-home-container"),U==="HOME"&&t.type==="VISITOR"&&s.jsx("div",{children:s.jsx(Cu,{players:m,teams:o})}),U==="PRESS_DASH"&&(t.type==="PRESS"||t.type==="PRESS_WORKER")&&s.jsxs("div",{children:[s.jsxs("h3",{children:["Painel de Imprensa (",t.data.name,")"]}),s.jsxs("div",{className:"card",children:[s.jsx("button",{className:"btn btn-blue",onClick:()=>L({type:"POST_NEWS"}),children:"ESCREVER NOTÍCIA"}),s.jsx("button",{className:"btn btn-purple",onClick:()=>L({type:"MATCH_PERFORMANCE"}),children:"LANÇAR SÚMULA (XP)"}),s.jsx("button",{className:"btn btn-gold",onClick:()=>L({type:"TEAM_TABLE"}),children:"EDITAR TABELA"})]}),t.type==="PRESS"&&f.filter(c=>c.newspaperId===t.data.id&&c.status==="PENDING").map(c=>s.jsxs("div",{className:"card",children:[c.name,s.jsx("button",{className:"btn btn-green",onClick:async()=>{await d.collection("journalists").doc(c.id).update({status:"ACTIVE"}),alert("Jornalista aprovado!")},children:"APROVAR"})]},c.id))]}),U==="MATCHES"&&s.jsxs("div",{style:{paddingBottom:60},children:[s.jsxs("div",{style:{display:"flex",gap:5,marginBottom:20,justifyContent:"center",overflowX:"auto"},children:[s.jsx("button",{className:`btn ${W==="LIGAS"?"btn-blue":"btn-ghost"}`,onClick:()=>y("LIGAS"),style:{padding:"10px 5px",fontSize:10},children:"NACIONAIS"}),s.jsx("button",{className:`btn ${W==="ESTADUAIS"?"btn-purple":"btn-ghost"}`,onClick:()=>y("ESTADUAIS"),style:{padding:"10px 5px",fontSize:10},children:"🗺️ ESTADUAIS"}),s.jsx("button",{className:`btn ${W==="COPAS"?"btn-cyan":"btn-ghost"}`,onClick:()=>y("COPAS"),style:{borderColor:"cyan",color:W==="COPAS"?"#000":"cyan",background:W==="COPAS"?"cyan":"transparent",padding:"10px 5px",fontSize:10},children:"🏆 COPAS"})]}),W==="LIGAS"&&s.jsxs("div",{className:"animate-in",children:[s.jsx("h2",{style:{color:"var(--primary)",textAlign:"center",marginTop:0},children:"Campeonato Mato Real"}),s.jsx("div",{style:{marginBottom:20},children:s.jsx(ht,{teams:o,serie:"A",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})})}),s.jsxs("details",{open:!0,children:[s.jsx("summary",{style:{padding:10,background:"#333",borderRadius:5,cursor:"pointer",fontWeight:"bold",marginBottom:10},children:"Divisões de Acesso (B, C, D)"}),s.jsxs("div",{style:{display:"grid",gap:20},children:[s.jsx(ht,{teams:o,serie:"B",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})}),s.jsx(ht,{teams:o,serie:"C",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})}),s.jsx(ht,{teams:o,serie:"D",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})})]})]}),s.jsxs("div",{style:{marginTop:30,border:"2px dashed gold",borderRadius:8,overflow:"hidden"},children:[s.jsx("div",{style:{background:"gold",color:"black",padding:"10px",textAlign:"center",fontWeight:"900",textTransform:"uppercase",letterSpacing:"1px"},children:"🚜 O Terrão (Várzea)"}),s.jsx("div",{style:{padding:5,background:"rgba(255, 215, 0, 0.05)"},children:s.jsx(ht,{teams:o,serie:"VARZEA",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})})})]}),s.jsx("hr",{style:{borderColor:"#333",margin:"20px 0"}}),s.jsx(Ei,{matches:X,teams:o,isAdmin:Ze(t,"competitions"),onCreateMatch:(c,M)=>L({type:"MATCH_MANAGER",data:{serie:c,round:M,homeId:"",awayId:"",scoreHome:0,scoreAway:0,status:"PENDING"}}),onEditMatch:c=>L({type:"MATCH_MANAGER",data:c}),onDeleteMatch:c=>Ct(c),onReportMatch:c=>{t.type.includes("PRESS")||Ze(t,"competitions")?L({type:"MATCH_PERFORMANCE",data:{match:c,player:null}}):alert("Apenas imprensa/admin lança súmula.")}})]}),W==="ESTADUAIS"&&s.jsxs("div",{className:"animate-in",children:[s.jsx("h2",{style:{color:"var(--purple)",textAlign:"center",marginTop:0},children:"🗺️ Campeonatos Estaduais"}),s.jsx("p",{style:{textAlign:"center",fontSize:11,color:"#aaa"},children:"Disputa entre todos os clubes da mesma região, independente de divisão!"}),wa.map(c=>{const M=X.filter(V=>V.isEstadual&&V.estado===c);return s.jsxs("details",{style:{marginBottom:10},children:[s.jsxs("summary",{style:{padding:15,background:"#1a1a1a",borderRadius:5,cursor:"pointer",fontWeight:"bold",border:"1px solid var(--purple)",color:"var(--purple)"},children:["📍 Campeonato ",c]}),s.jsxs("div",{style:{padding:"10px 0"},children:[s.jsx(ht,{teams:o,serie:"ESTADUAL",estado:c,onInspectTeam:V=>L({type:"VIEW_LINEUP",data:V})}),s.jsxs("div",{style:{marginTop:15},children:[s.jsxs("b",{style:{color:"#aaa",fontSize:11},children:["JOGOS DA RODADA (",c,"):"]}),M.length===0?s.jsx("p",{style:{fontSize:11,color:"#666"},children:"Nenhum jogo gerado ainda."}):s.jsx("div",{style:{marginTop:10},children:s.jsx(Ei,{matches:X.filter(V=>V.isEstadual&&V.estado===c),teams:o,isAdmin:Ze(t,"competitions"),onCreateMatch:()=>alert("Jogos estaduais são gerados automaticamente."),onEditMatch:V=>L({type:"MATCH_MANAGER",data:V}),onDeleteMatch:V=>Ct(V),onReportMatch:V=>{t.type.includes("PRESS")||Ze(t,"competitions")?L({type:"MATCH_PERFORMANCE",data:{match:V,player:null}}):alert("Apenas imprensa/admin lança súmula.")}})})]})]})]},c)})]}),W==="COPAS"&&s.jsx("div",{className:"animate-in",children:s.jsx(Ru,{tournaments:D,matches:X,players:m,user:t,teams:o,onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c}),onCreateMatch:c=>L({type:"MATCH_MANAGER",data:{serie:c,round:1,homeId:"",awayId:"",scoreHome:0,scoreAway:0,status:"PENDING"}}),onEditMatch:c=>L({type:"MATCH_MANAGER",data:c}),onDeleteMatch:c=>Ct(c),onReportMatch:c=>L({type:"MATCH_PERFORMANCE",data:{match:c,player:null}})})})]}),U==="MARKET"&&s.jsx(Ou,{user:t,me:($a=t.data)==null?void 0:$a.id,teams:o,players:m,coaches:R,open:ae.marketOpen,isVis:t.type==="VISITOR"||t.type==="COACH",onIndicate:Xs,onNeg:c=>L({type:"OFFER",data:c}),onPayClause:async c=>{const M=o.find(he=>he.id===t.data.id),V=o.find(he=>he.id===c.teamId);if(M.balance<c.clause)return alert("Saldo insuficiente!");if(!confirm(`Pagar multa de ${Q(c.clause)} por ${c.name}?`))return;const ie=d.batch();ie.update(d.collection("teams").doc(M.id),{balance:M.balance-c.clause}),ie.update(d.collection("teams").doc(V.id),{balance:V.balance+c.clause}),ie.update(d.collection("players").doc(c.id),{teamId:M.id,status:"NAO_A_VENDA",contract:3,history:q.firestore.FieldValue.arrayUnion({date:Date.now(),from:V.name,to:M.name,type:"MULTA",value:c.clause})}),await ie.commit(),et(`🚨 **MULTA PAGA!**
O **${M.name}** pagou a multa de **${c.name}**!`,"transfer"),alert("Contratado via multa!")},onPre:async c=>{const M=o.find(V=>V.id===t.data.id);confirm(`Assinar pré-contrato com ${c.name}?`)&&(await d.collection("players").doc(c.id).update({preContract:{teamId:M.id,teamName:M.name},mood:"🤩"}),et(`📝 **PRÉ-CONTRATO**
**${c.name}** reforçará o **${M.name}** na próxima temporada!`,"transfer"),alert("Pré-contrato assinado!"))},onHireCoach:c=>L({type:"HIRE_COACH",data:c})}),U==="SHOPPING"&&s.jsx(wu,{products:C,companies:p,user:t,players:m,teams:o,onBuy:Js,onDeleteProd:async c=>{confirm("Admin: Excluir produto?")&&await d.collection("products").doc(c).delete()}}),U==="SPONSORSHIPS"&&t.type==="USER"&&s.jsxs("div",{children:[s.jsx("h3",{children:"Buscar Patrocínio"}),s.jsx("p",{style:{fontSize:11,color:"#aaa"},children:"Envie propostas semanais para as empresas."}),p.filter(c=>c.status==="ACTIVE").map(c=>s.jsxs("div",{className:"card",children:[s.jsx("b",{children:c.name})," ",s.jsxs("small",{children:["(",(wn[c.companyType]||{}).label,")"]}),s.jsx("div",{style:{display:"flex",gap:5,marginTop:5},children:s.jsx("button",{className:"btn btn-purple",onClick:()=>{const M=prompt("Valor Semanal pedido (₣):");M&&Zs(c.id,M)},children:"PEDIR PATROCÍNIO"})})]},c.id)),s.jsx("hr",{style:{borderColor:"#333"}}),s.jsx("h4",{children:"Meus Contratos"}),h.filter(c=>c.teamId===t.data.id).length===0&&s.jsx("p",{style:{color:"#666"},children:"Sem contratos."}),h.filter(c=>c.teamId===t.data.id).map(c=>s.jsxs("div",{className:"card",style:{borderLeft:`4px solid ${c.status==="ACTIVE"?"var(--primary)":"#666"}`},children:[s.jsx("b",{children:c.companyName}),s.jsx("br",{}),"Valor: ",Q(c.value),"/sem"," ",s.jsxs("small",{children:["(",c.status==="PENDING"?"Aguardando":"Ativo",")"]}),c.status==="ACTIVE"&&s.jsx("button",{className:"btn btn-red",style:{width:"auto",marginTop:5},onClick:()=>{confirm("Encerrar contrato de patrocínio?")&&d.collection("sponsorships").doc(c.id).delete()},children:"ENCERRAR"})]},c.id))]}),U==="RANKING"&&s.jsx(Nu,{teams:o,players:m,sales:se,hallOfFame:B}),U==="NEWS"&&s.jsxs("div",{children:[s.jsx("h3",{children:"Notícias"}),x.map(c=>s.jsxs("div",{className:`news-card news-${c.type}`,children:[c.text,s.jsx("br",{}),s.jsx("small",{style:{color:"#666"},children:new Date(c.date).toLocaleString()})]},c.id))]}),U==="SOCIAL"&&s.jsx(Pu,{user:t,posts:de,onPost:mr,onLike:fr,onDeletePost:gr,onSendChat:Ir,onSubChat:yr,messages:Oe,onFollow:vr}),U==="OFFERS"&&s.jsx(xu,{user:t,offers:_,teams:o,players:m,setModal:L,onAccept:hr,onReject:dt,onCounter:c=>L({type:"OFFER",data:{...m.find(M=>M.id===c.playerId),oldOffer:c}}),onCoachAccept:Rt,onCoachReject:dt,onCoachCounter:Na}),U==="PUBLIC_SERVICES"&&s.jsx(Lu,{players:m,coaches:R,user:t,onDonate:Jt,onOperate:()=>{t.type==="DOCTOR"?j("DOCTOR_DASH"):alert("As cirurgias são realizadas pelo médico no painel médico. O fundo hospitalar deste jogador permanece disponível para o procedimento.")}}),(U==="COMPANY_DASH"||U==="COMPANY_HOME")&&t.type==="COMPANY"&&s.jsx(ku,{company:t.data,products:C.filter(c=>c.companyId===t.data.id),sps:h.filter(c=>c.companyId===t.data.id),sales:se||[],teams:o,onSaveProd:Ks,onDeleteProd:async c=>{confirm("Excluir produto?")&&await d.collection("products").doc(c).delete()},onProcessSpons:Ys}),U==="PLAYER_DASH"&&t.type==="PLAYER"&&s.jsxs("div",{children:[s.jsx(Du,{user:t,player:m.find(c=>c.id===t.data.id)||t.data,team:o.find(c=>c.id===t.data.teamId),sales:se||[],onAction:Er,onUpdatePassword:async c=>{await d.collection("players").doc(t.data.id).update({password:c}),alert("Senha alterada!")},onTrainSolo:La,onUseItem:er,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"player-dash-container"),(U==="HOME"||U==="COACH_DASH")&&t.type==="COACH"&&s.jsxs("div",{children:[s.jsx(Mu,{coach:t.data,team:o.find(c=>c.id===t.data.teamId),players:m.filter(c=>c.teamId===t.data.teamId),offers:_,sales:se,onTrain:Pa,onEvolvePerk:Pn,onAddAffinity:async c=>{await d.collection("users").doc(t.data.id).update({affinities:q.firestore.FieldValue.arrayUnion(c),pendingAffinity:q.firestore.FieldValue.increment(-1)}),alert("Nova afinidade desbloqueada!")},onAcceptOffer:Rt,onRejectOffer:dt,onCounterOffer:Na,onUpdateSalary:cr,onSelfAction:Qt,onSaveTactics:Qs,onUseItem:Nn,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"coach-home-container"),(U==="HOME"||U==="DOCTOR_DASH")&&t.type==="DOCTOR"&&s.jsxs("div",{children:[s.jsx(ju,{doctor:t.data,team:o.find(c=>c.id===t.data.teamId),players:m.filter(c=>c.teamId===t.data.teamId),offers:_,sales:se,onUseItem:Nn,onSelfAction:(c,M)=>{c==="ACCEPT_OFFER"&&Rt(M.offer),c==="REJECT_OFFER"&&dt(M.offer),Qt(c,M)},onEvolvePerk:Pn,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"doctor-home-container"),(U==="HOME"||U==="SCOUT_DASH")&&t.type==="SCOUT"&&s.jsxs("div",{children:[s.jsx(Fu,{scout:t.data,team:o.find(c=>c.id===t.data.teamId),players:m.filter(c=>c.teamId===t.data.teamId),setModal:L,onSelfAction:(c,M)=>{c==="ACCEPT_OFFER"&&Rt(M.offer),c==="REJECT_OFFER"&&dt(M.offer),Qt(c,M)}}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"scout-home-container"),s.jsxs("div",{className:"scroll-hint",children:["Deslize ",s.jsx("i",{className:"fas fa-arrow-right"})]}),s.jsxs("div",{className:"bottom-nav",children:[s.jsxs("div",{className:`nav-item ${["HOME","COMPANY_HOME","COMPANY_DASH","PLAYER_DASH","COACH_DASH","DOCTOR_DASH","ASSISTANT_DASH","SCOUT_DASH","PRESS_DASH"].includes(U)?"active":""}`,onClick:()=>{t.type.includes("PRESS")?j("PRESS_DASH"):t.type==="COMPANY"?j("COMPANY_HOME"):t.type==="PLAYER"?j("PLAYER_DASH"):t.type==="COACH"?j("COACH_DASH"):t.type==="DOCTOR"?j("DOCTOR_DASH"):t.type==="ASSISTANT"?j("ASSISTANT_DASH"):t.type==="SCOUT"?j("SCOUT_DASH"):j("HOME")},children:[s.jsx("i",{className:"fas fa-home"}),s.jsx("span",{children:"INÍCIO"})]}),s.jsxs("div",{className:`nav-item ${U==="MATCHES"?"active":""}`,onClick:()=>j("MATCHES"),children:[s.jsx("i",{className:"fas fa-futbol"}),s.jsx("span",{children:"JOGOS"})]}),s.jsxs("div",{className:`nav-item ${U==="SOCIAL"?"active":""}`,onClick:()=>j("SOCIAL"),children:[s.jsx("i",{className:"fas fa-camera"}),s.jsx("span",{children:"SOCIAL"})]}),s.jsxs("div",{className:`nav-item ${U==="PUBLIC_SERVICES"?"active":""}`,onClick:()=>j("PUBLIC_SERVICES"),children:[s.jsx("i",{className:"fas fa-city"}),s.jsx("span",{children:"CIDADE"})]}),s.jsxs("div",{className:`nav-item ${U==="MARKET"?"active":""}`,onClick:()=>j("MARKET"),children:[s.jsx("i",{className:"fas fa-globe"}),s.jsx("span",{children:"MERCADO"})]}),t.type!=="COMPANY"&&s.jsxs("div",{className:`nav-item ${U==="SHOPPING"?"active":""}`,onClick:()=>j("SHOPPING"),children:[s.jsx("i",{className:"fas fa-shopping-bag"}),s.jsx("span",{children:"SHOP"})]}),t.type==="USER"&&s.jsxs("div",{className:`nav-item ${U==="SPONSORSHIPS"?"active":""}`,onClick:()=>j("SPONSORSHIPS"),children:[s.jsx("i",{className:"fas fa-handshake"}),s.jsx("span",{children:"PATRO"})]}),t.type!=="COMPANY"&&s.jsxs("div",{className:`nav-item ${U==="RANKING"?"active":""}`,onClick:()=>j("RANKING"),children:[s.jsx("i",{className:"fas fa-trophy"}),s.jsx("span",{children:"RANK"})]}),s.jsxs("div",{className:`nav-item ${U==="NEWS"?"active":""}`,onClick:()=>{j("NEWS"),H(!1),zn("lastRead",Date.now())},children:[s.jsx("i",{className:"fas fa-newspaper"}),s.jsx("span",{children:"NEWS"})]}),s.jsxs("div",{role:"button",tabIndex:0,className:`nav-item ${U==="NATIONAL_TEAMS"?"active":""}`,onClick:()=>j("NATIONAL_TEAMS"),onKeyDown:c=>{c.key==="Enter"&&j("NATIONAL_TEAMS")},children:[s.jsx("span",{children:"🌍"}),s.jsx("span",{children:"SELEÇÕES"})]})]}),A&&s.jsx("div",{className:"modal-overlay",onClick:c=>c.target===c.currentTarget&&L(null),children:s.jsxs("div",{className:"modal-content",children:[A.type==="PLAYER"&&s.jsx(Vu,{initial:A.data,onSave:lr,onDelete:async c=>{d.collection("players").doc(c).delete(),L(null)},isAdmin:Ze(t,"teams"),teams:o,onRenew:pr,isOwner:t.type==="USER"&&((Ha=A.data)==null?void 0:Ha.teamId)===((Ba=t.data)==null?void 0:Ba.id)}),A.type==="TEAM_REQUEST_PLAYER"&&s.jsx(Uu,{team:A.data,onClose:()=>L(null),onSubmit:async c=>{try{Ae(!0);const M=mn(c.position,c.overall);await d.collection("players").add({...c,attributes:M,requestedStatus:c.status,status:"PENDING",xp:0,fame:0,balance:0,stats:{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0}}),Ae(!1),L(null),alert("Inscrição enviada com sucesso! O jogador aparecerá no seu elenco assim que a Federação aprovar.")}catch(M){Ae(!1),alert("Erro ao inscrever: "+M.message)}}}),A.type==="ADMIN_PLAYER"&&s.jsx(Gu,{player:A.data,teams:o,onClose:()=>L(null)}),A.type==="CT_TYCOON"&&A.data&&s.jsx($u,{team:o.find(c=>c.id===A.data.id)||A.data,players:m.filter(c=>c.teamId===A.data.id),staff:(R||[]).filter(c=>c.teamId===A.data.id&&c.status==="ACTIVE"),user:t,onClose:()=>L(null),onTrain:Pa,onTrainSolo:La}),A.type==="OFFER"&&s.jsx(Hu,{target:A.data,myPlayers:m.filter(c=>c.teamId===t.data.id),onSend:ur,setModal:L,user:t}),A.type==="SETTINGS"&&s.jsx(Bu,{team:A.data||t.data,isAdmin:Ze(t,"teams"),onUp:c=>{var ie,he;const M=((ie=A.data)==null?void 0:ie.id)||t.data.id;let V={...c};c.estado&&!((he=A.data)!=null&&he.stateStats)&&(V.stateStats={pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}),d.collection("teams").doc(M).update(V),L(null)},onUpgrade:()=>{},onReq:(c,M,V)=>{d.collection("financeRequests").add({teamId:t.data.id,teamName:t.data.name,type:c,amount:parseFloat(M),details:V,status:"PENDING"}),L(null),alert("Enviado!")},onWithdraw:or}),A.type==="MATCH_PERFORMANCE"&&s.jsx(yi,{players:m,teams:o,onSaveStats:xa,matchData:(za=A.data)==null?void 0:za.match}),A.type==="TEAM_TABLE"&&s.jsx(zu,{teams:o,onUpdateTeamStats:Ar}),A.type==="POST_NEWS"&&s.jsxs("div",{children:[s.jsx("h3",{children:"Nova Notícia"}),s.jsx("input",{className:"input-field",placeholder:"Manchete / Texto",id:"news-body"}),s.jsx("button",{className:"btn btn-blue",onClick:()=>{et(`📰 **${t.data.name}:**
${document.getElementById("news-body").value}`,"press"),L(null)},children:"PUBLICAR"})]}),A.type==="EDIT_PRIZES"&&s.jsx(Wu,{initialData:A.data,onSave:async c=>{await d.collection("config").doc("system").update({prizes:c}),alert("Premiações Atualizadas!"),L(null)},onClose:()=>L(null)}),A.type==="AWARDS_MANAGER"&&s.jsx(qu,{awards:v,teams:o,players:m,coaches:R,onClose:()=>L(null)}),A.type==="TOURN_MANAGER"&&s.jsx(Ku,{tournaments:D,teams:o,awards:v,onClose:()=>L(null)}),A.type==="STATS_SEARCH"&&s.jsx(Zu,{players:m,teams:o,onSave:async(c,M)=>{try{const V=Object.fromEntries(Object.entries(M).map(([ie,he])=>[ie,Math.max(0,Number.isFinite(Number(he))?Number(he):0)]));await d.collection("players").doc(c).update({stats:V}),L(null),alert("Estatísticas atualizadas!")}catch(V){alert("Erro ao salvar: "+V.message)}}}),A.type==="MATCH_MANAGER"&&s.jsx(Yu,{initialData:A.data,teams:o,tournaments:D,onSave:ks,onDelete:Ct}),A.type==="MATCH_REPORT"&&s.jsx(yi,{players:m,teams:o,onSaveStats:xa}),(A==null?void 0:A.type)==="VIEW_LINEUP"&&s.jsx("div",{className:"modal-overlay",onClick:()=>L(null),children:s.jsxs("div",{className:"modal-content animate-in",style:{maxWidth:"550px",maxHeight:"90vh",overflowY:"auto",background:"#121212",border:"1px solid var(--primary)",padding:"15px"},onClick:c=>c.stopPropagation(),children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:15,position:"sticky",top:"-15px",background:"#121212",zIndex:100,padding:"15px 0 10px 0",borderBottom:"1px solid #333"},children:[s.jsxs("h3",{style:{margin:0,color:"var(--primary)",display:"flex",alignItems:"center",gap:10},children:[A.data.logo?s.jsx("img",{src:A.data.logo,style:{width:35,height:35,borderRadius:"50%",border:"1px solid var(--primary)",objectFit:"cover"}}):s.jsx("span",{style:{fontSize:24},children:"🛡️"}),A.data.name]}),s.jsx("button",{className:"btn btn-red",style:{width:"auto",padding:"5px 10px",margin:0},onClick:()=>L(null),children:"FECHAR"})]}),(()=>{const c=A.data.stadiumLevel||1,M=It[c]||It[1],V=A.data.ticketPrice||M.minTic;return s.jsxs("div",{style:{position:"relative",height:130,borderRadius:8,overflow:"hidden",marginBottom:20,border:"1px solid cyan",background:"#111",boxShadow:"0 4px 8px rgba(0,0,0,0.5)"},children:[A.data.stadiumPic?s.jsx("img",{src:A.data.stadiumPic,style:{width:"100%",height:"100%",objectFit:"cover",opacity:.6}}):s.jsx("div",{style:{display:"grid",placeItems:"center",height:"100%",fontSize:50,color:"#333"},children:"🏟️"}),s.jsxs("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0,0,0,0.95))",padding:"30px 10px 10px 10px"},children:[s.jsxs("b",{style:{color:"cyan",fontSize:15,display:"block",marginBottom:4,textShadow:"1px 1px 2px black"},children:[M.name," ",s.jsxs("small",{style:{color:"gold"},children:["(Nvl ",c,")"]})]}),s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:10,color:"#ddd",textShadow:"1px 1px 2px black"},children:[s.jsxs("span",{children:["👥"," ",s.jsx("b",{style:{color:"#fff"},children:M.cap.toLocaleString("pt-BR")})]}),s.jsxs("span",{children:["🎫"," ",s.jsx("b",{style:{color:"#00E676"},children:Q(V)})]})]})]})]})})(),(()=>{const c=(R||[]).filter(ie=>ie.teamId===A.data.id&&ie.status==="ACTIVE").sort((ie,he)=>ie.type.localeCompare(he.type)),M={COACH:"👔",ASSISTANT:"📋",DOCTOR:"🩺",SCOUT:"🕵️‍♂️"},V={COACH:"Técnico",ASSISTANT:"Auxiliar",DOCTOR:"Médico",SCOUT:"Olheiro"};return s.jsxs("div",{style:{marginBottom:25},children:[s.jsx("h4",{style:{color:"gold",margin:"0 0 10px 0",fontSize:14,borderBottom:"1px solid #333",paddingBottom:5},children:"👔 Comissão Técnica"}),c.length===0?s.jsx("p",{style:{fontSize:11,color:"#666",fontStyle:"italic"},children:"Nenhum profissional contratado."}):s.jsx("div",{style:{display:"flex",gap:10,overflowX:"auto",paddingBottom:10},children:c.map(ie=>s.jsxs("div",{style:{minWidth:"110px",background:"rgba(255,215,0,0.05)",border:"1px solid gold",borderRadius:8,padding:10,textAlign:"center"},children:[ie.face?s.jsx("img",{src:ie.face,style:{width:45,height:45,borderRadius:"50%",objectFit:"cover",marginBottom:5,border:"1px solid gold"}}):s.jsx("div",{style:{fontSize:26,marginBottom:5},children:M[ie.type]}),s.jsx("b",{style:{fontSize:11,display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:ie.name}),s.jsxs("span",{style:{fontSize:9,color:"gold",fontWeight:"bold"},children:[V[ie.type]," (Nv ",ie.level,")"]})]},ie.id))})]})})(),s.jsxs("div",{style:{marginBottom:25},children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-end",borderBottom:"1px solid #333",paddingBottom:5,marginBottom:10},children:[s.jsx("h4",{style:{color:"var(--primary)",margin:0,fontSize:14},children:"⚽ Escalação Principal"}),s.jsxs("span",{style:{fontSize:10,color:"#888"},children:["Esquema:"," ",((Wa=A.data.tactics)==null?void 0:Wa.formation)||"Não definido"]})]}),s.jsx("div",{className:"football-field",style:{height:"400px",pointerEvents:"none",position:"relative"},children:A.data.tactics?Ls[A.data.tactics.formation].map((c,M)=>{const V=Iu[A.data.tactics.formation][M],ie=A.data.tactics.lineup[M],he=m.find(xn=>xn.id===ie);return s.jsxs("div",{style:{position:"absolute",top:V.t,left:V.l,transform:"translate(-50%, -50%)",display:"flex",flexDirection:"column",alignItems:"center"},children:[s.jsx("div",{className:"player-photo-circle",style:{width:"36px",height:"36px",border:he?"2px solid gold":"1px dashed #666",background:he?"#001a33":"rgba(0,0,0,0.4)",boxShadow:"0 4px 6px rgba(0,0,0,0.6)"},children:he!=null&&he.face?s.jsx("img",{src:he.face,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}):s.jsx("span",{style:{fontSize:"9px"},children:c})}),s.jsx("div",{className:"player-name-label",style:{fontSize:"9px",padding:"2px 6px",background:he?"#fff":"rgba(0,0,0,0.8)",color:he?"#000":"#fff",fontWeight:"900",marginTop:"3px",borderRadius:"4px",border:he?"1px solid #333":"none",boxShadow:"0 2px 5px rgba(0,0,0,0.8)",letterSpacing:"0.5px"},children:he?`${he.name.split(" ")[0].toUpperCase()} | ${he.overall}`:"VAZIO"})]},M)}):s.jsxs("div",{style:{display:"grid",placeItems:"center",height:"100%",color:"#fff",fontSize:"13px",textAlign:"center",padding:20},children:[s.jsx("br",{}),"O técnico ainda não enviou a súmula tática."]})})]}),(()=>{const c=A.data.tactics?Object.values(A.data.tactics.lineup):[],M=m.filter(V=>V.teamId===A.data.id&&!c.includes(V.id)).sort((V,ie)=>ie.overall-V.overall);return s.jsxs("div",{style:{marginBottom:25},children:[s.jsxs("h4",{style:{color:"var(--secondary)",margin:"0 0 10px 0",fontSize:14,borderBottom:"1px solid #333",paddingBottom:5},children:["🪑 Banco de Reservas (",M.length,")"]}),M.length===0?s.jsx("p",{style:{fontSize:11,color:"#666",fontStyle:"italic"},children:"Nenhum jogador no banco de reservas."}):s.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:M.map(V=>s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,background:"#1a1a1a",padding:8,borderRadius:6,borderLeft:`3px solid ${vu(V.position)}`,border:"1px solid #333"},children:[V.face?s.jsx("img",{src:V.face,style:{width:32,height:32,borderRadius:"50%",objectFit:"cover",objectPosition:"top"}}):s.jsx("div",{style:{width:32,height:32,borderRadius:"50%",background:"#333",display:"grid",placeItems:"center",fontSize:10},children:"👤"}),s.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[s.jsxs("b",{style:{fontSize:11,display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:[V.name," ",V.recoveryLeft>0?"🏥":""]}),s.jsx("span",{style:{fontSize:9,color:"#aaa"},children:V.position})]}),s.jsx("b",{style:{color:V.overall>=80?"gold":V.overall>=70?"lime":"white",fontSize:14},children:V.overall})]},V.id))})]})})(),s.jsxs("div",{children:[s.jsx("h4",{style:{color:"gold",margin:"0 0 10px 0",fontSize:14,borderBottom:"1px solid #333",paddingBottom:5},children:"🏆 Sala de Troféus"}),!A.data.trophies||A.data.trophies.length===0?s.jsx("p",{style:{fontSize:11,color:"#666",textAlign:"center",padding:20,background:"#1a1a1a",borderRadius:8,fontStyle:"italic"},children:"A estante do clube ainda está vazia."}):s.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(80px, 1fr))",gap:10},children:[...A.data.trophies].reverse().map((c,M)=>s.jsxs("div",{style:{textAlign:"center",background:"rgba(255,215,0,0.05)",padding:10,borderRadius:8,border:"1px solid #444"},children:[s.jsx("img",{src:c.img,style:{width:45,height:45,objectFit:"contain",filter:"drop-shadow(0 0 5px rgba(255,215,0,0.5))"}}),s.jsx("div",{style:{fontSize:9,fontWeight:"bold",color:"#fff",marginTop:5},children:c.name}),s.jsx("div",{style:{fontSize:8,color:"gold"},children:c.tournament})]},M))})]})]})}),A.type==="HIRE_COACH"&&s.jsxs("div",{className:"modal-content",children:[s.jsxs("h3",{children:["Negociar com ",A.data.name]}),s.jsx("label",{children:"Salário Semanal (₣)"}),s.jsx("input",{className:"input-field",type:"number",id:"c_salary",defaultValue:A.data.salary}),s.jsx("label",{children:"Duração (Temporadas)"}),s.jsxs("select",{className:"input-field",id:"c_contract",children:[s.jsx("option",{value:"1",children:"1 Temporada"}),s.jsx("option",{value:"2",children:"2 Temporadas"}),s.jsx("option",{value:"3",children:"3 Temporadas"})]}),s.jsx("label",{children:"Multa Rescisória (₣)"}),s.jsx("input",{className:"input-field",type:"number",id:"c_clause",defaultValue:A.data.salary*10}),s.jsxs("div",{style:{display:"flex",gap:10,marginTop:15},children:[s.jsx("button",{className:"btn btn-green",onClick:()=>{const c=document.getElementById("c_salary").value,M=document.getElementById("c_contract").value,V=document.getElementById("c_clause").value;Hs(A.data.id,c,M,V),L(null)},children:"ENVIAR PROPOSTA"}),s.jsx("button",{className:"btn btn-red",onClick:()=>L(null),children:"CANCELAR"})]})]})]})})]})]}):s.jsx(Eu,{teams:o,players:m,papers:k,journalists:f,companies:p,coaches:R,onLogin:Xt,onCreateTeam:js,onCreatePaper:Us,onCreateJourno:Gs,onCreateCompany:qs,onAdmin:Ms,onVisitor:()=>{e({type:"VISITOR",data:{id:"visitor",name:"Visitante"}}),j("RANKING")},onCreateCoach:Vs,onCreatePlayer:Fs,config:ae})}Ci(document.getElementById("root")).render(s.jsx(jr,{children:s.jsx(ue.Suspense,{fallback:s.jsx("div",{style:{display:"grid",placeItems:"center",height:"100vh"},children:"Carregando..."}),children:s.jsx(Ju,{})})}));export{Ni as A,$t as B,wn as C,ru as D,gu as E,Ls as F,Iu as G,Au as H,tn as I,ou as J,wa as K,Ps as N,iu as P,It as S,Oa as a,lh as b,zd as c,Ze as d,Kd as e,qn as f,mn as g,Ya as h,d as i,s as j,Wd as k,fu as l,An as m,rh as n,sh as o,ah as p,Q as q,ch as r,dh as s,vu as t,ih as u,oh as v,Qd as w,Yd as x,nn as y,na as z};
