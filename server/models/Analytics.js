import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: "main" },
  summary: {
    totalVesselsHandled: { type: Number, default: 142 },
    averageTurnaround: { type: String, default: "14.2 hrs" },
    berthProductivity: { type: String, default: "32.4 moves/hr" },
    queueEfficiency: { type: String, default: "94.6%" },
    bottleneckBerth: { type: String, default: "Berth B03" },
    bottleneckUtilization: { type: String, default: "91%" },
    predictionLeadTime: { type: String, default: "41 hours" }
  },
  historical: {
    "7d": [{
      day: String,
      vessels: Number,
      waitTime: Number,
      utilization: Number
    }],
    "30d": [{
      week: String,
      vessels: Number,
      waitTime: Number,
      utilization: Number
    }],
    "90d": [{
      month: String,
      vessels: Number,
      waitTime: Number,
      utilization: Number
    }]
  },
  congestionTrend: [{
    time: String,
    score: Number,
    queue: Number
  }]
}, { timestamps: true });

export default mongoose.model("Analytics", analyticsSchema);
