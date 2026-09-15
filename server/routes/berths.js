import express from "express";
import Berth from "../models/Berth.js";
import Crane from "../models/Crane.js";

const router = express.Router();

// GET all berths
router.get("/", async (req, res) => {
  try {
    const berths = await Berth.find().sort({ berthId: 1 }).lean();
    const mapped = berths.map((b) => ({ id: b.berthId, ...b }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all cranes
router.get("/cranes", async (req, res) => {
  try {
    const cranes = await Crane.find().sort({ craneId: 1 }).lean();
    const mapped = cranes.map((c) => ({ id: c.craneId, ...c }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT assign / update berth
router.put("/:id/assign", async (req, res) => {
  try {
    const { vesselId, vesselName, status, cranes } = req.body;

    const berth = await Berth.findOne({ berthId: new RegExp(`^${req.params.id}$`, "i") });
    if (!berth) {
      return res.status(404).json({ error: `Berth ${req.params.id} not found` });
    }

    if (status !== undefined) berth.status = status;
    if (vesselId !== undefined) berth.vesselId = vesselId;
    if (vesselName !== undefined) berth.vesselName = vesselName;
    if (cranes !== undefined) berth.cranes = cranes;

    if (berth.status === "Available") {
      berth.vesselId = null;
      berth.vesselName = "None";
      berth.utilization = "0%";
    } else if (berth.status === "Occupied") {
      berth.utilization = "90%";
    }

    await berth.save();
    res.json({ id: berth.berthId, ...berth.toObject() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
