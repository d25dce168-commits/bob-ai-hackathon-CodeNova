import mongoose from "mongoose";

const berthSchema = new mongoose.Schema({
  berthId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, enum: ["Occupied", "Available", "Maintenance"], default: "Available" },
  vesselId: { type: String, default: null },
  vesselName: { type: String, default: "None" },
  maxDraft: { type: String },
  length: { type: String },
  utilization: { type: String, default: "0%" },
  etaDeparture: { type: String, default: "-" },
  cranes: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Berth", berthSchema);
