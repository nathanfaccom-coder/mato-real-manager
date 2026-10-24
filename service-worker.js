// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-9fc013bb2249';
const PRECACHE = ["./index.html","./build/AdminPanel-DxZBBoO2.js","./build/AdminPlayerModal-DN6FXpEV.js","./build/AssistantDashboard-BganCzTd.js","./build/AttributeGrid-ZGBFt2fx.js","./build/AwardsManager-DkNYUuA9.js","./build/Broadcast-BRpAoi0f.js","./build/Broadcast-mOSG59YO.css","./build/CoachDashboard-CNV8wYai.js","./build/CompanyDashboard-CbUrWcsc.js","./build/DoctorDashboard-BOD0EbTU.js","./build/LeagueTable-B5sPQ4IX.js","./build/Market-DKuAxK-1.js","./build/MatchCenter-D5-P21cm.js","./build/MatchManagerForm-CZM419UH.js","./build/MatchPerformanceForm-BFDpOSWp.js","./build/MatchTeamLogo-CAj2bc4L.js","./build/NationalTeams-CAwM6r02.js","./build/OfferForm-TMXwUFf4.js","./build/OffersScreen-C-NK5d8_.js","./build/PlayerCard-nlOELK7N.js","./build/PlayerDashboard-Dy93xGYO.js","./build/PlayerForm-lg-MpvuA.js","./build/PrizeEditor-UcRCizXU.js","./build/PublicServices-CgMUzCkC.js","./build/Ranking-LNDTPtPF.js","./build/ScoutDashboard-B0LmECAT.js","./build/SettingsForm-C7-zfM0X.js","./build/ShoppingScreen-h8iHnxYm.js","./build/SocialHub-qN5AwYzz.js","./build/StatsEditor-Bhti5kvO.js","./build/TacticsEditor-CF4cyldr.js","./build/TeamDashboard--pvurJ9N.js","./build/TeamRequestPlayerModal-CDB7I6Wr.js","./build/TeamStandingsEditor-B1Ym6Gvw.js","./build/TournamentHub-DcSc1Ix-.js","./build/TournamentManagerModal-CFE6yl-U.js","./build/TrainingCenterManager-C237CO7f.js","./build/VisitorDashboard-CFYAh_JJ.js","./build/app-BPrC_tHp.js","./build/app-Bg74ldJB.css","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
