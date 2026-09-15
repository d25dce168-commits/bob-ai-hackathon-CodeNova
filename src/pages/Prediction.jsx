import React, { useState } from "react";
import { BrainCircuit, Sparkles } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import PredictionForm from "../components/prediction/PredictionForm";
import PredictionResult from "../components/prediction/PredictionResult";
import ForecastTimeline from "../components/prediction/ForecastTimeline";
import RecommendationCard from "../components/prediction/RecommendationCard";
import { predictCongestion } from "../services/api";

export default function Prediction() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runPrediction = async (input) => {
    setLoading(true);
    try {
      const data = await predictCongestion(input);
      setResult(data);
    } catch (err) {
      console.error("Prediction failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="PREDICTIVE INTELLIGENCE"
        title="AI Congestion Predictor"
        description="Turn current port conditions into an actionable 24–72 hour forecast powered by backend algorithms."
        action={
          <div className="model-pill">
            <span className="status-dot green" /> Backend Model Online <Sparkles size={14} />
          </div>
        }
      />

      <div className="prediction-layout">
        <PredictionForm onPredict={runPrediction} loading={loading} />
        <PredictionResult result={result} />
      </div>

      <div className="prediction-grid">
        <ForecastTimeline />
        <RecommendationCard result={result} />
      </div>

      <div className="method-note">
        <BrainCircuit size={17} />
        <span>
          <b>How it works:</b> SmartPort combines vessel queue pressure, berth utilization, crane availability and weather factors in the backend AI engine to estimate real-time congestion scores and generate tactical mitigations.
        </span>
      </div>
    </>
  );
}