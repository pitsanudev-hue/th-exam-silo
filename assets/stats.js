/**
 * ExamSiloStats
 * ไลบรารีเล็กๆ สำหรับบันทึกและอ่านสถิติการทำแบบฝึกหัด/ข้อสอบ
 * เก็บข้อมูลไว้ใน localStorage (คีย์ "examSiloStats") ใช้ร่วมกันทุกหน้าในโปรเจกต์
 * (index.html, stats.html และไฟล์ทั้งหมดในโฟลเดอร์ quizzes/)
 */
(function (global) {
  const STORAGE_KEY = "examSiloStats";

  function getAllStats() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn("ไม่สามารถอ่านสถิติจาก localStorage ได้:", err);
      return [];
    }
  }

  function saveAllStats(stats) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
      return true;
    } catch (err) {
      console.warn("ไม่สามารถบันทึกสถิติลง localStorage ได้:", err);
      return false;
    }
  }

  /**
   * บันทึกผลการทำแบบฝึกหัด/ข้อสอบ 1 ครั้ง
   * @param {Object} result
   * @param {string} result.quizFile  ชื่อไฟล์ เช่น "quick_math_add_sub.html"
   * @param {string} result.quizName  ชื่อที่แสดงผล (มักใช้ document.title)
   * @param {"drill"|"exam"} [result.type]  ประเภทแบบฝึกหัด
   * @param {number|null} result.timeSeconds  เวลาที่ใช้ทำ (วินาที)
   * @param {number|null} [result.score]  คะแนนที่ได้ (ถ้ามี)
   * @param {number|null} [result.total]  คะแนนเต็ม/จำนวนข้อทั้งหมด (ถ้ามี)
   * @returns {Object|null} รายการที่บันทึก หรือ null ถ้าข้อมูลไม่ครบ
   */
  function recordQuizResult(result) {
    if (!result || !result.quizFile) return null;

    const entry = {
      quizFile: result.quizFile,
      quizName: result.quizName || result.quizFile,
      type: result.type === "exam" ? "exam" : "drill",
      date: new Date().toISOString(),
      timeSeconds:
        typeof result.timeSeconds === "number" && !isNaN(result.timeSeconds)
          ? Math.max(0, Math.round(result.timeSeconds))
          : null,
      score: typeof result.score === "number" && !isNaN(result.score) ? result.score : null,
      total: typeof result.total === "number" && !isNaN(result.total) ? result.total : null,
    };

    const stats = getAllStats();
    stats.push(entry);
    saveAllStats(stats);
    return entry;
  }

  function clearAllStats() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (err) {
      console.warn("ไม่สามารถล้างสถิติได้:", err);
      return false;
    }
  }

  function formatDuration(totalSeconds) {
    if (totalSeconds == null || isNaN(totalSeconds)) return "-";
    const s = Math.max(0, Math.round(totalSeconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) {
      return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function formatDate(isoString) {
    try {
      const d = new Date(isoString);
      return d.toLocaleString("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch (err) {
      return isoString;
    }
  }

  global.ExamSiloStats = {
    STORAGE_KEY,
    getAllStats,
    recordQuizResult,
    clearAllStats,
    formatDuration,
    formatDate,
  };
})(window);
