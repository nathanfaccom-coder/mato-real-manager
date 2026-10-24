// 2.9.1: invalidate stale offline bundles after the last deployed entrypoint was truncated.
const CACHE_NAME = 'matoreal-static-1d7671b39e39';
const PRECACHE = ["./index.html","./build/AdminPanel-RgMBv1jA.js","./build/AdminPlayerModal-_99ZP-mj.js","./build/AssistantDashboard-B2vofOJ4.js","./build/AttributeGrid-CzpDKMuJ.js","./build/AwardsManager-BWPe4Rha.js","./build/Broadcast-BDgEaamF.js","./build/CoachDashboard-DhBASlnO.js","./build/CompanyDashboard-DZDlbitK.js","./build/DoctorDashboard-BP465g8y.js","./build/LeagueTable-C2WK8vu_.js","./build/Market-Bc-8UdT7.js","./build/MatchCenter-BIBoh7pY.js","./build/MatchManagerForm-BISlEDog.js","./build/MatchPerformanceForm-D61UsLkh.js","./build/MatchTeamLogo-BoNFmmvZ.js","./build/NationalTeams-DJGdZkJb.js","./build/OfferForm-NK5Y3x95.js","./build/OffersScreen-Dz7dwdmn.js","./build/PlayerCard-Dy19shJc.js","./build/PlayerDashboard-CBywMtgD.js","./build/PlayerForm-C-ief693.js","./build/PrizeEditor-BLNVX530.js","./build/PublicServices-CKffE5pK.js","./build/Ranking-4qx77OdC.js","./build/ScoutDashboard-Dsr4554t.js","./build/SettingsForm-BWSGtTwF.js","./build/ShoppingScreen-DtBMsOxT.js","./build/SocialHub-BoN8gs9x.js","./build/StatsEditor-fEnb5w63.js","./build/TacticsEditor-D8CWbzTb.js","./build/TeamDashboard-C4kMWAnV.js","./build/TeamRequestPlayerModal-Bf675kkU.js","./build/TeamStandingsEditor-DZWtQRTD.js","./build/TournamentHub-D5S1_7GC.js","./build/TournamentManagerModal-5SpnPHeJ.js","./build/TrainingCenterManager-CV0Ojvp8.js","./build/VisitorDashboard-Cybhgsrz.js","./build/app-Bg74ldJB.css","./build/app-BzGtlgc4.js","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./build/rules-CI3EvBDW.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
