// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-40c69b363cd6';
const PRECACHE = ["./index.html","./build/AdminPanel-9CDMjIGB.js","./build/AdminPlayerModal-Dyu--RjF.js","./build/AssistantDashboard-RQFTs4Xi.js","./build/AttributeGrid-Df5ZQ7TC.js","./build/AwardsManager-BhPkWl1J.js","./build/Broadcast-BhAUJGbX.js","./build/Broadcast-mOSG59YO.css","./build/CoachDashboard-_r5c92Vh.js","./build/CompanyDashboard-DtqAWZr5.js","./build/DoctorDashboard-DVyH7UnZ.js","./build/LeagueTable-__UZDvJ-.js","./build/Market-BLX47-w5.js","./build/MatchCenter-aWlK2h2R.js","./build/MatchManagerForm-BvXi6CHH.js","./build/MatchPerformanceForm-DP8DsB_Q.js","./build/MatchTeamLogo-izNggzt0.js","./build/NationalTeams-Ck3hYt7W.js","./build/OfferForm-Bw0WHuGT.js","./build/OffersScreen-BqKOJjvw.js","./build/PlayerCard-sGzQkvea.js","./build/PlayerDashboard-CKLmn9P8.js","./build/PlayerForm-f3607jrj.js","./build/PrizeEditor-Bs4j4QFK.js","./build/PublicServices-Ozdsqp_0.js","./build/Ranking-C4xCVSld.js","./build/ScoutDashboard-W3Ap3Faw.js","./build/SettingsForm-DnhFPp97.js","./build/ShoppingScreen-a-iRHFT_.js","./build/SocialHub-BATwhvEo.js","./build/StatsEditor-BsWISvbW.js","./build/TacticsEditor-CUv0L_t4.js","./build/TeamDashboard-CL1Sa7S6.js","./build/TeamRequestPlayerModal-QaUwxR--.js","./build/TeamStandingsEditor-DJAUpRwW.js","./build/TournamentHub-BiPzdoZP.js","./build/TournamentManagerModal-BfUvLOn_.js","./build/TrainingCenterManager-Bi5B5-X0.js","./build/VisitorDashboard-CvRba3XL.js","./build/app-Bg74ldJB.css","./build/app-D7XLf5vc.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
