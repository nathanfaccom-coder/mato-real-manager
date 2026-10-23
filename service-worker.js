const CACHE_NAME = 'matoreal-static-3f9a4e3a3f72';
const PRECACHE = ["./index.html","./build/AdminPanel-BISJFSDA.js","./build/AdminPlayerModal-C7m47b9C.js","./build/AssistantDashboard-DH1D_X51.js","./build/AttributeGrid-DqirA_N1.js","./build/AwardsManager-DQeFgRB8.js","./build/Broadcast-DwZ-MLB1.js","./build/CoachDashboard-DY9T9__B.js","./build/CompanyDashboard-iSIvX6jZ.js","./build/DoctorDashboard-wKCbwrlr.js","./build/LeagueTable-DE_qT3r-.js","./build/Market-C6QctcU_.js","./build/MatchCenter-DXApAogt.js","./build/MatchManagerForm-C-hpu_NY.js","./build/MatchPerformanceForm-DTOUUExn.js","./build/MatchTeamLogo-CnJdMjG4.js","./build/NationalTeams-xav28Oox.js","./build/OfferForm-C62FUp_m.js","./build/OffersScreen-DvrApEPe.js","./build/PlayerCard-BIaMe19d.js","./build/PlayerDashboard-D6zKj-pe.js","./build/PlayerForm-D8N2apLO.js","./build/PrizeEditor-DTjEuwJY.js","./build/PublicServices-DLSQIy2v.js","./build/Ranking-CAr3S7sJ.js","./build/ScoutDashboard-nkgaA9bH.js","./build/SettingsForm-cqdj7iiZ.js","./build/ShoppingScreen-CwpDNNFT.js","./build/SocialHub-Bz6CkI47.js","./build/StatsEditor-ClQC93EO.js","./build/TeamDashboard-CtxIKqm7.js","./build/TeamRequestPlayerModal-DWbSBdqU.js","./build/TeamStandingsEditor-Dswjpycg.js","./build/TournamentHub-5skzN8O6.js","./build/TournamentManagerModal-3igF9lMa.js","./build/TrainingCenterManager-4-IXlM0Y.js","./build/VisitorDashboard-DAy56lSU.js","./build/app-BfjhsX88.js","./build/app-Bg74ldJB.css","./build/firebase-927kk_Ef.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
