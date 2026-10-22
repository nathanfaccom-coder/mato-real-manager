const CACHE_NAME = 'matoreal-static-8489868f9ad7';
const PRECACHE = ["./index.html","./build/AdminPanel-CHIcofzG.js","./build/AdminPlayerModal-BawyjI1N.js","./build/AssistantDashboard-CkoAw5rG.js","./build/AttributeGrid-VejZaCLs.js","./build/AwardsManager-BNgQRNPs.js","./build/CoachDashboard-DtunQuHV.js","./build/CompanyDashboard-gGhtbQFn.js","./build/DoctorDashboard-DrvgZe9_.js","./build/LeagueTable-WJcGzbXc.js","./build/Market-DbLkaGMR.js","./build/MatchCenter-jDYpT1IH.js","./build/MatchManagerForm-DC0h6oQO.js","./build/MatchPerformanceForm-8ie3Z5Xo.js","./build/MatchTeamLogo-Bgauy69v.js","./build/NationalTeams-ClbCXcTN.js","./build/OfferForm-Ce1VPRl9.js","./build/OffersScreen-DErpzkkW.js","./build/PlayerCard-B3UGOsfz.js","./build/PlayerDashboard-B5Oabpsh.js","./build/PlayerForm-qICQdfo3.js","./build/PrizeEditor-DquQq244.js","./build/PublicServices-CgvTN3po.js","./build/Ranking-Cp5Sbr8f.js","./build/ScoutDashboard-B2wAy9OL.js","./build/SettingsForm-BVtF_-Wt.js","./build/ShoppingScreen-jjseErR1.js","./build/SocialHub-DfOvaTat.js","./build/StatsEditor-vbBmLXya.js","./build/TeamDashboard-D7xpA-NH.js","./build/TeamRequestPlayerModal-CBv6ft0q.js","./build/TeamStandingsEditor-BbVL_Ksu.js","./build/TournamentHub-DPI8PCh6.js","./build/TournamentManagerModal-DlOUXei6.js","./build/TrainingCenterManager-DD5oxLc5.js","./build/VisitorDashboard-DV-fJGAS.js","./build/app-C9R-NKtF.css","./build/app-CpjujPni.js","./build/firebase-Bwd-Pxfj.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
