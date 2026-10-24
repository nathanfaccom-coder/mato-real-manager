// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-e5da1a915cb9';
const PRECACHE = ["./index.html","./build/AdminPanel-CJcfZaez.js","./build/AdminPlayerModal-BGzy7UUs.js","./build/AssistantDashboard-BtjKB6wj.js","./build/AttributeGrid-BUxDp6sq.js","./build/AwardsManager-B1wRVJP4.js","./build/Broadcast-B9J3oOOw.js","./build/CoachDashboard-Bn6vYeBT.js","./build/CompanyDashboard-NZOb0vta.js","./build/DoctorDashboard-CLSERWUZ.js","./build/LeagueTable-DsLx-xcI.js","./build/Market-BsRWgnUa.js","./build/MatchCenter-D-NRdjMK.js","./build/MatchManagerForm-NgPe4RVS.js","./build/MatchPerformanceForm-DM3eanzN.js","./build/MatchTeamLogo-C-PBqL0p.js","./build/NationalTeams-CeNX9QvS.js","./build/OfferForm-C_bTZ7pu.js","./build/OffersScreen-Rb3rYN_D.js","./build/PlayerCard-4o4kEjHF.js","./build/PlayerDashboard-CCUjE0Do.js","./build/PlayerForm-MGUR3DQD.js","./build/PrizeEditor-ByUGQ92k.js","./build/PublicServices-B145Y5x3.js","./build/Ranking-Cv8aihEU.js","./build/ScoutDashboard-DKW-RvSS.js","./build/SettingsForm-QZc2Y7p5.js","./build/ShoppingScreen-BhPOckV9.js","./build/SocialHub-Cdn05w38.js","./build/StatsEditor-BhJkbf6l.js","./build/TacticsEditor-1ka5bTla.js","./build/TeamDashboard-CKt38TLI.js","./build/TeamRequestPlayerModal-DIR3Y2N6.js","./build/TeamStandingsEditor-OhzKbrqw.js","./build/TournamentHub-B5_ygCQ6.js","./build/TournamentManagerModal-_-tkpyTJ.js","./build/TrainingCenterManager-Db23LaJV.js","./build/VisitorDashboard-C1eGVgA3.js","./build/app-Bg74ldJB.css","./build/app-CBkuO4g2.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
