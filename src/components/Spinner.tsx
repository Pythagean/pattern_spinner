import React from "react";

type SpinnerProps = {
  onSpin: () => void;
  spinning: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({ onSpin, spinning }) => (
  <button
    onClick={onSpin}
    className={`mt-6 px-8 py-3 rounded-full bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${spinning ? "animate-spin-slow" : ""}`}
    style={{ minWidth: 120 }}
    disabled={spinning}
  >
    {spinning ? "Spinning..." : "Spin"}
  </button>
);

export default Spinner;
