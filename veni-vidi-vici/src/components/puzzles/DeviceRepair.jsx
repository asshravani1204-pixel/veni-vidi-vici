// src/components/puzzles/DeviceRepair.jsx
import { useState } from "react";

// data shape expected: { parts: ["wire-red", "wire-blue", "chip"], correctSlots: [1, 2, 0] }
// (same tap-to-place mechanic as EvidenceBoard, styled differently)
export default function DeviceRepair({ data, onSolved }) {
  const [slots, setSlots] = useState(Array(data.parts.length).fill(null));
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);

  const usedIndexes = slots.filter((s) => s !== null);

  function handlePartClick(partIndex) {
    if (solved || usedIndexes.includes(partIndex)) return;
    setSelected(partIndex);
  }

  function handleSlotClick(slotIndex) {
    if (solved || slots[slotIndex] !== null || selected === null) return;
    const newSlots = [...slots];
    newSlots[slotIndex] = selected;
    setSlots(newSlots);
    setSelected(null);

    if (!newSlots.includes(null)) {
      const isCorrect = newSlots.every(
        (partIndex, slotIndex) => partIndex === data.correctSlots[slotIndex]
      );
      if (isCorrect) {
        setSolved(true);
        onSolved();
      } else {
        setTimeout(() => setSlots(Array(data.parts.length).fill(null)), 800);
      }
    }
  }

  return (
    <div className="puzzle device-repair">
      <p className="puzzle-instruction">
        {solved ? "It hums back to life." : "Tap a part, then tap the slot to fit it."}
      </p>
      <div className="device-slots">
        {slots.map((filledIndex, slotIndex) => (
          <div
            key={slotIndex}
            className={`device-slot ${filledIndex !== null ? "filled" : ""}`}
            onClick={() => handleSlotClick(slotIndex)}
          >
            {filledIndex !== null ? data.parts[filledIndex] : `Slot ${slotIndex + 1}`}
          </div>
        ))}
      </div>
      <div className="device-parts">
        {data.parts.map((part, index) => (
          <div
            key={index}
            className={`device-part ${usedIndexes.includes(index) ? "used" : ""} ${selected === index ? "selected" : ""}`}
            onClick={() => handlePartClick(index)}
          >
            {part}
          </div>
        ))}
      </div>
    </div>
  );
}
