// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-8bd3818cac3b';
const PRECACHE = ["./index.html","./build/AdminPanel-CHnyYz5Z.js","./build/AdminPlayerModal-Bb_-E5aT.js","./build/AssistantDashboard-D7rw15b5.js","./build/AttributeGrid-Cgpa9AyA.js","./build/AwardsManager-Odgfqdr5.js","./build/Broadcast-CRyZXMyw.js","./build/Broadcast-mOSG59YO.css","./build/CoachDashboard-HgGUuLf3.js","./build/CompanyDashboard-DyaWU183.js","./build/DoctorDashboard-BUAGalff.js","./build/LeagueTable-B-f5mnTB.js","./build/Market-fdF7PeQo.js","./build/MatchCenter-D0Gi8aJg.js","./build/MatchManagerForm-De8LHtqD.js","./build/MatchPerformanceForm-CKA_lPvn.js","./build/MatchTeamLogo-m7ItLhDu.js","./build/NationalTeams-DWfgv3od.js","./build/OfferForm-Brk19HLe.js","./build/OffersScreen-QeRLYuzb.js","./build/PlayerCard-DAbI5zgZ.js","./build/PlayerDashboard-DqJEKhLZ.js","./build/PlayerForm-C8VFSRSI.js","./build/PrizeEditor-WIJiejqb.js","./build/PublicServices-H65jGRMg.js","./build/Ranking-BrcCuTS4.js","./build/ScoutDashboard-BfWj7KHG.js","./build/SettingsForm-Dr88DXz_.js","./build/ShoppingScreen-qaUdeH5d.js","./build/SocialHub-Fbm_Wt0N.js","./build/StatsEditor-B5sze49W.js","./build/TacticsEditor-BsRwo97k.js","./build/TeamDashboard-D0aK3c9s.js","./build/TeamRequestPlayerModal-DVsR0M8G.js","./build/TeamStandingsEditor-CA7bqdR_.js","./build/TournamentHub-CAV_FFID.js","./build/TournamentManagerModal-DtWsJR_Z.js","./build/TrainingCenterManager-C3AlhZjo.js","./build/VisitorDashboard-BWe2T4y8.js","./build/app-BZDT5u1B.js","./build/app-CMcakc-H.css","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
