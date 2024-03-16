const cacheName = 'CozaStore-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then(async (cache) => {
      await cache.addAll(['/', '/index.html', '/manifest.json']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
