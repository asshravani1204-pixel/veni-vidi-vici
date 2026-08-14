// src/components/ChapterReader.jsx
import { useState } from "react";
import { chapters } from "../data/chapters";
import Puzzle from "./puzzles/Puzzle";

export default function ChapterReader({ chapterId, onFinishChapter, onBack }) {
  const chapter = chapters.find((c) => c.id === chapterId);
  const [solvedPuzzles, setSolvedPuzzles] = useState({});

  if (!chapter) return <div>Chapter not found.</div>;

  function markSolved(sectionIndex) {
    setSolvedPuzzles((prev) => ({ ...prev, [sectionIndex]: true }));
  }

  const allPuzzlesSolved = chapter.sections.every(
    (section, index) => !section.puzzle || solvedPuzzles[index]
  );

  return (
    <div className="chapter-reader">
      <button className="back-button" onClick={onBack}>← Chapters</button>
      <h2 className="reader-title">{chapter.title}</h2>

      {chapter.sections.map((section, index) => (
        <div key={index} className={`section narrator-${section.narrator}`}>
          <p className="narrator-label">
            {section.narrator === "katerina" ? "KATERINA" : "ADHIRIKHT"}
          </p>
          {section.text.map((paragraph, pIndex) => (
            <p key={pIndex} className="story-paragraph">{paragraph}</p>
          ))}
          {section.puzzle && (
            <Puzzle puzzle={section.puzzle} onSolved={() => markSolved(index)} />
          )}
        </div>
      ))}

      <button
        className="finish-button"
        disabled={!allPuzzlesSolved}
        onClick={() => onFinishChapter(chapter.id)}
      >
        {allPuzzlesSolved ? "Continue" : "Solve the puzzle to continue"}
      </button>
    </div>
  );
}