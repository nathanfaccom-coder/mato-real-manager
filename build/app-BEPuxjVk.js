const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Broadcast-Bu_zbXWP.js","./react-nf7bT_Uh.js","./rules-CI3EvBDW.js","./firebase-927kk_Ef.js","./NationalTeams-BTCX_nWo.js","./AdminPanel-DUPPHpyv.js","./getRecommendedPrice-J9S5cFrD.js","./getProdCost-BOBAoKhR.js","./TeamDashboard-CToE-rWy.js","./AttributeGrid-bjrUYzRg.js","./AssistantDashboard-C2VHvfxZ.js","./VisitorDashboard-fLm_Kq6j.js","./LeagueTable-CMltTdH5.js","./MatchCenter-D06pRN7n.js","./MatchTeamLogo-D2o2R8J-.js","./TournamentHub-DEvt3hAU.js","./Market-CwVqGI_p.js","./ShoppingScreen-Ctspp27c.js","./Ranking-Cph2TSKt.js","./PlayerCard-BGVZRRYe.js","./SocialHub-sTWDdsGS.js","./OffersScreen-Ba34NhKh.js","./PublicServices-8Wlqt0Or.js","./CompanyDashboard-Dom7h4Zq.js","./PlayerDashboard-Cb9lwV-s.js","./CoachDashboard-DGZD2sK5.js","./DoctorDashboard-ruu2praI.js","./ScoutDashboard-D5ufV6OE.js","./PlayerForm-BdjHUAjc.js","./TeamRequestPlayerModal-CuM4r8iE.js","./AdminPlayerModal-CboWY3B4.js","./TrainingCenterManager-BQQIvHVo.js","./OfferForm-DHuJ_p5w.js","./SettingsForm-XvKrt_h0.js","./MatchPerformanceForm-CUe3_HdI.js","./TeamStandingsEditor-CHzsJoUH.js","./PrizeEditor-CMC4GV0b.js","./AwardsManager-C3LLTFbc.js","./TournamentManagerModal-7ypAPSz0.js","./StatsEditor-CQXhufwG.js","./MatchManagerForm-DJQbJXWT.js"])))=>i.map(i=>d[i]);
import{r as q,a as Dr,R as de}from"./react-nf7bT_Uh.js";import{f as Z,L as Mr,g as jr,i as Fr,a as un,_ as Qn,C as Wa,r as ei,b as Ri,S as qt,E as hn,c as me,d as Vr,e as Oi,h as be,F as Je,j as Ur,q as Tt,k as mt,l as Lt,m as _i,n as Gr,o as wi,p as qa}from"./firebase-927kk_Ef.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();var Ni={exports:{}},Ia={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $r=q,Hr=Symbol.for("react.element"),Br=Symbol.for("react.fragment"),zr=Object.prototype.hasOwnProperty,Wr=$r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,qr={key:!0,ref:!0,__self:!0,__source:!0};function Pi(t,e,a){var n,i={},r=null,o=null;a!==void 0&&(r=""+a),e.key!==void 0&&(r=""+e.key),e.ref!==void 0&&(o=e.ref);for(n in e)zr.call(e,n)&&!qr.hasOwnProperty(n)&&(i[n]=e[n]);if(t&&t.defaultProps)for(n in e=t.defaultProps,e)i[n]===void 0&&(i[n]=e[n]);return{$$typeof:Hr,type:t,key:r,ref:o,props:i,_owner:Wr.current}}Ia.Fragment=Br;Ia.jsx=Pi;Ia.jsxs=Pi;Ni.exports=Ia;var s=Ni.exports,xi,ti=Dr;xi=ti.createRoot,ti.hydrateRoot;const Li=new Set(["USER","PLAYER","COMPANY","PRESS","PRESS_WORKER","COACH","DOCTOR","SCOUT","ASSISTANT"]);function Kr(t=localStorage){var e;try{const a=JSON.parse(t.getItem("user")||"null");return!a||!Li.has(a.type)||typeof((e=a.data)==null?void 0:e.id)!="string"?null:{type:a.type,data:{id:a.data.id}}}catch{return null}}function Ka(t,e=localStorage){var a;try{Li.has(t==null?void 0:t.type)&&((a=t.data)!=null&&a.id)?e.setItem("user",JSON.stringify({type:t.type,data:{id:t.data.id}})):e.removeItem("user")}catch{}}function kt(t=localStorage){try{const e=Array.from({length:t.length||0},(a,n)=>t.key(n));for(const a of e)a!=null&&a.startsWith("navigation:")&&t.removeItem(a)}catch{}for(const e of["user","savedScreen","lastRead"])try{t.removeItem(e)}catch{}}function Ya(t,e=localStorage){try{return e.getItem(t)}catch{return null}}function Za(t,e,a=localStorage){try{a.setItem(t,e)}catch{}}const Yr={USER:"teams",PLAYER:"players",COMPANY:"companies",PRESS:"newspapers",PRESS_WORKER:"journalists",COACH:"users",DOCTOR:"users",SCOUT:"users",ASSISTANT:"users"};function pa(t){return{PLAYER:"PLAYER_DASH",COACH:"COACH_DASH",DOCTOR:"DOCTOR_DASH",SCOUT:"SCOUT_DASH",ASSISTANT:"ASSISTANT_DASH",COMPANY:"COMPANY_DASH",PRESS:"PRESS_DASH",PRESS_WORKER:"PRESS_DASH",VISITOR:"RANKING"}[t]||"HOME"}function ki(t,e){return["BROADCAST","WATCH_GAMES","NATIONAL_TEAMS","MATCHES","MARKET","SHOPPING","RANKING","NEWS","SOCIAL","OFFERS","PUBLIC_SERVICES"].includes(e)||e===pa(t)||e==="SPONSORSHIPS"&&t==="USER"||e==="COMPANY_HOME"&&t==="COMPANY"?e:pa(t)}function Di(t,e){return`navigation:${t.type}:${t.data.id}:${e}`}function Ja(t,e,a=null){return Ya(Di(t,e))??a}function ai(t,e,a){Za(Di(t,e),a)}class Zr extends de.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,a){console.error("Crash:",e,a)}render(){return this.state.hasError?s.jsxs("div",{className:"error-screen",children:[s.jsx("h2",{children:"Ocorreu um erro!"}),s.jsx("p",{children:"O aplicativo encontrou um problema inesperado."}),s.jsx("button",{className:"btn btn-red",onClick:()=>{kt(),window.location.reload()},children:"REINICIAR APLICATIVO"})]}):this.props.children}}const Jr="modulepreload",Xr=function(t,e){return new URL(t,e).href},ni={},pe=function(e,a,n){let i=Promise.resolve();if(a&&a.length>0){const o=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),p=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));i=Promise.allSettled(a.map(m=>{if(m=Xr(m,n),m in ni)return;ni[m]=!0;const E=m.endsWith(".css"),T=E?'[rel="stylesheet"]':"";if(!!n)for(let B=o.length-1;B>=0;B--){const F=o[B];if(F.href===m&&(!E||F.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${m}"]${T}`))return;const U=document.createElement("link");if(U.rel=E?"stylesheet":Jr,E||(U.as="script"),U.crossOrigin="",U.href=m,p&&U.setAttribute("nonce",p),document.head.appendChild(U),E)return new Promise((B,F)=>{U.addEventListener("load",B),U.addEventListener("error",()=>F(new Error(`Unable to preload CSS for ${m}`)))})}))}function r(o){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=o,window.dispatchEvent(d),!d.defaultPrevented)throw o}return i.then(o=>{for(const d of o||[])d.status==="rejected"&&r(d.reason);return e().catch(r)})},Kt="NEXLYzsJfLPsTxzp3LKHKwaPhEZ2",Mi=Object.freeze({teams:"Times e jogadores (cadastros, elencos e configurações)",finance:"Finanças e premiações",press:"Imprensa e jornalistas",companies:"Empresas",staff:"Comissão técnica",calendar:"Calendário",competitions:"Campeonatos, partidas e súmulas",nationalTeams:"Seleções, técnicos e convocações"}),Sa=t=>{var e;return(t==null?void 0:t.type)==="ADMIN"&&((e=t.data)==null?void 0:e.id)===Kt},Ta=t=>(t==null?void 0:t.type)==="ADMIN"&&!Sa(t);function Ye(t,e){var a,n;return Sa(t)||Ta(t)&&Object.hasOwn(Mi,e)&&((n=(a=t.data)==null?void 0:a.permissions)==null?void 0:n.includes(e))}function ba(t){if(!Array.isArray(t)||t.some(e=>!Object.hasOwn(Mi,e)))throw Error("Permissão inválida.");return[...new Set(t)]}const Qr={TEAM_TABLE:"competitions",POST_NEWS:"press",EDIT_PRIZES:"finance",STATS_SEARCH:"competitions",MATCH_REPORT:"competitions",ADMIN_PLAYER:"teams",PLAYER:"teams",SETTINGS:"teams",STATS:"competitions",TEAM_STANDINGS:"competitions",TOURN_MANAGER:"competitions",MATCH_MANAGER:"competitions",MATCH_PERFORMANCE:"competitions",AWARDS_MANAGER:"finance",PRIZES:"finance"};function eo(t,e){return!Ta(t)||!e||["VIEW_LINEUP","VIEW_PLAYER"].includes(e.type)?!0:Ye(t,Qr[e.type])}const to={approveTeam:"teams",deleteTeam:"teams",savePlayer:"teams",deletePaper:"press",deleteJournalist:"press",postNews:"press",handleFinanceApprove:"finance",updateBalance:"finance",handleSaveMatch:"competitions",handleDeleteMatch:"competitions",generateFixtures:"competitions",saveMatchStats:"competitions",updateTeamStats:"competitions",handleSocialDelete:"press"};function ao(t,e,a=n=>alert(n)){return Ta(e)?Object.fromEntries(Object.entries(t).map(([n,i])=>[n,(...r)=>{if(!Ye(e,to[n])){a("Você não tem permissão para esta função.");return}return i(...r)}])):t}const no={apiKey:"AIzaSyBrtJFfWAqT0AZYHlm4it-noB5h9jIPJEI",authDomain:"gerenciador-de-times-matoreal.firebaseapp.com",projectId:"gerenciador-de-times-matoreal",storageBucket:"gerenciador-de-times-matoreal.firebasestorage.app",messagingSenderId:"29096266740",appId:"1:29096266740:web:ec48e7225c18c20dbc07a1"};Z.apps.length||Z.initializeApp(no);const h=Z.firestore();h.enablePersistence({synchronizeTabs:!0}).catch(t=>{["failed-precondition","unimplemented"].includes(t.code)||console.warn("Cache indisponível:",t.code)});function pn(t,e){var a={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(a[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(t);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(t,n[i])&&(a[n[i]]=t[n[i]]);return a}const Nt={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",TWITTER:"twitter.com"},ht={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
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
 */function io(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registed for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend."}}function ji(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const so=io,ro=ji,Fi=new hn("auth","Firebase",ji());/**
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
 */const ma=new Mr("@firebase/auth");function oo(t,...e){ma.logLevel<=Oi.WARN&&ma.warn(`Auth (${qt}): ${t}`,...e)}function la(t,...e){ma.logLevel<=Oi.ERROR&&ma.error(`Auth (${qt}): ${t}`,...e)}/**
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
 */function Oe(t,...e){throw mn(t,...e)}function Re(t,...e){return mn(t,...e)}function Vi(t,e,a){const n=Object.assign(Object.assign({},ro()),{[e]:a});return new hn("auth","Firebase",n).create(e,{appName:t.name})}function bt(t,e,a){const n=a;if(!(e instanceof n))throw n.name!==e.constructor.name&&Oe(t,"argument-error"),Vi(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function mn(t,...e){if(typeof t!="string"){const a=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=t.name),t._errorFactory.create(a,...n)}return Fi.create(t,...e)}function V(t,e,...a){if(!t)throw mn(e,...a)}function Ue(t){const e="INTERNAL ASSERTION FAILED: "+t;throw la(e),new Error(e)}function De(t,e){t||Ue(e)}/**
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
 */function Ut(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function fn(){return ii()==="http:"||ii()==="https:"}function ii(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function lo(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(fn()||Ri()||"connection"in navigator)?navigator.onLine:!0}function co(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Yt{constructor(e,a){this.shortDelay=e,this.longDelay=a,De(a>e,"Short delay should be less than long delay!"),this.isMobile=Fr()||un()}get(){return lo()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function gn(t,e){De(t.emulator,"Emulator should always be set here");const{url:a}=t.emulator;return e?`${a}${e.startsWith("/")?e.slice(1):e}`:a}/**
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
 */class Ui{static initialize(e,a,n){this.fetchImpl=e,a&&(this.headersImpl=a),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Ue("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Ue("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Ue("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const uo={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const ho=new Yt(3e4,6e4);function Se(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Te(t,e,a,n,i={}){return Gi(t,i,async()=>{let r={},o={};n&&(e==="GET"?o=n:r={body:JSON.stringify(n)});const d=Tt(Object.assign({key:t.config.apiKey},o)).slice(1),p=await t._getAdditionalHeaders();return p["Content-Type"]="application/json",t.languageCode&&(p["X-Firebase-Locale"]=t.languageCode),Ui.fetch()($i(t,t.config.apiHost,a,d),Object.assign({method:e,headers:p,referrerPolicy:"no-referrer"},r))})}async function Gi(t,e,a){t._canInitEmulator=!1;const n=Object.assign(Object.assign({},uo),e);try{const i=new po(t),r=await Promise.race([a(),i.promise]);i.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Dt(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const d=r.ok?o.errorMessage:o.error.message,[p,m]=d.split(" : ");if(p==="FEDERATED_USER_ID_ALREADY_LINKED")throw Dt(t,"credential-already-in-use",o);if(p==="EMAIL_EXISTS")throw Dt(t,"email-already-in-use",o);if(p==="USER_DISABLED")throw Dt(t,"user-disabled",o);const E=n[p]||p.toLowerCase().replace(/[_\s]+/g,"-");if(m)throw Vi(t,E,m);Oe(t,E)}}catch(i){if(i instanceof Je)throw i;Oe(t,"network-request-failed",{message:String(i)})}}async function We(t,e,a,n,i={}){const r=await Te(t,e,a,n,i);return"mfaPendingCredential"in r&&Oe(t,"multi-factor-auth-required",{_serverResponse:r}),r}function $i(t,e,a,n){const i=`${e}${a}?${n}`;return t.config.emulator?gn(t.config,i):`${t.config.apiScheme}://${i}`}class po{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((a,n)=>{this.timer=setTimeout(()=>n(Re(this.auth,"network-request-failed")),ho.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Dt(t,e,a){const n={appName:t.name};a.email&&(n.email=a.email),a.phoneNumber&&(n.phoneNumber=a.phoneNumber);const i=Re(t,e,n);return i.customData._tokenResponse=a,i}/**
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
 */async function mo(t,e){return Te(t,"POST","/v1/accounts:delete",e)}async function fo(t,e){return Te(t,"POST","/v1/accounts:update",e)}async function go(t,e){return Te(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Mt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ao(t,e=!1){const a=me(t),n=await a.getIdToken(e),i=Ca(n);V(i&&i.exp&&i.auth_time&&i.iat,a.auth,"internal-error");const r=typeof i.firebase=="object"?i.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:i,token:n,authTime:Mt(Fa(i.auth_time)),issuedAtTime:Mt(Fa(i.iat)),expirationTime:Mt(Fa(i.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Fa(t){return Number(t)*1e3}function Ca(t){const[e,a,n]=t.split(".");if(e===void 0||a===void 0||n===void 0)return la("JWT malformed, contained fewer than 3 sections"),null;try{const i=Ur(a);return i?JSON.parse(i):(la("Failed to decode base64 JWT payload"),null)}catch(i){return la("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Eo(t){const e=Ca(t);return V(e,"internal-error"),V(typeof e.exp<"u","internal-error"),V(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ze(t,e,a=!1){if(a)return e;try{return await e}catch(n){throw n instanceof Je&&yo(n)&&t.auth.currentUser===t&&await t.auth.signOut(),n}}function yo({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class vo{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var a;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=((a=this.user.stsTokenManager.expirationTime)!==null&&a!==void 0?a:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const a=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},a)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Hi{constructor(e,a){this.createdAt=e,this.lastLoginAt=a,this._initializeTime()}_initializeTime(){this.lastSignInTime=Mt(this.lastLoginAt),this.creationTime=Mt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Gt(t){var e;const a=t.auth,n=await t.getIdToken(),i=await ze(t,go(a,{idToken:n}));V(i==null?void 0:i.users.length,a,"internal-error");const r=i.users[0];t._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?To(r.providerUserInfo):[],d=So(t.providerData,o),p=t.isAnonymous,m=!(t.email&&r.passwordHash)&&!(d!=null&&d.length),E=p?m:!1,T={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:d,metadata:new Hi(r.createdAt,r.lastLoginAt),isAnonymous:E};Object.assign(t,T)}async function Io(t){const e=me(t);await Gt(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function So(t,e){return[...t.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function To(t){return t.map(e=>{var{providerId:a}=e,n=pn(e,["providerId"]);return{providerId:a,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
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
 */async function bo(t,e){const a=await Gi(t,{},async()=>{const n=Tt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:r}=t.config,o=$i(t,i,"/v1/token",`key=${r}`),d=await t._getAdditionalHeaders();return d["Content-Type"]="application/x-www-form-urlencoded",Ui.fetch()(o,{method:"POST",headers:d,body:n})});return{accessToken:a.access_token,expiresIn:a.expires_in,refreshToken:a.refresh_token}}/**
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
 */class $t{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){V(e.idToken,"internal-error"),V(typeof e.idToken<"u","internal-error"),V(typeof e.refreshToken<"u","internal-error");const a="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Eo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,a)}async getToken(e,a=!1){return V(!this.accessToken||this.refreshToken,e,"user-token-expired"),!a&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,a){const{accessToken:n,refreshToken:i,expiresIn:r}=await bo(e,a);this.updateTokensAndExpiration(n,i,Number(r))}updateTokensAndExpiration(e,a,n){this.refreshToken=a||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,a){const{refreshToken:n,accessToken:i,expirationTime:r}=a,o=new $t;return n&&(V(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),i&&(V(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),r&&(V(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new $t,this.toJSON())}_performRefresh(){return Ue("not implemented")}}/**
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
 */function Ke(t,e){V(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class nt{constructor(e){var{uid:a,auth:n,stsTokenManager:i}=e,r=pn(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vo(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=a,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Hi(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const a=await ze(this,this.stsTokenManager.getToken(this.auth,e));return V(a,this.auth,"internal-error"),this.accessToken!==a&&(this.accessToken=a,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),a}getIdTokenResult(e){return Ao(this,e)}reload(){return Io(this)}_assign(e){this!==e&&(V(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(a=>Object.assign({},a)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const a=new nt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return a.metadata._copy(this.metadata),a}_onReload(e){V(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,a=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),a&&await Gt(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await ze(this,mo(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,a){var n,i,r,o,d,p,m,E;const T=(n=a.displayName)!==null&&n!==void 0?n:void 0,u=(i=a.email)!==null&&i!==void 0?i:void 0,U=(r=a.phoneNumber)!==null&&r!==void 0?r:void 0,B=(o=a.photoURL)!==null&&o!==void 0?o:void 0,F=(d=a.tenantId)!==null&&d!==void 0?d:void 0,Q=(p=a._redirectEventId)!==null&&p!==void 0?p:void 0,ee=(m=a.createdAt)!==null&&m!==void 0?m:void 0,te=(E=a.lastLoginAt)!==null&&E!==void 0?E:void 0,{uid:P,emailVerified:k,isAnonymous:R,providerData:A,stsTokenManager:b}=a;V(P&&b,e,"internal-error");const g=$t.fromJSON(this.name,b);V(typeof P=="string",e,"internal-error"),Ke(T,e.name),Ke(u,e.name),V(typeof k=="boolean",e,"internal-error"),V(typeof R=="boolean",e,"internal-error"),Ke(U,e.name),Ke(B,e.name),Ke(F,e.name),Ke(Q,e.name),Ke(ee,e.name),Ke(te,e.name);const O=new nt({uid:P,auth:e,email:u,emailVerified:k,displayName:T,isAnonymous:R,photoURL:B,phoneNumber:U,tenantId:F,stsTokenManager:g,createdAt:ee,lastLoginAt:te});return A&&Array.isArray(A)&&(O.providerData=A.map(w=>Object.assign({},w))),Q&&(O._redirectEventId=Q),O}static async _fromIdTokenResponse(e,a,n=!1){const i=new $t;i.updateFromServerResponse(a);const r=new nt({uid:a.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await Gt(r),r}}/**
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
 */const si=new Map;function xe(t){De(t instanceof Function,"Expected a class definition");let e=si.get(t);return e?(De(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,si.set(t,e),e)}/**
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
 */class Bi{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,a){this.storage[e]=a}async _get(e){const a=this.storage[e];return a===void 0?null:a}async _remove(e){delete this.storage[e]}_addListener(e,a){}_removeListener(e,a){}}Bi.type="NONE";const vt=Bi;/**
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
 */function it(t,e,a){return`firebase:${t}:${e}:${a}`}class ft{constructor(e,a,n){this.persistence=e,this.auth=a,this.userKey=n;const{config:i,name:r}=this.auth;this.fullUserKey=it(this.userKey,i.apiKey,r),this.fullPersistenceKey=it("persistence",i.apiKey,r),this.boundEventHandler=a._onStorageEvent.bind(a),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?nt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const a=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,a)return this.setCurrentUser(a)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,a,n="authUser"){if(!a.length)return new ft(xe(vt),e,n);const i=(await Promise.all(a.map(async m=>{if(await m._isAvailable())return m}))).filter(m=>m);let r=i[0]||xe(vt);const o=it(n,e.config.apiKey,e.name);let d=null;for(const m of a)try{const E=await m._get(o);if(E){const T=nt._fromJSON(e,E);m!==r&&(d=T),r=m;break}}catch{}const p=i.filter(m=>m._shouldAllowMigration);return!r._shouldAllowMigration||!p.length?new ft(r,e,n):(r=p[0],d&&await r._set(o,d.toJSON()),await Promise.all(a.map(async m=>{if(m!==r)try{await m._remove(o)}catch{}})),new ft(r,e,n))}}/**
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
 */function ri(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(qi(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(zi(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ki(e))return"Blackberry";if(Yi(e))return"Webos";if(An(e))return"Safari";if((e.includes("chrome/")||Wi(e))&&!e.includes("edge/"))return"Chrome";if(Zt(e))return"Android";{const a=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=t.match(a);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function zi(t=be()){return/firefox\//i.test(t)}function An(t=be()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Wi(t=be()){return/crios\//i.test(t)}function qi(t=be()){return/iemobile/i.test(t)}function Zt(t=be()){return/android/i.test(t)}function Ki(t=be()){return/blackberry/i.test(t)}function Yi(t=be()){return/webos/i.test(t)}function Ct(t=be()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Co(t=be()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(t)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(t)}function Ro(t=be()){var e;return Ct(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Oo(){return _i()&&document.documentMode===10}function Zi(t=be()){return Ct(t)||Zt(t)||Yi(t)||Ki(t)||/windows phone/i.test(t)||qi(t)}function _o(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function Ji(t,e=[]){let a;switch(t){case"Browser":a=ri(be());break;case"Worker":a=`${ri(be())}-${t}`;break;default:a=t}const n=e.length?e.join(","):"FirebaseCore-web";return`${a}/JsCore/${qt}/${n}`}/**
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
 */async function wo(t){return(await Te(t,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Xi(t,e){return Te(t,"GET","/v2/recaptchaConfig",Se(t,e))}/**
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
 */function oi(t){return t!==void 0&&t.getResponse!==void 0}function li(t){return t!==void 0&&t.enterprise!==void 0}class Qi{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(a=>a.provider==="EMAIL_PASSWORD_PROVIDER"&&a.enforcementState!=="OFF")}}/**
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
 */function No(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function En(t){return new Promise((e,a)=>{const n=document.createElement("script");n.setAttribute("src",t),n.onload=e,n.onerror=i=>{const r=Re("internal-error");r.customData=i,a(r)},n.type="text/javascript",n.charset="UTF-8",No().appendChild(n)})}function es(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const Po="https://www.google.com/recaptcha/enterprise.js?render=",xo="recaptcha-enterprise",Lo="NO_RECAPTCHA";class ts{constructor(e){this.type=xo,this.auth=ye(e)}async verify(e="verify",a=!1){async function n(r){if(!a){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,d)=>{Xi(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(p=>{if(p.recaptchaKey===void 0)d(new Error("recaptcha Enterprise site key undefined"));else{const m=new Qi(p);return r.tenantId==null?r._agentRecaptchaConfig=m:r._tenantRecaptchaConfigs[r.tenantId]=m,o(m.siteKey)}}).catch(p=>{d(p)})})}function i(r,o,d){const p=window.grecaptcha;li(p)?p.enterprise.ready(()=>{p.enterprise.execute(r,{action:e}).then(m=>{o(m)}).catch(()=>{o(Lo)})}):d(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,o)=>{n(this.auth).then(d=>{if(!a&&li(window.grecaptcha))i(d,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}En(Po+d).then(()=>{i(d,r,o)}).catch(p=>{o(p)})}}).catch(d=>{o(d)})})}}async function Xe(t,e,a,n=!1){const i=new ts(t);let r;try{r=await i.verify(a)}catch{r=await i.verify(a,!0)}const o=Object.assign({},e);return n?Object.assign(o,{captchaResp:r}):Object.assign(o,{captchaResponse:r}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}/**
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
 */class ko{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,a){const n=r=>new Promise((o,d)=>{try{const p=e(r);o(p)}catch(p){d(p)}});n.onAbort=a,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const a=[];try{for(const n of this.queue)await n(e),n.onAbort&&a.push(n.onAbort)}catch(n){a.reverse();for(const i of a)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
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
 */class Do{constructor(e,a,n,i){this.app=e,this.heartbeatServiceProvider=a,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ci(this),this.idTokenSubscription=new ci(this),this.beforeStateQueue=new ko(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Fi,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,a){return a&&(this._popupRedirectResolver=xe(a)),this._initializationPromise=this.queue(async()=>{var n,i;if(!this._deleted&&(this.persistenceManager=await ft.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(a),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var a;const n=await this.assertedPersistence.getCurrentUser();let i=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(a=this.redirectUser)===null||a===void 0?void 0:a._redirectEventId,d=i==null?void 0:i._redirectEventId,p=await this.tryRedirectSignIn(e);(!o||o===d)&&(p!=null&&p.user)&&(i=p.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return V(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let a=null;try{a=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return a}async reloadAndSetCurrentUserOrClear(e){try{await Gt(e)}catch(a){if((a==null?void 0:a.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=co()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const a=e?me(e):null;return a&&V(a.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(a&&a._clone(this))}async _updateCurrentUser(e,a=!1){if(!this._deleted)return e&&V(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),a||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(xe(e))})}async initializeRecaptchaConfig(){const e=await Xi(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),a=new Qi(e);this.tenantId==null?this._agentRecaptchaConfig=a:this._tenantRecaptchaConfigs[this.tenantId]=a,a.emailPasswordEnabled&&new ts(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new hn("auth","Firebase",e())}onAuthStateChanged(e,a,n){return this.registerStateListener(this.authStateSubscription,e,a,n)}beforeAuthStateChanged(e,a){return this.beforeStateQueue.pushCallback(e,a)}onIdTokenChanged(e,a,n){return this.registerStateListener(this.idTokenSubscription,e,a,n)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,a){const n=await this.getOrInitRedirectPersistenceManager(a);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const a=e&&xe(e)||this._popupRedirectResolver;V(a,this,"argument-error"),this.redirectPersistenceManager=await ft.create(this,[xe(a._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var a,n;return this._isInitialized&&await this.queue(async()=>{}),((a=this._currentUser)===null||a===void 0?void 0:a._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,a;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(a=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&a!==void 0?a:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,a,n,i){if(this._deleted)return()=>{};const r=typeof a=="function"?a:a.next.bind(a),o=this._isInitialized?Promise.resolve():this._initializationPromise;return V(o,this,"internal-error"),o.then(()=>r(this.currentUser)),typeof a=="function"?e.addObserver(a,n,i):e.addObserver(a)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return V(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ji(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const a={"X-Client-Version":this.clientVersion};this.app.options.appId&&(a["X-Firebase-gmpid"]=this.app.options.appId);const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(a["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(a["X-Firebase-AppCheck"]=i),a}async _getAppCheckToken(){var e;const a=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return a!=null&&a.error&&oo(`Error while retrieving App Check token: ${a.error}`),a==null?void 0:a.token}}function ye(t){return me(t)}class ci{constructor(e){this.auth=e,this.observer=null,this.addObserver=Vr(a=>this.observer=a)}get next(){return V(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function Mo(t,e){const a=(e==null?void 0:e.persistence)||[],n=(Array.isArray(a)?a:[a]).map(xe);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function jo(t,e,a){const n=ye(t);V(n._canInitEmulator,n,"emulator-config-failed"),V(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const i=!!(a!=null&&a.disableWarnings),r=as(e),{host:o,port:d}=Fo(e),p=d===null?"":`:${d}`;n.config.emulator={url:`${r}//${o}${p}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:o,port:d,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Vo()}function as(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Fo(t){const e=as(t),a=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!a)return{host:"",port:null};const n=a[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){const r=i[1];return{host:r,port:di(n.substr(r.length+1))}}else{const[r,o]=n.split(":");return{host:r,port:di(o)}}}function di(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Vo(){function t(){const e=document.createElement("p"),a=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",a.position="fixed",a.width="100%",a.backgroundColor="#ffffff",a.border=".1em solid #000000",a.color="#b50000",a.bottom="0px",a.left="0px",a.margin="0px",a.zIndex="10000",a.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Rt{constructor(e,a){this.providerId=e,this.signInMethod=a}toJSON(){return Ue("not implemented")}_getIdTokenResponse(e){return Ue("not implemented")}_linkToIdToken(e,a){return Ue("not implemented")}_getReauthenticationResolver(e){return Ue("not implemented")}}/**
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
 */async function ns(t,e){return Te(t,"POST","/v1/accounts:resetPassword",Se(t,e))}async function is(t,e){return Te(t,"POST","/v1/accounts:update",e)}async function Uo(t,e){return Te(t,"POST","/v1/accounts:update",Se(t,e))}/**
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
 */async function Va(t,e){return We(t,"POST","/v1/accounts:signInWithPassword",Se(t,e))}async function Ra(t,e){return Te(t,"POST","/v1/accounts:sendOobCode",Se(t,e))}async function Go(t,e){return Ra(t,e)}async function Ua(t,e){return Ra(t,e)}async function Ga(t,e){return Ra(t,e)}async function $o(t,e){return Ra(t,e)}/**
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
 */async function Ho(t,e){return We(t,"POST","/v1/accounts:signInWithEmailLink",Se(t,e))}async function Bo(t,e){return We(t,"POST","/v1/accounts:signInWithEmailLink",Se(t,e))}/**
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
 */class Ht extends Rt{constructor(e,a,n,i=null){super("password",n),this._email=e,this._password=a,this._tenantId=i}static _fromEmailAndPassword(e,a){return new Ht(e,a,"password")}static _fromEmailAndCode(e,a,n=null){return new Ht(e,a,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const a=typeof e=="string"?JSON.parse(e):e;if(a!=null&&a.email&&(a!=null&&a.password)){if(a.signInMethod==="password")return this._fromEmailAndPassword(a.email,a.password);if(a.signInMethod==="emailLink")return this._fromEmailAndCode(a.email,a.password,a.tenantId)}return null}async _getIdTokenResponse(e){var a;switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((a=e._getRecaptchaConfig())===null||a===void 0)&&a.emailPasswordEnabled){const i=await Xe(e,n,"signInWithPassword");return Va(e,i)}else return Va(e,n).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const r=await Xe(e,n,"signInWithPassword");return Va(e,r)}else return Promise.reject(i)});case"emailLink":return Ho(e,{email:this._email,oobCode:this._password});default:Oe(e,"internal-error")}}async _linkToIdToken(e,a){switch(this.signInMethod){case"password":return is(e,{idToken:a,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Bo(e,{idToken:a,email:this._email,oobCode:this._password});default:Oe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Be(t,e){return We(t,"POST","/v1/accounts:signInWithIdp",Se(t,e))}/**
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
 */const zo="http://localhost";class Ge extends Rt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const a=new Ge(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(a.idToken=e.idToken),e.accessToken&&(a.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(a.nonce=e.nonce),e.pendingToken&&(a.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(a.accessToken=e.oauthToken,a.secret=e.oauthTokenSecret):Oe("argument-error"),a}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const a=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i}=a,r=pn(a,["providerId","signInMethod"]);if(!n||!i)return null;const o=new Ge(n,i);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const a=this.buildRequest();return Be(e,a)}_linkToIdToken(e,a){const n=this.buildRequest();return n.idToken=a,Be(e,n)}_getReauthenticationResolver(e){const a=this.buildRequest();return a.autoCreate=!1,Be(e,a)}buildRequest(){const e={requestUri:zo,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const a={};this.idToken&&(a.id_token=this.idToken),this.accessToken&&(a.access_token=this.accessToken),this.secret&&(a.oauth_token_secret=this.secret),a.providerId=this.providerId,this.nonce&&!this.pendingToken&&(a.nonce=this.nonce),e.postBody=Tt(a)}return e}}/**
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
 */async function Wo(t,e){return Te(t,"POST","/v1/accounts:sendVerificationCode",Se(t,e))}async function qo(t,e){return We(t,"POST","/v1/accounts:signInWithPhoneNumber",Se(t,e))}async function Ko(t,e){const a=await We(t,"POST","/v1/accounts:signInWithPhoneNumber",Se(t,e));if(a.temporaryProof)throw Dt(t,"account-exists-with-different-credential",a);return a}const Yo={USER_NOT_FOUND:"user-not-found"};async function Zo(t,e){const a=Object.assign(Object.assign({},e),{operation:"REAUTH"});return We(t,"POST","/v1/accounts:signInWithPhoneNumber",Se(t,a),Yo)}/**
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
 */class st extends Rt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,a){return new st({verificationId:e,verificationCode:a})}static _fromTokenResponse(e,a){return new st({phoneNumber:e,temporaryProof:a})}_getIdTokenResponse(e){return qo(e,this._makeVerificationRequest())}_linkToIdToken(e,a){return Ko(e,Object.assign({idToken:a},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Zo(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:a,verificationId:n,verificationCode:i}=this.params;return e&&a?{temporaryProof:e,phoneNumber:a}:{sessionInfo:n,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:a,verificationCode:n,phoneNumber:i,temporaryProof:r}=e;return!n&&!a&&!i&&!r?null:new st({verificationId:a,verificationCode:n,phoneNumber:i,temporaryProof:r})}}/**
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
 */function Jo(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Xo(t){const e=mt(Lt(t)).link,a=e?mt(Lt(e)).deep_link_id:null,n=mt(Lt(t)).deep_link_id;return(n?mt(Lt(n)).link:null)||n||a||e||t}class Oa{constructor(e){var a,n,i,r,o,d;const p=mt(Lt(e)),m=(a=p.apiKey)!==null&&a!==void 0?a:null,E=(n=p.oobCode)!==null&&n!==void 0?n:null,T=Jo((i=p.mode)!==null&&i!==void 0?i:null);V(m&&E&&T,"argument-error"),this.apiKey=m,this.operation=T,this.code=E,this.continueUrl=(r=p.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=p.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(d=p.tenantId)!==null&&d!==void 0?d:null}static parseLink(e){const a=Xo(e);try{return new Oa(a)}catch{return null}}}/**
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
 */class Qe{constructor(){this.providerId=Qe.PROVIDER_ID}static credential(e,a){return Ht._fromEmailAndPassword(e,a)}static credentialWithLink(e,a){const n=Oa.parseLink(a);return V(n,"argument-error"),Ht._fromEmailAndCode(e,n.code,n.tenantId)}}Qe.PROVIDER_ID="password";Qe.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Qe.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Ot extends qe{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class gt extends Ot{static credentialFromJSON(e){const a=typeof e=="string"?JSON.parse(e):e;return V("providerId"in a&&"signInMethod"in a,"argument-error"),Ge._fromParams(a)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return V(e.idToken||e.accessToken,"argument-error"),Ge._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return gt.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return gt.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:a,oauthAccessToken:n,oauthTokenSecret:i,pendingToken:r,nonce:o,providerId:d}=e;if(!n&&!i&&!a&&!r||!d)return null;try{return new gt(d)._credential({idToken:a,accessToken:n,nonce:o,pendingToken:r})}catch{return null}}}/**
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
 */class Me extends Ot{constructor(){super("facebook.com")}static credential(e){return Ge._fromParams({providerId:Me.PROVIDER_ID,signInMethod:Me.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Me.credentialFromTaggedObject(e)}static credentialFromError(e){return Me.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Me.credential(e.oauthAccessToken)}catch{return null}}}Me.FACEBOOK_SIGN_IN_METHOD="facebook.com";Me.PROVIDER_ID="facebook.com";/**
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
 */class je extends Ot{constructor(){super("google.com"),this.addScope("profile")}static credential(e,a){return Ge._fromParams({providerId:je.PROVIDER_ID,signInMethod:je.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:a})}static credentialFromResult(e){return je.credentialFromTaggedObject(e)}static credentialFromError(e){return je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:a,oauthAccessToken:n}=e;if(!a&&!n)return null;try{return je.credential(a,n)}catch{return null}}}je.GOOGLE_SIGN_IN_METHOD="google.com";je.PROVIDER_ID="google.com";/**
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
 */class Fe extends Ot{constructor(){super("github.com")}static credential(e){return Ge._fromParams({providerId:Fe.PROVIDER_ID,signInMethod:Fe.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Fe.credentialFromTaggedObject(e)}static credentialFromError(e){return Fe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Fe.credential(e.oauthAccessToken)}catch{return null}}}Fe.GITHUB_SIGN_IN_METHOD="github.com";Fe.PROVIDER_ID="github.com";/**
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
 */const Qo="http://localhost";class It extends Rt{constructor(e,a){super(e,e),this.pendingToken=a}_getIdTokenResponse(e){const a=this.buildRequest();return Be(e,a)}_linkToIdToken(e,a){const n=this.buildRequest();return n.idToken=a,Be(e,n)}_getReauthenticationResolver(e){const a=this.buildRequest();return a.autoCreate=!1,Be(e,a)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const a=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i,pendingToken:r}=a;return!n||!i||!r||n!==i?null:new It(n,r)}static _create(e,a){return new It(e,a)}buildRequest(){return{requestUri:Qo,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
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
 */const el="saml.";class fa extends qe{constructor(e){V(e.startsWith(el),"argument-error"),super(e)}static credentialFromResult(e){return fa.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return fa.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const a=It.fromJSON(e);return V(a,"argument-error"),a}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:a,providerId:n}=e;if(!a||!n)return null;try{return It._create(n,a)}catch{return null}}}/**
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
 */class Ve extends Ot{constructor(){super("twitter.com")}static credential(e,a){return Ge._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:a})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:a,oauthTokenSecret:n}=e;if(!a||!n)return null;try{return Ve.credential(a,n)}catch{return null}}}Ve.TWITTER_SIGN_IN_METHOD="twitter.com";Ve.PROVIDER_ID="twitter.com";/**
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
 */async function ca(t,e){return We(t,"POST","/v1/accounts:signUp",Se(t,e))}/**
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
 */class ke{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,a,n,i=!1){const r=await nt._fromIdTokenResponse(e,n,i),o=ui(n);return new ke({user:r,providerId:o,_tokenResponse:n,operationType:a})}static async _forOperation(e,a,n){await e._updateTokensIfNecessary(n,!0);const i=ui(n);return new ke({user:e,providerId:i,_tokenResponse:n,operationType:a})}}function ui(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function tl(t){var e;const a=ye(t);if(await a._initializationPromise,!((e=a.currentUser)===null||e===void 0)&&e.isAnonymous)return new ke({user:a.currentUser,providerId:null,operationType:"signIn"});const n=await ca(a,{returnSecureToken:!0}),i=await ke._fromIdTokenResponse(a,"signIn",n,!0);return await a._updateCurrentUser(i.user),i}/**
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
 */class ga extends Je{constructor(e,a,n,i){var r;super(a.code,a.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,ga.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:a.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,a,n,i){return new ga(e,a,n,i)}}function ss(t,e,a,n){return(e==="reauthenticate"?a._getReauthenticationResolver(t):a._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?ga._fromErrorAndOperation(t,r,e,n):r})}/**
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
 */function rs(t){return new Set(t.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function al(t,e){const a=me(t);await _a(!0,a,e);const{providerUserInfo:n}=await fo(a.auth,{idToken:await a.getIdToken(),deleteProvider:[e]}),i=rs(n||[]);return a.providerData=a.providerData.filter(r=>i.has(r.providerId)),i.has("phone")||(a.phoneNumber=null),await a.auth._persistUserIfCurrent(a),a}async function yn(t,e,a=!1){const n=await ze(t,e._linkToIdToken(t.auth,await t.getIdToken()),a);return ke._forOperation(t,"link",n)}async function _a(t,e,a){await Gt(e);const n=rs(e.providerData),i=t===!1?"provider-already-linked":"no-such-provider";V(n.has(a)===t,e.auth,i)}/**
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
 */async function os(t,e,a=!1){const{auth:n}=t,i="reauthenticate";try{const r=await ze(t,ss(n,i,e,t),a);V(r.idToken,n,"internal-error");const o=Ca(r.idToken);V(o,n,"internal-error");const{sub:d}=o;return V(t.uid===d,n,"user-mismatch"),ke._forOperation(t,i,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Oe(n,"user-mismatch"),r}}/**
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
 */async function ls(t,e,a=!1){const n="signIn",i=await ss(t,n,e),r=await ke._fromIdTokenResponse(t,n,i);return a||await t._updateCurrentUser(r.user),r}async function wa(t,e){return ls(ye(t),e)}async function cs(t,e){const a=me(t);return await _a(!1,a,e.providerId),yn(a,e)}async function ds(t,e){return os(me(t),e)}/**
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
 */async function nl(t,e){return We(t,"POST","/v1/accounts:signInWithCustomToken",Se(t,e))}/**
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
 */async function il(t,e){const a=ye(t),n=await nl(a,{token:e,returnSecureToken:!0}),i=await ke._fromIdTokenResponse(a,"signIn",n);return await a._updateCurrentUser(i.user),i}/**
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
 */class Jt{constructor(e,a){this.factorId=e,this.uid=a.mfaEnrollmentId,this.enrollmentTime=new Date(a.enrolledAt).toUTCString(),this.displayName=a.displayName}static _fromServerResponse(e,a){return"phoneInfo"in a?vn._fromServerResponse(e,a):"totpInfo"in a?In._fromServerResponse(e,a):Oe(e,"internal-error")}}class vn extends Jt{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,a){return new vn(a)}}class In extends Jt{constructor(e){super("totp",e)}static _fromServerResponse(e,a){return new In(a)}}/**
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
 */function At(t,e,a){var n;V(((n=a.url)===null||n===void 0?void 0:n.length)>0,t,"invalid-continue-uri"),V(typeof a.dynamicLinkDomain>"u"||a.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),e.continueUrl=a.url,e.dynamicLinkDomain=a.dynamicLinkDomain,e.canHandleCodeInApp=a.handleCodeInApp,a.iOS&&(V(a.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=a.iOS.bundleId),a.android&&(V(a.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=a.android.installApp,e.androidMinimumVersionCode=a.android.minimumVersion,e.androidPackageName=a.android.packageName)}/**
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
 */async function sl(t,e,a){var n;const i=ye(t),r={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};if(!((n=i._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const o=await Xe(i,r,"getOobCode",!0);a&&At(i,o,a),await Ua(i,o)}else a&&At(i,r,a),await Ua(i,r).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log("Password resets are protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the password reset flow.");const d=await Xe(i,r,"getOobCode",!0);a&&At(i,d,a),await Ua(i,d)}else return Promise.reject(o)})}async function rl(t,e,a){await ns(me(t),{oobCode:e,newPassword:a})}async function ol(t,e){await Uo(me(t),{oobCode:e})}async function us(t,e){const a=me(t),n=await ns(a,{oobCode:e}),i=n.requestType;switch(V(i,a,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":V(n.newEmail,a,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":V(n.mfaInfo,a,"internal-error");default:V(n.email,a,"internal-error")}let r=null;return n.mfaInfo&&(r=Jt._fromServerResponse(ye(a),n.mfaInfo)),{data:{email:(n.requestType==="VERIFY_AND_CHANGE_EMAIL"?n.newEmail:n.email)||null,previousEmail:(n.requestType==="VERIFY_AND_CHANGE_EMAIL"?n.email:n.newEmail)||null,multiFactorInfo:r},operation:i}}async function ll(t,e){const{data:a}=await us(me(t),e);return a.email}async function cl(t,e,a){var n;const i=ye(t),r={returnSecureToken:!0,email:e,password:a,clientType:"CLIENT_TYPE_WEB"};let o;if(!((n=i._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const m=await Xe(i,r,"signUpPassword");o=ca(i,m)}else o=ca(i,r).catch(async m=>{if(m.code==="auth/missing-recaptcha-token"){console.log("Sign-up is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-up flow.");const E=await Xe(i,r,"signUpPassword");return ca(i,E)}else return Promise.reject(m)});const d=await o.catch(m=>Promise.reject(m)),p=await ke._fromIdTokenResponse(i,"signIn",d);return await i._updateCurrentUser(p.user),p}function dl(t,e,a){return wa(me(t),Qe.credential(e,a))}/**
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
 */async function ul(t,e,a){var n;const i=ye(t),r={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function o(d,p){V(p.handleCodeInApp,i,"argument-error"),p&&At(i,d,p)}if(!((n=i._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const d=await Xe(i,r,"getOobCode",!0);o(d,a),await Ga(i,d)}else o(r,a),await Ga(i,r).catch(async d=>{if(d.code==="auth/missing-recaptcha-token"){console.log("Email link sign-in is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const p=await Xe(i,r,"getOobCode",!0);o(p,a),await Ga(i,p)}else return Promise.reject(d)})}function hl(t,e){const a=Oa.parseLink(e);return(a==null?void 0:a.operation)==="EMAIL_SIGNIN"}async function pl(t,e,a){const n=me(t),i=Qe.credentialWithLink(e,a||Ut());return V(i._tenantId===(n.tenantId||null),n,"tenant-id-mismatch"),wa(n,i)}/**
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
 */async function ml(t,e){return Te(t,"POST","/v1/accounts:createAuthUri",Se(t,e))}/**
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
 */async function fl(t,e){const a=fn()?Ut():"http://localhost",n={identifier:e,continueUri:a},{signinMethods:i}=await ml(me(t),n);return i||[]}async function gl(t,e){const a=me(t),i={requestType:"VERIFY_EMAIL",idToken:await t.getIdToken()};e&&At(a.auth,i,e);const{email:r}=await Go(a.auth,i);r!==t.email&&await t.reload()}async function Al(t,e,a){const n=me(t),r={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await t.getIdToken(),newEmail:e};a&&At(n.auth,r,a);const{email:o}=await $o(n.auth,r);o!==t.email&&await t.reload()}/**
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
 */async function El(t,e){return Te(t,"POST","/v1/accounts:update",e)}/**
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
 */async function yl(t,{displayName:e,photoURL:a}){if(e===void 0&&a===void 0)return;const n=me(t),r={idToken:await n.getIdToken(),displayName:e,photoUrl:a,returnSecureToken:!0},o=await ze(n,El(n.auth,r));n.displayName=o.displayName||null,n.photoURL=o.photoUrl||null;const d=n.providerData.find(({providerId:p})=>p==="password");d&&(d.displayName=n.displayName,d.photoURL=n.photoURL),await n._updateTokensIfNecessary(o)}function vl(t,e){return hs(me(t),e,null)}function Il(t,e){return hs(me(t),null,e)}async function hs(t,e,a){const{auth:n}=t,r={idToken:await t.getIdToken(),returnSecureToken:!0};e&&(r.email=e),a&&(r.password=a);const o=await ze(t,is(n,r));await t._updateTokensIfNecessary(o,!0)}/**
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
 */function Sl(t){var e,a;if(!t)return null;const{providerId:n}=t,i=t.rawUserInfo?JSON.parse(t.rawUserInfo):{},r=t.isNewUser||t.kind==="identitytoolkit#SignupNewUserResponse";if(!n&&(t!=null&&t.idToken)){const o=(a=(e=Ca(t.idToken))===null||e===void 0?void 0:e.firebase)===null||a===void 0?void 0:a.sign_in_provider;if(o){const d=o!=="anonymous"&&o!=="custom"?o:null;return new Et(r,d)}}if(!n)return null;switch(n){case"facebook.com":return new Tl(r,i);case"github.com":return new bl(r,i);case"google.com":return new Cl(r,i);case"twitter.com":return new Rl(r,i,t.screenName||null);case"custom":case"anonymous":return new Et(r,null);default:return new Et(r,n,i)}}class Et{constructor(e,a,n={}){this.isNewUser=e,this.providerId=a,this.profile=n}}class ps extends Et{constructor(e,a,n,i){super(e,a,n),this.username=i}}class Tl extends Et{constructor(e,a){super(e,"facebook.com",a)}}class bl extends ps{constructor(e,a){super(e,"github.com",a,typeof(a==null?void 0:a.login)=="string"?a==null?void 0:a.login:null)}}class Cl extends Et{constructor(e,a){super(e,"google.com",a)}}class Rl extends ps{constructor(e,a,n){super(e,"twitter.com",a,n)}}function Ol(t){const{user:e,_tokenResponse:a}=t;return e.isAnonymous&&!a?{providerId:null,isNewUser:!1,profile:null}:Sl(a)}class at{constructor(e,a,n){this.type=e,this.credential=a,this.auth=n}static _fromIdtoken(e,a){return new at("enroll",e,a)}static _fromMfaPendingCredential(e){return new at("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var a,n;if(e!=null&&e.multiFactorSession){if(!((a=e.multiFactorSession)===null||a===void 0)&&a.pendingCredential)return at._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((n=e.multiFactorSession)===null||n===void 0)&&n.idToken)return at._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
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
 */class Sn{constructor(e,a,n){this.session=e,this.hints=a,this.signInResolver=n}static _fromError(e,a){const n=ye(e),i=a.customData._serverResponse,r=(i.mfaInfo||[]).map(d=>Jt._fromServerResponse(n,d));V(i.mfaPendingCredential,n,"internal-error");const o=at._fromMfaPendingCredential(i.mfaPendingCredential);return new Sn(o,r,async d=>{const p=await d._process(n,o);delete i.mfaInfo,delete i.mfaPendingCredential;const m=Object.assign(Object.assign({},i),{idToken:p.idToken,refreshToken:p.refreshToken});switch(a.operationType){case"signIn":const E=await ke._fromIdTokenResponse(n,a.operationType,m);return await n._updateCurrentUser(E.user),E;case"reauthenticate":return V(a.user,n,"internal-error"),ke._forOperation(a.user,a.operationType,m);default:Oe(n,"internal-error")}})}async resolveSignIn(e){const a=e;return this.signInResolver(a)}}function _l(t,e){var a;const n=me(t),i=e;return V(e.customData.operationType,n,"argument-error"),V((a=i.customData._serverResponse)===null||a===void 0?void 0:a.mfaPendingCredential,n,"argument-error"),Sn._fromError(n,i)}/**
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
 */function wl(t,e){return Te(t,"POST","/v2/accounts/mfaEnrollment:start",Se(t,e))}function Nl(t,e){return Te(t,"POST","/v2/accounts/mfaEnrollment:finalize",Se(t,e))}function Pl(t,e){return Te(t,"POST","/v2/accounts/mfaEnrollment:withdraw",Se(t,e))}class Tn{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(a=>{a.mfaInfo&&(this.enrolledFactors=a.mfaInfo.map(n=>Jt._fromServerResponse(e.auth,n)))})}static _fromUser(e){return new Tn(e)}async getSession(){return at._fromIdtoken(await this.user.getIdToken(),this.user.auth)}async enroll(e,a){const n=e,i=await this.getSession(),r=await ze(this.user,n._process(this.user.auth,i,a));return await this.user._updateTokensIfNecessary(r),this.user.reload()}async unenroll(e){const a=typeof e=="string"?e:e.uid,n=await this.user.getIdToken();try{const i=await ze(this.user,Pl(this.user.auth,{idToken:n,mfaEnrollmentId:a}));this.enrolledFactors=this.enrolledFactors.filter(({uid:r})=>r!==a),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const $a=new WeakMap;function xl(t){const e=me(t);return $a.has(e)||$a.set(e,Tn._fromUser(e)),$a.get(e)}const Aa="__sak";/**
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
 */class ms{constructor(e,a){this.storageRetriever=e,this.type=a}_isAvailable(){try{return this.storage?(this.storage.setItem(Aa,"1"),this.storage.removeItem(Aa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,a){return this.storage.setItem(e,JSON.stringify(a)),Promise.resolve()}_get(e){const a=this.storage.getItem(e);return Promise.resolve(a?JSON.parse(a):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function Ll(){const t=be();return An(t)||Ct(t)}const kl=1e3,Dl=10;class fs extends ms{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,a)=>this.onStorageEvent(e,a),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Ll()&&_o(),this.fallbackToPolling=Zi(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const a of Object.keys(this.listeners)){const n=this.storage.getItem(a),i=this.localCache[a];n!==i&&e(a,i,n)}}onStorageEvent(e,a=!1){if(!e.key){this.forAllChangedKeys((o,d,p)=>{this.notifyListeners(o,p)});return}const n=e.key;if(a?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(n);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(n,e.newValue):this.storage.removeItem(n);else if(this.localCache[n]===e.newValue&&!a)return}const i=()=>{const o=this.storage.getItem(n);!a&&this.localCache[n]===o||this.notifyListeners(n,o)},r=this.storage.getItem(n);Oo()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Dl):i()}notifyListeners(e,a){this.localCache[e]=a;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(a&&JSON.parse(a))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,a,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:a,newValue:n}),!0)})},kl)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,a){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(a)}_removeListener(e,a){this.listeners[e]&&(this.listeners[e].delete(a),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,a){await super._set(e,a),this.localCache[e]=JSON.stringify(a)}async _get(e){const a=await super._get(e);return this.localCache[e]=JSON.stringify(a),a}async _remove(e){await super._remove(e),delete this.localCache[e]}}fs.type="LOCAL";const bn=fs;/**
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
 */class gs extends ms{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,a){}_removeListener(e,a){}}gs.type="SESSION";const ot=gs;/**
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
 */function Ml(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(a){return{fulfilled:!1,reason:a}}}))}/**
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
 */class Na{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const a=this.receivers.find(i=>i.isListeningto(e));if(a)return a;const n=new Na(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const a=e,{eventId:n,eventType:i,data:r}=a.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;a.ports[0].postMessage({status:"ack",eventId:n,eventType:i});const d=Array.from(o).map(async m=>m(a.origin,r)),p=await Ml(d);a.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:p})}_subscribe(e,a){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(a)}_unsubscribe(e,a){this.handlersMap[e]&&a&&this.handlersMap[e].delete(a),(!a||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Na.receivers=[];/**
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
 */function Xt(t="",e=10){let a="";for(let n=0;n<e;n++)a+=Math.floor(Math.random()*10);return t+a}/**
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
 */class jl{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,a,n=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let r,o;return new Promise((d,p)=>{const m=Xt("",20);i.port1.start();const E=setTimeout(()=>{p(new Error("unsupported_event"))},n);o={messageChannel:i,onMessage(T){const u=T;if(u.data.eventId===m)switch(u.data.status){case"ack":clearTimeout(E),r=setTimeout(()=>{p(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),d(u.data.response);break;default:clearTimeout(E),clearTimeout(r),p(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:m,data:a},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Ie(){return window}function Fl(t){Ie().location.href=t}/**
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
 */function Cn(){return typeof Ie().WorkerGlobalScope<"u"&&typeof Ie().importScripts=="function"}async function Vl(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ul(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Gl(){return Cn()?self:null}/**
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
 */const As="firebaseLocalStorageDb",$l=1,Ea="firebaseLocalStorage",Es="fbase_key";class Qt{constructor(e){this.request=e}toPromise(){return new Promise((e,a)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{a(this.request.error)})})}}function Pa(t,e){return t.transaction([Ea],e?"readwrite":"readonly").objectStore(Ea)}function Hl(){const t=indexedDB.deleteDatabase(As);return new Qt(t).toPromise()}function Xa(){const t=indexedDB.open(As,$l);return new Promise((e,a)=>{t.addEventListener("error",()=>{a(t.error)}),t.addEventListener("upgradeneeded",()=>{const n=t.result;try{n.createObjectStore(Ea,{keyPath:Es})}catch(i){a(i)}}),t.addEventListener("success",async()=>{const n=t.result;n.objectStoreNames.contains(Ea)?e(n):(n.close(),await Hl(),e(await Xa()))})})}async function hi(t,e,a){const n=Pa(t,!0).put({[Es]:e,value:a});return new Qt(n).toPromise()}async function Bl(t,e){const a=Pa(t,!1).get(e),n=await new Qt(a).toPromise();return n===void 0?null:n.value}function pi(t,e){const a=Pa(t,!0).delete(e);return new Qt(a).toPromise()}const zl=800,Wl=3;class ys{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Xa(),this.db)}async _withRetries(e){let a=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(a++>Wl)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Cn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Na._getInstance(Gl()),this.receiver._subscribe("keyChanged",async(e,a)=>({keyProcessed:(await this._poll()).includes(a.key)})),this.receiver._subscribe("ping",async(e,a)=>["keyChanged"])}async initializeSender(){var e,a;if(this.activeServiceWorker=await Vl(),!this.activeServiceWorker)return;this.sender=new jl(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((a=n[0])===null||a===void 0)&&a.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ul()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Xa();return await hi(e,Aa,"1"),await pi(e,Aa),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,a){return this._withPendingWrite(async()=>(await this._withRetries(n=>hi(n,e,a)),this.localCache[e]=a,this.notifyServiceWorker(e)))}async _get(e){const a=await this._withRetries(n=>Bl(n,e));return this.localCache[e]=a,a}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(a=>pi(a,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const r=Pa(i,!1).getAll();return new Qt(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const a=[],n=new Set;for(const{fbase_key:i,value:r}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),a.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!n.has(i)&&(this.notifyListeners(i,null),a.push(i));return a}notifyListeners(e,a){this.localCache[e]=a;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(a)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),zl)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,a){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(a)}_removeListener(e,a){this.listeners[e]&&(this.listeners[e].delete(a),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ys.type="LOCAL";const Bt=ys;/**
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
 */function ql(t,e){return Te(t,"POST","/v2/accounts/mfaSignIn:start",Se(t,e))}function Kl(t,e){return Te(t,"POST","/v2/accounts/mfaSignIn:finalize",Se(t,e))}/**
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
 */const Yl=500,Zl=6e4,ia=1e12;class Jl{constructor(e){this.auth=e,this.counter=ia,this._widgets=new Map}render(e,a){const n=this.counter;return this._widgets.set(n,new Xl(e,this.auth.name,a||{})),this.counter++,n}reset(e){var a;const n=e||ia;(a=this._widgets.get(n))===null||a===void 0||a.delete(),this._widgets.delete(n)}getResponse(e){var a;const n=e||ia;return((a=this._widgets.get(n))===null||a===void 0?void 0:a.getResponse())||""}async execute(e){var a;const n=e||ia;return(a=this._widgets.get(n))===null||a===void 0||a.execute(),""}}class Xl{constructor(e,a,n){this.params=n,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;V(i,"argument-error",{appName:a}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=Ql(50);const{callback:e,"expired-callback":a}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,a)try{a()}catch{}this.isVisible&&this.execute()},Zl)},Yl))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function Ql(t){const e=[],a="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<t;n++)e.push(a.charAt(Math.floor(Math.random()*a.length)));return e.join("")}/**
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
 */const Ha=es("rcb"),ec=new Yt(3e4,6e4),tc="https://www.google.com/recaptcha/api.js?";class ac{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=Ie().grecaptcha)===null||e===void 0)&&e.render)}load(e,a=""){return V(nc(a),e,"argument-error"),this.shouldResolveImmediately(a)&&oi(Ie().grecaptcha)?Promise.resolve(Ie().grecaptcha):new Promise((n,i)=>{const r=Ie().setTimeout(()=>{i(Re(e,"network-request-failed"))},ec.get());Ie()[Ha]=()=>{Ie().clearTimeout(r),delete Ie()[Ha];const d=Ie().grecaptcha;if(!d||!oi(d)){i(Re(e,"internal-error"));return}const p=d.render;d.render=(m,E)=>{const T=p(m,E);return this.counter++,T},this.hostLanguage=a,n(d)};const o=`${tc}?${Tt({onload:Ha,render:"explicit",hl:a})}`;En(o).catch(()=>{clearTimeout(r),i(Re(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var a;return!!(!((a=Ie().grecaptcha)===null||a===void 0)&&a.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function nc(t){return t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t)}class ic{async load(e){return new Jl(e)}clearedOneInstance(){}}/**
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
 */const vs="recaptcha",sc={theme:"light",type:"image"};let rc=class{constructor(e,a=Object.assign({},sc),n){this.parameters=a,this.type=vs,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=ye(n),this.isInvisible=this.parameters.size==="invisible",V(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof e=="string"?document.getElementById(e):e;V(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new ic:new ac,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),a=this.getAssertedRecaptcha(),n=a.getResponse(e);return n||new Promise(i=>{const r=o=>{o&&(this.tokenChangeListeners.delete(r),i(o))};this.tokenChangeListeners.add(r),this.isInvisible&&a.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){V(!this.parameters.sitekey,this.auth,"argument-error"),V(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),V(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return a=>{if(this.tokenChangeListeners.forEach(n=>n(a)),typeof e=="function")e(a);else if(typeof e=="string"){const n=Ie()[e];typeof n=="function"&&n(a)}}}assertNotDestroyed(){V(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const a=document.createElement("div");e.appendChild(a),e=a}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){V(fn()&&!Cn(),this.auth,"internal-error"),await oc(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await wo(this.auth);V(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return V(this.recaptcha,this.auth,"internal-error"),this.recaptcha}};function oc(){let t=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}t=()=>e(),window.addEventListener("load",t)}).catch(e=>{throw t&&window.removeEventListener("load",t),e})}/**
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
 */class Rn{constructor(e,a){this.verificationId=e,this.onConfirmation=a}confirm(e){const a=st._fromVerification(this.verificationId,e);return this.onConfirmation(a)}}async function lc(t,e,a){const n=ye(t),i=await xa(n,e,me(a));return new Rn(i,r=>wa(n,r))}async function cc(t,e,a){const n=me(t);await _a(!1,n,"phone");const i=await xa(n.auth,e,me(a));return new Rn(i,r=>cs(n,r))}async function dc(t,e,a){const n=me(t),i=await xa(n.auth,e,me(a));return new Rn(i,r=>ds(n,r))}async function xa(t,e,a){var n;const i=await a.verify();try{V(typeof i=="string",t,"argument-error"),V(a.type===vs,t,"argument-error");let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){const o=r.session;if("phoneNumber"in r)return V(o.type==="enroll",t,"internal-error"),(await wl(t,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{V(o.type==="signin",t,"internal-error");const d=((n=r.multiFactorHint)===null||n===void 0?void 0:n.uid)||r.multiFactorUid;return V(d,t,"missing-multi-factor-info"),(await ql(t,{mfaPendingCredential:o.credential,mfaEnrollmentId:d,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await Wo(t,{phoneNumber:r.phoneNumber,recaptchaToken:i});return o}}finally{a._reset()}}async function uc(t,e){await yn(me(t),e)}/**
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
 */let lt=class da{constructor(e){this.providerId=da.PROVIDER_ID,this.auth=ye(e)}verifyPhoneNumber(e,a){return xa(this.auth,e,me(a))}static credential(e,a){return st._fromVerification(e,a)}static credentialFromResult(e){const a=e;return da.credentialFromTaggedObject(a)}static credentialFromError(e){return da.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:a,temporaryProof:n}=e;return a&&n?st._fromTokenResponse(a,n):null}};lt.PROVIDER_ID="phone";lt.PHONE_SIGN_IN_METHOD="phone";/**
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
 */function dt(t,e){return e?xe(e):(V(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class On extends Rt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Be(e,this._buildIdpRequest())}_linkToIdToken(e,a){return Be(e,this._buildIdpRequest(a))}_getReauthenticationResolver(e){return Be(e,this._buildIdpRequest())}_buildIdpRequest(e){const a={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(a.idToken=e),a}}function hc(t){return ls(t.auth,new On(t),t.bypassAuthState)}function pc(t){const{auth:e,user:a}=t;return V(a,e,"internal-error"),os(a,new On(t),t.bypassAuthState)}async function mc(t){const{auth:e,user:a}=t;return V(a,e,"internal-error"),yn(a,new On(t),t.bypassAuthState)}/**
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
 */class Is{constructor(e,a,n,i,r=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(a)?a:[a]}execute(){return new Promise(async(e,a)=>{this.pendingPromise={resolve:e,reject:a};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:a,sessionId:n,postBody:i,tenantId:r,error:o,type:d}=e;if(o){this.reject(o);return}const p={auth:this.auth,requestUri:a,sessionId:n,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(d)(p))}catch(m){this.reject(m)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hc;case"linkViaPopup":case"linkViaRedirect":return mc;case"reauthViaPopup":case"reauthViaRedirect":return pc;default:Oe(this.auth,"internal-error")}}resolve(e){De(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){De(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const fc=new Yt(2e3,1e4);async function gc(t,e,a){const n=ye(t);bt(t,e,qe);const i=dt(n,a);return new $e(n,"signInViaPopup",e,i).executeNotNull()}async function Ac(t,e,a){const n=me(t);bt(n.auth,e,qe);const i=dt(n.auth,a);return new $e(n.auth,"reauthViaPopup",e,i,n).executeNotNull()}async function Ec(t,e,a){const n=me(t);bt(n.auth,e,qe);const i=dt(n.auth,a);return new $e(n.auth,"linkViaPopup",e,i,n).executeNotNull()}class $e extends Is{constructor(e,a,n,i,r){super(e,a,i,r),this.provider=n,this.authWindow=null,this.pollId=null,$e.currentPopupAction&&$e.currentPopupAction.cancel(),$e.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return V(e,this.auth,"internal-error"),e}async onExecution(){De(this.filter.length===1,"Popup operations only handle one event");const e=Xt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(a=>{this.reject(a)}),this.resolver._isIframeWebStorageSupported(this.auth,a=>{a||this.reject(Re(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Re(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,$e.currentPopupAction=null}pollUserCancellation(){const e=()=>{var a,n;if(!((n=(a=this.authWindow)===null||a===void 0?void 0:a.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Re(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,fc.get())};e()}}$e.currentPopupAction=null;/**
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
 */const yc="pendingRedirect",jt=new Map;class vc extends Is{constructor(e,a,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],a,void 0,n),this.eventId=null}async execute(){let e=jt.get(this.auth._key());if(!e){try{const n=await Ic(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(a){e=()=>Promise.reject(a)}jt.set(this.auth._key(),e)}return this.bypassAuthState||jt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const a=await this.auth._redirectUserForId(e.eventId);if(a)return this.user=a,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ic(t,e){const a=Ts(e),n=Ss(t);if(!await n._isAvailable())return!1;const i=await n._get(a)==="true";return await n._remove(a),i}async function _n(t,e){return Ss(t)._set(Ts(e),"true")}function Sc(){jt.clear()}function wn(t,e){jt.set(t._key(),e)}function Ss(t){return xe(t._redirectPersistence)}function Ts(t){return it(yc,t.config.apiKey,t.name)}/**
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
 */function Tc(t,e,a){return bc(t,e,a)}async function bc(t,e,a){const n=ye(t);bt(t,e,qe),await n._initializationPromise;const i=dt(n,a);return await _n(i,n),i._openRedirect(n,e,"signInViaRedirect")}function Cc(t,e,a){return Rc(t,e,a)}async function Rc(t,e,a){const n=me(t);bt(n.auth,e,qe),await n.auth._initializationPromise;const i=dt(n.auth,a);await _n(i,n.auth);const r=await bs(n);return i._openRedirect(n.auth,e,"reauthViaRedirect",r)}function Oc(t,e,a){return _c(t,e,a)}async function _c(t,e,a){const n=me(t);bt(n.auth,e,qe),await n.auth._initializationPromise;const i=dt(n.auth,a);await _a(!1,n,e.providerId),await _n(i,n.auth);const r=await bs(n);return i._openRedirect(n.auth,e,"linkViaRedirect",r)}async function wc(t,e){return await ye(t)._initializationPromise,La(t,e,!1)}async function La(t,e,a=!1){const n=ye(t),i=dt(n,e),o=await new vc(n,i,a).execute();return o&&!a&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}async function bs(t){const e=Xt(`${t.uid}:::`);return t._redirectEventId=e,await t.auth._setRedirectUser(t),await t.auth._persistUserIfCurrent(t),e}/**
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
 */const Nc=10*60*1e3;class Cs{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let a=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(a=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Pc(e)||(this.hasHandledPotentialRedirect=!0,a||(this.queuedRedirectEvent=e,a=!0)),a}sendToConsumer(e,a){var n;if(e.error&&!Rs(e)){const i=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";a.onError(Re(this.auth,i))}else a.onAuthEvent(e)}isEventForConsumer(e,a){const n=a.eventId===null||!!e.eventId&&e.eventId===a.eventId;return a.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Nc&&this.cachedEventUids.clear(),this.cachedEventUids.has(mi(e))}saveEventToCache(e){this.cachedEventUids.add(mi(e)),this.lastProcessedEventTime=Date.now()}}function mi(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Rs({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Pc(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Rs(t);default:return!1}}/**
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
 */async function Os(t,e={}){return Te(t,"GET","/v1/projects",e)}/**
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
 */const xc=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Lc=/^https?/;async function kc(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Os(t);for(const a of e)try{if(Dc(a))return}catch{}Oe(t,"unauthorized-domain")}function Dc(t){const e=Ut(),{protocol:a,hostname:n}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&n===""?a==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):a==="chrome-extension:"&&o.hostname===n}if(!Lc.test(a))return!1;if(xc.test(t))return n===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(n)}/**
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
 */const Mc=new Yt(3e4,6e4);function fi(){const t=Ie().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let a=0;a<t.CP.length;a++)t.CP[a]=null}}function jc(t){return new Promise((e,a)=>{var n,i,r;function o(){fi(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{fi(),a(Re(t,"network-request-failed"))},timeout:Mc.get()})}if(!((i=(n=Ie().gapi)===null||n===void 0?void 0:n.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((r=Ie().gapi)===null||r===void 0)&&r.load)o();else{const d=es("iframefcb");return Ie()[d]=()=>{gapi.load?o():a(Re(t,"network-request-failed"))},En(`https://apis.google.com/js/api.js?onload=${d}`).catch(p=>a(p))}}).catch(e=>{throw ua=null,e})}let ua=null;function Fc(t){return ua=ua||jc(t),ua}/**
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
 */const Vc=new Yt(5e3,15e3),Uc="__/auth/iframe",Gc="emulator/auth/iframe",$c={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Hc=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Bc(t){const e=t.config;V(e.authDomain,t,"auth-domain-config-required");const a=e.emulator?gn(e,Gc):`https://${t.config.authDomain}/${Uc}`,n={apiKey:e.apiKey,appName:t.name,v:qt},i=Hc.get(t.config.apiHost);i&&(n.eid=i);const r=t._getFrameworks();return r.length&&(n.fw=r.join(",")),`${a}?${Tt(n).slice(1)}`}async function zc(t){const e=await Fc(t),a=Ie().gapi;return V(a,t,"internal-error"),e.open({where:document.body,url:Bc(t),messageHandlersFilter:a.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:$c,dontclear:!0},n=>new Promise(async(i,r)=>{await n.restyle({setHideOnLeave:!1});const o=Re(t,"network-request-failed"),d=Ie().setTimeout(()=>{r(o)},Vc.get());function p(){Ie().clearTimeout(d),i(n)}n.ping(p).then(p,()=>{r(o)})}))}/**
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
 */const Wc={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qc=500,Kc=600,Yc="_blank",Zc="http://localhost";class gi{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Jc(t,e,a,n=qc,i=Kc){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let d="";const p=Object.assign(Object.assign({},Wc),{width:n.toString(),height:i.toString(),top:r,left:o}),m=be().toLowerCase();a&&(d=Wi(m)?Yc:a),zi(m)&&(e=e||Zc,p.scrollbars="yes");const E=Object.entries(p).reduce((u,[U,B])=>`${u}${U}=${B},`,"");if(Ro(m)&&d!=="_self")return Xc(e||"",d),new gi(null);const T=window.open(e||"",d,E);V(T,t,"popup-blocked");try{T.focus()}catch{}return new gi(T)}function Xc(t,e){const a=document.createElement("a");a.href=t,a.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),a.dispatchEvent(n)}/**
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
 */const Qc="__/auth/handler",ed="emulator/auth/handler",td=encodeURIComponent("fac");async function Qa(t,e,a,n,i,r){V(t.config.authDomain,t,"auth-domain-config-required"),V(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:a,redirectUrl:n,v:qt,eventId:i};if(e instanceof qe){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Gr(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[E,T]of Object.entries(r||{}))o[E]=T}if(e instanceof Ot){const E=e.getScopes().filter(T=>T!=="");E.length>0&&(o.scopes=E.join(","))}t.tenantId&&(o.tid=t.tenantId);const d=o;for(const E of Object.keys(d))d[E]===void 0&&delete d[E];const p=await t._getAppCheckToken(),m=p?`#${td}=${encodeURIComponent(p)}`:"";return`${ad(t)}?${Tt(d).slice(1)}${m}`}function ad({config:t}){return t.emulator?gn(t,ed):`https://${t.authDomain}/${Qc}`}/**
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
 */const Ba="webStorageSupport";class nd{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ot,this._completeRedirectFn=La,this._overrideRedirectResult=wn}async _openPopup(e,a,n,i){var r;De((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await Qa(e,a,n,Ut(),i);return Jc(e,o,Xt())}async _openRedirect(e,a,n,i){await this._originValidation(e);const r=await Qa(e,a,n,Ut(),i);return Fl(r),new Promise(()=>{})}_initialize(e){const a=e._key();if(this.eventManagers[a]){const{manager:i,promise:r}=this.eventManagers[a];return i?Promise.resolve(i):(De(r,"If manager is not set, promise should be"),r)}const n=this.initAndGetManager(e);return this.eventManagers[a]={promise:n},n.catch(()=>{delete this.eventManagers[a]}),n}async initAndGetManager(e){const a=await zc(e),n=new Cs(e);return a.register("authEvent",i=>(V(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:n.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=a,n}_isIframeWebStorageSupported(e,a){this.iframes[e._key()].send(Ba,{type:Ba},i=>{var r;const o=(r=i==null?void 0:i[0])===null||r===void 0?void 0:r[Ba];o!==void 0&&a(!!o),Oe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const a=e._key();return this.originValidationPromises[a]||(this.originValidationPromises[a]=kc(e)),this.originValidationPromises[a]}get _shouldInitProactively(){return Zi()||An()||Ct()}}const id=nd;class sd{constructor(e){this.factorId=e}_process(e,a,n){switch(a.type){case"enroll":return this._finalizeEnroll(e,a.credential,n);case"signin":return this._finalizeSignIn(e,a.credential);default:return Ue("unexpected MultiFactorSessionType")}}}class Nn extends sd{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Nn(e)}_finalizeEnroll(e,a,n){return Nl(e,{idToken:a,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,a){return Kl(e,{mfaPendingCredential:a,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class _s{constructor(){}static assertion(e){return Nn._fromCredential(e)}}_s.FACTOR_ID="phone";var Ai="@firebase/auth",Ei="0.23.2";/**
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
 */class rd{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const a=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,a),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const a=this.internalListeners.get(e);a&&(this.internalListeners.delete(e),a(),this.updateProactiveRefresh())}assertAuthConfigured(){V(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function od(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function ld(t){Qn(new Wa("auth",(e,{options:a})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:d}=n.options;V(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const p={apiKey:o,authDomain:d,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ji(t)},m=new Do(n,i,r,p);return Mo(m,a),m},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,a,n)=>{e.getProvider("auth-internal").initialize()})),Qn(new Wa("auth-internal",e=>{const a=ye(e.getProvider("auth").getImmediate());return(n=>new rd(n))(a)},"PRIVATE").setInstantiationMode("EXPLICIT")),ei(Ai,Ei,od(t)),ei(Ai,Ei,"esm2017")}/**
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
 */const cd=5*60;jr("authIdTokenMaxAge");ld("Browser");/**
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
 */function ct(){return window}/**
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
 */const dd=2e3;async function ud(t,e,a){var n;const{BuildInfo:i}=ct();De(e.sessionId,"AuthEvent did not contain a session ID");const r=await gd(e.sessionId),o={};return Ct()?o.ibi=i.packageName:Zt()?o.apn=i.packageName:Oe(t,"operation-not-supported-in-this-environment"),i.displayName&&(o.appDisplayName=i.displayName),o.sessionId=r,Qa(t,a,e.type,void 0,(n=e.eventId)!==null&&n!==void 0?n:void 0,o)}async function hd(t){const{BuildInfo:e}=ct(),a={};Ct()?a.iosBundleId=e.packageName:Zt()?a.androidPackageName=e.packageName:Oe(t,"operation-not-supported-in-this-environment"),await Os(t,a)}function pd(t){const{cordova:e}=ct();return new Promise(a=>{e.plugins.browsertab.isAvailable(n=>{let i=null;n?e.plugins.browsertab.openUrl(t):i=e.InAppBrowser.open(t,Co()?"_blank":"_system","location=yes"),a(i)})})}async function md(t,e,a){const{cordova:n}=ct();let i=()=>{};try{await new Promise((r,o)=>{let d=null;function p(){var T;r();const u=(T=n.plugins.browsertab)===null||T===void 0?void 0:T.close;typeof u=="function"&&u(),typeof(a==null?void 0:a.close)=="function"&&a.close()}function m(){d||(d=window.setTimeout(()=>{o(Re(t,"redirect-cancelled-by-user"))},dd))}function E(){(document==null?void 0:document.visibilityState)==="visible"&&m()}e.addPassiveListener(p),document.addEventListener("resume",m,!1),Zt()&&document.addEventListener("visibilitychange",E,!1),i=()=>{e.removePassiveListener(p),document.removeEventListener("resume",m,!1),document.removeEventListener("visibilitychange",E,!1),d&&window.clearTimeout(d)}})}finally{i()}}function fd(t){var e,a,n,i,r,o,d,p,m,E;const T=ct();V(typeof((e=T==null?void 0:T.universalLinks)===null||e===void 0?void 0:e.subscribe)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),V(typeof((a=T==null?void 0:T.BuildInfo)===null||a===void 0?void 0:a.packageName)<"u",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),V(typeof((r=(i=(n=T==null?void 0:T.cordova)===null||n===void 0?void 0:n.plugins)===null||i===void 0?void 0:i.browsertab)===null||r===void 0?void 0:r.openUrl)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),V(typeof((p=(d=(o=T==null?void 0:T.cordova)===null||o===void 0?void 0:o.plugins)===null||d===void 0?void 0:d.browsertab)===null||p===void 0?void 0:p.isAvailable)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),V(typeof((E=(m=T==null?void 0:T.cordova)===null||m===void 0?void 0:m.InAppBrowser)===null||E===void 0?void 0:E.open)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}async function gd(t){const e=Ad(t),a=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(a)).map(i=>i.toString(16).padStart(2,"0")).join("")}function Ad(t){if(De(/[0-9a-zA-Z]+/.test(t),"Can only convert alpha-numeric strings"),typeof TextEncoder<"u")return new TextEncoder().encode(t);const e=new ArrayBuffer(t.length),a=new Uint8Array(e);for(let n=0;n<t.length;n++)a[n]=t.charCodeAt(n);return a}/**
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
 */const Ed=20;class yd extends Cs{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInialized(),this.passiveListeners.forEach(a=>a(e)),super.onEvent(e)}async initialized(){await this.initPromise}}function vd(t,e,a=null){return{type:e,eventId:a,urlResponse:null,sessionId:Td(),postBody:null,tenantId:t.tenantId,error:Re(t,"no-auth-event")}}function Id(t,e){return en()._set(tn(t),e)}async function yi(t){const e=await en()._get(tn(t));return e&&await en()._remove(tn(t)),e}function Sd(t,e){var a,n;const i=Cd(e);if(i.includes("/__/auth/callback")){const r=ha(i),o=r.firebaseError?bd(decodeURIComponent(r.firebaseError)):null,d=(n=(a=o==null?void 0:o.code)===null||a===void 0?void 0:a.split("auth/"))===null||n===void 0?void 0:n[1],p=d?Re(d):null;return p?{type:t.type,eventId:t.eventId,tenantId:t.tenantId,error:p,urlResponse:null,sessionId:null,postBody:null}:{type:t.type,eventId:t.eventId,tenantId:t.tenantId,sessionId:t.sessionId,urlResponse:i,postBody:null}}return null}function Td(){const t=[],e="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let a=0;a<Ed;a++){const n=Math.floor(Math.random()*e.length);t.push(e.charAt(n))}return t.join("")}function en(){return xe(bn)}function tn(t){return it("authEvent",t.config.apiKey,t.name)}function bd(t){try{return JSON.parse(t)}catch{return null}}function Cd(t){const e=ha(t),a=e.link?decodeURIComponent(e.link):void 0,n=ha(a).link,i=e.deep_link_id?decodeURIComponent(e.deep_link_id):void 0;return ha(i).link||i||n||a||t}function ha(t){if(!(t!=null&&t.includes("?")))return{};const[e,...a]=t.split("?");return mt(a.join("?"))}/**
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
 */const Rd=500;class Od{constructor(){this._redirectPersistence=ot,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=La,this._overrideRedirectResult=wn}async _initialize(e){const a=e._key();let n=this.eventManagers.get(a);return n||(n=new yd(e),this.eventManagers.set(a,n),this.attachCallbackListeners(e,n)),n}_openPopup(e){Oe(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,a,n,i){fd(e);const r=await this._initialize(e);await r.initialized(),r.resetRedirect(),Sc(),await this._originValidation(e);const o=vd(e,n,i);await Id(e,o);const d=await ud(e,o,a),p=await pd(d);return md(e,r,p)}_isIframeWebStorageSupported(e,a){throw new Error("Method not implemented.")}_originValidation(e){const a=e._key();return this.originValidationPromises[a]||(this.originValidationPromises[a]=hd(e)),this.originValidationPromises[a]}attachCallbackListeners(e,a){const{universalLinks:n,handleOpenURL:i,BuildInfo:r}=ct(),o=setTimeout(async()=>{await yi(e),a.onEvent(vi())},Rd),d=async E=>{clearTimeout(o);const T=await yi(e);let u=null;T&&(E!=null&&E.url)&&(u=Sd(T,E.url)),a.onEvent(u||vi())};typeof n<"u"&&typeof n.subscribe=="function"&&n.subscribe(null,d);const p=i,m=`${r.packageName.toLowerCase()}://`;ct().handleOpenURL=async E=>{if(E.toLowerCase().startsWith(m)&&d({url:E}),typeof p=="function")try{p(E)}catch(T){console.error(T)}}}}const _d=Od;function vi(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:Re("no-auth-event")}}/**
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
 */function wd(t,e){ye(t)._logFramework(e)}var Nd="@firebase/auth-compat",Pd="0.4.2";/**
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
 */const xd=1e3;function Ft(){var t;return((t=self==null?void 0:self.location)===null||t===void 0?void 0:t.protocol)||null}function Ld(){return Ft()==="http:"||Ft()==="https:"}function ws(t=be()){return!!((Ft()==="file:"||Ft()==="ionic:"||Ft()==="capacitor:")&&t.toLowerCase().match(/iphone|ipad|ipod|android/))}function kd(){return un()||wi()}function Dd(){return _i()&&(document==null?void 0:document.documentMode)===11}function Md(t=be()){return/Edge\/\d+/.test(t)}function jd(t=be()){return Dd()||Md(t)}function Ns(){try{const t=self.localStorage,e=Xt();if(t)return t.setItem(e,"1"),t.removeItem(e),jd()?qa():!0}catch{return Pn()&&qa()}return!1}function Pn(){return typeof global<"u"&&"WorkerGlobalScope"in global&&"importScripts"in global}function za(){return(Ld()||Ri()||ws())&&!kd()&&Ns()&&!Pn()}function Ps(){return ws()&&typeof document<"u"}async function Fd(){return Ps()?new Promise(t=>{const e=setTimeout(()=>{t(!1)},xd);document.addEventListener("deviceready",()=>{clearTimeout(e),t(!0)})}):!1}function Vd(){return typeof window<"u"?window:null}/**
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
 */const Pe={LOCAL:"local",NONE:"none",SESSION:"session"},Pt=V,xs="persistence";function Ud(t,e){if(Pt(Object.values(Pe).includes(e),t,"invalid-persistence-type"),un()){Pt(e!==Pe.SESSION,t,"unsupported-persistence-type");return}if(wi()){Pt(e===Pe.NONE,t,"unsupported-persistence-type");return}if(Pn()){Pt(e===Pe.NONE||e===Pe.LOCAL&&qa(),t,"unsupported-persistence-type");return}Pt(e===Pe.NONE||Ns(),t,"unsupported-persistence-type")}async function an(t){await t._initializationPromise;const e=Ls(),a=it(xs,t.config.apiKey,t.name);e&&e.setItem(a,t._getPersistence())}function Gd(t,e){const a=Ls();if(!a)return[];const n=it(xs,t,e);switch(a.getItem(n)){case Pe.NONE:return[vt];case Pe.LOCAL:return[Bt,ot];case Pe.SESSION:return[ot];default:return[]}}function Ls(){var t;try{return((t=Vd())===null||t===void 0?void 0:t.sessionStorage)||null}catch{return null}}/**
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
 */const $d=V;class Ze{constructor(){this.browserResolver=xe(id),this.cordovaResolver=xe(_d),this.underlyingResolver=null,this._redirectPersistence=ot,this._completeRedirectFn=La,this._overrideRedirectResult=wn}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,a,n,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,a,n,i)}async _openRedirect(e,a,n,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,a,n,i)}_isIframeWebStorageSupported(e,a){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,a)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return Ps()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return $d(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await Fd();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}/**
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
 */function ks(t){return t.unwrap()}function Hd(t){return t.wrapped()}/**
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
 */function Bd(t){return Ds(t)}function zd(t,e){var a;const n=(a=e.customData)===null||a===void 0?void 0:a._tokenResponse;if((e==null?void 0:e.code)==="auth/multi-factor-auth-required"){const i=e;i.resolver=new Wd(t,_l(t,e))}else if(n){const i=Ds(e),r=e;i&&(r.credential=i,r.tenantId=n.tenantId||void 0,r.email=n.email||void 0,r.phoneNumber=n.phoneNumber||void 0)}}function Ds(t){const{_tokenResponse:e}=t instanceof Je?t.customData:t;if(!e)return null;if(!(t instanceof Je)&&"temporaryProof"in e&&"phoneNumber"in e)return lt.credentialFromResult(t);const a=e.providerId;if(!a||a===Nt.PASSWORD)return null;let n;switch(a){case Nt.GOOGLE:n=je;break;case Nt.FACEBOOK:n=Me;break;case Nt.GITHUB:n=Fe;break;case Nt.TWITTER:n=Ve;break;default:const{oauthIdToken:i,oauthAccessToken:r,oauthTokenSecret:o,pendingToken:d,nonce:p}=e;return!r&&!o&&!i&&!d?null:d?a.startsWith("saml.")?It._create(a,d):Ge._fromParams({providerId:a,signInMethod:a,pendingToken:d,idToken:i,accessToken:r}):new gt(a).credential({idToken:i,accessToken:r,rawNonce:p})}return t instanceof Je?n.credentialFromError(t):n.credentialFromResult(t)}function Ne(t,e){return e.catch(a=>{throw a instanceof Je&&zd(t,a),a}).then(a=>{const n=a.operationType,i=a.user;return{operationType:n,credential:Bd(a),additionalUserInfo:Ol(a),user:He.getOrCreate(i)}})}async function nn(t,e){const a=await e;return{verificationId:a.verificationId,confirm:n=>Ne(t,a.confirm(n))}}class Wd{constructor(e,a){this.resolver=a,this.auth=Hd(e)}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return Ne(ks(this.auth),this.resolver.resolveSignIn(e))}}/**
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
 */class He{constructor(e){this._delegate=e,this.multiFactor=xl(e)}static getOrCreate(e){return He.USER_MAP.has(e)||He.USER_MAP.set(e,new He(e)),He.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return Ne(this.auth,cs(this._delegate,e))}async linkWithPhoneNumber(e,a){return nn(this.auth,cc(this._delegate,e,a))}async linkWithPopup(e){return Ne(this.auth,Ec(this._delegate,e,Ze))}async linkWithRedirect(e){return await an(ye(this.auth)),Oc(this._delegate,e,Ze)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return Ne(this.auth,ds(this._delegate,e))}reauthenticateWithPhoneNumber(e,a){return nn(this.auth,dc(this._delegate,e,a))}reauthenticateWithPopup(e){return Ne(this.auth,Ac(this._delegate,e,Ze))}async reauthenticateWithRedirect(e){return await an(ye(this.auth)),Cc(this._delegate,e,Ze)}sendEmailVerification(e){return gl(this._delegate,e)}async unlink(e){return await al(this._delegate,e),this}updateEmail(e){return vl(this._delegate,e)}updatePassword(e){return Il(this._delegate,e)}updatePhoneNumber(e){return uc(this._delegate,e)}updateProfile(e){return yl(this._delegate,e)}verifyBeforeUpdateEmail(e,a){return Al(this._delegate,e,a)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}He.USER_MAP=new WeakMap;/**
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
 */const xt=V;class sn{constructor(e,a){if(this.app=e,a.isInitialized()){this._delegate=a.getImmediate(),this.linkUnderlyingAuth();return}const{apiKey:n}=e.options;xt(n,"invalid-api-key",{appName:e.name}),xt(n,"invalid-api-key",{appName:e.name});const i=typeof window<"u"?Ze:void 0;this._delegate=a.initialize({options:{persistence:qd(n,e.name),popupRedirectResolver:i}}),this._delegate._updateErrorMap(so),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?He.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,a){jo(this._delegate,e,a)}applyActionCode(e){return ol(this._delegate,e)}checkActionCode(e){return us(this._delegate,e)}confirmPasswordReset(e,a){return rl(this._delegate,e,a)}async createUserWithEmailAndPassword(e,a){return Ne(this._delegate,cl(this._delegate,e,a))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return fl(this._delegate,e)}isSignInWithEmailLink(e){return hl(this._delegate,e)}async getRedirectResult(){xt(za(),this._delegate,"operation-not-supported-in-this-environment");const e=await wc(this._delegate,Ze);return e?Ne(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){wd(this._delegate,e)}onAuthStateChanged(e,a,n){const{next:i,error:r,complete:o}=Ii(e,a,n);return this._delegate.onAuthStateChanged(i,r,o)}onIdTokenChanged(e,a,n){const{next:i,error:r,complete:o}=Ii(e,a,n);return this._delegate.onIdTokenChanged(i,r,o)}sendSignInLinkToEmail(e,a){return ul(this._delegate,e,a)}sendPasswordResetEmail(e,a){return sl(this._delegate,e,a||void 0)}async setPersistence(e){Ud(this._delegate,e);let a;switch(e){case Pe.SESSION:a=ot;break;case Pe.LOCAL:a=await xe(Bt)._isAvailable()?Bt:bn;break;case Pe.NONE:a=vt;break;default:return Oe("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(a)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return Ne(this._delegate,tl(this._delegate))}signInWithCredential(e){return Ne(this._delegate,wa(this._delegate,e))}signInWithCustomToken(e){return Ne(this._delegate,il(this._delegate,e))}signInWithEmailAndPassword(e,a){return Ne(this._delegate,dl(this._delegate,e,a))}signInWithEmailLink(e,a){return Ne(this._delegate,pl(this._delegate,e,a))}signInWithPhoneNumber(e,a){return nn(this._delegate,lc(this._delegate,e,a))}async signInWithPopup(e){return xt(za(),this._delegate,"operation-not-supported-in-this-environment"),Ne(this._delegate,gc(this._delegate,e,Ze))}async signInWithRedirect(e){return xt(za(),this._delegate,"operation-not-supported-in-this-environment"),await an(this._delegate),Tc(this._delegate,e,Ze)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return ll(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}sn.Persistence=Pe;function Ii(t,e,a){let n=t;typeof t!="function"&&({next:n,error:e,complete:a}=t);const i=n;return{next:o=>i(o&&He.getOrCreate(o)),error:e,complete:a}}function qd(t,e){const a=Gd(t,e);if(typeof self<"u"&&!a.includes(Bt)&&a.push(Bt),typeof window<"u")for(const n of[bn,ot])a.includes(n)||a.push(n);return a.includes(vt)||a.push(vt),a}/**
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
 */class xn{constructor(){this.providerId="phone",this._delegate=new lt(ks(Z.auth()))}static credential(e,a){return lt.credential(e,a)}verifyPhoneNumber(e,a){return this._delegate.verifyPhoneNumber(e,a)}unwrap(){return this._delegate}}xn.PHONE_SIGN_IN_METHOD=lt.PHONE_SIGN_IN_METHOD;xn.PROVIDER_ID=lt.PROVIDER_ID;/**
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
 */const Kd=V;class Yd{constructor(e,a,n=Z.app()){var i;Kd((i=n.options)===null||i===void 0?void 0:i.apiKey,"invalid-api-key",{appName:n.name}),this._delegate=new rc(e,a,n.auth()),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}/**
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
 */const Zd="auth-compat";function Jd(t){t.INTERNAL.registerComponent(new Wa(Zd,e=>{const a=e.getProvider("app-compat").getImmediate(),n=e.getProvider("auth");return new sn(a,n)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:ht.EMAIL_SIGNIN,PASSWORD_RESET:ht.PASSWORD_RESET,RECOVER_EMAIL:ht.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:ht.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:ht.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:ht.VERIFY_EMAIL}},EmailAuthProvider:Qe,FacebookAuthProvider:Me,GithubAuthProvider:Fe,GoogleAuthProvider:je,OAuthProvider:gt,SAMLAuthProvider:fa,PhoneAuthProvider:xn,PhoneMultiFactorGenerator:_s,RecaptchaVerifier:Yd,TwitterAuthProvider:Ve,Auth:sn,AuthCredential:Rt,Error:Je}).setInstantiationMode("LAZY").setMultipleInstances(!1)),t.registerVersion(Nd,Pd)}Jd(Z);const rt=Z.auth(),ea=t=>h.collection("adminProfiles").doc(t),rn=(t,e)=>({type:"ADMIN",data:{...e,id:t}});async function Xd(t,e){const a=t.trim().includes("@")?t.trim():`${t.trim().toLowerCase()}@subadmins.matoreal.invalid`;await rt.setPersistence(Z.auth.Auth.Persistence.SESSION);const{user:n}=await rt.signInWithEmailAndPassword(a,e);if(n.uid===Kt)return rn(n.uid,{name:"FEDERAÇÃO (ADM PRINCIPAL)",permissions:[]});try{const i=await ea(n.uid).get();if(!i.exists||i.data().active!==!0)throw Error("Este acesso administrativo foi removido ou não foi autorizado.");return rn(n.uid,{name:i.data().name,permissions:ba(i.data().permissions)})}catch(i){throw await rt.signOut(),i}}function Qd(t,e,a){return Sa(t)?()=>{}:ea(t.data.id).onSnapshot(n=>{if(!n.exists||n.data().active!==!0)return a();try{e(rn(n.id,{name:n.data().name,permissions:ba(n.data().permissions)}))}catch{a()}},a)}async function Ln(){var t;if(((t=rt.currentUser)==null?void 0:t.uid)!==Kt)throw Error("Somente o ADM principal pode gerenciar acessos.")}async function Ms(){return Z.initializeApp(Z.app().options,`subadmin-${crypto.randomUUID()}`)}async function eu(){await Ln();const t=await Ms();try{try{await t.firestore().collection("adminProfiles").doc("__access_probe__").get({source:"server"})}catch(e){if(e.code==="permission-denied")return!0;throw e}throw Error("Antes de cadastrar subADMs, publique as regras de proteção de adminProfiles fornecidas com esta atualização. Seu banco ainda permite acesso público a esses perfis.")}finally{await t.delete()}}async function yh({name:t,login:e,password:a,permissions:n}){if(await eu(),t=t.trim(),e=e.trim().toLowerCase(),t.length<2||t.length>80)throw Error("Nome deve ter entre 2 e 80 caracteres.");if(!/^[a-z0-9][a-z0-9._-]{2,31}$/.test(e))throw Error("Login: de 3 a 32 letras, números, pontos, traços ou sublinhados.");if(a.length<12||a.length>128)throw Error("Use uma senha de 12 a 128 caracteres.");n=ba(n);const i=await Ms();let r;try{return await i.auth().setPersistence(Z.auth.Auth.Persistence.NONE),r=(await i.auth().createUserWithEmailAndPassword(`${e}@subadmins.matoreal.invalid`,a)).user,await ea(r.uid).set({name:t,login:e,permissions:n,active:!0,createdAt:Date.now()}),r.uid}catch(o){throw r&&await r.delete().catch(()=>{}),o}finally{await i.auth().signOut().catch(()=>{}),await i.delete()}}async function vh(t,e){if(await Ln(),t===Kt)throw Error("O ADM principal não pode ser alterado aqui.");await ea(t).update({permissions:ba(e)})}async function Ih(t){if(await Ln(),t===Kt)throw Error("O ADM principal não pode ser excluído.");await ea(t).delete()}const js={plain:"Lisa",stripes:"Listras verticais",hoops:"Listras horizontais",sash:"Faixa diagonal"},sa=(t,e)=>/^#[0-9a-f]{6}$/i.test(t)?t:e;function yt(t={},e="#16ac78"){return{shirt:sa(t.shirt,e),detail:sa(t.detail,"#ffffff"),shorts:sa(t.shorts,"#18243a"),socks:sa(t.socks,"#ffffff"),pattern:Object.hasOwn(js,t.pattern)?t.pattern:"plain"}}function zt(t){const e=(t==null?void 0:t.kits)||{};return{home:yt(e.home),away:yt(e.away,"#f4f4f4"),goalkeeper:yt(e.goalkeeper,"#ffbf35")}}function tt(t,e){const a=r=>[1,3,5].map(o=>parseInt(r.slice(o,o+2),16)),n=a(t),i=a(e);return Math.hypot(...n.map((r,o)=>r-i[o]))}function Sh(t,e){const a=zt(t),n=zt(e),i=[];let r=a.home,o=n.away;tt(r.shirt,o.shirt)<110&&(tt(r.shirt,n.home.shirt)>=110?(o=n.home,i.push("Visitante usa o uniforme de casa para evitar cores semelhantes.")):(o=yt({shirt:tt(r.shirt,"#f4f4f4")>tt(r.shirt,"#202033")?"#f4f4f4":"#202033",shorts:"#ff5e67",detail:"#ff5e67"}),i.push("Visitante usa uniforme de contraste neste amistoso.")));const d=[r.shirt,o.shirt],p=(m,E)=>{if(d.some(T=>tt(T,m.shirt)<100)){const u=["#ffbf35","#d83de8","#24d4ed","#151923","#f4f4f4"].sort((U,B)=>Math.min(...d.map(F=>tt(F,B)))-Math.min(...d.map(F=>tt(F,U))))[0];m={...m,shirt:u},i.push(`Goleiro ${E} usa camisa de contraste neste amistoso.`)}return d.push(m.shirt),m};return{home:r,away:o,homeGK:p(a.goalkeeper,"mandante"),awayGK:p(n.goalkeeper,"visitante"),notes:i}}const Fs=["#f5d0ac","#e8b58a","#cf9367","#aa704b","#805034","#543323"],Vs=["#171717","#523323","#8d5b36","#d6b15d","#d7d7d7","#ab3459"],Us=["#151923","#f2f4f8","#ffbf35","#f15d56","#68deae","#64b5f6"],Gs=["#172027","#663f25","#345e95","#437442","#9b792d","#686873"],on={short:"Curto",afro:"Afro",mohawk:"Moicano",long:"Longo",ponytail:"Rabo de cavalo",bald:"Careca",curls:"Cachos",spikes:"Espetado",fade:"Degradê",braids:"Tranças",swept:"Franja lateral"};function Vt(t={}){const e=(a,n)=>a.includes(n)?n:a[0];return{skin:e(Fs,t.skin),hair:e(Vs,t.hair),eyes:e(Gs,t.eyes),boots:e(Us,t.boots),style:Object.hasOwn(on,t.style)?t.style:"short",beard:["none","short","full"].includes(t.beard)?t.beard:"none",sleeves:t.sleeves==="long"?"long":"short",number:Math.max(1,Math.min(99,Math.floor(Number(t.number)||10)))}}function $s(t,e,a,n,i="#32bf97",r=0,o=1,d=!1,p={}){const m=Vt(n),E=yt(typeof i=="string"?{shirt:i}:i),T=r===0?0:Math.round(Math.sin(r)*2);t.save(),t.translate(Math.round(e),Math.round(a)),t.scale(o*(p.facing===-1?-1:1),o),(p.action==="tackle"||p.action==="injury")&&(t.translate(0,-3),t.rotate(-Math.PI/2)),p.action==="kick"&&t.rotate(-.13);const u=(U,B,F,Q,ee)=>{t.fillStyle=U,t.fillRect(B,F,Q,ee)};if(u("#08131766",-8,0,17,4),r&&!["tackle","injury"].includes(p.action)&&t.translate(0,-Math.abs(T)*.5),u("#10171d",-5,-30,11,2),u("#10171d",-7,-28,15,9),u("#10171d",-5,-20,11,3),u("#10171d",-3,-18,7,2),u(m.skin,-5,-28,11,10),u(m.skin,-6,-26,13,6),u(m.skin,-3,-19,7,2),u("#10171d",-8,-25,2,5),u("#10171d",7,-25,2,5),u(m.skin,-7,-24,2,3),u(m.skin,7,-24,1,3),u("#00000024",4,-25,2,6),u("#00000022",-3,-18,7,1),u("#ffffff22",-4,-27,4,2),u(m.skin,-2,-17,5,2),m.style!=="bald"&&(u("#10171d",-5,-32,11,2),u("#10171d",-7,-30,15,5),u(m.hair,-5,-31,11,3),u(m.hair,-6,-29,13,4),u(m.hair,-7,-27,4,4),u(m.hair,5,-27,3,5),u("#ffffff22",-4,-30,7,2),m.style==="afro"&&(u("#10171d",-9,-31,19,10),u(m.hair,-8,-31,17,8),u(m.hair,-6,-33,13,4)),m.style==="mohawk"&&(u(m.skin,-6,-28,4,3),u(m.skin,3,-28,4,3),u(m.hair,-2,-34,5,9)),m.style==="long"&&(u("#10171d",-8,-26,3,13),u(m.hair,-7,-26,2,12),u(m.hair,6,-26,3,12)),m.style==="ponytail"&&(u("#10171d",7,-27,5,10),u(m.hair,8,-26,3,8))),m.style==="curls")for(let U=0;U<5;U++)u(m.hair,-8+U*3,-32+U%2,4,7),u("#ffffff22",-7+U*3,-31+U%2,2,2);if(m.style==="spikes")for(let U=0;U<4;U++)u(m.hair,-6+U*4,-34+U%2*2,3,7);if(m.style==="fade"&&(u(m.skin,-6,-26,3,3),u(m.skin,4,-26,3,3),u("#00000033",-6,-26,2,2)),m.style==="braids")for(let U=0;U<4;U++)u(m.hair,-6+U*4,-31,2,14),u("#ffffff22",-6+U*4,-30,1,5);if(m.style==="swept"&&(u(m.hair,-5,-29,12,5),u(m.hair,2,-26,5,4)),d&&m.style!=="bald"&&u(m.hair,-5,-26,11,7),d||(u(m.hair,-4,-25,3,1),u(m.hair,2,-25,3,1),u("#fff9e9",-4,-24,3,3),u("#fff9e9",2,-24,3,3),u(m.eyes,-3,-23,2,2),u(m.eyes,3,-23,2,2),u("#00000033",0,-21,2,2),u("#633e36",-1,-19,3,1),m.beard!=="none"&&u(m.hair,-4,-20,9,m.beard==="full"?4:2)),u("#10171d",-6,-16,13,12),u("#10171d",-8,-15,17,6),u(E.shirt,-5,-15,11,8),u(E.shirt,-7,-14,3,4),u(E.shirt,5,-14,3,4),u("#10171d",-8,-11+T,4,5),u(m.sleeves==="long"?E.shirt:m.skin,-7,-10+T,2,3),u(m.skin,-6,-8+T,2,2),u("#10171d",5,-11-T,4,5),u(m.sleeves==="long"?E.shirt:m.skin,6,-10-T,2,3),u(m.skin,5,-8-T,2,2),E.pattern==="stripes"&&(u(E.detail,-3,-15,2,8),u(E.detail,2,-15,2,8)),E.pattern==="hoops"&&(u(E.detail,-5,-13,11,2),u(E.detail,-5,-9,11,1)),E.pattern==="sash")for(let U=0;U<7;U++)u(E.detail,-4+U,-15+U,3,1);u("#ffffff24",-4,-15,3,6),u("#00000026",4,-14,2,7),u(E.detail,-2,-15,5,1),u(E.shorts,-5,-7,11,3),u("#ffffff22",-4,-7,3,1),u("#00000044",0,-6,1,3),u(m.skin,-4,-4+T,3,2),u(m.skin,2,-4-T,3,2),u("#10171d",-6,-4,5,7+T),u("#10171d",1,-4,6,7-T),u(E.socks,-4,-4,3,4+T),u(E.socks,2,-4,3,4-T),p.action==="kick"&&(u(E.socks,3,-5,7,3),u(m.boots,9,-6,4,4)),u(m.boots,-6,T,5,2),u("#eee8d5",-6,T+2,5,1),u(m.boots,2,-T,5,2),u("#eee8d5",2,-T+2,5,1),t.fillStyle="#fff",t.font="bold 5px monospace",t.textAlign="center",p.referee||t.fillText(String(m.number),.5,-9),p.action==="throwin"&&(u("#10171d",-10,-31,4,18),u("#10171d",7,-31,4,18),u(m.skin,-9,-30,2,16),u(m.skin,8,-30,2,16),u(m.skin,-8,-34,17,3),u("#10171d",-3,-38,8,6),u("#fff9e9",-2,-37,6,4),u("#172027",0,-36,2,2)),p.card&&(u(E.shirt,5,-19,3,6),u(m.skin,5,-27,3,8),u("#10171d",4,-34,6,9),u(p.card==="red"?"#ff354a":"#ffe133",5,-33,4,7)),t.restore()}const tu={AFC:"AF AU BH BD BT BN KH CN TW GU HK IN ID IR IQ JP JO KP KR KW KG LA LB MO MY MV MN MM NP OM PK PS PH QA SA SG LK SY TJ TH TL TM AE UZ VN YE",CAF:"DZ AO BJ BW BF BI CV CM CF TD KM CG CD CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU MA MZ NA NE NG RW ST SN SC SL SO ZA SS SD TZ TG TN UG ZM ZW",CONCACAF:"AI AG AW BS BB BZ BM VG CA KY CR CU CW DM DO SV GD GT GY HT HN JM MX MS NI PA PR KN LC VC SR TT TC US VI",CONMEBOL:"AR BO BR CL CO EC PY PE UY VE",OFC:"AS CK FJ NC NZ PG WS SB PF TO VU",UEFA:"AL AD AM AT AZ BY BE BA BG HR CY CZ DK ENG EE FO FI FR GE DE GI GR HU IS IL IT KZ XK LV LI LT LU MT MD ME NL MK NIR NO PL PT IE RO RU SM SCO RS SK SI ES SE CH TR UA WAL"},au={MTR:"Mato Real",ENG:"Inglaterra",SCO:"Escócia",WAL:"País de Gales",NIR:"Irlanda do Norte",TW:"Taipé Chinês",CD:"RD Congo",CG:"Congo",CI:"Costa do Marfim",SZ:"Essuatíni",CZ:"Tchéquia",TR:"Turquia",HK:"Hong Kong",MO:"Macau",PF:"Taiti",VG:"Ilhas Virgens Britânicas",VI:"Ilhas Virgens Americanas",KR:"Coreia do Sul",KP:"Coreia do Norte",US:"Estados Unidos",XK:"Kosovo"},nu=new Intl.DisplayNames(["pt-BR"],{type:"region"}),Hs=[{id:"MTR",name:"Mato Real",confederation:"MATO REAL"},...Object.entries(tu).flatMap(([t,e])=>e.split(" ").map(a=>({id:a,name:au[a]||nu.of(a),confederation:t})))].sort((t,e)=>t.id==="MTR"?-1:e.id==="MTR"?1:t.name.localeCompare(e.name,"pt-BR")),Bs=Object.fromEntries(Hs.map(t=>[t.id,t])),iu=t=>(t==null?void 0:t.nationality)||"MTR",Th=t=>{var e;return((e=Bs[t])==null?void 0:e.name)||"Mato Real"};function su(t){return t==="MTR"?"🌟":t==="ENG"||t==="SCO"||t==="WAL"?"🏴":t==="NIR"?"⚽":/^[A-Z]{2}$/.test(t)?String.fromCodePoint(...[...t].map(e=>127397+e.charCodeAt(0))):"🏳️"}const zs={"4-3-3 OFENSIVO":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MEI","PTD","ATA","PTE"],"4-3-3 DEFENSIVO":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MC","PTD","ATA","PTE"],"4-3-3 FALSO 9":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","PTD","SA","PTE"],"4-3-3 POSSE":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","SA","ATA","SA"],"4-4-2 CLÁSSICO":["GOL","LD","ZAG","ZAG","LE","MD","MC","MC","ME","ATA","ATA"],"4-4-2 LOSANGO":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","MEI","ATA","ATA"],"4-4-2 LINHA":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","MEI","ATA","ATA"],"4-4-1-1":["GOL","LD","ZAG","ZAG","LE","MD","MC","MC","ME","SA","ATA"],"4-2-3-1 LARGO":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","PTD","ATA","PTE"],"4-2-3-1 ESTREITO":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","MEI","MEI","ATA"],"4-1-4-1":["GOL","LD","ZAG","ZAG","LE","VOL","MD","MC","MC","ME","ATA"],"4-1-2-1-2":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","MEI","ATA","ATA"],"4-2-2-2 (BRASIL)":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","MEI","ATA","ATA"],"4-2-4 OFENSIVO":["GOL","LD","ZAG","ZAG","LE","MC","MC","PTD","ATA","ATA","PTE"],"4-5-1 RETRANCA":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MC","MD","ME","ATA"],"4-3-2-1 (NATAL)":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","MEI","MEI","ATA"],"3-5-2 TÁTICO":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MD","ME","MEI","ATA","ATA"],"3-4-3 (CRUYFF)":["GOL","ZAG","ZAG","ZAG","VOL","MC","MD","ME","PTD","ATA","PTE"],"3-4-3 LINHA":["GOL","ZAG","ZAG","ZAG","MD","MC","MC","ME","PTD","ATA","PTE"],"3-4-1-2":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MD","ME","MEI","ATA","ATA"],"3-6-1 CONTROLE":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MD","MC","MC","ME","ATA"],"3-3-1-3 (BIELSA)":["GOL","ZAG","ZAG","ZAG","VOL","MC","MC","MEI","PTD","ATA","PTE"],"3-1-4-2":["GOL","ZAG","ZAG","ZAG","VOL","MD","MC","MC","ME","ATA","ATA"],"5-4-1 ÔNIBUS":["GOL","LD","ZAG","ZAG","ZAG","LE","VOL","VOL","MD","ME","ATA"],"5-3-2 CONTRA":["GOL","LD","ZAG","ZAG","ZAG","LE","VOL","MC","MC","ATA","ATA"],"5-2-3 ALAS":["GOL","LD","ZAG","ZAG","ZAG","LE","MC","MC","PTD","ATA","PTE"],"5-2-1-2":["GOL","LD","ZAG","ZAG","ZAG","LE","VOL","VOL","MEI","ATA","ATA"],"WM (ANOS 30)":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MEI","MEI","PTD","ATA","PTE"],"2-3-5 (PIRÂMIDE)":["GOL","ZAG","ZAG","VOL","MC","VOL","PTD","SA","ATA","SA","PTE"],"4-6-0 (SEM ATA)":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MD","ME","MEI","MEI"],"1-1-8 (KAMIKAZE)":["GOL","ZAG","MC","PTD","SA","SA","ATA","ATA","SA","SA","PTE"],"VÁRZEA (TUDO P/ FRENTE)":["GOL","ZAG","ZAG","VOL","MEI","PTD","ATA","ATA","ATA","ATA","PTE"],"VÁRZEA (VOLANTAÇO)":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","VOL","VOL","MEI","ATA"]},ru=23;function kn(t){if(!Bs[t])throw Error("Seleção inválida.")}function ou(t,e){return iu(t)===e&&!["PENDING","BLOCKED"].includes(t.status)}function bh(t,e,a){if(kn(t),!Array.isArray(e)||e.length>ru||new Set(e).size!==e.length)throw Error("Convoque até 23 jogadores, sem repetidos.");if(e.some(n=>!a.some(i=>i.id===n&&ou(i,t))))throw Error("Jogador indisponível ou de outra nacionalidade.")}function Ch(t,e,a,n){if(!zs[t])throw Error("Formação inválida.");if(e.length!==11||new Set(e).size!==11||e.some(r=>!r||!a.includes(r)))throw Error("Selecione 11 titulares distintos da convocação.");const i=e.map(r=>n.find(o=>o.id===r));if(i.some(r=>!r||(r.recoveryLeft||0)>0||(r.energy??100)<25))throw Error("Titular lesionado, indisponível ou com menos de 25 de energia.");if(i[0].position!=="GOL"||i.slice(1).some(r=>r.position==="GOL"))throw Error("Escale um goleiro na primeira posição e dez jogadores de linha.")}function Rh(t,e){if(t.length<2||t.length>16||new Set(t).size!==t.length)throw Error("Escolha de 2 a 16 seleções distintas.");if(t.forEach(kn),!/^\d{4}-\d{2}-\d{2}$/.test(e)||Number.isNaN(Date.parse(e)))throw Error("Escolha uma data válida.");const a=[...t];a.length%2&&a.push(null);const n=[];for(let i=0;i<a.length-1;i++){const r=new Date(e+"T12:00:00Z");r.setUTCDate(r.getUTCDate()+i*7);for(let o=0;o<a.length/2;o++){const d=a[o],p=a[a.length-1-o];d&&p&&n.push({homeId:i%2?p:d,awayId:i%2?d:p,date:r.toISOString().slice(0,10),round:i+1})}a.splice(1,0,a.pop())}return n}function Oh(t,e){const a=new Map(t.map(n=>[n,{id:n,pts:0,played:0,wins:0,gf:0,ga:0}]));for(const n of e.filter(i=>i.status==="FINISHED"&&i.stage!=="FINAL")){const i=a.get(n.homeId),r=a.get(n.awayId);if(!(!i||!r))if(i.played++,r.played++,i.gf+=n.homeScore,i.ga+=n.awayScore,r.gf+=n.awayScore,r.ga+=n.homeScore,n.homeScore===n.awayScore)i.pts++,r.pts++;else{const o=n.homeScore>n.awayScore?i:r;o.pts+=3,o.wins++}}return[...a.values()].sort((n,i)=>i.pts-n.pts||i.wins-n.wins||i.gf-i.ga-(n.gf-n.ga)||i.gf-n.gf||n.id.localeCompare(i.id))}const ka={COMERCIO:{label:"Comércio Local",start:25e5,tax:5e4,desc:"Ideal para iniciantes. Imposto baixo."},MEDIA:{label:"Média Empresa",start:2e7,tax:35e4,desc:"Poder moderado. Imposto médio."},GRANDE:{label:"Grande Empresa",start:1e8,tax:2e6,desc:"Gigante do mercado. Imposto alto."}},ln={balance:"⚖️ Equilíbrio",stamina:"🔋 Resistência",speed:"⚡ Veloc. Máx.",accel:"🚀 Aceleração",agility:"🤸 Agilidade",jump:"🦘 Impulsão",condition:"💪 Cond. Física",attack:"⚔️ Ataque",dribble:"⚽ Drible",dribbleSpd:"🏃💨 Drib. Veloc.",shortPass:"🎯 Passe Curto",shortPassSpd:"⏩ P. Curto Vel.",longPass:"📡 Passe Longo",longPassSpd:"🚀 P. Longo Vel.",shot:"🔫 Finalização",shotPower:"💣 Força Chute",shotTech:"🎨 Téc. Chute",freeKick:"🎯 Falta",curve:"🍌 Efeito",header:"🤕 Cabeceio",tech:"✨ Técnica",weakFootAcc:"🦶 Pior Pé Prec.",weakFootFreq:"🔄 Pior Pé Freq.",defense:"🛡️ Defesa",response:"🧠 Resposta",aggression:"😡 Agressividade",mentality:"🧠 Atitude",teamwork:"🤝 Trabalho Eq.",gk:"🧤 Hab. Goleiro"},ya=(t,e)=>{const a=parseInt(e)||50,n={},i=Object.keys(ln);let r=[],o=[];t==="GOL"?(r=["gk","response","jump","longPass"],o=["balance","condition","mentality","defense"]):t.includes("ZAG")?(r=["defense","header","balance","jump","aggression"],o=["stamina","response","shortPass","longPass"]):t.includes("LAT")||t.includes("LD")||t.includes("LE")?(r=["speed","accel","stamina","shortPass","dribble"],o=["defense","longPass","curve","attack"]):t.includes("VOL")||t.includes("MC")||t==="MD"||t==="ME"?(r=["shortPass","stamina","teamwork","defense","balance"],o=["longPass","tech","shotPower","vision"]):t.includes("MEI")||t.includes("MAT")?(r=["dribble","shortPass","vision","tech","curve","agility"],o=["shot","speed","attack","freeKick"]):t==="PTD"||t==="PTE"?(r=["speed","accel","dribble","agility","curve"],o=["shot","stamina","longPass","technique"]):(t.includes("ATA")||t.includes("SA")||t.includes("PNT"))&&(r=["shot","attack","header","shotPower","balance"],o=["speed","reaction","dribble","strength"]),i.forEach(T=>{let u=a;r.includes(T)?u+=Math.floor(Math.random()*6)+2:o.includes(T)?u-=Math.floor(Math.random()*4):u-=Math.floor(Math.random()*10)+5,t!=="GOL"&&T==="gk"&&(u=10),t==="GOL"&&["shot","attack","dribble","curve","freeKick"].includes(T)&&(u=Math.max(15,u-20)),a<80&&u>88&&(u=88),u>99&&(u=99),u<1&&(u=1),n[T]=u});const d=i.filter(T=>t==="GOL"?!["shot","attack","dribble","curve","freeKick","weakFootAcc","weakFootFreq"].includes(T):T!=="gk");let p=0;d.forEach(T=>p+=n[T]);const m=p/d.length,E=a-m;return d.forEach(T=>{let u=E;n[T]>90&&a<85&&E>0&&(u=0);let U=n[T]+u;U>99&&(U=99),U<1&&(U=1),n[T]=Math.round(U)}),n};function lu(t,e){const{setLoading:a,teams:n,players:i,companies:r,coaches:o,papers:d,journalists:p,setUser:m,setScreen:E}=t;return{login:async(P,k,R)=>{a(!0);try{await rt.signOut();let A=null,b="";if(R==="TEAM"||R==="USER"){const g=n.find(O=>O.id===P&&O.password===k);g&&(A=g,b="USER")}else if(R==="PLAYER"){const g=i.find(O=>!O.isBot&&O.id===P&&O.password===k);g&&(A=g,b="PLAYER")}else if(R==="COMPANY"){const g=r.find(O=>O.id===P&&O.password===k);g&&(A=g,b="COMPANY")}else if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(R)){const g=o.find(O=>O.id===P&&O.password===k);g&&(A=g,b=g.type)}else if(R==="PRESS"||R==="PAPER"){const g=d.find(O=>O.id===P&&O.password===k);g&&(A=g,b="PRESS")}else if(R==="PRESS_WORKER"||R==="JOURNALIST"){const g=p.find(O=>O.id===P&&O.password===k);if(g){const O=d.find(w=>w.id===g.newspaperId);A={...g,paperName:O==null?void 0:O.name},b="PRESS_WORKER"}}else{let g=n.find(O=>(O.id===P||O.name===P)&&O.password===k);if(g&&(A=g,b="USER"),!A){let O=i.find(w=>!w.isBot&&(w.id===P||w.name===P)&&w.password===k);O&&(A=O,b="PLAYER")}if(!A){let O=o.find(w=>(w.id===P||w.name===P)&&w.password===k);O&&(A=O,b=O.type)}if(!A){let O=r.find(w=>(w.id===P||w.name===P)&&w.password===k);O&&(A=O,b="COMPANY")}if(!A){let O=d.find(w=>(w.id===P||w.name===P)&&w.password===k);O&&(A=O,b="PRESS")}if(!A){let O=p.find(w=>(w.id===P||w.name===P)&&w.password===k);if(O){const w=d.find(l=>l.id===O.newspaperId);A={...O,paperName:w==null?void 0:w.name},b="PRESS_WORKER"}}}A?A.status==="PENDING"?alert("Conta em análise pela Federação. Aguarde aprovação."):A.status==="BLOCKED"?alert("Conta bloqueada."):(m({type:b,data:A}),Ka({type:b,data:A}),E(b==="COACH"?"COACH_DASH":b==="DOCTOR"?"DOCTOR_DASH":b==="ASSISTANT"?"ASSISTANT_DASH":b==="SCOUT"?"SCOUT_DASH":b==="COMPANY"?"COMPANY_DASH":b==="PLAYER"?"PLAYER_DASH":b==="PRESS"||b==="PRESS_WORKER"?"PRESS_DASH":"HOME")):alert("ID ou Senha incorretos!")}catch(A){console.error(A),alert("Erro no login: "+A.message)}a(!1)},loginAdmin:async(P,k)=>{const R=await Xd(P,k);Ka(R),m(R),E(ki("ADMIN",Ja(R,"screen")))},createTeam:async(P,k,R,A,b,g)=>{if(!g)return alert("Escolha um Estado!");if(n.find(O=>O.name.toLowerCase()===P.toLowerCase()))return alert("Nome em uso!");await h.collection("teams").add({name:P,balance:parseFloat(k),serie:R,estado:g,password:A,stadiumLevel:1,logo:b||null,status:"PENDING",stats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0},stateStats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}}),alert("Clube fundado! Aguarde aprovação da Federação.")},createPlayerAccount:async P=>{try{kn(P.nationality)}catch(k){alert(k.message);return}if(!P.name||!P.password||!P.instagram)return alert("Preencha todos os campos!");a(!0);try{const k=P.position==="GOL"?60:45,R=ya(P.position,k);await h.collection("players").add({name:P.name,nationality:P.nationality,pixelAppearance:Vt(P.pixelAppearance),instagram:P.instagram,position:P.position,password:P.password,overall:k,attributes:R,teamId:"FREE",status:"PENDING",balance:0,salary:1500,value:4e4,contract:0,mood:"😐",fame:0,stats:{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0}}),alert(`✅ Inscrição enviada!
A Federação avaliará seu Instagram em breve. Assim que aprovado, você aparecerá no mercado de Agentes Livres.`),window.location.reload()}catch(k){alert("Erro ao criar: "+k.message),a(!1)}},createStaff:async P=>{if(!P.name||!P.password||!P.role)return alert("Preencha todos os campos obrigatórios!");a(!0);try{const k=`staff_${Date.now()}`;await h.collection("users").doc(k).set({id:k,name:P.name,password:P.password,type:P.role,level:1,xp:0,salary:2500,affinities:[P.affinity||"Geral"],pendingPerks:0,pendingAffinity:0,teamId:"FREE",status:"ACTIVE",trainingsLeft:2,clause:5e4,perks:[],face:P.face||null,createdAt:Date.now()}),alert(`✅ Licença de ${{COACH:"Técnico",DOCTOR:"Médico",SCOUT:"Olheiro",ASSISTANT:"Auxiliar"}[P.role]} gerada com sucesso!
Você já está ativo nos Agentes Livres. Pode fazer o login!`),window.location.reload()}catch(k){console.error(k),alert("Erro ao criar perfil profissional."),a(!1)}},createNewspaper:async(P,k,R)=>{await h.collection("newspapers").add({name:P,password:k,ownerName:R,status:"PENDING"}),alert("Jornal criado! Aguarde Federação.")},createJournalist:async(P,k,R)=>{await h.collection("journalists").add({name:P,password:k,newspaperId:R,status:"PENDING"}),alert("Conta criada! Aguarde seu Chefe.")},createCompany:async P=>{if(!P.n||!P.p)return alert("Preencha tudo!");await h.collection("companies").add({name:P.n,owner:P.owner,password:P.p,companyType:P.type,balance:ka[P.type].start,status:"PENDING"}),alert("Solicitação enviada! Aguarde a Federação.")}}}const ie=t=>"₣ "+parseFloat(t||0).toLocaleString("pt-BR"),St={1:{name:"O Terrão",cap:1e3,minTic:10,maxTic:30,upgCost:5e6,maint:0,prompt:"Campo de futebol de terra e grama falha, alambrado enferrujado, pequena arquibancada de concreto, dia ensolarado, futebol de várzea --ar 16:9"},2:{name:"Estádio Municipal",cap:5e3,minTic:20,maxTic:60,upgCost:15e6,maint:15e3,prompt:"Estádio municipal pequeno, gramado razoável, arquibancadas baixas de concreto, luzes simples, dia de jogo --ar 16:9"},3:{name:"Estádio Profissional",cap:15e3,minTic:40,maxTic:100,upgCost:35e6,maint:6e4,prompt:"Estádio de futebol profissional, arquibancadas cobertas de um lado, cadeiras de plástico coloridas, refletores altos, torcida --ar 16:9"},4:{name:"Arena Moderna",cap:4e4,minTic:80,maxTic:200,upgCost:8e7,maint:15e4,prompt:"Arena de futebol moderna, dois anéis de arquibancada, cobertura completa, telões digitais, cadeiras padronizadas --ar 16:9"},5:{name:"Padrão FIFA",cap:8e4,minTic:120,maxTic:350,upgCost:0,maint:4e5,prompt:"Estádio de futebol padrão Copa do Mundo, arquitetura futurista de vidro e aço, 80 mil lugares, iluminação cênica de LED noturna, lotado --ar 16:9"}},cu=(t,e)=>{if(!t)return 0;const n={A:1e4,B:4e3,C:1500,D:500,VARZEA:100}[t.serie||"VARZEA"]||100,i=e.reduce((T,u)=>T+(u.fame||0),0),r=Math.floor(i/20),o=t.recentForm||[];let d=1;if(o.length>0){const T=o.filter(U=>U==="VITORIA").length,u=o.filter(U=>U==="DERROTA").length;T>u&&(d+=T*.06),u>T&&(d-=u*.08)}const p=Math.floor((n+r)*d),m=t.socioPrice||40;let E=1;return m>10&&(E=1-(m-10)*.006428),E<.05&&(E=.05),Math.max(0,Math.floor(p*E))},cn={A:{champ:3e7,vice:2e7,third:15e6,mid:8e6,rel:5e6},B:{champ:12e6,vice:8e6,mid:5e6,rel:3e6},C:{champ:7e6,vice:5e6,mid:3e6,rel:15e5},D:{champ:35e5,vice:25e5,mid:12e5,rel:5e5},VARZEA:{champ:1e6,vice:8e5,third:6e5,mid:2e5}};function du(t,e){const{user:a,setModal:n,conf:i,setLoading:r,players:o,teams:d,companies:p,sps:m,coaches:E}=t,T=(...te)=>e.postNews(...te);return{adminAction:async(te,P)=>{if(te==="EDIT_PRIZES"){n({type:"EDIT_PRIZES",data:i.prizes||cn});return}if(te==="MARKET"&&(h.collection("config").doc("system").update({marketOpen:P}),T(P?"📢 JANELA ABERTA":"🔒 JANELA FECHADA","infra")),te==="VARZEA"&&(h.collection("config").doc("system").update({varzeaOpen:P}),T(P?`🔓 **INSCRIÇÕES ABERTAS!**
A Várzea voltou a aceitar novos times!`:`🛑 **INSCRIÇÕES ENCERRADAS!**
O limite de times na Várzea foi atingido. Apenas na próxima temporada!`,"infra")),te==="WEEK"){if(!confirm(`⚠️ VIRAR SEMANA?

1. Pagar Salários (+)
2. Cobrar Imposto Jogador (3%)
3. Recuperar Energia (100%)
4. Empresas, Técnicos e XP`))return;r(!0);const k=h.batch();o.forEach(g=>{if(g.teamId&&g.teamId!=="FREE"&&d.some(O=>O.id===g.teamId)){const O=parseFloat(g.balance)||0,w=parseFloat(g.salary)||0,l=O*.03,f=g.healthPlan&&g.healthPlan.cost||0;let y=0;if(g.personalSponsor){const D=g.personalSponsor.companyId,_=p.find(z=>z.id===D),N=parseFloat(g.personalSponsor.value)||0;_&&_.status==="ACTIVE"&&(_.balance||0)>=N?(y=N,k.update(h.collection("companies").doc(D),{balance:Z.firestore.FieldValue.increment(-N)})):(k.update(h.collection("players").doc(g.id),{personalSponsor:Z.firestore.FieldValue.delete(),mood:"😡"}),h.collection("news").add({text:`📉 **CALOTE!** A empresa **${g.personalSponsor.companyName}** não teve fundos para pagar o patrocínio de **${g.name}** e o contrato foi rompido!`,type:"press",date:Date.now(),likes:[]}))}const C=O+w+y-l-f,x=(g.xp||0)+(g.pendingXP||0);k.update(h.collection("players").doc(g.id),{balance:C,energy:100,xp:x,pendingXP:0})}}),d.forEach(g=>{const O=parseFloat(g.balance)||0,w=o.filter(v=>v.teamId===g.id),l=m.filter(v=>v.teamId===g.id&&v.status==="ACTIVE").reduce((v,ne)=>v+parseFloat(ne.value),0),y={A:65e4,B:5e5,C:4e5,D:3e5,VARZEA:1e5}[g.serie||"VARZEA"]||1e5,x=cu(g,w)*(g.socioPrice||40),D=y+l+x,_=w.reduce((v,ne)=>v+(parseFloat(ne.salary)||0),0),N=E.filter(v=>v.teamId===g.id&&v.status==="ACTIVE").reduce((v,ne)=>v+(parseFloat(ne.salary)||0),0),z=g.healthPlan&&g.healthPlan.cost||0,W=g.stadiumLevel||1,oe=St[W]?St[W].maint:0;let ae={},le=0,ue=0,K=0;if(g.bankInvestment&&g.bankInvestment.amount>0){const v=g.bankInvestment.amount;K=v*.02;const ne=Math.max(0,(g.bankInvestment.weeksLocked||0)-1);ae.bankInvestment={amount:v+K,weeksLocked:ne}}if(g.bankLoan&&g.bankLoan.installments>0){le=g.bankLoan.weeklyPayment;const v=g.bankLoan.installments-1;v<=0?ae.bankLoan=Z.firestore.FieldValue.delete():ae.bankLoan={...g.bankLoan,installments:v}}if(g.stadiumLoan&&g.stadiumLoan.installments>0){ue=g.stadiumLoan.weeklyPayment;const v=g.stadiumLoan.installments-1;v<=0?ae.stadiumLoan=Z.firestore.FieldValue.delete():ae.stadiumLoan={...g.stadiumLoan,installments:v}}const G=_+N+z+oe+le+ue;ae.balance=O+D-G;let j=`🟢 RECEITAS:
`;j+=`+ Federação/TV: ${ie(y)}
`,x>0&&(j+=`+ Sócios-Torcedores: ${ie(x)}
`),l>0&&(j+=`+ Patrocinadores: ${ie(l)}
`),j+=`
🔴 DESPESAS:
`,_>0&&(j+=`- Salários (Elenco): ${ie(_)}
`),N>0&&(j+=`- Salários (Comissão): ${ie(N)}
`),z>0&&(j+=`- Convênio Médico: ${ie(z)}
`),oe>0&&(j+=`- Manutenção Arena: ${ie(oe)}
`),le>0&&(j+=`- Parcela Empréstimo: ${ie(le)}
`),ue>0&&(j+=`- Parcela Arena: ${ie(ue)}
`);const Y=D-G;j+=`
⚖️ RESULTADO FINAL: ${Y>=0?"Lucro de "+ie(Y):"Prejuízo de "+ie(Y)}`,K>0&&(j+=`

📈 Sua Renda Fixa rendeu +${ie(K)} (O valor continua aplicado no Banco).`);let S=[...g.trainingLogs||[]];S.unshift({date:Date.now(),type:"📊 BALANÇO FINANCEIRO",report:j}),S.length>15&&S.pop(),ae.trainingLogs=S,k.update(h.collection("teams").doc(g.id),ae)});const R=h.collection("news").doc();k.set(R,{text:`💰 **COTAS DA FEDERAÇÃO PAGAS!**
O apoio financeiro semanal foi depositado. Diretorias, confiram o Extrato no Diário Oficial do Clube (CT) para ver os lucros e despesas de sua equipe.`,date:Date.now(),type:"money",likes:[]}),p.forEach(g=>{if(g.status==="ACTIVE"){const O=parseFloat(g.balance)||0,w=g.companyType||"COMERCIO",l=(ka[w]||{}).tax||5e4;k.update(h.collection("companies").doc(g.id),{balance:O-l})}}),(await h.collection("users").where("type","in",["COACH","DOCTOR","SCOUT","ASSISTANT"]).get()).docs.forEach(g=>{const O=g.data();let w={trainingsLeft:2};if(O.teamId&&O.teamId!=="FREE")if(d.some(f=>f.id===O.teamId)){const f=parseFloat(O.balance)||0;w.balance=f+parseFloat(O.salary)}else w.teamId="FREE",w.contract=0;k.update(h.collection("users").doc(g.id),w)}),(await h.collection("debts").get()).docs.forEach(g=>{const O=g.data(),w=d.some(f=>f.id===O.buyerId),l=d.some(f=>f.id===O.sellerId);!w||!l?k.delete(g.ref):O.weeksRemaining>0&&(k.update(h.collection("teams").doc(O.buyerId),{balance:Z.firestore.FieldValue.increment(-O.installmentVal)}),k.update(h.collection("teams").doc(O.sellerId),{balance:Z.firestore.FieldValue.increment(O.installmentVal)}),O.weeksRemaining-1===0?(k.delete(g.ref),T(`✅ **DÍVIDA QUITADA**
${O.buyerName} terminou de pagar ${O.playerName}.`,"money")):(k.update(g.ref,{weeksRemaining:O.weeksRemaining-1}),T(`💳 **PARCELA PAGA**
${O.buyerName} pagou a parcela (${O.weeksRemaining}x) de ${O.playerName}.`,"money-minus")))});try{await k.commit(),alert("Semana processada! Salários pagos e treinos resetados.")}catch(g){alert("Erro: "+g.message)}r(!1)}if(te==="SEASON"){if(!confirm(`⚠️ VIRAR TEMPORADA?

1. Evoluir Atributos (XP)
2. Envelhecer Contratos
3. Processar Retornos
4. Envelhecer Técnicos`))return;r(!0);const k=h.batch();o.forEach(A=>{let b={};const g=(A.xp||0)+(A.pendingXP||0),O=Math.floor(g/100),w=g%100;if(A.attributes&&O!==0){let f={...A.attributes};const y=Object.keys(f),C=Math.abs(O),x=O>0;for(let N=0;N<C;N++){const z=y[Math.floor(Math.random()*y.length)];x?f[z]<99&&f[z]++:f[z]>1&&f[z]--}b.attributes=f;const D=Object.values(f),_=Math.round(D.reduce((N,z)=>N+z,0)/D.length);b.overall=_,b.xp=w,b.pendingXP=0}else b.xp=0,b.pendingXP=0;let l=(parseInt(A.contract)||0)-1;if(l<0&&(l=0),b.contract=l,l===0&&A.loanMeta&&A.loanMeta.ownerId){const f=A.loanMeta.ownerId,y=d.find(C=>C.id===f);if(A.loanMeta.hasBuyOption&&A.loanMeta.buyOpt>0){const C=d.find(D=>D.id===A.teamId),x=h.collection("offers").doc();k.set(x,{type:"COMPRA_DEFINITIVA",playerId:A.id,playerName:A.name,buyerId:A.teamId,buyerName:(C==null?void 0:C.name)||"Clube Atual",sellerId:f,recipientId:A.teamId,value:A.loanMeta.buyOpt,status:"PENDING",description:`🏁 **FIM DE EMPRÉSTIMO**
Deseja exercer a opção de compra de **${A.name}** por ${ie(A.loanMeta.buyOpt)}?
Caso recuse, o jogador retornará ao clube de origem.`,date:Date.now(),isLoanOption:!0}),b.status="INTRANSFERIVEL"}else{let C=(parseInt(A.loanMeta.originalContract)||1)-1;if(C<=0){const x=h.collection("offers").doc();k.set(x,{type:"RENOVACAO_URGENTE",playerId:A.id,playerName:A.name,buyerId:f,buyerName:(y==null?void 0:y.name)||"Clube de Origem",sellerId:"SISTEMA",recipientId:f,status:"PENDING",description:`⚠️ **URGENTE: FIM DE VÍNCULO**
O empréstimo de **${A.name}** acabou e ele está sem contrato com você.`,date:Date.now()}),b.teamId=f,b.contract=0,b.status="INTRANSFERIVEL"}else{b.teamId=f,b.contract=C,b.status="NAO_A_VENDA";const x=h.collection("offers").doc();k.set(x,{type:"NOTIFICACAO",playerId:A.id,playerName:A.name,buyerName:"Sistema",recipientId:f,status:"PENDING",description:`🔙 **RETORNO DE EMPRÉSTIMO**
O jogador **${A.name}** retornou ao seu elenco.

📄 Contrato Restante: ${C} temporada(s).`,date:Date.now()}),T(`🔙 **RETORNO**
${A.name} voltou ao ${y==null?void 0:y.name} (${C} anos rest.).`,"transfer")}b.loanMeta=Z.firestore.FieldValue.delete()}}else l===0&&(!A.loanMeta||!A.loanMeta.ownerId)&&(A.preContract&&d.some(f=>f.id===A.preContract.teamId)?(b.teamId=A.preContract.teamId,b.contract=2,b.status="NAO_A_VENDA",b.preContract=Z.firestore.FieldValue.delete()):(b.teamId="FREE",b.status="VENDA",b.mood="😐",b.loanMeta=Z.firestore.FieldValue.delete()));k.update(h.collection("players").doc(A.id),b)}),(await h.collection("users").where("type","==","COACH").get()).docs.forEach(A=>{const b=A.data();if(b.teamId&&b.teamId!=="FREE"){const g=(b.contract||1)-1;g<=0?k.update(h.collection("users").doc(A.id),{teamId:"FREE",contract:0,salary:2500}):k.update(h.collection("users").doc(A.id),{contract:g})}});try{await k.commit(),alert("Temporada virada! Jogadores e técnicos atualizados.")}catch(A){alert("Erro: "+A.message)}r(!1),T(`💪 **PRÉ-TEMPORADA**
Os jogadores treinaram e contratos foram renovados!`,"season")}},resetDatabase:async()=>{if(!Sa(a))return alert("Somente o ADM principal pode resetar o jogo.");if(prompt("⚠️ PERIGO: Isso apagará TODOS os dados do jogo. Digite RESETAR para confirmar:")!=="RESETAR"||!confirm("TEM CERTEZA? Todos os times, jogadores e finanças sumirão para sempre!"))return;r(!0);const P=["teams","players","users","news","offers","sponsorships","sales","debts","financeRequests","products","companies","journalists","newspapers","nationalTeams","nationalMatches","nationalCompetitions","nationalWindows"];try{let k=[h.batch()],R=0;for(const A of P)(await h.collection(A).get()).docs.forEach(g=>{R>=450&&(k.push(h.batch()),R=0),k[k.length-1].delete(g.ref),R++});for(let A of k)await A.commit();alert("💥 BANCO DE DADOS RESETADO! O sistema irá reiniciar."),window.location.reload()}catch(k){alert("Erro ao resetar: "+k.message)}r(!1)},approveTeam:async(te,P)=>{await h.collection("teams").doc(te).update({status:"ACTIVE",balance:parseFloat(P)});const k=d.find(R=>R.id===te);T(`🛡️ **NOVO CLUBE!**
O **${k.name}** foi aprovado na Série ${k.serie}.`,"infra"),alert("Aprovado!")},deleteTeam:async te=>{if(!confirm("⚠️ PERIGO: Excluir time e jogadores?"))return;const P=h.batch();P.delete(h.collection("teams").doc(te)),(await h.collection("players").where("teamId","==",te).get()).docs.forEach(R=>P.delete(R.ref)),await P.commit(),T(`🚫 **CLUBE EXTINTO**
Um time encerrou atividades.`,"infra")},deletePaper:async te=>{if(!confirm("Excluir Jornal e demitir jornalistas?"))return;const P=h.batch();P.delete(h.collection("newspapers").doc(te)),(await h.collection("journalists").where("newspaperId","==",te).get()).docs.forEach(R=>P.delete(R.ref)),await P.commit(),alert("Jornal fechado!")},deleteJournalist:async te=>{confirm("Demitir Jornalista?")&&(await h.collection("journalists").doc(te).delete(),alert("Demitido!"))}}}const dn={GOL:{train:"GOLEIRO",attrs:["gk","response","jump"]},ZAG:{train:"DEFESA",attrs:["defense","aggression","header"]},LD:{train:"VELOCIDADE",attrs:["speed","stamina","shortPass"]},LE:{train:"VELOCIDADE",attrs:["speed","stamina","shortPass"]},VOL:{train:"DEFESA",attrs:["defense","shortPass","stamina"]},MC:{train:"PASSE",attrs:["shortPass","longPass","teamwork"]},MD:{train:"DRIBLE",attrs:["dribble","speed","tech"]},ME:{train:"DRIBLE",attrs:["dribble","speed","tech"]},MEI:{train:"PASSE",attrs:["tech","shortPass","agility"]},PTD:{train:"VELOCIDADE",attrs:["speed","accel","dribble"]},PTE:{train:"VELOCIDADE",attrs:["speed","accel","dribble"]},ATA:{train:"CHUTE",attrs:["shot","shotPower","header"]},SA:{train:"CHUTE",attrs:["attack","shot","dribble"]}},Dn=["Vale do Mato","Lua Mare","Rio Manso","Serra Verde","Lagoa Azul"];function uu(t,e){const{setModal:a,setLoading:n,teams:i,conf:r,players:o,user:d}=t,p=(...F)=>e.postNews(...F);return{handleSaveMatch:async F=>{if(!F){a(null);return}n(!0);try{F.id?(await h.collection("matches").doc(F.id).update(F),alert("Partida atualizada!")):(await h.collection("matches").add(F),alert("Partida criada!")),a(null)}catch(Q){alert("Erro: "+Q.message)}n(!1)},handleDeleteMatch:async F=>{confirm("Tem certeza que deseja excluir esta partida permanentemente?")&&(await h.collection("matches").doc(F).delete(),a(null),alert("Partida excluída."))},generateFixtures:async()=>{if(!confirm("Gerar tabela de jogos para TODAS as séries (A, B, C, D e Várzea)?"))return;n(!0);const F=Z.firestore();let Q=[F.batch()],ee=0;const te=()=>(ee>=450&&(Q.push(F.batch()),ee=0),ee++,Q[Q.length-1]);try{["A","B","C","D","VARZEA"].forEach(k=>{const R=i.filter(g=>g.serie===k&&g.status==="ACTIVE");if(R.length<2)return;const A=(R.length-1)*2;let b=R.map(g=>g.id);b.length%2!==0&&b.push(null);for(let g=0;g<A;g++){const O=g>=A/2;for(let w=0;w<b.length/2;w++){let l=b[w],f=b[b.length-1-w];if(!l||!f)continue;O&&([l,f]=[f,l]);const y=i.find(x=>x.id===l),C=i.find(x=>x.id===f);te().set(F.collection("matches").doc(),{serie:k,round:g+1,homeId:l,homeName:y.name,homeLogo:y.logo||null,awayId:f,awayName:C.name,awayLogo:C.logo||null,scoreHome:0,scoreAway:0,status:"PENDING",played:!1})}b.splice(1,0,b.pop())}}),Dn.forEach(k=>{const R=i.filter(g=>g.estado===k&&g.status==="ACTIVE");if(R.length<2)return;const A=R.length-1;let b=R.map(g=>g.id);b.length%2!==0&&b.push(null);for(let g=0;g<A;g++){for(let O=0;O<b.length/2;O++){let w=b[O],l=b[b.length-1-O];if(!w||!l)continue;Math.random()>.5&&([w,l]=[l,w]);const f=i.find(C=>C.id===w),y=i.find(C=>C.id===l);te().set(F.collection("matches").doc(),{serie:"ESTADUAL",estado:k,round:`Fase 1 (Rod. ${g+1})`,homeId:w,homeName:f.name,homeLogo:f.logo||null,awayId:l,awayName:y.name,awayLogo:y.logo||null,scoreHome:0,scoreAway:0,status:"PENDING",played:!1,isEstadual:!0})}b.splice(1,0,b.pop())}});for(let k of Q)await k.commit();n(!1),p(`📅 **TABELA DIVULGADA!**
A Federação liberou o calendário de jogos da temporada (incluindo Várzea).`,"infra"),alert("Jogos gerados com sucesso e sem travamentos!")}catch(P){n(!1),console.error(P),alert("Erro ao gerar tabela: "+P.message)}},handleSeasonTurnAdvanced:async()=>{var G,j,Y;if(!confirm(`⚠️ ATENÇÃO: Isso encerrará a temporada atual!

1. Pagará Premiações Finais
2. Aplica Promoção/Rebaixamento
3. Evolui Atributos e Overall (XP)
4. Envelhece contratos e Zera estatísticas`))return;n(!0);const F=Z.firestore(),Q=r.season||1;let ee=[F.batch()],te=0;const P=()=>(te>=450&&(ee.push(F.batch()),te=0),te++,ee[ee.length-1]),k=S=>S.sort((v,ne)=>{var ce,ge,ve,fe,Le,_e,Ee,et,ta,aa;const L=((ce=v.stats)==null?void 0:ce.pts)||0,X=((ge=ne.stats)==null?void 0:ge.pts)||0;if(L!==X)return X-L;const Ae=((ve=v.stats)==null?void 0:ve.wins)||0,I=((fe=ne.stats)==null?void 0:fe.wins)||0;if(Ae!==I)return I-Ae;const H=(((Le=v.stats)==null?void 0:Le.gf)||0)-(((_e=v.stats)==null?void 0:_e.ga)||0),J=(((Ee=ne.stats)==null?void 0:Ee.gf)||0)-(((et=ne.stats)==null?void 0:et.ga)||0);if(H!==J)return J-H;const Ce=((ta=v.stats)==null?void 0:ta.cards)||0,re=((aa=ne.stats)==null?void 0:aa.cards)||0;return Ce-re}),R=k(i.filter(S=>S.serie==="A"&&S.status!=="PENDING")),A=k(i.filter(S=>S.serie==="B"&&S.status!=="PENDING")),b=k(i.filter(S=>S.serie==="C"&&S.status!=="PENDING")),g=k(i.filter(S=>S.serie==="D"&&S.status!=="PENDING")),O=k(i.filter(S=>S.serie==="VARZEA"&&S.status!=="PENDING")),w=r.prizes||cn,l=(S,v,ne)=>{const L=v+1,X=(S==="A"||S==="B"||S==="C")&&v>=ne-2,Ae=S==="D"&&v>=ne-3,I=w[S]||cn[S];return S==="A"?L===1?I.champ:L===2?I.vice:L===3?I.third:X?I.rel:I.mid:S==="B"||S==="C"?L===1?I.champ:L===2?I.vice:X?I.rel:I.mid:S==="D"?L===1?I.champ:L===2?I.vice:Ae?I.rel:I.mid:S==="VARZEA"?L===1?I.champ:L===2?I.vice:L===3?I.third:I.mid:0},f=(S,v)=>{S.forEach((ne,L)=>{const X=l(v,L,S.length);P().update(F.collection("teams").doc(ne.id),{balance:Z.firestore.FieldValue.increment(X)})})};f(R,"A"),f(A,"B"),f(b,"C"),f(g,"D"),f(O,"VARZEA");const y=R[0],C=A[0],x=b[0],D=g[0],_=O[0],N=[...o].sort((S,v)=>(v.stats&&v.stats.goals||0)-(S.stats&&S.stats.goals||0))[0],z=[...o].sort((S,v)=>(v.stats&&v.stats.assists||0)-(S.stats&&S.stats.assists||0))[0],W=[...o].sort((S,v)=>(v.stats&&v.stats.saves||0)-(S.stats&&S.stats.saves||0))[0],oe=[...o].filter(S=>S.pressRatingCount>0).sort((S,v)=>(v.pressRatingAvg||0)-(S.pressRatingAvg||0))[0],ae=F.collection("hallOfFame").doc(`season_${Q}`);P().set(ae,{season:Q,date:Date.now(),champA:y?{name:y.name,logo:y.logo}:null,champB:C?{name:C.name,logo:C.logo}:null,champC:x?{name:x.name,logo:x.logo}:null,champD:D?{name:D.name,logo:D.logo}:null,champVarzea:_?{name:_.name,logo:_.logo}:null,topScorer:N&&((G=N.stats)==null?void 0:G.goals)>0?{name:N.name,face:N.face,val:N.stats.goals}:null,topAssist:z&&((j=z.stats)==null?void 0:j.assists)>0?{name:z.name,face:z.face,val:z.stats.assists}:null,topSaves:W&&((Y=W.stats)==null?void 0:Y.saves)>0?{name:W.name,face:W.face,val:W.stats.saves}:null,topRating:oe?{name:oe.name,face:oe.face,val:oe.pressRatingAvg}:null}),(R.length>0||A.length>0)&&(R.slice(-2).forEach(S=>P().update(F.collection("teams").doc(S.id),{serie:"B"})),A.slice(0,2).forEach(S=>P().update(F.collection("teams").doc(S.id),{serie:"A"})),A.slice(-2).forEach(S=>P().update(F.collection("teams").doc(S.id),{serie:"C"})),b.slice(0,2).forEach(S=>P().update(F.collection("teams").doc(S.id),{serie:"B"})),b.slice(-2).forEach(S=>P().update(F.collection("teams").doc(S.id),{serie:"D"})),g.slice(0,2).forEach(S=>P().update(F.collection("teams").doc(S.id),{serie:"C"})),g.slice(-3).forEach(S=>P().update(F.collection("teams").doc(S.id),{serie:"VARZEA"})),O.slice(0,3).forEach(S=>P().update(F.collection("teams").doc(S.id),{serie:"D"}))),i.forEach(S=>{P().update(F.collection("teams").doc(S.id),{stats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0}})}),P().update(F.collection("config").doc("system"),{season:Q+1});const le=S=>S==="GOL"?["gk","response","jump","longPass","balance","condition"]:S.includes("ZAG")?["defense","header","balance","jump","aggression","stamina"]:S.includes("LAT")||S.includes("LD")||S.includes("LE")?["speed","accel","stamina","shortPass","dribble","defense"]:S.includes("VOL")||S.includes("MC")||S==="MD"||S==="ME"?["shortPass","stamina","teamwork","defense","balance","tech"]:S.includes("MEI")||S.includes("MAT")?["dribble","shortPass","vision","tech","curve","agility"]:S==="PTD"||S==="PTE"?["speed","accel","dribble","agility","curve","stamina"]:S.includes("ATA")||S.includes("SA")||S.includes("PNT")?["shot","attack","header","shotPower","balance","speed"]:["stamina","balance","speed","shortPass","dribble","shot"],ue=S=>S<=50?50:S<=60?80:S<=70?150:S<=80?300:S<=85?600:S<=90?1e3:2e3;o.forEach(S=>{let v={stats:{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0},pressRatingSum:0,pressRatingCount:0,pressRatingAvg:0},ne=(S.xp||0)+(S.pendingXP||0);const L=S.position||"ATA",X=ue(S.overall||50);let Ae=ne>=0,I=Math.abs(ne),H=Math.floor(I/X),J=Ae?I%X:-(I%X);if(S.attributes&&H!==0){let re={...S.attributes};const ce=Object.keys(ln),ge=le(L);for(let _e=0;_e<H;_e++){let Ee;Math.random()<.75?Ee=ge[Math.floor(Math.random()*ge.length)]:Ee=ce[Math.floor(Math.random()*ce.length)],L==="GOL"&&["shot","attack","dribble","curve","freeKick","weakFootAcc"].includes(Ee)&&(Ee="gk"),L!=="GOL"&&Ee==="gk"&&(Ee=ge[0]),re[Ee]===void 0&&(re[Ee]=50),Ae?re[Ee]<99&&re[Ee]++:re[Ee]>1&&re[Ee]--}const ve=L==="GOL"?["shot","attack","dribble","curve","freeKick","weakFootAcc","weakFootFreq"]:["gk"];let fe=0,Le=0;Object.entries(re).forEach(([_e,Ee])=>{!ve.includes(_e)&&ln[_e]&&(fe+=Ee,Le++)}),v.attributes=re,v.overall=Le===0?S.overall:Math.round(fe/Le),v.xp=J,v.pendingXP=0}else v.xp=J,v.pendingXP=0;if(S.pendingPosBoosts&&S.attributes){let re=v.attributes?{...v.attributes}:{...S.attributes};S.pendingPosBoosts.forEach(Le=>{const _e=dn[Le];_e&&_e.attrs.forEach(Ee=>{re[Ee]<99&&(re[Ee]=Math.min(99,re[Ee]+3))})}),v.attributes=re;const ge=(S.position||"ATA")==="GOL"?["shot","attack","dribble","curve","freeKick","weakFootAcc","weakFootFreq"]:["gk"];let ve=0,fe=0;Object.entries(re).forEach(([Le,_e])=>{ge.includes(Le)||(ve+=_e,fe++)}),v.overall=fe===0?S.overall:Math.round(ve/fe),v.pendingPosBoosts=Z.firestore.FieldValue.delete()}let Ce=(parseInt(S.contract)||0)-1;Ce<0&&(Ce=0),Ce===0?!S.loanMeta||!S.loanMeta.ownerId?(v.contract=0,v.teamId="FREE",v.status="VENDA",v.mood="😐"):(v.teamId=S.loanMeta.ownerId,v.contract=parseInt(S.loanMeta.originalContract)>0?parseInt(S.loanMeta.originalContract):1,v.status="NAO_A_VENDA",v.loanMeta=Z.firestore.FieldValue.delete()):v.contract=Ce,P().update(F.collection("players").doc(S.id),v)}),(await F.collection("users").where("type","in",["COACH","DOCTOR","SCOUT","ASSISTANT"]).get()).docs.forEach(S=>{const v=S.data();if(v.teamId&&v.teamId!=="FREE"){const ne=(v.contract||1)-1;ne<=0?P().update(S.ref,{teamId:"FREE",contract:0,salary:2500}):P().update(S.ref,{contract:ne})}});try{for(let S of ee)await S.commit();n(!1),p(`🏆 **FIM DA TEMPORADA ${Q}!**
As premiações foram depositadas! Parabéns aos campeões:

🥇 Série A: ${(y==null?void 0:y.name)||"Ninguém"}
🥈 Série B: ${(C==null?void 0:C.name)||"Ninguém"}
🥉 Série C: ${(x==null?void 0:x.name)||"Ninguém"}
🏅 Série D: ${(D==null?void 0:D.name)||"Ninguém"}`,"finance"),alert(`Temporada ${Q} encerrada com sucesso!

Premiações pagas, acessos e descensos definidos, atributos evoluídos e Museu atualizado!`)}catch(S){n(!1),alert("Erro na virada: "+S.message)}},saveTactics:async(F,Q)=>{await h.collection("teams").doc(d.data.teamId).update({tactics:{formation:F,lineup:Q}}),alert("Escalação salva na súmula!")},saveMatchStats:async(F,Q,ee,te=null,P=null)=>{let k=[];if(Q&&Q.goals!==void 0?k=[{player:F,match:Q,xpOverride:ee}]:k=Array.isArray(F)?F:[F],k.length===0)return alert("Nenhum dataPayload para salvar.");n(!0);const R=h.batch();let A=0;const b={GOAL:20,ASSIST:15,TACKLE:10,SAVE:12,WIN:30,DRAW:10,LOSS:-10,YELLOW:-10,RED:-30,RATING_MULT:5};if(k.forEach(l=>{var j,Y,S,v,ne,L;const{player:f,match:y,xpOverride:C}=l;if(!f||!y)return;let x=0;C!==void 0?x=C:(x+=(y.goals||0)*b.GOAL,x+=(y.assists||0)*b.ASSIST,x+=(y.tackles||0)*b.TACKLE,x+=(y.saves||0)*b.SAVE,x+=(y.yellows||0)*b.YELLOW,x+=(y.reds||0)*b.RED,y.result==="VITORIA"&&(x+=b.WIN),y.result==="EMPATE"&&(x+=b.DRAW),y.result==="DERROTA"&&(x+=b.LOSS),x+=(parseFloat(y.rating)||0)*b.RATING_MULT);const D=parseInt(x),_=h.collection("players").doc(f.id),N={goals:(((j=f.stats)==null?void 0:j.goals)||0)+(y.goals||0),assists:(((Y=f.stats)==null?void 0:Y.assists)||0)+(y.assists||0),tackles:(((S=f.stats)==null?void 0:S.tackles)||0)+(y.tackles||0),saves:(((v=f.stats)==null?void 0:v.saves)||0)+(y.saves||0),yellows:(((ne=f.stats)==null?void 0:ne.yellows)||0)+(y.yellows||0),reds:(((L=f.stats)==null?void 0:L.reds)||0)+(y.reds||0)},z=f.pressRatingSum||0,W=f.pressRatingCount||0,oe=z+parseFloat(y.rating||0),ae=W+1,le=oe/ae,ue={stats:N,pendingXP:(f.pendingXP||0)+D,pressRatingSum:oe,pressRatingCount:ae,pressRatingAvg:parseFloat(le.toFixed(1)),energy:Math.max(0,(f.energy||100)-25)};y.injury&&(y.recoveryLeft||0)>0&&(ue.injury=y.injury,ue.recoveryLeft=parseInt(y.recoveryLeft),ue.mood="😡");const K=P?P.serie:y.serie;if(K&&!["A","B","C","D","VARZEA"].includes(K)){const X=K,Ae=f.tournaments||{},I=Ae[X]||{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0,ratingSum:0,ratingCount:0};ue.tournaments={...Ae,[X]:{goals:I.goals+(y.goals||0),assists:I.assists+(y.assists||0),tackles:I.tackles+(y.tackles||0),saves:I.saves+(y.saves||0),yellows:I.yellows+(y.yellows||0),reds:I.reds+(y.reds||0),ratingSum:I.ratingSum+(parseFloat(y.rating)||0),ratingCount:I.ratingCount+1}}}R.update(_,ue),A++}),te&&te.id&&P&&!P.neutralFinal){const l=te.stadiumLevel||1,f=St[l]||St[1],y=te.ticketPrice||f.minTic,C=1-(y-f.minTic)/(f.maxTic-f.minTic||1)*.6,x=(Math.floor(Math.random()*41)+80)/100;let D=Math.floor(f.cap*C*x);D>f.cap&&(D=f.cap);const _=D*y,N=[0,.05,.1,.15,.2,.25][l]||.05;let z=0;const oe=[...te.storeProducts||[]].map(le=>{let ue=1;le.price>30&&(ue=Math.max(.05,30/le.price));const K=Math.floor(D*N*ue),G=Math.min(K,le.stock);return z+=G*le.price,{...le,stock:le.stock-G}}),ae=h.collection("teams").doc(te.id);R.update(ae,{balance:Z.firestore.FieldValue.increment(_),storeBalance:Z.firestore.FieldValue.increment(z),storeProducts:oe})}const g={};let O=0;k.forEach(l=>{l.player&&l.player.teamId&&l.player.teamId!=="FREE"&&(g[l.player.teamId]=l.match.result,O+=l.match.goals||0)});const w=Object.keys(g)[0];if(Object.keys(g).forEach(l=>{if(g[l]!=="NENHUM"){const f=i.find(y=>y.id===l);if(f){let y={},C=f.recentForm||[];C.unshift(g[l]),C.length>5&&C.pop(),y.recentForm=C;const x=P&&P.isEstadual;if(["A","B","C","D","VARZEA"].includes(f.serie)||x){let N={...x?f.stateStats||{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}:f.stats||{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0}};N.gf+=O,g[l]==="VITORIA"?(N.pts+=3,N.wins+=1):g[l]==="EMPATE"?(N.pts+=1,N.draws+=1):g[l]==="DERROTA"&&(N.losses+=1),x?y.stateStats=N:y.stats=N}R.update(h.collection("teams").doc(l),y)}}}),P&&P.id&&w){let l={};w===P.homeId?l.scoreHome=O:w===P.awayId&&(l.scoreAway=O),l.status="FINISHED",R.update(h.collection("matches").doc(P.id),l)}await R.commit(),n(!1),a(null),alert(`${A} súmula(s) lançada(s) com sucesso!${te&&!(P!=null&&P.neutralFinal)?`
🏟️ Bilheteria e vendas da Loja contabilizadas!`:""}`)}}}const Si=[{minOv:0,maxOv:45,minSal:500,maxSal:1500,label:"Várzea/Amador"},{minOv:46,maxOv:55,minSal:1500,maxSal:6e3,label:"Iniciante"},{minOv:56,maxOv:65,minSal:5e3,maxSal:18e3,label:"Profissional"},{minOv:66,maxOv:75,minSal:15e3,maxSal:45e3,label:"Estrela"},{minOv:76,maxOv:85,minSal:4e4,maxSal:11e4,label:"Craque"},{minOv:86,maxOv:99,minSal:1e5,maxSal:3e5,label:"Lenda"}],hu=t=>{const e=parseInt(t)||0;return Si.find(a=>e>=a.minOv&&e<=a.maxOv)||Si[0]},pu=(t,e,a)=>{const n=hu(a.overall).minSal,i=parseFloat(t.meta.newSalary)||0,r=e.recentForm||[],o=r.filter(E=>E==="VITORIA").length,d=r.filter(E=>E==="DERROTA").length;let p=1;d>o&&(p=1.2),o>d&&(p=.9);const m=n*p;return i>=m?{decision:"ACCEPT",message:`🤖 O empresário de ${a.name} achou a oferta excelente e aceitou os termos contratuais!`}:i>=m*.8?{decision:"COUNTER",counterValue:m,message:`🤖 O jogador tem interesse no ${e.name}, mas pede um ajuste salarial para ${ie(m)}.`}:{decision:"REJECT",message:`🤖 A proposta salarial foi considerada muito baixa pelo staff de ${a.name}. Negociação encerrada.`}},mu={USER:"teams",PLAYER:"players",COACH:"users",DOCTOR:"users",SCOUT:"users",ASSISTANT:"users"},fu=new Set(["VEICULO","IMOVEL","TECNOLOGIA","LUXO"]);async function gu(t,e,{user:a,productId:n,sellerId:i,giftTarget:r,expectedPrice:o,now:d=Date.now()}){var Q;const p=mu[a==null?void 0:a.type];if(!p||!((Q=a.data)!=null&&Q.id))throw new Error("Entre em uma conta para comprar.");const m=t.collection(p).doc(a.data.id),E=t.collection("products").doc(n),T=t.collection("companies").doc(i),u=t.collection("sales").doc(),U=t.collection("news").doc(),B=r?t.collection("players").doc(r.id):m,F=new Date(d).toDateString();return t.runTransaction(async ee=>{const[te,P,k,R]=await Promise.all([ee.get(m),ee.get(E),ee.get(T),ee.get(B)]);if(![te,P,k,R].every(_=>_.exists))throw new Error("Conta, produto ou destinatário não encontrado.");const A=te.data(),b=P.data(),g=k.data(),O=R.data(),w=Number(b.price),l=Number(b.stock),f=Number(A.balance||0);if(!Number.isFinite(w)||w<0||!Number.isFinite(f))throw new Error("Preço ou saldo inválido.");if(w!==Number(o))throw new Error("O preço mudou. Abra o produto novamente antes de comprar.");if(b.companyId!==i||g.status!=="ACTIVE")throw new Error("Esta loja não está disponível.");if(!Number.isFinite(l)||l<1)throw new Error("Produto Esgotado!");if(f<w)throw new Error("Saldo insuficiente!");const y=A.giftTracker||{date:"",count:0},C=y.date===F&&Number(y.count)||0;if(r&&C>=7)throw new Error("Você atingiu o limite máximo de 7 presentes enviados por dia!");const x=fu.has(b.cat)?(parseInt(b.power)||0)*100:0,D={balance:e.increment(-w)};return r&&(D.giftTracker={date:F,count:C+1}),ee.update(m,D),ee.update(T,{balance:e.increment(w)}),ee.update(E,{stock:e.increment(-1)}),r&&x>0&&ee.update(B,{fame:e.increment(x)}),ee.set(u,{companyId:i,buyerId:B.id,buyerName:O.name||"",giftedBy:r?A.name||"":null,productOriginalId:n,productName:b.name||"",price:w,cost:0,profit:w,img:b.img||null,cat:b.cat||"",power:parseInt(b.power)||0,fameGained:x,date:d}),r&&(x>0||w>5e5)&&ee.set(U,{text:`🎁 **MIMO DE LUXO!**
O ${A.name} acabou de enviar um(a) **${b.name}** caríssimo(a) de presente para **${O.name}**! O que será que está por trás dessa generosidade? 👀`,type:"biz",date:d,likes:[]}),{fameBonus:x,balance:f-w,giftTracker:D.giftTracker||A.giftTracker}})}const Au={SAUDE:"💊 Saúde (+Energia)",CONSUMIVEL:"⚡ Consumível (+Energia)",CHUTEIRA:"👟 Chuteira (+XP Treino)",LUVAS:"🧤 Luvas (+XP Treino)",VEICULO:"🚗 Veículo (+Fama)",IMOVEL:"🏠 Imóvel (+Fama)",TECNOLOGIA:"📱 Tecnologia (+Fama)",LUXO:"💎 Luxo/Moda (+Fama)"};function Eu(t,e){const{coaches:a,user:n,setModal:i,products:r,sps:o,companies:d,buyingRef:p,setLoading:m,players:E,teams:T}=t,u=(...l)=>e.postNews(...l);return{handleSendCoachOffer:async(l,f,y,C)=>{const x=a.find(D=>D.id===l);x&&(await h.collection("offers").add({type:"COACH_OFFER",coachId:l,staffType:x.type,recipientId:l,senderId:n.data.id,teamId:n.data.id,teamName:n.data.name,coachName:x.name,salary:parseFloat(f),contract:parseInt(y),clause:parseFloat(C),status:"PENDING",createdAt:Date.now()}),i(null),alert(`Proposta enviada para ${x.name}!`))},handleCounterCoachOffer:async(l,f,y,C)=>{if(n.data.level<2)return alert("Apenas profissionais Nível 2+ podem negociar valores!");await h.collection("offers").doc(l.id).update({salary:parseFloat(f),contract:parseInt(y),clause:parseFloat(C),status:"COUNTERED",recipientId:l.teamId,senderId:n.data.id}),alert("Contra-proposta enviada ao clube!")},handleFinalizeCoachContract:async l=>{const f=l.teamId,y=l.coachId||(l.recipientId===f?l.senderId:l.recipientId),C=l.staffType||"COACH",D=(await h.collection("teams").doc(f).get()).data();if(D.balance<l.salary)return alert("O time não tem saldo para pagar as luvas (1º salário)!");const _=h.batch(),N=a.find(W=>W.teamId===f&&W.status==="ACTIVE"&&W.type===C);N&&_.update(h.collection("users").doc(N.id),{teamId:"FREE",contract:0});const z=parseFloat(l.luvas)||0;_.update(h.collection("users").doc(y),{teamId:f,salary:parseFloat(l.salary),contract:parseInt(l.contract),clause:parseFloat(l.clause),balance:Z.firestore.FieldValue.increment(z)}),_.update(h.collection("teams").doc(f),{balance:D.balance-l.salary-z}),_.delete(h.collection("offers").doc(l.id)),await _.commit(),alert(`Contrato assinado! ${l.coachName} agora integra o Staff do ${l.teamName}.`)},saveProduct:async l=>{const f=parseFloat(l.price),y={name:l.name,price:f,img:l.img,desc:l.desc,cat:l.cat||"CHUTEIRA",companyId:n.data.id,power:l.power||0,stock:parseInt(l.stock)||0};if(l.id){const C=r.find(x=>x.id===l.id);C&&f<C.price&&u(`🚨 **PROMOÇÃO!**
A **${n.data.name}** baixou o preço de **${l.name}**!
De: ${ie(C.price)} ➝ Por: ${ie(f)}`,"biz"),delete y.companyId,await h.collection("products").doc(l.id).update(y)}else await h.collection("products").add(y),u(`🛍️ **NOVIDADE**
A **${n.data.name}** lançou: **${l.name}** (${Au[y.cat]}) por ${ie(f)}.`,"biz")},requestSponsorship:async(l,f)=>{if(o.find(C=>C.companyId===l&&C.teamId===n.data.id))return alert("Já existe uma negociação ou contrato ativo com esta empresa.");const y=d.find(C=>C.id===l);await h.collection("sponsorships").add({companyId:l,companyName:y.name,teamId:n.data.id,teamName:n.data.name,value:parseFloat(f),status:"PENDING"}),alert("Proposta enviada para a empresa!")},processSponsorship:async(l,f)=>{f==="REJECTED"||f==="CANCELLED"?confirm(f==="REJECTED"?"Recusar proposta?":"Cancelar contrato?")&&await h.collection("sponsorships").doc(l.id).delete():f==="ACTIVE"&&(await h.collection("sponsorships").doc(l.id).update({status:"ACTIVE"}),u(`🤝 **NOVO PATROCÍNIO**
A **${n.data.name}** agora patrocina o **${l.teamName}**!`,"biz"))},buyProduct:async(l,f,y=null)=>{if(p.current)return;const C=Number(l.price);if(!Number.isFinite(C)||C<0)return alert("Preço inválido.");if(confirm(y?`Comprar ${l.name} como PRESENTE para ${y.name} por ${ie(C)}?`:`Comprar ${l.name} por ${ie(C)}?`)){p.current=!0,m(!0);try{const x=await gu(h,Z.firestore.FieldValue,{user:n,productId:l.id,sellerId:f.id,giftTarget:y,expectedPrice:C});let D=y?`✅ Presente enviado com sucesso para ${y.name}!`:"✅ Compra realizada com sucesso!";!y&&x.fameBonus>0&&(D+=`
🌟 FAMA +${x.fameBonus}`),alert(D)}catch(x){alert("Erro ao processar compra: "+x.message)}finally{p.current=!1,m(!1)}}},handleAcceptCoachOffer:async l=>{const f=l.teamId,y=n.data,x=(await h.collection("teams").doc(f).get()).data();if(x.balance<l.value)return alert("O time não tem mais saldo para te contratar! Proposta cancelada.");const D=h.batch(),_=a.find(N=>N.teamId===f&&N.status==="ACTIVE");_&&D.update(h.collection("users").doc(_.id),{teamId:"FREE"}),y.teamId&&y.teamId,D.update(h.collection("users").doc(y.id),{teamId:f,salary:l.value}),D.update(h.collection("teams").doc(f),{balance:x.balance-l.value}),D.delete(h.collection("offers").doc(l.id)),await D.commit(),alert(`Parabéns! Você agora é técnico do ${l.teamName}!`)},handleRejectCoachOffer:async l=>{await h.collection("offers").doc(l.id).delete(),alert("Proposta recusada.")},sendOffer:async(l,f,y,C,x,D,_)=>{const N=parseFloat(y)||0,z=parseInt(x)||1,W=n.data.name,oe=l.name,ae=parseFloat(D.newSalary)||0,le=D.role||"ROTACAO";if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(l.type))try{m(!0);const j=parseFloat(D.signingBonus)||0,Y=Z.firestore();return _&&_.id?await Y.collection("offers").doc(_.id).update({salary:ae,contract:z,luvas:j,status:"PENDING",recipientId:l.id,senderId:n.data.id}):await Y.collection("offers").add({type:"COACH_OFFER",coachId:l.id,staffType:l.type,recipientId:l.id,senderId:n.data.id,teamId:n.data.id,teamName:W,coachName:l.name,salary:ae,contract:z,clause:ae*10,luvas:j,status:"PENDING",createdAt:Date.now()}),m(!1),i(null),alert(`📋 Proposta formal enviada para ${l.name}! Aguarde a resposta na sua Caixa de Entrada.`)}catch{return m(!1),alert("Erro ao enviar proposta para a Comissão Técnica.")}if(l.isNPC&&n.type==="USER"){const j=E.filter(Y=>Y.teamId===n.data.id&&Y.isNPC).length;if(j>=7&&l.teamId!==n.data.id){alert(`🚫 LIMITE DA BASE ATINGIDO!
Você já tem 7/7 BOTS no elenco. Você só poderá contratar outro quando 1 deles sair do elenco.`);return}if(l.teamId!==n.data.id&&!confirm(`⚠️ AVISO DA BASE

Atualmente você tem ${j}/7 BOTS no elenco.
Tem certeza que quer enviar esta proposta para ${l.name}?

Assim que você completar 7 de 7, você só poderá contratar outro quando 1 deles sair do elenco.`))return}let K;const G=l.teamId==="FREE"||!l.teamId;if(_&&_.id?_.type==="RENOVACAO_URGENTE"?K=_.playerId:_.sellerAccepted===!0?K=n.data.id===_.buyerId?_.playerId:_.buyerId:K=n.data.id===_.buyerId?_.sellerId==="FREE"||!_.sellerId?_.playerId:_.sellerId:_.buyerId:f==="PRE_CONTRATO"||f==="RENOVACAO"?K=l.id:K=G?l.id:l.teamId,l.isNPC&&n.type==="USER"&&K===l.id){const j=T.find(S=>S.id===n.data.id),Y=pu({meta:{newSalary:ae}},j,l);if(Y.decision==="REJECT"){alert(Y.message);return}else if(Y.decision==="COUNTER")if(confirm(`${Y.message}

Você aceita pagar ${ie(Y.counterValue)} de salário para fechar negócio AGORA?`))D.newSalary=Y.counterValue;else{alert("Negociação cancelada. O jogador encerrou as conversas.");return}else Y.decision==="ACCEPT"&&alert(Y.message);try{m(!0);const S=Z.firestore(),v=S.batch(),ne=parseFloat(D.signingBonus)||0;return j.balance<ne?(m(!1),alert(`Seu clube não tem ${ie(ne)} no caixa para pagar as Luvas de Assinatura. O negócio melou!`)):(ne>0&&v.update(S.collection("teams").doc(n.data.id),{balance:Z.firestore.FieldValue.increment(-ne)}),v.update(S.collection("players").doc(l.id),{teamId:n.data.id,status:"NAO_A_VENDA",contract:z,salary:parseFloat(D.newSalary),role:le,balance:Z.firestore.FieldValue.increment(ne),history:Z.firestore.FieldValue.arrayUnion({date:Date.now(),from:G?"AGENTE LIVRE":"Clube Anterior",to:n.data.name,type:f,value:0})}),_&&_.id&&v.delete(S.collection("offers").doc(_.id)),await v.commit(),u(`🤝 **NOVA CONTRATAÇÃO!**
O Atleta da Base **${l.name}** aceitou os termos e assinou com o **${n.data.name}**!`,"transfer"),m(!1),i(null),alert(`Negócio fechado! ${l.name} já está no seu elenco.`))}catch(S){return m(!1),alert("Erro ao assinar com o Bot: "+S.message)}}try{let j=`💰 Taxa: ${ie(N)}
`;D.installments>1&&(j+=`📅 Parcelamento: ${D.installments}x de ${ie(N/D.installments)}
`),D.sellOn>0&&(j+=`📈 Revenda: ${D.sellOn}%
`),f==="PRE_CONTRATO"?j=`⚖️ **LEI BOSMAN (PRÉ-CONTRATO)**
O jogador virá a custo zero no início da próxima temporada.
`:f==="RENOVACAO"&&(j=`📝 **PROPOSTA DE RENOVAÇÃO**
A diretoria ofereceu um novo contrato.
`),j+=`📝 Contrato: ${z} anos
`,j+=`💵 Salário Sugerido: ${ie(ae)}/sem
`,j+=`👔 Papel: ${le}`;const Y={playerId:l.id,playerName:oe,buyerId:(_==null?void 0:_.buyerId)||n.data.id,buyerName:(_==null?void 0:_.buyerName)||W,sellerId:l.teamId||(_==null?void 0:_.sellerId)||"FREE",recipientId:K,type:(_==null?void 0:_.type)==="RENOVACAO_URGENTE"?"RENOVACAO":f,value:N,offerContract:z,description:j,status:"PENDING",sellerAccepted:_&&_.sellerAccepted||!1,meta:{...D,newSalary:ae,signingBonus:parseFloat(D.signingBonus)||0,role:le,installments:parseInt(D.installments)||1,sellOn:parseInt(D.sellOn)||0,hasBuyOption:D.hasBuyOption||!1},date:Date.now()},S=h.batch();_&&_.id&&S.delete(h.collection("offers").doc(_.id)),S.set(h.collection("offers").doc(),Y),await S.commit();const v=_&&_.id?"🔄 CONTRAPROPOSTA":f==="PRE_CONTRATO"?"⚖️ PRÉ-CONTRATO":f==="RENOVACAO"?"📝 RENOVAÇÃO":"💼 NOVA OFERTA";u(`${v}
**${W}** enviou uma proposta para **${oe}**!

${j}`,"transfer"),i(null),alert("Enviado com sucesso! Aguarde a resposta.")}catch(j){console.error("Erro no Firebase:",j),alert("Erro técnico ao gravar no banco de dados.")}},acceptOffer:async l=>{var f,y,C,x,D;try{if(l.type==="NOTIFICACAO"){await h.collection("offers").doc(l.id).delete(),alert("Confirmado!");return}if(l.type==="PERSONAL_SPONSOR_OFFER"){if(!confirm(`Aceitar o patrocínio da ${l.companyName} por ${ie(l.value)} semanais?
Seu rosto aparecerá na loja deles!`))return;const K=h.batch();K.update(h.collection("players").doc(l.recipientId),{personalSponsor:{companyId:l.senderId,companyName:l.companyName,value:l.value,clause:l.value*4}}),K.delete(h.collection("offers").doc(l.id)),await K.commit(),u(`📸 **NOVA ESTRELA!**
**${l.playerName}** é o mais novo garoto propaganda da marca **${l.companyName}**!`,"biz"),alert("Contrato assinado! Verifique seu Perfil.");return}if(l.type==="PRE_CONTRATO"){if(!confirm(`Confirmar assinatura de Pré-Contrato com ${l.buyerName}?
Você se juntará a eles na próxima temporada.`))return;const K=h.batch();K.update(h.collection("players").doc(l.playerId),{preContract:{teamId:l.buyerId,teamName:l.buyerName,salary:l.meta.newSalary,date:Date.now()},mood:"🤩"}),K.delete(h.collection("offers").doc(l.id)),await K.commit(),u(`📝 **PRÉ-CONTRATO ASSINADO**
**${l.playerName}** assinou com o **${l.buyerName}** e se apresentará na próxima temporada!`,"transfer"),alert("Pré-contrato assinado com sucesso!");return}const _=T.find(K=>K.id===l.buyerId),N=E.find(K=>K.id===l.playerId),z=!l.sellerId||l.sellerId==="FREE",W=z?null:T.find(K=>K.id===l.sellerId);if(l.type==="COMPRA_DEFINITIVA"){if(!_||!N)return alert("Erro: Dados incompletos.");if(_.balance<l.value)return alert(`Saldo insuficiente! Necessário: ${ie(l.value)}`);if(!confirm(`Exercer opção de compra de ${N.name} por ${ie(l.value)}?`))return;const K=h.batch();K.update(h.collection("teams").doc(_.id),{balance:_.balance-l.value}),W&&K.update(h.collection("teams").doc(W.id),{balance:W.balance+l.value}),K.update(h.collection("players").doc(N.id),{teamId:_.id,loanMeta:Z.firestore.FieldValue.delete(),status:"NAO_A_VENDA",contract:3,history:Z.firestore.FieldValue.arrayUnion({date:Date.now(),from:W?W.name:"EMPRÉSTIMO",to:_.name,type:"COMPRA_DEFINITIVA",value:l.value})}),K.delete(h.collection("offers").doc(l.id)),await K.commit(),u(`✅ **OPÇÃO EXERCIDA**
O **${_.name}** contratou **${N.name}** em definitivo!`,"transfer"),alert("Compra realizada!");return}const oe=n.type==="USER"&&n.data.id===l.buyerId,ae=n.type==="USER"&&n.data.id===l.sellerId,le=n.type==="PLAYER"||z&&!oe;if(!z&&!l.sellerAccepted&&(ae||oe)){if(oe){if(!confirm(`Aceitar a pedida do clube vendedor (${ie(l.value)}) e negociar com o jogador?`))return}else if(!confirm("Aceitar os valores propostos? O jogador decidirá o contrato agora."))return;await h.collection("offers").doc(l.id).update({recipientId:l.playerId,sellerAccepted:!0,status:"PENDING"}),u(`💰 **ACORDO ENTRE CLUBES**
${_.name} e ${W.name} chegaram a um acordo por **${N.name}**. Falta o "Sim" do atleta!`,"transfer"),alert("Acordo financeiro selado! A proposta foi enviada para o jogador.");return}if((z||l.sellerAccepted)&&(le||oe)){if(!_||!N)return alert("Erro: Dados incompletos.");const K=((f=l.meta)==null?void 0:f.installments)>1?l.value/l.meta.installments:l.value,G=parseFloat((y=l.meta)==null?void 0:y.signingBonus)||0,j=K+G;if(_.balance<j)return alert(`Saldo insuficiente no caixa do comprador!
Necessário: ${ie(j)}`);if(oe){if(!confirm(`Aceitar a pedida salarial do jogador e fechar a contratação?
Custo Imediato: ${ie(j)}`))return}else if(!confirm(`Deseja assinar com o ${_.name}?`))return;const Y=h.batch();if(W){let ne=K;if(N.sellOnClause&&N.sellOnClause.percentage>0){const L=N.sellOnClause.beneficiaryId;if(L&&L!==_.id){const X=K*N.sellOnClause.percentage/100;ne-=X,Y.update(h.collection("teams").doc(L),{balance:Z.firestore.FieldValue.increment(X)})}}if(Y.update(h.collection("teams").doc(W.id),{balance:W.balance+ne}),((C=l.meta)==null?void 0:C.installments)>1){const L=h.collection("debts").doc();Y.set(L,{buyerId:_.id,buyerName:_.name,sellerId:W.id,sellerName:W.name,playerName:N.name,installmentVal:K,weeksRemaining:parseInt(l.meta.installments)-1,date:Date.now()})}}Y.update(h.collection("teams").doc(_.id),{balance:_.balance-j}),G>0&&Y.update(h.collection("players").doc(N.id),{balance:Z.firestore.FieldValue.increment(G)});const S=l.meta&&l.meta.sellOn>0&&W?{beneficiaryId:W.id,percentage:l.meta.sellOn}:Z.firestore.FieldValue.delete();Y.update(h.collection("players").doc(N.id),{teamId:_.id,status:"NAO_A_VENDA",contract:l.type==="EMPRESTIMO"?parseInt(l.meta.loanDuration)||1:parseInt(l.offerContract)||1,salary:parseFloat((x=l.meta)==null?void 0:x.newSalary)||N.salary,role:((D=l.meta)==null?void 0:D.role)||"ROTACAO",loanMeta:l.type==="EMPRESTIMO"?{ownerId:W==null?void 0:W.id,salarySplit:l.meta.salarySplit||100,hasBuyOption:l.meta.hasBuyOption||!1,buyOpt:l.meta.buyOpt||0,originalContract:N.contract}:null,sellOnClause:S,history:Z.firestore.FieldValue.arrayUnion({date:Date.now(),from:z?"AGENTE LIVRE":W?W.name:"Desconhecido",to:_.name,type:l.type,value:l.value})}),Y.delete(h.collection("offers").doc(l.id)),await Y.commit();const v=z?`✍️ **ASSINOU!**
O Agente Livre **${N.name}** é o novo reforço do **${_.name}**!`:`🤝 **TRANSFERÊNCIA CONCLUÍDA**
**${N.name}** assinou com o **${_.name}**!`;u(v,"transfer"),W&&N.sellOnClause&&N.sellOnClause.percentage>0&&u(`💸 **CLÁUSULA DE REVENDA**
Uma parte da venda de **${N.name}** (${N.sellOnClause.percentage}%) foi repassada ao seu antigo clube formador.`,"money"),alert("Negócio fechado com sucesso!")}}catch(_){console.error(_),alert("Erro ao processar o aceite: "+_.message)}},rejectOffer:async l=>{try{if(l.type==="COMPRA_DEFINITIVA"&&l.isLoanOption){const f=E.find(z=>z.id===l.playerId),y=l.sellerId,C=T.find(z=>z.id===y);if(!confirm("Deseja recusar a compra? O jogador retornará ao clube de origem."))return;const x=h.batch(),D=h.collection("players").doc(f.id);let _=0;f.loanMeta&&f.loanMeta.originalContract?_=parseInt(f.loanMeta.originalContract):(console.warn("Contrato original não encontrado. Usando fallback de 6 anos."),_=6);let N=_-1;if(N<0&&(N=0),N<=0){const z=h.collection("offers").doc();x.set(z,{type:"RENOVACAO_URGENTE",playerId:f.id,playerName:f.name,buyerId:y,buyerName:(C==null?void 0:C.name)||"Clube de Origem",sellerId:"SISTEMA",recipientId:y,status:"PENDING",description:`⚠️ **URGENTE: FIM DE CONTRATO**
O empréstimo de **${f.name}** acabou e o contrato dele com você expirou.

Renove ou libere para os passes livres.`,date:Date.now()}),x.update(D,{teamId:y,loanMeta:Z.firestore.FieldValue.delete(),status:"INTRANSFERIVEL",contract:0}),u(`🔙 **RETORNO CRÍTICO**
O empréstimo de ${f.name} acabou e o contrato expirou!`,"rumor")}else{const z=h.collection("offers").doc();x.set(z,{type:"NOTIFICACAO",playerId:f.id,playerName:f.name,buyerName:"Sistema",recipientId:y,status:"PENDING",description:`🔙 **RETORNO DE EMPRÉSTIMO**
A opção de compra foi recusada.
**${f.name}** voltou ao seu elenco.

📄 Contrato Restante: ${N} temporada(s).`,date:Date.now()}),x.update(D,{teamId:y,loanMeta:Z.firestore.FieldValue.delete(),status:"NAO_A_VENDA",contract:N}),u(`🔙 **RETORNO**
${f.name} retornou ao ${C==null?void 0:C.name} (${N} anos rest.).`,"transfer")}x.delete(h.collection("offers").doc(l.id)),await x.commit(),alert("Opção recusada. Jogador devolvido ao clube de origem.");return}if(l.type==="RENOVACAO_URGENTE"){if(!confirm("Tem certeza? O jogador perderá o vínculo com o clube e irá para os Agentes Livres."))return;const f=h.batch();f.update(h.collection("players").doc(l.playerId),{teamId:"FREE",status:"VENDA",mood:"😐",contract:0}),f.delete(h.collection("offers").doc(l.id)),await f.commit(),u(`🆓 **AGENTE LIVRE**
O vínculo de **${l.playerName}** expirou e ele está livre no mercado!`,"transfer"),alert("Jogador enviado para os Agentes Livres.");return}if(!confirm("Deseja recusar e encerrar esta negociação?"))return;await h.collection("offers").doc(l.id).delete(),l.type!=="NOTIFICACAO"&&u(`❌ **NEGOCIAÇÃO ENCERRADA**
O acordo por **${l.playerName}** não avançou.`,"transfer")}catch(f){console.error(f),alert("Erro técnico ao processar a recusa.")}},renewContract:async l=>{if(!l.teamId||l.teamId==="FREE")return alert("Jogadores livres assinam novos contratos, não renovam!");const f=(parseFloat(l.value)||1e6)*.1;if(n.data.balance<f)return alert(`Saldo insuficiente para bônus de renovação (Custo: ${ie(f)})`);if(confirm(`Renovar com ${l.name}?
Custo: ${ie(f)} (Este valor irá para o saldo do jogador)`))try{const y=h.batch();y.update(h.collection("teams").doc(n.data.id),{balance:Z.firestore.FieldValue.increment(-f)}),y.update(h.collection("players").doc(l.id),{contract:(parseInt(l.contract)||0)+1,balance:Z.firestore.FieldValue.increment(f),status:"NAO_A_VENDA"}),await y.commit(),u(`📝 **RENOVAÇÃO**
O **${n.data.name}** renovou com **${l.name}**!`,"transfer"),i(null)}catch(y){alert("Erro ao renovar: "+y.message)}},handlePlayerActions:async(l,f)=>{const y=T.find(C=>C.id===f.teamId);if(l==="TRANSFER_REQUEST"){if(!y)return alert("Já és um Agente Livre!");if(f.status==="VENDA")return alert("Já estás na lista de transferências.");if(!confirm(`Tens a certeza que queres pedir para sair do ${y.name}? O adepto não vai gostar...`))return;await h.collection("players").doc(f.id).update({status:"VENDA",mood:"😡"}),u(`💣 **CRISE NO ${y.name.toUpperCase()}!**
O jogador **${f.name}** está insatisfeito e pediu para ser colocado na lista de transferências!`,"rumor"),alert("O pedido foi feito. O teu humor piorou.")}if(l==="ASK_RAISE"){if(!y)return alert("Precisas de um clube para pedir aumento.");if(!confirm("Ir à imprensa pedir um aumento salarial?"))return;u(`💰 **POLÉMICA**
**${f.name}** declara publicamente: "Mereço ganhar mais no ${y.name}. Espero uma renovação em breve."`,"press"),alert("Declaração feita à imprensa! O presidente foi notificado.")}if(l==="DECLARE_HAPPY"){if(!y)return alert("Precisas de um clube.");if(f.mood==="🤩")return alert("Já estás feliz!");await h.collection("players").doc(f.id).update({mood:"🤩",status:"NAO_A_VENDA"}),u(`💙 **AMOR À CAMISA**
**${f.name}** declarou: "Estou muito feliz no ${y.name} e quero fazer história aqui!"`,"press"),alert("Declaração feita! A torcida adorou.")}if(l==="RESET_MOOD"){if(!y)return alert("Precisas de um clube.");await h.collection("players").doc(f.id).update({mood:"😐",status:"NAO_A_VENDA"}),u(`🤝 **PAZES FEITAS**
**${f.name}** retirou seu pedido de transferência e foca novamente no ${y.name}.`,"press"),alert("Voltaste ao normal. Clima apaziguado.")}}}}function va(t){return Array.isArray(t)?t.map(va):t&&typeof t=="object"?Object.fromEntries(Object.keys(t).sort().map(e=>[e,va(t[e])])):t}function Wt(t,e){const a=[],n={update(i,r){return a.push(["update",i,r]),n},set(i,r,o){return a.push(["set",i,r,o]),n},delete(i){return a.push(["delete",i]),n},commit(){return t.runTransaction(async i=>{const r=await Promise.all(e.map(o=>i.get(o.ref)));e.forEach((o,d)=>{const p=r[d];if(!p.exists)throw new Error("Este registro já foi alterado ou removido. Atualize e tente novamente.");const m=p.data();for(const[E,T]of Object.entries(o.expected||{}))if(JSON.stringify(va(m[E]))!==JSON.stringify(va(T)))throw new Error("Os dados mudaram durante a operação. Confira os valores e tente novamente.")});for(const[o,d,p,m]of a)o==="delete"?i.delete(d):o==="set"&&m?i.set(d,p,m):i[o](d,p)})}};return n}function yu(t,e,a,n){return Wt(t,[{ref:e,expected:a}]).update(e,n).commit()}const ra={LEVE:["Fadiga Muscular","Entorse de Tornozelo G1","Contusão na Canela","Corte no Supercílio","Bolhas no Pé","Luxação de Dedo","Pancada no Quadril","Torcicolo","Edema Leve","Câimbras Fortes","Desgaste Físico","Pequena Contusão Lombar","Arranhão na Córnea","Inflamação no Tendão","Pancada no Nariz"],MODERADA:["Estiramento na Coxa G1","Lesão no Adutor","Concussão Leve","Entorse de Tornozelo G2","Tendinite Aquileia","Contusão Óssea","Fibrose Muscular","Fissura no Metatarso","Estiramento na Panturrilha","Lesão no Ligamento Colateral","Sinovite no Joelho","Bursite no Quadril","Contusão Traumática","Luxação de Ombro Parcial","Hérnia Inguinal Inicial"],GRAVE:["Estiramento G2","Ruptura Parcial de Menisco","Pubalgia Crônica","Fratura de Nariz","Lesão de Cartilagem","Entorse de Joelho com Edema","Fratura de Costela","Ruptura Parcial de Tendão","Descolamento Muscular","Lesão Traumática Cervical","Fratura de Malar","Lesão Complexa no Psoas","Entorse de Tornozelo G3","Ruptura de Fibras Grau 3","Edema Ósseo Profundo"],EXTREMA:["Ruptura de LCA (Cruzado)","Ruptura do Tendão de Aquiles","Fratura de Tíbia e Fíbula","Ruptura Total de Isquiotibiais","Hérnia de Disco","Fratura por Estresse","Ruptura de Ligamento Cruzado Posterior","Fratura de Tornozelo","Luxação de Patela Grave","Ruptura Total de Adutor","Lesão Nervosa","Síndrome Compartimental","Fratura de Vértebra","Ruptura de Tendão Patelar","Pneumotórax Traumático"]},vu={1:{name:"Campo de Terra",bonusXP:0,healChance:0,upgCost:5e6,maint:5e3,prompt:"campo de futebol de terra batida amador --ar 16:9"},2:{name:"CT Básico",bonusXP:10,healChance:5,upgCost:15e6,maint:2e4,prompt:"centro de treinamento de futebol simples, campo gramado --ar 16:9"},3:{name:"CT Profissional",bonusXP:25,healChance:10,upgCost:35e6,maint:5e4,prompt:"centro de treinamento de futebol profissional, boa estrutura --ar 16:9"},4:{name:"CT Avançado",bonusXP:40,healChance:20,upgCost:8e7,maint:1e5,prompt:"centro de treinamento moderno com academia visível ao fundo --ar 16:9"},5:{name:"Academia de Elite",bonusXP:60,healChance:30,upgCost:0,maint:2e5,prompt:"melhor centro de treinamento do mundo, piscinas de gelo, tecnologia --ar 16:9"}};function Iu(t,e){const{user:a,teams:n,setLoading:i,setSales:r,setUser:o,setModal:d,players:p}=t;return{handleFireCoach:async R=>{const A=a.data,g=(parseFloat(R.salary)||2500)*4;if(confirm(`Demitir ${R.name}?
Você terá que pagar uma multa rescisória de ${ie(g)}.`)){const O=parseFloat(A.balance)||0;if(O<g)return alert("Saldo insuficiente para pagar a rescisão!");const w=h.batch();w.update(h.collection("teams").doc(A.id),{balance:O-g}),w.update(h.collection("users").doc(R.id),{teamId:"FREE",contract:0,salary:2500,balance:Z.firestore.FieldValue.increment(g)}),await w.commit(),alert(`${R.name} foi demitido e a multa de ${ie(g)} foi paga.`)}},handleCoachSelfActions:async(R,A)=>{const b=n.find(g=>g.id===A.teamId);if(b){if(R==="RAISE"){const g=prompt("Qual o novo salário semanal desejado?",A.salary);if(!g)return;const O=parseFloat(g);if(O<=A.salary)return alert("O valor deve ser maior que o atual.");await h.collection("offers").add({type:"COACH_RAISE",recipientId:b.id,senderId:A.id,teamName:b.name,coachName:A.name,currentSalary:A.salary,requestedSalary:O,status:"PENDING",description:`💰 **PEDIDO DE AUMENTO**
O técnico **${A.name}** pede um reajuste salarial.
Atual: ${ie(A.salary)} ➝ Pedido: ${ie(O)}`,date:Date.now()}),alert("Pedido de aumento enviado à diretoria!")}if(R==="RESIGN_REQ"){if(!confirm("Enviar pedido de demissão amigável? O clube pode recusar."))return;await h.collection("offers").add({type:"COACH_RESIGN",recipientId:b.id,senderId:A.id,teamName:b.name,coachName:A.name,status:"PENDING",description:`👋 **PEDIDO DE DESLIGAMENTO**
O técnico **${A.name}** deseja rescindir o contrato amigavelmente (sem multa).`,date:Date.now()}),alert("Pedido de desligamento enviado!")}if(R==="BUYOUT"){const g=A.clause||A.salary*10;if(A.balance<g)return alert(`Saldo insuficiente! Você precisa de ${ie(g)}.`);if(!confirm(`TEM CERTEZA? Você pagará ${ie(g)} do seu bolso para ficar livre agora.`))return;const O=h.batch(),w=parseFloat(A.balance)||0,l=parseFloat(b.balance)||0;O.update(h.collection("users").doc(A.id),{balance:w-g,teamId:"FREE",contract:0,salary:2500}),O.update(h.collection("teams").doc(b.id),{balance:l+g}),await O.commit(),alert("Multa paga! Você está livre no mercado."),window.location.reload()}}},handleCoachIndication:async(R,A)=>{await h.collection("offers").add({type:"COACH_SUGGESTION",teamId:a.data.teamId,recipientId:a.data.teamId,senderId:a.data.id,senderName:a.data.name,playerId:R.id,playerName:R.name,playerPos:R.position,playerOv:R.overall,playerVal:R.value,status:"PENDING",description:`💡 **INDICAÇÃO DO TÉCNICO**
${a.data.name} sugere a contratação de **${R.name}** (${R.position}).

📝 Obs: "${A||"Sem observações"}"`,date:Date.now()}),alert("Indicação enviada para a diretoria!")},handleCoachUseItem:async R=>{if(!a.data||!["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(a.type))return;const A=new Date().toDateString(),g=(a.data.lastToxicityDate||"")===A&&a.data.toxicity||0,O=a.data.energy!==void 0?a.data.energy:100;if(O>=100)return alert("Sua energia já está cheia! Guarde o item para depois.");i(!0);try{const w=Wt(h,[{ref:h.collection("sales").doc(R.id),expected:{buyerId:a.data.id}},{ref:h.collection("users").doc(a.data.id),expected:{energy:a.data.energy,toxicity:a.data.toxicity,fame:a.data.fame,equippedItem:a.data.equippedItem}}]),l=h.collection("users").doc(a.data.id),f=h.collection("sales").doc(R.id);let y="SUCCESS";if(g===2?Math.random()<.4&&(y="SICK"):g>=3&&Math.random()<.95&&(y="VOMIT"),y==="VOMIT"||y==="SICK")w.update(l,{energy:0,toxicity:g+1,lastToxicityDate:A}),w.delete(f),await w.commit(),r(C=>C.filter(x=>x.id!==R.id)),o(C=>({...C,data:{...C.data,energy:0,toxicity:g+1}})),alert(y==="VOMIT"?`🤮 VÔMITO! Você comeu demais e seu estômago rejeitou tudo.
Resultado: Energia ZERADA.`:`🤢 ENJOO FORTE! O item não caiu bem.
Resultado: Você precisou deitar e sua energia zerou.`);else{const C=parseInt(R.power)||0,x=Math.min(100,O+C);w.update(l,{energy:x,toxicity:g+1,lastToxicityDate:A}),w.delete(f),await w.commit(),r(D=>D.filter(_=>_.id!==R.id)),o(D=>({...D,data:{...D.data,energy:x,toxicity:g+1}})),g===1?alert(`⚡ Energia recuperada: +${C}% (Total: ${x}%)
⚠️ CUIDADO: Foi seu 2º item hoje. O próximo tem risco de intoxicação.`):g>=2?alert(`⚡ Energia recuperada: +${C}%
⛔ PERIGO: Seu estômago está no limite! Pare de consumir agora!`):alert(`⚡ Energia recuperada: +${C}% (Total: ${x}%)`)}}catch(w){console.error(w),alert("Erro ao usar item: "+w.message)}i(!1)},handleUseItem:async(R,A)=>{var b;if(!(!a.data||a.type!=="PLAYER")){i(!0);try{const g=Wt(h,[{ref:h.collection("sales").doc(R.id),expected:{buyerId:a.data.id}},{ref:h.collection("players").doc(a.data.id),expected:{energy:a.data.energy,toxicity:a.data.toxicity,fame:a.data.fame,equippedItem:a.data.equippedItem}}]),O=h.collection("sales").doc(R.id),w=h.collection("players").doc(a.data.id);if(A==="CONSUME"){const l=new Date().toDateString(),y=(a.data.lastToxicityDate||"")===l&&a.data.toxicity||0;if(((b=a.data.injury)==null?void 0:b.type)==="INTOXICACAO"){alert(`🤢 VOCÊ ESTÁ INTOXICADO!
Seu estômago não aceita nada. Espere o dia virar para melhorar.`),i(!1);return}let C="SUCCESS";if(y===2?Math.random()<.4&&(C="SICK"):y>=3&&Math.random()<.95&&(C="VOMIT"),C==="VOMIT"){g.update(w,{energy:0,mood:"😡",toxicity:y+1,lastToxicityDate:l}),g.delete(O),await g.commit(),r(N=>N.filter(z=>z.id!==R.id)),o(N=>({...N,data:{...N.data,energy:0,mood:"😡",toxicity:y+1}})),alert(`🤮 VÔMITO!

Você consumiu demais! Seu corpo rejeitou tudo.

Efeito: Energia ZERADA e Humor piorado.`),i(!1);return}if(C==="SICK"){const N={type:"INTOXICACAO",label:"Intoxicação Alimentar",games:1,isIncurable:!0};g.update(w,{injury:N,recoveryLeft:1,toxicity:y+1,lastToxicityDate:l}),g.delete(O),await g.commit(),r(z=>z.filter(W=>W.id!==R.id)),o(z=>({...z,data:{...z.data,injury:N,toxicity:y+1}})),alert(`🤢 INTOXICAÇÃO ALIMENTAR!

Seu estômago não aguentou.

Efeito: Você foi internado e terá que esperar melhorar naturalmente (1 dia).`),i(!1);return}const x=parseInt(R.power)||0,D=a.data.energy||0;if(x>0&&D>=100){alert("Sua energia já está cheia!"),i(!1);return}const _=Math.min(100,D+x);g.update(w,{energy:_,toxicity:y+1,lastToxicityDate:l}),g.delete(O),await g.commit(),r(N=>N.filter(z=>z.id!==R.id)),o(N=>({...N,data:{...N.data,energy:_,toxicity:y+1}})),y===1?alert(`⚡ Energia recuperada: +${x}%
⚠️ CUIDADO: Foi seu 2º energético hoje. O próximo tem risco de intoxicação.`):y>=2?alert(`⚡ Energia recuperada...
⛔ PERIGO: Seu estômago está no limite! Pare de consumir agora!`):alert(`⚡ Energia recuperada: +${x}% (Total: ${_}%)`)}A==="EQUIP"&&(g.update(w,{equippedItem:{id:R.id,name:R.productName,cat:R.cat,power:parseInt(R.power)||0,img:R.img}}),g.delete(O),await g.commit(),r(l=>l.filter(f=>f.id!==R.id)),alert(`🛡️ Item equipado: ${R.productName}
Ele será consumido automaticamente no próximo treino.`))}catch(g){console.error("Erro ao usar item:",g),alert("Erro ao processar item. Tente novamente.")}finally{i(!1)}}},savePlayer:async R=>{try{const A={...R};R.id?await h.collection("players").doc(R.id).update(A):(A.attributes||(A.attributes=ya(A.position||"ATA",A.overall||60)),await h.collection("players").add(A)),d(null)}catch(A){console.error(A),alert("Erro ao salvar jogador: "+A.message)}},handleUpdateCoachSalary:async R=>{if(a.data.level<2)return alert("Nível insuficiente!");if(R<1e3)return alert("Salário mínimo é 1.000!");await h.collection("users").doc(a.data.id).update({salary:parseInt(R)}),alert("Valor de mercado atualizado!")},handleAssistantRegen:async R=>{const A=a.data,b=A.perks||[],g=b.some(W=>W.id==="COFFEE_LOVER"),O=b.some(W=>W.id==="ICE_BATH"),w=b.some(W=>W.id==="GOOD_VIBES"),l=b.some(W=>W.id==="LIGHT_WORK"),f=g?10:20,y=A.energy!==void 0?A.energy:100;if(y<f)return alert(`Você está muito cansado! Energia atual: ${y}% (Necessário: ${f}%)`);if(R.length===0)return alert("Selecione os jogadores que vão pra banheira de gelo!");i(!0);const C=h.batch();let x=[];R.forEach(W=>{const oe=p.find(j=>j.id===W);if(!oe)return;if((oe.recoveryLeft||0)>0){x.push(`⚠️ ${oe.name} ignorado (Já está sob cuidados do DM).`);return}let ae=25;O&&(ae+=15);const le=Math.min(100,(oe.energy!==void 0?oe.energy:100)+ae);let ue=Math.floor(Math.random()*3)+1;l&&(ue+=5);let K={energy:le,xp:(oe.xp||0)+ue},G="";w&&Math.random()<.3&&(K.mood="🤩",G=" e ficou muito feliz (🤩)!"),C.update(h.collection("players").doc(W),K),x.push(`🔋 ${oe.name} recuperou +${ae}⚡ (+${ue} XP)${G}`)});let D=(A.xp||0)+20,_=A.level,N=A.pendingPerks||0;D>=_*100&&_<30&&(D-=_*100,_++,_%3===0&&N++,alert(`🎉 PARABÉNS! Nível ${_} alcançado!`)),C.update(h.collection("users").doc(A.id),{energy:y-f,xp:D,level:_,pendingPerks:N});const z=n.find(W=>W.id===A.teamId);if(z){let W=[...z.trainingLogs||[]];W.unshift({date:Date.now(),type:"🧊 REGENERATIVO (AUXILIAR)",report:x.join(`
`)}),W.length>10&&W.pop(),C.update(h.collection("teams").doc(z.id),{trainingLogs:W})}await C.commit(),i(!1),alert(`Sessão de Recuperação finalizada!

${x.join(`
`)}`)},handleCoachTrain:async(R,A)=>{const b=a.data,g=b.energy!==void 0?b.energy:100,O=R.length>0?20:30;if(g<O)return alert(`Você está muito cansado para realizar esta atividade! Energia atual: ${g}% (Necessário: ${O}%)`);i(!0);const w=h.batch();let l=0,f=[];const y=b.perks||[],C=y.find(L=>L.type==="ENERGY_SAVE"),x=C?Math.round(25*C.value):25,D=y.find(L=>L.type==="CRIT_CHANCE"),_=D?D.value:0,N=y.find(L=>L.type==="MIN_XP_BOOST"),z=N?N.value:0,W=y.find(L=>L.type==="AFFINITY_BOOST"),oe=W?W.value:0,ae=n.find(L=>L.id===b.teamId),le=(ae==null?void 0:ae.ctLevel)||1,ue=vu[le].bonusXP/100;let K=[];A==="FISICO_BASE"?K=["stamina","balance","condition","strength"]:A==="VELOCIDADE"?K=["speed","accel","agility","dribbleSpd"]:A==="IMPULSAO"?K=["jump","header","condition"]:A==="CHUTE"?K=["shot","shotPower","shotTech","weakFootAcc"]:A==="PASSE"?K=["shortPass","longPass","shortPassSpd","longPassSpd","tech","weakFootFreq"]:A==="DRIBLE"?K=["dribble","dribbleSpd","agility","tech"]:A==="DEFESA"?K=["defense","aggression","response"]:A==="MENTAL"?K=["teamwork","mentality","response"]:A==="BOLA_PARADA"?K=["freeKick","curve","header","penalties"]:A==="GOLEIRO"?K=["gk","response","jump","longPass"]:A==="STUDY"&&(K=[]),R.forEach(L=>{const X=p.find(ce=>ce.id===L);if(!X)return;const Ae=X.energy!==void 0?X.energy:100;if((X.recoveryLeft||0)>0){f.push(`⚠️ ${X.name} ignorado (está lesionado)`);return}if(Ae<x){f.push(`⚠️ ${X.name} ignorado (exausto: ${Ae}%)`);return}if(Math.random()<.01){const ce=ra.LEVE[Math.floor(Math.random()*ra.LEVE.length)];w.update(h.collection("players").doc(X.id),{injury:ce,recoveryLeft:1,energy:Math.max(0,Ae-15),mood:"😡"}),f.push(`❌ ${X.name} se lesionou no treino: ${ce}`);return}const I=Ae-x;let H=Math.floor(Math.random()*5)+8+z,J=H+Math.floor(H*ue);if((b.affinities||[]).includes(X.position)&&(J+=5+oe),X.equippedItem){const ce=X.equippedItem.power||0,ge=Math.ceil(J*(ce/100));J+=ge,f.push(`👟 ${X.name} usou ${X.equippedItem.name} (+${ge} XP)`),w.delete(h.collection("sales").doc(X.equippedItem.id)),w.update(h.collection("players").doc(L),{equippedItem:Z.firestore.FieldValue.delete()})}y.forEach(ce=>{ce.type==="TRAIN_BOOST"&&ce.attrs.some(ve=>K.includes(ve))&&(J=Math.round(J*ce.multiplier)),ce.type==="YOUTH_BOOST"&&(X.age||18)<=ce.ageLimit&&(J=Math.round(J*ce.multiplier))}),Math.random()<.1+_&&(J*=2,f.push(`🔥 ${X.name} teve uma GRANDE evolução (+${J} XP)!`));let Ce={...X.attributes||{}};K.forEach(ce=>{(Ce[ce]||50)<99&&Math.random()<J/80&&(Ce[ce]=(Ce[ce]||50)+1)});let re={xp:(X.xp||0)+J,energy:I,attributes:Ce};if(X.learningPosition)if(A===dn[X.learningPosition.target].train){let ce=10;(b.affinities||[]).includes(X.learningPosition.target)&&(ce+=5),ce+=le*2;const ge=X.learningPosition.current+ce;ge>=X.learningPosition.required?(f.push(`🌟 ${X.name} APRENDEU a jogar de ${X.learningPosition.target}! (O Boost de atributos entrará na próxima temporada)`),re.secondaryPositions=Z.firestore.FieldValue.arrayUnion(X.learningPosition.target),re.learningPosition=Z.firestore.FieldValue.delete(),re.pendingPosBoosts=Z.firestore.FieldValue.arrayUnion(X.learningPosition.target)):(re["learningPosition.current"]=ge,f.push(`🔄 ${X.name} adaptando para ${X.learningPosition.target}: ${Math.min(100,Math.floor(ge/X.learningPosition.required*100))}%`))}else f.push(`⚠️ ${X.name} precisa do treino de ${dn[X.learningPosition.target].train} para evoluir na nova posição.`);w.update(h.collection("players").doc(L),re),l+=20,f.push(`✔️ ${X.name} evoluiu +${J} XP (Desgaste: -${x}⚡)`)}),A==="STUDY"&&(l=Math.floor(Math.random()*10)+15,f.push("📚 Você dedicou tempo estudando novas táticas e evoluiu como treinador."));let G=(b.xp||0)+l,j=b.level,Y=b.pendingPerks||0,S=b.pendingAffinity||0;const v=j*120;if(G>=v&&j<30&&(G-=v,j++,j%5===0&&Y++,[10,20,30].includes(j)&&S++,alert(`🎉 PARABÉNS! Nível ${j} alcançado!`)),w.update(h.collection("users").doc(b.id),{energy:g-O,xp:G,level:j,pendingPerks:Y,pendingAffinity:S}),ae){let L=[...ae.trainingLogs||[]];L.unshift({date:Date.now(),type:A,report:f.join(`
`)}),L.length>10&&L.pop(),w.update(h.collection("teams").doc(ae.id),{trainingLogs:L})}await w.commit(),i(!1);let ne=A==="STUDY"?"Estudo concluído!":"Treino realizado com sucesso!";f.length>0&&(ne+=`

`+f.join(`
`)),alert(ne)},handleEvolveCoachPerk:async R=>{await h.collection("users").doc(a.data.id).update({perks:Z.firestore.FieldValue.arrayUnion(R),pendingPerks:Z.firestore.FieldValue.increment(-1)}),o(A=>({...A,data:{...A.data,perks:[...A.data.perks||[],R],pendingPerks:(A.data.pendingPerks||1)-1}})),alert(`Habilidade "${R.name}" aprendida!`)},updateTeamStats:async(R,A)=>{await h.collection("teams").doc(R).update({stats:A}),alert("Tabela atualizada!")},handlePlayerSoloTrain:async(R,A)=>{const b=R.energy!==void 0?R.energy:100;if(b<35)return alert(`Exausto (${b}%)! Precisa de 35%.`);if((R.recoveryLeft||0)>0)return alert("Você está lesionado e não pode treinar!");i(!0);const g=h.batch();let O=[];if(Math.random()<.02){const _=ra.LEVE[Math.floor(Math.random()*ra.LEVE.length)];return g.update(h.collection("players").doc(R.id),{injury:_,recoveryLeft:1,energy:Math.max(0,b-20),mood:"😡"}),await g.commit(),i(!1),alert(`❌ INFORTÚNIO!
Lesão no treino: ${_}
1 Jogo fora.`)}let w=[];A==="FISICO_BASE"?w=["stamina","balance","condition","strength"]:A==="VELOCIDADE"?w=["speed","accel","agility","dribbleSpd"]:A==="IMPULSAO"?w=["jump","header","condition"]:A==="CHUTE"?w=["shot","shotPower","shotTech","weakFootAcc"]:A==="PASSE"?w=["shortPass","longPass","shortPassSpd","longPassSpd","tech","weakFootFreq"]:A==="DRIBLE"?w=["dribble","dribbleSpd","agility","tech"]:A==="DEFESA"?w=["defense","aggression","response"]:A==="MENTAL"?w=["teamwork","mentality","response"]:A==="BOLA_PARADA"?w=["freeKick","curve","header","penalties"]:A==="GOLEIRO"&&(w=["gk","response","jump","longPass"]);let l=Math.floor(Math.random()*8)+8;const f=b-35;if(R.equippedItem){const _=Math.ceil(l*((R.equippedItem.power||0)/100));l+=_,O.push(`Usou ${R.equippedItem.name} (+${_} XP)`),g.delete(h.collection("sales").doc(R.equippedItem.id)),g.update(h.collection("players").doc(R.id),{equippedItem:Z.firestore.FieldValue.delete()})}let y={...R.attributes||{}},C=!1;w.forEach(_=>{(y[_]||50)<99&&Math.random()<.15&&(y[_]=(y[_]||50)+1,C=!0)}),g.update(h.collection("players").doc(R.id),{xp:(R.xp||0)+l,energy:f,attributes:y});const x=n.find(_=>_.id===R.teamId);if(x){let _=[...x.trainingLogs||[]],N=`${R.name} fez um treino extra e ganhou +${l} XP.`;C&&(N+=" Alguns atributos evoluíram!"),_.unshift({date:Date.now(),type:"🏃‍♂️ TREINO SOLO",report:N}),_.length>15&&_.pop(),g.update(h.collection("teams").doc(x.id),{trainingLogs:_})}await g.commit(),i(!1);let D=`Treino concluído!
Energia: -35%
XP: +${l}`;O.length>0&&(D+=`
${O.join(`
`)}`),alert(D)}}}const Ti=60;async function Su(t,e){const a=await t.orderBy("date","desc").limit(Ti).get();if(a.docs.length<Ti)return;const n=await t.orderBy("date","desc").startAfter(a.docs.at(-1)).limit(100).get();if(n.empty)return;const i=e.batch();n.docs.forEach(r=>i.delete(r.ref)),await i.commit()}function Tu(t,e){const{user:a,posts:n,setChatMessages:i}=t;return{postNews:(u,U="normal")=>h.collection("news").add({text:u,type:U,date:Date.now()}),handleSocialPost:async(u,U)=>{const B=h.batch(),F=h.collection("posts").doc();if(B.set(F,{authorId:a.data.id,authorName:a.data.name,authorLogo:a.data.logo||a.data.face||null,text:u,img:U,date:Date.now(),likes:[]}),n.length>=50){const Q=n[n.length-1];if(Q){const ee=h.collection("posts").doc(Q.id);B.delete(ee)}}await B.commit()},handleSocialLike:async u=>{const U=a.data.id;(u.likes||[]).includes(U)?await h.collection("posts").doc(u.id).update({likes:Z.firestore.FieldValue.arrayRemove(U)}):await h.collection("posts").doc(u.id).update({likes:Z.firestore.FieldValue.arrayUnion(U)})},handleSocialDelete:async u=>{confirm("Apagar esta publicação?")&&await h.collection("posts").doc(u).delete()},subscribeToChat:u=>h.collection("chats").doc(u).collection("messages").orderBy("date","desc").limit(50).onSnapshot(U=>{const B=U.docs.map(F=>({id:F.id,...F.data()})).reverse();i(B)}),sendChatMessage:async(u,U)=>{if(!U.trim())return;const B=h.collection("chats").doc(u).collection("messages");await B.add({text:U,authorId:a.data.id,authorName:a.data.name,authorType:a.type,date:Date.now()}),Su(B,h).catch(F=>console.warn("Limpeza do chat adiada:",F.code))},toggleFollow:async u=>{const U=a.type==="USER"?h.collection("teams").doc(a.data.id):h.collection("players").doc(a.data.id);(a.data.following||[]).includes(u)?(await U.update({following:Z.firestore.FieldValue.arrayRemove(u)}),alert("Deixou de seguir.")):(await U.update({following:Z.firestore.FieldValue.arrayUnion(u)}),alert("Seguindo!"))}}}function bu(t,e){const{user:a,setLoading:n,setModal:i}=t,r=(...E)=>e.postNews(...E);return{handleHospitalDonation:async(E,T)=>{if(!a.data||a.data.balance<T)return alert("Saldo insuficiente!");if(!Number.isFinite(T)||T<=0)return alert("Valor inválido.");const u=E.donors||{};if(u[a.data.id])return alert(`🛑 GESTO JÁ REALIZADO!
Você já contribuiu para o tratamento atual deste jogador. Aguarde a recuperação ou a cirurgia para ajudar novamente.`);if(a.type==="COMPANY"&&T>15e4)return alert(`🚫 LIMITE EMPRESARIAL!
Pelas leis de Mato Real, empresas podem doar no máximo ${ie(15e4)} (1% do teto cirúrgico) por procedimento para evitar monopólio.`);const U=a.type==="PLAYER"?h.collection("players").doc(a.data.id):a.type==="USER"?h.collection("teams").doc(a.data.id):h.collection("companies").doc(a.data.id),B=Wt(h,[{ref:U,expected:{balance:a.data.balance}},{ref:h.collection("players").doc(E.id),expected:{donors:E.donors}}]);B.update(U,{balance:Z.firestore.FieldValue.increment(-T)});const F={[a.data.id]:{name:a.data.name,val:T,date:Date.now()}};B.update(h.collection("players").doc(E.id),{hospitalFund:Z.firestore.FieldValue.increment(T),donors:{...u,...F}});try{await B.commit()}catch(Q){alert(Q.message);return}alert(`🙏 DOAÇÃO CONFIRMADA!
Obrigado, ${a.data.name}. Seus ${ie(T)} foram enviados para o fundo hospitalar.`)},handleFinanceApprove:async E=>{n(!0);const T=h.collection("financeRequests").doc(E.id),u=Wt(h,[{ref:T,expected:{status:E.status,amount:E.amount,type:E.type,teamId:E.teamId}}]);let U=null;try{if(!Number.isFinite(Number(E.amount))||Number(E.amount)<=0)throw new Error("Valor inválido.");if(!["INJECTION","SPONSORSHIP"].includes(E.type))throw new Error("Tipo de solicitação inválido.");if(E.type==="INJECTION"){const B=h.collection("teams").doc(E.teamId);u.update(B,{balance:Z.firestore.FieldValue.increment(Number(E.amount))}),u.delete(T),U=`💰 **INJEÇÃO FINANCEIRA**
A Federação aportou ${ie(E.amount)} no caixa do ${E.teamName}.`}else if(E.type==="SPONSORSHIP"){const B=h.collection("sponsorships").doc();u.set(B,{teamId:E.teamId,teamName:E.teamName,companyId:"FEDERACAO",companyName:"FEDERAÇÃO (Governo)",value:parseFloat(E.amount),status:"ACTIVE"}),u.delete(T),U=`🤝 **PATROCÍNIO ESTATAL**
O ${E.teamName} fechou contrato com a Federação.
Valor: ${ie(E.amount)}/semana.`}await u.commit(),U&&r(U,"admin").catch(B=>console.warn(B)),alert("Solicitação Aprovada com Sucesso!")}catch(B){alert("Erro ao aprovar: "+B.message)}n(!1)},updateBalance:async(E,T)=>{await h.collection("teams").doc(E).update({balance:parseFloat(T)}),alert("Atualizado!")},withdrawMoney:async(E,T)=>{const u=parseFloat(E.replace(",","."));if(!Number.isFinite(u)||u<=0)return alert("Valor inválido!");if(a.data.balance<u)return alert("Saldo insuficiente!");try{await yu(h,h.collection("teams").doc(a.data.id),{balance:a.data.balance},{balance:Z.firestore.FieldValue.increment(-u)})}catch(U){alert(U.message);return}r(`💸 **SAÍDA DE CAIXA**
O **${a.data.name}** retirou ${ie(u)}.
📝 Motivo: ${T}`,"money-minus"),i(null)}}}function Cu(t){const e={};return Object.assign(e,lu(t)),Object.assign(e,du(t,e)),Object.assign(e,uu(t,e)),Object.assign(e,Eu(t,e)),Object.assign(e,Iu(t)),Object.assign(e,Tu(t)),Object.assign(e,bu(t,e)),ao(e,t.user)}function Ru(t,e=[]){const a=new Set(t.docChanges().map(r=>r.doc.id)),n=new Map(e.map(r=>[r.id,r])),i=t.docs.map(r=>!a.has(r.id)&&n.has(r.id)?n.get(r.id):{...r.data(),id:r.id});return i.length===e.length&&i.every((r,o)=>r===e[o])?e:i}function Ou(t,e,a){const n=t==="ADMIN",i=!!t;return{financeRequests:n,products:n||t==="COMPANY"||e==="SHOPPING",sponsorships:n||t==="USER"||t==="COMPANY",awards:n||["AWARDS_MANAGER","TOURN_MANAGER"].includes(a),tournaments:n||e==="MATCHES"||["TOURN_MANAGER","MATCH_MANAGER"].includes(a),hallOfFame:e==="RANKING",matches:n||e==="MATCHES"||["MATCH_MANAGER","MATCH_PERFORMANCE"].includes(a),posts:e==="SOCIAL",news:i,calendar:i}}function we(t,e,a=!0,n=null,i=null,r=!1){q.useEffect(()=>{if(!a)return;let o=h.collection(t);r&&(o=o.where("type","in",["COACH","DOCTOR","SCOUT","ASSISTANT"])),n&&(o=o.orderBy(n,"desc")),i&&(o=o.limit(i));let d=[];return o.onSnapshot(p=>{d=Ru(p,d),e(d)},p=>console.error(`Não foi possível atualizar ${t}:`,p.code))},[t,e,a,n,i,r])}function Ws({look:t,uniform:e}){const a=q.useRef(null);return q.useEffect(()=>{const n=a.current.getContext("2d");let i,r=0;const o=d=>{d-r>65&&(n.clearRect(0,0,300,260),n.fillStyle="#102b25",n.fillRect(0,0,300,260),n.fillStyle="#1b443b",n.fillRect(20,213,260,3),$s(n,150,224,t,e,d/150,5.5,!1),r=d),i=requestAnimationFrame(o)};return i=requestAnimationFrame(o),()=>cancelAnimationFrame(i)},[t,e]),s.jsx("canvas",{ref:a,width:"300",height:"260",style:{imageRendering:"pixelated",maxWidth:"100%"},"aria-label":"Prévia do personagem com uniforme"})}function _u({look:t,style:e,uniform:a}){const n=q.useRef(null);return q.useEffect(()=>{const i=n.current.getContext("2d");i.clearRect(0,0,80,72),$s(i,40,83,{...t,style:e},a,0,2.2)},[t,e,a]),s.jsx("canvas",{ref:n,width:"80",height:"72","aria-hidden":"true",style:{imageRendering:"pixelated",display:"block"}})}function wu({player:t,team:e,onChange:a}){var u,U;const[n,i]=q.useState(()=>Vt(t.pixelAppearance)),[r,o]=q.useState(""),[d,p]=q.useState(!1),m=zt(e),E=e?m[t.position==="GOL"?"goalkeeper":"home"]:yt({shirt:"#7c8798"}),T=(B,F)=>{const Q={...n,[B]:F};i(Q),a==null||a(Vt(Q))};return s.jsxs("section",{className:"card","data-testid":"appearance-editor",children:[s.jsx("h3",{children:"Meu personagem em campo"}),s.jsx(Ws,{look:{...n,number:((u=e==null?void 0:e.shirtNumbers)==null?void 0:u[t.id])||n.number},uniform:E}),s.jsxs("p",{children:[e?`Uniforme atual: ${e.name}${t.position==="GOL"?" — goleiro":""}`:"Sem clube: uniforme neutro",". O uniforme acompanha seu clube; a aparência continua com você."]}),[[Fs,"skin","Tom de pele"],[Vs,"hair","Cor do cabelo"],[Gs,"eyes","Cor dos olhos"],[Us,"boots","Chuteiras"]].map(([B,F,Q])=>s.jsxs("label",{style:{display:"block",margin:"12px 0"},children:[Q,s.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,margin:"8px 0"},children:B.map(ee=>s.jsx("button",{type:"button","aria-label":`${Q}: ${ee}`,"aria-pressed":n[F]===ee,onClick:()=>T(F,ee),style:{width:38,height:38,background:ee,border:n[F]===ee?"3px solid #54e6ad":"2px solid #667",borderRadius:6}},ee))}),s.jsx("select",{className:"input-field","aria-label":Q,value:n[F],onChange:ee=>T(F,ee.target.value),children:B.map((ee,te)=>s.jsxs("option",{value:ee,children:[Q," ",te+1," (",ee,")"]},ee))})]},F)),s.jsxs("label",{children:["Cabelo",s.jsx("select",{className:"input-field","aria-label":"Cabelo",value:n.style,onChange:B=>T("style",B.target.value),children:Object.entries(on).map(([B,F])=>s.jsx("option",{value:B,children:F},B))})]}),s.jsx("div",{style:{display:"flex",gap:8,overflowX:"auto",padding:"10px 0"},children:Object.entries(on).map(([B,F])=>s.jsxs("button",{type:"button",onClick:()=>T("style",B),"aria-label":`Escolher cabelo ${F}`,"aria-pressed":n.style===B,style:{minWidth:100,padding:10,border:n.style===B?"2px solid #54e6ad":"1px solid #456",background:"#18332e",color:"#fff",borderRadius:8},children:[s.jsx(_u,{look:n,style:B,uniform:E}),F]},B))}),s.jsxs("label",{children:["Barba",s.jsxs("select",{className:"input-field","aria-label":"Barba",value:n.beard,onChange:B=>T("beard",B.target.value),children:[s.jsx("option",{value:"none",children:"Sem barba"}),s.jsx("option",{value:"short",children:"Curta"}),s.jsx("option",{value:"full",children:"Cheia"})]})]}),s.jsxs("label",{children:["Mangas",s.jsxs("select",{className:"input-field","aria-label":"Mangas",value:n.sleeves,onChange:B=>T("sleeves",B.target.value),children:[s.jsx("option",{value:"short",children:"Curtas"}),s.jsx("option",{value:"long",children:"Longas"})]})]}),s.jsxs("p",{children:["Número da camisa:"," ",s.jsx("b",{children:((U=e==null?void 0:e.shirtNumbers)==null?void 0:U[t.id])||"aguardando definição"}),". A numeração é definida pelo técnico do clube."]}),!a&&s.jsx("button",{className:"btn btn-green",disabled:d,onClick:async()=>{p(!0);try{const B=Vt(n);await h.collection("players").doc(t.id).update({pixelAppearance:B}),i(B),o("Aparência salva. Será usada nas próximas partidas.")}catch{o("Não foi possível salvar. Tente novamente.")}finally{p(!1)}},children:"SALVAR APARÊNCIA"}),s.jsx("p",{role:"status",children:r})]})}function _h({team:t}){const[e,a]=q.useState(()=>zt(t)),[n,i]=q.useState("home"),[r,o]=q.useState(""),[d,p]=q.useState(!1);return s.jsxs("section",{className:"card","data-testid":"kit-editor",children:[s.jsx("h3",{children:"Uniformes do clube"}),s.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:[["home","CASA"],["away","FORA"],["goalkeeper","GOLEIRO"]].map(([m,E])=>s.jsx("button",{className:`btn ${n===m?"btn-green":"btn-ghost"}`,onClick:()=>i(m),children:E},m))}),s.jsx(Ws,{look:{},uniform:e[n]}),Object.entries({shirt:"Camisa",detail:"Detalhes",shorts:"Calção",socks:"Meião"}).map(([m,E])=>s.jsxs("label",{style:{display:"block",margin:12},children:[E," ",s.jsx("input",{"aria-label":E,type:"color",value:e[n][m],onChange:T=>a({...e,[n]:{...e[n],[m]:T.target.value}})})]},m)),s.jsxs("label",{children:["Modelo",s.jsx("select",{className:"input-field",value:e[n].pattern,onChange:m=>a({...e,[n]:{...e[n],pattern:m.target.value}}),children:Object.entries(js).map(([m,E])=>s.jsx("option",{value:m,children:E},m))})]}),s.jsx("p",{children:"As mudanças valem para as próximas partidas. Replays preservam os uniformes originais."}),s.jsx("button",{className:"btn btn-green",disabled:d,onClick:async()=>{p(!0);try{await h.collection("teams").doc(t.id).update({kits:zt({kits:e})}),o("Os três uniformes foram salvos.")}catch{o("Não foi possível salvar os uniformes.")}finally{p(!1)}},children:"SALVAR UNIFORMES"}),s.jsx("p",{role:"status",children:r})]})}function Nu({value:t="MTR",onChange:e,disabled:a=!1,label:n="Nacionalidade"}){return s.jsxs("label",{style:{display:"block",marginBottom:10},children:[n,s.jsx("select",{className:"input-field","aria-label":n,value:t,onChange:i=>e(i.target.value),disabled:a,children:Hs.map(i=>s.jsxs("option",{value:i.id,children:[su(i.id)," ",i.name]},i.id))})]})}const oa=["A","B","C","D","VARZEA"],Pu=["GOL","ZAG","LD","LE","VOL","MC","MEI","PTD","PTE","ATA"],xu=["GOL","ZAG","LD","LE","VOL","MC","MD","ME","MEI","PTD","PTE","SA","ATA"],Lu=({teams:t,players:e,papers:a,journalists:n,companies:i,coaches:r,onLogin:o,onCreateTeam:d,onCreatePaper:p,onCreateJourno:m,onCreateCompany:E,onAdmin:T,onVisitor:u,onCreateCoach:U,onCreatePlayer:B,config:F})=>{const[Q,ee]=q.useState(!1),[te,P]=q.useState(""),[k,R]=q.useState(""),[A,b]=q.useState(""),[g,O]=q.useState(!1),[w,l]=q.useState("LOGIN"),[f,y]=q.useState("TEAM"),[C,x]=q.useState({n:"",b:"10000000",s:"A",p:""}),[D,_]=q.useState({n:"",owner:"",p:"",type:"COMERCIO"}),[N,z]=q.useState(null),[W,oe]=q.useState(null),[ae,le]=q.useState(null),[ue,K]=q.useState(""),[G,j]=q.useState(null),[Y,S]=q.useState({name:"",password:"",affinity:"ATA",role:"COACH",face:null}),[v,ne]=q.useState({nationality:"MTR",name:"",instagram:"",position:"ATA",password:""}),L=I=>{const H=I.target.files[0],J=new FileReader;J.onloadend=()=>x({...C,l:J.result}),H&&J.readAsDataURL(H)},X=ka[D.type]||{},Ae=()=>{if(N){if(String(N.password)!==String(ue))return alert("Senha incorreta!");if(N.type==="TEAM"){if(N.status==="PENDING")return alert("Aguardando aprovação.");o(N.id,ue,"TEAM")}else if(N.type==="PLAYER")o(N.id,ue,"PLAYER");else if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(N.type)){if(N.status==="PENDING")return alert("Licença em análise.");o(N.id,ue,N.type)}else if(N.type==="COMPANY"){if(N.status==="PENDING")return alert("Empresa em análise.");if(N.status==="BLOCKED")return alert("Empresa bloqueada.");o(N.id,ue,"COMPANY")}else if(N.type==="PAPER"){if(N.status==="PENDING")return alert("Jornal em análise.");o(N.id,ue,"PAPER")}else if(N.type==="JOURNALIST"){if(N.status==="PENDING")return alert("Registro em análise.");o(N.id,ue,"JOURNALIST")}}};return s.jsxs("div",{className:"login-wrapper",children:[s.jsx("style",{children:`
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
            `}),s.jsxs("div",{className:"login-header-container animate-in",children:[s.jsxs("div",{className:"logos-wrapper",children:[s.jsx("img",{src:"assets/img1.webp",alt:"Sponsor 1",className:"side-logo"}),s.jsx("img",{src:"assets/img2.jpg",alt:"Brasão Central",className:"main-logo"}),s.jsx("img",{src:"assets/img3.jpg",alt:"Sponsor 2",className:"side-logo"})]}),s.jsx("h1",{className:"game-title",children:"MATO REAL"}),s.jsxs("div",{className:"dev-info-row",children:[s.jsxs("div",{className:"dev-credits-sub",children:["FUT PIXEL"," ",s.jsx("span",{style:{color:"#00E676",margin:"0 5px"},children:"•"})," POR NATHAN REIS"]}),s.jsx("div",{className:"version-badge",children:"VERSÃO 2.9.1 — MATO REAL TV "})]})]}),s.jsxs("div",{className:"login-tabs",children:[s.jsx("div",{className:`tab ${w==="LOGIN"?"active":""}`,onClick:()=>l("LOGIN"),children:"ENTRAR"}),s.jsx("div",{className:`tab ${w==="CREATE"?"active":""}`,onClick:()=>l("CREATE"),children:"CRIAR TIME"}),s.jsx("div",{className:`tab ${w==="PRESS"?"active":""}`,onClick:()=>l("PRESS"),children:"IMPRENSA"}),s.jsx("div",{className:`tab ${w==="COMPANY"?"active":""}`,onClick:()=>l("COMPANY"),children:"EMPRESAS"}),s.jsx("div",{className:`tab ${w==="COACH"?"active":""}`,onClick:()=>l("COACH"),children:"COMISSÃO"}),s.jsx("div",{className:`tab ${w==="NEW_PLAYER"?"active":""}`,onClick:()=>l("NEW_PLAYER"),children:"JOGADOR"})]}),w==="LOGIN"&&s.jsxs("div",{children:[s.jsxs("div",{className:"login-tab-buttons",children:[s.jsx("button",{className:`btn ${f==="TEAM"?"btn-green":"btn-ghost"}`,style:{width:"auto"},onClick:()=>y("TEAM"),children:"TIMES"}),s.jsx("button",{className:`btn ${f==="PLAYER"?"btn-blue":"btn-ghost"}`,style:{width:"auto"},onClick:()=>{y("PLAYER"),le(null)},children:"JOGADORES"}),s.jsx("button",{className:`btn ${f==="COMPANY"?"btn-purple":"btn-ghost"}`,style:{width:"auto"},onClick:()=>y("COMPANY"),children:"EMPRESAS"}),s.jsx("button",{className:`btn ${f==="COACH"?"btn-gold":"btn-ghost"}`,style:{width:"auto"},onClick:()=>{y("COACH"),le(null),j(null)},children:"COMISSÃO"})]}),f==="TEAM"&&s.jsx("div",{className:"text-left",children:G?s.jsxs("div",{className:"animate-in",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>j(null),children:"⬅ VOLTAR PARA DIVISÕES"}),s.jsx("h4",{className:`login-series-header-team ${G==="VARZEA"?"login-series-title-varzea":"login-series-title-main"}`,children:G==="VARZEA"?"🚜 Terrão (Várzea)":`Série ${G}`}),(()=>{const I=(t||[]).filter(H=>H.status!=="PENDING"&&H.serie===G).sort((H,J)=>H.name.localeCompare(J.name));return I.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum time cadastrado nesta série."}):I.map(H=>s.jsxs("div",{className:"card card-row card-clickable",onClick:()=>z({...H,type:"TEAM"}),children:[H.logo?s.jsx("img",{src:H.logo,className:"login-team-card-logo"}):s.jsx("div",{className:"login-team-card-logo-placeholder",children:"🛡️"}),s.jsx("div",{children:s.jsx("b",{className:"card-main-title",children:H.name})})]},H.id))})()]}):s.jsxs("div",{className:"animate-in login-series-wrapper",children:[s.jsx("h4",{className:"login-series-title",children:"Selecione a Divisão"}),oa.map(I=>s.jsx("button",{className:"btn btn-ghost login-series-button-team",onClick:()=>j(I),children:I==="VARZEA"?"🚜 O Terrão (Várzea)":`🏆 Campeonato Série ${I}`},`btn-s-${I}`))]})}),f==="PLAYER"&&!ae&&s.jsx("div",{className:"text-left",children:G?s.jsxs("div",{className:"animate-in",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>j(null),children:"⬅ VOLTAR PARA DIVISÕES"}),s.jsx("h4",{className:`login-series-header-team ${G==="VARZEA"?"login-series-title-varzea":""}`,children:G==="VARZEA"?"🚜 Terrão (Várzea)":`Série ${G}`}),(()=>{const I=(t||[]).filter(H=>H.status!=="PENDING"&&H.serie===G).sort((H,J)=>H.name.localeCompare(J.name));return I.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum time cadastrado nesta série."}):I.map(H=>s.jsxs("div",{className:"card",onClick:()=>le(H),style:{display:"flex",alignItems:"center",gap:10,cursor:"pointer"},children:[H.logo?s.jsx("img",{src:H.logo,className:"login-player-team-logo"}):s.jsx("div",{className:"login-player-team-logo-placeholder",children:"🛡️"}),s.jsx("b",{style:{fontSize:15},children:H.name}),s.jsx("i",{className:"fas fa-chevron-right",style:{marginLeft:"auto",color:"#555"}})]},H.id))})()]}):s.jsxs("div",{className:"animate-in login-series-wrapper",children:[s.jsx("p",{className:"login-player-help",children:"Selecione o clube onde você joga ou acesse como livre:"}),s.jsx("div",{className:"card pulse login-free-agent-card",onClick:()=>le({id:"FREE",name:"Agentes Livres"}),children:s.jsx("b",{className:"login-free-agent-title",children:"🆓 SOU AGENTE LIVRE"})}),oa.map(I=>s.jsx("button",{className:"btn btn-ghost login-series-button-player",onClick:()=>j(I),children:I==="VARZEA"?"🚜 O Terrão (Várzea)":`🏆 Campeonato Série ${I}`},`btn-p-s-${I}`))]})}),f==="PLAYER"&&ae&&s.jsxs("div",{className:"animate-in text-left",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>le(null),children:"⬅ VOLTAR AOS CLUBES"}),s.jsxs("h4",{className:"login-series-header-team",children:["Elenco: ",ae.name]}),(()=>{const I=(e||[]).filter(H=>!H.isBot&&H.teamId===ae.id).sort((H,J)=>H.name.localeCompare(J.name));return I.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum jogador encontrado neste clube."}):I.map(H=>s.jsxs("div",{className:"card card-row card-clickable card-accent-secondary",onClick:()=>z({...H,type:"PLAYER"}),children:[H.face?s.jsx("img",{src:H.face,className:"avatar-md"}):s.jsx("div",{className:"avatar-md-placeholder",children:"👤"}),s.jsxs("div",{className:"flex-1",children:[s.jsxs("b",{className:"card-main-title",children:[H.name," ",H.recoveryLeft>0?"❌":""]}),s.jsx("br",{}),s.jsx("span",{className:"login-player-position-badge",children:H.position})]}),s.jsx("i",{className:"fas fa-sign-in-alt icon-right-muted"})]},H.id))})()]}),f==="COMPANY"&&(i||[]).filter(I=>I.status!=="PENDING").map(I=>s.jsxs("div",{className:"card login-company-card",onClick:()=>z({...I,type:"COMPANY"}),children:["🏢 ",s.jsx("b",{children:I.name}),s.jsx("br",{}),s.jsx("small",{children:I.companyType})]},I.id)),f==="COACH"&&!ae&&s.jsx("div",{className:"text-left",children:G?s.jsxs("div",{className:"animate-in",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>j(null),children:"⬅ VOLTAR PARA DIVISÕES"}),s.jsx("h4",{className:"login-coach-series-header",children:G==="VARZEA"?"🚜 Terrão (Várzea)":`Série ${G}`}),(()=>{const I=(t||[]).filter(H=>H.status!=="PENDING"&&H.serie===G).sort((H,J)=>H.name.localeCompare(J.name));return I.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum time cadastrado nesta série."}):I.map(H=>s.jsxs("div",{className:"card",onClick:()=>le(H),style:{display:"flex",alignItems:"center",gap:10,cursor:"pointer"},children:[H.logo?s.jsx("img",{src:H.logo,className:"login-coach-team-logo"}):s.jsx("div",{className:"login-coach-team-logo-placeholder",children:"🛡️"}),s.jsx("b",{style:{fontSize:15},children:H.name}),s.jsx("i",{className:"fas fa-chevron-right",style:{marginLeft:"auto",color:"#555"}})]},H.id))})()]}):s.jsxs("div",{className:"animate-in login-series-wrapper",children:[s.jsx("p",{className:"login-coach-help",children:"Selecione o clube onde trabalha ou acesse como livre:"}),s.jsx("div",{className:"card pulse login-coach-free-card",onClick:()=>le({id:"FREE",name:"Profissionais Livres"}),children:s.jsx("b",{className:"login-coach-free-title",children:"🆓 SOU PROFISSIONAL LIVRE"})}),oa.map(I=>s.jsx("button",{className:"btn btn-ghost login-coach-series-button",onClick:()=>j(I),children:I==="VARZEA"?"🚜 O Terrão (Várzea)":`🏆 Campeonato Série ${I}`},`btn-c-s-${I}`))]})}),f==="COACH"&&ae&&s.jsxs("div",{className:"animate-in text-left",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>le(null),children:"⬅ VOLTAR AOS CLUBES"}),s.jsx("h4",{className:"login-coach-list-header",children:ae.id==="FREE"?"Mercado de Profissionais":`Staff: ${ae.name}`}),(()=>{const I=(r||[]).filter(J=>J.status==="ACTIVE"&&J.teamId===ae.id).sort((J,Ce)=>J.name.localeCompare(Ce.name));if(I.length===0)return s.jsx("p",{className:"login-empty-text",children:"Nenhum profissional contratado neste clube."});const H={COACH:"👔 Técnico",DOCTOR:"🩺 Médico",SCOUT:"🕵️‍♂️ Olheiro",ASSISTANT:"📋 Auxiliar"};return I.map(J=>s.jsxs("div",{className:"card login-coach-card card-clickable",onClick:()=>z({...J,type:J.type||"COACH"}),children:[J.face?s.jsx("img",{src:J.face,className:"login-coach-photo"}):s.jsx("div",{className:"login-coach-photo-placeholder",children:J.type==="DOCTOR"?"🩺":J.type==="SCOUT"?"🕵️‍♂️":J.type==="ASSISTANT"?"📋":"👔"}),s.jsxs("div",{className:"flex-1",children:[s.jsx("b",{className:"login-coach-name",children:J.name}),s.jsx("br",{}),s.jsxs("span",{className:"login-coach-subtitle",children:[H[J.type]||"👔 Técnico"," | Nível ",J.level,J.type==="COACH"&&J.affinities?` | Esp: ${J.affinities[0]}`:""]})]}),s.jsx("i",{className:"fas fa-sign-in-alt icon-login-gold"})]},J.id))})()]}),s.jsxs("div",{className:"login-footer-actions",children:[s.jsx("button",{className:"btn btn-blue",onClick:u,children:"ENTRAR COMO VISITANTE"}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>{ee(!0),b("")},children:"ADMIN"}),Q&&s.jsxs("form",{className:"card",onSubmit:async I=>{var H;I.preventDefault(),O(!0),b("");try{await T(te,k),R("")}catch(J){b((H=J.code)!=null&&H.startsWith("auth/")?"Não foi possível entrar. Confira o login e a senha.":J.message)}finally{O(!1)}},children:[s.jsx("h3",{children:"Acesso administrativo"}),s.jsxs("label",{children:["E-mail do principal ou login do subADM",s.jsx("input",{className:"input-field",autoComplete:"username",required:!0,value:te,onChange:I=>P(I.target.value)})]}),s.jsxs("label",{children:["Senha administrativa",s.jsx("input",{className:"input-field",type:"password",autoComplete:"current-password",required:!0,value:k,onChange:I=>R(I.target.value)})]}),A&&s.jsx("p",{role:"alert",children:A}),s.jsx("button",{className:"btn btn-green",disabled:g,children:"ENTRAR NO PAINEL"}),s.jsx("button",{type:"button",className:"btn",disabled:g,onClick:()=>{ee(!1),R("")},children:"CANCELAR"})]})]})]}),w==="CREATE"&&s.jsxs("div",{children:[s.jsx("h3",{style:{color:"var(--primary)"},children:"Fundar Novo Clube"}),s.jsxs("div",{className:"login-create-club-preview",children:[s.jsx("div",{children:C.l?s.jsx("img",{src:C.l,className:"login-club-logo"}):s.jsx("div",{className:"login-club-logo-placeholder",children:"🛡️"})}),s.jsxs("label",{className:"btn btn-blue login-upload-badge",children:[s.jsx("i",{className:"fas fa-upload",style:{marginRight:5}})," ","ESCOLHER ESCUDO",s.jsx("input",{type:"file",style:{display:"none"},accept:"image/*",onChange:L})]})]}),s.jsx("input",{className:"input-field",placeholder:"Nome do Clube",value:C.n,onChange:I=>x({...C,n:I.target.value})}),s.jsx("input",{className:`input-field ${C.s==="VARZEA"?"login-varzea-balance":""}`,type:"number",placeholder:"Saldo Inicial",value:C.s==="VARZEA"?2e5:C.b,onChange:I=>x({...C,b:I.target.value}),disabled:C.s==="VARZEA"}),s.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[s.jsxs("div",{children:[s.jsx("label",{style:{fontSize:11,color:"#aaa"},children:"Divisão Nacional"}),s.jsx("select",{className:"input-field",value:C.s,onChange:I=>{const H=I.target.value;x({...C,s:H,b:H==="VARZEA"?"200000":"10000000"})},children:oa.map(I=>s.jsx("option",{value:I,children:I==="VARZEA"?"Série E (Várzea)":`Série ${I}`},I))})]}),s.jsxs("div",{children:[s.jsx("label",{style:{fontSize:11,color:"#aaa"},children:"Federação Estadual"}),s.jsxs("select",{className:"input-field",value:C.estado||"",onChange:I=>x({...C,estado:I.target.value}),children:[s.jsx("option",{value:"",children:"-- Escolha --"}),Dn.map(I=>s.jsx("option",{value:I,children:I},I))]})]})]}),s.jsx("input",{className:"input-field",type:"password",placeholder:"Crie uma Senha",value:C.p,onChange:I=>x({...C,p:I.target.value})}),C.s==="VARZEA"&&(F==null?void 0:F.varzeaOpen)===!1&&s.jsxs("div",{className:"login-varzea-warning",children:[s.jsx("b",{className:"login-varzea-warning-title",children:"🛑 INSCRIÇÕES ENCERRADAS!"}),s.jsx("span",{className:"login-varzea-warning-text",children:"A Federação informa que o limite de clubes da Várzea foi atingido."})]}),s.jsx("button",{className:`btn ${C.s==="VARZEA"&&(F==null?void 0:F.varzeaOpen)===!1?"btn-ghost":"btn-green"}`,disabled:C.s==="VARZEA"&&(F==null?void 0:F.varzeaOpen)===!1,onClick:()=>{if(!C.n||!C.p||!C.estado)return alert("⚠️ Preencha nome, senha e escolha o ESTADO!");if(t.find(J=>J.name&&J.name.toLowerCase()===C.n.toLowerCase()))return alert("🚫 Este nome de clube já está em uso!");const I=C.s==="VARZEA"?"ACTIVE":"PENDING",H=C.s==="VARZEA"?2e5:parseFloat(C.b);h.collection("teams").add({name:C.n,balance:H,serie:C.s,estado:C.estado,password:C.p,stadiumLevel:1,logo:C.l||null,status:I,stats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0},stateStats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}}).then(()=>{I==="ACTIVE"?(alert("✅ Clube de Várzea fundado! Bem-vindo ao Estadual de "+C.estado+"!"),window.location.reload()):(alert("✅ Solicitação enviada à Federação! Aguarde aprovação."),x({n:"",b:"10000000",s:"A",p:"",l:null,estado:""}),l("LOGIN"))})},children:"FUNDAR CLUBE E FILIAR À FEDERAÇÃO"}),C.s==="VARZEA"&&s.jsx("p",{className:"login-varzea-note",children:"* Times da Várzea iniciam com teto de ₣ 200.000 e aprovação imediata."})]}),w==="PRESS"&&s.jsxs("div",{children:[s.jsxs("div",{style:{display:"flex",gap:10,marginBottom:10},children:[s.jsx("button",{className:"btn btn-ghost",onClick:()=>y("LOGIN_P"),children:"LOGIN"}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>y("NEW_PAPER"),children:"CRIAR JORNAL"}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>y("NEW_JOURNO"),children:"SOU JORNALISTA"})]}),f==="LOGIN_P"&&!W&&s.jsxs("div",{children:[s.jsx("h4",{children:"Selecione o Jornal"}),(a||[]).filter(I=>I.status==="ACTIVE").map(I=>s.jsxs("div",{className:"card",onClick:()=>oe(I),children:["📰 ",I.name]},I.id))]}),f==="LOGIN_P"&&W&&s.jsxs("div",{children:[s.jsx("button",{className:"btn",style:{marginBottom:10},onClick:()=>oe(null),children:"⬅ VOLTAR"}),s.jsxs("h4",{children:[W.name," - Jornalistas"]}),s.jsxs("div",{className:"card",onClick:()=>z({...W,type:"PAPER"}),style:{border:"1px solid var(--primary)"},children:["👑 ",W.ownerName," (Dono)"]}),(n||[]).filter(I=>I.newspaperId===W.id&&I.status==="ACTIVE").map(I=>s.jsxs("div",{className:"card",onClick:()=>z({...I,type:"JOURNALIST"}),children:["✒️ ",I.name]},I.id))]}),f==="NEW_PAPER"&&s.jsxs("div",{children:[s.jsx("input",{className:"input-field",placeholder:"Nome do Jornal",id:"pn"}),s.jsx("input",{className:"input-field",placeholder:"Seu Nome (Dono)",id:"po"}),s.jsx("input",{className:"input-field",type:"number",placeholder:"Senha",id:"pp"}),s.jsx("button",{className:"btn btn-green",onClick:()=>p(document.getElementById("pn").value,document.getElementById("pp").value,document.getElementById("po").value),children:"SOLICITAR CRIAÇÃO"})]}),f==="NEW_JOURNO"&&s.jsxs("div",{children:[s.jsx("input",{className:"input-field",placeholder:"Seu Nome",id:"jn"}),s.jsxs("select",{className:"input-field",id:"jp_id",children:[s.jsx("option",{value:"",children:"Selecione o Jornal"}),(a||[]).filter(I=>I.status==="ACTIVE").map(I=>s.jsx("option",{value:I.id,children:I.name},I.id))]}),s.jsx("input",{className:"input-field",type:"number",placeholder:"Senha",id:"jp"}),s.jsx("button",{className:"btn btn-green",onClick:()=>m(document.getElementById("jn").value,document.getElementById("jp").value,document.getElementById("jp_id").value),children:"SOLICITAR EMPREGO"})]})]}),w==="COMPANY"&&s.jsxs("div",{children:[s.jsx("h3",{style:{color:"var(--purple)"},children:"Abrir Empresa"}),s.jsx("input",{className:"input-field",placeholder:"Nome da Empresa",value:D.n,onChange:I=>_({...D,n:I.target.value})}),s.jsx("input",{className:"input-field",placeholder:"Nome do Dono",value:D.owner,onChange:I=>_({...D,owner:I.target.value})}),s.jsx("label",{className:"login-company-label",children:"Porte da Empresa"}),s.jsxs("select",{className:"input-field",value:D.type,onChange:I=>_({...D,type:I.target.value}),children:[s.jsx("option",{value:"COMERCIO",children:"Comércio Local"}),s.jsx("option",{value:"MEDIA",children:"Média Empresa"}),s.jsx("option",{value:"GRANDE",children:"Grande Empresa"})]}),s.jsxs("div",{className:"login-company-box",children:[s.jsxs("div",{className:"login-info-row",style:{marginBottom:5},children:[s.jsx("span",{children:"💰 Capital Inicial:"}),s.jsx("span",{className:"login-company-highlight-primary",children:ie(X.start)})]}),s.jsxs("div",{className:"login-info-row",children:[s.jsx("span",{children:"💸 Imposto Semanal:"}),s.jsx("span",{className:"login-company-highlight-danger",children:ie(X.tax)})]}),s.jsxs("p",{className:"login-company-tax-note",children:['"',X.desc,'"']})]}),s.jsx("input",{className:"input-field",type:"number",placeholder:"Senha de Acesso",value:D.p,onChange:I=>_({...D,p:I.target.value})}),s.jsx("button",{className:"btn btn-purple",onClick:()=>E(D),children:"SOLICITAR ABERTURA"})]}),w==="COACH"&&s.jsxs("div",{children:[s.jsx("h3",{className:"login-coach-title",children:"🎓 Licença Profissional"}),s.jsx("p",{style:{fontSize:12,color:"#aaa"},children:"Inicie sua carreira no Staff de um Clube."}),s.jsx("div",{className:"card login-coach-card-info",children:s.jsxs("div",{className:"login-info-row",children:[s.jsxs("span",{children:["Nível Inicial: ",s.jsx("b",{children:"1"})]}),s.jsxs("span",{children:["Salário Base: ",s.jsx("b",{children:ie(2500)})]})]})}),s.jsxs("div",{className:"login-coach-avatar-wrapper",children:[s.jsx("div",{className:"login-coach-avatar",children:Y.face?s.jsx("img",{src:Y.face,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}):s.jsx("span",{style:{fontSize:30},children:"📷"})}),s.jsxs("label",{className:"btn btn-ghost login-coach-upload-label",children:["ESCOLHER FOTO DE PERFIL",s.jsx("input",{type:"file",style:{display:"none"},accept:"image/*",onChange:I=>{const H=I.target.files[0];if(!H)return;const J=new FileReader;J.readAsDataURL(H),J.onload=Ce=>{const re=new Image;re.src=Ce.target.result,re.onload=()=>{const ce=document.createElement("canvas"),ge=150;let ve=re.width,fe=re.height;ve>fe?ve>ge&&(fe*=ge/ve,ve=ge):fe>ge&&(ve*=ge/fe,fe=ge),ce.width=ve,ce.height=fe,ce.getContext("2d").drawImage(re,0,0,ve,fe),S({...Y,face:ce.toDataURL("image/jpeg",.8)})}}}})]})]}),s.jsx("label",{style:{textAlign:"left",display:"block",color:"#aaa",fontSize:12},children:"Qual a sua profissão?"}),s.jsxs("select",{className:"input-field",value:Y.role,onChange:I=>S({...Y,role:I.target.value}),style:{borderColor:"gold",color:"gold",fontWeight:"bold"},children:[s.jsx("option",{value:"COACH",children:"👔 Técnico Principal"}),s.jsx("option",{value:"ASSISTANT",children:"📋 Auxiliar Técnico"}),s.jsx("option",{value:"DOCTOR",children:"🩺 Médico Chefe"}),s.jsx("option",{value:"SCOUT",children:"🕵️‍♂️ Olheiro / Diretor"})]}),s.jsx("input",{className:"input-field",value:Y.name,onChange:I=>S({...Y,name:I.target.value}),placeholder:"Seu Nome"}),s.jsx("input",{className:"input-field",type:"password",value:Y.password,onChange:I=>S({...Y,password:I.target.value}),placeholder:"Senha de Acesso"}),Y.role==="COACH"&&s.jsxs(s.Fragment,{children:[s.jsx("label",{style:{textAlign:"left",display:"block",color:"#aaa",fontSize:12},children:"Especialidade Inicial"}),s.jsx("select",{className:"input-field",value:Y.affinity,onChange:I=>S({...Y,affinity:I.target.value}),children:Pu.map(I=>s.jsxs("option",{value:I,children:[I," - Especialista"]},I))})]}),s.jsx("button",{className:"btn btn-gold",onClick:()=>U(Y),children:"GERAR REGISTRO PROFISSIONAL"})]}),w==="NEW_PLAYER"&&s.jsxs("div",{children:[s.jsx("h3",{style:{color:"cyan"},children:"⚽ Inscrição de Atleta"}),s.jsx(Nu,{value:v.nationality,onChange:I=>ne({...v,nationality:I})}),s.jsx("small",{children:"A nacionalidade define qual seleção você poderá representar."}),s.jsx("p",{style:{fontSize:12,color:"#aaa"},children:"Crie seu jogador. Você começará nos Agentes Livres."}),s.jsx("div",{className:"card",style:{border:"1px solid cyan",background:"rgba(0, 255, 255, 0.05)",marginBottom:15},children:s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12},children:[s.jsxs("span",{children:["OVR Inicial (Linha): ",s.jsx("b",{children:"45"})]}),s.jsxs("span",{children:["OVR Inicial (Goleiro): ",s.jsx("b",{children:"60"})]})]})}),s.jsx("input",{className:"input-field",value:v.name,onChange:I=>ne({...v,name:I.target.value}),placeholder:"Nome no Jogo (Ex: João Silva)"}),s.jsx("input",{className:"input-field",value:v.instagram,onChange:I=>ne({...v,instagram:I.target.value}),placeholder:"@ do seu Instagram (Para verificação)"}),s.jsx("input",{className:"input-field",type:"password",value:v.password,onChange:I=>ne({...v,password:I.target.value}),placeholder:"Crie uma Senha de Acesso"}),s.jsx("label",{style:{textAlign:"left",display:"block",color:"#aaa",fontSize:12},children:"Posição Inicial"}),s.jsx("select",{className:"input-field",value:v.position,onChange:I=>ne({...v,position:I.target.value}),children:xu.map(I=>s.jsx("option",{value:I,children:I},I))}),s.jsxs("details",{children:[s.jsx("summary",{children:"Personalizar personagem em pixel art"}),s.jsx(wu,{player:{pixelAppearance:v.pixelAppearance},onChange:I=>ne(H=>({...H,pixelAppearance:I}))})]}),s.jsx("button",{className:"btn btn-blue",onClick:()=>B(v),children:"ENVIAR INSCRIÇÃO"})]}),N&&s.jsx("div",{className:"modal-overlay",children:s.jsxs("div",{className:"modal-content",children:[s.jsx("h3",{children:N.name}),s.jsx("input",{className:"input-field",type:"password",placeholder:"Senha",value:ue,onChange:I=>K(I.target.value)}),s.jsx("button",{className:"btn btn-green",onClick:Ae,children:"ENTRAR"}),s.jsx("button",{className:"btn",onClick:()=>z(null),children:"CANCELAR"})]})})]})},ku=({calendar:t})=>{if(!t||!t.date)return null;const[e,a,n]=t.date.split("-"),r=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][parseInt(a)-1],o=(t.events||[]).filter(d=>d.date>=t.date).sort((d,p)=>new Date(d.date)-new Date(p.date));return s.jsxs("div",{className:"card",style:{background:"linear-gradient(45deg, #1a1a1a, #001a00)",border:"1px solid var(--primary)",marginBottom:20,display:"flex",gap:15,alignItems:"stretch"},children:[s.jsxs("div",{style:{background:"#000",padding:"10px",borderRadius:8,textAlign:"center",minWidth:"80px",border:"1px solid #333",display:"flex",flexDirection:"column",justifyContent:"center"},children:[s.jsx("div",{style:{fontSize:10,color:"var(--primary)",textTransform:"uppercase",fontWeight:"bold"},children:r}),s.jsx("div",{style:{fontSize:30,fontWeight:"900",color:"#fff",lineHeight:1},children:n}),s.jsx("div",{style:{fontSize:10,color:"#888"},children:e})]}),s.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"},children:[s.jsxs("div",{style:{fontSize:11,color:"#aaa",marginBottom:5,fontWeight:"bold"},children:[s.jsx("i",{className:"fas fa-calendar-alt"})," PRÓXIMOS EVENTOS:"]}),o.length===0?s.jsx("div",{style:{fontSize:12,color:"#666",fontStyle:"italic"},children:"Nenhum evento agendado."}):s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4,maxHeight:"60px",overflowY:"auto"},children:o.slice(0,3).map((d,p)=>{const m=d.date===t.date;return s.jsxs("div",{style:{fontSize:11,display:"flex",gap:5,alignItems:"center",color:m?"gold":"#ddd"},children:[s.jsx("b",{style:{color:m?"gold":"var(--primary)"},children:m?"HOJE":`${d.date.split("-")[2]}/${d.date.split("-")[1]}`}),s.jsxs("span",{children:["- ",d.text]})]},p)})})]})]})},Du={"4-3-3 OFENSIVO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"45%",l:"35%"},{t:"35%",l:"65%"},{t:"20%",l:"85%"},{t:"10%",l:"50%"},{t:"20%",l:"15%"}],"4-3-3 DEFENSIVO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"30%"},{t:"65%",l:"70%"},{t:"45%",l:"50%"},{t:"20%",l:"85%"},{t:"10%",l:"50%"},{t:"20%",l:"15%"}],"4-3-3 FALSO 9":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"45%",l:"30%"},{t:"45%",l:"70%"},{t:"20%",l:"85%"},{t:"30%",l:"50%"},{t:"20%",l:"15%"}],"4-3-3 POSSE":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"45%",l:"35%"},{t:"45%",l:"65%"},{t:"25%",l:"75%"},{t:"15%",l:"50%"},{t:"25%",l:"25%"}],"4-4-2 CLÁSSICO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"50%",l:"90%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"50%",l:"10%"},{t:"15%",l:"60%"},{t:"15%",l:"40%"}],"4-4-2 LOSANGO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"50%"},{t:"50%",l:"30%"},{t:"50%",l:"70%"},{t:"35%",l:"50%"},{t:"15%",l:"60%"},{t:"15%",l:"40%"}],"4-4-2 LINHA":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"65%"},{t:"40%",l:"35%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"4-4-1-1":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"55%",l:"90%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"55%",l:"10%"},{t:"30%",l:"50%"},{t:"12%",l:"50%"}],"4-2-3-1 LARGO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"50%"},{t:"30%",l:"85%"},{t:"15%",l:"50%"},{t:"30%",l:"15%"}],"4-2-3-1 ESTREITO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"50%"},{t:"40%",l:"75%"},{t:"40%",l:"25%"},{t:"15%",l:"50%"}],"4-1-4-1":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"50%"},{t:"45%",l:"85%"},{t:"45%",l:"60%"},{t:"45%",l:"40%"},{t:"45%",l:"15%"},{t:"15%",l:"50%"}],"4-1-2-1-2":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"68%",l:"50%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"38%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"4-2-2-2 (BRASIL)":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"70%"},{t:"40%",l:"30%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"4-2-4 OFENSIVO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"20%",l:"85%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"},{t:"20%",l:"15%"}],"4-5-1 RETRANCA":[{t:"90%",l:"50%"},{t:"78%",l:"85%"},{t:"82%",l:"65%"},{t:"82%",l:"35%"},{t:"78%",l:"15%"},{t:"65%",l:"35%"},{t:"65%",l:"65%"},{t:"55%",l:"50%"},{t:"50%",l:"85%"},{t:"50%",l:"15%"},{t:"25%",l:"50%"}],"4-3-2-1 (NATAL)":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"55%",l:"70%"},{t:"55%",l:"30%"},{t:"35%",l:"65%"},{t:"35%",l:"35%"},{t:"12%",l:"50%"}],"3-5-2 TÁTICO":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"50%",l:"90%"},{t:"50%",l:"10%"},{t:"35%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"3-4-3 (CRUYFF)":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"65%",l:"50%"},{t:"50%",l:"50%"},{t:"50%",l:"85%"},{t:"50%",l:"15%"},{t:"20%",l:"85%"},{t:"10%",l:"50%"},{t:"20%",l:"15%"}],"3-4-3 LINHA":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"55%",l:"90%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"55%",l:"10%"},{t:"15%",l:"85%"},{t:"10%",l:"50%"},{t:"15%",l:"15%"}],"3-4-1-2":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"55%",l:"90%"},{t:"55%",l:"10%"},{t:"35%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"3-6-1 CONTROLE":[{t:"90%",l:"50%"},{t:"82%",l:"50%"},{t:"82%",l:"75%"},{t:"82%",l:"25%"},{t:"65%",l:"35%"},{t:"65%",l:"65%"},{t:"50%",l:"90%"},{t:"50%",l:"65%"},{t:"50%",l:"35%"},{t:"50%",l:"10%"},{t:"20%",l:"50%"}],"3-3-1-3 (BIELSA)":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"65%",l:"50%"},{t:"50%",l:"65%"},{t:"50%",l:"35%"},{t:"35%",l:"50%"},{t:"15%",l:"85%"},{t:"10%",l:"50%"},{t:"15%",l:"15%"}],"3-1-4-2":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"65%",l:"50%"},{t:"50%",l:"85%"},{t:"50%",l:"60%"},{t:"50%",l:"40%"},{t:"50%",l:"15%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"5-4-1 ÔNIBUS":[{t:"90%",l:"50%"},{t:"78%",l:"90%"},{t:"82%",l:"70%"},{t:"82%",l:"50%"},{t:"82%",l:"30%"},{t:"78%",l:"10%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"55%",l:"85%"},{t:"55%",l:"15%"},{t:"25%",l:"50%"}],"5-3-2 CONTRA":[{t:"90%",l:"50%"},{t:"75%",l:"90%"},{t:"80%",l:"70%"},{t:"80%",l:"50%"},{t:"80%",l:"30%"},{t:"75%",l:"10%"},{t:"60%",l:"50%"},{t:"55%",l:"75%"},{t:"55%",l:"25%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"5-2-3 ALAS":[{t:"90%",l:"50%"},{t:"75%",l:"90%"},{t:"80%",l:"70%"},{t:"80%",l:"50%"},{t:"80%",l:"30%"},{t:"75%",l:"10%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"18%",l:"85%"},{t:"10%",l:"50%"},{t:"18%",l:"15%"}],"5-2-1-2":[{t:"90%",l:"50%"},{t:"75%",l:"90%"},{t:"80%",l:"70%"},{t:"80%",l:"50%"},{t:"80%",l:"30%"},{t:"75%",l:"10%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"38%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"WM (ANOS 30)":[{t:"92%",l:"50%"},{t:"80%",l:"75%"},{t:"82%",l:"50%"},{t:"80%",l:"25%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"45%",l:"65%"},{t:"45%",l:"35%"},{t:"25%",l:"85%"},{t:"15%",l:"50%"},{t:"25%",l:"15%"}],"2-3-5 (PIRÂMIDE)":[{t:"90%",l:"50%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"60%",l:"80%"},{t:"65%",l:"50%"},{t:"60%",l:"20%"},{t:"35%",l:"90%"},{t:"20%",l:"70%"},{t:"15%",l:"50%"},{t:"20%",l:"30%"},{t:"35%",l:"10%"}],"4-6-0 (SEM ATA)":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"45%",l:"85%"},{t:"45%",l:"15%"},{t:"30%",l:"65%"},{t:"30%",l:"35%"}],"1-1-8 (KAMIKAZE)":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"65%",l:"50%"},{t:"40%",l:"90%"},{t:"25%",l:"75%"},{t:"25%",l:"60%"},{t:"15%",l:"55%"},{t:"15%",l:"45%"},{t:"25%",l:"40%"},{t:"25%",l:"25%"},{t:"40%",l:"10%"}],"VÁRZEA (TUDO P/ FRENTE)":[{t:"90%",l:"50%"},{t:"80%",l:"70%"},{t:"80%",l:"30%"},{t:"65%",l:"50%"},{t:"50%",l:"50%"},{t:"30%",l:"85%"},{t:"15%",l:"70%"},{t:"10%",l:"50%"},{t:"15%",l:"30%"},{t:"25%",l:"50%"},{t:"30%",l:"15%"}],"VÁRZEA (VOLANTAÇO)":[{t:"90%",l:"50%"},{t:"78%",l:"85%"},{t:"82%",l:"65%"},{t:"82%",l:"35%"},{t:"78%",l:"15%"},{t:"60%",l:"80%"},{t:"60%",l:"60%"},{t:"60%",l:"40%"},{t:"60%",l:"20%"},{t:"35%",l:"50%"},{t:"15%",l:"50%"}]},Mu=t=>t==="GOL"?"#E65100":["ZAG","LD","LE"].includes(t)?"#2979FF":["VOL","MC","MD","ME","MEI"].includes(t)?"#00E676":["PTD","PTE","ATA","SA"].includes(t)?"#FF1744":"#888",ju=de.lazy(()=>pe(()=>import("./Broadcast-Bu_zbXWP.js"),__vite__mapDeps([0,1,2,3]),import.meta.url).then(t=>({default:t.Broadcast}))),Fu=de.lazy(()=>pe(()=>import("./NationalTeams-BTCX_nWo.js"),__vite__mapDeps([4,1,3]),import.meta.url).then(t=>({default:t.NationalTeams}))),Vu=de.lazy(()=>pe(()=>import("./AdminPanel-DUPPHpyv.js"),__vite__mapDeps([5,1,6,3,7]),import.meta.url).then(t=>({default:t.AdminPanel}))),Uu=de.lazy(()=>pe(()=>import("./TeamDashboard-CToE-rWy.js"),__vite__mapDeps([8,1,9,3]),import.meta.url).then(t=>({default:t.TeamDashboard}))),Gu=de.lazy(()=>pe(()=>import("./AssistantDashboard-C2VHvfxZ.js"),__vite__mapDeps([10,1,3]),import.meta.url).then(t=>({default:t.AssistantDashboard}))),$u=de.lazy(()=>pe(()=>import("./VisitorDashboard-fLm_Kq6j.js"),__vite__mapDeps([11,1,3]),import.meta.url).then(t=>({default:t.VisitorDashboard}))),pt=de.lazy(()=>pe(()=>import("./LeagueTable-CMltTdH5.js"),__vite__mapDeps([12,1,3]),import.meta.url).then(t=>({default:t.LeagueTable}))),bi=de.lazy(()=>pe(()=>import("./MatchCenter-D06pRN7n.js"),__vite__mapDeps([13,1,14,3]),import.meta.url).then(t=>({default:t.MatchCenter}))),Hu=de.lazy(()=>pe(()=>import("./TournamentHub-DEvt3hAU.js"),__vite__mapDeps([15,1,14,3]),import.meta.url).then(t=>({default:t.TournamentHub}))),Bu=de.lazy(()=>pe(()=>import("./Market-CwVqGI_p.js"),__vite__mapDeps([16,1,6,9,3]),import.meta.url).then(t=>({default:t.Market}))),zu=de.lazy(()=>pe(()=>import("./ShoppingScreen-Ctspp27c.js"),__vite__mapDeps([17,1,3]),import.meta.url).then(t=>({default:t.ShoppingScreen}))),Wu=de.lazy(()=>pe(()=>import("./Ranking-Cph2TSKt.js"),__vite__mapDeps([18,1,6,19,3]),import.meta.url).then(t=>({default:t.Ranking}))),qu=de.lazy(()=>pe(()=>import("./SocialHub-sTWDdsGS.js"),__vite__mapDeps([20,1,3]),import.meta.url).then(t=>({default:t.SocialHub}))),Ku=de.lazy(()=>pe(()=>import("./OffersScreen-Ba34NhKh.js"),__vite__mapDeps([21,1,3]),import.meta.url).then(t=>({default:t.OffersScreen}))),Yu=de.lazy(()=>pe(()=>import("./PublicServices-8Wlqt0Or.js"),__vite__mapDeps([22,1,3]),import.meta.url).then(t=>({default:t.PublicServices}))),Zu=de.lazy(()=>pe(()=>import("./CompanyDashboard-Dom7h4Zq.js"),__vite__mapDeps([23,1,7,3]),import.meta.url).then(t=>({default:t.CompanyDashboard}))),Ju=de.lazy(()=>pe(()=>import("./PlayerDashboard-Cb9lwV-s.js"),__vite__mapDeps([24,1,19,3]),import.meta.url).then(t=>({default:t.PlayerDashboard}))),Xu=de.lazy(()=>pe(()=>import("./CoachDashboard-DGZD2sK5.js"),__vite__mapDeps([25,1,2,3]),import.meta.url).then(t=>({default:t.CoachDashboard}))),Qu=de.lazy(()=>pe(()=>import("./DoctorDashboard-ruu2praI.js"),__vite__mapDeps([26,1,3]),import.meta.url).then(t=>({default:t.DoctorDashboard}))),eh=de.lazy(()=>pe(()=>import("./ScoutDashboard-D5ufV6OE.js"),__vite__mapDeps([27,1,6,3]),import.meta.url).then(t=>({default:t.ScoutDashboard}))),th=de.lazy(()=>pe(()=>import("./PlayerForm-BdjHUAjc.js"),__vite__mapDeps([28,1,6,3]),import.meta.url).then(t=>({default:t.PlayerForm}))),ah=de.lazy(()=>pe(()=>import("./TeamRequestPlayerModal-CuM4r8iE.js"),__vite__mapDeps([29,1,6,3]),import.meta.url).then(t=>({default:t.TeamRequestPlayerModal}))),nh=de.lazy(()=>pe(()=>import("./AdminPlayerModal-CboWY3B4.js"),__vite__mapDeps([30,1,3]),import.meta.url).then(t=>({default:t.AdminPlayerModal}))),ih=de.lazy(()=>pe(()=>import("./TrainingCenterManager-BQQIvHVo.js"),__vite__mapDeps([31,1,3]),import.meta.url).then(t=>({default:t.TrainingCenterManager}))),sh=de.lazy(()=>pe(()=>import("./OfferForm-DHuJ_p5w.js"),__vite__mapDeps([32,1,19,6,3]),import.meta.url).then(t=>({default:t.OfferForm}))),rh=de.lazy(()=>pe(()=>import("./SettingsForm-XvKrt_h0.js"),__vite__mapDeps([33,1,3]),import.meta.url).then(t=>({default:t.SettingsForm}))),Ci=de.lazy(()=>pe(()=>import("./MatchPerformanceForm-CUe3_HdI.js"),__vite__mapDeps([34,1,3]),import.meta.url).then(t=>({default:t.MatchPerformanceForm}))),oh=de.lazy(()=>pe(()=>import("./TeamStandingsEditor-CHzsJoUH.js"),__vite__mapDeps([35,1,3]),import.meta.url).then(t=>({default:t.TeamStandingsEditor}))),lh=de.lazy(()=>pe(()=>import("./PrizeEditor-CMC4GV0b.js"),__vite__mapDeps([36,1,3]),import.meta.url).then(t=>({default:t.PrizeEditor}))),ch=de.lazy(()=>pe(()=>import("./AwardsManager-C3LLTFbc.js"),__vite__mapDeps([37,1,3]),import.meta.url).then(t=>({default:t.AwardsManager}))),dh=de.lazy(()=>pe(()=>import("./TournamentManagerModal-7ypAPSz0.js"),__vite__mapDeps([38,1,3]),import.meta.url).then(t=>({default:t.TournamentManagerModal}))),uh=de.lazy(()=>pe(()=>import("./StatsEditor-CQXhufwG.js"),__vite__mapDeps([39,1,3]),import.meta.url).then(t=>({default:t.StatsEditor}))),hh=de.lazy(()=>pe(()=>import("./MatchManagerForm-DJQbJXWT.js"),__vite__mapDeps([40,1,3]),import.meta.url).then(t=>({default:t.MatchManagerForm})));function ph(){var Un,Gn,$n,Hn,Bn,zn,Wn,qn,Kn,Yn,Zn,Jn,Xn;const[t,e]=q.useState(null),[a,n]=q.useState(!0),[i,r]=q.useState(!1),[o,d]=q.useState([]),[p,m]=q.useState([]),[E,T]=q.useState([]),[u,U]=q.useState([]),[B,F]=q.useState([]),[Q,ee]=q.useState({marketOpen:!0}),[te,P]=q.useState({date:new Date().toISOString().split("T")[0],events:[]}),[k,R]=q.useState([]),[A,b]=q.useState([]),[g,O]=q.useState([]),[w,l]=q.useState([]),[f,y]=q.useState([]),[C,x]=q.useState([]),[D,_]=q.useState([]),[N,z]=q.useState([]),[W,oe]=q.useState([]),[ae,le]=q.useState([]),[ue,K]=q.useState([]),[G,j]=q.useState("HOME"),[Y,S]=q.useState("LIGAS"),[v,ne]=q.useState(null),L=c=>{if(!eo(t,c)){alert("Você não tem permissão para esta função.");return}ne(c)},[X,Ae]=q.useState(!1),[I,H]=q.useState(!1),[J,Ce]=q.useState(null),[re,ce]=q.useState([]),[ge,ve]=q.useState(null);q.useEffect(()=>{if(Ta(t))return Qd(t,c=>{e(c),ne(null)},()=>{kt(),e(null),ne(null),rt.signOut()})},[t==null?void 0:t.type,(Un=t==null?void 0:t.data)==null?void 0:Un.id]),q.useEffect(()=>{let c=!0;const M=Kr();return M?h.collection(Yr[M.type]).doc(M.data.id).get().then($=>{if(!c)return;if(!$.exists||["BLOCKED","PENDING"].includes($.data().status)){kt();return}const se={type:M.type,data:{...$.data(),id:$.id}};e(se),Ka(se),j(ki(se.type,Ja(se,"screen",Ya("savedScreen"))));const he=Ja(se,"matchesTab","LIGAS");S(["LIGAS","ESTADUAIS","COPAS"].includes(he)?he:"LIGAS")}).catch($=>{console.error("Não foi possível restaurar a sessão:",$.code),c&&r(!0)}).finally(()=>{c&&n(!1)}):n(!1),()=>{c=!1}},[]),q.useEffect(()=>{G&&t&&(Za("savedScreen",G),ai(t,"screen",G))},[G,(Gn=t==null?void 0:t.data)==null?void 0:Gn.id,t==null?void 0:t.type]),q.useEffect(()=>{t&&ai(t,"matchesTab",Y)},[Y,($n=t==null?void 0:t.data)==null?void 0:$n.id,t==null?void 0:t.type]);const fe=Ou(t==null?void 0:t.type,G,v==null?void 0:v.type);we("teams",d),we("players",m),we("newspapers",R),we("journalists",b),we("companies",O),we("users",z,!0,null,null,!0),we("financeRequests",F,fe.financeRequests),we("products",l,fe.products),we("sponsorships",y,fe.sponsorships),we("awards",x,fe.awards),we("tournaments",_,fe.tournaments),we("hallOfFame",oe,fe.hallOfFame,"season"),we("matches",le,fe.matches),we("posts",K,fe.posts,"date",50),we("news",U,fe.news,"date",50),q.useEffect(()=>h.collection("config").doc("system").onSnapshot(c=>ee(c.exists?c.data():{marketOpen:!0}),c=>console.error("Configuração indisponível:",c.code)),[]),q.useEffect(()=>{if(fe.calendar)return h.collection("config").doc("calendar").onSnapshot(c=>{c.exists&&P(c.data())},c=>console.error("Calendário indisponível:",c.code))},[fe.calendar]),q.useEffect(()=>{const c=Number(Ya("lastRead")||0);u.length&&u[0].date>c&&H(!0)},[u]),q.useEffect(()=>{if(!t||t.type==="ADMIN"||t.type==="VISITOR"){T([]);return}const c=h.collection("offers").where("recipientId","==",t.data.id).onSnapshot(M=>{const $=M.docs.map(se=>({...se.data(),id:se.id}));T($)},M=>{console.log("Erro ao buscar ofertas:",M)});return()=>c()},[(Hn=t==null?void 0:t.data)==null?void 0:Hn.id,t==null?void 0:t.type]),q.useEffect(()=>{if(!t||!t.data||t.type==="VISITOR"){ce([]);return}ve(null);let c=h.collection("sales");t.type==="COMPANY"?c=c.where("companyId","==",t.data.id):["PLAYER","COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t.type)?c=c.where("buyerId","==",t.data.id):c=c.orderBy("date","desc").limit(300);const M=c.onSnapshot({includeMetadataChanges:!0},$=>{const se=$.docs.map(he=>({id:he.id,...he.data()})).sort((he,ja)=>ja.date-he.date);ce(se),ve($.metadata.fromCache?null:t.data.id)},$=>{console.error("Erro ao carregar mochila:",$)});return()=>M()},[(Bn=t==null?void 0:t.data)==null?void 0:Bn.id,t==null?void 0:t.type]),q.useEffect(()=>{if(!t||t.type!=="PLAYER"||!re||ge!==t.data.id)return;const M=re.filter($=>$.buyerId===t.data.id).reduce(($,se)=>{if(["VEICULO","IMOVEL","TECNOLOGIA","LUXO"].includes(se.cat)){const he=parseInt(se.fameGained)||0;return $+he}return $},0);typeof M=="number"&&(t.data.fame||0)!==M&&(console.log(`Corrigindo Fama: De ${t.data.fame} para ${M}`),h.collection("players").doc(t.data.id).update({fame:M}).catch($=>console.error("Erro ao sincronizar fama:",$)),e($=>({...$,data:{...$.data,fame:M}})))},[re,ge,(zn=t==null?void 0:t.data)==null?void 0:zn.id]),q.useEffect(()=>{if((t==null?void 0:t.type)==="USER"||(t==null?void 0:t.type)==="PLAYER"){const c=t.type==="USER"?o.find(M=>M.id===t.data.id):p.find(M=>M.id===t.data.id);c&&c!==t.data&&e(M=>({...M,data:c}))}if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t==null?void 0:t.type)){const c=N.find(M=>M.id===t.data.id);c&&c!==t.data&&e(M=>({...M,data:c}))}if((t==null?void 0:t.type)==="COMPANY"){const c=g.find(M=>M.id===t.data.id);c&&(c.status==="BLOCKED"?(alert("🚫 Sua empresa foi bloqueada ou faliu."),window.location.reload()):c!==t.data&&e(M=>({...M,data:c})))}},[o,p,g,N,(Wn=t==null?void 0:t.data)==null?void 0:Wn.id,t==null?void 0:t.type]);const Le=de.useRef(!1),[_e,Ee]=q.useState([]),{postNews:et,handleHospitalDonation:ta,login:aa,handleSaveMatch:qs,handleDeleteMatch:_t,handleFinanceApprove:Ks,loginAdmin:Ys,createTeam:Zs,createPlayerAccount:Js,createStaff:Xs,createNewspaper:Qs,createJournalist:er,handleFireCoach:tr,handleCoachSelfActions:na,handleSendCoachOffer:ar,handleCounterCoachOffer:Mn,handleFinalizeCoachContract:wt,adminAction:nr,generateFixtures:ir,handleSeasonTurnAdvanced:sr,createCompany:rr,saveProduct:or,requestSponsorship:lr,processSponsorship:cr,buyProduct:dr,handleCoachIndication:ur,saveTactics:hr,handleCoachUseItem:Da,handleUseItem:pr,resetDatabase:mr,approveTeam:fr,deleteTeam:gr,deletePaper:Ar,deleteJournalist:Er,updateBalance:yr,withdrawMoney:vr,savePlayer:Ir,handleAcceptCoachOffer:mh,handleRejectCoachOffer:fh,handleUpdateCoachSalary:Sr,handleAssistantRegen:Tr,handleCoachTrain:jn,handleEvolveCoachPerk:Ma,sendOffer:br,acceptOffer:Cr,rejectOffer:ut,renewContract:Rr,handleSocialPost:Or,handleSocialLike:_r,handleSocialDelete:wr,updateTeamStats:Nr,saveMatchStats:Fn,handlePlayerSoloTrain:Vn,handlePlayerActions:Pr,subscribeToChat:xr,sendChatMessage:Lr,toggleFollow:kr}=Cu({setLoading:Ae,teams:o,players:p,companies:g,coaches:N,papers:k,journalists:A,setUser:e,setScreen:j,setModal:L,conf:Q,sps:f,user:t,products:w,buyingRef:Le,setSales:ce,posts:ue,setChatMessages:Ee});return i?s.jsxs("div",{className:"container",role:"alert",children:[s.jsx("p",{children:"Não foi possível recuperar sua sessão. Verifique a conexão e tente novamente."}),s.jsx("button",{className:"btn btn-primary",onClick:()=>window.location.reload(),children:"TENTAR NOVAMENTE"}),s.jsx("button",{className:"btn",onClick:()=>{kt(),r(!1)},children:"VOLTAR AO LOGIN"})]}):X||a?s.jsx("div",{style:{display:"grid",placeItems:"center",height:"100vh"},children:"Carregando..."}):t?s.jsxs("div",{children:[s.jsxs("div",{className:"header",children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[t.type==="USER"&&t.data.logo&&s.jsx("img",{src:t.data.logo,style:{width:40,height:40,borderRadius:"50%",border:"2px solid var(--primary)",objectFit:"cover"}}),s.jsxs("div",{children:[s.jsx("div",{style:{fontWeight:"900",fontSize:16},children:t.type==="USER"?t.data.name:((qn=t.data)==null?void 0:qn.name)||t.type}),s.jsx("div",{className:"dev-credits",style:{textAlign:"left",margin:0},children:"Desenvolvido por: Nathan Reis | v2.9.1"})]})]}),s.jsxs("div",{style:{display:"flex",gap:15,alignItems:"center"},children:[["USER","PLAYER","COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t.type)&&s.jsxs("div",{onClick:()=>j("OFFERS"),style:{position:"relative",cursor:"pointer",padding:"5px",display:"flex",alignItems:"center"},children:[s.jsx("i",{className:"fas fa-bell",style:{fontSize:"20px",color:(E||[]).some(c=>c.recipientId===t.data.id&&(c.status==="PENDING"||c.status==="COUNTERED"))?"var(--warning)":"#666",transition:"0.3s"}}),(E||[]).some(c=>c.recipientId===t.data.id&&(c.status==="PENDING"||c.status==="COUNTERED"))&&s.jsx("span",{className:"pulse",style:{position:"absolute",top:"2px",right:"2px",background:"red",borderRadius:"50%",width:"10px",height:"10px",border:"2px solid var(--bg-card)"}})]}),["USER","COMPANY","PLAYER","COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t.type)&&s.jsx("div",{style:{color:"var(--primary)",fontWeight:"bold",marginLeft:10},children:ie(t.data.balance)}),t.type==="USER"&&s.jsx("i",{className:"fas fa-cog",style:{cursor:"pointer",marginLeft:10},onClick:()=>L({type:"SETTINGS",data:t.data})}),s.jsx("i",{className:"fas fa-sign-out-alt",style:{cursor:"pointer",marginLeft:10},onClick:()=>{confirm("Deseja realmente sair e trocar de conta?")&&(kt(),rt.signOut().finally(()=>window.location.reload()))}})]})]}),s.jsxs("div",{className:"container",children:[!["BROADCAST","WATCH_GAMES"].includes(G)&&s.jsx("button",{className:"btn btn-green pixel-feature",onClick:()=>j("BROADCAST"),children:"📺 MATO REAL TV — AMISTOSOS"}),["BROADCAST","WATCH_GAMES"].includes(G)&&s.jsx(ju,{watchOnly:G==="WATCH_GAMES",user:t,teams:o,players:p,onBack:()=>j(pa(t.type))}),G!=="LOGIN"&&s.jsx(ku,{calendar:te}),G==="NATIONAL_TEAMS"&&s.jsx(Fu,{user:t,players:p,coaches:N,onBack:()=>j(pa(t.type))}),G==="HOME"&&t.type==="ADMIN"&&s.jsx(Vu,{onNationalTeams:()=>j("NATIONAL_TEAMS"),onCompetitions:()=>j("MATCHES"),user:t,matches:ae,tourns:D,handleDeleteMatch:_t,setModal:L,teams:o,papers:k,journalists:A,companies:g,reqs:B,config:{...Q,calendar:te},coaches:N,sps:f,players:p,onAct:nr,onGenFixtures:ir,onTurnSeasonAdvanced:sr,onPost:(c,M,$)=>et(`📢 **${c}**
${M}`,$),onApprove:Ks,onReject:c=>h.collection("financeRequests").doc(c).delete(),onEditT:c=>{Ce(c),j("ADMIN_TEAM")},onApproveTeam:fr,onUpdateBal:yr,onDeleteTeam:gr,onApprovePaper:async c=>{await h.collection("newspapers").doc(c).update({status:"ACTIVE"}),alert("Jornal Aprovado com sucesso!")},onDeletePaper:Ar,onDeleteJourno:Er,onRejectPaper:async c=>{await h.collection("newspapers").doc(c).delete(),alert("Jornal Recusado/Excluído!")},onConfig:c=>L({type:"SETTINGS",data:c}),onReset:mr,onApproveComp:async c=>{await h.collection("companies").doc(c).update({status:"ACTIVE"}),alert("Empresa Aprovada!")},onDeleteComp:async c=>{confirm("Excluir Empresa?")&&await h.collection("companies").doc(c).delete()},onUpdateCompBal:async(c,M)=>{await h.collection("companies").doc(c).update({balance:parseFloat(M)}),alert("Saldo Alterado!")},onGenAttrs:async()=>{if(!confirm("Isso vai gerar atributos para TODOS os jogadores que não têm. Continuar?"))return;Ae(!0);const c=h.batch();let M=0;p.forEach($=>{if(!$.attributes){const se=ya($.position||"ATA",$.overall||60);c.update(h.collection("players").doc($.id),{attributes:se}),M++}}),await c.commit(),Ae(!1),alert(`Atributos gerados para ${M} jogadores!`)}}),G==="HOME"&&t.type==="USER"&&s.jsxs("div",{children:[s.jsx(Uu,{team:t.data,players:p.filter(c=>c.teamId===t.data.id),staff:N.filter(c=>c.teamId===t.data.id&&c.status==="ACTIVE"),onFireCoach:tr,onRenewCoach:c=>L({type:"OFFER",data:c}),isVisitor:!1,setModal:L,onEdit:c=>L({type:"PLAYER",data:c}),onAdd:()=>L({type:"PLAYER",data:{teamId:t.data.id}})}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"user-home-view"),(G==="HOME"||G==="ASSISTANT_DASH")&&t.type==="ASSISTANT"&&s.jsxs("div",{children:[s.jsx(Gu,{assistant:t.data,team:o.find(c=>c.id===t.data.teamId),players:p.filter(c=>c.teamId===t.data.teamId),offers:E,sales:re,onUseItem:Da,onTrainRegen:Tr,onSelfAction:(c,M)=>{c==="ACCEPT_OFFER"&&wt(M.offer),c==="REJECT_OFFER"&&ut(M.offer),na(c,M)},onEvolvePerk:Ma,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"assistant-home-container"),G==="HOME"&&t.type==="VISITOR"&&s.jsx("div",{children:s.jsx($u,{players:p,teams:o})}),G==="PRESS_DASH"&&(t.type==="PRESS"||t.type==="PRESS_WORKER")&&s.jsxs("div",{children:[s.jsxs("h3",{children:["Painel de Imprensa (",t.data.name,")"]}),s.jsxs("div",{className:"card",children:[s.jsx("button",{className:"btn btn-blue",onClick:()=>L({type:"POST_NEWS"}),children:"ESCREVER NOTÍCIA"}),s.jsx("button",{className:"btn btn-purple",onClick:()=>L({type:"MATCH_PERFORMANCE"}),children:"LANÇAR SÚMULA (XP)"}),s.jsx("button",{className:"btn btn-gold",onClick:()=>L({type:"TEAM_TABLE"}),children:"EDITAR TABELA"})]}),t.type==="PRESS"&&A.filter(c=>c.newspaperId===t.data.id&&c.status==="PENDING").map(c=>s.jsxs("div",{className:"card",children:[c.name,s.jsx("button",{className:"btn btn-green",onClick:async()=>{await h.collection("journalists").doc(c.id).update({status:"ACTIVE"}),alert("Jornalista aprovado!")},children:"APROVAR"})]},c.id))]}),G==="MATCHES"&&s.jsxs("div",{style:{paddingBottom:60},children:[s.jsxs("div",{style:{display:"flex",gap:5,marginBottom:20,justifyContent:"center",overflowX:"auto"},children:[s.jsx("button",{className:`btn ${Y==="LIGAS"?"btn-blue":"btn-ghost"}`,onClick:()=>S("LIGAS"),style:{padding:"10px 5px",fontSize:10},children:"NACIONAIS"}),s.jsx("button",{className:`btn ${Y==="ESTADUAIS"?"btn-purple":"btn-ghost"}`,onClick:()=>S("ESTADUAIS"),style:{padding:"10px 5px",fontSize:10},children:"🗺️ ESTADUAIS"}),s.jsx("button",{className:`btn ${Y==="COPAS"?"btn-cyan":"btn-ghost"}`,onClick:()=>S("COPAS"),style:{borderColor:"cyan",color:Y==="COPAS"?"#000":"cyan",background:Y==="COPAS"?"cyan":"transparent",padding:"10px 5px",fontSize:10},children:"🏆 COPAS"})]}),Y==="LIGAS"&&s.jsxs("div",{className:"animate-in",children:[s.jsx("h2",{style:{color:"var(--primary)",textAlign:"center",marginTop:0},children:"Campeonato Mato Real"}),s.jsx("div",{style:{marginBottom:20},children:s.jsx(pt,{teams:o,serie:"A",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})})}),s.jsxs("details",{open:!0,children:[s.jsx("summary",{style:{padding:10,background:"#333",borderRadius:5,cursor:"pointer",fontWeight:"bold",marginBottom:10},children:"Divisões de Acesso (B, C, D)"}),s.jsxs("div",{style:{display:"grid",gap:20},children:[s.jsx(pt,{teams:o,serie:"B",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})}),s.jsx(pt,{teams:o,serie:"C",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})}),s.jsx(pt,{teams:o,serie:"D",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})})]})]}),s.jsxs("div",{style:{marginTop:30,border:"2px dashed gold",borderRadius:8,overflow:"hidden"},children:[s.jsx("div",{style:{background:"gold",color:"black",padding:"10px",textAlign:"center",fontWeight:"900",textTransform:"uppercase",letterSpacing:"1px"},children:"🚜 O Terrão (Várzea)"}),s.jsx("div",{style:{padding:5,background:"rgba(255, 215, 0, 0.05)"},children:s.jsx(pt,{teams:o,serie:"VARZEA",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})})})]}),s.jsx("hr",{style:{borderColor:"#333",margin:"20px 0"}}),s.jsx(bi,{matches:ae,teams:o,isAdmin:Ye(t,"competitions"),onCreateMatch:(c,M)=>L({type:"MATCH_MANAGER",data:{serie:c,round:M,homeId:"",awayId:"",scoreHome:0,scoreAway:0,status:"PENDING"}}),onEditMatch:c=>L({type:"MATCH_MANAGER",data:c}),onDeleteMatch:c=>_t(c),onReportMatch:c=>{t.type.includes("PRESS")||Ye(t,"competitions")?L({type:"MATCH_PERFORMANCE",data:{match:c,player:null}}):alert("Apenas imprensa/admin lança súmula.")}})]}),Y==="ESTADUAIS"&&s.jsxs("div",{className:"animate-in",children:[s.jsx("h2",{style:{color:"var(--purple)",textAlign:"center",marginTop:0},children:"🗺️ Campeonatos Estaduais"}),s.jsx("p",{style:{textAlign:"center",fontSize:11,color:"#aaa"},children:"Disputa entre todos os clubes da mesma região, independente de divisão!"}),Dn.map(c=>{const M=ae.filter($=>$.isEstadual&&$.estado===c);return s.jsxs("details",{style:{marginBottom:10},children:[s.jsxs("summary",{style:{padding:15,background:"#1a1a1a",borderRadius:5,cursor:"pointer",fontWeight:"bold",border:"1px solid var(--purple)",color:"var(--purple)"},children:["📍 Campeonato ",c]}),s.jsxs("div",{style:{padding:"10px 0"},children:[s.jsx(pt,{teams:o,serie:"ESTADUAL",estado:c,onInspectTeam:$=>L({type:"VIEW_LINEUP",data:$})}),s.jsxs("div",{style:{marginTop:15},children:[s.jsxs("b",{style:{color:"#aaa",fontSize:11},children:["JOGOS DA RODADA (",c,"):"]}),M.length===0?s.jsx("p",{style:{fontSize:11,color:"#666"},children:"Nenhum jogo gerado ainda."}):s.jsx("div",{style:{marginTop:10},children:s.jsx(bi,{matches:ae.filter($=>$.isEstadual&&$.estado===c),teams:o,isAdmin:Ye(t,"competitions"),onCreateMatch:()=>alert("Jogos estaduais são gerados automaticamente."),onEditMatch:$=>L({type:"MATCH_MANAGER",data:$}),onDeleteMatch:$=>_t($),onReportMatch:$=>{t.type.includes("PRESS")||Ye(t,"competitions")?L({type:"MATCH_PERFORMANCE",data:{match:$,player:null}}):alert("Apenas imprensa/admin lança súmula.")}})})]})]})]},c)})]}),Y==="COPAS"&&s.jsx("div",{className:"animate-in",children:s.jsx(Hu,{tournaments:D,matches:ae,players:p,user:t,teams:o,onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c}),onCreateMatch:c=>L({type:"MATCH_MANAGER",data:{serie:c,round:1,homeId:"",awayId:"",scoreHome:0,scoreAway:0,status:"PENDING"}}),onEditMatch:c=>L({type:"MATCH_MANAGER",data:c}),onDeleteMatch:c=>_t(c),onReportMatch:c=>L({type:"MATCH_PERFORMANCE",data:{match:c,player:null}})})})]}),G==="MARKET"&&s.jsx(Bu,{user:t,me:(Kn=t.data)==null?void 0:Kn.id,teams:o,players:p,coaches:N,open:Q.marketOpen,isVis:t.type==="VISITOR"||t.type==="COACH",onIndicate:ur,onNeg:c=>L({type:"OFFER",data:c}),onPayClause:async c=>{const M=o.find(he=>he.id===t.data.id),$=o.find(he=>he.id===c.teamId);if(M.balance<c.clause)return alert("Saldo insuficiente!");if(!confirm(`Pagar multa de ${ie(c.clause)} por ${c.name}?`))return;const se=h.batch();se.update(h.collection("teams").doc(M.id),{balance:M.balance-c.clause}),se.update(h.collection("teams").doc($.id),{balance:$.balance+c.clause}),se.update(h.collection("players").doc(c.id),{teamId:M.id,status:"NAO_A_VENDA",contract:3,history:Z.firestore.FieldValue.arrayUnion({date:Date.now(),from:$.name,to:M.name,type:"MULTA",value:c.clause})}),await se.commit(),et(`🚨 **MULTA PAGA!**
O **${M.name}** pagou a multa de **${c.name}**!`,"transfer"),alert("Contratado via multa!")},onPre:async c=>{const M=o.find($=>$.id===t.data.id);confirm(`Assinar pré-contrato com ${c.name}?`)&&(await h.collection("players").doc(c.id).update({preContract:{teamId:M.id,teamName:M.name},mood:"🤩"}),et(`📝 **PRÉ-CONTRATO**
**${c.name}** reforçará o **${M.name}** na próxima temporada!`,"transfer"),alert("Pré-contrato assinado!"))},onHireCoach:c=>L({type:"HIRE_COACH",data:c})}),G==="SHOPPING"&&s.jsx(zu,{products:w,companies:g,user:t,players:p,teams:o,onBuy:dr,onDeleteProd:async c=>{confirm("Admin: Excluir produto?")&&await h.collection("products").doc(c).delete()}}),G==="SPONSORSHIPS"&&t.type==="USER"&&s.jsxs("div",{children:[s.jsx("h3",{children:"Buscar Patrocínio"}),s.jsx("p",{style:{fontSize:11,color:"#aaa"},children:"Envie propostas semanais para as empresas."}),g.filter(c=>c.status==="ACTIVE").map(c=>s.jsxs("div",{className:"card",children:[s.jsx("b",{children:c.name})," ",s.jsxs("small",{children:["(",(ka[c.companyType]||{}).label,")"]}),s.jsx("div",{style:{display:"flex",gap:5,marginTop:5},children:s.jsx("button",{className:"btn btn-purple",onClick:()=>{const M=prompt("Valor Semanal pedido (₣):");M&&lr(c.id,M)},children:"PEDIR PATROCÍNIO"})})]},c.id)),s.jsx("hr",{style:{borderColor:"#333"}}),s.jsx("h4",{children:"Meus Contratos"}),f.filter(c=>c.teamId===t.data.id).length===0&&s.jsx("p",{style:{color:"#666"},children:"Sem contratos."}),f.filter(c=>c.teamId===t.data.id).map(c=>s.jsxs("div",{className:"card",style:{borderLeft:`4px solid ${c.status==="ACTIVE"?"var(--primary)":"#666"}`},children:[s.jsx("b",{children:c.companyName}),s.jsx("br",{}),"Valor: ",ie(c.value),"/sem"," ",s.jsxs("small",{children:["(",c.status==="PENDING"?"Aguardando":"Ativo",")"]}),c.status==="ACTIVE"&&s.jsx("button",{className:"btn btn-red",style:{width:"auto",marginTop:5},onClick:()=>{confirm("Encerrar contrato de patrocínio?")&&h.collection("sponsorships").doc(c.id).delete()},children:"ENCERRAR"})]},c.id))]}),G==="RANKING"&&s.jsx(Wu,{teams:o,players:p,sales:re,hallOfFame:W}),G==="NEWS"&&s.jsxs("div",{children:[s.jsx("h3",{children:"Notícias"}),u.map(c=>s.jsxs("div",{className:`news-card news-${c.type}`,children:[c.text,s.jsx("br",{}),s.jsx("small",{style:{color:"#666"},children:new Date(c.date).toLocaleString()})]},c.id))]}),G==="SOCIAL"&&s.jsx(qu,{user:t,posts:ue,onPost:Or,onLike:_r,onDeletePost:wr,onSendChat:Lr,onSubChat:xr,messages:_e,onFollow:kr}),G==="OFFERS"&&s.jsx(Ku,{user:t,offers:E,teams:o,players:p,setModal:L,onAccept:Cr,onReject:ut,onCounter:c=>L({type:"OFFER",data:{...p.find(M=>M.id===c.playerId),oldOffer:c}}),onCoachAccept:wt,onCoachReject:ut,onCoachCounter:Mn}),G==="PUBLIC_SERVICES"&&s.jsx(Yu,{players:p,coaches:N,user:t,onDonate:ta,onOperate:()=>{t.type==="DOCTOR"?j("DOCTOR_DASH"):alert("As cirurgias são realizadas pelo médico no painel médico. O fundo hospitalar deste jogador permanece disponível para o procedimento.")}}),(G==="COMPANY_DASH"||G==="COMPANY_HOME")&&t.type==="COMPANY"&&s.jsx(Zu,{company:t.data,products:w.filter(c=>c.companyId===t.data.id),sps:f.filter(c=>c.companyId===t.data.id),sales:re||[],teams:o,onSaveProd:or,onDeleteProd:async c=>{confirm("Excluir produto?")&&await h.collection("products").doc(c).delete()},onProcessSpons:cr}),G==="PLAYER_DASH"&&t.type==="PLAYER"&&s.jsxs("div",{children:[s.jsx(Ju,{user:t,player:p.find(c=>c.id===t.data.id)||t.data,team:o.find(c=>c.id===t.data.teamId),sales:re||[],onAction:Pr,onUpdatePassword:async c=>{await h.collection("players").doc(t.data.id).update({password:c}),alert("Senha alterada!")},onTrainSolo:Vn,onUseItem:pr,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"player-dash-container"),(G==="HOME"||G==="COACH_DASH")&&t.type==="COACH"&&s.jsxs("div",{children:[s.jsx(Xu,{coach:t.data,team:o.find(c=>c.id===t.data.teamId),players:p.filter(c=>c.teamId===t.data.teamId),offers:E,sales:re,onTrain:jn,onEvolvePerk:Ma,onAddAffinity:async c=>{await h.collection("users").doc(t.data.id).update({affinities:Z.firestore.FieldValue.arrayUnion(c),pendingAffinity:Z.firestore.FieldValue.increment(-1)}),alert("Nova afinidade desbloqueada!")},onAcceptOffer:wt,onRejectOffer:ut,onCounterOffer:Mn,onUpdateSalary:Sr,onSelfAction:na,onSaveTactics:hr,onUseItem:Da,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"coach-home-container"),(G==="HOME"||G==="DOCTOR_DASH")&&t.type==="DOCTOR"&&s.jsxs("div",{children:[s.jsx(Qu,{doctor:t.data,team:o.find(c=>c.id===t.data.teamId),players:p.filter(c=>c.teamId===t.data.teamId),offers:E,sales:re,onUseItem:Da,onSelfAction:(c,M)=>{c==="ACCEPT_OFFER"&&wt(M.offer),c==="REJECT_OFFER"&&ut(M.offer),na(c,M)},onEvolvePerk:Ma,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"doctor-home-container"),(G==="HOME"||G==="SCOUT_DASH")&&t.type==="SCOUT"&&s.jsxs("div",{children:[s.jsx(eh,{scout:t.data,team:o.find(c=>c.id===t.data.teamId),players:p.filter(c=>c.teamId===t.data.teamId),setModal:L,onSelfAction:(c,M)=>{c==="ACCEPT_OFFER"&&wt(M.offer),c==="REJECT_OFFER"&&ut(M.offer),na(c,M)}}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"scout-home-container"),s.jsxs("div",{className:"scroll-hint",children:["Deslize ",s.jsx("i",{className:"fas fa-arrow-right"})]}),s.jsxs("div",{className:"bottom-nav",children:[s.jsxs("div",{className:`nav-item ${["HOME","COMPANY_HOME","COMPANY_DASH","PLAYER_DASH","COACH_DASH","DOCTOR_DASH","ASSISTANT_DASH","SCOUT_DASH","PRESS_DASH"].includes(G)?"active":""}`,onClick:()=>{t.type.includes("PRESS")?j("PRESS_DASH"):t.type==="COMPANY"?j("COMPANY_HOME"):t.type==="PLAYER"?j("PLAYER_DASH"):t.type==="COACH"?j("COACH_DASH"):t.type==="DOCTOR"?j("DOCTOR_DASH"):t.type==="ASSISTANT"?j("ASSISTANT_DASH"):t.type==="SCOUT"?j("SCOUT_DASH"):j("HOME")},children:[s.jsx("i",{className:"fas fa-home"}),s.jsx("span",{children:"INÍCIO"})]}),s.jsxs("div",{role:"button",tabIndex:0,"aria-label":"Assistir jogos",className:`nav-item pixel-feature ${G==="WATCH_GAMES"?"active":""}`,onClick:()=>j("WATCH_GAMES"),onKeyDown:c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),j("WATCH_GAMES"))},children:[s.jsx("i",{className:"fas fa-tv","aria-hidden":"true"}),s.jsx("span",{children:"ASSISTIR"})]}),s.jsxs("div",{className:`nav-item ${G==="MATCHES"?"active":""}`,onClick:()=>j("MATCHES"),children:[s.jsx("i",{className:"fas fa-futbol"}),s.jsx("span",{children:"JOGOS"})]}),s.jsxs("div",{className:`nav-item ${G==="SOCIAL"?"active":""}`,onClick:()=>j("SOCIAL"),children:[s.jsx("i",{className:"fas fa-camera"}),s.jsx("span",{children:"SOCIAL"})]}),s.jsxs("div",{className:`nav-item ${G==="PUBLIC_SERVICES"?"active":""}`,onClick:()=>j("PUBLIC_SERVICES"),children:[s.jsx("i",{className:"fas fa-city"}),s.jsx("span",{children:"CIDADE"})]}),s.jsxs("div",{className:`nav-item ${G==="MARKET"?"active":""}`,onClick:()=>j("MARKET"),children:[s.jsx("i",{className:"fas fa-globe"}),s.jsx("span",{children:"MERCADO"})]}),t.type!=="COMPANY"&&s.jsxs("div",{className:`nav-item ${G==="SHOPPING"?"active":""}`,onClick:()=>j("SHOPPING"),children:[s.jsx("i",{className:"fas fa-shopping-bag"}),s.jsx("span",{children:"SHOP"})]}),t.type==="USER"&&s.jsxs("div",{className:`nav-item ${G==="SPONSORSHIPS"?"active":""}`,onClick:()=>j("SPONSORSHIPS"),children:[s.jsx("i",{className:"fas fa-handshake"}),s.jsx("span",{children:"PATRO"})]}),t.type!=="COMPANY"&&s.jsxs("div",{className:`nav-item ${G==="RANKING"?"active":""}`,onClick:()=>j("RANKING"),children:[s.jsx("i",{className:"fas fa-trophy"}),s.jsx("span",{children:"RANK"})]}),s.jsxs("div",{className:`nav-item ${G==="NEWS"?"active":""}`,onClick:()=>{j("NEWS"),H(!1),Za("lastRead",Date.now())},children:[s.jsx("i",{className:"fas fa-newspaper"}),s.jsx("span",{children:"NEWS"})]}),s.jsxs("div",{role:"button",tabIndex:0,className:`nav-item ${G==="NATIONAL_TEAMS"?"active":""}`,onClick:()=>j("NATIONAL_TEAMS"),onKeyDown:c=>{c.key==="Enter"&&j("NATIONAL_TEAMS")},children:[s.jsx("i",{className:"fas fa-globe-americas","aria-hidden":"true"}),s.jsx("span",{children:"SELEÇÕES"})]})]}),v&&s.jsx("div",{className:"modal-overlay",onClick:c=>c.target===c.currentTarget&&L(null),children:s.jsxs("div",{className:"modal-content",children:[v.type==="PLAYER"&&s.jsx(th,{initial:v.data,onSave:Ir,onDelete:async c=>{h.collection("players").doc(c).delete(),L(null)},isAdmin:Ye(t,"teams"),teams:o,onRenew:Rr,isOwner:t.type==="USER"&&((Yn=v.data)==null?void 0:Yn.teamId)===((Zn=t.data)==null?void 0:Zn.id)}),v.type==="TEAM_REQUEST_PLAYER"&&s.jsx(ah,{team:v.data,onClose:()=>L(null),onSubmit:async c=>{try{Ae(!0);const M=ya(c.position,c.overall);await h.collection("players").add({...c,attributes:M,requestedStatus:c.status,status:"PENDING",xp:0,fame:0,balance:0,stats:{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0}}),Ae(!1),L(null),alert("Inscrição enviada com sucesso! O jogador aparecerá no seu elenco assim que a Federação aprovar.")}catch(M){Ae(!1),alert("Erro ao inscrever: "+M.message)}}}),v.type==="ADMIN_PLAYER"&&s.jsx(nh,{player:v.data,teams:o,onClose:()=>L(null)}),v.type==="CT_TYCOON"&&v.data&&s.jsx(ih,{team:o.find(c=>c.id===v.data.id)||v.data,players:p.filter(c=>c.teamId===v.data.id),staff:(N||[]).filter(c=>c.teamId===v.data.id&&c.status==="ACTIVE"),user:t,onClose:()=>L(null),onTrain:jn,onTrainSolo:Vn}),v.type==="OFFER"&&s.jsx(sh,{target:v.data,myPlayers:p.filter(c=>c.teamId===t.data.id),onSend:br,setModal:L,user:t}),v.type==="SETTINGS"&&s.jsx(rh,{team:v.data||t.data,isAdmin:Ye(t,"teams"),onUp:c=>{var se,he;const M=((se=v.data)==null?void 0:se.id)||t.data.id;let $={...c};c.estado&&!((he=v.data)!=null&&he.stateStats)&&($.stateStats={pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}),h.collection("teams").doc(M).update($),L(null)},onUpgrade:()=>{},onReq:(c,M,$)=>{h.collection("financeRequests").add({teamId:t.data.id,teamName:t.data.name,type:c,amount:parseFloat(M),details:$,status:"PENDING"}),L(null),alert("Enviado!")},onWithdraw:vr}),v.type==="MATCH_PERFORMANCE"&&s.jsx(Ci,{players:p,teams:o,onSaveStats:Fn,matchData:(Jn=v.data)==null?void 0:Jn.match}),v.type==="TEAM_TABLE"&&s.jsx(oh,{teams:o,onUpdateTeamStats:Nr}),v.type==="POST_NEWS"&&s.jsxs("div",{children:[s.jsx("h3",{children:"Nova Notícia"}),s.jsx("input",{className:"input-field",placeholder:"Manchete / Texto",id:"news-body"}),s.jsx("button",{className:"btn btn-blue",onClick:()=>{et(`📰 **${t.data.name}:**
${document.getElementById("news-body").value}`,"press"),L(null)},children:"PUBLICAR"})]}),v.type==="EDIT_PRIZES"&&s.jsx(lh,{initialData:v.data,onSave:async c=>{await h.collection("config").doc("system").update({prizes:c}),alert("Premiações Atualizadas!"),L(null)},onClose:()=>L(null)}),v.type==="AWARDS_MANAGER"&&s.jsx(ch,{awards:C,teams:o,players:p,coaches:N,onClose:()=>L(null)}),v.type==="TOURN_MANAGER"&&s.jsx(dh,{tournaments:D,teams:o,awards:C,onClose:()=>L(null)}),v.type==="STATS_SEARCH"&&s.jsx(uh,{players:p,teams:o,onSave:async(c,M)=>{try{const $=Object.fromEntries(Object.entries(M).map(([se,he])=>[se,Math.max(0,Number.isFinite(Number(he))?Number(he):0)]));await h.collection("players").doc(c).update({stats:$}),L(null),alert("Estatísticas atualizadas!")}catch($){alert("Erro ao salvar: "+$.message)}}}),v.type==="MATCH_MANAGER"&&s.jsx(hh,{initialData:v.data,teams:o,tournaments:D,onSave:qs,onDelete:_t}),v.type==="MATCH_REPORT"&&s.jsx(Ci,{players:p,teams:o,onSaveStats:Fn}),(v==null?void 0:v.type)==="VIEW_LINEUP"&&s.jsx("div",{className:"modal-overlay",onClick:()=>L(null),children:s.jsxs("div",{className:"modal-content animate-in",style:{maxWidth:"550px",maxHeight:"90vh",overflowY:"auto",background:"#121212",border:"1px solid var(--primary)",padding:"15px"},onClick:c=>c.stopPropagation(),children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:15,position:"sticky",top:"-15px",background:"#121212",zIndex:100,padding:"15px 0 10px 0",borderBottom:"1px solid #333"},children:[s.jsxs("h3",{style:{margin:0,color:"var(--primary)",display:"flex",alignItems:"center",gap:10},children:[v.data.logo?s.jsx("img",{src:v.data.logo,style:{width:35,height:35,borderRadius:"50%",border:"1px solid var(--primary)",objectFit:"cover"}}):s.jsx("span",{style:{fontSize:24},children:"🛡️"}),v.data.name]}),s.jsx("button",{className:"btn btn-red",style:{width:"auto",padding:"5px 10px",margin:0},onClick:()=>L(null),children:"FECHAR"})]}),(()=>{const c=v.data.stadiumLevel||1,M=St[c]||St[1],$=v.data.ticketPrice||M.minTic;return s.jsxs("div",{style:{position:"relative",height:130,borderRadius:8,overflow:"hidden",marginBottom:20,border:"1px solid cyan",background:"#111",boxShadow:"0 4px 8px rgba(0,0,0,0.5)"},children:[v.data.stadiumPic?s.jsx("img",{src:v.data.stadiumPic,style:{width:"100%",height:"100%",objectFit:"cover",opacity:.6}}):s.jsx("div",{style:{display:"grid",placeItems:"center",height:"100%",fontSize:50,color:"#333"},children:"🏟️"}),s.jsxs("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0,0,0,0.95))",padding:"30px 10px 10px 10px"},children:[s.jsxs("b",{style:{color:"cyan",fontSize:15,display:"block",marginBottom:4,textShadow:"1px 1px 2px black"},children:[M.name," ",s.jsxs("small",{style:{color:"gold"},children:["(Nvl ",c,")"]})]}),s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:10,color:"#ddd",textShadow:"1px 1px 2px black"},children:[s.jsxs("span",{children:["👥"," ",s.jsx("b",{style:{color:"#fff"},children:M.cap.toLocaleString("pt-BR")})]}),s.jsxs("span",{children:["🎫"," ",s.jsx("b",{style:{color:"#00E676"},children:ie($)})]})]})]})]})})(),(()=>{const c=(N||[]).filter(se=>se.teamId===v.data.id&&se.status==="ACTIVE").sort((se,he)=>se.type.localeCompare(he.type)),M={COACH:"👔",ASSISTANT:"📋",DOCTOR:"🩺",SCOUT:"🕵️‍♂️"},$={COACH:"Técnico",ASSISTANT:"Auxiliar",DOCTOR:"Médico",SCOUT:"Olheiro"};return s.jsxs("div",{style:{marginBottom:25},children:[s.jsx("h4",{style:{color:"gold",margin:"0 0 10px 0",fontSize:14,borderBottom:"1px solid #333",paddingBottom:5},children:"👔 Comissão Técnica"}),c.length===0?s.jsx("p",{style:{fontSize:11,color:"#666",fontStyle:"italic"},children:"Nenhum profissional contratado."}):s.jsx("div",{style:{display:"flex",gap:10,overflowX:"auto",paddingBottom:10},children:c.map(se=>s.jsxs("div",{style:{minWidth:"110px",background:"rgba(255,215,0,0.05)",border:"1px solid gold",borderRadius:8,padding:10,textAlign:"center"},children:[se.face?s.jsx("img",{src:se.face,style:{width:45,height:45,borderRadius:"50%",objectFit:"cover",marginBottom:5,border:"1px solid gold"}}):s.jsx("div",{style:{fontSize:26,marginBottom:5},children:M[se.type]}),s.jsx("b",{style:{fontSize:11,display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:se.name}),s.jsxs("span",{style:{fontSize:9,color:"gold",fontWeight:"bold"},children:[$[se.type]," (Nv ",se.level,")"]})]},se.id))})]})})(),s.jsxs("div",{style:{marginBottom:25},children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-end",borderBottom:"1px solid #333",paddingBottom:5,marginBottom:10},children:[s.jsx("h4",{style:{color:"var(--primary)",margin:0,fontSize:14},children:"⚽ Escalação Principal"}),s.jsxs("span",{style:{fontSize:10,color:"#888"},children:["Esquema:"," ",((Xn=v.data.tactics)==null?void 0:Xn.formation)||"Não definido"]})]}),s.jsx("div",{className:"football-field",style:{height:"400px",pointerEvents:"none",position:"relative"},children:v.data.tactics?zs[v.data.tactics.formation].map((c,M)=>{const $=Du[v.data.tactics.formation][M],se=v.data.tactics.lineup[M],he=p.find(ja=>ja.id===se);return s.jsxs("div",{style:{position:"absolute",top:$.t,left:$.l,transform:"translate(-50%, -50%)",display:"flex",flexDirection:"column",alignItems:"center"},children:[s.jsx("div",{className:"player-photo-circle",style:{width:"36px",height:"36px",border:he?"2px solid gold":"1px dashed #666",background:he?"#001a33":"rgba(0,0,0,0.4)",boxShadow:"0 4px 6px rgba(0,0,0,0.6)"},children:he!=null&&he.face?s.jsx("img",{src:he.face,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}):s.jsx("span",{style:{fontSize:"9px"},children:c})}),s.jsx("div",{className:"player-name-label",style:{fontSize:"9px",padding:"2px 6px",background:he?"#fff":"rgba(0,0,0,0.8)",color:he?"#000":"#fff",fontWeight:"900",marginTop:"3px",borderRadius:"4px",border:he?"1px solid #333":"none",boxShadow:"0 2px 5px rgba(0,0,0,0.8)",letterSpacing:"0.5px"},children:he?`${he.name.split(" ")[0].toUpperCase()} | ${he.overall}`:"VAZIO"})]},M)}):s.jsxs("div",{style:{display:"grid",placeItems:"center",height:"100%",color:"#fff",fontSize:"13px",textAlign:"center",padding:20},children:[s.jsx("br",{}),"O técnico ainda não enviou a súmula tática."]})})]}),(()=>{const c=v.data.tactics?Object.values(v.data.tactics.lineup):[],M=p.filter($=>$.teamId===v.data.id&&!c.includes($.id)).sort(($,se)=>se.overall-$.overall);return s.jsxs("div",{style:{marginBottom:25},children:[s.jsxs("h4",{style:{color:"var(--secondary)",margin:"0 0 10px 0",fontSize:14,borderBottom:"1px solid #333",paddingBottom:5},children:["🪑 Banco de Reservas (",M.length,")"]}),M.length===0?s.jsx("p",{style:{fontSize:11,color:"#666",fontStyle:"italic"},children:"Nenhum jogador no banco de reservas."}):s.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:M.map($=>s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,background:"#1a1a1a",padding:8,borderRadius:6,borderLeft:`3px solid ${Mu($.position)}`,border:"1px solid #333"},children:[$.face?s.jsx("img",{src:$.face,style:{width:32,height:32,borderRadius:"50%",objectFit:"cover",objectPosition:"top"}}):s.jsx("div",{style:{width:32,height:32,borderRadius:"50%",background:"#333",display:"grid",placeItems:"center",fontSize:10},children:"👤"}),s.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[s.jsxs("b",{style:{fontSize:11,display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:[$.name," ",$.recoveryLeft>0?"🏥":""]}),s.jsx("span",{style:{fontSize:9,color:"#aaa"},children:$.position})]}),s.jsx("b",{style:{color:$.overall>=80?"gold":$.overall>=70?"lime":"white",fontSize:14},children:$.overall})]},$.id))})]})})(),s.jsxs("div",{children:[s.jsx("h4",{style:{color:"gold",margin:"0 0 10px 0",fontSize:14,borderBottom:"1px solid #333",paddingBottom:5},children:"🏆 Sala de Troféus"}),!v.data.trophies||v.data.trophies.length===0?s.jsx("p",{style:{fontSize:11,color:"#666",textAlign:"center",padding:20,background:"#1a1a1a",borderRadius:8,fontStyle:"italic"},children:"A estante do clube ainda está vazia."}):s.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(80px, 1fr))",gap:10},children:[...v.data.trophies].reverse().map((c,M)=>s.jsxs("div",{style:{textAlign:"center",background:"rgba(255,215,0,0.05)",padding:10,borderRadius:8,border:"1px solid #444"},children:[s.jsx("img",{src:c.img,style:{width:45,height:45,objectFit:"contain",filter:"drop-shadow(0 0 5px rgba(255,215,0,0.5))"}}),s.jsx("div",{style:{fontSize:9,fontWeight:"bold",color:"#fff",marginTop:5},children:c.name}),s.jsx("div",{style:{fontSize:8,color:"gold"},children:c.tournament})]},M))})]})]})}),v.type==="HIRE_COACH"&&s.jsxs("div",{className:"modal-content",children:[s.jsxs("h3",{children:["Negociar com ",v.data.name]}),s.jsx("label",{children:"Salário Semanal (₣)"}),s.jsx("input",{className:"input-field",type:"number",id:"c_salary",defaultValue:v.data.salary}),s.jsx("label",{children:"Duração (Temporadas)"}),s.jsxs("select",{className:"input-field",id:"c_contract",children:[s.jsx("option",{value:"1",children:"1 Temporada"}),s.jsx("option",{value:"2",children:"2 Temporadas"}),s.jsx("option",{value:"3",children:"3 Temporadas"})]}),s.jsx("label",{children:"Multa Rescisória (₣)"}),s.jsx("input",{className:"input-field",type:"number",id:"c_clause",defaultValue:v.data.salary*10}),s.jsxs("div",{style:{display:"flex",gap:10,marginTop:15},children:[s.jsx("button",{className:"btn btn-green",onClick:()=>{const c=document.getElementById("c_salary").value,M=document.getElementById("c_contract").value,$=document.getElementById("c_clause").value;ar(v.data.id,c,M,$),L(null)},children:"ENVIAR PROPOSTA"}),s.jsx("button",{className:"btn btn-red",onClick:()=>L(null),children:"CANCELAR"})]})]})]})})]})]}):s.jsx(Lu,{teams:o,players:p,papers:k,journalists:A,companies:g,coaches:N,onLogin:aa,onCreateTeam:Zs,onCreatePaper:Qs,onCreateJourno:er,onCreateCompany:rr,onAdmin:Ys,onVisitor:()=>{e({type:"VISITOR",data:{id:"visitor",name:"Visitante"}}),j("RANKING")},onCreateCoach:Xs,onCreatePlayer:Js,config:Q})}xi(document.getElementById("root")).render(s.jsx(Zr,{children:s.jsx(de.Suspense,{fallback:s.jsx("div",{style:{display:"grid",placeItems:"center",height:"100vh"},children:"Carregando..."}),children:s.jsx(ph,{})})}));export{Mi as A,Us as B,ie as C,Mu as D,ka as E,zs as F,St as G,Vs as H,cu as I,oa as J,_h as K,ln as L,ra as M,Hs as N,Wt as O,yu as P,Au as Q,wu as R,on as S,Pu as T,xu as U,vu as V,Dn as W,Du as a,Vt as b,Ye as c,$s as d,h as e,kn as f,ya as g,Ch as h,iu as i,s as j,ou as k,Ja as l,Sh as m,Th as n,ai as o,su as p,Nu as q,Rh as r,Oh as s,hu as t,Fs as u,bh as v,Sa as w,vh as x,Ih as y,yh as z};
