// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-bf1e0b2e70c8';
const PRECACHE = ["./index.html","./build/AdminPanel-B5Gj-Z4C.js","./build/AdminPlayerModal-CCDjnDYl.js","./build/AssistantDashboard-Svneyj4l.js","./build/AttributeGrid-FcjO5ZSG.js","./build/AwardsManager-CyAWTbQl.js","./build/Broadcast-CDJPqAL9.js","./build/Broadcast-mOSG59YO.css","./build/CoachDashboard-B5GxoK9D.js","./build/CompanyDashboard-Dbv54Ok9.js","./build/DoctorDashboard-DSHZvPr7.js","./build/LeagueTable-DKs9ZADS.js","./build/Market-DnXWlISN.js","./build/MatchCenter-YYzhIyL0.js","./build/MatchManagerForm-B1_SfFz3.js","./build/MatchPerformanceForm-SkrTzgH4.js","./build/MatchTeamLogo-vRKQdRC_.js","./build/NationalTeams-DtFmfQ6h.js","./build/OfferForm-BzUdy6eX.js","./build/OffersScreen-6fn9ATZt.js","./build/PlayerCard-DmCC755q.js","./build/PlayerDashboard-Cw1zw7yn.js","./build/PlayerForm-JxuVBal_.js","./build/PrizeEditor-CUXlvGWR.js","./build/PublicServices-BHl4bRFc.js","./build/Ranking-Dmi5G51O.js","./build/ScoutDashboard-CvOqTGzq.js","./build/SettingsForm-CJNY_Y9G.js","./build/ShoppingScreen-Dt-rYFMN.js","./build/SocialHub-QG27cUw_.js","./build/StatsEditor-DEzj9GL0.js","./build/TacticsEditor-GHhdffMj.js","./build/TeamDashboard-DG91Aj58.js","./build/TeamRequestPlayerModal-GEJdOWdP.js","./build/TeamStandingsEditor-Mr0hJQpM.js","./build/TournamentHub-BSTJUPcW.js","./build/TournamentManagerModal-C1edy0am.js","./build/TrainingCenterManager-D62BlhwQ.js","./build/VisitorDashboard-BPZ5Oj46.js","./build/app-CF9Kqpzl.css","./build/app-Dqy93UUq.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
