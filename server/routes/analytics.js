import express from "express";
import Analytics from "../models/Analytics.js";
import Vessel from "../models/Vessel.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try {
    const analytics = await Analytics.findOne({ key: "main" }).lean();
    res.json(analytics?.summary || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/history", async (req, res) => {
  try {
    const { range = "7d" } = req.query;
    const analytics = await Analytics.findOne({ key: "main" }).lean();
    const historical = analytics?.historical || {};
    const series = historical[range] || historical["7d"] || [];

    res.json({ range, data: series });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/export", async (req, res) => {
  try {
    const vessels = await Vessel.find().lean();
    const rows = [
      ["Vessel ID", "Vessel Name", "Type", "Status", "Berth", "Wait Time (hrs)", "ETA"],
      ...vessels.map((v) => [v.vesselId, v.name, v.type, v.status, v.berth, v.wait, v.eta])
    ];
    const csvContent = rows.map((r) => r.join(",")).join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="smartport-report.csv"');
    res.status(200).send(csvContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
