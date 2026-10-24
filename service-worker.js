// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-dfa5fb9f7475';
const PRECACHE = ["./index.html","./build/AdminPanel-CIwoqeFL.js","./build/AdminPlayerModal-jZo7Ds4g.js","./build/AssistantDashboard-CTiCP0b6.js","./build/AttributeGrid-CnkJu6HO.js","./build/AwardsManager-DqyK3gYE.js","./build/Broadcast-d2itl9gE.js","./build/CoachDashboard-DiZ2jxsF.js","./build/CompanyDashboard-CwIF246G.js","./build/DoctorDashboard-Bx5SF-_1.js","./build/LeagueTable-zGTQFRKs.js","./build/Market-BohvzUrJ.js","./build/MatchCenter-C8_aLxYr.js","./build/MatchManagerForm-B6RhmDGH.js","./build/MatchPerformanceForm-BES-YOQq.js","./build/MatchTeamLogo-CGWyzH3-.js","./build/NationalTeams-CCZMjzx9.js","./build/OfferForm-BbuwJ9Hs.js","./build/OffersScreen-D9Y0tQ39.js","./build/PlayerCard-CZn83rUD.js","./build/PlayerDashboard-Bu5kXT6E.js","./build/PlayerForm-C5WqHdKl.js","./build/PrizeEditor-CZwyI00y.js","./build/PublicServices-BcnxRQiM.js","./build/Ranking-CzWG7Zbc.js","./build/ScoutDashboard-NXdo8IYh.js","./build/SettingsForm-DMc028vW.js","./build/ShoppingScreen--kgZbRgD.js","./build/SocialHub-DCzMAdIh.js","./build/StatsEditor-DbeeprPJ.js","./build/TacticsEditor-BWt-QhSy.js","./build/TeamDashboard-B-C3xXTK.js","./build/TeamRequestPlayerModal-CzE0zUC6.js","./build/TeamStandingsEditor-BYd19loO.js","./build/TournamentHub-MCOh2l5B.js","./build/TournamentManagerModal-Dq_RqtBz.js","./build/TrainingCenterManager-BseI0Xr3.js","./build/VisitorDashboard-C6oMKAUQ.js","./build/app--GBijVkU.js","./build/app-Bg74ldJB.css","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
