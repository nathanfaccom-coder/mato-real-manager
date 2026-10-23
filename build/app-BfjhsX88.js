const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Broadcast-DwZ-MLB1.js","./react-nf7bT_Uh.js","./firebase-927kk_Ef.js","./NationalTeams-xav28Oox.js","./AdminPanel-BISJFSDA.js","./getRecommendedPrice-J9S5cFrD.js","./getProdCost-BOBAoKhR.js","./TeamDashboard-CtxIKqm7.js","./AttributeGrid-DqirA_N1.js","./AssistantDashboard-DH1D_X51.js","./VisitorDashboard-DAy56lSU.js","./LeagueTable-DE_qT3r-.js","./MatchCenter-DXApAogt.js","./MatchTeamLogo-CnJdMjG4.js","./TournamentHub-5skzN8O6.js","./Market-C6QctcU_.js","./ShoppingScreen-CwpDNNFT.js","./Ranking-CAr3S7sJ.js","./PlayerCard-BIaMe19d.js","./SocialHub-Bz6CkI47.js","./OffersScreen-DvrApEPe.js","./PublicServices-DLSQIy2v.js","./CompanyDashboard-iSIvX6jZ.js","./PlayerDashboard-D6zKj-pe.js","./CoachDashboard-DY9T9__B.js","./DoctorDashboard-wKCbwrlr.js","./ScoutDashboard-nkgaA9bH.js","./PlayerForm-D8N2apLO.js","./TeamRequestPlayerModal-DWbSBdqU.js","./AdminPlayerModal-C7m47b9C.js","./TrainingCenterManager-4-IXlM0Y.js","./OfferForm-C62FUp_m.js","./SettingsForm-cqdj7iiZ.js","./MatchPerformanceForm-DTOUUExn.js","./TeamStandingsEditor-Dswjpycg.js","./PrizeEditor-DTjEuwJY.js","./AwardsManager-DQeFgRB8.js","./TournamentManagerModal-3igF9lMa.js","./StatsEditor-ClQC93EO.js","./MatchManagerForm-C-hpu_NY.js"])))=>i.map(i=>d[i]);
import{r as W,a as Lr,R as de}from"./react-nf7bT_Uh.js";import{f as Y,L as kr,g as Dr,i as Mr,a as da,_ as Xa,C as qn,r as Qa,b as Ci,S as qt,E as ua,c as me,d as jr,e as Ri,h as be,F as Je,j as Fr,q as Tt,k as mt,l as Lt,m as Oi,n as Vr,o as _i,p as Kn}from"./firebase-927kk_Ef.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();var wi={exports:{}},Sn={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ur=W,Gr=Symbol.for("react.element"),$r=Symbol.for("react.fragment"),Hr=Object.prototype.hasOwnProperty,Br=Ur.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,zr={key:!0,ref:!0,__self:!0,__source:!0};function Ni(t,e,n){var a,i={},r=null,o=null;n!==void 0&&(r=""+n),e.key!==void 0&&(r=""+e.key),e.ref!==void 0&&(o=e.ref);for(a in e)Hr.call(e,a)&&!zr.hasOwnProperty(a)&&(i[a]=e[a]);if(t&&t.defaultProps)for(a in e=t.defaultProps,e)i[a]===void 0&&(i[a]=e[a]);return{$$typeof:Gr,type:t,key:r,ref:o,props:i,_owner:Br.current}}Sn.Fragment=$r;Sn.jsx=Ni;Sn.jsxs=Ni;wi.exports=Sn;var s=wi.exports,Pi,ei=Lr;Pi=ei.createRoot,ei.hydrateRoot;const xi=new Set(["USER","PLAYER","COMPANY","PRESS","PRESS_WORKER","COACH","DOCTOR","SCOUT","ASSISTANT"]);function Wr(t=localStorage){var e;try{const n=JSON.parse(t.getItem("user")||"null");return!n||!xi.has(n.type)||typeof((e=n.data)==null?void 0:e.id)!="string"?null:{type:n.type,data:{id:n.data.id}}}catch{return null}}function Yn(t,e=localStorage){var n;try{xi.has(t==null?void 0:t.type)&&((n=t.data)!=null&&n.id)?e.setItem("user",JSON.stringify({type:t.type,data:{id:t.data.id}})):e.removeItem("user")}catch{}}function kt(t=localStorage){try{const e=Array.from({length:t.length||0},(n,a)=>t.key(a));for(const n of e)n!=null&&n.startsWith("navigation:")&&t.removeItem(n)}catch{}for(const e of["user","savedScreen","lastRead"])try{t.removeItem(e)}catch{}}function Zn(t,e=localStorage){try{return e.getItem(t)}catch{return null}}function Jn(t,e,n=localStorage){try{n.setItem(t,e)}catch{}}const qr={USER:"teams",PLAYER:"players",COMPANY:"companies",PRESS:"newspapers",PRESS_WORKER:"journalists",COACH:"users",DOCTOR:"users",SCOUT:"users",ASSISTANT:"users"};function mn(t){return{PLAYER:"PLAYER_DASH",COACH:"COACH_DASH",DOCTOR:"DOCTOR_DASH",SCOUT:"SCOUT_DASH",ASSISTANT:"ASSISTANT_DASH",COMPANY:"COMPANY_DASH",PRESS:"PRESS_DASH",PRESS_WORKER:"PRESS_DASH",VISITOR:"RANKING"}[t]||"HOME"}function Li(t,e){return["BROADCAST","NATIONAL_TEAMS","MATCHES","MARKET","SHOPPING","RANKING","NEWS","SOCIAL","OFFERS","PUBLIC_SERVICES"].includes(e)||e===mn(t)||e==="SPONSORSHIPS"&&t==="USER"||e==="COMPANY_HOME"&&t==="COMPANY"?e:mn(t)}function ki(t,e){return`navigation:${t.type}:${t.data.id}:${e}`}function Xn(t,e,n=null){return Zn(ki(t,e))??n}function ti(t,e,n){Jn(ki(t,e),n)}class Kr extends de.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,n){console.error("Crash:",e,n)}render(){return this.state.hasError?s.jsxs("div",{className:"error-screen",children:[s.jsx("h2",{children:"Ocorreu um erro!"}),s.jsx("p",{children:"O aplicativo encontrou um problema inesperado."}),s.jsx("button",{className:"btn btn-red",onClick:()=>{kt(),window.location.reload()},children:"REINICIAR APLICATIVO"})]}):this.props.children}}const Yr="modulepreload",Zr=function(t,e){return new URL(t,e).href},ni={},pe=function(e,n,a){let i=Promise.resolve();if(n&&n.length>0){const o=document.getElementsByTagName("link"),u=document.querySelector("meta[property=csp-nonce]"),d=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));i=Promise.allSettled(n.map(E=>{if(E=Zr(E,a),E in ni)return;ni[E]=!0;const I=E.endsWith(".css"),g=I?'[rel="stylesheet"]':"";if(!!a)for(let J=o.length-1;J>=0;J--){const V=o[J];if(V.href===E&&(!I||V.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${E}"]${g}`))return;const H=document.createElement("link");if(H.rel=I?"stylesheet":Yr,I||(H.as="script"),H.crossOrigin="",H.href=E,d&&H.setAttribute("nonce",d),document.head.appendChild(H),I)return new Promise((J,V)=>{H.addEventListener("load",J),H.addEventListener("error",()=>V(new Error(`Unable to preload CSS for ${E}`)))})}))}function r(o){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=o,window.dispatchEvent(u),!u.defaultPrevented)throw o}return i.then(o=>{for(const u of o||[])u.status==="rejected"&&r(u.reason);return e().catch(r)})},Kt="NEXLYzsJfLPsTxzp3LKHKwaPhEZ2",Di=Object.freeze({teams:"Times e jogadores (cadastros, elencos e configurações)",finance:"Finanças e premiações",press:"Imprensa e jornalistas",companies:"Empresas",staff:"Comissão técnica",calendar:"Calendário",competitions:"Campeonatos, partidas e súmulas",nationalTeams:"Seleções, técnicos e convocações"}),Tn=t=>{var e;return(t==null?void 0:t.type)==="ADMIN"&&((e=t.data)==null?void 0:e.id)===Kt},bn=t=>(t==null?void 0:t.type)==="ADMIN"&&!Tn(t);function Ye(t,e){var n,a;return Tn(t)||bn(t)&&Object.hasOwn(Di,e)&&((a=(n=t.data)==null?void 0:n.permissions)==null?void 0:a.includes(e))}function Cn(t){if(!Array.isArray(t)||t.some(e=>!Object.hasOwn(Di,e)))throw Error("Permissão inválida.");return[...new Set(t)]}const Jr={TEAM_TABLE:"competitions",POST_NEWS:"press",EDIT_PRIZES:"finance",STATS_SEARCH:"competitions",MATCH_REPORT:"competitions",ADMIN_PLAYER:"teams",PLAYER:"teams",SETTINGS:"teams",STATS:"competitions",TEAM_STANDINGS:"competitions",TOURN_MANAGER:"competitions",MATCH_MANAGER:"competitions",MATCH_PERFORMANCE:"competitions",AWARDS_MANAGER:"finance",PRIZES:"finance"};function Xr(t,e){return!bn(t)||!e||["VIEW_LINEUP","VIEW_PLAYER"].includes(e.type)?!0:Ye(t,Jr[e.type])}const Qr={approveTeam:"teams",deleteTeam:"teams",savePlayer:"teams",deletePaper:"press",deleteJournalist:"press",postNews:"press",handleFinanceApprove:"finance",updateBalance:"finance",handleSaveMatch:"competitions",handleDeleteMatch:"competitions",generateFixtures:"competitions",saveMatchStats:"competitions",updateTeamStats:"competitions",handleSocialDelete:"press"};function eo(t,e,n=a=>alert(a)){return bn(e)?Object.fromEntries(Object.entries(t).map(([a,i])=>[a,(...r)=>{if(!Ye(e,Qr[a])){n("Você não tem permissão para esta função.");return}return i(...r)}])):t}const to={apiKey:"AIzaSyBrtJFfWAqT0AZYHlm4it-noB5h9jIPJEI",authDomain:"gerenciador-de-times-matoreal.firebaseapp.com",projectId:"gerenciador-de-times-matoreal",storageBucket:"gerenciador-de-times-matoreal.firebasestorage.app",messagingSenderId:"29096266740",appId:"1:29096266740:web:ec48e7225c18c20dbc07a1"};Y.apps.length||Y.initializeApp(to);const h=Y.firestore();h.enablePersistence({synchronizeTabs:!0}).catch(t=>{["failed-precondition","unimplemented"].includes(t.code)||console.warn("Cache indisponível:",t.code)});function ha(t,e){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.indexOf(a)<0&&(n[a]=t[a]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(t);i<a.length;i++)e.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(t,a[i])&&(n[a[i]]=t[a[i]]);return n}const Nt={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",TWITTER:"twitter.com"},ht={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
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
 */function no(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registed for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend."}}function Mi(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ao=no,io=Mi,ji=new ua("auth","Firebase",Mi());/**
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
 */const fn=new kr("@firebase/auth");function so(t,...e){fn.logLevel<=Ri.WARN&&fn.warn(`Auth (${qt}): ${t}`,...e)}function cn(t,...e){fn.logLevel<=Ri.ERROR&&fn.error(`Auth (${qt}): ${t}`,...e)}/**
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
 */function Oe(t,...e){throw pa(t,...e)}function Re(t,...e){return pa(t,...e)}function Fi(t,e,n){const a=Object.assign(Object.assign({},io()),{[e]:n});return new ua("auth","Firebase",a).create(e,{appName:t.name})}function bt(t,e,n){const a=n;if(!(e instanceof a))throw a.name!==e.constructor.name&&Oe(t,"argument-error"),Fi(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function pa(t,...e){if(typeof t!="string"){const n=e[0],a=[...e.slice(1)];return a[0]&&(a[0].appName=t.name),t._errorFactory.create(n,...a)}return ji.create(t,...e)}function F(t,e,...n){if(!t)throw pa(e,...n)}function Ue(t){const e="INTERNAL ASSERTION FAILED: "+t;throw cn(e),new Error(e)}function De(t,e){t||Ue(e)}/**
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
 */function Ut(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function ma(){return ai()==="http:"||ai()==="https:"}function ai(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function ro(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ma()||Ci()||"connection"in navigator)?navigator.onLine:!0}function oo(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Yt{constructor(e,n){this.shortDelay=e,this.longDelay=n,De(n>e,"Short delay should be less than long delay!"),this.isMobile=Mr()||da()}get(){return ro()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function fa(t,e){De(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Vi{static initialize(e,n,a){this.fetchImpl=e,n&&(this.headersImpl=n),a&&(this.responseImpl=a)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Ue("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Ue("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Ue("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const lo={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const co=new Yt(3e4,6e4);function Se(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Te(t,e,n,a,i={}){return Ui(t,i,async()=>{let r={},o={};a&&(e==="GET"?o=a:r={body:JSON.stringify(a)});const u=Tt(Object.assign({key:t.config.apiKey},o)).slice(1),d=await t._getAdditionalHeaders();return d["Content-Type"]="application/json",t.languageCode&&(d["X-Firebase-Locale"]=t.languageCode),Vi.fetch()(Gi(t,t.config.apiHost,n,u),Object.assign({method:e,headers:d,referrerPolicy:"no-referrer"},r))})}async function Ui(t,e,n){t._canInitEmulator=!1;const a=Object.assign(Object.assign({},lo),e);try{const i=new uo(t),r=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Dt(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const u=r.ok?o.errorMessage:o.error.message,[d,E]=u.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw Dt(t,"credential-already-in-use",o);if(d==="EMAIL_EXISTS")throw Dt(t,"email-already-in-use",o);if(d==="USER_DISABLED")throw Dt(t,"user-disabled",o);const I=a[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(E)throw Fi(t,I,E);Oe(t,I)}}catch(i){if(i instanceof Je)throw i;Oe(t,"network-request-failed",{message:String(i)})}}async function We(t,e,n,a,i={}){const r=await Te(t,e,n,a,i);return"mfaPendingCredential"in r&&Oe(t,"multi-factor-auth-required",{_serverResponse:r}),r}function Gi(t,e,n,a){const i=`${e}${n}?${a}`;return t.config.emulator?fa(t.config,i):`${t.config.apiScheme}://${i}`}class uo{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,a)=>{this.timer=setTimeout(()=>a(Re(this.auth,"network-request-failed")),co.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Dt(t,e,n){const a={appName:t.name};n.email&&(a.email=n.email),n.phoneNumber&&(a.phoneNumber=n.phoneNumber);const i=Re(t,e,a);return i.customData._tokenResponse=n,i}/**
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
 */async function ho(t,e){return Te(t,"POST","/v1/accounts:delete",e)}async function po(t,e){return Te(t,"POST","/v1/accounts:update",e)}async function mo(t,e){return Te(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Mt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function fo(t,e=!1){const n=me(t),a=await n.getIdToken(e),i=Rn(a);F(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const r=typeof i.firebase=="object"?i.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:i,token:a,authTime:Mt(Vn(i.auth_time)),issuedAtTime:Mt(Vn(i.iat)),expirationTime:Mt(Vn(i.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Vn(t){return Number(t)*1e3}function Rn(t){const[e,n,a]=t.split(".");if(e===void 0||n===void 0||a===void 0)return cn("JWT malformed, contained fewer than 3 sections"),null;try{const i=Fr(n);return i?JSON.parse(i):(cn("Failed to decode base64 JWT payload"),null)}catch(i){return cn("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function go(t){const e=Rn(t);return F(e,"internal-error"),F(typeof e.exp<"u","internal-error"),F(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ze(t,e,n=!1){if(n)return e;try{return await e}catch(a){throw a instanceof Je&&Ao(a)&&t.auth.currentUser===t&&await t.auth.signOut(),a}}function Ao({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class Eo{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const a=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),a}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class $i{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Mt(this.lastLoginAt),this.creationTime=Mt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Gt(t){var e;const n=t.auth,a=await t.getIdToken(),i=await ze(t,mo(n,{idToken:a}));F(i==null?void 0:i.users.length,n,"internal-error");const r=i.users[0];t._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?Io(r.providerUserInfo):[],u=vo(t.providerData,o),d=t.isAnonymous,E=!(t.email&&r.passwordHash)&&!(u!=null&&u.length),I=d?E:!1,g={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:u,metadata:new $i(r.createdAt,r.lastLoginAt),isAnonymous:I};Object.assign(t,g)}async function yo(t){const e=me(t);await Gt(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function vo(t,e){return[...t.filter(a=>!e.some(i=>i.providerId===a.providerId)),...e]}function Io(t){return t.map(e=>{var{providerId:n}=e,a=ha(e,["providerId"]);return{providerId:n,uid:a.rawId||"",displayName:a.displayName||null,email:a.email||null,phoneNumber:a.phoneNumber||null,photoURL:a.photoUrl||null}})}/**
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
 */async function So(t,e){const n=await Ui(t,{},async()=>{const a=Tt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:r}=t.config,o=Gi(t,i,"/v1/token",`key=${r}`),u=await t._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",Vi.fetch()(o,{method:"POST",headers:u,body:a})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
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
 */class $t{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken<"u","internal-error"),F(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):go(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return F(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:a,refreshToken:i,expiresIn:r}=await So(e,n);this.updateTokensAndExpiration(a,i,Number(r))}updateTokensAndExpiration(e,n,a){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+a*1e3}static fromJSON(e,n){const{refreshToken:a,accessToken:i,expirationTime:r}=n,o=new $t;return a&&(F(typeof a=="string","internal-error",{appName:e}),o.refreshToken=a),i&&(F(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),r&&(F(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new $t,this.toJSON())}_performRefresh(){return Ue("not implemented")}}/**
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
 */function Ke(t,e){F(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class at{constructor(e){var{uid:n,auth:a,stsTokenManager:i}=e,r=ha(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Eo(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=a,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new $i(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await ze(this,this.stsTokenManager.getToken(this.auth,e));return F(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return fo(this,e)}reload(){return yo(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new at(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let a=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),a=!0),n&&await Gt(this),await this.auth._persistUserIfCurrent(this),a&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await ze(this,ho(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var a,i,r,o,u,d,E,I;const g=(a=n.displayName)!==null&&a!==void 0?a:void 0,_=(i=n.email)!==null&&i!==void 0?i:void 0,H=(r=n.phoneNumber)!==null&&r!==void 0?r:void 0,J=(o=n.photoURL)!==null&&o!==void 0?o:void 0,V=(u=n.tenantId)!==null&&u!==void 0?u:void 0,ae=(d=n._redirectEventId)!==null&&d!==void 0?d:void 0,ce=(E=n.createdAt)!==null&&E!==void 0?E:void 0,ne=(I=n.lastLoginAt)!==null&&I!==void 0?I:void 0,{uid:P,emailVerified:k,isAnonymous:C,providerData:f,stsTokenManager:T}=n;F(P&&T,e,"internal-error");const m=$t.fromJSON(this.name,T);F(typeof P=="string",e,"internal-error"),Ke(g,e.name),Ke(_,e.name),F(typeof k=="boolean",e,"internal-error"),F(typeof C=="boolean",e,"internal-error"),Ke(H,e.name),Ke(J,e.name),Ke(V,e.name),Ke(ae,e.name),Ke(ce,e.name),Ke(ne,e.name);const R=new at({uid:P,auth:e,email:_,emailVerified:k,displayName:g,isAnonymous:C,photoURL:J,phoneNumber:H,tenantId:V,stsTokenManager:m,createdAt:ce,lastLoginAt:ne});return f&&Array.isArray(f)&&(R.providerData=f.map(w=>Object.assign({},w))),ae&&(R._redirectEventId=ae),R}static async _fromIdTokenResponse(e,n,a=!1){const i=new $t;i.updateFromServerResponse(n);const r=new at({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:a});return await Gt(r),r}}/**
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
 */const ii=new Map;function xe(t){De(t instanceof Function,"Expected a class definition");let e=ii.get(t);return e?(De(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,ii.set(t,e),e)}/**
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
 */class Hi{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Hi.type="NONE";const vt=Hi;/**
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
 */function it(t,e,n){return`firebase:${t}:${e}:${n}`}class ft{constructor(e,n,a){this.persistence=e,this.auth=n,this.userKey=a;const{config:i,name:r}=this.auth;this.fullUserKey=it(this.userKey,i.apiKey,r),this.fullPersistenceKey=it("persistence",i.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?at._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,a="authUser"){if(!n.length)return new ft(xe(vt),e,a);const i=(await Promise.all(n.map(async E=>{if(await E._isAvailable())return E}))).filter(E=>E);let r=i[0]||xe(vt);const o=it(a,e.config.apiKey,e.name);let u=null;for(const E of n)try{const I=await E._get(o);if(I){const g=at._fromJSON(e,I);E!==r&&(u=g),r=E;break}}catch{}const d=i.filter(E=>E._shouldAllowMigration);return!r._shouldAllowMigration||!d.length?new ft(r,e,a):(r=d[0],u&&await r._set(o,u.toJSON()),await Promise.all(n.map(async E=>{if(E!==r)try{await E._remove(o)}catch{}})),new ft(r,e,a))}}/**
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
 */function si(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Wi(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Bi(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(qi(e))return"Blackberry";if(Ki(e))return"Webos";if(ga(e))return"Safari";if((e.includes("chrome/")||zi(e))&&!e.includes("edge/"))return"Chrome";if(Zt(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,a=t.match(n);if((a==null?void 0:a.length)===2)return a[1]}return"Other"}function Bi(t=be()){return/firefox\//i.test(t)}function ga(t=be()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function zi(t=be()){return/crios\//i.test(t)}function Wi(t=be()){return/iemobile/i.test(t)}function Zt(t=be()){return/android/i.test(t)}function qi(t=be()){return/blackberry/i.test(t)}function Ki(t=be()){return/webos/i.test(t)}function Ct(t=be()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function To(t=be()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(t)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(t)}function bo(t=be()){var e;return Ct(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Co(){return Oi()&&document.documentMode===10}function Yi(t=be()){return Ct(t)||Zt(t)||Ki(t)||qi(t)||/windows phone/i.test(t)||Wi(t)}function Ro(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function Zi(t,e=[]){let n;switch(t){case"Browser":n=si(be());break;case"Worker":n=`${si(be())}-${t}`;break;default:n=t}const a=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${qt}/${a}`}/**
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
 */async function Oo(t){return(await Te(t,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Ji(t,e){return Te(t,"GET","/v2/recaptchaConfig",Se(t,e))}/**
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
 */function ri(t){return t!==void 0&&t.getResponse!==void 0}function oi(t){return t!==void 0&&t.enterprise!==void 0}class Xi{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}/**
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
 */function _o(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function Aa(t){return new Promise((e,n)=>{const a=document.createElement("script");a.setAttribute("src",t),a.onload=e,a.onerror=i=>{const r=Re("internal-error");r.customData=i,n(r)},a.type="text/javascript",a.charset="UTF-8",_o().appendChild(a)})}function Qi(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const wo="https://www.google.com/recaptcha/enterprise.js?render=",No="recaptcha-enterprise",Po="NO_RECAPTCHA";class es{constructor(e){this.type=No,this.auth=ye(e)}async verify(e="verify",n=!1){async function a(r){if(!n){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,u)=>{Ji(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(d=>{if(d.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const E=new Xi(d);return r.tenantId==null?r._agentRecaptchaConfig=E:r._tenantRecaptchaConfigs[r.tenantId]=E,o(E.siteKey)}}).catch(d=>{u(d)})})}function i(r,o,u){const d=window.grecaptcha;oi(d)?d.enterprise.ready(()=>{d.enterprise.execute(r,{action:e}).then(E=>{o(E)}).catch(()=>{o(Po)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,o)=>{a(this.auth).then(u=>{if(!n&&oi(window.grecaptcha))i(u,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}Aa(wo+u).then(()=>{i(u,r,o)}).catch(d=>{o(d)})}}).catch(u=>{o(u)})})}}async function Xe(t,e,n,a=!1){const i=new es(t);let r;try{r=await i.verify(n)}catch{r=await i.verify(n,!0)}const o=Object.assign({},e);return a?Object.assign(o,{captchaResp:r}):Object.assign(o,{captchaResponse:r}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}/**
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
 */class xo{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const a=r=>new Promise((o,u)=>{try{const d=e(r);o(d)}catch(d){u(d)}});a.onAbort=n,this.queue.push(a);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const a of this.queue)await a(e),a.onAbort&&n.push(a.onAbort)}catch(a){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:a==null?void 0:a.message})}}}/**
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
 */class Lo{constructor(e,n,a,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=a,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new li(this),this.idTokenSubscription=new li(this),this.beforeStateQueue=new xo(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ji,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=xe(n)),this._initializationPromise=this.queue(async()=>{var a,i;if(!this._deleted&&(this.persistenceManager=await ft.create(this,e),!this._deleted)){if(!((a=this._popupRedirectResolver)===null||a===void 0)&&a._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const a=await this.assertedPersistence.getCurrentUser();let i=a,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,u=i==null?void 0:i._redirectEventId,d=await this.tryRedirectSignIn(e);(!o||o===u)&&(d!=null&&d.user)&&(i=d.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=a,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Gt(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=oo()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?me(e):null;return n&&F(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(xe(e))})}async initializeRecaptchaConfig(){const e=await Ji(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new Xi(e);this.tenantId==null?this._agentRecaptchaConfig=n:this._tenantRecaptchaConfigs[this.tenantId]=n,n.emailPasswordEnabled&&new es(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ua("auth","Firebase",e())}onAuthStateChanged(e,n,a){return this.registerStateListener(this.authStateSubscription,e,n,a)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,a){return this.registerStateListener(this.idTokenSubscription,e,n,a)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const a=await this.getOrInitRedirectPersistenceManager(n);return e===null?a.removeCurrentUser():a.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&xe(e)||this._popupRedirectResolver;F(n,this,"argument-error"),this.redirectPersistenceManager=await ft.create(this,[xe(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,a;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((a=this.redirectUser)===null||a===void 0?void 0:a._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const a=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==a&&(this.lastNotifiedUid=a,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,a,i){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return F(o,this,"internal-error"),o.then(()=>r(this.currentUser)),typeof n=="function"?e.addObserver(n,a,i):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Zi(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const a=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());a&&(n["X-Firebase-Client"]=a);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&so(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function ye(t){return me(t)}class li{constructor(e){this.auth=e,this.observer=null,this.addObserver=jr(n=>this.observer=n)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function ko(t,e){const n=(e==null?void 0:e.persistence)||[],a=(Array.isArray(n)?n:[n]).map(xe);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(a,e==null?void 0:e.popupRedirectResolver)}function Do(t,e,n){const a=ye(t);F(a._canInitEmulator,a,"emulator-config-failed"),F(/^https?:\/\//.test(e),a,"invalid-emulator-scheme");const i=!!(n!=null&&n.disableWarnings),r=ts(e),{host:o,port:u}=Mo(e),d=u===null?"":`:${u}`;a.config.emulator={url:`${r}//${o}${d}/`},a.settings.appVerificationDisabledForTesting=!0,a.emulatorConfig=Object.freeze({host:o,port:u,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||jo()}function ts(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Mo(t){const e=ts(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const a=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(a);if(i){const r=i[1];return{host:r,port:ci(a.substr(r.length+1))}}else{const[r,o]=a.split(":");return{host:r,port:ci(o)}}}function ci(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function jo(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Rt{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ue("not implemented")}_getIdTokenResponse(e){return Ue("not implemented")}_linkToIdToken(e,n){return Ue("not implemented")}_getReauthenticationResolver(e){return Ue("not implemented")}}/**
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
 */async function ns(t,e){return Te(t,"POST","/v1/accounts:resetPassword",Se(t,e))}async function as(t,e){return Te(t,"POST","/v1/accounts:update",e)}async function Fo(t,e){return Te(t,"POST","/v1/accounts:update",Se(t,e))}/**
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
 */async function Un(t,e){return We(t,"POST","/v1/accounts:signInWithPassword",Se(t,e))}async function On(t,e){return Te(t,"POST","/v1/accounts:sendOobCode",Se(t,e))}async function Vo(t,e){return On(t,e)}async function Gn(t,e){return On(t,e)}async function $n(t,e){return On(t,e)}async function Uo(t,e){return On(t,e)}/**
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
 */async function Go(t,e){return We(t,"POST","/v1/accounts:signInWithEmailLink",Se(t,e))}async function $o(t,e){return We(t,"POST","/v1/accounts:signInWithEmailLink",Se(t,e))}/**
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
 */class Ht extends Rt{constructor(e,n,a,i=null){super("password",a),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new Ht(e,n,"password")}static _fromEmailAndCode(e,n,a=null){return new Ht(e,n,"emailLink",a)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){var n;switch(this.signInMethod){case"password":const a={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((n=e._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const i=await Xe(e,a,"signInWithPassword");return Un(e,i)}else return Un(e,a).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const r=await Xe(e,a,"signInWithPassword");return Un(e,r)}else return Promise.reject(i)});case"emailLink":return Go(e,{email:this._email,oobCode:this._password});default:Oe(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return as(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return $o(e,{idToken:n,email:this._email,oobCode:this._password});default:Oe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */const Ho="http://localhost";class Ge extends Rt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Ge(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Oe("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:a,signInMethod:i}=n,r=ha(n,["providerId","signInMethod"]);if(!a||!i)return null;const o=new Ge(a,i);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Be(e,n)}_linkToIdToken(e,n){const a=this.buildRequest();return a.idToken=n,Be(e,a)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Be(e,n)}buildRequest(){const e={requestUri:Ho,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Tt(n)}return e}}/**
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
 */async function Bo(t,e){return Te(t,"POST","/v1/accounts:sendVerificationCode",Se(t,e))}async function zo(t,e){return We(t,"POST","/v1/accounts:signInWithPhoneNumber",Se(t,e))}async function Wo(t,e){const n=await We(t,"POST","/v1/accounts:signInWithPhoneNumber",Se(t,e));if(n.temporaryProof)throw Dt(t,"account-exists-with-different-credential",n);return n}const qo={USER_NOT_FOUND:"user-not-found"};async function Ko(t,e){const n=Object.assign(Object.assign({},e),{operation:"REAUTH"});return We(t,"POST","/v1/accounts:signInWithPhoneNumber",Se(t,n),qo)}/**
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
 */class st extends Rt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new st({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new st({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return zo(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return Wo(e,Object.assign({idToken:n},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Ko(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:a,verificationCode:i}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:a,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:a,phoneNumber:i,temporaryProof:r}=e;return!a&&!n&&!i&&!r?null:new st({verificationId:n,verificationCode:a,phoneNumber:i,temporaryProof:r})}}/**
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
 */function Yo(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Zo(t){const e=mt(Lt(t)).link,n=e?mt(Lt(e)).deep_link_id:null,a=mt(Lt(t)).deep_link_id;return(a?mt(Lt(a)).link:null)||a||n||e||t}class _n{constructor(e){var n,a,i,r,o,u;const d=mt(Lt(e)),E=(n=d.apiKey)!==null&&n!==void 0?n:null,I=(a=d.oobCode)!==null&&a!==void 0?a:null,g=Yo((i=d.mode)!==null&&i!==void 0?i:null);F(E&&I&&g,"argument-error"),this.apiKey=E,this.operation=g,this.code=I,this.continueUrl=(r=d.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=d.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(u=d.tenantId)!==null&&u!==void 0?u:null}static parseLink(e){const n=Zo(e);try{return new _n(n)}catch{return null}}}/**
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
 */class Qe{constructor(){this.providerId=Qe.PROVIDER_ID}static credential(e,n){return Ht._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const a=_n.parseLink(n);return F(a,"argument-error"),Ht._fromEmailAndCode(e,a.code,a.tenantId)}}Qe.PROVIDER_ID="password";Qe.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Qe.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Ot extends qe{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class gt extends Ot{static credentialFromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;return F("providerId"in n&&"signInMethod"in n,"argument-error"),Ge._fromParams(n)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return F(e.idToken||e.accessToken,"argument-error"),Ge._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return gt.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return gt.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:a,oauthTokenSecret:i,pendingToken:r,nonce:o,providerId:u}=e;if(!a&&!i&&!n&&!r||!u)return null;try{return new gt(u)._credential({idToken:n,accessToken:a,nonce:o,pendingToken:r})}catch{return null}}}/**
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
 */class je extends Ot{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Ge._fromParams({providerId:je.PROVIDER_ID,signInMethod:je.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return je.credentialFromTaggedObject(e)}static credentialFromError(e){return je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:a}=e;if(!n&&!a)return null;try{return je.credential(n,a)}catch{return null}}}je.GOOGLE_SIGN_IN_METHOD="google.com";je.PROVIDER_ID="google.com";/**
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
 */const Jo="http://localhost";class It extends Rt{constructor(e,n){super(e,e),this.pendingToken=n}_getIdTokenResponse(e){const n=this.buildRequest();return Be(e,n)}_linkToIdToken(e,n){const a=this.buildRequest();return a.idToken=n,Be(e,a)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Be(e,n)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:a,signInMethod:i,pendingToken:r}=n;return!a||!i||!r||a!==i?null:new It(a,r)}static _create(e,n){return new It(e,n)}buildRequest(){return{requestUri:Jo,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
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
 */const Xo="saml.";class gn extends qe{constructor(e){F(e.startsWith(Xo),"argument-error"),super(e)}static credentialFromResult(e){return gn.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return gn.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const n=It.fromJSON(e);return F(n,"argument-error"),n}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:n,providerId:a}=e;if(!n||!a)return null;try{return It._create(a,n)}catch{return null}}}/**
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
 */class Ve extends Ot{constructor(){super("twitter.com")}static credential(e,n){return Ge._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:a}=e;if(!n||!a)return null;try{return Ve.credential(n,a)}catch{return null}}}Ve.TWITTER_SIGN_IN_METHOD="twitter.com";Ve.PROVIDER_ID="twitter.com";/**
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
 */async function dn(t,e){return We(t,"POST","/v1/accounts:signUp",Se(t,e))}/**
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
 */class ke{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,a,i=!1){const r=await at._fromIdTokenResponse(e,a,i),o=di(a);return new ke({user:r,providerId:o,_tokenResponse:a,operationType:n})}static async _forOperation(e,n,a){await e._updateTokensIfNecessary(a,!0);const i=di(a);return new ke({user:e,providerId:i,_tokenResponse:a,operationType:n})}}function di(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function Qo(t){var e;const n=ye(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new ke({user:n.currentUser,providerId:null,operationType:"signIn"});const a=await dn(n,{returnSecureToken:!0}),i=await ke._fromIdTokenResponse(n,"signIn",a,!0);return await n._updateCurrentUser(i.user),i}/**
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
 */class An extends Je{constructor(e,n,a,i){var r;super(n.code,n.message),this.operationType=a,this.user=i,Object.setPrototypeOf(this,An.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:n.customData._serverResponse,operationType:a}}static _fromErrorAndOperation(e,n,a,i){return new An(e,n,a,i)}}function is(t,e,n,a){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?An._fromErrorAndOperation(t,r,e,a):r})}/**
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
 */function ss(t){return new Set(t.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function el(t,e){const n=me(t);await wn(!0,n,e);const{providerUserInfo:a}=await po(n.auth,{idToken:await n.getIdToken(),deleteProvider:[e]}),i=ss(a||[]);return n.providerData=n.providerData.filter(r=>i.has(r.providerId)),i.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n}async function Ea(t,e,n=!1){const a=await ze(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ke._forOperation(t,"link",a)}async function wn(t,e,n){await Gt(e);const a=ss(e.providerData),i=t===!1?"provider-already-linked":"no-such-provider";F(a.has(n)===t,e.auth,i)}/**
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
 */async function rs(t,e,n=!1){const{auth:a}=t,i="reauthenticate";try{const r=await ze(t,is(a,i,e,t),n);F(r.idToken,a,"internal-error");const o=Rn(r.idToken);F(o,a,"internal-error");const{sub:u}=o;return F(t.uid===u,a,"user-mismatch"),ke._forOperation(t,i,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Oe(a,"user-mismatch"),r}}/**
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
 */async function os(t,e,n=!1){const a="signIn",i=await is(t,a,e),r=await ke._fromIdTokenResponse(t,a,i);return n||await t._updateCurrentUser(r.user),r}async function Nn(t,e){return os(ye(t),e)}async function ls(t,e){const n=me(t);return await wn(!1,n,e.providerId),Ea(n,e)}async function cs(t,e){return rs(me(t),e)}/**
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
 */async function tl(t,e){return We(t,"POST","/v1/accounts:signInWithCustomToken",Se(t,e))}/**
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
 */async function nl(t,e){const n=ye(t),a=await tl(n,{token:e,returnSecureToken:!0}),i=await ke._fromIdTokenResponse(n,"signIn",a);return await n._updateCurrentUser(i.user),i}/**
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
 */class Jt{constructor(e,n){this.factorId=e,this.uid=n.mfaEnrollmentId,this.enrollmentTime=new Date(n.enrolledAt).toUTCString(),this.displayName=n.displayName}static _fromServerResponse(e,n){return"phoneInfo"in n?ya._fromServerResponse(e,n):"totpInfo"in n?va._fromServerResponse(e,n):Oe(e,"internal-error")}}class ya extends Jt{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,n){return new ya(n)}}class va extends Jt{constructor(e){super("totp",e)}static _fromServerResponse(e,n){return new va(n)}}/**
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
 */function At(t,e,n){var a;F(((a=n.url)===null||a===void 0?void 0:a.length)>0,t,"invalid-continue-uri"),F(typeof n.dynamicLinkDomain>"u"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(F(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(F(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
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
 */async function al(t,e,n){var a;const i=ye(t),r={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};if(!((a=i._getRecaptchaConfig())===null||a===void 0)&&a.emailPasswordEnabled){const o=await Xe(i,r,"getOobCode",!0);n&&At(i,o,n),await Gn(i,o)}else n&&At(i,r,n),await Gn(i,r).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log("Password resets are protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the password reset flow.");const u=await Xe(i,r,"getOobCode",!0);n&&At(i,u,n),await Gn(i,u)}else return Promise.reject(o)})}async function il(t,e,n){await ns(me(t),{oobCode:e,newPassword:n})}async function sl(t,e){await Fo(me(t),{oobCode:e})}async function ds(t,e){const n=me(t),a=await ns(n,{oobCode:e}),i=a.requestType;switch(F(i,n,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":F(a.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":F(a.mfaInfo,n,"internal-error");default:F(a.email,n,"internal-error")}let r=null;return a.mfaInfo&&(r=Jt._fromServerResponse(ye(n),a.mfaInfo)),{data:{email:(a.requestType==="VERIFY_AND_CHANGE_EMAIL"?a.newEmail:a.email)||null,previousEmail:(a.requestType==="VERIFY_AND_CHANGE_EMAIL"?a.email:a.newEmail)||null,multiFactorInfo:r},operation:i}}async function rl(t,e){const{data:n}=await ds(me(t),e);return n.email}async function ol(t,e,n){var a;const i=ye(t),r={returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"};let o;if(!((a=i._getRecaptchaConfig())===null||a===void 0)&&a.emailPasswordEnabled){const E=await Xe(i,r,"signUpPassword");o=dn(i,E)}else o=dn(i,r).catch(async E=>{if(E.code==="auth/missing-recaptcha-token"){console.log("Sign-up is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-up flow.");const I=await Xe(i,r,"signUpPassword");return dn(i,I)}else return Promise.reject(E)});const u=await o.catch(E=>Promise.reject(E)),d=await ke._fromIdTokenResponse(i,"signIn",u);return await i._updateCurrentUser(d.user),d}function ll(t,e,n){return Nn(me(t),Qe.credential(e,n))}/**
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
 */async function cl(t,e,n){var a;const i=ye(t),r={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function o(u,d){F(d.handleCodeInApp,i,"argument-error"),d&&At(i,u,d)}if(!((a=i._getRecaptchaConfig())===null||a===void 0)&&a.emailPasswordEnabled){const u=await Xe(i,r,"getOobCode",!0);o(u,n),await $n(i,u)}else o(r,n),await $n(i,r).catch(async u=>{if(u.code==="auth/missing-recaptcha-token"){console.log("Email link sign-in is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const d=await Xe(i,r,"getOobCode",!0);o(d,n),await $n(i,d)}else return Promise.reject(u)})}function dl(t,e){const n=_n.parseLink(e);return(n==null?void 0:n.operation)==="EMAIL_SIGNIN"}async function ul(t,e,n){const a=me(t),i=Qe.credentialWithLink(e,n||Ut());return F(i._tenantId===(a.tenantId||null),a,"tenant-id-mismatch"),Nn(a,i)}/**
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
 */async function hl(t,e){return Te(t,"POST","/v1/accounts:createAuthUri",Se(t,e))}/**
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
 */async function pl(t,e){const n=ma()?Ut():"http://localhost",a={identifier:e,continueUri:n},{signinMethods:i}=await hl(me(t),a);return i||[]}async function ml(t,e){const n=me(t),i={requestType:"VERIFY_EMAIL",idToken:await t.getIdToken()};e&&At(n.auth,i,e);const{email:r}=await Vo(n.auth,i);r!==t.email&&await t.reload()}async function fl(t,e,n){const a=me(t),r={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await t.getIdToken(),newEmail:e};n&&At(a.auth,r,n);const{email:o}=await Uo(a.auth,r);o!==t.email&&await t.reload()}/**
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
 */async function gl(t,e){return Te(t,"POST","/v1/accounts:update",e)}/**
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
 */async function Al(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const a=me(t),r={idToken:await a.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await ze(a,gl(a.auth,r));a.displayName=o.displayName||null,a.photoURL=o.photoUrl||null;const u=a.providerData.find(({providerId:d})=>d==="password");u&&(u.displayName=a.displayName,u.photoURL=a.photoURL),await a._updateTokensIfNecessary(o)}function El(t,e){return us(me(t),e,null)}function yl(t,e){return us(me(t),null,e)}async function us(t,e,n){const{auth:a}=t,r={idToken:await t.getIdToken(),returnSecureToken:!0};e&&(r.email=e),n&&(r.password=n);const o=await ze(t,as(a,r));await t._updateTokensIfNecessary(o,!0)}/**
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
 */function vl(t){var e,n;if(!t)return null;const{providerId:a}=t,i=t.rawUserInfo?JSON.parse(t.rawUserInfo):{},r=t.isNewUser||t.kind==="identitytoolkit#SignupNewUserResponse";if(!a&&(t!=null&&t.idToken)){const o=(n=(e=Rn(t.idToken))===null||e===void 0?void 0:e.firebase)===null||n===void 0?void 0:n.sign_in_provider;if(o){const u=o!=="anonymous"&&o!=="custom"?o:null;return new Et(r,u)}}if(!a)return null;switch(a){case"facebook.com":return new Il(r,i);case"github.com":return new Sl(r,i);case"google.com":return new Tl(r,i);case"twitter.com":return new bl(r,i,t.screenName||null);case"custom":case"anonymous":return new Et(r,null);default:return new Et(r,a,i)}}class Et{constructor(e,n,a={}){this.isNewUser=e,this.providerId=n,this.profile=a}}class hs extends Et{constructor(e,n,a,i){super(e,n,a),this.username=i}}class Il extends Et{constructor(e,n){super(e,"facebook.com",n)}}class Sl extends hs{constructor(e,n){super(e,"github.com",n,typeof(n==null?void 0:n.login)=="string"?n==null?void 0:n.login:null)}}class Tl extends Et{constructor(e,n){super(e,"google.com",n)}}class bl extends hs{constructor(e,n,a){super(e,"twitter.com",n,a)}}function Cl(t){const{user:e,_tokenResponse:n}=t;return e.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:vl(n)}class nt{constructor(e,n,a){this.type=e,this.credential=n,this.auth=a}static _fromIdtoken(e,n){return new nt("enroll",e,n)}static _fromMfaPendingCredential(e){return new nt("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var n,a;if(e!=null&&e.multiFactorSession){if(!((n=e.multiFactorSession)===null||n===void 0)&&n.pendingCredential)return nt._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((a=e.multiFactorSession)===null||a===void 0)&&a.idToken)return nt._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
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
 */class Ia{constructor(e,n,a){this.session=e,this.hints=n,this.signInResolver=a}static _fromError(e,n){const a=ye(e),i=n.customData._serverResponse,r=(i.mfaInfo||[]).map(u=>Jt._fromServerResponse(a,u));F(i.mfaPendingCredential,a,"internal-error");const o=nt._fromMfaPendingCredential(i.mfaPendingCredential);return new Ia(o,r,async u=>{const d=await u._process(a,o);delete i.mfaInfo,delete i.mfaPendingCredential;const E=Object.assign(Object.assign({},i),{idToken:d.idToken,refreshToken:d.refreshToken});switch(n.operationType){case"signIn":const I=await ke._fromIdTokenResponse(a,n.operationType,E);return await a._updateCurrentUser(I.user),I;case"reauthenticate":return F(n.user,a,"internal-error"),ke._forOperation(n.user,n.operationType,E);default:Oe(a,"internal-error")}})}async resolveSignIn(e){const n=e;return this.signInResolver(n)}}function Rl(t,e){var n;const a=me(t),i=e;return F(e.customData.operationType,a,"argument-error"),F((n=i.customData._serverResponse)===null||n===void 0?void 0:n.mfaPendingCredential,a,"argument-error"),Ia._fromError(a,i)}/**
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
 */function Ol(t,e){return Te(t,"POST","/v2/accounts/mfaEnrollment:start",Se(t,e))}function _l(t,e){return Te(t,"POST","/v2/accounts/mfaEnrollment:finalize",Se(t,e))}function wl(t,e){return Te(t,"POST","/v2/accounts/mfaEnrollment:withdraw",Se(t,e))}class Sa{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(n=>{n.mfaInfo&&(this.enrolledFactors=n.mfaInfo.map(a=>Jt._fromServerResponse(e.auth,a)))})}static _fromUser(e){return new Sa(e)}async getSession(){return nt._fromIdtoken(await this.user.getIdToken(),this.user.auth)}async enroll(e,n){const a=e,i=await this.getSession(),r=await ze(this.user,a._process(this.user.auth,i,n));return await this.user._updateTokensIfNecessary(r),this.user.reload()}async unenroll(e){const n=typeof e=="string"?e:e.uid,a=await this.user.getIdToken();try{const i=await ze(this.user,wl(this.user.auth,{idToken:a,mfaEnrollmentId:n}));this.enrolledFactors=this.enrolledFactors.filter(({uid:r})=>r!==n),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const Hn=new WeakMap;function Nl(t){const e=me(t);return Hn.has(e)||Hn.set(e,Sa._fromUser(e)),Hn.get(e)}const En="__sak";/**
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
 */class ps{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(En,"1"),this.storage.removeItem(En),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function Pl(){const t=be();return ga(t)||Ct(t)}const xl=1e3,Ll=10;class ms extends ps{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Pl()&&Ro(),this.fallbackToPolling=Yi(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const a=this.storage.getItem(n),i=this.localCache[n];a!==i&&e(n,i,a)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,u,d)=>{this.notifyListeners(o,d)});return}const a=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(a);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(a,e.newValue):this.storage.removeItem(a);else if(this.localCache[a]===e.newValue&&!n)return}const i=()=>{const o=this.storage.getItem(a);!n&&this.localCache[a]===o||this.notifyListeners(a,o)},r=this.storage.getItem(a);Co()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ll):i()}notifyListeners(e,n){this.localCache[e]=n;const a=this.listeners[e];if(a)for(const i of Array.from(a))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,a)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:a}),!0)})},xl)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}ms.type="LOCAL";const Ta=ms;/**
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
 */class fs extends ps{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}fs.type="SESSION";const ot=fs;/**
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
 */function kl(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Pn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const a=new Pn(e);return this.receivers.push(a),a}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:a,eventType:i,data:r}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:a,eventType:i});const u=Array.from(o).map(async E=>E(n.origin,r)),d=await kl(u);n.ports[0].postMessage({status:"done",eventId:a,eventType:i,response:d})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Pn.receivers=[];/**
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
 */function Xt(t="",e=10){let n="";for(let a=0;a<e;a++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class Dl{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,a=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let r,o;return new Promise((u,d)=>{const E=Xt("",20);i.port1.start();const I=setTimeout(()=>{d(new Error("unsupported_event"))},a);o={messageChannel:i,onMessage(g){const _=g;if(_.data.eventId===E)switch(_.data.status){case"ack":clearTimeout(I),r=setTimeout(()=>{d(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),u(_.data.response);break;default:clearTimeout(I),clearTimeout(r),d(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:E,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Ie(){return window}function Ml(t){Ie().location.href=t}/**
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
 */function ba(){return typeof Ie().WorkerGlobalScope<"u"&&typeof Ie().importScripts=="function"}async function jl(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Fl(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Vl(){return ba()?self:null}/**
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
 */const gs="firebaseLocalStorageDb",Ul=1,yn="firebaseLocalStorage",As="fbase_key";class Qt{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function xn(t,e){return t.transaction([yn],e?"readwrite":"readonly").objectStore(yn)}function Gl(){const t=indexedDB.deleteDatabase(gs);return new Qt(t).toPromise()}function Qn(){const t=indexedDB.open(gs,Ul);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const a=t.result;try{a.createObjectStore(yn,{keyPath:As})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const a=t.result;a.objectStoreNames.contains(yn)?e(a):(a.close(),await Gl(),e(await Qn()))})})}async function ui(t,e,n){const a=xn(t,!0).put({[As]:e,value:n});return new Qt(a).toPromise()}async function $l(t,e){const n=xn(t,!1).get(e),a=await new Qt(n).toPromise();return a===void 0?null:a.value}function hi(t,e){const n=xn(t,!0).delete(e);return new Qt(n).toPromise()}const Hl=800,Bl=3;class Es{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Qn(),this.db)}async _withRetries(e){let n=0;for(;;)try{const a=await this._openDb();return await e(a)}catch(a){if(n++>Bl)throw a;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ba()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Pn._getInstance(Vl()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await jl(),!this.activeServiceWorker)return;this.sender=new Dl(this.activeServiceWorker);const a=await this.sender._send("ping",{},800);a&&!((e=a[0])===null||e===void 0)&&e.fulfilled&&!((n=a[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Fl()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Qn();return await ui(e,En,"1"),await hi(e,En),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(a=>ui(a,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(a=>$l(a,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>hi(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const r=xn(i,!1).getAll();return new Qt(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],a=new Set;for(const{fbase_key:i,value:r}of e)a.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!a.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const a=this.listeners[e];if(a)for(const i of Array.from(a))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Hl)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Es.type="LOCAL";const Bt=Es;/**
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
 */function zl(t,e){return Te(t,"POST","/v2/accounts/mfaSignIn:start",Se(t,e))}function Wl(t,e){return Te(t,"POST","/v2/accounts/mfaSignIn:finalize",Se(t,e))}/**
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
 */const ql=500,Kl=6e4,sn=1e12;class Yl{constructor(e){this.auth=e,this.counter=sn,this._widgets=new Map}render(e,n){const a=this.counter;return this._widgets.set(a,new Zl(e,this.auth.name,n||{})),this.counter++,a}reset(e){var n;const a=e||sn;(n=this._widgets.get(a))===null||n===void 0||n.delete(),this._widgets.delete(a)}getResponse(e){var n;const a=e||sn;return((n=this._widgets.get(a))===null||n===void 0?void 0:n.getResponse())||""}async execute(e){var n;const a=e||sn;return(n=this._widgets.get(a))===null||n===void 0||n.execute(),""}}class Zl{constructor(e,n,a){this.params=a,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;F(i,"argument-error",{appName:n}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=Jl(50);const{callback:e,"expired-callback":n}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,n)try{n()}catch{}this.isVisible&&this.execute()},Kl)},ql))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function Jl(t){const e=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let a=0;a<t;a++)e.push(n.charAt(Math.floor(Math.random()*n.length)));return e.join("")}/**
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
 */const Bn=Qi("rcb"),Xl=new Yt(3e4,6e4),Ql="https://www.google.com/recaptcha/api.js?";class ec{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=Ie().grecaptcha)===null||e===void 0)&&e.render)}load(e,n=""){return F(tc(n),e,"argument-error"),this.shouldResolveImmediately(n)&&ri(Ie().grecaptcha)?Promise.resolve(Ie().grecaptcha):new Promise((a,i)=>{const r=Ie().setTimeout(()=>{i(Re(e,"network-request-failed"))},Xl.get());Ie()[Bn]=()=>{Ie().clearTimeout(r),delete Ie()[Bn];const u=Ie().grecaptcha;if(!u||!ri(u)){i(Re(e,"internal-error"));return}const d=u.render;u.render=(E,I)=>{const g=d(E,I);return this.counter++,g},this.hostLanguage=n,a(u)};const o=`${Ql}?${Tt({onload:Bn,render:"explicit",hl:n})}`;Aa(o).catch(()=>{clearTimeout(r),i(Re(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var n;return!!(!((n=Ie().grecaptcha)===null||n===void 0)&&n.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function tc(t){return t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t)}class nc{async load(e){return new Yl(e)}clearedOneInstance(){}}/**
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
 */const ys="recaptcha",ac={theme:"light",type:"image"};let ic=class{constructor(e,n=Object.assign({},ac),a){this.parameters=n,this.type=ys,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=ye(a),this.isInvisible=this.parameters.size==="invisible",F(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof e=="string"?document.getElementById(e):e;F(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new nc:new ec,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),n=this.getAssertedRecaptcha(),a=n.getResponse(e);return a||new Promise(i=>{const r=o=>{o&&(this.tokenChangeListeners.delete(r),i(o))};this.tokenChangeListeners.add(r),this.isInvisible&&n.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){F(!this.parameters.sitekey,this.auth,"argument-error"),F(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),F(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return n=>{if(this.tokenChangeListeners.forEach(a=>a(n)),typeof e=="function")e(n);else if(typeof e=="string"){const a=Ie()[e];typeof a=="function"&&a(n)}}}assertNotDestroyed(){F(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const n=document.createElement("div");e.appendChild(n),e=n}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){F(ma()&&!ba(),this.auth,"internal-error"),await sc(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await Oo(this.auth);F(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return F(this.recaptcha,this.auth,"internal-error"),this.recaptcha}};function sc(){let t=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}t=()=>e(),window.addEventListener("load",t)}).catch(e=>{throw t&&window.removeEventListener("load",t),e})}/**
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
 */class Ca{constructor(e,n){this.verificationId=e,this.onConfirmation=n}confirm(e){const n=st._fromVerification(this.verificationId,e);return this.onConfirmation(n)}}async function rc(t,e,n){const a=ye(t),i=await Ln(a,e,me(n));return new Ca(i,r=>Nn(a,r))}async function oc(t,e,n){const a=me(t);await wn(!1,a,"phone");const i=await Ln(a.auth,e,me(n));return new Ca(i,r=>ls(a,r))}async function lc(t,e,n){const a=me(t),i=await Ln(a.auth,e,me(n));return new Ca(i,r=>cs(a,r))}async function Ln(t,e,n){var a;const i=await n.verify();try{F(typeof i=="string",t,"argument-error"),F(n.type===ys,t,"argument-error");let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){const o=r.session;if("phoneNumber"in r)return F(o.type==="enroll",t,"internal-error"),(await Ol(t,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{F(o.type==="signin",t,"internal-error");const u=((a=r.multiFactorHint)===null||a===void 0?void 0:a.uid)||r.multiFactorUid;return F(u,t,"missing-multi-factor-info"),(await zl(t,{mfaPendingCredential:o.credential,mfaEnrollmentId:u,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await Bo(t,{phoneNumber:r.phoneNumber,recaptchaToken:i});return o}}finally{n._reset()}}async function cc(t,e){await Ea(me(t),e)}/**
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
 */let lt=class un{constructor(e){this.providerId=un.PROVIDER_ID,this.auth=ye(e)}verifyPhoneNumber(e,n){return Ln(this.auth,e,me(n))}static credential(e,n){return st._fromVerification(e,n)}static credentialFromResult(e){const n=e;return un.credentialFromTaggedObject(n)}static credentialFromError(e){return un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:n,temporaryProof:a}=e;return n&&a?st._fromTokenResponse(n,a):null}};lt.PROVIDER_ID="phone";lt.PHONE_SIGN_IN_METHOD="phone";/**
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
 */function dt(t,e){return e?xe(e):(F(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Ra extends Rt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Be(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Be(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Be(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function dc(t){return os(t.auth,new Ra(t),t.bypassAuthState)}function uc(t){const{auth:e,user:n}=t;return F(n,e,"internal-error"),rs(n,new Ra(t),t.bypassAuthState)}async function hc(t){const{auth:e,user:n}=t;return F(n,e,"internal-error"),Ea(n,new Ra(t),t.bypassAuthState)}/**
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
 */class vs{constructor(e,n,a,i,r=!1){this.auth=e,this.resolver=a,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(a){this.reject(a)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:a,postBody:i,tenantId:r,error:o,type:u}=e;if(o){this.reject(o);return}const d={auth:this.auth,requestUri:n,sessionId:a,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(d))}catch(E){this.reject(E)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return dc;case"linkViaPopup":case"linkViaRedirect":return hc;case"reauthViaPopup":case"reauthViaRedirect":return uc;default:Oe(this.auth,"internal-error")}}resolve(e){De(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){De(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const pc=new Yt(2e3,1e4);async function mc(t,e,n){const a=ye(t);bt(t,e,qe);const i=dt(a,n);return new $e(a,"signInViaPopup",e,i).executeNotNull()}async function fc(t,e,n){const a=me(t);bt(a.auth,e,qe);const i=dt(a.auth,n);return new $e(a.auth,"reauthViaPopup",e,i,a).executeNotNull()}async function gc(t,e,n){const a=me(t);bt(a.auth,e,qe);const i=dt(a.auth,n);return new $e(a.auth,"linkViaPopup",e,i,a).executeNotNull()}class $e extends vs{constructor(e,n,a,i,r){super(e,n,i,r),this.provider=a,this.authWindow=null,this.pollId=null,$e.currentPopupAction&&$e.currentPopupAction.cancel(),$e.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return F(e,this.auth,"internal-error"),e}async onExecution(){De(this.filter.length===1,"Popup operations only handle one event");const e=Xt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Re(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Re(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,$e.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,a;if(!((a=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||a===void 0)&&a.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Re(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,pc.get())};e()}}$e.currentPopupAction=null;/**
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
 */const Ac="pendingRedirect",jt=new Map;class Ec extends vs{constructor(e,n,a=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,a),this.eventId=null}async execute(){let e=jt.get(this.auth._key());if(!e){try{const a=await yc(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(a)}catch(n){e=()=>Promise.reject(n)}jt.set(this.auth._key(),e)}return this.bypassAuthState||jt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function yc(t,e){const n=Ss(e),a=Is(t);if(!await a._isAvailable())return!1;const i=await a._get(n)==="true";return await a._remove(n),i}async function Oa(t,e){return Is(t)._set(Ss(e),"true")}function vc(){jt.clear()}function _a(t,e){jt.set(t._key(),e)}function Is(t){return xe(t._redirectPersistence)}function Ss(t){return it(Ac,t.config.apiKey,t.name)}/**
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
 */function Ic(t,e,n){return Sc(t,e,n)}async function Sc(t,e,n){const a=ye(t);bt(t,e,qe),await a._initializationPromise;const i=dt(a,n);return await Oa(i,a),i._openRedirect(a,e,"signInViaRedirect")}function Tc(t,e,n){return bc(t,e,n)}async function bc(t,e,n){const a=me(t);bt(a.auth,e,qe),await a.auth._initializationPromise;const i=dt(a.auth,n);await Oa(i,a.auth);const r=await Ts(a);return i._openRedirect(a.auth,e,"reauthViaRedirect",r)}function Cc(t,e,n){return Rc(t,e,n)}async function Rc(t,e,n){const a=me(t);bt(a.auth,e,qe),await a.auth._initializationPromise;const i=dt(a.auth,n);await wn(!1,a,e.providerId),await Oa(i,a.auth);const r=await Ts(a);return i._openRedirect(a.auth,e,"linkViaRedirect",r)}async function Oc(t,e){return await ye(t)._initializationPromise,kn(t,e,!1)}async function kn(t,e,n=!1){const a=ye(t),i=dt(a,e),o=await new Ec(a,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await a._persistUserIfCurrent(o.user),await a._setRedirectUser(null,e)),o}async function Ts(t){const e=Xt(`${t.uid}:::`);return t._redirectEventId=e,await t.auth._setRedirectUser(t),await t.auth._persistUserIfCurrent(t),e}/**
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
 */const _c=10*60*1e3;class bs{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(a=>{this.isEventForConsumer(e,a)&&(n=!0,this.sendToConsumer(e,a),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!wc(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var a;if(e.error&&!Cs(e)){const i=((a=e.error.code)===null||a===void 0?void 0:a.split("auth/")[1])||"internal-error";n.onError(Re(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const a=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&a}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=_c&&this.cachedEventUids.clear(),this.cachedEventUids.has(pi(e))}saveEventToCache(e){this.cachedEventUids.add(pi(e)),this.lastProcessedEventTime=Date.now()}}function pi(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Cs({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function wc(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Cs(t);default:return!1}}/**
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
 */async function Rs(t,e={}){return Te(t,"GET","/v1/projects",e)}/**
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
 */const Nc=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Pc=/^https?/;async function xc(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Rs(t);for(const n of e)try{if(Lc(n))return}catch{}Oe(t,"unauthorized-domain")}function Lc(t){const e=Ut(),{protocol:n,hostname:a}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&a===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===a}if(!Pc.test(n))return!1;if(Nc.test(t))return a===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(a)}/**
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
 */const kc=new Yt(3e4,6e4);function mi(){const t=Ie().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Dc(t){return new Promise((e,n)=>{var a,i,r;function o(){mi(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{mi(),n(Re(t,"network-request-failed"))},timeout:kc.get()})}if(!((i=(a=Ie().gapi)===null||a===void 0?void 0:a.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((r=Ie().gapi)===null||r===void 0)&&r.load)o();else{const u=Qi("iframefcb");return Ie()[u]=()=>{gapi.load?o():n(Re(t,"network-request-failed"))},Aa(`https://apis.google.com/js/api.js?onload=${u}`).catch(d=>n(d))}}).catch(e=>{throw hn=null,e})}let hn=null;function Mc(t){return hn=hn||Dc(t),hn}/**
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
 */const jc=new Yt(5e3,15e3),Fc="__/auth/iframe",Vc="emulator/auth/iframe",Uc={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Gc=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function $c(t){const e=t.config;F(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?fa(e,Vc):`https://${t.config.authDomain}/${Fc}`,a={apiKey:e.apiKey,appName:t.name,v:qt},i=Gc.get(t.config.apiHost);i&&(a.eid=i);const r=t._getFrameworks();return r.length&&(a.fw=r.join(",")),`${n}?${Tt(a).slice(1)}`}async function Hc(t){const e=await Mc(t),n=Ie().gapi;return F(n,t,"internal-error"),e.open({where:document.body,url:$c(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Uc,dontclear:!0},a=>new Promise(async(i,r)=>{await a.restyle({setHideOnLeave:!1});const o=Re(t,"network-request-failed"),u=Ie().setTimeout(()=>{r(o)},jc.get());function d(){Ie().clearTimeout(u),i(a)}a.ping(d).then(d,()=>{r(o)})}))}/**
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
 */const Bc={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},zc=500,Wc=600,qc="_blank",Kc="http://localhost";class fi{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Yc(t,e,n,a=zc,i=Wc){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-a)/2,0).toString();let u="";const d=Object.assign(Object.assign({},Bc),{width:a.toString(),height:i.toString(),top:r,left:o}),E=be().toLowerCase();n&&(u=zi(E)?qc:n),Bi(E)&&(e=e||Kc,d.scrollbars="yes");const I=Object.entries(d).reduce((_,[H,J])=>`${_}${H}=${J},`,"");if(bo(E)&&u!=="_self")return Zc(e||"",u),new fi(null);const g=window.open(e||"",u,I);F(g,t,"popup-blocked");try{g.focus()}catch{}return new fi(g)}function Zc(t,e){const n=document.createElement("a");n.href=t,n.target=e;const a=document.createEvent("MouseEvent");a.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(a)}/**
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
 */const Jc="__/auth/handler",Xc="emulator/auth/handler",Qc=encodeURIComponent("fac");async function ea(t,e,n,a,i,r){F(t.config.authDomain,t,"auth-domain-config-required"),F(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:a,v:qt,eventId:i};if(e instanceof qe){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Vr(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[I,g]of Object.entries(r||{}))o[I]=g}if(e instanceof Ot){const I=e.getScopes().filter(g=>g!=="");I.length>0&&(o.scopes=I.join(","))}t.tenantId&&(o.tid=t.tenantId);const u=o;for(const I of Object.keys(u))u[I]===void 0&&delete u[I];const d=await t._getAppCheckToken(),E=d?`#${Qc}=${encodeURIComponent(d)}`:"";return`${ed(t)}?${Tt(u).slice(1)}${E}`}function ed({config:t}){return t.emulator?fa(t,Xc):`https://${t.authDomain}/${Jc}`}/**
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
 */const zn="webStorageSupport";class td{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ot,this._completeRedirectFn=kn,this._overrideRedirectResult=_a}async _openPopup(e,n,a,i){var r;De((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await ea(e,n,a,Ut(),i);return Yc(e,o,Xt())}async _openRedirect(e,n,a,i){await this._originValidation(e);const r=await ea(e,n,a,Ut(),i);return Ml(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:r}=this.eventManagers[n];return i?Promise.resolve(i):(De(r,"If manager is not set, promise should be"),r)}const a=this.initAndGetManager(e);return this.eventManagers[n]={promise:a},a.catch(()=>{delete this.eventManagers[n]}),a}async initAndGetManager(e){const n=await Hc(e),a=new bs(e);return n.register("authEvent",i=>(F(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:a.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:a},this.iframes[e._key()]=n,a}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(zn,{type:zn},i=>{var r;const o=(r=i==null?void 0:i[0])===null||r===void 0?void 0:r[zn];o!==void 0&&n(!!o),Oe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=xc(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Yi()||ga()||Ct()}}const nd=td;class ad{constructor(e){this.factorId=e}_process(e,n,a){switch(n.type){case"enroll":return this._finalizeEnroll(e,n.credential,a);case"signin":return this._finalizeSignIn(e,n.credential);default:return Ue("unexpected MultiFactorSessionType")}}}class wa extends ad{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new wa(e)}_finalizeEnroll(e,n,a){return _l(e,{idToken:n,displayName:a,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,n){return Wl(e,{mfaPendingCredential:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class Os{constructor(){}static assertion(e){return wa._fromCredential(e)}}Os.FACTOR_ID="phone";var gi="@firebase/auth",Ai="0.23.2";/**
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
 */class id{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(a=>{e((a==null?void 0:a.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function sd(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function rd(t){Xa(new qn("auth",(e,{options:n})=>{const a=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:u}=a.options;F(o&&!o.includes(":"),"invalid-api-key",{appName:a.name});const d={apiKey:o,authDomain:u,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Zi(t)},E=new Lo(a,i,r,d);return ko(E,n),E},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,a)=>{e.getProvider("auth-internal").initialize()})),Xa(new qn("auth-internal",e=>{const n=ye(e.getProvider("auth").getImmediate());return(a=>new id(a))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Qa(gi,Ai,sd(t)),Qa(gi,Ai,"esm2017")}/**
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
 */const od=5*60;Dr("authIdTokenMaxAge");rd("Browser");/**
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
 */const ld=2e3;async function cd(t,e,n){var a;const{BuildInfo:i}=ct();De(e.sessionId,"AuthEvent did not contain a session ID");const r=await md(e.sessionId),o={};return Ct()?o.ibi=i.packageName:Zt()?o.apn=i.packageName:Oe(t,"operation-not-supported-in-this-environment"),i.displayName&&(o.appDisplayName=i.displayName),o.sessionId=r,ea(t,n,e.type,void 0,(a=e.eventId)!==null&&a!==void 0?a:void 0,o)}async function dd(t){const{BuildInfo:e}=ct(),n={};Ct()?n.iosBundleId=e.packageName:Zt()?n.androidPackageName=e.packageName:Oe(t,"operation-not-supported-in-this-environment"),await Rs(t,n)}function ud(t){const{cordova:e}=ct();return new Promise(n=>{e.plugins.browsertab.isAvailable(a=>{let i=null;a?e.plugins.browsertab.openUrl(t):i=e.InAppBrowser.open(t,To()?"_blank":"_system","location=yes"),n(i)})})}async function hd(t,e,n){const{cordova:a}=ct();let i=()=>{};try{await new Promise((r,o)=>{let u=null;function d(){var g;r();const _=(g=a.plugins.browsertab)===null||g===void 0?void 0:g.close;typeof _=="function"&&_(),typeof(n==null?void 0:n.close)=="function"&&n.close()}function E(){u||(u=window.setTimeout(()=>{o(Re(t,"redirect-cancelled-by-user"))},ld))}function I(){(document==null?void 0:document.visibilityState)==="visible"&&E()}e.addPassiveListener(d),document.addEventListener("resume",E,!1),Zt()&&document.addEventListener("visibilitychange",I,!1),i=()=>{e.removePassiveListener(d),document.removeEventListener("resume",E,!1),document.removeEventListener("visibilitychange",I,!1),u&&window.clearTimeout(u)}})}finally{i()}}function pd(t){var e,n,a,i,r,o,u,d,E,I;const g=ct();F(typeof((e=g==null?void 0:g.universalLinks)===null||e===void 0?void 0:e.subscribe)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),F(typeof((n=g==null?void 0:g.BuildInfo)===null||n===void 0?void 0:n.packageName)<"u",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),F(typeof((r=(i=(a=g==null?void 0:g.cordova)===null||a===void 0?void 0:a.plugins)===null||i===void 0?void 0:i.browsertab)===null||r===void 0?void 0:r.openUrl)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),F(typeof((d=(u=(o=g==null?void 0:g.cordova)===null||o===void 0?void 0:o.plugins)===null||u===void 0?void 0:u.browsertab)===null||d===void 0?void 0:d.isAvailable)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),F(typeof((I=(E=g==null?void 0:g.cordova)===null||E===void 0?void 0:E.InAppBrowser)===null||I===void 0?void 0:I.open)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}async function md(t){const e=fd(t),n=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n)).map(i=>i.toString(16).padStart(2,"0")).join("")}function fd(t){if(De(/[0-9a-zA-Z]+/.test(t),"Can only convert alpha-numeric strings"),typeof TextEncoder<"u")return new TextEncoder().encode(t);const e=new ArrayBuffer(t.length),n=new Uint8Array(e);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);return n}/**
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
 */const gd=20;class Ad extends bs{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInialized(),this.passiveListeners.forEach(n=>n(e)),super.onEvent(e)}async initialized(){await this.initPromise}}function Ed(t,e,n=null){return{type:e,eventId:n,urlResponse:null,sessionId:Id(),postBody:null,tenantId:t.tenantId,error:Re(t,"no-auth-event")}}function yd(t,e){return ta()._set(na(t),e)}async function Ei(t){const e=await ta()._get(na(t));return e&&await ta()._remove(na(t)),e}function vd(t,e){var n,a;const i=Td(e);if(i.includes("/__/auth/callback")){const r=pn(i),o=r.firebaseError?Sd(decodeURIComponent(r.firebaseError)):null,u=(a=(n=o==null?void 0:o.code)===null||n===void 0?void 0:n.split("auth/"))===null||a===void 0?void 0:a[1],d=u?Re(u):null;return d?{type:t.type,eventId:t.eventId,tenantId:t.tenantId,error:d,urlResponse:null,sessionId:null,postBody:null}:{type:t.type,eventId:t.eventId,tenantId:t.tenantId,sessionId:t.sessionId,urlResponse:i,postBody:null}}return null}function Id(){const t=[],e="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<gd;n++){const a=Math.floor(Math.random()*e.length);t.push(e.charAt(a))}return t.join("")}function ta(){return xe(Ta)}function na(t){return it("authEvent",t.config.apiKey,t.name)}function Sd(t){try{return JSON.parse(t)}catch{return null}}function Td(t){const e=pn(t),n=e.link?decodeURIComponent(e.link):void 0,a=pn(n).link,i=e.deep_link_id?decodeURIComponent(e.deep_link_id):void 0;return pn(i).link||i||a||n||t}function pn(t){if(!(t!=null&&t.includes("?")))return{};const[e,...n]=t.split("?");return mt(n.join("?"))}/**
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
 */const bd=500;class Cd{constructor(){this._redirectPersistence=ot,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=kn,this._overrideRedirectResult=_a}async _initialize(e){const n=e._key();let a=this.eventManagers.get(n);return a||(a=new Ad(e),this.eventManagers.set(n,a),this.attachCallbackListeners(e,a)),a}_openPopup(e){Oe(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,n,a,i){pd(e);const r=await this._initialize(e);await r.initialized(),r.resetRedirect(),vc(),await this._originValidation(e);const o=Ed(e,a,i);await yd(e,o);const u=await cd(e,o,n),d=await ud(u);return hd(e,r,d)}_isIframeWebStorageSupported(e,n){throw new Error("Method not implemented.")}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=dd(e)),this.originValidationPromises[n]}attachCallbackListeners(e,n){const{universalLinks:a,handleOpenURL:i,BuildInfo:r}=ct(),o=setTimeout(async()=>{await Ei(e),n.onEvent(yi())},bd),u=async I=>{clearTimeout(o);const g=await Ei(e);let _=null;g&&(I!=null&&I.url)&&(_=vd(g,I.url)),n.onEvent(_||yi())};typeof a<"u"&&typeof a.subscribe=="function"&&a.subscribe(null,u);const d=i,E=`${r.packageName.toLowerCase()}://`;ct().handleOpenURL=async I=>{if(I.toLowerCase().startsWith(E)&&u({url:I}),typeof d=="function")try{d(I)}catch(g){console.error(g)}}}}const Rd=Cd;function yi(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:Re("no-auth-event")}}/**
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
 */function Od(t,e){ye(t)._logFramework(e)}var _d="@firebase/auth-compat",wd="0.4.2";/**
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
 */const Nd=1e3;function Ft(){var t;return((t=self==null?void 0:self.location)===null||t===void 0?void 0:t.protocol)||null}function Pd(){return Ft()==="http:"||Ft()==="https:"}function _s(t=be()){return!!((Ft()==="file:"||Ft()==="ionic:"||Ft()==="capacitor:")&&t.toLowerCase().match(/iphone|ipad|ipod|android/))}function xd(){return da()||_i()}function Ld(){return Oi()&&(document==null?void 0:document.documentMode)===11}function kd(t=be()){return/Edge\/\d+/.test(t)}function Dd(t=be()){return Ld()||kd(t)}function ws(){try{const t=self.localStorage,e=Xt();if(t)return t.setItem(e,"1"),t.removeItem(e),Dd()?Kn():!0}catch{return Na()&&Kn()}return!1}function Na(){return typeof global<"u"&&"WorkerGlobalScope"in global&&"importScripts"in global}function Wn(){return(Pd()||Ci()||_s())&&!xd()&&ws()&&!Na()}function Ns(){return _s()&&typeof document<"u"}async function Md(){return Ns()?new Promise(t=>{const e=setTimeout(()=>{t(!1)},Nd);document.addEventListener("deviceready",()=>{clearTimeout(e),t(!0)})}):!1}function jd(){return typeof window<"u"?window:null}/**
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
 */const Pe={LOCAL:"local",NONE:"none",SESSION:"session"},Pt=F,Ps="persistence";function Fd(t,e){if(Pt(Object.values(Pe).includes(e),t,"invalid-persistence-type"),da()){Pt(e!==Pe.SESSION,t,"unsupported-persistence-type");return}if(_i()){Pt(e===Pe.NONE,t,"unsupported-persistence-type");return}if(Na()){Pt(e===Pe.NONE||e===Pe.LOCAL&&Kn(),t,"unsupported-persistence-type");return}Pt(e===Pe.NONE||ws(),t,"unsupported-persistence-type")}async function aa(t){await t._initializationPromise;const e=xs(),n=it(Ps,t.config.apiKey,t.name);e&&e.setItem(n,t._getPersistence())}function Vd(t,e){const n=xs();if(!n)return[];const a=it(Ps,t,e);switch(n.getItem(a)){case Pe.NONE:return[vt];case Pe.LOCAL:return[Bt,ot];case Pe.SESSION:return[ot];default:return[]}}function xs(){var t;try{return((t=jd())===null||t===void 0?void 0:t.sessionStorage)||null}catch{return null}}/**
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
 */const Ud=F;class Ze{constructor(){this.browserResolver=xe(nd),this.cordovaResolver=xe(Rd),this.underlyingResolver=null,this._redirectPersistence=ot,this._completeRedirectFn=kn,this._overrideRedirectResult=_a}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,n,a,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,n,a,i)}async _openRedirect(e,n,a,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,n,a,i)}_isIframeWebStorageSupported(e,n){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,n)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return Ns()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return Ud(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await Md();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}/**
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
 */function Ls(t){return t.unwrap()}function Gd(t){return t.wrapped()}/**
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
 */function $d(t){return ks(t)}function Hd(t,e){var n;const a=(n=e.customData)===null||n===void 0?void 0:n._tokenResponse;if((e==null?void 0:e.code)==="auth/multi-factor-auth-required"){const i=e;i.resolver=new Bd(t,Rl(t,e))}else if(a){const i=ks(e),r=e;i&&(r.credential=i,r.tenantId=a.tenantId||void 0,r.email=a.email||void 0,r.phoneNumber=a.phoneNumber||void 0)}}function ks(t){const{_tokenResponse:e}=t instanceof Je?t.customData:t;if(!e)return null;if(!(t instanceof Je)&&"temporaryProof"in e&&"phoneNumber"in e)return lt.credentialFromResult(t);const n=e.providerId;if(!n||n===Nt.PASSWORD)return null;let a;switch(n){case Nt.GOOGLE:a=je;break;case Nt.FACEBOOK:a=Me;break;case Nt.GITHUB:a=Fe;break;case Nt.TWITTER:a=Ve;break;default:const{oauthIdToken:i,oauthAccessToken:r,oauthTokenSecret:o,pendingToken:u,nonce:d}=e;return!r&&!o&&!i&&!u?null:u?n.startsWith("saml.")?It._create(n,u):Ge._fromParams({providerId:n,signInMethod:n,pendingToken:u,idToken:i,accessToken:r}):new gt(n).credential({idToken:i,accessToken:r,rawNonce:d})}return t instanceof Je?a.credentialFromError(t):a.credentialFromResult(t)}function Ne(t,e){return e.catch(n=>{throw n instanceof Je&&Hd(t,n),n}).then(n=>{const a=n.operationType,i=n.user;return{operationType:a,credential:$d(n),additionalUserInfo:Cl(n),user:He.getOrCreate(i)}})}async function ia(t,e){const n=await e;return{verificationId:n.verificationId,confirm:a=>Ne(t,n.confirm(a))}}class Bd{constructor(e,n){this.resolver=n,this.auth=Gd(e)}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return Ne(Ls(this.auth),this.resolver.resolveSignIn(e))}}/**
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
 */class He{constructor(e){this._delegate=e,this.multiFactor=Nl(e)}static getOrCreate(e){return He.USER_MAP.has(e)||He.USER_MAP.set(e,new He(e)),He.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return Ne(this.auth,ls(this._delegate,e))}async linkWithPhoneNumber(e,n){return ia(this.auth,oc(this._delegate,e,n))}async linkWithPopup(e){return Ne(this.auth,gc(this._delegate,e,Ze))}async linkWithRedirect(e){return await aa(ye(this.auth)),Cc(this._delegate,e,Ze)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return Ne(this.auth,cs(this._delegate,e))}reauthenticateWithPhoneNumber(e,n){return ia(this.auth,lc(this._delegate,e,n))}reauthenticateWithPopup(e){return Ne(this.auth,fc(this._delegate,e,Ze))}async reauthenticateWithRedirect(e){return await aa(ye(this.auth)),Tc(this._delegate,e,Ze)}sendEmailVerification(e){return ml(this._delegate,e)}async unlink(e){return await el(this._delegate,e),this}updateEmail(e){return El(this._delegate,e)}updatePassword(e){return yl(this._delegate,e)}updatePhoneNumber(e){return cc(this._delegate,e)}updateProfile(e){return Al(this._delegate,e)}verifyBeforeUpdateEmail(e,n){return fl(this._delegate,e,n)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}He.USER_MAP=new WeakMap;/**
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
 */const xt=F;class sa{constructor(e,n){if(this.app=e,n.isInitialized()){this._delegate=n.getImmediate(),this.linkUnderlyingAuth();return}const{apiKey:a}=e.options;xt(a,"invalid-api-key",{appName:e.name}),xt(a,"invalid-api-key",{appName:e.name});const i=typeof window<"u"?Ze:void 0;this._delegate=n.initialize({options:{persistence:zd(a,e.name),popupRedirectResolver:i}}),this._delegate._updateErrorMap(ao),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?He.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,n){Do(this._delegate,e,n)}applyActionCode(e){return sl(this._delegate,e)}checkActionCode(e){return ds(this._delegate,e)}confirmPasswordReset(e,n){return il(this._delegate,e,n)}async createUserWithEmailAndPassword(e,n){return Ne(this._delegate,ol(this._delegate,e,n))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return pl(this._delegate,e)}isSignInWithEmailLink(e){return dl(this._delegate,e)}async getRedirectResult(){xt(Wn(),this._delegate,"operation-not-supported-in-this-environment");const e=await Oc(this._delegate,Ze);return e?Ne(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){Od(this._delegate,e)}onAuthStateChanged(e,n,a){const{next:i,error:r,complete:o}=vi(e,n,a);return this._delegate.onAuthStateChanged(i,r,o)}onIdTokenChanged(e,n,a){const{next:i,error:r,complete:o}=vi(e,n,a);return this._delegate.onIdTokenChanged(i,r,o)}sendSignInLinkToEmail(e,n){return cl(this._delegate,e,n)}sendPasswordResetEmail(e,n){return al(this._delegate,e,n||void 0)}async setPersistence(e){Fd(this._delegate,e);let n;switch(e){case Pe.SESSION:n=ot;break;case Pe.LOCAL:n=await xe(Bt)._isAvailable()?Bt:Ta;break;case Pe.NONE:n=vt;break;default:return Oe("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(n)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return Ne(this._delegate,Qo(this._delegate))}signInWithCredential(e){return Ne(this._delegate,Nn(this._delegate,e))}signInWithCustomToken(e){return Ne(this._delegate,nl(this._delegate,e))}signInWithEmailAndPassword(e,n){return Ne(this._delegate,ll(this._delegate,e,n))}signInWithEmailLink(e,n){return Ne(this._delegate,ul(this._delegate,e,n))}signInWithPhoneNumber(e,n){return ia(this._delegate,rc(this._delegate,e,n))}async signInWithPopup(e){return xt(Wn(),this._delegate,"operation-not-supported-in-this-environment"),Ne(this._delegate,mc(this._delegate,e,Ze))}async signInWithRedirect(e){return xt(Wn(),this._delegate,"operation-not-supported-in-this-environment"),await aa(this._delegate),Ic(this._delegate,e,Ze)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return rl(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}sa.Persistence=Pe;function vi(t,e,n){let a=t;typeof t!="function"&&({next:a,error:e,complete:n}=t);const i=a;return{next:o=>i(o&&He.getOrCreate(o)),error:e,complete:n}}function zd(t,e){const n=Vd(t,e);if(typeof self<"u"&&!n.includes(Bt)&&n.push(Bt),typeof window<"u")for(const a of[Ta,ot])n.includes(a)||n.push(a);return n.includes(vt)||n.push(vt),n}/**
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
 */class Pa{constructor(){this.providerId="phone",this._delegate=new lt(Ls(Y.auth()))}static credential(e,n){return lt.credential(e,n)}verifyPhoneNumber(e,n){return this._delegate.verifyPhoneNumber(e,n)}unwrap(){return this._delegate}}Pa.PHONE_SIGN_IN_METHOD=lt.PHONE_SIGN_IN_METHOD;Pa.PROVIDER_ID=lt.PROVIDER_ID;/**
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
 */const Wd=F;class qd{constructor(e,n,a=Y.app()){var i;Wd((i=a.options)===null||i===void 0?void 0:i.apiKey,"invalid-api-key",{appName:a.name}),this._delegate=new ic(e,n,a.auth()),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}/**
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
 */const Kd="auth-compat";function Yd(t){t.INTERNAL.registerComponent(new qn(Kd,e=>{const n=e.getProvider("app-compat").getImmediate(),a=e.getProvider("auth");return new sa(n,a)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:ht.EMAIL_SIGNIN,PASSWORD_RESET:ht.PASSWORD_RESET,RECOVER_EMAIL:ht.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:ht.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:ht.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:ht.VERIFY_EMAIL}},EmailAuthProvider:Qe,FacebookAuthProvider:Me,GithubAuthProvider:Fe,GoogleAuthProvider:je,OAuthProvider:gt,SAMLAuthProvider:gn,PhoneAuthProvider:Pa,PhoneMultiFactorGenerator:Os,RecaptchaVerifier:qd,TwitterAuthProvider:Ve,Auth:sa,AuthCredential:Rt,Error:Je}).setInstantiationMode("LAZY").setMultipleInstances(!1)),t.registerVersion(_d,wd)}Yd(Y);const rt=Y.auth(),en=t=>h.collection("adminProfiles").doc(t),ra=(t,e)=>({type:"ADMIN",data:{...e,id:t}});async function Zd(t,e){const n=t.trim().includes("@")?t.trim():`${t.trim().toLowerCase()}@subadmins.matoreal.invalid`;await rt.setPersistence(Y.auth.Auth.Persistence.SESSION);const{user:a}=await rt.signInWithEmailAndPassword(n,e);if(a.uid===Kt)return ra(a.uid,{name:"FEDERAÇÃO (ADM PRINCIPAL)",permissions:[]});try{const i=await en(a.uid).get();if(!i.exists||i.data().active!==!0)throw Error("Este acesso administrativo foi removido ou não foi autorizado.");return ra(a.uid,{name:i.data().name,permissions:Cn(i.data().permissions)})}catch(i){throw await rt.signOut(),i}}function Jd(t,e,n){return Tn(t)?()=>{}:en(t.data.id).onSnapshot(a=>{if(!a.exists||a.data().active!==!0)return n();try{e(ra(a.id,{name:a.data().name,permissions:Cn(a.data().permissions)}))}catch{n()}},n)}async function xa(){var t;if(((t=rt.currentUser)==null?void 0:t.uid)!==Kt)throw Error("Somente o ADM principal pode gerenciar acessos.")}async function Ds(){return Y.initializeApp(Y.app().options,`subadmin-${crypto.randomUUID()}`)}async function Xd(){await xa();const t=await Ds();try{try{await t.firestore().collection("adminProfiles").doc("__access_probe__").get({source:"server"})}catch(e){if(e.code==="permission-denied")return!0;throw e}throw Error("Antes de cadastrar subADMs, publique as regras de proteção de adminProfiles fornecidas com esta atualização. Seu banco ainda permite acesso público a esses perfis.")}finally{await t.delete()}}async function Ah({name:t,login:e,password:n,permissions:a}){if(await Xd(),t=t.trim(),e=e.trim().toLowerCase(),t.length<2||t.length>80)throw Error("Nome deve ter entre 2 e 80 caracteres.");if(!/^[a-z0-9][a-z0-9._-]{2,31}$/.test(e))throw Error("Login: de 3 a 32 letras, números, pontos, traços ou sublinhados.");if(n.length<12||n.length>128)throw Error("Use uma senha de 12 a 128 caracteres.");a=Cn(a);const i=await Ds();let r;try{return await i.auth().setPersistence(Y.auth.Auth.Persistence.NONE),r=(await i.auth().createUserWithEmailAndPassword(`${e}@subadmins.matoreal.invalid`,n)).user,await en(r.uid).set({name:t,login:e,permissions:a,active:!0,createdAt:Date.now()}),r.uid}catch(o){throw r&&await r.delete().catch(()=>{}),o}finally{await i.auth().signOut().catch(()=>{}),await i.delete()}}async function Eh(t,e){if(await xa(),t===Kt)throw Error("O ADM principal não pode ser alterado aqui.");await en(t).update({permissions:Cn(e)})}async function yh(t){if(await xa(),t===Kt)throw Error("O ADM principal não pode ser excluído.");await en(t).delete()}const Ms={plain:"Lisa",stripes:"Listras verticais",hoops:"Listras horizontais",sash:"Faixa diagonal"},rn=(t,e)=>/^#[0-9a-f]{6}$/i.test(t)?t:e;function yt(t={},e="#16ac78"){return{shirt:rn(t.shirt,e),detail:rn(t.detail,"#ffffff"),shorts:rn(t.shorts,"#18243a"),socks:rn(t.socks,"#ffffff"),pattern:Object.hasOwn(Ms,t.pattern)?t.pattern:"plain"}}function zt(t){const e=(t==null?void 0:t.kits)||{};return{home:yt(e.home),away:yt(e.away,"#f4f4f4"),goalkeeper:yt(e.goalkeeper,"#ffbf35")}}function tt(t,e){const n=r=>[1,3,5].map(o=>parseInt(r.slice(o,o+2),16)),a=n(t),i=n(e);return Math.hypot(...a.map((r,o)=>r-i[o]))}function vh(t,e){const n=zt(t),a=zt(e),i=[];let r=n.home,o=a.away;tt(r.shirt,o.shirt)<110&&(tt(r.shirt,a.home.shirt)>=110?(o=a.home,i.push("Visitante usa o uniforme de casa para evitar cores semelhantes.")):(o=yt({shirt:tt(r.shirt,"#f4f4f4")>tt(r.shirt,"#202033")?"#f4f4f4":"#202033",shorts:"#ff5e67",detail:"#ff5e67"}),i.push("Visitante usa uniforme de contraste neste amistoso.")));const u=[r.shirt,o.shirt],d=(E,I)=>{if(u.some(g=>tt(g,E.shirt)<100)){const _=["#ffbf35","#d83de8","#24d4ed","#151923","#f4f4f4"].sort((H,J)=>Math.min(...u.map(V=>tt(V,J)))-Math.min(...u.map(V=>tt(V,H))))[0];E={...E,shirt:_},i.push(`Goleiro ${I} usa camisa de contraste neste amistoso.`)}return u.push(E.shirt),E};return{home:r,away:o,homeGK:d(n.goalkeeper,"mandante"),awayGK:d(a.goalkeeper,"visitante"),notes:i}}function Ih(t){const e=new Set;return t.map((n,a)=>{var r;let i=((r=n.pixelAppearance)==null?void 0:r.number)||a+1;if(e.has(i))for(i=1;e.has(i);)i++;return e.add(i),{...n,pixelAppearance:{...n.pixelAppearance,number:i}}})}const js=["#f5d0ac","#e8b58a","#cf9367","#aa704b","#805034","#543323"],Fs=["#171717","#523323","#8d5b36","#d6b15d","#d7d7d7","#ab3459"],Vs=["#151923","#f2f4f8","#ffbf35","#f15d56","#68deae","#64b5f6"],Us={short:"Curto",afro:"Afro",mohawk:"Moicano",long:"Longo",ponytail:"Rabo de cavalo",bald:"Careca"};function Vt(t={}){const e=(n,a)=>n.includes(a)?a:n[0];return{skin:e(js,t.skin),hair:e(Fs,t.hair),boots:e(Vs,t.boots),style:Object.hasOwn(Us,t.style)?t.style:"short",beard:["none","short","full"].includes(t.beard)?t.beard:"none",sleeves:t.sleeves==="long"?"long":"short",number:Math.max(1,Math.min(99,Math.floor(Number(t.number)||10)))}}function Qd(t,e,n,a,i="#32bf97",r=0,o=1,u=!1){const d=Vt(a),E=yt(typeof i=="string"?{shirt:i}:i),I=Math.sin(r)>0?1:-1;t.save(),t.translate(Math.round(e),Math.round(n)),t.scale(o,o);const g=(_,H,J,V,ae)=>{t.fillStyle=_,t.fillRect(H,J,V,ae)};if(g("#08131766",-8,0,17,4),g("#10171d",-6,-29,13,12),g("#10171d",-8,-26,17,7),g(d.skin,-6,-27,13,9),g(d.skin,-7,-25,15,5),g("#00000022",4,-25,3,8),g("#ffffff25",-5,-26,5,2),g(d.skin,-2,-18,5,3),d.style!=="bald"&&(g("#10171d",-7,-31,15,7),g(d.hair,-6,-30,13,5),g(d.hair,-7,-27,4,4),g(d.hair,5,-27,3,5),g("#ffffff22",-4,-30,7,2),d.style==="afro"&&(g("#10171d",-9,-31,19,10),g(d.hair,-8,-31,17,8),g(d.hair,-6,-33,13,4)),d.style==="mohawk"&&(g(d.skin,-6,-28,4,3),g(d.skin,3,-28,4,3),g(d.hair,-2,-34,5,9)),d.style==="long"&&(g("#10171d",-8,-26,3,13),g(d.hair,-7,-26,2,12),g(d.hair,6,-26,3,12)),d.style==="ponytail"&&(g("#10171d",7,-27,5,10),g(d.hair,8,-26,3,8))),u||(g("#fff9e9",-4,-24,3,3),g("#fff9e9",2,-24,3,3),g("#172027",-3,-23,2,2),g("#172027",3,-23,2,2),g("#00000033",0,-21,2,2),g("#633e36",-1,-19,3,1),d.beard!=="none"&&g(d.hair,-4,-20,9,d.beard==="full"?4:2)),g("#10171d",-6,-16,13,12),g("#10171d",-8,-15,17,6),g(E.shirt,-5,-15,11,8),g(E.shirt,-7,-14,3,4),g(E.shirt,5,-14,3,4),g(d.sleeves==="long"?E.shirt:d.skin,-7,-10+I,2,4),g(d.sleeves==="long"?E.shirt:d.skin,6,-10-I,2,4),E.pattern==="stripes"&&(g(E.detail,-3,-15,2,8),g(E.detail,2,-15,2,8)),E.pattern==="hoops"&&(g(E.detail,-5,-13,11,2),g(E.detail,-5,-9,11,1)),E.pattern==="sash")for(let _=0;_<7;_++)g(E.detail,-4+_,-15+_,3,1);g("#ffffff24",-4,-15,3,6),g("#00000026",4,-14,2,7),g(E.detail,-2,-15,5,1),g(E.shorts,-5,-7,11,3),g("#10171d",-6,-4,5,7+I),g("#10171d",1,-4,6,7-I),g(E.socks,-4,-4,3,4+I),g(E.socks,2,-4,3,4-I),g(d.boots,-5,I,4,2),g(d.boots,2,-I,4,2),t.fillStyle="#fff",t.font="bold 5px monospace",t.textAlign="center",t.fillText(String(d.number),.5,-9),t.restore()}const eu={AFC:"AF AU BH BD BT BN KH CN TW GU HK IN ID IR IQ JP JO KP KR KW KG LA LB MO MY MV MN MM NP OM PK PS PH QA SA SG LK SY TJ TH TL TM AE UZ VN YE",CAF:"DZ AO BJ BW BF BI CV CM CF TD KM CG CD CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU MA MZ NA NE NG RW ST SN SC SL SO ZA SS SD TZ TG TN UG ZM ZW",CONCACAF:"AI AG AW BS BB BZ BM VG CA KY CR CU CW DM DO SV GD GT GY HT HN JM MX MS NI PA PR KN LC VC SR TT TC US VI",CONMEBOL:"AR BO BR CL CO EC PY PE UY VE",OFC:"AS CK FJ NC NZ PG WS SB PF TO VU",UEFA:"AL AD AM AT AZ BY BE BA BG HR CY CZ DK ENG EE FO FI FR GE DE GI GR HU IS IL IT KZ XK LV LI LT LU MT MD ME NL MK NIR NO PL PT IE RO RU SM SCO RS SK SI ES SE CH TR UA WAL"},tu={MTR:"Mato Real",ENG:"Inglaterra",SCO:"Escócia",WAL:"País de Gales",NIR:"Irlanda do Norte",TW:"Taipé Chinês",CD:"RD Congo",CG:"Congo",CI:"Costa do Marfim",SZ:"Essuatíni",CZ:"Tchéquia",TR:"Turquia",HK:"Hong Kong",MO:"Macau",PF:"Taiti",VG:"Ilhas Virgens Britânicas",VI:"Ilhas Virgens Americanas",KR:"Coreia do Sul",KP:"Coreia do Norte",US:"Estados Unidos",XK:"Kosovo"},nu=new Intl.DisplayNames(["pt-BR"],{type:"region"}),Gs=[{id:"MTR",name:"Mato Real",confederation:"MATO REAL"},...Object.entries(eu).flatMap(([t,e])=>e.split(" ").map(n=>({id:n,name:tu[n]||nu.of(n),confederation:t})))].sort((t,e)=>t.id==="MTR"?-1:e.id==="MTR"?1:t.name.localeCompare(e.name,"pt-BR")),$s=Object.fromEntries(Gs.map(t=>[t.id,t])),au=t=>(t==null?void 0:t.nationality)||"MTR",Sh=t=>{var e;return((e=$s[t])==null?void 0:e.name)||"Mato Real"};function iu(t){return t==="MTR"?"🌟":t==="ENG"||t==="SCO"||t==="WAL"?"🏴":t==="NIR"?"⚽":/^[A-Z]{2}$/.test(t)?String.fromCodePoint(...[...t].map(e=>127397+e.charCodeAt(0))):"🏳️"}const Hs={"4-3-3 OFENSIVO":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MEI","PTD","ATA","PTE"],"4-3-3 DEFENSIVO":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MC","PTD","ATA","PTE"],"4-3-3 FALSO 9":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","PTD","SA","PTE"],"4-3-3 POSSE":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","SA","ATA","SA"],"4-4-2 CLÁSSICO":["GOL","LD","ZAG","ZAG","LE","MD","MC","MC","ME","ATA","ATA"],"4-4-2 LOSANGO":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","MEI","ATA","ATA"],"4-4-2 LINHA":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","MEI","ATA","ATA"],"4-4-1-1":["GOL","LD","ZAG","ZAG","LE","MD","MC","MC","ME","SA","ATA"],"4-2-3-1 LARGO":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","PTD","ATA","PTE"],"4-2-3-1 ESTREITO":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","MEI","MEI","ATA"],"4-1-4-1":["GOL","LD","ZAG","ZAG","LE","VOL","MD","MC","MC","ME","ATA"],"4-1-2-1-2":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","MEI","ATA","ATA"],"4-2-2-2 (BRASIL)":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","MEI","ATA","ATA"],"4-2-4 OFENSIVO":["GOL","LD","ZAG","ZAG","LE","MC","MC","PTD","ATA","ATA","PTE"],"4-5-1 RETRANCA":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MC","MD","ME","ATA"],"4-3-2-1 (NATAL)":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","MEI","MEI","ATA"],"3-5-2 TÁTICO":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MD","ME","MEI","ATA","ATA"],"3-4-3 (CRUYFF)":["GOL","ZAG","ZAG","ZAG","VOL","MC","MD","ME","PTD","ATA","PTE"],"3-4-3 LINHA":["GOL","ZAG","ZAG","ZAG","MD","MC","MC","ME","PTD","ATA","PTE"],"3-4-1-2":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MD","ME","MEI","ATA","ATA"],"3-6-1 CONTROLE":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MD","MC","MC","ME","ATA"],"3-3-1-3 (BIELSA)":["GOL","ZAG","ZAG","ZAG","VOL","MC","MC","MEI","PTD","ATA","PTE"],"3-1-4-2":["GOL","ZAG","ZAG","ZAG","VOL","MD","MC","MC","ME","ATA","ATA"],"5-4-1 ÔNIBUS":["GOL","LD","ZAG","ZAG","ZAG","LE","VOL","VOL","MD","ME","ATA"],"5-3-2 CONTRA":["GOL","LD","ZAG","ZAG","ZAG","LE","VOL","MC","MC","ATA","ATA"],"5-2-3 ALAS":["GOL","LD","ZAG","ZAG","ZAG","LE","MC","MC","PTD","ATA","PTE"],"5-2-1-2":["GOL","LD","ZAG","ZAG","ZAG","LE","VOL","VOL","MEI","ATA","ATA"],"WM (ANOS 30)":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MEI","MEI","PTD","ATA","PTE"],"2-3-5 (PIRÂMIDE)":["GOL","ZAG","ZAG","VOL","MC","VOL","PTD","SA","ATA","SA","PTE"],"4-6-0 (SEM ATA)":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MD","ME","MEI","MEI"],"1-1-8 (KAMIKAZE)":["GOL","ZAG","MC","PTD","SA","SA","ATA","ATA","SA","SA","PTE"],"VÁRZEA (TUDO P/ FRENTE)":["GOL","ZAG","ZAG","VOL","MEI","PTD","ATA","ATA","ATA","ATA","PTE"],"VÁRZEA (VOLANTAÇO)":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","VOL","VOL","MEI","ATA"]},su=23;function La(t){if(!$s[t])throw Error("Seleção inválida.")}function ru(t,e){return au(t)===e&&!["PENDING","BLOCKED"].includes(t.status)}function Th(t,e,n){if(La(t),!Array.isArray(e)||e.length>su||new Set(e).size!==e.length)throw Error("Convoque até 23 jogadores, sem repetidos.");if(e.some(a=>!n.some(i=>i.id===a&&ru(i,t))))throw Error("Jogador indisponível ou de outra nacionalidade.")}function bh(t,e,n,a){if(!Hs[t])throw Error("Formação inválida.");if(e.length!==11||new Set(e).size!==11||e.some(r=>!r||!n.includes(r)))throw Error("Selecione 11 titulares distintos da convocação.");const i=e.map(r=>a.find(o=>o.id===r));if(i.some(r=>!r||(r.recoveryLeft||0)>0||(r.energy??100)<25))throw Error("Titular lesionado, indisponível ou com menos de 25 de energia.");if(i[0].position!=="GOL"||i.slice(1).some(r=>r.position==="GOL"))throw Error("Escale um goleiro na primeira posição e dez jogadores de linha.")}function Ch(t,e){if(t.length<2||t.length>16||new Set(t).size!==t.length)throw Error("Escolha de 2 a 16 seleções distintas.");if(t.forEach(La),!/^\d{4}-\d{2}-\d{2}$/.test(e)||Number.isNaN(Date.parse(e)))throw Error("Escolha uma data válida.");const n=[...t];n.length%2&&n.push(null);const a=[];for(let i=0;i<n.length-1;i++){const r=new Date(e+"T12:00:00Z");r.setUTCDate(r.getUTCDate()+i*7);for(let o=0;o<n.length/2;o++){const u=n[o],d=n[n.length-1-o];u&&d&&a.push({homeId:i%2?d:u,awayId:i%2?u:d,date:r.toISOString().slice(0,10),round:i+1})}n.splice(1,0,n.pop())}return a}function Rh(t,e){const n=new Map(t.map(a=>[a,{id:a,pts:0,played:0,wins:0,gf:0,ga:0}]));for(const a of e.filter(i=>i.status==="FINISHED"&&i.stage!=="FINAL")){const i=n.get(a.homeId),r=n.get(a.awayId);if(!(!i||!r))if(i.played++,r.played++,i.gf+=a.homeScore,i.ga+=a.awayScore,r.gf+=a.awayScore,r.ga+=a.homeScore,a.homeScore===a.awayScore)i.pts++,r.pts++;else{const o=a.homeScore>a.awayScore?i:r;o.pts+=3,o.wins++}}return[...n.values()].sort((a,i)=>i.pts-a.pts||i.wins-a.wins||i.gf-i.ga-(a.gf-a.ga)||i.gf-a.gf||a.id.localeCompare(i.id))}const Dn={COMERCIO:{label:"Comércio Local",start:25e5,tax:5e4,desc:"Ideal para iniciantes. Imposto baixo."},MEDIA:{label:"Média Empresa",start:2e7,tax:35e4,desc:"Poder moderado. Imposto médio."},GRANDE:{label:"Grande Empresa",start:1e8,tax:2e6,desc:"Gigante do mercado. Imposto alto."}},oa={balance:"⚖️ Equilíbrio",stamina:"🔋 Resistência",speed:"⚡ Veloc. Máx.",accel:"🚀 Aceleração",agility:"🤸 Agilidade",jump:"🦘 Impulsão",condition:"💪 Cond. Física",attack:"⚔️ Ataque",dribble:"⚽ Drible",dribbleSpd:"🏃💨 Drib. Veloc.",shortPass:"🎯 Passe Curto",shortPassSpd:"⏩ P. Curto Vel.",longPass:"📡 Passe Longo",longPassSpd:"🚀 P. Longo Vel.",shot:"🔫 Finalização",shotPower:"💣 Força Chute",shotTech:"🎨 Téc. Chute",freeKick:"🎯 Falta",curve:"🍌 Efeito",header:"🤕 Cabeceio",tech:"✨ Técnica",weakFootAcc:"🦶 Pior Pé Prec.",weakFootFreq:"🔄 Pior Pé Freq.",defense:"🛡️ Defesa",response:"🧠 Resposta",aggression:"😡 Agressividade",mentality:"🧠 Atitude",teamwork:"🤝 Trabalho Eq.",gk:"🧤 Hab. Goleiro"},vn=(t,e)=>{const n=parseInt(e)||50,a={},i=Object.keys(oa);let r=[],o=[];t==="GOL"?(r=["gk","response","jump","longPass"],o=["balance","condition","mentality","defense"]):t.includes("ZAG")?(r=["defense","header","balance","jump","aggression"],o=["stamina","response","shortPass","longPass"]):t.includes("LAT")||t.includes("LD")||t.includes("LE")?(r=["speed","accel","stamina","shortPass","dribble"],o=["defense","longPass","curve","attack"]):t.includes("VOL")||t.includes("MC")||t==="MD"||t==="ME"?(r=["shortPass","stamina","teamwork","defense","balance"],o=["longPass","tech","shotPower","vision"]):t.includes("MEI")||t.includes("MAT")?(r=["dribble","shortPass","vision","tech","curve","agility"],o=["shot","speed","attack","freeKick"]):t==="PTD"||t==="PTE"?(r=["speed","accel","dribble","agility","curve"],o=["shot","stamina","longPass","technique"]):(t.includes("ATA")||t.includes("SA")||t.includes("PNT"))&&(r=["shot","attack","header","shotPower","balance"],o=["speed","reaction","dribble","strength"]),i.forEach(g=>{let _=n;r.includes(g)?_+=Math.floor(Math.random()*6)+2:o.includes(g)?_-=Math.floor(Math.random()*4):_-=Math.floor(Math.random()*10)+5,t!=="GOL"&&g==="gk"&&(_=10),t==="GOL"&&["shot","attack","dribble","curve","freeKick"].includes(g)&&(_=Math.max(15,_-20)),n<80&&_>88&&(_=88),_>99&&(_=99),_<1&&(_=1),a[g]=_});const u=i.filter(g=>t==="GOL"?!["shot","attack","dribble","curve","freeKick","weakFootAcc","weakFootFreq"].includes(g):g!=="gk");let d=0;u.forEach(g=>d+=a[g]);const E=d/u.length,I=n-E;return u.forEach(g=>{let _=I;a[g]>90&&n<85&&I>0&&(_=0);let H=a[g]+_;H>99&&(H=99),H<1&&(H=1),a[g]=Math.round(H)}),a};function ou(t,e){const{setLoading:n,teams:a,players:i,companies:r,coaches:o,papers:u,journalists:d,setUser:E,setScreen:I}=t;return{login:async(P,k,C)=>{n(!0);try{await rt.signOut();let f=null,T="";if(C==="TEAM"||C==="USER"){const m=a.find(R=>R.id===P&&R.password===k);m&&(f=m,T="USER")}else if(C==="PLAYER"){const m=i.find(R=>!R.isBot&&R.id===P&&R.password===k);m&&(f=m,T="PLAYER")}else if(C==="COMPANY"){const m=r.find(R=>R.id===P&&R.password===k);m&&(f=m,T="COMPANY")}else if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(C)){const m=o.find(R=>R.id===P&&R.password===k);m&&(f=m,T=m.type)}else if(C==="PRESS"||C==="PAPER"){const m=u.find(R=>R.id===P&&R.password===k);m&&(f=m,T="PRESS")}else if(C==="PRESS_WORKER"||C==="JOURNALIST"){const m=d.find(R=>R.id===P&&R.password===k);if(m){const R=u.find(w=>w.id===m.newspaperId);f={...m,paperName:R==null?void 0:R.name},T="PRESS_WORKER"}}else{let m=a.find(R=>(R.id===P||R.name===P)&&R.password===k);if(m&&(f=m,T="USER"),!f){let R=i.find(w=>!w.isBot&&(w.id===P||w.name===P)&&w.password===k);R&&(f=R,T="PLAYER")}if(!f){let R=o.find(w=>(w.id===P||w.name===P)&&w.password===k);R&&(f=R,T=R.type)}if(!f){let R=r.find(w=>(w.id===P||w.name===P)&&w.password===k);R&&(f=R,T="COMPANY")}if(!f){let R=u.find(w=>(w.id===P||w.name===P)&&w.password===k);R&&(f=R,T="PRESS")}if(!f){let R=d.find(w=>(w.id===P||w.name===P)&&w.password===k);if(R){const w=u.find(l=>l.id===R.newspaperId);f={...R,paperName:w==null?void 0:w.name},T="PRESS_WORKER"}}}f?f.status==="PENDING"?alert("Conta em análise pela Federação. Aguarde aprovação."):f.status==="BLOCKED"?alert("Conta bloqueada."):(E({type:T,data:f}),Yn({type:T,data:f}),I(T==="COACH"?"COACH_DASH":T==="DOCTOR"?"DOCTOR_DASH":T==="ASSISTANT"?"ASSISTANT_DASH":T==="SCOUT"?"SCOUT_DASH":T==="COMPANY"?"COMPANY_DASH":T==="PLAYER"?"PLAYER_DASH":T==="PRESS"||T==="PRESS_WORKER"?"PRESS_DASH":"HOME")):alert("ID ou Senha incorretos!")}catch(f){console.error(f),alert("Erro no login: "+f.message)}n(!1)},loginAdmin:async(P,k)=>{const C=await Zd(P,k);Yn(C),E(C),I(Li("ADMIN",Xn(C,"screen")))},createTeam:async(P,k,C,f,T,m)=>{if(!m)return alert("Escolha um Estado!");if(a.find(R=>R.name.toLowerCase()===P.toLowerCase()))return alert("Nome em uso!");await h.collection("teams").add({name:P,balance:parseFloat(k),serie:C,estado:m,password:f,stadiumLevel:1,logo:T||null,status:"PENDING",stats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0},stateStats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}}),alert("Clube fundado! Aguarde aprovação da Federação.")},createPlayerAccount:async P=>{try{La(P.nationality)}catch(k){alert(k.message);return}if(!P.name||!P.password||!P.instagram)return alert("Preencha todos os campos!");n(!0);try{const k=P.position==="GOL"?60:45,C=vn(P.position,k);await h.collection("players").add({name:P.name,nationality:P.nationality,pixelAppearance:Vt(P.pixelAppearance),instagram:P.instagram,position:P.position,password:P.password,overall:k,attributes:C,teamId:"FREE",status:"PENDING",balance:0,salary:1500,value:4e4,contract:0,mood:"😐",fame:0,stats:{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0}}),alert(`✅ Inscrição enviada!
A Federação avaliará seu Instagram em breve. Assim que aprovado, você aparecerá no mercado de Agentes Livres.`),window.location.reload()}catch(k){alert("Erro ao criar: "+k.message),n(!1)}},createStaff:async P=>{if(!P.name||!P.password||!P.role)return alert("Preencha todos os campos obrigatórios!");n(!0);try{const k=`staff_${Date.now()}`;await h.collection("users").doc(k).set({id:k,name:P.name,password:P.password,type:P.role,level:1,xp:0,salary:2500,affinities:[P.affinity||"Geral"],pendingPerks:0,pendingAffinity:0,teamId:"FREE",status:"ACTIVE",trainingsLeft:2,clause:5e4,perks:[],face:P.face||null,createdAt:Date.now()}),alert(`✅ Licença de ${{COACH:"Técnico",DOCTOR:"Médico",SCOUT:"Olheiro",ASSISTANT:"Auxiliar"}[P.role]} gerada com sucesso!
Você já está ativo nos Agentes Livres. Pode fazer o login!`),window.location.reload()}catch(k){console.error(k),alert("Erro ao criar perfil profissional."),n(!1)}},createNewspaper:async(P,k,C)=>{await h.collection("newspapers").add({name:P,password:k,ownerName:C,status:"PENDING"}),alert("Jornal criado! Aguarde Federação.")},createJournalist:async(P,k,C)=>{await h.collection("journalists").add({name:P,password:k,newspaperId:C,status:"PENDING"}),alert("Conta criada! Aguarde seu Chefe.")},createCompany:async P=>{if(!P.n||!P.p)return alert("Preencha tudo!");await h.collection("companies").add({name:P.n,owner:P.owner,password:P.p,companyType:P.type,balance:Dn[P.type].start,status:"PENDING"}),alert("Solicitação enviada! Aguarde a Federação.")}}}const te=t=>"₣ "+parseFloat(t||0).toLocaleString("pt-BR"),St={1:{name:"O Terrão",cap:1e3,minTic:10,maxTic:30,upgCost:5e6,maint:0,prompt:"Campo de futebol de terra e grama falha, alambrado enferrujado, pequena arquibancada de concreto, dia ensolarado, futebol de várzea --ar 16:9"},2:{name:"Estádio Municipal",cap:5e3,minTic:20,maxTic:60,upgCost:15e6,maint:15e3,prompt:"Estádio municipal pequeno, gramado razoável, arquibancadas baixas de concreto, luzes simples, dia de jogo --ar 16:9"},3:{name:"Estádio Profissional",cap:15e3,minTic:40,maxTic:100,upgCost:35e6,maint:6e4,prompt:"Estádio de futebol profissional, arquibancadas cobertas de um lado, cadeiras de plástico coloridas, refletores altos, torcida --ar 16:9"},4:{name:"Arena Moderna",cap:4e4,minTic:80,maxTic:200,upgCost:8e7,maint:15e4,prompt:"Arena de futebol moderna, dois anéis de arquibancada, cobertura completa, telões digitais, cadeiras padronizadas --ar 16:9"},5:{name:"Padrão FIFA",cap:8e4,minTic:120,maxTic:350,upgCost:0,maint:4e5,prompt:"Estádio de futebol padrão Copa do Mundo, arquitetura futurista de vidro e aço, 80 mil lugares, iluminação cênica de LED noturna, lotado --ar 16:9"}},lu=(t,e)=>{if(!t)return 0;const a={A:1e4,B:4e3,C:1500,D:500,VARZEA:100}[t.serie||"VARZEA"]||100,i=e.reduce((g,_)=>g+(_.fame||0),0),r=Math.floor(i/20),o=t.recentForm||[];let u=1;if(o.length>0){const g=o.filter(H=>H==="VITORIA").length,_=o.filter(H=>H==="DERROTA").length;g>_&&(u+=g*.06),_>g&&(u-=_*.08)}const d=Math.floor((a+r)*u),E=t.socioPrice||40;let I=1;return E>10&&(I=1-(E-10)*.006428),I<.05&&(I=.05),Math.max(0,Math.floor(d*I))},la={A:{champ:3e7,vice:2e7,third:15e6,mid:8e6,rel:5e6},B:{champ:12e6,vice:8e6,mid:5e6,rel:3e6},C:{champ:7e6,vice:5e6,mid:3e6,rel:15e5},D:{champ:35e5,vice:25e5,mid:12e5,rel:5e5},VARZEA:{champ:1e6,vice:8e5,third:6e5,mid:2e5}};function cu(t,e){const{user:n,setModal:a,conf:i,setLoading:r,players:o,teams:u,companies:d,sps:E,coaches:I}=t,g=(...ne)=>e.postNews(...ne);return{adminAction:async(ne,P)=>{if(ne==="EDIT_PRIZES"){a({type:"EDIT_PRIZES",data:i.prizes||la});return}if(ne==="MARKET"&&(h.collection("config").doc("system").update({marketOpen:P}),g(P?"📢 JANELA ABERTA":"🔒 JANELA FECHADA","infra")),ne==="VARZEA"&&(h.collection("config").doc("system").update({varzeaOpen:P}),g(P?`🔓 **INSCRIÇÕES ABERTAS!**
A Várzea voltou a aceitar novos times!`:`🛑 **INSCRIÇÕES ENCERRADAS!**
O limite de times na Várzea foi atingido. Apenas na próxima temporada!`,"infra")),ne==="WEEK"){if(!confirm(`⚠️ VIRAR SEMANA?

1. Pagar Salários (+)
2. Cobrar Imposto Jogador (3%)
3. Recuperar Energia (100%)
4. Empresas, Técnicos e XP`))return;r(!0);const k=h.batch();o.forEach(m=>{if(m.teamId&&m.teamId!=="FREE"&&u.some(R=>R.id===m.teamId)){const R=parseFloat(m.balance)||0,w=parseFloat(m.salary)||0,l=R*.03,p=m.healthPlan&&m.healthPlan.cost||0;let A=0;if(m.personalSponsor){const D=m.personalSponsor.companyId,O=d.find(B=>B.id===D),N=parseFloat(m.personalSponsor.value)||0;O&&O.status==="ACTIVE"&&(O.balance||0)>=N?(A=N,k.update(h.collection("companies").doc(D),{balance:Y.firestore.FieldValue.increment(-N)})):(k.update(h.collection("players").doc(m.id),{personalSponsor:Y.firestore.FieldValue.delete(),mood:"😡"}),h.collection("news").add({text:`📉 **CALOTE!** A empresa **${m.personalSponsor.companyName}** não teve fundos para pagar o patrocínio de **${m.name}** e o contrato foi rompido!`,type:"press",date:Date.now(),likes:[]}))}const b=R+w+A-l-p,x=(m.xp||0)+(m.pendingXP||0);k.update(h.collection("players").doc(m.id),{balance:b,energy:100,xp:x,pendingXP:0})}}),u.forEach(m=>{const R=parseFloat(m.balance)||0,w=o.filter(y=>y.teamId===m.id),l=E.filter(y=>y.teamId===m.id&&y.status==="ACTIVE").reduce((y,ee)=>y+parseFloat(ee.value),0),A={A:65e4,B:5e5,C:4e5,D:3e5,VARZEA:1e5}[m.serie||"VARZEA"]||1e5,x=lu(m,w)*(m.socioPrice||40),D=A+l+x,O=w.reduce((y,ee)=>y+(parseFloat(ee.salary)||0),0),N=I.filter(y=>y.teamId===m.id&&y.status==="ACTIVE").reduce((y,ee)=>y+(parseFloat(ee.salary)||0),0),B=m.healthPlan&&m.healthPlan.cost||0,z=m.stadiumLevel||1,re=St[z]?St[z].maint:0;let Q={},oe=0,ue=0,q=0;if(m.bankInvestment&&m.bankInvestment.amount>0){const y=m.bankInvestment.amount;q=y*.02;const ee=Math.max(0,(m.bankInvestment.weeksLocked||0)-1);Q.bankInvestment={amount:y+q,weeksLocked:ee}}if(m.bankLoan&&m.bankLoan.installments>0){oe=m.bankLoan.weeklyPayment;const y=m.bankLoan.installments-1;y<=0?Q.bankLoan=Y.firestore.FieldValue.delete():Q.bankLoan={...m.bankLoan,installments:y}}if(m.stadiumLoan&&m.stadiumLoan.installments>0){ue=m.stadiumLoan.weeklyPayment;const y=m.stadiumLoan.installments-1;y<=0?Q.stadiumLoan=Y.firestore.FieldValue.delete():Q.stadiumLoan={...m.stadiumLoan,installments:y}}const G=O+N+B+re+oe+ue;Q.balance=R+D-G;let j=`🟢 RECEITAS:
`;j+=`+ Federação/TV: ${te(A)}
`,x>0&&(j+=`+ Sócios-Torcedores: ${te(x)}
`),l>0&&(j+=`+ Patrocinadores: ${te(l)}
`),j+=`
🔴 DESPESAS:
`,O>0&&(j+=`- Salários (Elenco): ${te(O)}
`),N>0&&(j+=`- Salários (Comissão): ${te(N)}
`),B>0&&(j+=`- Convênio Médico: ${te(B)}
`),re>0&&(j+=`- Manutenção Arena: ${te(re)}
`),oe>0&&(j+=`- Parcela Empréstimo: ${te(oe)}
`),ue>0&&(j+=`- Parcela Arena: ${te(ue)}
`);const K=D-G;j+=`
⚖️ RESULTADO FINAL: ${K>=0?"Lucro de "+te(K):"Prejuízo de "+te(K)}`,q>0&&(j+=`

📈 Sua Renda Fixa rendeu +${te(q)} (O valor continua aplicado no Banco).`);let S=[...m.trainingLogs||[]];S.unshift({date:Date.now(),type:"📊 BALANÇO FINANCEIRO",report:j}),S.length>15&&S.pop(),Q.trainingLogs=S,k.update(h.collection("teams").doc(m.id),Q)});const C=h.collection("news").doc();k.set(C,{text:`💰 **COTAS DA FEDERAÇÃO PAGAS!**
O apoio financeiro semanal foi depositado. Diretorias, confiram o Extrato no Diário Oficial do Clube (CT) para ver os lucros e despesas de sua equipe.`,date:Date.now(),type:"money",likes:[]}),d.forEach(m=>{if(m.status==="ACTIVE"){const R=parseFloat(m.balance)||0,w=m.companyType||"COMERCIO",l=(Dn[w]||{}).tax||5e4;k.update(h.collection("companies").doc(m.id),{balance:R-l})}}),(await h.collection("users").where("type","in",["COACH","DOCTOR","SCOUT","ASSISTANT"]).get()).docs.forEach(m=>{const R=m.data();let w={trainingsLeft:2};if(R.teamId&&R.teamId!=="FREE")if(u.some(p=>p.id===R.teamId)){const p=parseFloat(R.balance)||0;w.balance=p+parseFloat(R.salary)}else w.teamId="FREE",w.contract=0;k.update(h.collection("users").doc(m.id),w)}),(await h.collection("debts").get()).docs.forEach(m=>{const R=m.data(),w=u.some(p=>p.id===R.buyerId),l=u.some(p=>p.id===R.sellerId);!w||!l?k.delete(m.ref):R.weeksRemaining>0&&(k.update(h.collection("teams").doc(R.buyerId),{balance:Y.firestore.FieldValue.increment(-R.installmentVal)}),k.update(h.collection("teams").doc(R.sellerId),{balance:Y.firestore.FieldValue.increment(R.installmentVal)}),R.weeksRemaining-1===0?(k.delete(m.ref),g(`✅ **DÍVIDA QUITADA**
${R.buyerName} terminou de pagar ${R.playerName}.`,"money")):(k.update(m.ref,{weeksRemaining:R.weeksRemaining-1}),g(`💳 **PARCELA PAGA**
${R.buyerName} pagou a parcela (${R.weeksRemaining}x) de ${R.playerName}.`,"money-minus")))});try{await k.commit(),alert("Semana processada! Salários pagos e treinos resetados.")}catch(m){alert("Erro: "+m.message)}r(!1)}if(ne==="SEASON"){if(!confirm(`⚠️ VIRAR TEMPORADA?

1. Evoluir Atributos (XP)
2. Envelhecer Contratos
3. Processar Retornos
4. Envelhecer Técnicos`))return;r(!0);const k=h.batch();o.forEach(f=>{let T={};const m=(f.xp||0)+(f.pendingXP||0),R=Math.floor(m/100),w=m%100;if(f.attributes&&R!==0){let p={...f.attributes};const A=Object.keys(p),b=Math.abs(R),x=R>0;for(let N=0;N<b;N++){const B=A[Math.floor(Math.random()*A.length)];x?p[B]<99&&p[B]++:p[B]>1&&p[B]--}T.attributes=p;const D=Object.values(p),O=Math.round(D.reduce((N,B)=>N+B,0)/D.length);T.overall=O,T.xp=w,T.pendingXP=0}else T.xp=0,T.pendingXP=0;let l=(parseInt(f.contract)||0)-1;if(l<0&&(l=0),T.contract=l,l===0&&f.loanMeta&&f.loanMeta.ownerId){const p=f.loanMeta.ownerId,A=u.find(b=>b.id===p);if(f.loanMeta.hasBuyOption&&f.loanMeta.buyOpt>0){const b=u.find(D=>D.id===f.teamId),x=h.collection("offers").doc();k.set(x,{type:"COMPRA_DEFINITIVA",playerId:f.id,playerName:f.name,buyerId:f.teamId,buyerName:(b==null?void 0:b.name)||"Clube Atual",sellerId:p,recipientId:f.teamId,value:f.loanMeta.buyOpt,status:"PENDING",description:`🏁 **FIM DE EMPRÉSTIMO**
Deseja exercer a opção de compra de **${f.name}** por ${te(f.loanMeta.buyOpt)}?
Caso recuse, o jogador retornará ao clube de origem.`,date:Date.now(),isLoanOption:!0}),T.status="INTRANSFERIVEL"}else{let b=(parseInt(f.loanMeta.originalContract)||1)-1;if(b<=0){const x=h.collection("offers").doc();k.set(x,{type:"RENOVACAO_URGENTE",playerId:f.id,playerName:f.name,buyerId:p,buyerName:(A==null?void 0:A.name)||"Clube de Origem",sellerId:"SISTEMA",recipientId:p,status:"PENDING",description:`⚠️ **URGENTE: FIM DE VÍNCULO**
O empréstimo de **${f.name}** acabou e ele está sem contrato com você.`,date:Date.now()}),T.teamId=p,T.contract=0,T.status="INTRANSFERIVEL"}else{T.teamId=p,T.contract=b,T.status="NAO_A_VENDA";const x=h.collection("offers").doc();k.set(x,{type:"NOTIFICACAO",playerId:f.id,playerName:f.name,buyerName:"Sistema",recipientId:p,status:"PENDING",description:`🔙 **RETORNO DE EMPRÉSTIMO**
O jogador **${f.name}** retornou ao seu elenco.

📄 Contrato Restante: ${b} temporada(s).`,date:Date.now()}),g(`🔙 **RETORNO**
${f.name} voltou ao ${A==null?void 0:A.name} (${b} anos rest.).`,"transfer")}T.loanMeta=Y.firestore.FieldValue.delete()}}else l===0&&(!f.loanMeta||!f.loanMeta.ownerId)&&(f.preContract&&u.some(p=>p.id===f.preContract.teamId)?(T.teamId=f.preContract.teamId,T.contract=2,T.status="NAO_A_VENDA",T.preContract=Y.firestore.FieldValue.delete()):(T.teamId="FREE",T.status="VENDA",T.mood="😐",T.loanMeta=Y.firestore.FieldValue.delete()));k.update(h.collection("players").doc(f.id),T)}),(await h.collection("users").where("type","==","COACH").get()).docs.forEach(f=>{const T=f.data();if(T.teamId&&T.teamId!=="FREE"){const m=(T.contract||1)-1;m<=0?k.update(h.collection("users").doc(f.id),{teamId:"FREE",contract:0,salary:2500}):k.update(h.collection("users").doc(f.id),{contract:m})}});try{await k.commit(),alert("Temporada virada! Jogadores e técnicos atualizados.")}catch(f){alert("Erro: "+f.message)}r(!1),g(`💪 **PRÉ-TEMPORADA**
Os jogadores treinaram e contratos foram renovados!`,"season")}},resetDatabase:async()=>{if(!Tn(n))return alert("Somente o ADM principal pode resetar o jogo.");if(prompt("⚠️ PERIGO: Isso apagará TODOS os dados do jogo. Digite RESETAR para confirmar:")!=="RESETAR"||!confirm("TEM CERTEZA? Todos os times, jogadores e finanças sumirão para sempre!"))return;r(!0);const P=["teams","players","users","news","offers","sponsorships","sales","debts","financeRequests","products","companies","journalists","newspapers","nationalTeams","nationalMatches","nationalCompetitions","nationalWindows"];try{let k=[h.batch()],C=0;for(const f of P)(await h.collection(f).get()).docs.forEach(m=>{C>=450&&(k.push(h.batch()),C=0),k[k.length-1].delete(m.ref),C++});for(let f of k)await f.commit();alert("💥 BANCO DE DADOS RESETADO! O sistema irá reiniciar."),window.location.reload()}catch(k){alert("Erro ao resetar: "+k.message)}r(!1)},approveTeam:async(ne,P)=>{await h.collection("teams").doc(ne).update({status:"ACTIVE",balance:parseFloat(P)});const k=u.find(C=>C.id===ne);g(`🛡️ **NOVO CLUBE!**
O **${k.name}** foi aprovado na Série ${k.serie}.`,"infra"),alert("Aprovado!")},deleteTeam:async ne=>{if(!confirm("⚠️ PERIGO: Excluir time e jogadores?"))return;const P=h.batch();P.delete(h.collection("teams").doc(ne)),(await h.collection("players").where("teamId","==",ne).get()).docs.forEach(C=>P.delete(C.ref)),await P.commit(),g(`🚫 **CLUBE EXTINTO**
Um time encerrou atividades.`,"infra")},deletePaper:async ne=>{if(!confirm("Excluir Jornal e demitir jornalistas?"))return;const P=h.batch();P.delete(h.collection("newspapers").doc(ne)),(await h.collection("journalists").where("newspaperId","==",ne).get()).docs.forEach(C=>P.delete(C.ref)),await P.commit(),alert("Jornal fechado!")},deleteJournalist:async ne=>{confirm("Demitir Jornalista?")&&(await h.collection("journalists").doc(ne).delete(),alert("Demitido!"))}}}const ca={GOL:{train:"GOLEIRO",attrs:["gk","response","jump"]},ZAG:{train:"DEFESA",attrs:["defense","aggression","header"]},LD:{train:"VELOCIDADE",attrs:["speed","stamina","shortPass"]},LE:{train:"VELOCIDADE",attrs:["speed","stamina","shortPass"]},VOL:{train:"DEFESA",attrs:["defense","shortPass","stamina"]},MC:{train:"PASSE",attrs:["shortPass","longPass","teamwork"]},MD:{train:"DRIBLE",attrs:["dribble","speed","tech"]},ME:{train:"DRIBLE",attrs:["dribble","speed","tech"]},MEI:{train:"PASSE",attrs:["tech","shortPass","agility"]},PTD:{train:"VELOCIDADE",attrs:["speed","accel","dribble"]},PTE:{train:"VELOCIDADE",attrs:["speed","accel","dribble"]},ATA:{train:"CHUTE",attrs:["shot","shotPower","header"]},SA:{train:"CHUTE",attrs:["attack","shot","dribble"]}},ka=["Vale do Mato","Lua Mare","Rio Manso","Serra Verde","Lagoa Azul"];function du(t,e){const{setModal:n,setLoading:a,teams:i,conf:r,players:o,user:u}=t,d=(...V)=>e.postNews(...V);return{handleSaveMatch:async V=>{if(!V){n(null);return}a(!0);try{V.id?(await h.collection("matches").doc(V.id).update(V),alert("Partida atualizada!")):(await h.collection("matches").add(V),alert("Partida criada!")),n(null)}catch(ae){alert("Erro: "+ae.message)}a(!1)},handleDeleteMatch:async V=>{confirm("Tem certeza que deseja excluir esta partida permanentemente?")&&(await h.collection("matches").doc(V).delete(),n(null),alert("Partida excluída."))},generateFixtures:async()=>{if(!confirm("Gerar tabela de jogos para TODAS as séries (A, B, C, D e Várzea)?"))return;a(!0);const V=Y.firestore();let ae=[V.batch()],ce=0;const ne=()=>(ce>=450&&(ae.push(V.batch()),ce=0),ce++,ae[ae.length-1]);try{["A","B","C","D","VARZEA"].forEach(k=>{const C=i.filter(m=>m.serie===k&&m.status==="ACTIVE");if(C.length<2)return;const f=(C.length-1)*2;let T=C.map(m=>m.id);T.length%2!==0&&T.push(null);for(let m=0;m<f;m++){const R=m>=f/2;for(let w=0;w<T.length/2;w++){let l=T[w],p=T[T.length-1-w];if(!l||!p)continue;R&&([l,p]=[p,l]);const A=i.find(x=>x.id===l),b=i.find(x=>x.id===p);ne().set(V.collection("matches").doc(),{serie:k,round:m+1,homeId:l,homeName:A.name,homeLogo:A.logo||null,awayId:p,awayName:b.name,awayLogo:b.logo||null,scoreHome:0,scoreAway:0,status:"PENDING",played:!1})}T.splice(1,0,T.pop())}}),ka.forEach(k=>{const C=i.filter(m=>m.estado===k&&m.status==="ACTIVE");if(C.length<2)return;const f=C.length-1;let T=C.map(m=>m.id);T.length%2!==0&&T.push(null);for(let m=0;m<f;m++){for(let R=0;R<T.length/2;R++){let w=T[R],l=T[T.length-1-R];if(!w||!l)continue;Math.random()>.5&&([w,l]=[l,w]);const p=i.find(b=>b.id===w),A=i.find(b=>b.id===l);ne().set(V.collection("matches").doc(),{serie:"ESTADUAL",estado:k,round:`Fase 1 (Rod. ${m+1})`,homeId:w,homeName:p.name,homeLogo:p.logo||null,awayId:l,awayName:A.name,awayLogo:A.logo||null,scoreHome:0,scoreAway:0,status:"PENDING",played:!1,isEstadual:!0})}T.splice(1,0,T.pop())}});for(let k of ae)await k.commit();a(!1),d(`📅 **TABELA DIVULGADA!**
A Federação liberou o calendário de jogos da temporada (incluindo Várzea).`,"infra"),alert("Jogos gerados com sucesso e sem travamentos!")}catch(P){a(!1),console.error(P),alert("Erro ao gerar tabela: "+P.message)}},handleSeasonTurnAdvanced:async()=>{var G,j,K;if(!confirm(`⚠️ ATENÇÃO: Isso encerrará a temporada atual!

1. Pagará Premiações Finais
2. Aplica Promoção/Rebaixamento
3. Evolui Atributos e Overall (XP)
4. Envelhece contratos e Zera estatísticas`))return;a(!0);const V=Y.firestore(),ae=r.season||1;let ce=[V.batch()],ne=0;const P=()=>(ne>=450&&(ce.push(V.batch()),ne=0),ne++,ce[ce.length-1]),k=S=>S.sort((y,ee)=>{var le,ge,ve,fe,Le,_e,Ee,et,tn,nn;const L=((le=y.stats)==null?void 0:le.pts)||0,X=((ge=ee.stats)==null?void 0:ge.pts)||0;if(L!==X)return X-L;const Ae=((ve=y.stats)==null?void 0:ve.wins)||0,v=((fe=ee.stats)==null?void 0:fe.wins)||0;if(Ae!==v)return v-Ae;const $=(((Le=y.stats)==null?void 0:Le.gf)||0)-(((_e=y.stats)==null?void 0:_e.ga)||0),Z=(((Ee=ee.stats)==null?void 0:Ee.gf)||0)-(((et=ee.stats)==null?void 0:et.ga)||0);if($!==Z)return Z-$;const Ce=((tn=y.stats)==null?void 0:tn.cards)||0,se=((nn=ee.stats)==null?void 0:nn.cards)||0;return Ce-se}),C=k(i.filter(S=>S.serie==="A"&&S.status!=="PENDING")),f=k(i.filter(S=>S.serie==="B"&&S.status!=="PENDING")),T=k(i.filter(S=>S.serie==="C"&&S.status!=="PENDING")),m=k(i.filter(S=>S.serie==="D"&&S.status!=="PENDING")),R=k(i.filter(S=>S.serie==="VARZEA"&&S.status!=="PENDING")),w=r.prizes||la,l=(S,y,ee)=>{const L=y+1,X=(S==="A"||S==="B"||S==="C")&&y>=ee-2,Ae=S==="D"&&y>=ee-3,v=w[S]||la[S];return S==="A"?L===1?v.champ:L===2?v.vice:L===3?v.third:X?v.rel:v.mid:S==="B"||S==="C"?L===1?v.champ:L===2?v.vice:X?v.rel:v.mid:S==="D"?L===1?v.champ:L===2?v.vice:Ae?v.rel:v.mid:S==="VARZEA"?L===1?v.champ:L===2?v.vice:L===3?v.third:v.mid:0},p=(S,y)=>{S.forEach((ee,L)=>{const X=l(y,L,S.length);P().update(V.collection("teams").doc(ee.id),{balance:Y.firestore.FieldValue.increment(X)})})};p(C,"A"),p(f,"B"),p(T,"C"),p(m,"D"),p(R,"VARZEA");const A=C[0],b=f[0],x=T[0],D=m[0],O=R[0],N=[...o].sort((S,y)=>(y.stats&&y.stats.goals||0)-(S.stats&&S.stats.goals||0))[0],B=[...o].sort((S,y)=>(y.stats&&y.stats.assists||0)-(S.stats&&S.stats.assists||0))[0],z=[...o].sort((S,y)=>(y.stats&&y.stats.saves||0)-(S.stats&&S.stats.saves||0))[0],re=[...o].filter(S=>S.pressRatingCount>0).sort((S,y)=>(y.pressRatingAvg||0)-(S.pressRatingAvg||0))[0],Q=V.collection("hallOfFame").doc(`season_${ae}`);P().set(Q,{season:ae,date:Date.now(),champA:A?{name:A.name,logo:A.logo}:null,champB:b?{name:b.name,logo:b.logo}:null,champC:x?{name:x.name,logo:x.logo}:null,champD:D?{name:D.name,logo:D.logo}:null,champVarzea:O?{name:O.name,logo:O.logo}:null,topScorer:N&&((G=N.stats)==null?void 0:G.goals)>0?{name:N.name,face:N.face,val:N.stats.goals}:null,topAssist:B&&((j=B.stats)==null?void 0:j.assists)>0?{name:B.name,face:B.face,val:B.stats.assists}:null,topSaves:z&&((K=z.stats)==null?void 0:K.saves)>0?{name:z.name,face:z.face,val:z.stats.saves}:null,topRating:re?{name:re.name,face:re.face,val:re.pressRatingAvg}:null}),(C.length>0||f.length>0)&&(C.slice(-2).forEach(S=>P().update(V.collection("teams").doc(S.id),{serie:"B"})),f.slice(0,2).forEach(S=>P().update(V.collection("teams").doc(S.id),{serie:"A"})),f.slice(-2).forEach(S=>P().update(V.collection("teams").doc(S.id),{serie:"C"})),T.slice(0,2).forEach(S=>P().update(V.collection("teams").doc(S.id),{serie:"B"})),T.slice(-2).forEach(S=>P().update(V.collection("teams").doc(S.id),{serie:"D"})),m.slice(0,2).forEach(S=>P().update(V.collection("teams").doc(S.id),{serie:"C"})),m.slice(-3).forEach(S=>P().update(V.collection("teams").doc(S.id),{serie:"VARZEA"})),R.slice(0,3).forEach(S=>P().update(V.collection("teams").doc(S.id),{serie:"D"}))),i.forEach(S=>{P().update(V.collection("teams").doc(S.id),{stats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0}})}),P().update(V.collection("config").doc("system"),{season:ae+1});const oe=S=>S==="GOL"?["gk","response","jump","longPass","balance","condition"]:S.includes("ZAG")?["defense","header","balance","jump","aggression","stamina"]:S.includes("LAT")||S.includes("LD")||S.includes("LE")?["speed","accel","stamina","shortPass","dribble","defense"]:S.includes("VOL")||S.includes("MC")||S==="MD"||S==="ME"?["shortPass","stamina","teamwork","defense","balance","tech"]:S.includes("MEI")||S.includes("MAT")?["dribble","shortPass","vision","tech","curve","agility"]:S==="PTD"||S==="PTE"?["speed","accel","dribble","agility","curve","stamina"]:S.includes("ATA")||S.includes("SA")||S.includes("PNT")?["shot","attack","header","shotPower","balance","speed"]:["stamina","balance","speed","shortPass","dribble","shot"],ue=S=>S<=50?50:S<=60?80:S<=70?150:S<=80?300:S<=85?600:S<=90?1e3:2e3;o.forEach(S=>{let y={stats:{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0},pressRatingSum:0,pressRatingCount:0,pressRatingAvg:0},ee=(S.xp||0)+(S.pendingXP||0);const L=S.position||"ATA",X=ue(S.overall||50);let Ae=ee>=0,v=Math.abs(ee),$=Math.floor(v/X),Z=Ae?v%X:-(v%X);if(S.attributes&&$!==0){let se={...S.attributes};const le=Object.keys(oa),ge=oe(L);for(let _e=0;_e<$;_e++){let Ee;Math.random()<.75?Ee=ge[Math.floor(Math.random()*ge.length)]:Ee=le[Math.floor(Math.random()*le.length)],L==="GOL"&&["shot","attack","dribble","curve","freeKick","weakFootAcc"].includes(Ee)&&(Ee="gk"),L!=="GOL"&&Ee==="gk"&&(Ee=ge[0]),se[Ee]===void 0&&(se[Ee]=50),Ae?se[Ee]<99&&se[Ee]++:se[Ee]>1&&se[Ee]--}const ve=L==="GOL"?["shot","attack","dribble","curve","freeKick","weakFootAcc","weakFootFreq"]:["gk"];let fe=0,Le=0;Object.entries(se).forEach(([_e,Ee])=>{!ve.includes(_e)&&oa[_e]&&(fe+=Ee,Le++)}),y.attributes=se,y.overall=Le===0?S.overall:Math.round(fe/Le),y.xp=Z,y.pendingXP=0}else y.xp=Z,y.pendingXP=0;if(S.pendingPosBoosts&&S.attributes){let se=y.attributes?{...y.attributes}:{...S.attributes};S.pendingPosBoosts.forEach(Le=>{const _e=ca[Le];_e&&_e.attrs.forEach(Ee=>{se[Ee]<99&&(se[Ee]=Math.min(99,se[Ee]+3))})}),y.attributes=se;const ge=(S.position||"ATA")==="GOL"?["shot","attack","dribble","curve","freeKick","weakFootAcc","weakFootFreq"]:["gk"];let ve=0,fe=0;Object.entries(se).forEach(([Le,_e])=>{ge.includes(Le)||(ve+=_e,fe++)}),y.overall=fe===0?S.overall:Math.round(ve/fe),y.pendingPosBoosts=Y.firestore.FieldValue.delete()}let Ce=(parseInt(S.contract)||0)-1;Ce<0&&(Ce=0),Ce===0?!S.loanMeta||!S.loanMeta.ownerId?(y.contract=0,y.teamId="FREE",y.status="VENDA",y.mood="😐"):(y.teamId=S.loanMeta.ownerId,y.contract=parseInt(S.loanMeta.originalContract)>0?parseInt(S.loanMeta.originalContract):1,y.status="NAO_A_VENDA",y.loanMeta=Y.firestore.FieldValue.delete()):y.contract=Ce,P().update(V.collection("players").doc(S.id),y)}),(await V.collection("users").where("type","in",["COACH","DOCTOR","SCOUT","ASSISTANT"]).get()).docs.forEach(S=>{const y=S.data();if(y.teamId&&y.teamId!=="FREE"){const ee=(y.contract||1)-1;ee<=0?P().update(S.ref,{teamId:"FREE",contract:0,salary:2500}):P().update(S.ref,{contract:ee})}});try{for(let S of ce)await S.commit();a(!1),d(`🏆 **FIM DA TEMPORADA ${ae}!**
As premiações foram depositadas! Parabéns aos campeões:

🥇 Série A: ${(A==null?void 0:A.name)||"Ninguém"}
🥈 Série B: ${(b==null?void 0:b.name)||"Ninguém"}
🥉 Série C: ${(x==null?void 0:x.name)||"Ninguém"}
🏅 Série D: ${(D==null?void 0:D.name)||"Ninguém"}`,"finance"),alert(`Temporada ${ae} encerrada com sucesso!

Premiações pagas, acessos e descensos definidos, atributos evoluídos e Museu atualizado!`)}catch(S){a(!1),alert("Erro na virada: "+S.message)}},saveTactics:async(V,ae)=>{await h.collection("teams").doc(u.data.teamId).update({tactics:{formation:V,lineup:ae}}),alert("Escalação salva na súmula!")},saveMatchStats:async(V,ae,ce,ne=null,P=null)=>{let k=[];if(ae&&ae.goals!==void 0?k=[{player:V,match:ae,xpOverride:ce}]:k=Array.isArray(V)?V:[V],k.length===0)return alert("Nenhum dataPayload para salvar.");a(!0);const C=h.batch();let f=0;const T={GOAL:20,ASSIST:15,TACKLE:10,SAVE:12,WIN:30,DRAW:10,LOSS:-10,YELLOW:-10,RED:-30,RATING_MULT:5};if(k.forEach(l=>{var j,K,S,y,ee,L;const{player:p,match:A,xpOverride:b}=l;if(!p||!A)return;let x=0;b!==void 0?x=b:(x+=(A.goals||0)*T.GOAL,x+=(A.assists||0)*T.ASSIST,x+=(A.tackles||0)*T.TACKLE,x+=(A.saves||0)*T.SAVE,x+=(A.yellows||0)*T.YELLOW,x+=(A.reds||0)*T.RED,A.result==="VITORIA"&&(x+=T.WIN),A.result==="EMPATE"&&(x+=T.DRAW),A.result==="DERROTA"&&(x+=T.LOSS),x+=(parseFloat(A.rating)||0)*T.RATING_MULT);const D=parseInt(x),O=h.collection("players").doc(p.id),N={goals:(((j=p.stats)==null?void 0:j.goals)||0)+(A.goals||0),assists:(((K=p.stats)==null?void 0:K.assists)||0)+(A.assists||0),tackles:(((S=p.stats)==null?void 0:S.tackles)||0)+(A.tackles||0),saves:(((y=p.stats)==null?void 0:y.saves)||0)+(A.saves||0),yellows:(((ee=p.stats)==null?void 0:ee.yellows)||0)+(A.yellows||0),reds:(((L=p.stats)==null?void 0:L.reds)||0)+(A.reds||0)},B=p.pressRatingSum||0,z=p.pressRatingCount||0,re=B+parseFloat(A.rating||0),Q=z+1,oe=re/Q,ue={stats:N,pendingXP:(p.pendingXP||0)+D,pressRatingSum:re,pressRatingCount:Q,pressRatingAvg:parseFloat(oe.toFixed(1)),energy:Math.max(0,(p.energy||100)-25)};A.injury&&(A.recoveryLeft||0)>0&&(ue.injury=A.injury,ue.recoveryLeft=parseInt(A.recoveryLeft),ue.mood="😡");const q=P?P.serie:A.serie;if(q&&!["A","B","C","D","VARZEA"].includes(q)){const X=q,Ae=p.tournaments||{},v=Ae[X]||{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0,ratingSum:0,ratingCount:0};ue.tournaments={...Ae,[X]:{goals:v.goals+(A.goals||0),assists:v.assists+(A.assists||0),tackles:v.tackles+(A.tackles||0),saves:v.saves+(A.saves||0),yellows:v.yellows+(A.yellows||0),reds:v.reds+(A.reds||0),ratingSum:v.ratingSum+(parseFloat(A.rating)||0),ratingCount:v.ratingCount+1}}}C.update(O,ue),f++}),ne&&ne.id&&P&&!P.neutralFinal){const l=ne.stadiumLevel||1,p=St[l]||St[1],A=ne.ticketPrice||p.minTic,b=1-(A-p.minTic)/(p.maxTic-p.minTic||1)*.6,x=(Math.floor(Math.random()*41)+80)/100;let D=Math.floor(p.cap*b*x);D>p.cap&&(D=p.cap);const O=D*A,N=[0,.05,.1,.15,.2,.25][l]||.05;let B=0;const re=[...ne.storeProducts||[]].map(oe=>{let ue=1;oe.price>30&&(ue=Math.max(.05,30/oe.price));const q=Math.floor(D*N*ue),G=Math.min(q,oe.stock);return B+=G*oe.price,{...oe,stock:oe.stock-G}}),Q=h.collection("teams").doc(ne.id);C.update(Q,{balance:Y.firestore.FieldValue.increment(O),storeBalance:Y.firestore.FieldValue.increment(B),storeProducts:re})}const m={};let R=0;k.forEach(l=>{l.player&&l.player.teamId&&l.player.teamId!=="FREE"&&(m[l.player.teamId]=l.match.result,R+=l.match.goals||0)});const w=Object.keys(m)[0];if(Object.keys(m).forEach(l=>{if(m[l]!=="NENHUM"){const p=i.find(A=>A.id===l);if(p){let A={},b=p.recentForm||[];b.unshift(m[l]),b.length>5&&b.pop(),A.recentForm=b;const x=P&&P.isEstadual;if(["A","B","C","D","VARZEA"].includes(p.serie)||x){let N={...x?p.stateStats||{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}:p.stats||{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0}};N.gf+=R,m[l]==="VITORIA"?(N.pts+=3,N.wins+=1):m[l]==="EMPATE"?(N.pts+=1,N.draws+=1):m[l]==="DERROTA"&&(N.losses+=1),x?A.stateStats=N:A.stats=N}C.update(h.collection("teams").doc(l),A)}}}),P&&P.id&&w){let l={};w===P.homeId?l.scoreHome=R:w===P.awayId&&(l.scoreAway=R),l.status="FINISHED",C.update(h.collection("matches").doc(P.id),l)}await C.commit(),a(!1),n(null),alert(`${f} súmula(s) lançada(s) com sucesso!${ne&&!(P!=null&&P.neutralFinal)?`
🏟️ Bilheteria e vendas da Loja contabilizadas!`:""}`)}}}const Ii=[{minOv:0,maxOv:45,minSal:500,maxSal:1500,label:"Várzea/Amador"},{minOv:46,maxOv:55,minSal:1500,maxSal:6e3,label:"Iniciante"},{minOv:56,maxOv:65,minSal:5e3,maxSal:18e3,label:"Profissional"},{minOv:66,maxOv:75,minSal:15e3,maxSal:45e3,label:"Estrela"},{minOv:76,maxOv:85,minSal:4e4,maxSal:11e4,label:"Craque"},{minOv:86,maxOv:99,minSal:1e5,maxSal:3e5,label:"Lenda"}],uu=t=>{const e=parseInt(t)||0;return Ii.find(n=>e>=n.minOv&&e<=n.maxOv)||Ii[0]},hu=(t,e,n)=>{const a=uu(n.overall).minSal,i=parseFloat(t.meta.newSalary)||0,r=e.recentForm||[],o=r.filter(I=>I==="VITORIA").length,u=r.filter(I=>I==="DERROTA").length;let d=1;u>o&&(d=1.2),o>u&&(d=.9);const E=a*d;return i>=E?{decision:"ACCEPT",message:`🤖 O empresário de ${n.name} achou a oferta excelente e aceitou os termos contratuais!`}:i>=E*.8?{decision:"COUNTER",counterValue:E,message:`🤖 O jogador tem interesse no ${e.name}, mas pede um ajuste salarial para ${te(E)}.`}:{decision:"REJECT",message:`🤖 A proposta salarial foi considerada muito baixa pelo staff de ${n.name}. Negociação encerrada.`}},pu={USER:"teams",PLAYER:"players",COACH:"users",DOCTOR:"users",SCOUT:"users",ASSISTANT:"users"},mu=new Set(["VEICULO","IMOVEL","TECNOLOGIA","LUXO"]);async function fu(t,e,{user:n,productId:a,sellerId:i,giftTarget:r,expectedPrice:o,now:u=Date.now()}){var ae;const d=pu[n==null?void 0:n.type];if(!d||!((ae=n.data)!=null&&ae.id))throw new Error("Entre em uma conta para comprar.");const E=t.collection(d).doc(n.data.id),I=t.collection("products").doc(a),g=t.collection("companies").doc(i),_=t.collection("sales").doc(),H=t.collection("news").doc(),J=r?t.collection("players").doc(r.id):E,V=new Date(u).toDateString();return t.runTransaction(async ce=>{const[ne,P,k,C]=await Promise.all([ce.get(E),ce.get(I),ce.get(g),ce.get(J)]);if(![ne,P,k,C].every(O=>O.exists))throw new Error("Conta, produto ou destinatário não encontrado.");const f=ne.data(),T=P.data(),m=k.data(),R=C.data(),w=Number(T.price),l=Number(T.stock),p=Number(f.balance||0);if(!Number.isFinite(w)||w<0||!Number.isFinite(p))throw new Error("Preço ou saldo inválido.");if(w!==Number(o))throw new Error("O preço mudou. Abra o produto novamente antes de comprar.");if(T.companyId!==i||m.status!=="ACTIVE")throw new Error("Esta loja não está disponível.");if(!Number.isFinite(l)||l<1)throw new Error("Produto Esgotado!");if(p<w)throw new Error("Saldo insuficiente!");const A=f.giftTracker||{date:"",count:0},b=A.date===V&&Number(A.count)||0;if(r&&b>=7)throw new Error("Você atingiu o limite máximo de 7 presentes enviados por dia!");const x=mu.has(T.cat)?(parseInt(T.power)||0)*100:0,D={balance:e.increment(-w)};return r&&(D.giftTracker={date:V,count:b+1}),ce.update(E,D),ce.update(g,{balance:e.increment(w)}),ce.update(I,{stock:e.increment(-1)}),r&&x>0&&ce.update(J,{fame:e.increment(x)}),ce.set(_,{companyId:i,buyerId:J.id,buyerName:R.name||"",giftedBy:r?f.name||"":null,productOriginalId:a,productName:T.name||"",price:w,cost:0,profit:w,img:T.img||null,cat:T.cat||"",power:parseInt(T.power)||0,fameGained:x,date:u}),r&&(x>0||w>5e5)&&ce.set(H,{text:`🎁 **MIMO DE LUXO!**
O ${f.name} acabou de enviar um(a) **${T.name}** caríssimo(a) de presente para **${R.name}**! O que será que está por trás dessa generosidade? 👀`,type:"biz",date:u,likes:[]}),{fameBonus:x,balance:p-w,giftTracker:D.giftTracker||f.giftTracker}})}const gu={SAUDE:"💊 Saúde (+Energia)",CONSUMIVEL:"⚡ Consumível (+Energia)",CHUTEIRA:"👟 Chuteira (+XP Treino)",LUVAS:"🧤 Luvas (+XP Treino)",VEICULO:"🚗 Veículo (+Fama)",IMOVEL:"🏠 Imóvel (+Fama)",TECNOLOGIA:"📱 Tecnologia (+Fama)",LUXO:"💎 Luxo/Moda (+Fama)"};function Au(t,e){const{coaches:n,user:a,setModal:i,products:r,sps:o,companies:u,buyingRef:d,setLoading:E,players:I,teams:g}=t,_=(...l)=>e.postNews(...l);return{handleSendCoachOffer:async(l,p,A,b)=>{const x=n.find(D=>D.id===l);x&&(await h.collection("offers").add({type:"COACH_OFFER",coachId:l,staffType:x.type,recipientId:l,senderId:a.data.id,teamId:a.data.id,teamName:a.data.name,coachName:x.name,salary:parseFloat(p),contract:parseInt(A),clause:parseFloat(b),status:"PENDING",createdAt:Date.now()}),i(null),alert(`Proposta enviada para ${x.name}!`))},handleCounterCoachOffer:async(l,p,A,b)=>{if(a.data.level<2)return alert("Apenas profissionais Nível 2+ podem negociar valores!");await h.collection("offers").doc(l.id).update({salary:parseFloat(p),contract:parseInt(A),clause:parseFloat(b),status:"COUNTERED",recipientId:l.teamId,senderId:a.data.id}),alert("Contra-proposta enviada ao clube!")},handleFinalizeCoachContract:async l=>{const p=l.teamId,A=l.coachId||(l.recipientId===p?l.senderId:l.recipientId),b=l.staffType||"COACH",D=(await h.collection("teams").doc(p).get()).data();if(D.balance<l.salary)return alert("O time não tem saldo para pagar as luvas (1º salário)!");const O=h.batch(),N=n.find(z=>z.teamId===p&&z.status==="ACTIVE"&&z.type===b);N&&O.update(h.collection("users").doc(N.id),{teamId:"FREE",contract:0});const B=parseFloat(l.luvas)||0;O.update(h.collection("users").doc(A),{teamId:p,salary:parseFloat(l.salary),contract:parseInt(l.contract),clause:parseFloat(l.clause),balance:Y.firestore.FieldValue.increment(B)}),O.update(h.collection("teams").doc(p),{balance:D.balance-l.salary-B}),O.delete(h.collection("offers").doc(l.id)),await O.commit(),alert(`Contrato assinado! ${l.coachName} agora integra o Staff do ${l.teamName}.`)},saveProduct:async l=>{const p=parseFloat(l.price),A={name:l.name,price:p,img:l.img,desc:l.desc,cat:l.cat||"CHUTEIRA",companyId:a.data.id,power:l.power||0,stock:parseInt(l.stock)||0};if(l.id){const b=r.find(x=>x.id===l.id);b&&p<b.price&&_(`🚨 **PROMOÇÃO!**
A **${a.data.name}** baixou o preço de **${l.name}**!
De: ${te(b.price)} ➝ Por: ${te(p)}`,"biz"),delete A.companyId,await h.collection("products").doc(l.id).update(A)}else await h.collection("products").add(A),_(`🛍️ **NOVIDADE**
A **${a.data.name}** lançou: **${l.name}** (${gu[A.cat]}) por ${te(p)}.`,"biz")},requestSponsorship:async(l,p)=>{if(o.find(b=>b.companyId===l&&b.teamId===a.data.id))return alert("Já existe uma negociação ou contrato ativo com esta empresa.");const A=u.find(b=>b.id===l);await h.collection("sponsorships").add({companyId:l,companyName:A.name,teamId:a.data.id,teamName:a.data.name,value:parseFloat(p),status:"PENDING"}),alert("Proposta enviada para a empresa!")},processSponsorship:async(l,p)=>{p==="REJECTED"||p==="CANCELLED"?confirm(p==="REJECTED"?"Recusar proposta?":"Cancelar contrato?")&&await h.collection("sponsorships").doc(l.id).delete():p==="ACTIVE"&&(await h.collection("sponsorships").doc(l.id).update({status:"ACTIVE"}),_(`🤝 **NOVO PATROCÍNIO**
A **${a.data.name}** agora patrocina o **${l.teamName}**!`,"biz"))},buyProduct:async(l,p,A=null)=>{if(d.current)return;const b=Number(l.price);if(!Number.isFinite(b)||b<0)return alert("Preço inválido.");if(confirm(A?`Comprar ${l.name} como PRESENTE para ${A.name} por ${te(b)}?`:`Comprar ${l.name} por ${te(b)}?`)){d.current=!0,E(!0);try{const x=await fu(h,Y.firestore.FieldValue,{user:a,productId:l.id,sellerId:p.id,giftTarget:A,expectedPrice:b});let D=A?`✅ Presente enviado com sucesso para ${A.name}!`:"✅ Compra realizada com sucesso!";!A&&x.fameBonus>0&&(D+=`
🌟 FAMA +${x.fameBonus}`),alert(D)}catch(x){alert("Erro ao processar compra: "+x.message)}finally{d.current=!1,E(!1)}}},handleAcceptCoachOffer:async l=>{const p=l.teamId,A=a.data,x=(await h.collection("teams").doc(p).get()).data();if(x.balance<l.value)return alert("O time não tem mais saldo para te contratar! Proposta cancelada.");const D=h.batch(),O=n.find(N=>N.teamId===p&&N.status==="ACTIVE");O&&D.update(h.collection("users").doc(O.id),{teamId:"FREE"}),A.teamId&&A.teamId,D.update(h.collection("users").doc(A.id),{teamId:p,salary:l.value}),D.update(h.collection("teams").doc(p),{balance:x.balance-l.value}),D.delete(h.collection("offers").doc(l.id)),await D.commit(),alert(`Parabéns! Você agora é técnico do ${l.teamName}!`)},handleRejectCoachOffer:async l=>{await h.collection("offers").doc(l.id).delete(),alert("Proposta recusada.")},sendOffer:async(l,p,A,b,x,D,O)=>{const N=parseFloat(A)||0,B=parseInt(x)||1,z=a.data.name,re=l.name,Q=parseFloat(D.newSalary)||0,oe=D.role||"ROTACAO";if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(l.type))try{E(!0);const j=parseFloat(D.signingBonus)||0,K=Y.firestore();return O&&O.id?await K.collection("offers").doc(O.id).update({salary:Q,contract:B,luvas:j,status:"PENDING",recipientId:l.id,senderId:a.data.id}):await K.collection("offers").add({type:"COACH_OFFER",coachId:l.id,staffType:l.type,recipientId:l.id,senderId:a.data.id,teamId:a.data.id,teamName:z,coachName:l.name,salary:Q,contract:B,clause:Q*10,luvas:j,status:"PENDING",createdAt:Date.now()}),E(!1),i(null),alert(`📋 Proposta formal enviada para ${l.name}! Aguarde a resposta na sua Caixa de Entrada.`)}catch{return E(!1),alert("Erro ao enviar proposta para a Comissão Técnica.")}if(l.isNPC&&a.type==="USER"){const j=I.filter(K=>K.teamId===a.data.id&&K.isNPC).length;if(j>=7&&l.teamId!==a.data.id){alert(`🚫 LIMITE DA BASE ATINGIDO!
Você já tem 7/7 BOTS no elenco. Você só poderá contratar outro quando 1 deles sair do elenco.`);return}if(l.teamId!==a.data.id&&!confirm(`⚠️ AVISO DA BASE

Atualmente você tem ${j}/7 BOTS no elenco.
Tem certeza que quer enviar esta proposta para ${l.name}?

Assim que você completar 7 de 7, você só poderá contratar outro quando 1 deles sair do elenco.`))return}let q;const G=l.teamId==="FREE"||!l.teamId;if(O&&O.id?O.type==="RENOVACAO_URGENTE"?q=O.playerId:O.sellerAccepted===!0?q=a.data.id===O.buyerId?O.playerId:O.buyerId:q=a.data.id===O.buyerId?O.sellerId==="FREE"||!O.sellerId?O.playerId:O.sellerId:O.buyerId:p==="PRE_CONTRATO"||p==="RENOVACAO"?q=l.id:q=G?l.id:l.teamId,l.isNPC&&a.type==="USER"&&q===l.id){const j=g.find(S=>S.id===a.data.id),K=hu({meta:{newSalary:Q}},j,l);if(K.decision==="REJECT"){alert(K.message);return}else if(K.decision==="COUNTER")if(confirm(`${K.message}

Você aceita pagar ${te(K.counterValue)} de salário para fechar negócio AGORA?`))D.newSalary=K.counterValue;else{alert("Negociação cancelada. O jogador encerrou as conversas.");return}else K.decision==="ACCEPT"&&alert(K.message);try{E(!0);const S=Y.firestore(),y=S.batch(),ee=parseFloat(D.signingBonus)||0;return j.balance<ee?(E(!1),alert(`Seu clube não tem ${te(ee)} no caixa para pagar as Luvas de Assinatura. O negócio melou!`)):(ee>0&&y.update(S.collection("teams").doc(a.data.id),{balance:Y.firestore.FieldValue.increment(-ee)}),y.update(S.collection("players").doc(l.id),{teamId:a.data.id,status:"NAO_A_VENDA",contract:B,salary:parseFloat(D.newSalary),role:oe,balance:Y.firestore.FieldValue.increment(ee),history:Y.firestore.FieldValue.arrayUnion({date:Date.now(),from:G?"AGENTE LIVRE":"Clube Anterior",to:a.data.name,type:p,value:0})}),O&&O.id&&y.delete(S.collection("offers").doc(O.id)),await y.commit(),_(`🤝 **NOVA CONTRATAÇÃO!**
O Atleta da Base **${l.name}** aceitou os termos e assinou com o **${a.data.name}**!`,"transfer"),E(!1),i(null),alert(`Negócio fechado! ${l.name} já está no seu elenco.`))}catch(S){return E(!1),alert("Erro ao assinar com o Bot: "+S.message)}}try{let j=`💰 Taxa: ${te(N)}
`;D.installments>1&&(j+=`📅 Parcelamento: ${D.installments}x de ${te(N/D.installments)}
`),D.sellOn>0&&(j+=`📈 Revenda: ${D.sellOn}%
`),p==="PRE_CONTRATO"?j=`⚖️ **LEI BOSMAN (PRÉ-CONTRATO)**
O jogador virá a custo zero no início da próxima temporada.
`:p==="RENOVACAO"&&(j=`📝 **PROPOSTA DE RENOVAÇÃO**
A diretoria ofereceu um novo contrato.
`),j+=`📝 Contrato: ${B} anos
`,j+=`💵 Salário Sugerido: ${te(Q)}/sem
`,j+=`👔 Papel: ${oe}`;const K={playerId:l.id,playerName:re,buyerId:(O==null?void 0:O.buyerId)||a.data.id,buyerName:(O==null?void 0:O.buyerName)||z,sellerId:l.teamId||(O==null?void 0:O.sellerId)||"FREE",recipientId:q,type:(O==null?void 0:O.type)==="RENOVACAO_URGENTE"?"RENOVACAO":p,value:N,offerContract:B,description:j,status:"PENDING",sellerAccepted:O&&O.sellerAccepted||!1,meta:{...D,newSalary:Q,signingBonus:parseFloat(D.signingBonus)||0,role:oe,installments:parseInt(D.installments)||1,sellOn:parseInt(D.sellOn)||0,hasBuyOption:D.hasBuyOption||!1},date:Date.now()},S=h.batch();O&&O.id&&S.delete(h.collection("offers").doc(O.id)),S.set(h.collection("offers").doc(),K),await S.commit();const y=O&&O.id?"🔄 CONTRAPROPOSTA":p==="PRE_CONTRATO"?"⚖️ PRÉ-CONTRATO":p==="RENOVACAO"?"📝 RENOVAÇÃO":"💼 NOVA OFERTA";_(`${y}
**${z}** enviou uma proposta para **${re}**!

${j}`,"transfer"),i(null),alert("Enviado com sucesso! Aguarde a resposta.")}catch(j){console.error("Erro no Firebase:",j),alert("Erro técnico ao gravar no banco de dados.")}},acceptOffer:async l=>{var p,A,b,x,D;try{if(l.type==="NOTIFICACAO"){await h.collection("offers").doc(l.id).delete(),alert("Confirmado!");return}if(l.type==="PERSONAL_SPONSOR_OFFER"){if(!confirm(`Aceitar o patrocínio da ${l.companyName} por ${te(l.value)} semanais?
Seu rosto aparecerá na loja deles!`))return;const q=h.batch();q.update(h.collection("players").doc(l.recipientId),{personalSponsor:{companyId:l.senderId,companyName:l.companyName,value:l.value,clause:l.value*4}}),q.delete(h.collection("offers").doc(l.id)),await q.commit(),_(`📸 **NOVA ESTRELA!**
**${l.playerName}** é o mais novo garoto propaganda da marca **${l.companyName}**!`,"biz"),alert("Contrato assinado! Verifique seu Perfil.");return}if(l.type==="PRE_CONTRATO"){if(!confirm(`Confirmar assinatura de Pré-Contrato com ${l.buyerName}?
Você se juntará a eles na próxima temporada.`))return;const q=h.batch();q.update(h.collection("players").doc(l.playerId),{preContract:{teamId:l.buyerId,teamName:l.buyerName,salary:l.meta.newSalary,date:Date.now()},mood:"🤩"}),q.delete(h.collection("offers").doc(l.id)),await q.commit(),_(`📝 **PRÉ-CONTRATO ASSINADO**
**${l.playerName}** assinou com o **${l.buyerName}** e se apresentará na próxima temporada!`,"transfer"),alert("Pré-contrato assinado com sucesso!");return}const O=g.find(q=>q.id===l.buyerId),N=I.find(q=>q.id===l.playerId),B=!l.sellerId||l.sellerId==="FREE",z=B?null:g.find(q=>q.id===l.sellerId);if(l.type==="COMPRA_DEFINITIVA"){if(!O||!N)return alert("Erro: Dados incompletos.");if(O.balance<l.value)return alert(`Saldo insuficiente! Necessário: ${te(l.value)}`);if(!confirm(`Exercer opção de compra de ${N.name} por ${te(l.value)}?`))return;const q=h.batch();q.update(h.collection("teams").doc(O.id),{balance:O.balance-l.value}),z&&q.update(h.collection("teams").doc(z.id),{balance:z.balance+l.value}),q.update(h.collection("players").doc(N.id),{teamId:O.id,loanMeta:Y.firestore.FieldValue.delete(),status:"NAO_A_VENDA",contract:3,history:Y.firestore.FieldValue.arrayUnion({date:Date.now(),from:z?z.name:"EMPRÉSTIMO",to:O.name,type:"COMPRA_DEFINITIVA",value:l.value})}),q.delete(h.collection("offers").doc(l.id)),await q.commit(),_(`✅ **OPÇÃO EXERCIDA**
O **${O.name}** contratou **${N.name}** em definitivo!`,"transfer"),alert("Compra realizada!");return}const re=a.type==="USER"&&a.data.id===l.buyerId,Q=a.type==="USER"&&a.data.id===l.sellerId,oe=a.type==="PLAYER"||B&&!re;if(!B&&!l.sellerAccepted&&(Q||re)){if(re){if(!confirm(`Aceitar a pedida do clube vendedor (${te(l.value)}) e negociar com o jogador?`))return}else if(!confirm("Aceitar os valores propostos? O jogador decidirá o contrato agora."))return;await h.collection("offers").doc(l.id).update({recipientId:l.playerId,sellerAccepted:!0,status:"PENDING"}),_(`💰 **ACORDO ENTRE CLUBES**
${O.name} e ${z.name} chegaram a um acordo por **${N.name}**. Falta o "Sim" do atleta!`,"transfer"),alert("Acordo financeiro selado! A proposta foi enviada para o jogador.");return}if((B||l.sellerAccepted)&&(oe||re)){if(!O||!N)return alert("Erro: Dados incompletos.");const q=((p=l.meta)==null?void 0:p.installments)>1?l.value/l.meta.installments:l.value,G=parseFloat((A=l.meta)==null?void 0:A.signingBonus)||0,j=q+G;if(O.balance<j)return alert(`Saldo insuficiente no caixa do comprador!
Necessário: ${te(j)}`);if(re){if(!confirm(`Aceitar a pedida salarial do jogador e fechar a contratação?
Custo Imediato: ${te(j)}`))return}else if(!confirm(`Deseja assinar com o ${O.name}?`))return;const K=h.batch();if(z){let ee=q;if(N.sellOnClause&&N.sellOnClause.percentage>0){const L=N.sellOnClause.beneficiaryId;if(L&&L!==O.id){const X=q*N.sellOnClause.percentage/100;ee-=X,K.update(h.collection("teams").doc(L),{balance:Y.firestore.FieldValue.increment(X)})}}if(K.update(h.collection("teams").doc(z.id),{balance:z.balance+ee}),((b=l.meta)==null?void 0:b.installments)>1){const L=h.collection("debts").doc();K.set(L,{buyerId:O.id,buyerName:O.name,sellerId:z.id,sellerName:z.name,playerName:N.name,installmentVal:q,weeksRemaining:parseInt(l.meta.installments)-1,date:Date.now()})}}K.update(h.collection("teams").doc(O.id),{balance:O.balance-j}),G>0&&K.update(h.collection("players").doc(N.id),{balance:Y.firestore.FieldValue.increment(G)});const S=l.meta&&l.meta.sellOn>0&&z?{beneficiaryId:z.id,percentage:l.meta.sellOn}:Y.firestore.FieldValue.delete();K.update(h.collection("players").doc(N.id),{teamId:O.id,status:"NAO_A_VENDA",contract:l.type==="EMPRESTIMO"?parseInt(l.meta.loanDuration)||1:parseInt(l.offerContract)||1,salary:parseFloat((x=l.meta)==null?void 0:x.newSalary)||N.salary,role:((D=l.meta)==null?void 0:D.role)||"ROTACAO",loanMeta:l.type==="EMPRESTIMO"?{ownerId:z==null?void 0:z.id,salarySplit:l.meta.salarySplit||100,hasBuyOption:l.meta.hasBuyOption||!1,buyOpt:l.meta.buyOpt||0,originalContract:N.contract}:null,sellOnClause:S,history:Y.firestore.FieldValue.arrayUnion({date:Date.now(),from:B?"AGENTE LIVRE":z?z.name:"Desconhecido",to:O.name,type:l.type,value:l.value})}),K.delete(h.collection("offers").doc(l.id)),await K.commit();const y=B?`✍️ **ASSINOU!**
O Agente Livre **${N.name}** é o novo reforço do **${O.name}**!`:`🤝 **TRANSFERÊNCIA CONCLUÍDA**
**${N.name}** assinou com o **${O.name}**!`;_(y,"transfer"),z&&N.sellOnClause&&N.sellOnClause.percentage>0&&_(`💸 **CLÁUSULA DE REVENDA**
Uma parte da venda de **${N.name}** (${N.sellOnClause.percentage}%) foi repassada ao seu antigo clube formador.`,"money"),alert("Negócio fechado com sucesso!")}}catch(O){console.error(O),alert("Erro ao processar o aceite: "+O.message)}},rejectOffer:async l=>{try{if(l.type==="COMPRA_DEFINITIVA"&&l.isLoanOption){const p=I.find(B=>B.id===l.playerId),A=l.sellerId,b=g.find(B=>B.id===A);if(!confirm("Deseja recusar a compra? O jogador retornará ao clube de origem."))return;const x=h.batch(),D=h.collection("players").doc(p.id);let O=0;p.loanMeta&&p.loanMeta.originalContract?O=parseInt(p.loanMeta.originalContract):(console.warn("Contrato original não encontrado. Usando fallback de 6 anos."),O=6);let N=O-1;if(N<0&&(N=0),N<=0){const B=h.collection("offers").doc();x.set(B,{type:"RENOVACAO_URGENTE",playerId:p.id,playerName:p.name,buyerId:A,buyerName:(b==null?void 0:b.name)||"Clube de Origem",sellerId:"SISTEMA",recipientId:A,status:"PENDING",description:`⚠️ **URGENTE: FIM DE CONTRATO**
O empréstimo de **${p.name}** acabou e o contrato dele com você expirou.

Renove ou libere para os passes livres.`,date:Date.now()}),x.update(D,{teamId:A,loanMeta:Y.firestore.FieldValue.delete(),status:"INTRANSFERIVEL",contract:0}),_(`🔙 **RETORNO CRÍTICO**
O empréstimo de ${p.name} acabou e o contrato expirou!`,"rumor")}else{const B=h.collection("offers").doc();x.set(B,{type:"NOTIFICACAO",playerId:p.id,playerName:p.name,buyerName:"Sistema",recipientId:A,status:"PENDING",description:`🔙 **RETORNO DE EMPRÉSTIMO**
A opção de compra foi recusada.
**${p.name}** voltou ao seu elenco.

📄 Contrato Restante: ${N} temporada(s).`,date:Date.now()}),x.update(D,{teamId:A,loanMeta:Y.firestore.FieldValue.delete(),status:"NAO_A_VENDA",contract:N}),_(`🔙 **RETORNO**
${p.name} retornou ao ${b==null?void 0:b.name} (${N} anos rest.).`,"transfer")}x.delete(h.collection("offers").doc(l.id)),await x.commit(),alert("Opção recusada. Jogador devolvido ao clube de origem.");return}if(l.type==="RENOVACAO_URGENTE"){if(!confirm("Tem certeza? O jogador perderá o vínculo com o clube e irá para os Agentes Livres."))return;const p=h.batch();p.update(h.collection("players").doc(l.playerId),{teamId:"FREE",status:"VENDA",mood:"😐",contract:0}),p.delete(h.collection("offers").doc(l.id)),await p.commit(),_(`🆓 **AGENTE LIVRE**
O vínculo de **${l.playerName}** expirou e ele está livre no mercado!`,"transfer"),alert("Jogador enviado para os Agentes Livres.");return}if(!confirm("Deseja recusar e encerrar esta negociação?"))return;await h.collection("offers").doc(l.id).delete(),l.type!=="NOTIFICACAO"&&_(`❌ **NEGOCIAÇÃO ENCERRADA**
O acordo por **${l.playerName}** não avançou.`,"transfer")}catch(p){console.error(p),alert("Erro técnico ao processar a recusa.")}},renewContract:async l=>{if(!l.teamId||l.teamId==="FREE")return alert("Jogadores livres assinam novos contratos, não renovam!");const p=(parseFloat(l.value)||1e6)*.1;if(a.data.balance<p)return alert(`Saldo insuficiente para bônus de renovação (Custo: ${te(p)})`);if(confirm(`Renovar com ${l.name}?
Custo: ${te(p)} (Este valor irá para o saldo do jogador)`))try{const A=h.batch();A.update(h.collection("teams").doc(a.data.id),{balance:Y.firestore.FieldValue.increment(-p)}),A.update(h.collection("players").doc(l.id),{contract:(parseInt(l.contract)||0)+1,balance:Y.firestore.FieldValue.increment(p),status:"NAO_A_VENDA"}),await A.commit(),_(`📝 **RENOVAÇÃO**
O **${a.data.name}** renovou com **${l.name}**!`,"transfer"),i(null)}catch(A){alert("Erro ao renovar: "+A.message)}},handlePlayerActions:async(l,p)=>{const A=g.find(b=>b.id===p.teamId);if(l==="TRANSFER_REQUEST"){if(!A)return alert("Já és um Agente Livre!");if(p.status==="VENDA")return alert("Já estás na lista de transferências.");if(!confirm(`Tens a certeza que queres pedir para sair do ${A.name}? O adepto não vai gostar...`))return;await h.collection("players").doc(p.id).update({status:"VENDA",mood:"😡"}),_(`💣 **CRISE NO ${A.name.toUpperCase()}!**
O jogador **${p.name}** está insatisfeito e pediu para ser colocado na lista de transferências!`,"rumor"),alert("O pedido foi feito. O teu humor piorou.")}if(l==="ASK_RAISE"){if(!A)return alert("Precisas de um clube para pedir aumento.");if(!confirm("Ir à imprensa pedir um aumento salarial?"))return;_(`💰 **POLÉMICA**
**${p.name}** declara publicamente: "Mereço ganhar mais no ${A.name}. Espero uma renovação em breve."`,"press"),alert("Declaração feita à imprensa! O presidente foi notificado.")}if(l==="DECLARE_HAPPY"){if(!A)return alert("Precisas de um clube.");if(p.mood==="🤩")return alert("Já estás feliz!");await h.collection("players").doc(p.id).update({mood:"🤩",status:"NAO_A_VENDA"}),_(`💙 **AMOR À CAMISA**
**${p.name}** declarou: "Estou muito feliz no ${A.name} e quero fazer história aqui!"`,"press"),alert("Declaração feita! A torcida adorou.")}if(l==="RESET_MOOD"){if(!A)return alert("Precisas de um clube.");await h.collection("players").doc(p.id).update({mood:"😐",status:"NAO_A_VENDA"}),_(`🤝 **PAZES FEITAS**
**${p.name}** retirou seu pedido de transferência e foca novamente no ${A.name}.`,"press"),alert("Voltaste ao normal. Clima apaziguado.")}}}}function In(t){return Array.isArray(t)?t.map(In):t&&typeof t=="object"?Object.fromEntries(Object.keys(t).sort().map(e=>[e,In(t[e])])):t}function Wt(t,e){const n=[],a={update(i,r){return n.push(["update",i,r]),a},set(i,r,o){return n.push(["set",i,r,o]),a},delete(i){return n.push(["delete",i]),a},commit(){return t.runTransaction(async i=>{const r=await Promise.all(e.map(o=>i.get(o.ref)));e.forEach((o,u)=>{const d=r[u];if(!d.exists)throw new Error("Este registro já foi alterado ou removido. Atualize e tente novamente.");const E=d.data();for(const[I,g]of Object.entries(o.expected||{}))if(JSON.stringify(In(E[I]))!==JSON.stringify(In(g)))throw new Error("Os dados mudaram durante a operação. Confira os valores e tente novamente.")});for(const[o,u,d,E]of n)o==="delete"?i.delete(u):o==="set"&&E?i.set(u,d,E):i[o](u,d)})}};return a}function Eu(t,e,n,a){return Wt(t,[{ref:e,expected:n}]).update(e,a).commit()}const on={LEVE:["Fadiga Muscular","Entorse de Tornozelo G1","Contusão na Canela","Corte no Supercílio","Bolhas no Pé","Luxação de Dedo","Pancada no Quadril","Torcicolo","Edema Leve","Câimbras Fortes","Desgaste Físico","Pequena Contusão Lombar","Arranhão na Córnea","Inflamação no Tendão","Pancada no Nariz"],MODERADA:["Estiramento na Coxa G1","Lesão no Adutor","Concussão Leve","Entorse de Tornozelo G2","Tendinite Aquileia","Contusão Óssea","Fibrose Muscular","Fissura no Metatarso","Estiramento na Panturrilha","Lesão no Ligamento Colateral","Sinovite no Joelho","Bursite no Quadril","Contusão Traumática","Luxação de Ombro Parcial","Hérnia Inguinal Inicial"],GRAVE:["Estiramento G2","Ruptura Parcial de Menisco","Pubalgia Crônica","Fratura de Nariz","Lesão de Cartilagem","Entorse de Joelho com Edema","Fratura de Costela","Ruptura Parcial de Tendão","Descolamento Muscular","Lesão Traumática Cervical","Fratura de Malar","Lesão Complexa no Psoas","Entorse de Tornozelo G3","Ruptura de Fibras Grau 3","Edema Ósseo Profundo"],EXTREMA:["Ruptura de LCA (Cruzado)","Ruptura do Tendão de Aquiles","Fratura de Tíbia e Fíbula","Ruptura Total de Isquiotibiais","Hérnia de Disco","Fratura por Estresse","Ruptura de Ligamento Cruzado Posterior","Fratura de Tornozelo","Luxação de Patela Grave","Ruptura Total de Adutor","Lesão Nervosa","Síndrome Compartimental","Fratura de Vértebra","Ruptura de Tendão Patelar","Pneumotórax Traumático"]},yu={1:{name:"Campo de Terra",bonusXP:0,healChance:0,upgCost:5e6,maint:5e3,prompt:"campo de futebol de terra batida amador --ar 16:9"},2:{name:"CT Básico",bonusXP:10,healChance:5,upgCost:15e6,maint:2e4,prompt:"centro de treinamento de futebol simples, campo gramado --ar 16:9"},3:{name:"CT Profissional",bonusXP:25,healChance:10,upgCost:35e6,maint:5e4,prompt:"centro de treinamento de futebol profissional, boa estrutura --ar 16:9"},4:{name:"CT Avançado",bonusXP:40,healChance:20,upgCost:8e7,maint:1e5,prompt:"centro de treinamento moderno com academia visível ao fundo --ar 16:9"},5:{name:"Academia de Elite",bonusXP:60,healChance:30,upgCost:0,maint:2e5,prompt:"melhor centro de treinamento do mundo, piscinas de gelo, tecnologia --ar 16:9"}};function vu(t,e){const{user:n,teams:a,setLoading:i,setSales:r,setUser:o,setModal:u,players:d}=t;return{handleFireCoach:async C=>{const f=n.data,m=(parseFloat(C.salary)||2500)*4;if(confirm(`Demitir ${C.name}?
Você terá que pagar uma multa rescisória de ${te(m)}.`)){const R=parseFloat(f.balance)||0;if(R<m)return alert("Saldo insuficiente para pagar a rescisão!");const w=h.batch();w.update(h.collection("teams").doc(f.id),{balance:R-m}),w.update(h.collection("users").doc(C.id),{teamId:"FREE",contract:0,salary:2500,balance:Y.firestore.FieldValue.increment(m)}),await w.commit(),alert(`${C.name} foi demitido e a multa de ${te(m)} foi paga.`)}},handleCoachSelfActions:async(C,f)=>{const T=a.find(m=>m.id===f.teamId);if(T){if(C==="RAISE"){const m=prompt("Qual o novo salário semanal desejado?",f.salary);if(!m)return;const R=parseFloat(m);if(R<=f.salary)return alert("O valor deve ser maior que o atual.");await h.collection("offers").add({type:"COACH_RAISE",recipientId:T.id,senderId:f.id,teamName:T.name,coachName:f.name,currentSalary:f.salary,requestedSalary:R,status:"PENDING",description:`💰 **PEDIDO DE AUMENTO**
O técnico **${f.name}** pede um reajuste salarial.
Atual: ${te(f.salary)} ➝ Pedido: ${te(R)}`,date:Date.now()}),alert("Pedido de aumento enviado à diretoria!")}if(C==="RESIGN_REQ"){if(!confirm("Enviar pedido de demissão amigável? O clube pode recusar."))return;await h.collection("offers").add({type:"COACH_RESIGN",recipientId:T.id,senderId:f.id,teamName:T.name,coachName:f.name,status:"PENDING",description:`👋 **PEDIDO DE DESLIGAMENTO**
O técnico **${f.name}** deseja rescindir o contrato amigavelmente (sem multa).`,date:Date.now()}),alert("Pedido de desligamento enviado!")}if(C==="BUYOUT"){const m=f.clause||f.salary*10;if(f.balance<m)return alert(`Saldo insuficiente! Você precisa de ${te(m)}.`);if(!confirm(`TEM CERTEZA? Você pagará ${te(m)} do seu bolso para ficar livre agora.`))return;const R=h.batch(),w=parseFloat(f.balance)||0,l=parseFloat(T.balance)||0;R.update(h.collection("users").doc(f.id),{balance:w-m,teamId:"FREE",contract:0,salary:2500}),R.update(h.collection("teams").doc(T.id),{balance:l+m}),await R.commit(),alert("Multa paga! Você está livre no mercado."),window.location.reload()}}},handleCoachIndication:async(C,f)=>{await h.collection("offers").add({type:"COACH_SUGGESTION",teamId:n.data.teamId,recipientId:n.data.teamId,senderId:n.data.id,senderName:n.data.name,playerId:C.id,playerName:C.name,playerPos:C.position,playerOv:C.overall,playerVal:C.value,status:"PENDING",description:`💡 **INDICAÇÃO DO TÉCNICO**
${n.data.name} sugere a contratação de **${C.name}** (${C.position}).

📝 Obs: "${f||"Sem observações"}"`,date:Date.now()}),alert("Indicação enviada para a diretoria!")},handleCoachUseItem:async C=>{if(!n.data||!["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(n.type))return;const f=new Date().toDateString(),m=(n.data.lastToxicityDate||"")===f&&n.data.toxicity||0,R=n.data.energy!==void 0?n.data.energy:100;if(R>=100)return alert("Sua energia já está cheia! Guarde o item para depois.");i(!0);try{const w=Wt(h,[{ref:h.collection("sales").doc(C.id),expected:{buyerId:n.data.id}},{ref:h.collection("users").doc(n.data.id),expected:{energy:n.data.energy,toxicity:n.data.toxicity,fame:n.data.fame,equippedItem:n.data.equippedItem}}]),l=h.collection("users").doc(n.data.id),p=h.collection("sales").doc(C.id);let A="SUCCESS";if(m===2?Math.random()<.4&&(A="SICK"):m>=3&&Math.random()<.95&&(A="VOMIT"),A==="VOMIT"||A==="SICK")w.update(l,{energy:0,toxicity:m+1,lastToxicityDate:f}),w.delete(p),await w.commit(),r(b=>b.filter(x=>x.id!==C.id)),o(b=>({...b,data:{...b.data,energy:0,toxicity:m+1}})),alert(A==="VOMIT"?`🤮 VÔMITO! Você comeu demais e seu estômago rejeitou tudo.
Resultado: Energia ZERADA.`:`🤢 ENJOO FORTE! O item não caiu bem.
Resultado: Você precisou deitar e sua energia zerou.`);else{const b=parseInt(C.power)||0,x=Math.min(100,R+b);w.update(l,{energy:x,toxicity:m+1,lastToxicityDate:f}),w.delete(p),await w.commit(),r(D=>D.filter(O=>O.id!==C.id)),o(D=>({...D,data:{...D.data,energy:x,toxicity:m+1}})),m===1?alert(`⚡ Energia recuperada: +${b}% (Total: ${x}%)
⚠️ CUIDADO: Foi seu 2º item hoje. O próximo tem risco de intoxicação.`):m>=2?alert(`⚡ Energia recuperada: +${b}%
⛔ PERIGO: Seu estômago está no limite! Pare de consumir agora!`):alert(`⚡ Energia recuperada: +${b}% (Total: ${x}%)`)}}catch(w){console.error(w),alert("Erro ao usar item: "+w.message)}i(!1)},handleUseItem:async(C,f)=>{var T;if(!(!n.data||n.type!=="PLAYER")){i(!0);try{const m=Wt(h,[{ref:h.collection("sales").doc(C.id),expected:{buyerId:n.data.id}},{ref:h.collection("players").doc(n.data.id),expected:{energy:n.data.energy,toxicity:n.data.toxicity,fame:n.data.fame,equippedItem:n.data.equippedItem}}]),R=h.collection("sales").doc(C.id),w=h.collection("players").doc(n.data.id);if(f==="CONSUME"){const l=new Date().toDateString(),A=(n.data.lastToxicityDate||"")===l&&n.data.toxicity||0;if(((T=n.data.injury)==null?void 0:T.type)==="INTOXICACAO"){alert(`🤢 VOCÊ ESTÁ INTOXICADO!
Seu estômago não aceita nada. Espere o dia virar para melhorar.`),i(!1);return}let b="SUCCESS";if(A===2?Math.random()<.4&&(b="SICK"):A>=3&&Math.random()<.95&&(b="VOMIT"),b==="VOMIT"){m.update(w,{energy:0,mood:"😡",toxicity:A+1,lastToxicityDate:l}),m.delete(R),await m.commit(),r(N=>N.filter(B=>B.id!==C.id)),o(N=>({...N,data:{...N.data,energy:0,mood:"😡",toxicity:A+1}})),alert(`🤮 VÔMITO!

Você consumiu demais! Seu corpo rejeitou tudo.

Efeito: Energia ZERADA e Humor piorado.`),i(!1);return}if(b==="SICK"){const N={type:"INTOXICACAO",label:"Intoxicação Alimentar",games:1,isIncurable:!0};m.update(w,{injury:N,recoveryLeft:1,toxicity:A+1,lastToxicityDate:l}),m.delete(R),await m.commit(),r(B=>B.filter(z=>z.id!==C.id)),o(B=>({...B,data:{...B.data,injury:N,toxicity:A+1}})),alert(`🤢 INTOXICAÇÃO ALIMENTAR!

Seu estômago não aguentou.

Efeito: Você foi internado e terá que esperar melhorar naturalmente (1 dia).`),i(!1);return}const x=parseInt(C.power)||0,D=n.data.energy||0;if(x>0&&D>=100){alert("Sua energia já está cheia!"),i(!1);return}const O=Math.min(100,D+x);m.update(w,{energy:O,toxicity:A+1,lastToxicityDate:l}),m.delete(R),await m.commit(),r(N=>N.filter(B=>B.id!==C.id)),o(N=>({...N,data:{...N.data,energy:O,toxicity:A+1}})),A===1?alert(`⚡ Energia recuperada: +${x}%
⚠️ CUIDADO: Foi seu 2º energético hoje. O próximo tem risco de intoxicação.`):A>=2?alert(`⚡ Energia recuperada...
⛔ PERIGO: Seu estômago está no limite! Pare de consumir agora!`):alert(`⚡ Energia recuperada: +${x}% (Total: ${O}%)`)}f==="EQUIP"&&(m.update(w,{equippedItem:{id:C.id,name:C.productName,cat:C.cat,power:parseInt(C.power)||0,img:C.img}}),m.delete(R),await m.commit(),r(l=>l.filter(p=>p.id!==C.id)),alert(`🛡️ Item equipado: ${C.productName}
Ele será consumido automaticamente no próximo treino.`))}catch(m){console.error("Erro ao usar item:",m),alert("Erro ao processar item. Tente novamente.")}finally{i(!1)}}},savePlayer:async C=>{try{const f={...C};C.id?await h.collection("players").doc(C.id).update(f):(f.attributes||(f.attributes=vn(f.position||"ATA",f.overall||60)),await h.collection("players").add(f)),u(null)}catch(f){console.error(f),alert("Erro ao salvar jogador: "+f.message)}},handleUpdateCoachSalary:async C=>{if(n.data.level<2)return alert("Nível insuficiente!");if(C<1e3)return alert("Salário mínimo é 1.000!");await h.collection("users").doc(n.data.id).update({salary:parseInt(C)}),alert("Valor de mercado atualizado!")},handleAssistantRegen:async C=>{const f=n.data,T=f.perks||[],m=T.some(z=>z.id==="COFFEE_LOVER"),R=T.some(z=>z.id==="ICE_BATH"),w=T.some(z=>z.id==="GOOD_VIBES"),l=T.some(z=>z.id==="LIGHT_WORK"),p=m?10:20,A=f.energy!==void 0?f.energy:100;if(A<p)return alert(`Você está muito cansado! Energia atual: ${A}% (Necessário: ${p}%)`);if(C.length===0)return alert("Selecione os jogadores que vão pra banheira de gelo!");i(!0);const b=h.batch();let x=[];C.forEach(z=>{const re=d.find(j=>j.id===z);if(!re)return;if((re.recoveryLeft||0)>0){x.push(`⚠️ ${re.name} ignorado (Já está sob cuidados do DM).`);return}let Q=25;R&&(Q+=15);const oe=Math.min(100,(re.energy!==void 0?re.energy:100)+Q);let ue=Math.floor(Math.random()*3)+1;l&&(ue+=5);let q={energy:oe,xp:(re.xp||0)+ue},G="";w&&Math.random()<.3&&(q.mood="🤩",G=" e ficou muito feliz (🤩)!"),b.update(h.collection("players").doc(z),q),x.push(`🔋 ${re.name} recuperou +${Q}⚡ (+${ue} XP)${G}`)});let D=(f.xp||0)+20,O=f.level,N=f.pendingPerks||0;D>=O*100&&O<30&&(D-=O*100,O++,O%3===0&&N++,alert(`🎉 PARABÉNS! Nível ${O} alcançado!`)),b.update(h.collection("users").doc(f.id),{energy:A-p,xp:D,level:O,pendingPerks:N});const B=a.find(z=>z.id===f.teamId);if(B){let z=[...B.trainingLogs||[]];z.unshift({date:Date.now(),type:"🧊 REGENERATIVO (AUXILIAR)",report:x.join(`
`)}),z.length>10&&z.pop(),b.update(h.collection("teams").doc(B.id),{trainingLogs:z})}await b.commit(),i(!1),alert(`Sessão de Recuperação finalizada!

${x.join(`
`)}`)},handleCoachTrain:async(C,f)=>{const T=n.data,m=T.energy!==void 0?T.energy:100,R=C.length>0?20:30;if(m<R)return alert(`Você está muito cansado para realizar esta atividade! Energia atual: ${m}% (Necessário: ${R}%)`);i(!0);const w=h.batch();let l=0,p=[];const A=T.perks||[],b=A.find(L=>L.type==="ENERGY_SAVE"),x=b?Math.round(25*b.value):25,D=A.find(L=>L.type==="CRIT_CHANCE"),O=D?D.value:0,N=A.find(L=>L.type==="MIN_XP_BOOST"),B=N?N.value:0,z=A.find(L=>L.type==="AFFINITY_BOOST"),re=z?z.value:0,Q=a.find(L=>L.id===T.teamId),oe=(Q==null?void 0:Q.ctLevel)||1,ue=yu[oe].bonusXP/100;let q=[];f==="FISICO_BASE"?q=["stamina","balance","condition","strength"]:f==="VELOCIDADE"?q=["speed","accel","agility","dribbleSpd"]:f==="IMPULSAO"?q=["jump","header","condition"]:f==="CHUTE"?q=["shot","shotPower","shotTech","weakFootAcc"]:f==="PASSE"?q=["shortPass","longPass","shortPassSpd","longPassSpd","tech","weakFootFreq"]:f==="DRIBLE"?q=["dribble","dribbleSpd","agility","tech"]:f==="DEFESA"?q=["defense","aggression","response"]:f==="MENTAL"?q=["teamwork","mentality","response"]:f==="BOLA_PARADA"?q=["freeKick","curve","header","penalties"]:f==="GOLEIRO"?q=["gk","response","jump","longPass"]:f==="STUDY"&&(q=[]),C.forEach(L=>{const X=d.find(le=>le.id===L);if(!X)return;const Ae=X.energy!==void 0?X.energy:100;if((X.recoveryLeft||0)>0){p.push(`⚠️ ${X.name} ignorado (está lesionado)`);return}if(Ae<x){p.push(`⚠️ ${X.name} ignorado (exausto: ${Ae}%)`);return}if(Math.random()<.01){const le=on.LEVE[Math.floor(Math.random()*on.LEVE.length)];w.update(h.collection("players").doc(X.id),{injury:le,recoveryLeft:1,energy:Math.max(0,Ae-15),mood:"😡"}),p.push(`❌ ${X.name} se lesionou no treino: ${le}`);return}const v=Ae-x;let $=Math.floor(Math.random()*5)+8+B,Z=$+Math.floor($*ue);if((T.affinities||[]).includes(X.position)&&(Z+=5+re),X.equippedItem){const le=X.equippedItem.power||0,ge=Math.ceil(Z*(le/100));Z+=ge,p.push(`👟 ${X.name} usou ${X.equippedItem.name} (+${ge} XP)`),w.delete(h.collection("sales").doc(X.equippedItem.id)),w.update(h.collection("players").doc(L),{equippedItem:Y.firestore.FieldValue.delete()})}A.forEach(le=>{le.type==="TRAIN_BOOST"&&le.attrs.some(ve=>q.includes(ve))&&(Z=Math.round(Z*le.multiplier)),le.type==="YOUTH_BOOST"&&(X.age||18)<=le.ageLimit&&(Z=Math.round(Z*le.multiplier))}),Math.random()<.1+O&&(Z*=2,p.push(`🔥 ${X.name} teve uma GRANDE evolução (+${Z} XP)!`));let Ce={...X.attributes||{}};q.forEach(le=>{(Ce[le]||50)<99&&Math.random()<Z/80&&(Ce[le]=(Ce[le]||50)+1)});let se={xp:(X.xp||0)+Z,energy:v,attributes:Ce};if(X.learningPosition)if(f===ca[X.learningPosition.target].train){let le=10;(T.affinities||[]).includes(X.learningPosition.target)&&(le+=5),le+=oe*2;const ge=X.learningPosition.current+le;ge>=X.learningPosition.required?(p.push(`🌟 ${X.name} APRENDEU a jogar de ${X.learningPosition.target}! (O Boost de atributos entrará na próxima temporada)`),se.secondaryPositions=Y.firestore.FieldValue.arrayUnion(X.learningPosition.target),se.learningPosition=Y.firestore.FieldValue.delete(),se.pendingPosBoosts=Y.firestore.FieldValue.arrayUnion(X.learningPosition.target)):(se["learningPosition.current"]=ge,p.push(`🔄 ${X.name} adaptando para ${X.learningPosition.target}: ${Math.min(100,Math.floor(ge/X.learningPosition.required*100))}%`))}else p.push(`⚠️ ${X.name} precisa do treino de ${ca[X.learningPosition.target].train} para evoluir na nova posição.`);w.update(h.collection("players").doc(L),se),l+=20,p.push(`✔️ ${X.name} evoluiu +${Z} XP (Desgaste: -${x}⚡)`)}),f==="STUDY"&&(l=Math.floor(Math.random()*10)+15,p.push("📚 Você dedicou tempo estudando novas táticas e evoluiu como treinador."));let G=(T.xp||0)+l,j=T.level,K=T.pendingPerks||0,S=T.pendingAffinity||0;const y=j*120;if(G>=y&&j<30&&(G-=y,j++,j%5===0&&K++,[10,20,30].includes(j)&&S++,alert(`🎉 PARABÉNS! Nível ${j} alcançado!`)),w.update(h.collection("users").doc(T.id),{energy:m-R,xp:G,level:j,pendingPerks:K,pendingAffinity:S}),Q){let L=[...Q.trainingLogs||[]];L.unshift({date:Date.now(),type:f,report:p.join(`
`)}),L.length>10&&L.pop(),w.update(h.collection("teams").doc(Q.id),{trainingLogs:L})}await w.commit(),i(!1);let ee=f==="STUDY"?"Estudo concluído!":"Treino realizado com sucesso!";p.length>0&&(ee+=`

`+p.join(`
`)),alert(ee)},handleEvolveCoachPerk:async C=>{await h.collection("users").doc(n.data.id).update({perks:Y.firestore.FieldValue.arrayUnion(C),pendingPerks:Y.firestore.FieldValue.increment(-1)}),o(f=>({...f,data:{...f.data,perks:[...f.data.perks||[],C],pendingPerks:(f.data.pendingPerks||1)-1}})),alert(`Habilidade "${C.name}" aprendida!`)},updateTeamStats:async(C,f)=>{await h.collection("teams").doc(C).update({stats:f}),alert("Tabela atualizada!")},handlePlayerSoloTrain:async(C,f)=>{const T=C.energy!==void 0?C.energy:100;if(T<35)return alert(`Exausto (${T}%)! Precisa de 35%.`);if((C.recoveryLeft||0)>0)return alert("Você está lesionado e não pode treinar!");i(!0);const m=h.batch();let R=[];if(Math.random()<.02){const O=on.LEVE[Math.floor(Math.random()*on.LEVE.length)];return m.update(h.collection("players").doc(C.id),{injury:O,recoveryLeft:1,energy:Math.max(0,T-20),mood:"😡"}),await m.commit(),i(!1),alert(`❌ INFORTÚNIO!
Lesão no treino: ${O}
1 Jogo fora.`)}let w=[];f==="FISICO_BASE"?w=["stamina","balance","condition","strength"]:f==="VELOCIDADE"?w=["speed","accel","agility","dribbleSpd"]:f==="IMPULSAO"?w=["jump","header","condition"]:f==="CHUTE"?w=["shot","shotPower","shotTech","weakFootAcc"]:f==="PASSE"?w=["shortPass","longPass","shortPassSpd","longPassSpd","tech","weakFootFreq"]:f==="DRIBLE"?w=["dribble","dribbleSpd","agility","tech"]:f==="DEFESA"?w=["defense","aggression","response"]:f==="MENTAL"?w=["teamwork","mentality","response"]:f==="BOLA_PARADA"?w=["freeKick","curve","header","penalties"]:f==="GOLEIRO"&&(w=["gk","response","jump","longPass"]);let l=Math.floor(Math.random()*8)+8;const p=T-35;if(C.equippedItem){const O=Math.ceil(l*((C.equippedItem.power||0)/100));l+=O,R.push(`Usou ${C.equippedItem.name} (+${O} XP)`),m.delete(h.collection("sales").doc(C.equippedItem.id)),m.update(h.collection("players").doc(C.id),{equippedItem:Y.firestore.FieldValue.delete()})}let A={...C.attributes||{}},b=!1;w.forEach(O=>{(A[O]||50)<99&&Math.random()<.15&&(A[O]=(A[O]||50)+1,b=!0)}),m.update(h.collection("players").doc(C.id),{xp:(C.xp||0)+l,energy:p,attributes:A});const x=a.find(O=>O.id===C.teamId);if(x){let O=[...x.trainingLogs||[]],N=`${C.name} fez um treino extra e ganhou +${l} XP.`;b&&(N+=" Alguns atributos evoluíram!"),O.unshift({date:Date.now(),type:"🏃‍♂️ TREINO SOLO",report:N}),O.length>15&&O.pop(),m.update(h.collection("teams").doc(x.id),{trainingLogs:O})}await m.commit(),i(!1);let D=`Treino concluído!
Energia: -35%
XP: +${l}`;R.length>0&&(D+=`
${R.join(`
`)}`),alert(D)}}}const Si=60;async function Iu(t,e){const n=await t.orderBy("date","desc").limit(Si).get();if(n.docs.length<Si)return;const a=await t.orderBy("date","desc").startAfter(n.docs.at(-1)).limit(100).get();if(a.empty)return;const i=e.batch();a.docs.forEach(r=>i.delete(r.ref)),await i.commit()}function Su(t,e){const{user:n,posts:a,setChatMessages:i}=t;return{postNews:(_,H="normal")=>h.collection("news").add({text:_,type:H,date:Date.now()}),handleSocialPost:async(_,H)=>{const J=h.batch(),V=h.collection("posts").doc();if(J.set(V,{authorId:n.data.id,authorName:n.data.name,authorLogo:n.data.logo||n.data.face||null,text:_,img:H,date:Date.now(),likes:[]}),a.length>=50){const ae=a[a.length-1];if(ae){const ce=h.collection("posts").doc(ae.id);J.delete(ce)}}await J.commit()},handleSocialLike:async _=>{const H=n.data.id;(_.likes||[]).includes(H)?await h.collection("posts").doc(_.id).update({likes:Y.firestore.FieldValue.arrayRemove(H)}):await h.collection("posts").doc(_.id).update({likes:Y.firestore.FieldValue.arrayUnion(H)})},handleSocialDelete:async _=>{confirm("Apagar esta publicação?")&&await h.collection("posts").doc(_).delete()},subscribeToChat:_=>h.collection("chats").doc(_).collection("messages").orderBy("date","desc").limit(50).onSnapshot(H=>{const J=H.docs.map(V=>({id:V.id,...V.data()})).reverse();i(J)}),sendChatMessage:async(_,H)=>{if(!H.trim())return;const J=h.collection("chats").doc(_).collection("messages");await J.add({text:H,authorId:n.data.id,authorName:n.data.name,authorType:n.type,date:Date.now()}),Iu(J,h).catch(V=>console.warn("Limpeza do chat adiada:",V.code))},toggleFollow:async _=>{const H=n.type==="USER"?h.collection("teams").doc(n.data.id):h.collection("players").doc(n.data.id);(n.data.following||[]).includes(_)?(await H.update({following:Y.firestore.FieldValue.arrayRemove(_)}),alert("Deixou de seguir.")):(await H.update({following:Y.firestore.FieldValue.arrayUnion(_)}),alert("Seguindo!"))}}}function Tu(t,e){const{user:n,setLoading:a,setModal:i}=t,r=(...I)=>e.postNews(...I);return{handleHospitalDonation:async(I,g)=>{if(!n.data||n.data.balance<g)return alert("Saldo insuficiente!");if(!Number.isFinite(g)||g<=0)return alert("Valor inválido.");const _=I.donors||{};if(_[n.data.id])return alert(`🛑 GESTO JÁ REALIZADO!
Você já contribuiu para o tratamento atual deste jogador. Aguarde a recuperação ou a cirurgia para ajudar novamente.`);if(n.type==="COMPANY"&&g>15e4)return alert(`🚫 LIMITE EMPRESARIAL!
Pelas leis de Mato Real, empresas podem doar no máximo ${te(15e4)} (1% do teto cirúrgico) por procedimento para evitar monopólio.`);const H=n.type==="PLAYER"?h.collection("players").doc(n.data.id):n.type==="USER"?h.collection("teams").doc(n.data.id):h.collection("companies").doc(n.data.id),J=Wt(h,[{ref:H,expected:{balance:n.data.balance}},{ref:h.collection("players").doc(I.id),expected:{donors:I.donors}}]);J.update(H,{balance:Y.firestore.FieldValue.increment(-g)});const V={[n.data.id]:{name:n.data.name,val:g,date:Date.now()}};J.update(h.collection("players").doc(I.id),{hospitalFund:Y.firestore.FieldValue.increment(g),donors:{..._,...V}});try{await J.commit()}catch(ae){alert(ae.message);return}alert(`🙏 DOAÇÃO CONFIRMADA!
Obrigado, ${n.data.name}. Seus ${te(g)} foram enviados para o fundo hospitalar.`)},handleFinanceApprove:async I=>{a(!0);const g=h.collection("financeRequests").doc(I.id),_=Wt(h,[{ref:g,expected:{status:I.status,amount:I.amount,type:I.type,teamId:I.teamId}}]);let H=null;try{if(!Number.isFinite(Number(I.amount))||Number(I.amount)<=0)throw new Error("Valor inválido.");if(!["INJECTION","SPONSORSHIP"].includes(I.type))throw new Error("Tipo de solicitação inválido.");if(I.type==="INJECTION"){const J=h.collection("teams").doc(I.teamId);_.update(J,{balance:Y.firestore.FieldValue.increment(Number(I.amount))}),_.delete(g),H=`💰 **INJEÇÃO FINANCEIRA**
A Federação aportou ${te(I.amount)} no caixa do ${I.teamName}.`}else if(I.type==="SPONSORSHIP"){const J=h.collection("sponsorships").doc();_.set(J,{teamId:I.teamId,teamName:I.teamName,companyId:"FEDERACAO",companyName:"FEDERAÇÃO (Governo)",value:parseFloat(I.amount),status:"ACTIVE"}),_.delete(g),H=`🤝 **PATROCÍNIO ESTATAL**
O ${I.teamName} fechou contrato com a Federação.
Valor: ${te(I.amount)}/semana.`}await _.commit(),H&&r(H,"admin").catch(J=>console.warn(J)),alert("Solicitação Aprovada com Sucesso!")}catch(J){alert("Erro ao aprovar: "+J.message)}a(!1)},updateBalance:async(I,g)=>{await h.collection("teams").doc(I).update({balance:parseFloat(g)}),alert("Atualizado!")},withdrawMoney:async(I,g)=>{const _=parseFloat(I.replace(",","."));if(!Number.isFinite(_)||_<=0)return alert("Valor inválido!");if(n.data.balance<_)return alert("Saldo insuficiente!");try{await Eu(h,h.collection("teams").doc(n.data.id),{balance:n.data.balance},{balance:Y.firestore.FieldValue.increment(-_)})}catch(H){alert(H.message);return}r(`💸 **SAÍDA DE CAIXA**
O **${n.data.name}** retirou ${te(_)}.
📝 Motivo: ${g}`,"money-minus"),i(null)}}}function bu(t){const e={};return Object.assign(e,ou(t)),Object.assign(e,cu(t,e)),Object.assign(e,du(t,e)),Object.assign(e,Au(t,e)),Object.assign(e,vu(t)),Object.assign(e,Su(t)),Object.assign(e,Tu(t,e)),eo(e,t.user)}function Cu(t,e=[]){const n=new Set(t.docChanges().map(r=>r.doc.id)),a=new Map(e.map(r=>[r.id,r])),i=t.docs.map(r=>!n.has(r.id)&&a.has(r.id)?a.get(r.id):{...r.data(),id:r.id});return i.length===e.length&&i.every((r,o)=>r===e[o])?e:i}function Ru(t,e,n){const a=t==="ADMIN",i=!!t;return{financeRequests:a,products:a||t==="COMPANY"||e==="SHOPPING",sponsorships:a||t==="USER"||t==="COMPANY",awards:a||["AWARDS_MANAGER","TOURN_MANAGER"].includes(n),tournaments:a||e==="MATCHES"||["TOURN_MANAGER","MATCH_MANAGER"].includes(n),hallOfFame:e==="RANKING",matches:a||e==="MATCHES"||["MATCH_MANAGER","MATCH_PERFORMANCE"].includes(n),posts:e==="SOCIAL",news:i,calendar:i}}function we(t,e,n=!0,a=null,i=null,r=!1){W.useEffect(()=>{if(!n)return;let o=h.collection(t);r&&(o=o.where("type","in",["COACH","DOCTOR","SCOUT","ASSISTANT"])),a&&(o=o.orderBy(a,"desc")),i&&(o=o.limit(i));let u=[];return o.onSnapshot(d=>{u=Cu(d,u),e(u)},d=>console.error(`Não foi possível atualizar ${t}:`,d.code))},[t,e,n,a,i,r])}function Bs({look:t,uniform:e}){const n=W.useRef(null);return W.useEffect(()=>{const a=n.current.getContext("2d");a.clearRect(0,0,180,180),a.fillStyle="#102b25",a.fillRect(0,0,180,180),Qd(a,90,155,t,e,0,5)},[t,e]),s.jsx("canvas",{ref:n,width:"180",height:"180",style:{imageRendering:"pixelated",maxWidth:"100%"},"aria-label":"Prévia do personagem com uniforme"})}function Ou({player:t,team:e,onChange:n}){const[a,i]=W.useState(()=>Vt(t.pixelAppearance)),[r,o]=W.useState(""),[u,d]=W.useState(!1),E=zt(e),I=e?E[t.position==="GOL"?"goalkeeper":"home"]:yt({shirt:"#7c8798"}),g=(_,H)=>{const J={...a,[_]:H};i(J),n==null||n(Vt(J))};return s.jsxs("section",{className:"card","data-testid":"appearance-editor",children:[s.jsx("h3",{children:"Meu personagem em campo"}),s.jsx(Bs,{look:a,uniform:I}),s.jsxs("p",{children:[e?`Uniforme atual: ${e.name}${t.position==="GOL"?" — goleiro":""}`:"Sem clube: uniforme neutro",". O uniforme acompanha seu clube; a aparência continua com você."]}),[[js,"skin","Tom de pele"],[Fs,"hair","Cor do cabelo"],[Vs,"boots","Chuteiras"]].map(([_,H,J])=>s.jsxs("label",{style:{display:"block",margin:"12px 0"},children:[J,s.jsx("select",{className:"input-field","aria-label":J,value:a[H],onChange:V=>g(H,V.target.value),children:_.map((V,ae)=>s.jsxs("option",{value:V,children:[J," ",ae+1," (",V,")"]},V))})]},H)),s.jsxs("label",{children:["Cabelo",s.jsx("select",{className:"input-field","aria-label":"Cabelo",value:a.style,onChange:_=>g("style",_.target.value),children:Object.entries(Us).map(([_,H])=>s.jsx("option",{value:_,children:H},_))})]}),s.jsxs("label",{children:["Barba",s.jsxs("select",{className:"input-field","aria-label":"Barba",value:a.beard,onChange:_=>g("beard",_.target.value),children:[s.jsx("option",{value:"none",children:"Sem barba"}),s.jsx("option",{value:"short",children:"Curta"}),s.jsx("option",{value:"full",children:"Cheia"})]})]}),s.jsxs("label",{children:["Mangas",s.jsxs("select",{className:"input-field","aria-label":"Mangas",value:a.sleeves,onChange:_=>g("sleeves",_.target.value),children:[s.jsx("option",{value:"short",children:"Curtas"}),s.jsx("option",{value:"long",children:"Longas"})]})]}),s.jsxs("label",{children:["Número preferido",s.jsx("input",{className:"input-field",type:"number",min:"1",max:"99",value:a.number,onChange:_=>g("number",_.target.value)})]}),s.jsx("p",{children:"Se dois titulares escolherem o mesmo número, o amistoso atribui um número livre ao segundo."}),!n&&s.jsx("button",{className:"btn btn-green",disabled:u,onClick:async()=>{d(!0);try{const _=Vt(a);await h.collection("players").doc(t.id).update({pixelAppearance:_}),i(_),o("Aparência salva. Será usada nas próximas partidas.")}catch{o("Não foi possível salvar. Tente novamente.")}finally{d(!1)}},children:"SALVAR APARÊNCIA"}),s.jsx("p",{role:"status",children:r})]})}function Oh({team:t}){const[e,n]=W.useState(()=>zt(t)),[a,i]=W.useState("home"),[r,o]=W.useState(""),[u,d]=W.useState(!1);return s.jsxs("section",{className:"card","data-testid":"kit-editor",children:[s.jsx("h3",{children:"Uniformes do clube"}),s.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:[["home","CASA"],["away","FORA"],["goalkeeper","GOLEIRO"]].map(([E,I])=>s.jsx("button",{className:`btn ${a===E?"btn-green":"btn-ghost"}`,onClick:()=>i(E),children:I},E))}),s.jsx(Bs,{look:{},uniform:e[a]}),Object.entries({shirt:"Camisa",detail:"Detalhes",shorts:"Calção",socks:"Meião"}).map(([E,I])=>s.jsxs("label",{style:{display:"block",margin:12},children:[I," ",s.jsx("input",{"aria-label":I,type:"color",value:e[a][E],onChange:g=>n({...e,[a]:{...e[a],[E]:g.target.value}})})]},E)),s.jsxs("label",{children:["Modelo",s.jsx("select",{className:"input-field",value:e[a].pattern,onChange:E=>n({...e,[a]:{...e[a],pattern:E.target.value}}),children:Object.entries(Ms).map(([E,I])=>s.jsx("option",{value:E,children:I},E))})]}),s.jsx("p",{children:"As mudanças valem para as próximas partidas. Replays preservam os uniformes originais."}),s.jsx("button",{className:"btn btn-green",disabled:u,onClick:async()=>{d(!0);try{await h.collection("teams").doc(t.id).update({kits:zt({kits:e})}),o("Os três uniformes foram salvos.")}catch{o("Não foi possível salvar os uniformes.")}finally{d(!1)}},children:"SALVAR UNIFORMES"}),s.jsx("p",{role:"status",children:r})]})}function _u({value:t="MTR",onChange:e,disabled:n=!1,label:a="Nacionalidade"}){return s.jsxs("label",{style:{display:"block",marginBottom:10},children:[a,s.jsx("select",{className:"input-field","aria-label":a,value:t,onChange:i=>e(i.target.value),disabled:n,children:Gs.map(i=>s.jsxs("option",{value:i.id,children:[iu(i.id)," ",i.name]},i.id))})]})}const ln=["A","B","C","D","VARZEA"],wu=["GOL","ZAG","LD","LE","VOL","MC","MEI","PTD","PTE","ATA"],Nu=["GOL","ZAG","LD","LE","VOL","MC","MD","ME","MEI","PTD","PTE","SA","ATA"],Pu=({teams:t,players:e,papers:n,journalists:a,companies:i,coaches:r,onLogin:o,onCreateTeam:u,onCreatePaper:d,onCreateJourno:E,onCreateCompany:I,onAdmin:g,onVisitor:_,onCreateCoach:H,onCreatePlayer:J,config:V})=>{const[ae,ce]=W.useState(!1),[ne,P]=W.useState(""),[k,C]=W.useState(""),[f,T]=W.useState(""),[m,R]=W.useState(!1),[w,l]=W.useState("LOGIN"),[p,A]=W.useState("TEAM"),[b,x]=W.useState({n:"",b:"10000000",s:"A",p:""}),[D,O]=W.useState({n:"",owner:"",p:"",type:"COMERCIO"}),[N,B]=W.useState(null),[z,re]=W.useState(null),[Q,oe]=W.useState(null),[ue,q]=W.useState(""),[G,j]=W.useState(null),[K,S]=W.useState({name:"",password:"",affinity:"ATA",role:"COACH",face:null}),[y,ee]=W.useState({nationality:"MTR",name:"",instagram:"",position:"ATA",password:""}),L=v=>{const $=v.target.files[0],Z=new FileReader;Z.onloadend=()=>x({...b,l:Z.result}),$&&Z.readAsDataURL($)},X=Dn[D.type]||{},Ae=()=>{if(N){if(String(N.password)!==String(ue))return alert("Senha incorreta!");if(N.type==="TEAM"){if(N.status==="PENDING")return alert("Aguardando aprovação.");o(N.id,ue,"TEAM")}else if(N.type==="PLAYER")o(N.id,ue,"PLAYER");else if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(N.type)){if(N.status==="PENDING")return alert("Licença em análise.");o(N.id,ue,N.type)}else if(N.type==="COMPANY"){if(N.status==="PENDING")return alert("Empresa em análise.");if(N.status==="BLOCKED")return alert("Empresa bloqueada.");o(N.id,ue,"COMPANY")}else if(N.type==="PAPER"){if(N.status==="PENDING")return alert("Jornal em análise.");o(N.id,ue,"PAPER")}else if(N.type==="JOURNALIST"){if(N.status==="PENDING")return alert("Registro em análise.");o(N.id,ue,"JOURNALIST")}}};return s.jsxs("div",{className:"login-wrapper",children:[s.jsx("style",{children:`
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
            `}),s.jsxs("div",{className:"login-header-container animate-in",children:[s.jsxs("div",{className:"logos-wrapper",children:[s.jsx("img",{src:"assets/img1.webp",alt:"Sponsor 1",className:"side-logo"}),s.jsx("img",{src:"assets/img2.jpg",alt:"Brasão Central",className:"main-logo"}),s.jsx("img",{src:"assets/img3.jpg",alt:"Sponsor 2",className:"side-logo"})]}),s.jsx("h1",{className:"game-title",children:"MATO REAL"}),s.jsxs("div",{className:"dev-info-row",children:[s.jsxs("div",{className:"dev-credits-sub",children:["FUT PIXEL"," ",s.jsx("span",{style:{color:"#00E676",margin:"0 5px"},children:"•"})," POR NATHAN REIS"]}),s.jsx("div",{className:"version-badge",children:"VERSÃO 2.5.3 — MATO REAL TV "})]})]}),s.jsxs("div",{className:"login-tabs",children:[s.jsx("div",{className:`tab ${w==="LOGIN"?"active":""}`,onClick:()=>l("LOGIN"),children:"ENTRAR"}),s.jsx("div",{className:`tab ${w==="CREATE"?"active":""}`,onClick:()=>l("CREATE"),children:"CRIAR TIME"}),s.jsx("div",{className:`tab ${w==="PRESS"?"active":""}`,onClick:()=>l("PRESS"),children:"IMPRENSA"}),s.jsx("div",{className:`tab ${w==="COMPANY"?"active":""}`,onClick:()=>l("COMPANY"),children:"EMPRESAS"}),s.jsx("div",{className:`tab ${w==="COACH"?"active":""}`,onClick:()=>l("COACH"),children:"COMISSÃO"}),s.jsx("div",{className:`tab ${w==="NEW_PLAYER"?"active":""}`,onClick:()=>l("NEW_PLAYER"),children:"JOGADOR"})]}),w==="LOGIN"&&s.jsxs("div",{children:[s.jsxs("div",{className:"login-tab-buttons",children:[s.jsx("button",{className:`btn ${p==="TEAM"?"btn-green":"btn-ghost"}`,style:{width:"auto"},onClick:()=>A("TEAM"),children:"TIMES"}),s.jsx("button",{className:`btn ${p==="PLAYER"?"btn-blue":"btn-ghost"}`,style:{width:"auto"},onClick:()=>{A("PLAYER"),oe(null)},children:"JOGADORES"}),s.jsx("button",{className:`btn ${p==="COMPANY"?"btn-purple":"btn-ghost"}`,style:{width:"auto"},onClick:()=>A("COMPANY"),children:"EMPRESAS"}),s.jsx("button",{className:`btn ${p==="COACH"?"btn-gold":"btn-ghost"}`,style:{width:"auto"},onClick:()=>{A("COACH"),oe(null),j(null)},children:"COMISSÃO"})]}),p==="TEAM"&&s.jsx("div",{className:"text-left",children:G?s.jsxs("div",{className:"animate-in",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>j(null),children:"⬅ VOLTAR PARA DIVISÕES"}),s.jsx("h4",{className:`login-series-header-team ${G==="VARZEA"?"login-series-title-varzea":"login-series-title-main"}`,children:G==="VARZEA"?"🚜 Terrão (Várzea)":`Série ${G}`}),(()=>{const v=(t||[]).filter($=>$.status!=="PENDING"&&$.serie===G).sort(($,Z)=>$.name.localeCompare(Z.name));return v.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum time cadastrado nesta série."}):v.map($=>s.jsxs("div",{className:"card card-row card-clickable",onClick:()=>B({...$,type:"TEAM"}),children:[$.logo?s.jsx("img",{src:$.logo,className:"login-team-card-logo"}):s.jsx("div",{className:"login-team-card-logo-placeholder",children:"🛡️"}),s.jsx("div",{children:s.jsx("b",{className:"card-main-title",children:$.name})})]},$.id))})()]}):s.jsxs("div",{className:"animate-in login-series-wrapper",children:[s.jsx("h4",{className:"login-series-title",children:"Selecione a Divisão"}),ln.map(v=>s.jsx("button",{className:"btn btn-ghost login-series-button-team",onClick:()=>j(v),children:v==="VARZEA"?"🚜 O Terrão (Várzea)":`🏆 Campeonato Série ${v}`},`btn-s-${v}`))]})}),p==="PLAYER"&&!Q&&s.jsx("div",{className:"text-left",children:G?s.jsxs("div",{className:"animate-in",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>j(null),children:"⬅ VOLTAR PARA DIVISÕES"}),s.jsx("h4",{className:`login-series-header-team ${G==="VARZEA"?"login-series-title-varzea":""}`,children:G==="VARZEA"?"🚜 Terrão (Várzea)":`Série ${G}`}),(()=>{const v=(t||[]).filter($=>$.status!=="PENDING"&&$.serie===G).sort(($,Z)=>$.name.localeCompare(Z.name));return v.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum time cadastrado nesta série."}):v.map($=>s.jsxs("div",{className:"card",onClick:()=>oe($),style:{display:"flex",alignItems:"center",gap:10,cursor:"pointer"},children:[$.logo?s.jsx("img",{src:$.logo,className:"login-player-team-logo"}):s.jsx("div",{className:"login-player-team-logo-placeholder",children:"🛡️"}),s.jsx("b",{style:{fontSize:15},children:$.name}),s.jsx("i",{className:"fas fa-chevron-right",style:{marginLeft:"auto",color:"#555"}})]},$.id))})()]}):s.jsxs("div",{className:"animate-in login-series-wrapper",children:[s.jsx("p",{className:"login-player-help",children:"Selecione o clube onde você joga ou acesse como livre:"}),s.jsx("div",{className:"card pulse login-free-agent-card",onClick:()=>oe({id:"FREE",name:"Agentes Livres"}),children:s.jsx("b",{className:"login-free-agent-title",children:"🆓 SOU AGENTE LIVRE"})}),ln.map(v=>s.jsx("button",{className:"btn btn-ghost login-series-button-player",onClick:()=>j(v),children:v==="VARZEA"?"🚜 O Terrão (Várzea)":`🏆 Campeonato Série ${v}`},`btn-p-s-${v}`))]})}),p==="PLAYER"&&Q&&s.jsxs("div",{className:"animate-in text-left",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>oe(null),children:"⬅ VOLTAR AOS CLUBES"}),s.jsxs("h4",{className:"login-series-header-team",children:["Elenco: ",Q.name]}),(()=>{const v=(e||[]).filter($=>!$.isBot&&$.teamId===Q.id).sort(($,Z)=>$.name.localeCompare(Z.name));return v.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum jogador encontrado neste clube."}):v.map($=>s.jsxs("div",{className:"card card-row card-clickable card-accent-secondary",onClick:()=>B({...$,type:"PLAYER"}),children:[$.face?s.jsx("img",{src:$.face,className:"avatar-md"}):s.jsx("div",{className:"avatar-md-placeholder",children:"👤"}),s.jsxs("div",{className:"flex-1",children:[s.jsxs("b",{className:"card-main-title",children:[$.name," ",$.recoveryLeft>0?"❌":""]}),s.jsx("br",{}),s.jsx("span",{className:"login-player-position-badge",children:$.position})]}),s.jsx("i",{className:"fas fa-sign-in-alt icon-right-muted"})]},$.id))})()]}),p==="COMPANY"&&(i||[]).filter(v=>v.status!=="PENDING").map(v=>s.jsxs("div",{className:"card login-company-card",onClick:()=>B({...v,type:"COMPANY"}),children:["🏢 ",s.jsx("b",{children:v.name}),s.jsx("br",{}),s.jsx("small",{children:v.companyType})]},v.id)),p==="COACH"&&!Q&&s.jsx("div",{className:"text-left",children:G?s.jsxs("div",{className:"animate-in",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>j(null),children:"⬅ VOLTAR PARA DIVISÕES"}),s.jsx("h4",{className:"login-coach-series-header",children:G==="VARZEA"?"🚜 Terrão (Várzea)":`Série ${G}`}),(()=>{const v=(t||[]).filter($=>$.status!=="PENDING"&&$.serie===G).sort(($,Z)=>$.name.localeCompare(Z.name));return v.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum time cadastrado nesta série."}):v.map($=>s.jsxs("div",{className:"card",onClick:()=>oe($),style:{display:"flex",alignItems:"center",gap:10,cursor:"pointer"},children:[$.logo?s.jsx("img",{src:$.logo,className:"login-coach-team-logo"}):s.jsx("div",{className:"login-coach-team-logo-placeholder",children:"🛡️"}),s.jsx("b",{style:{fontSize:15},children:$.name}),s.jsx("i",{className:"fas fa-chevron-right",style:{marginLeft:"auto",color:"#555"}})]},$.id))})()]}):s.jsxs("div",{className:"animate-in login-series-wrapper",children:[s.jsx("p",{className:"login-coach-help",children:"Selecione o clube onde trabalha ou acesse como livre:"}),s.jsx("div",{className:"card pulse login-coach-free-card",onClick:()=>oe({id:"FREE",name:"Profissionais Livres"}),children:s.jsx("b",{className:"login-coach-free-title",children:"🆓 SOU PROFISSIONAL LIVRE"})}),ln.map(v=>s.jsx("button",{className:"btn btn-ghost login-coach-series-button",onClick:()=>j(v),children:v==="VARZEA"?"🚜 O Terrão (Várzea)":`🏆 Campeonato Série ${v}`},`btn-c-s-${v}`))]})}),p==="COACH"&&Q&&s.jsxs("div",{className:"animate-in text-left",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>oe(null),children:"⬅ VOLTAR AOS CLUBES"}),s.jsx("h4",{className:"login-coach-list-header",children:Q.id==="FREE"?"Mercado de Profissionais":`Staff: ${Q.name}`}),(()=>{const v=(r||[]).filter(Z=>Z.status==="ACTIVE"&&Z.teamId===Q.id).sort((Z,Ce)=>Z.name.localeCompare(Ce.name));if(v.length===0)return s.jsx("p",{className:"login-empty-text",children:"Nenhum profissional contratado neste clube."});const $={COACH:"👔 Técnico",DOCTOR:"🩺 Médico",SCOUT:"🕵️‍♂️ Olheiro",ASSISTANT:"📋 Auxiliar"};return v.map(Z=>s.jsxs("div",{className:"card login-coach-card card-clickable",onClick:()=>B({...Z,type:Z.type||"COACH"}),children:[Z.face?s.jsx("img",{src:Z.face,className:"login-coach-photo"}):s.jsx("div",{className:"login-coach-photo-placeholder",children:Z.type==="DOCTOR"?"🩺":Z.type==="SCOUT"?"🕵️‍♂️":Z.type==="ASSISTANT"?"📋":"👔"}),s.jsxs("div",{className:"flex-1",children:[s.jsx("b",{className:"login-coach-name",children:Z.name}),s.jsx("br",{}),s.jsxs("span",{className:"login-coach-subtitle",children:[$[Z.type]||"👔 Técnico"," | Nível ",Z.level,Z.type==="COACH"&&Z.affinities?` | Esp: ${Z.affinities[0]}`:""]})]}),s.jsx("i",{className:"fas fa-sign-in-alt icon-login-gold"})]},Z.id))})()]}),s.jsxs("div",{className:"login-footer-actions",children:[s.jsx("button",{className:"btn btn-blue",onClick:_,children:"ENTRAR COMO VISITANTE"}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>{ce(!0),T("")},children:"ADMIN"}),ae&&s.jsxs("form",{className:"card",onSubmit:async v=>{var $;v.preventDefault(),R(!0),T("");try{await g(ne,k),C("")}catch(Z){T(($=Z.code)!=null&&$.startsWith("auth/")?"Não foi possível entrar. Confira o login e a senha.":Z.message)}finally{R(!1)}},children:[s.jsx("h3",{children:"Acesso administrativo"}),s.jsxs("label",{children:["E-mail do principal ou login do subADM",s.jsx("input",{className:"input-field",autoComplete:"username",required:!0,value:ne,onChange:v=>P(v.target.value)})]}),s.jsxs("label",{children:["Senha administrativa",s.jsx("input",{className:"input-field",type:"password",autoComplete:"current-password",required:!0,value:k,onChange:v=>C(v.target.value)})]}),f&&s.jsx("p",{role:"alert",children:f}),s.jsx("button",{className:"btn btn-green",disabled:m,children:"ENTRAR NO PAINEL"}),s.jsx("button",{type:"button",className:"btn",disabled:m,onClick:()=>{ce(!1),C("")},children:"CANCELAR"})]})]})]}),w==="CREATE"&&s.jsxs("div",{children:[s.jsx("h3",{style:{color:"var(--primary)"},children:"Fundar Novo Clube"}),s.jsxs("div",{className:"login-create-club-preview",children:[s.jsx("div",{children:b.l?s.jsx("img",{src:b.l,className:"login-club-logo"}):s.jsx("div",{className:"login-club-logo-placeholder",children:"🛡️"})}),s.jsxs("label",{className:"btn btn-blue login-upload-badge",children:[s.jsx("i",{className:"fas fa-upload",style:{marginRight:5}})," ","ESCOLHER ESCUDO",s.jsx("input",{type:"file",style:{display:"none"},accept:"image/*",onChange:L})]})]}),s.jsx("input",{className:"input-field",placeholder:"Nome do Clube",value:b.n,onChange:v=>x({...b,n:v.target.value})}),s.jsx("input",{className:`input-field ${b.s==="VARZEA"?"login-varzea-balance":""}`,type:"number",placeholder:"Saldo Inicial",value:b.s==="VARZEA"?2e5:b.b,onChange:v=>x({...b,b:v.target.value}),disabled:b.s==="VARZEA"}),s.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[s.jsxs("div",{children:[s.jsx("label",{style:{fontSize:11,color:"#aaa"},children:"Divisão Nacional"}),s.jsx("select",{className:"input-field",value:b.s,onChange:v=>{const $=v.target.value;x({...b,s:$,b:$==="VARZEA"?"200000":"10000000"})},children:ln.map(v=>s.jsx("option",{value:v,children:v==="VARZEA"?"Série E (Várzea)":`Série ${v}`},v))})]}),s.jsxs("div",{children:[s.jsx("label",{style:{fontSize:11,color:"#aaa"},children:"Federação Estadual"}),s.jsxs("select",{className:"input-field",value:b.estado||"",onChange:v=>x({...b,estado:v.target.value}),children:[s.jsx("option",{value:"",children:"-- Escolha --"}),ka.map(v=>s.jsx("option",{value:v,children:v},v))]})]})]}),s.jsx("input",{className:"input-field",type:"password",placeholder:"Crie uma Senha",value:b.p,onChange:v=>x({...b,p:v.target.value})}),b.s==="VARZEA"&&(V==null?void 0:V.varzeaOpen)===!1&&s.jsxs("div",{className:"login-varzea-warning",children:[s.jsx("b",{className:"login-varzea-warning-title",children:"🛑 INSCRIÇÕES ENCERRADAS!"}),s.jsx("span",{className:"login-varzea-warning-text",children:"A Federação informa que o limite de clubes da Várzea foi atingido."})]}),s.jsx("button",{className:`btn ${b.s==="VARZEA"&&(V==null?void 0:V.varzeaOpen)===!1?"btn-ghost":"btn-green"}`,disabled:b.s==="VARZEA"&&(V==null?void 0:V.varzeaOpen)===!1,onClick:()=>{if(!b.n||!b.p||!b.estado)return alert("⚠️ Preencha nome, senha e escolha o ESTADO!");if(t.find(Z=>Z.name&&Z.name.toLowerCase()===b.n.toLowerCase()))return alert("🚫 Este nome de clube já está em uso!");const v=b.s==="VARZEA"?"ACTIVE":"PENDING",$=b.s==="VARZEA"?2e5:parseFloat(b.b);h.collection("teams").add({name:b.n,balance:$,serie:b.s,estado:b.estado,password:b.p,stadiumLevel:1,logo:b.l||null,status:v,stats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0},stateStats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}}).then(()=>{v==="ACTIVE"?(alert("✅ Clube de Várzea fundado! Bem-vindo ao Estadual de "+b.estado+"!"),window.location.reload()):(alert("✅ Solicitação enviada à Federação! Aguarde aprovação."),x({n:"",b:"10000000",s:"A",p:"",l:null,estado:""}),l("LOGIN"))})},children:"FUNDAR CLUBE E FILIAR À FEDERAÇÃO"}),b.s==="VARZEA"&&s.jsx("p",{className:"login-varzea-note",children:"* Times da Várzea iniciam com teto de ₣ 200.000 e aprovação imediata."})]}),w==="PRESS"&&s.jsxs("div",{children:[s.jsxs("div",{style:{display:"flex",gap:10,marginBottom:10},children:[s.jsx("button",{className:"btn btn-ghost",onClick:()=>A("LOGIN_P"),children:"LOGIN"}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>A("NEW_PAPER"),children:"CRIAR JORNAL"}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>A("NEW_JOURNO"),children:"SOU JORNALISTA"})]}),p==="LOGIN_P"&&!z&&s.jsxs("div",{children:[s.jsx("h4",{children:"Selecione o Jornal"}),(n||[]).filter(v=>v.status==="ACTIVE").map(v=>s.jsxs("div",{className:"card",onClick:()=>re(v),children:["📰 ",v.name]},v.id))]}),p==="LOGIN_P"&&z&&s.jsxs("div",{children:[s.jsx("button",{className:"btn",style:{marginBottom:10},onClick:()=>re(null),children:"⬅ VOLTAR"}),s.jsxs("h4",{children:[z.name," - Jornalistas"]}),s.jsxs("div",{className:"card",onClick:()=>B({...z,type:"PAPER"}),style:{border:"1px solid var(--primary)"},children:["👑 ",z.ownerName," (Dono)"]}),(a||[]).filter(v=>v.newspaperId===z.id&&v.status==="ACTIVE").map(v=>s.jsxs("div",{className:"card",onClick:()=>B({...v,type:"JOURNALIST"}),children:["✒️ ",v.name]},v.id))]}),p==="NEW_PAPER"&&s.jsxs("div",{children:[s.jsx("input",{className:"input-field",placeholder:"Nome do Jornal",id:"pn"}),s.jsx("input",{className:"input-field",placeholder:"Seu Nome (Dono)",id:"po"}),s.jsx("input",{className:"input-field",type:"number",placeholder:"Senha",id:"pp"}),s.jsx("button",{className:"btn btn-green",onClick:()=>d(document.getElementById("pn").value,document.getElementById("pp").value,document.getElementById("po").value),children:"SOLICITAR CRIAÇÃO"})]}),p==="NEW_JOURNO"&&s.jsxs("div",{children:[s.jsx("input",{className:"input-field",placeholder:"Seu Nome",id:"jn"}),s.jsxs("select",{className:"input-field",id:"jp_id",children:[s.jsx("option",{value:"",children:"Selecione o Jornal"}),(n||[]).filter(v=>v.status==="ACTIVE").map(v=>s.jsx("option",{value:v.id,children:v.name},v.id))]}),s.jsx("input",{className:"input-field",type:"number",placeholder:"Senha",id:"jp"}),s.jsx("button",{className:"btn btn-green",onClick:()=>E(document.getElementById("jn").value,document.getElementById("jp").value,document.getElementById("jp_id").value),children:"SOLICITAR EMPREGO"})]})]}),w==="COMPANY"&&s.jsxs("div",{children:[s.jsx("h3",{style:{color:"var(--purple)"},children:"Abrir Empresa"}),s.jsx("input",{className:"input-field",placeholder:"Nome da Empresa",value:D.n,onChange:v=>O({...D,n:v.target.value})}),s.jsx("input",{className:"input-field",placeholder:"Nome do Dono",value:D.owner,onChange:v=>O({...D,owner:v.target.value})}),s.jsx("label",{className:"login-company-label",children:"Porte da Empresa"}),s.jsxs("select",{className:"input-field",value:D.type,onChange:v=>O({...D,type:v.target.value}),children:[s.jsx("option",{value:"COMERCIO",children:"Comércio Local"}),s.jsx("option",{value:"MEDIA",children:"Média Empresa"}),s.jsx("option",{value:"GRANDE",children:"Grande Empresa"})]}),s.jsxs("div",{className:"login-company-box",children:[s.jsxs("div",{className:"login-info-row",style:{marginBottom:5},children:[s.jsx("span",{children:"💰 Capital Inicial:"}),s.jsx("span",{className:"login-company-highlight-primary",children:te(X.start)})]}),s.jsxs("div",{className:"login-info-row",children:[s.jsx("span",{children:"💸 Imposto Semanal:"}),s.jsx("span",{className:"login-company-highlight-danger",children:te(X.tax)})]}),s.jsxs("p",{className:"login-company-tax-note",children:['"',X.desc,'"']})]}),s.jsx("input",{className:"input-field",type:"number",placeholder:"Senha de Acesso",value:D.p,onChange:v=>O({...D,p:v.target.value})}),s.jsx("button",{className:"btn btn-purple",onClick:()=>I(D),children:"SOLICITAR ABERTURA"})]}),w==="COACH"&&s.jsxs("div",{children:[s.jsx("h3",{className:"login-coach-title",children:"🎓 Licença Profissional"}),s.jsx("p",{style:{fontSize:12,color:"#aaa"},children:"Inicie sua carreira no Staff de um Clube."}),s.jsx("div",{className:"card login-coach-card-info",children:s.jsxs("div",{className:"login-info-row",children:[s.jsxs("span",{children:["Nível Inicial: ",s.jsx("b",{children:"1"})]}),s.jsxs("span",{children:["Salário Base: ",s.jsx("b",{children:te(2500)})]})]})}),s.jsxs("div",{className:"login-coach-avatar-wrapper",children:[s.jsx("div",{className:"login-coach-avatar",children:K.face?s.jsx("img",{src:K.face,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}):s.jsx("span",{style:{fontSize:30},children:"📷"})}),s.jsxs("label",{className:"btn btn-ghost login-coach-upload-label",children:["ESCOLHER FOTO DE PERFIL",s.jsx("input",{type:"file",style:{display:"none"},accept:"image/*",onChange:v=>{const $=v.target.files[0];if(!$)return;const Z=new FileReader;Z.readAsDataURL($),Z.onload=Ce=>{const se=new Image;se.src=Ce.target.result,se.onload=()=>{const le=document.createElement("canvas"),ge=150;let ve=se.width,fe=se.height;ve>fe?ve>ge&&(fe*=ge/ve,ve=ge):fe>ge&&(ve*=ge/fe,fe=ge),le.width=ve,le.height=fe,le.getContext("2d").drawImage(se,0,0,ve,fe),S({...K,face:le.toDataURL("image/jpeg",.8)})}}}})]})]}),s.jsx("label",{style:{textAlign:"left",display:"block",color:"#aaa",fontSize:12},children:"Qual a sua profissão?"}),s.jsxs("select",{className:"input-field",value:K.role,onChange:v=>S({...K,role:v.target.value}),style:{borderColor:"gold",color:"gold",fontWeight:"bold"},children:[s.jsx("option",{value:"COACH",children:"👔 Técnico Principal"}),s.jsx("option",{value:"ASSISTANT",children:"📋 Auxiliar Técnico"}),s.jsx("option",{value:"DOCTOR",children:"🩺 Médico Chefe"}),s.jsx("option",{value:"SCOUT",children:"🕵️‍♂️ Olheiro / Diretor"})]}),s.jsx("input",{className:"input-field",value:K.name,onChange:v=>S({...K,name:v.target.value}),placeholder:"Seu Nome"}),s.jsx("input",{className:"input-field",type:"password",value:K.password,onChange:v=>S({...K,password:v.target.value}),placeholder:"Senha de Acesso"}),K.role==="COACH"&&s.jsxs(s.Fragment,{children:[s.jsx("label",{style:{textAlign:"left",display:"block",color:"#aaa",fontSize:12},children:"Especialidade Inicial"}),s.jsx("select",{className:"input-field",value:K.affinity,onChange:v=>S({...K,affinity:v.target.value}),children:wu.map(v=>s.jsxs("option",{value:v,children:[v," - Especialista"]},v))})]}),s.jsx("button",{className:"btn btn-gold",onClick:()=>H(K),children:"GERAR REGISTRO PROFISSIONAL"})]}),w==="NEW_PLAYER"&&s.jsxs("div",{children:[s.jsx("h3",{style:{color:"cyan"},children:"⚽ Inscrição de Atleta"}),s.jsx(_u,{value:y.nationality,onChange:v=>ee({...y,nationality:v})}),s.jsx("small",{children:"A nacionalidade define qual seleção você poderá representar."}),s.jsx("p",{style:{fontSize:12,color:"#aaa"},children:"Crie seu jogador. Você começará nos Agentes Livres."}),s.jsx("div",{className:"card",style:{border:"1px solid cyan",background:"rgba(0, 255, 255, 0.05)",marginBottom:15},children:s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12},children:[s.jsxs("span",{children:["OVR Inicial (Linha): ",s.jsx("b",{children:"45"})]}),s.jsxs("span",{children:["OVR Inicial (Goleiro): ",s.jsx("b",{children:"60"})]})]})}),s.jsx("input",{className:"input-field",value:y.name,onChange:v=>ee({...y,name:v.target.value}),placeholder:"Nome no Jogo (Ex: João Silva)"}),s.jsx("input",{className:"input-field",value:y.instagram,onChange:v=>ee({...y,instagram:v.target.value}),placeholder:"@ do seu Instagram (Para verificação)"}),s.jsx("input",{className:"input-field",type:"password",value:y.password,onChange:v=>ee({...y,password:v.target.value}),placeholder:"Crie uma Senha de Acesso"}),s.jsx("label",{style:{textAlign:"left",display:"block",color:"#aaa",fontSize:12},children:"Posição Inicial"}),s.jsx("select",{className:"input-field",value:y.position,onChange:v=>ee({...y,position:v.target.value}),children:Nu.map(v=>s.jsx("option",{value:v,children:v},v))}),s.jsxs("details",{children:[s.jsx("summary",{children:"Personalizar personagem em pixel art"}),s.jsx(Ou,{player:{pixelAppearance:y.pixelAppearance},onChange:v=>ee($=>({...$,pixelAppearance:v}))})]}),s.jsx("button",{className:"btn btn-blue",onClick:()=>J(y),children:"ENVIAR INSCRIÇÃO"})]}),N&&s.jsx("div",{className:"modal-overlay",children:s.jsxs("div",{className:"modal-content",children:[s.jsx("h3",{children:N.name}),s.jsx("input",{className:"input-field",type:"password",placeholder:"Senha",value:ue,onChange:v=>q(v.target.value)}),s.jsx("button",{className:"btn btn-green",onClick:Ae,children:"ENTRAR"}),s.jsx("button",{className:"btn",onClick:()=>B(null),children:"CANCELAR"})]})})]})},xu=({calendar:t})=>{if(!t||!t.date)return null;const[e,n,a]=t.date.split("-"),r=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][parseInt(n)-1],o=(t.events||[]).filter(u=>u.date>=t.date).sort((u,d)=>new Date(u.date)-new Date(d.date));return s.jsxs("div",{className:"card",style:{background:"linear-gradient(45deg, #1a1a1a, #001a00)",border:"1px solid var(--primary)",marginBottom:20,display:"flex",gap:15,alignItems:"stretch"},children:[s.jsxs("div",{style:{background:"#000",padding:"10px",borderRadius:8,textAlign:"center",minWidth:"80px",border:"1px solid #333",display:"flex",flexDirection:"column",justifyContent:"center"},children:[s.jsx("div",{style:{fontSize:10,color:"var(--primary)",textTransform:"uppercase",fontWeight:"bold"},children:r}),s.jsx("div",{style:{fontSize:30,fontWeight:"900",color:"#fff",lineHeight:1},children:a}),s.jsx("div",{style:{fontSize:10,color:"#888"},children:e})]}),s.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"},children:[s.jsxs("div",{style:{fontSize:11,color:"#aaa",marginBottom:5,fontWeight:"bold"},children:[s.jsx("i",{className:"fas fa-calendar-alt"})," PRÓXIMOS EVENTOS:"]}),o.length===0?s.jsx("div",{style:{fontSize:12,color:"#666",fontStyle:"italic"},children:"Nenhum evento agendado."}):s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4,maxHeight:"60px",overflowY:"auto"},children:o.slice(0,3).map((u,d)=>{const E=u.date===t.date;return s.jsxs("div",{style:{fontSize:11,display:"flex",gap:5,alignItems:"center",color:E?"gold":"#ddd"},children:[s.jsx("b",{style:{color:E?"gold":"var(--primary)"},children:E?"HOJE":`${u.date.split("-")[2]}/${u.date.split("-")[1]}`}),s.jsxs("span",{children:["- ",u.text]})]},d)})})]})]})},Lu={"4-3-3 OFENSIVO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"45%",l:"35%"},{t:"35%",l:"65%"},{t:"20%",l:"85%"},{t:"10%",l:"50%"},{t:"20%",l:"15%"}],"4-3-3 DEFENSIVO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"30%"},{t:"65%",l:"70%"},{t:"45%",l:"50%"},{t:"20%",l:"85%"},{t:"10%",l:"50%"},{t:"20%",l:"15%"}],"4-3-3 FALSO 9":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"45%",l:"30%"},{t:"45%",l:"70%"},{t:"20%",l:"85%"},{t:"30%",l:"50%"},{t:"20%",l:"15%"}],"4-3-3 POSSE":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"45%",l:"35%"},{t:"45%",l:"65%"},{t:"25%",l:"75%"},{t:"15%",l:"50%"},{t:"25%",l:"25%"}],"4-4-2 CLÁSSICO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"50%",l:"90%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"50%",l:"10%"},{t:"15%",l:"60%"},{t:"15%",l:"40%"}],"4-4-2 LOSANGO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"50%"},{t:"50%",l:"30%"},{t:"50%",l:"70%"},{t:"35%",l:"50%"},{t:"15%",l:"60%"},{t:"15%",l:"40%"}],"4-4-2 LINHA":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"65%"},{t:"40%",l:"35%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"4-4-1-1":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"55%",l:"90%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"55%",l:"10%"},{t:"30%",l:"50%"},{t:"12%",l:"50%"}],"4-2-3-1 LARGO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"50%"},{t:"30%",l:"85%"},{t:"15%",l:"50%"},{t:"30%",l:"15%"}],"4-2-3-1 ESTREITO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"50%"},{t:"40%",l:"75%"},{t:"40%",l:"25%"},{t:"15%",l:"50%"}],"4-1-4-1":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"50%"},{t:"45%",l:"85%"},{t:"45%",l:"60%"},{t:"45%",l:"40%"},{t:"45%",l:"15%"},{t:"15%",l:"50%"}],"4-1-2-1-2":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"68%",l:"50%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"38%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"4-2-2-2 (BRASIL)":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"70%"},{t:"40%",l:"30%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"4-2-4 OFENSIVO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"20%",l:"85%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"},{t:"20%",l:"15%"}],"4-5-1 RETRANCA":[{t:"90%",l:"50%"},{t:"78%",l:"85%"},{t:"82%",l:"65%"},{t:"82%",l:"35%"},{t:"78%",l:"15%"},{t:"65%",l:"35%"},{t:"65%",l:"65%"},{t:"55%",l:"50%"},{t:"50%",l:"85%"},{t:"50%",l:"15%"},{t:"25%",l:"50%"}],"4-3-2-1 (NATAL)":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"55%",l:"70%"},{t:"55%",l:"30%"},{t:"35%",l:"65%"},{t:"35%",l:"35%"},{t:"12%",l:"50%"}],"3-5-2 TÁTICO":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"50%",l:"90%"},{t:"50%",l:"10%"},{t:"35%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"3-4-3 (CRUYFF)":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"65%",l:"50%"},{t:"50%",l:"50%"},{t:"50%",l:"85%"},{t:"50%",l:"15%"},{t:"20%",l:"85%"},{t:"10%",l:"50%"},{t:"20%",l:"15%"}],"3-4-3 LINHA":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"55%",l:"90%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"55%",l:"10%"},{t:"15%",l:"85%"},{t:"10%",l:"50%"},{t:"15%",l:"15%"}],"3-4-1-2":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"55%",l:"90%"},{t:"55%",l:"10%"},{t:"35%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"3-6-1 CONTROLE":[{t:"90%",l:"50%"},{t:"82%",l:"50%"},{t:"82%",l:"75%"},{t:"82%",l:"25%"},{t:"65%",l:"35%"},{t:"65%",l:"65%"},{t:"50%",l:"90%"},{t:"50%",l:"65%"},{t:"50%",l:"35%"},{t:"50%",l:"10%"},{t:"20%",l:"50%"}],"3-3-1-3 (BIELSA)":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"65%",l:"50%"},{t:"50%",l:"65%"},{t:"50%",l:"35%"},{t:"35%",l:"50%"},{t:"15%",l:"85%"},{t:"10%",l:"50%"},{t:"15%",l:"15%"}],"3-1-4-2":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"65%",l:"50%"},{t:"50%",l:"85%"},{t:"50%",l:"60%"},{t:"50%",l:"40%"},{t:"50%",l:"15%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"5-4-1 ÔNIBUS":[{t:"90%",l:"50%"},{t:"78%",l:"90%"},{t:"82%",l:"70%"},{t:"82%",l:"50%"},{t:"82%",l:"30%"},{t:"78%",l:"10%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"55%",l:"85%"},{t:"55%",l:"15%"},{t:"25%",l:"50%"}],"5-3-2 CONTRA":[{t:"90%",l:"50%"},{t:"75%",l:"90%"},{t:"80%",l:"70%"},{t:"80%",l:"50%"},{t:"80%",l:"30%"},{t:"75%",l:"10%"},{t:"60%",l:"50%"},{t:"55%",l:"75%"},{t:"55%",l:"25%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"5-2-3 ALAS":[{t:"90%",l:"50%"},{t:"75%",l:"90%"},{t:"80%",l:"70%"},{t:"80%",l:"50%"},{t:"80%",l:"30%"},{t:"75%",l:"10%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"18%",l:"85%"},{t:"10%",l:"50%"},{t:"18%",l:"15%"}],"5-2-1-2":[{t:"90%",l:"50%"},{t:"75%",l:"90%"},{t:"80%",l:"70%"},{t:"80%",l:"50%"},{t:"80%",l:"30%"},{t:"75%",l:"10%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"38%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"WM (ANOS 30)":[{t:"92%",l:"50%"},{t:"80%",l:"75%"},{t:"82%",l:"50%"},{t:"80%",l:"25%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"45%",l:"65%"},{t:"45%",l:"35%"},{t:"25%",l:"85%"},{t:"15%",l:"50%"},{t:"25%",l:"15%"}],"2-3-5 (PIRÂMIDE)":[{t:"90%",l:"50%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"60%",l:"80%"},{t:"65%",l:"50%"},{t:"60%",l:"20%"},{t:"35%",l:"90%"},{t:"20%",l:"70%"},{t:"15%",l:"50%"},{t:"20%",l:"30%"},{t:"35%",l:"10%"}],"4-6-0 (SEM ATA)":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"45%",l:"85%"},{t:"45%",l:"15%"},{t:"30%",l:"65%"},{t:"30%",l:"35%"}],"1-1-8 (KAMIKAZE)":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"65%",l:"50%"},{t:"40%",l:"90%"},{t:"25%",l:"75%"},{t:"25%",l:"60%"},{t:"15%",l:"55%"},{t:"15%",l:"45%"},{t:"25%",l:"40%"},{t:"25%",l:"25%"},{t:"40%",l:"10%"}],"VÁRZEA (TUDO P/ FRENTE)":[{t:"90%",l:"50%"},{t:"80%",l:"70%"},{t:"80%",l:"30%"},{t:"65%",l:"50%"},{t:"50%",l:"50%"},{t:"30%",l:"85%"},{t:"15%",l:"70%"},{t:"10%",l:"50%"},{t:"15%",l:"30%"},{t:"25%",l:"50%"},{t:"30%",l:"15%"}],"VÁRZEA (VOLANTAÇO)":[{t:"90%",l:"50%"},{t:"78%",l:"85%"},{t:"82%",l:"65%"},{t:"82%",l:"35%"},{t:"78%",l:"15%"},{t:"60%",l:"80%"},{t:"60%",l:"60%"},{t:"60%",l:"40%"},{t:"60%",l:"20%"},{t:"35%",l:"50%"},{t:"15%",l:"50%"}]},ku=t=>t==="GOL"?"#E65100":["ZAG","LD","LE"].includes(t)?"#2979FF":["VOL","MC","MD","ME","MEI"].includes(t)?"#00E676":["PTD","PTE","ATA","SA"].includes(t)?"#FF1744":"#888",Du=de.lazy(()=>pe(()=>import("./Broadcast-DwZ-MLB1.js"),__vite__mapDeps([0,1,2]),import.meta.url).then(t=>({default:t.Broadcast}))),Mu=de.lazy(()=>pe(()=>import("./NationalTeams-xav28Oox.js"),__vite__mapDeps([3,1,2]),import.meta.url).then(t=>({default:t.NationalTeams}))),ju=de.lazy(()=>pe(()=>import("./AdminPanel-BISJFSDA.js"),__vite__mapDeps([4,1,5,2,6]),import.meta.url).then(t=>({default:t.AdminPanel}))),Fu=de.lazy(()=>pe(()=>import("./TeamDashboard-CtxIKqm7.js"),__vite__mapDeps([7,1,8,2]),import.meta.url).then(t=>({default:t.TeamDashboard}))),Vu=de.lazy(()=>pe(()=>import("./AssistantDashboard-DH1D_X51.js"),__vite__mapDeps([9,1,2]),import.meta.url).then(t=>({default:t.AssistantDashboard}))),Uu=de.lazy(()=>pe(()=>import("./VisitorDashboard-DAy56lSU.js"),__vite__mapDeps([10,1,2]),import.meta.url).then(t=>({default:t.VisitorDashboard}))),pt=de.lazy(()=>pe(()=>import("./LeagueTable-DE_qT3r-.js"),__vite__mapDeps([11,1,2]),import.meta.url).then(t=>({default:t.LeagueTable}))),Ti=de.lazy(()=>pe(()=>import("./MatchCenter-DXApAogt.js"),__vite__mapDeps([12,1,13,2]),import.meta.url).then(t=>({default:t.MatchCenter}))),Gu=de.lazy(()=>pe(()=>import("./TournamentHub-5skzN8O6.js"),__vite__mapDeps([14,1,13,2]),import.meta.url).then(t=>({default:t.TournamentHub}))),$u=de.lazy(()=>pe(()=>import("./Market-C6QctcU_.js"),__vite__mapDeps([15,1,5,8,2]),import.meta.url).then(t=>({default:t.Market}))),Hu=de.lazy(()=>pe(()=>import("./ShoppingScreen-CwpDNNFT.js"),__vite__mapDeps([16,1,2]),import.meta.url).then(t=>({default:t.ShoppingScreen}))),Bu=de.lazy(()=>pe(()=>import("./Ranking-CAr3S7sJ.js"),__vite__mapDeps([17,1,5,18,2]),import.meta.url).then(t=>({default:t.Ranking}))),zu=de.lazy(()=>pe(()=>import("./SocialHub-Bz6CkI47.js"),__vite__mapDeps([19,1,2]),import.meta.url).then(t=>({default:t.SocialHub}))),Wu=de.lazy(()=>pe(()=>import("./OffersScreen-DvrApEPe.js"),__vite__mapDeps([20,1,2]),import.meta.url).then(t=>({default:t.OffersScreen}))),qu=de.lazy(()=>pe(()=>import("./PublicServices-DLSQIy2v.js"),__vite__mapDeps([21,1,2]),import.meta.url).then(t=>({default:t.PublicServices}))),Ku=de.lazy(()=>pe(()=>import("./CompanyDashboard-iSIvX6jZ.js"),__vite__mapDeps([22,1,6,2]),import.meta.url).then(t=>({default:t.CompanyDashboard}))),Yu=de.lazy(()=>pe(()=>import("./PlayerDashboard-D6zKj-pe.js"),__vite__mapDeps([23,1,18,2]),import.meta.url).then(t=>({default:t.PlayerDashboard}))),Zu=de.lazy(()=>pe(()=>import("./CoachDashboard-DY9T9__B.js"),__vite__mapDeps([24,1,2]),import.meta.url).then(t=>({default:t.CoachDashboard}))),Ju=de.lazy(()=>pe(()=>import("./DoctorDashboard-wKCbwrlr.js"),__vite__mapDeps([25,1,2]),import.meta.url).then(t=>({default:t.DoctorDashboard}))),Xu=de.lazy(()=>pe(()=>import("./ScoutDashboard-nkgaA9bH.js"),__vite__mapDeps([26,1,5,2]),import.meta.url).then(t=>({default:t.ScoutDashboard}))),Qu=de.lazy(()=>pe(()=>import("./PlayerForm-D8N2apLO.js"),__vite__mapDeps([27,1,5,2]),import.meta.url).then(t=>({default:t.PlayerForm}))),eh=de.lazy(()=>pe(()=>import("./TeamRequestPlayerModal-DWbSBdqU.js"),__vite__mapDeps([28,1,5,2]),import.meta.url).then(t=>({default:t.TeamRequestPlayerModal}))),th=de.lazy(()=>pe(()=>import("./AdminPlayerModal-C7m47b9C.js"),__vite__mapDeps([29,1,2]),import.meta.url).then(t=>({default:t.AdminPlayerModal}))),nh=de.lazy(()=>pe(()=>import("./TrainingCenterManager-4-IXlM0Y.js"),__vite__mapDeps([30,1,2]),import.meta.url).then(t=>({default:t.TrainingCenterManager}))),ah=de.lazy(()=>pe(()=>import("./OfferForm-C62FUp_m.js"),__vite__mapDeps([31,1,18,5,2]),import.meta.url).then(t=>({default:t.OfferForm}))),ih=de.lazy(()=>pe(()=>import("./SettingsForm-cqdj7iiZ.js"),__vite__mapDeps([32,1,2]),import.meta.url).then(t=>({default:t.SettingsForm}))),bi=de.lazy(()=>pe(()=>import("./MatchPerformanceForm-DTOUUExn.js"),__vite__mapDeps([33,1,2]),import.meta.url).then(t=>({default:t.MatchPerformanceForm}))),sh=de.lazy(()=>pe(()=>import("./TeamStandingsEditor-Dswjpycg.js"),__vite__mapDeps([34,1,2]),import.meta.url).then(t=>({default:t.TeamStandingsEditor}))),rh=de.lazy(()=>pe(()=>import("./PrizeEditor-DTjEuwJY.js"),__vite__mapDeps([35,1,2]),import.meta.url).then(t=>({default:t.PrizeEditor}))),oh=de.lazy(()=>pe(()=>import("./AwardsManager-DQeFgRB8.js"),__vite__mapDeps([36,1,2]),import.meta.url).then(t=>({default:t.AwardsManager}))),lh=de.lazy(()=>pe(()=>import("./TournamentManagerModal-3igF9lMa.js"),__vite__mapDeps([37,1,2]),import.meta.url).then(t=>({default:t.TournamentManagerModal}))),ch=de.lazy(()=>pe(()=>import("./StatsEditor-ClQC93EO.js"),__vite__mapDeps([38,1,2]),import.meta.url).then(t=>({default:t.StatsEditor}))),dh=de.lazy(()=>pe(()=>import("./MatchManagerForm-C-hpu_NY.js"),__vite__mapDeps([39,1,2]),import.meta.url).then(t=>({default:t.MatchManagerForm})));function uh(){var Va,Ua,Ga,$a,Ha,Ba,za,Wa,qa,Ka,Ya,Za,Ja;const[t,e]=W.useState(null),[n,a]=W.useState(!0),[i,r]=W.useState(!1),[o,u]=W.useState([]),[d,E]=W.useState([]),[I,g]=W.useState([]),[_,H]=W.useState([]),[J,V]=W.useState([]),[ae,ce]=W.useState({marketOpen:!0}),[ne,P]=W.useState({date:new Date().toISOString().split("T")[0],events:[]}),[k,C]=W.useState([]),[f,T]=W.useState([]),[m,R]=W.useState([]),[w,l]=W.useState([]),[p,A]=W.useState([]),[b,x]=W.useState([]),[D,O]=W.useState([]),[N,B]=W.useState([]),[z,re]=W.useState([]),[Q,oe]=W.useState([]),[ue,q]=W.useState([]),[G,j]=W.useState("HOME"),[K,S]=W.useState("LIGAS"),[y,ee]=W.useState(null),L=c=>{if(!Xr(t,c)){alert("Você não tem permissão para esta função.");return}ee(c)},[X,Ae]=W.useState(!1),[v,$]=W.useState(!1),[Z,Ce]=W.useState(null),[se,le]=W.useState([]),[ge,ve]=W.useState(null);W.useEffect(()=>{if(bn(t))return Jd(t,c=>{e(c),ee(null)},()=>{kt(),e(null),ee(null),rt.signOut()})},[t==null?void 0:t.type,(Va=t==null?void 0:t.data)==null?void 0:Va.id]),W.useEffect(()=>{let c=!0;const M=Wr();return M?h.collection(qr[M.type]).doc(M.data.id).get().then(U=>{if(!c)return;if(!U.exists||["BLOCKED","PENDING"].includes(U.data().status)){kt();return}const ie={type:M.type,data:{...U.data(),id:U.id}};e(ie),Yn(ie),j(Li(ie.type,Xn(ie,"screen",Zn("savedScreen"))));const he=Xn(ie,"matchesTab","LIGAS");S(["LIGAS","ESTADUAIS","COPAS"].includes(he)?he:"LIGAS")}).catch(U=>{console.error("Não foi possível restaurar a sessão:",U.code),c&&r(!0)}).finally(()=>{c&&a(!1)}):a(!1),()=>{c=!1}},[]),W.useEffect(()=>{G&&t&&(Jn("savedScreen",G),ti(t,"screen",G))},[G,(Ua=t==null?void 0:t.data)==null?void 0:Ua.id,t==null?void 0:t.type]),W.useEffect(()=>{t&&ti(t,"matchesTab",K)},[K,(Ga=t==null?void 0:t.data)==null?void 0:Ga.id,t==null?void 0:t.type]);const fe=Ru(t==null?void 0:t.type,G,y==null?void 0:y.type);we("teams",u),we("players",E),we("newspapers",C),we("journalists",T),we("companies",R),we("users",B,!0,null,null,!0),we("financeRequests",V,fe.financeRequests),we("products",l,fe.products),we("sponsorships",A,fe.sponsorships),we("awards",x,fe.awards),we("tournaments",O,fe.tournaments),we("hallOfFame",re,fe.hallOfFame,"season"),we("matches",oe,fe.matches),we("posts",q,fe.posts,"date",50),we("news",H,fe.news,"date",50),W.useEffect(()=>h.collection("config").doc("system").onSnapshot(c=>ce(c.exists?c.data():{marketOpen:!0}),c=>console.error("Configuração indisponível:",c.code)),[]),W.useEffect(()=>{if(fe.calendar)return h.collection("config").doc("calendar").onSnapshot(c=>{c.exists&&P(c.data())},c=>console.error("Calendário indisponível:",c.code))},[fe.calendar]),W.useEffect(()=>{const c=Number(Zn("lastRead")||0);_.length&&_[0].date>c&&$(!0)},[_]),W.useEffect(()=>{if(!t||t.type==="ADMIN"||t.type==="VISITOR"){g([]);return}const c=h.collection("offers").where("recipientId","==",t.data.id).onSnapshot(M=>{const U=M.docs.map(ie=>({...ie.data(),id:ie.id}));g(U)},M=>{console.log("Erro ao buscar ofertas:",M)});return()=>c()},[($a=t==null?void 0:t.data)==null?void 0:$a.id,t==null?void 0:t.type]),W.useEffect(()=>{if(!t||!t.data||t.type==="VISITOR"){le([]);return}ve(null);let c=h.collection("sales");t.type==="COMPANY"?c=c.where("companyId","==",t.data.id):["PLAYER","COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t.type)?c=c.where("buyerId","==",t.data.id):c=c.orderBy("date","desc").limit(300);const M=c.onSnapshot({includeMetadataChanges:!0},U=>{const ie=U.docs.map(he=>({id:he.id,...he.data()})).sort((he,Fn)=>Fn.date-he.date);le(ie),ve(U.metadata.fromCache?null:t.data.id)},U=>{console.error("Erro ao carregar mochila:",U)});return()=>M()},[(Ha=t==null?void 0:t.data)==null?void 0:Ha.id,t==null?void 0:t.type]),W.useEffect(()=>{if(!t||t.type!=="PLAYER"||!se||ge!==t.data.id)return;const M=se.filter(U=>U.buyerId===t.data.id).reduce((U,ie)=>{if(["VEICULO","IMOVEL","TECNOLOGIA","LUXO"].includes(ie.cat)){const he=parseInt(ie.fameGained)||0;return U+he}return U},0);typeof M=="number"&&(t.data.fame||0)!==M&&(console.log(`Corrigindo Fama: De ${t.data.fame} para ${M}`),h.collection("players").doc(t.data.id).update({fame:M}).catch(U=>console.error("Erro ao sincronizar fama:",U)),e(U=>({...U,data:{...U.data,fame:M}})))},[se,ge,(Ba=t==null?void 0:t.data)==null?void 0:Ba.id]),W.useEffect(()=>{if((t==null?void 0:t.type)==="USER"||(t==null?void 0:t.type)==="PLAYER"){const c=t.type==="USER"?o.find(M=>M.id===t.data.id):d.find(M=>M.id===t.data.id);c&&c!==t.data&&e(M=>({...M,data:c}))}if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t==null?void 0:t.type)){const c=N.find(M=>M.id===t.data.id);c&&c!==t.data&&e(M=>({...M,data:c}))}if((t==null?void 0:t.type)==="COMPANY"){const c=m.find(M=>M.id===t.data.id);c&&(c.status==="BLOCKED"?(alert("🚫 Sua empresa foi bloqueada ou faliu."),window.location.reload()):c!==t.data&&e(M=>({...M,data:c})))}},[o,d,m,N,(za=t==null?void 0:t.data)==null?void 0:za.id,t==null?void 0:t.type]);const Le=de.useRef(!1),[_e,Ee]=W.useState([]),{postNews:et,handleHospitalDonation:tn,login:nn,handleSaveMatch:zs,handleDeleteMatch:_t,handleFinanceApprove:Ws,loginAdmin:qs,createTeam:Ks,createPlayerAccount:Ys,createStaff:Zs,createNewspaper:Js,createJournalist:Xs,handleFireCoach:Qs,handleCoachSelfActions:an,handleSendCoachOffer:er,handleCounterCoachOffer:Da,handleFinalizeCoachContract:wt,adminAction:tr,generateFixtures:nr,handleSeasonTurnAdvanced:ar,createCompany:ir,saveProduct:sr,requestSponsorship:rr,processSponsorship:or,buyProduct:lr,handleCoachIndication:cr,saveTactics:dr,handleCoachUseItem:Mn,handleUseItem:ur,resetDatabase:hr,approveTeam:pr,deleteTeam:mr,deletePaper:fr,deleteJournalist:gr,updateBalance:Ar,withdrawMoney:Er,savePlayer:yr,handleAcceptCoachOffer:hh,handleRejectCoachOffer:ph,handleUpdateCoachSalary:vr,handleAssistantRegen:Ir,handleCoachTrain:Ma,handleEvolveCoachPerk:jn,sendOffer:Sr,acceptOffer:Tr,rejectOffer:ut,renewContract:br,handleSocialPost:Cr,handleSocialLike:Rr,handleSocialDelete:Or,updateTeamStats:_r,saveMatchStats:ja,handlePlayerSoloTrain:Fa,handlePlayerActions:wr,subscribeToChat:Nr,sendChatMessage:Pr,toggleFollow:xr}=bu({setLoading:Ae,teams:o,players:d,companies:m,coaches:N,papers:k,journalists:f,setUser:e,setScreen:j,setModal:L,conf:ae,sps:p,user:t,products:w,buyingRef:Le,setSales:le,posts:ue,setChatMessages:Ee});return i?s.jsxs("div",{className:"container",role:"alert",children:[s.jsx("p",{children:"Não foi possível recuperar sua sessão. Verifique a conexão e tente novamente."}),s.jsx("button",{className:"btn btn-primary",onClick:()=>window.location.reload(),children:"TENTAR NOVAMENTE"}),s.jsx("button",{className:"btn",onClick:()=>{kt(),r(!1)},children:"VOLTAR AO LOGIN"})]}):X||n?s.jsx("div",{style:{display:"grid",placeItems:"center",height:"100vh"},children:"Carregando..."}):t?s.jsxs("div",{children:[s.jsxs("div",{className:"header",children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[t.type==="USER"&&t.data.logo&&s.jsx("img",{src:t.data.logo,style:{width:40,height:40,borderRadius:"50%",border:"2px solid var(--primary)",objectFit:"cover"}}),s.jsxs("div",{children:[s.jsx("div",{style:{fontWeight:"900",fontSize:16},children:t.type==="USER"?t.data.name:((Wa=t.data)==null?void 0:Wa.name)||t.type}),s.jsx("div",{className:"dev-credits",style:{textAlign:"left",margin:0},children:"Desenvolvido por: Nathan Reis | v2.5.3"})]})]}),s.jsxs("div",{style:{display:"flex",gap:15,alignItems:"center"},children:[["USER","PLAYER","COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t.type)&&s.jsxs("div",{onClick:()=>j("OFFERS"),style:{position:"relative",cursor:"pointer",padding:"5px",display:"flex",alignItems:"center"},children:[s.jsx("i",{className:"fas fa-bell",style:{fontSize:"20px",color:(I||[]).some(c=>c.recipientId===t.data.id&&(c.status==="PENDING"||c.status==="COUNTERED"))?"var(--warning)":"#666",transition:"0.3s"}}),(I||[]).some(c=>c.recipientId===t.data.id&&(c.status==="PENDING"||c.status==="COUNTERED"))&&s.jsx("span",{className:"pulse",style:{position:"absolute",top:"2px",right:"2px",background:"red",borderRadius:"50%",width:"10px",height:"10px",border:"2px solid var(--bg-card)"}})]}),["USER","COMPANY","PLAYER","COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t.type)&&s.jsx("div",{style:{color:"var(--primary)",fontWeight:"bold",marginLeft:10},children:te(t.data.balance)}),t.type==="USER"&&s.jsx("i",{className:"fas fa-cog",style:{cursor:"pointer",marginLeft:10},onClick:()=>L({type:"SETTINGS",data:t.data})}),s.jsx("i",{className:"fas fa-sign-out-alt",style:{cursor:"pointer",marginLeft:10},onClick:()=>{confirm("Deseja realmente sair e trocar de conta?")&&(kt(),rt.signOut().finally(()=>window.location.reload()))}})]})]}),s.jsxs("div",{className:"container",children:[G!=="BROADCAST"&&s.jsx("button",{className:"btn btn-green pixel-feature",onClick:()=>j("BROADCAST"),children:"📺 MATO REAL TV — AMISTOSOS"}),G==="BROADCAST"&&s.jsx(Du,{user:t,teams:o,players:d,onBack:()=>j(mn(t.type))}),G!=="LOGIN"&&s.jsx(xu,{calendar:ne}),G==="NATIONAL_TEAMS"&&s.jsx(Mu,{user:t,players:d,coaches:N,onBack:()=>j(mn(t.type))}),G==="HOME"&&t.type==="ADMIN"&&s.jsx(ju,{onNationalTeams:()=>j("NATIONAL_TEAMS"),onCompetitions:()=>j("MATCHES"),user:t,matches:Q,tourns:D,handleDeleteMatch:_t,setModal:L,teams:o,papers:k,journalists:f,companies:m,reqs:J,config:{...ae,calendar:ne},coaches:N,sps:p,players:d,onAct:tr,onGenFixtures:nr,onTurnSeasonAdvanced:ar,onPost:(c,M,U)=>et(`📢 **${c}**
${M}`,U),onApprove:Ws,onReject:c=>h.collection("financeRequests").doc(c).delete(),onEditT:c=>{Ce(c),j("ADMIN_TEAM")},onApproveTeam:pr,onUpdateBal:Ar,onDeleteTeam:mr,onApprovePaper:async c=>{await h.collection("newspapers").doc(c).update({status:"ACTIVE"}),alert("Jornal Aprovado com sucesso!")},onDeletePaper:fr,onDeleteJourno:gr,onRejectPaper:async c=>{await h.collection("newspapers").doc(c).delete(),alert("Jornal Recusado/Excluído!")},onConfig:c=>L({type:"SETTINGS",data:c}),onReset:hr,onApproveComp:async c=>{await h.collection("companies").doc(c).update({status:"ACTIVE"}),alert("Empresa Aprovada!")},onDeleteComp:async c=>{confirm("Excluir Empresa?")&&await h.collection("companies").doc(c).delete()},onUpdateCompBal:async(c,M)=>{await h.collection("companies").doc(c).update({balance:parseFloat(M)}),alert("Saldo Alterado!")},onGenAttrs:async()=>{if(!confirm("Isso vai gerar atributos para TODOS os jogadores que não têm. Continuar?"))return;Ae(!0);const c=h.batch();let M=0;d.forEach(U=>{if(!U.attributes){const ie=vn(U.position||"ATA",U.overall||60);c.update(h.collection("players").doc(U.id),{attributes:ie}),M++}}),await c.commit(),Ae(!1),alert(`Atributos gerados para ${M} jogadores!`)}}),G==="HOME"&&t.type==="USER"&&s.jsxs("div",{children:[s.jsx(Fu,{team:t.data,players:d.filter(c=>c.teamId===t.data.id),staff:N.filter(c=>c.teamId===t.data.id&&c.status==="ACTIVE"),onFireCoach:Qs,onRenewCoach:c=>L({type:"OFFER",data:c}),isVisitor:!1,setModal:L,onEdit:c=>L({type:"PLAYER",data:c}),onAdd:()=>L({type:"PLAYER",data:{teamId:t.data.id}})}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"user-home-view"),(G==="HOME"||G==="ASSISTANT_DASH")&&t.type==="ASSISTANT"&&s.jsxs("div",{children:[s.jsx(Vu,{assistant:t.data,team:o.find(c=>c.id===t.data.teamId),players:d.filter(c=>c.teamId===t.data.teamId),offers:I,sales:se,onUseItem:Mn,onTrainRegen:Ir,onSelfAction:(c,M)=>{c==="ACCEPT_OFFER"&&wt(M.offer),c==="REJECT_OFFER"&&ut(M.offer),an(c,M)},onEvolvePerk:jn,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"assistant-home-container"),G==="HOME"&&t.type==="VISITOR"&&s.jsx("div",{children:s.jsx(Uu,{players:d,teams:o})}),G==="PRESS_DASH"&&(t.type==="PRESS"||t.type==="PRESS_WORKER")&&s.jsxs("div",{children:[s.jsxs("h3",{children:["Painel de Imprensa (",t.data.name,")"]}),s.jsxs("div",{className:"card",children:[s.jsx("button",{className:"btn btn-blue",onClick:()=>L({type:"POST_NEWS"}),children:"ESCREVER NOTÍCIA"}),s.jsx("button",{className:"btn btn-purple",onClick:()=>L({type:"MATCH_PERFORMANCE"}),children:"LANÇAR SÚMULA (XP)"}),s.jsx("button",{className:"btn btn-gold",onClick:()=>L({type:"TEAM_TABLE"}),children:"EDITAR TABELA"})]}),t.type==="PRESS"&&f.filter(c=>c.newspaperId===t.data.id&&c.status==="PENDING").map(c=>s.jsxs("div",{className:"card",children:[c.name,s.jsx("button",{className:"btn btn-green",onClick:async()=>{await h.collection("journalists").doc(c.id).update({status:"ACTIVE"}),alert("Jornalista aprovado!")},children:"APROVAR"})]},c.id))]}),G==="MATCHES"&&s.jsxs("div",{style:{paddingBottom:60},children:[s.jsxs("div",{style:{display:"flex",gap:5,marginBottom:20,justifyContent:"center",overflowX:"auto"},children:[s.jsx("button",{className:`btn ${K==="LIGAS"?"btn-blue":"btn-ghost"}`,onClick:()=>S("LIGAS"),style:{padding:"10px 5px",fontSize:10},children:"NACIONAIS"}),s.jsx("button",{className:`btn ${K==="ESTADUAIS"?"btn-purple":"btn-ghost"}`,onClick:()=>S("ESTADUAIS"),style:{padding:"10px 5px",fontSize:10},children:"🗺️ ESTADUAIS"}),s.jsx("button",{className:`btn ${K==="COPAS"?"btn-cyan":"btn-ghost"}`,onClick:()=>S("COPAS"),style:{borderColor:"cyan",color:K==="COPAS"?"#000":"cyan",background:K==="COPAS"?"cyan":"transparent",padding:"10px 5px",fontSize:10},children:"🏆 COPAS"})]}),K==="LIGAS"&&s.jsxs("div",{className:"animate-in",children:[s.jsx("h2",{style:{color:"var(--primary)",textAlign:"center",marginTop:0},children:"Campeonato Mato Real"}),s.jsx("div",{style:{marginBottom:20},children:s.jsx(pt,{teams:o,serie:"A",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})})}),s.jsxs("details",{open:!0,children:[s.jsx("summary",{style:{padding:10,background:"#333",borderRadius:5,cursor:"pointer",fontWeight:"bold",marginBottom:10},children:"Divisões de Acesso (B, C, D)"}),s.jsxs("div",{style:{display:"grid",gap:20},children:[s.jsx(pt,{teams:o,serie:"B",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})}),s.jsx(pt,{teams:o,serie:"C",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})}),s.jsx(pt,{teams:o,serie:"D",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})})]})]}),s.jsxs("div",{style:{marginTop:30,border:"2px dashed gold",borderRadius:8,overflow:"hidden"},children:[s.jsx("div",{style:{background:"gold",color:"black",padding:"10px",textAlign:"center",fontWeight:"900",textTransform:"uppercase",letterSpacing:"1px"},children:"🚜 O Terrão (Várzea)"}),s.jsx("div",{style:{padding:5,background:"rgba(255, 215, 0, 0.05)"},children:s.jsx(pt,{teams:o,serie:"VARZEA",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})})})]}),s.jsx("hr",{style:{borderColor:"#333",margin:"20px 0"}}),s.jsx(Ti,{matches:Q,teams:o,isAdmin:Ye(t,"competitions"),onCreateMatch:(c,M)=>L({type:"MATCH_MANAGER",data:{serie:c,round:M,homeId:"",awayId:"",scoreHome:0,scoreAway:0,status:"PENDING"}}),onEditMatch:c=>L({type:"MATCH_MANAGER",data:c}),onDeleteMatch:c=>_t(c),onReportMatch:c=>{t.type.includes("PRESS")||Ye(t,"competitions")?L({type:"MATCH_PERFORMANCE",data:{match:c,player:null}}):alert("Apenas imprensa/admin lança súmula.")}})]}),K==="ESTADUAIS"&&s.jsxs("div",{className:"animate-in",children:[s.jsx("h2",{style:{color:"var(--purple)",textAlign:"center",marginTop:0},children:"🗺️ Campeonatos Estaduais"}),s.jsx("p",{style:{textAlign:"center",fontSize:11,color:"#aaa"},children:"Disputa entre todos os clubes da mesma região, independente de divisão!"}),ka.map(c=>{const M=Q.filter(U=>U.isEstadual&&U.estado===c);return s.jsxs("details",{style:{marginBottom:10},children:[s.jsxs("summary",{style:{padding:15,background:"#1a1a1a",borderRadius:5,cursor:"pointer",fontWeight:"bold",border:"1px solid var(--purple)",color:"var(--purple)"},children:["📍 Campeonato ",c]}),s.jsxs("div",{style:{padding:"10px 0"},children:[s.jsx(pt,{teams:o,serie:"ESTADUAL",estado:c,onInspectTeam:U=>L({type:"VIEW_LINEUP",data:U})}),s.jsxs("div",{style:{marginTop:15},children:[s.jsxs("b",{style:{color:"#aaa",fontSize:11},children:["JOGOS DA RODADA (",c,"):"]}),M.length===0?s.jsx("p",{style:{fontSize:11,color:"#666"},children:"Nenhum jogo gerado ainda."}):s.jsx("div",{style:{marginTop:10},children:s.jsx(Ti,{matches:Q.filter(U=>U.isEstadual&&U.estado===c),teams:o,isAdmin:Ye(t,"competitions"),onCreateMatch:()=>alert("Jogos estaduais são gerados automaticamente."),onEditMatch:U=>L({type:"MATCH_MANAGER",data:U}),onDeleteMatch:U=>_t(U),onReportMatch:U=>{t.type.includes("PRESS")||Ye(t,"competitions")?L({type:"MATCH_PERFORMANCE",data:{match:U,player:null}}):alert("Apenas imprensa/admin lança súmula.")}})})]})]})]},c)})]}),K==="COPAS"&&s.jsx("div",{className:"animate-in",children:s.jsx(Gu,{tournaments:D,matches:Q,players:d,user:t,teams:o,onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c}),onCreateMatch:c=>L({type:"MATCH_MANAGER",data:{serie:c,round:1,homeId:"",awayId:"",scoreHome:0,scoreAway:0,status:"PENDING"}}),onEditMatch:c=>L({type:"MATCH_MANAGER",data:c}),onDeleteMatch:c=>_t(c),onReportMatch:c=>L({type:"MATCH_PERFORMANCE",data:{match:c,player:null}})})})]}),G==="MARKET"&&s.jsx($u,{user:t,me:(qa=t.data)==null?void 0:qa.id,teams:o,players:d,coaches:N,open:ae.marketOpen,isVis:t.type==="VISITOR"||t.type==="COACH",onIndicate:cr,onNeg:c=>L({type:"OFFER",data:c}),onPayClause:async c=>{const M=o.find(he=>he.id===t.data.id),U=o.find(he=>he.id===c.teamId);if(M.balance<c.clause)return alert("Saldo insuficiente!");if(!confirm(`Pagar multa de ${te(c.clause)} por ${c.name}?`))return;const ie=h.batch();ie.update(h.collection("teams").doc(M.id),{balance:M.balance-c.clause}),ie.update(h.collection("teams").doc(U.id),{balance:U.balance+c.clause}),ie.update(h.collection("players").doc(c.id),{teamId:M.id,status:"NAO_A_VENDA",contract:3,history:Y.firestore.FieldValue.arrayUnion({date:Date.now(),from:U.name,to:M.name,type:"MULTA",value:c.clause})}),await ie.commit(),et(`🚨 **MULTA PAGA!**
O **${M.name}** pagou a multa de **${c.name}**!`,"transfer"),alert("Contratado via multa!")},onPre:async c=>{const M=o.find(U=>U.id===t.data.id);confirm(`Assinar pré-contrato com ${c.name}?`)&&(await h.collection("players").doc(c.id).update({preContract:{teamId:M.id,teamName:M.name},mood:"🤩"}),et(`📝 **PRÉ-CONTRATO**
**${c.name}** reforçará o **${M.name}** na próxima temporada!`,"transfer"),alert("Pré-contrato assinado!"))},onHireCoach:c=>L({type:"HIRE_COACH",data:c})}),G==="SHOPPING"&&s.jsx(Hu,{products:w,companies:m,user:t,players:d,teams:o,onBuy:lr,onDeleteProd:async c=>{confirm("Admin: Excluir produto?")&&await h.collection("products").doc(c).delete()}}),G==="SPONSORSHIPS"&&t.type==="USER"&&s.jsxs("div",{children:[s.jsx("h3",{children:"Buscar Patrocínio"}),s.jsx("p",{style:{fontSize:11,color:"#aaa"},children:"Envie propostas semanais para as empresas."}),m.filter(c=>c.status==="ACTIVE").map(c=>s.jsxs("div",{className:"card",children:[s.jsx("b",{children:c.name})," ",s.jsxs("small",{children:["(",(Dn[c.companyType]||{}).label,")"]}),s.jsx("div",{style:{display:"flex",gap:5,marginTop:5},children:s.jsx("button",{className:"btn btn-purple",onClick:()=>{const M=prompt("Valor Semanal pedido (₣):");M&&rr(c.id,M)},children:"PEDIR PATROCÍNIO"})})]},c.id)),s.jsx("hr",{style:{borderColor:"#333"}}),s.jsx("h4",{children:"Meus Contratos"}),p.filter(c=>c.teamId===t.data.id).length===0&&s.jsx("p",{style:{color:"#666"},children:"Sem contratos."}),p.filter(c=>c.teamId===t.data.id).map(c=>s.jsxs("div",{className:"card",style:{borderLeft:`4px solid ${c.status==="ACTIVE"?"var(--primary)":"#666"}`},children:[s.jsx("b",{children:c.companyName}),s.jsx("br",{}),"Valor: ",te(c.value),"/sem"," ",s.jsxs("small",{children:["(",c.status==="PENDING"?"Aguardando":"Ativo",")"]}),c.status==="ACTIVE"&&s.jsx("button",{className:"btn btn-red",style:{width:"auto",marginTop:5},onClick:()=>{confirm("Encerrar contrato de patrocínio?")&&h.collection("sponsorships").doc(c.id).delete()},children:"ENCERRAR"})]},c.id))]}),G==="RANKING"&&s.jsx(Bu,{teams:o,players:d,sales:se,hallOfFame:z}),G==="NEWS"&&s.jsxs("div",{children:[s.jsx("h3",{children:"Notícias"}),_.map(c=>s.jsxs("div",{className:`news-card news-${c.type}`,children:[c.text,s.jsx("br",{}),s.jsx("small",{style:{color:"#666"},children:new Date(c.date).toLocaleString()})]},c.id))]}),G==="SOCIAL"&&s.jsx(zu,{user:t,posts:ue,onPost:Cr,onLike:Rr,onDeletePost:Or,onSendChat:Pr,onSubChat:Nr,messages:_e,onFollow:xr}),G==="OFFERS"&&s.jsx(Wu,{user:t,offers:I,teams:o,players:d,setModal:L,onAccept:Tr,onReject:ut,onCounter:c=>L({type:"OFFER",data:{...d.find(M=>M.id===c.playerId),oldOffer:c}}),onCoachAccept:wt,onCoachReject:ut,onCoachCounter:Da}),G==="PUBLIC_SERVICES"&&s.jsx(qu,{players:d,coaches:N,user:t,onDonate:tn,onOperate:()=>{t.type==="DOCTOR"?j("DOCTOR_DASH"):alert("As cirurgias são realizadas pelo médico no painel médico. O fundo hospitalar deste jogador permanece disponível para o procedimento.")}}),(G==="COMPANY_DASH"||G==="COMPANY_HOME")&&t.type==="COMPANY"&&s.jsx(Ku,{company:t.data,products:w.filter(c=>c.companyId===t.data.id),sps:p.filter(c=>c.companyId===t.data.id),sales:se||[],teams:o,onSaveProd:sr,onDeleteProd:async c=>{confirm("Excluir produto?")&&await h.collection("products").doc(c).delete()},onProcessSpons:or}),G==="PLAYER_DASH"&&t.type==="PLAYER"&&s.jsxs("div",{children:[s.jsx(Yu,{user:t,player:d.find(c=>c.id===t.data.id)||t.data,team:o.find(c=>c.id===t.data.teamId),sales:se||[],onAction:wr,onUpdatePassword:async c=>{await h.collection("players").doc(t.data.id).update({password:c}),alert("Senha alterada!")},onTrainSolo:Fa,onUseItem:ur,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"player-dash-container"),(G==="HOME"||G==="COACH_DASH")&&t.type==="COACH"&&s.jsxs("div",{children:[s.jsx(Zu,{coach:t.data,team:o.find(c=>c.id===t.data.teamId),players:d.filter(c=>c.teamId===t.data.teamId),offers:I,sales:se,onTrain:Ma,onEvolvePerk:jn,onAddAffinity:async c=>{await h.collection("users").doc(t.data.id).update({affinities:Y.firestore.FieldValue.arrayUnion(c),pendingAffinity:Y.firestore.FieldValue.increment(-1)}),alert("Nova afinidade desbloqueada!")},onAcceptOffer:wt,onRejectOffer:ut,onCounterOffer:Da,onUpdateSalary:vr,onSelfAction:an,onSaveTactics:dr,onUseItem:Mn,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"coach-home-container"),(G==="HOME"||G==="DOCTOR_DASH")&&t.type==="DOCTOR"&&s.jsxs("div",{children:[s.jsx(Ju,{doctor:t.data,team:o.find(c=>c.id===t.data.teamId),players:d.filter(c=>c.teamId===t.data.teamId),offers:I,sales:se,onUseItem:Mn,onSelfAction:(c,M)=>{c==="ACCEPT_OFFER"&&wt(M.offer),c==="REJECT_OFFER"&&ut(M.offer),an(c,M)},onEvolvePerk:jn,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"doctor-home-container"),(G==="HOME"||G==="SCOUT_DASH")&&t.type==="SCOUT"&&s.jsxs("div",{children:[s.jsx(Xu,{scout:t.data,team:o.find(c=>c.id===t.data.teamId),players:d.filter(c=>c.teamId===t.data.teamId),setModal:L,onSelfAction:(c,M)=>{c==="ACCEPT_OFFER"&&wt(M.offer),c==="REJECT_OFFER"&&ut(M.offer),an(c,M)}}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"scout-home-container"),s.jsxs("div",{className:"scroll-hint",children:["Deslize ",s.jsx("i",{className:"fas fa-arrow-right"})]}),s.jsxs("div",{className:"bottom-nav",children:[s.jsxs("div",{className:`nav-item ${["HOME","COMPANY_HOME","COMPANY_DASH","PLAYER_DASH","COACH_DASH","DOCTOR_DASH","ASSISTANT_DASH","SCOUT_DASH","PRESS_DASH"].includes(G)?"active":""}`,onClick:()=>{t.type.includes("PRESS")?j("PRESS_DASH"):t.type==="COMPANY"?j("COMPANY_HOME"):t.type==="PLAYER"?j("PLAYER_DASH"):t.type==="COACH"?j("COACH_DASH"):t.type==="DOCTOR"?j("DOCTOR_DASH"):t.type==="ASSISTANT"?j("ASSISTANT_DASH"):t.type==="SCOUT"?j("SCOUT_DASH"):j("HOME")},children:[s.jsx("i",{className:"fas fa-home"}),s.jsx("span",{children:"INÍCIO"})]}),s.jsxs("div",{className:`nav-item ${G==="MATCHES"?"active":""}`,onClick:()=>j("MATCHES"),children:[s.jsx("i",{className:"fas fa-futbol"}),s.jsx("span",{children:"JOGOS"})]}),s.jsxs("div",{className:`nav-item ${G==="SOCIAL"?"active":""}`,onClick:()=>j("SOCIAL"),children:[s.jsx("i",{className:"fas fa-camera"}),s.jsx("span",{children:"SOCIAL"})]}),s.jsxs("div",{className:`nav-item ${G==="PUBLIC_SERVICES"?"active":""}`,onClick:()=>j("PUBLIC_SERVICES"),children:[s.jsx("i",{className:"fas fa-city"}),s.jsx("span",{children:"CIDADE"})]}),s.jsxs("div",{className:`nav-item ${G==="MARKET"?"active":""}`,onClick:()=>j("MARKET"),children:[s.jsx("i",{className:"fas fa-globe"}),s.jsx("span",{children:"MERCADO"})]}),t.type!=="COMPANY"&&s.jsxs("div",{className:`nav-item ${G==="SHOPPING"?"active":""}`,onClick:()=>j("SHOPPING"),children:[s.jsx("i",{className:"fas fa-shopping-bag"}),s.jsx("span",{children:"SHOP"})]}),t.type==="USER"&&s.jsxs("div",{className:`nav-item ${G==="SPONSORSHIPS"?"active":""}`,onClick:()=>j("SPONSORSHIPS"),children:[s.jsx("i",{className:"fas fa-handshake"}),s.jsx("span",{children:"PATRO"})]}),t.type!=="COMPANY"&&s.jsxs("div",{className:`nav-item ${G==="RANKING"?"active":""}`,onClick:()=>j("RANKING"),children:[s.jsx("i",{className:"fas fa-trophy"}),s.jsx("span",{children:"RANK"})]}),s.jsxs("div",{className:`nav-item ${G==="NEWS"?"active":""}`,onClick:()=>{j("NEWS"),$(!1),Jn("lastRead",Date.now())},children:[s.jsx("i",{className:"fas fa-newspaper"}),s.jsx("span",{children:"NEWS"})]}),s.jsxs("div",{role:"button",tabIndex:0,className:`nav-item ${G==="NATIONAL_TEAMS"?"active":""}`,onClick:()=>j("NATIONAL_TEAMS"),onKeyDown:c=>{c.key==="Enter"&&j("NATIONAL_TEAMS")},children:[s.jsx("span",{children:"🌍"}),s.jsx("span",{children:"SELEÇÕES"})]})]}),y&&s.jsx("div",{className:"modal-overlay",onClick:c=>c.target===c.currentTarget&&L(null),children:s.jsxs("div",{className:"modal-content",children:[y.type==="PLAYER"&&s.jsx(Qu,{initial:y.data,onSave:yr,onDelete:async c=>{h.collection("players").doc(c).delete(),L(null)},isAdmin:Ye(t,"teams"),teams:o,onRenew:br,isOwner:t.type==="USER"&&((Ka=y.data)==null?void 0:Ka.teamId)===((Ya=t.data)==null?void 0:Ya.id)}),y.type==="TEAM_REQUEST_PLAYER"&&s.jsx(eh,{team:y.data,onClose:()=>L(null),onSubmit:async c=>{try{Ae(!0);const M=vn(c.position,c.overall);await h.collection("players").add({...c,attributes:M,requestedStatus:c.status,status:"PENDING",xp:0,fame:0,balance:0,stats:{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0}}),Ae(!1),L(null),alert("Inscrição enviada com sucesso! O jogador aparecerá no seu elenco assim que a Federação aprovar.")}catch(M){Ae(!1),alert("Erro ao inscrever: "+M.message)}}}),y.type==="ADMIN_PLAYER"&&s.jsx(th,{player:y.data,teams:o,onClose:()=>L(null)}),y.type==="CT_TYCOON"&&y.data&&s.jsx(nh,{team:o.find(c=>c.id===y.data.id)||y.data,players:d.filter(c=>c.teamId===y.data.id),staff:(N||[]).filter(c=>c.teamId===y.data.id&&c.status==="ACTIVE"),user:t,onClose:()=>L(null),onTrain:Ma,onTrainSolo:Fa}),y.type==="OFFER"&&s.jsx(ah,{target:y.data,myPlayers:d.filter(c=>c.teamId===t.data.id),onSend:Sr,setModal:L,user:t}),y.type==="SETTINGS"&&s.jsx(ih,{team:y.data||t.data,isAdmin:Ye(t,"teams"),onUp:c=>{var ie,he;const M=((ie=y.data)==null?void 0:ie.id)||t.data.id;let U={...c};c.estado&&!((he=y.data)!=null&&he.stateStats)&&(U.stateStats={pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}),h.collection("teams").doc(M).update(U),L(null)},onUpgrade:()=>{},onReq:(c,M,U)=>{h.collection("financeRequests").add({teamId:t.data.id,teamName:t.data.name,type:c,amount:parseFloat(M),details:U,status:"PENDING"}),L(null),alert("Enviado!")},onWithdraw:Er}),y.type==="MATCH_PERFORMANCE"&&s.jsx(bi,{players:d,teams:o,onSaveStats:ja,matchData:(Za=y.data)==null?void 0:Za.match}),y.type==="TEAM_TABLE"&&s.jsx(sh,{teams:o,onUpdateTeamStats:_r}),y.type==="POST_NEWS"&&s.jsxs("div",{children:[s.jsx("h3",{children:"Nova Notícia"}),s.jsx("input",{className:"input-field",placeholder:"Manchete / Texto",id:"news-body"}),s.jsx("button",{className:"btn btn-blue",onClick:()=>{et(`📰 **${t.data.name}:**
${document.getElementById("news-body").value}`,"press"),L(null)},children:"PUBLICAR"})]}),y.type==="EDIT_PRIZES"&&s.jsx(rh,{initialData:y.data,onSave:async c=>{await h.collection("config").doc("system").update({prizes:c}),alert("Premiações Atualizadas!"),L(null)},onClose:()=>L(null)}),y.type==="AWARDS_MANAGER"&&s.jsx(oh,{awards:b,teams:o,players:d,coaches:N,onClose:()=>L(null)}),y.type==="TOURN_MANAGER"&&s.jsx(lh,{tournaments:D,teams:o,awards:b,onClose:()=>L(null)}),y.type==="STATS_SEARCH"&&s.jsx(ch,{players:d,teams:o,onSave:async(c,M)=>{try{const U=Object.fromEntries(Object.entries(M).map(([ie,he])=>[ie,Math.max(0,Number.isFinite(Number(he))?Number(he):0)]));await h.collection("players").doc(c).update({stats:U}),L(null),alert("Estatísticas atualizadas!")}catch(U){alert("Erro ao salvar: "+U.message)}}}),y.type==="MATCH_MANAGER"&&s.jsx(dh,{initialData:y.data,teams:o,tournaments:D,onSave:zs,onDelete:_t}),y.type==="MATCH_REPORT"&&s.jsx(bi,{players:d,teams:o,onSaveStats:ja}),(y==null?void 0:y.type)==="VIEW_LINEUP"&&s.jsx("div",{className:"modal-overlay",onClick:()=>L(null),children:s.jsxs("div",{className:"modal-content animate-in",style:{maxWidth:"550px",maxHeight:"90vh",overflowY:"auto",background:"#121212",border:"1px solid var(--primary)",padding:"15px"},onClick:c=>c.stopPropagation(),children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:15,position:"sticky",top:"-15px",background:"#121212",zIndex:100,padding:"15px 0 10px 0",borderBottom:"1px solid #333"},children:[s.jsxs("h3",{style:{margin:0,color:"var(--primary)",display:"flex",alignItems:"center",gap:10},children:[y.data.logo?s.jsx("img",{src:y.data.logo,style:{width:35,height:35,borderRadius:"50%",border:"1px solid var(--primary)",objectFit:"cover"}}):s.jsx("span",{style:{fontSize:24},children:"🛡️"}),y.data.name]}),s.jsx("button",{className:"btn btn-red",style:{width:"auto",padding:"5px 10px",margin:0},onClick:()=>L(null),children:"FECHAR"})]}),(()=>{const c=y.data.stadiumLevel||1,M=St[c]||St[1],U=y.data.ticketPrice||M.minTic;return s.jsxs("div",{style:{position:"relative",height:130,borderRadius:8,overflow:"hidden",marginBottom:20,border:"1px solid cyan",background:"#111",boxShadow:"0 4px 8px rgba(0,0,0,0.5)"},children:[y.data.stadiumPic?s.jsx("img",{src:y.data.stadiumPic,style:{width:"100%",height:"100%",objectFit:"cover",opacity:.6}}):s.jsx("div",{style:{display:"grid",placeItems:"center",height:"100%",fontSize:50,color:"#333"},children:"🏟️"}),s.jsxs("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0,0,0,0.95))",padding:"30px 10px 10px 10px"},children:[s.jsxs("b",{style:{color:"cyan",fontSize:15,display:"block",marginBottom:4,textShadow:"1px 1px 2px black"},children:[M.name," ",s.jsxs("small",{style:{color:"gold"},children:["(Nvl ",c,")"]})]}),s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:10,color:"#ddd",textShadow:"1px 1px 2px black"},children:[s.jsxs("span",{children:["👥"," ",s.jsx("b",{style:{color:"#fff"},children:M.cap.toLocaleString("pt-BR")})]}),s.jsxs("span",{children:["🎫"," ",s.jsx("b",{style:{color:"#00E676"},children:te(U)})]})]})]})]})})(),(()=>{const c=(N||[]).filter(ie=>ie.teamId===y.data.id&&ie.status==="ACTIVE").sort((ie,he)=>ie.type.localeCompare(he.type)),M={COACH:"👔",ASSISTANT:"📋",DOCTOR:"🩺",SCOUT:"🕵️‍♂️"},U={COACH:"Técnico",ASSISTANT:"Auxiliar",DOCTOR:"Médico",SCOUT:"Olheiro"};return s.jsxs("div",{style:{marginBottom:25},children:[s.jsx("h4",{style:{color:"gold",margin:"0 0 10px 0",fontSize:14,borderBottom:"1px solid #333",paddingBottom:5},children:"👔 Comissão Técnica"}),c.length===0?s.jsx("p",{style:{fontSize:11,color:"#666",fontStyle:"italic"},children:"Nenhum profissional contratado."}):s.jsx("div",{style:{display:"flex",gap:10,overflowX:"auto",paddingBottom:10},children:c.map(ie=>s.jsxs("div",{style:{minWidth:"110px",background:"rgba(255,215,0,0.05)",border:"1px solid gold",borderRadius:8,padding:10,textAlign:"center"},children:[ie.face?s.jsx("img",{src:ie.face,style:{width:45,height:45,borderRadius:"50%",objectFit:"cover",marginBottom:5,border:"1px solid gold"}}):s.jsx("div",{style:{fontSize:26,marginBottom:5},children:M[ie.type]}),s.jsx("b",{style:{fontSize:11,display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:ie.name}),s.jsxs("span",{style:{fontSize:9,color:"gold",fontWeight:"bold"},children:[U[ie.type]," (Nv ",ie.level,")"]})]},ie.id))})]})})(),s.jsxs("div",{style:{marginBottom:25},children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-end",borderBottom:"1px solid #333",paddingBottom:5,marginBottom:10},children:[s.jsx("h4",{style:{color:"var(--primary)",margin:0,fontSize:14},children:"⚽ Escalação Principal"}),s.jsxs("span",{style:{fontSize:10,color:"#888"},children:["Esquema:"," ",((Ja=y.data.tactics)==null?void 0:Ja.formation)||"Não definido"]})]}),s.jsx("div",{className:"football-field",style:{height:"400px",pointerEvents:"none",position:"relative"},children:y.data.tactics?Hs[y.data.tactics.formation].map((c,M)=>{const U=Lu[y.data.tactics.formation][M],ie=y.data.tactics.lineup[M],he=d.find(Fn=>Fn.id===ie);return s.jsxs("div",{style:{position:"absolute",top:U.t,left:U.l,transform:"translate(-50%, -50%)",display:"flex",flexDirection:"column",alignItems:"center"},children:[s.jsx("div",{className:"player-photo-circle",style:{width:"36px",height:"36px",border:he?"2px solid gold":"1px dashed #666",background:he?"#001a33":"rgba(0,0,0,0.4)",boxShadow:"0 4px 6px rgba(0,0,0,0.6)"},children:he!=null&&he.face?s.jsx("img",{src:he.face,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}):s.jsx("span",{style:{fontSize:"9px"},children:c})}),s.jsx("div",{className:"player-name-label",style:{fontSize:"9px",padding:"2px 6px",background:he?"#fff":"rgba(0,0,0,0.8)",color:he?"#000":"#fff",fontWeight:"900",marginTop:"3px",borderRadius:"4px",border:he?"1px solid #333":"none",boxShadow:"0 2px 5px rgba(0,0,0,0.8)",letterSpacing:"0.5px"},children:he?`${he.name.split(" ")[0].toUpperCase()} | ${he.overall}`:"VAZIO"})]},M)}):s.jsxs("div",{style:{display:"grid",placeItems:"center",height:"100%",color:"#fff",fontSize:"13px",textAlign:"center",padding:20},children:[s.jsx("br",{}),"O técnico ainda não enviou a súmula tática."]})})]}),(()=>{const c=y.data.tactics?Object.values(y.data.tactics.lineup):[],M=d.filter(U=>U.teamId===y.data.id&&!c.includes(U.id)).sort((U,ie)=>ie.overall-U.overall);return s.jsxs("div",{style:{marginBottom:25},children:[s.jsxs("h4",{style:{color:"var(--secondary)",margin:"0 0 10px 0",fontSize:14,borderBottom:"1px solid #333",paddingBottom:5},children:["🪑 Banco de Reservas (",M.length,")"]}),M.length===0?s.jsx("p",{style:{fontSize:11,color:"#666",fontStyle:"italic"},children:"Nenhum jogador no banco de reservas."}):s.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:M.map(U=>s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,background:"#1a1a1a",padding:8,borderRadius:6,borderLeft:`3px solid ${ku(U.position)}`,border:"1px solid #333"},children:[U.face?s.jsx("img",{src:U.face,style:{width:32,height:32,borderRadius:"50%",objectFit:"cover",objectPosition:"top"}}):s.jsx("div",{style:{width:32,height:32,borderRadius:"50%",background:"#333",display:"grid",placeItems:"center",fontSize:10},children:"👤"}),s.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[s.jsxs("b",{style:{fontSize:11,display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:[U.name," ",U.recoveryLeft>0?"🏥":""]}),s.jsx("span",{style:{fontSize:9,color:"#aaa"},children:U.position})]}),s.jsx("b",{style:{color:U.overall>=80?"gold":U.overall>=70?"lime":"white",fontSize:14},children:U.overall})]},U.id))})]})})(),s.jsxs("div",{children:[s.jsx("h4",{style:{color:"gold",margin:"0 0 10px 0",fontSize:14,borderBottom:"1px solid #333",paddingBottom:5},children:"🏆 Sala de Troféus"}),!y.data.trophies||y.data.trophies.length===0?s.jsx("p",{style:{fontSize:11,color:"#666",textAlign:"center",padding:20,background:"#1a1a1a",borderRadius:8,fontStyle:"italic"},children:"A estante do clube ainda está vazia."}):s.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(80px, 1fr))",gap:10},children:[...y.data.trophies].reverse().map((c,M)=>s.jsxs("div",{style:{textAlign:"center",background:"rgba(255,215,0,0.05)",padding:10,borderRadius:8,border:"1px solid #444"},children:[s.jsx("img",{src:c.img,style:{width:45,height:45,objectFit:"contain",filter:"drop-shadow(0 0 5px rgba(255,215,0,0.5))"}}),s.jsx("div",{style:{fontSize:9,fontWeight:"bold",color:"#fff",marginTop:5},children:c.name}),s.jsx("div",{style:{fontSize:8,color:"gold"},children:c.tournament})]},M))})]})]})}),y.type==="HIRE_COACH"&&s.jsxs("div",{className:"modal-content",children:[s.jsxs("h3",{children:["Negociar com ",y.data.name]}),s.jsx("label",{children:"Salário Semanal (₣)"}),s.jsx("input",{className:"input-field",type:"number",id:"c_salary",defaultValue:y.data.salary}),s.jsx("label",{children:"Duração (Temporadas)"}),s.jsxs("select",{className:"input-field",id:"c_contract",children:[s.jsx("option",{value:"1",children:"1 Temporada"}),s.jsx("option",{value:"2",children:"2 Temporadas"}),s.jsx("option",{value:"3",children:"3 Temporadas"})]}),s.jsx("label",{children:"Multa Rescisória (₣)"}),s.jsx("input",{className:"input-field",type:"number",id:"c_clause",defaultValue:y.data.salary*10}),s.jsxs("div",{style:{display:"flex",gap:10,marginTop:15},children:[s.jsx("button",{className:"btn btn-green",onClick:()=>{const c=document.getElementById("c_salary").value,M=document.getElementById("c_contract").value,U=document.getElementById("c_clause").value;er(y.data.id,c,M,U),L(null)},children:"ENVIAR PROPOSTA"}),s.jsx("button",{className:"btn btn-red",onClick:()=>L(null),children:"CANCELAR"})]})]})]})})]})]}):s.jsx(Pu,{teams:o,players:d,papers:k,journalists:f,companies:m,coaches:N,onLogin:nn,onCreateTeam:Ks,onCreatePaper:Js,onCreateJourno:Xs,onCreateCompany:ir,onAdmin:qs,onVisitor:()=>{e({type:"VISITOR",data:{id:"visitor",name:"Visitante"}}),j("RANKING")},onCreateCoach:Zs,onCreatePlayer:Ys,config:ae})}Pi(document.getElementById("root")).render(s.jsx(Kr,{children:s.jsx(de.Suspense,{fallback:s.jsx("div",{style:{display:"grid",placeItems:"center",height:"100vh"},children:"Carregando..."}),children:s.jsx(uh,{})})}));export{Di as A,Vs as B,Ah as C,te as D,ku as E,Hs as F,Dn as G,Fs as H,St as I,lu as J,Oh as K,ln as L,oa as M,Gs as N,on as O,Wt as P,Eu as Q,gu as R,Us as S,Ou as T,wu as U,Nu as V,yu as W,ka as X,Lu as a,Vt as b,Ye as c,Qd as d,h as e,La as f,vn as g,bh as h,Rh as i,s as j,au as k,ru as l,vh as m,Sh as n,Xn as o,ti as p,iu as q,Ch as r,Ih as s,_u as t,uu as u,Th as v,js as w,Tn as x,Eh as y,yh as z};
