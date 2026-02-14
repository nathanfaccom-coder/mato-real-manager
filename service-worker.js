const CACHE_NAME = 'matoreal-FORCE-ONLINE-v9'; // Mudei para v5 para garantir

// 1. INSTALAÇÃO: Pula a espera e assume o controle AGORA
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// 2. ATIVAÇÃO: Destrói qualquer cache que exista no navegador
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log('DESTRUINDO CACHE:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        })
    );
    // Toma o controle de todas as abas abertas imediatamente
    return self.clients.claim();
});

// 3. BUSCA: Ignora o cache e vai direto para a rede (ONLINE ONLY)
self.addEventListener('fetch', (event) => {
    // Tenta buscar na rede. Se falhar, não retorna nada (o HTML vai mostrar a tela de erro)
    event.respondWith(
        fetch(event.request, {cache: 'no-store'})
            .catch(() => {
                // Se a internet cair, não retorna cache antigo.
                // O navegador vai falhar e o seu script no index.html vai mostrar a tela preta.
                return new Response("Sem conexão", { status: 503, statusText: "Offline" });
            })
    );
});
