// install event
self.addEventListener("install", () => {
  // console.log("[Service Worker] installed",e);
});

// activate event
self.addEventListener("activate", () => {
  // console.log("[Service Worker] actived", e);
});

// fetch event
self.addEventListener("fetch", () => {
  // console.log("[Service Worker] fetched resource " + e.request.url);
});