const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Broadcast-BYxXFhoT.js","./react-nf7bT_Uh.js","./rules-CI3EvBDW.js","./firebase-927kk_Ef.js","./Broadcast-mOSG59YO.css","./NationalTeams-C15rFFZJ.js","./AdminPanel-ci6r5Uvu.js","./getRecommendedPrice-J9S5cFrD.js","./getProdCost-BOBAoKhR.js","./TeamDashboard-DPRowNX0.js","./AttributeGrid-DzCE97ZX.js","./TacticsEditor-CeVZJ53t.js","./AssistantDashboard-BKZVdTHq.js","./VisitorDashboard-BcSYxkTk.js","./LeagueTable-d03rzOxA.js","./MatchCenter-z5-LUsCR.js","./MatchTeamLogo-CITeR3Nd.js","./TournamentHub-BrJ8OQ99.js","./Market-BUUKqDzk.js","./ShoppingScreen-CzdsayEj.js","./Ranking-BhJD0tvS.js","./PlayerCard-CJOTAXFO.js","./SocialHub-CRX9SotT.js","./OffersScreen-CzIT-kdY.js","./PublicServices-qxFSpEGm.js","./CompanyDashboard-C4B4Sk0a.js","./PlayerDashboard-BHZHHiz4.js","./CoachDashboard-BG5kea3r.js","./DoctorDashboard-BmJ458Wr.js","./ScoutDashboard-CBs5JLFw.js","./PlayerForm-BVDfJu8G.js","./TeamRequestPlayerModal-CPpr1ugt.js","./AdminPlayerModal-CG6Ik8tf.js","./TrainingCenterManager-CYM2zTPy.js","./OfferForm-BfHqBVy0.js","./SettingsForm-CABshhLr.js","./MatchPerformanceForm-DD4qOsim.js","./TeamStandingsEditor-DaHz0hu0.js","./PrizeEditor-Wal3ImUH.js","./AwardsManager-On80wfLd.js","./TournamentManagerModal-D9_iYTq1.js","./StatsEditor-CbQPAu94.js","./MatchManagerForm-2JcV_AB2.js"])))=>i.map(i=>d[i]);
import{r as q,a as Mr,R as de}from"./react-nf7bT_Uh.js";import{f as Z,L as Dr,g as jr,i as Fr,a as ua,_ as ei,C as qn,r as ti,b as Oi,S as qt,E as ha,c as me,d as Vr,e as _i,h as be,F as Je,j as Ur,q as Tt,k as mt,l as kt,m as wi,n as Gr,o as Ni,p as Kn}from"./firebase-927kk_Ef.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();var Pi={exports:{}},Sn={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $r=q,Hr=Symbol.for("react.element"),Br=Symbol.for("react.fragment"),zr=Object.prototype.hasOwnProperty,Wr=$r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,qr={key:!0,ref:!0,__self:!0,__source:!0};function xi(t,e,n){var a,i={},r=null,o=null;n!==void 0&&(r=""+n),e.key!==void 0&&(r=""+e.key),e.ref!==void 0&&(o=e.ref);for(a in e)zr.call(e,a)&&!qr.hasOwnProperty(a)&&(i[a]=e[a]);if(t&&t.defaultProps)for(a in e=t.defaultProps,e)i[a]===void 0&&(i[a]=e[a]);return{$$typeof:Hr,type:t,key:r,ref:o,props:i,_owner:Wr.current}}Sn.Fragment=Br;Sn.jsx=xi;Sn.jsxs=xi;Pi.exports=Sn;var s=Pi.exports,ki,ni=Mr;ki=ni.createRoot,ni.hydrateRoot;const Li=new Set(["USER","PLAYER","COMPANY","PRESS","PRESS_WORKER","COACH","DOCTOR","SCOUT","ASSISTANT"]);function Kr(t=localStorage){var e;try{const n=JSON.parse(t.getItem("user")||"null");return!n||!Li.has(n.type)||typeof((e=n.data)==null?void 0:e.id)!="string"?null:{type:n.type,data:{id:n.data.id}}}catch{return null}}function Yn(t,e=localStorage){var n;try{Li.has(t==null?void 0:t.type)&&((n=t.data)!=null&&n.id)?e.setItem("user",JSON.stringify({type:t.type,data:{id:t.data.id}})):e.removeItem("user")}catch{}}function Lt(t=localStorage){try{const e=Array.from({length:t.length||0},(n,a)=>t.key(a));for(const n of e)n!=null&&n.startsWith("navigation:")&&t.removeItem(n)}catch{}for(const e of["user","savedScreen","lastRead"])try{t.removeItem(e)}catch{}}function Zn(t,e=localStorage){try{return e.getItem(t)}catch{return null}}function Jn(t,e,n=localStorage){try{n.setItem(t,e)}catch{}}const Yr={USER:"teams",PLAYER:"players",COMPANY:"companies",PRESS:"newspapers",PRESS_WORKER:"journalists",COACH:"users",DOCTOR:"users",SCOUT:"users",ASSISTANT:"users"};function mn(t){return{PLAYER:"PLAYER_DASH",COACH:"COACH_DASH",DOCTOR:"DOCTOR_DASH",SCOUT:"SCOUT_DASH",ASSISTANT:"ASSISTANT_DASH",COMPANY:"COMPANY_DASH",PRESS:"PRESS_DASH",PRESS_WORKER:"PRESS_DASH",VISITOR:"RANKING"}[t]||"HOME"}function Mi(t,e){return["BROADCAST","WATCH_GAMES","NATIONAL_TEAMS","MATCHES","MARKET","SHOPPING","RANKING","NEWS","SOCIAL","OFFERS","PUBLIC_SERVICES"].includes(e)||e===mn(t)||e==="SPONSORSHIPS"&&t==="USER"||e==="COMPANY_HOME"&&t==="COMPANY"?e:mn(t)}function Di(t,e){return`navigation:${t.type}:${t.data.id}:${e}`}function Xn(t,e,n=null){return Zn(Di(t,e))??n}function ai(t,e,n){Jn(Di(t,e),n)}class Zr extends de.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,n){console.error("Crash:",e,n)}render(){return this.state.hasError?s.jsxs("div",{className:"error-screen",children:[s.jsx("h2",{children:"Ocorreu um erro!"}),s.jsx("p",{children:"O aplicativo encontrou um problema inesperado."}),s.jsx("button",{className:"btn btn-red",onClick:()=>{Lt(),window.location.reload()},children:"REINICIAR APLICATIVO"})]}):this.props.children}}const Jr="modulepreload",Xr=function(t,e){return new URL(t,e).href},ii={},pe=function(e,n,a){let i=Promise.resolve();if(n&&n.length>0){const o=document.getElementsByTagName("link"),u=document.querySelector("meta[property=csp-nonce]"),h=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));i=Promise.allSettled(n.map(d=>{if(d=Xr(d,a),d in ii)return;ii[d]=!0;const E=d.endsWith(".css"),R=E?'[rel="stylesheet"]':"";if(!!a)for(let D=o.length-1;D>=0;D--){const U=o[D];if(U.href===d&&(!E||U.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${R}`))return;const g=document.createElement("link");if(g.rel=E?"stylesheet":Jr,E||(g.as="script"),g.crossOrigin="",g.href=d,h&&g.setAttribute("nonce",h),document.head.appendChild(g),E)return new Promise((D,U)=>{g.addEventListener("load",D),g.addEventListener("error",()=>U(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(o){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=o,window.dispatchEvent(u),!u.defaultPrevented)throw o}return i.then(o=>{for(const u of o||[])u.status==="rejected"&&r(u.reason);return e().catch(r)})},Kt="NEXLYzsJfLPsTxzp3LKHKwaPhEZ2",ji=Object.freeze({teams:"Times e jogadores (cadastros, elencos e configurações)",finance:"Finanças e premiações",press:"Imprensa e jornalistas",companies:"Empresas",staff:"Comissão técnica",calendar:"Calendário",competitions:"Campeonatos, partidas e súmulas",nationalTeams:"Seleções, técnicos e convocações"}),Tn=t=>{var e;return(t==null?void 0:t.type)==="ADMIN"&&((e=t.data)==null?void 0:e.id)===Kt},bn=t=>(t==null?void 0:t.type)==="ADMIN"&&!Tn(t);function Ye(t,e){var n,a;return Tn(t)||bn(t)&&Object.hasOwn(ji,e)&&((a=(n=t.data)==null?void 0:n.permissions)==null?void 0:a.includes(e))}function Cn(t){if(!Array.isArray(t)||t.some(e=>!Object.hasOwn(ji,e)))throw Error("Permissão inválida.");return[...new Set(t)]}const Qr={TEAM_TABLE:"competitions",POST_NEWS:"press",EDIT_PRIZES:"finance",STATS_SEARCH:"competitions",MATCH_REPORT:"competitions",ADMIN_PLAYER:"teams",PLAYER:"teams",SETTINGS:"teams",STATS:"competitions",TEAM_STANDINGS:"competitions",TOURN_MANAGER:"competitions",MATCH_MANAGER:"competitions",MATCH_PERFORMANCE:"competitions",AWARDS_MANAGER:"finance",PRIZES:"finance"};function eo(t,e){return!bn(t)||!e||["VIEW_LINEUP","VIEW_PLAYER"].includes(e.type)?!0:Ye(t,Qr[e.type])}const to={approveTeam:"teams",deleteTeam:"teams",savePlayer:"teams",deletePaper:"press",deleteJournalist:"press",postNews:"press",handleFinanceApprove:"finance",updateBalance:"finance",handleSaveMatch:"competitions",handleDeleteMatch:"competitions",generateFixtures:"competitions",saveMatchStats:"competitions",updateTeamStats:"competitions",handleSocialDelete:"press"};function no(t,e,n=a=>alert(a)){return bn(e)?Object.fromEntries(Object.entries(t).map(([a,i])=>[a,(...r)=>{if(!Ye(e,to[a])){n("Você não tem permissão para esta função.");return}return i(...r)}])):t}const ao={apiKey:"AIzaSyBrtJFfWAqT0AZYHlm4it-noB5h9jIPJEI",authDomain:"gerenciador-de-times-matoreal.firebaseapp.com",projectId:"gerenciador-de-times-matoreal",storageBucket:"gerenciador-de-times-matoreal.firebasestorage.app",messagingSenderId:"29096266740",appId:"1:29096266740:web:ec48e7225c18c20dbc07a1"};Z.apps.length||Z.initializeApp(ao);const p=Z.firestore();p.enablePersistence({synchronizeTabs:!0}).catch(t=>{["failed-precondition","unimplemented"].includes(t.code)||console.warn("Cache indisponível:",t.code)});function pa(t,e){var n={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.indexOf(a)<0&&(n[a]=t[a]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(t);i<a.length;i++)e.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(t,a[i])&&(n[a[i]]=t[a[i]]);return n}const Nt={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",TWITTER:"twitter.com"},ht={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function io(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registed for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend."}}function Fi(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const so=io,ro=Fi,Vi=new ha("auth","Firebase",Fi());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn=new Dr("@firebase/auth");function oo(t,...e){fn.logLevel<=_i.WARN&&fn.warn(`Auth (${qt}): ${t}`,...e)}function cn(t,...e){fn.logLevel<=_i.ERROR&&fn.error(`Auth (${qt}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(t,...e){throw ma(t,...e)}function Re(t,...e){return ma(t,...e)}function Ui(t,e,n){const a=Object.assign(Object.assign({},ro()),{[e]:n});return new ha("auth","Firebase",a).create(e,{appName:t.name})}function bt(t,e,n){const a=n;if(!(e instanceof a))throw a.name!==e.constructor.name&&Oe(t,"argument-error"),Ui(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ma(t,...e){if(typeof t!="string"){const n=e[0],a=[...e.slice(1)];return a[0]&&(a[0].appName=t.name),t._errorFactory.create(n,...a)}return Vi.create(t,...e)}function G(t,e,...n){if(!t)throw ma(e,...n)}function Ue(t){const e="INTERNAL ASSERTION FAILED: "+t;throw cn(e),new Error(e)}function Me(t,e){t||Ue(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ut(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function fa(){return si()==="http:"||si()==="https:"}function si(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lo(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(fa()||Oi()||"connection"in navigator)?navigator.onLine:!0}function co(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e,n){this.shortDelay=e,this.longDelay=n,Me(n>e,"Short delay should be less than long delay!"),this.isMobile=Fr()||ua()}get(){return lo()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(t,e){Me(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{static initialize(e,n,a){this.fetchImpl=e,n&&(this.headersImpl=n),a&&(this.responseImpl=a)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Ue("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Ue("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Ue("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const ho=new Yt(3e4,6e4);function Se(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Te(t,e,n,a,i={}){return $i(t,i,async()=>{let r={},o={};a&&(e==="GET"?o=a:r={body:JSON.stringify(a)});const u=Tt(Object.assign({key:t.config.apiKey},o)).slice(1),h=await t._getAdditionalHeaders();return h["Content-Type"]="application/json",t.languageCode&&(h["X-Firebase-Locale"]=t.languageCode),Gi.fetch()(Hi(t,t.config.apiHost,n,u),Object.assign({method:e,headers:h,referrerPolicy:"no-referrer"},r))})}async function $i(t,e,n){t._canInitEmulator=!1;const a=Object.assign(Object.assign({},uo),e);try{const i=new po(t),r=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Mt(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const u=r.ok?o.errorMessage:o.error.message,[h,d]=u.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw Mt(t,"credential-already-in-use",o);if(h==="EMAIL_EXISTS")throw Mt(t,"email-already-in-use",o);if(h==="USER_DISABLED")throw Mt(t,"user-disabled",o);const E=a[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Ui(t,E,d);Oe(t,E)}}catch(i){if(i instanceof Je)throw i;Oe(t,"network-request-failed",{message:String(i)})}}async function We(t,e,n,a,i={}){const r=await Te(t,e,n,a,i);return"mfaPendingCredential"in r&&Oe(t,"multi-factor-auth-required",{_serverResponse:r}),r}function Hi(t,e,n,a){const i=`${e}${n}?${a}`;return t.config.emulator?ga(t.config,i):`${t.config.apiScheme}://${i}`}class po{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,a)=>{this.timer=setTimeout(()=>a(Re(this.auth,"network-request-failed")),ho.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Mt(t,e,n){const a={appName:t.name};n.email&&(a.email=n.email),n.phoneNumber&&(a.phoneNumber=n.phoneNumber);const i=Re(t,e,a);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function Dt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ao(t,e=!1){const n=me(t),a=await n.getIdToken(e),i=Rn(a);G(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const r=typeof i.firebase=="object"?i.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:i,token:a,authTime:Dt(Vn(i.auth_time)),issuedAtTime:Dt(Vn(i.iat)),expirationTime:Dt(Vn(i.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function Vn(t){return Number(t)*1e3}function Rn(t){const[e,n,a]=t.split(".");if(e===void 0||n===void 0||a===void 0)return cn("JWT malformed, contained fewer than 3 sections"),null;try{const i=Ur(n);return i?JSON.parse(i):(cn("Failed to decode base64 JWT payload"),null)}catch(i){return cn("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Eo(t){const e=Rn(t);return G(e,"internal-error"),G(typeof e.exp<"u","internal-error"),G(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ze(t,e,n=!1){if(n)return e;try{return await e}catch(a){throw a instanceof Je&&yo(a)&&t.auth.currentUser===t&&await t.auth.signOut(),a}}function yo({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const a=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),a}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Dt(this.lastLoginAt),this.creationTime=Dt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Gt(t){var e;const n=t.auth,a=await t.getIdToken(),i=await ze(t,go(n,{idToken:a}));G(i==null?void 0:i.users.length,n,"internal-error");const r=i.users[0];t._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?To(r.providerUserInfo):[],u=So(t.providerData,o),h=t.isAnonymous,d=!(t.email&&r.passwordHash)&&!(u!=null&&u.length),E=h?d:!1,R={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:u,metadata:new Bi(r.createdAt,r.lastLoginAt),isAnonymous:E};Object.assign(t,R)}async function Io(t){const e=me(t);await Gt(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function So(t,e){return[...t.filter(a=>!e.some(i=>i.providerId===a.providerId)),...e]}function To(t){return t.map(e=>{var{providerId:n}=e,a=pa(e,["providerId"]);return{providerId:n,uid:a.rawId||"",displayName:a.displayName||null,email:a.email||null,phoneNumber:a.phoneNumber||null,photoURL:a.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bo(t,e){const n=await $i(t,{},async()=>{const a=Tt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:r}=t.config,o=Hi(t,i,"/v1/token",`key=${r}`),u=await t._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",Gi.fetch()(o,{method:"POST",headers:u,body:a})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){G(e.idToken,"internal-error"),G(typeof e.idToken<"u","internal-error"),G(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Eo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return G(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:a,refreshToken:i,expiresIn:r}=await bo(e,n);this.updateTokensAndExpiration(a,i,Number(r))}updateTokensAndExpiration(e,n,a){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+a*1e3}static fromJSON(e,n){const{refreshToken:a,accessToken:i,expirationTime:r}=n,o=new $t;return a&&(G(typeof a=="string","internal-error",{appName:e}),o.refreshToken=a),i&&(G(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),r&&(G(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new $t,this.toJSON())}_performRefresh(){return Ue("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(t,e){G(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class at{constructor(e){var{uid:n,auth:a,stsTokenManager:i}=e,r=pa(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vo(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=a,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Bi(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await ze(this,this.stsTokenManager.getToken(this.auth,e));return G(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Ao(this,e)}reload(){return Io(this)}_assign(e){this!==e&&(G(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new at(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){G(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let a=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),a=!0),n&&await Gt(this),await this.auth._persistUserIfCurrent(this),a&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await ze(this,mo(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var a,i,r,o,u,h,d,E;const R=(a=n.displayName)!==null&&a!==void 0?a:void 0,x=(i=n.email)!==null&&i!==void 0?i:void 0,g=(r=n.phoneNumber)!==null&&r!==void 0?r:void 0,D=(o=n.photoURL)!==null&&o!==void 0?o:void 0,U=(u=n.tenantId)!==null&&u!==void 0?u:void 0,te=(h=n._redirectEventId)!==null&&h!==void 0?h:void 0,ee=(d=n.createdAt)!==null&&d!==void 0?d:void 0,Q=(E=n.lastLoginAt)!==null&&E!==void 0?E:void 0,{uid:P,emailVerified:M,isAnonymous:b,providerData:A,stsTokenManager:T}=n;G(P&&T,e,"internal-error");const f=$t.fromJSON(this.name,T);G(typeof P=="string",e,"internal-error"),Ke(R,e.name),Ke(x,e.name),G(typeof M=="boolean",e,"internal-error"),G(typeof b=="boolean",e,"internal-error"),Ke(g,e.name),Ke(D,e.name),Ke(U,e.name),Ke(te,e.name),Ke(ee,e.name),Ke(Q,e.name);const _=new at({uid:P,auth:e,email:x,emailVerified:M,displayName:R,isAnonymous:b,photoURL:D,phoneNumber:g,tenantId:U,stsTokenManager:f,createdAt:ee,lastLoginAt:Q});return A&&Array.isArray(A)&&(_.providerData=A.map(O=>Object.assign({},O))),te&&(_._redirectEventId=te),_}static async _fromIdTokenResponse(e,n,a=!1){const i=new $t;i.updateFromServerResponse(n);const r=new at({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:a});return await Gt(r),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ri=new Map;function xe(t){Me(t instanceof Function,"Expected a class definition");let e=ri.get(t);return e?(Me(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,ri.set(t,e),e)}/**
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
 */class zi{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}zi.type="NONE";const vt=zi;/**
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
 */function it(t,e,n){return`firebase:${t}:${e}:${n}`}class ft{constructor(e,n,a){this.persistence=e,this.auth=n,this.userKey=a;const{config:i,name:r}=this.auth;this.fullUserKey=it(this.userKey,i.apiKey,r),this.fullPersistenceKey=it("persistence",i.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?at._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,a="authUser"){if(!n.length)return new ft(xe(vt),e,a);const i=(await Promise.all(n.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let r=i[0]||xe(vt);const o=it(a,e.config.apiKey,e.name);let u=null;for(const d of n)try{const E=await d._get(o);if(E){const R=at._fromJSON(e,E);d!==r&&(u=R),r=d;break}}catch{}const h=i.filter(d=>d._shouldAllowMigration);return!r._shouldAllowMigration||!h.length?new ft(r,e,a):(r=h[0],u&&await r._set(o,u.toJSON()),await Promise.all(n.map(async d=>{if(d!==r)try{await d._remove(o)}catch{}})),new ft(r,e,a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oi(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ki(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Wi(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Yi(e))return"Blackberry";if(Zi(e))return"Webos";if(Aa(e))return"Safari";if((e.includes("chrome/")||qi(e))&&!e.includes("edge/"))return"Chrome";if(Zt(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,a=t.match(n);if((a==null?void 0:a.length)===2)return a[1]}return"Other"}function Wi(t=be()){return/firefox\//i.test(t)}function Aa(t=be()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function qi(t=be()){return/crios\//i.test(t)}function Ki(t=be()){return/iemobile/i.test(t)}function Zt(t=be()){return/android/i.test(t)}function Yi(t=be()){return/blackberry/i.test(t)}function Zi(t=be()){return/webos/i.test(t)}function Ct(t=be()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Co(t=be()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(t)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(t)}function Ro(t=be()){var e;return Ct(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Oo(){return wi()&&document.documentMode===10}function Ji(t=be()){return Ct(t)||Zt(t)||Zi(t)||Yi(t)||/windows phone/i.test(t)||Ki(t)}function _o(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(t,e=[]){let n;switch(t){case"Browser":n=oi(be());break;case"Worker":n=`${oi(be())}-${t}`;break;default:n=t}const a=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${qt}/${a}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wo(t){return(await Te(t,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Qi(t,e){return Te(t,"GET","/v2/recaptchaConfig",Se(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(t){return t!==void 0&&t.getResponse!==void 0}function ci(t){return t!==void 0&&t.enterprise!==void 0}class es{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function No(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function Ea(t){return new Promise((e,n)=>{const a=document.createElement("script");a.setAttribute("src",t),a.onload=e,a.onerror=i=>{const r=Re("internal-error");r.customData=i,n(r)},a.type="text/javascript",a.charset="UTF-8",No().appendChild(a)})}function ts(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const Po="https://www.google.com/recaptcha/enterprise.js?render=",xo="recaptcha-enterprise",ko="NO_RECAPTCHA";class ns{constructor(e){this.type=xo,this.auth=ye(e)}async verify(e="verify",n=!1){async function a(r){if(!n){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,u)=>{Qi(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(h=>{if(h.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const d=new es(h);return r.tenantId==null?r._agentRecaptchaConfig=d:r._tenantRecaptchaConfigs[r.tenantId]=d,o(d.siteKey)}}).catch(h=>{u(h)})})}function i(r,o,u){const h=window.grecaptcha;ci(h)?h.enterprise.ready(()=>{h.enterprise.execute(r,{action:e}).then(d=>{o(d)}).catch(()=>{o(ko)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,o)=>{a(this.auth).then(u=>{if(!n&&ci(window.grecaptcha))i(u,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}Ea(Po+u).then(()=>{i(u,r,o)}).catch(h=>{o(h)})}}).catch(u=>{o(u)})})}}async function Xe(t,e,n,a=!1){const i=new ns(t);let r;try{r=await i.verify(n)}catch{r=await i.verify(n,!0)}const o=Object.assign({},e);return a?Object.assign(o,{captchaResp:r}):Object.assign(o,{captchaResponse:r}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}/**
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
 */class Lo{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const a=r=>new Promise((o,u)=>{try{const h=e(r);o(h)}catch(h){u(h)}});a.onAbort=n,this.queue.push(a);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const a of this.queue)await a(e),a.onAbort&&n.push(a.onAbort)}catch(a){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:a==null?void 0:a.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e,n,a,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=a,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new di(this),this.idTokenSubscription=new di(this),this.beforeStateQueue=new Lo(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Vi,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=xe(n)),this._initializationPromise=this.queue(async()=>{var a,i;if(!this._deleted&&(this.persistenceManager=await ft.create(this,e),!this._deleted)){if(!((a=this._popupRedirectResolver)===null||a===void 0)&&a._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const a=await this.assertedPersistence.getCurrentUser();let i=a,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,u=i==null?void 0:i._redirectEventId,h=await this.tryRedirectSignIn(e);(!o||o===u)&&(h!=null&&h.user)&&(i=h.user,r=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=a,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return G(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Gt(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=co()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?me(e):null;return n&&G(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&G(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(xe(e))})}async initializeRecaptchaConfig(){const e=await Qi(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new es(e);this.tenantId==null?this._agentRecaptchaConfig=n:this._tenantRecaptchaConfigs[this.tenantId]=n,n.emailPasswordEnabled&&new ns(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ha("auth","Firebase",e())}onAuthStateChanged(e,n,a){return this.registerStateListener(this.authStateSubscription,e,n,a)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,a){return this.registerStateListener(this.idTokenSubscription,e,n,a)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const a=await this.getOrInitRedirectPersistenceManager(n);return e===null?a.removeCurrentUser():a.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&xe(e)||this._popupRedirectResolver;G(n,this,"argument-error"),this.redirectPersistenceManager=await ft.create(this,[xe(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,a;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((a=this.redirectUser)===null||a===void 0?void 0:a._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const a=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==a&&(this.lastNotifiedUid=a,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,a,i){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return G(o,this,"internal-error"),o.then(()=>r(this.currentUser)),typeof n=="function"?e.addObserver(n,a,i):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return G(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Xi(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const a=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());a&&(n["X-Firebase-Client"]=a);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&oo(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function ye(t){return me(t)}class di{constructor(e){this.auth=e,this.observer=null,this.addObserver=Vr(n=>this.observer=n)}get next(){return G(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}function Do(t,e){const n=(e==null?void 0:e.persistence)||[],a=(Array.isArray(n)?n:[n]).map(xe);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(a,e==null?void 0:e.popupRedirectResolver)}function jo(t,e,n){const a=ye(t);G(a._canInitEmulator,a,"emulator-config-failed"),G(/^https?:\/\//.test(e),a,"invalid-emulator-scheme");const i=!!(n!=null&&n.disableWarnings),r=as(e),{host:o,port:u}=Fo(e),h=u===null?"":`:${u}`;a.config.emulator={url:`${r}//${o}${h}/`},a.settings.appVerificationDisabledForTesting=!0,a.emulatorConfig=Object.freeze({host:o,port:u,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||Vo()}function as(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Fo(t){const e=as(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const a=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(a);if(i){const r=i[1];return{host:r,port:ui(a.substr(r.length+1))}}else{const[r,o]=a.split(":");return{host:r,port:ui(o)}}}function ui(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Vo(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */async function is(t,e){return Te(t,"POST","/v1/accounts:resetPassword",Se(t,e))}async function ss(t,e){return Te(t,"POST","/v1/accounts:update",e)}async function Uo(t,e){return Te(t,"POST","/v1/accounts:update",Se(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Un(t,e){return We(t,"POST","/v1/accounts:signInWithPassword",Se(t,e))}async function On(t,e){return Te(t,"POST","/v1/accounts:sendOobCode",Se(t,e))}async function Go(t,e){return On(t,e)}async function Gn(t,e){return On(t,e)}async function $n(t,e){return On(t,e)}async function $o(t,e){return On(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Ht extends Rt{constructor(e,n,a,i=null){super("password",a),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new Ht(e,n,"password")}static _fromEmailAndCode(e,n,a=null){return new Ht(e,n,"emailLink",a)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){var n;switch(this.signInMethod){case"password":const a={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((n=e._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const i=await Xe(e,a,"signInWithPassword");return Un(e,i)}else return Un(e,a).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const r=await Xe(e,a,"signInWithPassword");return Un(e,r)}else return Promise.reject(i)});case"emailLink":return Ho(e,{email:this._email,oobCode:this._password});default:Oe(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return ss(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Bo(e,{idToken:n,email:this._email,oobCode:this._password});default:Oe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const zo="http://localhost";class Ge extends Rt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Ge(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Oe("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:a,signInMethod:i}=n,r=pa(n,["providerId","signInMethod"]);if(!a||!i)return null;const o=new Ge(a,i);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Be(e,n)}_linkToIdToken(e,n){const a=this.buildRequest();return a.idToken=n,Be(e,a)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Be(e,n)}buildRequest(){const e={requestUri:zo,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Tt(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wo(t,e){return Te(t,"POST","/v1/accounts:sendVerificationCode",Se(t,e))}async function qo(t,e){return We(t,"POST","/v1/accounts:signInWithPhoneNumber",Se(t,e))}async function Ko(t,e){const n=await We(t,"POST","/v1/accounts:signInWithPhoneNumber",Se(t,e));if(n.temporaryProof)throw Mt(t,"account-exists-with-different-credential",n);return n}const Yo={USER_NOT_FOUND:"user-not-found"};async function Zo(t,e){const n=Object.assign(Object.assign({},e),{operation:"REAUTH"});return We(t,"POST","/v1/accounts:signInWithPhoneNumber",Se(t,n),Yo)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st extends Rt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new st({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new st({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return qo(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return Ko(e,Object.assign({idToken:n},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Zo(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:a,verificationCode:i}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:a,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:a,phoneNumber:i,temporaryProof:r}=e;return!a&&!n&&!i&&!r?null:new st({verificationId:n,verificationCode:a,phoneNumber:i,temporaryProof:r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Xo(t){const e=mt(kt(t)).link,n=e?mt(kt(e)).deep_link_id:null,a=mt(kt(t)).deep_link_id;return(a?mt(kt(a)).link:null)||a||n||e||t}class _n{constructor(e){var n,a,i,r,o,u;const h=mt(kt(e)),d=(n=h.apiKey)!==null&&n!==void 0?n:null,E=(a=h.oobCode)!==null&&a!==void 0?a:null,R=Jo((i=h.mode)!==null&&i!==void 0?i:null);G(d&&E&&R,"argument-error"),this.apiKey=d,this.operation=R,this.code=E,this.continueUrl=(r=h.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=h.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(u=h.tenantId)!==null&&u!==void 0?u:null}static parseLink(e){const n=Xo(e);try{return new _n(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(){this.providerId=Qe.PROVIDER_ID}static credential(e,n){return Ht._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const a=_n.parseLink(n);return G(a,"argument-error"),Ht._fromEmailAndCode(e,a.code,a.tenantId)}}Qe.PROVIDER_ID="password";Qe.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Qe.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Ot extends qe{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class gt extends Ot{static credentialFromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;return G("providerId"in n&&"signInMethod"in n,"argument-error"),Ge._fromParams(n)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return G(e.idToken||e.accessToken,"argument-error"),Ge._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return gt.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return gt.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:a,oauthTokenSecret:i,pendingToken:r,nonce:o,providerId:u}=e;if(!a&&!i&&!n&&!r||!u)return null;try{return new gt(u)._credential({idToken:n,accessToken:a,nonce:o,pendingToken:r})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De extends Ot{constructor(){super("facebook.com")}static credential(e){return Ge._fromParams({providerId:De.PROVIDER_ID,signInMethod:De.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return De.credentialFromTaggedObject(e)}static credentialFromError(e){return De.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return De.credential(e.oauthAccessToken)}catch{return null}}}De.FACEBOOK_SIGN_IN_METHOD="facebook.com";De.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const Qo="http://localhost";class It extends Rt{constructor(e,n){super(e,e),this.pendingToken=n}_getIdTokenResponse(e){const n=this.buildRequest();return Be(e,n)}_linkToIdToken(e,n){const a=this.buildRequest();return a.idToken=n,Be(e,a)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Be(e,n)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:a,signInMethod:i,pendingToken:r}=n;return!a||!i||!r||a!==i?null:new It(a,r)}static _create(e,n){return new It(e,n)}buildRequest(){return{requestUri:Qo,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el="saml.";class gn extends qe{constructor(e){G(e.startsWith(el),"argument-error"),super(e)}static credentialFromResult(e){return gn.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return gn.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const n=It.fromJSON(e);return G(n,"argument-error"),n}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:n,providerId:a}=e;if(!n||!a)return null;try{return It._create(a,n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Le{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,a,i=!1){const r=await at._fromIdTokenResponse(e,a,i),o=hi(a);return new Le({user:r,providerId:o,_tokenResponse:a,operationType:n})}static async _forOperation(e,n,a){await e._updateTokensIfNecessary(a,!0);const i=hi(a);return new Le({user:e,providerId:i,_tokenResponse:a,operationType:n})}}function hi(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tl(t){var e;const n=ye(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new Le({user:n.currentUser,providerId:null,operationType:"signIn"});const a=await dn(n,{returnSecureToken:!0}),i=await Le._fromIdTokenResponse(n,"signIn",a,!0);return await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An extends Je{constructor(e,n,a,i){var r;super(n.code,n.message),this.operationType=a,this.user=i,Object.setPrototypeOf(this,An.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:n.customData._serverResponse,operationType:a}}static _fromErrorAndOperation(e,n,a,i){return new An(e,n,a,i)}}function rs(t,e,n,a){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?An._fromErrorAndOperation(t,r,e,a):r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function os(t){return new Set(t.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function nl(t,e){const n=me(t);await wn(!0,n,e);const{providerUserInfo:a}=await fo(n.auth,{idToken:await n.getIdToken(),deleteProvider:[e]}),i=os(a||[]);return n.providerData=n.providerData.filter(r=>i.has(r.providerId)),i.has("phone")||(n.phoneNumber=null),await n.auth._persistUserIfCurrent(n),n}async function ya(t,e,n=!1){const a=await ze(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Le._forOperation(t,"link",a)}async function wn(t,e,n){await Gt(e);const a=os(e.providerData),i=t===!1?"provider-already-linked":"no-such-provider";G(a.has(n)===t,e.auth,i)}/**
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
 */async function ls(t,e,n=!1){const{auth:a}=t,i="reauthenticate";try{const r=await ze(t,rs(a,i,e,t),n);G(r.idToken,a,"internal-error");const o=Rn(r.idToken);G(o,a,"internal-error");const{sub:u}=o;return G(t.uid===u,a,"user-mismatch"),Le._forOperation(t,i,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Oe(a,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cs(t,e,n=!1){const a="signIn",i=await rs(t,a,e),r=await Le._fromIdTokenResponse(t,a,i);return n||await t._updateCurrentUser(r.user),r}async function Nn(t,e){return cs(ye(t),e)}async function ds(t,e){const n=me(t);return await wn(!1,n,e.providerId),ya(n,e)}async function us(t,e){return ls(me(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function al(t,e){return We(t,"POST","/v1/accounts:signInWithCustomToken",Se(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function il(t,e){const n=ye(t),a=await al(n,{token:e,returnSecureToken:!0}),i=await Le._fromIdTokenResponse(n,"signIn",a);return await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,n){this.factorId=e,this.uid=n.mfaEnrollmentId,this.enrollmentTime=new Date(n.enrolledAt).toUTCString(),this.displayName=n.displayName}static _fromServerResponse(e,n){return"phoneInfo"in n?va._fromServerResponse(e,n):"totpInfo"in n?Ia._fromServerResponse(e,n):Oe(e,"internal-error")}}class va extends Jt{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,n){return new va(n)}}class Ia extends Jt{constructor(e){super("totp",e)}static _fromServerResponse(e,n){return new Ia(n)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(t,e,n){var a;G(((a=n.url)===null||a===void 0?void 0:a.length)>0,t,"invalid-continue-uri"),G(typeof n.dynamicLinkDomain>"u"||n.dynamicLinkDomain.length>0,t,"invalid-dynamic-link-domain"),e.continueUrl=n.url,e.dynamicLinkDomain=n.dynamicLinkDomain,e.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(G(n.iOS.bundleId.length>0,t,"missing-ios-bundle-id"),e.iOSBundleId=n.iOS.bundleId),n.android&&(G(n.android.packageName.length>0,t,"missing-android-pkg-name"),e.androidInstallApp=n.android.installApp,e.androidMinimumVersionCode=n.android.minimumVersion,e.androidPackageName=n.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sl(t,e,n){var a;const i=ye(t),r={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};if(!((a=i._getRecaptchaConfig())===null||a===void 0)&&a.emailPasswordEnabled){const o=await Xe(i,r,"getOobCode",!0);n&&At(i,o,n),await Gn(i,o)}else n&&At(i,r,n),await Gn(i,r).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log("Password resets are protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the password reset flow.");const u=await Xe(i,r,"getOobCode",!0);n&&At(i,u,n),await Gn(i,u)}else return Promise.reject(o)})}async function rl(t,e,n){await is(me(t),{oobCode:e,newPassword:n})}async function ol(t,e){await Uo(me(t),{oobCode:e})}async function hs(t,e){const n=me(t),a=await is(n,{oobCode:e}),i=a.requestType;switch(G(i,n,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":G(a.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":G(a.mfaInfo,n,"internal-error");default:G(a.email,n,"internal-error")}let r=null;return a.mfaInfo&&(r=Jt._fromServerResponse(ye(n),a.mfaInfo)),{data:{email:(a.requestType==="VERIFY_AND_CHANGE_EMAIL"?a.newEmail:a.email)||null,previousEmail:(a.requestType==="VERIFY_AND_CHANGE_EMAIL"?a.email:a.newEmail)||null,multiFactorInfo:r},operation:i}}async function ll(t,e){const{data:n}=await hs(me(t),e);return n.email}async function cl(t,e,n){var a;const i=ye(t),r={returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"};let o;if(!((a=i._getRecaptchaConfig())===null||a===void 0)&&a.emailPasswordEnabled){const d=await Xe(i,r,"signUpPassword");o=dn(i,d)}else o=dn(i,r).catch(async d=>{if(d.code==="auth/missing-recaptcha-token"){console.log("Sign-up is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-up flow.");const E=await Xe(i,r,"signUpPassword");return dn(i,E)}else return Promise.reject(d)});const u=await o.catch(d=>Promise.reject(d)),h=await Le._fromIdTokenResponse(i,"signIn",u);return await i._updateCurrentUser(h.user),h}function dl(t,e,n){return Nn(me(t),Qe.credential(e,n))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ul(t,e,n){var a;const i=ye(t),r={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function o(u,h){G(h.handleCodeInApp,i,"argument-error"),h&&At(i,u,h)}if(!((a=i._getRecaptchaConfig())===null||a===void 0)&&a.emailPasswordEnabled){const u=await Xe(i,r,"getOobCode",!0);o(u,n),await $n(i,u)}else o(r,n),await $n(i,r).catch(async u=>{if(u.code==="auth/missing-recaptcha-token"){console.log("Email link sign-in is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const h=await Xe(i,r,"getOobCode",!0);o(h,n),await $n(i,h)}else return Promise.reject(u)})}function hl(t,e){const n=_n.parseLink(e);return(n==null?void 0:n.operation)==="EMAIL_SIGNIN"}async function pl(t,e,n){const a=me(t),i=Qe.credentialWithLink(e,n||Ut());return G(i._tenantId===(a.tenantId||null),a,"tenant-id-mismatch"),Nn(a,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */async function fl(t,e){const n=fa()?Ut():"http://localhost",a={identifier:e,continueUri:n},{signinMethods:i}=await ml(me(t),a);return i||[]}async function gl(t,e){const n=me(t),i={requestType:"VERIFY_EMAIL",idToken:await t.getIdToken()};e&&At(n.auth,i,e);const{email:r}=await Go(n.auth,i);r!==t.email&&await t.reload()}async function Al(t,e,n){const a=me(t),r={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await t.getIdToken(),newEmail:e};n&&At(a.auth,r,n);const{email:o}=await $o(a.auth,r);o!==t.email&&await t.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */async function yl(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const a=me(t),r={idToken:await a.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await ze(a,El(a.auth,r));a.displayName=o.displayName||null,a.photoURL=o.photoUrl||null;const u=a.providerData.find(({providerId:h})=>h==="password");u&&(u.displayName=a.displayName,u.photoURL=a.photoURL),await a._updateTokensIfNecessary(o)}function vl(t,e){return ps(me(t),e,null)}function Il(t,e){return ps(me(t),null,e)}async function ps(t,e,n){const{auth:a}=t,r={idToken:await t.getIdToken(),returnSecureToken:!0};e&&(r.email=e),n&&(r.password=n);const o=await ze(t,ss(a,r));await t._updateTokensIfNecessary(o,!0)}/**
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
 */function Sl(t){var e,n;if(!t)return null;const{providerId:a}=t,i=t.rawUserInfo?JSON.parse(t.rawUserInfo):{},r=t.isNewUser||t.kind==="identitytoolkit#SignupNewUserResponse";if(!a&&(t!=null&&t.idToken)){const o=(n=(e=Rn(t.idToken))===null||e===void 0?void 0:e.firebase)===null||n===void 0?void 0:n.sign_in_provider;if(o){const u=o!=="anonymous"&&o!=="custom"?o:null;return new Et(r,u)}}if(!a)return null;switch(a){case"facebook.com":return new Tl(r,i);case"github.com":return new bl(r,i);case"google.com":return new Cl(r,i);case"twitter.com":return new Rl(r,i,t.screenName||null);case"custom":case"anonymous":return new Et(r,null);default:return new Et(r,a,i)}}class Et{constructor(e,n,a={}){this.isNewUser=e,this.providerId=n,this.profile=a}}class ms extends Et{constructor(e,n,a,i){super(e,n,a),this.username=i}}class Tl extends Et{constructor(e,n){super(e,"facebook.com",n)}}class bl extends ms{constructor(e,n){super(e,"github.com",n,typeof(n==null?void 0:n.login)=="string"?n==null?void 0:n.login:null)}}class Cl extends Et{constructor(e,n){super(e,"google.com",n)}}class Rl extends ms{constructor(e,n,a){super(e,"twitter.com",n,a)}}function Ol(t){const{user:e,_tokenResponse:n}=t;return e.isAnonymous&&!n?{providerId:null,isNewUser:!1,profile:null}:Sl(n)}class nt{constructor(e,n,a){this.type=e,this.credential=n,this.auth=a}static _fromIdtoken(e,n){return new nt("enroll",e,n)}static _fromMfaPendingCredential(e){return new nt("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){var n,a;if(e!=null&&e.multiFactorSession){if(!((n=e.multiFactorSession)===null||n===void 0)&&n.pendingCredential)return nt._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(!((a=e.multiFactorSession)===null||a===void 0)&&a.idToken)return nt._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e,n,a){this.session=e,this.hints=n,this.signInResolver=a}static _fromError(e,n){const a=ye(e),i=n.customData._serverResponse,r=(i.mfaInfo||[]).map(u=>Jt._fromServerResponse(a,u));G(i.mfaPendingCredential,a,"internal-error");const o=nt._fromMfaPendingCredential(i.mfaPendingCredential);return new Sa(o,r,async u=>{const h=await u._process(a,o);delete i.mfaInfo,delete i.mfaPendingCredential;const d=Object.assign(Object.assign({},i),{idToken:h.idToken,refreshToken:h.refreshToken});switch(n.operationType){case"signIn":const E=await Le._fromIdTokenResponse(a,n.operationType,d);return await a._updateCurrentUser(E.user),E;case"reauthenticate":return G(n.user,a,"internal-error"),Le._forOperation(n.user,n.operationType,d);default:Oe(a,"internal-error")}})}async resolveSignIn(e){const n=e;return this.signInResolver(n)}}function _l(t,e){var n;const a=me(t),i=e;return G(e.customData.operationType,a,"argument-error"),G((n=i.customData._serverResponse)===null||n===void 0?void 0:n.mfaPendingCredential,a,"argument-error"),Sa._fromError(a,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wl(t,e){return Te(t,"POST","/v2/accounts/mfaEnrollment:start",Se(t,e))}function Nl(t,e){return Te(t,"POST","/v2/accounts/mfaEnrollment:finalize",Se(t,e))}function Pl(t,e){return Te(t,"POST","/v2/accounts/mfaEnrollment:withdraw",Se(t,e))}class Ta{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(n=>{n.mfaInfo&&(this.enrolledFactors=n.mfaInfo.map(a=>Jt._fromServerResponse(e.auth,a)))})}static _fromUser(e){return new Ta(e)}async getSession(){return nt._fromIdtoken(await this.user.getIdToken(),this.user.auth)}async enroll(e,n){const a=e,i=await this.getSession(),r=await ze(this.user,a._process(this.user.auth,i,n));return await this.user._updateTokensIfNecessary(r),this.user.reload()}async unenroll(e){const n=typeof e=="string"?e:e.uid,a=await this.user.getIdToken();try{const i=await ze(this.user,Pl(this.user.auth,{idToken:a,mfaEnrollmentId:n}));this.enrolledFactors=this.enrolledFactors.filter(({uid:r})=>r!==n),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const Hn=new WeakMap;function xl(t){const e=me(t);return Hn.has(e)||Hn.set(e,Ta._fromUser(e)),Hn.get(e)}const En="__sak";/**
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
 */class fs{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(En,"1"),this.storage.removeItem(En),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kl(){const t=be();return Aa(t)||Ct(t)}const Ll=1e3,Ml=10;class gs extends fs{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=kl()&&_o(),this.fallbackToPolling=Ji(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const a=this.storage.getItem(n),i=this.localCache[n];a!==i&&e(n,i,a)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,u,h)=>{this.notifyListeners(o,h)});return}const a=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(a);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(a,e.newValue):this.storage.removeItem(a);else if(this.localCache[a]===e.newValue&&!n)return}const i=()=>{const o=this.storage.getItem(a);!n&&this.localCache[a]===o||this.notifyListeners(a,o)},r=this.storage.getItem(a);Oo()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ml):i()}notifyListeners(e,n){this.localCache[e]=n;const a=this.listeners[e];if(a)for(const i of Array.from(a))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,a)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:a}),!0)})},Ll)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}gs.type="LOCAL";const ba=gs;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As extends fs{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}As.type="SESSION";const ot=As;/**
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
 */function Dl(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Pn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const a=new Pn(e);return this.receivers.push(a),a}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:a,eventType:i,data:r}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:a,eventType:i});const u=Array.from(o).map(async d=>d(n.origin,r)),h=await Dl(u);n.ports[0].postMessage({status:"done",eventId:a,eventType:i,response:h})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Pn.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class jl{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,a=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let r,o;return new Promise((u,h)=>{const d=Xt("",20);i.port1.start();const E=setTimeout(()=>{h(new Error("unsupported_event"))},a);o={messageChannel:i,onMessage(R){const x=R;if(x.data.eventId===d)switch(x.data.status){case"ack":clearTimeout(E),r=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),u(x.data.response);break;default:clearTimeout(E),clearTimeout(r),h(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function Ca(){return typeof Ie().WorkerGlobalScope<"u"&&typeof Ie().importScripts=="function"}async function Vl(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ul(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Gl(){return Ca()?self:null}/**
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
 */const Es="firebaseLocalStorageDb",$l=1,yn="firebaseLocalStorage",ys="fbase_key";class Qt{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function xn(t,e){return t.transaction([yn],e?"readwrite":"readonly").objectStore(yn)}function Hl(){const t=indexedDB.deleteDatabase(Es);return new Qt(t).toPromise()}function Qn(){const t=indexedDB.open(Es,$l);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const a=t.result;try{a.createObjectStore(yn,{keyPath:ys})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const a=t.result;a.objectStoreNames.contains(yn)?e(a):(a.close(),await Hl(),e(await Qn()))})})}async function pi(t,e,n){const a=xn(t,!0).put({[ys]:e,value:n});return new Qt(a).toPromise()}async function Bl(t,e){const n=xn(t,!1).get(e),a=await new Qt(n).toPromise();return a===void 0?null:a.value}function mi(t,e){const n=xn(t,!0).delete(e);return new Qt(n).toPromise()}const zl=800,Wl=3;class vs{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Qn(),this.db)}async _withRetries(e){let n=0;for(;;)try{const a=await this._openDb();return await e(a)}catch(a){if(n++>Wl)throw a;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ca()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Pn._getInstance(Gl()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Vl(),!this.activeServiceWorker)return;this.sender=new jl(this.activeServiceWorker);const a=await this.sender._send("ping",{},800);a&&!((e=a[0])===null||e===void 0)&&e.fulfilled&&!((n=a[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ul()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Qn();return await pi(e,En,"1"),await mi(e,En),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(a=>pi(a,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(a=>Bl(a,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>mi(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const r=xn(i,!1).getAll();return new Qt(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],a=new Set;for(const{fbase_key:i,value:r}of e)a.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!a.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const a=this.listeners[e];if(a)for(const i of Array.from(a))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),zl)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}vs.type="LOCAL";const Bt=vs;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const Yl=500,Zl=6e4,sn=1e12;class Jl{constructor(e){this.auth=e,this.counter=sn,this._widgets=new Map}render(e,n){const a=this.counter;return this._widgets.set(a,new Xl(e,this.auth.name,n||{})),this.counter++,a}reset(e){var n;const a=e||sn;(n=this._widgets.get(a))===null||n===void 0||n.delete(),this._widgets.delete(a)}getResponse(e){var n;const a=e||sn;return((n=this._widgets.get(a))===null||n===void 0?void 0:n.getResponse())||""}async execute(e){var n;const a=e||sn;return(n=this._widgets.get(a))===null||n===void 0||n.execute(),""}}class Xl{constructor(e,n,a){this.params=a,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;G(i,"argument-error",{appName:n}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=Ql(50);const{callback:e,"expired-callback":n}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,n)try{n()}catch{}this.isVisible&&this.execute()},Zl)},Yl))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function Ql(t){const e=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let a=0;a<t;a++)e.push(n.charAt(Math.floor(Math.random()*n.length)));return e.join("")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bn=ts("rcb"),ec=new Yt(3e4,6e4),tc="https://www.google.com/recaptcha/api.js?";class nc{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=Ie().grecaptcha)===null||e===void 0)&&e.render)}load(e,n=""){return G(ac(n),e,"argument-error"),this.shouldResolveImmediately(n)&&li(Ie().grecaptcha)?Promise.resolve(Ie().grecaptcha):new Promise((a,i)=>{const r=Ie().setTimeout(()=>{i(Re(e,"network-request-failed"))},ec.get());Ie()[Bn]=()=>{Ie().clearTimeout(r),delete Ie()[Bn];const u=Ie().grecaptcha;if(!u||!li(u)){i(Re(e,"internal-error"));return}const h=u.render;u.render=(d,E)=>{const R=h(d,E);return this.counter++,R},this.hostLanguage=n,a(u)};const o=`${tc}?${Tt({onload:Bn,render:"explicit",hl:n})}`;Ea(o).catch(()=>{clearTimeout(r),i(Re(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var n;return!!(!((n=Ie().grecaptcha)===null||n===void 0)&&n.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function ac(t){return t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t)}class ic{async load(e){return new Jl(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is="recaptcha",sc={theme:"light",type:"image"};let rc=class{constructor(e,n=Object.assign({},sc),a){this.parameters=n,this.type=Is,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=ye(a),this.isInvisible=this.parameters.size==="invisible",G(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof e=="string"?document.getElementById(e):e;G(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new ic:new nc,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),n=this.getAssertedRecaptcha(),a=n.getResponse(e);return a||new Promise(i=>{const r=o=>{o&&(this.tokenChangeListeners.delete(r),i(o))};this.tokenChangeListeners.add(r),this.isInvisible&&n.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){G(!this.parameters.sitekey,this.auth,"argument-error"),G(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),G(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return n=>{if(this.tokenChangeListeners.forEach(a=>a(n)),typeof e=="function")e(n);else if(typeof e=="string"){const a=Ie()[e];typeof a=="function"&&a(n)}}}assertNotDestroyed(){G(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const n=document.createElement("div");e.appendChild(n),e=n}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){G(fa()&&!Ca(),this.auth,"internal-error"),await oc(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await wo(this.auth);G(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return G(this.recaptcha,this.auth,"internal-error"),this.recaptcha}};function oc(){let t=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}t=()=>e(),window.addEventListener("load",t)}).catch(e=>{throw t&&window.removeEventListener("load",t),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e,n){this.verificationId=e,this.onConfirmation=n}confirm(e){const n=st._fromVerification(this.verificationId,e);return this.onConfirmation(n)}}async function lc(t,e,n){const a=ye(t),i=await kn(a,e,me(n));return new Ra(i,r=>Nn(a,r))}async function cc(t,e,n){const a=me(t);await wn(!1,a,"phone");const i=await kn(a.auth,e,me(n));return new Ra(i,r=>ds(a,r))}async function dc(t,e,n){const a=me(t),i=await kn(a.auth,e,me(n));return new Ra(i,r=>us(a,r))}async function kn(t,e,n){var a;const i=await n.verify();try{G(typeof i=="string",t,"argument-error"),G(n.type===Is,t,"argument-error");let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){const o=r.session;if("phoneNumber"in r)return G(o.type==="enroll",t,"internal-error"),(await wl(t,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{G(o.type==="signin",t,"internal-error");const u=((a=r.multiFactorHint)===null||a===void 0?void 0:a.uid)||r.multiFactorUid;return G(u,t,"missing-multi-factor-info"),(await ql(t,{mfaPendingCredential:o.credential,mfaEnrollmentId:u,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await Wo(t,{phoneNumber:r.phoneNumber,recaptchaToken:i});return o}}finally{n._reset()}}async function uc(t,e){await ya(me(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lt=class un{constructor(e){this.providerId=un.PROVIDER_ID,this.auth=ye(e)}verifyPhoneNumber(e,n){return kn(this.auth,e,me(n))}static credential(e,n){return st._fromVerification(e,n)}static credentialFromResult(e){const n=e;return un.credentialFromTaggedObject(n)}static credentialFromError(e){return un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:n,temporaryProof:a}=e;return n&&a?st._fromTokenResponse(n,a):null}};lt.PROVIDER_ID="phone";lt.PHONE_SIGN_IN_METHOD="phone";/**
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
 */function dt(t,e){return e?xe(e):(G(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Oa extends Rt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Be(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Be(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Be(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function hc(t){return cs(t.auth,new Oa(t),t.bypassAuthState)}function pc(t){const{auth:e,user:n}=t;return G(n,e,"internal-error"),ls(n,new Oa(t),t.bypassAuthState)}async function mc(t){const{auth:e,user:n}=t;return G(n,e,"internal-error"),ya(n,new Oa(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e,n,a,i,r=!1){this.auth=e,this.resolver=a,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(a){this.reject(a)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:a,postBody:i,tenantId:r,error:o,type:u}=e;if(o){this.reject(o);return}const h={auth:this.auth,requestUri:n,sessionId:a,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(h))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hc;case"linkViaPopup":case"linkViaRedirect":return mc;case"reauthViaPopup":case"reauthViaRedirect":return pc;default:Oe(this.auth,"internal-error")}}resolve(e){Me(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Me(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc=new Yt(2e3,1e4);async function gc(t,e,n){const a=ye(t);bt(t,e,qe);const i=dt(a,n);return new $e(a,"signInViaPopup",e,i).executeNotNull()}async function Ac(t,e,n){const a=me(t);bt(a.auth,e,qe);const i=dt(a.auth,n);return new $e(a.auth,"reauthViaPopup",e,i,a).executeNotNull()}async function Ec(t,e,n){const a=me(t);bt(a.auth,e,qe);const i=dt(a.auth,n);return new $e(a.auth,"linkViaPopup",e,i,a).executeNotNull()}class $e extends Ss{constructor(e,n,a,i,r){super(e,n,i,r),this.provider=a,this.authWindow=null,this.pollId=null,$e.currentPopupAction&&$e.currentPopupAction.cancel(),$e.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return G(e,this.auth,"internal-error"),e}async onExecution(){Me(this.filter.length===1,"Popup operations only handle one event");const e=Xt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Re(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Re(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,$e.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,a;if(!((a=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||a===void 0)&&a.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Re(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,fc.get())};e()}}$e.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yc="pendingRedirect",jt=new Map;class vc extends Ss{constructor(e,n,a=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,a),this.eventId=null}async execute(){let e=jt.get(this.auth._key());if(!e){try{const a=await Ic(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(a)}catch(n){e=()=>Promise.reject(n)}jt.set(this.auth._key(),e)}return this.bypassAuthState||jt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ic(t,e){const n=bs(e),a=Ts(t);if(!await a._isAvailable())return!1;const i=await a._get(n)==="true";return await a._remove(n),i}async function _a(t,e){return Ts(t)._set(bs(e),"true")}function Sc(){jt.clear()}function wa(t,e){jt.set(t._key(),e)}function Ts(t){return xe(t._redirectPersistence)}function bs(t){return it(yc,t.config.apiKey,t.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tc(t,e,n){return bc(t,e,n)}async function bc(t,e,n){const a=ye(t);bt(t,e,qe),await a._initializationPromise;const i=dt(a,n);return await _a(i,a),i._openRedirect(a,e,"signInViaRedirect")}function Cc(t,e,n){return Rc(t,e,n)}async function Rc(t,e,n){const a=me(t);bt(a.auth,e,qe),await a.auth._initializationPromise;const i=dt(a.auth,n);await _a(i,a.auth);const r=await Cs(a);return i._openRedirect(a.auth,e,"reauthViaRedirect",r)}function Oc(t,e,n){return _c(t,e,n)}async function _c(t,e,n){const a=me(t);bt(a.auth,e,qe),await a.auth._initializationPromise;const i=dt(a.auth,n);await wn(!1,a,e.providerId),await _a(i,a.auth);const r=await Cs(a);return i._openRedirect(a.auth,e,"linkViaRedirect",r)}async function wc(t,e){return await ye(t)._initializationPromise,Ln(t,e,!1)}async function Ln(t,e,n=!1){const a=ye(t),i=dt(a,e),o=await new vc(a,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await a._persistUserIfCurrent(o.user),await a._setRedirectUser(null,e)),o}async function Cs(t){const e=Xt(`${t.uid}:::`);return t._redirectEventId=e,await t.auth._setRedirectUser(t),await t.auth._persistUserIfCurrent(t),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nc=10*60*1e3;class Rs{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(a=>{this.isEventForConsumer(e,a)&&(n=!0,this.sendToConsumer(e,a),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Pc(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var a;if(e.error&&!Os(e)){const i=((a=e.error.code)===null||a===void 0?void 0:a.split("auth/")[1])||"internal-error";n.onError(Re(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const a=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&a}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Nc&&this.cachedEventUids.clear(),this.cachedEventUids.has(fi(e))}saveEventToCache(e){this.cachedEventUids.add(fi(e)),this.lastProcessedEventTime=Date.now()}}function fi(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Os({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Pc(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Os(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _s(t,e={}){return Te(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xc=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,kc=/^https?/;async function Lc(t){if(t.config.emulator)return;const{authorizedDomains:e}=await _s(t);for(const n of e)try{if(Mc(n))return}catch{}Oe(t,"unauthorized-domain")}function Mc(t){const e=Ut(),{protocol:n,hostname:a}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&a===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===a}if(!kc.test(n))return!1;if(xc.test(t))return a===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(a)}/**
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
 */const Dc=new Yt(3e4,6e4);function gi(){const t=Ie().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function jc(t){return new Promise((e,n)=>{var a,i,r;function o(){gi(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{gi(),n(Re(t,"network-request-failed"))},timeout:Dc.get()})}if(!((i=(a=Ie().gapi)===null||a===void 0?void 0:a.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((r=Ie().gapi)===null||r===void 0)&&r.load)o();else{const u=ts("iframefcb");return Ie()[u]=()=>{gapi.load?o():n(Re(t,"network-request-failed"))},Ea(`https://apis.google.com/js/api.js?onload=${u}`).catch(h=>n(h))}}).catch(e=>{throw hn=null,e})}let hn=null;function Fc(t){return hn=hn||jc(t),hn}/**
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
 */const Vc=new Yt(5e3,15e3),Uc="__/auth/iframe",Gc="emulator/auth/iframe",$c={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Hc=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Bc(t){const e=t.config;G(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?ga(e,Gc):`https://${t.config.authDomain}/${Uc}`,a={apiKey:e.apiKey,appName:t.name,v:qt},i=Hc.get(t.config.apiHost);i&&(a.eid=i);const r=t._getFrameworks();return r.length&&(a.fw=r.join(",")),`${n}?${Tt(a).slice(1)}`}async function zc(t){const e=await Fc(t),n=Ie().gapi;return G(n,t,"internal-error"),e.open({where:document.body,url:Bc(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:$c,dontclear:!0},a=>new Promise(async(i,r)=>{await a.restyle({setHideOnLeave:!1});const o=Re(t,"network-request-failed"),u=Ie().setTimeout(()=>{r(o)},Vc.get());function h(){Ie().clearTimeout(u),i(a)}a.ping(h).then(h,()=>{r(o)})}))}/**
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
 */const Wc={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qc=500,Kc=600,Yc="_blank",Zc="http://localhost";class Ai{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Jc(t,e,n,a=qc,i=Kc){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-a)/2,0).toString();let u="";const h=Object.assign(Object.assign({},Wc),{width:a.toString(),height:i.toString(),top:r,left:o}),d=be().toLowerCase();n&&(u=qi(d)?Yc:n),Wi(d)&&(e=e||Zc,h.scrollbars="yes");const E=Object.entries(h).reduce((x,[g,D])=>`${x}${g}=${D},`,"");if(Ro(d)&&u!=="_self")return Xc(e||"",u),new Ai(null);const R=window.open(e||"",u,E);G(R,t,"popup-blocked");try{R.focus()}catch{}return new Ai(R)}function Xc(t,e){const n=document.createElement("a");n.href=t,n.target=e;const a=document.createEvent("MouseEvent");a.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(a)}/**
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
 */const Qc="__/auth/handler",ed="emulator/auth/handler",td=encodeURIComponent("fac");async function ea(t,e,n,a,i,r){G(t.config.authDomain,t,"auth-domain-config-required"),G(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:a,v:qt,eventId:i};if(e instanceof qe){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Gr(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[E,R]of Object.entries(r||{}))o[E]=R}if(e instanceof Ot){const E=e.getScopes().filter(R=>R!=="");E.length>0&&(o.scopes=E.join(","))}t.tenantId&&(o.tid=t.tenantId);const u=o;for(const E of Object.keys(u))u[E]===void 0&&delete u[E];const h=await t._getAppCheckToken(),d=h?`#${td}=${encodeURIComponent(h)}`:"";return`${nd(t)}?${Tt(u).slice(1)}${d}`}function nd({config:t}){return t.emulator?ga(t,ed):`https://${t.authDomain}/${Qc}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zn="webStorageSupport";class ad{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ot,this._completeRedirectFn=Ln,this._overrideRedirectResult=wa}async _openPopup(e,n,a,i){var r;Me((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await ea(e,n,a,Ut(),i);return Jc(e,o,Xt())}async _openRedirect(e,n,a,i){await this._originValidation(e);const r=await ea(e,n,a,Ut(),i);return Fl(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:r}=this.eventManagers[n];return i?Promise.resolve(i):(Me(r,"If manager is not set, promise should be"),r)}const a=this.initAndGetManager(e);return this.eventManagers[n]={promise:a},a.catch(()=>{delete this.eventManagers[n]}),a}async initAndGetManager(e){const n=await zc(e),a=new Rs(e);return n.register("authEvent",i=>(G(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:a.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:a},this.iframes[e._key()]=n,a}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(zn,{type:zn},i=>{var r;const o=(r=i==null?void 0:i[0])===null||r===void 0?void 0:r[zn];o!==void 0&&n(!!o),Oe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Lc(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Ji()||Aa()||Ct()}}const id=ad;class sd{constructor(e){this.factorId=e}_process(e,n,a){switch(n.type){case"enroll":return this._finalizeEnroll(e,n.credential,a);case"signin":return this._finalizeSignIn(e,n.credential);default:return Ue("unexpected MultiFactorSessionType")}}}class Na extends sd{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Na(e)}_finalizeEnroll(e,n,a){return Nl(e,{idToken:n,displayName:a,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,n){return Kl(e,{mfaPendingCredential:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class ws{constructor(){}static assertion(e){return Na._fromCredential(e)}}ws.FACTOR_ID="phone";var Ei="@firebase/auth",yi="0.23.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(a=>{e((a==null?void 0:a.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){G(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function od(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function ld(t){ei(new qn("auth",(e,{options:n})=>{const a=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:u}=a.options;G(o&&!o.includes(":"),"invalid-api-key",{appName:a.name});const h={apiKey:o,authDomain:u,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Xi(t)},d=new Mo(a,i,r,h);return Do(d,n),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,a)=>{e.getProvider("auth-internal").initialize()})),ei(new qn("auth-internal",e=>{const n=ye(e.getProvider("auth").getImmediate());return(a=>new rd(a))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ti(Ei,yi,od(t)),ti(Ei,yi,"esm2017")}/**
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
 */const dd=2e3;async function ud(t,e,n){var a;const{BuildInfo:i}=ct();Me(e.sessionId,"AuthEvent did not contain a session ID");const r=await gd(e.sessionId),o={};return Ct()?o.ibi=i.packageName:Zt()?o.apn=i.packageName:Oe(t,"operation-not-supported-in-this-environment"),i.displayName&&(o.appDisplayName=i.displayName),o.sessionId=r,ea(t,n,e.type,void 0,(a=e.eventId)!==null&&a!==void 0?a:void 0,o)}async function hd(t){const{BuildInfo:e}=ct(),n={};Ct()?n.iosBundleId=e.packageName:Zt()?n.androidPackageName=e.packageName:Oe(t,"operation-not-supported-in-this-environment"),await _s(t,n)}function pd(t){const{cordova:e}=ct();return new Promise(n=>{e.plugins.browsertab.isAvailable(a=>{let i=null;a?e.plugins.browsertab.openUrl(t):i=e.InAppBrowser.open(t,Co()?"_blank":"_system","location=yes"),n(i)})})}async function md(t,e,n){const{cordova:a}=ct();let i=()=>{};try{await new Promise((r,o)=>{let u=null;function h(){var R;r();const x=(R=a.plugins.browsertab)===null||R===void 0?void 0:R.close;typeof x=="function"&&x(),typeof(n==null?void 0:n.close)=="function"&&n.close()}function d(){u||(u=window.setTimeout(()=>{o(Re(t,"redirect-cancelled-by-user"))},dd))}function E(){(document==null?void 0:document.visibilityState)==="visible"&&d()}e.addPassiveListener(h),document.addEventListener("resume",d,!1),Zt()&&document.addEventListener("visibilitychange",E,!1),i=()=>{e.removePassiveListener(h),document.removeEventListener("resume",d,!1),document.removeEventListener("visibilitychange",E,!1),u&&window.clearTimeout(u)}})}finally{i()}}function fd(t){var e,n,a,i,r,o,u,h,d,E;const R=ct();G(typeof((e=R==null?void 0:R.universalLinks)===null||e===void 0?void 0:e.subscribe)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),G(typeof((n=R==null?void 0:R.BuildInfo)===null||n===void 0?void 0:n.packageName)<"u",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),G(typeof((r=(i=(a=R==null?void 0:R.cordova)===null||a===void 0?void 0:a.plugins)===null||i===void 0?void 0:i.browsertab)===null||r===void 0?void 0:r.openUrl)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),G(typeof((h=(u=(o=R==null?void 0:R.cordova)===null||o===void 0?void 0:o.plugins)===null||u===void 0?void 0:u.browsertab)===null||h===void 0?void 0:h.isAvailable)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),G(typeof((E=(d=R==null?void 0:R.cordova)===null||d===void 0?void 0:d.InAppBrowser)===null||E===void 0?void 0:E.open)=="function",t,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}async function gd(t){const e=Ad(t),n=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n)).map(i=>i.toString(16).padStart(2,"0")).join("")}function Ad(t){if(Me(/[0-9a-zA-Z]+/.test(t),"Can only convert alpha-numeric strings"),typeof TextEncoder<"u")return new TextEncoder().encode(t);const e=new ArrayBuffer(t.length),n=new Uint8Array(e);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ed=20;class yd extends Rs{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInialized(),this.passiveListeners.forEach(n=>n(e)),super.onEvent(e)}async initialized(){await this.initPromise}}function vd(t,e,n=null){return{type:e,eventId:n,urlResponse:null,sessionId:Td(),postBody:null,tenantId:t.tenantId,error:Re(t,"no-auth-event")}}function Id(t,e){return ta()._set(na(t),e)}async function vi(t){const e=await ta()._get(na(t));return e&&await ta()._remove(na(t)),e}function Sd(t,e){var n,a;const i=Cd(e);if(i.includes("/__/auth/callback")){const r=pn(i),o=r.firebaseError?bd(decodeURIComponent(r.firebaseError)):null,u=(a=(n=o==null?void 0:o.code)===null||n===void 0?void 0:n.split("auth/"))===null||a===void 0?void 0:a[1],h=u?Re(u):null;return h?{type:t.type,eventId:t.eventId,tenantId:t.tenantId,error:h,urlResponse:null,sessionId:null,postBody:null}:{type:t.type,eventId:t.eventId,tenantId:t.tenantId,sessionId:t.sessionId,urlResponse:i,postBody:null}}return null}function Td(){const t=[],e="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<Ed;n++){const a=Math.floor(Math.random()*e.length);t.push(e.charAt(a))}return t.join("")}function ta(){return xe(ba)}function na(t){return it("authEvent",t.config.apiKey,t.name)}function bd(t){try{return JSON.parse(t)}catch{return null}}function Cd(t){const e=pn(t),n=e.link?decodeURIComponent(e.link):void 0,a=pn(n).link,i=e.deep_link_id?decodeURIComponent(e.deep_link_id):void 0;return pn(i).link||i||a||n||t}function pn(t){if(!(t!=null&&t.includes("?")))return{};const[e,...n]=t.split("?");return mt(n.join("?"))}/**
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
 */const Rd=500;class Od{constructor(){this._redirectPersistence=ot,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=Ln,this._overrideRedirectResult=wa}async _initialize(e){const n=e._key();let a=this.eventManagers.get(n);return a||(a=new yd(e),this.eventManagers.set(n,a),this.attachCallbackListeners(e,a)),a}_openPopup(e){Oe(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,n,a,i){fd(e);const r=await this._initialize(e);await r.initialized(),r.resetRedirect(),Sc(),await this._originValidation(e);const o=vd(e,a,i);await Id(e,o);const u=await ud(e,o,n),h=await pd(u);return md(e,r,h)}_isIframeWebStorageSupported(e,n){throw new Error("Method not implemented.")}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=hd(e)),this.originValidationPromises[n]}attachCallbackListeners(e,n){const{universalLinks:a,handleOpenURL:i,BuildInfo:r}=ct(),o=setTimeout(async()=>{await vi(e),n.onEvent(Ii())},Rd),u=async E=>{clearTimeout(o);const R=await vi(e);let x=null;R&&(E!=null&&E.url)&&(x=Sd(R,E.url)),n.onEvent(x||Ii())};typeof a<"u"&&typeof a.subscribe=="function"&&a.subscribe(null,u);const h=i,d=`${r.packageName.toLowerCase()}://`;ct().handleOpenURL=async E=>{if(E.toLowerCase().startsWith(d)&&u({url:E}),typeof h=="function")try{h(E)}catch(R){console.error(R)}}}}const _d=Od;function Ii(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:Re("no-auth-event")}}/**
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
 */const xd=1e3;function Ft(){var t;return((t=self==null?void 0:self.location)===null||t===void 0?void 0:t.protocol)||null}function kd(){return Ft()==="http:"||Ft()==="https:"}function Ns(t=be()){return!!((Ft()==="file:"||Ft()==="ionic:"||Ft()==="capacitor:")&&t.toLowerCase().match(/iphone|ipad|ipod|android/))}function Ld(){return ua()||Ni()}function Md(){return wi()&&(document==null?void 0:document.documentMode)===11}function Dd(t=be()){return/Edge\/\d+/.test(t)}function jd(t=be()){return Md()||Dd(t)}function Ps(){try{const t=self.localStorage,e=Xt();if(t)return t.setItem(e,"1"),t.removeItem(e),jd()?Kn():!0}catch{return Pa()&&Kn()}return!1}function Pa(){return typeof global<"u"&&"WorkerGlobalScope"in global&&"importScripts"in global}function Wn(){return(kd()||Oi()||Ns())&&!Ld()&&Ps()&&!Pa()}function xs(){return Ns()&&typeof document<"u"}async function Fd(){return xs()?new Promise(t=>{const e=setTimeout(()=>{t(!1)},xd);document.addEventListener("deviceready",()=>{clearTimeout(e),t(!0)})}):!1}function Vd(){return typeof window<"u"?window:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pe={LOCAL:"local",NONE:"none",SESSION:"session"},Pt=G,ks="persistence";function Ud(t,e){if(Pt(Object.values(Pe).includes(e),t,"invalid-persistence-type"),ua()){Pt(e!==Pe.SESSION,t,"unsupported-persistence-type");return}if(Ni()){Pt(e===Pe.NONE,t,"unsupported-persistence-type");return}if(Pa()){Pt(e===Pe.NONE||e===Pe.LOCAL&&Kn(),t,"unsupported-persistence-type");return}Pt(e===Pe.NONE||Ps(),t,"unsupported-persistence-type")}async function aa(t){await t._initializationPromise;const e=Ls(),n=it(ks,t.config.apiKey,t.name);e&&e.setItem(n,t._getPersistence())}function Gd(t,e){const n=Ls();if(!n)return[];const a=it(ks,t,e);switch(n.getItem(a)){case Pe.NONE:return[vt];case Pe.LOCAL:return[Bt,ot];case Pe.SESSION:return[ot];default:return[]}}function Ls(){var t;try{return((t=Vd())===null||t===void 0?void 0:t.sessionStorage)||null}catch{return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $d=G;class Ze{constructor(){this.browserResolver=xe(id),this.cordovaResolver=xe(_d),this.underlyingResolver=null,this._redirectPersistence=ot,this._completeRedirectFn=Ln,this._overrideRedirectResult=wa}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,n,a,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,n,a,i)}async _openRedirect(e,n,a,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,n,a,i)}_isIframeWebStorageSupported(e,n){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,n)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return xs()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return $d(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await Fd();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ms(t){return t.unwrap()}function Hd(t){return t.wrapped()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bd(t){return Ds(t)}function zd(t,e){var n;const a=(n=e.customData)===null||n===void 0?void 0:n._tokenResponse;if((e==null?void 0:e.code)==="auth/multi-factor-auth-required"){const i=e;i.resolver=new Wd(t,_l(t,e))}else if(a){const i=Ds(e),r=e;i&&(r.credential=i,r.tenantId=a.tenantId||void 0,r.email=a.email||void 0,r.phoneNumber=a.phoneNumber||void 0)}}function Ds(t){const{_tokenResponse:e}=t instanceof Je?t.customData:t;if(!e)return null;if(!(t instanceof Je)&&"temporaryProof"in e&&"phoneNumber"in e)return lt.credentialFromResult(t);const n=e.providerId;if(!n||n===Nt.PASSWORD)return null;let a;switch(n){case Nt.GOOGLE:a=je;break;case Nt.FACEBOOK:a=De;break;case Nt.GITHUB:a=Fe;break;case Nt.TWITTER:a=Ve;break;default:const{oauthIdToken:i,oauthAccessToken:r,oauthTokenSecret:o,pendingToken:u,nonce:h}=e;return!r&&!o&&!i&&!u?null:u?n.startsWith("saml.")?It._create(n,u):Ge._fromParams({providerId:n,signInMethod:n,pendingToken:u,idToken:i,accessToken:r}):new gt(n).credential({idToken:i,accessToken:r,rawNonce:h})}return t instanceof Je?a.credentialFromError(t):a.credentialFromResult(t)}function Ne(t,e){return e.catch(n=>{throw n instanceof Je&&zd(t,n),n}).then(n=>{const a=n.operationType,i=n.user;return{operationType:a,credential:Bd(n),additionalUserInfo:Ol(n),user:He.getOrCreate(i)}})}async function ia(t,e){const n=await e;return{verificationId:n.verificationId,confirm:a=>Ne(t,n.confirm(a))}}class Wd{constructor(e,n){this.resolver=n,this.auth=Hd(e)}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return Ne(Ms(this.auth),this.resolver.resolveSignIn(e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this._delegate=e,this.multiFactor=xl(e)}static getOrCreate(e){return He.USER_MAP.has(e)||He.USER_MAP.set(e,new He(e)),He.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return Ne(this.auth,ds(this._delegate,e))}async linkWithPhoneNumber(e,n){return ia(this.auth,cc(this._delegate,e,n))}async linkWithPopup(e){return Ne(this.auth,Ec(this._delegate,e,Ze))}async linkWithRedirect(e){return await aa(ye(this.auth)),Oc(this._delegate,e,Ze)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return Ne(this.auth,us(this._delegate,e))}reauthenticateWithPhoneNumber(e,n){return ia(this.auth,dc(this._delegate,e,n))}reauthenticateWithPopup(e){return Ne(this.auth,Ac(this._delegate,e,Ze))}async reauthenticateWithRedirect(e){return await aa(ye(this.auth)),Cc(this._delegate,e,Ze)}sendEmailVerification(e){return gl(this._delegate,e)}async unlink(e){return await nl(this._delegate,e),this}updateEmail(e){return vl(this._delegate,e)}updatePassword(e){return Il(this._delegate,e)}updatePhoneNumber(e){return uc(this._delegate,e)}updateProfile(e){return yl(this._delegate,e)}verifyBeforeUpdateEmail(e,n){return Al(this._delegate,e,n)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}He.USER_MAP=new WeakMap;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt=G;class sa{constructor(e,n){if(this.app=e,n.isInitialized()){this._delegate=n.getImmediate(),this.linkUnderlyingAuth();return}const{apiKey:a}=e.options;xt(a,"invalid-api-key",{appName:e.name}),xt(a,"invalid-api-key",{appName:e.name});const i=typeof window<"u"?Ze:void 0;this._delegate=n.initialize({options:{persistence:qd(a,e.name),popupRedirectResolver:i}}),this._delegate._updateErrorMap(so),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?He.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,n){jo(this._delegate,e,n)}applyActionCode(e){return ol(this._delegate,e)}checkActionCode(e){return hs(this._delegate,e)}confirmPasswordReset(e,n){return rl(this._delegate,e,n)}async createUserWithEmailAndPassword(e,n){return Ne(this._delegate,cl(this._delegate,e,n))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return fl(this._delegate,e)}isSignInWithEmailLink(e){return hl(this._delegate,e)}async getRedirectResult(){xt(Wn(),this._delegate,"operation-not-supported-in-this-environment");const e=await wc(this._delegate,Ze);return e?Ne(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){wd(this._delegate,e)}onAuthStateChanged(e,n,a){const{next:i,error:r,complete:o}=Si(e,n,a);return this._delegate.onAuthStateChanged(i,r,o)}onIdTokenChanged(e,n,a){const{next:i,error:r,complete:o}=Si(e,n,a);return this._delegate.onIdTokenChanged(i,r,o)}sendSignInLinkToEmail(e,n){return ul(this._delegate,e,n)}sendPasswordResetEmail(e,n){return sl(this._delegate,e,n||void 0)}async setPersistence(e){Ud(this._delegate,e);let n;switch(e){case Pe.SESSION:n=ot;break;case Pe.LOCAL:n=await xe(Bt)._isAvailable()?Bt:ba;break;case Pe.NONE:n=vt;break;default:return Oe("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(n)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return Ne(this._delegate,tl(this._delegate))}signInWithCredential(e){return Ne(this._delegate,Nn(this._delegate,e))}signInWithCustomToken(e){return Ne(this._delegate,il(this._delegate,e))}signInWithEmailAndPassword(e,n){return Ne(this._delegate,dl(this._delegate,e,n))}signInWithEmailLink(e,n){return Ne(this._delegate,pl(this._delegate,e,n))}signInWithPhoneNumber(e,n){return ia(this._delegate,lc(this._delegate,e,n))}async signInWithPopup(e){return xt(Wn(),this._delegate,"operation-not-supported-in-this-environment"),Ne(this._delegate,gc(this._delegate,e,Ze))}async signInWithRedirect(e){return xt(Wn(),this._delegate,"operation-not-supported-in-this-environment"),await aa(this._delegate),Tc(this._delegate,e,Ze)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return ll(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}sa.Persistence=Pe;function Si(t,e,n){let a=t;typeof t!="function"&&({next:a,error:e,complete:n}=t);const i=a;return{next:o=>i(o&&He.getOrCreate(o)),error:e,complete:n}}function qd(t,e){const n=Gd(t,e);if(typeof self<"u"&&!n.includes(Bt)&&n.push(Bt),typeof window<"u")for(const a of[ba,ot])n.includes(a)||n.push(a);return n.includes(vt)||n.push(vt),n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(){this.providerId="phone",this._delegate=new lt(Ms(Z.auth()))}static credential(e,n){return lt.credential(e,n)}verifyPhoneNumber(e,n){return this._delegate.verifyPhoneNumber(e,n)}unwrap(){return this._delegate}}xa.PHONE_SIGN_IN_METHOD=lt.PHONE_SIGN_IN_METHOD;xa.PROVIDER_ID=lt.PROVIDER_ID;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd=G;class Yd{constructor(e,n,a=Z.app()){var i;Kd((i=a.options)===null||i===void 0?void 0:i.apiKey,"invalid-api-key",{appName:a.name}),this._delegate=new rc(e,n,a.auth()),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zd="auth-compat";function Jd(t){t.INTERNAL.registerComponent(new qn(Zd,e=>{const n=e.getProvider("app-compat").getImmediate(),a=e.getProvider("auth");return new sa(n,a)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:ht.EMAIL_SIGNIN,PASSWORD_RESET:ht.PASSWORD_RESET,RECOVER_EMAIL:ht.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:ht.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:ht.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:ht.VERIFY_EMAIL}},EmailAuthProvider:Qe,FacebookAuthProvider:De,GithubAuthProvider:Fe,GoogleAuthProvider:je,OAuthProvider:gt,SAMLAuthProvider:gn,PhoneAuthProvider:xa,PhoneMultiFactorGenerator:ws,RecaptchaVerifier:Yd,TwitterAuthProvider:Ve,Auth:sa,AuthCredential:Rt,Error:Je}).setInstantiationMode("LAZY").setMultipleInstances(!1)),t.registerVersion(Nd,Pd)}Jd(Z);const rt=Z.auth(),en=t=>p.collection("adminProfiles").doc(t),ra=(t,e)=>({type:"ADMIN",data:{...e,id:t}});async function Xd(t,e){const n=t.trim().includes("@")?t.trim():`${t.trim().toLowerCase()}@subadmins.matoreal.invalid`;await rt.setPersistence(Z.auth.Auth.Persistence.SESSION);const{user:a}=await rt.signInWithEmailAndPassword(n,e);if(a.uid===Kt)return ra(a.uid,{name:"FEDERAÇÃO (ADM PRINCIPAL)",permissions:[]});try{const i=await en(a.uid).get();if(!i.exists||i.data().active!==!0)throw Error("Este acesso administrativo foi removido ou não foi autorizado.");return ra(a.uid,{name:i.data().name,permissions:Cn(i.data().permissions)})}catch(i){throw await rt.signOut(),i}}function Qd(t,e,n){return Tn(t)?()=>{}:en(t.data.id).onSnapshot(a=>{if(!a.exists||a.data().active!==!0)return n();try{e(ra(a.id,{name:a.data().name,permissions:Cn(a.data().permissions)}))}catch{n()}},n)}async function ka(){var t;if(((t=rt.currentUser)==null?void 0:t.uid)!==Kt)throw Error("Somente o ADM principal pode gerenciar acessos.")}async function js(){return Z.initializeApp(Z.app().options,`subadmin-${crypto.randomUUID()}`)}async function eu(){await ka();const t=await js();try{try{await t.firestore().collection("adminProfiles").doc("__access_probe__").get({source:"server"})}catch(e){if(e.code==="permission-denied")return!0;throw e}throw Error("Antes de cadastrar subADMs, publique as regras de proteção de adminProfiles fornecidas com esta atualização. Seu banco ainda permite acesso público a esses perfis.")}finally{await t.delete()}}async function yh({name:t,login:e,password:n,permissions:a}){if(await eu(),t=t.trim(),e=e.trim().toLowerCase(),t.length<2||t.length>80)throw Error("Nome deve ter entre 2 e 80 caracteres.");if(!/^[a-z0-9][a-z0-9._-]{2,31}$/.test(e))throw Error("Login: de 3 a 32 letras, números, pontos, traços ou sublinhados.");if(n.length<12||n.length>128)throw Error("Use uma senha de 12 a 128 caracteres.");a=Cn(a);const i=await js();let r;try{return await i.auth().setPersistence(Z.auth.Auth.Persistence.NONE),r=(await i.auth().createUserWithEmailAndPassword(`${e}@subadmins.matoreal.invalid`,n)).user,await en(r.uid).set({name:t,login:e,permissions:a,active:!0,createdAt:Date.now()}),r.uid}catch(o){throw r&&await r.delete().catch(()=>{}),o}finally{await i.auth().signOut().catch(()=>{}),await i.delete()}}async function vh(t,e){if(await ka(),t===Kt)throw Error("O ADM principal não pode ser alterado aqui.");await en(t).update({permissions:Cn(e)})}async function Ih(t){if(await ka(),t===Kt)throw Error("O ADM principal não pode ser excluído.");await en(t).delete()}const Fs={plain:"Lisa",stripes:"Listras verticais",hoops:"Listras horizontais",sash:"Faixa diagonal"},rn=(t,e)=>/^#[0-9a-f]{6}$/i.test(t)?t:e;function yt(t={},e="#16ac78"){return{shirt:rn(t.shirt,e),detail:rn(t.detail,"#ffffff"),shorts:rn(t.shorts,"#18243a"),socks:rn(t.socks,"#ffffff"),pattern:Object.hasOwn(Fs,t.pattern)?t.pattern:"plain"}}function zt(t){const e=(t==null?void 0:t.kits)||{};return{home:yt(e.home),away:yt(e.away,"#f4f4f4"),goalkeeper:yt(e.goalkeeper,"#ffbf35")}}function tt(t,e){const n=r=>[1,3,5].map(o=>parseInt(r.slice(o,o+2),16)),a=n(t),i=n(e);return Math.hypot(...a.map((r,o)=>r-i[o]))}function Sh(t,e){const n=zt(t),a=zt(e),i=[];let r=n.home,o=a.away;tt(r.shirt,o.shirt)<110&&(tt(r.shirt,a.home.shirt)>=110?(o=a.home,i.push("Visitante usa o uniforme de casa para evitar cores semelhantes.")):(o=yt({shirt:tt(r.shirt,"#f4f4f4")>tt(r.shirt,"#202033")?"#f4f4f4":"#202033",shorts:"#ff5e67",detail:"#ff5e67"}),i.push("Visitante usa uniforme de contraste neste amistoso.")));const u=[r.shirt,o.shirt],h=(d,E)=>{if(u.some(R=>tt(R,d.shirt)<100)){const x=["#ffbf35","#d83de8","#24d4ed","#151923","#f4f4f4"].sort((g,D)=>Math.min(...u.map(U=>tt(U,D)))-Math.min(...u.map(U=>tt(U,g))))[0];d={...d,shirt:x},i.push(`Goleiro ${E} usa camisa de contraste neste amistoso.`)}return u.push(d.shirt),d};return{home:r,away:o,homeGK:h(n.goalkeeper,"mandante"),awayGK:h(a.goalkeeper,"visitante"),notes:i}}const Vs=["#f5d0ac","#e8b58a","#cf9367","#aa704b","#805034","#543323"],Us=["#171717","#523323","#8d5b36","#d6b15d","#d7d7d7","#ab3459"],Gs=["#151923","#f2f4f8","#ffbf35","#f15d56","#68deae","#64b5f6"],$s=["#172027","#663f25","#345e95","#437442","#9b792d","#686873"],oa={short:"Curto",afro:"Afro",mohawk:"Moicano",long:"Longo",ponytail:"Rabo de cavalo",bald:"Careca",curls:"Cachos",spikes:"Espetado",fade:"Degradê",braids:"Tranças",swept:"Franja lateral"};function Vt(t={}){const e=(n,a)=>n.includes(a)?a:n[0];return{skin:e(Vs,t.skin),hair:e(Us,t.hair),eyes:e($s,t.eyes),boots:e(Gs,t.boots),style:Object.hasOwn(oa,t.style)?t.style:"short",beard:["none","short","full"].includes(t.beard)?t.beard:"none",sleeves:t.sleeves==="long"?"long":"short",number:Math.max(1,Math.min(99,Math.floor(Number(t.number)||10)))}}function Hs(t,e,n,a,i="#32bf97",r=0,o=1,u=!1,h={}){const d=Vt(a),E=yt(typeof i=="string"?{shirt:i}:i),R=r===0?0:Math.round(Math.sin(r)*3),x=r===0?0:Math.round(Math.sin(r+Math.PI)*2);t.save(),t.translate(Math.round(e),Math.round(n)),t.scale(o*(h.facing===-1?-1:1),o),h.action==="injury"&&(t.translate(0,-3),t.rotate(-Math.PI/2)),h.action==="tackle"&&t.rotate(-Math.PI/16),h.action==="kick"&&t.rotate(-.13),h.action==="save"&&(t.translate(2,-2),t.rotate((h.diveDirection||-1)*Math.PI/5));const g=(D,U,te,ee,Q)=>{t.fillStyle=D,t.fillRect(U,te,ee,Q)};if(g("#08131766",-8,0,17,4),r&&!["tackle","injury","save"].includes(h.action)&&t.translate(0,-Math.abs(R)*.5),g("#10171d",-5,-30,11,2),g("#10171d",-7,-28,15,9),g("#10171d",-5,-20,11,3),g("#10171d",-3,-18,7,2),g(d.skin,-5,-28,11,10),g(d.skin,-6,-26,13,6),g(d.skin,-3,-19,7,2),g("#10171d",-8,-25,2,5),g("#10171d",7,-25,2,5),g(d.skin,-7,-24,2,3),g(d.skin,7,-24,1,3),g("#00000024",4,-25,2,6),g("#00000022",-3,-18,7,1),g("#ffffff22",-4,-27,4,2),g(d.skin,-2,-17,5,2),d.style!=="bald"&&(g("#10171d",-5,-32,11,2),g("#10171d",-7,-30,15,5),g(d.hair,-5,-31,11,3),g(d.hair,-6,-29,13,4),g(d.hair,-7,-27,4,4),g(d.hair,5,-27,3,5),g("#ffffff22",-4,-30,7,2),d.style==="afro"&&(g("#10171d",-9,-31,19,10),g(d.hair,-8,-31,17,8),g(d.hair,-6,-33,13,4)),d.style==="mohawk"&&(g(d.skin,-6,-28,4,3),g(d.skin,3,-28,4,3),g(d.hair,-2,-34,5,9)),d.style==="long"&&(g("#10171d",-8,-26,3,13),g(d.hair,-7,-26,2,12),g(d.hair,6,-26,3,12)),d.style==="ponytail"&&(g("#10171d",7,-27,5,10),g(d.hair,8,-26,3,8))),d.style==="curls")for(let D=0;D<5;D++)g(d.hair,-8+D*3,-32+D%2,4,7),g("#ffffff22",-7+D*3,-31+D%2,2,2);if(d.style==="spikes")for(let D=0;D<4;D++)g(d.hair,-6+D*4,-34+D%2*2,3,7);if(d.style==="fade"&&(g(d.skin,-6,-26,3,3),g(d.skin,4,-26,3,3),g("#00000033",-6,-26,2,2)),d.style==="braids")for(let D=0;D<4;D++)g(d.hair,-6+D*4,-31,2,14),g("#ffffff22",-6+D*4,-30,1,5);if(d.style==="swept"&&(g(d.hair,-5,-29,12,5),g(d.hair,2,-26,5,4)),u&&d.style!=="bald"&&g(d.hair,-5,-26,11,7),u||(g(d.hair,-4,-25,3,1),g(d.hair,2,-25,3,1),g("#fff9e9",-4,-24,3,3),g("#fff9e9",2,-24,3,3),g(d.eyes,-3,-23,2,2),g(d.eyes,3,-23,2,2),g("#00000033",0,-21,2,2),g("#633e36",-1,-19,3,1),d.beard!=="none"&&g(d.hair,-4,-20,9,d.beard==="full"?4:2)),g("#10171d",-6,-16,13,12),g("#10171d",-8,-15,17,6),g(E.shirt,-5,-15,11,8),g(E.shirt,-7,-14,3,4),g(E.shirt,5,-14,3,4),h.action==="greet")g("#10171d",5,-17,4,8),g(d.sleeves==="long"?E.shirt:d.skin,6,-18,2,5),g(d.skin,6,-20,3,3),g("#10171d",-8,-11,4,5),g(d.sleeves==="long"?E.shirt:d.skin,-7,-10,2,3);else if(h.action==="throwin"){const D=h.action==="celebrate"?1:0;g("#10171d",-10,-17,4,12),g("#10171d",7,-17,4,12),g(d.sleeves==="long"?E.shirt:d.skin,-9,-23-D,2,9),g(d.sleeves==="long"?E.shirt:d.skin,8,-23-D,2,9),g(d.skin,-10,-25-D,4,3),g(d.skin,7,-25-D,4,3)}else h.action==="throwin-release"?(g("#10171d",-10,-17,4,9),g("#10171d",7,-17,4,9),g(d.sleeves==="long"?E.shirt:d.skin,-9,-11,2,9),g(d.sleeves==="long"?E.shirt:d.skin,8,-14,2,8),g(d.skin,-9,-3,3,3),g(d.skin,8,-8,3,3)):h.action==="save"?(g("#10171d",-12,-17,6,4),g("#10171d",7,-14,7,4),g(d.sleeves==="long"?E.shirt:d.skin,-13,-20,7,3),g(d.sleeves==="long"?E.shirt:d.skin,10,-18,7,3),g(d.skin,-15,-21,4,4),g(d.skin,15,-19,4,4)):h.action==="celebrate"?(g("#10171d",-10,-17,4,12),g("#10171d",7,-17,4,12),g(d.sleeves==="long"?E.shirt:d.skin,-9,-25,2,11),g(d.sleeves==="long"?E.shirt:d.skin,8,-25,2,11),g(d.skin,-10,-28,4,3),g(d.skin,7,-28,4,3)):(g("#10171d",-8,-11+x,4,5),g(d.sleeves==="long"?E.shirt:d.skin,-7,-10+x,2,3),g(d.skin,-6,-8+x,2,2),g("#10171d",5,-11-x,4,5),g(d.sleeves==="long"?E.shirt:d.skin,6,-10-x,2,3),g(d.skin,5,-8-x,2,2));if(E.pattern==="stripes"&&(g(E.detail,-3,-15,2,8),g(E.detail,2,-15,2,8)),E.pattern==="hoops"&&(g(E.detail,-5,-13,11,2),g(E.detail,-5,-9,11,1)),E.pattern==="sash")for(let D=0;D<7;D++)g(E.detail,-4+D,-15+D,3,1);g("#ffffff24",-4,-15,3,6),g("#00000026",4,-14,2,7),g(E.detail,-2,-15,5,1),g(E.shorts,-5,-7,11,3),g("#ffffff22",-4,-7,3,1),g("#00000044",0,-6,1,3),g(d.skin,-4,-4+R,3,2),g(d.skin,2,-4-R,3,2),g("#10171d",-6,-4,5,7+R),g("#10171d",1,-4,6,7-R),g(E.socks,-4,-4,3,4+R),g(E.socks,2,-4,3,4-R),h.action==="kick"&&(g(E.socks,3,-5,7,3),g(d.boots,9,-6,4,4)),g(d.boots,-6,R,5,2),g("#eee8d5",-6,R+2,5,1),g(d.boots,2,-R,5,2),g("#eee8d5",2,-R+2,5,1),t.fillStyle="#fff",t.font="bold 5px monospace",t.textAlign="center",h.referee||t.fillText(String(d.number),.5,-9),h.action==="throwin"&&(g("#10171d",-4,-34,9,9),g("#fff9e9",-3,-33,7,7),g("#172027",-1,-32,3,3)),h.card&&(g(E.shirt,5,-19,3,6),g(d.skin,5,-27,3,8),g("#10171d",4,-34,6,9),g(h.card==="red"?"#ff354a":"#ffe133",5,-33,4,7)),t.restore()}const tu={AFC:"AF AU BH BD BT BN KH CN TW GU HK IN ID IR IQ JP JO KP KR KW KG LA LB MO MY MV MN MM NP OM PK PS PH QA SA SG LK SY TJ TH TL TM AE UZ VN YE",CAF:"DZ AO BJ BW BF BI CV CM CF TD KM CG CD CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU MA MZ NA NE NG RW ST SN SC SL SO ZA SS SD TZ TG TN UG ZM ZW",CONCACAF:"AI AG AW BS BB BZ BM VG CA KY CR CU CW DM DO SV GD GT GY HT HN JM MX MS NI PA PR KN LC VC SR TT TC US VI",CONMEBOL:"AR BO BR CL CO EC PY PE UY VE",OFC:"AS CK FJ NC NZ PG WS SB PF TO VU",UEFA:"AL AD AM AT AZ BY BE BA BG HR CY CZ DK ENG EE FO FI FR GE DE GI GR HU IS IL IT KZ XK LV LI LT LU MT MD ME NL MK NIR NO PL PT IE RO RU SM SCO RS SK SI ES SE CH TR UA WAL"},nu={MTR:"Mato Real",ENG:"Inglaterra",SCO:"Escócia",WAL:"País de Gales",NIR:"Irlanda do Norte",TW:"Taipé Chinês",CD:"RD Congo",CG:"Congo",CI:"Costa do Marfim",SZ:"Essuatíni",CZ:"Tchéquia",TR:"Turquia",HK:"Hong Kong",MO:"Macau",PF:"Taiti",VG:"Ilhas Virgens Britânicas",VI:"Ilhas Virgens Americanas",KR:"Coreia do Sul",KP:"Coreia do Norte",US:"Estados Unidos",XK:"Kosovo"},au=new Intl.DisplayNames(["pt-BR"],{type:"region"}),Bs=[{id:"MTR",name:"Mato Real",confederation:"MATO REAL"},...Object.entries(tu).flatMap(([t,e])=>e.split(" ").map(n=>({id:n,name:nu[n]||au.of(n),confederation:t})))].sort((t,e)=>t.id==="MTR"?-1:e.id==="MTR"?1:t.name.localeCompare(e.name,"pt-BR")),zs=Object.fromEntries(Bs.map(t=>[t.id,t])),iu=t=>(t==null?void 0:t.nationality)||"MTR",Th=t=>{var e;return((e=zs[t])==null?void 0:e.name)||"Mato Real"};function su(t){return t==="MTR"?"🌟":t==="ENG"||t==="SCO"||t==="WAL"?"🏴":t==="NIR"?"⚽":/^[A-Z]{2}$/.test(t)?String.fromCodePoint(...[...t].map(e=>127397+e.charCodeAt(0))):"🏳️"}const Ws={"4-3-3 OFENSIVO":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MEI","PTD","ATA","PTE"],"4-3-3 DEFENSIVO":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MC","PTD","ATA","PTE"],"4-3-3 FALSO 9":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","PTD","SA","PTE"],"4-3-3 POSSE":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","SA","ATA","SA"],"4-4-2 CLÁSSICO":["GOL","LD","ZAG","ZAG","LE","MD","MC","MC","ME","ATA","ATA"],"4-4-2 LOSANGO":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","MEI","ATA","ATA"],"4-4-2 LINHA":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","MEI","ATA","ATA"],"4-4-1-1":["GOL","LD","ZAG","ZAG","LE","MD","MC","MC","ME","SA","ATA"],"4-2-3-1 LARGO":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","PTD","ATA","PTE"],"4-2-3-1 ESTREITO":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","MEI","MEI","ATA"],"4-1-4-1":["GOL","LD","ZAG","ZAG","LE","VOL","MD","MC","MC","ME","ATA"],"4-1-2-1-2":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","MEI","ATA","ATA"],"4-2-2-2 (BRASIL)":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MEI","MEI","ATA","ATA"],"4-2-4 OFENSIVO":["GOL","LD","ZAG","ZAG","LE","MC","MC","PTD","ATA","ATA","PTE"],"4-5-1 RETRANCA":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MC","MD","ME","ATA"],"4-3-2-1 (NATAL)":["GOL","LD","ZAG","ZAG","LE","VOL","MC","MC","MEI","MEI","ATA"],"3-5-2 TÁTICO":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MD","ME","MEI","ATA","ATA"],"3-4-3 (CRUYFF)":["GOL","ZAG","ZAG","ZAG","VOL","MC","MD","ME","PTD","ATA","PTE"],"3-4-3 LINHA":["GOL","ZAG","ZAG","ZAG","MD","MC","MC","ME","PTD","ATA","PTE"],"3-4-1-2":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MD","ME","MEI","ATA","ATA"],"3-6-1 CONTROLE":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MD","MC","MC","ME","ATA"],"3-3-1-3 (BIELSA)":["GOL","ZAG","ZAG","ZAG","VOL","MC","MC","MEI","PTD","ATA","PTE"],"3-1-4-2":["GOL","ZAG","ZAG","ZAG","VOL","MD","MC","MC","ME","ATA","ATA"],"5-4-1 ÔNIBUS":["GOL","LD","ZAG","ZAG","ZAG","LE","VOL","VOL","MD","ME","ATA"],"5-3-2 CONTRA":["GOL","LD","ZAG","ZAG","ZAG","LE","VOL","MC","MC","ATA","ATA"],"5-2-3 ALAS":["GOL","LD","ZAG","ZAG","ZAG","LE","MC","MC","PTD","ATA","PTE"],"5-2-1-2":["GOL","LD","ZAG","ZAG","ZAG","LE","VOL","VOL","MEI","ATA","ATA"],"WM (ANOS 30)":["GOL","ZAG","ZAG","ZAG","VOL","VOL","MEI","MEI","PTD","ATA","PTE"],"2-3-5 (PIRÂMIDE)":["GOL","ZAG","ZAG","VOL","MC","VOL","PTD","SA","ATA","SA","PTE"],"4-6-0 (SEM ATA)":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","MD","ME","MEI","MEI"],"1-1-8 (KAMIKAZE)":["GOL","ZAG","MC","PTD","SA","SA","ATA","ATA","SA","SA","PTE"],"VÁRZEA (TUDO P/ FRENTE)":["GOL","ZAG","ZAG","VOL","MEI","PTD","ATA","ATA","ATA","ATA","PTE"],"VÁRZEA (VOLANTAÇO)":["GOL","LD","ZAG","ZAG","LE","VOL","VOL","VOL","VOL","MEI","ATA"]},ru=23;function La(t){if(!zs[t])throw Error("Seleção inválida.")}function ou(t,e){return iu(t)===e&&!["PENDING","BLOCKED"].includes(t.status)}function bh(t,e,n){if(La(t),!Array.isArray(e)||e.length>ru||new Set(e).size!==e.length)throw Error("Convoque até 23 jogadores, sem repetidos.");if(e.some(a=>!n.some(i=>i.id===a&&ou(i,t))))throw Error("Jogador indisponível ou de outra nacionalidade.")}function Ch(t,e,n,a){if(!Ws[t])throw Error("Formação inválida.");if(e.length!==11||new Set(e).size!==11||e.some(r=>!r||!n.includes(r)))throw Error("Selecione 11 titulares distintos da convocação.");const i=e.map(r=>a.find(o=>o.id===r));if(i.some(r=>!r||(r.recoveryLeft||0)>0||(r.energy??100)<25))throw Error("Titular lesionado, indisponível ou com menos de 25 de energia.");if(i[0].position!=="GOL"||i.slice(1).some(r=>r.position==="GOL"))throw Error("Escale um goleiro na primeira posição e dez jogadores de linha.")}function Rh(t,e){if(t.length<2||t.length>16||new Set(t).size!==t.length)throw Error("Escolha de 2 a 16 seleções distintas.");if(t.forEach(La),!/^\d{4}-\d{2}-\d{2}$/.test(e)||Number.isNaN(Date.parse(e)))throw Error("Escolha uma data válida.");const n=[...t];n.length%2&&n.push(null);const a=[];for(let i=0;i<n.length-1;i++){const r=new Date(e+"T12:00:00Z");r.setUTCDate(r.getUTCDate()+i*7);for(let o=0;o<n.length/2;o++){const u=n[o],h=n[n.length-1-o];u&&h&&a.push({homeId:i%2?h:u,awayId:i%2?u:h,date:r.toISOString().slice(0,10),round:i+1})}n.splice(1,0,n.pop())}return a}function Oh(t,e){const n=new Map(t.map(a=>[a,{id:a,pts:0,played:0,wins:0,gf:0,ga:0}]));for(const a of e.filter(i=>i.status==="FINISHED"&&i.stage!=="FINAL")){const i=n.get(a.homeId),r=n.get(a.awayId);if(!(!i||!r))if(i.played++,r.played++,i.gf+=a.homeScore,i.ga+=a.awayScore,r.gf+=a.awayScore,r.ga+=a.homeScore,a.homeScore===a.awayScore)i.pts++,r.pts++;else{const o=a.homeScore>a.awayScore?i:r;o.pts+=3,o.wins++}}return[...n.values()].sort((a,i)=>i.pts-a.pts||i.wins-a.wins||i.gf-i.ga-(a.gf-a.ga)||i.gf-a.gf||a.id.localeCompare(i.id))}const Mn={COMERCIO:{label:"Comércio Local",start:25e5,tax:5e4,desc:"Ideal para iniciantes. Imposto baixo."},MEDIA:{label:"Média Empresa",start:2e7,tax:35e4,desc:"Poder moderado. Imposto médio."},GRANDE:{label:"Grande Empresa",start:1e8,tax:2e6,desc:"Gigante do mercado. Imposto alto."}},la={balance:"⚖️ Equilíbrio",stamina:"🔋 Resistência",speed:"⚡ Veloc. Máx.",accel:"🚀 Aceleração",agility:"🤸 Agilidade",jump:"🦘 Impulsão",condition:"💪 Cond. Física",attack:"⚔️ Ataque",dribble:"⚽ Drible",dribbleSpd:"🏃💨 Drib. Veloc.",shortPass:"🎯 Passe Curto",shortPassSpd:"⏩ P. Curto Vel.",longPass:"📡 Passe Longo",longPassSpd:"🚀 P. Longo Vel.",shot:"🔫 Finalização",shotPower:"💣 Força Chute",shotTech:"🎨 Téc. Chute",freeKick:"🎯 Falta",curve:"🍌 Efeito",header:"🤕 Cabeceio",tech:"✨ Técnica",weakFootAcc:"🦶 Pior Pé Prec.",weakFootFreq:"🔄 Pior Pé Freq.",defense:"🛡️ Defesa",response:"🧠 Resposta",aggression:"😡 Agressividade",mentality:"🧠 Atitude",teamwork:"🤝 Trabalho Eq.",gk:"🧤 Hab. Goleiro"},vn=(t,e)=>{const n=parseInt(e)||50,a={},i=Object.keys(la);let r=[],o=[];t==="GOL"?(r=["gk","response","jump","longPass"],o=["balance","condition","mentality","defense"]):t.includes("ZAG")?(r=["defense","header","balance","jump","aggression"],o=["stamina","response","shortPass","longPass"]):t.includes("LAT")||t.includes("LD")||t.includes("LE")?(r=["speed","accel","stamina","shortPass","dribble"],o=["defense","longPass","curve","attack"]):t.includes("VOL")||t.includes("MC")||t==="MD"||t==="ME"?(r=["shortPass","stamina","teamwork","defense","balance"],o=["longPass","tech","shotPower","vision"]):t.includes("MEI")||t.includes("MAT")?(r=["dribble","shortPass","vision","tech","curve","agility"],o=["shot","speed","attack","freeKick"]):t==="PTD"||t==="PTE"?(r=["speed","accel","dribble","agility","curve"],o=["shot","stamina","longPass","technique"]):(t.includes("ATA")||t.includes("SA")||t.includes("PNT"))&&(r=["shot","attack","header","shotPower","balance"],o=["speed","reaction","dribble","strength"]),i.forEach(R=>{let x=n;r.includes(R)?x+=Math.floor(Math.random()*6)+2:o.includes(R)?x-=Math.floor(Math.random()*4):x-=Math.floor(Math.random()*10)+5,t!=="GOL"&&R==="gk"&&(x=10),t==="GOL"&&["shot","attack","dribble","curve","freeKick"].includes(R)&&(x=Math.max(15,x-20)),n<80&&x>88&&(x=88),x>99&&(x=99),x<1&&(x=1),a[R]=x});const u=i.filter(R=>t==="GOL"?!["shot","attack","dribble","curve","freeKick","weakFootAcc","weakFootFreq"].includes(R):R!=="gk");let h=0;u.forEach(R=>h+=a[R]);const d=h/u.length,E=n-d;return u.forEach(R=>{let x=E;a[R]>90&&n<85&&E>0&&(x=0);let g=a[R]+x;g>99&&(g=99),g<1&&(g=1),a[R]=Math.round(g)}),a};function lu(t,e){const{setLoading:n,teams:a,players:i,companies:r,coaches:o,papers:u,journalists:h,setUser:d,setScreen:E}=t;return{login:async(P,M,b)=>{n(!0);try{await rt.signOut();let A=null,T="";if(b==="TEAM"||b==="USER"){const f=a.find(_=>_.id===P&&_.password===M);f&&(A=f,T="USER")}else if(b==="PLAYER"){const f=i.find(_=>!_.isBot&&_.id===P&&_.password===M);f&&(A=f,T="PLAYER")}else if(b==="COMPANY"){const f=r.find(_=>_.id===P&&_.password===M);f&&(A=f,T="COMPANY")}else if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(b)){const f=o.find(_=>_.id===P&&_.password===M);f&&(A=f,T=f.type)}else if(b==="PRESS"||b==="PAPER"){const f=u.find(_=>_.id===P&&_.password===M);f&&(A=f,T="PRESS")}else if(b==="PRESS_WORKER"||b==="JOURNALIST"){const f=h.find(_=>_.id===P&&_.password===M);if(f){const _=u.find(O=>O.id===f.newspaperId);A={...f,paperName:_==null?void 0:_.name},T="PRESS_WORKER"}}else{let f=a.find(_=>(_.id===P||_.name===P)&&_.password===M);if(f&&(A=f,T="USER"),!A){let _=i.find(O=>!O.isBot&&(O.id===P||O.name===P)&&O.password===M);_&&(A=_,T="PLAYER")}if(!A){let _=o.find(O=>(O.id===P||O.name===P)&&O.password===M);_&&(A=_,T=_.type)}if(!A){let _=r.find(O=>(O.id===P||O.name===P)&&O.password===M);_&&(A=_,T="COMPANY")}if(!A){let _=u.find(O=>(O.id===P||O.name===P)&&O.password===M);_&&(A=_,T="PRESS")}if(!A){let _=h.find(O=>(O.id===P||O.name===P)&&O.password===M);if(_){const O=u.find(l=>l.id===_.newspaperId);A={..._,paperName:O==null?void 0:O.name},T="PRESS_WORKER"}}}A?A.status==="PENDING"?alert("Conta em análise pela Federação. Aguarde aprovação."):A.status==="BLOCKED"?alert("Conta bloqueada."):(d({type:T,data:A}),Yn({type:T,data:A}),E(T==="COACH"?"COACH_DASH":T==="DOCTOR"?"DOCTOR_DASH":T==="ASSISTANT"?"ASSISTANT_DASH":T==="SCOUT"?"SCOUT_DASH":T==="COMPANY"?"COMPANY_DASH":T==="PLAYER"?"PLAYER_DASH":T==="PRESS"||T==="PRESS_WORKER"?"PRESS_DASH":"HOME")):alert("ID ou Senha incorretos!")}catch(A){console.error(A),alert("Erro no login: "+A.message)}n(!1)},loginAdmin:async(P,M)=>{const b=await Xd(P,M);Yn(b),d(b),E(Mi("ADMIN",Xn(b,"screen")))},createTeam:async(P,M,b,A,T,f)=>{if(!f)return alert("Escolha um Estado!");if(a.find(_=>_.name.toLowerCase()===P.toLowerCase()))return alert("Nome em uso!");await p.collection("teams").add({name:P,balance:parseFloat(M),serie:b,estado:f,password:A,stadiumLevel:1,logo:T||null,status:"PENDING",stats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0},stateStats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}}),alert("Clube fundado! Aguarde aprovação da Federação.")},createPlayerAccount:async P=>{try{La(P.nationality)}catch(M){alert(M.message);return}if(!P.name||!P.password||!P.instagram)return alert("Preencha todos os campos!");n(!0);try{const M=P.position==="GOL"?60:45,b=vn(P.position,M);await p.collection("players").add({name:P.name,nationality:P.nationality,pixelAppearance:Vt(P.pixelAppearance),instagram:P.instagram,position:P.position,password:P.password,overall:M,attributes:b,teamId:"FREE",status:"PENDING",balance:0,salary:1500,value:4e4,contract:0,mood:"😐",fame:0,stats:{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0}}),alert(`✅ Inscrição enviada!
A Federação avaliará seu Instagram em breve. Assim que aprovado, você aparecerá no mercado de Agentes Livres.`),window.location.reload()}catch(M){alert("Erro ao criar: "+M.message),n(!1)}},createStaff:async P=>{if(!P.name||!P.password||!P.role)return alert("Preencha todos os campos obrigatórios!");n(!0);try{const M=`staff_${Date.now()}`;await p.collection("users").doc(M).set({id:M,name:P.name,password:P.password,type:P.role,level:1,xp:0,salary:2500,affinities:[P.affinity||"Geral"],pendingPerks:0,pendingAffinity:0,teamId:"FREE",status:"ACTIVE",trainingsLeft:2,clause:5e4,perks:[],face:P.face||null,createdAt:Date.now()}),alert(`✅ Licença de ${{COACH:"Técnico",DOCTOR:"Médico",SCOUT:"Olheiro",ASSISTANT:"Auxiliar"}[P.role]} gerada com sucesso!
Você já está ativo nos Agentes Livres. Pode fazer o login!`),window.location.reload()}catch(M){console.error(M),alert("Erro ao criar perfil profissional."),n(!1)}},createNewspaper:async(P,M,b)=>{await p.collection("newspapers").add({name:P,password:M,ownerName:b,status:"PENDING"}),alert("Jornal criado! Aguarde Federação.")},createJournalist:async(P,M,b)=>{await p.collection("journalists").add({name:P,password:M,newspaperId:b,status:"PENDING"}),alert("Conta criada! Aguarde seu Chefe.")},createCompany:async P=>{if(!P.n||!P.p)return alert("Preencha tudo!");await p.collection("companies").add({name:P.n,owner:P.owner,password:P.p,companyType:P.type,balance:Mn[P.type].start,status:"PENDING"}),alert("Solicitação enviada! Aguarde a Federação.")}}}const ie=t=>"₣ "+parseFloat(t||0).toLocaleString("pt-BR"),St={1:{name:"O Terrão",cap:1e3,minTic:10,maxTic:30,upgCost:5e6,maint:0,prompt:"Campo de futebol de terra e grama falha, alambrado enferrujado, pequena arquibancada de concreto, dia ensolarado, futebol de várzea --ar 16:9"},2:{name:"Estádio Municipal",cap:5e3,minTic:20,maxTic:60,upgCost:15e6,maint:15e3,prompt:"Estádio municipal pequeno, gramado razoável, arquibancadas baixas de concreto, luzes simples, dia de jogo --ar 16:9"},3:{name:"Estádio Profissional",cap:15e3,minTic:40,maxTic:100,upgCost:35e6,maint:6e4,prompt:"Estádio de futebol profissional, arquibancadas cobertas de um lado, cadeiras de plástico coloridas, refletores altos, torcida --ar 16:9"},4:{name:"Arena Moderna",cap:4e4,minTic:80,maxTic:200,upgCost:8e7,maint:15e4,prompt:"Arena de futebol moderna, dois anéis de arquibancada, cobertura completa, telões digitais, cadeiras padronizadas --ar 16:9"},5:{name:"Padrão FIFA",cap:8e4,minTic:120,maxTic:350,upgCost:0,maint:4e5,prompt:"Estádio de futebol padrão Copa do Mundo, arquitetura futurista de vidro e aço, 80 mil lugares, iluminação cênica de LED noturna, lotado --ar 16:9"}},cu=(t,e)=>{if(!t)return 0;const a={A:1e4,B:4e3,C:1500,D:500,VARZEA:100}[t.serie||"VARZEA"]||100,i=e.reduce((R,x)=>R+(x.fame||0),0),r=Math.floor(i/20),o=t.recentForm||[];let u=1;if(o.length>0){const R=o.filter(g=>g==="VITORIA").length,x=o.filter(g=>g==="DERROTA").length;R>x&&(u+=R*.06),x>R&&(u-=x*.08)}const h=Math.floor((a+r)*u),d=t.socioPrice||40;let E=1;return d>10&&(E=1-(d-10)*.006428),E<.05&&(E=.05),Math.max(0,Math.floor(h*E))},ca={A:{champ:3e7,vice:2e7,third:15e6,mid:8e6,rel:5e6},B:{champ:12e6,vice:8e6,mid:5e6,rel:3e6},C:{champ:7e6,vice:5e6,mid:3e6,rel:15e5},D:{champ:35e5,vice:25e5,mid:12e5,rel:5e5},VARZEA:{champ:1e6,vice:8e5,third:6e5,mid:2e5}};function du(t,e){const{user:n,setModal:a,conf:i,setLoading:r,players:o,teams:u,companies:h,sps:d,coaches:E}=t,R=(...Q)=>e.postNews(...Q);return{adminAction:async(Q,P)=>{if(Q==="EDIT_PRIZES"){a({type:"EDIT_PRIZES",data:i.prizes||ca});return}if(Q==="MARKET"&&(p.collection("config").doc("system").update({marketOpen:P}),R(P?"📢 JANELA ABERTA":"🔒 JANELA FECHADA","infra")),Q==="VARZEA"&&(p.collection("config").doc("system").update({varzeaOpen:P}),R(P?`🔓 **INSCRIÇÕES ABERTAS!**
A Várzea voltou a aceitar novos times!`:`🛑 **INSCRIÇÕES ENCERRADAS!**
O limite de times na Várzea foi atingido. Apenas na próxima temporada!`,"infra")),Q==="WEEK"){if(!confirm(`⚠️ VIRAR SEMANA?

1. Pagar Salários (+)
2. Cobrar Imposto Jogador (3%)
3. Recuperar Energia (100%)
4. Empresas, Técnicos e XP`))return;r(!0);const M=p.batch();o.forEach(f=>{if(f.teamId&&f.teamId!=="FREE"&&u.some(_=>_.id===f.teamId)){const _=parseFloat(f.balance)||0,O=parseFloat(f.salary)||0,l=_*.03,m=f.healthPlan&&f.healthPlan.cost||0;let y=0;if(f.personalSponsor){const j=f.personalSponsor.companyId,w=h.find(z=>z.id===j),N=parseFloat(f.personalSponsor.value)||0;w&&w.status==="ACTIVE"&&(w.balance||0)>=N?(y=N,M.update(p.collection("companies").doc(j),{balance:Z.firestore.FieldValue.increment(-N)})):(M.update(p.collection("players").doc(f.id),{personalSponsor:Z.firestore.FieldValue.delete(),mood:"😡"}),p.collection("news").add({text:`📉 **CALOTE!** A empresa **${f.personalSponsor.companyName}** não teve fundos para pagar o patrocínio de **${f.name}** e o contrato foi rompido!`,type:"press",date:Date.now(),likes:[]}))}const C=_+O+y-l-m,k=(f.xp||0)+(f.pendingXP||0);M.update(p.collection("players").doc(f.id),{balance:C,energy:100,xp:k,pendingXP:0})}}),u.forEach(f=>{const _=parseFloat(f.balance)||0,O=o.filter(v=>v.teamId===f.id),l=d.filter(v=>v.teamId===f.id&&v.status==="ACTIVE").reduce((v,ae)=>v+parseFloat(ae.value),0),y={A:65e4,B:5e5,C:4e5,D:3e5,VARZEA:1e5}[f.serie||"VARZEA"]||1e5,k=cu(f,O)*(f.socioPrice||40),j=y+l+k,w=O.reduce((v,ae)=>v+(parseFloat(ae.salary)||0),0),N=E.filter(v=>v.teamId===f.id&&v.status==="ACTIVE").reduce((v,ae)=>v+(parseFloat(ae.salary)||0),0),z=f.healthPlan&&f.healthPlan.cost||0,W=f.stadiumLevel||1,oe=St[W]?St[W].maint:0;let ne={},le=0,ue=0,K=0;if(f.bankInvestment&&f.bankInvestment.amount>0){const v=f.bankInvestment.amount;K=v*.02;const ae=Math.max(0,(f.bankInvestment.weeksLocked||0)-1);ne.bankInvestment={amount:v+K,weeksLocked:ae}}if(f.bankLoan&&f.bankLoan.installments>0){le=f.bankLoan.weeklyPayment;const v=f.bankLoan.installments-1;v<=0?ne.bankLoan=Z.firestore.FieldValue.delete():ne.bankLoan={...f.bankLoan,installments:v}}if(f.stadiumLoan&&f.stadiumLoan.installments>0){ue=f.stadiumLoan.weeklyPayment;const v=f.stadiumLoan.installments-1;v<=0?ne.stadiumLoan=Z.firestore.FieldValue.delete():ne.stadiumLoan={...f.stadiumLoan,installments:v}}const $=w+N+z+oe+le+ue;ne.balance=_+j-$;let V=`🟢 RECEITAS:
`;V+=`+ Federação/TV: ${ie(y)}
`,k>0&&(V+=`+ Sócios-Torcedores: ${ie(k)}
`),l>0&&(V+=`+ Patrocinadores: ${ie(l)}
`),V+=`
🔴 DESPESAS:
`,w>0&&(V+=`- Salários (Elenco): ${ie(w)}
`),N>0&&(V+=`- Salários (Comissão): ${ie(N)}
`),z>0&&(V+=`- Convênio Médico: ${ie(z)}
`),oe>0&&(V+=`- Manutenção Arena: ${ie(oe)}
`),le>0&&(V+=`- Parcela Empréstimo: ${ie(le)}
`),ue>0&&(V+=`- Parcela Arena: ${ie(ue)}
`);const Y=j-$;V+=`
⚖️ RESULTADO FINAL: ${Y>=0?"Lucro de "+ie(Y):"Prejuízo de "+ie(Y)}`,K>0&&(V+=`

📈 Sua Renda Fixa rendeu +${ie(K)} (O valor continua aplicado no Banco).`);let S=[...f.trainingLogs||[]];S.unshift({date:Date.now(),type:"📊 BALANÇO FINANCEIRO",report:V}),S.length>15&&S.pop(),ne.trainingLogs=S,M.update(p.collection("teams").doc(f.id),ne)});const b=p.collection("news").doc();M.set(b,{text:`💰 **COTAS DA FEDERAÇÃO PAGAS!**
O apoio financeiro semanal foi depositado. Diretorias, confiram o Extrato no Diário Oficial do Clube (CT) para ver os lucros e despesas de sua equipe.`,date:Date.now(),type:"money",likes:[]}),h.forEach(f=>{if(f.status==="ACTIVE"){const _=parseFloat(f.balance)||0,O=f.companyType||"COMERCIO",l=(Mn[O]||{}).tax||5e4;M.update(p.collection("companies").doc(f.id),{balance:_-l})}}),(await p.collection("users").where("type","in",["COACH","DOCTOR","SCOUT","ASSISTANT"]).get()).docs.forEach(f=>{const _=f.data();let O={trainingsLeft:2};if(_.teamId&&_.teamId!=="FREE")if(u.some(m=>m.id===_.teamId)){const m=parseFloat(_.balance)||0;O.balance=m+parseFloat(_.salary)}else O.teamId="FREE",O.contract=0;M.update(p.collection("users").doc(f.id),O)}),(await p.collection("debts").get()).docs.forEach(f=>{const _=f.data(),O=u.some(m=>m.id===_.buyerId),l=u.some(m=>m.id===_.sellerId);!O||!l?M.delete(f.ref):_.weeksRemaining>0&&(M.update(p.collection("teams").doc(_.buyerId),{balance:Z.firestore.FieldValue.increment(-_.installmentVal)}),M.update(p.collection("teams").doc(_.sellerId),{balance:Z.firestore.FieldValue.increment(_.installmentVal)}),_.weeksRemaining-1===0?(M.delete(f.ref),R(`✅ **DÍVIDA QUITADA**
${_.buyerName} terminou de pagar ${_.playerName}.`,"money")):(M.update(f.ref,{weeksRemaining:_.weeksRemaining-1}),R(`💳 **PARCELA PAGA**
${_.buyerName} pagou a parcela (${_.weeksRemaining}x) de ${_.playerName}.`,"money-minus")))});try{await M.commit(),alert("Semana processada! Salários pagos e treinos resetados.")}catch(f){alert("Erro: "+f.message)}r(!1)}if(Q==="SEASON"){if(!confirm(`⚠️ VIRAR TEMPORADA?

1. Evoluir Atributos (XP)
2. Envelhecer Contratos
3. Processar Retornos
4. Envelhecer Técnicos`))return;r(!0);const M=p.batch();o.forEach(A=>{let T={};const f=(A.xp||0)+(A.pendingXP||0),_=Math.floor(f/100),O=f%100;if(A.attributes&&_!==0){let m={...A.attributes};const y=Object.keys(m),C=Math.abs(_),k=_>0;for(let N=0;N<C;N++){const z=y[Math.floor(Math.random()*y.length)];k?m[z]<99&&m[z]++:m[z]>1&&m[z]--}T.attributes=m;const j=Object.values(m),w=Math.round(j.reduce((N,z)=>N+z,0)/j.length);T.overall=w,T.xp=O,T.pendingXP=0}else T.xp=0,T.pendingXP=0;let l=(parseInt(A.contract)||0)-1;if(l<0&&(l=0),T.contract=l,l===0&&A.loanMeta&&A.loanMeta.ownerId){const m=A.loanMeta.ownerId,y=u.find(C=>C.id===m);if(A.loanMeta.hasBuyOption&&A.loanMeta.buyOpt>0){const C=u.find(j=>j.id===A.teamId),k=p.collection("offers").doc();M.set(k,{type:"COMPRA_DEFINITIVA",playerId:A.id,playerName:A.name,buyerId:A.teamId,buyerName:(C==null?void 0:C.name)||"Clube Atual",sellerId:m,recipientId:A.teamId,value:A.loanMeta.buyOpt,status:"PENDING",description:`🏁 **FIM DE EMPRÉSTIMO**
Deseja exercer a opção de compra de **${A.name}** por ${ie(A.loanMeta.buyOpt)}?
Caso recuse, o jogador retornará ao clube de origem.`,date:Date.now(),isLoanOption:!0}),T.status="INTRANSFERIVEL"}else{let C=(parseInt(A.loanMeta.originalContract)||1)-1;if(C<=0){const k=p.collection("offers").doc();M.set(k,{type:"RENOVACAO_URGENTE",playerId:A.id,playerName:A.name,buyerId:m,buyerName:(y==null?void 0:y.name)||"Clube de Origem",sellerId:"SISTEMA",recipientId:m,status:"PENDING",description:`⚠️ **URGENTE: FIM DE VÍNCULO**
O empréstimo de **${A.name}** acabou e ele está sem contrato com você.`,date:Date.now()}),T.teamId=m,T.contract=0,T.status="INTRANSFERIVEL"}else{T.teamId=m,T.contract=C,T.status="NAO_A_VENDA";const k=p.collection("offers").doc();M.set(k,{type:"NOTIFICACAO",playerId:A.id,playerName:A.name,buyerName:"Sistema",recipientId:m,status:"PENDING",description:`🔙 **RETORNO DE EMPRÉSTIMO**
O jogador **${A.name}** retornou ao seu elenco.

📄 Contrato Restante: ${C} temporada(s).`,date:Date.now()}),R(`🔙 **RETORNO**
${A.name} voltou ao ${y==null?void 0:y.name} (${C} anos rest.).`,"transfer")}T.loanMeta=Z.firestore.FieldValue.delete()}}else l===0&&(!A.loanMeta||!A.loanMeta.ownerId)&&(A.preContract&&u.some(m=>m.id===A.preContract.teamId)?(T.teamId=A.preContract.teamId,T.contract=2,T.status="NAO_A_VENDA",T.preContract=Z.firestore.FieldValue.delete()):(T.teamId="FREE",T.status="VENDA",T.mood="😐",T.loanMeta=Z.firestore.FieldValue.delete()));M.update(p.collection("players").doc(A.id),T)}),(await p.collection("users").where("type","==","COACH").get()).docs.forEach(A=>{const T=A.data();if(T.teamId&&T.teamId!=="FREE"){const f=(T.contract||1)-1;f<=0?M.update(p.collection("users").doc(A.id),{teamId:"FREE",contract:0,salary:2500}):M.update(p.collection("users").doc(A.id),{contract:f})}});try{await M.commit(),alert("Temporada virada! Jogadores e técnicos atualizados.")}catch(A){alert("Erro: "+A.message)}r(!1),R(`💪 **PRÉ-TEMPORADA**
Os jogadores treinaram e contratos foram renovados!`,"season")}},resetDatabase:async()=>{if(!Tn(n))return alert("Somente o ADM principal pode resetar o jogo.");if(prompt("⚠️ PERIGO: Isso apagará TODOS os dados do jogo. Digite RESETAR para confirmar:")!=="RESETAR"||!confirm("TEM CERTEZA? Todos os times, jogadores e finanças sumirão para sempre!"))return;r(!0);const P=["teams","players","users","news","offers","sponsorships","sales","debts","financeRequests","products","companies","journalists","newspapers","nationalTeams","nationalMatches","nationalCompetitions","nationalWindows"];try{let M=[p.batch()],b=0;for(const A of P)(await p.collection(A).get()).docs.forEach(f=>{b>=450&&(M.push(p.batch()),b=0),M[M.length-1].delete(f.ref),b++});for(let A of M)await A.commit();alert("💥 BANCO DE DADOS RESETADO! O sistema irá reiniciar."),window.location.reload()}catch(M){alert("Erro ao resetar: "+M.message)}r(!1)},approveTeam:async(Q,P)=>{await p.collection("teams").doc(Q).update({status:"ACTIVE",balance:parseFloat(P)});const M=u.find(b=>b.id===Q);R(`🛡️ **NOVO CLUBE!**
O **${M.name}** foi aprovado na Série ${M.serie}.`,"infra"),alert("Aprovado!")},deleteTeam:async Q=>{if(!confirm("⚠️ PERIGO: Excluir time e jogadores?"))return;const P=p.batch();P.delete(p.collection("teams").doc(Q)),(await p.collection("players").where("teamId","==",Q).get()).docs.forEach(b=>P.delete(b.ref)),await P.commit(),R(`🚫 **CLUBE EXTINTO**
Um time encerrou atividades.`,"infra")},deletePaper:async Q=>{if(!confirm("Excluir Jornal e demitir jornalistas?"))return;const P=p.batch();P.delete(p.collection("newspapers").doc(Q)),(await p.collection("journalists").where("newspaperId","==",Q).get()).docs.forEach(b=>P.delete(b.ref)),await P.commit(),alert("Jornal fechado!")},deleteJournalist:async Q=>{confirm("Demitir Jornalista?")&&(await p.collection("journalists").doc(Q).delete(),alert("Demitido!"))}}}const da={GOL:{train:"GOLEIRO",attrs:["gk","response","jump"]},ZAG:{train:"DEFESA",attrs:["defense","aggression","header"]},LD:{train:"VELOCIDADE",attrs:["speed","stamina","shortPass"]},LE:{train:"VELOCIDADE",attrs:["speed","stamina","shortPass"]},VOL:{train:"DEFESA",attrs:["defense","shortPass","stamina"]},MC:{train:"PASSE",attrs:["shortPass","longPass","teamwork"]},MD:{train:"DRIBLE",attrs:["dribble","speed","tech"]},ME:{train:"DRIBLE",attrs:["dribble","speed","tech"]},MEI:{train:"PASSE",attrs:["tech","shortPass","agility"]},PTD:{train:"VELOCIDADE",attrs:["speed","accel","dribble"]},PTE:{train:"VELOCIDADE",attrs:["speed","accel","dribble"]},ATA:{train:"CHUTE",attrs:["shot","shotPower","header"]},SA:{train:"CHUTE",attrs:["attack","shot","dribble"]}},Ma=["Vale do Mato","Lua Mare","Rio Manso","Serra Verde","Lagoa Azul"];function uu(t,e){const{setModal:n,setLoading:a,teams:i,conf:r,players:o,user:u}=t,h=(...U)=>e.postNews(...U);return{handleSaveMatch:async U=>{if(!U){n(null);return}a(!0);try{U.id?(await p.collection("matches").doc(U.id).update(U),alert("Partida atualizada!")):(await p.collection("matches").add(U),alert("Partida criada!")),n(null)}catch(te){alert("Erro: "+te.message)}a(!1)},handleDeleteMatch:async U=>{confirm("Tem certeza que deseja excluir esta partida permanentemente?")&&(await p.collection("matches").doc(U).delete(),n(null),alert("Partida excluída."))},generateFixtures:async()=>{if(!confirm("Gerar tabela de jogos para TODAS as séries (A, B, C, D e Várzea)?"))return;a(!0);const U=Z.firestore();let te=[U.batch()],ee=0;const Q=()=>(ee>=450&&(te.push(U.batch()),ee=0),ee++,te[te.length-1]);try{["A","B","C","D","VARZEA"].forEach(M=>{const b=i.filter(f=>f.serie===M&&f.status==="ACTIVE");if(b.length<2)return;const A=(b.length-1)*2;let T=b.map(f=>f.id);T.length%2!==0&&T.push(null);for(let f=0;f<A;f++){const _=f>=A/2;for(let O=0;O<T.length/2;O++){let l=T[O],m=T[T.length-1-O];if(!l||!m)continue;_&&([l,m]=[m,l]);const y=i.find(k=>k.id===l),C=i.find(k=>k.id===m);Q().set(U.collection("matches").doc(),{serie:M,round:f+1,homeId:l,homeName:y.name,homeLogo:y.logo||null,awayId:m,awayName:C.name,awayLogo:C.logo||null,scoreHome:0,scoreAway:0,status:"PENDING",played:!1})}T.splice(1,0,T.pop())}}),Ma.forEach(M=>{const b=i.filter(f=>f.estado===M&&f.status==="ACTIVE");if(b.length<2)return;const A=b.length-1;let T=b.map(f=>f.id);T.length%2!==0&&T.push(null);for(let f=0;f<A;f++){for(let _=0;_<T.length/2;_++){let O=T[_],l=T[T.length-1-_];if(!O||!l)continue;Math.random()>.5&&([O,l]=[l,O]);const m=i.find(C=>C.id===O),y=i.find(C=>C.id===l);Q().set(U.collection("matches").doc(),{serie:"ESTADUAL",estado:M,round:`Fase 1 (Rod. ${f+1})`,homeId:O,homeName:m.name,homeLogo:m.logo||null,awayId:l,awayName:y.name,awayLogo:y.logo||null,scoreHome:0,scoreAway:0,status:"PENDING",played:!1,isEstadual:!0})}T.splice(1,0,T.pop())}});for(let M of te)await M.commit();a(!1),h(`📅 **TABELA DIVULGADA!**
A Federação liberou o calendário de jogos da temporada (incluindo Várzea).`,"infra"),alert("Jogos gerados com sucesso e sem travamentos!")}catch(P){a(!1),console.error(P),alert("Erro ao gerar tabela: "+P.message)}},handleSeasonTurnAdvanced:async()=>{var $,V,Y;if(!confirm(`⚠️ ATENÇÃO: Isso encerrará a temporada atual!

1. Pagará Premiações Finais
2. Aplica Promoção/Rebaixamento
3. Evolui Atributos e Overall (XP)
4. Envelhece contratos e Zera estatísticas`))return;a(!0);const U=Z.firestore(),te=r.season||1;let ee=[U.batch()],Q=0;const P=()=>(Q>=450&&(ee.push(U.batch()),Q=0),Q++,ee[ee.length-1]),M=S=>S.sort((v,ae)=>{var ce,ge,ve,fe,ke,_e,Ee,et,tn,nn;const L=((ce=v.stats)==null?void 0:ce.pts)||0,X=((ge=ae.stats)==null?void 0:ge.pts)||0;if(L!==X)return X-L;const Ae=((ve=v.stats)==null?void 0:ve.wins)||0,I=((fe=ae.stats)==null?void 0:fe.wins)||0;if(Ae!==I)return I-Ae;const B=(((ke=v.stats)==null?void 0:ke.gf)||0)-(((_e=v.stats)==null?void 0:_e.ga)||0),J=(((Ee=ae.stats)==null?void 0:Ee.gf)||0)-(((et=ae.stats)==null?void 0:et.ga)||0);if(B!==J)return J-B;const Ce=((tn=v.stats)==null?void 0:tn.cards)||0,re=((nn=ae.stats)==null?void 0:nn.cards)||0;return Ce-re}),b=M(i.filter(S=>S.serie==="A"&&S.status!=="PENDING")),A=M(i.filter(S=>S.serie==="B"&&S.status!=="PENDING")),T=M(i.filter(S=>S.serie==="C"&&S.status!=="PENDING")),f=M(i.filter(S=>S.serie==="D"&&S.status!=="PENDING")),_=M(i.filter(S=>S.serie==="VARZEA"&&S.status!=="PENDING")),O=r.prizes||ca,l=(S,v,ae)=>{const L=v+1,X=(S==="A"||S==="B"||S==="C")&&v>=ae-2,Ae=S==="D"&&v>=ae-3,I=O[S]||ca[S];return S==="A"?L===1?I.champ:L===2?I.vice:L===3?I.third:X?I.rel:I.mid:S==="B"||S==="C"?L===1?I.champ:L===2?I.vice:X?I.rel:I.mid:S==="D"?L===1?I.champ:L===2?I.vice:Ae?I.rel:I.mid:S==="VARZEA"?L===1?I.champ:L===2?I.vice:L===3?I.third:I.mid:0},m=(S,v)=>{S.forEach((ae,L)=>{const X=l(v,L,S.length);P().update(U.collection("teams").doc(ae.id),{balance:Z.firestore.FieldValue.increment(X)})})};m(b,"A"),m(A,"B"),m(T,"C"),m(f,"D"),m(_,"VARZEA");const y=b[0],C=A[0],k=T[0],j=f[0],w=_[0],N=[...o].sort((S,v)=>(v.stats&&v.stats.goals||0)-(S.stats&&S.stats.goals||0))[0],z=[...o].sort((S,v)=>(v.stats&&v.stats.assists||0)-(S.stats&&S.stats.assists||0))[0],W=[...o].sort((S,v)=>(v.stats&&v.stats.saves||0)-(S.stats&&S.stats.saves||0))[0],oe=[...o].filter(S=>S.pressRatingCount>0).sort((S,v)=>(v.pressRatingAvg||0)-(S.pressRatingAvg||0))[0],ne=U.collection("hallOfFame").doc(`season_${te}`);P().set(ne,{season:te,date:Date.now(),champA:y?{name:y.name,logo:y.logo}:null,champB:C?{name:C.name,logo:C.logo}:null,champC:k?{name:k.name,logo:k.logo}:null,champD:j?{name:j.name,logo:j.logo}:null,champVarzea:w?{name:w.name,logo:w.logo}:null,topScorer:N&&(($=N.stats)==null?void 0:$.goals)>0?{name:N.name,face:N.face,val:N.stats.goals}:null,topAssist:z&&((V=z.stats)==null?void 0:V.assists)>0?{name:z.name,face:z.face,val:z.stats.assists}:null,topSaves:W&&((Y=W.stats)==null?void 0:Y.saves)>0?{name:W.name,face:W.face,val:W.stats.saves}:null,topRating:oe?{name:oe.name,face:oe.face,val:oe.pressRatingAvg}:null}),(b.length>0||A.length>0)&&(b.slice(-2).forEach(S=>P().update(U.collection("teams").doc(S.id),{serie:"B"})),A.slice(0,2).forEach(S=>P().update(U.collection("teams").doc(S.id),{serie:"A"})),A.slice(-2).forEach(S=>P().update(U.collection("teams").doc(S.id),{serie:"C"})),T.slice(0,2).forEach(S=>P().update(U.collection("teams").doc(S.id),{serie:"B"})),T.slice(-2).forEach(S=>P().update(U.collection("teams").doc(S.id),{serie:"D"})),f.slice(0,2).forEach(S=>P().update(U.collection("teams").doc(S.id),{serie:"C"})),f.slice(-3).forEach(S=>P().update(U.collection("teams").doc(S.id),{serie:"VARZEA"})),_.slice(0,3).forEach(S=>P().update(U.collection("teams").doc(S.id),{serie:"D"}))),i.forEach(S=>{P().update(U.collection("teams").doc(S.id),{stats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0}})}),P().update(U.collection("config").doc("system"),{season:te+1});const le=S=>S==="GOL"?["gk","response","jump","longPass","balance","condition"]:S.includes("ZAG")?["defense","header","balance","jump","aggression","stamina"]:S.includes("LAT")||S.includes("LD")||S.includes("LE")?["speed","accel","stamina","shortPass","dribble","defense"]:S.includes("VOL")||S.includes("MC")||S==="MD"||S==="ME"?["shortPass","stamina","teamwork","defense","balance","tech"]:S.includes("MEI")||S.includes("MAT")?["dribble","shortPass","vision","tech","curve","agility"]:S==="PTD"||S==="PTE"?["speed","accel","dribble","agility","curve","stamina"]:S.includes("ATA")||S.includes("SA")||S.includes("PNT")?["shot","attack","header","shotPower","balance","speed"]:["stamina","balance","speed","shortPass","dribble","shot"],ue=S=>S<=50?50:S<=60?80:S<=70?150:S<=80?300:S<=85?600:S<=90?1e3:2e3;o.forEach(S=>{let v={stats:{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0},pressRatingSum:0,pressRatingCount:0,pressRatingAvg:0},ae=(S.xp||0)+(S.pendingXP||0);const L=S.position||"ATA",X=ue(S.overall||50);let Ae=ae>=0,I=Math.abs(ae),B=Math.floor(I/X),J=Ae?I%X:-(I%X);if(S.attributes&&B!==0){let re={...S.attributes};const ce=Object.keys(la),ge=le(L);for(let _e=0;_e<B;_e++){let Ee;Math.random()<.75?Ee=ge[Math.floor(Math.random()*ge.length)]:Ee=ce[Math.floor(Math.random()*ce.length)],L==="GOL"&&["shot","attack","dribble","curve","freeKick","weakFootAcc"].includes(Ee)&&(Ee="gk"),L!=="GOL"&&Ee==="gk"&&(Ee=ge[0]),re[Ee]===void 0&&(re[Ee]=50),Ae?re[Ee]<99&&re[Ee]++:re[Ee]>1&&re[Ee]--}const ve=L==="GOL"?["shot","attack","dribble","curve","freeKick","weakFootAcc","weakFootFreq"]:["gk"];let fe=0,ke=0;Object.entries(re).forEach(([_e,Ee])=>{!ve.includes(_e)&&la[_e]&&(fe+=Ee,ke++)}),v.attributes=re,v.overall=ke===0?S.overall:Math.round(fe/ke),v.xp=J,v.pendingXP=0}else v.xp=J,v.pendingXP=0;if(S.pendingPosBoosts&&S.attributes){let re=v.attributes?{...v.attributes}:{...S.attributes};S.pendingPosBoosts.forEach(ke=>{const _e=da[ke];_e&&_e.attrs.forEach(Ee=>{re[Ee]<99&&(re[Ee]=Math.min(99,re[Ee]+3))})}),v.attributes=re;const ge=(S.position||"ATA")==="GOL"?["shot","attack","dribble","curve","freeKick","weakFootAcc","weakFootFreq"]:["gk"];let ve=0,fe=0;Object.entries(re).forEach(([ke,_e])=>{ge.includes(ke)||(ve+=_e,fe++)}),v.overall=fe===0?S.overall:Math.round(ve/fe),v.pendingPosBoosts=Z.firestore.FieldValue.delete()}let Ce=(parseInt(S.contract)||0)-1;Ce<0&&(Ce=0),Ce===0?!S.loanMeta||!S.loanMeta.ownerId?(v.contract=0,v.teamId="FREE",v.status="VENDA",v.mood="😐"):(v.teamId=S.loanMeta.ownerId,v.contract=parseInt(S.loanMeta.originalContract)>0?parseInt(S.loanMeta.originalContract):1,v.status="NAO_A_VENDA",v.loanMeta=Z.firestore.FieldValue.delete()):v.contract=Ce,P().update(U.collection("players").doc(S.id),v)}),(await U.collection("users").where("type","in",["COACH","DOCTOR","SCOUT","ASSISTANT"]).get()).docs.forEach(S=>{const v=S.data();if(v.teamId&&v.teamId!=="FREE"){const ae=(v.contract||1)-1;ae<=0?P().update(S.ref,{teamId:"FREE",contract:0,salary:2500}):P().update(S.ref,{contract:ae})}});try{for(let S of ee)await S.commit();a(!1),h(`🏆 **FIM DA TEMPORADA ${te}!**
As premiações foram depositadas! Parabéns aos campeões:

🥇 Série A: ${(y==null?void 0:y.name)||"Ninguém"}
🥈 Série B: ${(C==null?void 0:C.name)||"Ninguém"}
🥉 Série C: ${(k==null?void 0:k.name)||"Ninguém"}
🏅 Série D: ${(j==null?void 0:j.name)||"Ninguém"}`,"finance"),alert(`Temporada ${te} encerrada com sucesso!

Premiações pagas, acessos e descensos definidos, atributos evoluídos e Museu atualizado!`)}catch(S){a(!1),alert("Erro na virada: "+S.message)}},saveTactics:async(U,te,ee,Q)=>{const P=p.collection("teams").doc(U);await p.runTransaction(async M=>{var T;const b=await M.get(P);if(!b.exists)throw Error("O time não foi encontrado.");const A=(((T=b.data().tactics)==null?void 0:T.revision)||0)+1;M.update(P,{tactics:{formation:te,lineup:ee,revision:A,updatedAt:Date.now(),updatedBy:Q}})}),alert("Formação e escalação atualizadas e sincronizadas entre o time e o técnico.")},saveMatchStats:async(U,te,ee,Q=null,P=null)=>{let M=[];if(te&&te.goals!==void 0?M=[{player:U,match:te,xpOverride:ee}]:M=Array.isArray(U)?U:[U],M.length===0)return alert("Nenhum dataPayload para salvar.");a(!0);const b=p.batch();let A=0;const T={GOAL:20,ASSIST:15,TACKLE:10,SAVE:12,WIN:30,DRAW:10,LOSS:-10,YELLOW:-10,RED:-30,RATING_MULT:5};if(M.forEach(l=>{var V,Y,S,v,ae,L;const{player:m,match:y,xpOverride:C}=l;if(!m||!y)return;let k=0;C!==void 0?k=C:(k+=(y.goals||0)*T.GOAL,k+=(y.assists||0)*T.ASSIST,k+=(y.tackles||0)*T.TACKLE,k+=(y.saves||0)*T.SAVE,k+=(y.yellows||0)*T.YELLOW,k+=(y.reds||0)*T.RED,y.result==="VITORIA"&&(k+=T.WIN),y.result==="EMPATE"&&(k+=T.DRAW),y.result==="DERROTA"&&(k+=T.LOSS),k+=(parseFloat(y.rating)||0)*T.RATING_MULT);const j=parseInt(k),w=p.collection("players").doc(m.id),N={goals:(((V=m.stats)==null?void 0:V.goals)||0)+(y.goals||0),assists:(((Y=m.stats)==null?void 0:Y.assists)||0)+(y.assists||0),tackles:(((S=m.stats)==null?void 0:S.tackles)||0)+(y.tackles||0),saves:(((v=m.stats)==null?void 0:v.saves)||0)+(y.saves||0),yellows:(((ae=m.stats)==null?void 0:ae.yellows)||0)+(y.yellows||0),reds:(((L=m.stats)==null?void 0:L.reds)||0)+(y.reds||0)},z=m.pressRatingSum||0,W=m.pressRatingCount||0,oe=z+parseFloat(y.rating||0),ne=W+1,le=oe/ne,ue={stats:N,pendingXP:(m.pendingXP||0)+j,pressRatingSum:oe,pressRatingCount:ne,pressRatingAvg:parseFloat(le.toFixed(1)),energy:Math.max(0,(m.energy||100)-25)};y.injury&&(y.recoveryLeft||0)>0&&(ue.injury=y.injury,ue.recoveryLeft=parseInt(y.recoveryLeft),ue.mood="😡");const K=P?P.serie:y.serie;if(K&&!["A","B","C","D","VARZEA"].includes(K)){const X=K,Ae=m.tournaments||{},I=Ae[X]||{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0,ratingSum:0,ratingCount:0};ue.tournaments={...Ae,[X]:{goals:I.goals+(y.goals||0),assists:I.assists+(y.assists||0),tackles:I.tackles+(y.tackles||0),saves:I.saves+(y.saves||0),yellows:I.yellows+(y.yellows||0),reds:I.reds+(y.reds||0),ratingSum:I.ratingSum+(parseFloat(y.rating)||0),ratingCount:I.ratingCount+1}}}b.update(w,ue),A++}),Q&&Q.id&&P&&!P.neutralFinal){const l=Q.stadiumLevel||1,m=St[l]||St[1],y=Q.ticketPrice||m.minTic,C=1-(y-m.minTic)/(m.maxTic-m.minTic||1)*.6,k=(Math.floor(Math.random()*41)+80)/100;let j=Math.floor(m.cap*C*k);j>m.cap&&(j=m.cap);const w=j*y,N=[0,.05,.1,.15,.2,.25][l]||.05;let z=0;const oe=[...Q.storeProducts||[]].map(le=>{let ue=1;le.price>30&&(ue=Math.max(.05,30/le.price));const K=Math.floor(j*N*ue),$=Math.min(K,le.stock);return z+=$*le.price,{...le,stock:le.stock-$}}),ne=p.collection("teams").doc(Q.id);b.update(ne,{balance:Z.firestore.FieldValue.increment(w),storeBalance:Z.firestore.FieldValue.increment(z),storeProducts:oe})}const f={};let _=0;M.forEach(l=>{l.player&&l.player.teamId&&l.player.teamId!=="FREE"&&(f[l.player.teamId]=l.match.result,_+=l.match.goals||0)});const O=Object.keys(f)[0];if(Object.keys(f).forEach(l=>{if(f[l]!=="NENHUM"){const m=i.find(y=>y.id===l);if(m){let y={},C=m.recentForm||[];C.unshift(f[l]),C.length>5&&C.pop(),y.recentForm=C;const k=P&&P.isEstadual;if(["A","B","C","D","VARZEA"].includes(m.serie)||k){let N={...k?m.stateStats||{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}:m.stats||{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0}};N.gf+=_,f[l]==="VITORIA"?(N.pts+=3,N.wins+=1):f[l]==="EMPATE"?(N.pts+=1,N.draws+=1):f[l]==="DERROTA"&&(N.losses+=1),k?y.stateStats=N:y.stats=N}b.update(p.collection("teams").doc(l),y)}}}),P&&P.id&&O){let l={};O===P.homeId?l.scoreHome=_:O===P.awayId&&(l.scoreAway=_),l.status="FINISHED",b.update(p.collection("matches").doc(P.id),l)}await b.commit(),a(!1),n(null),alert(`${A} súmula(s) lançada(s) com sucesso!${Q&&!(P!=null&&P.neutralFinal)?`
🏟️ Bilheteria e vendas da Loja contabilizadas!`:""}`)}}}const Ti=[{minOv:0,maxOv:45,minSal:500,maxSal:1500,label:"Várzea/Amador"},{minOv:46,maxOv:55,minSal:1500,maxSal:6e3,label:"Iniciante"},{minOv:56,maxOv:65,minSal:5e3,maxSal:18e3,label:"Profissional"},{minOv:66,maxOv:75,minSal:15e3,maxSal:45e3,label:"Estrela"},{minOv:76,maxOv:85,minSal:4e4,maxSal:11e4,label:"Craque"},{minOv:86,maxOv:99,minSal:1e5,maxSal:3e5,label:"Lenda"}],hu=t=>{const e=parseInt(t)||0;return Ti.find(n=>e>=n.minOv&&e<=n.maxOv)||Ti[0]},pu=(t,e,n)=>{const a=hu(n.overall).minSal,i=parseFloat(t.meta.newSalary)||0,r=e.recentForm||[],o=r.filter(E=>E==="VITORIA").length,u=r.filter(E=>E==="DERROTA").length;let h=1;u>o&&(h=1.2),o>u&&(h=.9);const d=a*h;return i>=d?{decision:"ACCEPT",message:`🤖 O empresário de ${n.name} achou a oferta excelente e aceitou os termos contratuais!`}:i>=d*.8?{decision:"COUNTER",counterValue:d,message:`🤖 O jogador tem interesse no ${e.name}, mas pede um ajuste salarial para ${ie(d)}.`}:{decision:"REJECT",message:`🤖 A proposta salarial foi considerada muito baixa pelo staff de ${n.name}. Negociação encerrada.`}},mu={USER:"teams",PLAYER:"players",COACH:"users",DOCTOR:"users",SCOUT:"users",ASSISTANT:"users"},fu=new Set(["VEICULO","IMOVEL","TECNOLOGIA","LUXO"]);async function gu(t,e,{user:n,productId:a,sellerId:i,giftTarget:r,expectedPrice:o,now:u=Date.now()}){var te;const h=mu[n==null?void 0:n.type];if(!h||!((te=n.data)!=null&&te.id))throw new Error("Entre em uma conta para comprar.");const d=t.collection(h).doc(n.data.id),E=t.collection("products").doc(a),R=t.collection("companies").doc(i),x=t.collection("sales").doc(),g=t.collection("news").doc(),D=r?t.collection("players").doc(r.id):d,U=new Date(u).toDateString();return t.runTransaction(async ee=>{const[Q,P,M,b]=await Promise.all([ee.get(d),ee.get(E),ee.get(R),ee.get(D)]);if(![Q,P,M,b].every(w=>w.exists))throw new Error("Conta, produto ou destinatário não encontrado.");const A=Q.data(),T=P.data(),f=M.data(),_=b.data(),O=Number(T.price),l=Number(T.stock),m=Number(A.balance||0);if(!Number.isFinite(O)||O<0||!Number.isFinite(m))throw new Error("Preço ou saldo inválido.");if(O!==Number(o))throw new Error("O preço mudou. Abra o produto novamente antes de comprar.");if(T.companyId!==i||f.status!=="ACTIVE")throw new Error("Esta loja não está disponível.");if(!Number.isFinite(l)||l<1)throw new Error("Produto Esgotado!");if(m<O)throw new Error("Saldo insuficiente!");const y=A.giftTracker||{date:"",count:0},C=y.date===U&&Number(y.count)||0;if(r&&C>=7)throw new Error("Você atingiu o limite máximo de 7 presentes enviados por dia!");const k=fu.has(T.cat)?(parseInt(T.power)||0)*100:0,j={balance:e.increment(-O)};return r&&(j.giftTracker={date:U,count:C+1}),ee.update(d,j),ee.update(R,{balance:e.increment(O)}),ee.update(E,{stock:e.increment(-1)}),r&&k>0&&ee.update(D,{fame:e.increment(k)}),ee.set(x,{companyId:i,buyerId:D.id,buyerName:_.name||"",giftedBy:r?A.name||"":null,productOriginalId:a,productName:T.name||"",price:O,cost:0,profit:O,img:T.img||null,cat:T.cat||"",power:parseInt(T.power)||0,fameGained:k,date:u}),r&&(k>0||O>5e5)&&ee.set(g,{text:`🎁 **MIMO DE LUXO!**
O ${A.name} acabou de enviar um(a) **${T.name}** caríssimo(a) de presente para **${_.name}**! O que será que está por trás dessa generosidade? 👀`,type:"biz",date:u,likes:[]}),{fameBonus:k,balance:m-O,giftTracker:j.giftTracker||A.giftTracker}})}const Au={SAUDE:"💊 Saúde (+Energia)",CONSUMIVEL:"⚡ Consumível (+Energia)",CHUTEIRA:"👟 Chuteira (+XP Treino)",LUVAS:"🧤 Luvas (+XP Treino)",VEICULO:"🚗 Veículo (+Fama)",IMOVEL:"🏠 Imóvel (+Fama)",TECNOLOGIA:"📱 Tecnologia (+Fama)",LUXO:"💎 Luxo/Moda (+Fama)"};function Eu(t,e){const{coaches:n,user:a,setModal:i,products:r,sps:o,companies:u,buyingRef:h,setLoading:d,players:E,teams:R}=t,x=(...l)=>e.postNews(...l);return{handleSendCoachOffer:async(l,m,y,C)=>{const k=n.find(j=>j.id===l);k&&(await p.collection("offers").add({type:"COACH_OFFER",coachId:l,staffType:k.type,recipientId:l,senderId:a.data.id,teamId:a.data.id,teamName:a.data.name,coachName:k.name,salary:parseFloat(m),contract:parseInt(y),clause:parseFloat(C),status:"PENDING",createdAt:Date.now()}),i(null),alert(`Proposta enviada para ${k.name}!`))},handleCounterCoachOffer:async(l,m,y,C)=>{if(a.data.level<2)return alert("Apenas profissionais Nível 2+ podem negociar valores!");await p.collection("offers").doc(l.id).update({salary:parseFloat(m),contract:parseInt(y),clause:parseFloat(C),status:"COUNTERED",recipientId:l.teamId,senderId:a.data.id}),alert("Contra-proposta enviada ao clube!")},handleFinalizeCoachContract:async l=>{const m=l.teamId,y=l.coachId||(l.recipientId===m?l.senderId:l.recipientId),C=l.staffType||"COACH",j=(await p.collection("teams").doc(m).get()).data();if(j.balance<l.salary)return alert("O time não tem saldo para pagar as luvas (1º salário)!");const w=p.batch(),N=n.find(W=>W.teamId===m&&W.status==="ACTIVE"&&W.type===C);N&&w.update(p.collection("users").doc(N.id),{teamId:"FREE",contract:0});const z=parseFloat(l.luvas)||0;w.update(p.collection("users").doc(y),{teamId:m,salary:parseFloat(l.salary),contract:parseInt(l.contract),clause:parseFloat(l.clause),balance:Z.firestore.FieldValue.increment(z)}),w.update(p.collection("teams").doc(m),{balance:j.balance-l.salary-z}),w.delete(p.collection("offers").doc(l.id)),await w.commit(),alert(`Contrato assinado! ${l.coachName} agora integra o Staff do ${l.teamName}.`)},saveProduct:async l=>{const m=parseFloat(l.price),y={name:l.name,price:m,img:l.img,desc:l.desc,cat:l.cat||"CHUTEIRA",companyId:a.data.id,power:l.power||0,stock:parseInt(l.stock)||0};if(l.id){const C=r.find(k=>k.id===l.id);C&&m<C.price&&x(`🚨 **PROMOÇÃO!**
A **${a.data.name}** baixou o preço de **${l.name}**!
De: ${ie(C.price)} ➝ Por: ${ie(m)}`,"biz"),delete y.companyId,await p.collection("products").doc(l.id).update(y)}else await p.collection("products").add(y),x(`🛍️ **NOVIDADE**
A **${a.data.name}** lançou: **${l.name}** (${Au[y.cat]}) por ${ie(m)}.`,"biz")},requestSponsorship:async(l,m)=>{if(o.find(C=>C.companyId===l&&C.teamId===a.data.id))return alert("Já existe uma negociação ou contrato ativo com esta empresa.");const y=u.find(C=>C.id===l);await p.collection("sponsorships").add({companyId:l,companyName:y.name,teamId:a.data.id,teamName:a.data.name,value:parseFloat(m),status:"PENDING"}),alert("Proposta enviada para a empresa!")},processSponsorship:async(l,m)=>{m==="REJECTED"||m==="CANCELLED"?confirm(m==="REJECTED"?"Recusar proposta?":"Cancelar contrato?")&&await p.collection("sponsorships").doc(l.id).delete():m==="ACTIVE"&&(await p.collection("sponsorships").doc(l.id).update({status:"ACTIVE"}),x(`🤝 **NOVO PATROCÍNIO**
A **${a.data.name}** agora patrocina o **${l.teamName}**!`,"biz"))},buyProduct:async(l,m,y=null)=>{if(h.current)return;const C=Number(l.price);if(!Number.isFinite(C)||C<0)return alert("Preço inválido.");if(confirm(y?`Comprar ${l.name} como PRESENTE para ${y.name} por ${ie(C)}?`:`Comprar ${l.name} por ${ie(C)}?`)){h.current=!0,d(!0);try{const k=await gu(p,Z.firestore.FieldValue,{user:a,productId:l.id,sellerId:m.id,giftTarget:y,expectedPrice:C});let j=y?`✅ Presente enviado com sucesso para ${y.name}!`:"✅ Compra realizada com sucesso!";!y&&k.fameBonus>0&&(j+=`
🌟 FAMA +${k.fameBonus}`),alert(j)}catch(k){alert("Erro ao processar compra: "+k.message)}finally{h.current=!1,d(!1)}}},handleAcceptCoachOffer:async l=>{const m=l.teamId,y=a.data,k=(await p.collection("teams").doc(m).get()).data();if(k.balance<l.value)return alert("O time não tem mais saldo para te contratar! Proposta cancelada.");const j=p.batch(),w=n.find(N=>N.teamId===m&&N.status==="ACTIVE");w&&j.update(p.collection("users").doc(w.id),{teamId:"FREE"}),y.teamId&&y.teamId,j.update(p.collection("users").doc(y.id),{teamId:m,salary:l.value}),j.update(p.collection("teams").doc(m),{balance:k.balance-l.value}),j.delete(p.collection("offers").doc(l.id)),await j.commit(),alert(`Parabéns! Você agora é técnico do ${l.teamName}!`)},handleRejectCoachOffer:async l=>{await p.collection("offers").doc(l.id).delete(),alert("Proposta recusada.")},sendOffer:async(l,m,y,C,k,j,w)=>{const N=parseFloat(y)||0,z=parseInt(k)||1,W=a.data.name,oe=l.name,ne=parseFloat(j.newSalary)||0,le=j.role||"ROTACAO";if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(l.type))try{d(!0);const V=parseFloat(j.signingBonus)||0,Y=Z.firestore();return w&&w.id?await Y.collection("offers").doc(w.id).update({salary:ne,contract:z,luvas:V,status:"PENDING",recipientId:l.id,senderId:a.data.id}):await Y.collection("offers").add({type:"COACH_OFFER",coachId:l.id,staffType:l.type,recipientId:l.id,senderId:a.data.id,teamId:a.data.id,teamName:W,coachName:l.name,salary:ne,contract:z,clause:ne*10,luvas:V,status:"PENDING",createdAt:Date.now()}),d(!1),i(null),alert(`📋 Proposta formal enviada para ${l.name}! Aguarde a resposta na sua Caixa de Entrada.`)}catch{return d(!1),alert("Erro ao enviar proposta para a Comissão Técnica.")}if(l.isNPC&&a.type==="USER"){const V=E.filter(Y=>Y.teamId===a.data.id&&Y.isNPC).length;if(V>=7&&l.teamId!==a.data.id){alert(`🚫 LIMITE DA BASE ATINGIDO!
Você já tem 7/7 BOTS no elenco. Você só poderá contratar outro quando 1 deles sair do elenco.`);return}if(l.teamId!==a.data.id&&!confirm(`⚠️ AVISO DA BASE

Atualmente você tem ${V}/7 BOTS no elenco.
Tem certeza que quer enviar esta proposta para ${l.name}?

Assim que você completar 7 de 7, você só poderá contratar outro quando 1 deles sair do elenco.`))return}let K;const $=l.teamId==="FREE"||!l.teamId;if(w&&w.id?w.type==="RENOVACAO_URGENTE"?K=w.playerId:w.sellerAccepted===!0?K=a.data.id===w.buyerId?w.playerId:w.buyerId:K=a.data.id===w.buyerId?w.sellerId==="FREE"||!w.sellerId?w.playerId:w.sellerId:w.buyerId:m==="PRE_CONTRATO"||m==="RENOVACAO"?K=l.id:K=$?l.id:l.teamId,l.isNPC&&a.type==="USER"&&K===l.id){const V=R.find(S=>S.id===a.data.id),Y=pu({meta:{newSalary:ne}},V,l);if(Y.decision==="REJECT"){alert(Y.message);return}else if(Y.decision==="COUNTER")if(confirm(`${Y.message}

Você aceita pagar ${ie(Y.counterValue)} de salário para fechar negócio AGORA?`))j.newSalary=Y.counterValue;else{alert("Negociação cancelada. O jogador encerrou as conversas.");return}else Y.decision==="ACCEPT"&&alert(Y.message);try{d(!0);const S=Z.firestore(),v=S.batch(),ae=parseFloat(j.signingBonus)||0;return V.balance<ae?(d(!1),alert(`Seu clube não tem ${ie(ae)} no caixa para pagar as Luvas de Assinatura. O negócio melou!`)):(ae>0&&v.update(S.collection("teams").doc(a.data.id),{balance:Z.firestore.FieldValue.increment(-ae)}),v.update(S.collection("players").doc(l.id),{teamId:a.data.id,status:"NAO_A_VENDA",contract:z,salary:parseFloat(j.newSalary),role:le,balance:Z.firestore.FieldValue.increment(ae),history:Z.firestore.FieldValue.arrayUnion({date:Date.now(),from:$?"AGENTE LIVRE":"Clube Anterior",to:a.data.name,type:m,value:0})}),w&&w.id&&v.delete(S.collection("offers").doc(w.id)),await v.commit(),x(`🤝 **NOVA CONTRATAÇÃO!**
O Atleta da Base **${l.name}** aceitou os termos e assinou com o **${a.data.name}**!`,"transfer"),d(!1),i(null),alert(`Negócio fechado! ${l.name} já está no seu elenco.`))}catch(S){return d(!1),alert("Erro ao assinar com o Bot: "+S.message)}}try{let V=`💰 Taxa: ${ie(N)}
`;j.installments>1&&(V+=`📅 Parcelamento: ${j.installments}x de ${ie(N/j.installments)}
`),j.sellOn>0&&(V+=`📈 Revenda: ${j.sellOn}%
`),m==="PRE_CONTRATO"?V=`⚖️ **LEI BOSMAN (PRÉ-CONTRATO)**
O jogador virá a custo zero no início da próxima temporada.
`:m==="RENOVACAO"&&(V=`📝 **PROPOSTA DE RENOVAÇÃO**
A diretoria ofereceu um novo contrato.
`),V+=`📝 Contrato: ${z} anos
`,V+=`💵 Salário Sugerido: ${ie(ne)}/sem
`,V+=`👔 Papel: ${le}`;const Y={playerId:l.id,playerName:oe,buyerId:(w==null?void 0:w.buyerId)||a.data.id,buyerName:(w==null?void 0:w.buyerName)||W,sellerId:l.teamId||(w==null?void 0:w.sellerId)||"FREE",recipientId:K,type:(w==null?void 0:w.type)==="RENOVACAO_URGENTE"?"RENOVACAO":m,value:N,offerContract:z,description:V,status:"PENDING",sellerAccepted:w&&w.sellerAccepted||!1,meta:{...j,newSalary:ne,signingBonus:parseFloat(j.signingBonus)||0,role:le,installments:parseInt(j.installments)||1,sellOn:parseInt(j.sellOn)||0,hasBuyOption:j.hasBuyOption||!1},date:Date.now()},S=p.batch();w&&w.id&&S.delete(p.collection("offers").doc(w.id)),S.set(p.collection("offers").doc(),Y),await S.commit();const v=w&&w.id?"🔄 CONTRAPROPOSTA":m==="PRE_CONTRATO"?"⚖️ PRÉ-CONTRATO":m==="RENOVACAO"?"📝 RENOVAÇÃO":"💼 NOVA OFERTA";x(`${v}
**${W}** enviou uma proposta para **${oe}**!

${V}`,"transfer"),i(null),alert("Enviado com sucesso! Aguarde a resposta.")}catch(V){console.error("Erro no Firebase:",V),alert("Erro técnico ao gravar no banco de dados.")}},acceptOffer:async l=>{var m,y,C,k,j;try{if(l.type==="NOTIFICACAO"){await p.collection("offers").doc(l.id).delete(),alert("Confirmado!");return}if(l.type==="PERSONAL_SPONSOR_OFFER"){if(!confirm(`Aceitar o patrocínio da ${l.companyName} por ${ie(l.value)} semanais?
Seu rosto aparecerá na loja deles!`))return;const K=p.batch();K.update(p.collection("players").doc(l.recipientId),{personalSponsor:{companyId:l.senderId,companyName:l.companyName,value:l.value,clause:l.value*4}}),K.delete(p.collection("offers").doc(l.id)),await K.commit(),x(`📸 **NOVA ESTRELA!**
**${l.playerName}** é o mais novo garoto propaganda da marca **${l.companyName}**!`,"biz"),alert("Contrato assinado! Verifique seu Perfil.");return}if(l.type==="PRE_CONTRATO"){if(!confirm(`Confirmar assinatura de Pré-Contrato com ${l.buyerName}?
Você se juntará a eles na próxima temporada.`))return;const K=p.batch();K.update(p.collection("players").doc(l.playerId),{preContract:{teamId:l.buyerId,teamName:l.buyerName,salary:l.meta.newSalary,date:Date.now()},mood:"🤩"}),K.delete(p.collection("offers").doc(l.id)),await K.commit(),x(`📝 **PRÉ-CONTRATO ASSINADO**
**${l.playerName}** assinou com o **${l.buyerName}** e se apresentará na próxima temporada!`,"transfer"),alert("Pré-contrato assinado com sucesso!");return}const w=R.find(K=>K.id===l.buyerId),N=E.find(K=>K.id===l.playerId),z=!l.sellerId||l.sellerId==="FREE",W=z?null:R.find(K=>K.id===l.sellerId);if(l.type==="COMPRA_DEFINITIVA"){if(!w||!N)return alert("Erro: Dados incompletos.");if(w.balance<l.value)return alert(`Saldo insuficiente! Necessário: ${ie(l.value)}`);if(!confirm(`Exercer opção de compra de ${N.name} por ${ie(l.value)}?`))return;const K=p.batch();K.update(p.collection("teams").doc(w.id),{balance:w.balance-l.value}),W&&K.update(p.collection("teams").doc(W.id),{balance:W.balance+l.value}),K.update(p.collection("players").doc(N.id),{teamId:w.id,loanMeta:Z.firestore.FieldValue.delete(),status:"NAO_A_VENDA",contract:3,history:Z.firestore.FieldValue.arrayUnion({date:Date.now(),from:W?W.name:"EMPRÉSTIMO",to:w.name,type:"COMPRA_DEFINITIVA",value:l.value})}),K.delete(p.collection("offers").doc(l.id)),await K.commit(),x(`✅ **OPÇÃO EXERCIDA**
O **${w.name}** contratou **${N.name}** em definitivo!`,"transfer"),alert("Compra realizada!");return}const oe=a.type==="USER"&&a.data.id===l.buyerId,ne=a.type==="USER"&&a.data.id===l.sellerId,le=a.type==="PLAYER"||z&&!oe;if(!z&&!l.sellerAccepted&&(ne||oe)){if(oe){if(!confirm(`Aceitar a pedida do clube vendedor (${ie(l.value)}) e negociar com o jogador?`))return}else if(!confirm("Aceitar os valores propostos? O jogador decidirá o contrato agora."))return;await p.collection("offers").doc(l.id).update({recipientId:l.playerId,sellerAccepted:!0,status:"PENDING"}),x(`💰 **ACORDO ENTRE CLUBES**
${w.name} e ${W.name} chegaram a um acordo por **${N.name}**. Falta o "Sim" do atleta!`,"transfer"),alert("Acordo financeiro selado! A proposta foi enviada para o jogador.");return}if((z||l.sellerAccepted)&&(le||oe)){if(!w||!N)return alert("Erro: Dados incompletos.");const K=((m=l.meta)==null?void 0:m.installments)>1?l.value/l.meta.installments:l.value,$=parseFloat((y=l.meta)==null?void 0:y.signingBonus)||0,V=K+$;if(w.balance<V)return alert(`Saldo insuficiente no caixa do comprador!
Necessário: ${ie(V)}`);if(oe){if(!confirm(`Aceitar a pedida salarial do jogador e fechar a contratação?
Custo Imediato: ${ie(V)}`))return}else if(!confirm(`Deseja assinar com o ${w.name}?`))return;const Y=p.batch();if(W){let ae=K;if(N.sellOnClause&&N.sellOnClause.percentage>0){const L=N.sellOnClause.beneficiaryId;if(L&&L!==w.id){const X=K*N.sellOnClause.percentage/100;ae-=X,Y.update(p.collection("teams").doc(L),{balance:Z.firestore.FieldValue.increment(X)})}}if(Y.update(p.collection("teams").doc(W.id),{balance:W.balance+ae}),((C=l.meta)==null?void 0:C.installments)>1){const L=p.collection("debts").doc();Y.set(L,{buyerId:w.id,buyerName:w.name,sellerId:W.id,sellerName:W.name,playerName:N.name,installmentVal:K,weeksRemaining:parseInt(l.meta.installments)-1,date:Date.now()})}}Y.update(p.collection("teams").doc(w.id),{balance:w.balance-V}),$>0&&Y.update(p.collection("players").doc(N.id),{balance:Z.firestore.FieldValue.increment($)});const S=l.meta&&l.meta.sellOn>0&&W?{beneficiaryId:W.id,percentage:l.meta.sellOn}:Z.firestore.FieldValue.delete();Y.update(p.collection("players").doc(N.id),{teamId:w.id,status:"NAO_A_VENDA",contract:l.type==="EMPRESTIMO"?parseInt(l.meta.loanDuration)||1:parseInt(l.offerContract)||1,salary:parseFloat((k=l.meta)==null?void 0:k.newSalary)||N.salary,role:((j=l.meta)==null?void 0:j.role)||"ROTACAO",loanMeta:l.type==="EMPRESTIMO"?{ownerId:W==null?void 0:W.id,salarySplit:l.meta.salarySplit||100,hasBuyOption:l.meta.hasBuyOption||!1,buyOpt:l.meta.buyOpt||0,originalContract:N.contract}:null,sellOnClause:S,history:Z.firestore.FieldValue.arrayUnion({date:Date.now(),from:z?"AGENTE LIVRE":W?W.name:"Desconhecido",to:w.name,type:l.type,value:l.value})}),Y.delete(p.collection("offers").doc(l.id)),await Y.commit();const v=z?`✍️ **ASSINOU!**
O Agente Livre **${N.name}** é o novo reforço do **${w.name}**!`:`🤝 **TRANSFERÊNCIA CONCLUÍDA**
**${N.name}** assinou com o **${w.name}**!`;x(v,"transfer"),W&&N.sellOnClause&&N.sellOnClause.percentage>0&&x(`💸 **CLÁUSULA DE REVENDA**
Uma parte da venda de **${N.name}** (${N.sellOnClause.percentage}%) foi repassada ao seu antigo clube formador.`,"money"),alert("Negócio fechado com sucesso!")}}catch(w){console.error(w),alert("Erro ao processar o aceite: "+w.message)}},rejectOffer:async l=>{try{if(l.type==="COMPRA_DEFINITIVA"&&l.isLoanOption){const m=E.find(z=>z.id===l.playerId),y=l.sellerId,C=R.find(z=>z.id===y);if(!confirm("Deseja recusar a compra? O jogador retornará ao clube de origem."))return;const k=p.batch(),j=p.collection("players").doc(m.id);let w=0;m.loanMeta&&m.loanMeta.originalContract?w=parseInt(m.loanMeta.originalContract):(console.warn("Contrato original não encontrado. Usando fallback de 6 anos."),w=6);let N=w-1;if(N<0&&(N=0),N<=0){const z=p.collection("offers").doc();k.set(z,{type:"RENOVACAO_URGENTE",playerId:m.id,playerName:m.name,buyerId:y,buyerName:(C==null?void 0:C.name)||"Clube de Origem",sellerId:"SISTEMA",recipientId:y,status:"PENDING",description:`⚠️ **URGENTE: FIM DE CONTRATO**
O empréstimo de **${m.name}** acabou e o contrato dele com você expirou.

Renove ou libere para os passes livres.`,date:Date.now()}),k.update(j,{teamId:y,loanMeta:Z.firestore.FieldValue.delete(),status:"INTRANSFERIVEL",contract:0}),x(`🔙 **RETORNO CRÍTICO**
O empréstimo de ${m.name} acabou e o contrato expirou!`,"rumor")}else{const z=p.collection("offers").doc();k.set(z,{type:"NOTIFICACAO",playerId:m.id,playerName:m.name,buyerName:"Sistema",recipientId:y,status:"PENDING",description:`🔙 **RETORNO DE EMPRÉSTIMO**
A opção de compra foi recusada.
**${m.name}** voltou ao seu elenco.

📄 Contrato Restante: ${N} temporada(s).`,date:Date.now()}),k.update(j,{teamId:y,loanMeta:Z.firestore.FieldValue.delete(),status:"NAO_A_VENDA",contract:N}),x(`🔙 **RETORNO**
${m.name} retornou ao ${C==null?void 0:C.name} (${N} anos rest.).`,"transfer")}k.delete(p.collection("offers").doc(l.id)),await k.commit(),alert("Opção recusada. Jogador devolvido ao clube de origem.");return}if(l.type==="RENOVACAO_URGENTE"){if(!confirm("Tem certeza? O jogador perderá o vínculo com o clube e irá para os Agentes Livres."))return;const m=p.batch();m.update(p.collection("players").doc(l.playerId),{teamId:"FREE",status:"VENDA",mood:"😐",contract:0}),m.delete(p.collection("offers").doc(l.id)),await m.commit(),x(`🆓 **AGENTE LIVRE**
O vínculo de **${l.playerName}** expirou e ele está livre no mercado!`,"transfer"),alert("Jogador enviado para os Agentes Livres.");return}if(!confirm("Deseja recusar e encerrar esta negociação?"))return;await p.collection("offers").doc(l.id).delete(),l.type!=="NOTIFICACAO"&&x(`❌ **NEGOCIAÇÃO ENCERRADA**
O acordo por **${l.playerName}** não avançou.`,"transfer")}catch(m){console.error(m),alert("Erro técnico ao processar a recusa.")}},renewContract:async l=>{if(!l.teamId||l.teamId==="FREE")return alert("Jogadores livres assinam novos contratos, não renovam!");const m=(parseFloat(l.value)||1e6)*.1;if(a.data.balance<m)return alert(`Saldo insuficiente para bônus de renovação (Custo: ${ie(m)})`);if(confirm(`Renovar com ${l.name}?
Custo: ${ie(m)} (Este valor irá para o saldo do jogador)`))try{const y=p.batch();y.update(p.collection("teams").doc(a.data.id),{balance:Z.firestore.FieldValue.increment(-m)}),y.update(p.collection("players").doc(l.id),{contract:(parseInt(l.contract)||0)+1,balance:Z.firestore.FieldValue.increment(m),status:"NAO_A_VENDA"}),await y.commit(),x(`📝 **RENOVAÇÃO**
O **${a.data.name}** renovou com **${l.name}**!`,"transfer"),i(null)}catch(y){alert("Erro ao renovar: "+y.message)}},handlePlayerActions:async(l,m)=>{const y=R.find(C=>C.id===m.teamId);if(l==="TRANSFER_REQUEST"){if(!y)return alert("Já és um Agente Livre!");if(m.status==="VENDA")return alert("Já estás na lista de transferências.");if(!confirm(`Tens a certeza que queres pedir para sair do ${y.name}? O adepto não vai gostar...`))return;await p.collection("players").doc(m.id).update({status:"VENDA",mood:"😡"}),x(`💣 **CRISE NO ${y.name.toUpperCase()}!**
O jogador **${m.name}** está insatisfeito e pediu para ser colocado na lista de transferências!`,"rumor"),alert("O pedido foi feito. O teu humor piorou.")}if(l==="ASK_RAISE"){if(!y)return alert("Precisas de um clube para pedir aumento.");if(!confirm("Ir à imprensa pedir um aumento salarial?"))return;x(`💰 **POLÉMICA**
**${m.name}** declara publicamente: "Mereço ganhar mais no ${y.name}. Espero uma renovação em breve."`,"press"),alert("Declaração feita à imprensa! O presidente foi notificado.")}if(l==="DECLARE_HAPPY"){if(!y)return alert("Precisas de um clube.");if(m.mood==="🤩")return alert("Já estás feliz!");await p.collection("players").doc(m.id).update({mood:"🤩",status:"NAO_A_VENDA"}),x(`💙 **AMOR À CAMISA**
**${m.name}** declarou: "Estou muito feliz no ${y.name} e quero fazer história aqui!"`,"press"),alert("Declaração feita! A torcida adorou.")}if(l==="RESET_MOOD"){if(!y)return alert("Precisas de um clube.");await p.collection("players").doc(m.id).update({mood:"😐",status:"NAO_A_VENDA"}),x(`🤝 **PAZES FEITAS**
**${m.name}** retirou seu pedido de transferência e foca novamente no ${y.name}.`,"press"),alert("Voltaste ao normal. Clima apaziguado.")}}}}function In(t){return Array.isArray(t)?t.map(In):t&&typeof t=="object"?Object.fromEntries(Object.keys(t).sort().map(e=>[e,In(t[e])])):t}function Wt(t,e){const n=[],a={update(i,r){return n.push(["update",i,r]),a},set(i,r,o){return n.push(["set",i,r,o]),a},delete(i){return n.push(["delete",i]),a},commit(){return t.runTransaction(async i=>{const r=await Promise.all(e.map(o=>i.get(o.ref)));e.forEach((o,u)=>{const h=r[u];if(!h.exists)throw new Error("Este registro já foi alterado ou removido. Atualize e tente novamente.");const d=h.data();for(const[E,R]of Object.entries(o.expected||{}))if(JSON.stringify(In(d[E]))!==JSON.stringify(In(R)))throw new Error("Os dados mudaram durante a operação. Confira os valores e tente novamente.")});for(const[o,u,h,d]of n)o==="delete"?i.delete(u):o==="set"&&d?i.set(u,h,d):i[o](u,h)})}};return a}function yu(t,e,n,a){return Wt(t,[{ref:e,expected:n}]).update(e,a).commit()}const on={LEVE:["Fadiga Muscular","Entorse de Tornozelo G1","Contusão na Canela","Corte no Supercílio","Bolhas no Pé","Luxação de Dedo","Pancada no Quadril","Torcicolo","Edema Leve","Câimbras Fortes","Desgaste Físico","Pequena Contusão Lombar","Arranhão na Córnea","Inflamação no Tendão","Pancada no Nariz"],MODERADA:["Estiramento na Coxa G1","Lesão no Adutor","Concussão Leve","Entorse de Tornozelo G2","Tendinite Aquileia","Contusão Óssea","Fibrose Muscular","Fissura no Metatarso","Estiramento na Panturrilha","Lesão no Ligamento Colateral","Sinovite no Joelho","Bursite no Quadril","Contusão Traumática","Luxação de Ombro Parcial","Hérnia Inguinal Inicial"],GRAVE:["Estiramento G2","Ruptura Parcial de Menisco","Pubalgia Crônica","Fratura de Nariz","Lesão de Cartilagem","Entorse de Joelho com Edema","Fratura de Costela","Ruptura Parcial de Tendão","Descolamento Muscular","Lesão Traumática Cervical","Fratura de Malar","Lesão Complexa no Psoas","Entorse de Tornozelo G3","Ruptura de Fibras Grau 3","Edema Ósseo Profundo"],EXTREMA:["Ruptura de LCA (Cruzado)","Ruptura do Tendão de Aquiles","Fratura de Tíbia e Fíbula","Ruptura Total de Isquiotibiais","Hérnia de Disco","Fratura por Estresse","Ruptura de Ligamento Cruzado Posterior","Fratura de Tornozelo","Luxação de Patela Grave","Ruptura Total de Adutor","Lesão Nervosa","Síndrome Compartimental","Fratura de Vértebra","Ruptura de Tendão Patelar","Pneumotórax Traumático"]},vu={1:{name:"Campo de Terra",bonusXP:0,healChance:0,upgCost:5e6,maint:5e3,prompt:"campo de futebol de terra batida amador --ar 16:9"},2:{name:"CT Básico",bonusXP:10,healChance:5,upgCost:15e6,maint:2e4,prompt:"centro de treinamento de futebol simples, campo gramado --ar 16:9"},3:{name:"CT Profissional",bonusXP:25,healChance:10,upgCost:35e6,maint:5e4,prompt:"centro de treinamento de futebol profissional, boa estrutura --ar 16:9"},4:{name:"CT Avançado",bonusXP:40,healChance:20,upgCost:8e7,maint:1e5,prompt:"centro de treinamento moderno com academia visível ao fundo --ar 16:9"},5:{name:"Academia de Elite",bonusXP:60,healChance:30,upgCost:0,maint:2e5,prompt:"melhor centro de treinamento do mundo, piscinas de gelo, tecnologia --ar 16:9"}};function Iu(t,e){const{user:n,teams:a,setLoading:i,setSales:r,setUser:o,setModal:u,players:h}=t;return{handleFireCoach:async b=>{const A=n.data,f=(parseFloat(b.salary)||2500)*4;if(confirm(`Demitir ${b.name}?
Você terá que pagar uma multa rescisória de ${ie(f)}.`)){const _=parseFloat(A.balance)||0;if(_<f)return alert("Saldo insuficiente para pagar a rescisão!");const O=p.batch();O.update(p.collection("teams").doc(A.id),{balance:_-f}),O.update(p.collection("users").doc(b.id),{teamId:"FREE",contract:0,salary:2500,balance:Z.firestore.FieldValue.increment(f)}),await O.commit(),alert(`${b.name} foi demitido e a multa de ${ie(f)} foi paga.`)}},handleCoachSelfActions:async(b,A)=>{const T=a.find(f=>f.id===A.teamId);if(T){if(b==="RAISE"){const f=prompt("Qual o novo salário semanal desejado?",A.salary);if(!f)return;const _=parseFloat(f);if(_<=A.salary)return alert("O valor deve ser maior que o atual.");await p.collection("offers").add({type:"COACH_RAISE",recipientId:T.id,senderId:A.id,teamName:T.name,coachName:A.name,currentSalary:A.salary,requestedSalary:_,status:"PENDING",description:`💰 **PEDIDO DE AUMENTO**
O técnico **${A.name}** pede um reajuste salarial.
Atual: ${ie(A.salary)} ➝ Pedido: ${ie(_)}`,date:Date.now()}),alert("Pedido de aumento enviado à diretoria!")}if(b==="RESIGN_REQ"){if(!confirm("Enviar pedido de demissão amigável? O clube pode recusar."))return;await p.collection("offers").add({type:"COACH_RESIGN",recipientId:T.id,senderId:A.id,teamName:T.name,coachName:A.name,status:"PENDING",description:`👋 **PEDIDO DE DESLIGAMENTO**
O técnico **${A.name}** deseja rescindir o contrato amigavelmente (sem multa).`,date:Date.now()}),alert("Pedido de desligamento enviado!")}if(b==="BUYOUT"){const f=A.clause||A.salary*10;if(A.balance<f)return alert(`Saldo insuficiente! Você precisa de ${ie(f)}.`);if(!confirm(`TEM CERTEZA? Você pagará ${ie(f)} do seu bolso para ficar livre agora.`))return;const _=p.batch(),O=parseFloat(A.balance)||0,l=parseFloat(T.balance)||0;_.update(p.collection("users").doc(A.id),{balance:O-f,teamId:"FREE",contract:0,salary:2500}),_.update(p.collection("teams").doc(T.id),{balance:l+f}),await _.commit(),alert("Multa paga! Você está livre no mercado."),window.location.reload()}}},handleCoachIndication:async(b,A)=>{await p.collection("offers").add({type:"COACH_SUGGESTION",teamId:n.data.teamId,recipientId:n.data.teamId,senderId:n.data.id,senderName:n.data.name,playerId:b.id,playerName:b.name,playerPos:b.position,playerOv:b.overall,playerVal:b.value,status:"PENDING",description:`💡 **INDICAÇÃO DO TÉCNICO**
${n.data.name} sugere a contratação de **${b.name}** (${b.position}).

📝 Obs: "${A||"Sem observações"}"`,date:Date.now()}),alert("Indicação enviada para a diretoria!")},handleCoachUseItem:async b=>{if(!n.data||!["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(n.type))return;const A=new Date().toDateString(),f=(n.data.lastToxicityDate||"")===A&&n.data.toxicity||0,_=n.data.energy!==void 0?n.data.energy:100;if(_>=100)return alert("Sua energia já está cheia! Guarde o item para depois.");i(!0);try{const O=Wt(p,[{ref:p.collection("sales").doc(b.id),expected:{buyerId:n.data.id}},{ref:p.collection("users").doc(n.data.id),expected:{energy:n.data.energy,toxicity:n.data.toxicity,fame:n.data.fame,equippedItem:n.data.equippedItem}}]),l=p.collection("users").doc(n.data.id),m=p.collection("sales").doc(b.id);let y="SUCCESS";if(f===2?Math.random()<.4&&(y="SICK"):f>=3&&Math.random()<.95&&(y="VOMIT"),y==="VOMIT"||y==="SICK")O.update(l,{energy:0,toxicity:f+1,lastToxicityDate:A}),O.delete(m),await O.commit(),r(C=>C.filter(k=>k.id!==b.id)),o(C=>({...C,data:{...C.data,energy:0,toxicity:f+1}})),alert(y==="VOMIT"?`🤮 VÔMITO! Você comeu demais e seu estômago rejeitou tudo.
Resultado: Energia ZERADA.`:`🤢 ENJOO FORTE! O item não caiu bem.
Resultado: Você precisou deitar e sua energia zerou.`);else{const C=parseInt(b.power)||0,k=Math.min(100,_+C);O.update(l,{energy:k,toxicity:f+1,lastToxicityDate:A}),O.delete(m),await O.commit(),r(j=>j.filter(w=>w.id!==b.id)),o(j=>({...j,data:{...j.data,energy:k,toxicity:f+1}})),f===1?alert(`⚡ Energia recuperada: +${C}% (Total: ${k}%)
⚠️ CUIDADO: Foi seu 2º item hoje. O próximo tem risco de intoxicação.`):f>=2?alert(`⚡ Energia recuperada: +${C}%
⛔ PERIGO: Seu estômago está no limite! Pare de consumir agora!`):alert(`⚡ Energia recuperada: +${C}% (Total: ${k}%)`)}}catch(O){console.error(O),alert("Erro ao usar item: "+O.message)}i(!1)},handleUseItem:async(b,A)=>{var T;if(!(!n.data||n.type!=="PLAYER")){i(!0);try{const f=Wt(p,[{ref:p.collection("sales").doc(b.id),expected:{buyerId:n.data.id}},{ref:p.collection("players").doc(n.data.id),expected:{energy:n.data.energy,toxicity:n.data.toxicity,fame:n.data.fame,equippedItem:n.data.equippedItem}}]),_=p.collection("sales").doc(b.id),O=p.collection("players").doc(n.data.id);if(A==="CONSUME"){const l=new Date().toDateString(),y=(n.data.lastToxicityDate||"")===l&&n.data.toxicity||0;if(((T=n.data.injury)==null?void 0:T.type)==="INTOXICACAO"){alert(`🤢 VOCÊ ESTÁ INTOXICADO!
Seu estômago não aceita nada. Espere o dia virar para melhorar.`),i(!1);return}let C="SUCCESS";if(y===2?Math.random()<.4&&(C="SICK"):y>=3&&Math.random()<.95&&(C="VOMIT"),C==="VOMIT"){f.update(O,{energy:0,mood:"😡",toxicity:y+1,lastToxicityDate:l}),f.delete(_),await f.commit(),r(N=>N.filter(z=>z.id!==b.id)),o(N=>({...N,data:{...N.data,energy:0,mood:"😡",toxicity:y+1}})),alert(`🤮 VÔMITO!

Você consumiu demais! Seu corpo rejeitou tudo.

Efeito: Energia ZERADA e Humor piorado.`),i(!1);return}if(C==="SICK"){const N={type:"INTOXICACAO",label:"Intoxicação Alimentar",games:1,isIncurable:!0};f.update(O,{injury:N,recoveryLeft:1,toxicity:y+1,lastToxicityDate:l}),f.delete(_),await f.commit(),r(z=>z.filter(W=>W.id!==b.id)),o(z=>({...z,data:{...z.data,injury:N,toxicity:y+1}})),alert(`🤢 INTOXICAÇÃO ALIMENTAR!

Seu estômago não aguentou.

Efeito: Você foi internado e terá que esperar melhorar naturalmente (1 dia).`),i(!1);return}const k=parseInt(b.power)||0,j=n.data.energy||0;if(k>0&&j>=100){alert("Sua energia já está cheia!"),i(!1);return}const w=Math.min(100,j+k);f.update(O,{energy:w,toxicity:y+1,lastToxicityDate:l}),f.delete(_),await f.commit(),r(N=>N.filter(z=>z.id!==b.id)),o(N=>({...N,data:{...N.data,energy:w,toxicity:y+1}})),y===1?alert(`⚡ Energia recuperada: +${k}%
⚠️ CUIDADO: Foi seu 2º energético hoje. O próximo tem risco de intoxicação.`):y>=2?alert(`⚡ Energia recuperada...
⛔ PERIGO: Seu estômago está no limite! Pare de consumir agora!`):alert(`⚡ Energia recuperada: +${k}% (Total: ${w}%)`)}A==="EQUIP"&&(f.update(O,{equippedItem:{id:b.id,name:b.productName,cat:b.cat,power:parseInt(b.power)||0,img:b.img}}),f.delete(_),await f.commit(),r(l=>l.filter(m=>m.id!==b.id)),alert(`🛡️ Item equipado: ${b.productName}
Ele será consumido automaticamente no próximo treino.`))}catch(f){console.error("Erro ao usar item:",f),alert("Erro ao processar item. Tente novamente.")}finally{i(!1)}}},savePlayer:async b=>{try{const A={...b};b.id?await p.collection("players").doc(b.id).update(A):(A.attributes||(A.attributes=vn(A.position||"ATA",A.overall||60)),await p.collection("players").add(A)),u(null)}catch(A){console.error(A),alert("Erro ao salvar jogador: "+A.message)}},handleUpdateCoachSalary:async b=>{if(n.data.level<2)return alert("Nível insuficiente!");if(b<1e3)return alert("Salário mínimo é 1.000!");await p.collection("users").doc(n.data.id).update({salary:parseInt(b)}),alert("Valor de mercado atualizado!")},handleAssistantRegen:async b=>{const A=n.data,T=A.perks||[],f=T.some(W=>W.id==="COFFEE_LOVER"),_=T.some(W=>W.id==="ICE_BATH"),O=T.some(W=>W.id==="GOOD_VIBES"),l=T.some(W=>W.id==="LIGHT_WORK"),m=f?10:20,y=A.energy!==void 0?A.energy:100;if(y<m)return alert(`Você está muito cansado! Energia atual: ${y}% (Necessário: ${m}%)`);if(b.length===0)return alert("Selecione os jogadores que vão pra banheira de gelo!");i(!0);const C=p.batch();let k=[];b.forEach(W=>{const oe=h.find(V=>V.id===W);if(!oe)return;if((oe.recoveryLeft||0)>0){k.push(`⚠️ ${oe.name} ignorado (Já está sob cuidados do DM).`);return}let ne=25;_&&(ne+=15);const le=Math.min(100,(oe.energy!==void 0?oe.energy:100)+ne);let ue=Math.floor(Math.random()*3)+1;l&&(ue+=5);let K={energy:le,xp:(oe.xp||0)+ue},$="";O&&Math.random()<.3&&(K.mood="🤩",$=" e ficou muito feliz (🤩)!"),C.update(p.collection("players").doc(W),K),k.push(`🔋 ${oe.name} recuperou +${ne}⚡ (+${ue} XP)${$}`)});let j=(A.xp||0)+20,w=A.level,N=A.pendingPerks||0;j>=w*100&&w<30&&(j-=w*100,w++,w%3===0&&N++,alert(`🎉 PARABÉNS! Nível ${w} alcançado!`)),C.update(p.collection("users").doc(A.id),{energy:y-m,xp:j,level:w,pendingPerks:N});const z=a.find(W=>W.id===A.teamId);if(z){let W=[...z.trainingLogs||[]];W.unshift({date:Date.now(),type:"🧊 REGENERATIVO (AUXILIAR)",report:k.join(`
`)}),W.length>10&&W.pop(),C.update(p.collection("teams").doc(z.id),{trainingLogs:W})}await C.commit(),i(!1),alert(`Sessão de Recuperação finalizada!

${k.join(`
`)}`)},handleCoachTrain:async(b,A)=>{const T=n.data,f=T.energy!==void 0?T.energy:100,_=b.length>0?20:30;if(f<_)return alert(`Você está muito cansado para realizar esta atividade! Energia atual: ${f}% (Necessário: ${_}%)`);i(!0);const O=p.batch();let l=0,m=[];const y=T.perks||[],C=y.find(L=>L.type==="ENERGY_SAVE"),k=C?Math.round(25*C.value):25,j=y.find(L=>L.type==="CRIT_CHANCE"),w=j?j.value:0,N=y.find(L=>L.type==="MIN_XP_BOOST"),z=N?N.value:0,W=y.find(L=>L.type==="AFFINITY_BOOST"),oe=W?W.value:0,ne=a.find(L=>L.id===T.teamId),le=(ne==null?void 0:ne.ctLevel)||1,ue=vu[le].bonusXP/100;let K=[];A==="FISICO_BASE"?K=["stamina","balance","condition","strength"]:A==="VELOCIDADE"?K=["speed","accel","agility","dribbleSpd"]:A==="IMPULSAO"?K=["jump","header","condition"]:A==="CHUTE"?K=["shot","shotPower","shotTech","weakFootAcc"]:A==="PASSE"?K=["shortPass","longPass","shortPassSpd","longPassSpd","tech","weakFootFreq"]:A==="DRIBLE"?K=["dribble","dribbleSpd","agility","tech"]:A==="DEFESA"?K=["defense","aggression","response"]:A==="MENTAL"?K=["teamwork","mentality","response"]:A==="BOLA_PARADA"?K=["freeKick","curve","header","penalties"]:A==="GOLEIRO"?K=["gk","response","jump","longPass"]:A==="STUDY"&&(K=[]),b.forEach(L=>{const X=h.find(ce=>ce.id===L);if(!X)return;const Ae=X.energy!==void 0?X.energy:100;if((X.recoveryLeft||0)>0){m.push(`⚠️ ${X.name} ignorado (está lesionado)`);return}if(Ae<k){m.push(`⚠️ ${X.name} ignorado (exausto: ${Ae}%)`);return}if(Math.random()<.01){const ce=on.LEVE[Math.floor(Math.random()*on.LEVE.length)];O.update(p.collection("players").doc(X.id),{injury:ce,recoveryLeft:1,energy:Math.max(0,Ae-15),mood:"😡"}),m.push(`❌ ${X.name} se lesionou no treino: ${ce}`);return}const I=Ae-k;let B=Math.floor(Math.random()*5)+8+z,J=B+Math.floor(B*ue);if((T.affinities||[]).includes(X.position)&&(J+=5+oe),X.equippedItem){const ce=X.equippedItem.power||0,ge=Math.ceil(J*(ce/100));J+=ge,m.push(`👟 ${X.name} usou ${X.equippedItem.name} (+${ge} XP)`),O.delete(p.collection("sales").doc(X.equippedItem.id)),O.update(p.collection("players").doc(L),{equippedItem:Z.firestore.FieldValue.delete()})}y.forEach(ce=>{ce.type==="TRAIN_BOOST"&&ce.attrs.some(ve=>K.includes(ve))&&(J=Math.round(J*ce.multiplier)),ce.type==="YOUTH_BOOST"&&(X.age||18)<=ce.ageLimit&&(J=Math.round(J*ce.multiplier))}),Math.random()<.1+w&&(J*=2,m.push(`🔥 ${X.name} teve uma GRANDE evolução (+${J} XP)!`));let Ce={...X.attributes||{}};K.forEach(ce=>{(Ce[ce]||50)<99&&Math.random()<J/80&&(Ce[ce]=(Ce[ce]||50)+1)});let re={xp:(X.xp||0)+J,energy:I,attributes:Ce};if(X.learningPosition)if(A===da[X.learningPosition.target].train){let ce=10;(T.affinities||[]).includes(X.learningPosition.target)&&(ce+=5),ce+=le*2;const ge=X.learningPosition.current+ce;ge>=X.learningPosition.required?(m.push(`🌟 ${X.name} APRENDEU a jogar de ${X.learningPosition.target}! (O Boost de atributos entrará na próxima temporada)`),re.secondaryPositions=Z.firestore.FieldValue.arrayUnion(X.learningPosition.target),re.learningPosition=Z.firestore.FieldValue.delete(),re.pendingPosBoosts=Z.firestore.FieldValue.arrayUnion(X.learningPosition.target)):(re["learningPosition.current"]=ge,m.push(`🔄 ${X.name} adaptando para ${X.learningPosition.target}: ${Math.min(100,Math.floor(ge/X.learningPosition.required*100))}%`))}else m.push(`⚠️ ${X.name} precisa do treino de ${da[X.learningPosition.target].train} para evoluir na nova posição.`);O.update(p.collection("players").doc(L),re),l+=20,m.push(`✔️ ${X.name} evoluiu +${J} XP (Desgaste: -${k}⚡)`)}),A==="STUDY"&&(l=Math.floor(Math.random()*10)+15,m.push("📚 Você dedicou tempo estudando novas táticas e evoluiu como treinador."));let $=(T.xp||0)+l,V=T.level,Y=T.pendingPerks||0,S=T.pendingAffinity||0;const v=V*120;if($>=v&&V<30&&($-=v,V++,V%5===0&&Y++,[10,20,30].includes(V)&&S++,alert(`🎉 PARABÉNS! Nível ${V} alcançado!`)),O.update(p.collection("users").doc(T.id),{energy:f-_,xp:$,level:V,pendingPerks:Y,pendingAffinity:S}),ne){let L=[...ne.trainingLogs||[]];L.unshift({date:Date.now(),type:A,report:m.join(`
`)}),L.length>10&&L.pop(),O.update(p.collection("teams").doc(ne.id),{trainingLogs:L})}await O.commit(),i(!1);let ae=A==="STUDY"?"Estudo concluído!":"Treino realizado com sucesso!";m.length>0&&(ae+=`

`+m.join(`
`)),alert(ae)},handleEvolveCoachPerk:async b=>{await p.collection("users").doc(n.data.id).update({perks:Z.firestore.FieldValue.arrayUnion(b),pendingPerks:Z.firestore.FieldValue.increment(-1)}),o(A=>({...A,data:{...A.data,perks:[...A.data.perks||[],b],pendingPerks:(A.data.pendingPerks||1)-1}})),alert(`Habilidade "${b.name}" aprendida!`)},updateTeamStats:async(b,A)=>{await p.collection("teams").doc(b).update({stats:A}),alert("Tabela atualizada!")},handlePlayerSoloTrain:async(b,A)=>{const T=b.energy!==void 0?b.energy:100;if(T<35)return alert(`Exausto (${T}%)! Precisa de 35%.`);if((b.recoveryLeft||0)>0)return alert("Você está lesionado e não pode treinar!");i(!0);const f=p.batch();let _=[];if(Math.random()<.02){const w=on.LEVE[Math.floor(Math.random()*on.LEVE.length)];return f.update(p.collection("players").doc(b.id),{injury:w,recoveryLeft:1,energy:Math.max(0,T-20),mood:"😡"}),await f.commit(),i(!1),alert(`❌ INFORTÚNIO!
Lesão no treino: ${w}
1 Jogo fora.`)}let O=[];A==="FISICO_BASE"?O=["stamina","balance","condition","strength"]:A==="VELOCIDADE"?O=["speed","accel","agility","dribbleSpd"]:A==="IMPULSAO"?O=["jump","header","condition"]:A==="CHUTE"?O=["shot","shotPower","shotTech","weakFootAcc"]:A==="PASSE"?O=["shortPass","longPass","shortPassSpd","longPassSpd","tech","weakFootFreq"]:A==="DRIBLE"?O=["dribble","dribbleSpd","agility","tech"]:A==="DEFESA"?O=["defense","aggression","response"]:A==="MENTAL"?O=["teamwork","mentality","response"]:A==="BOLA_PARADA"?O=["freeKick","curve","header","penalties"]:A==="GOLEIRO"&&(O=["gk","response","jump","longPass"]);let l=Math.floor(Math.random()*8)+8;const m=T-35;if(b.equippedItem){const w=Math.ceil(l*((b.equippedItem.power||0)/100));l+=w,_.push(`Usou ${b.equippedItem.name} (+${w} XP)`),f.delete(p.collection("sales").doc(b.equippedItem.id)),f.update(p.collection("players").doc(b.id),{equippedItem:Z.firestore.FieldValue.delete()})}let y={...b.attributes||{}},C=!1;O.forEach(w=>{(y[w]||50)<99&&Math.random()<.15&&(y[w]=(y[w]||50)+1,C=!0)}),f.update(p.collection("players").doc(b.id),{xp:(b.xp||0)+l,energy:m,attributes:y});const k=a.find(w=>w.id===b.teamId);if(k){let w=[...k.trainingLogs||[]],N=`${b.name} fez um treino extra e ganhou +${l} XP.`;C&&(N+=" Alguns atributos evoluíram!"),w.unshift({date:Date.now(),type:"🏃‍♂️ TREINO SOLO",report:N}),w.length>15&&w.pop(),f.update(p.collection("teams").doc(k.id),{trainingLogs:w})}await f.commit(),i(!1);let j=`Treino concluído!
Energia: -35%
XP: +${l}`;_.length>0&&(j+=`
${_.join(`
`)}`),alert(j)}}}const bi=60;async function Su(t,e){const n=await t.orderBy("date","desc").limit(bi).get();if(n.docs.length<bi)return;const a=await t.orderBy("date","desc").startAfter(n.docs.at(-1)).limit(100).get();if(a.empty)return;const i=e.batch();a.docs.forEach(r=>i.delete(r.ref)),await i.commit()}function Tu(t,e){const{user:n,posts:a,setChatMessages:i}=t;return{postNews:(x,g="normal")=>p.collection("news").add({text:x,type:g,date:Date.now()}),handleSocialPost:async(x,g)=>{const D=p.batch(),U=p.collection("posts").doc();if(D.set(U,{authorId:n.data.id,authorName:n.data.name,authorLogo:n.data.logo||n.data.face||null,text:x,img:g,date:Date.now(),likes:[]}),a.length>=50){const te=a[a.length-1];if(te){const ee=p.collection("posts").doc(te.id);D.delete(ee)}}await D.commit()},handleSocialLike:async x=>{const g=n.data.id;(x.likes||[]).includes(g)?await p.collection("posts").doc(x.id).update({likes:Z.firestore.FieldValue.arrayRemove(g)}):await p.collection("posts").doc(x.id).update({likes:Z.firestore.FieldValue.arrayUnion(g)})},handleSocialDelete:async x=>{confirm("Apagar esta publicação?")&&await p.collection("posts").doc(x).delete()},subscribeToChat:x=>p.collection("chats").doc(x).collection("messages").orderBy("date","desc").limit(50).onSnapshot(g=>{const D=g.docs.map(U=>({id:U.id,...U.data()})).reverse();i(D)}),sendChatMessage:async(x,g)=>{if(!g.trim())return;const D=p.collection("chats").doc(x).collection("messages");await D.add({text:g,authorId:n.data.id,authorName:n.data.name,authorType:n.type,date:Date.now()}),Su(D,p).catch(U=>console.warn("Limpeza do chat adiada:",U.code))},toggleFollow:async x=>{const g=n.type==="USER"?p.collection("teams").doc(n.data.id):p.collection("players").doc(n.data.id);(n.data.following||[]).includes(x)?(await g.update({following:Z.firestore.FieldValue.arrayRemove(x)}),alert("Deixou de seguir.")):(await g.update({following:Z.firestore.FieldValue.arrayUnion(x)}),alert("Seguindo!"))}}}function bu(t,e){const{user:n,setLoading:a,setModal:i}=t,r=(...E)=>e.postNews(...E);return{handleHospitalDonation:async(E,R)=>{if(!n.data||n.data.balance<R)return alert("Saldo insuficiente!");if(!Number.isFinite(R)||R<=0)return alert("Valor inválido.");const x=E.donors||{};if(x[n.data.id])return alert(`🛑 GESTO JÁ REALIZADO!
Você já contribuiu para o tratamento atual deste jogador. Aguarde a recuperação ou a cirurgia para ajudar novamente.`);if(n.type==="COMPANY"&&R>15e4)return alert(`🚫 LIMITE EMPRESARIAL!
Pelas leis de Mato Real, empresas podem doar no máximo ${ie(15e4)} (1% do teto cirúrgico) por procedimento para evitar monopólio.`);const g=n.type==="PLAYER"?p.collection("players").doc(n.data.id):n.type==="USER"?p.collection("teams").doc(n.data.id):p.collection("companies").doc(n.data.id),D=Wt(p,[{ref:g,expected:{balance:n.data.balance}},{ref:p.collection("players").doc(E.id),expected:{donors:E.donors}}]);D.update(g,{balance:Z.firestore.FieldValue.increment(-R)});const U={[n.data.id]:{name:n.data.name,val:R,date:Date.now()}};D.update(p.collection("players").doc(E.id),{hospitalFund:Z.firestore.FieldValue.increment(R),donors:{...x,...U}});try{await D.commit()}catch(te){alert(te.message);return}alert(`🙏 DOAÇÃO CONFIRMADA!
Obrigado, ${n.data.name}. Seus ${ie(R)} foram enviados para o fundo hospitalar.`)},handleFinanceApprove:async E=>{a(!0);const R=p.collection("financeRequests").doc(E.id),x=Wt(p,[{ref:R,expected:{status:E.status,amount:E.amount,type:E.type,teamId:E.teamId}}]);let g=null;try{if(!Number.isFinite(Number(E.amount))||Number(E.amount)<=0)throw new Error("Valor inválido.");if(!["INJECTION","SPONSORSHIP"].includes(E.type))throw new Error("Tipo de solicitação inválido.");if(E.type==="INJECTION"){const D=p.collection("teams").doc(E.teamId);x.update(D,{balance:Z.firestore.FieldValue.increment(Number(E.amount))}),x.delete(R),g=`💰 **INJEÇÃO FINANCEIRA**
A Federação aportou ${ie(E.amount)} no caixa do ${E.teamName}.`}else if(E.type==="SPONSORSHIP"){const D=p.collection("sponsorships").doc();x.set(D,{teamId:E.teamId,teamName:E.teamName,companyId:"FEDERACAO",companyName:"FEDERAÇÃO (Governo)",value:parseFloat(E.amount),status:"ACTIVE"}),x.delete(R),g=`🤝 **PATROCÍNIO ESTATAL**
O ${E.teamName} fechou contrato com a Federação.
Valor: ${ie(E.amount)}/semana.`}await x.commit(),g&&r(g,"admin").catch(D=>console.warn(D)),alert("Solicitação Aprovada com Sucesso!")}catch(D){alert("Erro ao aprovar: "+D.message)}a(!1)},updateBalance:async(E,R)=>{await p.collection("teams").doc(E).update({balance:parseFloat(R)}),alert("Atualizado!")},withdrawMoney:async(E,R)=>{const x=parseFloat(E.replace(",","."));if(!Number.isFinite(x)||x<=0)return alert("Valor inválido!");if(n.data.balance<x)return alert("Saldo insuficiente!");try{await yu(p,p.collection("teams").doc(n.data.id),{balance:n.data.balance},{balance:Z.firestore.FieldValue.increment(-x)})}catch(g){alert(g.message);return}r(`💸 **SAÍDA DE CAIXA**
O **${n.data.name}** retirou ${ie(x)}.
📝 Motivo: ${R}`,"money-minus"),i(null)}}}function Cu(t){const e={};return Object.assign(e,lu(t)),Object.assign(e,du(t,e)),Object.assign(e,uu(t,e)),Object.assign(e,Eu(t,e)),Object.assign(e,Iu(t)),Object.assign(e,Tu(t)),Object.assign(e,bu(t,e)),no(e,t.user)}function Ru(t,e=[]){const n=new Set(t.docChanges().map(r=>r.doc.id)),a=new Map(e.map(r=>[r.id,r])),i=t.docs.map(r=>!n.has(r.id)&&a.has(r.id)?a.get(r.id):{...r.data(),id:r.id});return i.length===e.length&&i.every((r,o)=>r===e[o])?e:i}function Ou(t,e,n){const a=t==="ADMIN",i=!!t;return{financeRequests:a,products:a||t==="COMPANY"||e==="SHOPPING",sponsorships:a||t==="USER"||t==="COMPANY",awards:a||["AWARDS_MANAGER","TOURN_MANAGER"].includes(n),tournaments:a||e==="MATCHES"||["TOURN_MANAGER","MATCH_MANAGER"].includes(n),hallOfFame:e==="RANKING",matches:a||e==="MATCHES"||["MATCH_MANAGER","MATCH_PERFORMANCE"].includes(n),posts:e==="SOCIAL",news:i,calendar:i}}function we(t,e,n=!0,a=null,i=null,r=!1){q.useEffect(()=>{if(!n)return;let o=p.collection(t);r&&(o=o.where("type","in",["COACH","DOCTOR","SCOUT","ASSISTANT"])),a&&(o=o.orderBy(a,"desc")),i&&(o=o.limit(i));let u=[];return o.onSnapshot(h=>{u=Ru(h,u),e(u)},h=>console.error(`Não foi possível atualizar ${t}:`,h.code))},[t,e,n,a,i,r])}function qs({look:t,uniform:e}){const n=q.useRef(null);return q.useEffect(()=>{const a=n.current.getContext("2d");let i,r=0;const o=u=>{u-r>65&&(a.clearRect(0,0,300,260),a.fillStyle="#102b25",a.fillRect(0,0,300,260),a.fillStyle="#1b443b",a.fillRect(20,213,260,3),Hs(a,150,224,t,e,u/150,5.5,!1),r=u),i=requestAnimationFrame(o)};return i=requestAnimationFrame(o),()=>cancelAnimationFrame(i)},[t,e]),s.jsx("canvas",{ref:n,width:"300",height:"260",style:{imageRendering:"pixelated",maxWidth:"100%"},"aria-label":"Prévia do personagem com uniforme"})}function _u({look:t,style:e,uniform:n}){const a=q.useRef(null);return q.useEffect(()=>{const i=a.current.getContext("2d");i.clearRect(0,0,80,72),Hs(i,40,83,{...t,style:e},n,0,2.2)},[t,e,n]),s.jsx("canvas",{ref:a,width:"80",height:"72","aria-hidden":"true",style:{imageRendering:"pixelated",display:"block"}})}function wu({player:t,team:e,onChange:n}){var x,g;const[a,i]=q.useState(()=>Vt(t.pixelAppearance)),[r,o]=q.useState(""),[u,h]=q.useState(!1),d=zt(e),E=e?d[t.position==="GOL"?"goalkeeper":"home"]:yt({shirt:"#7c8798"}),R=(D,U)=>{const te={...a,[D]:U};i(te),n==null||n(Vt(te))};return s.jsxs("section",{className:"card","data-testid":"appearance-editor",children:[s.jsx("h3",{children:"Meu personagem em campo"}),s.jsx(qs,{look:{...a,number:((x=e==null?void 0:e.shirtNumbers)==null?void 0:x[t.id])||a.number},uniform:E}),s.jsxs("p",{children:[e?`Uniforme atual: ${e.name}${t.position==="GOL"?" — goleiro":""}`:"Sem clube: uniforme neutro",". O uniforme acompanha seu clube; a aparência continua com você."]}),[[Vs,"skin","Tom de pele"],[Us,"hair","Cor do cabelo"],[$s,"eyes","Cor dos olhos"],[Gs,"boots","Chuteiras"]].map(([D,U,te])=>s.jsxs("label",{style:{display:"block",margin:"12px 0"},children:[te,s.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,margin:"8px 0"},children:D.map(ee=>s.jsx("button",{type:"button","aria-label":`${te}: ${ee}`,"aria-pressed":a[U]===ee,onClick:()=>R(U,ee),style:{width:38,height:38,background:ee,border:a[U]===ee?"3px solid #54e6ad":"2px solid #667",borderRadius:6}},ee))}),s.jsx("select",{className:"input-field","aria-label":te,value:a[U],onChange:ee=>R(U,ee.target.value),children:D.map((ee,Q)=>s.jsxs("option",{value:ee,children:[te," ",Q+1," (",ee,")"]},ee))})]},U)),s.jsxs("label",{children:["Cabelo",s.jsx("select",{className:"input-field","aria-label":"Cabelo",value:a.style,onChange:D=>R("style",D.target.value),children:Object.entries(oa).map(([D,U])=>s.jsx("option",{value:D,children:U},D))})]}),s.jsx("div",{style:{display:"flex",gap:8,overflowX:"auto",padding:"10px 0"},children:Object.entries(oa).map(([D,U])=>s.jsxs("button",{type:"button",onClick:()=>R("style",D),"aria-label":`Escolher cabelo ${U}`,"aria-pressed":a.style===D,style:{minWidth:100,padding:10,border:a.style===D?"2px solid #54e6ad":"1px solid #456",background:"#18332e",color:"#fff",borderRadius:8},children:[s.jsx(_u,{look:a,style:D,uniform:E}),U]},D))}),s.jsxs("label",{children:["Barba",s.jsxs("select",{className:"input-field","aria-label":"Barba",value:a.beard,onChange:D=>R("beard",D.target.value),children:[s.jsx("option",{value:"none",children:"Sem barba"}),s.jsx("option",{value:"short",children:"Curta"}),s.jsx("option",{value:"full",children:"Cheia"})]})]}),s.jsxs("label",{children:["Mangas",s.jsxs("select",{className:"input-field","aria-label":"Mangas",value:a.sleeves,onChange:D=>R("sleeves",D.target.value),children:[s.jsx("option",{value:"short",children:"Curtas"}),s.jsx("option",{value:"long",children:"Longas"})]})]}),s.jsxs("p",{children:["Número da camisa:"," ",s.jsx("b",{children:((g=e==null?void 0:e.shirtNumbers)==null?void 0:g[t.id])||"aguardando definição"}),". A numeração é definida pelo técnico do clube."]}),!n&&s.jsx("button",{className:"btn btn-green",disabled:u,onClick:async()=>{h(!0);try{const D=Vt(a);await p.collection("players").doc(t.id).update({pixelAppearance:D}),i(D),o("Aparência salva. Será usada nas próximas partidas.")}catch{o("Não foi possível salvar. Tente novamente.")}finally{h(!1)}},children:"SALVAR APARÊNCIA"}),s.jsx("p",{role:"status",children:r})]})}function _h({team:t}){const[e,n]=q.useState(()=>zt(t)),[a,i]=q.useState("home"),[r,o]=q.useState(""),[u,h]=q.useState(!1);return s.jsxs("section",{className:"card","data-testid":"kit-editor",children:[s.jsx("h3",{children:"Uniformes do clube"}),s.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:[["home","CASA"],["away","FORA"],["goalkeeper","GOLEIRO"]].map(([d,E])=>s.jsx("button",{className:`btn ${a===d?"btn-green":"btn-ghost"}`,onClick:()=>i(d),children:E},d))}),s.jsx(qs,{look:{},uniform:e[a]}),Object.entries({shirt:"Camisa",detail:"Detalhes",shorts:"Calção",socks:"Meião"}).map(([d,E])=>s.jsxs("label",{style:{display:"block",margin:12},children:[E," ",s.jsx("input",{"aria-label":E,type:"color",value:e[a][d],onChange:R=>n({...e,[a]:{...e[a],[d]:R.target.value}})})]},d)),s.jsxs("label",{children:["Modelo",s.jsx("select",{className:"input-field",value:e[a].pattern,onChange:d=>n({...e,[a]:{...e[a],pattern:d.target.value}}),children:Object.entries(Fs).map(([d,E])=>s.jsx("option",{value:d,children:E},d))})]}),s.jsx("p",{children:"As mudanças valem para as próximas partidas. Replays preservam os uniformes originais."}),s.jsx("button",{className:"btn btn-green",disabled:u,onClick:async()=>{h(!0);try{await p.collection("teams").doc(t.id).update({kits:zt({kits:e})}),o("Os três uniformes foram salvos.")}catch{o("Não foi possível salvar os uniformes.")}finally{h(!1)}},children:"SALVAR UNIFORMES"}),s.jsx("p",{role:"status",children:r})]})}function Nu({value:t="MTR",onChange:e,disabled:n=!1,label:a="Nacionalidade"}){return s.jsxs("label",{style:{display:"block",marginBottom:10},children:[a,s.jsx("select",{className:"input-field","aria-label":a,value:t,onChange:i=>e(i.target.value),disabled:n,children:Bs.map(i=>s.jsxs("option",{value:i.id,children:[su(i.id)," ",i.name]},i.id))})]})}const ln=["A","B","C","D","VARZEA"],Pu=["GOL","ZAG","LD","LE","VOL","MC","MEI","PTD","PTE","ATA"],xu=["GOL","ZAG","LD","LE","VOL","MC","MD","ME","MEI","PTD","PTE","SA","ATA"],ku=({teams:t,players:e,papers:n,journalists:a,companies:i,coaches:r,onLogin:o,onCreateTeam:u,onCreatePaper:h,onCreateJourno:d,onCreateCompany:E,onAdmin:R,onVisitor:x,onCreateCoach:g,onCreatePlayer:D,config:U})=>{const[te,ee]=q.useState(!1),[Q,P]=q.useState(""),[M,b]=q.useState(""),[A,T]=q.useState(""),[f,_]=q.useState(!1),[O,l]=q.useState("LOGIN"),[m,y]=q.useState("TEAM"),[C,k]=q.useState({n:"",b:"10000000",s:"A",p:""}),[j,w]=q.useState({n:"",owner:"",p:"",type:"COMERCIO"}),[N,z]=q.useState(null),[W,oe]=q.useState(null),[ne,le]=q.useState(null),[ue,K]=q.useState(""),[$,V]=q.useState(null),[Y,S]=q.useState({name:"",password:"",affinity:"ATA",role:"COACH",face:null}),[v,ae]=q.useState({nationality:"MTR",name:"",instagram:"",position:"ATA",password:""}),L=I=>{const B=I.target.files[0],J=new FileReader;J.onloadend=()=>k({...C,l:J.result}),B&&J.readAsDataURL(B)},X=Mn[j.type]||{},Ae=()=>{if(N){if(String(N.password)!==String(ue))return alert("Senha incorreta!");if(N.type==="TEAM"){if(N.status==="PENDING")return alert("Aguardando aprovação.");o(N.id,ue,"TEAM")}else if(N.type==="PLAYER")o(N.id,ue,"PLAYER");else if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(N.type)){if(N.status==="PENDING")return alert("Licença em análise.");o(N.id,ue,N.type)}else if(N.type==="COMPANY"){if(N.status==="PENDING")return alert("Empresa em análise.");if(N.status==="BLOCKED")return alert("Empresa bloqueada.");o(N.id,ue,"COMPANY")}else if(N.type==="PAPER"){if(N.status==="PENDING")return alert("Jornal em análise.");o(N.id,ue,"PAPER")}else if(N.type==="JOURNALIST"){if(N.status==="PENDING")return alert("Registro em análise.");o(N.id,ue,"JOURNALIST")}}};return s.jsxs("div",{className:"login-wrapper",children:[s.jsx("style",{children:`
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
                .main-logo {
                    height: 160px;
                    max-width: 100%;
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
                    .main-logo { height: 120px; max-width: 100%; min-width: 0; }
                    .game-title { font-size: 34px; }
                }
            `}),s.jsxs("div",{className:"login-header-container animate-in",children:[s.jsx("div",{className:"logos-wrapper",children:s.jsx("img",{src:"assets/img2.jpg",alt:"Bandeira Mato Real",className:"main-logo"})}),s.jsx("h1",{className:"game-title",children:"MATO REAL"}),s.jsxs("div",{className:"dev-info-row",children:[s.jsx("div",{className:"dev-credits-sub",children:"Desenvolvido por Nathan Reis"}),s.jsx("div",{className:"version-badge",children:"VERSÃO 2.9.10 — MATO REAL TV "})]})]}),s.jsxs("nav",{className:"login-tabs","aria-label":"Acesso e cadastros",children:[s.jsx("button",{type:"button",className:`tab ${O==="LOGIN"?"active":""}`,"aria-pressed":O==="LOGIN",onClick:()=>l("LOGIN"),children:"ENTRAR"}),s.jsx("button",{type:"button",className:`tab ${O==="CREATE"?"active":""}`,"aria-pressed":O==="CREATE",onClick:()=>l("CREATE"),children:"CRIAR TIME"}),s.jsx("button",{type:"button",className:`tab ${O==="PRESS"?"active":""}`,"aria-pressed":O==="PRESS",onClick:()=>l("PRESS"),children:"IMPRENSA"}),s.jsx("button",{type:"button",className:`tab ${O==="COMPANY"?"active":""}`,"aria-pressed":O==="COMPANY",onClick:()=>l("COMPANY"),children:"EMPRESAS"}),s.jsx("button",{type:"button",className:`tab ${O==="COACH"?"active":""}`,"aria-pressed":O==="COACH",onClick:()=>l("COACH"),children:"COMISSÃO"}),s.jsx("button",{type:"button",className:`tab ${O==="NEW_PLAYER"?"active":""}`,"aria-pressed":O==="NEW_PLAYER",onClick:()=>l("NEW_PLAYER"),children:"JOGADOR"})]}),O==="LOGIN"&&s.jsxs("div",{children:[s.jsxs("div",{className:"login-tab-buttons",role:"group","aria-label":"Tipo de conta",children:[s.jsx("button",{className:`btn ${m==="TEAM"?"btn-green":"btn-ghost"}`,style:{width:"auto"},onClick:()=>y("TEAM"),children:"TIMES"}),s.jsx("button",{className:`btn ${m==="PLAYER"?"btn-blue":"btn-ghost"}`,style:{width:"auto"},onClick:()=>{y("PLAYER"),le(null)},children:"JOGADORES"}),s.jsx("button",{className:`btn ${m==="COMPANY"?"btn-purple":"btn-ghost"}`,style:{width:"auto"},onClick:()=>y("COMPANY"),children:"EMPRESAS"}),s.jsx("button",{className:`btn ${m==="COACH"?"btn-gold":"btn-ghost"}`,style:{width:"auto"},onClick:()=>{y("COACH"),le(null),V(null)},children:"COMISSÃO"})]}),m==="TEAM"&&s.jsx("div",{className:"text-left",children:$?s.jsxs("div",{className:"animate-in",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>V(null),children:"⬅ VOLTAR PARA DIVISÕES"}),s.jsx("h4",{className:`login-series-header-team ${$==="VARZEA"?"login-series-title-varzea":"login-series-title-main"}`,children:$==="VARZEA"?"🚜 Terrão (Várzea)":`Série ${$}`}),(()=>{const I=(t||[]).filter(B=>B.status!=="PENDING"&&B.serie===$).sort((B,J)=>B.name.localeCompare(J.name));return I.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum time cadastrado nesta série."}):I.map(B=>s.jsxs("div",{className:"card card-row card-clickable",onClick:()=>z({...B,type:"TEAM"}),children:[B.logo?s.jsx("img",{src:B.logo,className:"login-team-card-logo"}):s.jsx("div",{className:"login-team-card-logo-placeholder",children:"🛡️"}),s.jsx("div",{children:s.jsx("b",{className:"card-main-title",children:B.name})})]},B.id))})()]}):s.jsxs("div",{className:"animate-in login-series-wrapper",children:[s.jsx("h4",{className:"login-series-title",children:"Selecione a Divisão"}),ln.map(I=>s.jsx("button",{className:"btn btn-ghost login-series-button-team",onClick:()=>V(I),children:I==="VARZEA"?"🚜 O Terrão (Várzea)":`🏆 Campeonato Série ${I}`},`btn-s-${I}`))]})}),m==="PLAYER"&&!ne&&s.jsx("div",{className:"text-left",children:$?s.jsxs("div",{className:"animate-in",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>V(null),children:"⬅ VOLTAR PARA DIVISÕES"}),s.jsx("h4",{className:`login-series-header-team ${$==="VARZEA"?"login-series-title-varzea":""}`,children:$==="VARZEA"?"🚜 Terrão (Várzea)":`Série ${$}`}),(()=>{const I=(t||[]).filter(B=>B.status!=="PENDING"&&B.serie===$).sort((B,J)=>B.name.localeCompare(J.name));return I.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum time cadastrado nesta série."}):I.map(B=>s.jsxs("div",{className:"card",onClick:()=>le(B),style:{display:"flex",alignItems:"center",gap:10,cursor:"pointer"},children:[B.logo?s.jsx("img",{src:B.logo,className:"login-player-team-logo"}):s.jsx("div",{className:"login-player-team-logo-placeholder",children:"🛡️"}),s.jsx("b",{style:{fontSize:15},children:B.name}),s.jsx("i",{className:"fas fa-chevron-right",style:{marginLeft:"auto",color:"#555"}})]},B.id))})()]}):s.jsxs("div",{className:"animate-in login-series-wrapper",children:[s.jsx("p",{className:"login-player-help",children:"Selecione o clube onde você joga ou acesse como livre:"}),s.jsx("div",{className:"card pulse login-free-agent-card",onClick:()=>le({id:"FREE",name:"Agentes Livres"}),children:s.jsx("b",{className:"login-free-agent-title",children:"🆓 SOU AGENTE LIVRE"})}),ln.map(I=>s.jsx("button",{className:"btn btn-ghost login-series-button-player",onClick:()=>V(I),children:I==="VARZEA"?"🚜 O Terrão (Várzea)":`🏆 Campeonato Série ${I}`},`btn-p-s-${I}`))]})}),m==="PLAYER"&&ne&&s.jsxs("div",{className:"animate-in text-left",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>le(null),children:"⬅ VOLTAR AOS CLUBES"}),s.jsxs("h4",{className:"login-series-header-team",children:["Elenco: ",ne.name]}),(()=>{const I=(e||[]).filter(B=>!B.isBot&&B.teamId===ne.id).sort((B,J)=>B.name.localeCompare(J.name));return I.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum jogador encontrado neste clube."}):I.map(B=>s.jsxs("div",{className:"card card-row card-clickable card-accent-secondary",onClick:()=>z({...B,type:"PLAYER"}),children:[B.face?s.jsx("img",{src:B.face,className:"avatar-md"}):s.jsx("div",{className:"avatar-md-placeholder",children:"👤"}),s.jsxs("div",{className:"flex-1",children:[s.jsxs("b",{className:"card-main-title",children:[B.name," ",B.recoveryLeft>0?"❌":""]}),s.jsx("br",{}),s.jsx("span",{className:"login-player-position-badge",children:B.position})]}),s.jsx("i",{className:"fas fa-sign-in-alt icon-right-muted"})]},B.id))})()]}),m==="COMPANY"&&(i||[]).filter(I=>I.status!=="PENDING").map(I=>s.jsxs("div",{className:"card login-company-card",onClick:()=>z({...I,type:"COMPANY"}),children:["🏢 ",s.jsx("b",{children:I.name}),s.jsx("br",{}),s.jsx("small",{children:I.companyType})]},I.id)),m==="COACH"&&!ne&&s.jsx("div",{className:"text-left",children:$?s.jsxs("div",{className:"animate-in",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>V(null),children:"⬅ VOLTAR PARA DIVISÕES"}),s.jsx("h4",{className:"login-coach-series-header",children:$==="VARZEA"?"🚜 Terrão (Várzea)":`Série ${$}`}),(()=>{const I=(t||[]).filter(B=>B.status!=="PENDING"&&B.serie===$).sort((B,J)=>B.name.localeCompare(J.name));return I.length===0?s.jsx("p",{className:"login-empty-text",children:"Nenhum time cadastrado nesta série."}):I.map(B=>s.jsxs("div",{className:"card",onClick:()=>le(B),style:{display:"flex",alignItems:"center",gap:10,cursor:"pointer"},children:[B.logo?s.jsx("img",{src:B.logo,className:"login-coach-team-logo"}):s.jsx("div",{className:"login-coach-team-logo-placeholder",children:"🛡️"}),s.jsx("b",{style:{fontSize:15},children:B.name}),s.jsx("i",{className:"fas fa-chevron-right",style:{marginLeft:"auto",color:"#555"}})]},B.id))})()]}):s.jsxs("div",{className:"animate-in login-series-wrapper",children:[s.jsx("p",{className:"login-coach-help",children:"Selecione o clube onde trabalha ou acesse como livre:"}),s.jsx("div",{className:"card pulse login-coach-free-card",onClick:()=>le({id:"FREE",name:"Profissionais Livres"}),children:s.jsx("b",{className:"login-coach-free-title",children:"🆓 SOU PROFISSIONAL LIVRE"})}),ln.map(I=>s.jsx("button",{className:"btn btn-ghost login-coach-series-button",onClick:()=>V(I),children:I==="VARZEA"?"🚜 O Terrão (Várzea)":`🏆 Campeonato Série ${I}`},`btn-c-s-${I}`))]})}),m==="COACH"&&ne&&s.jsxs("div",{className:"animate-in text-left",children:[s.jsx("button",{className:"btn login-back-button",onClick:()=>le(null),children:"⬅ VOLTAR AOS CLUBES"}),s.jsx("h4",{className:"login-coach-list-header",children:ne.id==="FREE"?"Mercado de Profissionais":`Staff: ${ne.name}`}),(()=>{const I=(r||[]).filter(J=>J.status==="ACTIVE"&&J.teamId===ne.id).sort((J,Ce)=>J.name.localeCompare(Ce.name));if(I.length===0)return s.jsx("p",{className:"login-empty-text",children:"Nenhum profissional contratado neste clube."});const B={COACH:"👔 Técnico",DOCTOR:"🩺 Médico",SCOUT:"🕵️‍♂️ Olheiro",ASSISTANT:"📋 Auxiliar"};return I.map(J=>s.jsxs("div",{className:"card login-coach-card card-clickable",onClick:()=>z({...J,type:J.type||"COACH"}),children:[J.face?s.jsx("img",{src:J.face,className:"login-coach-photo"}):s.jsx("div",{className:"login-coach-photo-placeholder",children:J.type==="DOCTOR"?"🩺":J.type==="SCOUT"?"🕵️‍♂️":J.type==="ASSISTANT"?"📋":"👔"}),s.jsxs("div",{className:"flex-1",children:[s.jsx("b",{className:"login-coach-name",children:J.name}),s.jsx("br",{}),s.jsxs("span",{className:"login-coach-subtitle",children:[B[J.type]||"👔 Técnico"," | Nível ",J.level,J.type==="COACH"&&J.affinities?` | Esp: ${J.affinities[0]}`:""]})]}),s.jsx("i",{className:"fas fa-sign-in-alt icon-login-gold"})]},J.id))})()]}),s.jsxs("div",{className:"login-footer-actions",children:[s.jsx("button",{className:"btn btn-blue",onClick:x,children:"ENTRAR COMO VISITANTE"}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>{ee(!0),T("")},children:"ADMIN"}),te&&s.jsxs("form",{className:"card",onSubmit:async I=>{var B;I.preventDefault(),_(!0),T("");try{await R(Q,M),b("")}catch(J){T((B=J.code)!=null&&B.startsWith("auth/")?"Não foi possível entrar. Confira o login e a senha.":J.message)}finally{_(!1)}},children:[s.jsx("h3",{children:"Acesso administrativo"}),s.jsxs("label",{children:["E-mail do principal ou login do subADM",s.jsx("input",{className:"input-field",autoComplete:"username",required:!0,value:Q,onChange:I=>P(I.target.value)})]}),s.jsxs("label",{children:["Senha administrativa",s.jsx("input",{className:"input-field",type:"password",autoComplete:"current-password",required:!0,value:M,onChange:I=>b(I.target.value)})]}),A&&s.jsx("p",{role:"alert",children:A}),s.jsx("button",{className:"btn btn-green",disabled:f,children:"ENTRAR NO PAINEL"}),s.jsx("button",{type:"button",className:"btn",disabled:f,onClick:()=>{ee(!1),b("")},children:"CANCELAR"})]})]})]}),O==="CREATE"&&s.jsxs("div",{children:[s.jsx("h3",{style:{color:"var(--primary)"},children:"Fundar Novo Clube"}),s.jsxs("div",{className:"login-create-club-preview",children:[s.jsx("div",{children:C.l?s.jsx("img",{src:C.l,className:"login-club-logo"}):s.jsx("div",{className:"login-club-logo-placeholder",children:"🛡️"})}),s.jsxs("label",{className:"btn btn-blue login-upload-badge",children:[s.jsx("i",{className:"fas fa-upload",style:{marginRight:5}})," ","ESCOLHER ESCUDO",s.jsx("input",{type:"file",style:{display:"none"},accept:"image/*",onChange:L})]})]}),s.jsx("input",{className:"input-field",placeholder:"Nome do Clube",value:C.n,onChange:I=>k({...C,n:I.target.value})}),s.jsx("input",{className:`input-field ${C.s==="VARZEA"?"login-varzea-balance":""}`,type:"number",placeholder:"Saldo Inicial",value:C.s==="VARZEA"?2e5:C.b,onChange:I=>k({...C,b:I.target.value}),disabled:C.s==="VARZEA"}),s.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[s.jsxs("div",{children:[s.jsx("label",{style:{fontSize:11,color:"#aaa"},children:"Divisão Nacional"}),s.jsx("select",{className:"input-field",value:C.s,onChange:I=>{const B=I.target.value;k({...C,s:B,b:B==="VARZEA"?"200000":"10000000"})},children:ln.map(I=>s.jsx("option",{value:I,children:I==="VARZEA"?"Série E (Várzea)":`Série ${I}`},I))})]}),s.jsxs("div",{children:[s.jsx("label",{style:{fontSize:11,color:"#aaa"},children:"Federação Estadual"}),s.jsxs("select",{className:"input-field",value:C.estado||"",onChange:I=>k({...C,estado:I.target.value}),children:[s.jsx("option",{value:"",children:"-- Escolha --"}),Ma.map(I=>s.jsx("option",{value:I,children:I},I))]})]})]}),s.jsx("input",{className:"input-field",type:"password",placeholder:"Crie uma Senha",value:C.p,onChange:I=>k({...C,p:I.target.value})}),C.s==="VARZEA"&&(U==null?void 0:U.varzeaOpen)===!1&&s.jsxs("div",{className:"login-varzea-warning",children:[s.jsx("b",{className:"login-varzea-warning-title",children:"🛑 INSCRIÇÕES ENCERRADAS!"}),s.jsx("span",{className:"login-varzea-warning-text",children:"A Federação informa que o limite de clubes da Várzea foi atingido."})]}),s.jsx("button",{className:`btn ${C.s==="VARZEA"&&(U==null?void 0:U.varzeaOpen)===!1?"btn-ghost":"btn-green"}`,disabled:C.s==="VARZEA"&&(U==null?void 0:U.varzeaOpen)===!1,onClick:()=>{if(!C.n||!C.p||!C.estado)return alert("⚠️ Preencha nome, senha e escolha o ESTADO!");if(t.find(J=>J.name&&J.name.toLowerCase()===C.n.toLowerCase()))return alert("🚫 Este nome de clube já está em uso!");const I=C.s==="VARZEA"?"ACTIVE":"PENDING",B=C.s==="VARZEA"?2e5:parseFloat(C.b);p.collection("teams").add({name:C.n,balance:B,serie:C.s,estado:C.estado,password:C.p,stadiumLevel:1,logo:C.l||null,status:I,stats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0,cards:0},stateStats:{pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}}).then(()=>{I==="ACTIVE"?(alert("✅ Clube de Várzea fundado! Bem-vindo ao Estadual de "+C.estado+"!"),window.location.reload()):(alert("✅ Solicitação enviada à Federação! Aguarde aprovação."),k({n:"",b:"10000000",s:"A",p:"",l:null,estado:""}),l("LOGIN"))})},children:"FUNDAR CLUBE E FILIAR À FEDERAÇÃO"}),C.s==="VARZEA"&&s.jsx("p",{className:"login-varzea-note",children:"* Times da Várzea iniciam com teto de ₣ 200.000 e aprovação imediata."})]}),O==="PRESS"&&s.jsxs("div",{children:[s.jsxs("div",{style:{display:"flex",gap:10,marginBottom:10},children:[s.jsx("button",{className:"btn btn-ghost",onClick:()=>y("LOGIN_P"),children:"LOGIN"}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>y("NEW_PAPER"),children:"CRIAR JORNAL"}),s.jsx("button",{className:"btn btn-ghost",onClick:()=>y("NEW_JOURNO"),children:"SOU JORNALISTA"})]}),m==="LOGIN_P"&&!W&&s.jsxs("div",{children:[s.jsx("h4",{children:"Selecione o Jornal"}),(n||[]).filter(I=>I.status==="ACTIVE").map(I=>s.jsxs("div",{className:"card",onClick:()=>oe(I),children:["📰 ",I.name]},I.id))]}),m==="LOGIN_P"&&W&&s.jsxs("div",{children:[s.jsx("button",{className:"btn",style:{marginBottom:10},onClick:()=>oe(null),children:"⬅ VOLTAR"}),s.jsxs("h4",{children:[W.name," - Jornalistas"]}),s.jsxs("div",{className:"card",onClick:()=>z({...W,type:"PAPER"}),style:{border:"1px solid var(--primary)"},children:["👑 ",W.ownerName," (Dono)"]}),(a||[]).filter(I=>I.newspaperId===W.id&&I.status==="ACTIVE").map(I=>s.jsxs("div",{className:"card",onClick:()=>z({...I,type:"JOURNALIST"}),children:["✒️ ",I.name]},I.id))]}),m==="NEW_PAPER"&&s.jsxs("div",{children:[s.jsx("input",{className:"input-field",placeholder:"Nome do Jornal",id:"pn"}),s.jsx("input",{className:"input-field",placeholder:"Seu Nome (Dono)",id:"po"}),s.jsx("input",{className:"input-field",type:"number",placeholder:"Senha",id:"pp"}),s.jsx("button",{className:"btn btn-green",onClick:()=>h(document.getElementById("pn").value,document.getElementById("pp").value,document.getElementById("po").value),children:"SOLICITAR CRIAÇÃO"})]}),m==="NEW_JOURNO"&&s.jsxs("div",{children:[s.jsx("input",{className:"input-field",placeholder:"Seu Nome",id:"jn"}),s.jsxs("select",{className:"input-field",id:"jp_id",children:[s.jsx("option",{value:"",children:"Selecione o Jornal"}),(n||[]).filter(I=>I.status==="ACTIVE").map(I=>s.jsx("option",{value:I.id,children:I.name},I.id))]}),s.jsx("input",{className:"input-field",type:"number",placeholder:"Senha",id:"jp"}),s.jsx("button",{className:"btn btn-green",onClick:()=>d(document.getElementById("jn").value,document.getElementById("jp").value,document.getElementById("jp_id").value),children:"SOLICITAR EMPREGO"})]})]}),O==="COMPANY"&&s.jsxs("div",{children:[s.jsx("h3",{style:{color:"var(--purple)"},children:"Abrir Empresa"}),s.jsx("input",{className:"input-field",placeholder:"Nome da Empresa",value:j.n,onChange:I=>w({...j,n:I.target.value})}),s.jsx("input",{className:"input-field",placeholder:"Nome do Dono",value:j.owner,onChange:I=>w({...j,owner:I.target.value})}),s.jsx("label",{className:"login-company-label",children:"Porte da Empresa"}),s.jsxs("select",{className:"input-field",value:j.type,onChange:I=>w({...j,type:I.target.value}),children:[s.jsx("option",{value:"COMERCIO",children:"Comércio Local"}),s.jsx("option",{value:"MEDIA",children:"Média Empresa"}),s.jsx("option",{value:"GRANDE",children:"Grande Empresa"})]}),s.jsxs("div",{className:"login-company-box",children:[s.jsxs("div",{className:"login-info-row",style:{marginBottom:5},children:[s.jsx("span",{children:"💰 Capital Inicial:"}),s.jsx("span",{className:"login-company-highlight-primary",children:ie(X.start)})]}),s.jsxs("div",{className:"login-info-row",children:[s.jsx("span",{children:"💸 Imposto Semanal:"}),s.jsx("span",{className:"login-company-highlight-danger",children:ie(X.tax)})]}),s.jsxs("p",{className:"login-company-tax-note",children:['"',X.desc,'"']})]}),s.jsx("input",{className:"input-field",type:"number",placeholder:"Senha de Acesso",value:j.p,onChange:I=>w({...j,p:I.target.value})}),s.jsx("button",{className:"btn btn-purple",onClick:()=>E(j),children:"SOLICITAR ABERTURA"})]}),O==="COACH"&&s.jsxs("div",{children:[s.jsx("h3",{className:"login-coach-title",children:"🎓 Licença Profissional"}),s.jsx("p",{style:{fontSize:12,color:"#aaa"},children:"Inicie sua carreira no Staff de um Clube."}),s.jsx("div",{className:"card login-coach-card-info",children:s.jsxs("div",{className:"login-info-row",children:[s.jsxs("span",{children:["Nível Inicial: ",s.jsx("b",{children:"1"})]}),s.jsxs("span",{children:["Salário Base: ",s.jsx("b",{children:ie(2500)})]})]})}),s.jsxs("div",{className:"login-coach-avatar-wrapper",children:[s.jsx("div",{className:"login-coach-avatar",children:Y.face?s.jsx("img",{src:Y.face,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}):s.jsx("span",{style:{fontSize:30},children:"📷"})}),s.jsxs("label",{className:"btn btn-ghost login-coach-upload-label",children:["ESCOLHER FOTO DE PERFIL",s.jsx("input",{type:"file",style:{display:"none"},accept:"image/*",onChange:I=>{const B=I.target.files[0];if(!B)return;const J=new FileReader;J.readAsDataURL(B),J.onload=Ce=>{const re=new Image;re.src=Ce.target.result,re.onload=()=>{const ce=document.createElement("canvas"),ge=150;let ve=re.width,fe=re.height;ve>fe?ve>ge&&(fe*=ge/ve,ve=ge):fe>ge&&(ve*=ge/fe,fe=ge),ce.width=ve,ce.height=fe,ce.getContext("2d").drawImage(re,0,0,ve,fe),S({...Y,face:ce.toDataURL("image/jpeg",.8)})}}}})]})]}),s.jsx("label",{style:{textAlign:"left",display:"block",color:"#aaa",fontSize:12},children:"Qual a sua profissão?"}),s.jsxs("select",{className:"input-field",value:Y.role,onChange:I=>S({...Y,role:I.target.value}),style:{borderColor:"gold",color:"gold",fontWeight:"bold"},children:[s.jsx("option",{value:"COACH",children:"👔 Técnico Principal"}),s.jsx("option",{value:"ASSISTANT",children:"📋 Auxiliar Técnico"}),s.jsx("option",{value:"DOCTOR",children:"🩺 Médico Chefe"}),s.jsx("option",{value:"SCOUT",children:"🕵️‍♂️ Olheiro / Diretor"})]}),s.jsx("input",{className:"input-field",value:Y.name,onChange:I=>S({...Y,name:I.target.value}),placeholder:"Seu Nome"}),s.jsx("input",{className:"input-field",type:"password",value:Y.password,onChange:I=>S({...Y,password:I.target.value}),placeholder:"Senha de Acesso"}),Y.role==="COACH"&&s.jsxs(s.Fragment,{children:[s.jsx("label",{style:{textAlign:"left",display:"block",color:"#aaa",fontSize:12},children:"Especialidade Inicial"}),s.jsx("select",{className:"input-field",value:Y.affinity,onChange:I=>S({...Y,affinity:I.target.value}),children:Pu.map(I=>s.jsxs("option",{value:I,children:[I," - Especialista"]},I))})]}),s.jsx("button",{className:"btn btn-gold",onClick:()=>g(Y),children:"GERAR REGISTRO PROFISSIONAL"})]}),O==="NEW_PLAYER"&&s.jsxs("div",{children:[s.jsx("h3",{style:{color:"cyan"},children:"⚽ Inscrição de Atleta"}),s.jsx(Nu,{value:v.nationality,onChange:I=>ae({...v,nationality:I})}),s.jsx("small",{children:"A nacionalidade define qual seleção você poderá representar."}),s.jsx("p",{style:{fontSize:12,color:"#aaa"},children:"Crie seu jogador. Você começará nos Agentes Livres."}),s.jsx("div",{className:"card",style:{border:"1px solid cyan",background:"rgba(0, 255, 255, 0.05)",marginBottom:15},children:s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12},children:[s.jsxs("span",{children:["OVR Inicial (Linha): ",s.jsx("b",{children:"45"})]}),s.jsxs("span",{children:["OVR Inicial (Goleiro): ",s.jsx("b",{children:"60"})]})]})}),s.jsx("input",{className:"input-field",value:v.name,onChange:I=>ae({...v,name:I.target.value}),placeholder:"Nome no Jogo (Ex: João Silva)"}),s.jsx("input",{className:"input-field",value:v.instagram,onChange:I=>ae({...v,instagram:I.target.value}),placeholder:"@ do seu Instagram (Para verificação)"}),s.jsx("input",{className:"input-field",type:"password",value:v.password,onChange:I=>ae({...v,password:I.target.value}),placeholder:"Crie uma Senha de Acesso"}),s.jsx("label",{style:{textAlign:"left",display:"block",color:"#aaa",fontSize:12},children:"Posição Inicial"}),s.jsx("select",{className:"input-field",value:v.position,onChange:I=>ae({...v,position:I.target.value}),children:xu.map(I=>s.jsx("option",{value:I,children:I},I))}),s.jsxs("details",{children:[s.jsx("summary",{children:"Personalizar personagem em pixel art"}),s.jsx(wu,{player:{pixelAppearance:v.pixelAppearance},onChange:I=>ae(B=>({...B,pixelAppearance:I}))})]}),s.jsx("button",{className:"btn btn-blue",onClick:()=>D(v),children:"ENVIAR INSCRIÇÃO"})]}),N&&s.jsx("div",{className:"modal-overlay",children:s.jsxs("div",{className:"modal-content",children:[s.jsx("h3",{children:N.name}),s.jsx("input",{className:"input-field",type:"password",placeholder:"Senha",value:ue,onChange:I=>K(I.target.value)}),s.jsx("button",{className:"btn btn-green",onClick:Ae,children:"ENTRAR"}),s.jsx("button",{className:"btn",onClick:()=>z(null),children:"CANCELAR"})]})})]})},Lu=({calendar:t})=>{if(!t||!t.date)return null;const[e,n,a]=t.date.split("-"),r=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][parseInt(n)-1],o=(t.events||[]).filter(u=>u.date>=t.date).sort((u,h)=>new Date(u.date)-new Date(h.date));return s.jsxs("div",{className:"card",style:{background:"linear-gradient(45deg, #1a1a1a, #001a00)",border:"1px solid var(--primary)",marginBottom:20,display:"flex",gap:15,alignItems:"stretch"},children:[s.jsxs("div",{style:{background:"#000",padding:"10px",borderRadius:8,textAlign:"center",minWidth:"80px",border:"1px solid #333",display:"flex",flexDirection:"column",justifyContent:"center"},children:[s.jsx("div",{style:{fontSize:10,color:"var(--primary)",textTransform:"uppercase",fontWeight:"bold"},children:r}),s.jsx("div",{style:{fontSize:30,fontWeight:"900",color:"#fff",lineHeight:1},children:a}),s.jsx("div",{style:{fontSize:10,color:"#888"},children:e})]}),s.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"},children:[s.jsxs("div",{style:{fontSize:11,color:"#aaa",marginBottom:5,fontWeight:"bold"},children:[s.jsx("i",{className:"fas fa-calendar-alt"})," PRÓXIMOS EVENTOS:"]}),o.length===0?s.jsx("div",{style:{fontSize:12,color:"#666",fontStyle:"italic"},children:"Nenhum evento agendado."}):s.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4,maxHeight:"60px",overflowY:"auto"},children:o.slice(0,3).map((u,h)=>{const d=u.date===t.date;return s.jsxs("div",{style:{fontSize:11,display:"flex",gap:5,alignItems:"center",color:d?"gold":"#ddd"},children:[s.jsx("b",{style:{color:d?"gold":"var(--primary)"},children:d?"HOJE":`${u.date.split("-")[2]}/${u.date.split("-")[1]}`}),s.jsxs("span",{children:["- ",u.text]})]},h)})})]})]})},Mu={"4-3-3 OFENSIVO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"45%",l:"35%"},{t:"35%",l:"65%"},{t:"20%",l:"85%"},{t:"10%",l:"50%"},{t:"20%",l:"15%"}],"4-3-3 DEFENSIVO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"30%"},{t:"65%",l:"70%"},{t:"45%",l:"50%"},{t:"20%",l:"85%"},{t:"10%",l:"50%"},{t:"20%",l:"15%"}],"4-3-3 FALSO 9":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"45%",l:"30%"},{t:"45%",l:"70%"},{t:"20%",l:"85%"},{t:"30%",l:"50%"},{t:"20%",l:"15%"}],"4-3-3 POSSE":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"45%",l:"35%"},{t:"45%",l:"65%"},{t:"25%",l:"75%"},{t:"15%",l:"50%"},{t:"25%",l:"25%"}],"4-4-2 CLÁSSICO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"50%",l:"90%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"50%",l:"10%"},{t:"15%",l:"60%"},{t:"15%",l:"40%"}],"4-4-2 LOSANGO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"50%"},{t:"50%",l:"30%"},{t:"50%",l:"70%"},{t:"35%",l:"50%"},{t:"15%",l:"60%"},{t:"15%",l:"40%"}],"4-4-2 LINHA":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"65%"},{t:"40%",l:"35%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"4-4-1-1":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"55%",l:"90%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"55%",l:"10%"},{t:"30%",l:"50%"},{t:"12%",l:"50%"}],"4-2-3-1 LARGO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"50%"},{t:"30%",l:"85%"},{t:"15%",l:"50%"},{t:"30%",l:"15%"}],"4-2-3-1 ESTREITO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"50%"},{t:"40%",l:"75%"},{t:"40%",l:"25%"},{t:"15%",l:"50%"}],"4-1-4-1":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"50%"},{t:"45%",l:"85%"},{t:"45%",l:"60%"},{t:"45%",l:"40%"},{t:"45%",l:"15%"},{t:"15%",l:"50%"}],"4-1-2-1-2":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"68%",l:"50%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"38%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"4-2-2-2 (BRASIL)":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"40%",l:"70%"},{t:"40%",l:"30%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"4-2-4 OFENSIVO":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"20%",l:"85%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"},{t:"20%",l:"15%"}],"4-5-1 RETRANCA":[{t:"90%",l:"50%"},{t:"78%",l:"85%"},{t:"82%",l:"65%"},{t:"82%",l:"35%"},{t:"78%",l:"15%"},{t:"65%",l:"35%"},{t:"65%",l:"65%"},{t:"55%",l:"50%"},{t:"50%",l:"85%"},{t:"50%",l:"15%"},{t:"25%",l:"50%"}],"4-3-2-1 (NATAL)":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"50%"},{t:"55%",l:"70%"},{t:"55%",l:"30%"},{t:"35%",l:"65%"},{t:"35%",l:"35%"},{t:"12%",l:"50%"}],"3-5-2 TÁTICO":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"50%",l:"90%"},{t:"50%",l:"10%"},{t:"35%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"3-4-3 (CRUYFF)":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"65%",l:"50%"},{t:"50%",l:"50%"},{t:"50%",l:"85%"},{t:"50%",l:"15%"},{t:"20%",l:"85%"},{t:"10%",l:"50%"},{t:"20%",l:"15%"}],"3-4-3 LINHA":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"55%",l:"90%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"55%",l:"10%"},{t:"15%",l:"85%"},{t:"10%",l:"50%"},{t:"15%",l:"15%"}],"3-4-1-2":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"55%",l:"90%"},{t:"55%",l:"10%"},{t:"35%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"3-6-1 CONTROLE":[{t:"90%",l:"50%"},{t:"82%",l:"50%"},{t:"82%",l:"75%"},{t:"82%",l:"25%"},{t:"65%",l:"35%"},{t:"65%",l:"65%"},{t:"50%",l:"90%"},{t:"50%",l:"65%"},{t:"50%",l:"35%"},{t:"50%",l:"10%"},{t:"20%",l:"50%"}],"3-3-1-3 (BIELSA)":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"65%",l:"50%"},{t:"50%",l:"65%"},{t:"50%",l:"35%"},{t:"35%",l:"50%"},{t:"15%",l:"85%"},{t:"10%",l:"50%"},{t:"15%",l:"15%"}],"3-1-4-2":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"80%",l:"75%"},{t:"80%",l:"25%"},{t:"65%",l:"50%"},{t:"50%",l:"85%"},{t:"50%",l:"60%"},{t:"50%",l:"40%"},{t:"50%",l:"15%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"5-4-1 ÔNIBUS":[{t:"90%",l:"50%"},{t:"78%",l:"90%"},{t:"82%",l:"70%"},{t:"82%",l:"50%"},{t:"82%",l:"30%"},{t:"78%",l:"10%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"55%",l:"85%"},{t:"55%",l:"15%"},{t:"25%",l:"50%"}],"5-3-2 CONTRA":[{t:"90%",l:"50%"},{t:"75%",l:"90%"},{t:"80%",l:"70%"},{t:"80%",l:"50%"},{t:"80%",l:"30%"},{t:"75%",l:"10%"},{t:"60%",l:"50%"},{t:"55%",l:"75%"},{t:"55%",l:"25%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"5-2-3 ALAS":[{t:"90%",l:"50%"},{t:"75%",l:"90%"},{t:"80%",l:"70%"},{t:"80%",l:"50%"},{t:"80%",l:"30%"},{t:"75%",l:"10%"},{t:"55%",l:"65%"},{t:"55%",l:"35%"},{t:"18%",l:"85%"},{t:"10%",l:"50%"},{t:"18%",l:"15%"}],"5-2-1-2":[{t:"90%",l:"50%"},{t:"75%",l:"90%"},{t:"80%",l:"70%"},{t:"80%",l:"50%"},{t:"80%",l:"30%"},{t:"75%",l:"10%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"38%",l:"50%"},{t:"15%",l:"65%"},{t:"15%",l:"35%"}],"WM (ANOS 30)":[{t:"92%",l:"50%"},{t:"80%",l:"75%"},{t:"82%",l:"50%"},{t:"80%",l:"25%"},{t:"65%",l:"65%"},{t:"65%",l:"35%"},{t:"45%",l:"65%"},{t:"45%",l:"35%"},{t:"25%",l:"85%"},{t:"15%",l:"50%"},{t:"25%",l:"15%"}],"2-3-5 (PIRÂMIDE)":[{t:"90%",l:"50%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"60%",l:"80%"},{t:"65%",l:"50%"},{t:"60%",l:"20%"},{t:"35%",l:"90%"},{t:"20%",l:"70%"},{t:"15%",l:"50%"},{t:"20%",l:"30%"},{t:"35%",l:"10%"}],"4-6-0 (SEM ATA)":[{t:"90%",l:"50%"},{t:"75%",l:"85%"},{t:"80%",l:"65%"},{t:"80%",l:"35%"},{t:"75%",l:"15%"},{t:"60%",l:"65%"},{t:"60%",l:"35%"},{t:"45%",l:"85%"},{t:"45%",l:"15%"},{t:"30%",l:"65%"},{t:"30%",l:"35%"}],"1-1-8 (KAMIKAZE)":[{t:"90%",l:"50%"},{t:"80%",l:"50%"},{t:"65%",l:"50%"},{t:"40%",l:"90%"},{t:"25%",l:"75%"},{t:"25%",l:"60%"},{t:"15%",l:"55%"},{t:"15%",l:"45%"},{t:"25%",l:"40%"},{t:"25%",l:"25%"},{t:"40%",l:"10%"}],"VÁRZEA (TUDO P/ FRENTE)":[{t:"90%",l:"50%"},{t:"80%",l:"70%"},{t:"80%",l:"30%"},{t:"65%",l:"50%"},{t:"50%",l:"50%"},{t:"30%",l:"85%"},{t:"15%",l:"70%"},{t:"10%",l:"50%"},{t:"15%",l:"30%"},{t:"25%",l:"50%"},{t:"30%",l:"15%"}],"VÁRZEA (VOLANTAÇO)":[{t:"90%",l:"50%"},{t:"78%",l:"85%"},{t:"82%",l:"65%"},{t:"82%",l:"35%"},{t:"78%",l:"15%"},{t:"60%",l:"80%"},{t:"60%",l:"60%"},{t:"60%",l:"40%"},{t:"60%",l:"20%"},{t:"35%",l:"50%"},{t:"15%",l:"50%"}]},Du=t=>t==="GOL"?"#E65100":["ZAG","LD","LE"].includes(t)?"#2979FF":["VOL","MC","MD","ME","MEI"].includes(t)?"#00E676":["PTD","PTE","ATA","SA"].includes(t)?"#FF1744":"#888",ju=de.lazy(()=>pe(()=>import("./Broadcast-BYxXFhoT.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(t=>({default:t.Broadcast}))),Fu=de.lazy(()=>pe(()=>import("./NationalTeams-C15rFFZJ.js"),__vite__mapDeps([5,1,3]),import.meta.url).then(t=>({default:t.NationalTeams}))),Vu=de.lazy(()=>pe(()=>import("./AdminPanel-ci6r5Uvu.js"),__vite__mapDeps([6,1,7,3,8]),import.meta.url).then(t=>({default:t.AdminPanel}))),Uu=de.lazy(()=>pe(()=>import("./TeamDashboard-DPRowNX0.js"),__vite__mapDeps([9,1,10,3,11]),import.meta.url).then(t=>({default:t.TeamDashboard}))),Gu=de.lazy(()=>pe(()=>import("./AssistantDashboard-BKZVdTHq.js"),__vite__mapDeps([12,1,3]),import.meta.url).then(t=>({default:t.AssistantDashboard}))),$u=de.lazy(()=>pe(()=>import("./VisitorDashboard-BcSYxkTk.js"),__vite__mapDeps([13,1,3]),import.meta.url).then(t=>({default:t.VisitorDashboard}))),pt=de.lazy(()=>pe(()=>import("./LeagueTable-d03rzOxA.js"),__vite__mapDeps([14,1,3]),import.meta.url).then(t=>({default:t.LeagueTable}))),Ci=de.lazy(()=>pe(()=>import("./MatchCenter-z5-LUsCR.js"),__vite__mapDeps([15,1,16,3]),import.meta.url).then(t=>({default:t.MatchCenter}))),Hu=de.lazy(()=>pe(()=>import("./TournamentHub-BrJ8OQ99.js"),__vite__mapDeps([17,1,16,3]),import.meta.url).then(t=>({default:t.TournamentHub}))),Bu=de.lazy(()=>pe(()=>import("./Market-BUUKqDzk.js"),__vite__mapDeps([18,1,7,10,3]),import.meta.url).then(t=>({default:t.Market}))),zu=de.lazy(()=>pe(()=>import("./ShoppingScreen-CzdsayEj.js"),__vite__mapDeps([19,1,3]),import.meta.url).then(t=>({default:t.ShoppingScreen}))),Wu=de.lazy(()=>pe(()=>import("./Ranking-BhJD0tvS.js"),__vite__mapDeps([20,1,7,21,3]),import.meta.url).then(t=>({default:t.Ranking}))),qu=de.lazy(()=>pe(()=>import("./SocialHub-CRX9SotT.js"),__vite__mapDeps([22,1,3]),import.meta.url).then(t=>({default:t.SocialHub}))),Ku=de.lazy(()=>pe(()=>import("./OffersScreen-CzIT-kdY.js"),__vite__mapDeps([23,1,3]),import.meta.url).then(t=>({default:t.OffersScreen}))),Yu=de.lazy(()=>pe(()=>import("./PublicServices-qxFSpEGm.js"),__vite__mapDeps([24,1,3]),import.meta.url).then(t=>({default:t.PublicServices}))),Zu=de.lazy(()=>pe(()=>import("./CompanyDashboard-C4B4Sk0a.js"),__vite__mapDeps([25,1,8,3]),import.meta.url).then(t=>({default:t.CompanyDashboard}))),Ju=de.lazy(()=>pe(()=>import("./PlayerDashboard-BHZHHiz4.js"),__vite__mapDeps([26,1,21,3]),import.meta.url).then(t=>({default:t.PlayerDashboard}))),Xu=de.lazy(()=>pe(()=>import("./CoachDashboard-BG5kea3r.js"),__vite__mapDeps([27,1,2,11,3]),import.meta.url).then(t=>({default:t.CoachDashboard}))),Qu=de.lazy(()=>pe(()=>import("./DoctorDashboard-BmJ458Wr.js"),__vite__mapDeps([28,1,3]),import.meta.url).then(t=>({default:t.DoctorDashboard}))),eh=de.lazy(()=>pe(()=>import("./ScoutDashboard-CBs5JLFw.js"),__vite__mapDeps([29,1,7,3]),import.meta.url).then(t=>({default:t.ScoutDashboard}))),th=de.lazy(()=>pe(()=>import("./PlayerForm-BVDfJu8G.js"),__vite__mapDeps([30,1,7,3]),import.meta.url).then(t=>({default:t.PlayerForm}))),nh=de.lazy(()=>pe(()=>import("./TeamRequestPlayerModal-CPpr1ugt.js"),__vite__mapDeps([31,1,7,3]),import.meta.url).then(t=>({default:t.TeamRequestPlayerModal}))),ah=de.lazy(()=>pe(()=>import("./AdminPlayerModal-CG6Ik8tf.js"),__vite__mapDeps([32,1,3]),import.meta.url).then(t=>({default:t.AdminPlayerModal}))),ih=de.lazy(()=>pe(()=>import("./TrainingCenterManager-CYM2zTPy.js"),__vite__mapDeps([33,1,3]),import.meta.url).then(t=>({default:t.TrainingCenterManager}))),sh=de.lazy(()=>pe(()=>import("./OfferForm-BfHqBVy0.js"),__vite__mapDeps([34,1,21,7,3]),import.meta.url).then(t=>({default:t.OfferForm}))),rh=de.lazy(()=>pe(()=>import("./SettingsForm-CABshhLr.js"),__vite__mapDeps([35,1,3]),import.meta.url).then(t=>({default:t.SettingsForm}))),Ri=de.lazy(()=>pe(()=>import("./MatchPerformanceForm-DD4qOsim.js"),__vite__mapDeps([36,1,3]),import.meta.url).then(t=>({default:t.MatchPerformanceForm}))),oh=de.lazy(()=>pe(()=>import("./TeamStandingsEditor-DaHz0hu0.js"),__vite__mapDeps([37,1,3]),import.meta.url).then(t=>({default:t.TeamStandingsEditor}))),lh=de.lazy(()=>pe(()=>import("./PrizeEditor-Wal3ImUH.js"),__vite__mapDeps([38,1,3]),import.meta.url).then(t=>({default:t.PrizeEditor}))),ch=de.lazy(()=>pe(()=>import("./AwardsManager-On80wfLd.js"),__vite__mapDeps([39,1,3]),import.meta.url).then(t=>({default:t.AwardsManager}))),dh=de.lazy(()=>pe(()=>import("./TournamentManagerModal-D9_iYTq1.js"),__vite__mapDeps([40,1,3]),import.meta.url).then(t=>({default:t.TournamentManagerModal}))),uh=de.lazy(()=>pe(()=>import("./StatsEditor-CbQPAu94.js"),__vite__mapDeps([41,1,3]),import.meta.url).then(t=>({default:t.StatsEditor}))),hh=de.lazy(()=>pe(()=>import("./MatchManagerForm-2JcV_AB2.js"),__vite__mapDeps([42,1,3]),import.meta.url).then(t=>({default:t.MatchManagerForm})));function ph(){var Ga,$a,Ha,Ba,za,Wa,qa,Ka,Ya,Za,Ja,Xa,Qa;const[t,e]=q.useState(null),[n,a]=q.useState(!0),[i,r]=q.useState(!1),[o,u]=q.useState([]),[h,d]=q.useState([]),[E,R]=q.useState([]),[x,g]=q.useState([]),[D,U]=q.useState([]),[te,ee]=q.useState({marketOpen:!0}),[Q,P]=q.useState({date:new Date().toISOString().split("T")[0],events:[]}),[M,b]=q.useState([]),[A,T]=q.useState([]),[f,_]=q.useState([]),[O,l]=q.useState([]),[m,y]=q.useState([]),[C,k]=q.useState([]),[j,w]=q.useState([]),[N,z]=q.useState([]),[W,oe]=q.useState([]),[ne,le]=q.useState([]),[ue,K]=q.useState([]),[$,V]=q.useState("HOME"),[Y,S]=q.useState("LIGAS"),[v,ae]=q.useState(null),L=c=>{if(!eo(t,c)){alert("Você não tem permissão para esta função.");return}ae(c)},[X,Ae]=q.useState(!1),[I,B]=q.useState(!1),[J,Ce]=q.useState(null),[re,ce]=q.useState([]),[ge,ve]=q.useState(null);q.useEffect(()=>{if(bn(t))return Qd(t,c=>{e(c),ae(null)},()=>{Lt(),e(null),ae(null),rt.signOut()})},[t==null?void 0:t.type,(Ga=t==null?void 0:t.data)==null?void 0:Ga.id]),q.useEffect(()=>{let c=!0;const F=Kr();return F?p.collection(Yr[F.type]).doc(F.data.id).get().then(H=>{if(!c)return;if(!H.exists||["BLOCKED","PENDING"].includes(H.data().status)){Lt();return}const se={type:F.type,data:{...H.data(),id:H.id}};e(se),Yn(se),V(Mi(se.type,Xn(se,"screen",Zn("savedScreen"))));const he=Xn(se,"matchesTab","LIGAS");S(["LIGAS","ESTADUAIS","COPAS"].includes(he)?he:"LIGAS")}).catch(H=>{console.error("Não foi possível restaurar a sessão:",H.code),c&&r(!0)}).finally(()=>{c&&a(!1)}):a(!1),()=>{c=!1}},[]),q.useEffect(()=>{$&&t&&(Jn("savedScreen",$),ai(t,"screen",$))},[$,($a=t==null?void 0:t.data)==null?void 0:$a.id,t==null?void 0:t.type]),q.useEffect(()=>{t&&ai(t,"matchesTab",Y)},[Y,(Ha=t==null?void 0:t.data)==null?void 0:Ha.id,t==null?void 0:t.type]);const fe=Ou(t==null?void 0:t.type,$,v==null?void 0:v.type);we("teams",u),we("players",d),we("newspapers",b),we("journalists",T),we("companies",_),we("users",z,!0,null,null,!0),we("financeRequests",U,fe.financeRequests),we("products",l,fe.products),we("sponsorships",y,fe.sponsorships),we("awards",k,fe.awards),we("tournaments",w,fe.tournaments),we("hallOfFame",oe,fe.hallOfFame,"season"),we("matches",le,fe.matches),we("posts",K,fe.posts,"date",50),we("news",g,fe.news,"date",50),q.useEffect(()=>p.collection("config").doc("system").onSnapshot(c=>ee(c.exists?c.data():{marketOpen:!0}),c=>console.error("Configuração indisponível:",c.code)),[]),q.useEffect(()=>{if(fe.calendar)return p.collection("config").doc("calendar").onSnapshot(c=>{c.exists&&P(c.data())},c=>console.error("Calendário indisponível:",c.code))},[fe.calendar]),q.useEffect(()=>{const c=Number(Zn("lastRead")||0);x.length&&x[0].date>c&&B(!0)},[x]),q.useEffect(()=>{if(!t||t.type==="ADMIN"||t.type==="VISITOR"){R([]);return}const c=p.collection("offers").where("recipientId","==",t.data.id).onSnapshot(F=>{const H=F.docs.map(se=>({...se.data(),id:se.id}));R(H)},F=>{console.log("Erro ao buscar ofertas:",F)});return()=>c()},[(Ba=t==null?void 0:t.data)==null?void 0:Ba.id,t==null?void 0:t.type]),q.useEffect(()=>{if(!t||!t.data||t.type==="VISITOR"){ce([]);return}ve(null);let c=p.collection("sales");t.type==="COMPANY"?c=c.where("companyId","==",t.data.id):["PLAYER","COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t.type)?c=c.where("buyerId","==",t.data.id):c=c.orderBy("date","desc").limit(300);const F=c.onSnapshot({includeMetadataChanges:!0},H=>{const se=H.docs.map(he=>({id:he.id,...he.data()})).sort((he,Fn)=>Fn.date-he.date);ce(se),ve(H.metadata.fromCache?null:t.data.id)},H=>{console.error("Erro ao carregar mochila:",H)});return()=>F()},[(za=t==null?void 0:t.data)==null?void 0:za.id,t==null?void 0:t.type]),q.useEffect(()=>{if(!t||t.type!=="PLAYER"||!re||ge!==t.data.id)return;const F=re.filter(H=>H.buyerId===t.data.id).reduce((H,se)=>{if(["VEICULO","IMOVEL","TECNOLOGIA","LUXO"].includes(se.cat)){const he=parseInt(se.fameGained)||0;return H+he}return H},0);typeof F=="number"&&(t.data.fame||0)!==F&&(console.log(`Corrigindo Fama: De ${t.data.fame} para ${F}`),p.collection("players").doc(t.data.id).update({fame:F}).catch(H=>console.error("Erro ao sincronizar fama:",H)),e(H=>({...H,data:{...H.data,fame:F}})))},[re,ge,(Wa=t==null?void 0:t.data)==null?void 0:Wa.id]),q.useEffect(()=>{if((t==null?void 0:t.type)==="USER"||(t==null?void 0:t.type)==="PLAYER"){const c=t.type==="USER"?o.find(F=>F.id===t.data.id):h.find(F=>F.id===t.data.id);c&&c!==t.data&&e(F=>({...F,data:c}))}if(["COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t==null?void 0:t.type)){const c=N.find(F=>F.id===t.data.id);c&&c!==t.data&&e(F=>({...F,data:c}))}if((t==null?void 0:t.type)==="COMPANY"){const c=f.find(F=>F.id===t.data.id);c&&(c.status==="BLOCKED"?(alert("🚫 Sua empresa foi bloqueada ou faliu."),window.location.reload()):c!==t.data&&e(F=>({...F,data:c})))}},[o,h,f,N,(qa=t==null?void 0:t.data)==null?void 0:qa.id,t==null?void 0:t.type]);const ke=de.useRef(!1),[_e,Ee]=q.useState([]),{postNews:et,handleHospitalDonation:tn,login:nn,handleSaveMatch:Ks,handleDeleteMatch:_t,handleFinanceApprove:Ys,loginAdmin:Zs,createTeam:Js,createPlayerAccount:Xs,createStaff:Qs,createNewspaper:er,createJournalist:tr,handleFireCoach:nr,handleCoachSelfActions:an,handleSendCoachOffer:ar,handleCounterCoachOffer:Da,handleFinalizeCoachContract:wt,adminAction:ir,generateFixtures:sr,handleSeasonTurnAdvanced:rr,createCompany:or,saveProduct:lr,requestSponsorship:cr,processSponsorship:dr,buyProduct:ur,handleCoachIndication:hr,saveTactics:ja,handleCoachUseItem:Dn,handleUseItem:pr,resetDatabase:mr,approveTeam:fr,deleteTeam:gr,deletePaper:Ar,deleteJournalist:Er,updateBalance:yr,withdrawMoney:vr,savePlayer:Ir,handleAcceptCoachOffer:mh,handleRejectCoachOffer:fh,handleUpdateCoachSalary:Sr,handleAssistantRegen:Tr,handleCoachTrain:Fa,handleEvolveCoachPerk:jn,sendOffer:br,acceptOffer:Cr,rejectOffer:ut,renewContract:Rr,handleSocialPost:Or,handleSocialLike:_r,handleSocialDelete:wr,updateTeamStats:Nr,saveMatchStats:Va,handlePlayerSoloTrain:Ua,handlePlayerActions:Pr,subscribeToChat:xr,sendChatMessage:kr,toggleFollow:Lr}=Cu({setLoading:Ae,teams:o,players:h,companies:f,coaches:N,papers:M,journalists:A,setUser:e,setScreen:V,setModal:L,conf:te,sps:m,user:t,products:O,buyingRef:ke,setSales:ce,posts:ue,setChatMessages:Ee});return i?s.jsxs("div",{className:"container",role:"alert",children:[s.jsx("p",{children:"Não foi possível recuperar sua sessão. Verifique a conexão e tente novamente."}),s.jsx("button",{className:"btn btn-primary",onClick:()=>window.location.reload(),children:"TENTAR NOVAMENTE"}),s.jsx("button",{className:"btn",onClick:()=>{Lt(),r(!1)},children:"VOLTAR AO LOGIN"})]}):X||n?s.jsx("div",{style:{display:"grid",placeItems:"center",height:"100vh"},children:"Carregando..."}):t?s.jsxs("div",{children:[s.jsxs("div",{className:"header",children:[s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[t.type==="USER"&&t.data.logo&&s.jsx("img",{src:t.data.logo,style:{width:40,height:40,borderRadius:"50%",border:"2px solid var(--primary)",objectFit:"cover"}}),s.jsxs("div",{children:[s.jsx("div",{style:{fontWeight:"900",fontSize:16},children:t.type==="USER"?t.data.name:((Ka=t.data)==null?void 0:Ka.name)||t.type}),s.jsx("div",{className:"dev-credits",style:{textAlign:"left",margin:0},children:"Desenvolvido por: Nathan Reis | v2.9.10"})]})]}),s.jsxs("div",{style:{display:"flex",gap:15,alignItems:"center"},children:[["USER","PLAYER","COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t.type)&&s.jsxs("div",{onClick:()=>V("OFFERS"),style:{position:"relative",cursor:"pointer",padding:"5px",display:"flex",alignItems:"center"},children:[s.jsx("i",{className:"fas fa-bell",style:{fontSize:"20px",color:(E||[]).some(c=>c.recipientId===t.data.id&&(c.status==="PENDING"||c.status==="COUNTERED"))?"var(--warning)":"#666",transition:"0.3s"}}),(E||[]).some(c=>c.recipientId===t.data.id&&(c.status==="PENDING"||c.status==="COUNTERED"))&&s.jsx("span",{className:"pulse",style:{position:"absolute",top:"2px",right:"2px",background:"red",borderRadius:"50%",width:"10px",height:"10px",border:"2px solid var(--bg-card)"}})]}),["USER","COMPANY","PLAYER","COACH","DOCTOR","SCOUT","ASSISTANT"].includes(t.type)&&s.jsx("div",{style:{color:"var(--primary)",fontWeight:"bold",marginLeft:10},children:ie(t.data.balance)}),t.type==="USER"&&s.jsx("i",{className:"fas fa-cog",style:{cursor:"pointer",marginLeft:10},onClick:()=>L({type:"SETTINGS",data:t.data})}),s.jsx("i",{className:"fas fa-sign-out-alt",style:{cursor:"pointer",marginLeft:10},onClick:()=>{confirm("Deseja realmente sair e trocar de conta?")&&(Lt(),rt.signOut().finally(()=>window.location.reload()))}})]})]}),s.jsxs("div",{className:"container",children:[!["BROADCAST","WATCH_GAMES"].includes($)&&s.jsx("button",{className:"btn btn-green pixel-feature",onClick:()=>V("BROADCAST"),children:"📺 MATO REAL TV — AMISTOSOS"}),["BROADCAST","WATCH_GAMES"].includes($)&&s.jsx(ju,{watchOnly:$==="WATCH_GAMES",user:t,teams:o,players:h,onBack:()=>V(mn(t.type))}),$!=="LOGIN"&&s.jsx(Lu,{calendar:Q}),$==="NATIONAL_TEAMS"&&s.jsx(Fu,{user:t,players:h,coaches:N,onBack:()=>V(mn(t.type))}),$==="HOME"&&t.type==="ADMIN"&&s.jsx(Vu,{onNationalTeams:()=>V("NATIONAL_TEAMS"),onCompetitions:()=>V("MATCHES"),user:t,matches:ne,tourns:j,handleDeleteMatch:_t,setModal:L,teams:o,papers:M,journalists:A,companies:f,reqs:D,config:{...te,calendar:Q},coaches:N,sps:m,players:h,onAct:ir,onGenFixtures:sr,onTurnSeasonAdvanced:rr,onPost:(c,F,H)=>et(`📢 **${c}**
${F}`,H),onApprove:Ys,onReject:c=>p.collection("financeRequests").doc(c).delete(),onEditT:c=>{Ce(c),V("ADMIN_TEAM")},onApproveTeam:fr,onUpdateBal:yr,onDeleteTeam:gr,onApprovePaper:async c=>{await p.collection("newspapers").doc(c).update({status:"ACTIVE"}),alert("Jornal Aprovado com sucesso!")},onDeletePaper:Ar,onDeleteJourno:Er,onRejectPaper:async c=>{await p.collection("newspapers").doc(c).delete(),alert("Jornal Recusado/Excluído!")},onConfig:c=>L({type:"SETTINGS",data:c}),onReset:mr,onApproveComp:async c=>{await p.collection("companies").doc(c).update({status:"ACTIVE"}),alert("Empresa Aprovada!")},onDeleteComp:async c=>{confirm("Excluir Empresa?")&&await p.collection("companies").doc(c).delete()},onUpdateCompBal:async(c,F)=>{await p.collection("companies").doc(c).update({balance:parseFloat(F)}),alert("Saldo Alterado!")},onGenAttrs:async()=>{if(!confirm("Isso vai gerar atributos para TODOS os jogadores que não têm. Continuar?"))return;Ae(!0);const c=p.batch();let F=0;h.forEach(H=>{if(!H.attributes){const se=vn(H.position||"ATA",H.overall||60);c.update(p.collection("players").doc(H.id),{attributes:se}),F++}}),await c.commit(),Ae(!1),alert(`Atributos gerados para ${F} jogadores!`)}}),$==="HOME"&&t.type==="USER"&&s.jsxs("div",{children:[s.jsx(Uu,{team:t.data,players:h.filter(c=>c.teamId===t.data.id),staff:N.filter(c=>c.teamId===t.data.id&&c.status==="ACTIVE"),onFireCoach:nr,onRenewCoach:c=>L({type:"OFFER",data:c}),isVisitor:!1,setModal:L,onEdit:c=>L({type:"PLAYER",data:c}),onAdd:()=>L({type:"PLAYER",data:{teamId:t.data.id}}),onSaveTactics:ja}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"user-home-view"),($==="HOME"||$==="ASSISTANT_DASH")&&t.type==="ASSISTANT"&&s.jsxs("div",{children:[s.jsx(Gu,{assistant:t.data,team:o.find(c=>c.id===t.data.teamId),players:h.filter(c=>c.teamId===t.data.teamId),offers:E,sales:re,onUseItem:Dn,onTrainRegen:Tr,onSelfAction:(c,F)=>{c==="ACCEPT_OFFER"&&wt(F.offer),c==="REJECT_OFFER"&&ut(F.offer),an(c,F)},onEvolvePerk:jn,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"assistant-home-container"),$==="HOME"&&t.type==="VISITOR"&&s.jsx("div",{children:s.jsx($u,{players:h,teams:o})}),$==="PRESS_DASH"&&(t.type==="PRESS"||t.type==="PRESS_WORKER")&&s.jsxs("div",{children:[s.jsxs("h3",{children:["Painel de Imprensa (",t.data.name,")"]}),s.jsxs("div",{className:"card",children:[s.jsx("button",{className:"btn btn-blue",onClick:()=>L({type:"POST_NEWS"}),children:"ESCREVER NOTÍCIA"}),s.jsx("button",{className:"btn btn-purple",onClick:()=>L({type:"MATCH_PERFORMANCE"}),children:"LANÇAR SÚMULA (XP)"}),s.jsx("button",{className:"btn btn-gold",onClick:()=>L({type:"TEAM_TABLE"}),children:"EDITAR TABELA"})]}),t.type==="PRESS"&&A.filter(c=>c.newspaperId===t.data.id&&c.status==="PENDING").map(c=>s.jsxs("div",{className:"card",children:[c.name,s.jsx("button",{className:"btn btn-green",onClick:async()=>{await p.collection("journalists").doc(c.id).update({status:"ACTIVE"}),alert("Jornalista aprovado!")},children:"APROVAR"})]},c.id))]}),$==="MATCHES"&&s.jsxs("div",{style:{paddingBottom:60},children:[s.jsxs("div",{style:{display:"flex",gap:5,marginBottom:20,justifyContent:"center",overflowX:"auto"},children:[s.jsx("button",{className:`btn ${Y==="LIGAS"?"btn-blue":"btn-ghost"}`,onClick:()=>S("LIGAS"),style:{padding:"10px 5px",fontSize:10},children:"NACIONAIS"}),s.jsx("button",{className:`btn ${Y==="ESTADUAIS"?"btn-purple":"btn-ghost"}`,onClick:()=>S("ESTADUAIS"),style:{padding:"10px 5px",fontSize:10},children:"🗺️ ESTADUAIS"}),s.jsx("button",{className:`btn ${Y==="COPAS"?"btn-cyan":"btn-ghost"}`,onClick:()=>S("COPAS"),style:{borderColor:"cyan",color:Y==="COPAS"?"#000":"cyan",background:Y==="COPAS"?"cyan":"transparent",padding:"10px 5px",fontSize:10},children:"🏆 COPAS"})]}),Y==="LIGAS"&&s.jsxs("div",{className:"animate-in",children:[s.jsx("h2",{style:{color:"var(--primary)",textAlign:"center",marginTop:0},children:"Campeonato Mato Real"}),s.jsx("div",{style:{marginBottom:20},children:s.jsx(pt,{teams:o,serie:"A",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})})}),s.jsxs("details",{open:!0,children:[s.jsx("summary",{style:{padding:10,background:"#333",borderRadius:5,cursor:"pointer",fontWeight:"bold",marginBottom:10},children:"Divisões de Acesso (B, C, D)"}),s.jsxs("div",{style:{display:"grid",gap:20},children:[s.jsx(pt,{teams:o,serie:"B",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})}),s.jsx(pt,{teams:o,serie:"C",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})}),s.jsx(pt,{teams:o,serie:"D",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})})]})]}),s.jsxs("div",{style:{marginTop:30,border:"2px dashed gold",borderRadius:8,overflow:"hidden"},children:[s.jsx("div",{style:{background:"gold",color:"black",padding:"10px",textAlign:"center",fontWeight:"900",textTransform:"uppercase",letterSpacing:"1px"},children:"🚜 O Terrão (Várzea)"}),s.jsx("div",{style:{padding:5,background:"rgba(255, 215, 0, 0.05)"},children:s.jsx(pt,{teams:o,serie:"VARZEA",onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c})})})]}),s.jsx("hr",{style:{borderColor:"#333",margin:"20px 0"}}),s.jsx(Ci,{matches:ne,teams:o,isAdmin:Ye(t,"competitions"),onCreateMatch:(c,F)=>L({type:"MATCH_MANAGER",data:{serie:c,round:F,homeId:"",awayId:"",scoreHome:0,scoreAway:0,status:"PENDING"}}),onEditMatch:c=>L({type:"MATCH_MANAGER",data:c}),onDeleteMatch:c=>_t(c),onReportMatch:c=>{t.type.includes("PRESS")||Ye(t,"competitions")?L({type:"MATCH_PERFORMANCE",data:{match:c,player:null}}):alert("Apenas imprensa/admin lança súmula.")}})]}),Y==="ESTADUAIS"&&s.jsxs("div",{className:"animate-in",children:[s.jsx("h2",{style:{color:"var(--purple)",textAlign:"center",marginTop:0},children:"🗺️ Campeonatos Estaduais"}),s.jsx("p",{style:{textAlign:"center",fontSize:11,color:"#aaa"},children:"Disputa entre todos os clubes da mesma região, independente de divisão!"}),Ma.map(c=>{const F=ne.filter(H=>H.isEstadual&&H.estado===c);return s.jsxs("details",{style:{marginBottom:10},children:[s.jsxs("summary",{style:{padding:15,background:"#1a1a1a",borderRadius:5,cursor:"pointer",fontWeight:"bold",border:"1px solid var(--purple)",color:"var(--purple)"},children:["📍 Campeonato ",c]}),s.jsxs("div",{style:{padding:"10px 0"},children:[s.jsx(pt,{teams:o,serie:"ESTADUAL",estado:c,onInspectTeam:H=>L({type:"VIEW_LINEUP",data:H})}),s.jsxs("div",{style:{marginTop:15},children:[s.jsxs("b",{style:{color:"#aaa",fontSize:11},children:["JOGOS DA RODADA (",c,"):"]}),F.length===0?s.jsx("p",{style:{fontSize:11,color:"#666"},children:"Nenhum jogo gerado ainda."}):s.jsx("div",{style:{marginTop:10},children:s.jsx(Ci,{matches:ne.filter(H=>H.isEstadual&&H.estado===c),teams:o,isAdmin:Ye(t,"competitions"),onCreateMatch:()=>alert("Jogos estaduais são gerados automaticamente."),onEditMatch:H=>L({type:"MATCH_MANAGER",data:H}),onDeleteMatch:H=>_t(H),onReportMatch:H=>{t.type.includes("PRESS")||Ye(t,"competitions")?L({type:"MATCH_PERFORMANCE",data:{match:H,player:null}}):alert("Apenas imprensa/admin lança súmula.")}})})]})]})]},c)})]}),Y==="COPAS"&&s.jsx("div",{className:"animate-in",children:s.jsx(Hu,{tournaments:j,matches:ne,players:h,user:t,teams:o,onInspectTeam:c=>L({type:"VIEW_LINEUP",data:c}),onCreateMatch:c=>L({type:"MATCH_MANAGER",data:{serie:c,round:1,homeId:"",awayId:"",scoreHome:0,scoreAway:0,status:"PENDING"}}),onEditMatch:c=>L({type:"MATCH_MANAGER",data:c}),onDeleteMatch:c=>_t(c),onReportMatch:c=>L({type:"MATCH_PERFORMANCE",data:{match:c,player:null}})})})]}),$==="MARKET"&&s.jsx(Bu,{user:t,me:(Ya=t.data)==null?void 0:Ya.id,teams:o,players:h,coaches:N,open:te.marketOpen,isVis:t.type==="VISITOR"||t.type==="COACH",onIndicate:hr,onNeg:c=>L({type:"OFFER",data:c}),onPayClause:async c=>{const F=o.find(he=>he.id===t.data.id),H=o.find(he=>he.id===c.teamId);if(F.balance<c.clause)return alert("Saldo insuficiente!");if(!confirm(`Pagar multa de ${ie(c.clause)} por ${c.name}?`))return;const se=p.batch();se.update(p.collection("teams").doc(F.id),{balance:F.balance-c.clause}),se.update(p.collection("teams").doc(H.id),{balance:H.balance+c.clause}),se.update(p.collection("players").doc(c.id),{teamId:F.id,status:"NAO_A_VENDA",contract:3,history:Z.firestore.FieldValue.arrayUnion({date:Date.now(),from:H.name,to:F.name,type:"MULTA",value:c.clause})}),await se.commit(),et(`🚨 **MULTA PAGA!**
O **${F.name}** pagou a multa de **${c.name}**!`,"transfer"),alert("Contratado via multa!")},onPre:async c=>{const F=o.find(H=>H.id===t.data.id);confirm(`Assinar pré-contrato com ${c.name}?`)&&(await p.collection("players").doc(c.id).update({preContract:{teamId:F.id,teamName:F.name},mood:"🤩"}),et(`📝 **PRÉ-CONTRATO**
**${c.name}** reforçará o **${F.name}** na próxima temporada!`,"transfer"),alert("Pré-contrato assinado!"))},onHireCoach:c=>L({type:"HIRE_COACH",data:c})}),$==="SHOPPING"&&s.jsx(zu,{products:O,companies:f,user:t,players:h,teams:o,onBuy:ur,onDeleteProd:async c=>{confirm("Admin: Excluir produto?")&&await p.collection("products").doc(c).delete()}}),$==="SPONSORSHIPS"&&t.type==="USER"&&s.jsxs("div",{children:[s.jsx("h3",{children:"Buscar Patrocínio"}),s.jsx("p",{style:{fontSize:11,color:"#aaa"},children:"Envie propostas semanais para as empresas."}),f.filter(c=>c.status==="ACTIVE").map(c=>s.jsxs("div",{className:"card",children:[s.jsx("b",{children:c.name})," ",s.jsxs("small",{children:["(",(Mn[c.companyType]||{}).label,")"]}),s.jsx("div",{style:{display:"flex",gap:5,marginTop:5},children:s.jsx("button",{className:"btn btn-purple",onClick:()=>{const F=prompt("Valor Semanal pedido (₣):");F&&cr(c.id,F)},children:"PEDIR PATROCÍNIO"})})]},c.id)),s.jsx("hr",{style:{borderColor:"#333"}}),s.jsx("h4",{children:"Meus Contratos"}),m.filter(c=>c.teamId===t.data.id).length===0&&s.jsx("p",{style:{color:"#666"},children:"Sem contratos."}),m.filter(c=>c.teamId===t.data.id).map(c=>s.jsxs("div",{className:"card",style:{borderLeft:`4px solid ${c.status==="ACTIVE"?"var(--primary)":"#666"}`},children:[s.jsx("b",{children:c.companyName}),s.jsx("br",{}),"Valor: ",ie(c.value),"/sem"," ",s.jsxs("small",{children:["(",c.status==="PENDING"?"Aguardando":"Ativo",")"]}),c.status==="ACTIVE"&&s.jsx("button",{className:"btn btn-red",style:{width:"auto",marginTop:5},onClick:()=>{confirm("Encerrar contrato de patrocínio?")&&p.collection("sponsorships").doc(c.id).delete()},children:"ENCERRAR"})]},c.id))]}),$==="RANKING"&&s.jsx(Wu,{teams:o,players:h,sales:re,hallOfFame:W}),$==="NEWS"&&s.jsxs("div",{children:[s.jsx("h3",{children:"Notícias"}),x.map(c=>s.jsxs("div",{className:`news-card news-${c.type}`,children:[c.text,s.jsx("br",{}),s.jsx("small",{style:{color:"#666"},children:new Date(c.date).toLocaleString()})]},c.id))]}),$==="SOCIAL"&&s.jsx(qu,{user:t,posts:ue,onPost:Or,onLike:_r,onDeletePost:wr,onSendChat:kr,onSubChat:xr,messages:_e,onFollow:Lr}),$==="OFFERS"&&s.jsx(Ku,{user:t,offers:E,teams:o,players:h,setModal:L,onAccept:Cr,onReject:ut,onCounter:c=>L({type:"OFFER",data:{...h.find(F=>F.id===c.playerId),oldOffer:c}}),onCoachAccept:wt,onCoachReject:ut,onCoachCounter:Da}),$==="PUBLIC_SERVICES"&&s.jsx(Yu,{players:h,coaches:N,user:t,onDonate:tn,onOperate:()=>{t.type==="DOCTOR"?V("DOCTOR_DASH"):alert("As cirurgias são realizadas pelo médico no painel médico. O fundo hospitalar deste jogador permanece disponível para o procedimento.")}}),($==="COMPANY_DASH"||$==="COMPANY_HOME")&&t.type==="COMPANY"&&s.jsx(Zu,{company:t.data,products:O.filter(c=>c.companyId===t.data.id),sps:m.filter(c=>c.companyId===t.data.id),sales:re||[],teams:o,onSaveProd:lr,onDeleteProd:async c=>{confirm("Excluir produto?")&&await p.collection("products").doc(c).delete()},onProcessSpons:dr}),$==="PLAYER_DASH"&&t.type==="PLAYER"&&s.jsxs("div",{children:[s.jsx(Ju,{user:t,player:h.find(c=>c.id===t.data.id)||t.data,team:o.find(c=>c.id===t.data.teamId),sales:re||[],onAction:Pr,onUpdatePassword:async c=>{await p.collection("players").doc(t.data.id).update({password:c}),alert("Senha alterada!")},onTrainSolo:Ua,onUseItem:pr,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"player-dash-container"),($==="HOME"||$==="COACH_DASH")&&t.type==="COACH"&&s.jsxs("div",{children:[s.jsx(Xu,{coach:t.data,team:o.find(c=>c.id===t.data.teamId),players:h.filter(c=>c.teamId===t.data.teamId),offers:E,sales:re,onTrain:Fa,onEvolvePerk:jn,onAddAffinity:async c=>{await p.collection("users").doc(t.data.id).update({affinities:Z.firestore.FieldValue.arrayUnion(c),pendingAffinity:Z.firestore.FieldValue.increment(-1)}),alert("Nova afinidade desbloqueada!")},onAcceptOffer:wt,onRejectOffer:ut,onCounterOffer:Da,onUpdateSalary:Sr,onSelfAction:an,onSaveTactics:ja,onUseItem:Dn,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"coach-home-container"),($==="HOME"||$==="DOCTOR_DASH")&&t.type==="DOCTOR"&&s.jsxs("div",{children:[s.jsx(Qu,{doctor:t.data,team:o.find(c=>c.id===t.data.teamId),players:h.filter(c=>c.teamId===t.data.teamId),offers:E,sales:re,onUseItem:Dn,onSelfAction:(c,F)=>{c==="ACCEPT_OFFER"&&wt(F.offer),c==="REJECT_OFFER"&&ut(F.offer),an(c,F)},onEvolvePerk:jn,setModal:L}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"doctor-home-container"),($==="HOME"||$==="SCOUT_DASH")&&t.type==="SCOUT"&&s.jsxs("div",{children:[s.jsx(eh,{scout:t.data,team:o.find(c=>c.id===t.data.teamId),players:h.filter(c=>c.teamId===t.data.teamId),setModal:L,onSelfAction:(c,F)=>{c==="ACCEPT_OFFER"&&wt(F.offer),c==="REJECT_OFFER"&&ut(F.offer),an(c,F)}}),s.jsx("div",{style:{marginTop:20,textAlign:"center",color:"#666",fontSize:12},children:s.jsxs("i",{children:["Acesse a aba ",s.jsx("b",{children:"JOGOS"})," para ver a tabela e partidas."]})})]},"scout-home-container"),s.jsxs("div",{className:"scroll-hint",children:["Deslize ",s.jsx("i",{className:"fas fa-arrow-right"})]}),s.jsxs("div",{className:"bottom-nav",children:[s.jsxs("div",{className:`nav-item ${["HOME","COMPANY_HOME","COMPANY_DASH","PLAYER_DASH","COACH_DASH","DOCTOR_DASH","ASSISTANT_DASH","SCOUT_DASH","PRESS_DASH"].includes($)?"active":""}`,onClick:()=>{t.type.includes("PRESS")?V("PRESS_DASH"):t.type==="COMPANY"?V("COMPANY_HOME"):t.type==="PLAYER"?V("PLAYER_DASH"):t.type==="COACH"?V("COACH_DASH"):t.type==="DOCTOR"?V("DOCTOR_DASH"):t.type==="ASSISTANT"?V("ASSISTANT_DASH"):t.type==="SCOUT"?V("SCOUT_DASH"):V("HOME")},children:[s.jsx("i",{className:"fas fa-home"}),s.jsx("span",{children:"INÍCIO"})]}),s.jsxs("div",{role:"button",tabIndex:0,"aria-label":"Assistir jogos",className:`nav-item pixel-feature ${$==="WATCH_GAMES"?"active":""}`,onClick:()=>V("WATCH_GAMES"),onKeyDown:c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),V("WATCH_GAMES"))},children:[s.jsx("i",{className:"fas fa-tv","aria-hidden":"true"}),s.jsx("span",{children:"ASSISTIR"})]}),s.jsxs("div",{className:`nav-item ${$==="MATCHES"?"active":""}`,onClick:()=>V("MATCHES"),children:[s.jsx("i",{className:"fas fa-futbol"}),s.jsx("span",{children:"JOGOS"})]}),s.jsxs("div",{className:`nav-item ${$==="SOCIAL"?"active":""}`,onClick:()=>V("SOCIAL"),children:[s.jsx("i",{className:"fas fa-camera"}),s.jsx("span",{children:"SOCIAL"})]}),s.jsxs("div",{className:`nav-item ${$==="PUBLIC_SERVICES"?"active":""}`,onClick:()=>V("PUBLIC_SERVICES"),children:[s.jsx("i",{className:"fas fa-city"}),s.jsx("span",{children:"CIDADE"})]}),s.jsxs("div",{className:`nav-item ${$==="MARKET"?"active":""}`,onClick:()=>V("MARKET"),children:[s.jsx("i",{className:"fas fa-globe"}),s.jsx("span",{children:"MERCADO"})]}),t.type!=="COMPANY"&&s.jsxs("div",{className:`nav-item ${$==="SHOPPING"?"active":""}`,onClick:()=>V("SHOPPING"),children:[s.jsx("i",{className:"fas fa-shopping-bag"}),s.jsx("span",{children:"SHOP"})]}),t.type==="USER"&&s.jsxs("div",{className:`nav-item ${$==="SPONSORSHIPS"?"active":""}`,onClick:()=>V("SPONSORSHIPS"),children:[s.jsx("i",{className:"fas fa-handshake"}),s.jsx("span",{children:"PATRO"})]}),t.type!=="COMPANY"&&s.jsxs("div",{className:`nav-item ${$==="RANKING"?"active":""}`,onClick:()=>V("RANKING"),children:[s.jsx("i",{className:"fas fa-trophy"}),s.jsx("span",{children:"RANK"})]}),s.jsxs("div",{className:`nav-item ${$==="NEWS"?"active":""}`,onClick:()=>{V("NEWS"),B(!1),Jn("lastRead",Date.now())},children:[s.jsx("i",{className:"fas fa-newspaper"}),s.jsx("span",{children:"NEWS"})]}),s.jsxs("div",{role:"button",tabIndex:0,className:`nav-item ${$==="NATIONAL_TEAMS"?"active":""}`,onClick:()=>V("NATIONAL_TEAMS"),onKeyDown:c=>{c.key==="Enter"&&V("NATIONAL_TEAMS")},children:[s.jsx("i",{className:"fas fa-globe-americas","aria-hidden":"true"}),s.jsx("span",{children:"SELEÇÕES"})]})]}),v&&s.jsx("div",{className:"modal-overlay",onClick:c=>c.target===c.currentTarget&&L(null),children:s.jsxs("div",{className:"modal-content",children:[v.type==="PLAYER"&&s.jsx(th,{initial:v.data,onSave:Ir,onDelete:async c=>{p.collection("players").doc(c).delete(),L(null)},isAdmin:Ye(t,"teams"),teams:o,onRenew:Rr,isOwner:t.type==="USER"&&((Za=v.data)==null?void 0:Za.teamId)===((Ja=t.data)==null?void 0:Ja.id)}),v.type==="TEAM_REQUEST_PLAYER"&&s.jsx(nh,{team:v.data,onClose:()=>L(null),onSubmit:async c=>{try{Ae(!0);const F=vn(c.position,c.overall);await p.collection("players").add({...c,attributes:F,requestedStatus:c.status,status:"PENDING",xp:0,fame:0,balance:0,stats:{goals:0,assists:0,tackles:0,saves:0,yellows:0,reds:0}}),Ae(!1),L(null),alert("Inscrição enviada com sucesso! O jogador aparecerá no seu elenco assim que a Federação aprovar.")}catch(F){Ae(!1),alert("Erro ao inscrever: "+F.message)}}}),v.type==="ADMIN_PLAYER"&&s.jsx(ah,{player:v.data,teams:o,onClose:()=>L(null)}),v.type==="CT_TYCOON"&&v.data&&s.jsx(ih,{team:o.find(c=>c.id===v.data.id)||v.data,players:h.filter(c=>c.teamId===v.data.id),staff:(N||[]).filter(c=>c.teamId===v.data.id&&c.status==="ACTIVE"),user:t,onClose:()=>L(null),onTrain:Fa,onTrainSolo:Ua}),v.type==="OFFER"&&s.jsx(sh,{target:v.data,myPlayers:h.filter(c=>c.teamId===t.data.id),onSend:br,setModal:L,user:t}),v.type==="SETTINGS"&&s.jsx(rh,{team:v.data||t.data,isAdmin:Ye(t,"teams"),onUp:c=>{var se,he;const F=((se=v.data)==null?void 0:se.id)||t.data.id;let H={...c};c.estado&&!((he=v.data)!=null&&he.stateStats)&&(H.stateStats={pts:0,wins:0,draws:0,losses:0,gf:0,ga:0}),p.collection("teams").doc(F).update(H),L(null)},onUpgrade:()=>{},onReq:(c,F,H)=>{p.collection("financeRequests").add({teamId:t.data.id,teamName:t.data.name,type:c,amount:parseFloat(F),details:H,status:"PENDING"}),L(null),alert("Enviado!")},onWithdraw:vr}),v.type==="MATCH_PERFORMANCE"&&s.jsx(Ri,{players:h,teams:o,onSaveStats:Va,matchData:(Xa=v.data)==null?void 0:Xa.match}),v.type==="TEAM_TABLE"&&s.jsx(oh,{teams:o,onUpdateTeamStats:Nr}),v.type==="POST_NEWS"&&s.jsxs("div",{children:[s.jsx("h3",{children:"Nova Notícia"}),s.jsx("input",{className:"input-field",placeholder:"Manchete / Texto",id:"news-body"}),s.jsx("button",{className:"btn btn-blue",onClick:()=>{et(`📰 **${t.data.name}:**
${document.getElementById("news-body").value}`,"press"),L(null)},children:"PUBLICAR"})]}),v.type==="EDIT_PRIZES"&&s.jsx(lh,{initialData:v.data,onSave:async c=>{await p.collection("config").doc("system").update({prizes:c}),alert("Premiações Atualizadas!"),L(null)},onClose:()=>L(null)}),v.type==="AWARDS_MANAGER"&&s.jsx(ch,{awards:C,teams:o,players:h,coaches:N,onClose:()=>L(null)}),v.type==="TOURN_MANAGER"&&s.jsx(dh,{tournaments:j,teams:o,awards:C,onClose:()=>L(null)}),v.type==="STATS_SEARCH"&&s.jsx(uh,{players:h,teams:o,onSave:async(c,F)=>{try{const H=Object.fromEntries(Object.entries(F).map(([se,he])=>[se,Math.max(0,Number.isFinite(Number(he))?Number(he):0)]));await p.collection("players").doc(c).update({stats:H}),L(null),alert("Estatísticas atualizadas!")}catch(H){alert("Erro ao salvar: "+H.message)}}}),v.type==="MATCH_MANAGER"&&s.jsx(hh,{initialData:v.data,teams:o,tournaments:j,onSave:Ks,onDelete:_t}),v.type==="MATCH_REPORT"&&s.jsx(Ri,{players:h,teams:o,onSaveStats:Va}),(v==null?void 0:v.type)==="VIEW_LINEUP"&&s.jsx("div",{className:"modal-overlay",onClick:()=>L(null),children:s.jsxs("div",{className:"modal-content animate-in",style:{maxWidth:"550px",maxHeight:"90vh",overflowY:"auto",background:"#121212",border:"1px solid var(--primary)",padding:"15px"},onClick:c=>c.stopPropagation(),children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:15,position:"sticky",top:"-15px",background:"#121212",zIndex:100,padding:"15px 0 10px 0",borderBottom:"1px solid #333"},children:[s.jsxs("h3",{style:{margin:0,color:"var(--primary)",display:"flex",alignItems:"center",gap:10},children:[v.data.logo?s.jsx("img",{src:v.data.logo,style:{width:35,height:35,borderRadius:"50%",border:"1px solid var(--primary)",objectFit:"cover"}}):s.jsx("span",{style:{fontSize:24},children:"🛡️"}),v.data.name]}),s.jsx("button",{className:"btn btn-red",style:{width:"auto",padding:"5px 10px",margin:0},onClick:()=>L(null),children:"FECHAR"})]}),(()=>{const c=v.data.stadiumLevel||1,F=St[c]||St[1],H=v.data.ticketPrice||F.minTic;return s.jsxs("div",{style:{position:"relative",height:130,borderRadius:8,overflow:"hidden",marginBottom:20,border:"1px solid cyan",background:"#111",boxShadow:"0 4px 8px rgba(0,0,0,0.5)"},children:[v.data.stadiumPic?s.jsx("img",{src:v.data.stadiumPic,style:{width:"100%",height:"100%",objectFit:"cover",opacity:.6}}):s.jsx("div",{style:{display:"grid",placeItems:"center",height:"100%",fontSize:50,color:"#333"},children:"🏟️"}),s.jsxs("div",{style:{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent, rgba(0,0,0,0.95))",padding:"30px 10px 10px 10px"},children:[s.jsxs("b",{style:{color:"cyan",fontSize:15,display:"block",marginBottom:4,textShadow:"1px 1px 2px black"},children:[F.name," ",s.jsxs("small",{style:{color:"gold"},children:["(Nvl ",c,")"]})]}),s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:10,color:"#ddd",textShadow:"1px 1px 2px black"},children:[s.jsxs("span",{children:["👥"," ",s.jsx("b",{style:{color:"#fff"},children:F.cap.toLocaleString("pt-BR")})]}),s.jsxs("span",{children:["🎫"," ",s.jsx("b",{style:{color:"#00E676"},children:ie(H)})]})]})]})]})})(),(()=>{const c=(N||[]).filter(se=>se.teamId===v.data.id&&se.status==="ACTIVE").sort((se,he)=>se.type.localeCompare(he.type)),F={COACH:"👔",ASSISTANT:"📋",DOCTOR:"🩺",SCOUT:"🕵️‍♂️"},H={COACH:"Técnico",ASSISTANT:"Auxiliar",DOCTOR:"Médico",SCOUT:"Olheiro"};return s.jsxs("div",{style:{marginBottom:25},children:[s.jsx("h4",{style:{color:"gold",margin:"0 0 10px 0",fontSize:14,borderBottom:"1px solid #333",paddingBottom:5},children:"👔 Comissão Técnica"}),c.length===0?s.jsx("p",{style:{fontSize:11,color:"#666",fontStyle:"italic"},children:"Nenhum profissional contratado."}):s.jsx("div",{style:{display:"flex",gap:10,overflowX:"auto",paddingBottom:10},children:c.map(se=>s.jsxs("div",{style:{minWidth:"110px",background:"rgba(255,215,0,0.05)",border:"1px solid gold",borderRadius:8,padding:10,textAlign:"center"},children:[se.face?s.jsx("img",{src:se.face,style:{width:45,height:45,borderRadius:"50%",objectFit:"cover",marginBottom:5,border:"1px solid gold"}}):s.jsx("div",{style:{fontSize:26,marginBottom:5},children:F[se.type]}),s.jsx("b",{style:{fontSize:11,display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:se.name}),s.jsxs("span",{style:{fontSize:9,color:"gold",fontWeight:"bold"},children:[H[se.type]," (Nv ",se.level,")"]})]},se.id))})]})})(),s.jsxs("div",{style:{marginBottom:25},children:[s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-end",borderBottom:"1px solid #333",paddingBottom:5,marginBottom:10},children:[s.jsx("h4",{style:{color:"var(--primary)",margin:0,fontSize:14},children:"⚽ Escalação Principal"}),s.jsxs("span",{style:{fontSize:10,color:"#888"},children:["Esquema:"," ",((Qa=v.data.tactics)==null?void 0:Qa.formation)||"Não definido"]})]}),s.jsx("div",{className:"football-field",style:{height:"400px",pointerEvents:"none",position:"relative"},children:v.data.tactics?Ws[v.data.tactics.formation].map((c,F)=>{const H=Mu[v.data.tactics.formation][F],se=v.data.tactics.lineup[F],he=h.find(Fn=>Fn.id===se);return s.jsxs("div",{style:{position:"absolute",top:H.t,left:H.l,transform:"translate(-50%, -50%)",display:"flex",flexDirection:"column",alignItems:"center"},children:[s.jsx("div",{className:"player-photo-circle",style:{width:"36px",height:"36px",border:he?"2px solid gold":"1px dashed #666",background:he?"#001a33":"rgba(0,0,0,0.4)",boxShadow:"0 4px 6px rgba(0,0,0,0.6)"},children:he!=null&&he.face?s.jsx("img",{src:he.face,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}):s.jsx("span",{style:{fontSize:"9px"},children:c})}),s.jsx("div",{className:"player-name-label",style:{fontSize:"9px",padding:"2px 6px",background:he?"#fff":"rgba(0,0,0,0.8)",color:he?"#000":"#fff",fontWeight:"900",marginTop:"3px",borderRadius:"4px",border:he?"1px solid #333":"none",boxShadow:"0 2px 5px rgba(0,0,0,0.8)",letterSpacing:"0.5px"},children:he?`${he.name.split(" ")[0].toUpperCase()} | ${he.overall}`:"VAZIO"})]},F)}):s.jsxs("div",{style:{display:"grid",placeItems:"center",height:"100%",color:"#fff",fontSize:"13px",textAlign:"center",padding:20},children:[s.jsx("br",{}),"O técnico ainda não enviou a súmula tática."]})})]}),(()=>{const c=v.data.tactics?Object.values(v.data.tactics.lineup):[],F=h.filter(H=>H.teamId===v.data.id&&!c.includes(H.id)).sort((H,se)=>se.overall-H.overall);return s.jsxs("div",{style:{marginBottom:25},children:[s.jsxs("h4",{style:{color:"var(--secondary)",margin:"0 0 10px 0",fontSize:14,borderBottom:"1px solid #333",paddingBottom:5},children:["🪑 Banco de Reservas (",F.length,")"]}),F.length===0?s.jsx("p",{style:{fontSize:11,color:"#666",fontStyle:"italic"},children:"Nenhum jogador no banco de reservas."}):s.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:F.map(H=>s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,background:"#1a1a1a",padding:8,borderRadius:6,borderLeft:`3px solid ${Du(H.position)}`,border:"1px solid #333"},children:[H.face?s.jsx("img",{src:H.face,style:{width:32,height:32,borderRadius:"50%",objectFit:"cover",objectPosition:"top"}}):s.jsx("div",{style:{width:32,height:32,borderRadius:"50%",background:"#333",display:"grid",placeItems:"center",fontSize:10},children:"👤"}),s.jsxs("div",{style:{flex:1,overflow:"hidden"},children:[s.jsxs("b",{style:{fontSize:11,display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:[H.name," ",H.recoveryLeft>0?"🏥":""]}),s.jsx("span",{style:{fontSize:9,color:"#aaa"},children:H.position})]}),s.jsx("b",{style:{color:H.overall>=80?"gold":H.overall>=70?"lime":"white",fontSize:14},children:H.overall})]},H.id))})]})})(),s.jsxs("div",{children:[s.jsx("h4",{style:{color:"gold",margin:"0 0 10px 0",fontSize:14,borderBottom:"1px solid #333",paddingBottom:5},children:"🏆 Sala de Troféus"}),!v.data.trophies||v.data.trophies.length===0?s.jsx("p",{style:{fontSize:11,color:"#666",textAlign:"center",padding:20,background:"#1a1a1a",borderRadius:8,fontStyle:"italic"},children:"A estante do clube ainda está vazia."}):s.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(80px, 1fr))",gap:10},children:[...v.data.trophies].reverse().map((c,F)=>s.jsxs("div",{style:{textAlign:"center",background:"rgba(255,215,0,0.05)",padding:10,borderRadius:8,border:"1px solid #444"},children:[s.jsx("img",{src:c.img,style:{width:45,height:45,objectFit:"contain",filter:"drop-shadow(0 0 5px rgba(255,215,0,0.5))"}}),s.jsx("div",{style:{fontSize:9,fontWeight:"bold",color:"#fff",marginTop:5},children:c.name}),s.jsx("div",{style:{fontSize:8,color:"gold"},children:c.tournament})]},F))})]})]})}),v.type==="HIRE_COACH"&&s.jsxs("div",{className:"modal-content",children:[s.jsxs("h3",{children:["Negociar com ",v.data.name]}),s.jsx("label",{children:"Salário Semanal (₣)"}),s.jsx("input",{className:"input-field",type:"number",id:"c_salary",defaultValue:v.data.salary}),s.jsx("label",{children:"Duração (Temporadas)"}),s.jsxs("select",{className:"input-field",id:"c_contract",children:[s.jsx("option",{value:"1",children:"1 Temporada"}),s.jsx("option",{value:"2",children:"2 Temporadas"}),s.jsx("option",{value:"3",children:"3 Temporadas"})]}),s.jsx("label",{children:"Multa Rescisória (₣)"}),s.jsx("input",{className:"input-field",type:"number",id:"c_clause",defaultValue:v.data.salary*10}),s.jsxs("div",{style:{display:"flex",gap:10,marginTop:15},children:[s.jsx("button",{className:"btn btn-green",onClick:()=>{const c=document.getElementById("c_salary").value,F=document.getElementById("c_contract").value,H=document.getElementById("c_clause").value;ar(v.data.id,c,F,H),L(null)},children:"ENVIAR PROPOSTA"}),s.jsx("button",{className:"btn btn-red",onClick:()=>L(null),children:"CANCELAR"})]})]})]})})]})]}):s.jsx(ku,{teams:o,players:h,papers:M,journalists:A,companies:f,coaches:N,onLogin:nn,onCreateTeam:Js,onCreatePaper:er,onCreateJourno:tr,onCreateCompany:or,onAdmin:Zs,onVisitor:()=>{e({type:"VISITOR",data:{id:"visitor",name:"Visitante"}}),V("RANKING")},onCreateCoach:Qs,onCreatePlayer:Xs,config:te})}ki(document.getElementById("root")).render(s.jsx(Zr,{children:s.jsx(de.Suspense,{fallback:s.jsx("div",{style:{display:"grid",placeItems:"center",height:"100vh"},children:"Carregando..."}),children:s.jsx(ph,{})})}));export{ji as A,Gs as B,ie as C,Du as D,Mn as E,Ws as F,St as G,Us as H,cu as I,ln as J,_h as K,la as L,on as M,Bs as N,Wt as O,yu as P,Au as Q,wu as R,oa as S,Pu as T,xu as U,vu as V,Ma as W,Mu as a,Vt as b,Hs as c,p as d,Ye as e,La as f,vn as g,Ch as h,iu as i,s as j,ou as k,Xn as l,Sh as m,Th as n,ai as o,su as p,Nu as q,Rh as r,Oh as s,hu as t,Vs as u,bh as v,Tn as w,vh as x,Ih as y,yh as z};
