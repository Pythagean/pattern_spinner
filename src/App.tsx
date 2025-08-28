
import React, { useState } from "react";

import PatternCard from "./components/PatternCard";
import Spinner from "./components/Spinner";
import Wheel from "./components/Wheel";
import PatternDetails from "./components/PatternDetails";
import { patterns as allPatterns } from "./data/patterns";


const getRankOrder = (rank: string): number => {
  // Lower number = lower rank
  const order = [
    "9th Gup (Yellow Stripe)",
    "8th Gup (Yellow Belt)",
    "7th Gup (Green Stripe)",
    "6th Gup (Green Belt)",
    "5th Gup (Blue Stripe)",
    "4th Gup (Blue Belt)",
    "3rd Gup (Red Stripe)",
    "2nd Gup (Red Belt)",
    "1st Gup (Black Stripe)",
    "1st Dan",
    "2nd Dan",
    "3rd Dan",
    "4th Dan",
    "5th Dan",
    "6th Dan"
  ];
  return order.indexOf(rank);
};

const uniqueRanks = Array.from(new Set(allPatterns.map(p => p.rank)));

const App: React.FC = () => {
  const [selectedRank, setSelectedRank] = useState<string>(uniqueRanks.includes("1st Dan") ? "1st Dan" : uniqueRanks[0]);
  const [spinning, setSpinning] = useState(false);
  const [next, setNext] = useState<string | null>(null);
  const [spinVariance, setSpinVariance] = useState<number>(0);
  const [usedPatterns, setUsedPatterns] = useState<string[]>([]);
  const [hasSpun, setHasSpun] = useState(false);

  // Patterns available for this rank and below
  const patterns = allPatterns.filter(
    p => getRankOrder(p.rank) <= getRankOrder(selectedRank)
  );
  // Use pattern names for selection logic
  const patternNames = patterns.map(p => p.name);

  const [current, setCurrent] = useState<string>(patternNames[0]);

  React.useEffect(() => {
    // Reset current if rank changes
    setCurrent(patternNames[0]);
    setUsedPatterns([]);
    setHasSpun(false);
  }, [selectedRank]);

  const handleSpin = () => {
    if (hasSpun) {
      setUsedPatterns((prev) => {
        if (!prev.includes(current)) {
          return [...prev, current];
        }
        return prev;
      });
    }
    setHasSpun(true);
    // Exclude already used patterns
    const available = patternNames.filter((p) => !usedPatterns.includes(p) && p !== current);
    if (available.length === 0) return;
    const newPattern = available[Math.floor(Math.random() * available.length)];
    const angle = 360 / patternNames.length;
    const variance = (Math.random() - 0.5) * angle * 0.9;
    setSpinVariance(variance);
    setNext(newPattern);
    setSpinning(true);
    setTimeout(() => {
      setCurrent(newPattern);
      setSpinning(false);
      setNext(null);
    }, 2000);
  };

  const handleReset = () => {
    setUsedPatterns([]);
    setHasSpun(false);
    // Do not reset spinVariance, current, next, or spinning
  };

  return (
    <div className="min-h-screen flex flex-row items-stretch justify-center bg-gray-100">
      {/* Sidebar for pattern details */}
      <aside className="w-96 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {spinning ? (
            <div className="p-6 text-gray-400 italic text-center flex items-center justify-center h-full">Spinning...<br/>Pattern info will appear here after the wheel stops.</div>
          ) : (
            <PatternDetails pattern={current} />
          )}
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Taekwondo Pattern Spinner</h1>
        <div className="mb-4">
          <label htmlFor="rank-select" className="mr-2 font-semibold">Select your rank:</label>
          <select
            id="rank-select"
            value={selectedRank}
            onChange={e => setSelectedRank(e.target.value)}
            className="p-2 rounded border border-gray-300"
            disabled={spinning}
          >
            {uniqueRanks.map(rank => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </select>
        </div>
        <Wheel patterns={patternNames} selected={spinning && next ? next : current} spinning={spinning} variance={spinVariance} usedPatterns={usedPatterns} />
        <PatternCard pattern={spinning ? "Spinning..." : current} />
        <Spinner onSpin={handleSpin} spinning={spinning} />
        <button
          onClick={handleReset}
          className="mt-2 px-8 py-2 rounded-full font-bold shadow-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
          style={{ minWidth: 120 }}
          disabled={spinning}
        >
          Reset
        </button>
      </main>
    </div>
  );
};

export default App;
