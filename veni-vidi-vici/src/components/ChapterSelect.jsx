// src/components/ChapterSelect.jsx
import { chapters } from "../data/chapters";

export default function ChapterSelect({ unlockedChapters, onSelectChapter }) {
  return (
    <div className="chapter-select">
      <h1 className="app-title">veni, vidi, vici</h1>
      <div className="chapter-grid">
        {chapters.map((chapter) => {
          const isUnlocked = unlockedChapters.includes(chapter.id);
          return (
            <button
              key={chapter.id}
              className={`chapter-tile ${isUnlocked ? "unlocked" : "locked"}`}
              disabled={!isUnlocked}
              onClick={() => onSelectChapter(chapter.id)}
            >
              <span className="chapter-number">{chapter.id}</span>
              <span className="chapter-title">
                {isUnlocked ? chapter.title : "Locked"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}