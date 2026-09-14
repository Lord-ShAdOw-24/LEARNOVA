const CACHE_NAME = "learnova-pwa-v4";
const APP_SHELL = [
  "./","./index.html","./style.css","./animations.css","./app.js","./data.js","./owl.js",
  "./logo-icon.png","./logo-transparent.png",
  "./icon-32.png","./icon-180.png","./icon-192.png","./icon-512.png","./manifest.json",
  "./ceo.jpg","./cofounder-2.jpg","./cofounder-3.jpg","./cofounder-4.jpg"
];
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(APP_SHELL.map(url => cache.add(url).catch(() => {})))
    )
  );
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if(event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if(url.origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => {
    const network = fetch(event.request).then(response => {
      if(response && response.ok){
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => cached);
    return cached || network;
  }));
});
