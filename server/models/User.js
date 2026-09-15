import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, default: "Port Operator" },
  role: { type: String, default: "Operations Manager" },
  token: { type: String }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
