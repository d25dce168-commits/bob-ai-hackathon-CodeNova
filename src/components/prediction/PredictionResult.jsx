import React from "react";
import { CheckCircle2, TriangleAlert } from "lucide-react";

export default function PredictionResult({ result }) {
  if (!result) {
    return (
      <div className="card prediction-empty">
        <BrainCircuitIcon />
        <h3>Ready for prediction</h3>
        <p>
          Enter current port conditions and run the AI engine to see a
          congestion forecast.
        </p>
      </div>
    );
  }

  const high = result.level === "High";

  return (
    <div
      className={`card prediction-result ${result.level.toLowerCase()}`}
    >
      <div className="result-head">
        <span className="eyebrow">MODEL OUTPUT</span>

        <span className="confidence">
          Confidence {Math.min(98, result.score + 9)}%
        </span>
      </div>

      <div className="result-score">
        <strong>{result.score}%</strong>
        <span>{result.level} congestion</span>
      </div>

      <div className="result-message">
        {high ? <TriangleAlert size={20} /> : <CheckCircle2 size={20} />}

        <span>
          {high
            ? "Congestion pressure is expected to rise. Proactive berth planning is recommended."
            : "Current conditions are within an operational range."}
        </span>
      </div>
    </div>
  );
}

function BrainPulse() {
  return <div className="brain-pulse">AI</div>;
}

function BrainCircuitIcon() {
  return <BrainPulse />;
}