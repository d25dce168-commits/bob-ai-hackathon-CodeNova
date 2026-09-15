import express from "express";
import Vessel from "../models/Vessel.js";

const router = express.Router();

// GET all vessels with optional search and status filter
router.get("/", async (req, res) => {
  try {
    const { q, status } = req.query;
    let filter = {};

    if (status && status !== "All Status") {
      filter.status = new RegExp(`^${status}$`, "i");
    }

    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { name: regex },
        { vesselId: regex },
        { type: regex },
        { berth: regex }
      ];
    }

    const vessels = await Vessel.find(filter).sort({ createdAt: -1 }).lean();

    // Map vesselId → id for frontend compatibility
    const mapped = vessels.map((v) => ({ id: v.vesselId, ...v }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single vessel by ID
router.get("/:id", async (req, res) => {
  try {
    const vessel = await Vessel.findOne({ vesselId: new RegExp(`^${req.params.id}$`, "i") }).lean();
    if (!vessel) {
      return res.status(404).json({ error: `Vessel with ID ${req.params.id} not found` });
    }
    res.json({ id: vessel.vesselId, ...vessel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new vessel
router.post("/", async (req, res) => {
  try {
    const { name, type, eta, berth, wait, status, imo, length, cargo, destination } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Vessel name is required" });
    }

    const newId = req.body.id || `SP-${Math.floor(100 + Math.random() * 900)}`;

    const vessel = await Vessel.create({
      vesselId: newId,
      name,
      type: type || "Container",
      eta: eta || "12:00",
      berth: berth || "B01",
      wait: typeof wait === "number" ? wait : parseFloat(wait) || 0,
      status: status || "Scheduled",
      imo: imo || `9${Math.floor(100000 + Math.random() * 900000)}`,
      length: length || "300 m",
      cargo: cargo || "5,000 TEU",
      destination: destination || "Port Alpha Terminal",
      flag: req.body.flag || "International",
      speed: req.body.speed || "14.0 knots",
      assignedCranes: req.body.assignedCranes || [],
      arrivalRisk: req.body.arrivalRisk || "Low"
    });

    res.status(201).json({ id: vessel.vesselId, ...vessel.toObject() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update vessel
router.put("/:id", async (req, res) => {
  try {
    const vessel = await Vessel.findOneAndUpdate(
      { vesselId: new RegExp(`^${req.params.id}$`, "i") },
      { $set: req.body },
      { new: true }
    ).lean();

    if (!vessel) {
      return res.status(404).json({ error: `Vessel ${req.params.id} not found` });
    }
    res.json({ id: vessel.vesselId, ...vessel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE vessel
router.delete("/:id", async (req, res) => {
  try {
    const result = await Vessel.findOneAndDelete({ vesselId: new RegExp(`^${req.params.id}$`, "i") });
    if (!result) {
      return res.status(404).json({ error: `Vessel ${req.params.id} not found` });
    }
    res.json({ message: `Vessel ${req.params.id} removed successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
