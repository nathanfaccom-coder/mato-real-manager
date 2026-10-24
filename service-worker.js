const CACHE_NAME = 'matoreal-static-ac9b7bfb9638';
const PRECACHE = ["./index.html","./build/AdminPanel-V3HhvWJN.js","./build/AdminPlayerModal-yRBhv1-s.js","./build/AssistantDashboard-ZNmsakne.js","./build/AttributeGrid-1e9YzU56.js","./build/AwardsManager-BhsRwDD4.js","./build/Broadcast-BGklIQmL.js","./build/CoachDashboard-BeDmBfZr.js","./build/CompanyDashboard-B47YFAbw.js","./build/DoctorDashboard-DTREt4hB.js","./build/LeagueTable-BZjjL1jO.js","./build/Market-wRoUwGS4.js","./build/MatchCenter-M_6JjgRI.js","./build/MatchManagerForm-aaIvCwMq.js","./build/MatchPerformanceForm-SpfBlZ6m.js","./build/MatchTeamLogo-WzSCb0qk.js","./build/NationalTeams-Ctt97G5b.js","./build/OfferForm-Dhe4lugm.js","./build/OffersScreen-BWHoZe0I.js","./build/PlayerCard-BUtofz0C.js","./build/PlayerDashboard-B93_R91r.js","./build/PlayerForm-CFmKd2aW.js","./build/PrizeEditor-CX4y1eqJ.js","./build/PublicServices-CoFRRNnd.js","./build/Ranking-B63YzSZr.js","./build/ScoutDashboard-DZhE54kS.js","./build/SettingsForm-C1Y5LrJo.js","./build/ShoppingScreen-Chj-KJrC.js","./build/SocialHub-D3H0mXpd.js","./build/StatsEditor-D9QFSIGk.js","./build/TeamDashboard-D2UkNvxT.js","./build/TeamRequestPlayerModal-DiZAh8Rz.js","./build/TeamStandingsEditor-BRDDTckN.js","./build/TournamentHub-YLnll7Wl.js","./build/TournamentManagerModal-D9PDoClG.js","./build/TrainingCenterManager-m8XzSZIq.js","./build/VisitorDashboard-CQ0B4yTa.js","./build/app-BBevfM6h.js","./build/app-Bg74ldJB.css","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
