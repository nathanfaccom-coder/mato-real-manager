const CACHE_NAME = 'matoreal-online-v4'; // Mudei a versão para forçar a atualização

// 1. Instalação: Força o novo motor a assumir imediatamente
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// 2. Ativação: LIMPEZA TOTAL (Apaga qualquer versão antiga salva no celular)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log('Apagando cache antigo:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        })
    );
    self.clients.claim();
});

// 3. Busca: MODO ONLINE APENAS
// Não salva nada. Se tiver internet, carrega. Se não, dá erro (que seu HTML vai tratar).
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});
