
import React, { useState } from "react";

import PatternCard from "./components/PatternCard";
import Spinner from "./components/Spinner";
import Wheel from "./components/Wheel";
import { patterns } from "./data/patterns";

const getRandomPattern = (exclude?: string) => {
  let filtered = patterns;
  if (exclude) filtered = patterns.filter((p) => p !== exclude);
  return filtered[Math.floor(Math.random() * filtered.length)];
};

const App: React.FC = () => {
  const [current, setCurrent] = useState<string>(patterns[0]);
  const [spinning, setSpinning] = useState(false);
  const [next, setNext] = useState<string | null>(null);
  const [spinVariance, setSpinVariance] = useState<number>(0);

  const handleSpin = () => {
    const newPattern = getRandomPattern(current);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Taekwondo Pattern Spinner</h1>
  <Wheel patterns={patterns} selected={spinning && next ? next : current} spinning={spinning} variance={spinVariance} />
  <PatternCard pattern={spinning ? "Spinning..." : current} />
      <Spinner onSpin={handleSpin} spinning={spinning} />
      <p className="mt-8 text-gray-500 text-sm">Click Spin to get a random pattern for practice.</p>
    </div>
  );
};

export default App;
