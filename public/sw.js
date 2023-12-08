// public/sw.js

const cacheName = 'my-app-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/js/main.chunk.js',
        '/assets/js/2.chunk.js',
        '/assets/js/bundle.js',
        '/components/common/Header/Header.tsx',
        '/components/common/Footer/Footer.tsx',
        '/components/common/Loading/Loading.tsx',
        '/components/common/Loading/LoadingData.tsx',
        '/components/common/ScrollElement/Scroll.tsx',
        '/views/HomeViews.tsx',
        '/views/AboutViews.tsx',
        '/views/ShopViews.tsx',
        '/views/BlogViews.tsx',
        '/views/NotFoundViews.tsx',
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