// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-ccba79514a43';
const PRECACHE = ["./index.html","./build/AdminPanel-TpZr8b6H.js","./build/AdminPlayerModal-B9_VkpOc.js","./build/AssistantDashboard-Cl5rFnxS.js","./build/AttributeGrid-DSfAUDlb.js","./build/AwardsManager-DPZfjfJH.js","./build/Broadcast-C6AS-d6_.js","./build/CoachDashboard-C5RGJihS.js","./build/CompanyDashboard-DDAhN_6g.js","./build/DoctorDashboard-CI20fNbe.js","./build/LeagueTable-CTIvBdgd.js","./build/Market-DbH10XRU.js","./build/MatchCenter-C9awaM0W.js","./build/MatchManagerForm-DMwEf_Gs.js","./build/MatchPerformanceForm-DVE8pyOu.js","./build/MatchTeamLogo-B4yNGy7i.js","./build/NationalTeams-C86Co3zw.js","./build/OfferForm-CvuJsAD8.js","./build/OffersScreen-B66St_bY.js","./build/PlayerCard-DPOvfWv3.js","./build/PlayerDashboard-DElFpVg_.js","./build/PlayerForm-Bue41XEN.js","./build/PrizeEditor-DvRRp0ku.js","./build/PublicServices-DZghGNoK.js","./build/Ranking-PgStst3U.js","./build/ScoutDashboard-C69oEugK.js","./build/SettingsForm-UA9qIvyR.js","./build/ShoppingScreen-CzWvNd0r.js","./build/SocialHub-Dfr6ag4j.js","./build/StatsEditor-lGE6cu3k.js","./build/TacticsEditor-DiEzhrTQ.js","./build/TeamDashboard-W2p051s3.js","./build/TeamRequestPlayerModal-C3zlZEg0.js","./build/TeamStandingsEditor-3zSrwLmA.js","./build/TournamentHub-NiFnyWPT.js","./build/TournamentManagerModal-fyiYlwe9.js","./build/TrainingCenterManager-BZFUztpE.js","./build/VisitorDashboard-BkZTxhp6.js","./build/app-Bg74ldJB.css","./build/app-CfGVPAv6.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
