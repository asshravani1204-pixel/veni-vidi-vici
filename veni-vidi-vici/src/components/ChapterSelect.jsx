// src/components/ChapterSelect.jsx
import { chapters } from "../data/chapters";

export default function ChapterSelect({ unlockedChapters, onSelectChapter }) {
  const katerinaChapters = chapters.filter((c) => c.id < 100);
  const adhirikhtChapters = chapters.filter((c) => c.id >= 100);

  function renderColumn(list) {
    return list.map((chapter) => {
      const isUnlocked = unlockedChapters.includes(chapter.id);
      return (
        <button
          key={chapter.id}
          className={`chapter-tile ${isUnlocked ? "unlocked" : "locked"}`}
          disabled={!isUnlocked}
          onClick={() => onSelectChapter(chapter.id)}
        >
          <span className="chapter-number">{chapter.id < 100 ? chapter.id : chapter.id - 100}</span>
          <span className="chapter-title">
            {isUnlocked ? chapter.title : "Locked"}
          </span>
        </button>
      );
    });
  }

  return (
    <div className="chapter-select">
      <h1 className="app-title">veni, vidi, vici</h1>
      <div className="thread-columns">
        <div className="thread-column">
          <h2 className="thread-label">Katerina</h2>
          <div className="chapter-grid">{renderColumn(katerinaChapters)}</div>
        </div>
        <div className="thread-column">
          <h2 className="thread-label">Adhirikht</h2>
          <div className="chapter-grid">{renderColumn(adhirikhtChapters)}</div>
        </div>
      </div>
    </div>
  );
}