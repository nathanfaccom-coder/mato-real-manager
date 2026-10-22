const CACHE_NAME = 'matoreal-static-9ac88d564b5e';
const PRECACHE = ["./index.html","./build/AdminPanel-DRlf5BOM.js","./build/AdminPlayerModal-BNzf3goB.js","./build/AssistantDashboard-CS79-UAa.js","./build/AttributeGrid-BJ9JViRt.js","./build/AwardsManager-_Yh3gwY8.js","./build/CoachDashboard-hhBsgPj6.js","./build/CompanyDashboard-aJzBQ3SI.js","./build/DoctorDashboard-COQkj1bX.js","./build/LeagueTable-DDW6q2hK.js","./build/Market-C_1lgY-5.js","./build/MatchCenter-DAMJHTUX.js","./build/MatchManagerForm-B4_Kigko.js","./build/MatchPerformanceForm-DECybEUE.js","./build/MatchTeamLogo-BsbNf4zN.js","./build/NationalTeams-DvfkwIDK.js","./build/OfferForm-h0DccGwh.js","./build/OffersScreen-C2aEKA7r.js","./build/PlayerCard-CSN4PBiN.js","./build/PlayerDashboard-dwWVvU_S.js","./build/PlayerForm-ZlJzwEYQ.js","./build/PrizeEditor-DpiDBtkD.js","./build/PublicServices-Comg5qMn.js","./build/Ranking-B3XC4pPV.js","./build/ScoutDashboard-Bk_TPpcT.js","./build/SettingsForm-CVo5iJPY.js","./build/ShoppingScreen-T3oIYVPI.js","./build/SocialHub-DvZRNc69.js","./build/StatsEditor-CNckeEOJ.js","./build/TeamDashboard-Dg0Ku_Q4.js","./build/TeamRequestPlayerModal-CztH_ZgU.js","./build/TeamStandingsEditor-DJPYNsg_.js","./build/TournamentHub-CBr-eL5w.js","./build/TournamentManagerModal-CuKQxS-x.js","./build/TrainingCenterManager-748B8gDE.js","./build/VisitorDashboard-BppKCi4l.js","./build/app-C9R-NKtF.css","./build/app-CODqBnxU.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
