// src/components/puzzles/Puzzle.jsx
import EvidenceBoard from "./EvidenceBoard";
import DeviceRepair from "./DeviceRepair";
import HiddenCode from "./HiddenCode";

export default function Puzzle({ puzzle, onSolved }) {
  if (!puzzle) return null;

  switch (puzzle.type) {
    case "evidence-board":
      return <EvidenceBoard data={puzzle.data} onSolved={onSolved} />;
    case "device-repair":
      return <DeviceRepair data={puzzle.data} onSolved={onSolved} />;
    case "hidden-code":
      return <HiddenCode data={puzzle.data} onSolved={onSolved} />;
    default:
      return null;
  }
}