import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { connectDB } from "./database/db.js";

import authRouter from "./routes/auth.js";
import dashboardRouter from "./routes/dashboard.js";
import vesselsRouter from "./routes/vessels.js";
import berthsRouter from "./routes/berths.js";
import predictionRouter from "./routes/prediction.js";
import alertsRouter from "./routes/alerts.js";
import analyticsRouter from "./routes/analytics.js";
import settingsRouter from "./routes/settings.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "SmartPort AI Backend",
    database: "MongoDB",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/vessels", vesselsRouter);
app.use("/api/berths", berthsRouter);
app.use("/api/prediction", predictionRouter);
app.use("/api/alerts", alertsRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/settings", settingsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

// Connect to MongoDB first, then start Express
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`⚓ SmartPort AI Backend running on http://localhost:${PORT}`);
    console.log(`📡 REST API mounted at http://localhost:${PORT}/api`);
  });
});
