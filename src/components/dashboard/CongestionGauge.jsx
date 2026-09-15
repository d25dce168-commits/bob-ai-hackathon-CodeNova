import React from "react";
export default function CongestionGauge({ score = 78 }) {
  const radius = 76, circumference = 2 * Math.PI * radius, offset = circumference - (score / 100) * circumference;
  const level = score >= 70 ? "HIGH" : score >= 45 ? "MEDIUM" : "LOW";
  return <div className="gauge-card card">
    <div className="card-heading"><div><span className="eyebrow">AI RISK ENGINE</span><h3>Congestion Risk</h3></div><span className="ai-badge">AI</span></div>
    <div className="gauge-wrap">
      <svg className="gauge" viewBox="0 0 190 190">
        <circle className="gauge-track" cx="95" cy="95" r={radius}/>
        <circle className="gauge-value" cx="95" cy="95" r={radius} strokeDasharray={circumference} strokeDashoffset={offset}/>
      </svg>
      <div className="gauge-center"><strong>{score}%</strong><span>{level}</span></div>
    </div>
    <div className="gauge-footer"><span>Prediction window</span><b>Next 48 hours</b></div>
  </div>;
}