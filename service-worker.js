// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-addbf043f285';
const PRECACHE = ["./index.html","./build/AdminPanel-DmijRNLg.js","./build/AdminPlayerModal-nL4Ldqac.js","./build/AssistantDashboard-BBRa0_HL.js","./build/AttributeGrid-BpteizIi.js","./build/AwardsManager-Ckj4AmMK.js","./build/Broadcast-CbwqpKmR.js","./build/Broadcast-mOSG59YO.css","./build/CoachDashboard-BG4kmK8D.js","./build/CompanyDashboard-C7H4Ar5P.js","./build/DoctorDashboard-DsiMUH30.js","./build/LeagueTable-Dw9ocTJN.js","./build/Market-XynjBqXN.js","./build/MatchCenter-EvtrnTTd.js","./build/MatchManagerForm-DgORfFsQ.js","./build/MatchPerformanceForm-DFYWflWq.js","./build/MatchTeamLogo-Bgf0Fm_v.js","./build/NationalTeams-Dfwp6pKe.js","./build/OfferForm-BRiCtMsR.js","./build/OffersScreen-TL7FbZdO.js","./build/PlayerCard-BxgsPz6A.js","./build/PlayerDashboard-CN4PWweh.js","./build/PlayerForm-Dws38IXS.js","./build/PrizeEditor-Cf47_GUx.js","./build/PublicServices-Cpk4PHOv.js","./build/Ranking-Cxjtxv0C.js","./build/ScoutDashboard-Bn7ZM2i9.js","./build/SettingsForm-BawtqbZ2.js","./build/ShoppingScreen-vTOXp1sX.js","./build/SocialHub-CYAfhhdN.js","./build/StatsEditor-BhpuCR_l.js","./build/TacticsEditor-DbiUPGdA.js","./build/TeamDashboard-Bg0OB6qY.js","./build/TeamRequestPlayerModal-BUg_8e2K.js","./build/TeamStandingsEditor-BOkq31IT.js","./build/TournamentHub-C8RQG-BS.js","./build/TournamentManagerModal-Dokddgwd.js","./build/TrainingCenterManager-B9n7xAJo.js","./build/VisitorDashboard-BzIVt5Kw.js","./build/app-BAiBqRHw.js","./build/app-CF9Kqpzl.css","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
