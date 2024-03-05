const cacheName = 'CozaStore-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return caches
        .keys()
        .then((keys) => {
          return Promise.all(
            keys
              .filter((key) => key !== cacheName)
              .map((key) => caches.delete(key))
          );
        })
        .then(() => {
          return cache.addAll(['/', '/index.html', '/manifest.json']);
        });
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
