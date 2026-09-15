import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { getAlerts } from "../../services/api";

export default function AlertPanel() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getAlerts()
      .then((data) => setAlerts(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="card alert-panel">
      <div className="card-heading">
        <div>
          <span className="eyebrow">ATTENTION</span>
          <h3>Operational Alerts</h3>
        </div>
        <Link className="text-link" to="/alerts">
          All alerts <ArrowRight size={15} />
        </Link>
      </div>

      <div className="alert-list">
        {alerts.map((a) => (
          <div className="alert-item" key={a.id || a.title}>
            <div className={`alert-icon ${a.type}`}>
              {a.type === "success" ? <CheckCircle2 size={17} /> : <TriangleAlert size={17} />}
            </div>
            <div>
              <b>{a.title}</b>
              <span>{a.desc}</span>
              <small>{a.time}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}