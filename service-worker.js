const CACHE_NAME = 'matoreal-static-a24fbb3ee09b';
const PRECACHE = ["./index.html","./build/AdminPanel-CcI-9LnW.js","./build/AdminPlayerModal-DHrXWf0L.js","./build/AssistantDashboard-CPDKAcTL.js","./build/AttributeGrid-DaWdPJ2U.js","./build/AwardsManager-C0SZnkFP.js","./build/Broadcast-DWbwsOah.js","./build/CoachDashboard-C4Z2wbCj.js","./build/CompanyDashboard-DLQbAqGe.js","./build/DoctorDashboard-oITR1iHj.js","./build/LeagueTable-CrOZ31aO.js","./build/Market-BiLc1w3-.js","./build/MatchCenter-DTVgYVCe.js","./build/MatchManagerForm-DQBgCj5R.js","./build/MatchPerformanceForm-b8KZJzyk.js","./build/MatchTeamLogo-DjiOy_3F.js","./build/NationalTeams-AxRBiKGZ.js","./build/OfferForm-CGCUow1E.js","./build/OffersScreen-CPR1tf8U.js","./build/PlayerCard-CpmUhXdi.js","./build/PlayerDashboard-CwPvJ2ac.js","./build/PlayerForm-BlNsfhad.js","./build/PrizeEditor-DRY_bsqi.js","./build/PublicServices-BVTzeVkp.js","./build/Ranking-DnCMdqtw.js","./build/ScoutDashboard-C3WUU_Wk.js","./build/SettingsForm-M2ObCv-1.js","./build/ShoppingScreen-BioCWXkU.js","./build/SocialHub-XoJiscLU.js","./build/StatsEditor-ALVgrART.js","./build/TeamDashboard-ek8MZFuz.js","./build/TeamRequestPlayerModal-BP6SiUic.js","./build/TeamStandingsEditor-DUh2kK6P.js","./build/TournamentHub-Bbh7BRP5.js","./build/TournamentManagerModal-DZ4AjrtN.js","./build/TrainingCenterManager-QrePyhN4.js","./build/VisitorDashboard-CoUk51B0.js","./build/app-BXyB9tV9.js","./build/app-Bg74ldJB.css","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
