import React, { useEffect, useState } from "react";
import { ArrowLeft, Clock3, MapPin, Ship, Sparkles, Anchor, ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import StatusBadge from "../components/common/StatusBadge";
import { getVesselById } from "../services/api";

const fallbackData = {
  id: "SP-204",
  name: "MSC Aurora",
  type: "Container",
  eta: "10:40",
  berth: "B03",
  wait: 2.8,
  status: "Waiting",
  imo: "9876543",
  length: "366 m",
  cargo: "8,420 TEU",
  destination: "Port Alpha Terminal 3",
  speed: "14.2 knots",
  flag: "Panama"
};

export default function VesselDetails() {
  const { id } = useParams();
  const [vessel, setVessel] = useState(fallbackData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getVesselById(id)
        .then((data) => {
          if (data) setVessel(data);
        })
        .catch((err) => {
          console.warn("Could not fetch vessel details, using fallback:", err.message);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const v = vessel;

  return (
    <>
      <Link className="back-link" to="/vessels">
        <ArrowLeft size={16} /> Back to vessels
      </Link>

      <div className="detail-hero">
        <div className="detail-ship">
          <Ship size={45} />
        </div>
        <div>
          <span className="eyebrow">VESSEL {v.id}</span>
          <h1>{v.name}</h1>
          <p>{v.type} vessel • IMO: {v.imo} • Flag: {v.flag || "International"}</p>
        </div>
        <StatusBadge status={v.status} />
      </div>

      <div className="detail-grid">
        <div className="card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">VESSEL PROFILE</span>
              <h3>Operational Data</h3>
            </div>
            <span className="mini-stat">Live DB</span>
          </div>

          <div className="details-grid">
            {[
              ["ETA", v.eta],
              ["Assigned berth", v.berth],
              ["Waiting time", `${v.wait}h`],
              ["Length", v.length],
              ["Cargo capacity", v.cargo],
              ["Destination", v.destination],
              ["Current Speed", v.speed || "14 knots"]
            ].map(([label, val]) => (
              <div key={label}>
                <span>{label}</span>
                <b>{val}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="card ai-detail">
          <div className="ai-icon">
            <Sparkles size={19} />
          </div>
          <span className="eyebrow">AI RISK INSIGHT</span>
          <h3>Arrival risk is {v.arrivalRisk || "Elevated"}</h3>
          <p>
            Based on the current queue and {v.berth} utilization, this vessel may experience additional waiting during the forecast peak.
          </p>
          <div className="insight-line">
            <Clock3 size={16} /> Expected wait <b>{v.wait ? `${v.wait}–${(parseFloat(v.wait) + 1.2).toFixed(1)}h` : "3.4–4.1h"}</b>
          </div>
          <div className="insight-line">
            <MapPin size={16} /> Recommended <b>Monitor Berth B04</b>
          </div>
        </div>
      </div>
    </>
  );
}