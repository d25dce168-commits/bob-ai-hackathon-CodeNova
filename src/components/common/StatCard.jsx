import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
export default function StatCard({ icon: Icon, label, value, unit, change, positive = true, className="" }) {
  return <div className={`stat-card ${className}`}>
    <div className="stat-top"><div className="stat-icon"><Icon size={20}/></div>{change && <span className={`trend ${positive ? "up" : "down"}`}>{positive ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {change}</span>}</div>
    <span className="stat-label">{label}</span>
    <div className="stat-value">{value}<small>{unit}</small></div>
  </div>;
}