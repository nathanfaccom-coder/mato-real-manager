const CACHE_NAME = 'matoreal-static-9acf85aaeca8';
const PRECACHE = ["./index.html","./build/AdminPanel-undKmR0d.js","./build/AdminPlayerModal-CGM8dc_H.js","./build/AssistantDashboard-BiMbACkA.js","./build/AttributeGrid-DTfFtacZ.js","./build/AwardsManager-BzSl1bXy.js","./build/Broadcast-CCG-nxzm.js","./build/CoachDashboard-DnwqTZYd.js","./build/CompanyDashboard-Bi1W6JEH.js","./build/DoctorDashboard-Bu1Mu7-b.js","./build/LeagueTable-CItAo0f7.js","./build/Market-B5382i1J.js","./build/MatchCenter-MAOJaihG.js","./build/MatchManagerForm-D2mwwHr3.js","./build/MatchPerformanceForm-B4ua4_Yn.js","./build/MatchTeamLogo-0Wozh4n5.js","./build/NationalTeams-BTbQsJNH.js","./build/OfferForm-DpWJb6-h.js","./build/OffersScreen-9dUmferQ.js","./build/PlayerCard-BGcoVSLe.js","./build/PlayerDashboard-DSnhR2OH.js","./build/PlayerForm-DeqFbhCd.js","./build/PrizeEditor-cC7eRDXQ.js","./build/PublicServices-CdY5YX04.js","./build/Ranking-BTaPm_7T.js","./build/ScoutDashboard-Do4e1OD1.js","./build/SettingsForm-BQLr7xtd.js","./build/ShoppingScreen-BE_BTGcD.js","./build/SocialHub-DV5MUW0r.js","./build/StatsEditor-cAim4FVi.js","./build/TeamDashboard-qbEz8On7.js","./build/TeamRequestPlayerModal-rUx5670f.js","./build/TeamStandingsEditor-Bp6AwHv-.js","./build/TournamentHub-XFAVURQk.js","./build/TournamentManagerModal-86nPXtfd.js","./build/TrainingCenterManager-aKDr7RcO.js","./build/VisitorDashboard-0R6SwgNH.js","./build/app-Bg74ldJB.css","./build/app-DENnJdcw.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
