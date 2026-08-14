// src/App.jsx
import { useState, useEffect } from "react";
import ChapterSelect from "./components/ChapterSelect";
import ChapterReader from "./components/ChapterReader";
import { loadProgress, unlockChapter } from "./data/progress";
import "./App.css";

function App() {
  const [progress, setProgress] = useState(loadProgress());
  const [currentChapter, setCurrentChapter] = useState(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  function handleSelectChapter(chapterId) {
    setCurrentChapter(chapterId);
  }

  function handleFinishChapter(chapterId) {
    const nextId = chapterId + 1;
    const updated = unlockChapter(nextId);
    setProgress(updated);
    setCurrentChapter(null);
  }

  function handleBack() {
    setCurrentChapter(null);
  }

  return (
    <div className="app">
      {currentChapter === null ? (
        <ChapterSelect
          unlockedChapters={progress.unlockedChapters}
          onSelectChapter={handleSelectChapter}
        />
      ) : (
        <ChapterReader
          chapterId={currentChapter}
          onFinishChapter={handleFinishChapter}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;