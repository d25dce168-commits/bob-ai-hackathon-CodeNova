import React from "react";
import { Construction } from "lucide-react";

export default function CraneStatus({ cranes: liveCranes }) {
  const defaultCranes = [
    { id: "C-01", berth: "B01", status: "Operational", health: "98%" },
    { id: "C-02", berth: "B01", status: "Operational", health: "94%" },
    { id: "C-03", berth: "B03", status: "Operational", health: "91%" },
    { id: "C-04", berth: "B03", status: "Operational", health: "88%" },
    { id: "C-05", berth: "B06", status: "Operational", health: "96%" },
    { id: "C-06", berth: "B05", status: "Maintenance", health: "62%" }
  ];

  const list = liveCranes && liveCranes.length > 0 ? liveCranes : defaultCranes;

  return (
    <div className="card crane-card">
      <div className="card-heading">
        <div>
          <span className="eyebrow">EQUIPMENT TELEMETRY</span>
          <h3>Crane Status</h3>
        </div>
      </div>

      <div className="crane-grid">
        {list.map((c) => {
          const loadNum = parseInt(c.health) || 85;
          const statusLower = (c.status || "operational").toLowerCase();

          return (
            <div className="crane-row" key={c.id}>
              <div className="crane-icon">
                <Construction size={17} />
              </div>
              <div>
                <b>{c.id}</b>
                <span>{c.berth}</span>
              </div>
              <span className={`equipment-status ${statusLower === "operational" ? "active" : "maintenance"}`}>
                {c.status}
              </span>
              <div className="load">
                <i style={{ width: `${loadNum}%` }} />
              </div>
              <strong>{c.health || `${loadNum}%`}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}