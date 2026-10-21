if ('serviceWorker' in navigator && location.protocol !== 'file:' && !['localhost', '127.0.0.1'].includes(location.hostname)) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js', { scope: './' })
            .catch(error => console.warn('Instalação offline indisponível:', error.message));
    });
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
