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
        '../src/assets/images/logo-01.png.webp',
        '../src/assets/images/logo-02.png.webp',
        '../srcindex.css',
        '../src/App.tsx',
        // '/components/common/Header/Header.tsx',
        // '/components/common/Footer/Footer.tsx',
        // '/components/common/Loading/Loading.tsx',
        // '/components/common/Loading/LoadingBlog.tsx',
        // '/components/common/Loading/LoadingProduct.tsx',
        // '/components/common/ScrollElement/Scroll.tsx',
        '/views/HomeViews.tsx',
        '/views/AboutViews.tsx',
        '/views/ShopViews.tsx',
        '/views/BlogViews.tsx',
        '/views/NotFoundViews.tsx',
        '../src/utils/lazyload-image.tsx',
        '../src/utils/capitalize.ts',
        '../src/utils/format-date.ts',
        '../src/utils/providesList.ts',
        '../src/utils/scroll-elements.ts',
        '../src/utils/validate.tsx',
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
