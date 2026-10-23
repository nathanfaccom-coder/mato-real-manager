if ('serviceWorker' in navigator && location.protocol !== 'file:' && !['localhost', '127.0.0.1'].includes(location.hostname)) {
    let registration;
    const hadController = Boolean(navigator.serviceWorker.controller);
    function offerUpdate() {
        if (document.getElementById('game-update-notice')) return;
        const button = document.createElement('button');
        button.id = 'game-update-notice';
        button.textContent = 'Nova versão disponível — toque para atualizar';
        button.style.cssText = 'position:fixed;bottom:80px;left:5%;width:90%;z-index:100000;padding:16px;border:0;border-radius:8px;background:#00d883;color:#101820;font-weight:bold';
        button.onclick = () => location.assign(new URL('./update.html', location.href).href);
        document.body.appendChild(button);
    }
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController) offerUpdate(); });
    const check = () => { if (navigator.onLine && registration) registration.update().catch(() => {}); };
    window.addEventListener('load', async () => {
        try {
            registration = await navigator.serviceWorker.register('./service-worker.js', {scope: './', updateViaCache: 'none'});
            if (registration.waiting) offerUpdate();
            registration.addEventListener('updatefound', () => {
                const worker = registration.installing;
                worker?.addEventListener('statechange', () => {
                    if (worker.state === 'installed' && hadController) offerUpdate();
                });
            });
            check();
        } catch (error) { console.warn('Instalação offline indisponível:', error.message); }
    });
    window.addEventListener('online', check);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check(); });
}
function checkInternet() {
    const blocker = document.getElementById('offline-blocker');
    if (blocker) blocker.style.display = navigator.onLine ? 'none' : 'flex';
}
window.addEventListener('offline', checkInternet);
window.addEventListener('online', checkInternet);
checkInternet();
const isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
const isStandalone = navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
const installPrompt = document.getElementById('ios-install-prompt');
if (isIos && !isStandalone && installPrompt) installPrompt.style.display = 'block';
