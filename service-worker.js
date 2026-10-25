// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-65db4e26622a';
const PRECACHE = ["./index.html","./build/AdminPanel-ci6r5Uvu.js","./build/AdminPlayerModal-CG6Ik8tf.js","./build/AssistantDashboard-BKZVdTHq.js","./build/AttributeGrid-DzCE97ZX.js","./build/AwardsManager-On80wfLd.js","./build/Broadcast-BYxXFhoT.js","./build/Broadcast-mOSG59YO.css","./build/CoachDashboard-BG5kea3r.js","./build/CompanyDashboard-C4B4Sk0a.js","./build/DoctorDashboard-BmJ458Wr.js","./build/LeagueTable-d03rzOxA.js","./build/Market-BUUKqDzk.js","./build/MatchCenter-z5-LUsCR.js","./build/MatchManagerForm-2JcV_AB2.js","./build/MatchPerformanceForm-DD4qOsim.js","./build/MatchTeamLogo-CITeR3Nd.js","./build/NationalTeams-C15rFFZJ.js","./build/OfferForm-BfHqBVy0.js","./build/OffersScreen-CzIT-kdY.js","./build/PlayerCard-CJOTAXFO.js","./build/PlayerDashboard-BHZHHiz4.js","./build/PlayerForm-BVDfJu8G.js","./build/PrizeEditor-Wal3ImUH.js","./build/PublicServices-qxFSpEGm.js","./build/Ranking-BhJD0tvS.js","./build/ScoutDashboard-CBs5JLFw.js","./build/SettingsForm-CABshhLr.js","./build/ShoppingScreen-CzdsayEj.js","./build/SocialHub-CRX9SotT.js","./build/StatsEditor-CbQPAu94.js","./build/TacticsEditor-CeVZJ53t.js","./build/TeamDashboard-DPRowNX0.js","./build/TeamRequestPlayerModal-CPpr1ugt.js","./build/TeamStandingsEditor-DaHz0hu0.js","./build/TournamentHub-BrJ8OQ99.js","./build/TournamentManagerModal-D9_iYTq1.js","./build/TrainingCenterManager-CYM2zTPy.js","./build/VisitorDashboard-BcSYxkTk.js","./build/app-CF9Kqpzl.css","./build/app-C_bv4bwb.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
