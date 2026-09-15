import mongoose from "mongoose";

const craneSchema = new mongoose.Schema({
  craneId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  berth: { type: String },
  status: { type: String, enum: ["Operational", "Maintenance", "Idle"], default: "Operational" },
  health: { type: String, default: "100%" },
  movesPerHour: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Crane", craneSchema);
