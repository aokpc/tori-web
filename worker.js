const cacheOnlyPaths = ["/image/","/3d/","/assets/"]; // このパス以下のもののみキャッシュ
const CACHE_NAME = "kite-cache-v1";
const urlsToCache = [
    "/image/background.jpeg",
    "/image/logo.png",
];

// インストールイベント: キャッシュにリソースを追加
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

// フェッチイベント: キャッシュからリソースを提供
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // キャッシュが見つかった場合はそれを返す
            if (response) {
                return response;
            }
            // キャッシュがない場合はネットワークから取得
            return fetch(event.request).then((networkResponse) => {
                // ネットワークから取得したリソースをキャッシュに保存
                if (cacheOnlyPaths.some((path) => event.request.url.includes(path))&&networkResponse.ok) {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }
                return networkResponse;
            });
        })
    );
});

// アクティベートイベント: 古いキャッシュを削除
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});