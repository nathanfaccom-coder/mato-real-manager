const CACHE_NAME = 'matoreal-static-e53c7b7c5f76';
const PRECACHE = ["./index.html","./build/AdminPanel-DUFItA3v.js","./build/AdminPlayerModal-CyELenwN.js","./build/AssistantDashboard-DVm2k1Lt.js","./build/AttributeGrid-PI3FZbV2.js","./build/AwardsManager-COO4UUKr.js","./build/CoachDashboard-Bj9bOYj_.js","./build/CompanyDashboard-X-ZzjRAU.js","./build/DoctorDashboard-Cv4tIZQL.js","./build/LeagueTable-1KzxjJen.js","./build/Market-o_o_9ckK.js","./build/MatchCenter-3vIu7d-i.js","./build/MatchManagerForm-Dyv9QVXc.js","./build/MatchPerformanceForm-CrBSOrpS.js","./build/MatchTeamLogo-Cd8baaE_.js","./build/OfferForm-D776QQ48.js","./build/OffersScreen-Di2iU6Eh.js","./build/PlayerCard-Ck-G90GF.js","./build/PlayerDashboard-BpWvRIA1.js","./build/PlayerForm-COz0fHF6.js","./build/PrizeEditor-Nqo5gTlU.js","./build/PublicServices-Cf8vg4Pe.js","./build/Ranking-CCxwmTqo.js","./build/ScoutDashboard-B-3fxE7F.js","./build/SettingsForm-gIVmkPfI.js","./build/ShoppingScreen-Cy6s6BE0.js","./build/SocialHub-VnZZIVxt.js","./build/StatsEditor-l6PRoPQF.js","./build/TeamDashboard-CBYClSHf.js","./build/TeamRequestPlayerModal-B0CYF1Gc.js","./build/TeamStandingsEditor-BHnIB-Ab.js","./build/TournamentHub--l-0Vnd3.js","./build/TournamentManagerModal-CXW2GlQf.js","./build/TrainingCenterManager-BqGZlwbC.js","./build/VisitorDashboard-DQbbuK5H.js","./build/app-Bi3FCZQf.js","./build/app-C9R-NKtF.css","./build/firebase-Bwd-Pxfj.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
    event.respondWith(fetch(event.request).catch(() => caches.match(new URL('./index.html', self.registration.scope).href)));
    return;
  }
  if (!PRECACHE.some(path => new URL(path, self.registration.scope).href === url.href)) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
