# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A zero-build, static PWA ("Exam Silo") hosting self-contained HTML practice quizzes/exams for Thai primary-school students. All UI text is Thai (`lang="th"`). There is no bundler, package.json, linter, or test suite — verification means opening pages in a browser.

- **Local dev**: served by XAMPP Apache at `http://localhost/exam_silo/`. Must use http(s), not `file://` (service worker and pdf.js ES modules won't load from file://).
- **Publishing**: `git push` to `main` on GitHub (`pitsanudev-hue/th-exam-silo`). Note: the origin remote URL embeds a GitHub PAT — never copy it into files, logs, or docs.

## Architecture

### Quiz discovery (the non-obvious part)

`config.json` is the registry of quizzes: an array of `{ name, file, category }` where `name` is the Thai display name, `file` is the filename in `quizzes/`, and `category` is the subject (คณิตศาสตร์ / ภาษาอังกฤษ / วิทยาการคำนวณ). `index.html` fetches it and renders cards grouped by category, ordered by the category's first appearance in the file. A quiz that is not registered in `config.json` does not appear on the hub. If the fetch fails (first visit, never cached), `index.html` falls back to listing `.html` URLs found in the service-worker cache as a flat offline list.

### Quiz archetypes (`quizzes/`)

Each quiz is a **single self-contained HTML file** (inline `<style>` + `<script>`); shared assets are referenced relatively as `../assets/...`.

1. **Generated drills** (`quick_math_*`, `equation_math`, `factor_lcd_gcd`, `pattern_math`, `problem_resolve_math`) — vanilla JS randomly generates problems at load; fully offline.
2. **PDF exams** (`teset_*`, `nat_en_67_exam`) — Tailwind via CDN (needs internet), an embedded `ANSWER_KEY` object in the page (values may be arrays for multi-answer items), a digital answer sheet, and pdf.js rendering of the real exam PDF side-by-side. pdf.js is the vendored local build in `assets/pdfjs/build/` (loaded as ES module, worker at `pdf.worker.mjs`); exam and answer-key PDFs live in `assets/pdf/`.
3. **Coding games** (`coding_flow1-4`) — standalone drag-and-drop ordering games; don't record stats.

### Stats

`assets/stats.js` defines the global `ExamSiloStats`, backed by localStorage key `examSiloStats` (per-device). Quizzes call `ExamSiloStats.recordQuizResult({ quizFile, quizName, type: "drill"|"exam", timeSeconds, score, total })`; `index.html` shows a summary banner and `stats.html` the full history.

### Offline PWA (`sw.js`)

Cache-first fetch handler, but **only the install-time `addAll` list populates the cache** — runtime fetches are never cached. Consequence when adding a quiz:

1. Create `quizzes/<name>.html` (lowercase, hyphen/underscore separated).
2. Register it in `config.json` (`name`, `file`, `category`) — otherwise it never shows on the hub.
3. Add it to the `addAll` list in `sw.js` **and** bump `CACHE_NAME` (`quiz-hub-v6` → `v7`) so existing clients re-install and pick it up offline.
4. Add related PDFs to `assets/pdf/` if it's a PDF exam.
5. Commit and push.
