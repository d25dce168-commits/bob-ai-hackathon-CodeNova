import express from "express";
import Vessel from "../models/Vessel.js";
import Berth from "../models/Berth.js";
import Crane from "../models/Crane.js";
import Alert from "../models/Alert.js";
import Analytics from "../models/Analytics.js";

const router = express.Router();

const getSummary = async (req, res) => {
  try {
    const vessels = await Vessel.find().lean();
    const berths = await Berth.find().lean();
    const cranes = await Crane.find().lean();
    const unresolvedAlerts = await Alert.countDocuments({ resolved: false });
    const analytics = await Analytics.findOne({ key: "main" }).lean();

    const vesselsCount = vessels.length;
    const occupiedBerths = berths.filter((b) => b.status === "Occupied").length;
    const totalBerths = berths.length || 1;
    const berthUtilization = Math.round((occupiedBerths / totalBerths) * 100);

    const operationalCranes = cranes.filter((c) => c.status === "Operational").length;
    const totalCranes = cranes.length || 1;
    const craneUtilization = Math.round((operationalCranes / totalCranes) * 100);

    const waitingVessels = vessels.filter((v) => v.status === "Waiting" || v.status === "Approaching");
    const totalWait = waitingVessels.reduce((acc, curr) => acc + (parseFloat(curr.wait) || 0), 0);
    const avgWait = waitingVessels.length > 0 ? (totalWait / waitingVessels.length).toFixed(1) : 0;

    const queuePressure = waitingVessels.length;
    const rawCongestion = Math.round(berthUtilization * 0.55 + queuePressure * 5 + 75 * 0.15);
    const congestion = Math.min(98, Math.max(20, rawCongestion));

    res.json({
      congestion,
      vessels: vesselsCount,
      berthUtilization,
      craneUtilization,
      avgWait: parseFloat(avgWait),
      activeAlerts: unresolvedAlerts,
      congestionTrend: analytics?.congestionTrend || []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

router.get("/", getSummary);
router.get("/summary", getSummary);


export default router;
