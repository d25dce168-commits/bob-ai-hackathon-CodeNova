import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await User.create({
        userId: `usr_${Date.now()}`,
        email,
        name: email.split("@")[0] || "Port Operator",
        role: "Operations Manager",
        token: `smartport-auth-${Date.now()}`
      });
    }

    res.json({
      message: "Login successful",
      token: user.token,
      user: {
        id: user.userId,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/me", async (req, res) => {
  try {
    const user = await User.findOne().lean();
    res.json(user || { name: "Port Operator", email: "operator@smartport.ai", role: "Operations Manager" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

export default router;
