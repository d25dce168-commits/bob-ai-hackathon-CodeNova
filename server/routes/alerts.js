import express from "express";
import Alert from "../models/Alert.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { severity } = req.query;
    let filter = {};

    if (severity && severity.toLowerCase() !== "all") {
      if (severity.toLowerCase() === "resolved") {
        filter.resolved = true;
      } else {
        filter.resolved = false;
        filter.type = severity.toLowerCase();
      }
    }

    const alerts = await Alert.find(filter).sort({ timestamp: -1 }).lean();
    const mapped = alerts.map((a) => ({ id: a.alertId, ...a }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, desc, type, severity, action } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const alert = await Alert.create({
      alertId: `ALT-${Math.floor(100 + Math.random() * 900)}`,
      title,
      desc: desc || "Operational notification triggered by operator or telemetry.",
      type: type || "medium",
      severity: severity || (type === "high" ? "High" : "Medium"),
      time: "Just now",
      timestamp: new Date(),
      action: action || "Review action",
      resolved: false
    });

    res.status(201).json({ id: alert.alertId, ...alert.toObject() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id/resolve", async (req, res) => {
  try {
    const alert = await Alert.findOneAndUpdate(
      { alertId: new RegExp(`^${req.params.id}$`, "i") },
      { $set: { resolved: true, type: "success", severity: "Resolved", time: "Just now" } },
      { new: true }
    ).lean();

    if (!alert) {
      return res.status(404).json({ error: `Alert ${req.params.id} not found` });
    }
    res.json({ id: alert.alertId, ...alert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Alert.findOneAndDelete({ alertId: new RegExp(`^${req.params.id}$`, "i") });
    if (!result) {
      return res.status(404).json({ error: `Alert ${req.params.id} not found` });
    }
    res.json({ message: `Alert ${req.params.id} dismissed` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
