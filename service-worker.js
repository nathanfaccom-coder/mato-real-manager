// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-fd64df85cb9f';
const PRECACHE = ["./index.html","./build/AdminPanel-CQzCQkFB.js","./build/AdminPlayerModal-BIUYZEA6.js","./build/AssistantDashboard-L_xwv_Vd.js","./build/AttributeGrid-tsoh-wlF.js","./build/AwardsManager-CMwMh1tu.js","./build/Broadcast-BMlgOlTM.js","./build/CoachDashboard-AnS1pRci.js","./build/CompanyDashboard-DXwXbbdv.js","./build/DoctorDashboard-D3UpbC_i.js","./build/LeagueTable-B9JFbp_F.js","./build/Market-BS1JNR68.js","./build/MatchCenter-Ma80TQK0.js","./build/MatchManagerForm-ghBN5A5h.js","./build/MatchPerformanceForm-NL67hvbW.js","./build/MatchTeamLogo-CXOxRrRT.js","./build/NationalTeams-490Aiyaj.js","./build/OfferForm-DbnRm5By.js","./build/OffersScreen-CH1fouG1.js","./build/PlayerCard-CfElYgMd.js","./build/PlayerDashboard-DG3eSrFj.js","./build/PlayerForm-YF3-4-ng.js","./build/PrizeEditor-jXQzGIFt.js","./build/PublicServices-r71HbkJp.js","./build/Ranking-CBQx1L4o.js","./build/ScoutDashboard-BgoodJGA.js","./build/SettingsForm-BkZq2_8G.js","./build/ShoppingScreen-Cx9DkDt1.js","./build/SocialHub-U1y0b-Dv.js","./build/StatsEditor-C5aZvuTm.js","./build/TeamDashboard-Cswi3_cK.js","./build/TeamRequestPlayerModal-DqViWM8m.js","./build/TeamStandingsEditor-AYFMxNkk.js","./build/TournamentHub-CA-Rmk7j.js","./build/TournamentManagerModal-DwnvtB-u.js","./build/TrainingCenterManager-Cskn8qr_.js","./build/VisitorDashboard-DsZY307Q.js","./build/app-Bg74ldJB.css","./build/app-D3zFc6Xg.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
