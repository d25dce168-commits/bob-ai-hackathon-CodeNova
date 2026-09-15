import React, { useEffect, useState } from "react";
import { ArrowRight, Clock3, Ship } from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import { Link } from "react-router-dom";
import { getVessels } from "../../services/api";

export default function VesselQueue({ vessels: initialVessels }) {
  const [list, setList] = useState(initialVessels || []);

  useEffect(() => {
    if (!initialVessels) {
      getVessels()
        .then((data) => setList(data.slice(0, 5)))
        .catch(() => {});
    } else {
      setList(initialVessels.slice(0, 5));
    }
  }, [initialVessels]);

  return (
    <div className="card queue-card">
      <div className="card-heading">
        <div>
          <span className="eyebrow">LIVE QUEUE</span>
          <h3>Vessel Schedule</h3>
        </div>
        <Link className="text-link" to="/vessels">
          View all <ArrowRight size={15} />
        </Link>
      </div>

      <div className="queue-list">
        {list.map((v) => (
          <Link to={`/vessels/${v.id}`} className="queue-row" key={v.id}>
            <div className="vessel-avatar">
              <Ship size={17} />
            </div>
            <div className="queue-main">
              <b>{v.name}</b>
              <span>{v.type} • {v.id}</span>
            </div>
            <div className="queue-time">
              <Clock3 size={14} />
              {v.eta}
            </div>
            <span className="berth-tag">{v.berth}</span>
            <StatusBadge status={v.status} />
          </Link>
        ))}
      </div>
    </div>
  );
}