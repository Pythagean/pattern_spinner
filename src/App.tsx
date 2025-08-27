
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

  const handleSpin = () => {
    setSpinning(true);
    setTimeout(() => {
      setCurrent(getRandomPattern(current));
      setSpinning(false);
    }, 100); // simple spin delay
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Taekwondo Pattern Spinner</h1>
      <Wheel patterns={patterns} selected={current} spinning={spinning} />
      <PatternCard pattern={current} />
      <Spinner onSpin={handleSpin} spinning={spinning} />
      <p className="mt-8 text-gray-500 text-sm">Click Spin to get a random pattern for practice.</p>
    </div>
  );
};

export default App;
