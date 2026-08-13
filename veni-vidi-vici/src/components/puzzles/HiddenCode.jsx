// src/components/puzzles/HiddenCode.jsx
import { useState } from "react";

// data shape expected: { prompt: "Find the code hidden in the room.", answer: "1946", hint: "Check the mantel clock." }
export default function HiddenCode({ data, onSolved }) {
  const [input, setInput] = useState("");
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [showHint, setShowHint] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim() === data.answer) {
      setSolved(true);
      onSolved();
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 600);
    }
  }

  return (
    <div className="puzzle hidden-code">
      <p className="puzzle-instruction">{data.prompt}</p>
      {!solved ? (
        <form onSubmit={handleSubmit} className={`code-form ${wrong ? "shake" : ""}`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter code"
          />
          <button type="submit">Unlock</button>
        </form>
      ) : (
        <p className="puzzle-solved-text">Unlocked.</p>
      )}
      {!solved && (
        <button className="hint-button" onClick={() => setShowHint(!showHint)}>
          {showHint ? data.hint : "Need a hint?"}
        </button>
      )}
    </div>
  );
}