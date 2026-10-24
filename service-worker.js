// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-dec89c2d1312';
const PRECACHE = ["./index.html","./build/AdminPanel-NkfPG-a4.js","./build/AdminPlayerModal-BFLzc-mE.js","./build/AssistantDashboard-DuzhDFnU.js","./build/AttributeGrid-CWDqgbrl.js","./build/AwardsManager-C3t8XNfR.js","./build/Broadcast-D8HosBbE.js","./build/CoachDashboard-Btglb0rM.js","./build/CompanyDashboard-61pylgBu.js","./build/DoctorDashboard-B61Wioga.js","./build/LeagueTable-noOKMtq9.js","./build/Market-BnYN49vQ.js","./build/MatchCenter-2vz4A7aY.js","./build/MatchManagerForm-DTPIFOGm.js","./build/MatchPerformanceForm-D8IAQ1IZ.js","./build/MatchTeamLogo-Dtaq_fwT.js","./build/NationalTeams-PgP_g5sW.js","./build/OfferForm-CKKJKKTh.js","./build/OffersScreen-Cg5vKxZd.js","./build/PlayerCard-1lv0JXH5.js","./build/PlayerDashboard-BIjdGejd.js","./build/PlayerForm-D6mjkpVp.js","./build/PrizeEditor-DT479bya.js","./build/PublicServices-BctJCw31.js","./build/Ranking-CL9x-zIY.js","./build/ScoutDashboard-Dg67Gw6J.js","./build/SettingsForm-CyGwAjmm.js","./build/ShoppingScreen-D13hwNgt.js","./build/SocialHub-vcjSP4KI.js","./build/StatsEditor-MD96rhL-.js","./build/TacticsEditor-aZhc8BT-.js","./build/TeamDashboard-49C5U-WT.js","./build/TeamRequestPlayerModal-CsMXSwIv.js","./build/TeamStandingsEditor-BRFo-Nmo.js","./build/TournamentHub-BE-NECZb.js","./build/TournamentManagerModal-CmAkNvng.js","./build/TrainingCenterManager-DSvrBX4d.js","./build/VisitorDashboard-C9FEFGCw.js","./build/app-Bg74ldJB.css","./build/app-CkHksdJw.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
