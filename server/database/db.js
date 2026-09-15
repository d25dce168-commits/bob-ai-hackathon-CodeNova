import mongoose from "mongoose";
import User from "../models/User.js";
import Vessel from "../models/Vessel.js";
import Berth from "../models/Berth.js";
import Crane from "../models/Crane.js";
import Alert from "../models/Alert.js";
import Analytics from "../models/Analytics.js";
import Settings from "../models/Settings.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smartport";

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`🗄️  MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
    await seedIfEmpty();
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

async function seedIfEmpty() {
  const vesselCount = await Vessel.countDocuments();
  if (vesselCount > 0) {
    console.log("📦 Database already seeded — skipping.");
    return;
  }

  console.log("🌱 Seeding database with initial port data...");

  // ─── Users ───
  await User.create({
    userId: "usr_1",
    email: "operator@smartport.ai",
    name: "Port Operator",
    role: "Operations Manager",
    token: "smartport-auth-token-12345"
  });

  // ─── Vessels ───
  await Vessel.insertMany([
    {
      vesselId: "SP-204", name: "MSC Aurora", type: "Container", eta: "10:40",
      berth: "B03", wait: 2.8, status: "Waiting", imo: "9876543",
      length: "366 m", cargo: "8,420 TEU", destination: "Port Alpha Terminal 3",
      flag: "Panama", speed: "14.2 knots", assignedCranes: ["C-03", "C-04"], arrivalRisk: "Elevated"
    },
    {
      vesselId: "SP-198", name: "Maersk Orion", type: "Container", eta: "12:15",
      berth: "B01", wait: 1.2, status: "Approaching", imo: "9853211",
      length: "330 m", cargo: "7,100 TEU", destination: "Port Alpha Terminal 1",
      flag: "Denmark", speed: "16.0 knots", assignedCranes: ["C-01", "C-02"], arrivalRisk: "Low"
    },
    {
      vesselId: "SP-221", name: "CMA Titan", type: "Bulk", eta: "13:50",
      berth: "B04", wait: 0, status: "Scheduled", imo: "9451128",
      length: "290 m", cargo: "65,000 DWT", destination: "Port Alpha Bulk Terminal",
      flag: "France", speed: "12.5 knots", assignedCranes: [], arrivalRisk: "Moderate"
    },
    {
      vesselId: "SP-189", name: "Ever Ocean", type: "Container", eta: "15:05",
      berth: "B02", wait: 1.8, status: "Approaching", imo: "9912403",
      length: "399 m", cargo: "12,000 TEU", destination: "Port Alpha Terminal 2",
      flag: "Liberia", speed: "15.4 knots", assignedCranes: ["C-02"], arrivalRisk: "Moderate"
    },
    {
      vesselId: "SP-176", name: "Hapag Nova", type: "Container", eta: "16:40",
      berth: "B06", wait: 0.8, status: "Docked", imo: "9734120",
      length: "320 m", cargo: "6,800 TEU", destination: "Port Alpha Terminal 3",
      flag: "Germany", speed: "0 knots (At Berth)", assignedCranes: ["C-05", "C-06"], arrivalRisk: "Low"
    },
    {
      vesselId: "SP-233", name: "Ocean Star", type: "RoRo", eta: "18:10",
      berth: "B04", wait: 0, status: "Scheduled", imo: "9621984",
      length: "200 m", cargo: "4,500 CEU", destination: "Port Alpha Auto Terminal",
      flag: "Singapore", speed: "13.8 knots", assignedCranes: [], arrivalRisk: "Low"
    }
  ]);

  // ─── Berths ───
  await Berth.insertMany([
    { berthId: "B01", name: "Berth B01", status: "Occupied", vesselId: "SP-198", vesselName: "Maersk Orion", maxDraft: "16.5 m", length: "400 m", utilization: "88%", etaDeparture: "18:30", cranes: 2 },
    { berthId: "B02", name: "Berth B02", status: "Occupied", vesselId: "SP-189", vesselName: "Ever Ocean", maxDraft: "17.0 m", length: "420 m", utilization: "95%", etaDeparture: "21:00", cranes: 2 },
    { berthId: "B03", name: "Berth B03", status: "Occupied", vesselId: "SP-204", vesselName: "MSC Aurora", maxDraft: "16.0 m", length: "380 m", utilization: "91%", etaDeparture: "16:00", cranes: 2 },
    { berthId: "B04", name: "Berth B04", status: "Available", vesselId: null, vesselName: "None", maxDraft: "15.0 m", length: "350 m", utilization: "0%", etaDeparture: "-", cranes: 1 },
    { berthId: "B05", name: "Berth B05", status: "Maintenance", vesselId: null, vesselName: "Maintenance Window", maxDraft: "14.5 m", length: "300 m", utilization: "0%", etaDeparture: "Tomorrow 08:00", cranes: 0 },
    { berthId: "B06", name: "Berth B06", status: "Occupied", vesselId: "SP-176", vesselName: "Hapag Nova", maxDraft: "15.5 m", length: "360 m", utilization: "76%", etaDeparture: "23:45", cranes: 2 }
  ]);

  // ─── Cranes ───
  await Crane.insertMany([
    { craneId: "C-01", name: "STS Crane 1", berth: "B01", status: "Operational", health: "98%", movesPerHour: 34 },
    { craneId: "C-02", name: "STS Crane 2", berth: "B01", status: "Operational", health: "94%", movesPerHour: 31 },
    { craneId: "C-03", name: "STS Crane 3", berth: "B03", status: "Operational", health: "91%", movesPerHour: 29 },
    { craneId: "C-04", name: "STS Crane 4", berth: "B03", status: "Operational", health: "88%", movesPerHour: 28 },
    { craneId: "C-05", name: "STS Crane 5", berth: "B06", status: "Operational", health: "96%", movesPerHour: 33 },
    { craneId: "C-06", name: "STS Crane 6", berth: "B05", status: "Maintenance", health: "62%", movesPerHour: 0 }
  ]);

  // ─── Alerts ───
  await Alert.insertMany([
    { alertId: "ALT-101", type: "high", severity: "High", title: "High congestion probability at B03", desc: "Model predicts 86% congestion risk within 36 hours due to overlapping incoming schedules.", time: "8 min ago", timestamp: new Date(Date.now() - 8 * 60000), action: "Reassign incoming vessel", resolved: false },
    { alertId: "ALT-102", type: "medium", severity: "Medium", title: "Crane allocation imbalance", desc: "B01 currently has 3 active cranes while B04 is idle. Rebalancing recommended.", time: "21 min ago", timestamp: new Date(Date.now() - 21 * 60000), action: "Review allocation", resolved: false },
    { alertId: "ALT-103", type: "medium", severity: "Medium", title: "Vessel queue rising", desc: "Waiting queue increased from 5 to 7 vessels. Average delay index rising.", time: "29 min ago", timestamp: new Date(Date.now() - 29 * 60000), action: "Run prediction", resolved: false },
    { alertId: "ALT-104", type: "success", severity: "Resolved", title: "Berth B04 available", desc: "Berth cleared inspection and is ready for vessel assignment at 14:20.", time: "34 min ago", timestamp: new Date(Date.now() - 34 * 60000), action: "Assign vessel", resolved: true }
  ]);

  // ─── Analytics ───
  await Analytics.create({
    key: "main",
    summary: {
      totalVesselsHandled: 142,
      averageTurnaround: "14.2 hrs",
      berthProductivity: "32.4 moves/hr",
      queueEfficiency: "94.6%",
      bottleneckBerth: "Berth B03",
      bottleneckUtilization: "91%",
      predictionLeadTime: "41 hours"
    },
    historical: {
      "7d": [
        { day: "Mon", vessels: 22, waitTime: 2.1, utilization: 76 },
        { day: "Tue", vessels: 26, waitTime: 3.4, utilization: 84 },
        { day: "Wed", vessels: 28, waitTime: 3.8, utilization: 89 },
        { day: "Thu", vessels: 24, waitTime: 2.9, utilization: 81 },
        { day: "Fri", vessels: 30, waitTime: 4.2, utilization: 92 },
        { day: "Sat", vessels: 19, waitTime: 1.8, utilization: 68 },
        { day: "Sun", vessels: 17, waitTime: 1.5, utilization: 62 }
      ],
      "30d": [
        { week: "W1", vessels: 154, waitTime: 2.6, utilization: 77 },
        { week: "W2", vessels: 168, waitTime: 3.1, utilization: 82 },
        { week: "W3", vessels: 182, waitTime: 3.7, utilization: 88 },
        { week: "W4", vessels: 160, waitTime: 2.8, utilization: 79 }
      ],
      "90d": [
        { month: "Jul", vessels: 680, waitTime: 2.7, utilization: 78 },
        { month: "Aug", vessels: 720, waitTime: 3.2, utilization: 83 },
        { month: "Sep", vessels: 745, waitTime: 3.5, utilization: 86 }
      ]
    },
    congestionTrend: [
      { time: "00:00", score: 42, queue: 3 },
      { time: "04:00", score: 48, queue: 4 },
      { time: "08:00", score: 65, queue: 6 },
      { time: "12:00", score: 78, queue: 7 },
      { time: "16:00", score: 84, queue: 9 },
      { time: "20:00", score: 72, queue: 6 },
      { time: "24:00", score: 60, queue: 5 }
    ]
  });

  // ─── Settings ───
  await Settings.create({
    key: "main",
    profile: { fullName: "Port Operator", email: "operator@smartport.ai", role: "Operations Manager" },
    notifications: { highRiskCongestion: true, aiRecommendations: true, quietHours: false }
  });

  console.log("✅ Database seeded successfully with 6 vessels, 6 berths, 6 cranes, 4 alerts, analytics & settings.");
}
