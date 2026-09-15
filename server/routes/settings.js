import express from "express";
import Settings from "../models/Settings.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const settings = await Settings.findOne({ key: "main" }).lean();
    res.json(settings || { profile: {}, notifications: {} });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const { profile, notifications } = req.body;
    const update = {};

    if (profile) {
      if (profile.fullName) update["profile.fullName"] = profile.fullName;
      if (profile.email) update["profile.email"] = profile.email;
      if (profile.role) update["profile.role"] = profile.role;
    }

    if (notifications) {
      if (notifications.highRiskCongestion !== undefined)
        update["notifications.highRiskCongestion"] = notifications.highRiskCongestion;
      if (notifications.aiRecommendations !== undefined)
        update["notifications.aiRecommendations"] = notifications.aiRecommendations;
      if (notifications.quietHours !== undefined)
        update["notifications.quietHours"] = notifications.quietHours;
    }

    const settings = await Settings.findOneAndUpdate(
      { key: "main" },
      { $set: update },
      { new: true, upsert: true }
    ).lean();

    res.json({ message: "Settings saved successfully", settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
