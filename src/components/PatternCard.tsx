import React from "react";

type PatternCardProps = {
  pattern: string;
};

const PatternCard: React.FC<PatternCardProps> = ({ pattern }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 min-w-[250px] text-center transition-all duration-300">
    <span className="text-2xl font-semibold text-gray-800">{pattern}</span>
  </div>
);

export default PatternCard;
