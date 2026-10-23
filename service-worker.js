const CACHE_NAME = 'matoreal-static-342e79671cd3';
const PRECACHE = ["./index.html","./build/AdminPanel-l9bH3LZT.js","./build/AdminPlayerModal-BjgNuOBS.js","./build/AssistantDashboard-B21_FoAu.js","./build/AttributeGrid-Df60UPRe.js","./build/AwardsManager-Z4cyNnUP.js","./build/Broadcast-D_1dJ3F6.js","./build/CoachDashboard-hEUDwZIH.js","./build/CompanyDashboard-kmLf3EdV.js","./build/DoctorDashboard-DEZaiTWQ.js","./build/LeagueTable-CpLBhRWF.js","./build/Market-CNNG-w9V.js","./build/MatchCenter-DcDVDkjS.js","./build/MatchManagerForm-i30ii1D0.js","./build/MatchPerformanceForm-DnqHda--.js","./build/MatchTeamLogo-DShfguS1.js","./build/NationalTeams-CW5O9XVB.js","./build/OfferForm-COvG2Kob.js","./build/OffersScreen-C-JYphXw.js","./build/PlayerCard-tqlHWJhh.js","./build/PlayerDashboard-BJDY4-Qi.js","./build/PlayerForm-DFLEAy10.js","./build/PrizeEditor-BXjViQCj.js","./build/PublicServices-DYTakpA8.js","./build/Ranking-DkPcXUOP.js","./build/ScoutDashboard-Cc2JO5Dn.js","./build/SettingsForm-CqKWN8mY.js","./build/ShoppingScreen-w_0TdYY8.js","./build/SocialHub-RtaTULLb.js","./build/StatsEditor-7qwOJ73p.js","./build/TeamDashboard-BeLYltV-.js","./build/TeamRequestPlayerModal-CcTHEO5e.js","./build/TeamStandingsEditor-CfHkRHqA.js","./build/TournamentHub-DyVGx1El.js","./build/TournamentManagerModal-DlKctMx0.js","./build/TrainingCenterManager-B6L2etnD.js","./build/VisitorDashboard-mODPhSXM.js","./build/app-Bg74ldJB.css","./build/app-DNMMSmoL.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
    event.respondWith(fetch(event.request).catch(() => caches.match(new URL('./index.html', self.registration.scope).href)));
    return;
  }
  if (!PRECACHE.some(path => new URL(path, self.registration.scope).href === url.href)) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
