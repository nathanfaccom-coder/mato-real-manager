// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-bccc9c142ed5';
const PRECACHE = ["./index.html","./build/AdminPanel-DKKBfZAx.js","./build/AdminPlayerModal-BulOZ4Pi.js","./build/AssistantDashboard-BKKWO6gz.js","./build/AttributeGrid-xwWh8RjU.js","./build/AwardsManager-D0XV5Zw9.js","./build/Broadcast-N3B_-1rQ.js","./build/Broadcast-mOSG59YO.css","./build/CoachDashboard-CreHhhrx.js","./build/CompanyDashboard-Oakw9IXO.js","./build/DoctorDashboard-BC9XZ8Al.js","./build/LeagueTable-DtLamJNN.js","./build/Market-BBhlhyIF.js","./build/MatchCenter-DFvmntB_.js","./build/MatchManagerForm-C2AI0Gcf.js","./build/MatchPerformanceForm-sjwceEyf.js","./build/MatchTeamLogo-BBkXGGYT.js","./build/NationalTeams-BHYxrqmA.js","./build/OfferForm-S9uKVqS3.js","./build/OffersScreen-BrgcNOXN.js","./build/PlayerCard-Js8P_435.js","./build/PlayerDashboard-BTSA2-VH.js","./build/PlayerForm-BjplnwSK.js","./build/PrizeEditor-C9mHD_i5.js","./build/PublicServices-DLke57yq.js","./build/Ranking-D3y9TV_R.js","./build/ScoutDashboard-tk96NuKB.js","./build/SettingsForm-ppAa2IEc.js","./build/ShoppingScreen-Br1c1PRH.js","./build/SocialHub-DS8FNwyE.js","./build/StatsEditor-BeRQRyLK.js","./build/TacticsEditor-YQaKsozF.js","./build/TeamDashboard-CxSHkg05.js","./build/TeamRequestPlayerModal-BdSU5Bpt.js","./build/TeamStandingsEditor-BnzgM8ea.js","./build/TournamentHub-CPGRBSfX.js","./build/TournamentManagerModal-BWCXPngg.js","./build/TrainingCenterManager-CW8s5J7m.js","./build/VisitorDashboard-DXi2GQxx.js","./build/app-BMi5pRHd.js","./build/app-Bg74ldJB.css","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
