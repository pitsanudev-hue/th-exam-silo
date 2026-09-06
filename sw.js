const CACHE_NAME = "quiz-hub-v1";

// ระบบจะแคชไฟล์ทั้งหมดอัตโนมัติเมื่อเปิดครั้งแรก
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./math_all_operators_quiz.html", // เพิ่มรายชื่อไฟล์ที่มีในเครื่องลงตรงนี้
      ]);
    }),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    }),
  );
});
