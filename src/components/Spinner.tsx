import React from "react";

type SpinnerProps = {
  onSpin: () => void;
  spinning: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({ onSpin, spinning }) => (
  <button
    onClick={onSpin}
    className={`mt-6 px-8 py-3 rounded-full font-bold shadow-md focus:outline-none focus:ring-2 transition-all duration-200
      ${spinning
        ? "bg-gray-400 text-white cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"}
    `}
    style={{ minWidth: 120 }}
    disabled={spinning}
  >
    Spin
  </button>
);

export default Spinner;
