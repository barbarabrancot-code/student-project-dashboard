const CACHE = 'dashboard-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/student-project-dashboard/'])));
  self.skipWaiting();
});

self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
