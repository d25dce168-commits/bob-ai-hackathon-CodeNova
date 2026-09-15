import React, { useEffect, useState } from "react";
import { Anchor, Construction, RefreshCw } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import BerthMap from "../components/berth/BerthMap";
import CraneStatus from "../components/berth/CraneStatus";
import { getBerths, getCranes } from "../services/api";

export default function Berths() {
  const [berths, setBerths] = useState([]);
  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadInfrastructure = () => {
    setLoading(true);
    Promise.all([getBerths(), getCranes()])
      .then(([bData, cData]) => {
        if (Array.isArray(bData)) setBerths(bData);
        if (Array.isArray(cData)) setCranes(cData);
      })
      .catch((err) => console.error("Error loading berths/cranes:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadInfrastructure();
  }, []);

  const activeCranesCount = cranes.filter((c) => c.status === "Operational").length;
  const occupiedBerths = berths.filter((b) => b.status === "Occupied").length;
  const totalBerths = berths.length || 6;
  const utilizationPct = Math.round((occupiedBerths / totalBerths) * 100);

  return (
    <>
      <PageHeader
        eyebrow="INFRASTRUCTURE CONTROL"
        title="Berth & Crane Control"
        description="A live operational view of berth occupancy and equipment connected to database."
        action={
          <div className="legend">
            <span><i className="legend-dot occupied" />Occupied</span>
            <span><i className="legend-dot available" />Available</span>
            <span><i className="legend-dot maintenance" />Maintenance</span>
          </div>
        }
      />

      <div className="resource-summary">
        <div>
          <Anchor />
          <b>{totalBerths}</b>
          <span>Berths</span>
        </div>
        <div>
          <Construction />
          <b>{cranes.length || 6}</b>
          <span>Cranes</span>
        </div>
        <div>
          <span className="status-dot green" />
          <b>{activeCranesCount}</b>
          <span>Active cranes</span>
        </div>
        <div>
          <span className="status-dot yellow" />
          <b>{utilizationPct}%</b>
          <span>Utilization</span>
        </div>
      </div>

      <div className="card">
        <div className="card-heading">
          <div>
            <span className="eyebrow">LIVE TERMINAL MAP</span>
            <h3>Berth Allocation</h3>
          </div>
          <span className="mini-stat">Connected to Backend</span>
        </div>
        <BerthMap berths={berths} />
      </div>

      <CraneStatus cranes={cranes} />
    </>
  );
}