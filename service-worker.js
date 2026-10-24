// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-78c86cd63775';
const PRECACHE = ["./index.html","./build/AdminPanel-CqIGezQB.js","./build/AdminPlayerModal-C0Rm8Y2u.js","./build/AssistantDashboard-Db4S2v8p.js","./build/AttributeGrid-Bv2KyEMF.js","./build/AwardsManager-UyGxNSSg.js","./build/Broadcast-BCIXy1wn.js","./build/CoachDashboard-Bwf6yvSb.js","./build/CompanyDashboard-CYL9r54Y.js","./build/DoctorDashboard-Bc0cHr-U.js","./build/LeagueTable-clTfjvMD.js","./build/Market-BU0VuhOh.js","./build/MatchCenter-BzyEbw22.js","./build/MatchManagerForm-DprtDEsV.js","./build/MatchPerformanceForm-Cil3j4JP.js","./build/MatchTeamLogo-CtZh0Izh.js","./build/NationalTeams-s88YjVoJ.js","./build/OfferForm-Bg82MjAT.js","./build/OffersScreen-DTKB_s4N.js","./build/PlayerCard-C95pq3x0.js","./build/PlayerDashboard-CAZshOGS.js","./build/PlayerForm-KbKXu0hi.js","./build/PrizeEditor-GSaF4QJo.js","./build/PublicServices-BQZfHclW.js","./build/Ranking-CpYEDjur.js","./build/ScoutDashboard-CogYmBMj.js","./build/SettingsForm-CLttgPoD.js","./build/ShoppingScreen-KUQXx3Bm.js","./build/SocialHub-DyOkyDJ_.js","./build/StatsEditor-DZ2eL_2s.js","./build/TeamDashboard-B8VnNkU_.js","./build/TeamRequestPlayerModal-DouvlMCm.js","./build/TeamStandingsEditor-Mc3tku_9.js","./build/TournamentHub-B7VQmreT.js","./build/TournamentManagerModal-_5wLfYZe.js","./build/TrainingCenterManager-CMavgjs7.js","./build/VisitorDashboard-BqTZOUe0.js","./build/app-Bg74ldJB.css","./build/app-BxNvURTQ.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
