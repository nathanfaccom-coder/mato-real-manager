const CACHE_NAME = 'matoreal-static-ee40ed001615';
const PRECACHE = ["./index.html","./build/AdminPanel-BVfsLLoO.js","./build/AdminPlayerModal-hQJMWBr6.js","./build/AssistantDashboard-BS5wYjSI.js","./build/AttributeGrid-B-4RF3WY.js","./build/AwardsManager-Dz5ojhDt.js","./build/Broadcast-Dg9KryFg.js","./build/CoachDashboard-CGYsTjv1.js","./build/CompanyDashboard-Biy0x2ef.js","./build/DoctorDashboard-BowWUT4D.js","./build/LeagueTable-CJkOvmvf.js","./build/Market-yQ2p9kj9.js","./build/MatchCenter-w8m-UzAN.js","./build/MatchManagerForm-CywOyt7e.js","./build/MatchPerformanceForm-DpeGlYVy.js","./build/MatchTeamLogo-BMvb-6uu.js","./build/NationalTeams-fNSrltDN.js","./build/OfferForm-BKI3_PuY.js","./build/OffersScreen-CYkotaHQ.js","./build/PlayerCard-C2Qgrzo-.js","./build/PlayerDashboard-BVHg5GqH.js","./build/PlayerForm-DpbywKmb.js","./build/PrizeEditor-BqIlsTi-.js","./build/PublicServices-CKdElg3z.js","./build/Ranking-D9NiWyfl.js","./build/ScoutDashboard-BgJ5YnWY.js","./build/SettingsForm-7cx6gnlj.js","./build/ShoppingScreen-DtghvWjX.js","./build/SocialHub-DOeRgikc.js","./build/StatsEditor-DiXeJXGA.js","./build/TeamDashboard-_NnPWJkN.js","./build/TeamRequestPlayerModal-D10ajSqO.js","./build/TeamStandingsEditor-BBjX8AYu.js","./build/TournamentHub-CQqSKWAM.js","./build/TournamentManagerModal-DM_7sUNx.js","./build/TrainingCenterManager-CuzCikyc.js","./build/VisitorDashboard-d25tDvbK.js","./build/app-BLKDyfVP.js","./build/app-Bg74ldJB.css","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
