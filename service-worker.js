// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-0fbddd377b58';
const PRECACHE = ["./index.html","./build/AdminPanel-DUPPHpyv.js","./build/AdminPlayerModal-CboWY3B4.js","./build/AssistantDashboard-C2VHvfxZ.js","./build/AttributeGrid-bjrUYzRg.js","./build/AwardsManager-C3LLTFbc.js","./build/Broadcast-Bu_zbXWP.js","./build/CoachDashboard-DGZD2sK5.js","./build/CompanyDashboard-Dom7h4Zq.js","./build/DoctorDashboard-ruu2praI.js","./build/LeagueTable-CMltTdH5.js","./build/Market-CwVqGI_p.js","./build/MatchCenter-D06pRN7n.js","./build/MatchManagerForm-DJQbJXWT.js","./build/MatchPerformanceForm-CUe3_HdI.js","./build/MatchTeamLogo-D2o2R8J-.js","./build/NationalTeams-BTCX_nWo.js","./build/OfferForm-DHuJ_p5w.js","./build/OffersScreen-Ba34NhKh.js","./build/PlayerCard-BGVZRRYe.js","./build/PlayerDashboard-Cb9lwV-s.js","./build/PlayerForm-BdjHUAjc.js","./build/PrizeEditor-CMC4GV0b.js","./build/PublicServices-8Wlqt0Or.js","./build/Ranking-Cph2TSKt.js","./build/ScoutDashboard-D5ufV6OE.js","./build/SettingsForm-XvKrt_h0.js","./build/ShoppingScreen-Ctspp27c.js","./build/SocialHub-sTWDdsGS.js","./build/StatsEditor-CQXhufwG.js","./build/TeamDashboard-CToE-rWy.js","./build/TeamRequestPlayerModal-CuM4r8iE.js","./build/TeamStandingsEditor-CHzsJoUH.js","./build/TournamentHub-DEvt3hAU.js","./build/TournamentManagerModal-7ypAPSz0.js","./build/TrainingCenterManager-BQQIvHVo.js","./build/VisitorDashboard-fLm_Kq6j.js","./build/app-BEPuxjVk.js","./build/app-Bg74ldJB.css","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('matoreal-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  // Firestore/Auth and other API requests are never intercepted or cached.
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request, { cache: 'no-store' }).catch(() => caches.match(new URL('./index.html', self.registration.scope).href)));
    return;
  }
  if (url.pathname === new URL('./scripts/pwa.js', self.registration.scope).pathname) {
    event.respondWith(fetch(event.request, {cache: 'no-store'}).catch(() => caches.match(event.request)));
    return;
  }
  if (!PRECACHE.some(path => new URL(path, self.registration.scope).href === url.href)) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
