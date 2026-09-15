import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function AnalyticsChart({ data = [], range = "7d" }) {
  const fallbackData = [
    { day: "Mon", waitTime: 2.8, utilization: 72 },
    { day: "Tue", waitTime: 3.1, utilization: 76 },
    { day: "Wed", waitTime: 2.5, utilization: 70 },
    { day: "Thu", waitTime: 3.6, utilization: 81 },
    { day: "Fri", waitTime: 4.1, utilization: 86 },
    { day: "Sat", waitTime: 3.5, utilization: 82 },
    { day: "Sun", waitTime: 3.2, utilization: 79 }
  ];

  const chartData = data && data.length > 0 ? data : fallbackData;
  const xKey = range === "7d" ? "day" : range === "30d" ? "week" : "month";

  return (
    <div className="card analytics-chart">
      <div className="card-heading">
        <div>
          <span className="eyebrow">HISTORICAL PERFORMANCE</span>
          <h3>Wait Time & Berth Utilization</h3>
        </div>
        <span className="mini-stat">Live Series ({range.toUpperCase()})</span>
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
            <XAxis dataKey={xKey} tick={{ fill: "#7890aa", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: "#7890aa", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "#7890aa", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "#0d1b2d",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 12,
                color: "#fff"
              }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="waitTime" name="Wait (hrs)" stroke="#22d3ee" strokeWidth={3} dot={{ fill: "#22d3ee", r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="utilization" name="Utilization %" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: "#8b5cf6", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}