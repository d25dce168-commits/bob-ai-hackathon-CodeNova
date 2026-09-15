import React, { useEffect, useState } from "react";
import { AlertTriangle, ArrowRight, BrainCircuit, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import CongestionGauge from "../components/dashboard/CongestionGauge";
import PortOverview from "../components/dashboard/PortOverview";
import VesselQueue from "../components/dashboard/VesselQueue";
import BerthUtilization from "../components/dashboard/BerthUtilization";
import CongestionChart from "../components/dashboard/CongestionChart";
import AlertPanel from "../components/dashboard/AlertPanel";
import { getDashboardData } from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState({
    congestion: 78,
    vessels: 18,
    berthUtilization: 82,
    craneUtilization: 74,
    avgWait: 3.2
  });
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    getDashboardData()
      .then((res) => {
        if (res) setData(res);
      })
      .catch((err) => console.error("Error loading dashboard data:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000); // 15s live polling
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <div className="welcome-row">
        <div>
          <span className="eyebrow">LIVE TELEMETRY • {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).toUpperCase()}</span>
          <h1>Good morning, Operator</h1>
          <p>Your port intelligence overview is connected to the backend engine.</p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button className="secondary-button" onClick={loadData} disabled={loading}>
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <Link to="/prediction" className="primary-button">
            <BrainCircuit size={17} /> Run AI Prediction
          </Link>
        </div>
      </div>

      <PortOverview data={data} />

      <div className="dashboard-grid top-grid">
        <CongestionGauge score={data.congestion} />
        <CongestionChart />
      </div>

      <div className="dashboard-grid">
        <VesselQueue />
        <AlertPanel />
      </div>

      <div className="dashboard-grid">
        <BerthUtilization />
        <div className="card ai-banner">
          <div className="ai-icon">
            <BrainCircuit size={20} />
          </div>
          <div>
            <span className="eyebrow">SMARTPORT AI INSIGHT</span>
            <h3>Peak congestion expected in ~36 hours.</h3>
            <p>Queue pressure is projected to rise as Berth B03 reaches high occupancy.</p>
          </div>
          <Link to="/prediction">
            View recommendation <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}