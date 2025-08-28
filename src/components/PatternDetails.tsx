import React from "react";
import { patternInfo } from "../data/patternInfo";

type PatternDetailsProps = {
  pattern: string;
};

const PatternDetails: React.FC<PatternDetailsProps> = ({ pattern }) => {
  const info = patternInfo[pattern];
  if (!info) return (
    <div className="p-4 text-gray-500">No information available for this pattern.</div>
  );
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">{info.name}</h2>
      <div className="mb-1"><span className="font-semibold"></span> {info.movements} Movements</div>
      <div className="mb-1"><span className="font-semibold"></span> {info.endingFoot} foot moves back at the end</div>
      <div className="mb-1"><span className="font-semibold">Ready Posture:</span> {info.readyPosture}</div>
      <div className="mb-1"><span className="font-semibold">Interpretation:</span> {info.interpretation}</div>
      {info.diagramUrl && (
        <div className="mt-4">
          <img src={info.diagramUrl} alt={`Diagram for ${info.name}`} className="max-w-xs border rounded" />
        </div>
      )}
    </div>
  );
};

export default PatternDetails;
