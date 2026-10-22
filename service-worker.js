const CACHE_NAME = 'matoreal-static-bece2a14dfaf';
const PRECACHE = ["./index.html","./build/AdminPanel-CKhE1RfI.js","./build/AdminPlayerModal-CKAfHBxX.js","./build/AssistantDashboard-han-UZ5m.js","./build/AttributeGrid-C8kWDFhy.js","./build/AwardsManager-CT13yMtK.js","./build/CoachDashboard-DhbuRMtf.js","./build/CompanyDashboard-BsKJxyyh.js","./build/DoctorDashboard-C7C6QMdB.js","./build/LeagueTable-CCVE6jk0.js","./build/Market-C_z7Pcq_.js","./build/MatchCenter-CPkyM8m9.js","./build/MatchManagerForm-D0Dztfxl.js","./build/MatchPerformanceForm-oYJR5W8I.js","./build/MatchTeamLogo-BRfOIr8B.js","./build/NationalTeams-Bt-pOfn7.js","./build/OfferForm-DQWIt0k9.js","./build/OffersScreen-DIQsv0Tt.js","./build/PlayerCard-B7FaPo53.js","./build/PlayerDashboard-3RxV8L_f.js","./build/PlayerForm-Bxc1VWGv.js","./build/PrizeEditor-CQFVntjU.js","./build/PublicServices-BUSSo8gI.js","./build/Ranking-CjY-t3GU.js","./build/ScoutDashboard-D5KYu5Xf.js","./build/SettingsForm-DNov_ALd.js","./build/ShoppingScreen-1fRlpgok.js","./build/SocialHub-CU1ixf8o.js","./build/StatsEditor-DHUJmbs8.js","./build/TeamDashboard-B9wVCYc6.js","./build/TeamRequestPlayerModal-BFAxw7_D.js","./build/TeamStandingsEditor-BY8lmvUN.js","./build/TournamentHub-Dc4Uy2ta.js","./build/TournamentManagerModal-CcJFEUT4.js","./build/TrainingCenterManager-IiPP86Pb.js","./build/VisitorDashboard-BGscyy_k.js","./build/app-C9R-NKtF.css","./build/app-Zu6-kATc.js","./build/firebase-Bwd-Pxfj.js","./build/getProdCost-BOBAoKhR.js","./build/getRecommendedPrice-J9S5cFrD.js","./build/react-nf7bT_Uh.js","./assets/icon.png","./assets/img1.webp","./assets/img2.jpg","./assets/img3.jpg","./scripts/pwa.js"];
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
