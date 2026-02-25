if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('pwa/service-worker.js', { scope: './' })
        .then(registration => {
            registration.update(); 
            console.log('App Online Registrado');
        });
    });
    
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });
}

function checkInternet() {
    const blocker = document.getElementById('offline-blocker');
    if (!navigator.onLine) {
        blocker.style.display = 'flex';
    } else {
        blocker.style.display = 'none';
    }
}
window.addEventListener('offline', checkInternet);
window.addEventListener('online', checkInternet);
checkInternet();

const isIos = () => /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
if (isIos() && !isInStandaloneMode()) {
    document.getElementById('ios-install-prompt').style.display = 'block';
}
