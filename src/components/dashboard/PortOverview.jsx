import React from "react";
import { Activity, Anchor, Clock3, Ship } from "lucide-react";
export default function PortOverview({ data }) {
  const stats = [
    [Ship, "Active vessels", data.vessels, "", "12%"],
    [Anchor, "Berth utilization", data.berthUtilization, "%", "8%"],
    [Activity, "Crane utilization", data.craneUtilization, "%", "5%"],
    [Clock3, "Average wait", data.avgWait, "h", "0.6h"]
  ];
  return <div className="stats-grid">{stats.map(([Icon,label,value,unit,change]) =>
    <div className="stat-card" key={label}><div className="stat-top"><div className="stat-icon"><Icon size={19}/></div><span className="trend up">↗ {change}</span></div><span className="stat-label">{label}</span><div className="stat-value">{value}<small>{unit}</small></div></div>
  )}</div>;
}