const CACHE_NAME = "quiz-hub-v3";

// ระบบจะแคชไฟล์ทั้งหมดอัตโนมัติเมื่อเปิดครั้งแรก
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./stats.html",
        "./manifest.json",
        "./assets/stats.js",
        "./quizzes/quick_math_add_sub.html",
        "./quizzes/quick_math_pop.html",
        "./quizzes/quick_math_mult_div.html",
        "./quizzes/quick_math_all.html",
        "./quizzes/quick_math_advance_all.html",
        "./quizzes/equation_math.html",
        "./quizzes/factor_lcd_gcd.html",
        "./quizzes/pattern_math.html",
        "./quizzes/problem_resolve_math.html",
        "./quizzes/teset_2025_exam.html",
        "./quizzes/teset_2025_G3_exam.html",
        "./quizzes/tsb_2023_G1.html",
      ]);
    }),
  );
});

// ลบแคชเวอร์ชันเก่าเมื่อ service worker ใหม่เข้าทำงาน
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    }),
  );
});
