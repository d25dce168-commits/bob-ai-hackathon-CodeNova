import React from "react";
import { ArrowRight, Lightbulb, Sparkles, CheckCircle } from "lucide-react";

export default function RecommendationCard({ result }) {
  const topRec = result?.recommendations?.[0];

  return (
    <div className="card recommendation">
      <div className="recommend-head">
        <div className="ai-icon">
          <Lightbulb size={19} />
        </div>
        <div>
          <span className="eyebrow">AI MITIGATION STRATEGY</span>
          <h3>{topRec ? topRec.title : "Recommended Action"}</h3>
        </div>
        <span className={`priority ${result?.level === "High" ? "high" : "normal"}`}>
          {result?.level === "High" ? "HIGH PRIORITY" : "STANDARD ACTION"}
        </span>
      </div>

      <p>
        {topRec
          ? topRec.detail
          : "Move the next arriving container vessel toward Berth B04 and reserve 2 cranes to minimize waiting."}
      </p>

      <div className="recommend-metrics">
        <div>
          <span>Expected Wait Time</span>
          <b>{result?.expectedWaitRange || "2.8–3.6h"}</b>
        </div>
        <div>
          <span>Peak Congestion Horizon</span>
          <b>{result?.peakHorizon || "~36h"}</b>
        </div>
        <div>
          <span>Action Impact</span>
          <b>{topRec?.impact || "Reduces peak queue"}</b>
        </div>
      </div>

      <button className="primary-button" onClick={() => alert("Mitigation strategy logged to port operations dispatcher.")}>
        Execute AI recommendation <ArrowRight size={16} />
      </button>
    </div>
  );
}