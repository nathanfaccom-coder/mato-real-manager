const CACHE_NAME = 'matoreal-static-b7fb83d981b3';
const PRECACHE = ["./index.html","./build/AdminPanel-CUnvhR6D.js","./build/AdminPlayerModal-DpSBzV7z.js","./build/AssistantDashboard-B9LJPKh6.js","./build/AttributeGrid-Fnq8bSF6.js","./build/AwardsManager-DApwOkyJ.js","./build/Broadcast-Cn-W554t.js","./build/CoachDashboard-DzlLVFFa.js","./build/CompanyDashboard-DF92wSv5.js","./build/DoctorDashboard-oO_eif12.js","./build/LeagueTable-Bjy_iWbp.js","./build/Market-Cet1bhHd.js","./build/MatchCenter-Dj9Dm8Gp.js","./build/MatchManagerForm-CqUPEAKu.js","./build/MatchPerformanceForm-DR9Neifj.js","./build/MatchTeamLogo-UjAbfLbd.js","./build/NationalTeams-BwkYupLk.js","./build/OfferForm-3VOJ2--O.js","./build/OffersScreen-DtyFnKvb.js","./build/PlayerCard-CahKmeNv.js","./build/PlayerDashboard-69ETxx8e.js","./build/PlayerForm-BRDa_7dC.js","./build/PrizeEditor-C13Ir8ro.js","./build/PublicServices-BX_q6wIc.js","./build/Ranking-CGflcE5B.js","./build/ScoutDashboard-OHUFP2Ej.js","./build/SettingsForm-7KnUOJ3K.js","./build/ShoppingScreen-C47q0YmH.js","./build/SocialHub-D9lCL1XH.js","./build/StatsEditor-BiQhpa1N.js","./build/TeamDashboard-CHyDTAa_.js","./build/TeamRequestPlayerModal-BMbRbUb0.js","./build/TeamStandingsEditor-CE31D87t.js","./build/TournamentHub-DN9ocMGz.js","./build/TournamentManagerModal-C8gUngp5.js","./build/TrainingCenterManager-CW7vZAkx.js","./build/VisitorDashboard-DWIghv0y.js","./build/app-Bg74ldJB.css","./build/app-DwDuLftR.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
