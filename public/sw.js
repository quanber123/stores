const cacheName = 'CozaStore-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/js/main.chunk.js',
        '/assets/js/2.chunk.js',
        '/assets/js/bundle.js',
        'assets/images/logo-01.png.webp',
        'assets/images/logo-02.png.webp',
        // Thêm các thành phần khác mà bạn muốn lưu trữ
        // Cũng nhớ thêm hình ảnh, font, và các tài nguyên khác
      ]);
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
