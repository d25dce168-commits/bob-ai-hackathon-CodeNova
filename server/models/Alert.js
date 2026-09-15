import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  alertId: { type: String, required: true, unique: true },
  type: { type: String, enum: ["high", "medium", "low", "success"], default: "medium" },
  severity: { type: String, default: "Medium" },
  title: { type: String, required: true },
  desc: { type: String },
  time: { type: String, default: "Just now" },
  timestamp: { type: Date, default: Date.now },
  action: { type: String },
  resolved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Alert", alertSchema);
