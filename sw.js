const CACHE_NAME = 'iot-rumah-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Masukkan nama icon Anda di sini agar bisa di-cache
  // './icon-192.png',
  // './icon-512.png'
];

// Install Service Worker dan simpan file UI ke Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercept request (Mengambil dari cache atau internet)
self.addEventListener('fetch', event => {
  // PENTING: Jangan cache request ke server Blynk agar data selalu real-time
  if (event.request.url.includes('blynk.cloud')) {
    return; // Biarkan request diteruskan ke internet
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Kembalikan file dari cache jika ada, jika tidak ambil dari internet
        return response || fetch(event.request);
      })
  );
});