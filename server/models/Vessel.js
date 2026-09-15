import mongoose from "mongoose";

const vesselSchema = new mongoose.Schema({
  vesselId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["Container", "Bulk", "Tanker", "RoRo"], default: "Container" },
  eta: { type: String },
  berth: { type: String },
  wait: { type: Number, default: 0 },
  status: { type: String, enum: ["Approaching", "Waiting", "Scheduled", "Docked", "Departed"], default: "Scheduled" },
  imo: { type: String },
  length: { type: String },
  cargo: { type: String },
  destination: { type: String },
  flag: { type: String, default: "International" },
  speed: { type: String },
  assignedCranes: [{ type: String }],
  arrivalRisk: { type: String, enum: ["Low", "Moderate", "Elevated", "High"], default: "Low" }
}, { timestamps: true });

export default mongoose.model("Vessel", vesselSchema);
