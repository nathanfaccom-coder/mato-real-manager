// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-6a722f89967e';
const PRECACHE = ["./index.html","./build/AdminPanel-BOcyX9Oa.js","./build/AdminPlayerModal-kUsqWdXU.js","./build/AssistantDashboard-Cas4gffX.js","./build/AttributeGrid-BEU1JHYn.js","./build/AwardsManager-DK2pIuOa.js","./build/Broadcast-CvYH6VvN.js","./build/CoachDashboard-ezcALUdf.js","./build/CompanyDashboard-BEtyekOv.js","./build/DoctorDashboard-D_sDhmeA.js","./build/LeagueTable-KCm3h92U.js","./build/Market-Hvb9TYWk.js","./build/MatchCenter-t6agdR9j.js","./build/MatchManagerForm-B5CMhiHs.js","./build/MatchPerformanceForm-DFpFTDAH.js","./build/MatchTeamLogo-EYj5_9my.js","./build/NationalTeams-D5wu5m3J.js","./build/OfferForm-CxlrJ9Cy.js","./build/OffersScreen-CVOmx2NC.js","./build/PlayerCard-DbmsGPE-.js","./build/PlayerDashboard-DIBsiTOX.js","./build/PlayerForm-C_bBtYZQ.js","./build/PrizeEditor-QukXKhs2.js","./build/PublicServices-BS8hR4pW.js","./build/Ranking-BzWTTC0E.js","./build/ScoutDashboard-Bpl0Pil0.js","./build/SettingsForm-BfRt6ywb.js","./build/ShoppingScreen-aUlIB8WF.js","./build/SocialHub-pP674lMs.js","./build/StatsEditor-CNptJDPW.js","./build/TacticsEditor-CJ0XRKWp.js","./build/TeamDashboard-BKTPRxJj.js","./build/TeamRequestPlayerModal-RwhmKCRq.js","./build/TeamStandingsEditor-SPxFmj_u.js","./build/TournamentHub-DcrHCaAl.js","./build/TournamentManagerModal-K5dIiwUi.js","./build/TrainingCenterManager-Bj7IF_hY.js","./build/VisitorDashboard-BNgN4Bu1.js","./build/app-BCRHw_g-.js","./build/app-Bg74ldJB.css","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
