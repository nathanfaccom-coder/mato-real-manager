// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-4451b0a768f2';
const PRECACHE = ["./index.html","./build/AdminPanel-D7sPZSL8.js","./build/AdminPlayerModal-EqmLBcQH.js","./build/AssistantDashboard-Dzo81SbE.js","./build/AttributeGrid-h9J0GO1K.js","./build/AwardsManager-BoNDollJ.js","./build/Broadcast-R0kDUm0u.js","./build/CoachDashboard-B2-5sfsO.js","./build/CompanyDashboard-DCxJvU1G.js","./build/DoctorDashboard-C9O48dCy.js","./build/LeagueTable-A9qnSiyr.js","./build/Market-CZXYKjb-.js","./build/MatchCenter-BfhwoNJV.js","./build/MatchManagerForm-C3Yddk4q.js","./build/MatchPerformanceForm-BsbTISNt.js","./build/MatchTeamLogo-DBODQSFd.js","./build/NationalTeams-BXQPw1L7.js","./build/OfferForm-BtlOV-QF.js","./build/OffersScreen-CYptgSA8.js","./build/PlayerCard-CWQwqAoz.js","./build/PlayerDashboard-DOoUJsVS.js","./build/PlayerForm-B11eFlYo.js","./build/PrizeEditor-C1RpZBjF.js","./build/PublicServices-BH-TkmXU.js","./build/Ranking-D-E8ipif.js","./build/ScoutDashboard-ad8WsiTR.js","./build/SettingsForm-Dp2PJ8lA.js","./build/ShoppingScreen-CoEXShhl.js","./build/SocialHub-ByUscEpx.js","./build/StatsEditor-YGFJyONu.js","./build/TacticsEditor-BVWBuQ-u.js","./build/TeamDashboard-gMZH65qz.js","./build/TeamRequestPlayerModal-DgqM4r0c.js","./build/TeamStandingsEditor-BEO9s4JP.js","./build/TournamentHub-BWTYvHDP.js","./build/TournamentManagerModal-BPE4q5EB.js","./build/TrainingCenterManager-zXm5kyjb.js","./build/VisitorDashboard-DPdr1-7I.js","./build/app-Bg74ldJB.css","./build/app-D-WqurtO.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
