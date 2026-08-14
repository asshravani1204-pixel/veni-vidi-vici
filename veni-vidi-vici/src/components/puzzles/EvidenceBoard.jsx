// src/components/puzzles/EvidenceBoard.jsx
import { useState } from "react";

// data shape expected: { items: ["clue A", "clue B", "clue C"], correctOrder: [2, 0, 1] }
export default function EvidenceBoard({ data, onSolved }) {
  const [slots, setSlots] = useState(Array(data.items.length).fill(null));
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);

  const usedIndexes = slots.filter((s) => s !== null);

  function handlePieceClick(itemIndex) {
    if (solved || usedIndexes.includes(itemIndex)) return;
    setSelected(itemIndex);
  }

  function handleSlotClick(slotIndex) {
    if (solved || slots[slotIndex] !== null || selected === null) return;
    const newSlots = [...slots];
    newSlots[slotIndex] = selected;
    setSlots(newSlots);
    setSelected(null);

    if (!newSlots.includes(null)) {
      checkSolution(newSlots);
    }
  }

  function checkSolution(finalSlots) {
    const isCorrect = finalSlots.every(
      (itemIndex, slotIndex) => itemIndex === data.correctOrder[slotIndex]
    );
    if (isCorrect) {
      setSolved(true);
      onSolved();
    } else {
      setTimeout(() => setSlots(Array(data.items.length).fill(null)), 800);
    }
  }

  return (
    <div className="puzzle evidence-board">
      <p className="puzzle-instruction">
        {solved ? "Pieced together." : "Tap a clue, then tap where it belongs."}
      </p>
      <div className="evidence-slots">
        {slots.map((filledIndex, slotIndex) => (
          <div
            key={slotIndex}
            className={`evidence-slot ${filledIndex !== null ? "filled" : ""}`}
            onClick={() => handleSlotClick(slotIndex)}
          >
            {filledIndex !== null ? data.items[filledIndex] : "—"}
          </div>
        ))}
      </div>
      <div className="evidence-pieces">
        {data.items.map((item, index) => (
          <div
            key={index}
            className={`evidence-piece ${usedIndexes.includes(index) ? "used" : ""} ${selected === index ? "selected" : ""}`}
            onClick={() => handlePieceClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}