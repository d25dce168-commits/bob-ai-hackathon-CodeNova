import express from "express";

const router = express.Router();

router.post("/predict", (req, res) => {
  const {
    vessels = 18,
    berthUsage = 82,
    queue = 7,
    craneAvailability = 85,
    weather = "Clear",
    horizon = "36h"
  } = req.body;

  const numVessels = parseFloat(vessels) || 18;
  const numBerthUsage = parseFloat(berthUsage) || 82;
  const numQueue = parseFloat(queue) || 7;
  const numCranes = parseFloat(craneAvailability) || 85;

  // Weather modifier
  let weatherMultiplier = 1.0;
  if (weather.toLowerCase() === "fog" || weather.toLowerCase() === "rain") weatherMultiplier = 1.15;
  if (weather.toLowerCase() === "storm" || weather.toLowerCase() === "gale") weatherMultiplier = 1.35;

  // AI congestion index formula
  const pressure = (numVessels * 1.8 + numBerthUsage * 0.45 + numQueue * 3.2 - (numCranes - 50) * 0.3) * weatherMultiplier;
  const score = Math.min(98, Math.max(15, Math.round(pressure / 1.7)));

  let level = "Low";
  let color = "green";
  if (score >= 75) {
    level = "High";
    color = "red";
  } else if (score >= 45) {
    level = "Medium";
    color = "yellow";
  }

  // Estimated wait time based on congestion score
  const minWait = (score * 0.045).toFixed(1);
  const maxWait = (score * 0.058).toFixed(1);

  // Dynamic recommendations
  const recommendations = [];
  if (score >= 70) {
    recommendations.push({
      title: "Activate Standby Berths",
      detail: "Re-route 2 container vessels scheduled for Berth B03 to Berth B04 to relieve peak queue.",
      impact: "Reduces expected wait time by ~1.6 hours."
    });
    recommendations.push({
      title: "Redistribute STS Cranes",
      detail: "Reassign Crane C-02 to Terminal 3 during the 14:00–18:00 arrival peak.",
      impact: "Increases crane throughput by +14 moves/hour."
    });
    recommendations.push({
      title: "Inbound Slow-Steaming Advisory",
      detail: "Advise vessels SP-189 and SP-221 to reduce transit speed by 1.5 knots to smooth terminal arrivals.",
      impact: "Flattens queue spike."
    });
  } else if (score >= 45) {
    recommendations.push({
      title: "Monitor Berth B03 Schedule",
      detail: "Expected arrival window is tight between 12:00 and 16:00.",
      impact: "Maintains optimal 80% berth utilization."
    });
    recommendations.push({
      title: "Maintain Standard Crane Pairing",
      detail: "Keep 2 cranes active on all occupied container berths.",
      impact: "Normal operational baseline."
    });
  } else {
    recommendations.push({
      title: "Optimal Flow Conditions",
      detail: "Port operations are operating well within capacity limits.",
      impact: "No mitigation required."
    });
  }

  res.json({
    score,
    level,
    color,
    expectedWaitRange: `${minWait}–${maxWait}h`,
    peakHorizon: horizon === "72h" ? "~52 hours" : "~34 hours",
    recommendations,
    factors: {
      vesselPressure: Math.min(100, Math.round(numVessels * 4)),
      berthCapacityRisk: Math.round(numBerthUsage),
      queueCongestion: Math.min(100, Math.round(numQueue * 11)),
      weatherImpact: weatherMultiplier > 1.0 ? "Adverse (+25% delay risk)" : "Nominal"
    }
  });
});

router.get("/forecast", (req, res) => {
  const forecast = [
    { hour: "+6h", riskScore: 54, status: "Normal", expectedQueue: 4 },
    { hour: "+12h", riskScore: 68, status: "Moderate", expectedQueue: 6 },
    { hour: "+24h", riskScore: 82, status: "High Risk", expectedQueue: 8 },
    { hour: "+36h", riskScore: 88, status: "Peak Congestion", expectedQueue: 9 },
    { hour: "+48h", riskScore: 71, status: "Decongesting", expectedQueue: 6 },
    { hour: "+72h", riskScore: 49, status: "Normal", expectedQueue: 4 }
  ];
  res.json(forecast);
});

export default router;
