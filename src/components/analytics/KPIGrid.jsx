import React from "react";
import { Clock3, Gauge, Ship, Timer } from "lucide-react";

export default function KPIGrid({ stats }) {
  const turnaround = stats?.averageTurnaround || "14.2h";
  const utilization = stats?.bottleneckUtilization || "91%";
  const vesselsHandled = stats?.totalVesselsHandled || 142;
  const leadTime = stats?.predictionLeadTime || "41h";

  return (
    <div className="stats-grid analytics-kpis">
      <div className="stat-card">
        <div className="stat-icon">
          <Clock3 />
        </div>
        <span className="stat-label">Avg. Turnaround</span>
        <div className="stat-value">{turnaround}</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <Gauge />
        </div>
        <span className="stat-label">Peak Berth Util</span>
        <div className="stat-value">{utilization}</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <Ship />
        </div>
        <span className="stat-label">Vessels Handled</span>
        <div className="stat-value">{vesselsHandled}</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <Timer />
        </div>
        <span className="stat-label">Prediction Lead</span>
        <div className="stat-value">{leadTime}</div>
      </div>
    </div>
  );
}