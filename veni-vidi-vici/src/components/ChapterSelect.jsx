// src/components/ChapterSelect.jsx
import { useState } from "react";
import { chapters } from "../data/chapters";

export default function ChapterSelect({ unlockedChapters, onSelectChapter }) {
  const [season, setSeason] = useState(3);

  const katerinaChapters = chapters.filter((c) => c.id < 100);
  const adhirikhtChapters = chapters.filter((c) => c.id >= 100 && c.id < 200);
  const season2Chapters = chapters.filter((c) => c.id >= 200 && c.id < 300);
  const season3Chapters = chapters.filter((c) => c.id >= 300);

  function renderTile(chapter) {
    const isUnlocked = unlockedChapters.includes(chapter.id);
    const displayNumber =
      chapter.id < 100 ? chapter.id :
      chapter.id < 200 ? chapter.id - 100 :
      chapter.id < 300 ? chapter.id - 200 :
      chapter.id - 300;
    return (
      <button
        key={chapter.id}
        className={`chapter-tile ${isUnlocked ? "unlocked" : "locked"}`}
        disabled={!isUnlocked}
        onClick={() => onSelectChapter(chapter.id)}
      >
        <span className="chapter-number">{displayNumber}</span>
        <span className="chapter-title">{isUnlocked ? chapter.title : "Locked"}</span>
      </button>
    );
  }

  return (
    <div className="chapter-select">
      <h1 className="app-title">veni, vidi, vici</h1>

      <select
        className="season-dropdown"
        value={season}
        onChange={(e) => setSeason(Number(e.target.value))}
      >
        <option value={3}>Season 3</option>
        <option value={2}>Season 2</option>
        <option value={1}>Season 1</option>
      </select>

      {season === 3 && (
        <div className="chapter-grid">{season3Chapters.map(renderTile)}</div>
      )}
      {season === 2 && (
        <div className="chapter-grid">{season2Chapters.map(renderTile)}</div>
      )}
      {season === 1 && (
        <div className="thread-columns">
          <div className="thread-column">
            <h2 className="thread-label">Katerina</h2>
            <div className="chapter-grid">{katerinaChapters.map(renderTile)}</div>
          </div>
          <div className="thread-column">
            <h2 className="thread-label">Adhirikht</h2>
            <div className="chapter-grid">{adhirikhtChapters.map(renderTile)}</div>
          </div>
        </div>
      )}
    </div>
  );
}