const CACHE_NAME = 'matoreal-static-dc4b01f0cacb';
const PRECACHE = ["./index.html","./build/AdminPanel-CTdFU9vB.js","./build/AdminPlayerModal-DZEKh32K.js","./build/AssistantDashboard-_3Vay2MT.js","./build/AttributeGrid-D7NL8_QL.js","./build/AwardsManager-BIPnbvt2.js","./build/Broadcast-DMN99QeP.js","./build/CoachDashboard-sNlx1JyK.js","./build/CompanyDashboard-c4OfH_rL.js","./build/DoctorDashboard-CdJZAwl7.js","./build/LeagueTable-D4fS3tXA.js","./build/Market-CsLZlp_5.js","./build/MatchCenter-BMPDV1X0.js","./build/MatchManagerForm-DOJ8zxmz.js","./build/MatchPerformanceForm-BOkZAtha.js","./build/MatchTeamLogo-DPNtDwWU.js","./build/NationalTeams-BNAPtGeZ.js","./build/OfferForm-CN9tzvwV.js","./build/OffersScreen-E2OkRYkn.js","./build/PlayerCard-D8nfsMSt.js","./build/PlayerDashboard-DRLa-8vg.js","./build/PlayerForm-DAx68Z6B.js","./build/PrizeEditor-CFIe__gs.js","./build/PublicServices-D2yXEAVF.js","./build/Ranking-Cy7qCi6z.js","./build/ScoutDashboard-Dv0cxhen.js","./build/SettingsForm-B5gMEnzI.js","./build/ShoppingScreen-CA6mw5-N.js","./build/SocialHub-D9GPBbWB.js","./build/StatsEditor-Duy5d_QC.js","./build/TeamDashboard-CATyyBmj.js","./build/TeamRequestPlayerModal-ryeFL1ut.js","./build/TeamStandingsEditor-7IhD5Oue.js","./build/TournamentHub-DrulWkDi.js","./build/TournamentManagerModal-D0yS-Kz8.js","./build/TrainingCenterManager-DJRakTD8.js","./build/VisitorDashboard-D_C29hh0.js","./build/app-Bg74ldJB.css","./build/app-DgPnck9U.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
