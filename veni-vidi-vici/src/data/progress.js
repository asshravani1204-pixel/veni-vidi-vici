// src/data/progress.js

const STORAGE_KEY = "veni-vidi-vici-progress";

export function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return { unlockedChapters: [1, 101, 201, 301], lastRead: 1 };
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function unlockChapter(chapterId) {
  const progress = loadProgress();
  if (!progress.unlockedChapters.includes(chapterId)) {
    progress.unlockedChapters.push(chapterId);
  }
  progress.lastRead = chapterId;
  saveProgress(progress);
  return progress;
}