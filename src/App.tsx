
import React, { useState } from "react";

import PatternCard from "./components/PatternCard";
import Spinner from "./components/Spinner";
import Wheel from "./components/Wheel";
import { patterns } from "./data/patterns";


const App: React.FC = () => {
  const [current, setCurrent] = useState<string>(patterns[0]);
  const [spinning, setSpinning] = useState(false);
  const [next, setNext] = useState<string | null>(null);
  const [spinVariance, setSpinVariance] = useState<number>(0);
  const [usedPatterns, setUsedPatterns] = useState<string[]>([]);
  const [hasSpun, setHasSpun] = useState(false);

  const handleSpin = () => {
    if (hasSpun) {
      // On spin, mark the current pattern as used (unless it's already used)
      setUsedPatterns((prev) => {
        if (!prev.includes(current)) {
          return [...prev, current];
        }
        return prev;
      });
    }
    setHasSpun(true);
    // Exclude already used patterns
    const available = patterns.filter((p) => !usedPatterns.includes(p) && p !== current);
    if (available.length === 0) return; // No more patterns to spin
    const newPattern = available[Math.floor(Math.random() * available.length)];
    // Add variance: random offset within the wedge (-angle/2 to +angle/2)
    const angle = 360 / patterns.length;
    const variance = (Math.random() - 0.5) * angle * 0.9; // 90% of wedge width, centered
    setSpinVariance(variance);
    setNext(newPattern);
    setSpinning(true);
    setTimeout(() => {
      setCurrent(newPattern);
      setSpinning(false);
      setNext(null);
      // Do not reset spinVariance here; keep it until next spin
    }, 2000); // match spin animation duration
  };

  const handleReset = () => {
    setUsedPatterns([]);
    setHasSpun(false);
    // Do not reset spinVariance, current, next, or spinning
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Taekwondo Pattern Spinner</h1>
      <Wheel patterns={patterns} selected={spinning && next ? next : current} spinning={spinning} variance={spinVariance} usedPatterns={usedPatterns} />
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
    </div>
  );
};

export default App;
