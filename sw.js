/**
 * SERVICE WORKER - Aventura del Saber 2º Primaria
 * Permite que el juego se instale como PWA y funcione 100% sin conexión a internet (Offline)
 */

const CACHE_NAME = 'aventura-primaria-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './sound.js',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instalación: cachear todos los archivos locales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Cacheando archivos de la app...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activación: limpiar cachés antiguas si hubiera una versión nueva
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Eliminando caché antigua:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptar peticiones de red: responder desde caché si estamos sin internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cachear dinámicamente recursos de CDN (como Tailwind) si la petición fue exitosa
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Si no hay red y la petición era de página, devolver index.html
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
