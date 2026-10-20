const CACHE_NAME = "quiz-hub-v9";

// ระบบจะแคชไฟล์ทั้งหมดอัตโนมัติเมื่อเปิดครั้งแรก
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./stats.html",
        "./manifest.json",
        "./config.json",
        "./favicon.ico",
        "./assets/stats.js",
        "./assets/icons/icon-16.png",
        "./assets/icons/icon-32.png",
        "./assets/icons/icon-48.png",
        "./assets/icons/icon-180.png",
        "./assets/icons/icon-192.png",
        "./assets/icons/icon-512.png",
        "./assets/icons/apple-touch-icon.png",
        "./quizzes/math/quick_math_add_sub.html",
        "./quizzes/math/quick_math_mult_div.html",
        "./quizzes/math/quick_math_all.html",
        "./quizzes/math/quick_math_advance_all.html",
        "./quizzes/math/equation_math.html",
        "./quizzes/math/factor_lcd_gcd.html",
        "./quizzes/math/pattern_math.html",
        "./quizzes/math/problem_resolve_math.html",
        "./quizzes/eng/teset_a_2024_exam.html",
        "./quizzes/eng/teset_b_2025_exam.html",
        "./quizzes/eng/teset_b_2026_exam.html",
        "./quizzes/eng/teset_a_2025_exam.html",
        "./quizzes/eng/tsb_a_2023_exam.html",
        "./quizzes/eng/tsb_b_2024_exam.html",
        "./quizzes/eng/tsb_b_2025_exam.html",
        "./quizzes/eng/tsb_b_2026_exam.html",
        "./quizzes/eng/nat_en_65_exam.html",
        "./quizzes/eng/nat_en_66_exam.html",
        "./quizzes/eng/nat_en_67_exam.html",
        "./quizzes/eng/nat_en_68_exam.html",
        "./quizzes/eng/grammar_krudew.html",
        "./quizzes/code/coding_flow1.html",
        "./quizzes/code/coding_flow2.html",
        "./quizzes/code/coding_flow3.html",
        "./quizzes/code/coding_flow4.html",
        "./quizzes/sci/nat_sci_64_exam.html",
        "./quizzes/sci/nat_sci_65_exam.html",
        "./quizzes/sci/nat_sci_66_exam.html",
        "./quizzes/sci/nat_sci_67_exam.html",
        "./quizzes/sci/nat_sci_68_exam.html",
        "./quizzes/math_nat/nat_math_64_exam.html",
        "./quizzes/math_nat/nat_math_65_exam.html",
        "./quizzes/math_nat/nat_math_66_exam.html",
        "./quizzes/math_nat/nat_math_67_exam.html",
        "./quizzes/math_nat/nat_math_68_exam.html",
        "./assets/pdf/eng/Nat_En_2565.pdf",
        "./assets/pdf/eng/Nat_En_2566.pdf",
        "./assets/pdf/eng/Nat_En_2567.pdf",
        "./assets/pdf/eng/Nat_En_2568.pdf",                        
        "./assets/pdf/eng/TESET1_2024_.pdf",
        "./assets/pdf/eng/TESET1_2025_.pdf",
        "./assets/pdf/eng/TESET2_2025_.pdf",
        "./assets/pdf/eng/TESET2_2026_.pdf",
        "./assets/pdf/eng/TSB1_2023_.pdf",
        "./assets/pdf/eng/TSB2_2024_.pdf",
        "./assets/pdf/eng/TSB2_2025_.pdf",
        "./assets/pdf/eng/TSB2_2026_.pdf",
        "./assets/pdf/sci/Nat_Sci_2564.pdf",
        "./assets/pdf/sci/Nat_Sci_2565.pdf",
        "./assets/pdf/sci/Nat_Sci_2566.pdf",
        "./assets/pdf/sci/Nat_Sci_2567.pdf",
        "./assets/pdf/sci/Nat_Sci_2568.pdf",
        "./assets/pdf/math/Nat_Ma_2564.pdf",
        "./assets/pdf/math/Nat_Ma_2565.pdf",
        "./assets/pdf/math/Nat_Ma_2566.pdf",
        "./assets/pdf/math/Nat_Ma_2567.pdf",
        "./assets/pdf/math/Nat_Ma_2568.pdf",
        "./assets/pdfjs/build/pdf.mjs",
        "./assets/pdfjs/build/pdf.worker.mjs",
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
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
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
