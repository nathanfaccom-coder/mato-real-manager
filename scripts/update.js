const updateButton = document.getElementById('update-game');
updateButton.addEventListener('click', async () => {
  const status = document.getElementById('update-status');
  updateButton.disabled = true;
  try {
    if (!navigator.onLine) throw new Error('Conecte-se à internet e tente novamente.');
    const base = new URL('./', location.href);
    const target = new URL('index.html', base);
    target.searchParams.set('updated', Date.now());
    const response = await fetch(target, {cache: 'no-store'});
    if (!response.ok) throw new Error('O servidor não respondeu. Tente novamente em instantes.');
    status.textContent = 'Atualizando os arquivos do jogo…';
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.filter(r => r.scope === base.href).map(r => r.unregister()));
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k.startsWith('matoreal-')).map(k => caches.delete(k)));
    }
    location.replace(target.href);
  } catch (error) {
    status.textContent = error.message;
    updateButton.disabled = false;
  }
});
