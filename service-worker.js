// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-631aacf3d295';
const PRECACHE = ["./index.html","./build/AdminPanel-f_ZDQnFy.js","./build/AdminPlayerModal-CA8LslGY.js","./build/AssistantDashboard-RRk4CyDS.js","./build/AttributeGrid-tYmNWBhc.js","./build/AwardsManager-CgcxfQnU.js","./build/Broadcast-B1PfQkxj.js","./build/CoachDashboard-Cxb80L-l.js","./build/CompanyDashboard-BXKrsG8P.js","./build/DoctorDashboard-qluvGLFZ.js","./build/LeagueTable-S6zsc-DA.js","./build/Market-DxeGwXG1.js","./build/MatchCenter-D7VowD3W.js","./build/MatchManagerForm-De6jZXi0.js","./build/MatchPerformanceForm-D8CKkHm3.js","./build/MatchTeamLogo-8rof2gUM.js","./build/NationalTeams-BlggdJiJ.js","./build/OfferForm-DiyLHxY2.js","./build/OffersScreen-BE6bjb0z.js","./build/PlayerCard-DENB2uLJ.js","./build/PlayerDashboard-CroLhNxU.js","./build/PlayerForm-Bc8aUR7Z.js","./build/PrizeEditor-D_pvF-qJ.js","./build/PublicServices-50K39oQ9.js","./build/Ranking-BCSNv0O2.js","./build/ScoutDashboard-pdN1HKIi.js","./build/SettingsForm-nvQ4Y3Z1.js","./build/ShoppingScreen-CDv8GTNp.js","./build/SocialHub-e_OV-E9r.js","./build/StatsEditor-ByZlOal6.js","./build/TacticsEditor-BsDBGeUY.js","./build/TeamDashboard-I4FfumQF.js","./build/TeamRequestPlayerModal-CxxglaVo.js","./build/TeamStandingsEditor-B5PHzjUf.js","./build/TournamentHub-YCRQ0Nqg.js","./build/TournamentManagerModal-BwTqqHXh.js","./build/TrainingCenterManager-2lNj2AeG.js","./build/VisitorDashboard-DVvIAkND.js","./build/app-Bg74ldJB.css","./build/app-Bg_DHMbc.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
