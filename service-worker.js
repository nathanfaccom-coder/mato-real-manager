const CACHE_NAME = 'matoreal-static-ed2089154035';
const PRECACHE = ["./index.html","./build/AdminPanel-CdSf7ct7.js","./build/AdminPlayerModal-Dypu1BR7.js","./build/AssistantDashboard-Ddiyg8yy.js","./build/AttributeGrid-CYN_u2AQ.js","./build/AwardsManager-jRG0uf-d.js","./build/Broadcast-DJReiQJb.js","./build/CoachDashboard-UUqMJcmp.js","./build/CompanyDashboard-BYfvBT4Z.js","./build/DoctorDashboard-ClfyYtMJ.js","./build/LeagueTable-B9diGx_f.js","./build/Market-BWyh_nG3.js","./build/MatchCenter-CSUqAYIR.js","./build/MatchManagerForm-BApkrX76.js","./build/MatchPerformanceForm-DYb5HiT8.js","./build/MatchTeamLogo-qEvQpUGT.js","./build/NationalTeams-DjMf1ZM7.js","./build/OfferForm-D3kMejhg.js","./build/OffersScreen-DxJlxVqg.js","./build/PlayerCard-C0NOSlD-.js","./build/PlayerDashboard-tz6ouizW.js","./build/PlayerForm-WOhyDOvm.js","./build/PrizeEditor-BEez7oUd.js","./build/PublicServices-DvGKLZwl.js","./build/Ranking-By--ji0D.js","./build/ScoutDashboard-BRn_7d8i.js","./build/SettingsForm-D_U-iSiQ.js","./build/ShoppingScreen-CTYopWha.js","./build/SocialHub-8NMf45Di.js","./build/StatsEditor-CMti6K1H.js","./build/TeamDashboard-BGJZfRk8.js","./build/TeamRequestPlayerModal-DRUa4F-L.js","./build/TeamStandingsEditor-D1udfAWA.js","./build/TournamentHub-BJ6UHeVQ.js","./build/TournamentManagerModal-CGDUa_M3.js","./build/TrainingCenterManager-C9zT7Ji8.js","./build/VisitorDashboard-DXqROcLN.js","./build/app-Bg74ldJB.css","./build/app-mp7NTKzT.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
