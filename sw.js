/* Service worker: guarda tudo no aparelho para funcionar 100% offline.
   Para publicar uma nova versão, troque o número em CACHE. */
const CACHE = 'mao-elegante-v3';
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./assets/hand.png", "./assets/sleeve.png", "./assets/cards/011.jpg", "./assets/cards/012.jpg", "./assets/cards/013.jpg", "./assets/cards/014.jpg", "./assets/cards/021.jpg", "./assets/cards/022.jpg", "./assets/cards/023.jpg", "./assets/cards/024.jpg", "./assets/cards/031.jpg", "./assets/cards/032.jpg", "./assets/cards/033.jpg", "./assets/cards/034.jpg", "./assets/cards/041.jpg", "./assets/cards/042.jpg", "./assets/cards/043.jpg", "./assets/cards/044.jpg", "./assets/cards/051.jpg", "./assets/cards/052.jpg", "./assets/cards/053.jpg", "./assets/cards/054.jpg", "./assets/cards/061.jpg", "./assets/cards/062.jpg", "./assets/cards/063.jpg", "./assets/cards/064.jpg", "./assets/cards/071.jpg", "./assets/cards/072.jpg", "./assets/cards/073.jpg", "./assets/cards/074.jpg", "./assets/cards/081.jpg", "./assets/cards/082.jpg", "./assets/cards/083.jpg", "./assets/cards/084.jpg", "./assets/cards/091.jpg", "./assets/cards/092.jpg", "./assets/cards/093.jpg", "./assets/cards/094.jpg", "./assets/cards/101.jpg", "./assets/cards/102.jpg", "./assets/cards/103.jpg", "./assets/cards/104.jpg", "./assets/cards/111.jpg", "./assets/cards/112.jpg", "./assets/cards/113.jpg", "./assets/cards/114.jpg", "./assets/cards/121.jpg", "./assets/cards/122.jpg", "./assets/cards/123.jpg", "./assets/cards/124.jpg", "./assets/cards/131.jpg", "./assets/cards/132.jpg", "./assets/cards/133.jpg", "./assets/cards/134.jpg"];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(cached => {
      const net = fetch(e.request).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      }).catch(() => cached || caches.match('./index.html'));
      return cached || net;   // abre do cache (rápido/offline) e atualiza em segundo plano
    })
  );
});
