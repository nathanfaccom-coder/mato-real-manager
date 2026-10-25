// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-a399766ad67a';
const PRECACHE = ["./index.html","./build/AdminPanel-DDdOVFUs.js","./build/AdminPlayerModal-DkPtl9Eh.js","./build/AssistantDashboard-CWfqCo7z.js","./build/AttributeGrid-BuL7TIBx.js","./build/AwardsManager-DfrIOS3j.js","./build/Broadcast-DMIJUKHf.js","./build/Broadcast-mOSG59YO.css","./build/CoachDashboard-BZftnK60.js","./build/CompanyDashboard-Cri7cf2p.js","./build/DoctorDashboard-B4WCCSej.js","./build/LeagueTable-YhZ2Ms2b.js","./build/Market-DmMMe9UN.js","./build/MatchCenter-BZBU7Szi.js","./build/MatchManagerForm-DjTAe4S9.js","./build/MatchPerformanceForm-C1gZcNLy.js","./build/MatchTeamLogo-D6zvHwqZ.js","./build/NationalTeams-CAyAQA6q.js","./build/OfferForm-DtJa_1XV.js","./build/OffersScreen-XFVWfe_y.js","./build/PlayerCard-CMoz3rrF.js","./build/PlayerDashboard-Bi6FV8iI.js","./build/PlayerForm-BycQLov5.js","./build/PrizeEditor-BtfXN6aw.js","./build/PublicServices-BfW6EwQS.js","./build/Ranking-BX2Y8X_1.js","./build/ScoutDashboard-D399DcRn.js","./build/SettingsForm-DBUbWjKv.js","./build/ShoppingScreen-Cth33VCP.js","./build/SocialHub-DhZBUU-w.js","./build/StatsEditor-CjSP_uL0.js","./build/TacticsEditor-CrmkxpKe.js","./build/TeamDashboard-D4GVat_w.js","./build/TeamRequestPlayerModal-DyGMeyOP.js","./build/TeamStandingsEditor-DtwEVifT.js","./build/TournamentHub-DZyRi82q.js","./build/TournamentManagerModal-D5XT33Lp.js","./build/TrainingCenterManager-aN0G3HFY.js","./build/VisitorDashboard-BgAA46ga.js","./build/app-Bg74ldJB.css","./build/app-GSvrnj4e.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
