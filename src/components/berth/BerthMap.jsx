import React from "react";
import { Anchor, Ship } from "lucide-react";

export default function BerthMap({ berths: liveBerths }) {
  const defaultBerths = [
    { id: "B01", name: "Maersk Orion", utilization: "91%", status: "Occupied" },
    { id: "B02", name: "Ever Ocean", utilization: "68%", status: "Occupied" },
    { id: "B03", name: "MSC Aurora", utilization: "83%", status: "Occupied" },
    { id: "B04", name: "Available", utilization: "0%", status: "Available" },
    { id: "B05", name: "Maintenance", utilization: "0%", status: "Maintenance" },
    { id: "B06", name: "CMA Titan", utilization: "52%", status: "Occupied" }
  ];

  const list = liveBerths && liveBerths.length > 0 ? liveBerths : defaultBerths;

  return (
    <div className="berth-map">
      {list.map((b) => {
        const statusKey = (b.status || "available").toLowerCase();
        const displayName = b.vesselName || b.name || "Available";
        const isOccupied = statusKey === "occupied";

        return (
          <div className={`berth-block ${statusKey}`} key={b.id}>
            <div className="berth-id">
              <Anchor size={16} />
              <b>{b.id}</b>
            </div>
            <div className="berth-ship">
              {isOccupied ? <Ship size={26} /> : <span className="empty-anchor">+</span>}
              <b>{displayName}</b>
            </div>
            <div className="berth-block-foot">
              <span>{b.status}</span>
              <strong>{b.utilization || "0%"}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}