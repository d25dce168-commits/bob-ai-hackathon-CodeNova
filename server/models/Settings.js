import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: "main" },
  profile: {
    fullName: { type: String, default: "Port Operator" },
    email: { type: String, default: "operator@smartport.ai" },
    role: { type: String, default: "Operations Manager" }
  },
  notifications: {
    highRiskCongestion: { type: Boolean, default: true },
    aiRecommendations: { type: Boolean, default: true },
    quietHours: { type: Boolean, default: false }
  }
}, { timestamps: true });

export default mongoose.model("Settings", settingsSchema);
