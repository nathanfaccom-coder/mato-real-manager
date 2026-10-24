// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-d169a72bc1a0';
const PRECACHE = ["./index.html","./build/AdminPanel-DVu_5BE8.js","./build/AdminPlayerModal-BqJpWRTH.js","./build/AssistantDashboard-BCDdylZF.js","./build/AttributeGrid-C9Dm6az6.js","./build/AwardsManager-ccPbUiF8.js","./build/Broadcast-CSZuzRgS.js","./build/CoachDashboard-D1j2vvSL.js","./build/CompanyDashboard-CW-EqVmp.js","./build/DoctorDashboard-BJjxOG5G.js","./build/LeagueTable-Br5w9OIf.js","./build/Market-bAMtVU4G.js","./build/MatchCenter-DVO-ZevG.js","./build/MatchManagerForm-B3dOOMv2.js","./build/MatchPerformanceForm-D116c9ST.js","./build/MatchTeamLogo-BUT-Xl-O.js","./build/NationalTeams-B5OrCDgo.js","./build/OfferForm-jdVafh3R.js","./build/OffersScreen-B_AcVbVC.js","./build/PlayerCard-C7Be6eox.js","./build/PlayerDashboard-DefW4FbZ.js","./build/PlayerForm-CmT4Ycr4.js","./build/PrizeEditor-BQ0PCRAE.js","./build/PublicServices-Bcxb5Aed.js","./build/Ranking-D5PFzf63.js","./build/ScoutDashboard-DbYRGBg-.js","./build/SettingsForm-DXlO5jX4.js","./build/ShoppingScreen-D5TmENvy.js","./build/SocialHub-DNFdBmXG.js","./build/StatsEditor-BS5llpG_.js","./build/TacticsEditor-C9j7amH2.js","./build/TeamDashboard-Bk4pEMwv.js","./build/TeamRequestPlayerModal-CfQyc0WG.js","./build/TeamStandingsEditor-BlbH7lj1.js","./build/TournamentHub-BDO-ie6C.js","./build/TournamentManagerModal-Bju-vkue.js","./build/TrainingCenterManager-Cg6ozpZI.js","./build/VisitorDashboard-CLQHl0sD.js","./build/app-Bg74ldJB.css","./build/app-Chw5fRBi.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
